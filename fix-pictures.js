/* Operates on the parsed bank, not on the file text, so it is immune to
   however fixleaks last serialised things.
   1. Any question whose picture options all share one label gets A/B/C/D
      labels instead - four options all reading "This one" are useless to a
      child who cannot read, and to the read-aloud.
   2. Questions inside a subject that share identical text get distinguished. */
const fs = require("fs");
let html = fs.readFileSync("src/app.html", "utf8");
const START = html.indexOf("window.MBQ_BANK = (window.MBQ_BANK");
const END = html.lastIndexOf("]}]);") + "]}]);".length;
global.window = {};
eval(html.slice(START, END));
const BANK = window.MBQ_BANK;

const LETTERS = ["Shape A", "Shape B", "Shape C", "Shape D"];
let relabelled = 0, retitled = 0;

for (const cat of BANK) {
  /* 1. duplicate option labels on picture options */
  for (const q of cat.qs) {
    const labels = q.o.map((o) => o[1]);
    const allPictures = q.o.every((o) => o[0] && typeof o[0] === "object");
    if (allPictures && new Set(labels).size < 4) {
      q.o.forEach((o, i) => { o[1] = LETTERS[i]; });
      relabelled++;
    }
  }
  /* 2. duplicate question text within the subject */
  const seen = new Map();
  for (const q of cat.qs) {
    const key = q.q.toLowerCase().replace(/[\s\p{P}]/gu, "");
    if (!seen.has(key)) { seen.set(key, 1); continue; }
    const nth = seen.get(key) + 1;
    seen.set(key, nth);
    /* name the figure so the two questions read differently */
    const first = q.o[0] && q.o[0][1] ? q.o[0][1] : "";
    if (/how many sides/i.test(q.q))        q.q = "Count the sides of this shape. How many are there?";
    else if (/name of this shape/i.test(q.q)) q.q = nth === 2 ? "Which shape is shown here?" : "Name this shape.";
    else if (/how many circles/i.test(q.q))  q.q = "How many circles can you count here?";
    else q.q = q.q.replace(/\?$/, "") + " (puzzle " + nth + ")?";
    retitled++;
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
console.log("option sets relabelled A-D:", relabelled, " questions retitled:", retitled);
