# Inspiration Canvas 04 — Melon Studio (Editorial Polish & Conversion)

- **Live URL**: [melon.studio](https://melon.studio/)
- **Awards & Press**: [Awwwards Nominee (Nov 18, 2026)](https://www.awwwards.com/sites/melon-studio-product-portfolio) · [CSS Design Awards](https://www.cssdesignawards.com/sites/melon-studio-piotr-brzezinski/50638/)
- **Role in V5**: **Editorial Hierarchy, High-Craft Microinteractions & Client Conversion Flow** — how to blend avant-garde WebGL/shader personality with razor-sharp SaaS/engineering credibility.

> **Screenshot Capture Note**: Run `node scripts/capture-v5-inspiration.mjs` locally to capture full-load section screenshots into `docs/v5-inspiration/melon-studio/screenshots/`.

---

## 1. Core Concept & Creative Hook ("The Plus Point")
- **Design Engineer Credibility Meets Tactile Motion**: Portfolio of Piotr Brzeziński (Poznań, Poland) — *"Liquid blackletter type, a bending WebGL work ribbon, ember hovers and case studies told in motion."* ([Awwwards Nominee](https://www.awwwards.com/sites/melon-studio-product-portfolio), [CSSDA](https://www.cssdesignawards.com/sites/melon-studio-piotr-brzezinski/50638/)).
- **Why It Wins**: Strikes an extraordinary balance between **expressive art direction** (liquid blackletter accents, WebGL bending ribbon, burn-through transitions) and **scannable, high-conversion B2B clarity** (exact project counts, live availability status, transparent 4-step process, client wall with inline case-study badges, and a frictionless live-draft brief form).

---

## 2. Tech Stack & Motion Architecture
Verified via [Awwwards Nominee](https://www.awwwards.com/sites/melon-studio-product-portfolio) and [melon.studio/about](https://melon.studio/about):

| Layer | Technology | Role |
| --- | --- | --- |
| **Framework** | **Next.js** | Fast routing, SEO-friendly case study & article pages. |
| **Page Transitions** | **Barba.js** | **Burn-through page transition** *(highlighted Awwwards Element)* between Home, Work, Case Studies, About, and Contact. |
| **Animation & WebGL** | **GSAP** + **WebGL** | Velocity-reactive **bending WebGL work ribbon**, liquid blackletter type distortion, and smooth scroll choreography. |
| **Microinteractions** | CSS + GSAP | **Ember hover** effects, dual-layer rolling text buttons (`Show allShow all`, `More about meMore about me`, `Start a projectStart a project`), and split-character kinetic contact email. |

---

## 3. Section-by-Section Architecture & Conversion Flow
Verified via [melon.studio](https://melon.studio/), [melon.studio/work](https://melon.studio/work), and [melon.studio/about](https://melon.studio/about):

1. **Minimal Top Bar**:
   - Brand mark (`melon studio`), 4 clean links with live item counts (`work (7)`, `articles (7)`, `about`, `contact`), and zero visual clutter.
2. **Hero**:
   - Crisp positioning statement (*"I design and build websites and digital products."*) paired with live local clock (`10:00 UTC+1 Poznań, Poland`) and green-dot availability signal (*"Open to new projects."*).
3. **Latest Work — Bending WebGL Work Ribbon**:
   - Horizontal/scroll-reactive ribbon of 7 curated case studies (`Mastercard Music`, `All Aces Games`, `oneDynamics`, `Sawicki Legal`, `Huuuge Games`, `Interact`, `HiProMine`) with clean `Title · Scope, Year` metadata and a rolling-text `Show all` button.
4. **About & Capabilities**:
   - Concise 3-paragraph human story emphasizing **designing directly in code + AI workflows**, followed by a tight 4-pillar capability breakdown (`Product design`, `Design systems`, `Websites`, `AI and automation`) and a 4-step process (`01 Listen → 02 Prototype → 03 Build together → 04 Hand over`).
5. **Experience Timeline**:
   - Clean, scannable rows with company logo, name, role, and year range (`2024 – Present`, etc.) + a subtle one-line freelancer client roster below.
6. **Insights (Writing)**:
   - Compact editorial feed showing date (`Oct 7`), bold title, 1-sentence hook, category + read-time pill (`AI · 3 min read`), and crisp art-directed thumbnail.
7. **Clients Wall + Open-Slot CTA**:
   - Typographic grid of ~30 client names where selected entries carry an inline `Case study` link pill.
   - **Signature Conversion Hook**: The final cell of the client grid says **"This spot's open. Let's talk"** — turning social proof directly into a high-intent CTA!
8. **Testimonials Slider**:
   - Minimal quote stage with `← 01/03 →` pagination, reviewer name, title, and direct link to the matching case study (`Huuuge Games case study`).
9. **Kinetic Contact & Live-Draft Brief Form** *(Awwwards Element)*:
   - Giant split-character interactive email display (`h e l l o @ m e l o n . s t u d i o`) where each letter reacts individually to cursor hover/wave.
   - Dedicated Contact page features a **Brief form with live draft** preview so prospective clients see their message assemble cleanly in real time.
10. **Human Footer Strip (`Listening & Reading`)**:
    - Live/recent music track (`Now playing / Last played`) + current book (`Reading: The Umami Strategy — Aga Szóstek`) + live local time + legal links.

---

## 4. Button & Microinteraction Patterns to Borrow
- **Dual-Text Rolling Buttons**: Notice the DOM doubles the label (`Show allShow all`, `More about meMore about me`, `All notesAll notes`, `Start a projectStart a project`) — classic Awwwards hover roll where the top label slides up/out and the duplicate slides in from below on `expo.out`.
- **Ember Hover**: Subtle warm glow / contrast shift on interactive rows and cards without heavy layout shifts.
- **Count Badges in Nav**: Showing `work (N)` and `writing (57)` immediately signals depth and active craft without extra copy.

---

## 5. What V5 Should Steal (and Adapt for Abrar)
1. **Nav Item Counts + Live IST Clock & Availability**: `work (N)`, `blog (57)`, `IST · Ahmedabad`, `Open for AI & Full-Stack builds`.
2. **Dual-Layer Rolling Button Hover**: Crisp, zero-jank microinteraction across all primary CTAs.
3. **Interactive Kinetic Email + Live-Draft Project Brief**: Combine Melon's live-draft brief clarity with Carter's print-shop/engineering ticket personality.
4. **"This spot's open. Let's talk" Pattern**: High-conversion closing cell in the experience/collaboration grid.
5. **Burn-Through / Shader Page Transitions**: Use subtle GLSL/GSAP transitions between Astro routes without slowing down navigation.
