/* Pulls the embedded page images out of a PDF. No dependencies.
   Photos taken on a phone are stored as JPEG (DCTDecode), so their bytes can
   be written straight out. Flate-encoded bitmaps are rebuilt as PNG.

   Usage:  node tools/pdf-images.js <file.pdf> [outDir]
*/
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const pdfPath = process.argv[2];
const outDir = process.argv[3] || "pages";
if (!pdfPath) { console.error("usage: node tools/pdf-images.js <file.pdf> [outDir]"); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const buf = fs.readFileSync(pdfPath);

/* ---- minimal PNG writer, for Flate bitmaps ---- */
const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; }
  return t;
})();
const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function makePng(w, h, rgb, channels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = channels === 1 ? 0 : 2;
  const stride = w * channels;
  const raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 6 })), chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---- walk the objects ---- */
const num = (dict, key) => { const m = dict.match(new RegExp("\\/" + key + "\\s+(\\d+)")); return m ? parseInt(m[1], 10) : 0; };

let found = 0, other = 0, i = 0;
const report = [];

while (true) {
  const s = buf.indexOf("stream", i);
  if (s < 0) break;

  // the dictionary is the text just before "stream"
  var objStart = buf.lastIndexOf(" obj", s);
  if (objStart < 0) objStart = Math.max(0, s - 1200);
  const dict = buf.slice(objStart, s).toString("latin1");

  let st = s + 6;
  if (buf[st] === 13) st++;
  if (buf[st] === 10) st++;
  const e = buf.indexOf("endstream", st);
  if (e < 0) break;
  let end = e;
  while (end > st && (buf[end - 1] === 10 || buf[end - 1] === 13)) end--;
  const data = buf.slice(st, end);
  i = e + 9;

  if (!/\/Image/.test(dict)) continue;

  const w = num(dict, "Width"), h = num(dict, "Height");

  if (/DCTDecode/.test(dict)) {
    var jpg = data, kind = "jpeg";
    if (/FlateDecode/.test(dict)) {
      try { jpg = zlib.inflateSync(data); kind = "flate+jpeg"; }
      catch (err) { other++; continue; }
    }
    found++;
    const f = path.join(outDir, "page-" + String(found).padStart(3, "0") + ".jpg");
    fs.writeFileSync(f, jpg);
    report.push({ file: f, w, h, kb: Math.round(jpg.length / 1024), type: kind });
  } else if (/FlateDecode/.test(dict) && w && h) {
    try {
      const raw = zlib.inflateSync(data);
      const channels = /DeviceRGB/.test(dict) ? 3 : (/DeviceGray/.test(dict) ? 1 : 3);
      if (raw.length >= w * h * channels) {
        found++;
        const f = path.join(outDir, "page-" + String(found).padStart(3, "0") + ".png");
        fs.writeFileSync(f, makePng(w, h, raw, channels));
        report.push({ file: f, w, h, kb: Math.round(raw.length / 1024), type: "flate->png" });
      } else other++;
    } catch (err) { other++; }
  } else {
    other++;
    const filt = (dict.match(/\/Filter\s*\/?(\w+)/) || [])[1] || "unknown";
    report.push({ file: "(skipped)", w, h, kb: Math.round(data.length / 1024), type: filt });
  }
}

console.log("images written:", found, " skipped:", other);
report.forEach((r) => console.log("  " + String(r.kb).padStart(6) + " KB  " + String(r.w) + "x" + String(r.h) + "  " + r.type + "  " + r.file));
if (!found) console.log("\nNo extractable images. The PDF may store pages in a format this tool does not handle.");
