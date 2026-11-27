# Signal Field palette and type extraction

Source revision `abb86caf65f3b06c4a9c369759b2519c42cedde9`, tagged `v5-signal-field-before-rebuild`. The values below come from source, including the live cascade where multiple rules redefine one surface. [Color source inventory](color-source-inventory.json) retains the literal values, selectors and line references for CSS aliases, gradients, colors, font declarations, markup attributes and inline design literals. It covers both current browser entries, the shared reading and version styles, the static 404, the sitemap stylesheet, inline favicon and page metadata, and the static SEO renderer. Overridden declarations remain in the inventory for provenance. Colors embedded in screenshots and brand artwork stay with their original assets.

## Main V5 shell tokens

[Main V5 styles](../../../src/v5.css) load after the shared Tailwind and [reader rules](../../../src/reader.css). [Print motion](../../../src/print-motion.css) loads last. The table resolves theme aliases at the shell. A component can override them locally.

| Token | Light | Dark |
|---|---|---|
| `--signal-blue` | `#2637c7` | `#2637c7` |
| `--signal-poster-blue` | `#202eb0` | `#202eb0` |
| `--signal-yellow` | `#ffd85b` | `#ffd85b` |
| `--signal-pink` | `#f59bb6` | `#f59bb6` |
| `--signal-stock` | `#f5f0e3` | `#f5f0e3` |
| `--signal-sheet`, `--signal-ivory` | `#fffaf0` | `#fffaf0` |
| `--signal-print` | `#201d28` | `#201d28` |
| `--signal-night` | `#121331` | `#121331` |
| `--signal-graphite` | `#242334` | `#242334` |
| `--signal-paper`, `--color-canvas` | `#f5f0e3` | `#211f30` |
| `--signal-ink`, `--color-fg` | `#201d28` | `#f2f1ff` |
| `--signal-muted`, `--color-muted` | `#535670` | `#c4c7e4` |
| `--signal-strong-rule` | `#292631` | `#716985` |
| `--signal-rule`, `--color-line`, `--color-border` | `#c9c1b1` | `#47496a` |
| `--signal-white-rule` | `#ffffff40` | `#ffffff40` |
| `--signal-lime` | `#e6fa8d` | `#e6fa8d` |
| `--signal-lilac` | `#dcd9f5` | `#dcd9f5` |
| `--signal-sage` | `#d9e7ab` | `#d9e7ab` |
| `--signal-proof-bottom` | `#efb8b4` | `#efb8b4` |
| `--signal-writing-ink` (Home writing only) | `#1e2445` | `#1e2445` |
| `--color-surface` | `#fffaf0` | `#302d42` |
| `--color-elevated` | `#ebe5d8` | `#34365d` |
| `--color-faint` | `#626481` | `#a9accb` |
| `--color-accent` | `#2637c7` | `#b7c3ff` |
| `--color-accent-deep` | `#252a9e` | `#252a9e` |
| `--color-accent-soft` (inherited from [index.css](../../../src/index.css)) | `#148094` | `#A9E4EE` |
| `--color-on-accent`, `--color-accent-contrast` | `white` | `#121331` |

The optional version disclosure locally sets foreground `var(--signal-print)`, muted `#535060`, accent `var(--signal-blue)`, line `#aaa298`, elevated `var(--signal-sheet)` and surface `#ffe58e`. Reader variables `--reader-paper`, `--reader-ink`, `--reader-muted`, `--reader-rule` and `--reader-marker` map to `--color-canvas`, `--color-fg`, `--color-muted`, `--color-line` and `--color-accent` respectively. Main documents restore the `dark` or `light` HTML class from localStorage `theme` before rendering. The default light choice comes from [index.html](../../../index.html) and [useTheme.js](../../../src/lib/useTheme.js). The shared CSS contains an older root color system and is inventoried separately.

## Blue treatment in the baseline

| Surface | Exact source value and behavior |
|---|---|
| Signature cobalt | `#2637c7`. Used in the header rail, theme-color metadata, favicon, static 404, live accents and controls. |
| Home foundation | `#202eb0` from `--signal-poster-blue`. The original `background: var(--signal-blue)` is superseded for this surface. |
| Home grid | `linear-gradient(#ffffff24 1px,transparent 1px),linear-gradient(90deg,#ffffff24 1px,transparent 1px)` at `32px 32px`. |
| Static hero light pools | `radial-gradient(ellipse at 20% 20%, #5281ff, transparent 48%), radial-gradient(ellipse at 84% 80%, #5767f4, transparent 58%)` in the `::before` tone layer, opacity `.33`. |
| Photo backing | `var(--signal-halftone) center / 7px 7px`, then `radial-gradient(ellipse at var(--ink-x, 48%) var(--ink-y, 62%), #9ce9ffb5, transparent 57%)`, over `linear-gradient(137deg,#2a3195 8%,#293bd7 52%,#455fff)`. |
| Paper ruling and halftone tokens | `--signal-lines: repeating-linear-gradient(transparent 0 27px, #3b355518 27px 28px)`. `--signal-halftone: radial-gradient(circle, #ffffff55 1px, transparent 1.35px)`. |
| Animated wash | [InkPaper](../../../src/components/v5/InkPaper.jsx) uses RGB triplets `86, 238, 255`, `151, 119, 255` and `83, 166, 255`. Each Canvas2D radial gradient starts with color alpha `.78` at stop `0`, then `.27` at `.58`, then `0` at `1`. Inner radius is `.13` of outer radius. Both canvas dimensions are scaled to `.42` of the hero, with screen composition and CSS opacity `.88`. It updates on mouse input above 880px and pauses when the hero is out of view or the page is hidden. |
| Custom cursor overlay | `1px solid #fff` outline, `#79e7ff24` fill, `0 0 14px #a4f4ff90` glow, `mix-blend-mode: difference`. Above links and buttons the fill is `#f6d37c63` and scale `.62`. Coarse pointer and reduced-motion paths leave the grid and static radial wash visible. |
| Home writing and footer | Writing uses `#1e2445`. The later print footer rule uses `radial-gradient(circle, #cbc9e12e 1px,transparent 1.5px) 0 0 / 12px 12px, #181724`. |
| Static 404 background | Cobalt `#2637c7`, with `linear-gradient(#ffffff2e 1px,transparent 1px),linear-gradient(90deg,#ffffff2e 1px,transparent 1px)` at `32px 32px`. |

The featured project surfaces use `#ffd85b` (Fixo Flow), `#cee7a2` (PacketLark), and `#f5aac1` (Framecast Studio). The work masthead uses `#f0d185`. About and Contact use `#cfe7a3`. The Writing index uses `#f5aac1`. Case studies use `var(--signal-lilac)`, legal pages and the article plate use `#dddaf4`, and the client 404 uses `var(--signal-pink)`. The separate Agents at Work entry uses its own [CSS module](../../../src/agents/showcase.module.css), with light `#f5f0e3` paper, `#161735` ink and `#fffaf0` surface, dark `#171834` paper, `#f2f1ff` ink and `#242653` surface. Its yellow hero stays `#ffd85b` with fixed `#201d28` ink.

## Local fonts and attribution

All URLs below are existing assets. The current Home HTML preloads `display-bold.woff2` and `body-regular.woff2`. CSS family names reflect this baseline and the real typeface comes from the bundled license files.

| Typeface (CSS family) | Existing files | Role and declared weight | License |
|---|---|---|---|
| Bricolage Grotesque (`Bricolage`) | [display-bold.woff2](../../../public/assets/build-room/fonts/display-bold.woff2) | Display, mastheads and utility headings, 650–900, `font-display: swap`. Standalone 404 uses one weight declaration and a separate fallback stack. | [SIL OFL 1.1](../../../public/assets/build-room/fonts/OFL-bricolage.txt) |
| Instrument Sans (`Instrument Sans`, `Instrument` in Agents at Work) | [Regular](../../../public/assets/build-room/fonts/body-regular.woff2) and [semibold](../../../public/assets/build-room/fonts/body-semibold.woff2) | Body and UI, 400–500 and 600–800, `swap`. The Agents entry binds the regular file with its own face. | [SIL OFL 1.1](../../../public/assets/build-room/fonts/OFL-instrument.txt) |
| DM Mono (`DM Mono`) | [mono.woff2](../../../public/assets/build-room/fonts/mono.woff2) | Metadata and display labels, 400–600, `swap`. | [SIL OFL 1.1](../../../public/assets/build-room/fonts/OFL-dm-mono.txt) |
| Instrument Serif (`Reader Serif`) | [reader-serif.woff2](../../../public/assets/editorial/fonts/reader-serif.woff2) | Reader heading and contents styling; default weight and `swap`. | [SIL OFL 1.1](../../../public/assets/editorial/fonts/OFL-instrument-serif.txt) |
| Schoolbell (`Schoolbell`) | [handwriting.woff2](../../../public/assets/build-room/fonts/handwriting.woff2) | Short handwritten notes, default weight, `swap`. | [Apache 2.0](../../../public/assets/build-room/fonts/LICENSE-schoolbell.txt) |

The baseline uses Lucide React for interface icons, with authored SVG for the paper edge and registration graphics. The lockfile and [current dependencies](../../../package.json) retain the installed family version.
