# V5 release verification

- [Phone version picker](mobile-versions.jpg), [phone footer](mobile-ripple.jpg), [desktop Writing cover](desktop-writing.jpg), and [phone Writing cover](phone-writing.jpg).
- All ten motion checks passed in [Chromium](chromium.json) and [WebKit](webkit.json). The Writing cover retained its original ratio and its container matched its height at both tested widths.
- [Tap, click, and Replay checks](ripple-and-navigation.json) passed in both engines at phone portrait, phone landscape, and desktop sizes.
- [Archive checks](archives.txt) passed at 320, 390, 768, and 1440 pixels. They include version switching, direct archive routes, the V4 showcase, and the retired root route.
- The existing Chromium suite passed 69 checks. All 58 unit tests, lint, content validation, and the release build passed.
