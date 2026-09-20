| 💻 Computer | 77 || 🔬 Science | 77 || 🔢 Maths | 78 || 💡 Life Skills | 77 || 🏏 Sports & Fun | 77 || 🪥 Body & Good Habits | 77 || 🚌 Transport & Safety | 76 || 🚀 Space | 76 || 🌦️ Earth & Nature | 76 || 🕌 Places & Monuments | 77 || 🪔 Festivals & Culture | 76 || 🌳 Plants & Food | 77 || 🐘 Animals & Birds | 77 || 🇮🇳 Our India | 77 || 🧩 Logical Reasoning | 80 |# Mera Bharat Quiz

1,155 questions for Class 1 (Indian syllabus) across 15 subjects, built to match
the real SOF Olympiad papers. Works offline, installs to the home screen on
Android **and** iPhone.

---

## Getting it onto the phone

Pick whichever line you need. Only **B** gives a real installed, offline app.

### A. Just try it now (10 seconds)

Open the claude.ai artifact link on the phone while signed in. Nothing to set up.
Needs internet every time, and it cannot be installed to the home screen.

### B. The proper app — icon, offline, no PC needed (about 2 minutes)

Phones only allow an app to be **installed** and to **work offline** from an
**https://** address. A Wi-Fi address like `http://192.168.29.92:8080` does not
count, so it has to be put online once. It is free and needs no account:

1. On the PC, open **app.netlify.com/drop**
2. Drag this whole `mera-bharat-quiz` folder onto the page
3. It gives back a link like `https://tiny-name-1234.netlify.app`
4. Open that link on the phone, then:
   - **Android (Chrome):** tap **📲 Install this app**, or menu ⋮ → *Install app*
   - **iPhone (Safari):** Share → *Add to Home Screen* (must be Safari)

Done. It now has its own icon, opens full-screen, and **works in aeroplane
mode**. The PC is never needed again.

### C. Copy one file — ANDROID ONLY

`index.html` holds the whole app. Copy it to the phone and open it from the
Files app. Works completely offline, no server, no website.

**This does NOT work on iPhone.** iOS previews an HTML file with QuickLook,
which does not run JavaScript, so the page comes up blank. Sending it over
WhatsApp or Mail has the same problem. On iPhone use A, B or D instead.

### D. Over your Wi-Fi — for a quick look only

```bash
node serve.js
```

It prints an address like `http://192.168.29.92:8080`; type that into the phone
(same Wi-Fi). Windows will likely ask to allow Node through the firewall — say
yes, or the phone cannot connect.

**This plays fine but cannot install and does not work offline**, because a Wi-Fi
address is not https. Use **B** for the real thing.

---

## About the "Android app"

This is a **PWA**. Once installed it has its own icon and splash screen, runs
full-screen with no browser bars, and works offline — for a 6-year-old it is
indistinguishable from an app off the Play Store.

**A real `.apk` could not be built here.** That needs a Java JDK, the Android SDK
and Gradle (~8 GB of tooling), none of which is installed on this PC. If you
specifically want an APK:

1. Put this folder on any free **https** host (Netlify Drop, GitHub Pages,
   Cloudflare Pages — all drag-and-drop).
2. Go to **pwabuilder.com**, paste the URL, choose Android.
3. It hands you a signed APK built from exactly these files.

No toolchain needed on your machine. A Play Store listing additionally needs a
Google Play developer account (one-time 25 USD).

---

## Matching the real SOF exam

Checked against the official **SOF ISO Class 1 sample paper (2026-27)** and the
**IMO Class 1 sample paper (2025-26)** from sofworld.org.

The real ISO paper:

| Section | Questions | Marks each |
|---|---|---|
| 1 · Logical Reasoning | 5 | 1 |
| 2 · Science | 25 | 1 |
| 3 · Achievers (harder) | 5 | **2** |
| **Total** | **35** | **40 marks, 1 hour** |

**Section 1 is Logical Reasoning in every SOF olympiad** — ISO, IMO, IEO and
ICSO all open with it. That is why this app has a Logical Reasoning subject
covering the published syllabus: *Patterns, Odd One Out, Measuring Units,
Geometrical Shapes, Spatial Understanding, Grouping of Figures, Analogy, Ranking
Test, Problems based on Figures.*

Question styles taken from the real papers:

- **Odd one out on a stated basis** — "by number of legs", "natural vs man-made"
- **Ranking test** — "which letter is 7th from the left in S T U V W X Y Z"
- **Analogy** — "Cow is to Calf, as Dog is to ___"
- **Grouping** — "how many groups of 3 can you make from 12 apples"
- **Solids** — cube, sphere, cylinder, cone (in the IMO syllabus, not just flat shapes)

**Olympiad Practice** offers two lengths:

- **⚡ Quick 10** — ten mixed questions, for a normal sitting
- **📝 Full paper 35** — the real exam length, and like the real paper it
  **opens with 5 Logical Reasoning questions** before moving to your chosen
  subjects

Not reproduced: the real papers lean heavily on **printed figures** — picture
grids, embedded shapes, mirror images, word-search grids. Those need drawn
artwork, so this app covers the text-and-picture-describable half of the
syllabus. It is practice for the thinking, not a pixel copy of the paper.

---

## What is in it

| Subject | Questions | |
|---|---|---|
| 🧩 Logical Reasoning | 55 | **Section 1 of every SOF paper** |
| 🇮🇳 Our India | 52 | |
| 🐘 Animals & Birds | 52 | |
| 🌳 Plants & Food | 52 | |
| 🪔 Festivals & Culture | 51 | |
| 🕌 Places & Monuments | 52 | |
| 🌦️ Earth & Nature | 51 | |
| 🚀 Space | 51 | |
| 🚌 Transport & Safety | 51 | |
| 🪥 Body & Good Habits | 52 | |
| 🏏 Sports & Fun | 52 | |
| 💡 Life Skills | 52 | the "Achievers" style |
| 🔢 Maths | 53 | IMO |
| 🔬 Science | 52 | ISO |
| 💻 Computer | 52 | NCO |

**Two modes.** *Play* draws fresh questions at random every game, so a subject
never repeats itself. *Learn* is flashcards — question, guess, tap to reveal the
answer and a funny line, no score and no rush.

**In-game help:** 💡 shows the hint *and* removes two wrong answers; ⏭️ skips
without counting it wrong.

**Read aloud:** 🔊 reads the question and all four answers. Tap 🎙️ to cycle
voices — phones have far better and more Indian voices than a PC.

Scores live only on that phone, in its own browser storage. **♻️ Reset stars**
clears them and needs two taps, so it cannot happen by accident.

---

## The files

| File | What it is |
|---|---|
| `index.html` | **The built app.** Do not edit by hand. |
| `src/app.html` | The real source. Edit this. |
| `src/q12`–`q15*.js` | Subjects added after the first build |
| `build.js` | `src/app.html` → `index.html` |
| `build-icons.js` | Draws the tiranga icons (no dependencies) |
| `fixleaks.js` | Stops a question's emoji giving away its own answer |
| `verify.js` | Checks all 1,155: 4 options, a hint, no duplicates, no leaks |
| `serve.js` | The little Wi-Fi server |
| `sw.js`, `manifest.webmanifest` | What makes it installable and offline |

After editing `src/app.html`:

```bash
node fixleaks.js && node build.js && node verify.js
```

`fixleaks.js` matters more than it sounds. Writing questions, it is very easy to
give the answer away in the question's own picture — "Which is our national
animal? 🐅" with 🐅 Tiger as an option. It has caught **276** of those so far.
