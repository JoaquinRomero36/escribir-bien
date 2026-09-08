# AGENTS.md — escribir-bien

## Project Overview
Spanish orthography training app for LATAM. React (CRA) + custom CSS variables design system. No external UI library.

## Commands
- `npm start` — dev server on localhost:3000 (hot reload)
- `npm run build` — production build to `build/` (CRA, subpath via `homepage` in package.json)
- `npm test` — react-scripts test (watch mode; usar `CI=true ... --watchAll=false` para CI)
- `npx eslint src --quiet` — lint (react-app config)

## Architecture
```
src/
├── App.js              # Main app: Landing + ThemeProvider + state machine ('landing'|'categories'|'exercise'|'results'|'flashcards')
├── App.css             # Component styles (uses CSS variables from globals.css)
├── index.js            # Entry point
├── styles/globals.css  # Design tokens (colors, radius, spacing, shadows, motion)
├── context/ThemeContext.js  # Dark/light mode + localStorage persistence (safe try/catch)
├── components/
│   ├── Logo.js         # Logo (pluma + check) usado en Header y hero
│   ├── icons/index.js  # All SVG icons (inline, tree-shakable)
│   ├── exercises/      # Tarjetas de categoría (button accesible), ExerciseView (MC only)
│   └── study/          # Flashcards
├── data/exercises.js   # Categorías + generación MC (getSmartOptions)
├── data/exercises2.js  # Lote 2: flashcards + MC + textos + getSmartOptions/generateMisspellings
└── hooks/useSound.js   # Web Audio feedback (lazy AudioContext + persistencia)
```

## Génesis de opciones (regla crítica)
Las opciones de un ejercicio SIEMPRE son malas escrituras de la MISMA palabra según la
categoría (H: quitar/añadir h · B/V: swap · S/Z: swap · tildes: quitar tilde · etc.).
Nunca otra palabra. `getSmartOptions(answer, category, preferred)` en `data/exercises2.js`.

## Design System (globals.css)
All styling uses CSS custom properties. **Do not hardcode values.**

Key token groups:
- Colors: `--primary` (lime `#aff33e`), `--accent` (green `#f0fdf4`), `--foreground`, `--background`, `--card`, `--border`, `--muted`, `--destructive`
- Radius scale: `--radius-sm` (4px) → `--radius-md` (8px) → `--radius-lg` (12px) → `--radius-xl` (16px) → `--radius-2xl` (24px) → `--radius-full`
- Spacing: `--space-1` (4px) ... `--space-9` (96px) — 4px base unit
- Shadows: `--shadow-level-1` ... `--shadow-level-4` + `--shadow-glow-primary`
- Motion: `--motion-fast` (120ms), `--motion-base` (200ms), `--motion-slow` (350ms), `--motion-bounce` (400ms) — all with custom cubic-bezier

Dark mode: `.dark` class on `<html>` (set in public/index.html). ThemeContext toggles class + persists to localStorage.

## Component Conventions
- Icons: inline SVGs in `components/icons/index.js` — import named exports
- Buttons: `.btn`, `.btn-primary`, `.btn-lg`, `.btn-ghost`, `.btn-accent`
- Cards: `.feature-card` (with `.highlight` variant)
- Badges: `.badge` (pill, uppercase, tracking-wide)
- Form inputs: not yet implemented — follow radius/spacing tokens when added

## State Management
- Theme only: React Context (`ThemeContext.js`)
- No global state lib. Exercise progress → localStorage (planned)

## Routing / Navigation
Currently single-page (Landing). Exercise flow will be conditional rendering in App.js based on state (no react-router).

## Adding Exercises
1. Add dataset in `src/data/` (JS module exporting arrays by category)
2. Create exercise components in `src/components/exercises/`
3. Wire into App.js state machine (view: 'landing' | 'category-select' | 'exercise')

## Gotchas
- Windows case-sensitive imports: `index.js` not `Index.js` (webpack fails)
- Dev server stays alive in background after tool timeout — check `netstat -ano | findstr :3000` before restarting
- CSS variables defined in `:root` and `.dark` — always update both for new tokens
- `public/index.html` has `<html class="dark">` for default dark mode
- No TypeScript, no ESLint custom config beyond react-app defaults

## Current Focus (from conversation)
Building exercise system by category:
- General (all error types)
- 9 specific categories: H, B/V, Y/LL, SH/X, ci/si, ce/se, s/z, accents, ambiguous words (yendo/llendo, a ver/haber, etc.)
- Exercise types: fill-in-the-blank, multiple choice, correct-the-sentence
- Sound feedback + animations for dopamine/retention