# Verification — 29 October 2026

The production bundle was tested locally at `127.0.0.1`. This pass follows the final application changes, including font-aware initial anchors, the active-heading correction, measured city captions, and compact mobile topic navigation.

## Executed checks

`npm run lint` passed. ESLint prints the existing baseline-browser-mapping age notice; it reports no lint errors. `npm test` passed all 34 tests, including calendar dates, unavailable days, square-root scaling, streak boundaries, API validation, independent totals, and preservation of the last good snapshot on an invalid refresh. `npm run build` passed and generated 59 article pages, ten case-study pages and a sitemap containing 73 URLs. `git diff --check` passed.

Retained command output: [lint](lint.log), [unit tests](unit.log), [build and focused checks](build-and-editorial.log), [final focused run](editorial.log), and [existing regression](regression.log).

`node tests/e2e/run.mjs` passed all 52 existing functional checks after the final shared-navigation change. This covers canonical/structured metadata, article modes, Tech Tree expansion, hiring/404 routes, persisted themes, mobile navigation, every project route, rapid project switching, keyboard project selection, Explore/reset/Escape, architecture inspection, and a failed-WebGL fallback. It reported no console or uncaught page errors.

`npm run test:editorial` builds and runs the new focused suite. Its [machine-readable report](editorial-report.json) records 19 passing checks and 24 responsive views. The checks exercise exact calendar dates, all 368 available grid cells, complete daily rows, source attribution, no browser GitHub API calls, reduced-motion settling, composed search/topics and Escape, the retained Tech Tree, cursor settling, interactive lesson headings, unique anchors, one active reading section, numbered Developer deep links and reload, code-copy contents, bookmarks, reading-mode position, font-aware chapter links, marker reveal, pointer/touch inspection, replay, and settled/offscreen rendering. Chromium ran the full suite; WebKit passed city keyboard inspection and a Developer article-route smoke check. Uncaught page errors were empty.

The responsive matrix is 360, 390, 768 and 1440 CSS pixels, each in light and dark, for the city, article index and Developer reader. Every view passed the document-width overflow check and produced a PNG. The reader’s mobile contents disclosure was opened, followed, and closed during navigation. A separate mobile context enabled touch input and verified building selection, `pan-y` scrolling, and absence of the decorative cursor.

`DESIGN_OUTPUT=docs/avi-study/verification/regression node tests/e2e/motion.mjs` passed both [workshop motion checks](regression/motion-report.json): scroll-driven camera/reversal, project-selection position, Explore reset, architecture inspection, settled rendering, mobile title visibility, and deferred initialization of the offscreen 3D scene.

## Visual and loading evidence

The final [city chapter](city-chapter-preview.png), [reader section](reader-section-preview.png), and [code block](reader-code-preview.png) were inspected alongside desktop/mobile and light/dark matrix views. The review corrected a narrow-caption clipping risk, duplicate theme controls, excessive mobile topic wrapping, and an active underline that could incorrectly follow an earlier interactive heading. The global header still provides the theme control. The original marker stroke and font license are under `public/assets/editorial/`.

[No-script evidence](fallback-report.json) confirms that the home fallback includes the city’s actual total, date range, UTC snapshot date, and ordinary GitHub source link. The interactive canvas requires JavaScript; the source facts do not.

[Mobile performance](mobile-performance.json) records one cold Chromium lab load at 390×844, 4× CPU slowdown, 150 ms network latency, 1.6 Mbps download and 0.75 Mbps upload. LCP was 2,464 ms, CLS was 0, and no offscreen workshop WebGL canvas initialized on arrival. This is a local sample rather than a Lighthouse score or field measurement, and it should not be generalized to all devices and networks.

## Boundaries

No production deployment, remote Actions run, token/secret change, git push, or hosting setting change was performed. The daily refresh workflow’s remote authentication and bot-commit/deployment path remain unverified; see [refresh instructions](../data-refresh.md). Firefox and real mobile hardware were not verified in this pass. Keyboard, touch emulation, reduced motion, semantic alternatives and responsive checks provide specific accessibility evidence; they are not a comprehensive assistive-technology audit. The reference investigation’s source and route coverage limits remain in [the mechanics report](../reference-mechanics.md).

VERDICT: PASS
