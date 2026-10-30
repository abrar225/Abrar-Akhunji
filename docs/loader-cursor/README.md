# Reference loader and contextual cursor

The opening closely reconstructs the loader at [bajkamalsingh.me](https://bajkamalsingh.me/). The extracted values, inspected screenshots, adaptations and fidelity boundaries are recorded in [DESIGN.md](DESIGN.md).

`IntroLoader.jsx` supplies the handwritten three-line reveal, black expansion bar, cobalt background and cream counter, with Abrar’s own identity and creator credit. It runs on a direct homepage load or reload, finishes automatically, and can be dismissed immediately with Escape or Tab, or with the Skip button. Anchors, content URLs and reduced-motion visits bypass it. The page stays inert only during the intro; scroll styles and animation resources are restored on exit and cleanup. The progress number follows the reference’s timed introduction rather than reporting network transfer progress.

`SiteCursor.jsx` replaces the hover-only reticle with a continuous dot and a quiet ring on links. Its hotspot tracks mouse coordinates directly. The hand appears in the river and active 3D exploration; the pixel arrow appears over the contribution city and ASCII signature. Authored interaction verbs get small labels. Scroll retargeting, native form controls and selection, keyboard, touch, reduced motion, forced colors and idle suspension are covered by the browser checks.

## Verification

The baseline and final unit runs both passed 47/47 tests. ESLint passed with zero lint errors, and the production build completed. Tooling retains its existing browser-data-age notice and Three.js chunk-size advisory.

The browser acceptance run passed 11 behavioral checks and five viewport checks: 1440 × 900, 768 × 1000, 390 × 844, 360 × 800 and 844 × 390. See [verification/report.json](verification/report.json), the loader screenshots and the hand/pixel screenshots. No application exceptions were recorded. A `ResizeObserver loop completed with undelivered notifications` browser notification was reproduced with the intro absent on `/#home`; it is retained separately in the report as an existing canvas-layout notification.

The production preview was also checked for the correct loader color and local font, inert release, precise cursor coordinates and readable static HTML fallback. The 3D hand state and drag interaction were checked against the compiled build. Existing Playwright editorial assertions were updated to expect the newly requested replacement cursor; that historical suite was not executed in this task.

Run `python3 .agents/skills/gravitas/scripts/verify.py --cmd 'npm run lint && npm test && npm run build'` for the project checks. With Vite running at port 5173 and Ego Browser connected, run `ego-browser nodejs < tests/e2e/loader-cursor.mjs` for the browser acceptance checks. The browser script creates a test page inside this goal’s existing task space.

These changes are local; no deployment was performed.
