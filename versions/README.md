# Portfolio versions

[manifest.json](manifest.json) is the ordered release catalog. Historical entries pin the source commit and author date. The current pin records the design baseline. The live entry itself always points to the current site.

| Version | Source | Completion evidence |
| --- | --- | --- |
| v1 Serif Studio | `b6a6217` | End of the April redesign sequence, after the final serif direction and the follow-up résumé and certification updates. |
| v2 Terminal Pulse | `2c3376d` | New homepage and blog experience with project modals and sound. The networked Digital Twin evolved into this release. Its retired assistant is replaced with a contact link. |
| v3 Halide Signal | `8bffe4b` | Final Halide build, including the staged ASCII hero, river simulation and the hiring route added by the October platform rebuild. |
| v4 Build Room | `23e12ff` | Current workshop design documented in the implementation and polish notes, with subsequent creature improvements and the standalone Agents at Work showcase. |

GitHub reported `main` and `codex/zero-to-built` and no tags. Remote `main` at `40c013e` adds only a contribution refresh to the local reviewed baseline. Build and completion evidence establish the design stages. Historical production dates are unavailable.

The November original (`3035d48`), its duplicate root (`ad62941`), and the January motion build (`fed3b25`) are grouped with the April design. The archive keeps the April snapshot as Serif Studio. The intermediate GSAP, WebGL, and April Style Lab states belong to the Serif release. The July Digital Twin drafts and build repair preceded CyberTerminal. The September Halide rollout and mobile polish (`c52c3a5`) precede the final October Halide snapshot. Zero to Built, its review builds and later workshop variations belong to one release family. Signal Studio and Living Blueprint are concept studies. The blue redesign backup and the motion/chapter experiment branches are development snapshots.

## Build and preview

Use Node 22 or newer, npm, Git with full history, and tar. Run:

```sh
PORTFOLIO_PUBLISH_VERSIONS=1 npm run build:release
npx playwright install chromium
npm run test:versions
npm run preview
```

The normal app build stays independent. The release build reconstructs each snapshot in a temporary directory with its pinned dependencies. Archive output is generated under `dist/versions/` after the current build. Historical pages open without their timed splash screens. Terminal Pulse generates a small article index at build time and loads individual Markdown bodies on demand. Serif Studio loads its decorative WebGL background separately and skips it on touch and reduced-motion devices. The footer-mounted archive control is outside the historical React tree so direct pages and error pages can share it without changing the old layouts.

## Publishing on Hostinger

The Hostinger deployment command builds and packages the current site and the archives. Publication is two steps. First use `npm run deploy:hostinger` with the switcher flag unset. Check each archive home and at least one nested article and one missing route directly on Hostinger. Confirm the archived 404 status, content security policy, robots header, and the current navigation. Then repeat deployment with `PORTFOLIO_PUBLISH_VERSIONS=1` to show the links in the current navigation. Unsetting the flag on a subsequent deployment removes the current navigation entry while retaining stable archive URLs.

## Add a version

When a distinct design replaces the current one, pin the outgoing design to its final commit, remove its current flag, then append the new entry with the next number. Record completion evidence above. Check historical routes and asset prefixes and add any required adaptation to the build script. Preserve stable version slugs and run the release build and browser checks before rollout.
