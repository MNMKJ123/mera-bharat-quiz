/* ICSO workbook's Logical Reasoning section: comparisons, position in an
   arrangement, alphabet skip patterns, and measuring. */
module.exports = {
"Logical Reasoning": [
{e:"🧩",q:"Which of these is usually the TALLEST?",o:[["🚪","A cupboard"],["🕯️","A candle"],["🧺","A basket"],["🍾","A bottle"]],h:"It reaches nearly to the ceiling."},
{e:"❓",q:"Which of these is usually the SHORTEST?",o:[["🖍️","A crayon"],["📏","A ruler"],["🪥","A toothbrush"],["☂️","An umbrella"]],h:"It fits easily inside a small pencil box."},
{e:"🤔",q:"A racket costs 75 rupees, a notebook 35, a mouse 90 and a mug 51. Which is the CHEAPEST?",o:[["📓","The notebook"],["🎾","The racket"],["🖱️","The mouse"],["☕","The mug"]],h:"The smallest number of rupees."},
{e:"🧐",q:"A racket costs 75 rupees, a notebook 35, a mouse 90 and a mug 51. Which is the DEAREST?",o:[["🖱️","The mouse"],["🎾","The racket"],["📓","The notebook"],["☕","The mug"]],h:"The biggest number of rupees."},
{e:"💭",q:"In the row A B C D E, which letter is exactly in the MIDDLE?",o:[["🅲","C"],["🅱️","B"],["🅳","D"],["🅴","E"]],h:"Two letters on each side of it."},
{e:"🎓",q:"In the row 1 2 3 4 5 6 7 8 9, which number is exactly in the MIDDLE?",o:[["5️⃣","5"],["4️⃣","4"],["6️⃣","6"],["3️⃣","3"]],h:"Four numbers on each side."},
{e:"📝",q:"Which day comes BETWEEN Friday and Sunday?",o:[["6️⃣","Saturday"],["4️⃣","Thursday"],["1️⃣","Monday"],["2️⃣","Tuesday"]],h:"The last day of the weekend's start."},
{e:"🔎",q:"Which day comes BETWEEN Monday and Wednesday?",o:[["2️⃣","Tuesday"],["4️⃣","Thursday"],["5️⃣","Friday"],["7️⃣","Sunday"]],h:"Second day of the week."},
{e:"🧩",q:"What comes next in this letter pattern: A, C, E, G, __ ?",o:[["🅸","I"],["🅷","H"],["🅹","J"],["🅱️","B"]],h:"We are skipping one letter each time."},
{e:"❓",q:"What comes next: B, D, F, H, __ ?",o:[["🅹","J"],["🅸","I"],["🅺","K"],["🅶","G"]],h:"Every other letter of the alphabet."},
{e:"🤔",q:"Which letter is MISSING: E, G, I, __, M ?",o:[["🅺","K"],["🅹","J"],["🅻","L"],["🅷","H"]],h:"Each step skips one letter."},
{e:"🧐",q:"Which letter comes just BEFORE the middle letter of C D E F G?",o:[["🅳","D"],["🅲","C"],["🅴","E"],["🅵","F"]],h:"First find the middle, then step back one."},
{e:"💭",q:"A boy is standing in front of a house, not inside it. Where is he?",o:[["🚪","Outside the house"],["🏠","Inside the house"],["⬆️","Above the house"],["⬇️","Under the house"]],h:"He has not gone in yet."},
{e:"🎓",q:"There are 10 sweets in a bowl and 4 on the table. How many are OUTSIDE the bowl?",o:[["4️⃣","4"],["🔟","10"],["6️⃣","6"],["1️⃣4️⃣","14"]],h:"Only count the ones not in the bowl."},
{e:"📝",q:"There are 12 apples in a basket. 5 are taken out. How many are still INSIDE?",o:[["7️⃣","7"],["5️⃣","5"],["1️⃣2️⃣","12"],["1️⃣7️⃣","17"]],h:"Twelve take away five."},
{e:"🔎",q:"Which object would you measure with a RULER?",o:[["✏️","The length of a pencil"],["⚖️","The weight of a bag"],["🕐","The time of day"],["🌡️","How hot the day is"]],h:"A ruler measures how long something is."},
{e:"🧩",q:"Two pieces fit together to make a RECTANGLE. What shape must each piece be?",o:[["▭","Two equal smaller rectangles"],["⚪","Two circles"],["⭐","Two stars"],["💗","Two hearts"]],h:"Cut a rectangle straight across the middle."},
{e:"❓",q:"Rohan is taller than Sita. Sita is taller than Ali. Who is in the MIDDLE by height?",o:[["🧍","Sita"],["🧍","Rohan"],["🧍","Ali"],["❓","Cannot be determined"]],h:"Put all three in a line, tallest first."},
{e:"🤔",q:"A pencil is 8 cm and a crayon is 5 cm. Which is LONGER, and by how much?",o:[["✏️","The pencil, by 3 cm"],["🖍️","The crayon, by 3 cm"],["✏️","The pencil, by 5 cm"],["🟰","They are the same"]],h:"Eight take away five."},
{e:"🧐",q:"If today is Sunday, what day will it be the DAY AFTER TOMORROW?",o:[["2️⃣","Tuesday"],["1️⃣","Monday"],["3️⃣","Wednesday"],["6️⃣","Saturday"]],h:"Count two days forward, not one."},
{e:"💭",q:"If yesterday was Wednesday, what day is it TODAY?",o:[["4️⃣","Thursday"],["2️⃣","Tuesday"],["5️⃣","Friday"],["3️⃣","Wednesday"]],h:"Move one day forward from Wednesday."},
{e:"🎓",q:"Which is the ODD ONE OUT among these vehicles?",o:[["⛵","Boat"],["🚗","Car"],["🚌","Bus"],["🚚","Truck"]],h:"Three travel on roads."},
{e:"📝",q:"What comes next: 5, 10, 15, 20, __ ?",o:[["2️⃣5️⃣","25"],["2️⃣2️⃣","22"],["3️⃣0️⃣","30"],["2️⃣1️⃣","21"]],h:"Counting in fives."},
{e:"🔎",q:"What comes next: 100, 90, 80, __ ?",o:[["7️⃣0️⃣","70"],["7️⃣5️⃣","75"],["6️⃣0️⃣","60"],["8️⃣5️⃣","85"]],h:"Going down by ten each time."}
],

"Picture Puzzles": [
{e:"🧩",f:{k:"row",items:["circle red","circle red","circle blue","circle red","circle red","circle blue","?"]},q:"Which colour comes NEXT in this pattern?",
 o:[[{k:"one",item:"circle red"},"Red"],[{k:"one",item:"circle blue"},"Blue"],[{k:"one",item:"circle green"},"Green"],[{k:"one",item:"circle yellow"},"Yellow"]],h:"Two reds, then a blue, over and over."},
{e:"❓",f:{k:"row",items:["star yellow","star yellow","star yellow","star yellow","star yellow"]},q:"How many stars can you count?",
 o:[["5️⃣","Five"],["4️⃣","Four"],["6️⃣","Six"],["3️⃣","Three"]],h:"Point at each one as you count."},
{e:"🤔",f:{k:"grid",cols:4,items:["square green","square green","square green","circle red","square green","square green","circle red","square green"]},q:"How many RED circles are there?",
 o:[["2️⃣","Two"],["3️⃣","Three"],["1️⃣","One"],["4️⃣","Four"]],h:"Ignore all the green squares."},
{e:"🧐",f:{k:"row",items:["triangle blue","square blue","triangle blue","square blue","triangle blue","?"]},q:"Which shape completes this pattern?",
 o:[[{k:"one",item:"square blue"},"Blue square"],[{k:"one",item:"triangle blue"},"Blue triangle"],[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"star yellow"},"Yellow star"]],h:"Triangle, square, triangle, square..."},
{e:"💭",f:{k:"row",items:["heart pink","heart pink","heart pink","heart pink","heart pink","heart pink"]},q:"How many groups of 3 can you make from these hearts?",
 o:[["2️⃣","Two"],["3️⃣","Three"],["6️⃣","Six"],["1️⃣","One"]],h:"Three and three makes six."},
{e:"🎓",q:"Which shape has the MOST corners?",
 o:[[{k:"one",item:"hexagon green"},"Shape A"],[{k:"one",item:"triangle red"},"Shape B"],[{k:"one",item:"square blue"},"Shape C"],[{k:"one",item:"diamond purple"},"Shape D"]],h:"Count the pointy bits on each one."},
{e:"📝",q:"Which shape has the FEWEST corners?",
 o:[[{k:"one",item:"triangle orange"},"Shape A"],[{k:"one",item:"square blue"},"Shape B"],[{k:"one",item:"hexagon green"},"Shape C"],[{k:"one",item:"diamond red"},"Shape D"]],h:"Three is fewer than four and six."}
]
};
