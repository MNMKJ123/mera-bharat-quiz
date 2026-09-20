/* The official SOF Class 1 syllabus for the 2026-27 cycle.
   Taken from sofworld.org syllabus pages, not from memory.
   Every paper is 35 questions / 40 marks / 1 hour, and every
   Achievers section is 2 marks a question.

   This is the spine the course is built on: each `chapters` entry
   becomes a unit with a lesson, practice and a test. */

const SOF = {

  IGKO: {
    name: "IGKO",
    full: "International General Knowledge Olympiad",
    total: 35, marks: 40, mins: 60,
    sections: [
      { code:"M1", name:"General Awareness", q:20, each:1, chapters:[
        "Me and My Surroundings",
        "Plants and Animals",
        "India and the World",
        "Science and Technology",
        "Language and Literature",
        "Earth and Its Environment",
        "Sports",
        "Maths Fun",
      ]},
      { code:"M2", name:"Current Affairs", q:5, each:1, chapters:[
        "Current Affairs and Developments",
      ]},
      { code:"M3", name:"Life Skills", q:5, each:1, chapters:[
        "Kindness", "Soft Skills", "Social Skills", "Do's and Don'ts",
      ]},
      { code:"M4", name:"Achievers", q:5, each:2, hots:true, chapters:["Higher Order Thinking"] },
    ],
  },

  IMO: {
    name: "IMO",
    full: "International Mathematics Olympiad",
    total: 35, marks: 40, mins: 60,
    sections: [
      { code:"M1", name:"Logical Reasoning", q:10, each:1, chapters:[
        "Patterns", "Odd One Out", "Measuring Units", "Geometrical Shapes",
        "Spatial Understanding", "Grouping of Figures", "Analogy",
        "Ranking Test", "Problems based on Figures",
      ]},
      { code:"M2", name:"Mathematical Reasoning", q:10, each:1, chapters:[
        "Numerals", "Number Names", "Number Sense (2-digit)",
        "Addition", "Subtraction", "Lengths, Weights and Comparisons",
        "Time", "Money", "Geometrical Shapes and Solids",
      ]},
      { code:"M3", name:"Everyday Mathematics", q:10, each:1, chapters:[
        "Everyday problems using the Section 2 topics",
      ]},
      { code:"M4", name:"Achievers", q:5, each:2, hots:true, chapters:["Higher Order Thinking"] },
    ],
  },

  ISO: {
    name: "ISO",
    full: "International Science Olympiad (formerly NSO)",
    total: 35, marks: 40, mins: 60,
    sections: [
      { code:"M1", name:"Logical Reasoning", q:5, each:1, chapters:[
        "Patterns", "Odd One Out", "Measuring Units", "Geometrical Shapes",
        "Spatial Understanding", "Grouping of Figures", "Analogy",
        "Ranking Test", "Problems based on Figures",
      ]},
      { code:"M2", name:"Science", q:25, each:1, chapters:[
        "Living and Non-living Things",
        "Plants",
        "Animals",
        "Human Beings and Their Needs",
        "Good Habits and Safety Rules",
        "Air and Water",
        "Weather and The Sky",
      ]},
      { code:"M3", name:"Achievers", q:5, each:2, hots:true, chapters:["Higher Order Thinking"] },
    ],
  },

  /* Chapter structure of the SOF ICSO Class 1 workbook, from its contents
     page. Page numbers show how much room each chapter gets: every teaching
     chapter is 6 pages, Logical Reasoning gets 8, then a full past paper and
     worked explanations. The course mirrors this order so a chapter in the
     app lines up with the same chapter in the book she is holding. */
  ICSO_BOOK: {
    title: "Computers and Information Technology, based on Windows 11",
    chapters: [
      { n:1, name:"Introduction to Computers",            page:4  },
      { n:2, name:"Parts of a Computer",                  page:10 },
      { n:3, name:"Uses of a Computer",                   page:16 },
      { n:4, name:"Keyboard and its Keys",                page:22 },
      { n:5, name:"Computer Mouse",                       page:28 },
      { n:6, name:"Starting and Shutting Down a Computer",page:34 },
      { n:7, name:"Introduction to MS-Paint",             page:40 },
      { n:8, name:"Latest Developments in the Field of IT",page:46 },
    ],
    extras: [
      { name:"Logical Reasoning",           page:51 },
      { name:"Full past paper, ICSO 2025",  page:59 },
      { name:"Hints and Explanations",      page:66 },
    ],
  },
  ICSO: {
    name: "ICSO",
    full: "International Computer Science Olympiad (formerly NCO)",
    total: 35, marks: 40, mins: 60,
    note: "SOF states questions are based on Windows 11.",
    sections: [
      { code:"M1", name:"Logical Reasoning", q:5, each:1, chapters:[
        "Patterns", "Odd One Out", "Measuring Units", "Geometrical Shapes",
        "Spatial Understanding", "Grouping of Figures", "Analogy",
        "Ranking Test", "Problems based on Figures",
      ]},
      { code:"M2", name:"Computer Science", q:20, each:1, chapters:[
        "Introduction to Computers",
        "Parts of Computer",
        "Uses of Computer",
        "Keys and Keyboard",
        "Computer Mouse",
        "Starting and Shutting Down the Computer",
        "Introduction to MS-Paint",
      ]},
      { code:"M3", name:"Information Technology", q:5, each:1, chapters:[
        "IT Gadgets", "Devices", "Apps", "Computerization", "Developments in IT",
      ]},
      { code:"M4", name:"Achievers", q:5, each:2, hots:true, chapters:["Higher Order Thinking"] },
    ],
  },

  IEO: {
    name: "IEO",
    full: "International English Olympiad",
    total: 35, marks: 40, mins: 60,
    sections: [
      { code:"M1", name:"Word and Structure Knowledge", q:15, each:1, chapters:[
        "Jumbled Letters",
        "Words: Meanings and Opposites",
        "Identify the Word From the Picture",
        "Making a Word",
        "Word Power",
        "Feminine and Masculine",
        "One and Many",
        "Word Pairs",
        "Odd One Out",
        "Animals: Their Babies, Sounds and Groups",
        "Nouns", "Pronouns", "Verbs", "Conjunctions", "Articles",
        "Adverbs", "Prepositions", "Adjectives",
        "Basic Tenses", "Punctuation",
      ]},
      { code:"M2", name:"Reading Comprehension", q:10, each:1, chapters:[
        "Comprehension (Prose)", "Comprehension (Poetry)",
      ]},
      { code:"M3", name:"Spoken and Written Expression", q:5, each:1, chapters:[
        "Picture Composition", "Spoken and Written Expression",
      ]},
      { code:"M4", name:"Achievers", q:5, each:2, hots:true, chapters:["Higher Order Thinking"] },
    ],
  },
};

if (typeof module !== "undefined") module.exports = SOF;
if (typeof window !== "undefined") window.SOF_SYLLABUS = SOF;
