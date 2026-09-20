/* Deep content + structure audit. Reads the built index.html, so it checks
   exactly what ships. Run: node audit2.js  [--all] */
const fs = require("fs");
const h = fs.readFileSync("index.html", "utf8");
global.window = {};
global.document = { querySelector: () => null, getElementById: () => null, addEventListener: () => {} };
const re = /window\.MBQ_BANK = \(window\.MBQ_BANK \|\| \[\]\)\.concat\(\[\{[\s\S]*?\n\]\}\]\);/g;
(h.match(re) || []).forEach((b) => eval(b));
const BANK = window.MBQ_BANK || [];
const showAll = process.argv.indexOf("--all") >= 0;

const P = [];                       /* problems */
const W = [];                       /* warnings */
function prob(kind, where, detail) { P.push({ kind, where, detail }); }
function warn(kind, where, detail) { W.push({ kind, where, detail }); }

/* Spell operators out first, or "10 + 10" and "10 - 10" collapse together. */
const ops = (s) => String(s)
  .replace(/\+/g, " plus ")
  .replace(/[-−]/g, " minus ")
  .replace(/×/g, " times ")
  .replace(/÷/g, " over ")
  .replace(/=/g, " equals ");

/* normalise for duplicate detection: fold case, strip punctuation + spaces */
const norm = (s) => ops(s).toLowerCase().replace(/[\s\p{P}\p{S}]/gu, "");
/* An option that IS a single symbol ("+", "?") must not normalise to nothing. */
const optKey = (s) => {
  const t = String(s).trim();
  return /^[^\w\s]$/u.test(t) ? "sym:" + t : norm(t);
};
/* looser: also drop emoji/pictographs so wording dups surface */
const words = (s) => ops(s).toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

/* Emoji that mean the same thing to a child, even though the codepoints
   differ. A question emoji from the same family as the answer's emoji gives
   the answer away just as surely as an identical one. */
const FAMILIES = [
  ["horse", "🐴🐎🏇🦄"],
  ["cow",   "🐄🐮🐂🐃"],
  ["cat",   "🐈🐱🐅🐆🦁"],
  ["dog",   "🐕🐶🦮🐩🐺"],
  ["pig",   "🐖🐷🐗"],
  ["sheep", "🐑🐏🐐"],
  ["bird",  "🐦🐤🐣🐥🕊️"],
  ["chicken","🐓🐔"],
  ["duck",  "🦆🦢"],
  ["fish",  "🐟🐠🐡🎣"],
  ["frog",  "🐸"],
  ["snake", "🐍"],
  ["elephant","🐘🦣"],
  ["monkey","🐒🐵🦍"],
  ["bear",  "🐻🐨🐼"],
  ["rabbit","🐇🐰"],
  ["mouse", "🐁🐭🐀"],
  ["bee",   "🐝"],
  ["ant",   "🐜"],
  ["butterfly","🦋🐛🐛"],
  ["tree",  "🌳🌲🌴🎄"],
  ["flower","🌸🌺🌻🌷🌹💐"],
  ["sun",   "☀️🌞🌅🌄"],
  ["moon",  "🌙🌕🌛🌜"],
  ["star",  "⭐🌟✨💫"],
  ["rain",  "🌧️☔🌦️💧"],
  ["fire",  "🔥"],
  ["water", "💧🚰🌊"],
  ["car",   "🚗🚙🏎️"],
  ["bus",   "🚌🚐"],
  ["train", "🚂🚆🚊🚉"],
  ["plane", "✈️🛩️🛫🛬"],
  ["boat",  "⛵🚢🛶🚤"],
  ["cycle", "🚲🚴"],
  ["book",  "📖📚📕📗"],
  ["clock", "🕐⏰⏲️🕰️"],
  ["computer","💻🖥️"],
  ["phone", "📱☎️📞"],
  ["apple", "🍎🍏"],
  ["flag",  "🇮🇳🏳️🏁"],
];
const FAM = {};
FAMILIES.forEach(([name, chars]) => {
  /* split on codepoints so multi-byte emoji stay whole */
  Array.from(chars).forEach((ch) => { if (ch.trim()) FAM[ch] = name; });
});
/* strip variation selectors so "🕊️" and "🕊" match */
const famOf = (e) => (e ? FAM[String(e).replace(/️/g, "")] || FAM[e] : null);

let total = 0;
const seenQ = new Map();
const seenWords = new Map();
const KNOWN_SHAPES = ["circle","square","triangle","rect","diamond","star","oval","hexagon","heart"];
const KNOWN_TOKENS = ["?", ":", "::", "blank"];

BANK.forEach((cat) => {
  total += cat.qs.length;
  if (cat.qs.length < 50) prob("POOL<50", cat.name, cat.qs.length + " questions");
  if (!cat.emoji) prob("NO EMOJI", cat.name, "");
  if (!cat.color) prob("NO COLOUR", cat.name, "");

  cat.qs.forEach((q, i) => {
    const w = cat.name + "[" + i + "]";

    /* ---- question text ---- */
    if (!q.q || !q.q.trim()) { prob("EMPTY Q", w, ""); return; }
    if (/\s{2,}/.test(q.q)) warn("DOUBLE SPACE", w, q.q);
    if (q.q !== q.q.trim()) warn("PAD Q", w, JSON.stringify(q.q));
    if (q.q.length > 110) warn("LONG Q", w, q.q.length + " chars: " + q.q);

    /* ---- duplicates ---- */
    const k = norm(q.q);
    if (seenQ.has(k)) prob("DUP Q", w, "== " + seenQ.get(k) + " :: " + q.q);
    else seenQ.set(k, w);

    const kw = words(q.q);
    if (kw && seenWords.has(kw) && seenWords.get(kw) !== w) {
      const other = seenWords.get(kw);
      if (norm(q.q) !== norm(BANK.flatMap((c) => c.qs).find(() => false)?.q || "")) {
        /* only report if not already caught above */
        if (!seenQ.has(k) || seenQ.get(k) === w) prob("DUP WORDING", w, "== " + other + " :: " + q.q);
      }
    } else if (kw) seenWords.set(kw, w);

    /* ---- options ---- */
    if (!q.o || q.o.length !== 4) { prob("OPTIONS!=4", w, (q.o || []).length + ""); return; }

    const labels = q.o.map((o) => o[1]);
    const emo = q.o.map((o) => o[0]);

    labels.forEach((l, j) => {
      if (l == null || String(l).trim() === "") prob("EMPTY OPTION", w, "slot " + j);
      if (typeof l === "string" && l.length > 60) warn("LONG OPTION", w, l.length + ": " + l);
    });

    /* identical after folding case + punctuation = unreadable aloud */
    const folded = labels.map((l) => optKey(l));
    if (new Set(folded).size !== 4) prob("OPTIONS SAME", w, q.q + " -> " + JSON.stringify(labels));
    else if (new Set(labels.map((l) => String(l).toLowerCase())).size !== 4)
      prob("OPTIONS DIFFER BY CASE ONLY", w, q.q + " -> " + JSON.stringify(labels));

    /* emoji leak: question emoji equals any option emoji */
    if (emo.indexOf(q.e) >= 0) prob("EMOJI LEAK", w, q.e + " :: " + q.q);
    /* softer leak: the question emoji MEANS the same as the answer's emoji,
       e.g. a horse-riding emoji above a question whose answer is Horse */
    else if (q.e && famOf(q.e) && famOf(q.e) === famOf(emo[0]))
      prob("EMOJI FAMILY LEAK", w, q.e + " ~ " + emo[0] + " :: " + q.q);
    /* correct option's emoji duplicated elsewhere is fine; all four identical is not */
    if (new Set(emo).size === 1) warn("ALL OPTION EMOJI SAME", w, q.q);

    /* the correct answer is o[0]; if it is much the longest, that is a tell */
    const lens = labels.map((l) => String(l).length);
    const maxOther = Math.max(lens[1], lens[2], lens[3]);
    if (lens[0] > maxOther + 18) warn("ANSWER LONGEST", w, JSON.stringify(labels));

    /* ---- hint ---- */
    if (!q.h || !String(q.h).trim()) prob("NO HINT", w, q.q);
    else {
      const hn = words(q.h), an = words(labels[0]);
      if (an && hn && hn.indexOf(an) >= 0 && an.length > 3)
        prob("HINT GIVES ANSWER", w, "hint:" + q.h + " | answer:" + labels[0]);
      if (norm(q.h) === norm(q.q)) prob("HINT == QUESTION", w, q.q);
    }

    /* ---- figures ---- */
    if (q.f) {
      const f = q.f;
      if (!f.k) prob("FIGURE NO KIND", w, JSON.stringify(f));
      if (f.items) {
        f.items.forEach((it) => {
          if (typeof it !== "string") return;
          if (KNOWN_TOKENS.indexOf(it) >= 0) return;
          const shape = it.split(" ")[0];
          if (KNOWN_SHAPES.indexOf(shape) < 0) prob("UNKNOWN SHAPE", w, it);
        });
      }
    }
    /* option figures */
    q.o.forEach((o, j) => {
      if (o[1] && typeof o[1] === "object" && o[1].items) {
        o[1].items.forEach((it) => {
          if (typeof it !== "string") return;
          if (KNOWN_TOKENS.indexOf(it) >= 0) return;
          const shape = it.split(" ")[0];
          if (KNOWN_SHAPES.indexOf(shape) < 0) prob("UNKNOWN SHAPE (opt)", w, "slot " + j + " " + it);
        });
      }
    });
  });
});

/* ---------- paper feasibility ---------- */
const pm = h.match(/var PAPERS = \{[\s\S]*?\n  \};/);
let PAPERS = null;
if (pm) { try { eval("PAPERS = " + pm[0].replace(/^var PAPERS = /, "").replace(/;$/, "")); } catch (e) { prob("PAPERS PARSE", "", e.message); } }

const bySubject = {};
BANK.forEach((c) => (bySubject[c.name] = c.qs.length));

if (PAPERS) {
  Object.keys(PAPERS).forEach((key) => {
    const p = PAPERS[key];
    let sum = 0;
    p.secs.forEach((s) => {
      sum += s.q;
      let pool = 0, missing = [];
      s.from.forEach((n) => {
        if (bySubject[n] == null) missing.push(n);
        else pool += bySubject[n];
      });
      if (missing.length) prob("PAPER SUBJECT MISSING", key + "/" + s.n, missing.join(", "));
      if (pool < s.q) prob("PAPER SECTION TOO SMALL", key + "/" + s.n, "needs " + s.q + ", pool " + pool);
      else if (pool < s.q * 3) warn("PAPER SECTION THIN", key + "/" + s.n, "needs " + s.q + ", pool " + pool);
    });
    if (sum !== 35) prob("PAPER NOT 35", key, "sections total " + sum);
    const marks = p.secs.reduce((a, s) => a + s.q * (s.n === "Achievers" ? 2 : 1), 0);
    if (marks !== 40) prob("PAPER NOT 40 MARKS", key, "marks " + marks);
  });
}

/* ---------- report ---------- */
const group = (arr) => {
  const g = {};
  arr.forEach((x) => { (g[x.kind] = g[x.kind] || []).push(x); });
  return g;
};
function dump(title, arr) {
  const g = group(arr);
  const keys = Object.keys(g).sort((a, b) => g[b].length - g[a].length);
  if (!keys.length) { console.log(title + ": none"); return; }
  console.log("\n===== " + title + " (" + arr.length + ") =====");
  keys.forEach((k) => {
    console.log("\n-- " + k + " (" + g[k].length + ")");
    const list = showAll ? g[k] : g[k].slice(0, 8);
    list.forEach((x) => console.log("   " + x.where + "  " + x.detail));
    if (!showAll && g[k].length > list.length) console.log("   ... +" + (g[k].length - list.length) + " more (--all)");
  });
}

console.log("subjects: " + BANK.length + "   questions: " + total);
dump("PROBLEMS", P);
dump("WARNINGS", W);
console.log("\ntotals -> problems " + P.length + ", warnings " + W.length);
process.exitCode = P.length ? 1 : 0;
