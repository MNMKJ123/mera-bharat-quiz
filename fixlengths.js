/* The correct answer was conspicuously the longest option in these, which
   teaches "pick the long one" instead of the material. The right answer is
   left exactly as it was; the three distractors are brought up to a
   comparable length. Matches on question text, so it cannot drift.
   Idempotent. */
const fs = require("fs");
const path = "src/app.html";
let s = fs.readFileSync(path, "utf8");

/* question text -> the three replacement distractor labels, in order */
const FIX = {
  "What is a 'thali' in an Indian meal?":
    ["A sweet drink served after the meal", "A dress worn at festivals", "A song sung before eating"],
  "Why do we not waste food at a festival feast?":
    ["Food costs nothing at a festival", "The rubbish bin is too far away", "There is no real reason at all"],
  "What is a 'stepwell' that we see in Rajasthan and Gujarat?":
    ["A mountain path cut into the rock", "A bridge built across a river", "A fort with tall stone walls"],
  "Why should we save water even when it rains a lot?":
    ["Because water is expensive to buy", "Because clean water is colourful", "There is no real reason at all"],
  "Which of these makes the air dirty?":
    ["Tall trees growing along the road", "Flowers opening in the morning", "Rain falling on a summer day"],
  "Why do we pump air into a bicycle tyre?":
    ["To give the tyre a brighter colour", "To make the tyre hum as it rolls", "To make the bicycle much heavier"],
  "Why can we not live on the Moon right now?":
    ["It is haunted and rather frightening", "It is far too crowded already", "The journey costs a lot of money"],
  "Does the Moon really grow bigger and smaller each night?":
    ["Yes, it slowly grows bigger each night", "Yes, it shrinks a little every night", "Yes, someone inflates it each night"],
  "What should we do before crossing a road?":
    ["Close our eyes and walk straight on", "Run across as fast as we can", "Look down at a phone while walking"],
  "What should we do if we see someone hurt on the road?":
    ["Run away quickly before anyone sees", "Laugh and carry on walking past", "Ignore it because it is not our problem"],
  "Why is honking too much a bad thing?":
    ["It costs the driver a lot of money", "It makes the car look rather ugly", "It makes the car travel more slowly"],
  "What should we check before getting off a bus?":
    ["That the music has been turned off", "That the window is properly shut", "That the clock shows the right time"],
  "Why is it safer to travel by train than by road?":
    ["Trains are always faster than cars", "Train tickets are cheaper to buy", "Trains make a great deal of noise"],
  "What should we do every 20 minutes of screen time?":
    ["Eat a sweet to keep our energy up", "Run outside for a long, fast game", "Go to sleep for a little while"],
  "Why do we wear cotton clothes in summer?":
    ["Cotton keeps the body warm and snug", "Cotton keeps the rain off our skin", "Cotton comes in the brightest colours"],
  "Why do we wear woollen clothes in winter?":
    ["Wool keeps the body cool and airy", "Wool keeps the rain off our skin", "Wool comes in the brightest colours"],
  "You see a classmate being teased. What should you do?":
    ["Join in with the teasing yourself", "Laugh along with the other children", "Walk away and say nothing at all"],
  "Your friend keeps telling lies. What should you do?":
    ["Tell a few lies along with them", "Shout at them in front of everyone", "Laugh, because the lies are funny"],
  "You do not like the food served at a friend's house. What should you do?":
    ["Say loudly that it tastes horrible", "Throw it away when nobody looks", "Get angry and refuse to sit down"],
  "You want a toy that your parents cannot afford. What should you do?":
    ["Cry in the shop until they buy it", "Get angry and refuse to go home", "Throw a tantrum in front of everyone"],
  "A classmate has a different religion from yours. How should you treat them?":
    ["Avoid them and sit somewhere else", "Tease them about what they believe", "Point at them and tell the others"],
  "A classmate cannot walk and uses a wheelchair. What should you do?":
    ["Stare at them whenever they pass", "Leave them out of all the games", "Laugh at the way they move about"],
  "You feel very angry. What is a good thing to do first?":
    ["Hit something hard to let it out", "Scream as loudly as you possibly can", "Throw things around the room"],
  "What should you do before crossing to help someone?":
    ["Run straight into the road at once", "Close your eyes and hope for the best", "Shout as loudly as you possibly can"],
  "What makes a shadow?":
    ["Water spilled across the floor", "Wind blowing hard against us", "A loud sound somewhere nearby"],
  "Plants are living, but what can they NOT do?":
    ["Grow taller as the months pass", "Breathe the air that is around them", "Need water to stay alive and well"],
  "A car can move. Why is it still NON-LIVING?":
    ["Because it moves far too fast for us", "Because it makes a great deal of noise", "Because it is painted bright colours"],
  "What does a UPS do during a power cut?":
    ["It prints out all your unsaved work", "It plays music until the power returns", "It cleans the dust off the screen"],
  "Who should decide how long you use the computer?":
    ["Only you, and nobody else at all", "The computer decides this by itself", "The family dog decides for everyone"],
  "How do computers help in a LIBRARY?":
    ["They serve food to everyone reading", "They clean the dust off the books", "They write all the books themselves"],
  "How do computers help a PUBLICATION HOUSE?":
    ["They grow crops out in the fields", "They wash and dry all the clothes", "They drive people around the city"],
  "Which ready-made shapes can you find in the Shapes tool?":
    ["Pictures of animals and nothing else", "Letters of the alphabet and nothing else", "Numbers and digits and nothing else"],
  "What is the DESKTOP on a computer?":
    ["The Start menu down in the corner", "Logging in with your name and password", "Booting up when you press the button"],
  "What does RESTRICTED mean?":
    ["General, and open to every single person", "Countless, too many to ever count", "Major, the biggest and most important"],
  "Why should screens be switched off before bedtime?":
    ["Switching them off saves a lot of money", "The room looks prettier without them", "The room becomes a great deal quieter"],
  "What is a NUCLEAR family?":
    ["Children living with grandparents too", "Everybody living in a whole village", "All the children in one school class"],
  "What is a JOINT family?":
    ["Only the parents and their children", "One person living entirely alone", "All the children in one school class"],
  "How should we treat our grandparents?":
    ["Rudely, and without listening to them", "Ignore them whenever they speak to us", "Shout at them when we want something"],
  "What does a house protect us from?":
    ["Music playing somewhere down the street", "Rainbows that appear after the rain", "Books left lying around the room"],
};

const esc = (t) => t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

/* read a JS string literal starting at the opening quote; returns [raw, endIdx] */
function readStr(str, open) {
  let i = open + 1, raw = "";
  while (i < str.length) {
    const ch = str[i];
    if (ch === "\\") { raw += ch + str[i + 1]; i += 2; continue; }
    if (ch === '"') break;
    raw += ch; i++;
  }
  return [raw, i];
}

let done = 0, already = 0, missing = [];

Object.keys(FIX).forEach((q) => {
  const needle = 'q:"' + esc(q) + '"';
  const at = s.indexOf(needle);
  if (at < 0) { missing.push(q); return; }

  const oAt = s.indexOf(',o:[', at);
  if (oAt < 0) { missing.push(q + "  (no options)"); return; }

  /* walk the four ["emoji","label"] pairs */
  let i = oAt + 4, slot = 0, edits = [], ok = true;
  while (slot < 4) {
    const pairStart = s.indexOf("[", i);
    if (pairStart < 0) { ok = false; break; }
    const e1 = s.indexOf('"', pairStart);
    const [, e1End] = readStr(s, e1);
    const l1 = s.indexOf('"', e1End + 1);
    if (l1 < 0) { ok = false; break; }
    const [label, l1End] = readStr(s, l1);
    edits.push({ start: l1 + 1, end: l1End, label });
    i = l1End + 1;
    slot++;
  }
  if (!ok || edits.length !== 4) { missing.push(q + "  (could not parse options)"); return; }

  const want = FIX[q].map(esc);
  if (edits[1].label === want[0] && edits[2].label === want[1] && edits[3].label === want[2]) { already++; return; }

  /* splice from the end so earlier offsets stay valid */
  for (let k = 3; k >= 1; k--) {
    s = s.slice(0, edits[k].start) + want[k - 1] + s.slice(edits[k].end);
  }
  done++;
});

fs.writeFileSync(path, s);
console.log("questions rebalanced: " + done + ", already done: " + already);
if (missing.length) { console.log("NOT FOUND (" + missing.length + "):"); missing.forEach((m) => console.log("  " + m)); }
