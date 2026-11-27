# V5 BRIEF: Rebuild Version 5 of Abrar Akhunji's portfolio from scratch

This file is the single source of truth for V5. Re-read it, and `docs/v5/STATE.md`, at the start of every session and after any context compaction.

## 0. Inputs

| ID | Input | Value |
|----|-------|-------|
| I1 | Repository and the command that runs each version (V1 to V5) | Discover from the repo. Record in STATE.md |
| I2 | Screenshots of the current (rejected) V5: Home, Work, About | `docs/v5/inputs/current-v5/` |
| I3 | Reference image for paper-cutout, multi-layer section dividers | `docs/v5/inputs/reference/` |
| I4 | GitHub profile with the animation collection | [PASTE URL] |
| I5 | Specific award sites or entries whose motion I like (optional) | [PASTE URLS] |

If an input is missing or still says [PASTE], do not guess it or substitute another one. Record it as missing, tell me at the next gate, and continue with work that does not depend on it.

## 1. Role

Work as three seniors in one, and make each accountable:
- **Senior UI/UX engineer:** information architecture, layout, typography, usability, accessibility, a recruiter's journey.
- **Senior motion and motion-graphics designer:** concept, storyboard, choreography, timing, easing, continuity, art direction.
- **Senior front-end developer:** architecture, rendering performance, WebGL and shaders, responsive behaviour, clean code.

## 2. Outcome

A new V5 that is unmistakably a different design generation from V1 to V4, and clearly stronger than V4, which is the bar to beat.

It is a **motion-graphics-led, interactive, Gen Z editorial portfolio**: it should feel like a directed motion piece that the visitor controls. It must still work as a recruiting tool.

Audience: a recruiter or engineering hiring manager with little time, often on a phone.

What "it has feeling" means here. Each item must be visible in the running site:
1. **Continuity:** objects, shapes or colour carry from one section into the next. Sections are scenes in one film, not stacked blocks.
2. **Causality:** what the visitor does (scroll speed, direction, pointer, touch, drag) visibly changes what happens.
3. **Weight:** motion has mass, anticipation, overlap, follow-through and settling. One generic fade-up reused everywhere is a failure.
4. **Rhythm:** intense scenes alternate with calm ones. Not everything moves at once.
5. **Authorship:** the visuals come from Abrar's real work and story, so they could not be moved to another person's portfolio by changing the name.

## 3. Why the current V5 is rejected

Confirm each point against the running build and the screenshots, then add your own findings.
- **One section template repeated.** "Selected work", "How it works", "From model to interface" and "The Neural Log" use nearly the same recipe: small label, oversized heading, accent dot, then boxes.
- **Static, flat composition.** Mostly flat rectangles with thin borders. Changing the background colour is doing the job that layout and motion should do.
- **Weak dividers.** Wavy and torn edges recur as flat shapes. They separate sections without telling a story or reading as layered paper. The "Have a role in mind?" call to action is a thin strip squeezed between two of them, followed at once by a second call to action in the footer.
- **The strongest asset is underused.** The blue grid atmosphere is mostly a hero and header frame.
- **Inner pages are generic.** Work is filter chips, a carousel and alternating rows. About is a standard two-column résumé.
- **Possible defects.** In the full-page screenshot, an article title in "The Neural Log" looks crowded or colliding, some links and buttons ("Architecture & evidence", "Work with me") look partly clipped, and the quote on the pink note is barely visible. These may be mid-animation capture artefacts. Reproduce each in a browser before calling it a bug.

## 4. Scope and safety

**Order matters: back up, extract, then erase.**
1. Create a backup branch or tag of the current state. Work on a new branch.
2. Before removing anything, extract from current V5: every colour token and gradient with exact values from the code (both themes), the blue background treatment, fonts, content, data, routes and SEO setup. Save to `docs/v5/extracted/`.
3. Then remove the current V5 presentation layer (layouts, visual components, styles, animations) and design from zero. Do not iterate on it.

**Keep:** the current V5 colour palette, with its blue background as the signature colour world. Preserve the supporting colours too. You may create tints, shades, gradients, lighting and materials derived from these tokens, and may change proportions and where each colour is used. Do not introduce a new unrelated hue. Never guess hex values from screenshots.

**Keep:** real content and assets, content models, data fetching, public URLs, SEO metadata, structured data, sitemap, redirects, analytics and working form or contact logic.

**Do not modify V1 to V4.** If shared code must change, prove with before-and-after screenshots that they still render the same.

**No old visual components.** No layout, card, nav, footer, divider, cursor or animation component from V1 to V5 is reused or lightly re-skinned. Non-visual logic, utilities and unstyled accessible primitives may be reused.

**Every V5 page is natively V5.** This is a hard requirement. Navigating from V5 must never land on a V4 (or V3, V2, V1) interface, layout, header, footer, loader, 404 or transition. This covers clicks, direct URL loads, refresh, back and forward, deep links and error states. An intentional version switcher, if one exists, is the only allowed way out.

Build the route inventory from the code, not from memory. At minimum check: Home; Work; every project case study (the screenshots show ten projects); Writing index; every article template; About; Hire; Contact; Résumé; Agents at Work; Privacy; Terms; search; 404; loading and empty states; menu and overlays. The public site abrarakhunji.com may be a different build from this repo: use it only to spot missing routes or content, never as the V5 design source.

**Truth rule.** Never invent projects, metrics, testimonials, client logos, awards, dates, skills or product screenshots. If a design needs data that does not exist, change the design.

**Ask me before:** production deploy, force push, deleting anything outside the V5 presentation layer, changing public URLs, paid services or licences, secrets or API keys I have not provided, and rewriting factual claims.

## 5. Phase 0: audit and critique (no design code)

Run every version and capture every route at desktop and mobile. Capture viewport screenshots at several scroll positions and record the motion. A single full-page screenshot is not enough for scroll-driven pages.

Write `docs/v5/CRITIQUE.md`. For **each of V1, V2, V3, V4 and current V5**, cover: concept; hierarchy; layout and section variety; typography; colour; components; motion and interaction; transitions; mobile; accessibility; performance; recruiter clarity. For every finding give: evidence (route, screenshot), why it matters, and a decision: **keep the principle / evolve it / never repeat it**.

End with:
- a comparison matrix across all versions;
- the specific things V4 does well that V5 must beat, and how;
- an "already used" list of layouts, components and effects that V5 must not repeat.

If a version cannot be run, say so. Do not critique what you have not seen.

## 6. Research and references

Open references in a real browser, scroll and interact. Reading page HTML tells you nothing about motion. For each reference record: what you observed, the technique, why it works, and how you would transform it for this concept. Extract principles. Do not clone a site's layout, assets, code or identity.

- https://www.awwwards.com/ : study specific winning sites, not just the homepage.
- https://cuetone.co.nz/ : study scroll, card, background and typography motion, and pacing.
- I4 and I5, if provided.
- Search for further award-level GSAP, Motion, Three.js and shader work and open-source repositories. Check each repository's licence before using code.

If a site cannot be accessed, say so. Never describe motion you did not observe.

## 7. Phase 1: three directions, then stop

Create three directions that differ in **organising idea, navigation model, composition and signature interaction**. Three colour or font variations of one layout do not count.

**Direction A is seeded by me: "Climb from model to interface."** The story rises through the layers of Abrar's work: raw signal and model, then inference, system, and finally the interface people touch. A signature object transforms as the visitor climbs (for example voice signal to tokens to a working app window, grounded in real projects). This gives bottom-to-top travel a reason to exist. Improve it freely. Invent B and C yourself.

**Bottom-to-top experiment (Direction A, Home only).** My idea: the site loads at the bottom, the hero is there, and the visitor scrolls **up** through the sections one by one. Prototype both:
- **Literal reverse:** the page opens at the bottom and native upward scrolling advances the story. Do not invert or hijack wheel or touch input. DOM and keyboard order must follow the story, starting at the hero. Handle first paint with no visible jump, scroll restoration, back and forward, refresh, anchors, find-in-page, resize, the mobile address bar and scroll-trigger recalculation. Give a clear visual cue to scroll up.
- **Perceived ascent:** normal native scrolling, while the camera and scenes make it feel like climbing.

On mobile and with reduced motion, default to ordinary downward reading unless testing shows the literal version is just as clear and I approve it. Report the trade-offs honestly. I choose at Gate 1.

**Deliver for each direction:**
- the one-sentence concept and why it belongs to this person;
- art direction: **named typefaces** with roles and licences, type scale, grid logic, colour proportions from the extracted tokens, material and lighting language, imagery plan;
- one memorable signature moment;
- a storyboard of the whole Home page, with desktop and mobile composition;
- style frames;
- a **running motion prototype** of the opening plus one transition into the next scene. Words and static mock-ups are not enough to judge feel;
- main risks: performance, usability, effort.

Imagery: lead with real project screenshots, real product UI and Abrar's real photo. Image generation may be used for concept frames, textures and abstract art, never for fake product UI, fake people or fake evidence. Custom SVG, shaders and procedural 3D are explicitly requested and allowed. Do not add decorative numbering, filler badges or text that only repeats what the layout already says.

Score all three with the rubric in section 14 and recommend one. **GATE 1: stop and wait for my choice.** Do not start the full build.

## 8. Design system and section contract (after Gate 1)

Write `docs/v5/DESIGN.md` with: the chosen concept; tokens; type; grid and spacing; depth, material and lighting rules (lighting must change meaningfully between scenes); a motion language (durations, easing curves, spring values, stagger, what each kind of motion means); the cursor and touch language; and the icon rule.

Add a **section contract table** covering every section and page type, with these columns:
`purpose | content | layout archetype | background and lighting | typography behaviour | primary motion | interaction | transition in and out | mobile composition | reduced-motion version | performance tier`

**Anti-sameness rules:**
- No layout archetype repeats on Home.
- Adjacent sections must not share a layout archetype, primary motion or transition type.
- No default "eyebrow, big heading, card grid" recipe.
- Work, case studies, Writing, articles, About and Contact each get their own composition while clearly belonging to one system.
- **Silhouette test:** take one resting screenshot of each section, remove text and colour (blur plus grayscale). A fresh reviewer must be able to tell the sections apart by structure alone.

## 9. Page requirements

**Every page** is designed, formatted, animated and finished to the same standard. Home must not receive all the effort.

- **Hero:** within the first viewport after loading: name, role, what he builds, location, availability, and clear routes to work, résumé and contact.
- **Navigation:** a new V5 navigation, including a creative fullscreen menu if the concept supports it. It must always be easy to find.
- **Featured work:** present projects as interactive evidence, not thumbnails in boxes. For each: problem, what he built, key technical decision, stack, status, links.
- **How it works:** the current Home gives a whole section to one product. Move it into that case study unless the chosen concept uses it as the narrative spine.
- **Work index:** fast scanning and filtering of all projects, with a new way of browsing them.
- **Case studies:** a visual narrative with architecture drawn or animated from real facts.
- **About:** experience, education and credentials told as a designed story, not a résumé list.
- **Writing and articles:** expressive index; calm, highly readable article body. No cursor or background effect may compete with reading, code blocks or diagrams.
- **Contact, footer and the call to action:** a real finale, redesigned from scratch.
- **404, loading and legal pages:** V5-native. Legal pages stay calm.

**Section differentiators.** Boundaries between sections are designed scenes, informed by I3: layered paper cutouts with real depth and shadow, liquid-paper tears and peels, morphing SVG edges, folds, masks or shader wipes. Drive them with scroll where it helps the story, and vary them according to what each boundary means. One wave SVG reused with new colours is a failure.

## 10. Motion, 3D, physics and cursor

**Required.** These must exist in V5, in a form that serves the chosen concept:
- R1 Creative, scroll-driven animation that shapes structure and layout, not only entrances
- R2 Creative per-section formatting and layout
- R3 A custom **animated bento grid**: cells have different behaviours, respond to input and re-arrange meaningfully
- R4 A liquid or similarly fluid motion background
- R5 Motion-oriented cursor effects that **interact with the background**
- R6 Paper-cutout and liquid-paper style section differentiators
- R7 Interactive, immersive **3D** with a narrative role
- R8 A creatively designed preloader
- R9 Strong motion-graphics background design

**Explore.** I am also open to, and interested in: multiple horizontal and vertical scroll sequences; physics-based behaviour across the site; ASCII-style animation; bottom-to-top storytelling.

**Effect ledger.** Create `docs/v5/LEDGER.md`. Evaluate **every** row below. Mark it `SIGNATURE`, `SUPPORT` or `REJECT` with a one-line reason, the section where it lives, the library, the mobile and reduced-motion versions, and, once built, proof. No row may be skipped. Using all of them is **not** the goal; choosing well is. A rejected row never cancels a Required item above.

| # | Effect | # | Effect |
|---|--------|---|--------|
| 1 | Parallax layers | 22 | Aurora |
| 2 | Pinned sections | 23 | Image destruction on hover |
| 3 | Horizontal scroll sections | 24 | Scroll-driven 3D model |
| 4 | Scroll scrub | 25 | Physics objects |
| 5 | Image zoom to full screen | 26 | Fluid simulation |
| 6 | Section colour change | 27 | Grain noise overlay |
| 7 | SVG path drawing | 28 | Preloader |
| 8 | Velocity marquee | 29 | Page transition |
| 9 | Split-text reveal | 30 | Shader element transition |
| 10 | Scroll text fill | 31 | Fullscreen menu |
| 11 | Kinetic typography | 32 | Bento grid |
| 12 | Rolling text hover | 33 | Asymmetric overlapping grid |
| 13 | Custom cursor with lerp smoothing | 34 | Oversized typography |
| 14 | Cursor morph | 35 | Split screen |
| 15 | Magnetic buttons | 36 | Fullscreen snap section |
| 16 | Spotlight | 37 | Neon |
| 17 | Flashlight reveal | 38 | Brutalism |
| 18 | Fluid metal-ball cursor | 39 | Glassmorphism |
| 19 | Interactive 3D background | 40 | Dark/light toggle animation |
| 20 | Shader gradient | 41 | Project-list hover preview |
| 21 | Mesh gradient | 42 | Draggable infinite slider |

**Composition rules:**
- Each scene has one primary motion idea; everything else supports it.
- One coherent background system with distinct states per scene is better than competing aurora, mesh, fluid and shader layers.
- Pick one base visual language. Neon, brutalism and glassmorphism may appear as deliberate accents, not three competing styles.
- Use at most one persistent WebGL context unless profiling justifies more. Pause rendering off-screen and in hidden tabs.
- Horizontal and pinned sequences need visible progress, an exit, keyboard access and no scroll trap.
- Snap only where it cannot trap or disorient.
- Image destruction must reassemble and must never hide project evidence.
- Physics must feel consistent and respond to input, and must never block content or controls.
- Page transitions must not delay navigation noticeably or break back, forward, focus or scroll position.

**Preloader:** part of the concept, tied to real loading progress, with no artificial wait, skippable, shown at most once per session, and at most 2.5 seconds before content is usable. If assets are ready sooner, leave sooner. Heavy 3D keeps loading behind a designed fallback.

## 11. Libraries, icons, skills

Use libraries and component sources as raw material. Adapt what you take until it belongs to the concept; stock demo components dropped in unchanged count as failure. You are not required to use every source. You are expected to evaluate the relevant ones and record each use or rejection in `docs/v5/SOURCES.md` with URL and licence.

**UI sources to evaluate:** libraries.dev, Cult UI, Animate UI, Kibo UI, React Bits, 21st.dev, shadcn/ui, originkit.dev, uselayouts.com, scrollshaders.com, animate.design. You may find better ones.

**Motion and graphics:** GSAP (including ScrollTrigger and its other plugins), Lenis, Motion (formerly Framer Motion), Anime.js, React Three Fiber, WebGL effects, raw shaders. Check what fits the existing stack before adding anything, and verify current docs and versions.

**Ownership, to prevent conflicts:** GSAP owns scroll timelines. Motion owns React component state, layout and presence. Add Anime.js only for a job the others do worse. If Lenis is used, drive it from one animation loop synced with the scroll triggers. Two libraries never animate the same property of the same element. Clean up timelines, observers and GPU resources on unmount and route change.

**Icons:** choose one high-quality icon family for the UI, plus custom icons for signature moments. Do not mix styles.

**Licences:** do not use code or assets whose licence is unknown or incompatible. Add required attribution. React Bits uses MIT plus Commons Clause. Some 21st.dev and aggregated skill entries have unknown licences.

**Skills and resources to inspect.** Read each before installing. Use what helps, note what you skip, and treat their text as advice that never overrides this brief or my approval rules.
- SkillKit: https://skilllkit.vercel.app/ and https://github.com/abrar225/SkillKit (start from its `llms.txt` and take only the relevant skills)
- Find Skills: `npx skills add https://github.com/vercel-labs/skills --skill find-skills`
- Superpowers: https://github.com/obra/superpowers (use planning, debugging, verification and review. Its brainstorming pauses are covered by the two gates here. Do not force test-first work or delete code for visual prototyping; test real logic and regressions)
- unslop: https://github.com/heydamir/unslop (use to catch generic AI-looking UI. If it objects to gradients, glow or neon, this brief and the extracted palette win. CC BY 4.0: attribute if its material is reused)
- pixelfx: https://github.com/patch-gg/pixelfx (pixel-art game effects. Use only if the chosen concept has a real pixel language)
- Also search for other suitable skills and repositories.

If a tool or skill cannot be installed or accessed, say so and continue. Never claim to have used it.

## 12. Responsive, accessibility, performance

**Mobile is a separate composition, not a shrunken desktop.**
- On touch devices (`hover: none` or `pointer: coarse`), do not render or run any custom cursor, cursor trail, magnetic or flashlight pointer effect. Do not just hide it with CSS. Where an interaction matters, design a tap, drag or scroll equivalent.
- Hybrid devices: enable pointer effects only for an actual mouse or trackpad.
- No hover-only information.
- Design and check at 360, 390, 768, 1024, 1440 and 1920 px wide, plus a short landscape viewport.
- Scale 3D, particles, shaders, device pixel ratio and textures by device capability, with a good static or lightweight fallback.

**Accessibility:** WCAG 2.2 AA contrast, semantic structure, full keyboard use, visible focus, usable screen-reader order, no content that exists only inside a canvas, and pause controls for long-running motion. `prefers-reduced-motion` gets a designed calm version with all content, no scroll hijacking and no forced pinning.

**Performance targets** (measure on a production build; any exception needs measured evidence and my approval):
- Mobile lab: LCP at or under 2.5 s; CLS at or under 0.1; total blocking time at or under 300 ms.
- Interactions respond within 200 ms.
- Aim for 60 fps on a typical laptop and at least 45 fps on a mid-range phone. State how you measured. If you only have throttled emulation, call it emulation.
- Lazy-load 3D and heavy shaders. Text and primary actions must not wait for them.
- Report JavaScript, 3D, image, video and font weight per key route.

## 13. Execution loop

**Phases**
| Phase | Work | Ends with |
|-------|------|-----------|
| 0 | Backup, extraction, route inventory, critique, research | CRITIQUE.md, route list |
| 1 | Three directions with motion prototypes | **GATE 1: my approval** |
| 2 | Vertical slice: chosen preloader, hero, one differentiator and one full content scene, finished on desktop and mobile | **GATE 2: my approval of the feel** |
| 3 | Build every remaining section and page | All routes complete |
| 4 | Hardening: responsive, accessibility, performance, browsers | Hard checks pass |
| 5 | Final independent audit | Final report |

**State on disk** in `docs/v5/`: `STATE.md` (phase, done, next, blockers, how to run), `DECISIONS.md`, `LEDGER.md`, `SOURCES.md`, `SCORECARD.md`, `routes.md`, `evidence/`. Update after every iteration. Commit working checkpoints.

**Inner loop for each scene or page:**
1. State the intent and acceptance checks.
2. Build.
3. Run it in a real browser.
4. Capture evidence: screenshots at 0, 25, 50, 75 and 100% of the scene's progress on desktop and mobile; a recording of scroll and interaction; console output. If you cannot watch the recording, extract a dense frame sequence from it.
5. **Look at the images.** Passing a build proves nothing about design.
6. Send the evidence to a fresh critic subagent that has not seen your reasoning or code. It scores with section 14 and lists the biggest defects.
7. Fix the top defects, recapture and rescore. Re-check earlier scenes affected by shared changes.

**Loop limits:** exit when every score is at least 4 and hard checks pass. If the weakest score does not improve for two rounds, change the design or technique; stop tweaking values. After five rounds, record what is still failing, why, and your best option, mark it FAILED, continue independent work and show me at the next gate. Never lower the bar, edit the rubric or mark something passed to finish.

**Initiative:** between gates, keep working. Make reasonable, reversible assumptions and log them. Stop only at a gate, for an "ask me before" action, for a decision that changes scope, or when truly blocked.

**Subagents:** use them for parallel audits and independent review. One owner controls shared design tokens, motion system and global files, to avoid conflicting edits and style drift.

**At each gate, send me:** how to open it, what to try, screenshots and recordings, scores, the weakest part in your own words, missing inputs, and the exact decision you need.

## 14. Definition of done

**Scored rubric, 0 to 5. Every dimension needs at least 4.**
Anchors: 1 = template-like or broken; 3 = competent but forgettable; 4 = distinctive and polished, with minor issues; 5 = exceptional and specific to this person.
1. Distinctiveness from V1 to V4 and from generic templates
2. Concept coherence
3. Section and page differentiation
4. Motion craft: choreography, timing, easing, continuity
5. Interaction depth, including 3D, physics and background response
6. Typography, layout and finish
7. Recruiter clarity
8. Mobile experience

Also run a side-by-side with V4: give a fresh critic equivalent captures labelled only X and Y, in random order. V5 should win on dimensions 1, 3, 4 and 5 without losing on 7. Agent scores are a filter, not proof. My judgement at the gates is final.

**Hard checks, pass or fail:**
- [ ] V1 to V4 unchanged
- [ ] Extracted palette preserved
- [ ] Every route in `routes.md` is V5-native, verified by an automated crawl of internal links and direct loads (for example a V5 root marker) plus visual review of each page type
- [ ] No imports of old visual components into V5
- [ ] R1 to R9 implemented, each with evidence
- [ ] All 42 ledger rows decided; every non-rejected row verified in the browser
- [ ] Silhouette test passed
- [ ] Recruiter test: a fresh reviewer, shown the first screen on mobile and desktop, can say who this is, what he builds, whether he is available, and how to see work, get the résumé and contact him
- [ ] No unintended overlap, clipping, invisible text, layout jump or horizontal page overflow at any tested width or scroll position, scrolling both ways and after resize
- [ ] No console errors, broken links or dead controls
- [ ] No custom cursor code running on touch devices
- [ ] Keyboard, reduced-motion and no-WebGL paths work
- [ ] Build, type check, lint and existing tests pass
- [ ] Performance targets met, or exceptions approved by me
- [ ] Checked in Chromium, Firefox and WebKit; real-device gaps stated
- [ ] Both themes finished
- [ ] SEO, URLs, forms and analytics preserved
- [ ] Licences and attribution recorded
- [ ] No invented content, placeholder text or TODOs in shipped pages

**Final report:** what was built; evidence for each check; final scores; ledger summary; what failed, was not tested or was skipped; remaining risks. Report only what you actually verified.