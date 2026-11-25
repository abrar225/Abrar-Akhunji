---
title: "Fixo Flow Architecture: Zero-Cloud Desktop Dictation on Apple MLX and CTranslate2"
date: "2026-11-25"
description: "Inside Fixo Flow, built by Abrar Akhunji: PortAudio bounded ring buffers, Apple Silicon MLX versus CTranslate2 CPU inference, crash-safe WAV recovery, noncascading rules, and honest LibriSpeech benchmarks against SpeakType v2 and paid cloud subscriptions."
tags: ["Fixo Flow", "Whisper MLX", "CTranslate2", "Local AI", "Voice Dictation", "Apple Silicon", "Abrar Akhunji", "MIT Open Source"]
author: "Abrar Akhunji"
heroImage: "/images/blog/fixo-flow-local-whisper-mlx-desktop-voice-dictation-architecture/hero.jpg"
techTree:
  branch: "AI Engineering"
  level: 8
  prerequisites: ["mlx-vs-gguf-apple-silicon-m5-architecture", "omniroute-agentic-ai-gateway-rtk-compression"]
faq:
  - question: "Who built Fixo Flow and how is it licensed?"
    answer: "Fixo Flow is built by Abrar Akhunji and released as free, MIT-licensed open-source software with zero accounts, zero API keys, and zero telemetry. Public binaries remain at v0.3.4 while v0.4.0 and v0.5.0 develop local model management, crash recovery, clipboard preservation, and Linux packaging."
  - question: "How accurate is Fixo Flow compared to SpeakType v2 and smaller/larger Whisper checkpoints?"
    answer: "On a pinned 20-speaker OpenSLR LibriSpeech test subset (130.805 seconds, 340 reference words across 3 fresh-process repeats = 1,020 total words), Fixo Base English MLX scored 8.53% normalized WER (3.37% CER) versus 7.06% normalized WER (2.50% CER) for SpeakType v2 Base whisper.cpp. Switching to Fixo Small English MLX dropped WER to 4.71% (16/340 errors) at ~0.246 s median local decode time, while Tiny English MLX scored 10.88% WER at ~0.055 s median decode."
  - question: "What happens if Fixo Flow crashes or insertion fails mid-dictation?"
    answer: "Unlike pure RAM-buffered tools, Fixo Flow streams bounded microphone chunks and persists owned WAV recordings plus SQLite metadata (both raw ASR output and post-processed final text) under ~/.fixoflow/. Uninserted or failed recordings appear in a Recovery Inbox so you can re-run decoding locally without losing long dictations."
  - question: "How does Fixo Flow handle code identifiers without breaking technical terms?"
    answer: "Fixo Flow separates dictation into Automatic, Writing, Coding & AI, and Raw transcript modes. Style transforms only rewrite in Writing mode; Coding & AI and Raw preserve verbatim identifiers cleanly, while dictionary/correction edits run through a single-pass noncascading rewriter rather than chaining replacements into corrupt loops."
---

:::eli5
*Written by Abrar Akhunji*

Most modern voice dictation apps work like a leaky walkie-talkie: you hold a shortcut key, your microphone streams everything you say across the internet to a billing server, and a company charges you $10 to $24 every month just to type your own words back onto your screen.

```
+-----------------------------------------------------------------------------+
|             FIXO FLOW : 100% LOCAL DESKTOP DICTATION ENGINE                 |
+-----------------------------------------------------------------------------+
|                                                                             |
|   [ Mic + PortAudio ] --> [ Bounded Chunks + VAD / WAV Persistence ]        |
|                                        |                                    |
|            +---------------------------+---------------------------+        |
|            |                                                       |        |
|            v                                                       v        |
|   [ Apple Silicon MLX ]                                  [ CPU CTranslate2 ]|
|   Tiny: ~55ms | Small: ~246ms                            Windows / Linux /  |
|   Zero Cloud Calls                                       Intel Mac Path     |
|            |                                                       |        |
|            +---------------------------+---------------------------+        |
|                                        |                                    |
|                                        v                                    |
|   [ Single-Pass Noncascading Dictionary + Coding/Writing Rules ]            |
|                                        |                                    |
|                                        v                                    |
|   [ SQLite (~/.fixoflow/) Raw + Final Pair ] --> [ Focus-Verified Paste ]   |
|                                                                             |
+-----------------------------------------------------------------------------+
```

I built **Fixo Flow** (**Abrar Akhunji**) because developers, writers, and researchers needed desktop voice dictation that never leaves the machine and never demands a monthly rent payment.

Think about the three ways cloud dictation breaks down during real software engineering:

1. **Privacy exposure:** Speaking API tokens, customer names, proprietary roadmaps, or pre-release source code into a third-party speech API ships raw voice audio outside your security perimeter.
2. **Broken developer punctuation:** Consumer dictation apps try to be helpful writers. When you dictate `use_effect` or `git rebase`, aggressive prose polishers turn underscores into spaces or rewrite flags into English sentences.
3. **Lost recordings and lost clipboard contents:** If an app crashes after a 90-second thought dump, or blindly overwrites whatever code snippet you had copied onto your clipboard, your flow is wrecked.

Fixo Flow runs locally inside `~/.fixoflow/`. On Apple Silicon Macs, it dispatches inference directly to **Apple MLX** unified memory (`55 ms` median decode on Tiny English, `246 ms` on Small English). On Windows, Linux X11, and Intel Macs, it routes through **CTranslate2 (`faster-whisper`)** on CPU. Every spoken clip writes its raw recognizer transcript, its formatted final text, and its owned WAV file into a local SQLite database so nothing disappears even if a target window loses focus.
:::

:::interactive chart
{
  "title": "LibriSpeech 20-Speaker Evaluation: Normalized Word Error Rate (Lower Is Better)",
  "description": "Measured on pinned OpenSLR 20-speaker subset (130.805 s, 340 reference words). Base backends ran 3 fresh-process repeats (1,020 total words); Tiny/Small MLX ran single warmed subset passes.",
  "type": "bar",
  "xKey": "model",
  "series": [
    { "name": "Overall Norm WER (%)", "dataKey": "overall" },
    { "name": "Test-Clean WER (%)", "dataKey": "clean" },
    { "name": "Test-Other WER (%)", "dataKey": "other" }
  ],
  "data": [
    { "model": "Fixo Small EN (MLX)", "overall": 4.71, "clean": 2.63, "other": 7.33 },
    { "model": "SpeakType v2 Base (whisper.cpp)", "overall": 7.06, "clean": 4.74, "other": 10.0 },
    { "model": "Fixo Base EN (MLX)", "overall": 8.53, "clean": 5.26, "other": 12.67 },
    { "model": "Fixo Tiny EN (MLX)", "overall": 10.88, "clean": 6.84, "other": 16.0 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

### 1. System Architecture: Bounded Audio Capture to Verified Paste

**Fixo Flow** (`v0.3.4` public release, `v0.4.0` and `v0.5.0` active preview branches) is an MIT-licensed desktop dictation engine engineered by **Abrar Akhunji** (`github.com/abrar225/FixoFlow`, `fixoflow.tech`). Rather than building a thin wrapper around a remote REST transcription endpoint, Fixo Flow treats desktop speech input as a stateful systems pipeline spanning hardware audio buffering, local neural decoding, noncascading text rewriting, durable crash recovery, and OS-level focus verification.

```
[ Global Input Hook ]
  |-- Hold-to-Talk (separate binding, e.g., Ctrl Right)
  |-- Hands-Free Toggle (separate binding, e.g., Middle Click)
  v
[ PortAudio Capture Stream ] ---> Ring-buffered bounded PCM frames (no mic checkup retention)
  |                               + active-owner lock (blocks settings/model race conditions)
  v
[ Local Model Router ]
  |-- Apple Silicon arm64  --> MLX Whisper (Tiny / Base / Small / Multilingual Turbo)
  |-- Win / Linux / Intel  --> CTranslate2 faster-whisper CPU (or ONNX Parakeet v2/v3 on arm64/x64)
  v
[ Post-Processing & Formatting Pipeline ]
  |-- Mode Gate: Writing | Coding & AI | Raw transcript | Automatic (Bundle / Exe Context)
  |-- Style Rules (Writing only): Natural | Concise | Professional | Verbatim
  |-- Single-Pass Noncascading Dictionary + Explicit Approved Exact-Utterance Memory
  v
[ Durable Store (~/.fixoflow/) ]
  |-- SQLite Index (raw_transcript, final_transcript, app_bundle_or_exe, timestamps)
  |-- Owned WAV Audio File (retryable via Recovery Inbox on failed decode or paste)
  v
[ Target-Aware Delivery ]
  |-- Verify active window PID / start-time / bundle ID before injection
  |-- Optional non-destructive clipboard preservation (manual restore confirmation, never blind timer)
```

Notice four deliberate systems invariants in that pipeline:

1. **Separated Trigger State Machine:** Hold-to-talk and hands-free toggle maintain strictly independent key and mouse bindings (`Right Ctrl` versus `Middle Click`, `Fn/Globe`, standalone modifiers, or `Caps Lock` toggle). Users never suffer accidental modal locks when switching rapidly between short inline commands and multi-paragraph dictation.
2. **Mutual Exclusion Over Audio Hardware:** In `v0.4.0` and `v0.5.0`, mic selection, 5-second clipping/no-signal diagnostics, model downloads (`SHA-256` verified before atomic promotion), and live dictation share a single session owner. Settings changes cannot race mid-utterance capture or hijack an active warm model load.
3. **App-Scoped vs Target-Verified Identity:** Learning scope identity (`macOS` bundle identifier, normalized `Windows` or `Linux` executable path) stays cleanly decoupled from temporary paste targets (`PID`, window start-time checks). Legacy raw window arrays can never bleed silently into global rules.
4. **Raw and Final Pair Persistence:** Every finished turn records both the exact acoustic hypothesis (`raw`) and the rule-transformed output (`final`) inside SQLite under `~/.fixoflow/`, paired with an owned WAV file when retention or failure recovery applies.

---

### 2. Dual-Backend Decoding Mathematics and Memory Rules

On desktop hardware without cloud GPUs, latency splits cleanly into **process/runtime initialization**, **mel-spectrogram frontend**, and **encoder-decoder token generation**. Let total end-to-end utterance latency $T_{\text{total}}$ for an audio clip of duration $D$ be modeled as:

$$
T_{\text{total}}(D) = T_{\text{vad\_flush}} + T_{\text{fe}}(D) + T_{\text{enc}}(D) + N_{\text{tok}} \cdot \bar{t}_{\text{dec}} + T_{\text{paste}}
$$

Where $T_{\text{fe}}(D)$ covers 16 kHz resampling and log-Mel extraction, $T_{\text{enc}}(D)$ is the single encoder pass (amortized over unified GPU memory on Apple Silicon via MLX or AVX/NEON SIMD threads in CTranslate2), $N_{\text{tok}}$ is emitted subword length, and $\bar{t}_{\text{dec}}$ is autoregressive step latency. Keeping the recognizer process warm eliminates process boot and weight mmap overhead ($T_{\text{cold}} \approx 0.8\text{ s to }1.2\text{ s}$), leaving raw warm local decode inside MLX (`transcribe_file` excluding fresh Python interpreter boot) at **~55 ms median for Tiny English** and **~246 ms median for Small English** across short conversational utterances.

Accuracy across clean and noisy acoustic tiers is evaluated using standard normalized Word Error Rate ($\text{WER}_{\text{norm}}$) and Character Error Rate ($\text{CER}$):

$$
\text{WER}_{\text{norm}} = \frac{S + D + I}{N_{\text{ref}}}
$$

where substitutions ($S$), deletions ($D$), and insertions ($I$) are computed after case, contraction, and numeric text normalization across $N_{\text{ref}}$ reference tokens.

Crucially, Fixo Flow's post-recognition rule engine forbids **cascading rewrites**. If a custom vocabulary entry maps `foo -> foo_bar` and another rule or correction maps `foo_bar -> baz` (or repeats a substring match), naive sequential `str.replace` loops corrupt multi-token outputs and cause runaway drift in technical identifiers. Fixo Flow tokenizes candidate spans once and applies non-overlapping replacements in a single deterministic sweep:
- **Writing mode** applies punctuation cleanup and the active Writing Style (`Natural`, `Concise`, `Professional`, or `Verbatim`).
- **Coding & AI mode** skips hedge trimming and prose capitalization so snake case identifiers, shell flags, and JSON fragments land untouched.
- **Non-English and Auto multilingual runs** explicitly bypass English formatting rules (`v0.5.0`), preventing English-centric regexes from corrupting foreign tokens such as German `um`.

---

### 3. Production UI, Settings, and Core Use Cases

![Fixo Flow desktop app Style screen showing Writing style presets Natural, Concise, Professional, and Verbatim with live preview diff](/images/blog/fixo-flow-local-whisper-mlx-desktop-voice-dictation-architecture/app-style.jpg)

*Figure 1: Fixo Flow v0.3.4 Style configuration panel showing the four deterministic rewriting presets (Natural, Concise, Professional, Verbatim) and a live transformation diff strip before text hits the cursor.*

![Fixo Flow Settings panel displaying separate Hold to talk and Hands-free bindings alongside Automatic, Coding & AI, Writing, and Raw transcript dictation modes](/images/blog/fixo-flow-local-whisper-mlx-desktop-voice-dictation-architecture/app-settings.jpg)

*Figure 2: Fixo Flow Settings view highlighting independent Hold-to-talk (Right Ctrl) and Hands-free (Middle Click) triggers alongside application-aware Dictation mode selectors.*

Across real desktop workloads, four production use cases extract the highest leverage from Fixo Flow's local design:

1. **IDE & Terminal Prompt Authoring (Coding & AI Mode):**
   Engineers using Cursor, Claude Code, terminal Multiplexers, or VS Code talk through multi-paragraph architectural prompts at 140 to 160 WPM without uploading internal repo symbols or customer context to third-party speech APIs. In `Automatic` mode, Fixo Flow automatically keeps prose rules active in Slack or email clients and switches cleanly to technical preservation inside recognized code editors and terminals.
2. **Regulated / Air-Gapped / NDA Engineering Environments:**
   Healthcare, defense, financial infrastructure, and pre-announcement stealth engineering laptops often restrict cloud dictation SaaS by policy. Fixo Flow's model catalog enforces immutable revisions, exact byte counts, and `SHA-256` verification during explicit download, followed by 100% offline execution.
3. **Long-Form Spec Writing Without Crash Loss:**
   SpeakType v2 keeps captured PCM strictly inside a fixed RAM ring buffer, risking silent loss if insertion or encoding fails. Fixo Flow commits owned WAV audio under `~/.fixoflow/` and surfaces failed insertions in a **Recovery Inbox** (`v0.4.0`), letting users retry transcription against the local file without pasting over unrelated windows.
4. **Multilingual Developer Workflows (`v0.5.0` Preview):**
   Sixteen pinned model variants span English-only (`Tiny`, `Base`, `Small`) and multilingual `Tiny`/`Base`/`Small`/`Turbo` across MLX and CPU plus **Parakeet v2/v3 ONNX** (supporting 25 auto-detected languages without falsely pretending the engine can force a single target language).

---

### 4. Executed Benchmarks and Evidence Caveats

Fixo Flow publishes fully reproducible benchmark evidence in `docs/23-benchmark-evidence.md` rather than selective marketing latency claims. Evaluations span both a baseline 11-second JFK clip (`whisper.cpp 1.9.5` proxy comparison) and a deterministic **20-speaker OpenSLR LibriSpeech test subset** (`130.805` seconds total, `10` `test-clean` + `10` `test-other` clips, `340` reference words, dataset commit pinned at `71cacbfb7e2354c4226d01e70d77d5fca3d04ba1`).

| Engine / Checkpoint | Total Norm WER (%) | Clean WER (%) | Other WER (%) | CER (%) | P50 Decode Time | Measurement Scope & Condition |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Fixo Small EN (MLX)** | **4.71%** (16/340) | **2.63%** | **7.33%** | N/R | ~0.246 s | Warmed single pass over 340 words |
| **SpeakType v2 Base (whisper.cpp)** | 7.06% (72/1,020) | 4.74% | 10.00% | 2.50% | **0.556 s** | 3 fresh-process repeats (p95 0.564 s) |
| **Fixo Base EN (MLX)** | 8.53% (87/1,020) | 5.26% | 12.67% | 3.37% | 0.970 s | 3 fresh-process repeats (p95 1.055 s) |
| **Fixo Tiny EN (MLX)** | 10.88% (37/340) | 6.84% | 16.00% | N/R | **~0.055 s** | Warmed single pass over 340 words |
| **Fixo Base MLX (JFK 11s)** | 0.00% | N/A | N/A | 0.00% | 0.946 s / 0.102 s | Fresh wall `0.946 s` vs warm `0.102 s` |

Look closely at the intellectual honesty built into that benchmark matrix:
- **Process Startup vs Warm Runtime:** In fresh-process CLI repeats (each spawning a new Python runtime for MLX vs a compiled native Rust/C binary for SpeakType v2), SpeakType v2 Base held lower wall-clock latency (`0.556 s` vs `0.970 s` p50) and slightly better Base checkpoint accuracy (`7.06%` vs `8.53%`, speaker-cluster bootstrap 95% CI `-3.30` to `-0.29` percentage points on read LibriSpeech audio). Inside an already running desktop daemon (`transcribe_file`), Fixo Base MLX completes JFK in `0.102 s` median (`102 ms`).
- **Model Tier Leap:** Because Fixo Flow supports one-click local checkpoint upgrades cleanly, stepping up to **Fixo Small English MLX** reverses the accuracy comparison (`4.71%` vs `7.06%` SpeakType Base, bootstrap CI `+0.59` to `+4.66` points favoring Fixo Small) while maintaining sub-250 ms median warm decode on Apple Silicon.
- **What Is Not Claimed:** Read English audiobooks do not benchmark everyday conversational prosody, specialized codebases, Indian/Hinglish accents, noisy mechanical keyboards, or full stop-to-cursor paste injection latency across real desktop compositors. Those remain documented limits until automated physical audio loop rigs complete.

---

### 5. Comparison Against Competing Paid and Local Tools

Choosing a desktop dictation tool means weighing monthly subscription rent, offline privacy, cross-platform coverage, and crash/clipboard safety.

| Capability | Fixo Flow (Abrar Akhunji) | Wispr Flow | Superwhisper | Aqua Voice | SpeakType v2 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **License & Pricing** | **$0 MIT Open Source** | Free 2k words/wk; **$12 to $15/mo** Pro | Free local; **$7.08 to $8.49/mo** Pro or **$249.99 lifetime** | 1k-2k lifetime trial; **$10 to $12/mo** Pro | Free / Open Source |
| **Inference Location** | **100% Local** (MLX + CPU CTranslate2 + Parakeet ONNX) | Cloud-only (requires active internet) | Local Whisper (Free) + Cloud LLM modes (Pro) | Cloud-focused proprietary Avalon model | Local `whisper.cpp` (Rust/C) |
| **Platform Targets** | macOS (`arm64` + Intel WIP), Windows x64, Linux X11 | macOS, Windows, iOS | macOS, Windows, iOS, Android | macOS, Windows | macOS, Linux, Windows |
| **Audio Recovery** | **Disk WAV + SQLite (`~/.fixoflow/`) + Recovery Inbox** | Cloud history sync (account required) | Local recording history | Cloud transcript history | Pure RAM ring buffer (lost on crash) |
| **Dictionary Logic** | **Single-pass noncascading + app-scoped opt-in review** | Cloud personalization & LLM rewrite | Vocabulary list + custom LLM prompt modes | Context-aware cloud technical rewrite | Fixed replacement rules (cascading risk) |
| **Clipboard Safety** | **Manual restore confirm (`v0.5.0`); never races blind timer** | Automatic restore / paste fallback | Clipboard restore options | Clipboard paste injection | Fixed-delay auto-restore race risk |
| **Current Trade-off** | Unsigned installers (`v0.3.4`/`v0.5`); X11 only on Linux; no iOS app | Recurring cost + no offline air-gapped mode | LLM polish modes cost monthly or $249.99 lifetime | Recurring subscription + minimal offline tolerance | Simpler UI + no persistent crash WAV inbox |

Where do paid tools still lead cleanly today? **Wispr Flow** and **Aqua Voice** run context-aware cloud LLM rewrites that capture screen text or resolve nuanced phrasing better than zero-cloud small Whisper models, and both ship fully notarized/signed commercial installers plus mobile companion apps (`Wispr Flow` iOS, `Superwhisper` iOS/Android). Fixo Flow intentionally refuses that cloud dependency: it trades server-side LLM fluff for $0 ownership, offline security, crash-proof WAV recovery, and verifiable local execution.

---

### 6. Engineering Limitations and Rules of Thumb

If you deploy Fixo Flow today or evaluate local speech architectures, apply four concrete operational rules:

1. **Match Your Hardware to Checkpoint Size:** Use **Tiny EN MLX** (`~55 ms` warm decode) when typing quick shell commands and short prompts, **Base EN** when balanced CPU compatibility matters on non-Apple hardware, and **Small EN MLX** (`4.71%` normalized WER, `~246 ms` warm decode) whenever multi-sentence accuracy outweighs a 200 ms budget difference.
2. **Treat Signed Notarization and Wayland Explicitly:** Until public publisher signing lands beyond the `v0.5.0` preview CI pipeline (374 local regression tests passing, 4 skips, plus AppImage/DEB/DMG/Windows artifacts verified in `08fccb0`), expect macOS Gatekeeper / Windows SmartScreen warnings on first launch and stick to X11 sessions rather than native Wayland for global hotkeys and paste on Linux.
3. **Never Trust Fixed-Delay Clipboard Timers:** Sending synthetic `Cmd+V` / `Ctrl+V` keys does not guarantee the target Electron or terminal app read the clipboard before a timer expires. Keep manual clipboard baseline recovery or wait for explicit app paste consumption before clobbering user buffers.
4. **Separate ASR Ground Truth from Formatting Rules:** Always store `raw` and `final` strings independently in local SQLite (`~/.fixoflow/`). When a custom rule misfires on a technical identifier, having unmutated raw acoustic text lets users toggle or refine rules offline without losing what they actually spoke.
:::

---

### Sources
- Project Repository & Documentation: [FixoFlow GitHub Repository (Abrar Akhunji)](https://github.com/abrar225/FixoFlow)
- Product Website: [Fixo Flow Official Site](https://fixoflow.tech)
- Recognition Benchmarks: [Fixo Flow docs/23-benchmark-evidence.md](https://github.com/abrar225/FixoFlow/blob/main/docs/23-benchmark-evidence.md)
- Comparative Engineering Audit: [Fixo Flow docs/19-speaktype-comparison.md](https://github.com/abrar225/FixoFlow/blob/main/docs/19-speaktype-comparison.md) and [docs/27-current-comparative-assessment.md](https://github.com/abrar225/FixoFlow/blob/main/docs/27-current-comparative-assessment.md)
- Parakeet, Multilingual & Clipboard Parity Architecture: [Fixo Flow docs/28-parity-implementation.md](https://github.com/abrar225/FixoFlow/blob/main/docs/28-parity-implementation.md)
- Competitor Reference Pricing: [Wispr Flow](https://wisprflow.ai), [Superwhisper](https://superwhisper.com), [Aqua Voice](https://aquavoice.com)
