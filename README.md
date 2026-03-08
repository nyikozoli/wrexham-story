# The Wrexham Story

An unofficial fan tribute documenting the incredible journey of Wrexham AFC — from the fifth tier of English football to the Championship.

Three consecutive promotions. Five years. The impossible rise, powered by Hollywood.

## What is this?

A single-page website telling the story of Wrexham AFC since Ryan Reynolds and Rob McElhenney took over in February 2021. It covers:

- **The Takeover** — how two Hollywood stars bought a Welsh football club
- **Timeline** — 16 key moments from 2020 to 2025
- **Season by Season** — full stats for all six seasons (2020-21 through 2025-26)
- **Key Players** — the squad members who made the dream a reality

## Tech

Pure vanilla HTML, CSS, and JavaScript. No frameworks. No build step. No dependencies.

- Self-hosted fonts (GDPR compliant — zero external requests)
- 3D effects: parallax hero, tilt cards, flip player cards
- Fully responsive with accessibility features
- All data stored in static JSON files

## Run Locally

This is a static site — just serve the files with any HTTP server. Pick whichever you have installed:

**Option 1 — Just open the file** (simplest, no install needed):
```
Open index.html directly in your browser (double-click the file).
```
> ⚠️ Some browsers block `fetch()` from `file://` URLs. If data doesn't load, use one of the server options below.

**Option 2 — Node.js** (npx, no install needed):
```bash
npx serve .
```

**Option 3 — Python:**
```bash
python -m http.server 3000
```

**Option 4 — PHP:**
```bash
php -S localhost:3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Disclaimer

This is an **unofficial** fan-made site. It is not affiliated with or endorsed by Wrexham AFC, FX Networks, or any other organisation mentioned.

Wrexham AFC is a trademark of its respective owners. *Welcome to Wrexham* is a trademark of FX Networks/Disney. All statistics are believed to be accurate but are not guaranteed.

## License

This project is for personal/fan use. All football statistics and factual information are in the public domain.
