# Signal Field route inventory

Baseline: `abb86caf65f3b06c4a9c369759b2519c42cedde9`, tagged `v5-signal-field-before-rebuild`. This is a source inventory. Browser capture results belong in [CRITIQUE.md](CRITIQUE.md) and the linked evidence. Canonicals use trailing slashes. The 101 indexable HTML paths comprise nine fixed destinations, ten project case studies, and 82 articles. Production generates a separate HTML resource for each.

## Fixed HTML destinations

| Canonical | Runtime and entry | States, deep links and checks |
|---|---|---|
| `/` | [Home](../../src/pages/Home.jsx) inside [App](../../src/App.jsx). The production initial HTML comes from [renderBuildHome](../../scripts/project-pages.mjs). | Hash targets `#home`, `#work`, `#engineering`, `#about-me`, `#experience`, `#writing`, `#contact`, `#services`, and shared footer `#playground`. The skip target is `#route-content`; `#main-content` also exists. `?project=fixo-flow`, `packetlark` and `framecast-studio` select Home evidence and preserve the hash. Missing or unknown selection defaults to Fixo Flow. The static fallback additionally has `#activity`. |
| `/work/` | [Work](../../src/pages/Work.jsx); static project shelf from [project-pages.mjs](../../scripts/project-pages.mjs). | `?category=` is case-sensitive after URL decoding. Values: `Featured`, `LOCAL AI`, `DEVELOPER TOOLS`, `NATIVE SOFTWARE`, `AI DEVTOOL`, `FULL STACK`, `COMPUTER VISION`, `AI/ML`, `HEALTHCARE AI`, `ANDROID`. All deletes the parameter and unknown values default to All. The featured gallery is mounted only when more than one visible project is featured. Check filters, status count, gallery buttons, touch drag, and case-study navigation. |
| `/blog/` | [BlogList](../../src/pages/BlogList.jsx); static article index from [generate-seo.mjs](../../scripts/generate-seo.mjs). | Writing index and article search. `?q=` matches all query words across title, description and tags. `?tag=` can combine with it. `/` focuses search outside editable controls and Escape first clears the query, then blurs. List and Tech Tree are local view state. Check no-results reset in list view and the Tech Tree empty view. |
| `/about/` | [About](../../src/pages/About.jsx); generated static profile. | `#experience` and external résumé/credentials. Check experience, education, qualifications, and contact links. |
| `/hire/` | [Hire](../../src/pages/Hire.jsx); generated static services and FAQ. | Services, locations, engagement process, FAQ disclosures and enquiry mailto with subject. The page has heading anchors `#services-heading`, `#locations-heading`, `#process-heading`, `#engagements-heading`, `#faq-heading`. |
| `/contact/` | [Contact](../../src/pages/Contact.jsx); generated static contact information. | Mailto, clipboard success/failure announcement, external social profiles and Hire link. No form submission or contact API in this implementation. |
| `/agents-at-work/` | Retired from V5. The root hosting rule returns HTTP 410. | The [V4 showcase](/versions/zero-to-built/agents-at-work/) keeps its project links and gains the archive’s version selector. |
| `/privacy/` | [Privacy](../../src/pages/Privacy.jsx); generated static policy. | Policy copy, contact and cross-links. |
| `/terms/` | [Terms](../../src/pages/Terms.jsx); generated static terms. | Policy copy and discovery/contact links. |

There is no dedicated `/search/`, `/resume/`, `/résumé/`, or `/writing/` route. Search lives at `/blog/?q=…`; Writing points to `/blog/`. Résumé links use the existing public [Drive document](https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing) defined in [projects.js](../../src/lib/projects.js). A local résumé route would change the URL contract and needs an explicit decision under the brief.

## Error, loading and overlay coverage

| Surface | Entry / source | Checks |
|---|---|---|
| Client catch-all and unknown case/article | [NotFound](../../src/pages/NotFound.jsx) through router wildcard or unresolved slug in CaseStudy / BlogPost. Example paths `/v5-missing/`, `/work/v5-missing/`, `/blog/v5-missing/`. | V5 error content and standard chrome on client navigation and Vite fallback. Check robots, recovery targets and focus. |
| Direct Hostinger 404 | [404.html](../../public/404.html) via [ErrorDocument](../../public/.htaccess). | Both a direct `/404.html` fetch and a missing URL on Hostinger matter. Direct file and client routes in Vite preview cannot establish the actual Hostinger status code. |
| Route loading and recovery | [App](../../src/App.jsx) lazy page import with `.signal-loading` status, shared [ErrorBoundary](../../src/components/ErrorBoundary.jsx). | Check constrained navigation, chunk error, reload, and home recovery. No standalone loading URL. |
| Reader loading, fetch error and content tools | [BlogPost](../../src/pages/BlogPost.jsx), [BlogPostActions](../../src/components/blog/BlogPostActions.jsx), [InteractiveBlock](../../src/components/blog/InteractiveBlock.jsx). | Skeleton while the selected Markdown chunk loads, retry on load failure, widget fallback, bookmark, copy, share, narration, sources and in-article contents. See article query and anchor contract below. |
| Site menu | [Chrome](../../src/components/v5/Chrome.jsx). | Mobile open, Escape/focus return, closing on route navigation, direct links, theme, contact, and résumé. |
| Optional archive disclosure | [VersionSwitcher](../../src/components/site/VersionSwitcher.jsx) and [manifest](../../versions/manifest.json). | Hidden unless the release build injects `VITE_SHOW_VERSIONS=1`. Intentional version switch to `/versions/{serif,cyberterminal,halide,zero-to-built}/`. Check active version and Escape, focus return and outside-click dismissal. |
| Case-study screenshot dialog | [ProjectZoom](../../src/components/v5/ProjectZoom.jsx). | Open, Escape, close button and clicking the dialog backdrop. Initially closed and no separate URL. |
| Static fallback and no-JS | [project-pages.mjs](../../scripts/project-pages.mjs), [generate-seo.mjs](../../scripts/generate-seo.mjs), [prerender-agents.mjs](../../scripts/prerender-agents.mjs), [index.html](../../index.html). | Current Home initial HTML still contains the “Zero to built.” hero, V4 workbench image and contribution section. Static Work, project cases and other generated HTML use older fallback markup and are a separate V5-native coverage gap. Verify before JavaScript loads, with JavaScript disabled, and after boot. |

Cover clicks, direct paths, hard refresh, back/forward, and deep links for every native page type. The current route component scrolls to the top on navigation without a hash and observes late-mounted hash targets. A successful static response alone cannot prove native design or equivalent behavior on each entry path.

## Non-HTML endpoints and redirects

| Path or condition | Source and existing contract |
|---|---|
| `/blog/YYYY-MM-DD-<slug>/` | [Hostinger rewrite](../../public/.htaccess) issues a 301 to `/blog/<slug>/` including when the input lacks a trailing slash. [BlogPost](../../src/pages/BlogPost.jsx) resolves date-prefixed legacy slugs client-side and replaces the location with the bare canonical path. Check query and hash behavior separately for the 301 and the client fallback. The specific legacy aliases are paired with canonicals below. |
| `/sitemap.xml`, `/sitemap.xsl`, `/feed.xml` | [SEO generator](../../scripts/generate-seo.mjs) and [sitemap stylesheet](../../public/sitemap.xsl). The sitemap covers all 101 indexable HTML routes and declared article images. |
| `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/index.md` | Generated by [generate-seo.mjs](../../scripts/generate-seo.mjs). Hostinger content negotiation serves `index.md` from `/` and `/index.html` for `Accept: text/markdown`. |
| `/.well-known/mcp.json`, `/.well-known/mcp/server-card.json`, `/.well-known/security.txt`, `/humans.txt` | Static content under [public](../../public/). Both MCP paths are emitted from the same server-card source during build. |
| `/favicon.svg`, `/assets/**`, `/images/**` | Static site and content asset paths. App imports are hashed under `/assets/`; case studies, article media, fonts and metadata use stable paths under `public/`. |

[index.html](../../index.html) exposes the same `/blog/?q=` and `/contact/` paths through hidden WebMCP GET annotations. It also registers `search_content` and `get_contact_info` when the browser exposes `navigator.modelContext`.

## Canonical project case studies

All use [CaseStudy](../../src/pages/CaseStudy.jsx) and the canonical [project dataset](../../src/data/portfolio.json) with one static HTML document per slug. Shared deep links are `#problem`, `#contribution`, `#architecture`, `#decisions`, `#delivery` and `#limitations`. Verify the image and zoom dialog, evidence links, limitations, and next-project sequence. Fixo Flow includes a captioned video demonstration.

| Canonical | Project | Evidence asset |
|---|---|---|
| `/work/fixo-flow/` | Fixo Flow | `/assets/build-room/products/fixo-flow.webp` |
| `/work/packetlark/` | PacketLark | `/assets/build-room/products/packetlark.webp` |
| `/work/framecast-studio/` | Framecast Studio | `/assets/build-room/products/framecast-studio.webp` |
| `/work/fixo-cli/` | FixO CLI | `/images/fixo.svg` |
| `/work/gourmetgo/` | GourmetGo | `/images/gourmetgo.webp` |
| `/work/library-management/` | Library Management System | `/images/library_management.webp` |
| `/work/real-vs-ai/` | Real vs AI Image Detector | `/images/real-vs-ai.webp` |
| `/work/cattle-breed/` | Cattle Breed Identification System | `/images/cattle-breed.webp` |
| `/work/brain-tumor/` | Brain Tumor Detection (MRI) | `/images/brain-tumor-detection.webp` |
| `/work/kids-space/` | Kid's Space (Android App) | `/images/kids_space.webp` |


## Canonical article pages

All 82 use [BlogPost](../../src/pages/BlogPost.jsx) and a separately generated production HTML document. The metadata comes from [build-blog-index.mjs](../../scripts/build-blog-index.mjs) and the bodies load individually from [Markdown source](../../src/content/blogs/). All current entries declare both ELI5 and Developer content. Base routes default to ELI5. `?mode=dev` selects Developer mode and an omitted or unknown mode uses ELI5. Heading IDs are generated from the Markdown at render time and can differ by mode. Article-specific charts, code, tables, formulas and widgets are content within this template.

| Canonical | Date-prefixed legacy alias |
|---|---|
| `/blog/kv4-hopper-4bit-kv-cache-decoding-cuda-kernels/` | `/blog/2026-11-27-kv4-hopper-4bit-kv-cache-decoding-cuda-kernels/` |
| `/blog/claude-fable-5-2-mythos-architecture-benchmarks/` | `/blog/2026-11-25-claude-fable-5-2-mythos-architecture-benchmarks/` |
| `/blog/fixo-flow-local-whisper-mlx-desktop-voice-dictation-architecture/` | `/blog/2026-11-25-fixo-flow-local-whisper-mlx-desktop-voice-dictation-architecture/` |
| `/blog/framecast-studio-native-macos-dual-canvas-broadcast-architecture/` | `/blog/2026-11-25-framecast-studio-native-macos-dual-canvas-broadcast-architecture/` |
| `/blog/packetlark-local-first-api-workbench-quickjs-openapi-mcp/` | `/blog/2026-11-25-packetlark-local-first-api-workbench-quickjs-openapi-mcp/` |
| `/blog/skillkit-mcp-agent-skill-catalog-staged-routing-benchmarks/` | `/blog/2026-11-25-skillkit-mcp-agent-skill-catalog-staged-routing-benchmarks/` |
| `/blog/gemini-4-family-argon-carbon-hydrogen-neon-architecture-benchmarks/` | `/blog/2026-11-24-gemini-4-family-argon-carbon-hydrogen-neon-architecture-benchmarks/` |
| `/blog/h-spec-parallel-speculative-decoding-drafter-kv-cache/` | `/blog/2026-11-19-h-spec-parallel-speculative-decoding-drafter-kv-cache/` |
| `/blog/minicache-depth-dimension-kv-cache-compression-llm/` | `/blog/2026-11-17-minicache-depth-dimension-kv-cache-compression-llm/` |
| `/blog/cacheblend-fast-rag-serving-cached-knowledge-fusion/` | `/blog/2026-11-16-cacheblend-fast-rag-serving-cached-knowledge-fusion/` |
| `/blog/sparsespec-pillarattn-sparse-self-speculative-decoding-reasoning-models/` | `/blog/2026-11-10-sparsespec-pillarattn-sparse-self-speculative-decoding-reasoning-models/` |
| `/blog/agentspec-speculative-decoding-batch-inference-llm-agents/` | `/blog/2026-11-09-agentspec-speculative-decoding-batch-inference-llm-agents/` |
| `/blog/google-willow-quantum-supremacy-multiverse-myth-reality/` | `/blog/2026-11-07-google-willow-quantum-supremacy-multiverse-myth-reality/` |
| `/blog/the-ai-bubble-anatomy-of-capex-tech-layoffs-and-the-enterprise-roi-gap/` | `/blog/2026-11-06-the-ai-bubble-anatomy-of-capex-tech-layoffs-and-the-enterprise-roi-gap/` |
| `/blog/rtp-llm-alibaba-scale-evolvable-inference-engine/` | `/blog/2026-11-05-rtp-llm-alibaba-scale-evolvable-inference-engine/` |
| `/blog/fluidpd-in-place-elasticity-prefill-decode-disaggregated-serving/` | `/blog/2026-11-04-fluidpd-in-place-elasticity-prefill-decode-disaggregated-serving/` |
| `/blog/saria-persistence-aware-kv-cache-dram-ssd-llm-agents/` | `/blog/2026-11-03-saria-persistence-aware-kv-cache-dram-ssd-llm-agents/` |
| `/blog/akv-cache-engineering-agentic-inference/` | `/blog/2026-11-02-akv-cache-engineering-agentic-inference/` |
| `/blog/hawk-gpu-npu-phase-disaggregated-kv-cache-transfer/` | `/blog/2026-11-02-hawk-gpu-npu-phase-disaggregated-kv-cache-transfer/` |
| `/blog/ulacache-unified-logical-addressing-sparse-llm-serving/` | `/blog/2026-11-01-ulacache-unified-logical-addressing-sparse-llm-serving/` |
| `/blog/adaptive-dhisparse-speculative-decoding-load-adaptive-kv-hierarchy/` | `/blog/2026-10-30-adaptive-dhisparse-speculative-decoding-load-adaptive-kv-hierarchy/` |
| `/blog/dlite-history-free-speculative-decoding-agentic-llm/` | `/blog/2026-10-29-dlite-history-free-speculative-decoding-agentic-llm/` |
| `/blog/gemini-4-carbon-frontier-cybersecurity-reasoning-architecture/` | `/blog/2026-10-29-gemini-4-carbon-frontier-cybersecurity-reasoning-architecture/` |
| `/blog/flashmap-flow-map-speculative-decoding/` | `/blog/2026-10-26-flashmap-flow-map-speculative-decoding/` |
| `/blog/llm-d-1-0-cncf-distributed-inference-prefill-decode-disaggregation/` | `/blog/2026-10-25-llm-d-1-0-cncf-distributed-inference-prefill-decode-disaggregation/` |
| `/blog/hy-memory-2-0-tencent-30b-a3b-attributed-reinforcement-learning/` | `/blog/2026-10-24-hy-memory-2-0-tencent-30b-a3b-attributed-reinforcement-learning/` |
| `/blog/deepinfer-deepseek-production-inference-engine-dspark-kernels/` | `/blog/2026-10-22-deepinfer-deepseek-production-inference-engine-dspark-kernels/` |
| `/blog/headroom-claude-mem-agent-context-compression-cache-alignment/` | `/blog/2026-10-21-headroom-claude-mem-agent-context-compression-cache-alignment/` |
| `/blog/spark-x2-6-4b-on-device-agent-hybrid-attention-controllable-thinking/` | `/blog/2026-10-21-spark-x2-6-4b-on-device-agent-hybrid-attention-controllable-thinking/` |
| `/blog/nvidia-nemotron-3-5-bolt-74b-a9b-mamba-moe-24gb/` | `/blog/2026-10-18-nvidia-nemotron-3-5-bolt-74b-a9b-mamba-moe-24gb/` |
| `/blog/longcat-2-5-preview-1-6t-moe-lsa-sparse-attention/` | `/blog/2026-10-17-longcat-2-5-preview-1-6t-moe-lsa-sparse-attention/` |
| `/blog/meta-muse-spark-open-816b-a42b-sparse-moe-architecture/` | `/blog/2026-10-16-meta-muse-spark-open-816b-a42b-sparse-moe-architecture/` |
| `/blog/second-thought-asynchronous-parallel-reasoning-agent-harnesses/` | `/blog/2026-10-14-second-thought-asynchronous-parallel-reasoning-agent-harnesses/` |
| `/blog/nvidia-avo-agentic-variation-operators-arc-agi-3/` | `/blog/2026-10-13-nvidia-avo-agentic-variation-operators-arc-agi-3/` |
| `/blog/kolibri-1-aleph-alpha-78b-sparse-moe-sovereign-ai/` | `/blog/2026-10-11-kolibri-1-aleph-alpha-78b-sparse-moe-sovereign-ai/` |
| `/blog/ling-3-1-flash-560b-hybrid-reasoning-moe-architecture/` | `/blog/2026-10-10-ling-3-1-flash-560b-hybrid-reasoning-moe-architecture/` |
| `/blog/claude-haiku-5-5-architecture-subagent-swarms-benchmarks/` | `/blog/2026-10-09-claude-haiku-5-5-architecture-subagent-swarms-benchmarks/` |
| `/blog/mistral-large-4-le-chonk-1t-granular-moe-sovereign-agent-architecture/` | `/blog/2026-10-07-mistral-large-4-le-chonk-1t-granular-moe-sovereign-agent-architecture/` |
| `/blog/overfit-inference-engines-dwarfstar-strata-ninfer/` | `/blog/2026-10-07-overfit-inference-engines-dwarfstar-strata-ninfer/` |
| `/blog/mimo-v2-6-pro-1t-omnimodal-moe-gagar-agentic-graders/` | `/blog/2026-10-06-mimo-v2-6-pro-1t-omnimodal-moe-gagar-agentic-graders/` |
| `/blog/reflection-ai-beam-501b-moe-intelligence-per-token-architecture/` | `/blog/2026-10-06-reflection-ai-beam-501b-moe-intelligence-per-token-architecture/` |
| `/blog/gemini-4-argon-1m-output-frontier-deepswe-architecture/` | `/blog/2026-10-05-gemini-4-argon-1m-output-frontier-deepswe-architecture/` |
| `/blog/percepta-spotlight-2d-lattice-recurrent-memory-architecture/` | `/blog/2026-10-05-percepta-spotlight-2d-lattice-recurrent-memory-architecture/` |
| `/blog/dots3-note-tempo-macro-step-policy-optimization/` | `/blog/2026-10-03-dots3-note-tempo-macro-step-policy-optimization/` |
| `/blog/k2-horizon-mova-mixture-of-value-attention/` | `/blog/2026-10-02-k2-horizon-mova-mixture-of-value-attention/` |
| `/blog/nvidia-openshell-kernel-sandbox-landlock-seccomp-agent-runtime/` | `/blog/2026-09-30-nvidia-openshell-kernel-sandbox-landlock-seccomp-agent-runtime/` |
| `/blog/atria-dawn-744b-agentic-moe-verifiable-experience-pipeline/` | `/blog/2026-09-29-atria-dawn-744b-agentic-moe-verifiable-experience-pipeline/` |
| `/blog/exllamav3-exl3-qtip-bitshift-trellis-quantization/` | `/blog/2026-09-28-exllamav3-exl3-qtip-bitshift-trellis-quantization/` |
| `/blog/claude-opus-5-5-architecture-benchmarks-migration/` | `/blog/2026-09-27-claude-opus-5-5-architecture-benchmarks-migration/` |
| `/blog/hindsight-tempr-epistemic-agent-memory-architecture/` | `/blog/2026-09-27-hindsight-tempr-epistemic-agent-memory-architecture/` |
| `/blog/mlx-vs-gguf-apple-silicon-m5-architecture/` | `/blog/2026-09-25-mlx-vs-gguf-apple-silicon-m5-architecture/` |
| `/blog/typesafe-ai-jev-non-autoregressive-decision-engine/` | `/blog/2026-09-25-typesafe-ai-jev-non-autoregressive-decision-engine/` |
| `/blog/omniroute-agentic-ai-gateway-rtk-compression/` | `/blog/2026-09-20-omniroute-agentic-ai-gateway-rtk-compression/` |
| `/blog/bonsai-2-27b-ternary-quantization-walsh-hadamard/` | `/blog/2026-09-19-bonsai-2-27b-ternary-quantization-walsh-hadamard/` |
| `/blog/emergence-world-2-agent-containment-steganography/` | `/blog/2026-09-16-emergence-world-2-agent-containment-steganography/` |
| `/blog/paddock-rust-cuda-inference-engine-vllm-sglang/` | `/blog/2026-09-15-paddock-rust-cuda-inference-engine-vllm-sglang/` |
| `/blog/deepseek-v4-1-flash-ced-csa2-engram/` | `/blog/2026-09-11-deepseek-v4-1-flash-ced-csa2-engram/` |
| `/blog/sparda-forecast-projection-kv-cache-prefetch/` | `/blog/2026-09-08-sparda-forecast-projection-kv-cache-prefetch/` |
| `/blog/glm-5-3-flash-kda-mhc-moe-ox-alpha/` | `/blog/2026-09-07-glm-5-3-flash-kda-mhc-moe-ox-alpha/` |
| `/blog/qwen-3-8-flash-next-ngram-moe-mtp/` | `/blog/2026-09-06-qwen-3-8-flash-next-ngram-moe-mtp/` |
| `/blog/claude-fable-5-1-mythos-frontier-deep-dive/` | `/blog/2026-09-04-claude-fable-5-1-mythos-frontier-deep-dive/` |
| `/blog/claude-fable-5-1-vs-meta-muse-spark-1-3-agentic-economics/` | `/blog/2026-09-04-claude-fable-5-1-vs-meta-muse-spark-1-3-agentic-economics/` |
| `/blog/gpt-6-astra-critical-exploitbench/` | `/blog/2026-09-04-gpt-6-astra-critical-exploitbench/` |
| `/blog/dualpipe-deepep-bidirectional-pipeline-parallelism/` | `/blog/2026-09-02-dualpipe-deepep-bidirectional-pipeline-parallelism/` |
| `/blog/gemini-3-8-flash/` | `/blog/2026-09-02-gemini-3-8-flash/` |
| `/blog/multi-head-latent-attention-mla-flashmla/` | `/blog/2026-08-30-multi-head-latent-attention-mla-flashmla/` |
| `/blog/dflash-block-diffusion-speculative-decoding/` | `/blog/2026-08-29-dflash-block-diffusion-speculative-decoding/` |
| `/blog/titans-neural-memory-nltm-test-time-learning/` | `/blog/2026-08-28-titans-neural-memory-nltm-test-time-learning/` |
| `/blog/cursor-origin-spacex-agentic-git-forge/` | `/blog/2026-08-27-cursor-origin-spacex-agentic-git-forge/` |
| `/blog/test-time-compute-tree-grpo-mcts-reasoning/` | `/blog/2026-08-24-test-time-compute-tree-grpo-mcts-reasoning/` |
| `/blog/kv-cache-agentic-inference-vllm-sglang/` | `/blog/2026-08-23-kv-cache-agentic-inference-vllm-sglang/` |
| `/blog/nvidia-nemo-switchyard/` | `/blog/2026-08-22-nvidia-nemo-switchyard/` |
| `/blog/minimax-code-2-pi-framework/` | `/blog/2026-08-09-minimax-code-2-pi-framework/` |
| `/blog/openai-astra-critical-cyber/` | `/blog/2026-08-09-openai-astra-critical-cyber/` |
| `/blog/claude-code-skills-departments/` | `/blog/2026-07-29-claude-code-skills-departments/` |
| `/blog/claude-opus-5-launch/` | `/blog/2026-07-25-claude-opus-5-launch/` |
| `/blog/gemini-3-6-flash-launch/` | `/blog/2026-07-22-gemini-3-6-flash-launch/` |
| `/blog/qwen-3-8-max-preview-explained/` | `/blog/2026-07-22-qwen-3-8-max-preview-explained/` |
| `/blog/ponytail-ai-agent-lazy-senior-dev/` | `/blog/2026-07-20-ponytail-ai-agent-lazy-senior-dev/` |
| `/blog/opencode-desktop-launch/` | `/blog/2026-07-18-opencode-desktop-launch/` |
| `/blog/kimi-k3/` | `/blog/2026-07-17-kimi-k3/` |
| `/blog/meta-muse-spark-1-1/` | `/blog/2026-07-09-meta-muse-spark-1-1/` |
