/* Print specific questions: node show.js "Our India[2]" "Maths[12]" ... */
const fs = require("fs");
const h = fs.readFileSync("index.html", "utf8");
global.window = {};
global.document = { querySelector: () => null, getElementById: () => null, addEventListener: () => {} };
const re = /window\.MBQ_BANK = \(window\.MBQ_BANK \|\| \[\]\)\.concat\(\[\{[\s\S]*?\n\]\}\]\);/g;
(h.match(re) || []).forEach((b) => eval(b));
const BANK = window.MBQ_BANK || [];
const by = {};
BANK.forEach((c) => (by[c.name] = c.qs));

process.argv.slice(2).forEach((spec) => {
  const m = spec.match(/^(.*)\[(\d+)\]$/);
  if (!m) return console.log("?? " + spec);
  const q = (by[m[1]] || [])[+m[2]];
  if (!q) return console.log("?? " + spec);
  console.log("\n--- " + spec);
  console.log("  e: " + q.e);
  if (q.f) console.log("  f: " + JSON.stringify(q.f));
  console.log("  Q: " + q.q);
  q.o.forEach((o, i) =>
    console.log("     " + (i === 0 ? "*" : " ") + o[0] + " " + (typeof o[1] === "object" ? JSON.stringify(o[1]) : o[1]))
  );
  console.log("  h: " + q.h);
});
