/* Draws the app icon (tiranga + Ashoka Chakra) and writes real PNGs.
   No dependencies: Node's zlib does the compression, CRC32 is done by hand. */
const fs = require("fs");
const zlib = require("zlib");

/* ---- minimal PNG writer (8-bit RGBA) ---- */
const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(w, h, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // colour type: RGBA
  const raw = Buffer.alloc(h * (w * 4 + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---- the artwork ---- */
const SAFFRON = [255, 153, 51], WHITE = [255, 255, 255], GREEN = [19, 136, 8], NAVY = [0, 0, 128];

function draw(S) {
  const buf = Buffer.alloc(S * S * 4);
  const SS = 3;                       // 3x3 supersampling, for smooth curves
  const cx = S / 2, cy = S / 2;
  const R = S * 0.155;                // chakra outer radius
  const ringIn = R * 0.84;
  const hub = R * 0.16;
  const spokeW = S * 0.006;

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      let r = 0, g = 0, b = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = x + (sx + 0.5) / SS, py = y + (sy + 0.5) / SS;

          // tricolour bands
          let c = py < S / 3 ? SAFFRON : py < (2 * S) / 3 ? WHITE : GREEN;

          // chakra sits on the white band
          const dx = px - cx, dy = py - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          let onChakra = false;
          if (d <= R + 0.5) {
            if (d >= ringIn && d <= R) onChakra = true;      // outer ring
            else if (d <= hub) onChakra = true;              // hub
            else if (d < ringIn) {
              // 24 spokes
              const a = Math.atan2(dy, dx);
              const step = (Math.PI * 2) / 24;
              const off = Math.abs(((a % step) + step) % step - step / 2);
              if (off * d <= spokeW) onChakra = true;
            }
          }
          if (onChakra) c = NAVY;
          r += c[0]; g += c[1]; b += c[2];
        }
      }
      const n = SS * SS, i = (y * S + x) * 4;
      buf[i] = Math.round(r / n);
      buf[i + 1] = Math.round(g / n);
      buf[i + 2] = Math.round(b / n);
      buf[i + 3] = 255;
    }
  }
  return png(S, S, buf);
}

[192, 512, 180].forEach((s) => {
  fs.writeFileSync(`icon-${s}.png`, draw(s));
  console.log(`icon-${s}.png written`);
});
