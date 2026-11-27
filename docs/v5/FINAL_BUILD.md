# V5 FINAL BUILD: Direction C, The Patchbay

## My decisions
1. **Gate 1 is approved:** Direction C, The Patchbay, with **normal scroll**. The literal reverse-scroll idea is dropped.
2. **Do not wait at Gate 2.** Build the vertical slice, commit it, record how to open it, then continue. I may pause you if I see a problem.
3. **My usage is limited.** Spend it on the product, not on repeated process.
4. These decisions override `V5_BRIEF.md` and `AGENTS.md` only where this file says so. Everything else still applies, including scope and safety, the truth rule, R1 to R9, the section contract, mobile, accessibility, performance targets, the 4/5 bar, all section 14 hard checks and the "ask me before" list. Record these decisions in `DECISIONS.md` and replace the "Stop at Gate 1 and Gate 2" line in `AGENTS.md` to match. Do not edit the brief.

## Start
Read `V5_BRIEF.md`, `STATE.md`, `PATCHBAY.md`, `REGRESSIONS.md` and this file. Do not reread long evidence files unless a task needs them.

The paper-cutout reference and GitHub animation URL: use them if they are now available. If not, record them as missing and continue from the written brief. Do not guess or substitute.

## Save usage
- No new concepts, no repeat audit of V1 to V5, no broad new research. Look something up only to solve a specific build problem.
- Build shared tokens, motion rules, layout primitives and the capture and check scripts once, then reuse them.
- Use cheap scripted checks often: build, types, lint, tests, route crawl, console errors, broken links, horizontal overflow.
- Look at real screenshots of every page you change, desktop and mobile. Dense frames and recordings are needed only for the preloader, hero-to-project transition, section differentiators, page transition and other signature motion. For ordinary scenes, capture the start, middle and end.
- This replaces the brief's per-scene critic and five-round limit: use a fresh critic at only three milestones (slice, all routes built, final), with batched captures. Allow at most two fix rounds per defect group. After a milestone's fixes, one rescore of the affected scenes is enough.
- Use extra subagents only for those critic reviews.
- Run the blind V4 comparison once, at the final milestone.

## Build order
Keep the app buildable at every commit. The prototype shows intent; rebuild it properly in the app's architecture instead of pasting prototype code into production.

**1. Foundation.** Complete the backup and extraction checks if anything is missing. Then remove the old V5 presentation layer. Write a concise `DESIGN.md` with the section contract. Build tokens, type, motion system, V5 navigation and menu, route shell and fallbacks.

**2. Slice.** Preloader, hero, Patchbay transition to PacketLark, one paper-cut differentiator and a second, clearly different scene. First fix what the prototype review found:
- on slow mobile scrolling, the ribbon is alone too long before project copy appears;
- V4 was more distinctive on the first screen;
- V4 kept navigation visible longer. V5 navigation must always be easy to reach.
Run milestone review 1, commit, update `STATE.md` with the preview URL, then continue without waiting.

**3. Every route, breadth first.** Make every route in `routes.md` natively V5 with real content and working navigation before polishing any one page. No route may show older UI, including direct load, Back, refresh and 404.

**4. Depth.** Finish Home from the approved storyboard, then Work, case studies, About, Contact and footer, Writing and articles, Hire, Résumé, Agents at Work, search, legal, loading, empty states and 404. Give each page type its own composition and motion as the brief requires. Patchbay is the connecting idea: do **not** repeat panels and cables everywhere. Complete R1 to R9 and the 42-row ledger. Do not add an effect merely to fill the ledger. Run milestone review 2.

**5. Harden.** Responsive widths, both themes, keyboard, reduced motion, no WebGL, touch devices, Chromium, Firefox and WebKit, performance on a production build, SEO, URLs, forms, analytics, licences. Pass all three regression checks in `REGRESSIONS.md`. Prove V1 to V4 are unchanged with a diff against tag `v5-signal-field-before-rebuild`; if any shared code they use changed, also compare screenshots.

**6. Final.** Run the full section 14 checklist, milestone review 3 and the blind V4 comparison.

## Survive a usage cutoff
Commit after each working step. Keep a short **HANDOFF** block at the top of `STATE.md`: last good commit, what is done, what is half done, exact next action, open failures, and how to run the app. Update it before starting any long step. Never leave the only copy of progress in chat.

## Rules for failures
- If a defect group still fails after two rounds, log it as FAILED with evidence and continue independent work. Revisit blockers once before the final report.
- Mark each check PASS, FAIL or NOT TESTED. Never turn NOT TESTED into PASS, lower a threshold or inflate a score.
- Do not deploy.

## Done
The goal ends when all build steps are finished and every section 14 item has a status backed by current evidence.

Report **READY FOR MY REVIEW** only if all hard checks pass (or I have approved the exception), every rubric score is at least 4 and the V4 comparison meets the brief. Otherwise report **NOT READY**, listing each failure or untested item, its effect on visitors and the next fix. If something blocks all remaining work, report it and stop.

Keep the final report short: verdict, preview URL, last commit, check table, scores, V4 comparison (including losses), weakest part, missing inputs and untested devices.