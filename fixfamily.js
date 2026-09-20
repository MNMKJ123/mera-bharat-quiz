/* The question emoji meant the same thing as the correct answer's emoji
   (a horse-riding emoji over "which animal says neigh"). Codepoints differed,
   so the old leak check waved these through. Swaps in a neutral emoji that
   belongs to no family. Matches on question text. Idempotent. */
const fs = require("fs");
const path = "src/app.html";
let s = fs.readFileSync(path, "utf8");

/* none of these belong to an emoji family, so none can give an answer away */
const NEUTRAL = ["🧐", "🤔", "💭", "🎓", "📝", "🔎", "🔍", "❓", "🗣️", "🧠"];

const FIX = [
  "Which book tells us all the rules of our country?",
  "Which creature turns into a butterfly?",
  "What do we call a baby cow?",
  "What do we call a baby dog?",
  "What do we call a baby cat?",
  "Which animal do we ride and it says neigh?",
  "What do we call the food we eat in the morning?",
  "On which festival do we worship books and instruments of learning?",
  "What do we use to know the time?",
  "In which season does it rain a lot in India?",
  "Which water is safe for us to drink?",
  "Which month usually brings the monsoon to Kerala first?",
  "What twinkles in the sky at night?",
  "Where do aeroplanes land?",
  "Which season comes with the most sunshine and heat?",
  "Which part of a computer looks like a TV?",
  "How do computers help in a LIBRARY?",
  "What is the DESKTOP on a computer?",
  "Unscramble OORTNMI to find a computer part.",
  "What is the FEMALE word for COCK?",
  "What do we call the first page that shows a book's name and picture?",
];

const esc = (t) => t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
let done = 0, missing = [];

FIX.forEach((q, n) => {
  const needle = 'q:"' + esc(q) + '"';
  const at = s.indexOf(needle);
  if (at < 0) { missing.push(q); return; }

  /* the object opens with {e:"..." just before this question */
  const eAt = s.lastIndexOf('{e:"', at);
  if (eAt < 0 || at - eAt > 40) { missing.push(q + "  (no emoji field)"); return; }
  let i = eAt + 4, cur = "";
  while (i < s.length) {
    const ch = s[i];
    if (ch === "\\") { cur += s[i] + s[i + 1]; i += 2; continue; }
    if (ch === '"') break;
    cur += ch; i++;
  }
  const want = NEUTRAL[n % NEUTRAL.length];
  if (cur === want) return;              /* already neutral */
  s = s.slice(0, eAt + 4) + want + s.slice(i);
  done++;
});

fs.writeFileSync(path, s);
console.log("question emoji neutralised: " + done);
if (missing.length) { console.log("NOT FOUND (" + missing.length + "):"); missing.forEach((m) => console.log("  " + m)); }
