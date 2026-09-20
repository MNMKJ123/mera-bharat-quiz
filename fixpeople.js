/* Famous People had drifted into general trivia: Olympic rings, what a six
   is, which dance comes from Odisha. Those belong in Sports & Fun or
   Festivals & Culture, not here. Each one below is swapped for a question
   about an actual person, in the same subsection.
   Matches on question text, so it works on the source files and on the
   merged copy in app.html alike. Idempotent. */
const fs = require("fs");
const FILES = ["src/app.html", "src/q22-famous.js", "src/more-23.js"];

/* old question text -> the whole replacement object */
const SWAP = [
["What is the name of India's space agency?",
 '{g:"Space",e:"🧐",q:"Which scientist gave India its space programme and has the Thumba centre named after him?",o:[["🛰️","Vikram Sarabhai"],["⚛️","Homi Bhabha"],["🚀","APJ Abdul Kalam"],["🔬","CV Raman"]],h:"He founded the organisation that later launched Chandrayaan."}'],
["Which Indian mission helped prove there is water on the Moon?",
 '{g:"Space",e:"🤔",q:"Who was the SECOND person to walk on the Moon?",o:[["👨‍🚀","Buzz Aldrin"],["🌕","Neil Armstrong"],["🛰️","Michael Collins"],["🚀","Yuri Gagarin"]],h:"He stepped out just after Armstrong."}'],
["Which Indian mission landed near the Moon's south pole in 2023?",
 '{g:"Space",e:"💭",q:"Which astronaut stayed in orbit while the other two walked on the Moon?",o:[["🛰️","Michael Collins"],["🌕","Neil Armstrong"],["👨‍🚀","Buzz Aldrin"],["🚀","Alan Shepard"]],h:"Somebody had to fly the command module."}'],
["Which Indian mission went to Mars on its very first try?",
 '{g:"Space",e:"🎓",q:"After which scientist is India\'s Sriharikota launch centre named?",o:[["🛰️","Satish Dhawan"],["🚀","Vikram Sarabhai"],["⚛️","Homi Bhabha"],["🔬","CV Raman"]],h:"He led ISRO after Sarabhai."}'],
["What is the name of India's mission to study the Sun?",
 '{g:"Space",e:"📝",q:"Who was the FIRST American woman to go into space?",o:[["👩‍🚀","Sally Ride"],["👩","Valentina Tereshkova"],["👩‍🔬","Kalpana Chawla"],["👩‍✈️","Sunita Williams"]],h:"She flew on the shuttle Challenger in 1983."}'],
["What is the name of India's planned mission to send people into space?",
 '{g:"Space",e:"🔎",q:"Who was the FIRST American in space?",o:[["🚀","Alan Shepard"],["🌕","Neil Armstrong"],["👨‍🚀","Buzz Aldrin"],["🛰️","John Glenn"]],h:"He went up in 1961, soon after Gagarin."}'],
["What was the name of the lander that touched down in Chandrayaan-3?",
 '{g:"Space",e:"🧐",q:"Which Indian scientist is called the father of India\'s satellite programme?",o:[["🛰️","U R Rao"],["🚀","APJ Abdul Kalam"],["⚛️","Homi Bhabha"],["🔬","CV Raman"]],h:"He led the team that built Aryabhata."}'],
["What was India's very first satellite called?",
 '{g:"Space",e:"🤔",q:"After which ancient Indian mathematician was our first satellite named?",o:[["📐","Aryabhata"],["🔢","Ramanujan"],["🧮","Bhaskara"],["➗","Brahmagupta"]],h:"He wrote about the Earth spinning, long ago."}'],
["Which American space agency sent people to the Moon?",
 '{g:"Space",e:"💭",q:"Who founded the rocket company SpaceX?",o:[["🚀","Elon Musk"],["🛰️","Jeff Bezos"],["💻","Bill Gates"],["📱","Steve Jobs"]],h:"He also makes electric cars."}'],
["Where is India's main rocket launch centre?",
 '{g:"Space",e:"🎓",q:"Which Indian Air Force pilot flew to the Space Station in 2025?",o:[["👨‍🚀","Shubhanshu Shukla"],["🚀","Rakesh Sharma"],["🛰️","S Somanath"],["👩‍🚀","Sunita Williams"]],h:"The second Indian ever to go to space, forty-one years after the first."}'],
["Which telescope in space takes the most famous pictures of stars?",
 '{g:"Space",e:"📝",q:"Which woman was the project director of the Chandrayaan-2 mission?",o:[["👩‍🔬","Muthayya Vanitha"],["👩‍🚀","Ritu Karidhal"],["👩","Tessy Thomas"],["👩‍✈️","Kalpana Chawla"]],h:"The first woman to lead an Indian Moon mission."}'],
["Which country was the first to land near the Moon's south pole?",
 '{g:"Space",e:"🔎",q:"Who was the project director of Chandrayaan-3, which landed on the Moon?",o:[["🛬","P Veeramuthuvel"],["🚀","K Sivan"],["🛰️","S Somanath"],["👩‍🔬","Ritu Karidhal"]],h:"He led the mission that finally landed softly."}'],
["What do we call the suit an astronaut wears in space?",
 '{g:"Space",e:"🧐",q:"Which Indian rocket scientist developed the Vikas engine used by ISRO?",o:[["🚀","Nambi Narayanan"],["🛰️","U R Rao"],["⚛️","Homi Bhabha"],["🔬","Satish Dhawan"]],h:"A film was made about his life."}'],

["In which country did cricket begin?",
 '{g:"Cricket",e:"🤔",q:"Which Indian was the FIRST to score a double century in a one-day match?",o:[["🏏","Sachin Tendulkar"],["💥","Virender Sehwag"],["🧤","Rohit Sharma"],["👑","Virat Kohli"]],h:"He did it against South Africa in 2010."}'],
["How many players are there in a cricket team on the field?",
 '{g:"Cricket",e:"💭",q:"Which Indian captain has won the most Test matches for India?",o:[["👑","Virat Kohli"],["🧤","MS Dhoni"],["🧢","Sourav Ganguly"],["🏏","Sunil Gavaskar"]],h:"He captained India through their best years in Tests."}'],
["What do we call it when a batsman scores one hundred runs?",
 '{g:"Cricket",e:"🎓",q:"Which Indian cricketer is nicknamed Captain Cool?",o:[["🧤","MS Dhoni"],["👑","Virat Kohli"],["🏏","Rohit Sharma"],["🧢","Sourav Ganguly"]],h:"He never looked worried, however close the match."}'],
["What do we call the person who decides if a batsman is out?",
 '{g:"Cricket",e:"📝",q:"Which former Indian batsman coached India to the T20 World Cup win in 2024?",o:[["🧱","Rahul Dravid"],["🧤","MS Dhoni"],["🧢","Sourav Ganguly"],["🏏","Sachin Tendulkar"]],h:"As a player they called him The Wall."}'],
["How many stumps and bails make one wicket?",
 '{g:"Cricket",e:"🔎",q:"Which Indian off-spinner was famous for a delivery called the doosra?",o:[["🎯","Harbhajan Singh"],["🌀","Anil Kumble"],["🏏","Ravichandran Ashwin"],["⚡","Zaheer Khan"]],h:"Doosra means the second one."}'],
["What is the trophy called that India and Australia play for in Test cricket?",
 '{g:"Cricket",e:"🧐",q:"Which Indian fast bowler took a hat-trick at the 2019 World Cup?",o:[["⚡","Mohammed Shami"],["🎯","Jasprit Bumrah"],["🌀","Anil Kumble"],["🏏","Kapil Dev"]],h:"Three wickets in three balls, against Afghanistan."}'],
["What do we call six runs hit without the ball touching the ground?",
 '{g:"Cricket",e:"🤔",q:"Which Indian holds the highest individual score in a one-day innings?",o:[["🏏","Rohit Sharma"],["👑","Virat Kohli"],["💥","Virender Sehwag"],["🧤","Sachin Tendulkar"]],h:"He made 264, which nobody has beaten."}'],
["Which Indian city has the famous cricket ground called Eden Gardens?",
 '{g:"Cricket",e:"💭",q:"Which Indian woman was the first cricketer to play 200 one-day matches?",o:[["🏏","Mithali Raj"],["🎯","Jhulan Goswami"],["🧤","Harmanpreet Kaur"],["⭐","Smriti Mandhana"]],h:"She captained India for many years."}'],

["Which is India's national game as many people call it?",
 '{g:"Sports",e:"🎓",q:"Which Indian woman weightlifter won an Olympic silver medal in 2021?",o:[["🏋️","Mirabai Chanu"],["🥊","Mary Kom"],["🏸","PV Sindhu"],["🤼","Vinesh Phogat"]],h:"She is from Manipur, and lifts more than twice her own weight."}'],
["How many rings are there on the Olympic flag?",
 '{g:"Sports",e:"📝",q:"Which Indian wrestler won a bronze medal at the Tokyo Olympics?",o:[["🤼","Bajrang Punia"],["🥊","Vijender Singh"],["🏋️","Mirabai Chanu"],["🎯","Neeraj Chopra"]],h:"He wrestles in the 65 kilogram class."}'],
["In which sport would you find a googly and a yorker?",
 '{g:"Sports",e:"🔎",q:"Which Indian boxer won a bronze medal at the 2008 Olympics?",o:[["🥊","Vijender Singh"],["🤼","Sushil Kumar"],["🎯","Abhinav Bindra"],["🏸","Saina Nehwal"]],h:"India\'s first Olympic medal in boxing."}'],
["How often are the Summer Olympic Games held?",
 '{g:"Sports",e:"🧐",q:"Which Indian shooter won two bronze medals at the 2024 Paris Olympics?",o:[["🎯","Manu Bhaker"],["🏹","Deepika Kumari"],["🏸","PV Sindhu"],["🏋️","Mirabai Chanu"]],h:"The first Indian to win two medals at a single Olympics."}'],
["In chess, which piece can jump over the others?",
 '{g:"Sports",e:"🤔",q:"Which young Indian became World Chess Champion in 2024?",o:[["♟️","D Gukesh"],["🧠","Viswanathan Anand"],["♞","R Praggnanandhaa"],["🎯","Arjun Erigaisi"]],h:"The youngest ever to win the title, at just eighteen."}'],
["Which game is played on a board of 64 black and white squares?",
 '{g:"Sports",e:"💭",q:"Which Indian captained the hockey team to an Olympic bronze in 2021?",o:[["🏑","Manpreet Singh"],["🏏","Virat Kohli"],["⚽","Sunil Chhetri"],["🏸","Lakshya Sen"]],h:"India\'s first hockey medal in forty-one years."}'],

["On which date did India become free?",
 '{g:"Freedom",e:"🎓",q:"Which leader gave the slogan Jai Jawan Jai Kisan?",o:[["🌾","Lal Bahadur Shastri"],["🌹","Jawaharlal Nehru"],["🧓","Mahatma Gandhi"],["🛡️","Sardar Patel"]],h:"India\'s second Prime Minister, a very small and very honest man."}'],
["On which date did our Constitution come into force?",
 '{g:"Freedom",e:"📝",q:"Which Englishwoman became President of the Indian National Congress and fought for Home Rule?",o:[["🕊️","Annie Besant"],["👑","Rani Lakshmibai"],["🎤","Sarojini Naidu"],["📘","Kamala Nehru"]],h:"She started the Home Rule League with Tilak."}'],
["Which famous march did Gandhi lead to make salt from the sea?",
 '{g:"Freedom",e:"🔎",q:"Which woman doctor led the Rani Jhansi Regiment in Subhas Bose\'s army?",o:[["🩺","Lakshmi Sahgal"],["🎤","Sarojini Naidu"],["👑","Rani Lakshmibai"],["🕊️","Annie Besant"]],h:"A doctor who became a captain in the INA."}'],
["Which army did Subhas Chandra Bose lead?",
 '{g:"Freedom",e:"🧐",q:"Which freedom fighter from the north-west was called the Frontier Gandhi?",o:[["🕊️","Khan Abdul Ghaffar Khan"],["⚔️","Bhagat Singh"],["🎖️","Subhas Chandra Bose"],["📢","Bal Gangadhar Tilak"]],h:"A Pathan leader who believed in non-violence."}'],
["What did Gandhi call the path of non-violence?",
 '{g:"Freedom",e:"🤔",q:"Which revolutionary threw a bomb in the Assembly along with Bhagat Singh?",o:[["💣","Batukeshwar Dutt"],["⚔️","Chandrashekhar Azad"],["🎖️","Rajguru"],["🔫","Sukhdev"]],h:"They shouted Inquilab Zindabad and did not run away."}'],
["What is the Hindi phrase Gandhi used for self-rule?",
 '{g:"Freedom",e:"💭",q:"Which old woman was shot in Bengal while holding the tricolour and never let it fall?",o:[["🇮🇳","Matangini Hazra"],["👑","Rani Lakshmibai"],["🎤","Sarojini Naidu"],["🩺","Lakshmi Sahgal"]],h:"People called her Gandhi Buri, the old Gandhi lady."}'],

["Which dance form comes from the state of Kerala and uses big painted faces?",
 '{g:"Arts",e:"🎓",q:"Which Indian singer was famous for yodelling and also acted in films?",o:[["🎤","Kishore Kumar"],["🎶","Mohammed Rafi"],["🎵","Mukesh"],["🎼","Manna Dey"]],h:"He sang Mere Sapno Ki Rani."}'],
["Which classical dance from North India is famous for fast spins?",
 '{g:"Arts",e:"📝",q:"Which Indian playback singer sang thousands of songs and is loved for Baharon Phool Barsao?",o:[["🎶","Mohammed Rafi"],["🎤","Kishore Kumar"],["🎵","Mukesh"],["🎼","Hemant Kumar"]],h:"He could sing in almost any voice asked of him."}'],
["Which instrument does a tabla player use?",
 '{g:"Arts",e:"🔎",q:"Which Carnatic singer was the first musician to receive the Bharat Ratna?",o:[["🎵","MS Subbulakshmi"],["🎶","Lata Mangeshkar"],["🎤","Asha Bhosle"],["🎼","Bhimsen Joshi"]],h:"She sang at the United Nations in 1966."}'],
["Which instrument has many strings and is played by plucking, made famous by Ravi Shankar?",
 '{g:"Arts",e:"🧐",q:"Which dancer was the great master of Kathak in our time?",o:[["🪘","Birju Maharaj"],["💃","Rukmini Devi Arundale"],["🎭","Kelucharan Mohapatra"],["🕺","Uday Shankar"]],h:"He taught Kathak for films as well as the stage."}'],
["Which dance form comes from Odisha?",
 '{g:"Arts",e:"🤔",q:"Which dancer brought Bharatanatyam back to the stage and founded Kalakshetra?",o:[["💃","Rukmini Devi Arundale"],["🪘","Birju Maharaj"],["🎭","Kelucharan Mohapatra"],["🕺","Uday Shankar"]],h:"She started a famous dance school in Chennai."}'],
["Which Indian art form uses coloured powder on the floor at festivals?",
 '{g:"Arts",e:"💭",q:"Which artist decorated the original handwritten copy of our Constitution?",o:[["✏️","Nandalal Bose"],["🎨","MF Husain"],["🖌️","Raja Ravi Varma"],["🖼️","Amrita Sher-Gil"]],h:"He painted the borders of every page."}'],
["Which folk painting style comes from Bihar and uses bright natural colours?",
 '{g:"Arts",e:"🎓",q:"Which Indian classical singer was famous for Hindustani khayal and the song Mile Sur Mera Tumhara?",o:[["🎼","Bhimsen Joshi"],["🎵","MS Subbulakshmi"],["🎶","Lata Mangeshkar"],["🎤","Kishore Kumar"]],h:"A great voice of the Kirana gharana."}'],
];

const esc = (t) => t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

/* read the whole {..} object that starts at `from` */
function objectAt(s, from) {
  let depth = 0, i = from, inStr = false;
  while (i < s.length) {
    const ch = s[i];
    if (inStr) {
      if (ch === "\\") { i += 2; continue; }
      if (ch === '"') inStr = false;
    } else {
      if (ch === '"') inStr = true;
      else if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (depth === 0) return i + 1; }
    }
    i++;
  }
  return -1;
}

let grand = 0;
FILES.forEach((path) => {
  if (!fs.existsSync(path)) return;
  let s = fs.readFileSync(path, "utf8"), done = 0;
  SWAP.forEach(([oldQ, newObj]) => {
    const needle = 'q:"' + esc(oldQ) + '"';
    const at = s.indexOf(needle);
    if (at < 0) return;
    const start = s.lastIndexOf("{", at);
    const end = objectAt(s, start);
    if (start < 0 || end < 0) return;
    s = s.slice(0, start) + newObj + s.slice(end);
    done++;
  });
  fs.writeFileSync(path, s);
  grand += done;
  console.log(path + ": replaced " + done);
});
console.log("total replacements: " + grand);
