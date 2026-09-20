/* Draws every mock paper many times using the app's own drawPaper source,
   and checks the result is a valid SOF paper each time.
   Run: node papertest.js [runs] */
const fs = require("fs");
const h = fs.readFileSync("index.html", "utf8");
global.window = {};
global.document = { querySelector: () => null, getElementById: () => null, addEventListener: () => {} };
const re = /window\.MBQ_BANK = \(window\.MBQ_BANK \|\| \[\]\)\.concat\(\[\{[\s\S]*?\n\]\}\]\);/g;
(h.match(re) || []).forEach((b) => eval(b));
const BANK = window.MBQ_BANK || [];

/* lift the real implementations out of the shipped file */
function lift(name) {
  const m = h.match(new RegExp("\\n  function " + name + "\\([\\s\\S]*?\\n  \\}"));
  if (!m) throw new Error("could not find function " + name);
  return m[0];
}
const PAPERS_SRC = h.match(/var PAPERS = \{[\s\S]*?\n  \};/)[0];
eval(PAPERS_SRC);
eval(lift("shuffle"));
eval(lift("poolFor"));
eval(lift("drawPaper"));

const RUNS = parseInt(process.argv[2] || "400", 10);
const fails = [];
const stats = {};

Object.keys(PAPERS).forEach((key) => {
  const p = PAPERS[key];
  const want = {};
  p.secs.forEach((s) => (want[s.n] = s.q));
  const st = { runs: 0, short: 0, dup: 0, badSec: 0, marksWrong: 0, uniqueSeen: new Set() };

  for (let r = 0; r < RUNS; r++) {
    const { deck, marks } = drawPaper(key);
    st.runs++;

    if (deck.length !== 35) { st.short++; if (fails.length < 12) fails.push(key + " run" + r + ": deck " + deck.length); }

    /* no question twice in one paper, by text */
    const seen = new Set();
    deck.forEach((q) => { if (seen.has(q.q)) st.dup++; seen.add(q.q); st.uniqueSeen.add(q.q); });

    /* section counts must match the spec exactly, and be contiguous in order */
    const got = {};
    marks.forEach((m) => (got[m] = (got[m] || 0) + 1));
    Object.keys(want).forEach((n) => { if (got[n] !== want[n]) st.badSec++; });

    /* marks must total 40 with Achievers at 2 */
    const total = marks.reduce((a, n) => a + (n === "Achievers" ? 2 : 1), 0);
    if (total !== 40) { st.marksWrong++; if (fails.length < 12) fails.push(key + " run" + r + ": marks " + total); }

    /* sections must appear in the declared order, never interleaved */
    let idx = 0;
    for (let i = 0; i < marks.length; i++) {
      if (marks[i] !== p.secs[idx].n) {
        idx++;
        if (idx >= p.secs.length || marks[i] !== p.secs[idx].n) { st.badSec++; break; }
      }
    }
  }
  stats[key] = st;
});

console.log("runs per paper: " + RUNS + "\n");
let bad = 0;
Object.keys(stats).forEach((k) => {
  const s = stats[k];
  const line = [
    k.padEnd(5),
    "short " + s.short,
    "dup " + s.dup,
    "badSection " + s.badSec,
    "marks!=40 " + s.marksWrong,
    "distinct questions seen " + s.uniqueSeen.size,
  ].join("   ");
  console.log(line);
  bad += s.short + s.dup + s.badSec + s.marksWrong;
});
if (fails.length) { console.log("\nexamples:"); fails.forEach((f) => console.log("  " + f)); }
console.log("\n" + (bad ? "FAILURES: " + bad : "all papers valid"));
process.exitCode = bad ? 1 : 0;
