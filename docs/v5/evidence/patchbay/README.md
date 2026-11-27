# Gate 1 Patchbay recordings

The scroll recordings run from the first viewport into PacketLark and back. Both directions play at one native-input speed per recording. The default PacketLark runs start with a fresh context and use only scroll. Separate captures use the optional route controls.

| Capture | 1440 × 900 desktop | 390 × 844 emulated touch |
| --- | --- | --- |
| Round 4 at slow speed | [Recording](round-4/desktop-slow.mp4) · [Dense frames](round-4/desktop-slow-frames-01.jpg) | [Recording](round-4/mobile-slow.mp4) · [Dense frames](round-4/mobile-slow-frames-01.jpg) |
| Round 4 at fast speed | [Recording](round-4/desktop-fast.mp4) · [Dense frames](round-4/desktop-fast-frames-01.jpg) | [Recording](round-4/mobile-fast.mp4) · [Dense frames](round-4/mobile-fast-frames-01.jpg) |
| Select Voice then scroll | [Recording](round-4/desktop-patch.mp4) | [Recording](round-4/mobile-patch.mp4) |
| Inspect real product evidence | [Screenshot](round-4/desktop-inspect-zoom.jpg) | [Fixo Flow](round-4/mobile-inspect-zoom.jpg) · [PacketLark](round-4/mobile-packetlark-detail.jpg) |
| Reduced motion | [Screenshot](round-4/desktop-reduced-motion.jpg) | [Screenshot](round-4/mobile-reduced-motion.jpg) |
| V4 equivalent at slow speed | [Recording](v4/desktop-slow.mp4) | [Recording](v4/mobile-slow.mp4) |
| V4 equivalent at fast speed | [Recording](v4/desktop-fast.mp4) | [Recording](v4/mobile-fast.mp4) |

The remaining 8 fps contact sheets and settled stills at 0, 25, 50, 75 and 100 percent sit next to the recordings. [Round 1 browser report](round-1/browser-audit.json) · [Round 2 browser report](round-2/browser-audit.json) · [Round 3 browser report](round-3/browser-audit.json) · [Round 4 browser report](round-4/browser-audit.json) · [V4 browser report](v4/browser-audit.json) · [Responsive checks](responsive-checks.json)

V4 is the archived Build Room from the pinned commit. The archive uses its existing PacketLark query to align project choice. The cases present evidence differently. Chrome, device settings, nominal duration per leg, dwell, output frame rate, encoder settings, and capture procedure were shared. The distance was normalized to each page’s project anchor. The tests use trusted Chrome wheel and touch events. The captured frame counts describe evidence density and do not measure native device performance.

## Reproduce

Serve the Gate 1 prototype with `npm run dev -- --host 127.0.0.1 --port 5181`. With Chrome and FFmpeg available, run `node docs/v5/prototypes/patchbay-capture.mjs prototype round-4`. The harness overwrites that round’s capture filenames. `npm run build:release` creates the archive builds if needed. Run `node docs/v5/prototypes/patchbay-capture.mjs baseline` to capture V4, and `node docs/v5/prototypes/patchbay-capture.mjs blind round-4` to generate fresh randomly assigned X/Y packages.
