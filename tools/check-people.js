/* Famous People should be about people. Flags any question whose correct
   answer is not a person's name, so general trivia does not creep in. */
const fs = require("fs");
const h = fs.readFileSync("index.html", "utf8");
global.window = {};
global.document = { querySelector: () => null, getElementById: () => null, addEventListener: () => {} };
const re = /window\.MBQ_BANK = \(window\.MBQ_BANK \|\| \[\]\)\.concat\(\[\{[\s\S]*?\n\]\}\]\);/g;
(h.match(re) || []).forEach((b) => eval(b));

const fam = (window.MBQ_BANK || []).find((c) => c.name === "Famous People");
if (!fam) { console.log("no Famous People subject"); process.exit(1); }

/* A person's name: two or more capitalised words, or one capitalised word
   that is not a bare common noun. Organisations count as not-a-person. */
const NOT_PEOPLE = /^(A |An |The |Every |Eleven|Nine|Ten|Twelve|Five|Four|Six|Three|Yes|No)/;
const ORGS = /^(ISRO|NASA|ESA|JAXA|DRDO|INSAT)$/;

/* People known by a single name, or by a family name in the plural. */
const ONE_NAME = /^(Aryabhata|Galileo|Copernicus|Ramanujan|Bhaskara|Brahmagupta|Jhalkaribai|Euclid|Newton|Einstein|Edison|Marconi|Hubble)$/;
const BROTHERS = /\b(brothers|sisters)\b/i;

const bad = [];
fam.qs.forEach((q, i) => {
  const a = String(q.o[0][1]).trim();
  let looksLikePerson = /^[A-Z][a-z]+(\s+[A-Z][A-Za-z.'-]+)+$/.test(a)   /* Two Capitalised Words */
                     || /^([A-Z]\s*){1,3}[A-Z][a-z]+/.test(a)            /* MS Dhoni, U R Rao, PV Sindhu */
                     || /^(Dr|Sir|Rani|Mother|Lala|Sardar|Khan)\b/.test(a)
                     || ONE_NAME.test(a)                                  /* Galileo, Aryabhata */
                     || BROTHERS.test(a);                                 /* The Wright brothers */
  if (ORGS.test(a)) looksLikePerson = false;
  if (NOT_PEOPLE.test(a) && !BROTHERS.test(a)) looksLikePerson = false;
  if (!looksLikePerson) bad.push({ i, g: q.g, q: q.q, a });
});

const byGroup = {};
bad.forEach((b) => { (byGroup[b.g] = byGroup[b.g] || []).push(b); });

console.log("Famous People: " + fam.qs.length + " questions, " + bad.length + " whose answer is not a person\n");
Object.keys(byGroup).forEach((g) => {
  console.log("-- " + g + " (" + byGroup[g].length + ")");
  byGroup[g].forEach((b) => console.log("   [" + b.i + "] " + b.q + "   -> " + b.a));
});
