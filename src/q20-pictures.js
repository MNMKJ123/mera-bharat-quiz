window.MBQ_BANK = (window.MBQ_BANK || []).concat([{
name:"Picture Puzzles", deva:"चित्र पहेली", emoji:"🖼️", color:"picture", qs:[

/* ---- complete the pattern ---- */
{e:"🧩",f:{k:"row",items:["circle red","square blue","circle red","square blue","?"]},q:"Which shape comes NEXT in this pattern?",
 o:[[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"square blue"},"Blue square"],[{k:"one",item:"triangle green"},"Green triangle"],[{k:"one",item:"star yellow"},"Yellow star"]],h:"Circle, square, circle, square... keep going!"},
{e:"🧩",f:{k:"row",items:["triangle green","triangle green","circle red","triangle green","triangle green","?"]},q:"Which shape comes NEXT?",
 o:[[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"triangle green"},"Green triangle"],[{k:"one",item:"square blue"},"Blue square"],[{k:"one",item:"heart pink"},"Pink heart"]],h:"Two triangles, then a circle, again and again."},
{e:"🧩",f:{k:"row",items:["star yellow","heart pink","star yellow","heart pink","?"]},q:"Which shape completes the pattern?",
 o:[[{k:"one",item:"star yellow"},"Yellow star"],[{k:"one",item:"heart pink"},"Pink heart"],[{k:"one",item:"circle blue"},"Blue circle"],[{k:"one",item:"square green"},"Green square"]],h:"Star, heart, star, heart..."},
{e:"🧩",f:{k:"row",items:["square red","square blue","square green","square red","square blue","?"]},q:"Which colour comes NEXT?",
 o:[[{k:"one",item:"square green"},"Green"],[{k:"one",item:"square red"},"Red"],[{k:"one",item:"square blue"},"Blue"],[{k:"one",item:"square yellow"},"Yellow"]],h:"Red, blue, green, and then it repeats."},
{e:"🧩",f:{k:"row",items:["circle purple","circle purple","circle purple","square orange","circle purple","circle purple","circle purple","?"]},q:"Which shape comes NEXT?",
 o:[[{k:"one",item:"square orange"},"Orange square"],[{k:"one",item:"circle purple"},"Purple circle"],[{k:"one",item:"star yellow"},"Yellow star"],[{k:"one",item:"triangle red"},"Red triangle"]],h:"Three circles, then a square. Count them."},
{e:"🧩",f:{k:"row",items:["diamond blue","oval green","diamond blue","oval green","?"]},q:"Which shape continues the pattern?",
 o:[[{k:"one",item:"diamond blue"},"Blue diamond"],[{k:"one",item:"oval green"},"Green oval"],[{k:"one",item:"hexagon red"},"Red hexagon"],[{k:"one",item:"star yellow"},"Yellow star"]],h:"Diamond, oval, diamond, oval..."},

/* ---- figure analogy ---- */
{e:"🔗",f:{k:"row",items:["circle red",":","circle blue","::","square red",":","?"]},q:"Which shape completes this pair?",
 o:[[{k:"one",item:"square blue"},"Blue square"],[{k:"one",item:"circle blue"},"Blue circle"],[{k:"one",item:"square red"},"Red square"],[{k:"one",item:"triangle blue"},"Blue triangle"]],h:"Red became blue. The shape stayed the same."},
{e:"🔗",f:{k:"row",items:["triangle green",":","triangle yellow","::","star green",":","?"]},q:"Which shape completes this pair?",
 o:[[{k:"one",item:"star yellow"},"Yellow star"],[{k:"one",item:"star green"},"Green star"],[{k:"one",item:"triangle yellow"},"Yellow triangle"],[{k:"one",item:"circle yellow"},"Yellow circle"]],h:"Only the colour changed from green to yellow."},
{e:"🔗",f:{k:"row",items:["square blue",":","circle blue","::","square pink",":","?"]},q:"Which shape completes this pair?",
 o:[[{k:"one",item:"circle pink"},"Pink circle"],[{k:"one",item:"square pink"},"Pink square"],[{k:"one",item:"circle blue"},"Blue circle"],[{k:"one",item:"triangle pink"},"Pink triangle"]],h:"Square became circle. The colour stayed."},

/* ---- odd one out among figures ---- */
{e:"🔍",q:"Which shape is the ODD ONE OUT by colour?",
 o:[[{k:"one",item:"square red"},"This one"],[{k:"one",item:"circle blue"},"This one"],[{k:"one",item:"triangle blue"},"This one"],[{k:"one",item:"star blue"},"This one"]],h:"Three are blue. One is not."},
{e:"🔍",q:"Which shape is the ODD ONE OUT by shape?",
 o:[[{k:"one",item:"circle green"},"This one"],[{k:"one",item:"square green"},"This one"],[{k:"one",item:"square red"},"This one"],[{k:"one",item:"square blue"},"This one"]],h:"Three are squares. One is round."},
{e:"🔍",q:"Which one is the ODD ONE OUT? Look at the number of corners.",
 o:[[{k:"one",item:"circle purple"},"This one"],[{k:"one",item:"triangle purple"},"This one"],[{k:"one",item:"square purple"},"This one"],[{k:"one",item:"diamond purple"},"This one"]],h:"Three have corners. One has none at all."},
{e:"🔍",q:"Which shape does NOT belong with the others?",
 o:[[{k:"one",item:"heart pink"},"This one"],[{k:"one",item:"square orange"},"This one"],[{k:"one",item:"rect orange"},"This one"],[{k:"one",item:"diamond orange"},"This one"]],h:"Three have straight sides and one colour. One is different in both ways."},

/* ---- counting ---- */
{e:"🔢",f:{k:"grid",cols:4,items:["circle red","circle red","circle red","circle red","circle red","circle red"]},q:"How many circles are there?",
 o:[["6️⃣","Six"],["4️⃣","Four"],["5️⃣","Five"],["7️⃣","Seven"]],h:"Count the top row, then the bottom row."},
{e:"🔢",f:{k:"grid",cols:5,items:["star yellow","star yellow","star yellow","star yellow","star yellow","star yellow","star yellow","star yellow"]},q:"How many stars are there?",
 o:[["8️⃣","Eight"],["7️⃣","Seven"],["9️⃣","Nine"],["🔟","Ten"]],h:"Five on top, and three below."},
{e:"🔢",f:{k:"grid",cols:4,items:["square blue","circle red","square blue","circle red","square blue","circle red","square blue","circle red"]},q:"How many SQUARES are there?",
 o:[["4️⃣","Four"],["8️⃣","Eight"],["3️⃣","Three"],["5️⃣","Five"]],h:"Count only the ones with corners."},
{e:"🔢",f:{k:"grid",cols:4,items:["triangle green","circle red","triangle green","circle red","circle red","triangle green","circle red","circle red"]},q:"How many CIRCLES are there?",
 o:[["5️⃣","Five"],["3️⃣","Three"],["4️⃣","Four"],["6️⃣","Six"]],h:"Ignore the triangles and count the round ones."},
{e:"🔢",f:{k:"grid",cols:4,items:["heart pink","heart pink","star yellow","heart pink","star yellow","heart pink","heart pink","star yellow"]},q:"Are there MORE hearts or MORE stars?",
 o:[["💗","More hearts"],["⭐","More stars"],["🟰","The same number"],["0️⃣","Neither"]],h:"Count each kind, then compare."},
{e:"🔢",f:{k:"grid",cols:3,items:["circle blue","circle blue","circle blue","square green","square green","square green"]},q:"Are there more circles or more squares?",
 o:[["🟰","The same number"],["🔵","More circles"],["🟩","More squares"],["0️⃣","Neither"]],h:"Count both rows carefully."},
{e:"🔢",f:{k:"row",items:["circle red","circle red","circle red","circle red","circle red","circle red","circle red"]},q:"How many circles? Count them all.",
 o:[["7️⃣","Seven"],["6️⃣","Six"],["8️⃣","Eight"],["5️⃣","Five"]],h:"Touch each one as you count."},

/* ---- shape recognition ---- */
{e:"📐",f:{k:"one",item:"triangle red"},q:"How many CORNERS does this shape have?",
 o:[["3️⃣","Three"],["4️⃣","Four"],["0️⃣","None"],["5️⃣","Five"]],h:"Count the pointy bits."},
{e:"📐",f:{k:"one",item:"square blue"},q:"How many SIDES does this shape have?",
 o:[["4️⃣","Four"],["3️⃣","Three"],["5️⃣","Five"],["0️⃣","None"]],h:"Count the straight edges."},
{e:"📐",f:{k:"one",item:"hexagon green"},q:"How many sides does this shape have?",
 o:[["6️⃣","Six"],["5️⃣","Five"],["4️⃣","Four"],["8️⃣","Eight"]],h:"A hexagon. Hex means six!"},
{e:"📐",f:{k:"one",item:"circle purple"},q:"What is the name of this shape?",
 o:[["⚪","Circle"],["🟥","Square"],["🔺","Triangle"],["▭","Rectangle"]],h:"Round, with no corners at all."},
{e:"📐",f:{k:"one",item:"diamond orange"},q:"What is the name of this shape?",
 o:[["🔷","Diamond"],["⚪","Circle"],["🔺","Triangle"],["⬡","Hexagon"]],h:"A square standing on one corner."},
{e:"📐",f:{k:"one",item:"rect blue"},q:"What is the name of this shape?",
 o:[["▭","Rectangle"],["🟥","Square"],["⚪","Circle"],["🔺","Triangle"]],h:"Two long sides and two short sides."},
{e:"📐",f:{k:"one",item:"star yellow"},q:"How many points does this star have?",
 o:[["5️⃣","Five"],["4️⃣","Four"],["6️⃣","Six"],["8️⃣","Eight"]],h:"Count the sharp tips going outwards."},

/* ---- spatial understanding ---- */
{e:"🧭",f:{k:"row",items:["circle red","square blue","triangle green","star yellow","heart pink"]},q:"Which shape is FIRST from the left?",
 o:[[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"heart pink"},"Pink heart"],[{k:"one",item:"triangle green"},"Green triangle"],[{k:"one",item:"star yellow"},"Yellow star"]],h:"Start at the left-hand end."},
{e:"🧭",f:{k:"row",items:["circle red","square blue","triangle green","star yellow","heart pink"]},q:"Which shape is in the MIDDLE?",
 o:[[{k:"one",item:"triangle green"},"Green triangle"],[{k:"one",item:"square blue"},"Blue square"],[{k:"one",item:"star yellow"},"Yellow star"],[{k:"one",item:"circle red"},"Red circle"]],h:"Two shapes on each side of it."},
{e:"🧭",f:{k:"row",items:["circle red","square blue","triangle green","star yellow","heart pink"]},q:"Which shape is LAST from the left?",
 o:[[{k:"one",item:"heart pink"},"Pink heart"],[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"star yellow"},"Yellow star"],[{k:"one",item:"square blue"},"Blue square"]],h:"Go all the way to the right-hand end."},
{e:"🧭",f:{k:"row",items:["star yellow","circle blue","square red","triangle green"]},q:"Which shape is 2nd from the LEFT?",
 o:[[{k:"one",item:"circle blue"},"Blue circle"],[{k:"one",item:"star yellow"},"Yellow star"],[{k:"one",item:"square red"},"Red square"],[{k:"one",item:"triangle green"},"Green triangle"]],h:"Star is first, then comes..."},
{e:"🧭",f:{k:"row",items:["star yellow","circle blue","square red","triangle green"]},q:"Which shape is 2nd from the RIGHT?",
 o:[[{k:"one",item:"square red"},"Red square"],[{k:"one",item:"triangle green"},"Green triangle"],[{k:"one",item:"circle blue"},"Blue circle"],[{k:"one",item:"star yellow"},"Yellow star"]],h:"Start at the right end and count back two."},
{e:"🧭",f:{k:"row",items:["circle red","square blue","triangle green"]},q:"Which shape is BETWEEN the circle and the triangle?",
 o:[[{k:"one",item:"square blue"},"Blue square"],[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"triangle green"},"Green triangle"],[{k:"one",item:"star yellow"},"Yellow star"]],h:"The one in the middle of those two."},

/* ---- shapes that combine ---- */
{e:"🧩",q:"Which TWO shapes can join to make a bigger SQUARE?",
 o:[["🔺","Two triangles"],["⚪","Two circles"],["⭐","Two stars"],["💗","Two hearts"]],h:"Cut a square corner to corner and see what you get."},
{e:"🧩",q:"Which TWO shapes can join to make a RECTANGLE?",
 o:[["🟥","Two squares side by side"],["⚪","Two circles"],["⭐","Two stars"],["🔷","Two diamonds"]],h:"Put them next to each other in a row."},
{e:"🧩",q:"If you fold a square exactly in half, what do you get?",
 o:[["▭","Two rectangles"],["⚪","Two circles"],["⭐","Two stars"],["⬡","Two hexagons"]],h:"Fold it straight across the middle."},
{e:"🧩",q:"How many triangles make up one diamond cut across the middle?",
 o:[["2️⃣","Two"],["3️⃣","Three"],["4️⃣","Four"],["1️⃣","One"]],h:"One cut makes two pieces."},

/* ---- bigger, smaller, groups ---- */
{e:"⚖️",f:{k:"grid",cols:3,items:["circle red","circle red","circle red","circle blue","circle blue","blank"]},q:"Which row has MORE circles, the top or the bottom?",
 o:[["⬆️","The top row"],["⬇️","The bottom row"],["🟰","Both the same"],["0️⃣","Neither"]],h:"The dotted box is empty."},
{e:"⚖️",f:{k:"row",items:["circle blue","circle blue","circle blue","circle blue","circle blue","circle blue"]},q:"How many GROUPS OF 2 can you make from these circles?",
 o:[["3️⃣","Three"],["2️⃣","Two"],["4️⃣","Four"],["6️⃣","Six"]],h:"Put them in pairs and count the pairs."},
{e:"⚖️",f:{k:"row",items:["star green","star green","star green","star green","star green","star green","star green","star green","star green"]},q:"How many GROUPS OF 3 can you make?",
 o:[["3️⃣","Three"],["2️⃣","Two"],["4️⃣","Four"],["9️⃣","Nine"]],h:"Three and three and three."},
{e:"⚖️",f:{k:"grid",cols:5,items:["square orange","square orange","square orange","square orange","square orange","square orange","square orange","square orange","square orange","square orange"]},q:"How many squares altogether?",
 o:[["🔟","Ten"],["8️⃣","Eight"],["9️⃣","Nine"],["1️⃣2️⃣","Twelve"]],h:"Five in each row, and there are two rows."},

/* ---- missing shape ---- */
{e:"❓",f:{k:"row",items:["circle red","blank","circle red","circle red"]},q:"The dotted box is empty. Which shape should go there?",
 o:[[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"square blue"},"Blue square"],[{k:"one",item:"star yellow"},"Yellow star"],[{k:"one",item:"triangle green"},"Green triangle"]],h:"All the others are the same."},
{e:"❓",f:{k:"row",items:["square green","circle yellow","square green","blank"]},q:"Which shape should fill the empty box?",
 o:[[{k:"one",item:"circle yellow"},"Yellow circle"],[{k:"one",item:"square green"},"Green square"],[{k:"one",item:"star red"},"Red star"],[{k:"one",item:"heart pink"},"Pink heart"]],h:"Square, circle, square, then..."},
{e:"❓",f:{k:"grid",cols:3,items:["star blue","star blue","star blue","star blue","blank","star blue"]},q:"What is missing from the empty box?",
 o:[[{k:"one",item:"star blue"},"Blue star"],[{k:"one",item:"circle red"},"Red circle"],[{k:"one",item:"square green"},"Green square"],[{k:"one",item:"heart pink"},"Pink heart"]],h:"Every other box has the same thing."},

/* ---- size and comparison ---- */
{e:"📏",q:"Which is HEAVIER: a bag of stones or a bag of feathers, both the same size?",
 o:[["🪨","The stones"],["🪶","The feathers"],["🟰","Both the same"],["❓","Cannot be determined"]],h:"Stones are packed much more tightly."},
{e:"📏",q:"A box of books and a box of cotton are the same size. Which is LIGHTER?",
 o:[["☁️","The cotton"],["📚","The books"],["🟰","Both the same"],["❓","Cannot be determined"]],h:"Which one could you lift more easily?"},
{e:"📏",q:"Amit is taller than Bina. Bina is taller than Chitra. Who is the SHORTEST?",
 o:[["🧍","Chitra"],["🧍","Amit"],["🧍","Bina"],["❓","Cannot be determined"]],h:"Put them in a line from tallest to shortest."},
{e:"📏",q:"Ravi is heavier than Sita. We do not know about Meena. Who is the heaviest?",
 o:[["❓","Cannot be determined"],["🧍","Ravi"],["🧍","Sita"],["🧍","Meena"]],h:"Careful! We were not told anything about Meena."},

/* ---- mirror and turning ---- */
{e:"🪞",f:{k:"one",item:"circle red"},q:"If you hold this shape to a mirror, what will you see?",
 o:[[{k:"one",item:"circle red"},"The same circle"],[{k:"one",item:"square red"},"A square"],[{k:"one",item:"triangle red"},"A triangle"],[{k:"one",item:"star red"},"A star"]],h:"A circle looks the same from every side."},
{e:"🪞",q:"Which of these shapes looks EXACTLY the same in a mirror?",
 o:[["⚪","A circle"],["🔤","The letter P"],["🔤","The letter R"],["🔤","The letter F"]],h:"Letters flip, but a round shape does not."},
{e:"🔄",f:{k:"one",item:"square blue"},q:"If you turn this shape around, what shape is it still?",
 o:[["🟥","A square"],["⚪","A circle"],["🔺","A triangle"],["⭐","A star"]],h:"Turning does not change what a shape is."}
]}]);
