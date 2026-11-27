# Gate 1 prototype captures

Prototype footage uses actual Chrome wheel input on desktop and Chrome’s emulated touch input on mobile. The patchbay clip activates Request using Enter or a tap, then scrolls to PacketLark. The stills show default states, so the equivalent patchbay evidence still is Fixo Flow. Live preview runs at [the direction chooser](http://127.0.0.1:5181/docs/v5/prototypes/).

| Variant | Desktop opening / evidence / recording | Mobile opening / evidence / recording |
| --- | --- | --- |
| A perceived ascent | [Hero](a-ascent/desktop-000.jpg) · [Evidence](a-ascent/desktop-100.jpg) · [Recording](a-ascent/desktop-motion.mp4) | [Hero](a-ascent/mobile-000.jpg) · [Evidence](a-ascent/mobile-100.jpg) · [Recording](a-ascent/mobile-motion.mp4) |
| A literal reverse | [Hero](a-reverse/desktop-000.jpg) · [Evidence](a-reverse/desktop-100.jpg) · [Recording](a-reverse/desktop-motion.mp4) | [Hero](a-reverse/mobile-000.jpg) · [Evidence](a-reverse/mobile-100.jpg) · [Downward fallback recording](a-reverse/mobile-motion.mp4) |
| B folio | [Hero](b-folio/desktop-000.jpg) · [Evidence](b-folio/desktop-100.jpg) · [Recording](b-folio/desktop-motion.mp4) | [Hero](b-folio/mobile-000.jpg) · [Evidence](b-folio/mobile-100.jpg) · [Recording](b-folio/mobile-motion.mp4) |
| C patchbay | [Hero](c-patchbay/desktop-000.jpg) · [Evidence](c-patchbay/desktop-100.jpg) · [Recording](c-patchbay/desktop-motion.mp4) | [Hero](c-patchbay/mobile-000.jpg) · [Evidence](c-patchbay/mobile-100.jpg) · [Recording](c-patchbay/mobile-motion.mp4) |

Each directory also contains the 25%, 50%, and 75% positions. Native input and browser messages are summarized in [browser-audit.json](browser-audit.json). Responsive viewport anchors, keyboard and touch mode, restoration, and reduced-motion checks are in [prototype-checks.json](prototype-checks.json). The viewport captures are 1440 × 900 and 390 × 844. The encoder is FFmpeg, using Chromium’s compositor frame timestamps. Recordings document visual motion and input, with performance measurement reserved for the production build.

To recreate the footage, start `npm run dev -- --host 127.0.0.1 --port 5181` and run `node docs/v5/prototypes/capture.mjs` with Chrome and FFmpeg installed.
