/* Rewrites hints that handed over the answer. Matches on question text, not
   index, so it cannot drift. Idempotent: re-running changes nothing. */
const fs = require("fs");
const path = "src/app.html";
let s = fs.readFileSync(path, "utf8");

const FIX = [
  ["Which colour is at the TOP of our flag?",
   "It stands for courage, and it sits above the white."],
  ["Which is our national river?",
   "She comes down from the Himalayas, and people pray to her at Varanasi."],
  ["What do we call a person who belongs to India?",
   "Take the country's name and add -n to the end."],
  ["Which bird wakes us up in the morning?",
   "It crows from the farmyard the moment the sun comes up."],
  ["Which food do we get from the sea?",
   "People go out in boats and catch it in big nets."],
  ["Which fruit is given to sick people because it is easy to digest?",
   "One a day, and the doctor stays away."],
  ["What is the name of the little rover Chandrayaan-3 carried?",
   "Its name is the Sanskrit word for wisdom."],
  ["What should a car do at a red light?",
   "Red never means go. It means the opposite."],
  ["Which drink is best right after playing in the sun?",
   "You lost it as sweat. Put the same plain, clear thing back."],
  ["How many stumps are there on one side in cricket?",
   "Two bails rest across the top, and there is one more stump than bails."],
  ["In which Indian game do you hold your breath and chant?",
   "You chant the game's own name over and over while you raid."],
  ["Which sign means ADD?",
   "Two short lines crossing: one standing up, one lying down."],
  ["Sita is taller than Meena. Meena is taller than Rani. Who is the TALLEST?",
   "Stand all three in a line, tallest at the front. Who is first?"],
  ["What comes next in this SHAPE pattern: 🔺 🔺 ⚪ 🔺 🔺 ⚪ __ ?",
   "The same little group keeps repeating, and you have just finished one."],
  ["Amit is shorter than Ravi. Ravi is shorter than Sohan. Who is SHORTEST?",
   "Stand all three in a line, shortest at the front. Who is first?"],
  ["Choose the right word: I have ___ pencils in my bag.",
   "Pencils can be counted one by one. Which word suits countable things?"],
  ["Which word goes with things we CAN count?",
   "Apples you can count. Milk you cannot."],
  ["Which word goes with things we CANNOT count?",
   "Water, sugar and rice come in amounts, not in ones and twos."],
  ["Choose the right word: There are only ___ mangoes left on the tree.",
   "A little is for things you cannot count. Mangoes you can."],
  ["Choose the right word: Ratna sat ___ Sonu and Palak.",
   "Among is for three or more. Here there are only two."],
  ["Which word do we use for THREE or more people?",
   "Between is for two only. A whole group needs the other word."],
  ["Which word usually tells us a sentence is about the FUTURE?",
   "Three of these point backwards in time. Only one points ahead."],
  ["Which colour comes NEXT?",
   "The first three colours keep repeating. Count where you have reached."],
  ["How many GROUPS OF 3 can you make?",
   "Count all the stars, then share them into piles of 3."],
];

/* JS-string-escape a value the way the bank is serialised */
const esc = (t) => t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

let done = 0, missing = [], already = 0;

FIX.forEach(([q, hint]) => {
  const needle = 'q:"' + esc(q) + '"';
  const at = s.indexOf(needle);
  if (at < 0) { missing.push(q); return; }

  /* from the question, find that object's h:"..." (respecting escapes) */
  const hAt = s.indexOf(',h:"', at);
  if (hAt < 0) { missing.push(q + "  (no hint field)"); return; }
  let i = hAt + 4, out = "";
  while (i < s.length) {
    const ch = s[i];
    if (ch === "\\") { out += s[i] + s[i + 1]; i += 2; continue; }
    if (ch === '"') break;
    out += ch; i++;
  }
  if (out === esc(hint)) { already++; return; }
  s = s.slice(0, hAt + 4) + esc(hint) + s.slice(i);
  done++;
});

fs.writeFileSync(path, s);
console.log("hints rewritten: " + done + ", already correct: " + already);
if (missing.length) { console.log("NOT FOUND (" + missing.length + "):"); missing.forEach((m) => console.log("  " + m)); }
