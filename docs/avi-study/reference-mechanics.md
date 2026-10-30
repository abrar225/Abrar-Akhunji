# Avi Vashishta: shipped-site investigation

Target: https://www.avivashishta.com/ . Acquired 28 October 2026. This worker inspected public HTML, route metadata, selected delivered JavaScript, and CSS. The parent separately exercised the live browser. This document describes source observations and design inferences; it does not claim that static analysis observed execution. No reference code, art, personal claims, or branding was installed into the portfolio application.

## Evidence and coverage

The source directory contains homepage, `/projects`, `/brands`, `/blog`, `/developers`, all five sitemap-listed Lab pages, two relevant article pages, sitemap, OpenAPI, and public Markdown. Download manifests preserve exact original URLs and byte counts. `source/readable/` contains esbuild-formatted derivatives for inspection; originals retain their shipped filenames. Browser framework chunks and large shared Three.js runtime were acquired where referenced but were not all analyzed semantically. External social media and all individual media files were not downloaded.

REA analyzed fourteen selected original JavaScript chunks. Parent evidence is `ev_06d54f6af9fe1babe3c76aba8981240cb319be961179f1ef38d7910768c1842b`; summary evidence is `ev_1baa786844b5bee093f9ca710bbff473768a2e0d6da36f919d000e2772ed24a9`. The summary is retained in `rea-summary.json`. The acquired-tree identity at analysis time was `acda9987e05b60bafa78354249c2b4f67beab81dc099ae566e8f46cc02665ee5`. REA read 405,741 source bytes, parsed all fourteen selected files with no failures, and visited 109,776 AST nodes. Application coverage is partial; semantic coverage is partial and truncated at the declared per-file/aggregate node ceilings. There are 48 application unknowns and 22,945 semantic unknowns. These are scope and inference limits, not evidence of faulty rendering.

The principal inspected chunks are shared shell/cursor `25s9l-gh-u00p.js`; agent presentation and world transition `43x22xhjo2dbi.js`; homepage `3iqrrahzb8meo.js`; Learn `3pn-sqp4lwwtl.js`; reader `1dp-yt0qko6oc.js`; Build `3b66mci88o7k9.js`; Brand `1w85y31x7r73t.js`; Explained `2dx2-nr5j_txh.js`; Commits `3po1iai_cx0fq.js`; Blueprint `3p3kvmk54uids.js`; Dots `16r9z3qml-_hc.js`; and Phones `0udaa3vqdws2m.js`. They are all under `https://www.avivashishta.com/_next/static/immutable/chunks/`.

## Route map and the main design idea

Build is `/projects`, Brand is `/brands`, and Learn is `/blog`. The shared header links to those three different audience tasks rather than putting every section into one long portfolio. Footer utilities include About/contact context, developer resources, privacy, fitness, RSS, and social profiles. The sitemap also lists `/ugc`, `/about`, `/contact`, `/privacy`, `/fitness`, `/teaching`, `/avi-vashishta`, 65 article URLs, and five Lab experiences. `/lab` itself returns HTTP 404; valid Lab pages are `/lab/phones`, `/lab/commits`, `/lab/blueprint`, `/lab/made-of-dots`, and `/lab/explained`.

The strongest transferable principle is audience-specific storytelling. A founder gets a project record and a brief, a brand gets sourced campaign outcomes and formats, a learner gets ordered resources, and an agent gets structured context. A single type/color/material vocabulary unifies those different layouts. This supports creative variation without sacrificing a clear navigation model.

The current app is delivered through Next.js/Turbopack. React, Framer Motion, Lenis 1.3.26, CSS transforms and canvas provide the experience; Three.js is used for selected Lab experiences. The homepage's ring is DOM/CSS perspective, not a WebGL carousel.

## Type, color, layout and global motion

Self-hosted Geist Sans is the body/interface face, Geist Mono handles metadata and small controls, and Instrument Serif 400 carries large titles and editorial links. Base paper is `#f3f3f1`, deeper paper `#e7e7e3`, ink `#111111`, soft ink `#6e6e73`, muted ink `#8e8e93`, surface white, and night `#1a1a1c`. The three audience accents are Build blue `#2f55ff`, Brand red `#ef3b2d`, and Learn yellow `#ffc81a`. Borders are roughly 10% ink. Airy editorial content coexists with rounded scene windows, browser frames, diagrams and real media. Large titles are light serif, rather than uniformly heavy display type.

The shared motion system initializes Lenis only without reduced motion and without a coarse pointer. It uses `lerp:0.085`, allows nested scrolling, and stops inertia on navigation. Ordinary scroll updates a CSS page progress variable, scene parallax variables, stack overlap, and header state. The header hides when scrolling down more than 2px and returns when scrolling up or near the top (under 120px).

Intersection-based reveals use threshold 0.12 and bottom root margin -8%, and run once. Up reveals travel 26px with 0.9s opacity/1.1s transform. Word reveals use 45ms stagger, generic child stagger 70ms, rules draw over 1.3s, image masks open over 1.2s. Counts animate for 1.3s with quartic easing and preserve final source strings. Reduced motion bypasses the reveal engine. This is supporting motion; the memorable scenes have their own logic.

World navigation is a deliberate transition, not merely a route fade. A full-screen scene opens by a 700ms left-to-right clip, a bright sweep traverses for 820ms, and the world name enters after 280ms. On route arrival, the scene shrinks into the destination hero's measured rectangle over 760ms, then clears. Escape/popstate/pagehide and an 8s failsafe release it. These details preserve continuity while protecting navigation from a stuck overlay.

## Cursor, highlighting and feedback: three separate systems

The cursor enhancement is an additive floating label. Native cursor behavior is preserved; source does not globally hide it. The nearest `data-cursor` supplies Play, Read or Open. A single fixed, pointer-transparent label follows the pointer with lerp 0.22 and stops scheduling frames within 0.3px. It is enabled only for a fine pointer and without reduced motion. The label sits 14px down/right, uses 11px mono, a dark background, 7px radius, and enters through opacity/scale over 0.2/0.3s. Magnetic controls translate by fractions of their own bounds, producing at most roughly 4px horizontally and 3px vertically.

Normal browser text selection uses blue at 25% opacity. Learn link and reader navigation highlights are CSS background-size animations behind text: yellow grows from zero to full text width over 0.5s on hover/current state. The current article h2 receives a separate 64px by 4px yellow underline over 0.7s. This is semantic reading-position feedback, not pointer painting.

The tactile marker in `/lab/explained` is different again: semantic `mark` elements have a yellow pseudo-element masked by `/vox/highlighter.webp`, with `mix-blend-mode:multiply`. Scroll progress opens a clip-path from left to right. Its irregular edges come from the raster alpha mask. Original implementation should recreate the mechanism with an original asset or authored brush shape, not reuse that file.

## Homepage: a room of real work

The homepage begins with a ring of up to sixteen Reel cards. Actual preview availability drives the preparation percentage; the formation phase has a minimum 2.6s linear animation. Once prepared, the ring expands over 1.9s. Escape, Tab, skip, and reduced-motion changes can immediately settle it. The large opening name transforms into its measured header position over 1.3s rather than disappearing and being replaced by unrelated header text.

Ring formation interpolates radius from 460 to 1800, tilt from -22deg to zero, roll from -20deg to zero, and card scale from 0.52 to 2.3. Card positions are computed from angles and then painted as `translate3d` and `rotateY`. Cards behind the camera or beyond approximately +/-96deg are hidden. Only front cards receive playing preview sources; hidden states and document visibility pause videos. Desktop wheel input and dragging rotate the world, with 4px drag detection and click suppression after a drag. Touch handling is separate, and does not hijack input fields/chat. A spring of stiffness 150, damping 27 smooths the angle. Automatic travel slows when hovering a front card and stops for reduced motion or keyboard focus within the ring.

Painted sky and front/back cloud/petal layers produce depth at different pointer amplitudes (approximately 10,22,34,48). Pointer position is spring-smoothed with stiffness 40, damping 18. The content underneath offers three audience choices and contextual previews. It stays simple because the real media carries the visual weight. An alternate dealt-card-to-wheel formation also ships in the homepage chunk; its availability does not establish which variant every visitor receives.

The AI conversation has a distinct readable message log and a return-to-exploring action. Static source includes its client integration, but this worker did not submit a message or consume model quota. External prompt links were inspected as text and never invoked.

## Build and Brand

Build opens with an editable sentence brief and an obvious email outcome. Selecting timing and filling two blanks constructs a mailto with a subject and body. Adjacent AI links encode the same draft prompt for an external service; they do not automatically send it. Work is separated into shipped startup products, independently built products, past client work, and experiments. This puts claims into context instead of presenting all work as equivalent. Screenshot galleries cycle every 3200ms only without reduced motion. Experiment previews play on hover or keyboard focus, then pause and reset on leave/blur.

Brand uses the same brief pattern but a different narrative: client wanted, creator made, measured result, then deliverables/audience/working process/rates. Statistics visibly identify their dashboard dates and reporting windows. Hover/focus plays muted, looping, inline video with `preload:none`; leaving resets it. This is strong proof design, but Avi's campaign metrics and clients are his own claims and must not be reused as Abrar's evidence.

Transfer: present a real engineering trigger, personal contribution, real product artifact, and source or qualified result. Use distinct visual formats for distinct evidence, not identical cards with decorative numbers.

## Learn index and reader

Learn combines two tools. The first asks for a goal and arranges an ordered learning path. The selected goal and checked items persist in localStorage under `learn-progress`, keyed by goal. The path marks the first unfinished item. Switching paths exits over 0.22s, enters rows over 0.6s with 60ms stagger, and moves progress over 0.9s. The index below filters All/Roadmaps/Prompts/Builds/Career and searches title, description and label. Search normalizes case, Unicode and punctuation, and requires every query term. `/` focuses search unless editing, Escape clears/blurs, and a polite live result count reports matches. Hover and keyboard focus select a contextual Reel preview.

Articles use a maximum 1240px wrapper with a flexible reading column plus a 340px sticky aside, gap 32–80px. Article content is capped at 760px. Title is Instrument Serif at 40–72px with line height 1; lede is 19px/1.6. The aside remains 24px from the top with its own bounded scroll. Below 1000px it moves before content, loses stickiness, reduces video to 120px and hides the TOC. The main text stays sans; serif headings distinguish navigation and structure.

Reader enhancements include source-aware prompt/code copy controls with a 1600ms copied state, a linked live-output preview, related reading, and an optional Reel provenance panel. The aside video waits 600ms plus idle time before playing and is skipped for reduced motion. The TOC uses IntersectionObserver with `rootMargin:0px 0px -70% 0px`, sets `aria-current=location`, and marks the corresponding h2. Live-output previews initialize near 200px from view; a 1440x900 iframe scales to available width and is treated as an inaccessible visual preview, with an ordinary link to the actual output.

Transfer: strengthen the portfolio's existing reader through a restrained current-section highlight, linked code/output/proof, and useful article discovery. Preserve its already-working study modes, citations, audio and interactive content rather than replacing them wholesale.

## Commits: six representations of one real dataset

`/lab/commits` presents an embedded GitHub contribution snapshot, labeled fetched 25 October 2026. It is not a browser request to GitHub on every visit. Source data includes login/start/end/total, per-day counts and five-level categories. The visible dataset reports 8,546 yearly contributions, best day128, best week353 and a169-day streak; these belong to Avi and are not portable portfolio numbers.

Every scene is a Canvas2D draw function with a common ResizeObserver/DPR cap2, IntersectionObserver threshold0.4, pointer coordinate handling, replay button, serif/mono canvas font metrics, and an accessible image description. Reduced motion draws final states by passing infinite elapsed time. The scheduler runs while intersecting; source does not stop every scene after its last entrance because terminal blinking and replay remain available.

The opening calendar animates diagonal squares with elastic overshoot. Each starts after `150+(week+1.6*weekday)*22`ms, grows for560ms and counts toward the same dataset total. Tall narrow stages can transpose the calendar to remain legible. Hover identifies a day and outlines its square.

City uses three flat polygons per isometric building, shaded by contribution category. Its footprint combines week and reversed-weekday coordinates. Height is `max(1.5,sqrt(count/maxCount)*0.56*canvasHeight*growth)`. Growth uses cubic easing after a `200+30*week+55*weekday`ms delay and lasts900ms. The maximum day's leader and caption begin at3000ms and reveal over600ms. It is a data sculpture drawn with Canvas2D, not a Three.js city or a hand-authored building model. The square root makes small counts legible but means height is not strictly proportional to count, despite the page's casual description.

Week-by-week draws a weekly total line over1800ms, then pours its seven cells into the calendar. Round-year uses seven weekday rings and one spoke per week with a3400ms sweep. Streak stitches a path through consecutive days over3800ms after400ms and marks the preceding break in red. Terminal types a shell-like command over1100ms after200ms, then scrambles seeded glyphs before settling into five density characters; a530ms cursor blink remains. All six are different views of the same data, not six unrelated decorative animations.

Original transfer: use Abrar's fetched GitHub contribution data with explicit date/source and truthful labeling, a lightweight canvas, keyboard-accessible day details or a table alternative, replay and a static reduced-motion state. Avoid manufacturing activity or making commit count a quality score.

## Other Lab experiences

`/lab/explained` turns the audience model into a paper explainer. Each chapter has a sticky screen and a scroll length multiplier: opening1.6 screens, numbers4, Build4.5, Brand4.5, Learn4.5, ending2. Source normalizes progress over chapter height minus viewport height, smooths it with `1-exp(-9*deltaSeconds)`, and writes CSS variables. Data-driven camera keys interpolate translate/scale/rotation using smoothstep. Narrow screens below760px reduce most camera amplitude to35%. Highlight, tapes, pins, clippings, charts and typography reveal at declared normalized intervals. Film grain updates roughly every81ms. Reduced-motion code bypasses the animation loop and CSS supplies a readable settled layout. These are scroll-progress beats, not fixed playback durations.

`/lab/blueprint` presents six building elevations with imported trace coordinates, a raster image, generated noise mask and Canvas2D fill. It starts image soaking after2.6s and completes over2.8s, with a moving scan indicator. Leaving drains the fill over750ms before switching buildings. The pointer crosshair reports source-image pixel coordinates. Tabs provide direct selection; an animation-ended event advances automatically. This is image/trace compositing, not a procedural3D building generator.

`/lab/made-of-dots` streams a compact binary portrait from `/lab/dots/avi.bin` and updates a real byte-based loader. Positions are Int16, normals normalized Int8, with a part byte per point. A custom Three.js point shader assembles the portrait out of a loader ring over2.6s, adds slight normal-based breathing, turns head and shoulders by different amounts, and moves a light with the pointer. A glint treats glasses separately and a shine sweeps after assembly. Reduced motion sets the assembled state and removes time-based movement. This depends on a personal scan asset; a generic sphere would not recreate its meaning.

`/lab/phones` uses actual Three.js phone geometry and a sequence from loading to ready. Wheel, dragging, explicit previous/next and arrow keys navigate; Escape returns the selected device's state. The source also includes a turn-around control and real Reel metrics alongside ordinary Instagram links. This worker read the core client chunk but did not download all phone assets or establish their runtime success. The parent should keep its browser observations separate.

## Agent surfaces and a material inconsistency

The header Human/Agent button is a client presentation mode. On non-home routes it hides human content and displays an inline AgentPage. Five expandable personas (Founder, Brand, Student, Curious, Developer) show a tailored prompt, exact pages the user's AI should read, a prewritten example answer, and links to send the prompt to Claude/ChatGPT/Perplexity. These example answers are local authored content, not evidence of a live model response. Panel height transitions are0.6s, opacity0.3s; the scene uses a1s clip reveal and1.8s scale.

Separately, `/?mode=agent` returns Markdown. `/index.md` and developer documentation describe alternate Markdown plus JSON APIs and OpenAPI. We fetched the Markdown representation and schema, without calling chat or external AI services.

The acquired `/index.md` and `/?mode=agent` describe the prior Vite/MediaPipe portfolio and Ctrl+J terminal, while the current shipped app is Next.js/Turbopack with the newer three-world navigation. Therefore machine-readable content is partly stale. Do not infer that every old gesture/terminal feature exists in the current site, and do not reproduce stale human/agent divergence in the portfolio. Agent readability should share the current factual content source.

## Implementation direction and remaining limits

The strongest original combination for Abrar is the existing workshop's project-specific physical metaphor, Avi's restrained cursor/reader feedback, source-backed contribution visualization, and audience-aware information structure. Use the same project data to power readable cards, case studies and any visual artifact. Let page personality come from real personal materials and technical mechanisms, with enough quiet space for evidence. Reader enhancements should serve reading, and a contribution city should remain a lightweight optional proof view.

This pass covers delivered route identity, shared visual tokens, major feature chunks, cursor/highlights, Learn discovery, reader behavior, Agent presentation, all five Lab mechanisms and principal timing. It does not exhaustively inspect every article, utility route, external social destination, media asset, browser/device, backend or accessibility outcome. REA's partial/truncated graph must stay attached to conclusions. Runtime browser observations supplied by the parent can corroborate specific interactions; they cannot retroactively make untested surfaces complete.
