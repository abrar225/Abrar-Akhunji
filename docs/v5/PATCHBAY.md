# Patchbay / Gate 1 revision

Gate 1 remains pending. Patchbay with normal scroll is the lead candidate. The previous 32/40 overall and 3/5 motion came from a fresh independent critic’s rescore of the first Gate 1 prototype. This review uses a new implementation and new captures. [Previous scorecard](SCORECARD.md) · [Live prototype](http://127.0.0.1:5181/docs/v5/prototypes/patchbay.html)

## Inputs and intent

The paper-cutout folder contained only its placeholder. The animation collection still says `[PASTE URL]`. No direct observations were possible for either input. The brief’s written requirements govern the provisional paper cut. Review it against the actual image when supplied. The observations field also contained template text. Existing baseline captures ground the comparison with the outgoing design. [Baseline](evidence/baseline/README.md)

The opening frames Abrar as the author. The signal strip prints a physical path across the cobalt stock, banks into the paper crossing, opens out around actual PacketLark interface evidence, and becomes its outline. Request is selected at arrival. Native scrolling reveals that evidence without any click. The secondary project control changes both the signal and the real case. The physics model uses a direction-sensitive damped displacement on the strip and a delayed pull on the cut layers. The final rectangle and the product image settle on the same surface. On mobile, identity and controls precede a compact signal graphic. The project opens with the interface proof, followed by its introduction and decisions. Reduced motion uses the same editorial sequence and selectable cases with a short static cut and an ordinary screenshot.

## Remaining Home storyboard

| Scene | Desktop structure and light | Primary movement | Mobile |
| --- | --- | --- | --- |
| Arrival | Left-aligned name and availability on saturated cobalt. A graphic strip fills the other side. | A folded signal responds to the selected project and then the direction and speed of travel. | Identity and the selectable route sit above a smaller strip. Direct navigation remains in the first screen. |
| Crossing | Three paper layers open under the signal. Pink stock is visible between cobalt and cream. | A short stagger in the layers gives the strip clearance and lets the top sheet settle behind it. | Shorter span with the same read order and less parallax. |
| Featured project | Broad landscape evidence takes the left side. A serif case heading and technical decision sit in warm side light. | The moving strip becomes a frame around the revealed real interface, then rests. | Full-width image precedes the project title and decision. |
| Work index | Tight, high-contrast long list of named projects with a stable scan line. | Focus or deliberate selection swaps one preview beside the row. | Single-column list, with the selected preview expanding below its own title. |
| Engineering decisions | Offset proof pieces around one architecture artifact on deep cobalt. | Cells trade places around the selected real decision. | A tactile selector expands one explanation at a time. |
| Writing | Narrow reading column on calm light stock, with an offset margin for topics. | A quiet editorial seam precedes it. Articles can be read immediately. | Short article list and search, both in normal flow. |
| About | Portrait and experience arranged on opposing edges of a broad sheet. | Portrait and captions settle into alignment as the timeline enters. | Portrait and milestones run in chronological order. |
| Contact | Deep blue full-bleed closing composition, direct email, résumé and hiring links. | A single broad shutter closes the story. | Short finale with the same actions. |

## Regression carry-forward

The prototype is isolated under `docs/v5/prototypes/`. The source and browser traces for the three baseline bugs identify the printed-ink cascade, ScrollTrigger reparenting of a React-owned node, and shared path-keyed scroll reset as reuse risks. The checks apply to the later rebuild. [Regression record](REGRESSIONS.md)

## Evidence and decision log

The comparison requirements are independent scores on the shown dimensions and a separately blinded native-scroll comparison with V4. A candidate must meet the active goal’s thresholds to pass this review. Gate 1 approval remains Abrar’s decision.

| Round | Distinctiveness | Coherence | Scene differentiation | Motion | Interaction | Finish | Recruiter clarity | Mobile | Result |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Previous Gate 1 prototype | 4 | 5 | 4 | 3 | 4 | 4 | 4 | 4 | 32/40, from the prior fresh critic. |
| 1 | 4 | 4 | 4 | 3 | 3 | 4 | 4 | 3 | Ribbon and image cross case copy in both directions. [Round 1 evidence](evidence/patchbay/round-1/browser-audit.json) |
| 2 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 3 | Case title cleared. Mobile cue was still crossed, the ribbon tip clipped, and the alternate desktop render was missing. [Round 2 evidence](evidence/patchbay/round-2/browser-audit.json) |
| 3 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 3 | The mobile interface viewer opened a smaller image than the card. The slow mobile approach still had a sparse middle. [Round 3 evidence](evidence/patchbay/round-3/browser-audit.json) |
| 4 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 33/40. Every prototype dimension met the threshold. [Round 4 browser evidence](evidence/patchbay/round-4/browser-audit.json) |

Round 3 changed the rendering technique after interaction and mobile stayed at 3. The screenshot now shows through a clipping path from the ribbon itself, with the clipping path rectifying as the strip becomes its outline. The scroll cue moved into the identity column, the mobile path is inset and falls toward the media, and the caption waits for the photograph. Each input changes the strip geometry, palette, project, and explanatory copy. The interface can open into a large native dialog, with an equivalent action by tap and keyboard.

In the first matched, randomized blind review, X was Round 2 and Y was V4. Patchbay led on motion at **4.25 vs 3.25 desktop** and **4 vs 2.5 mobile**, with **4.5 vs 3.75** on recruiter clarity. It also led on distinctiveness (4.5 vs 4) and scene differentiation (4.75 vs 3.25). Matched scroll interaction tied (2.5) because the comparison intentionally excluded optional controls. The reviewer credited V4 for its spatial weight on desktop, more specific workshop detail, stronger opening Work and Résumé emphasis, and persistent orientation. The Patchbay mobile ribbon crossed its cue and cropped at its left edge. [V4 capture settings and timings](evidence/patchbay/v4/browser-audit.json)

In the next blind review, X was V4 and Y was Round 3. Patchbay led on motion (4.5 vs 3.5) and recruiter clarity (4.5 vs 3.5) across both widths, with scene differentiation 4.5 vs 3.5, shown interaction 4 vs 3.5, and a 4.5 tie for distinctiveness. V4’s workshop had a more visibly authored still at arrival, a more explicit Work CTA and better persistent navigation. Patchbay’s sparse middle beat and disappearing navigation remained the main comparison deficiencies. The comparable clips demonstrate scroll only, with no optional controls in either treatment.

Round 4 shortened the mobile paper crossing and added a detail mode for the original interface screenshot. The detail viewport scrolls natively in two axes and is keyboard-focusable. The project caption gained clearance from the resting paper shadow. The fresh critic confirmed the default and alternate screenshot detail was readable and found no unintended content collisions in sampled scroll states. Motion retains a sparse middle on slow mobile scroll, and only the selected input exposes its project name. The fresh critic also found the outbound arrow ambiguous on the modal control and an isolated cyan rectangle on one mobile modal capture, consistent with a captured tap highlight; it did not recur in the detail frames. [PacketLark detail on mobile](evidence/patchbay/round-4/mobile-packetlark-detail.jpg)

### Round 4 matched blind comparison

X was V4. Y was Round 4. The critic only received the same default-project native scroll recordings, frame sheets and settled stills, labelled X/Y. Optional project switches and image inspection were judged separately.

| Dimension | V4 | Patchbay Round 4 | Result |
| --- | ---: | ---: | --- |
| Distinctiveness | 4.6 | 4.4 | V4’s three workshop objects and marked-up paper establish a more specific identity immediately. |
| Scene differentiation | 3.7 | 4.7 | Patchbay’s cobalt grid, pink-edged threshold and cream serif project spread occupy different visual roles at both widths. |
| Motion on desktop | 3.8 | 4.5 | Patchbay’s ribbon remains traceable as it opens, frames the real interface and reverses. V4’s bench has convincing perspective and weight, with overlap at the section title. |
| Motion on mobile | 2.8 | 4.3 | Patchbay preserves the transition and its reverse at both speeds. The V4 hero bench and individual work asset are separated by a reading panel. |
| Shown scroll interaction | 3.5 | 4.2 | Patchbay offers visible changes in shape on both viewports. The V4 desktop chapter indicator and camera respond as well. |
| Recruiter clarity | 3.4 | 4.7 | Patchbay puts name and actions in the opening and a complete project description at the stop. V4 keeps stronger persistent navigation. |

The reviewer’s main motion criticism was that the early ribbon move reads largely as translation and the late bend-to-screen beat compresses during fast scroll. The matched protocol normalizes travel to each project anchor. It cannot isolate physics parameters or quantify frame rate on a phone. [Matched recordings and frame sheets](evidence/patchbay/README.md)

## Gate 1 result

The revised prototype meets the independent prototype score threshold and beats V4 on motion without losing recruiter clarity. Abrar’s approval of C and normal scroll is still required before Phase 2. V4 retains the stronger first-frame object specificity and persistent navigation. The next design question is how to increase tension and signal progression during the early mobile approach while preserving the clarity of the handoff.

Local Chrome checks cover all six requested widths and 844 × 390 landscape. They include first-screen recruiter facts and actions, sampled forward and reverse page-wide overflow, default Work and keyboard focus, reduced motion, and a static fallback with Canvas unavailable. The current captures and profiles use emulation. Physical phones, non-Chromium engines, production performance, and the external résumé and email destinations remain outside this checkpoint. [Responsive results](evidence/patchbay/responsive-checks.json)
