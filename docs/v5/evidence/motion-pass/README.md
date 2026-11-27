# V5 motion and contrast pass

The local production build is available at [localhost:4173](http://localhost:4173/). The ten-second [walkthrough](production-walkthrough.mp4) shows the Work preview change on scroll, route travel through the fullscreen menu, the About trace and the footer ripple.

| Scene | Desktop | Phone |
| --- | --- | --- |
| Writing contrast | [Dark masthead](1440-writing-dark.jpg) | [Dark masthead](390-writing-dark.jpg) |
| Home | [Slow asset load](1440-loading.jpg) · [Screen selected](1440-hero-screen.jpg) | [Dark hero](390-home-dark.jpg) |
| Work | [Scroll-selected proof](1440-work-preview.jpg) | [Inline proof](390-work.jpg) |
| About | [Experience trace in progress](1440-about-trace.jpg) | [Active trace](390-about-trace.jpg) · [Reduced motion](390-about-reduced.jpg) |
| Contact and navigation | [Contact](1440-contact.jpg) · [Open menu](1440-menu.jpg) · [Footer ripple](1440-footer.jpg) | [Contact](390-contact.jpg) · [Open menu](390-menu.jpg) |

The Writing masthead foreground and background pairs measured 14.56:1 in light and 14.43:1 in dark. The [axe contrast scan](contrast.jsonl) found zero automated violations across 12 representative routes in both themes. Axe left 158 checks incomplete, including layered backgrounds. The screenshots show visual checks on both viewports.

Eight motion checks passed in [Chromium](checks.json) and [WebKit](webkit.json). The [behavior regression suite](behavior.json) passed eight groups, including the seven baseline viewport sizes. The existing E2E suite passed all 69 checks and all 58 unit tests passed. Lint and the production build passed.

The [frame samples](frames.json) measure requestAnimationFrame cadence during real wheel inputs on the local desktop host. They do not cover physical phones, low-end hardware, or hosted delivery. The broader release review remains in [FINAL_REVIEW.md](../../FINAL_REVIEW.md).

```sh
PATCHBAY_ORIGIN=http://127.0.0.1:4173 node docs/v5/verify-motion-pass.mjs
```
