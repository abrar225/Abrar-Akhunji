# From reference study to Abrar’s portfolio

The second reference is [Avi Vashishta’s portfolio](https://www.avivashishta.com/). The first reference and the original eleven-page portfolio brief remain documented in `../reference-study/` and `../implementation/`. This refinement keeps the software workshop, the three project-specific models, ten case studies, and all 59 articles. It replaces the empty closing tray with a real contribution city and gives the blog its own editorial reading space.

## 1. Understand the reference

[Reference mechanics](reference-mechanics.md) separates delivered-source observations, browser observations, design choices, and unknowns. It covers the shared design system, Build/Brand/Learn navigation, homepage, reader, cursor, markers, Agent surfaces, and all five Lab mechanisms. The downloaded public sources and manifests are in `source/`; screenshots preserve the inspected visual states. The REA summary retains its original evidence IDs, source digest, selected files, and partial/truncated coverage. The process restart ended the live REA ledger; the checked-in summary and acquired sources are retained, rather than claiming a complete portable ledger export.

The useful principle is to let real work supply the visual story. Abrar’s physical workshop stays distinctive; the city makes the days behind it tangible. Avi’s personal artwork, logo, career claims, campaign metrics, and contribution numbers are not Abrar’s content.

## 2. Read the whole contribution article

The [specified article](https://www.avivashishta.com/blog/animate-github-contribution-graph-portfolio) was read through its introduction, three implementation steps, all six animation descriptions, embedded example prompt, and closing guidance. Its acquired HTML is `source/blog__animate-github-contribution-graph-portfolio.html`. The embedded prompt is reference material; the user’s request authorizes the implementation.

The first step obtains daily counts and GitHub’s own five intensity levels through GraphQL. The second caches that response so visitors do not need API credentials or a live API request. The third shares a time-based canvas lifecycle across entrances, replay, visibility, and reduced motion. Its six representations are the diagonal calendar, city, weekly pulse, year ring, streak, and terminal. We studied all six and selected the city requested by the user, with an ordinary grid and complete daily table for exact reading.

Two accuracy details matter. The source describes a mismatch between its reported total and summed days; our refresh preserves those values independently and never changes daily counts to force agreement. The city’s height follows a square-root scale, so it must not imply linear height. The API measures contributions, which include more than commits. GitHub’s profile settings were not changed.

## 3. Build the city from Abrar’s data

`src/components/github/GitHubCity.jsx` draws each day using three shaded faces on Canvas2D. It rises once when visible, supports replay and pointer/keyboard inspection, and stops drawing when settled, offscreen, or in a hidden tab. Reduced motion shows the finished state. Colors preserve the source levels; building heights use the disclosed square-root scale. Unreported cells remain unavailable rather than becoming invented zero days.

The cached `abrar225` response contains 3,081 contributions across 368 reported dates, from 26 October 2025 through 28 October 2026 UTC. Its highest day is 176 on 8 August 2026. The page shows the source account and snapshot date. The snapshot is dated evidence, not a live counter. [Refresh instructions](data-refresh.md) explain validation, atomic writes, the optional daily workflow, and its unexecuted remote authentication/deployment boundary.

## 4. Give the blog a clear reading path

The index uses a large serif title, one featured note, dated article rows, composed search/topic filters, a live result count, and the existing Tech Tree. Slash focuses search; Escape clears it without restoring a stale filter.

The reader uses a restrained serif hierarchy, readable body width, numbered contents beside the article on wide screens, and a native contents disclosure on smaller screens. The active section receives a yellow marker and heading underline. Contents include interactive lesson headings. Developer-mode deep links preserve their mode, including headings beginning with numbers. Existing Simple/Developer content, speech, bookmarks, copy/share, math, sources, related articles, and previous/next navigation remain available. Code blocks gain per-snippet copy controls without adding control labels to spoken article text.

## 5. Add feedback with a purpose

An original SVG marker stroke reveals behind selected text as it enters view. The optional cursor label says Read, Open, or Inspect while preserving the native pointer and text selection. It follows only mouse input on fine pointers, stops updating when settled, and disappears for touch or reduced motion. Small header magnets move a few pixels without changing link targets. These adaptations use the portfolio’s own paper/ink colors and original assets.

## 6. Verify and review

[Verification](verification/README.md) records the current test results and screenshot matrix. Local production previews are `/#activity` for the city, `/blog/` for the index, and `/blog/flashmap-flow-map-speculative-decoding/?mode=dev` for the reader. No production deployment, remote workflow run, account setting change, or push was performed.

The investigation covers public route families and the requested interaction mechanisms. It does not establish exhaustive coverage of all 65 reference articles, every media asset, backend behavior, every device, or every accessibility outcome. Original adaptations were implemented where they improve this portfolio; other Lab scenes are documented inspirations, not copied features.
