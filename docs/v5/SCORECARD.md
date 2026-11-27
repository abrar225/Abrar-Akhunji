# Gate 1 scorecard

This records the initial three-direction review. The later Patchbay rounds and their matched blind comparisons are in [Patchbay’s revised scorecard](PATCHBAY.md#evidence-and-decision-log).

The independent critic reviewed captures at 0%, 25%, 50%, 75%, and 100% plus native-input recordings. Scores describe the opening and first project transition. A score of 4 is the brief’s minimum for the later slice and final build. Unbuilt pages, production graphics and end-to-end checks remain open.

| §14 dimension | A perceived ascent | A literal reverse | B folio | C patchbay final |
| --- | ---: | ---: | ---: | ---: |
| 1. Distinctiveness | 4 | 4 | 4 | 4 |
| 2. Concept coherence | 4 | 4 | 4 | 5 |
| 3. Scene differentiation | 4 | 4 | 4 | 4 |
| 4. Motion craft | 3 | 2 | 3 | 3 |
| 5. Interaction depth | 2 | 2 | 2 | 4 |
| 6. Typography, layout and finish | 4 | 4 | 4 | 4 |
| 7. Recruiter clarity | 4 | 4 | 4 | 4 |
| 8. Mobile experience | 3 | 3 | 3 | 4 |
| Total | 28/40 | 27/40 | 28/40 | 32/40 |

A’s sectional signal figure and layered edge make a clear poster and seam. The process advances mainly through scroll and the transition has a limited handoff from illustration to real evidence. Literal reverse makes the cue harder to see and brings the bottom of the case into view before its heading. B has the strongest serif and portrait composition. On mobile, there is a long interval of cream paper before the tab. The small cover print and large proof feel like two separate objects during the fold. C gives the visitor a choice with a visible downstream result. The first critic noted briefly mismatched cable/label state, tight project-name tracking, an underused evidence panel and a thin transition to project proof. C’s update removes the outgoing cable immediately, increases project-name spacing and puts a real technical decision alongside each output. The critic raised finish from 3 to 4 after reviewing the regenerated stills and clips. Motion stayed at 3. The output label changes before the stroke reaches it and the case panel enters without a visible spatial handoff. The dark PacketLark screenshot is still hard to parse on mobile.

## Blind comparison with V4

Equivalent desktop and mobile viewport sizes were used, with opening and work stills and actual motion clips. The two packages were independently randomized and read by separate reviewers as X and Y. Both V4 work stills show the workbench. The proposed shots land farther into specific project evidence. Motion clips differ in their duration, input and stopping points. These are Gate 1 samples and the complete brief will need a new and more controlled comparison.

| Dimension | V4 against A | A perceived ascent | V4 against C | C first pass |
| --- | ---: | ---: | ---: | ---: |
| 1. Distinctiveness | 4.5 | 4 | 4.5 | 4 |
| 3. Scene differentiation | 3.5 | 4.5 | 3.5 | 4 |
| 4. Motion craft | 4 | 3 | 4 | 3.5 |
| 5. Interaction depth observed in clips | 4 | 2.5 | 3 | 3.5 |
| 7. Recruiter clarity | 3.5 | 4.5 | 3.5 | 4 |

V4’s bespoke devices and continuous camera give it the advantage in identity and motion. A and C beat it in the visible change of scene and evidence clarity. In C, changing Voice to Request updates the route, output label, project and color on both widths. The V4 match clip shows controls and changes of view. Its separate baseline audit also exercised actual camera drag, which was outside the blind comparison and remains a higher interaction benchmark. The §14 side-by-side bar is open.

## Functional sample

| Check | Observed |
| --- | --- |
| Prototype route and anchor controls | 28 combinations across 360, 390, 768, 1024, 1440, and 1920 px and an 844 × 390 short viewport. Opening scroll offset, focus destination and page-wide horizontal overflow checked for each. |
| Native input | Eight desktop/mobile clips. Desktop used wheel input and mobile used emulated touch swipes. C also used keyboard and touch to select Request. |
| Reverse opening | Fresh desktop Chrome opened on the hero at scroll Y 900. Upward wheel arrived at the project. Mobile and reduced motion read downward. |
| Reverse navigation | Keyboard skip and direct `#capture` aligned and focused the project. Refresh and Back restored Y 430 in the tested mid-scroll path. Forward returned to the chooser. At the desktop breakpoint resize, the normalized progress remained approximately 52%. Chrome’s programmatic text find revealed the project link. |
| Original-sized first paint | Settled native opening was captured. Slow or throttled first paint, native Find UI and mobile address-bar behavior remain untested. |
| Reduced-motion state and desktop project controls | Ordinary flow and a static evidence scene in all four variants. All three patchbay project buttons changed the selected case with Enter. |
| Console and horizontal overflow | No captured warning/error messages or page-wide overflow in the 40 viewport captures. |
| First-screen recruiter read | A fresh reviewer found the name and role, what Abrar builds, Ahmedabad, availability, and direct Work, Résumé and Contact access on every desktop and mobile opening. C’s availability is small at the lower edge. |

[Browser playback and console log](evidence/directions/browser-audit.json) · [Additional anchor and state results](evidence/directions/prototype-checks.json) · [Baseline browser evidence](evidence/baseline/README.md)

## Recommendation

Choose **C, The patchbay, with normal scroll**. The opening gives an engineering hiring manager a quick answer and lets a curious visitor produce a real project view. The hardest problem for the slice is making the route continue spatially into the proof scene so the transition can beat V4’s camera, while keeping the direct labels and immediate reading path. A perceived ascent is the alternative if a sequential technical story is the priority. Literal reverse carries a usability penalty even when the sampled mechanics succeed.

The Gate 1 decision is which direction and scroll mode to use. If C is selected, prototype the cable-to-evidence handoff and a stronger selected project scene in the vertical slice before expanding to all routes.
