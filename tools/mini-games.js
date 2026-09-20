/* Replaces the one-off Count It block in src/app.html with a shared
   mini-game engine plus five games built on it. Run once:
     node tools/mini-games.js
   Idempotent: refuses if the engine is already there. */
const fs = require("fs");
const path = "src/app.html";
let s = fs.readFileSync(path, "utf8");

if (s.indexOf("MINI GAMES") >= 0) { console.log("already installed"); process.exit(0); }

const START = "  /* ---------- COUNT IT ----------";
const END = '  $("c-back").addEventListener("click", function(){ sfxTap(); renderGames(); show("games"); paintModeBar("games"); });';

const a = s.indexOf(START);
const b = s.indexOf(END);
if (a < 0 || b < 0) { console.log("could not find the Count It block"); process.exit(1); }

const ENGINE = String.raw`  /* ---------- MINI GAMES ----------
     Five little games that all have the same shape: ten rounds, a picture
     or a line of text, four answers, a score. Each game only has to say
     what one round looks like; everything else is shared. */
  var MINI = {}, mini = null, miniScore = 0, miniRound = 0, miniLock = false, miniAnswer = null;
  var MINI_TOTAL = 10;

  function miniPips(){
    var p = $("c-pips"); p.innerHTML = "";
    for(var i=0;i<MINI_TOTAL;i++){
      var el = document.createElement("i");
      if(i < miniRound) el.className = "hit";
      p.appendChild(el);
    }
  }
  function startMini(key){
    mini = MINI[key];
    if(!mini) return;
    miniScore = 0; miniRound = 0;
    $("c-title").textContent = mini.icon + " " + mini.name;
    $("c-score").textContent = "0";
    show("count"); paintModeBar("games");
    miniNext();
  }
  function miniNext(){
    miniLock = false;
    if(miniRound >= MINI_TOTAL){
      $("c-q").textContent = "All done! You got " + miniScore + " out of " + MINI_TOTAL + ".";
      $("c-fig").innerHTML = "";
      $("c-opts").innerHTML = "";
      sfxTada(); burst(120, window.innerHeight * 0.3);
      say(["All done! You got " + miniScore + " out of " + MINI_TOTAL + "."]);
      var again = document.createElement("button");
      again.className = "sticker bigbtn go";
      again.textContent = "🔁 Play again";
      again.addEventListener("click", function(){ sfxTap(); startMini(mini.key); });
      $("c-opts").appendChild(again);
      return;
    }
    var r = mini.round();
    miniAnswer = r.answer;
    $("c-fig").innerHTML = r.fig || "";
    $("c-q").textContent = r.q;
    miniPips();

    var box = $("c-opts"); box.innerHTML = "";
    shuffle(r.options).forEach(function(v){
      var btn = document.createElement("button");
      btn.className = "sticker opt";
      btn.innerHTML = (v.pic ? '<span class="oe" aria-hidden="true">' + v.pic + '</span>' : "") +
                      '<span class="ot">' + v.label + '</span>';
      btn.setAttribute("aria-label", v.say || v.label);
      btn.addEventListener("click", function(){ miniPick(btn, v); });
      box.appendChild(btn);
    });
    if(autoRead && r.speak !== false) say([r.q]);
  }
  function miniPick(btn, v){
    if(miniLock) return;
    miniLock = true;
    var right = (v.label === miniAnswer.label);
    if(right){
      miniScore++; $("c-score").textContent = miniScore;
      btn.classList.add("right");
      sfxRight(1); burst(30, window.innerHeight * 0.55);
      if(tutor) say([line("right")]);
    } else {
      btn.classList.add("wrong"); sfxWrong();
      var all = $("c-opts").querySelectorAll(".opt");
      for(var i=0;i<all.length;i++){
        if(all[i].querySelector(".ot").textContent === String(miniAnswer.label)) all[i].classList.add("right");
      }
      if(tutor) say([line("wrong"), (miniAnswer.say || miniAnswer.label) + "."]);
    }
    miniRound++;
    miniPips();
    setTimeout(miniNext, 1500);
  }
  function pick1(a){ return a[Math.floor(Math.random() * a.length)]; }
  function opt(label, extra){
    var o = { label: String(label) };
    if(extra) { if(extra.pic) o.pic = extra.pic; if(extra.say) o.say = extra.say; }
    return o;
  }

  /* --- Count It: how many shapes are there? --- */
  var COUNT_SHAPES = ["circle","square","triangle","star","heart","hexagon","diamond"];
  var COUNT_COLS = ["red","blue","green","yellow","purple","orange","pink"];
  MINI.count = { key:"count", icon:"🔢", name:"Count It", round:function(){
    var n = 3 + Math.floor(Math.random() * 10);
    var shape = pick1(COUNT_SHAPES), col = pick1(COUNT_COLS), items = [];
    for(var i=0;i<n;i++) items.push(shape + " " + col);
    var nums = [n], guard = 0;
    while(nums.length < 4 && guard++ < 60){
      var d = n + (Math.floor(Math.random()*5) - 2);
      if(d >= 1 && nums.indexOf(d) < 0) nums.push(d);
    }
    while(nums.length < 4) nums.push(n + nums.length);
    return { fig: svgFor({ k:"grid", items:items, cols: n > 6 ? 4 : 3 }),
             q: "How many can you count?",
             answer: opt(n), options: nums.map(function(v){ return opt(v); }) };
  }};

  /* --- Missing Letter: one letter has fallen out of the word --- */
  var MW = ["ELEPHANT","MONKEY","BANANA","SCHOOL","FLOWER","WINTER","PENCIL","BRIDGE",
            "CRICKET","FAMILY","TIGER","MANGO","RIVER","GARDEN","CANDLE","ROCKET",
            "DOCTOR","BASKET","ORANGE","PARROT","TEMPLE","MARKET","SUMMER","PEACOCK"];
  MINI.letter = { key:"letter", icon:"🔤", name:"Missing Letter", round:function(){
    var w = pick1(MW), i = 1 + Math.floor(Math.random() * (w.length - 2));
    var miss = w[i], shown = w.slice(0, i) + "_" + w.slice(i + 1);
    var letters = [miss], A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", guard = 0;
    while(letters.length < 4 && guard++ < 80){
      var c = A[Math.floor(Math.random() * 26)];
      if(letters.indexOf(c) < 0) letters.push(c);
    }
    return { fig: '<div style="font-size:30px;font-weight:800;letter-spacing:3px">' + shown + "</div>",
             q: "Which letter is missing?",
             answer: opt(miss), options: letters.map(function(c){ return opt(c); }) };
  }};

  /* --- Quick Maths: a sum or a take-away, answers within twenty --- */
  MINI.maths = { key:"maths", icon:"🧮", name:"Quick Maths", round:function(){
    var plus = Math.random() < 0.55, a, b, ans, text;
    if(plus){
      a = 1 + Math.floor(Math.random()*10); b = 1 + Math.floor(Math.random()*10);
      ans = a + b; text = a + " + " + b + " = ?";
    } else {
      a = 3 + Math.floor(Math.random()*15); b = 1 + Math.floor(Math.random()*a);
      ans = a - b; text = a + " - " + b + " = ?";
    }
    var nums = [ans], guard = 0;
    while(nums.length < 4 && guard++ < 60){
      var d = ans + (Math.floor(Math.random()*7) - 3);
      if(d >= 0 && nums.indexOf(d) < 0) nums.push(d);
    }
    while(nums.length < 4) nums.push(ans + nums.length + 1);
    return { fig: '<div style="font-size:32px;font-weight:800">' + text + "</div>",
             q: plus ? "What do they add up to?" : "What is left?",
             answer: opt(ans), options: nums.map(function(v){ return opt(v); }) };
  }};

  /* --- Odd One Out: three belong together and one does not --- */
  var ODD = [
    { n:"animals",    it:[["🐶","Dog"],["🐱","Cat"],["🐘","Elephant"],["🦁","Lion"],["🐯","Tiger"],["🐮","Cow"],["🐷","Pig"],["🐵","Monkey"]] },
    { n:"fruits",     it:[["🍎","Apple"],["🍌","Banana"],["🍇","Grapes"],["🍊","Orange"],["🥭","Mango"],["🍓","Strawberry"],["🍍","Pineapple"],["🍉","Watermelon"]] },
    { n:"vehicles",   it:[["🚗","Car"],["🚌","Bus"],["🚂","Train"],["✈️","Aeroplane"],["🚲","Bicycle"],["🚤","Boat"],["🚚","Lorry"],["🛵","Scooter"]] },
    { n:"birds",      it:[["🦜","Parrot"],["🦅","Eagle"],["🦉","Owl"],["🕊️","Dove"],["🐦","Sparrow"],["🦆","Duck"],["🦢","Swan"],["🐧","Penguin"]] },
    { n:"vegetables", it:[["🥕","Carrot"],["🥔","Potato"],["🧅","Onion"],["🍅","Tomato"],["🌽","Corn"],["🥦","Broccoli"],["🫑","Capsicum"],["🥒","Cucumber"]] },
    { n:"clothes",    it:[["👕","Shirt"],["👖","Trousers"],["👗","Frock"],["🧥","Coat"],["🧦","Socks"],["🧣","Scarf"],["👒","Hat"],["👟","Shoes"]] },
    { n:"body parts", it:[["👁️","Eye"],["👂","Ear"],["👃","Nose"],["👄","Mouth"],["✋","Hand"],["🦶","Foot"],["🦵","Leg"],["🦷","Tooth"]] },
    { n:"weather",    it:[["☀️","Sun"],["🌧️","Rain"],["⛈️","Storm"],["❄️","Snow"],["🌈","Rainbow"],["☁️","Cloud"],["🌪️","Whirlwind"],["🌫️","Fog"]] }
  ];
  MINI.odd = { key:"odd", icon:"🎯", name:"Odd One Out", round:function(){
    var i = Math.floor(Math.random()*ODD.length), j = i;
    while(j === i) j = Math.floor(Math.random()*ODD.length);
    var same = shuffle(ODD[i].it).slice(0, 3), other = pick1(ODD[j].it);
    var picks = same.map(function(p){ return opt(p[1], { pic:p[0] }); });
    picks.push(opt(other[1], { pic:other[0] }));
    return { fig:"", q:"Which one does NOT belong?",
             answer: opt(other[1]), options: picks };
  }};

  /* --- Shape Match: find the one that matches the picture above --- */
  MINI.shape = { key:"shape", icon:"🔷", name:"Shape Match", round:function(){
    var shape = pick1(COUNT_SHAPES), col = pick1(COUNT_COLS);
    var names = { circle:"Circle", square:"Square", triangle:"Triangle", star:"Star",
                  heart:"Heart", hexagon:"Hexagon", diamond:"Diamond" };
    var others = COUNT_SHAPES.filter(function(x){ return x !== shape; });
    var three = shuffle(others).slice(0, 3);
    var picks = [opt(names[shape], { pic: svgFor({ k:"one", item: shape + " " + col }) })];
    three.forEach(function(x){
      picks.push(opt(names[x], { pic: svgFor({ k:"one", item: x + " " + col }) }));
    });
    return { fig: svgFor({ k:"one", item: shape + " " + col }),
             q: "Which one is the same shape?",
             answer: opt(names[shape]), options: picks };
  }};

  $("c-home").addEventListener("click", function(){ sfxTap(); goHome(); });`;

s = s.slice(0, a) + ENGINE + "\n" + s.slice(b);
fs.writeFileSync(path, s);
console.log("mini-game engine installed, replacing " + (b - a) + " characters");
