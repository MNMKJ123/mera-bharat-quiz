/* IEO workbook ch6: animals — their young ones, their sounds, and the names
   we give to a group of them. Formats follow the book; choices are our own. */
module.exports = {
"Animals & Birds": [
/* --- young ones --- */
{e:"🍼",q:"What do we call the YOUNG ONE of a cow?",o:[["🐄","Calf"],["🐑","Lamb"],["🐖","Piglet"],["🐐","Kid"]],h:"It drinks its mother's milk in the shed."},
{e:"👶",q:"What do we call the YOUNG ONE of a goat?",o:[["🐐","Kid"],["🐑","Lamb"],["🐴","Foal"],["🐕","Pup"]],h:"The same word we cheekily use for a child."},
{e:"🍼",q:"What do we call the YOUNG ONE of a duck?",o:[["🦆","Duckling"],["🐤","Chick"],["🦢","Cygnet"],["🐣","Hatchling"]],h:"Add -ling to the bird's own name."},
{e:"👶",q:"What do we call the YOUNG ONE of a swan?",o:[["🦢","Cygnet"],["🦆","Duckling"],["🐤","Chick"],["🕊️","Squab"]],h:"The ugly duckling in the story grew into one."},
{e:"🍼",q:"What do we call the YOUNG ONE of a deer?",o:[["🦌","Fawn"],["🐐","Kid"],["🐑","Lamb"],["🐴","Colt"]],h:"Bambi was one."},
{e:"👶",q:"What do we call the YOUNG ONE of a frog?",o:[["🐸","Tadpole"],["🐛","Larva"],["🐤","Chick"],["🐁","Pup"]],h:"It has a tail and swims before it grows legs."},
{e:"🍼",q:"What do we call the YOUNG ONE of a pig?",o:[["🐖","Piglet"],["🐐","Kid"],["🐑","Lamb"],["🐄","Calf"]],h:"Add -let to the animal's own name."},
{e:"👶",q:"What do we call the YOUNG ONE of a bear?",o:[["🐻","Cub"],["🐕","Pup"],["🐈","Kitten"],["🐴","Foal"]],h:"The same word we use for a baby tiger or lion."},
{e:"🍼",q:"What do we call the YOUNG ONE of an eagle?",o:[["🦅","Eaglet"],["🐤","Chick"],["🦆","Duckling"],["🕊️","Squab"]],h:"Add -et to the bird's own name."},
{e:"👶",q:"What do we call the YOUNG ONE of a butterfly?",o:[["🐛","Caterpillar"],["🐝","Larva"],["🦋","Pupa"],["🐜","Grub"]],h:"The long green creature that eats leaves."},

/* --- sounds --- */
{e:"🔊",q:"What SOUND does a horse make?",o:[["🐎","It neighs"],["🐄","It moos"],["🐑","It bleats"],["🐕","It barks"]],h:"A long high call from the stable."},
{e:"📣",q:"What SOUND does a lion make?",o:[["🦁","It roars"],["🐈","It purrs"],["🐺","It howls"],["🐒","It chatters"]],h:"Loud enough to shake the jungle."},
{e:"🔊",q:"What SOUND does a duck make?",o:[["🦆","It quacks"],["🐓","It crows"],["🕊️","It coos"],["🦢","It honks"]],h:"Quack, quack, by the pond."},
{e:"📣",q:"What SOUND does a sheep make?",o:[["🐑","It bleats"],["🐄","It moos"],["🐖","It grunts"],["🐎","It neighs"]],h:"Baa, baa, black sheep."},
{e:"🔊",q:"What SOUND does a wolf make?",o:[["🐺","It howls"],["🦁","It roars"],["🐕","It barks"],["🐈","It mews"]],h:"A long, sad cry at the moon."},
{e:"📣",q:"What SOUND does a pigeon make?",o:[["🕊️","It coos"],["🦆","It quacks"],["🐦","It tweets"],["🦜","It squawks"]],h:"A soft, round sound from the window ledge."},
{e:"🔊",q:"What SOUND does a snake make?",o:[["🐍","It hisses"],["🐸","It croaks"],["🐝","It buzzes"],["🦗","It chirps"]],h:"A long ssssss."},
{e:"📣",q:"What SOUND does a frog make?",o:[["🐸","It croaks"],["🐍","It hisses"],["🐝","It buzzes"],["🐦","It tweets"]],h:"You hear it after the rain."},
{e:"🔊",q:"What SOUND does a monkey make?",o:[["🐒","It chatters"],["🦁","It roars"],["🐄","It moos"],["🐑","It bleats"]],h:"A busy, jabbering noise in the trees."},
{e:"📣",q:"What SOUND does an elephant make?",o:[["🐘","It trumpets"],["🦁","It roars"],["🐺","It howls"],["🐈","It purrs"]],h:"Named after a brass instrument."},

/* --- collective nouns --- */
{e:"👥",q:"What do we call a GROUP of lions?",o:[["🦁","A pride"],["🐺","A pack"],["🐑","A flock"],["🐄","A herd"]],h:"The word also means feeling very pleased."},
{e:"🫂",q:"What do we call a GROUP of wolves?",o:[["🐺","A pack"],["🦁","A pride"],["🐟","A school"],["🐝","A swarm"]],h:"Cards come in one of these too."},
{e:"👥",q:"What do we call a GROUP of fish?",o:[["🐟","A school"],["🐑","A flock"],["🐘","A herd"],["🐝","A swarm"]],h:"The same word as the place you learn."},
{e:"🫂",q:"What do we call a GROUP of bees?",o:[["🐝","A swarm"],["🐑","A flock"],["🦁","A pride"],["🐄","A herd"]],h:"They all fly out together in a buzzing cloud."},
{e:"👥",q:"What do we call a GROUP of sheep?",o:[["🐑","A flock"],["🐺","A pack"],["🐟","A school"],["🦁","A pride"]],h:"The same word we use for birds."},
{e:"🫂",q:"What do we call a GROUP of cows?",o:[["🐄","A herd"],["🐑","A flock"],["🐝","A swarm"],["🐟","A school"]],h:"The word the cowherd is named after."},
{e:"👥",q:"What do we call a GROUP of puppies born together?",o:[["🐕","A litter"],["🐑","A flock"],["🐝","A swarm"],["🦁","A pride"]],h:"The same word as rubbish dropped on the ground."},
{e:"🫂",q:"What do we call a GROUP of ants?",o:[["🐜","A colony"],["🦁","A pride"],["🐟","A school"],["🐑","A flock"]],h:"They live together in one great nest."},
{e:"👥",q:"What do we call a GROUP of elephants?",o:[["🐘","A herd"],["🐺","A pack"],["🐝","A swarm"],["🐟","A school"]],h:"The same word as for cows."},
{e:"🫂",q:"What do we call a GROUP of monkeys?",o:[["🐒","A troop"],["🐑","A flock"],["🐟","A school"],["🐝","A swarm"]],h:"The same word as a group of soldiers."}
]
};
