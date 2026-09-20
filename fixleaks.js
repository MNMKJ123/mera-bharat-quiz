/* Idempotent: rewrites any question emoji that matches one of its own four
   options, so the picture can never give the answer away. Safe to re-run. */
const fs = require("fs");

const POOL = {
  "Our India":["🇮🇳","❓","🔍","📜","🧐","💭","🎓","📖"],
  "Animals & Birds":["🐾","❓","🔍","🧐","💭","🔎","🎓","📖"],
  "Plants & Food":["🌿","❓","🔍","🧐","💭","🍽️","🎓","📖"],
  "Festivals & Culture":["🎊","❓","🔍","🧐","💭","🎆","🎓","📖"],
  "Places & Monuments":["🗺️","❓","🔍","🧐","💭","🧭","🎓","📖"],
  "Earth & Nature":["🌦️","❓","🔍","🧐","💭","🌏","🎓","📖"],
  "Space":["🌌","❓","🔍","🧐","💭","🛸","🎓","📖"],
  "Transport & Safety":["🚦","❓","🔍","🧐","💭","🛣️","🎓","📖"],
  "Body & Good Habits":["🧒","❓","🔍","🧐","💭","🪞","🎓","📖"],
  "Sports & Fun":["🎽","❓","🔍","🧐","💭","📣","🎓","📖"],
  "Life Skills":["💭","❓","🔍","🧐","🤷","💡","🎓","📖"],
  "Logical Reasoning":["🧩","❓","🤔","🧐","💭","🎓","📝","🔎"],
  "English Words":["🔤","❓","✏️","🧐","💭","🎓","📝","🔎"],
  "English Reading":["📖","❓","📚","🧐","💭","🎓","📝","🔎"],
  "Gadgets & Tech":["📱","❓","🔌","🧐","💭","🎓","📝","🔎"],
  "World Around Us":["🌍","❓","🗺️","🧐","💭","🎓","📝","🔎"],
  "Stories & Rhymes":["📚","❓","📖","🧐","💭","🎓","📝","🔎"],
  "Picture Puzzles":["🖼️","❓","🧩","🧐","💭","🎓","📐","🔎"],
  "People & Helpers":["👨‍🚒","❓","🔍","🧐","💭","🎓","📝","🤔"],
  "Maths":["🔢","🧮","❓","🤔","📝","🧐","💭","🎓"],
  "Computer":["💻","❓","🔌","🤔","🧐","💭","🎓","📝"],
  "Science":["🔬","❓","🧪","🤔","🧐","💭","🎓","📝"],
};

let html = fs.readFileSync("src/app.html", "utf8");

const START = html.indexOf("window.MBQ_BANK = (window.MBQ_BANK");
const END = html.lastIndexOf("]}]);") + "]}]);".length;
if (START < 0 || END < START) throw new Error("could not locate the data block");

global.window = {};
eval(html.slice(START, END));
const BANK = window.MBQ_BANK;

let fixed = 0;
BANK.forEach((c) => {
  const pool = POOL[c.name];
  if (!pool) { console.log("  no pool for", c.name); return; }
  let turn = 0;
  c.qs.forEach((q) => {
    const opts = q.o.map((o) => o[0]);
    if (!opts.includes(q.e)) return;
    for (let k = 0; k < pool.length; k++) {
      const cand = pool[(turn + k) % pool.length];
      if (!opts.includes(cand)) { q.e = cand; turn = (turn + k + 1) % pool.length; fixed++; return; }
    }
    q.e = "❓"; fixed++;
  });
});

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
console.log("question emojis rewritten:", fixed);
