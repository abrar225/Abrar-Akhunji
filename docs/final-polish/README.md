# Final workshop polish

This pass addresses the 29 October screenshots and the request for a more interactive, coherent finish. It builds on the existing workshop and contribution city. All ten projects, all 59 articles, the source facts, and the previous case-study routes remain intact. It does not deploy or change hosting, tokens, account settings, or contribution data.

## Navigation and the reported defects

The top Work link now opens `/work/` in both desktop and mobile navigation. The archive and its case studies receive the current-page indicator. The hero’s exploration link and the bottom chapter dock still let visitors explore the homepage builds.

The blue CTA contrast issue came from an unlayered global link color overriding utility foreground colors. Primary blue links now explicitly use the shared contrasting foreground. Both light and dark CTA colors were measured against the 4.5:1 text-contrast criterion. The inspection button and source link are separate rows with clear space. The cramped category/status pairing also had a class-name mismatch: the markup uses `project-category`, while its former layout rule used another name. The actual category now has a wrapping flex layout and a visible gap before its status badge.

The marker assets, article underlines, current contents marker, and controls share the portfolio blue. Light mode uses `#2548f4`; dark mode uses `#adbcff`. The brush is translucent behind the text; active navigation uses the contrasting foreground. GitHub’s green levels retain their source-data meaning.

## ASCII scenes and the ending

`AsciiSignal.jsx` provides three original Canvas2D character scenes. The hero has a restrained signal field behind the workshop objects. The contact invitation is paired with a rotating, pointer-responsive ASCII idea field and a user-triggered pulse. The footer renders Abrar Akhunji’s name at large scale using dense ASCII characters sampled from the display lettering, with a blue scan through the ink.

Each scene has a pause control, observes visibility, stops its animation while offscreen or the document is hidden, and shows a finished frame for reduced motion. Decorative canvas content has readable text outside the canvas, and the name has a semantic heading. The footer keeps ordinary work, GitHub, contact, and return-to-top links. On phones, the name uses two lines and the contact scene stacks below the invitation.

## Chapter transitions and experience

Chapter clicks use a short signal wipe with the actual chapter numbers and destination. The position changes under that transition, so long jumps feel deliberate. The active dock marker slides to its destination. Selection is derived from the current scroll position, so a direct jump past several sections or into the footer cannot leave the first chapter marked active. Another click retargets the pending jump; wheel/touch input or scroll keys can cancel it. Reduced motion lands immediately. Native hashes remain shareable, and browser Back was checked against the previous chapter and viewport.

Experience is now an expandable chronological record. The latest role starts open; pointer or keyboard can reveal another role. The displayed dates, roles, and descriptions come from the existing portfolio data. Education and certificates remain beside it. Earlier-project shelf links retain direct access and gain a small hover/focus response.

## Narration and article progress

The narrator now offers the actual browser-supplied voice names and speeds, a native keyboard-operable seek slider, previous/next section, restart, explicit follow-text control, a floating pause action, and actionable playback errors. It reads short segments from written article blocks and excludes code blocks, tables, math rendering, and interactive widget labels. Real word-boundary events drive precise highlighting where available; time-based progress is labeled as estimated. Highlighting uses the CSS Highlight API where supported, with a paragraph outline fallback, rather than wrapping React-owned text nodes.

Cancellation invalidates old callbacks and stops timers. Switching reading mode or leaving the article disposes playback. The reading progress bar now measures the article itself, so related notes and the larger global footer do not count as unfinished reading.

The implementation uses the [Web Speech API](https://webaudio.github.io/web-speech-api/), which supplies voices and boundary events according to the browser and speech engine. The desktop browser exposed named device voices, including Rishi (`en-IN`). A deterministic speech fixture verifies the controls, errors, complete queue, stale-callback behavior and cleanup. This does not establish subjective audio quality on every device. No new cloud neural-TTS service, paid voice API, or downloadable audio engine is configured; the interface identifies the voices it actually uses.

## Charts, diagrams and study tools

Charts keep the authored source data, use the shared palette, support native keyboard inspection, and add keyboard-operable series toggles and a complete data table. The bar chart’s eight rows were checked against their source values; three existing line charts were also compared row-for-row. Source articles’ scientific claims were not independently re-researched in this styling pass. The keyboard behavior follows [Recharts’ accessibility support](https://github.com/recharts/recharts/blob/main/storybook/stories/API/Accessibility.mdx).

Concept diagrams now expose an actual tab list and matching panel, with arrow/Home/End navigation. Study cards use a readable, responsive deck with keyboard/touch reveal and navigation. This removes the former offscreen fan controls. Animation respects reduced motion. The future prompt exercise explicitly labels its prewritten response and no longer imitates a live AI request. Quiz feedback stays within the palette and offers retry; timeline steps expose expanded state. Current authored articles exercise concepts, charts and flashcards; the unused prompt/quiz/timeline branches received source review rather than a claim of full live-content coverage.

## Verification

Run `npm run test:polish` to build and execute the focused browser suite. [Verification results](verification/README.md) retain the machine-readable reports, screenshots, command output and performance sample. The existing project/content checks and functional regression were also run. No change was published.
