# Phase 0 browser evidence

The 1440 × 900 desktop and 390 × 844 emulated-touch runs used Chromium 158.0.8127.37. The route sweep produced 804 direct visits and 2,412 route viewport frames at 0%, 50%, and 100% of document scroll. Section-specific captures, keyboard checks and Home recordings supplement the direct visits. Dates in archived article paths are preserved when their build emits both aliases.

| Build | Direct paths per viewport | Evidence |
| --- | ---: | --- |
| V1 Serif Studio | 2 | Home and archival 404. [Desktop Home](v1/desktop/home/00.jpg) · [Mobile Home](v1/mobile/home/00.jpg) |
| V2 Terminal Pulse | 9 | Home, six article URLs, Writing and archival 404. [Desktop Home](v2/desktop/home/00.jpg) · [Mobile Writing](v2/mobile/blog/00.jpg) |
| V3 Halide Signal | 118 | Home, 114 article URLs, Writing, Hire and archival 404. [Desktop Home](v3/desktop/home/00.jpg) · [Mobile Writing](v3/mobile/blog/00.jpg) |
| V4 Build Room | 170 | Home, 150 article URLs, ten case studies, seven other app routes, the standalone Agents at Work entry and archival 404. [Desktop route samples](v4-route-archetypes.jpg) · [Standalone desktop](v4/desktop/agents-at-work/observed.json) · [Standalone mobile](v4/mobile/agents-at-work/observed.json) |
| V5 Signal Field | 103 | Home, 82 article URLs, ten case studies, seven other app routes, standalone Agents at Work, search with zero results and static 404. [Desktop route samples](v5-route-archetypes.jpg) · [Mobile empty search](v5/mobile/blog---q-browser-baseline-no-results/00.jpg) |

The metadata records direct URL status, rendered headings, first-viewport semantics, horizontal overflow, local resource failures, JavaScript errors and approximate startup measurements. The main reports cover 401 paths per viewport, with V4 Agents at Work recorded separately. The direct sweeps reported no capture failures, unexpected HTTP errors, JavaScript page errors, or first-frame page-wide horizontal overflow. The targeted interaction run independently checks state changes such as filters and browser history. [Key routes report](initial-report.json) · [Bulk route report](bulk-report.json) · [Interaction checks](checks/interactions.json) · [Work filter checks](checks/work-filter.json)

The curated screenshots are native viewport captures. Local untracked route directories include the remaining screenshots and their per-route observations. The local [bulk-route-frames.zip](bulk-route-frames.zip) holds the same 2,196 bulk frames at 640 px desktop or 320 px mobile width. The ZIP integrity check passed. The Git checkpoint carries the reports, curated frames and recordings. Re-run the procedure below to recreate the full corpus on a separate checkout.

## Recordings

| Version | Desktop wheel | Emulated touch |
| --- | --- | --- |
| V1 | [V1 desktop](recordings/v1-desktop.webm) | [V1 mobile](recordings/v1-mobile.webm) |
| V2 | [V2 desktop](recordings/v2-desktop.webm) | [V2 mobile](recordings/v2-mobile.webm) |
| V3 | [V3 desktop](recordings/v3-desktop.webm) | [V3 mobile](recordings/v3-mobile.webm) |
| V4 | [V4 desktop](recordings/v4-desktop.webm) | [V4 mobile](recordings/v4-mobile.webm) |
| V5 | [V5 desktop](recordings/v5-desktop.webm) | [V5 mobile](recordings/v5-mobile.webm) |

The clips cover the early native-scroll progression through approximately 3,450–3,900 px, from arrival into the next scenes. They do not measure animation frame rate. The saved frame sheets show sampled moments from the actual recordings. [Desktop frames](recordings/desktop-motion-frames.jpg) · [Mobile frames](recordings/mobile-motion-frames.jpg) · [Later V4 camera frames](recordings/v4-desktop-camera-frames.jpg) · [Observed offsets](recordings/observed.json)

## Reproduce locally

Run from the repository root with Node 22+, npm, Git history, and Google Chrome. The capture harness serves the static output on loopback. It mirrors the archive directory routing, static 404 status, and the current legacy blog redirect. It leaves deployment and external services alone.

```sh
npm run build:release
node docs/v5/evidence/baseline/capture.mjs initial
node docs/v5/evidence/baseline/capture.mjs bulk
node docs/v5/evidence/baseline/capture.mjs detail
node docs/v5/evidence/baseline/capture.mjs filter
npx playwright install ffmpeg
node docs/v5/evidence/baseline/capture.mjs motion
```

The archive build suppresses the original timed splash screens and stubs retired live assistants. A separate archive switcher may visually overlap original controls. This run covers Chromium on loopback and mobile emulation. Standalone external services, the externally hosted résumé document, native mobile viewport chrome, screen readers, full performance lab runs, and historical startup splash behavior remain unverified.
