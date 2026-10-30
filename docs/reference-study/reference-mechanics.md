# Reference mechanics, 28 October 2026

Target: [Bajkamal Singh / Baaz](https://bajkamalsingh.me/). This is an investigation of the publicly delivered page, not its authoring repository. The reference's identity, photographs, project claims, copy, gallery artwork, and metro illustration belong to their creator. Retained source files under `source/` are investigation evidence, outside the production `public/` tree. No reference source or media was transplanted into application code by this investigation.

## Evidence identity and scope

The live URL was confirmed by the parent agent in Ego Browser. This independent worker downloaded the public HTML once with curl and parsed its three inline script blocks as inert text. Captured HTML is 520,320 bytes, SHA-256 `d7bac08aef8a1fb74c60ac7fdfd1771d4b3eb7e4b247d1c59730dfdae4b7a9f4`. All three extracted scripts were submitted together to the connected REA MCP analyzer. The third is Cloudflare challenge bootstrap, rather than a portfolio feature.

REA parent analysis: `ev_8b7b5239b255accb4bde974d8384c8e441618033def8fe8810107560ec1bb642`. Summary view: `ev_b6f68ef17618b14309c241144f5cbf08a7e0b2611182e4c7b4998fbb4df5ee1d`. Module inventory view: `ev_546aac84e004bb5888df654b2186281068c1520b22db12db872f568b297a2fab`. Extracted tree identity: `16c1ae57240485dcff1025a8d61bb66b2cf4031f1099ff844c542621eaf35b26`. Complete session bundle was exported to `/tmp/portfolio-reference-2026-10-28-rea-evidence.json` (13,920,048 bytes, 3 evidence records).

REA read 264,269 bytes across three JavaScript sources, visited 16,976 AST nodes, and reported zero parse failures. Application graph coverage is partial, semantic graph coverage is unknown; 2,818 semantic unknowns remain. One relevant inventoried file was outside selected source analysis. Successful parsing does not prove execution or resolve dynamic GSAP behavior. Findings below are direct source observations with design inferences explicitly separated. Runtime screenshots taken by the parent are separate corroboration, not REA observations. The worker did not navigate or mutate the shared browser.

## What the site actually is

The major visual system is HTML, CSS 3D transforms, SVG, text-shadow, video, and GSAP. No Three.js dependency appears among the page's shipped script URLs. The notebook uses DOM perspective, layered paper, hinges, texture, and camera-like transforms. The hero wordmark's depth is assembled from 40 text-shadow layers. A WebGL model is not necessary to achieve the reference's visual depth.

Shipped external feature libraries are Tailwind CDN, Lucide 0.435.0, GSAP 3.12.2 with ScrollTrigger and Draggable, Lenis 1.0.34, and Tone.js 14.8.49. External font stylesheets load Gloria Hallelujah, Schoolbell, Teko, DM Mono, Dr Sugiyama, Inter, Bebas Neue, DM Sans, Lilita One, and Open Sauce One. Cloudflare scripts are infrastructure. This inventory establishes requested assets, not their successful runtime loading.

The main reading surface is a fixed `#world-viewport` with its own vertical overflow, 100vh height (100dvh when supported), and 1500px perspective. Lenis wraps this surface and the `#world-container`, uses duration 0.8 and exponential easing, shares GSAP's ticker, and initially stops scrolling for the intro. Native body scroll is the declared fallback if Lenis setup throws. The global page uses a dark void behind a beige world.

Six navigable chapters are declared in order: hero, about/origin, experience/projects, vending/best work, gallery/visuals, contact. The reference makes each chapter a new physical scene rather than repeating a card grid. Its strengths are scale contrast, material variation, a persistent sense of place, and changing the visitor's mode between watching, reading, selecting, and examining evidence.

## Visual grammar and tokens

Root palette is beige `#F4EFE6`, darker beige `#E5DFC8`, electric blue `#012CEB`, and navy `#051024`, with a 2px base border. The metro scene locally overrides beige to `#ECE8E1`, blue to `#0F35FF`, navy to `#0B0B0B`. Near-black hero/contact base is `#010204` or `#01040a`. Yellow action surfaces use `#D4A017`; LED amber uses `#FFB000`; red accents use `#FF2A2A`.

Hard offset shadows, thick ink outlines, paper edges, torn notes, ruled lines, tape, staples, deliberate rotations, industrial rails, and handwriting carry the personality. The visual functions are distinct: handwriting humanizes, condensed type makes impact statements, monospace labels convey system state, and body sans explains work. It is not uniformly decorated; the notebook is dense and tactile, project stack bold and compressed, metro mechanical, gallery exploratory, and contact sparse.

The navigation shell has a 2px border and 4px hard shadow on small screens, becoming 3px and 8px from 768px. The active indicator moves over 0.4s. Nav links remain conventional anchors with focus-visible treatments. A top ribbon shows identity, a rotating sentence, and a scroll-derived percentage. Section activation begins at top 60% and ends at bottom 40%. The six declared sections drive the bottom dock.

## Opening and hero

`inline-01.js:196–425` defines initial hidden states, a typed quote intro, skip, and hero reveal. The loading percentage is a synthetic 4.9-second tween, not a network-loading meter. Characters reveal from 24px blur with duration 1.0s and 0.025s stagger. Skip becomes interactive at 0.5s. The blue intro breathes in opacity, then text exits with a reverse stagger and 12px blur.

The hero reveal takes base duration `d = 1.5 * speed`. Video scales to 1.05; the wordmark scales from 0.12 to 1 and retains -4deg rotation; navigation and ribbon enter after roughly 1.35 seconds. The source repeats some reveal tweens, so those repeated blocks are not separate intended concepts. Scroll and pointer access are restored early, before the end of the reveal, reducing a frozen-page failure risk.

Hero type is Dr Sugiyama with `clamp(150px, min(29.375vw, 53vh), 564px)`, tracking -0.019em, and custom depth shadows. The video asset requested is `1778536504558493.mp4`. Pointer interpolation uses 0.06 for global mouse movement and 0.08 for wordmark scale. Backdrop moves inversely by up to 30px and 4deg; text by 25px and 5deg. Forty depth-shadow layers change direction with pointer position. Hover targets scale to 1.03. Side labels use opposite parallax directions. Other hanging labels interpolate tilt and swing, with local hover tilt bounded around 18deg.

Design inference: the hero's memorable object is the identity itself, with restrained supporting labels. Adding an unrelated model next to a conventional heading would not reproduce this effect. An original Abrar hero should make one recognizable engineering artifact or typographic construction feel central, and let human identity remain instantly readable.

## Origin notebook: the real storytelling engine

`inline-01.js:1015–1734` is a sustained cinematic timeline. HTML provides a sticky full-screen stage and a wide notebook (95vw, maximum 1500px; 88–90vh, maximum 850px). It starts open at rotationX 32deg, rotationY -8deg, rotationZ 3deg, scale 0.6, opacity 0.6, and y 80. The cover hinge is already rotated -180deg. The timeline runs from about top/top to bottom/bottom with scrub 2.2; these are scroll timeline units, not guaranteed elapsed wall-clock seconds.

The storyline begins with an invitation, then origin motive, early work, a change in thinking, personal portrait, impact, philosophy, experience, supporting stamps, signature, and an unfinished-future epilogue. A blue SVG route physically connects these fragments. The source samples its path at 2,000 points to locate ordered milestones, then uses a separate 300-point table for line-tip spotlight tracking. The line advances through eleven plotted nodes with different pacing rather than drawing at a uniform rate.

Camera-like notebook zoom reaches 1.65 desktop / 1.40 mobile, then 1.80 / 1.50 for the second-page emphasis. Strategy uses 1.74 / 1.48. Rotation changes during travel. A proximity lens gives the current fragment full sharpness, hints the next at opacity 0.22, and leaves passed fragments around opacity 0.5 and 1px blur. Focal radius is 16 percentage units; bleed radius 40; maximum defocus 7px. This focus hierarchy, along with camera following the line, accounts for much of the cinematic effect. A still collage of all fragments would lose the sequence.

At the end, page furniture submerges, the camera returns to center, and the route morphs into a signature. The morph samples 200 points and interpolates geometry over 4.5 timeline units beginning at timeline position 30.5. The epilogue begins at 34.5. The route is restored on reverse scrolling. This provides an actual narrative conclusion to the same object the visitor has followed.

Vinyl stickers are draggable within the sticky stage. Press scale is 1.15, with deeper drop shadow; release settles over 0.4s using elastic easing. These are secondary play, not the sole means of reading required content.

Design inference: the useful transfer is a connected visual thread that reveals why and how Abrar builds. Reusing a diary or metro is optional and would weaken originality if their meaning does not fit his projects. The current Build Room already has an engineering metaphor; it needs purposeful chapter state changes and distinct project artifacts, rather than more decorative geometry.

## Projects / experience stack

`inline-01.js:1898–2100` creates four overlapping dossiers for Grimbyte, Blue Tea, Dr. Water, and Frost & Sullivan. Alternating rotations are -2 and +2deg. Colors alternate blue, beige, navy. Cards reveal on entry with slight stagger and back easing; opening one changes stack spacing and expands its role, contribution bullets, and metrics. Clicking again closes it. Desktop hover lifts 8px, scales to 1.02, and tilts with cursor movement.

Desktop stack gap is 95px, or 70px when viewport height is at most 800px; mobile gap is 75px. Expanded push amount is 320px desktop / 380px mobile. Collapsed card base heights are 160px desktop, 125px on short desktop, 140px mobile. The experience section is pinned for 600px after top/top. A helper explicitly points time-constrained visitors toward Best Work.

Design inference: give recruiters a fast route to evidence. A compact archive and genuine project summaries should complement an immersive showcase. Repeated identical project thumbnails on identical monitor trays convey less individual identity than the reference's authored dossier and case study treatments.

## Best Work metro

`inline-01.js:3158–3750` builds six stations: one instruction/origin station and five projects (Krishna Shukla, Rntl, Sinkari, Dramsoc, Jio Hotstar). The 11-node route alternates actual projects and intermediate Delhi station names. Each project is a billboard with description, three points, three metrics, and a yellow deep-dive control. The train is a persistent foreground frame while the station world translates, creating continuity across choices.

Entry is deliberately user-triggered. Door text fades over 0.3s; left and right panels separate by 100% over 1.5s with power3.inOut. Entering the section only reveals the invitation; it does not auto-open the doors. Previous/next buttons bound selection to the first and last stations. Station navigation updates map progress, counter and announcements; translates the world by one 100vw step over 3.5s with sine.inOut; rattles the train at 0.04s yoyo intervals with repeat 40; and optionally requests a device-vibration pattern. Deep-dive actions disappear initially and reappear after a 1s delay.

The section pins for 1200px, or 3000px at widths at least 2500. Its pin starts top/top except widths at most 1380, where it begins top/-6%. The source includes several exact viewport corrections, including near 1920px and 1600px ranges. These are evidence of implementation tuning, not design rules to reproduce.

Deep dives are injected into a separate case-study view behind a full-screen cover transition. Cover-in and cover-out take 0.55s each; content appears over 0.45s. Per-project backgrounds, contrasting text, large condensed headings, screenshots, grids, metrics, and diagrams vary. Scrolling outside the case-study surface is blocked. Return clears associated ScrollTriggers, restores the transit view, and uses 0.4s/0.5s overlays.

Source-bound limitation: although instructions advertise arrow-key navigation and swipe left/right, a bounded search across all three captured inline scripts found no `keydown`, `keyup`, `touchstart`, `touchend`, or `ArrowRight` handler. The literal "arrow keys" text is not evidence that those inputs work. This is a mismatch to improve in the portfolio, not copy. Likewise the deep-dive view's nested scroll mechanism should be independently tested before adopting it.

## Gallery / Visuals

`inline-00.js` defines an image trail over the gallery using 56 artwork filenames. Desktop mouse movement creates a new image after 180px travel, cycling in order. Base width is 240px through 1440px and 320px above; random scale ranges 0.7–1.1, rotation roughly +/-7.5deg, and bounded random position offsets make a loose tiled composition. Image entry takes 1.5s plus a 0.1–0.4s delay. At most 15 active images are retained. They begin removal after 3.5s, then fade/scale away over 0.8s. An IntersectionObserver attaches the movement handler only while the gallery intersects.

The movement handler returns immediately below 768px, so the desktop trail is not a mobile interaction. The gallery also includes spread decks/reels whose entry observer activates at 80% intersection. Every individual gallery media item has not been downloaded or verified. The authored visual body is a design portfolio; Abrar's equivalent should use genuine application screens, architecture fragments, experiments, or notes, not pretend to have the same body of visual-design work.

## Sound and cursor

Sound is off initially. The toggle alone resumes Tone's AudioContext; automatic audio initialization was intentionally removed. Off suspends the context. Synthesized sounds cover hover tick, pop, lock, arrival, paper rustle, gear, train acceleration, decrypt and modal bounce. Parameters and gain vary by interaction. Sound is an optional reinforcement of physical behavior, not a replacement for feedback. Sound events have not been audibly exercised by this worker.

Fine pointer/hover CSS hides native cursors; JavaScript creates a ten-element cursor trail, shrinks it over targets and expands the leading element for hover affordances. A click ripple grows to 120px over 0.6s. Label followers explain stack opening, gallery exploration, and case-study scrolling. This cannot be assumed to aid accessibility; preserve conventional cursor and focus usability in an original implementation unless the custom behavior demonstrably helps.

## Contact and closing

The final dark scene uses huge Schoolbell "contact Me" typography, short collaboration copy, a direct email CTA, and social links. Contact elements appear at top/75% over 0.7s with 0.1s stagger. The CTA opens a prefilled mailto, explicitly avoiding form friction. The footer contains personal signoff, copyright, privacy, and terms. The interaction resolves into a simple action after visual density. An original engineering portfolio should end with similarly obvious email, resume, and source/profile routes.

## Responsive and accessibility boundary

The primary mobile/desktop split is 768px. Tablet-specific rules cover 768–1023; larger type adaptations cover 1024–1440, 1441–1920, and above 1920. There are also many narrow viewport overrides. Small screens reduce notebook zoom and reorder/scale material. Pointer-only behaviors are gated in several places, and focus-visible rings and 44px close controls appear in markup.

Reduced-motion CSS shortens CSS animations and transitions to 0.01ms, but the gallery bootstrap merely reduces GSAP ticker frequency to 15fps; the main cinematic GSAP timelines are not conditionally removed in the captured scripts. Therefore reduced-motion support is partial in source and must not be described as fully accessible. Many semantically useful labels are `aria-hidden`, and major clickable generated dossiers are divs. Keyboard, screen-reader flow, physical mobile behavior, every narrow breakpoint, and every deep-dive must be tested separately. Do not inherit these limitations as requirements.

## Translation for the existing portfolio

The most valuable transfer is a dominant opening, an unmistakably personal metaphor, one connected visual journey, and case studies whose interface communicates their own problem and mechanism. The existing workshop concept is relevant to building software, but three near-identical screens on a conveyor communicate generic display furniture. Different project mechanisms should drive different physical or visual forms: speech becomes a waveform and transcript, API work becomes routed requests and responses, recording becomes two composition frames. Actual product screens and source-backed evidence should remain visible within that authored system.

Use chapter progression to answer identity, motive, work, technical reasoning, person, and next collaboration. Let motion explain state: a selected object arrives, layers separate only when inspected, a signal becomes an output, or one route connects to a real project. Preserve direct navigation, ordinary links, readable content without WebGL, genuine status labels, optional audio, and reduced motion that truly removes camera choreography. These are original implementation choices inferred from the reference, not claims about its exact behavior.

## Remaining unknowns

This pass answers shipped composition, declared state changes, principal timing, dependencies, tokens, source-level mobile routing, and major interaction algorithms. It partially answers runtime behavior because the worker performed static analysis only; parent screenshots and browser interaction observations must be added as separate evidence. It does not establish hidden backend behavior, original source structure, media licenses, every requested asset's availability, all browsers, audio quality, every viewport, keyboard completeness, or field performance. The reference should not be called exhaustively reverse engineered beyond these stated boundaries.
