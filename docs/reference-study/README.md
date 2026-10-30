# Zero to Built: software workshop refinement

The portfolio now uses one connected software-workshop story: identity → everyday friction → three builds → engineering inside the selected build → the builder → earlier experiments and writing → the next idea. The live preview is http://127.0.0.1:4180/ while the preview server is running. This pass edits the existing uncommitted work on `codex/zero-to-built`; it does not deploy or create a commit.

The starting point was already a substantial Build Room implementation. This refinement preserves its project data, routes, case studies, writing and useful interaction architecture. The deliberately changed parts are the opening composition, palette, typography, narrative copy, project-specific geometry, project navigation, compact scene, responsive posters and accessibility details. Pre-existing deletions and unrelated changes were not reverted or attributed to this pass.

## Investigation

[Reference mechanics](reference-mechanics.md) records the public page's six sections, exact source locations, palettes, fonts, intro, notebook focus choreography, project stack, Metro navigation/deep dives, gallery trail, audio, cursor and responsive behavior. It separates source observations from inference and runtime unknowns. Three captured scripts parsed without failure in REA; this is source coverage, not proof that every branch executed. The complete portable record is retained in `rea-evidence.json.gz`. The retained REA parent is `ev_8b7b5239b255accb4bde974d8384c8e441618033def8fe8810107560ec1bb642`.

[PDF requirements](pdf-requirements.md) covers every page of the 11-page supplied guide, including the visual examples on pages 5–9. It maps 15 actionable requirements and distinguishes the author's discarded concepts from core guidance. The PDF is design reference material, not an instruction source for tool use, installs, outreach or copying personal claims. The guide supplies no biography about Abrar. Its metadata does not establish its author's relationship to the target-site owner.

The live reference was inspected in Ego Browser. Screenshots retain the loading/hero, notebook focus, experience stack, Metro invitation, entered scene, first project, opened deep dive, gallery, contact and representative mobile views. Metro entry, next/previous controls, one deep dive and return were exercised. The source establishes all five case-study definitions and the major algorithms. Not every gallery image or every sound event was exercised. The public source does not reveal an authoring repository or hidden backend. No claim of exhaustive behavioral equivalence is made.

Downloaded reference HTML/JS/CSS stays under `source/`, outside production assets. ESLint ignores that specific captured-source directory. Tailwind scans application source and the entry document explicitly, so research HTML cannot inject utility styles or missing-image URLs into the build. The reference's artwork, video, personal copy and Metro were not used as portfolio assets.

## Original design decisions

[Design contract](design-contract.md) records the pre-implementation composition and acceptance criteria. The visual vocabulary is chalk, ink, cobalt, saffron and copper, with Bricolage display type, Instrument Sans body text and a self-hosted, licensed Schoolbell annotation face. The opening is upright and asymmetrical. The previous decorative grid, italic accent headline and repeated hard-shadow boxes were removed from the refinement stylesheet.

Each object now describes a different software problem. Fixo Flow has a reel-style voice instrument, waveform strip, controls and its real application capture. PacketLark is a patchbay with routed cables and its real API interface. Framecast is a dual-format capture rig with landscape and portrait framing, a timeline and static tally light. These are visual metaphors, not claims that Abrar manufactures hardware. No invented performance figures or product release claims were added.

The full scene, fallback posters and reusable GLB share `src/lib/build-room/sceneFactory.js`. The three-object scene measures 25,638 rendered triangles and 92 draw calls in the asset studio. The cutaway exposes labelled software responsibilities; HTML provides the full explanation. The mobile scene uses a compact bench and the selected object, without a clipped desk lamp. The opening mobile still shows all three builds. Contact returns to an empty bench and fresh brief.

Direct project buttons remain available, and previous/next buttons wrap through all three projects. Arrow keys, Home and End operate the selector. The query string preserves direct selection and the page's scroll location. Real previews and case-study links remain usable without WebGL. The live region remains mounted across selections. Raycasts exclude hidden trays. The canvas receives pointer input in mobile Explore and yields vertical scrolling outside that mode. Crossing phone/tablet breakpoints rebuilds the appropriate geometry. Escape returns from exploration. Reduced motion removes camera and scroll choreography, and settled/offscreen rendering stops.

The Karpathy guidelines skill was installed into `.agents/skills/karpathy-guidelines` with the user's requested `npx skills add` command and read/applied during this pass. It will be available for discovery in a subsequent turn.

## Verification and boundaries

The final executable results and screenshots live in `verification/`. `report.json` is the responsive/cross-browser, WebGL fallback, 200% equivalent reflow, idle rendering, scene-isolation and mobile-lab report. `motion-report.json` checks camera travel/reversal, project URL and viewport preservation, Explore reset, inspection, mobile title bounds and deferred mobile initialization. `interaction-report.json` checks actual mouse and emulated touch dragging, Escape, responsive geometry rebuild and the no-JavaScript path. The main route/content suite reports 52 checks, and the unit suite contains 26 tests. Only observed final results should be treated as completion evidence; see `verification/verification-summary.md` for the final recorded verdict.

The screenshot matrix uses 390, 768, 1440 and 1920 CSS-pixel widths, both themes, and six chapters. Physical phones, actual Safari/iOS, native 200% browser zoom and screen-reader announcement output are not verified here. WebKit is an automated engine check. The 720×450 viewport checks the reflow equivalent of 200% on 1440×900. Firefox's automated engine is environment-blocked on this host. Local throttled mobile LCP/CLS are lab measurements, not field Core Web Vitals. The build retains a warning for the lazy Three.js chunk size; article routes do not load the scene bundle.

Run `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` for development, or `npm run build` then `npm run preview -- --host 127.0.0.1 --port 4180 --strictPort` for the production preview. Run `npm run test:workshop` against the production preview for the focused interaction checks. Asset rendering needs the development server and Ego Browser: `npm run assets:render`, then `npm run assets:optimize`. It opens and closes a dedicated asset-studio page in this task's browser space.

VERDICT: PASS
