---
title: "FrameCast Studio Architecture: Native macOS Dual-Canvas Compositing, 32-Bit Float Mixing, and Crash-Safe fMP4 Recording"
date: "2026-11-25"
description: "An architectural breakdown of FrameCast Studio, built by Abrar Akhunji: simultaneous 16:9 and 9:16 native macOS composition on ScreenCaptureKit and VideoToolbox, 48 kHz Float32 audio with zero-latency limiting, crash-resistant moof/mdat fragments, and measured 4K HW encoder fidelity."
tags: ["FrameCast Studio", "macOS", "Swift", "ScreenCaptureKit", "VideoToolbox", "AVFoundation", "Dual Canvas", "Abrar Akhunji"]
author: "Abrar Akhunji"
heroImage: "/images/blog/framecast-studio-native-macos-dual-canvas-broadcast-architecture/hero.jpg"
techTree:
  branch: "Native Software"
  level: 8
  prerequisites: ["mlx-vs-gguf-apple-silicon-m5-architecture", "nvidia-openshell-kernel-sandbox-landlock-seccomp-agent-runtime"]
faq:
  - question: "Who built FrameCast Studio and is the source or installer publicly downloadable yet?"
    answer: "FrameCast Studio is built by Abrar Akhunji natively in Swift, SwiftUI, AppKit, ScreenCaptureKit, AVFoundation, Core Image, and VideoToolbox for macOS 14.2+. It is currently an active local studio build in development with no public GitHub source repository or public binary installer distributed yet."
  - question: "Why build dual 16:9 horizontal and 9:16 vertical canvases inside a single ScreenCaptureKit session?"
    answer: "Creators shooting tutorials, demos, or livestreams often publish widescreen YouTube videos alongside vertical Shorts or Reels. Running two independent output branches from one shared screen/camera capture lets both formats keep separate scene layouts, frame rates, and bitrate targets without duplicating display capture overhead or post-production cropping."
  - question: "How does FrameCast Studio protect long recordings against sudden crashes or power loss?"
    answer: "Instead of deferring the moov atom until recording stops, FrameCast Studio configures AVAssetWriter to emit fragmented MP4 and MOV containers with a 1-second initial movie fragment followed by 10-second moof/mdat fragments. Automated tests forcibly interrupt recording helpers and verify partial files still decode cleanly with H.264/HEVC video and AAC audio."
  - question: "How does FrameCast Studio compare to OBS Studio, Screen Studio, and Ecamm Live?"
    answer: "FrameCast Studio targets native Apple Silicon efficiency ($0 local workflow in development vs Screen Studio at $29/mo or $108/yr and Ecamm Live starting around $16/mo) while baking dual horizontal+vertical canvases natively without OBS's plugin complexity (such as Aitum Vertical) or Qt cross-platform UI overhead."
---

:::eli5
*Written by Abrar Akhunji*

Creators on Mac face an annoying recording tax. If you shoot a coding walkthrough in 16:9 widescreen for YouTube, posting the clip cleanly to Reels, Shorts, or TikTok forces you either to crop awkwardly in an editor later, run a heavy plugin stack inside cross-platform broadcasting tools, or pay ongoing SaaS subscriptions for screen studios that lock you into a single aspect ratio.

```
+-----------------------------------------------------------------------------+
|            FRAMECAST STUDIO : ONE MAC CAPTURE, TWO LIVE OUTPUTS             |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [ ScreenCaptureKit Display / App ]      [ v2.0 32-Bit Float Audio Mixer ]  |
|    Up to 4K / 60 fps + BT.709              48 kHz + Soft Limiter (-0dBFS)   |
|                  |                                        |                 |
|                  +-------------------+--------------------+                 |
|                                      |                                      |
|                                      v                                      |
|               [ Dual-Canvas Scene Compositor (macOS 14.2+) ]                |
|             (Independent Layouts, Snap Geometry, Linked Option)             |
|                     |                                  |                    |
|                     v                                  v                    |
|     [ 16:9 Horizontal Canvas ]           [ 9:16 Vertical Canvas ]           |
|     1920x1080 or 3840x2160               1080x1920 or 2160x3840             |
|                     |                                  |                    |
|                     +----------------+-----------------+                    |
|                                      |                                      |
|         +----------------------------+----------------------------+         |
|         |                                                         |         |
|         v                                                         v         |
|   [ VideoToolbox fMP4 / MOV ]                        [ FFmpeg RTMP Pipes ]  |
|   1s Init + 10s Fragments                            YouTube / Twitch / Kick|
|                                                                             |
+-----------------------------------------------------------------------------+
```

I built **FrameCast Studio** (**Abrar Akhunji**) as a native macOS 14.2+ studio designed in pure Swift, SwiftUI, AppKit, ScreenCaptureKit, Core Image, AVFoundation, and VideoToolbox.

Instead of wrapping a browser tab around desktop APIs, FrameCast Studio splits one synchronized hardware capture stream directly inside macOS memory into two first-class canvases side by side: a **Horizontal 16:9 stage** and an **independent Vertical 9:16 stage**. You can link their layouts when mirroring scenes quickly, or decouple them so the landscape canvas places your camera neatly over code while the vertical canvas stacks screen above face cam cleanly.

Two engineering choices define how the recorder behaves under stress. First, the `v2.0` **32-bit float audio mixer** inserts a zero-latency soft limiter before quantization, so sudden microphone spikes saturate smoothly instead of harsh digital clipping. Second, disk writes flush as **fragmented MP4 / MOV** (`1-second` opening fragment, `10-second` steady fragments): even if your MacBook loses battery 40 minutes into a recording, everything already flushed to disk opens and plays cleanly.
:::

:::interactive chart
{
  "title": "FrameCast Studio Hardware Encoder Fidelity: Target vs Measured FPS (Native MediaQualityTests)",
  "description": "Executed on native macOS VideoToolbox hardware encoders across 4K H.264, 4K Vertical HEVC, 4K60 HEVC, and 360p H.264 profiles with 4-pixel test charts.",
  "type": "bar",
  "xKey": "profile",
  "series": [
    { "name": "Target Frame Rate (fps)", "dataKey": "targetFps" },
    { "name": "Measured Encoded FPS", "dataKey": "measuredFps" }
  ],
  "data": [
    { "profile": "4K H.264 MP4 (3840x2160)", "targetFps": 30, "measuredFps": 28.2 },
    { "profile": "4K Vert HEVC MOV (2160x3840)", "targetFps": 30, "measuredFps": 30.0 },
    { "profile": "4K60 HEVC MP4 (3840x2160)", "targetFps": 60, "measuredFps": 58.1 },
    { "profile": "SD H.264 MOV (640x360)", "targetFps": 24, "measuredFps": 24.0 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

### 1. Native Dual-Canvas Compositing Pipeline

**FrameCast Studio** (built by **Abrar Akhunji**) is a native Apple desktop studio targeting **macOS 14.2+** (`arm64` / `x86_64`) written across 39 Swift source files under `VidystStudio` with a single vendored UI dependency (`CompactSlider 2.1.0`) and optional external Homebrew `ffmpeg` (`/opt/homebrew/bin/ffmpeg`) strictly isolated to RTMP ingest transport. Consistent with the project's active development status, FrameCast Studio currently remains an unreleased local macOS codebase with no public source repository or downloadable installer published yet.

Why reject Electron or cross-platform Qt wrappers in favor of AppKit, SwiftUI, Core Image, ScreenCaptureKit, AVFoundation, and VideoToolbox? Because simultaneous **4K landscape (16:9)** and **4K/1080p vertical (9:16)** composition plus live H.264/HEVC hardware encoding + real-time 48 kHz Float32 audio mixing leaves minimal frame-time slack at `60 fps` ($16.67\text{ ms}$ frame deadline). Moving textures natively through Core Image (`CIContext` / `CGContext`) and hardware VideoToolbox pixel buffers avoids extra CPU readbacks and color-space roundtrips.

```
ScreenCaptureKit (Display / Window) + AVCaptureSession (Camera)
  |  (Coalesced replacement lifecycle: old capture survives until candidate succeeds)
  v
FrameCast CaptureDelivery + MediaCompositor (Core Image)
  |-- Horizontal Output Config (width, height, fps, codec, bitrate, container, layout)
  |-- Vertical Output Config   (width, height, fps, codec, bitrate, container, layout)
  |   Independent FPS & Bitrate + Normalized Geometry [0..1] + Undo/Redo Snap
  v
AVAssetWriter (Hardware H.264 / HEVC, Explicit ITU-R BT.709 Primaries)
  |-- movieFragmentInterval = 1.0s initial fragment --> 10.0s steady moof/mdat fragments
  '-- RecordingLibrary Scanner (.mp4 / .mov persisted outputs)
  |
  v
StreamPipe + Multi-Destination Coordinator (via /opt/homebrew/bin/ffmpeg FLV/RTMP)
  |-- YouTube Live API v3 (Loopback OAuth + macOS Keychain + Live Chat polling/dedup)
  |-- Twitch / Kick / Custom RTMP (Horizontal & Vertical endpoints simultaneously)
  '-- Local Loopback Remote Deck Server (HTTP/WebSocket control surface)
```

Notice two subtle media engineering guarantees built into `CaptureLifecycleTests` and `CanvasInteractionTests`:
- **Coalesced Capture Replacement:** When a presenter switches captured windows mid-stream, rapid changes coalesce and keep the previous `ScreenCaptureKit` session alive until the replacement session initializes without error. Failed candidate starts cleanly roll back without freezing live viewers or corrupting active disk recordings.
- **Explicit ITU-R BT.709 Color Tagging:** Core Image renders and `AVAssetWriter` encoding settings explicitly write `CMFormatDescription` color primaries, transfer characteristics, and YCbCr matrices (`BT.709`), preventing macOS QuickTime and browser video tags from applying washed-out gamma shifts between capture and playback.

---

### 2. 32-Bit Float Audio Mixing, Soft Limiting, and Timeline Continuity

Most screen recorders stumble over two audio bugs: harsh `Int16` overflow clipping when microphone gain meets hot system alerts, and subtle A/V drift when screen video pauses or drops duplicate frames on static screens.

FrameCast Studio routes both microphone packets (`44.1 kHz` / `48 kHz`, mono or stereo) and `ScreenCaptureKit` planar `Float32` system audio streams (explicitly excluding FrameCast's own process audio to prevent echo feedback) through `AudioTimelineMixer` normalized to **48 kHz stereo**.

1. **Sample-Clock Resampling & Duplicate Isolation:** Incoming packets index strictly by host-time sample offset (`AudioTimelineMixer.frame(at:)`). Late packets are counted (`lateFrames`), stale buffer reuse is replaced cleanly with true silence, and overlapping duplicate timestamps overwrite deterministically rather than summing gain accidentally.
2. **Pause-Gap Timeline Mapping:** `RecordingAudioClock` tracks open and closed pause intervals in sample ticks, splitting delayed trailing PCM packets at exact pause boundaries so resumed segments maintain a contiguous sample clock (`[0, 100, 300]` across arbitrary pauses) with zero leaking audio during paused stretches.
3. **v2.0 Float32 Soft-Knee Limiter (`AudioLimiter.limit`):**
   Up through $75\%$ full scale ($|x| \le 0.75$ verified linearly in `AudioMixerTests`), signals remain completely bit-transparent ($f(x) = x$). Hot transients above threshold compress smoothly via a asymptotic saturator rather than hard-wrapping `Int16` at $\pm 32767$:
   
   ```text
   AudioLimiter.limit(0.50)  ==  0.50   (exact linear passthrough)
   AudioLimiter.limit(-0.75) == -0.75   (exact linear passthrough)
   AudioLimiter.limit(2.00)   <  AudioLimiter.limit(3.00)  <  1.25  (smooth monotonic compression)
   ```

To keep SwiftUI previews responsive without overwhelming the main actor during heavy mixing, `AudioSignalMonitor` throttles level publications strictly: in automated testing (`AudioSignalMonitorTests`), **240 rapid incoming sample updates condense down to 10 bounded UI meter publications** while raw capture threads never touch UI state directly.

---

### 3. Crash-Safe Fragmented MP4/MOV and Sparse-Clock RTMP Piping

Traditional `.mp4` writers store sample index tables (`moov` metadata atom) only when a recording closes cleanly. A sudden kernel panic, battery shutdown, or user force-quit renders an hour-long file unreadable.

FrameCast Studio solves this inside `RecordingOutput.swift` with a two-stage fragment policy verified directly by `RecordingInterruptionTest.swift` and `scripts/validate-quality.sh`:

$$
\Delta t_{\text{frag}}(k) = \begin{cases} 1.0\text{ s}, & k = 0 \text{ (initial moov + first moof/mdat flush)} \\ 10.0\text{ s}, & k \ge 1 \text{ (steady-state incremental fragments)} \end{cases}
$$

When `validate-quality.sh` intentionally kills an active helper process (`SIGKILL`/interruption simulation) mid-write after ~1 second across both **H.264 `.mp4`** and **HEVC `.mov`**, external `ffprobe` and `ffmpeg` verification confirm both truncated files already carry valid `h264`/`hevc` + `aac` streams (`>= 0.9 s` duration) and decode clean `640x360` RGB24 frames without repair tools.

For live broadcasting (`StreamPipe.swift` + `MediaCompositor`), `StreamSelfTest.swift` exercises sparse video submission against a real `/opt/homebrew/bin/ffmpeg` `.flv` muxer:
- Emits verified `H.264` + `48 kHz stereo AAC` tracks cleanly.
- Holds elapsed presentation timestamps (`pts_time > 2.8 s`) when video frames arrive sparsely on static editor windows, preserving true audio/video sync rather than compressing the video timeline forward.
- Supports dynamic canvas composition swaps verified frame-by-frame via raw pixel sampling (`0.4 s`, `1.5 s`, `2.6 s` RGB channel checks).

---

### 4. Dual-Canvas Workspace UI and Core Creator Use Cases

![FrameCast Studio macOS dark UI showing synchronized Horizontal 1920x1080 and Vertical 1080x1920 canvases, preset scene strip, Link layouts toggle, and live Chat sidebar](/images/blog/framecast-studio-native-macos-dual-canvas-broadcast-architecture/framecast-studio.png)

*Figure 1: FrameCast Studio workspace running both Horizontal (1,920x1,080) and Vertical (1,080x1,920) canvases side by side from a single screen share, with built-in Scene strip controls (`Screen + tile`), `Link layouts` toggle, and right-hand YouTube Live chat overlay drawer.*

![FrameCast Studio Audio inspector sidebar showing real-time -29 dBFS Microphone input meter, 108% CompactSlider gain control, Screen / app audio echo-excluded toggle, and Output mix status](/images/blog/framecast-studio-native-macos-dual-canvas-broadcast-architecture/framecast-audio.png)

*Figure 2: FrameCast Studio Audio mixer drawer with `-29 dBFS` live input monitoring, `108%` Microphone gain slider (`CompactSlider`), isolated Screen / app audio toggle (excluding FrameCast's own audio), and `Screen + cam` active scene layout.*

Four real-world macOS workflows explain why a dual-canvas native studio beats stitching general tools together:

1. **Dual-Format Product Launches and Coding Walkthroughs:**
   Record one live tutorial in `Horizontal + Vertical` mode (`1920x1080` + `1080x1920` or `4K`) using distinct canvas compositions: full IDE screen + bottom-right webcam tile on landscape, stacked code viewport + face cam below on vertical. Both finished `.mp4`/`.mov` files land in Recording Library ready to publish immediately with zero After Effects reframing.
2. **Simultaneous Widescreen & Vertical RTMP Livestreams:**
   Feed Twitch or YouTube Landscape (16:9) and Kick/Vertical Shorts/Reels RTMP targets at independent frame rates and bitrates out of one compositor pass, authenticated cleanly via **macOS Keychain-stored Google YouTube Data API v3 Desktop OAuth** (`GoogleYouTube.swift` / `YouTubeLiveAPI.swift`) with deduplicated chat ingestion and pinned local message overlays.
3. **Talk Tracks With Built-in Teleprompter & Remote Deck:**
   `PrompterView.swift` keeps scrolling cue notes inside the operator workspace (never captured by shared window selections), while `RemoteServer.swift` binds locally on loopback so another screen, browser, or iPad on the desk can toggle scenes, mute mics, or start/stop recording.
4. **Element Styling & Interactive Layout Editing:**
   Every scene starts from 9 curated presets (`Just me`, `Framed`, `Screen + cam`, `Screen + tile`, `Side by side`, and inverted variants) plus full custom `+ New layout` editing (`CanvasEditor.swift` with snap lines, Option-drag free bypass, lock toggles, aspect preservation, and multi-step Undo/Redo).

---

### 5. Verified Swift Test Suite and Hardware Encoder Measurements

Rather than relying on synthetic mock assertions, `Tests/` runs real `CoreMedia`, `AVFoundation`, `VideoToolbox`, and loopback HTTP tests via Swift Testing (`swift test`). Executing the full suite locally passed **14 tests across 11 suites in `7.961 seconds`** with zero skips:

| Test Suite / Case | Measured Metrics & Verified Behavior |
| :--- | :--- |
| **`MediaQualityTests` (`3840x2160` H.264 `.mp4`, 30 fps VBR)** | Measured **`28.2 fps`**, `48 kHz stereo AAC`, **`BT.709` primaries**, decoded 4-pixel chart error **`0.0`** |
| **`MediaQualityTests` (`2160x3840` Vertical HEVC `.mov`, 30 fps CBR)** | Measured **`30.0 fps`**, `48 kHz stereo AAC`, **`BT.709` primaries**, decoded 4-pixel chart error **`0.002328`** |
| **`MediaQualityTests` (`3840x2160` HEVC `.mp4`, 60 fps VBR)** | Measured **`58.14 fps`**, `48 kHz stereo AAC`, **`BT.709` primaries**, decoded 4-pixel chart error **`0.0`** |
| **`MediaQualityTests` (`640x360` H.264 `.mov`, 24 fps VBR)** | Measured **`24.0 fps`**, `48 kHz stereo AAC`, **`BT.709` primaries**, decoded 4-pixel chart error **`0.000789`** |
| **`AudioMixerTests` & `AudioSignalMonitorTests`** | Exact mono-to-stereo downmix, Float32 planar unpack, soft limiter curve, pause clock splits, **`240 -> 10` UI meter throttling** |
| **`CaptureLifecycleTests` & `CaptureDeliveryTests`** | Coalesced capture swaps keep prior live capture alive until candidate succeeds; stale callback isolation verified |
| **`OfflineGoogleTests` & `YouTubeProtocolTests`** | Real IPv4 loopback OAuth callback, cancellation, deduplicated live chat cursors, secret-redacted error logging (fixture transport) |

Note the 4-pixel high-frequency resolution test in `MediaQualityTests.swift` lines 16 to 95: encoding alternating 4-pixel white-and-black stripes across 3840 pixels horizontally guarantees the pipeline never silently scales down to a 720p/1080p preview buffer and stretches back up to 4K (`error = 0.0` for both `4K H.264` and `4K60 HEVC`).

---

### 6. Comparison Against OBS Studio, Screen Studio, Ecamm Live, and Riverside

| Capability | FrameCast Studio (Abrar Akhunji) | OBS Studio + Aitum Plugin | Screen Studio | Ecamm Live | Riverside.fm |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Platform** | Native macOS 14.2+ (`Swift`/`AppKit`) | macOS, Windows, Linux (Qt C++) | macOS only | macOS only | Browser / Cloud SaaS |
| **Pricing Model** | Local native build in development ($0 cloud fees) | Free open source (GPLv2) | **$29/mo** or **$108/yr** (lifetime retired) | Starts around **$16/mo** (**Dual Mode** requires Pro tier) | Free 2h 720p; **$24/mo** Pro / **$34/mo** Grow |
| **Native Dual 16:9 + 9:16** | **Built-in side-by-side dual canvases** | Single canvas (needs Aitum Vertical plugin or 2nd instance) | Single canvas focused on post-recording zoom edits | Pro **Dual Mode** supports dual layouts | Cloud Magic Clips post-processing |
| **Encoding & Crash Recovery** | **VideoToolbox H.264/HEVC + fMP4 (`1s` + `10s` `moof/mdat`)** | Software x264 / VideoToolbox; MKV/fMP4 remux | Single-pass screen capture + post-render pipeline | Native VideoToolbox macOS pipeline | Browser progressive upload + local tracks |
| **RTMP Multi-Streaming** | Built-in via isolated `/opt/homebrew/bin/ffmpeg` pipe | Multi-RTMP plugin required | Not designed for live RTMP broadcast | Built-in multi-destination streaming | Cloud multistream on paid tiers |
| **Distribution Status** | **Unreleased local macOS build (no public repo/installer)** | Publicly released GA installers | Public SaaS / macOS app | Public SaaS / macOS app | Public SaaS / web app |

The honest trade-off is scope versus maturity. **Screen Studio** still leads effortlessly at automated post-recording mouse-follow zooms and polished SaaS onboarding for product launches, while **OBS Studio** owns an enormous third-party plugin ecosystem across Windows and Linux, and **Ecamm Live** has years of mature multi-guest macOS production tooling. FrameCast Studio focuses cleanly on eliminating plugin fragility and recurring SaaS costs for solo macOS creators who want dual 16:9 + 9:16 composition, Float32 audio safety, and crash-proof local hardware recording in one lightweight native binary.

---

### 7. Engineering Rules of Thumb for macOS Media Pipelines

1. **Always Separate Canvas Composition from Capture Frequency:** Let `ScreenCaptureKit` push frame changes asynchronously while each output (`Horizontal` and `Vertical`) runs its own frame budget (`30 fps` vs `60 fps`), resolution, and bitrate without locking the UI preview.
2. **Enforce Fragmented Containers (`moof`/`mdat`) by Default:** Never rely on clean user exit to write the final `.mp4` index table. A `1 s` initial fragment followed by `10 s` fragments costs negligible disk overhead while eliminating ruined 45-minute recordings.
3. **Never Run Hard `Int16` Truncation Without a Pre-Quantization Float Limiter:** Recording at 48 kHz Float32 with a continuous soft limiter guarantees mic/system spikes compress cleanly above `0.75` amplitude rather than crackling when two tracks collide.
4. **Quarantine FFmpeg Behind a Clean Pipe Instead of Linking GPL Binaries Inside Swift App Targets:** Keeping RTMP transport cleanly decoupled over `/opt/homebrew/bin/ffmpeg` keeps local Swift VideoToolbox recording free of external codec dependencies until live multi-streaming actually starts.
:::

---

### Sources
- Project Status Note: FrameCast Studio source remains in active private/local macOS development by Abrar Akhunji (no public repository or binary download published yet, matching portfolio policy).
- Apple Core Media & Capture Documentation: [Apple ScreenCaptureKit Documentation](https://developer.apple.com/documentation/screencapturekit)
- Apple Hardware Video Encoding Reference: [Apple VideoToolbox Framework](https://developer.apple.com/documentation/videotoolbox)
- Third-Party UI Component Dependency: [CompactSlider SwiftUI Package (UPSTREAM v2.1.0)](https://github.com/buh/CompactSlider)
- Competitor Reference Pricing & Capabilities: [OBS Studio](https://obsproject.com), [Aitum Vertical Plugin](https://github.com/Aitum/aitum-vertical), [Screen Studio](https://www.screen.studio), [Ecamm Live](https://www.ecamm.com/ecammlive/), [Riverside.fm](https://riverside.fm)
