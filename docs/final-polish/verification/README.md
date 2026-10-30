# Verification — 29 October 2026

The current production bundle was checked locally. No deployment or remote account change was performed.

`npm run lint` passed. Its existing baseline-browser-mapping age notice remains informational. `npm test` passed all 36 tests, including the new exact-offset narration segmentation and seeking checks. `npm run build` passed with 59 articles, ten case studies and 73 sitemap URLs. The existing large-vendor-chunk build advisory remains; it is not a build failure. `git diff --check` passed.

`node tests/e2e/run.mjs` passed all 52 existing functional checks. This covers page metadata, article modes, Tech Tree, theme persistence, mobile navigation, all project routes, query selection, Explore/reset/Escape, inspection and the WebGL fallback. It reported no console or uncaught page errors.

`npm run test:polish` passed 28 focused checks and 56 responsive views. The [report](polish-report.json) records desktop/mobile Work navigation, both themes' blue CTA contrast, inspection and badge spacing, contact/footer ASCII, pulse controls, experience records, rapid chapter retargeting, browser Back, manual interruption, pause/offscreen rendering, reduced motion, speech voice/rate/seek/section/restart/error/completion/cleanup behavior, article-only progress, chart series and source values, native SVG keyboard inspection, marker palette, concept tabs, study cards, speech-unavailable fallback and page errors. A separate normal-motion mobile check measures that the ASCII pause control and chapter hint do not overlap at 360 and 390 pixels. The full focused suite ran in Chromium; WebKit received mobile contact/ASCII and reader smoke checks.

The 56-view matrix uses 360, 390, 768 and 1440 CSS pixels, each in light and dark, for the hero, contact, footer, experience, narrator, chart and complete work archive. Every view passed a document-overflow check and produced a screenshot. Representative desktop/mobile, light/dark, contact/footer, narrator, experience and chart views were visually inspected. Speech-fixture screenshots show test voice names; these are test data, not bundled product voices.

[Supplemental checks](supplement-report.json) confirm that native keyboard chart inspection advances from Token 2 (67, 78, 89) to Token 3 (48, 71, 85), the active reader marker uses blue with contrasting white type, and unsupported speech shows readable fallback information. [Line-chart checks](line-chart-report.json) compare all five rows in each of three existing line charts directly against their authored source configurations. These establish rendering/data integrity, not independent scientific verification of the articles.

[Workshop motion regression](regression/motion-report.json) passed camera movement/reversal, selection position, Explore reset, inspection, settled rendering, mobile headline visibility and deferred offscreen 3D initialization. The original procedural models and contribution city remain in place.

[Mobile performance](mobile-performance.json) contains a cold local Chromium sample at 390×844, 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 0.75 Mbps upload. LCP was 2,528 ms, CLS was 0, and both offscreen ASCII scenes recorded zero paints on arrival. No offscreen workshop WebGL canvas initialized. This sample follows the deferred-paint change; subsequent chapter-selection and mobile control-spacing refinements do not claim a new performance measurement. This is a local sample, not a Lighthouse score, field dataset, or guarantee across hardware and networks.

The live desktop browser exposed actual English device voices including Rishi (`en-IN`). Native voice availability and the speech API flow were inspected; audio quality across devices was not established. The deterministic fixture is what verifies pause, late callbacks, seeking, whole-queue completion, errors and disposal without depending on audio timing. No new cloud neural-voice service was configured.

Firefox, real mobile hardware and a comprehensive assistive-technology audit were not verified in this pass. Current authored widget content exercises charts, concepts and flashcards; the unused prompt, quiz and timeline branches received scoped source improvements rather than a claim of full content-level browser coverage. Hosting and the contribution-refresh Actions path remain unchanged and unexecuted remotely.

VERDICT: PASS
