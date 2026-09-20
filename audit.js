/* Maps the existing question bank onto the official SOF chapter list and
   reports what is covered, thin, or missing entirely. */
const fs = require("fs");
const SOF = require("./src/syllabus.js");

const html = fs.readFileSync("src/app.html", "utf8");
const START = html.indexOf("window.MBQ_BANK = (window.MBQ_BANK");
const END = html.lastIndexOf("]}]);") + "]}]);".length;
global.window = {};
eval(html.slice(START, END));
const BANK = window.MBQ_BANK;
const count = (n) => { const c = BANK.find((x) => x.name === n); return c ? c.qs.length : 0; };

/* Which of my subjects feed which official chapter. "" = nothing yet. */
const MAP = {
  /* IGKO */
  "Me and My Surroundings":       ["Body & Good Habits", "Transport & Safety"],
  "Plants and Animals":           ["Animals & Birds", "Plants & Food"],
  "India and the World":          ["Our India", "Places & Monuments", "Festivals & Culture"],
  "Science and Technology":       ["Science", "Space", "Computer"],
  "Language and Literature":      [],
  "Earth and Its Environment":    ["Earth & Nature"],
  "Sports":                       ["Sports & Fun"],
  "Maths Fun":                    ["Maths"],
  "Current Affairs and Developments": [],
  "Kindness":                     ["Life Skills"],
  "Soft Skills":                  ["Life Skills"],
  "Social Skills":                ["Life Skills"],
  "Do's and Don'ts":              ["Life Skills"],
  /* Logical Reasoning, shared by IMO / ISO / ICSO */
  "Patterns":                     ["Logical Reasoning"],
  "Odd One Out":                  ["Logical Reasoning"],
  "Measuring Units":              ["Logical Reasoning"],
  "Geometrical Shapes":           ["Logical Reasoning"],
  "Spatial Understanding":        [],
  "Grouping of Figures":          ["Logical Reasoning"],
  "Analogy":                      ["Logical Reasoning"],
  "Ranking Test":                 ["Logical Reasoning"],
  "Problems based on Figures":    [],
  /* IMO */
  "Numerals":                     ["Maths"],
  "Number Names":                 ["Maths"],
  "Number Sense (2-digit)":       ["Maths"],
  "Addition":                     ["Maths"],
  "Subtraction":                  ["Maths"],
  "Lengths, Weights and Comparisons": ["Maths"],
  "Time":                         ["Maths"],
  "Money":                        ["Maths"],
  "Geometrical Shapes and Solids":["Maths"],
  "Everyday problems using the Section 2 topics": ["Maths"],
  /* ISO */
  "Living and Non-living Things": ["Science"],
  "Plants":                       ["Plants & Food"],
  "Animals":                      ["Animals & Birds"],
  "Human Beings and Their Needs": ["Body & Good Habits"],
  "Good Habits and Safety Rules": ["Body & Good Habits", "Transport & Safety"],
  "Air and Water":                ["Earth & Nature", "Science"],
  "Weather and The Sky":          ["Earth & Nature", "Space"],
  /* ICSO */
  "Introduction to Computers":    ["Computer"],
  "Parts of Computer":            ["Computer"],
  "Uses of Computer":             ["Computer"],
  "Keys and Keyboard":            ["Computer"],
  "Computer Mouse":               ["Computer"],
  "Starting and Shutting Down the Computer": ["Computer"],
  "Introduction to MS-Paint":     ["Computer"],
  "IT Gadgets":                   [], "Devices": [], "Apps": [],
  "Computerization": [], "Developments in IT": [],
  "Higher Order Thinking":        ["Life Skills"],
};

let missing = [], thin = [], ok = 0, totalCh = 0;

for (const key of Object.keys(SOF)) {
  const p = SOF[key];
  console.log("\n=== " + p.name + " — " + p.full);
  console.log("    " + p.total + " questions / " + p.marks + " marks / " + p.mins + " min");
  for (const sec of p.sections) {
    console.log("  " + sec.code + " " + sec.name + "  (" + sec.q + " q x " + sec.each + ")");
    for (const ch of sec.chapters) {
      totalCh++;
      const src = MAP[ch];
      if (src === undefined) { console.log("      ??  " + ch + "  (unmapped)"); continue; }
      if (src.length === 0) { console.log("      --  " + ch + "   NOTHING"); missing.push(p.name + " / " + ch); continue; }
      const n = src.reduce((a, s) => a + count(s), 0);
      console.log("      ok  " + ch + "   <- " + src.join(", ") + " (" + n + " q)");
      ok++;
    }
  }
}

console.log("\n" + "=".repeat(60));
console.log("chapters in the official syllabus :", totalCh);
console.log("chapters with some coverage       :", ok);
console.log("chapters with NOTHING             :", missing.length);
console.log("\nNOT COVERED AT ALL:");
missing.forEach((m) => console.log("   - " + m));
