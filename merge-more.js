/* Merges every src/more-*.js addendum into the matching subject in
   src/app.html. Each addendum is { "<Subject name>": [ {e,q,o,h}, ... ] }.
   Skips any question whose text already exists, so re-running is safe. */
const fs = require("fs");
const path = require("path");

let html = fs.readFileSync("src/app.html", "utf8");
const START = html.indexOf("window.MBQ_BANK = (window.MBQ_BANK");
const END = html.lastIndexOf("]}]);") + "]}]);".length;
if (START < 0 || END < START) throw new Error("could not locate the data block");

global.window = {};
eval(html.slice(START, END));
const BANK = window.MBQ_BANK;

const key = (s) => s.toLowerCase().replace(/[\s\p{P}]/gu, "");
const byName = {};
BANK.forEach((c) => { byName[c.name] = c; });

const files = fs.readdirSync("src").filter((f) => /^more-.*\.js$/.test(f)).sort();
let added = 0, skipped = 0;

for (const f of files) {
  const add = require(path.resolve("src", f));
  for (const name of Object.keys(add)) {
    const cat = byName[name];
    if (!cat) { console.log("  UNKNOWN SUBJECT:", name, "in", f); continue; }
    const have = new Set(cat.qs.map((q) => key(q.q)));
    for (const q of add[name]) {
      if (have.has(key(q.q))) { skipped++; continue; }
      have.add(key(q.q));
      cat.qs.push(q);
      added++;
    }
  }
}

const S = JSON.stringify;
const blocks = BANK.map((c) =>
  "window.MBQ_BANK = (window.MBQ_BANK || []).concat([{\n" +
  "name:" + S(c.name) + ", deva:" + S(c.deva) + ", emoji:" + S(c.emoji) + ", color:" + S(c.color) + ", qs:[\n" +
  c.qs.map((q) =>
    "{e:" + S(q.e) + (q.f ? ",f:" + S(q.f) : "") + ",q:" + S(q.q) + ",o:[" +
    q.o.map((o) => "[" + S(o[0]) + "," + S(o[1]) + "]").join(",") +
    "],h:" + S(q.h) + "}").join(",\n") +
  "\n]}]);"
).join("\n");

fs.writeFileSync("src/app.html", html.slice(0, START) + blocks + html.slice(END), "utf8");
console.log("addendum files:", files.length, " added:", added, " skipped as duplicate:", skipped);
BANK.forEach((c) => console.log("  " + String(c.qs.length).padStart(3) + "  " + c.name));
