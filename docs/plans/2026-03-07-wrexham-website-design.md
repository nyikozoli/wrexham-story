# Wrexham FC Progress Website — Implementation Plan

## Context

Create a modern, premium single-page website documenting Wrexham AFC's journey since Ryan Reynolds and Rob McElhenney purchased the club in November 2020. The site tells the club's story through an immersive scrolling experience — timeline of key events, season-by-season stats, and notable players — aimed at fans who want to explore and celebrate the journey.

## Tech Stack

- **Vanilla HTML, CSS, JavaScript** — no frameworks
- **JSON data files** — hardcoded, no backend
- **Google Fonts** (Inter or similar modern sans-serif)
- **No build step** — open `index.html` in a browser or serve with any static server

## Project Structure

```
wrexham/
├── index.html
├── css/
│   ├── styles.css          # Variables, layout, typography, responsive
│   └── animations.css      # Scroll reveals, counters, hover effects
├── js/
│   ├── main.js             # Init, nav, scroll observer, progress bar
│   ├── timeline.js         # Render timeline from JSON
│   ├── seasons.js          # Render season cards, animated counters
│   └── players.js          # Render player cards with hover overlays
├── data/
│   ├── timeline.json       # Key events (date, title, description, category)
│   ├── seasons.json        # Season stats (league, position, W/D/L, goals, points)
│   └── players.json        # Notable players (name, position, stats, tagline)
└── assets/
    └── images/             # Club crest, placeholder images
```

## Page Sections (scroll order)

1. **Hero** — Full-viewport, dark cinematic background, club crest, "The Wrexham Story" heading, animated scroll indicator
2. **About the Takeover** — Brief narrative about Reynolds/McElhenney buying the club, why it matters
3. **Timeline** — Vertical timeline of key events (2020–present), alternating left/right, scroll-revealed
4. **Seasons** — Cards for each season with animated stat counters (position, wins, goals, points), promotion badges
5. **Notable Players** — Grid of player cards with hover overlays revealing stats
6. **Footer** — Credits, "Up the Town!" sign-off

## Design System

### Colors
- **Wrexham Red:** `#E4003B` (primary, CTAs, accents)
- **Dark:** `#0D0D0D` (backgrounds)
- **Dark surface:** `#1A1A1A` (cards, elevated surfaces)
- **White:** `#FFFFFF` (text on dark)
- **Green accent:** `#006747` (secondary accent from crest)
- **Muted text:** `#A0A0A0`

### Typography
- **Font:** Inter (Google Fonts), fallback system sans-serif
- **Headings:** 700 weight, large sizes, slight letter-spacing
- **Body:** 400 weight, 1.6 line-height, readable sizes
- **Stats/numbers:** Tabular nums, bold

### Layout
- Max content width: ~1200px, centered
- Generous vertical spacing between sections (80–120px)
- Mobile-first responsive (breakpoints at 768px, 1024px)

## Animations & Interactions

### Scroll-triggered reveals (Intersection Observer)
- Sections fade in + translate up on enter
- Timeline events appear sequentially
- Season cards stagger left/right
- Player cards scale up subtly

### Animated counters
- Season stats count from 0 to final value on scroll-in
- ~1.5s duration with ease-out

### Hover micro-interactions
- Cards: lift + shadow deepen
- Player cards: overlay slides up with stats
- Nav links: underline slides in
- Timeline dots: pulse

### Scroll progress bar
- Thin red bar at top of viewport showing scroll position

### Performance
- CSS `transform` + `opacity` only (GPU-accelerated)
- `will-change` on animated elements
- `prefers-reduced-motion` respected
- No scroll event listeners — Intersection Observer only

## Navigation

- Fixed/sticky top nav bar with section links
- Active section highlighted via Intersection Observer
- Smooth scroll on click (`scroll-behavior: smooth`)
- Transparent on hero, solid dark background after scrolling past

## Data Models

### timeline.json
```json
[
  {
    "date": "2020-11-16",
    "title": "The Takeover",
    "description": "Ryan Reynolds and Rob McElhenney complete their purchase of Wrexham AFC.",
    "category": "ownership"
  }
]
```
Categories: `ownership`, `promotion`, `signing`, `match`, `milestone`

### seasons.json
```json
[
  {
    "season": "2021-22",
    "league": "National League",
    "position": 2,
    "played": 44,
    "won": 28,
    "drawn": 8,
    "lost": 8,
    "goalsFor": 82,
    "goalsAgainst": 38,
    "points": 92,
    "highlight": "Narrowly missed automatic promotion, lost in playoff semi-final.",
    "promoted": false
  }
]
```

### players.json
```json
[
  {
    "name": "Paul Mullin",
    "position": "Striker",
    "seasons": "2021-present",
    "appearances": 120,
    "goals": 75,
    "tagline": "The goal machine who chose Wrexham over the EFL."
  }
]
```

## Implementation Steps

### Step 1: Project scaffolding
- Create folder structure
- Initialize `index.html` with semantic HTML skeleton (all 6 sections)
- Add Google Fonts link, CSS/JS references
- Create empty CSS and JS files

### Step 2: CSS foundation — `css/styles.css`
- CSS custom properties (colors, spacing, typography)
- Reset/normalize basics
- Layout: nav, sections, containers, grid
- Typography styles
- Responsive breakpoints (mobile-first)
- Nav styling (transparent → solid transition)

### Step 3: CSS animations — `css/animations.css`
- `.reveal` class for scroll-triggered elements (opacity 0 → 1, translateY)
- `.revealed` class applied by JS
- Stagger delays via CSS custom property `--delay`
- Hover effects for cards, nav, timeline
- Counter number transitions
- Scroll progress bar styling
- `prefers-reduced-motion` overrides

### Step 4: Data files
- Create `data/timeline.json` with real Wrexham events (2020–2025)
- Create `data/seasons.json` with actual season stats
- Create `data/players.json` with notable player data
- Research accurate data for all files

### Step 5: Core JS — `js/main.js`
- Fetch all JSON data on DOMContentLoaded
- Pass data to module render functions
- Set up Intersection Observer for `.reveal` elements
- Scroll progress bar logic
- Nav active section tracking
- Nav background transition (transparent → solid)

### Step 6: Timeline module — `js/timeline.js`
- Export `renderTimeline(data, container)` function
- Create alternating left/right event nodes
- Apply category-based accent colors
- Add `.reveal` classes with stagger delays

### Step 7: Seasons module — `js/seasons.js`
- Export `renderSeasons(data, container)` function
- Create season cards with stat grids
- Animated counter function (countUp)
- Promotion badge for promoted seasons
- Add `.reveal` classes with stagger

### Step 8: Players module — `js/players.js`
- Export `renderPlayers(data, container)` function
- Create player cards with image placeholder
- Hover overlay with stats
- Add `.reveal` classes

### Step 9: Polish & responsive
- Test on mobile viewport (375px)
- Test on tablet (768px)
- Fine-tune spacing, font sizes, breakpoints
- Verify all animations perform smoothly
- Test `prefers-reduced-motion`

## Verification

1. **Open in browser:** Serve with `npx serve .` or `python -m http.server` and open in browser
2. **Visual check:** All 6 sections render with correct content from JSON
3. **Scroll animations:** Elements reveal on scroll, counters animate, progress bar works
4. **Hover effects:** Cards lift, player overlays appear, nav links animate
5. **Navigation:** Clicking nav items smooth-scrolls to sections, active state updates
6. **Responsive:** Resize browser from mobile → desktop, verify layout adapts
7. **Reduced motion:** Enable "reduce motion" in OS settings, verify animations are disabled
8. **Performance:** No layout shifts, smooth 60fps scroll, no console errors
