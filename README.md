# CYBERATLAS — The Complete Cybersecurity Learning Experience

**Understand the threats. Master the defenses. Build resilience.**

CYBERATLAS is an interactive, presentation-ready educational website that teaches all nine chapters of
*Cyber Security: Essential Principles to Secure Your Organisation*. It is built as both a deep study resource
and a polished deck for a 15–20 minute university presentation.

It contains **no quizzes, tests, flashcards, or scores** — the interactivity lives in **24 hand-built interactive
diagrams**, visual explanations, animations, comparisons, timelines and real-world case studies.

![Stack](https://img.shields.io/badge/React-18-57D8ED) ![TS](https://img.shields.io/badge/TypeScript-strict-5FE0BE) ![Vite](https://img.shields.io/badge/Vite-5-A78BFA)

---

## ✨ What's inside

- **Landing page** — animated network hero (assets · threats · defenses · recovery), chapter cards, progress & "Continue reading".
- **9 full chapters** — intro, learning objectives, detailed explanations, definitions, scenarios, real-world
  examples, common misconceptions, key takeaways and a concise presentation summary. Textbook material is visibly
  distinguished from added explanatory examples, and newer standard editions are clearly labelled.
- **24 interactive diagrams** gathered in the **Visual Lab** (organised by theme): CIA Triad, Regulation Explorer,
  Cyber Risk Development, Malware Lab, WannaCry Propagation, Social Engineering Journey, Phishing Anatomy, Secure
  SDLC, Waterfall vs. Agile, Secure Input Handling, Office Entry, Defense in Depth, Supply Chain Network, Cloud
  Shared Responsibility, Target Breach Path, Risk Matrix, Risk Treatment Tree, Security Control Timeline, Incident
  Response Lifecycle, Continuity vs. Recovery, Backup & Recovery Simulator, Five Security Foundations, ISMS Cycle,
  and the NIST CSF (with a CSF 2.0 / Govern toggle).
- **Case Studies** — WannaCry (2017), TalkTalk (2015), Bank Physical-Access Attacks (2013), Target (2013), Home
  Depot (2014), each with an interactive incident timeline.
- **Glossary** — 60+ terms with definitions, examples, chapter links and cross-references.
- **Presentation Mode** — a full-screen 15-slide deck with keyboard navigation, a progress indicator, speaker
  notes and embedded live diagrams.
- **Global features** — ⌘K / Ctrl-K search across chapters, concepts, diagrams and case studies; bookmarks;
  "mark as read" progress; dark/light themes; a reduced-motion toggle; responsive mobile navigation; a table of
  contents per chapter; back-to-top; and keyboard-accessible controls throughout.

All reading progress, bookmarks and theme/motion preferences are stored in `localStorage` — no backend required.

---

## 🧱 Tech stack

- **React 18** + **TypeScript** (strict) + **Vite 5**
- **Tailwind CSS** (design tokens drive dark & light themes via CSS variables)
- **Framer Motion** for transitions, scroll reveals and diagram animation
- **lucide-react** icons
- **React Router** for navigation
- Interactive diagrams are built with **hand-authored SVG + Framer Motion** for maximum reliability and
  responsiveness (no heavy diagramming runtime required). `recharts` and `reactflow` are available as dependencies
  should you wish to extend the visualisations.

---

## 🚀 Getting started

**Prerequisites:** Node.js 18+ (tested on Node 20).

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check + production build  ->  ./dist
npm run build

# preview the production build locally
npm run preview
```

---

## ▲ Deploying to Vercel

This repo ships with a `vercel.json` configured for a Vite SPA (static build + client-side routing rewrite).

**Option A — Dashboard (recommended)**
1. Push this repository to GitHub.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects Vite. Keep the defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

**Option B — CLI**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

No environment variables are required.

---

## 🗂 Project structure

```
src/
  components/      App shell (Sidebar, Topbar, Search, Layout), DiagramShell, BlockRenderer, UI primitives, NetworkHero
  context/         ThemeContext (dark/light + reduced motion), ProgressContext (read/bookmarks/last-visited)
  data/            Content model (types.ts), chapters/ (ch1–ch9), glossary.ts, caseStudies.ts, slides.ts, searchIndex.ts
  diagrams/        24 self-contained interactive diagrams + registry.ts (lazy-loaded, code-split)
  hooks/           useLocalStorage, useReducedMotionPref
  pages/           Landing, ChapterPage, VisualLab, Glossary, CaseStudies, Presentation, NotFound
  index.css        Design tokens + component utilities
```

Each chapter is pure data (`src/data/chapters/chN.ts`) rendered by a shared `BlockRenderer`, so content is easy to
edit without touching components. Each diagram is a standalone component registered in `src/diagrams/registry.ts`.

---

## ♿ Accessibility & motion

- Honours `prefers-reduced-motion` **and** an in-app reduced-motion toggle (looping/auto-play animation is gated).
- Keyboard-operable navigation, search, slides and diagram controls, with ARIA labels and focus-visible rings.
- Responsive from 320px up through desktop.

---

## 📚 Content & accuracy notes

CYBERATLAS provides original summaries and explanations based on the course's structure and concepts — it does not
reproduce copyrighted chapters verbatim. Case studies use widely-reported, verified details; simplified or
illustrative explanations (and illustrative risk ratings / recovery outcomes) are labelled as such. Where the
source material references older standard editions (e.g. ISO 27001's 114 controls, or the five-function NIST CSF),
the newer editions (ISO/IEC 27001:2022's 93 Annex A controls, NIST CSF 2.0's added *Govern* function) are noted and
clearly labelled. This project is for education and is not legal or professional security advice.

---

*Built as an independent educational project.*
