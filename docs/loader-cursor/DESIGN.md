# Opening and cursor reference

Source: https://bajkamalsingh.me/, inspected on 29 October 2026 with Firecrawl and Ego Browser. Scope: first loading screen and pointer behavior only. Local implementation: React 19, GSAP 3, native Pointer Events.

The live reference was inspected at 1440 × 900 and 390 × 844. Screenshots are in [reference/desktop.png](reference/desktop.png) and [reference/mobile.png](reference/mobile.png). The reference GSAP intro was paused at 3.3 seconds for its fully revealed text state; its independent counter continues separately, so the captured percentage is not a timeline marker.

## Extracted values

The loader background is `#012CEB`; the text and progress frame are `#F4EFE6`. The top line has a `#0A0A0A` rectangular bar. Text uses Schoolbell with inherited weight 600 (synthetic weight for the regular font). At 1440 pixels, the computed statement size is 97.92px, governed by `clamp(48px, 6.8vw, 124px)`. The overall text container is capped at 1500px and uses 48px horizontal padding on desktop, 32px at intermediate widths and 16px on phones. The percentage uses Teko 700 at 100px desktop and 60px mobile. The desktop progress frame is 180 × 20px with a 2px border and 2px internal padding, alongside a 4px vertical cream rule.

The reference animates each letter from 24px blur and zero opacity to clear and visible, with 1-second duration, 25ms stagger and `power2.out` easing. The black bar expands from the left in 1 second using `power4.inOut`. Words enter sequentially and overlap; the second and third lines spread their two words to the edges. The percentage is a timed 4.9-second `power1.inOut` tween, rather than measured network progress. Text dissolves in reverse order with 12px blur; the overlay then reveals the homepage. Skip is in the bottom right. The original reference uses a white dot and ten circular followers, with a larger outlined circle over links.

## Implementation choices

The implementation preserves the three-line wording, handwritten letter reveal, black bar, colors and counter treatment. Abrar’s monogram, name, engineering role and creator credit are original additions. The counter remains an introduction clock. The underlying page and assets load concurrently. The local Schoolbell font is reused; Teko is sourced from Google Fonts, subset to digits and percent and stored locally with its OFL license. No reference portrait, video or project assets are used.

The intro is shown on direct homepage loads and reloads. Anchor links, direct content URLs and reduced-motion visits bypass it. Skip is available immediately, with Escape and Tab providing immediate dismissal. The page is inert only while the overlay is present. A bounded fallback releases it if fonts or animation stall. Phone sizing preserves the reference layout while keeping the counter and Skip from overlapping, a problem observed on the original at 390px.

The pointer deliberately simplifies the reference: a precise 6px dot at rest, a quiet trailing ring over links, a hand in the river and active 3D exploration, and a pixel pointer over the GitHub city and ASCII signature. Only the halo is interpolated; the actual hotspot tracks directly. Labels appear only for authored interaction hints. Pointer hit testing is refreshed during scrolling. Forms, code blocks, text selection, keyboard use, touch, reduced motion and forced colors retain the native pointer. Animation stops once settled.

## Fidelity boundaries

The original includes a translucent blue pulse over its own portrait/video; that borrowed imagery and its later cinematic homepage reveal are outside this task. The recreated curtain fades into Abrar’s existing workbench. This is a close reconstruction of the inspected loader composition, with explicit identity, responsiveness and pointer adaptations; it is not a claim that both complete sites are pixel-identical.
