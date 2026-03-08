# Wrexham FC Progress Website — Implementation Record

> Updated 8 March 2026 to reflect the actual implementation.

## Context

A modern, premium single-page website documenting Wrexham AFC's journey since Ryan Reynolds and Rob McElhenney purchased the club in November 2020. The site tells the club's story through an immersive scrolling experience — timeline of key events, season-by-season stats, and notable players — aimed at fans who want to explore and celebrate the journey.

**Live repo:** [github.com/nyikozoli/wrexham-story](https://github.com/nyikozoli/wrexham-story)

## Tech Stack

- **Vanilla HTML, CSS, JavaScript** — no frameworks, no build step, no bundler
- **Static JSON data files** — hardcoded, no backend
- **Self-hosted Inter font** — woff2 files in `fonts/` directory (GDPR-compliant, zero external requests)
- **ES5-compatible JS** — IIFE pattern, no arrow functions, no `let`/`const`
- **CSS custom properties** — BEM naming convention throughout
- **Dev server:** `python -m http.server 3000` or `npx serve .`

## Project Structure

```
wrexham/
├── index.html              # Main single-page app
├── privacy.html            # GDPR privacy policy page
├── CLAUDE.md               # Project context for Claude Code
├── README.md               # Project overview & docs
├── .gitignore              # OS, editor, .claude/ exclusions
├── css/
│   ├── fonts.css           # Self-hosted @font-face declarations (Inter 400-800)
│   ├── styles.css          # Variables, layout, typography, components, responsive
│   └── animations.css      # Scroll reveals, hero animations, reduced motion overrides
├── js/
│   ├── main.js             # App init, nav, scroll progress, Intersection Observers
│   ├── timeline.js         # Render timeline from JSON
│   ├── seasons.js          # Render season cards with animated counters
│   ├── players.js          # Render 3D flip player cards
│   └── effects.js          # 3D tilt cards (season), parallax hero
├── data/
│   ├── timeline.json       # 16 key events (2020–2025), fact-checked
│   ├── seasons.json        # 6 seasons (2020-21 through 2025-26), fact-checked
│   └── players.json        # 8 key players/manager, fact-checked
├── fonts/
│   ├── inter-400.woff2     # Inter Regular
│   ├── inter-500.woff2     # Inter Medium
│   ├── inter-600.woff2     # Inter SemiBold
│   ├── inter-700.woff2     # Inter Bold
│   └── inter-800.woff2     # Inter ExtraBold
└── docs/
    └── plans/
        └── 2026-03-07-wrexham-website-design.md  # This file
```

## Page Sections (scroll order)

1. **Scroll Progress Bar** — Fixed thin red bar at viewport top showing scroll position
2. **Navigation** — Fixed/sticky top nav, transparent on hero → solid dark after scrolling, mobile hamburger menu
3. **Disclaimer Banner** — Fixed bottom banner: "Unofficial fan site — not affiliated with or endorsed by Wrexham AFC."
4. **Hero** — Full-viewport, dark cinematic background with parallax gradients, "The Wrexham Story" heading with gradient text, animated scroll-down indicator
5. **About the Takeover** — Narrative about Reynolds/McElhenney buying the club, three animated stat counters (3 Promotions, 4 Leagues Climbed, 2020 Year of Takeover)
6. **Timeline** — 16 events on a vertical timeline (2020–2025), alternating left/right, category-colored dots, scroll-revealed
7. **Seasons** — Cards for each of 6 seasons with 8 animated stat counters (Position, Played, Won, Drawn, Lost, GF, GA, Points), promotion ribbon badges, ongoing season support
8. **Players** — 3D flip cards for 8 players/manager — front face shows profile, back face reveals stats on hover
9. **Footer** — "Up the Town!" tagline, credits, disclaimers, trademark acknowledgments, privacy policy link

## Design System

### Colors (CSS Custom Properties)
```css
--color-red: #E4003B;          /* Primary — Wrexham Red */
--color-red-dark: #B8002F;     /* Dark red variant */
--color-red-glow: rgba(228, 0, 59, 0.3);  /* Glow effect */
--color-green: #006747;        /* Secondary — from crest (promotion badges) */
--color-green-light: #008B5E;  /* Green text variant */
--color-amber: #D4A017;        /* Ownership/milestone timeline dots, ongoing season */
--color-amber-light: #F0C040;  /* Amber text variant */
--color-blue: #3B82F6;         /* Signing timeline dots */
--color-blue-light: #60A5FA;   /* Blue text variant */
--color-dark: #0D0D0D;         /* Page background */
--color-dark-surface: #1A1A1A; /* Card/elevated surfaces */
--color-dark-border: #2A2A2A;  /* Borders */
--color-white: #FFFFFF;        /* Primary text on dark */
--color-muted: #A0A0A0;        /* Secondary text */
--color-muted-light: #C0C0C0;  /* Tertiary text */
```

### Typography
- **Font:** Inter (self-hosted woff2), system sans-serif fallback stack
- **Weights used:** 400 (body), 500 (nav links), 600 (labels, badges), 700 (headings), 800 (titles, stat numbers)
- **Body:** 16px, line-height 1.6, antialiased rendering
- **Headings:** `font-size: clamp(32px, 5vw, 56px)`, letter-spacing -0.5px, weight 800
- **Hero title:** `font-size: clamp(48px, 10vw, 96px)` with gradient text via `background-clip: text`
- **Stats/numbers:** `font-variant-numeric: tabular-nums`, weight 800

### Layout
- **Max content width:** 1200px, centered
- **Container padding:** 24px
- **Section spacing:** 100px (desktop), 60px (mobile)
- **Nav height:** 64px fixed
- **Border radii:** 8px (sm), 12px (md), 16px (lg)
- **Responsive breakpoints:** mobile-first with `768px` and `1024px`

## 3D Effects

### Parallax Hero (`js/effects.js`)
- Background layer moves at 0.4× scroll speed with `scale(1.1)` to prevent edge gaps
- Hero background extends beyond viewport with `inset: -10%` and `will-change: transform`
- Content layer moves at 0.15× scroll speed (depth separation)
- Content fades to opacity 0 as user scrolls past 70% of hero height
- Uses `requestAnimationFrame` for smooth 60fps performance
- Only applies while hero is in viewport (performance guard: `scrollY < heroHeight * 1.5`)

### 3D Tilt Season Cards (`js/effects.js`)
- Mouse-tracking perspective rotation on season cards
- Max rotation: ±8 degrees on X and Y axes
- Transform: `perspective(800px) rotateX(Xdeg) rotateY(Ydeg) scale(1.02)`
- Cards use `transform-style: preserve-3d` for depth
- Smooth return to flat position on mouse leave: `transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)`
- No transition on mouse move (instant tracking)
- Uses `MutationObserver` to detect when season cards are dynamically rendered before attaching listeners

### 3D Flip Player Cards (`js/players.js` + `css/styles.css`)
- Container: `perspective: 1000px`, fixed height 480px (440px mobile)
- Inner wrapper: `transform-style: preserve-3d`, `transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)`
- On hover: `transform: rotateY(180deg)`
- Front and back faces: `backface-visibility: hidden`, `position: absolute`, full size
- Back face: pre-rotated `rotateY(180deg)`, red gradient glow, red border
- Front face: image area with large initials, name, position, tagline, seasons, "Hover for stats" hint with SVG icon
- Back face: red initials circle, name, position, large stat numbers (appearances, goals, clean sheets, assists), tagline
- Hint bar fades to opacity 0 on hover

## Animations & Interactions

### Scroll-triggered Reveals (Intersection Observer)
- `.reveal` class: opacity 0 → 1, translateY 30px → 0 (0.8s, ease-out cubic-bezier)
- `.reveal--left` / `.reveal--right`: translateX ±40px → 0 (timeline items)
- `.reveal--scale`: scale 0.95 → 1 (player cards)
- Stagger delays via CSS custom property `--delay` set per element in JS
- Observer threshold: 0.1, rootMargin: `0px 0px -50px 0px`
- One-shot: elements are unobserved after revealing

### Animated Counters
- Season stats count from 0 to final value using `requestAnimationFrame`
- Duration: 1500ms with ease-out cubic easing (`1 - Math.pow(1 - progress, 3)`)
- Triggered by Intersection Observer (threshold 0.3) per season card
- About section stats animated separately (threshold 0.5)
- Counter elements marked with `data-animated` to prevent re-animation

### Hero Entry Animation
- Sequential stagger: badge (0.2s), title (0.4s), subtitle (0.6s), scroll indicator (0.8s)
- `heroFadeIn` keyframe: opacity 0 → 1, translateY 20px → 0 (1s, cubic-bezier)

### Hover Micro-interactions
- **Season cards:** lift + red glow shadow on hover (`0 0 40px rgba(228, 0, 59, 0.1)`)
- **Player cards:** full 3D flip to reveal stats
- **Nav links:** red underline slides in from left (width 0 → 100%)
- **Timeline dots:** scale up to 1.3× with intensified category-colored glow
- **Nav toggle:** hamburger → X animation (CSS transforms)

### Scroll Progress Bar
- Fixed at viewport top, `z-index: 1001`
- Width updated via scroll event listener (`{ passive: true }`)
- Red bar, 3px height, no transition (instant)

### Performance
- CSS `transform` + `opacity` only for animations (GPU-accelerated)
- `will-change: transform` on animated elements (hero bg, cards)
- `requestAnimationFrame` for parallax and counters
- Scroll listeners marked `{ passive: true }`
- Intersection Observers instead of scroll listeners for reveals
- `font-display: swap` on all @font-face declarations

## Accessibility

- **Skip-to-content link:** Hidden, appears on tab focus, jumps to `#about`
- **Focus-visible styles:** 2px solid red outline with 3px offset, per-component tuning
- **Touch targets:** Minimum 44×44px on nav toggle, nav links padded
- **Reduced motion:** Full `prefers-reduced-motion: reduce` support:
  - All animations/transitions disabled globally
  - Scroll reveals show immediately (opacity: 1, transform: none)
  - Hero entry animation disabled
  - Player card flip disabled (back face hidden with `display: none`)
  - Flip hint hidden
- **Semantic HTML:** `<nav>`, `<section>`, `<footer>`, `<h1>`–`<h3>` hierarchy
- **ARIA:** `aria-label` on nav toggle button

## Navigation

- **Fixed top bar** with glassmorphism on scroll (`backdrop-filter: blur(12px)`, 95% opacity)
- **Transparent on hero** → solid dark after scrolling past hero (via Intersection Observer)
- **Active section tracking** via Intersection Observer with `rootMargin: '-20% 0px -60% 0px'`
- **Smooth scroll** on click (`scrollIntoView({ behavior: 'smooth' })`)
- **Mobile hamburger menu:** toggle button shows/hides vertical nav dropdown
- **Section links:** The Takeover, Timeline, Seasons, Players

## GDPR Compliance

- **Zero personal data collection** — no cookies, no analytics, no forms, no local/session storage
- **No third-party requests** — all fonts, CSS, JS, and data served from same domain
- **Self-hosted fonts** — Inter woff2 downloaded and served locally (was Google Fonts CDN)
- **Privacy policy page** (`privacy.html`) — covers data collection, hosting, GDPR rights, contact
- **Disclaimer banner** — fixed bottom bar, always visible, clearly marks site as unofficial
- **Footer disclaimers** — trademark acknowledgments, "not affiliated" notice

## Legal Safeguards

- **Disclaimer banner** at bottom of page (persistent, always visible)
- **"A Fan Tribute" badge** in hero section
- **Footer disclaimers:** separate paragraphs for credit, unofficial notice, and trademark acknowledgments
- **Softened financial claims:** "reportedly valued at" rather than definitive statements
- **Privacy policy link** in footer
- **Trademark acknowledgments:** Wrexham AFC and *Welcome to Wrexham* / FX Networks / Disney

## Data Models

### timeline.json (16 events)
```json
{
  "date": "2023-04-22",
  "title": "National League Champions!",
  "description": "Wrexham beat Boreham Wood 3-1 to clinch the National League title with a record 111 points...",
  "category": "promotion"
}
```
**Categories:** `ownership` (gold), `promotion` (green), `signing` (blue), `match` (white), `milestone` (gold)

Each category has a distinct dot color, glow effect, date text color, and category badge background.

### seasons.json (6 seasons)
```json
{
  "season": "2025-26",
  "league": "Championship",
  "position": 6,
  "played": 35,
  "won": 15,
  "drawn": 12,
  "lost": 8,
  "goalsFor": 54,
  "goalsAgainst": 45,
  "points": 57,
  "highlight": "Wrexham's first Championship season since 1982...",
  "promoted": false,
  "ongoing": true
}
```
- `promoted: true` → green border + "PROMOTED" ribbon badge
- `ongoing: true` → amber border + "ONGOING" ribbon + "In Progress" pill badge
- Stats displayed: Position, Played, Won, Drawn, Lost, GF, GA, Points

### players.json (8 entries)
```json
{
  "name": "Paul Mullin",
  "position": "Striker",
  "seasons": "2021 — 2025",
  "appearances": 170,
  "goals": 108,
  "tagline": "The Hollywood signing who delivered..."
}
```
Optional fields: `assists`, `cleanSheets` (rendered on back face if present). `null` values for manager entry (no appearances/goals).

## Data Accuracy

All statistics were fact-checked against real Wrexham AFC records (ESPN, Sky Sports, club announcements):

### Key corrections applied:
- **Paul Mullin:** goals 93 → 108
- **Ben Tozer:** appearances 100 → 60
- **Luke Young:** start year 2019 → 2018, appearances 251 → 259, goals 23 → 22
- **Ben Foster:** appearances 35 → 13, cleanSheets 15 → 5
- **Elliot Lee:** appearances 149 → 152
- **Arthur Okonkwo:** tagline "16 clean sheets" → "14 league clean sheets"
- **2021-22 season:** "5-4 on aggregate" → "5-4 after extra time" (single-leg playoff)
- **Grimsby playoff:** removed "on aggregate", added "single-leg" context and Waterfall 119th-minute detail
- **FA Cup:** added replay loss 3-1 at Bramall Lane
- **£100M valuation date:** 2024-10-01 → 2024-10-30

## File Details

### `index.html`
- Semantic HTML5 structure with skip-link, scroll progress bar, nav, disclaimer banner
- 6 content sections: hero, about, timeline, seasons, players, footer
- Dynamic content containers populated by JS modules
- CSS split across 3 files: `fonts.css`, `styles.css`, `animations.css`
- JS split across 5 files: `main.js`, `timeline.js`, `seasons.js`, `players.js`, `effects.js`

### `css/fonts.css`
- 5 `@font-face` declarations for Inter (weights 400, 500, 600, 700, 800)
- `font-display: swap` on all faces
- Sources point to `../fonts/inter-{weight}.woff2`

### `css/styles.css` (~1080 lines)
- CSS custom properties for all design tokens
- Full reset/normalize
- Component styles: nav, hero, about, timeline, seasons, players (3D flip), footer
- Disclaimer banner (fixed bottom)
- Skip-link and focus-visible accessibility styles
- Responsive breakpoints at 768px and 767px (max-width)
- Mobile: single-column timeline, stacked player cards, hamburger nav

### `css/animations.css` (~210 lines)
- Scroll reveal classes with directional variants
- Hero staggered fade-in keyframes
- Timeline dot hover pulse effects
- `will-change` declarations for performance
- Mobile nav toggle hamburger → X animation
- Full `prefers-reduced-motion` overrides (all animations disabled, flip cards hidden)

### `js/main.js`
- IIFE pattern, `'use strict'`
- `DOMContentLoaded`: loads JSON via `Promise.all` + `fetch()`, passes to renderers
- Intersection Observer for scroll reveals (one-shot, unobserves after reveal)
- Intersection Observer for counter animations (per season card + about stats)
- Intersection Observer for nav background transition (hero visibility)
- Intersection Observer for active section tracking (rootMargin tuned)
- Scroll progress bar via scroll event listener (`{ passive: true }`)
- Mobile nav toggle click handler

### `js/timeline.js`
- `renderTimeline(events, container)` — global function
- Creates alternating left/right timeline items with `DocumentFragment`
- Category-colored dots via `.timeline__dot--{category}` classes
- Category-colored date text via CSS custom property `--category-color`
- Category badge pills with colored backgrounds
- Date formatting: `formatDate()` converts ISO dates to "Mon DD, YYYY"
- Stagger delay: `index * 100ms`

### `js/seasons.js`
- `renderSeasons(seasons, container)` — global function
- Builds season cards with stat grids via `statBlock()` helper
- Handles `season.promoted` (green badge) and `season.ongoing` (amber badge + "In Progress" pill)
- `animateCounters(container)` — counts from 0 to target, 1500ms, ease-out cubic
- Guards against re-animation via `data-animated` attribute
- Stagger delay: `index * 150ms`

### `js/players.js`
- `renderPlayers(players, container)` — global function
- Creates 3D flip cards with front/back faces
- `flipStat(value, label)` helper for back face stat blocks
- Conditionally renders appearances, goals, cleanSheets, assists based on data presence
- Initials extracted from name for image placeholder and back face circle
- Stagger delay: `index * 100ms`

### `js/effects.js`
- IIFE pattern with `prefers-reduced-motion` early-return guard
- `initTiltCards()` — attaches mouseenter/mousemove/mouseleave to `.season-card` elements
- `initParallaxHero()` — parallax via `requestAnimationFrame` + scroll position
- `MutationObserver` on `#seasonsContainer` to detect dynamic rendering before init

### `privacy.html`
- Standalone page with inline `<style>` block (inherits `fonts.css` + `styles.css` for base)
- 7 sections: About, Data Collection, Hosting, Third-Party, GDPR Rights, Contact, Changes
- Dark theme matching main site
- "Back to The Wrexham Story" link

## Hosting

Recommended: **Cloudflare Pages** (free tier)
- Unlimited bandwidth, 500 builds/month
- No credit card required
- GDPR-friendly (EU data processing)
- Direct GitHub integration
- Custom domain support

## Verification Checklist

1. ✅ **Open in browser:** `python -m http.server 3000` → all sections render
2. ✅ **Data accuracy:** All stats fact-checked against real Wrexham AFC records
3. ✅ **Scroll animations:** Reveals trigger, counters animate, progress bar tracks
4. ✅ **3D effects:** Parallax hero, tilt season cards, flip player cards
5. ✅ **Navigation:** Smooth scroll, active state updates, mobile hamburger works
6. ✅ **Responsive:** Tested at 375px (mobile), 768px (tablet), 1280px (desktop)
7. ✅ **Reduced motion:** All animations disabled, flip cards hidden, content visible
8. ✅ **GDPR:** Zero external requests, self-hosted fonts, privacy policy, disclaimers
9. ✅ **Accessibility:** Skip link, focus-visible, 44px touch targets, semantic HTML
10. ✅ **Legal:** Disclaimer banner, unofficial branding, trademark acknowledgments
11. ✅ **Performance:** GPU-accelerated transforms, passive scroll listeners, Intersection Observers
