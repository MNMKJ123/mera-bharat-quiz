/* Where the four option icons single the answer out — one odd icon against
   three identical ones — the picture gives the game away before the words
   are read. Sets all four to the same neutral marker, so only the words
   decide. Also moves the question's own emoji if it would then collide.
   Operates on the parsed bank and re-serialises, like fixleaks.js. */
const fs = require("fs");

const FILES = ["src/app.html"];
const NEUTRAL = "🔹";
const QUESTION_ALT = ["🧐", "🤔", "💭", "🎓", "📝", "🔎", "❓", "🗣️"];

function loadBank(html) {
  global.window = {};
  global.document = { querySelector: () => null, getElementById: () => null, addEventListener: () => {} };
  const re = /window\.MBQ_BANK = \(window\.MBQ_BANK \|\| \[\]\)\.concat\(\[\{[\s\S]*?\n\]\}\]\);/g;
  const blocks = html.match(re) || [];
  blocks.forEach((b) => eval(b));
  return { bank: window.MBQ_BANK || [], blocks };
}

const S = (v) => JSON.stringify(v);

function serialise(c) {
  return "window.MBQ_BANK = (window.MBQ_BANK || []).concat([{\n" +
    "name:" + S(c.name) + ", deva:" + S(c.deva) + ", emoji:" + S(c.emoji) + ", color:" + S(c.color) + ", qs:[\n" +
    c.qs.map((q) =>
      "{" + (q.g ? "g:" + S(q.g) + "," : "") +
      "e:" + S(q.e) + (q.f ? ",f:" + S(q.f) : "") + ",q:" + S(q.q) + ",o:[" +
      q.o.map((o) => "[" + S(o[0]) + "," + S(o[1]) + "]").join(",") +
      "],h:" + S(q.h) + "}").join(",\n") +
    "\n]}]);";
}

FILES.forEach((path) => {
  let html = fs.readFileSync(path, "utf8");
  const { bank, blocks } = loadBank(html);
  let fixedIcons = 0, movedQ = 0;

  bank.forEach((c) => {
    c.qs.forEach((q) => {
      if (!q.o || q.o.length !== 4) return;
      const emo = q.o.map((o) => o[0]);
      const others = [emo[1], emo[2], emo[3]];
      const marks = others.indexOf(emo[0]) < 0 && new Set(others).size === 1;
      if (!marks) return;

      /* an icon that is a real picture of its own option is fine to keep only
         if every option has its own; here three share one, so flatten all */
      q.o.forEach((o) => { o[0] = NEUTRAL; });
      fixedIcons++;

      if (q.e === NEUTRAL) {
        q.e = QUESTION_ALT[fixedIcons % QUESTION_ALT.length];
        movedQ++;
      }
    });
  });

  /* a question emoji equal to any option emoji is a leak too */
  bank.forEach((c) => {
    c.qs.forEach((q) => {
      if (!q.o) return;
      if (q.o.map((o) => o[0]).indexOf(q.e) >= 0) {
        q.e = QUESTION_ALT[(movedQ + 3) % QUESTION_ALT.length];
        movedQ++;
      }
    });
  });

  let out = html;
  bank.forEach((c, i) => { out = out.replace(blocks[i], serialise(c)); });
  fs.writeFileSync(path, out);
  console.log(path + ": flattened " + fixedIcons + " option-icon sets, moved " + movedQ + " question emoji");
});
