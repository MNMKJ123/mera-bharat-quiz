/* Appends a browser-style subject file (window.MBQ_BANK = ...concat) into the
   bank inside src/app.html, and registers its colour token.
   Usage: node tools/add-subject.js src/q22-famous.js "#BE185D" "#F9A8D4"
   Idempotent: refuses if the subject name is already in the bank. */
const fs = require("fs");

const appPath = "src/app.html";
const subPath = process.argv[2];
const light = process.argv[3];
const dark = process.argv[4];
if (!subPath) { console.log("usage: node tools/add-subject.js <file> <lightHex> <darkHex>"); process.exit(1); }

let s = fs.readFileSync(appPath, "utf8");
const sub = fs.readFileSync(subPath, "utf8");

const nameMatch = sub.match(/name:"([^"]+)"/);
if (!nameMatch) { console.log("no subject name found in " + subPath); process.exit(1); }
const name = nameMatch[1];
if (s.indexOf('name:"' + name + '"') >= 0) { console.log("already present: " + name); process.exit(0); }

const colourMatch = sub.match(/color:"([^"]+)"/);
const token = colourMatch ? colourMatch[1] : null;

/* colour token on both the light and the dark :root */
if (token && light && dark) {
  s = s.replace("--helper:#C2410C;", "--helper:#C2410C; --" + token + ":" + light + ";");
  s = s.replace("--helper:#FDBA74;", "--helper:#FDBA74; --" + token + ":" + dark + ";");
}

/* strip the file's leading comment so only the statement is inserted */
const block = sub.replace(/^[\s\S]*?(window\.MBQ_BANK)/, "$1").trim();

const lines = s.split("\n");
let last = -1;
for (let i = 0; i < lines.length; i++) {
  if (/^\s*\]\}\]\);\s*$/.test(lines[i])) last = i;
}
if (last < 0) { console.log("could not find the end of the bank"); process.exit(1); }

lines.splice(last + 1, 0, block);
fs.writeFileSync(appPath, lines.join("\n"));
console.log("inserted \"" + name + "\" after line " + (last + 1) +
            (token ? ", colour --" + token : ""));
