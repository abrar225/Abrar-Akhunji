# Zero to Built — review build

The portfolio is implemented on `codex/zero-to-built`. The second visual pass follows investigation of the reference's shipped JavaScript and live origin/metro interactions. See `reference-review/findings.md` for source boundaries, REA evidence identity, observed timing and the design translation.

The homepage now has dominant opening typography, chapter navigation with progress, a continuous guided camera path, a project Build Line, bounded Explore controls, an inspection cutaway, and physical motion through the portrait, archive and contact sections. Native scroll remains the input. Reduced motion removes scroll transforms. The archive and ten case studies use the shared project source; blog features and routes remain available. No production deployment was made.

`src/lib/build-room/sceneFactory.js` is the editable model source. `tools/build-room-assets.html` renders reusable GLB and transparent desktop/mobile posters in both themes. `public/assets/build-room/manifest.json` records 52 production assets and provenance. The original material prompt is retained in `material-prompt.md`. Product images are authentic captures and project status/evidence remain qualified; Framecast is in development.

Local production preview: http://127.0.0.1:4180/ . Start with `npm run preview -- --host 127.0.0.1 --port 4180 --strictPort` after `npm run build`. Asset generation uses the dev server on port 5173 and `npm run assets:render`, followed by `npm run assets:optimize`.

Verification: lint, 26 unit tests, validation of 59 articles, production build, and 52 functional browser checks pass. `verification/report.json` records Chromium and WebKit success, 48 light/dark scene captures at 390/768/1440/1920px, 360px overflow, scene isolation and settled rendering. The measured mobile lab profile is Chromium 390×844, 4× CPU, 1.6Mbps/150ms RTT: LCP 2244ms, CLS 0, transfer 395361 bytes. This is a local lab result, not a field-data claim. The final poster-alpha correction was visually rechecked separately.

`verification/motion-report.json` checks actual camera travel and reversal, selection preserving URL and viewport, Explore reset, inspection, no settled rendering, an unclipped mobile headline, and deferred mobile renderer initialization. Camera moves from [7.50,5.70,12.50] at arrival to approximately [0,4.30,12.20] at the work view. Geometry statistics are in `public/assets/build-room/render-stats.json`.

Firefox's Playwright engine could not launch on this host (headless compositor/sandbox extension failure); it is recorded as environment-blocked. Physical phone and actual Safari/iOS device checks remain outside this environment. Keyboard focus, reduced motion, themes, unknown slugs and failed WebGL are covered by browser checks. A 200% zoom review is not yet recorded.

A clean rollback build of original commit `1fe25d50ae1e64eb3eeb5f2c3b21f492e40ac16c` was independently rebuilt in `/tmp/zero-built-rollback-source`; its static archive is `/tmp/zero-to-built-rollback.tar.gz`. This temporary archive is local and is not included in production assets. Source rollback is available from that Git commit.

The implementation does not claim a pixel-for-pixel clone. The reference's individual gallery assets and every audio event were not exhaustively exercised. The code and workshop assets are original, with the reference informing the pacing, physical composition and project-navigation behavior.
