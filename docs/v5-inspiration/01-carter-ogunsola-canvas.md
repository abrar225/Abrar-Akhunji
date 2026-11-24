# Inspiration Canvas 01 — Carter Ogunsola

- **Reference URL**: [carterogunsola.com](https://carterogunsola.com/)
- **Recognition**: [Awwwards Site of the Day (7.51/10) & Developer Award (7.70/10)](https://www.awwwards.com/sites/carter-ogunsola) · [Fonts In Use](https://fontsinuse.com/uses/80500/carter-ogunsola-portfolio-website)
- **Role in V5**: Primary creative and architectural direction for a unified physical metaphor, monochrome restraint, and high-craft Astro + GSAP + WebGL motion systems.

> Run `node scripts/capture-v5-inspiration.mjs` locally to capture full-load section screenshots into `docs/v5-inspiration/carter-ogunsola/screenshots/`.

## 1. Creative Concept
- **Print Shop Metaphor**: The entire portfolio operates as a single physical print shop — a two-wheel press for projects on the home page, a studio lanyard pass on About, a typed correspondence sheet on Contact, and an interactive motion Lab.
- **Monochrome Focus**: The UI stays strictly neutral so active project media blooms from grayscale to full color on focus.

## 2. Tech Stack & Architecture
- **Static Astro + TypeScript + SCSS**: Zero unnecessary client hydration on core pages; modular lifecycle, transition conductor, reveal, and scroll/WebGL engines ([The Personal Starter](https://carterogunsola.com/writing/the-personal-starter)).
- **GSAP 3.15 (`Core` ticker, `Flip`, `CustomEase`)**: Unified frame-rate-independent damping loop with full `prefers-reduced-motion` fallbacks.
- **WebGL2 / GLSL & Three.js**: Mirrored-DOM plane rendering where semantic DOM slots define responsive layout rects and a WebGL canvas renders velocity-flexed media planes over them ([Paste-Up](https://carterogunsola.com/lab/paste-up)).

## 3. Palette, Typography & Spacing
- **Colors**: Paper `#D6D6D5`, Ink `#1E1E1E`, Muted Ink `rgba(30,30,30,0.7)`, Elevated Surface `#FDFCFB`, Subtle Fill `rgba(30,30,30,0.08)`, plus Light / Dark / System theme flip.
- **Typefaces**: **ABC Oracle** for all headings and body copy; **PP Neue Montreal Mono** strictly reserved for measured or typed data (status bar, timestamps, counters, lab specs).
- **Geometry & Curves**: Crisp `2px`–`4px` radii, `12px`/`16px` chrome rhythm, `cubic-bezier(0.16, 1, 0.3, 1)` (`expo.out`) reveals, and `cubic-bezier(0.5, 1, 0.89, 1)` (`quad.out`) button transitions.

## 4. Section-by-Section Motion & Interactions
- **Header & `⌘K` Command Palette**: Live monospace status strip (local clock, FPS, LCP, presence toggle, booking window), route-aware brand prefix (`CO::`, `CAbout::`, `CMotion::`, `CWriting::`), and keyboard-navigable `⌘K` modal with theme switch and changelog.
- **Home — Two-Wheel Press**: Scroll/wheel-driven project wheel with press-check inspection state and tabular vertical-strip odometer counters.
- **About**: Mouse-reactive studio lanyard badge, live status/activity panel, personal letter, 3-column experience table, and awards/features ledger.
- **Lab**: `List / Wheel / Grid` toggle powered by **GSAP Flip** (re-parenting real DOM cards with geometric-distance stagger) and pure `translateZ` 3D ring carousel under `4000px` perspective ([Rotating Gallery](https://carterogunsola.com/lab/rotating-gallery)).
- **Contact**: Interactive typed letter with topic chips, canvas signature pad, and live-updating intake receipt stub.

## 5. V5 Design Takeaways
1. Pair one expressive display/body sans with one technical mono strictly reserved for system readouts and metrics.
2. Keep the chrome monochrome so Abrar's AI/full-stack demos and Neural Log visuals supply the color spotlight.
3. Ship a `⌘K` command palette + live status bar (`AMD::IST`, GitHub activity, theme flip, version archive jump).
4. Use GSAP Flip continuity and velocity-flexed WebGL planes for showcase-to-index transitions.
5. Make Contact memorable with an interactive engineering brief/receipt experience.
