# Inspiration Canvas 02 — A24 by Ravi Klaassens (Project Showcase Scrolling)

- **Live URL**: [a24.raviklaassens.com](https://a24.raviklaassens.com/)
- **Case Study & Awards**: [Ravi Klaassens Case Study](https://www.raviklaassens.com/work/a24) · [Awwwards SOTD (7.65/10) & Dev Award (7.41/10)](https://www.awwwards.com/sites/a24) · GSAP Site of the Week · FWA of the Day · CSSDA WOTD
- **Role in V5**: **Project Showcase Scrolling & Inspection Inspiration** — tactile 3D physical-media browsing, continuous view transitions, and effortless keyboard/scroll discovery.

> **Screenshot Capture Note**: Run `node scripts/capture-v5-inspiration.mjs` locally to capture full-load 3D disc-shelf, flipped-disc, and film-detail screenshots into `docs/v5-inspiration/a24-raviklaassens/screenshots/`.

---

## 1. Core Concept & Creative Hook ("The Plus Point")
- **"Cinema You Flip Through"**: Reimagines A24's film & television catalog as a physical shelf of 3D discs ([Ravi Klaassens Case Study](https://www.raviklaassens.com/work/a24)).
- **Why It Wins**:
  - Turns a flat project index into a **tactile object inspection ritual**: scroll/arrow to flip through the shelf → `Space` to flip the disc over and inspect its back → `Enter` / click to open the full production dossier without losing spatial continuity.
  - **One Continuous Motion**: Switching between `Films`, `Television`, `Index`, and an individual production detail page happens inside a single persistent 3D WebGL stage with zero jarring hard cuts. Even the **404 page** plays along with the disc metaphor.

---

## 2. Tech Stack & Motion Architecture
Verified via [Awwwards SOTD](https://www.awwwards.com/sites/a24) and [a24.raviklaassens.com](https://a24.raviklaassens.com/):

| Layer | Technology | Responsibility |
| --- | --- | --- |
| **3D / WebGL** | **Three.js** | Renders the 3D physical disc shelf, specular disc surfaces, artwork textures (`disc.webp`), depth-of-field / spatial staging, and 180° disc-flip rotation. |
| **Animation Choreography** | **GSAP** | Smooth scroll-linked shelf progression, spring/expo camera focus transitions, preloader-to-hero reveal, and UI text mask reveals. |
| **Page Transitions** | **Barba.js** | Intercepts route navigation (`/` ↔ `/television` ↔ `/production/<slug>`) so the persistent WebGL canvas stays mounted while DOM metadata swaps seamlessly. |
| **Media & Audio** | Custom Video/Trailer Player + Optional Audio (`TAP FOR SOUND`, `PAUSE`, `00:00 / 00:00`, `SOUND`, `MAXIMIZE`) | Opt-in sound control; high-res WebP disc & trailer artwork served from BunnyCDN (`b-cdn.net`). |

---

## 3. Visual Design System, Palette & Typography

### Color System (Gallery-Grade Monochrome)
Verified via [Awwwards SOTD](https://www.awwwards.com/sites/a24):
- **Primary Canvas**: `#F2F2F2` (clean archival gallery off-white)
- **Primary Ink**: `#000000` (pure high-contrast black)
- **Design Principle**: Zero decorative accent colors in the chrome. Because the surrounding stage is strictly `#F2F2F2` and `#000000`, every project's disc artwork and trailer imagery supplies 100% of the visual color and mood.

### Typography & Spatial Hierarchy
- **Minimal Editorial Metadata**: Crisp uppercase micro-labels (`DIRECTED BY`, `YEAR`, `STARRING`, `PROJECTING`) paired with clean grotesque titles and pull-quote press reviews (`"Something Far More Haunting"` — *The Playlist*, 5/5).
- **Generous Negative Space**: The 3D disc occupies center stage with massive breathing room around it; metadata anchors cleanly to the perimeter so text never collides with the 3D object.

---

## 4. Section-by-Section Interaction & Transition Breakdown

1. **Preloader → Hero** *(Awwwards Element)*:
   - Loads initial disc textures cleanly, then resolves directly into the live 3D disc shelf without trapping the user behind a fake multi-second timer.
2. **Main Shelf (`Films` / `Television`)**:
   - **Horizontal/Depth Scroll Carousel**: Wheel scroll, drag, or `←` / `→` arrow keys glide smoothly from item `1 of 12` to `12 of 12`.
   - **Front Disc Focus**: Active title sits front-and-center; neighboring discs recede along the shelf axis in 3D space.
   - **Index Toggle (`Index 12`)**: Instant scannable list fallback (`Backrooms 2026`, `The Invite 2026`, `The Brutalist 2024`, etc.) so time-constrained visitors can jump directly to any item in 1 click.
3. **Disc Flip (`Space`)**:
   - Rotates the front disc 180° in place to reveal secondary details/credits — a rewarding tactile micro-interaction before committing to a full page navigation.
4. **Films → Detail Page Transition** *(Awwwards Element)*:
   - Pressing `Enter` or clicking the active disc flies/expands the 3D object into the production detail view (`/production/<slug>`), revealing Director, Year, Starring cast, press review quotes, and an embedded trailer player with `CLOSE / PAUSE / SOUND / MAXIMIZE`.
5. **Films → Television Transition** *(Awwwards Element)*:
   - Barba.js + GSAP morphs the shelf smoothly between categories in one continuous motion instead of reloading the canvas.
6. **Accessible Keyboard & Screen-Reader Hint**:
   - Explicitly surfaces control instructions: *"Use the left and right arrow keys to browse films. Press Enter to open the film in front, or Space to flip the disc over."*

---

## 5. What V5 Should Adapt for Abrar's Project Showcase
- **Physical Artifact Shelf for Engineering Builds**: Instead of movie discs, each of Abrar's flagship projects (e.g., *Fixo Flow*, *PacketLark*, *Framecast*, *The Neural Log*, *Agents at Work*) can be presented as a tactile 3D/2.5D **artifact slab, press plate, or hardware-inspired module** on a continuous scroll/arrow rail.
- **3-Step Inspection Flow**:
  1. **Scroll / Arrow (`← →`)** to glide across flagship projects with GSAP momentum.
  2. **Flip / Quick-Inspect (`Space` or hover/toggle)** to see architecture stack, key metrics, and live status right on the shelf without leaving the homepage.
  3. **Open (`Enter` / click)** to smoothly transition into the full Case Study route (via Astro View Transitions / Barba-style persistent canvas handoff).
- **Mandatory Index Shortcut**: Keep an `Index` toggle right next to the 3D showcase so recruiters can jump straight to Project #4 in a single click (directly solving the click-loop problem noted in the PDF!).
