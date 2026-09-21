/* IMO Mathematics workbook: number sense, addition, subtraction, lengths and
   weights, time, money, geometrical shapes. This is the paper that had the
   thinnest pool, so this is the biggest batch. */
module.exports = {
"Maths": [
/* --- number sense --- */
{e:"🔢",q:"Which number comes just BEFORE 40?",o:[["3️⃣9️⃣","39"],["4️⃣1️⃣","41"],["3️⃣0️⃣","30"],["4️⃣4️⃣","44"]],h:"One step back on the number line."},
{e:"🧮",q:"Which number comes just AFTER 59?",o:[["6️⃣0️⃣","60"],["5️⃣8️⃣","58"],["6️⃣9️⃣","69"],["5️⃣0️⃣","50"]],h:"One more than fifty-nine."},
{e:"📏",q:"Which number lies BETWEEN 27 and 29?",o:[["2️⃣8️⃣","28"],["2️⃣6️⃣","26"],["3️⃣0️⃣","30"],["2️⃣5️⃣","25"]],h:"Squeezed right in the middle of those two."},
{e:"🧮",q:"How many TENS are there in 70?",o:[["7️⃣","7"],["🔟","10"],["0️⃣","0"],["1️⃣7️⃣","17"]],h:"Ten, twenty, thirty... keep counting up to seventy."},
{e:"🔢",q:"In the number 46, which digit is in the TENS place?",o:[["4️⃣","4"],["6️⃣","6"],["🔟","10"],["0️⃣","0"]],h:"The one on the left."},
{e:"🧮",q:"In the number 83, which digit is in the ONES place?",o:[["3️⃣","3"],["8️⃣","8"],["1️⃣","1"],["0️⃣","0"]],h:"The one on the right."},
{e:"📏",q:"Which is the GREATEST of these numbers: 34, 43, 29, 41?",o:[["4️⃣3️⃣","43"],["3️⃣4️⃣","34"],["4️⃣1️⃣","41"],["2️⃣9️⃣","29"]],h:"Compare the tens digit first."},
{e:"🔟",q:"Which is the SMALLEST of these numbers: 52, 25, 45, 54?",o:[["2️⃣5️⃣","25"],["4️⃣5️⃣","45"],["5️⃣2️⃣","52"],["5️⃣4️⃣","54"]],h:"Compare the tens digit first."},
{e:"🔢",q:"What is the EXPANDED form of 57?",o:[["➕","50 + 7"],["➕","5 + 7"],["➕","500 + 7"],["➕","5 + 70"]],h:"Five tens, and seven ones."},
{e:"🧮",q:"Which number is 10 MORE than 34?",o:[["4️⃣4️⃣","44"],["3️⃣5️⃣","35"],["2️⃣4️⃣","24"],["4️⃣3️⃣","43"]],h:"Only the tens digit changes."},
{e:"📏",q:"Which number is 10 LESS than 62?",o:[["5️⃣2️⃣","52"],["6️⃣1️⃣","61"],["7️⃣2️⃣","72"],["6️⃣0️⃣","60"]],h:"Only the tens digit changes."},
{e:"📈",q:"Count in twos: 2, 4, 6, 8, ___",o:[["🔟","10"],["9️⃣","9"],["1️⃣2️⃣","12"],["7️⃣","7"]],h:"Keep adding two each time."},
{e:"🔢",q:"Count in fives: 5, 10, 15, 20, ___",o:[["2️⃣5️⃣","25"],["2️⃣1️⃣","21"],["3️⃣0️⃣","30"],["2️⃣2️⃣","22"]],h:"Keep adding five each time."},
{e:"🧮",q:"Which of these is an EVEN number?",o:[["8️⃣","8"],["7️⃣","7"],["5️⃣","5"],["9️⃣","9"]],h:"You can share it into two equal groups."},
{e:"📏",q:"Which of these is an ODD number?",o:[["7️⃣","7"],["4️⃣","4"],["6️⃣","6"],["8️⃣","8"]],h:"Share it into two and one is always left over."},
{e:"🔟",q:"Which is the FOURTH letter in the word GARDEN?",o:[["🔤","D"],["🔤","R"],["🔤","E"],["🔤","G"]],h:"Count G, A, R, then one more."},
{e:"🔢",q:"Ravi is 5th in a queue of 9 children. How many are BEHIND him?",o:[["4️⃣","4"],["5️⃣","5"],["3️⃣","3"],["9️⃣","9"]],h:"Nine altogether, and five of them are him and those ahead."},

/* --- addition and subtraction --- */
{e:"➕",q:"Priya has two ropes, 25 cm and 42 cm. What is the total length?",o:[["6️⃣7️⃣","67 cm"],["6️⃣5️⃣","65 cm"],["5️⃣5️⃣","55 cm"],["5️⃣7️⃣","57 cm"]],h:"Add the tens, then add the ones."},
{e:"🧮",q:"There are 34 boys and 25 girls in a class. How many children in all?",o:[["5️⃣9️⃣","59"],["5️⃣1️⃣","51"],["6️⃣9️⃣","69"],["4️⃣9️⃣","49"]],h:"Thirty and twenty, then four and five."},
{e:"➖",q:"A shop had 48 balloons. 23 were sold. How many are left?",o:[["2️⃣5️⃣","25"],["7️⃣1️⃣","71"],["2️⃣1️⃣","21"],["3️⃣5️⃣","35"]],h:"Take away the tens, then the ones."},
{e:"➕",q:"What is 26 + 13?",o:[["3️⃣9️⃣","39"],["3️⃣8️⃣","38"],["4️⃣9️⃣","49"],["1️⃣3️⃣","13"]],h:"Twenty and ten, then six and three."},
{e:"➖",q:"What is 55 - 21?",o:[["3️⃣4️⃣","34"],["3️⃣6️⃣","36"],["7️⃣6️⃣","76"],["2️⃣4️⃣","24"]],h:"Fifty take twenty, then five take one."},
{e:"🧮",q:"Meena had 30 marbles. She gave 12 away. How many are left?",o:[["1️⃣8️⃣","18"],["4️⃣2️⃣","42"],["2️⃣2️⃣","22"],["1️⃣2️⃣","12"]],h:"Thirty take ten leaves twenty, then take two more."},
{e:"➕",q:"A basket has 15 apples and 17 oranges. How many fruits altogether?",o:[["3️⃣2️⃣","32"],["2️⃣2️⃣","22"],["3️⃣0️⃣","30"],["2️⃣8️⃣","28"]],h:"Ten and ten, then five and seven."},
{e:"➖",q:"Which sum gives the SAME answer as 9 + 6?",o:[["➕","7 + 8"],["➕","9 + 5"],["➕","6 + 6"],["➕","8 + 6"]],h:"Work out 9 + 6 first, then test each one."},
{e:"🧮",q:"Fill the blank: 8 + ___ = 15",o:[["7️⃣","7"],["6️⃣","6"],["8️⃣","8"],["5️⃣","5"]],h:"How far is it from eight up to fifteen?"},
{e:"➕",q:"Fill the blank: ___ - 4 = 12",o:[["1️⃣6️⃣","16"],["8️⃣","8"],["1️⃣4️⃣","14"],["1️⃣2️⃣","12"]],h:"Put the four back on."},

/* --- length, weight and comparison --- */
{e:"📏",q:"Which of these would you measure in CENTIMETRES?",o:[["✏️","A pencil"],["🛣️","A long road"],["🏔️","A mountain"],["🌊","A river"]],h:"Something small enough to hold."},
{e:"⚖️",q:"Which is HEAVIER, a watermelon or a grape?",o:[["🍉","A watermelon"],["🍇","A grape"],["🟰","Both the same"],["❓","We cannot tell"]],h:"Imagine holding one in each hand."},
{e:"📐",q:"A ruler in your box is usually how long?",o:[["1️⃣5️⃣","15 centimetres"],["1️⃣5️⃣","15 metres"],["1️⃣","1 centimetre"],["1️⃣0️⃣0️⃣","100 metres"]],h:"It fits inside a pencil box."},
{e:"⚖️",q:"On a balance, one side goes DOWN. What does that mean?",o:[["⬇️","That side is heavier"],["⬆️","That side is lighter"],["🟰","Both sides are equal"],["❓","Nothing at all"]],h:"Heavier things sink down."},
{e:"📏",q:"Arrange from SHORTEST to LONGEST: a bus, a pencil, a bicycle.",o:[["📊","Pencil, bicycle, bus"],["📊","Bus, bicycle, pencil"],["📊","Bicycle, pencil, bus"],["📊","Pencil, bus, bicycle"]],h:"Start with the one that fits in your hand."},
{e:"📐",q:"Which holds MORE water?",o:[["🪣","A bucket"],["🥄","A spoon"],["🥤","A glass"],["🍵","A cup"]],h:"The biggest container of the four."},
{e:"⚖️",q:"If a book weighs the same as 6 cubes, and a pen weighs the same as 2 cubes, how many cubes heavier is the book?",o:[["4️⃣","4"],["8️⃣","8"],["6️⃣","6"],["2️⃣","2"]],h:"Take the pen's cubes away from the book's."},

/* --- time --- */
{e:"📅",q:"Which month of the year has neither 30 nor 31 days?",o:[["2️⃣","February"],["1️⃣","January"],["3️⃣","March"],["5️⃣","May"]],h:"The shortest month of them all."},
{e:"🕐",q:"Which month comes after October but before December?",o:[["1️⃣1️⃣","November"],["1️⃣","January"],["8️⃣","August"],["9️⃣","September"]],h:"The eleventh month."},
{e:"📅",q:"Which is the EIGHTH month of a year?",o:[["8️⃣","August"],["7️⃣","July"],["🔟","October"],["9️⃣","September"]],h:"Count from January on your fingers."},
{e:"🕐",q:"In a LEAP year, how many days does February have?",o:[["2️⃣9️⃣","29"],["2️⃣8️⃣","28"],["3️⃣0️⃣","30"],["3️⃣1️⃣","31"]],h:"One extra day, once every four years."},
{e:"📅",q:"If today is Monday, what will the day after tomorrow be?",o:[["3️⃣","Wednesday"],["2️⃣","Tuesday"],["5️⃣","Friday"],["6️⃣","Saturday"]],h:"Count forward two days, not one."},
{e:"🕐",q:"How many days are there in 3 weeks?",o:[["2️⃣1️⃣","21"],["1️⃣4️⃣","14"],["7️⃣","7"],["2️⃣8️⃣","28"]],h:"Seven days in every week."},
{e:"📅",q:"How many months of a year have 31 days?",o:[["7️⃣","7"],["4️⃣","4"],["6️⃣","6"],["8️⃣","8"]],h:"Use your knuckles: the bumps are the long months."},
{e:"🕐",q:"Which comes just after the eighth month of a year?",o:[["9️⃣","September"],["8️⃣","August"],["🔟","October"],["7️⃣","July"]],h:"The ninth month."},
{e:"📅",q:"Which activity do you usually do in the EVENING?",o:[["🍽️","Having dinner"],["🌅","Waking up"],["🏫","Going to school"],["🌞","Morning exercise"]],h:"After the sun has gone down."},
{e:"🕐",q:"How many hours are there in one day?",o:[["2️⃣4️⃣","24"],["1️⃣2️⃣","12"],["6️⃣0️⃣","60"],["3️⃣0️⃣","30"]],h:"Twelve in the day and twelve in the night."},
{e:"📅",q:"How many minutes are there in one hour?",o:[["6️⃣0️⃣","60"],["2️⃣4️⃣","24"],["3️⃣0️⃣","30"],["1️⃣0️⃣0️⃣","100"]],h:"The same as the number of seconds in a minute."},
{e:"🕐",q:"Put these in the right order for a school day: going to school, assembly, studying, coming home.",o:[["📊","Going to school, assembly, studying, coming home"],["📊","Assembly, studying, going to school, coming home"],["📊","Studying, assembly, going to school, coming home"],["📊","Coming home, going to school, assembly, studying"]],h:"You must arrive before anything else can happen."},

/* --- money --- */
{e:"💰",q:"A ₹50 note, a ₹20 note and a ₹5 coin make how much?",o:[["7️⃣5️⃣","₹75"],["7️⃣0️⃣","₹70"],["5️⃣5️⃣","₹55"],["6️⃣5️⃣","₹65"]],h:"Fifty and twenty first, then the coin."},
{e:"🪙",q:"Which set is worth ₹60?",o:[["💵","A ₹50 note and a ₹10 note"],["💵","A ₹50 note and a ₹5 coin"],["💵","Three ₹20 notes"],["💵","A ₹20 note and a ₹10 note"]],h:"Fifty needs ten more to make sixty."},
{e:"💰",q:"A money bank costs ₹145. Which amount is ENOUGH to buy it?",o:[["1️⃣5️⃣0️⃣","₹150"],["1️⃣2️⃣0️⃣","₹120"],["1️⃣0️⃣0️⃣","₹100"],["1️⃣2️⃣5️⃣","₹125"]],h:"You need at least as much as the price."},
{e:"🪙",q:"You buy a pencil for ₹8 and pay with a ₹10 note. How much change?",o:[["2️⃣","₹2"],["8️⃣","₹8"],["1️⃣8️⃣","₹18"],["1️⃣0️⃣","₹10"]],h:"Take the price away from what you gave."},
{e:"💰",q:"How many ₹10 notes make ₹50?",o:[["5️⃣","5"],["1️⃣0️⃣","10"],["4️⃣","4"],["5️⃣0️⃣","50"]],h:"Count in tens up to fifty."},
{e:"🪙",q:"Two ₹20 notes and one ₹10 note make how much?",o:[["5️⃣0️⃣","₹50"],["4️⃣0️⃣","₹40"],["3️⃣0️⃣","₹30"],["6️⃣0️⃣","₹60"]],h:"Twenty and twenty, then ten more."},

/* --- geometrical shapes --- */
{e:"🔷",q:"How many SIDES does a triangle have?",o:[["3️⃣","3"],["4️⃣","4"],["5️⃣","5"],["0️⃣","0"]],h:"The name itself tells you: tri means three."},
{e:"⬛",q:"How many CORNERS does a square have?",o:[["4️⃣","4"],["3️⃣","3"],["5️⃣","5"],["0️⃣","0"]],h:"One at each end of its four sides."},
{e:"⭕",q:"How many corners does a circle have?",o:[["0️⃣","None"],["1️⃣","One"],["2️⃣","Two"],["4️⃣","Four"]],h:"Run your finger round it. It never turns a corner."},
{e:"🔷",q:"Which shape is a ball like?",o:[["⚽","A sphere"],["🧊","A cube"],["🥫","A cylinder"],["🔺","A cone"]],h:"Round from every single side."},
{e:"⬛",q:"Which shape is a dice like?",o:[["🧊","A cube"],["⚽","A sphere"],["🥫","A cylinder"],["🔺","A cone"]],h:"Six square faces, all the same size."},
{e:"⭕",q:"Which shape is a birthday cap like?",o:[["🔺","A cone"],["🧊","A cube"],["⚽","A sphere"],["🥫","A cylinder"]],h:"Round at the bottom, pointed at the top."},
{e:"🔷",q:"Which shape is a tin of food like?",o:[["🥫","A cylinder"],["🧊","A cube"],["⚽","A sphere"],["🔺","A cone"]],h:"Flat circles at both ends, straight in between."},
{e:"⬛",q:"A rectangle has four sides. What is special about them?",o:[["📏","Opposite sides are equal"],["📏","All four are equal"],["📏","All four are different"],["📏","It has no straight sides"]],h:"Top matches bottom, and the two sides match each other."},
{e:"⭕",q:"Which shape ROLLS but cannot be stacked easily?",o:[["⚽","A sphere"],["🧊","A cube"],["📦","A cuboid"],["⬛","A square block"]],h:"It will not sit still on a slope."},
{e:"🔷",q:"How many sides does a hexagon have?",o:[["6️⃣","6"],["5️⃣","5"],["7️⃣","7"],["8️⃣","8"]],h:"The same as the number of sides on a honeycomb cell."}
],

"Logical Reasoning": [
{e:"🧩",q:"Which comes next: 1, 3, 5, 7, ___?",o:[["9️⃣","9"],["8️⃣","8"],["🔟","10"],["6️⃣","6"]],h:"Each one is two more than the last."},
{e:"🔁",q:"Which comes next: 20, 18, 16, 14, ___?",o:[["1️⃣2️⃣","12"],["1️⃣5️⃣","15"],["1️⃣3️⃣","13"],["🔟","10"]],h:"They are going down by two each time."},
{e:"📊",q:"If BAT is to ball, then RACQUET is to ___?",o:[["🎾","Shuttlecock"],["🏏","Stumps"],["🥅","Goalpost"],["🏊","Water"]],h:"Each tool goes with the thing it hits."},
{e:"🧠",q:"Anu is taller than Bela. Bela is taller than Chitra. Who is the SHORTEST?",o:[["🧍","Chitra"],["🧍","Anu"],["🧍","Bela"],["🟰","All the same"]],h:"Line them up tallest first. Who is at the end?"},
{e:"🧩",q:"A day has morning, afternoon, evening and night. Which comes THIRD?",o:[["🌆","Evening"],["🌅","Morning"],["🌞","Afternoon"],["🌙","Night"]],h:"Count them in the order the day goes."},
{e:"🔁",q:"Which figure completes the pattern: big, small, big, small, ___?",o:[["🔴","Big"],["🔵","Small"],["🟡","Neither"],["🟢","Both"]],h:"They take it in turns."},
{e:"📊",q:"Five children stand in a line. Ravi is in the middle. How many stand before him?",o:[["2️⃣","2"],["3️⃣","3"],["4️⃣","4"],["1️⃣","1"]],h:"The middle of five has the same number on each side."},
{e:"🧠",q:"If MONDAY is the first school day, which is the THIRD school day?",o:[["3️⃣","Wednesday"],["2️⃣","Tuesday"],["4️⃣","Thursday"],["5️⃣","Friday"]],h:"Count Monday as one."},
{e:"🧩",q:"Which one is different: apple, banana, carrot, mango?",o:[["🥕","Carrot"],["🍎","Apple"],["🍌","Banana"],["🥭","Mango"]],h:"Three grow as fruit. One grows under the ground."},
{e:"🔁",q:"Which one is different: car, bus, bicycle, aeroplane?",o:[["✈️","Aeroplane"],["🚗","Car"],["🚌","Bus"],["🚲","Bicycle"]],h:"Three travel on roads."},
{e:"📊",q:"A box holds 4 rows of 3 chocolates. How many chocolates in all?",o:[["1️⃣2️⃣","12"],["7️⃣","7"],["1️⃣","1"],["9️⃣","9"]],h:"Three, four times over."},
{e:"🧠",q:"Sara is between Nina and Priya. Nina is first. Who is last?",o:[["🧍","Priya"],["🧍","Sara"],["🧍","Nina"],["❓","We cannot tell"]],h:"If Sara is in the middle, only one place is left."}
]
};
