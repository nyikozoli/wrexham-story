# CLAUDE.md — The Wrexham Story

## Project Overview
A single-page fan tribute website documenting Wrexham AFC's journey from the National League to the Championship under Ryan Reynolds and Rob McElhenney's ownership (2020–present).

## Tech Stack
- **Vanilla HTML/CSS/JS** — no frameworks, no build step, no bundler
- **Static JSON files** for data (`data/timeline.json`, `data/seasons.json`, `data/players.json`)
- **Self-hosted Inter font** (GDPR-compliant, no Google Fonts CDN)
- **CSS custom properties** design system with BEM-style naming
- **Dev server**: `python -m http.server 3000` (configured in `.claude/launch.json`)

## Project Structure
```
wrexham/
├── index.html          # Main single-page app
├── privacy.html        # Privacy policy (GDPR)
├── css/
│   ├── fonts.css       # Self-hosted @font-face declarations
│   ├── styles.css      # All component styles + responsive
│   └── animations.css  # Scroll reveals, hero animations, reduced motion
├── js/
│   ├── main.js         # App init, nav, scroll, observers
│   ├── timeline.js     # Timeline renderer
│   ├── seasons.js      # Seasons renderer
│   ├── players.js      # Player cards renderer (3D flip)
│   └── effects.js      # 3D tilt cards, parallax hero
├── data/
│   ├── timeline.json   # 16 timeline events (2020-2025)
│   ├── seasons.json    # 6 seasons (2020-21 through 2025-26)
│   └── players.json    # 8 key players/manager
├── fonts/              # Self-hosted Inter woff2 (400-800)
└── docs/plans/         # Design planning docs
```

## Key Design Decisions
- **No external requests** — fonts self-hosted, no analytics, no CDNs (GDPR compliant)
- **Semantic color system** for timeline categories: gold (ownership), blue (signing), white (match), green (promotion)
- **3D effects**: parallax hero, tilt season cards on hover, flip player cards
- **Accessibility**: skip-to-content link, `:focus-visible` styles, 44px touch targets, `prefers-reduced-motion` support
- **Legal safeguards**: disclaimer banner, "unofficial fan tribute" branding, trademark acknowledgments, softened financial claims

## Conventions
- CSS: BEM naming (`.block__element--modifier`), custom properties prefixed `--color-`, `--radius-`, `--shadow-`
- JS: ES5-compatible (no arrow functions, no `let`/`const`), IIFE pattern for modules
- Responsive: mobile-first, breakpoints at 768px
- Data: all content lives in JSON files, rendered to DOM via JS

## Running Locally
```bash
python -m http.server 3000
# Then open http://localhost:3000
```

## Important Notes
- All player/season statistics have been fact-checked against real Wrexham AFC records
- The 2025-26 season is marked `"ongoing": true` and needs periodic updates
- Timeline dates verified against primary sources (club announcements, ESPN, Sky Sports)
