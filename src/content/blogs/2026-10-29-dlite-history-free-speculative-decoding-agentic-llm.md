---
title: "DLite: History-Free Speculative Decoding and the Elimination of Drafter-Side KV Cache Bottlenecks in Agentic AI"
date: "2026-10-29"
description: "A systems engineering teardown of DLite (arXiv:2610.23787): eliminating drafter-side KV caches, reusing target model hidden states for local block drafting, restoring intra-block causal dependencies in hidden space, and achieving 2.74x speedups on SWE-bench."
tags: ["DLite", "Speculative Decoding", "LLM Inference", "Agentic AI", "KV Cache", "vLLM", "SGLang", "Systems Engineering", "GPU Optimization", "CUDA"]
author: "Abrar Akhunji"
heroImage: "/images/blog/dlite-history-free-speculative-decoding-agentic-llm/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["2026-08-29-dflash-block-diffusion-speculative-decoding", "2026-10-26-flashmap-flow-map-speculative-decoding"]
faq:
  - question: "What is DLite and what specific engineering bottleneck does it resolve?"
    answer: "DLite (arXiv:2610.23787) is an open-source speculative decoding architecture developed by researchers from SJTU-DAI-Sys, Tsinghua, and Infinigence-AI. It resolves the severe acceptance collapse and high memory footprint of speculative decoding in long-context agentic workloads by eliminating the drafter-side historical KV cache entirely and reusing target model hidden states for local block drafting."
  - question: "Why do standard speculative draft models collapse in long-context agentic workflows?"
    answer: "In multi-turn agentic environments such as SWE-bench code editing loops and tool calling, context windows expand beyond 32,000 to 128,000 tokens with frequent prompt updates. Lightweight draft models lack the parameter capacity to accurately attend across massive history, suffering up to an 80% degradation in token acceptance length. Concurrently, allocating a secondary KV cache for the drafter across concurrent request streams induces severe VRAM fragmentation and cache eviction pressure."
  - question: "How does DLite achieve history-free speculative drafting without losing contextual awareness?"
    answer: "Instead of having the drafter ingest the full token history and maintain its own KV cache, DLite directly consumes the final contextual hidden states emitted by the target model during verification. It converts global sequence modeling into a localized prediction task around the current decoding horizon, projecting target representations into draft space and capturing historical semantics without tracking historical tokens."
  - question: "How does DLite model causal dependencies between candidate tokens inside a draft block?"
    answer: "To prevent independent factorization errors across the candidate block, DLite routes candidate slots through a lightweight sequential head that operates directly in the hidden state dimension before projecting to vocabulary logits. This restores intra-block causal relationships with minimal arithmetic overhead, avoiding costly full-sequence autoregressive attention."
  - question: "What are the exact hardware requirements and GPU memory overheads for DLite?"
    answer: "Because DLite completely discards the drafter-side historical KV cache, its auxiliary memory footprint is strictly constant: typically between 120 MB and 450 MB of VRAM for the lightweight draft network weights and intermediate activation buffers. It requires zero additional PagedAttention memory blocks per client session, allowing inference engines to maintain maximum batch concurrency."
  - question: "How does DLite integrate into production serving runtimes like vLLM and SGLang?"
    answer: "DLite connects into vLLM and SGLang as an engine-level speculative runner. It captures the target model's last hidden state tensor from the verification forward pass, passes it through the DLite projection and sequential head kernels, and returns a draft token tree for batched verification via FlashInfer or FlashAttention-3 kernels."
---

:::eli5
*Written by Abrar Akhunji*

If you have ever built an autonomous coding agent, you have seen how quickly context windows fill up.

An agent reads a repository, inspects terminal logs, executes unit tests, parses errors, and edits files. Within five turns, the conversation history inflates from 2,000 tokens to 64,000 tokens.

Running large language models across this massive history is slow. Every single token generated requires reading the entire key-value cache (KV cache) out of GPU memory. Speculative decoding was invented to solve this latency bottleneck: a tiny, cheap assistant model (the drafter) guesses the next four or five tokens, and the giant primary model (the target) checks all of them in parallel in one forward pass.

When contexts are short, speculative decoding works well. The drafter achieves high acceptance rates, and inference speeds jump by 2x to 3x.

In real-world agentic environments, speculative decoding breaks down completely.

```
            THE LONG-CONTEXT AGENTIC COLLAPSE IN SPECULATIVE SERVING
            
    1. The Memory Explosion:
       Target KV Cache (64k tokens):  [████████████████████████████████] (Heavy VRAM)
       Drafter KV Cache (64k tokens): [████████████████████████████████] (Duplicated VRAM!)
       Result: GPU runs out of memory; batch concurrency drops by half.

    2. The Acceptance Collapse:
       Short Context (2k tokens):  Draft: "def test_sum():"  --> Target: Accept 4/4 tokens (Fast!)
       Agent Context (64k tokens): Draft: "self.assert(..."  --> Target: Reject at token 1! (Slow!)
       Result: Drafter acceptance length drops by up to 80%. System runs slower than baseline.
```

Why does this collapse happen?

First, lightweight draft models (like a 1-billion parameter model trying to draft for a 70-billion parameter target) do not have the neural capacity to pay attention accurately across 64,000 tokens of scattered terminal logs and code diffs. They get confused, hallucinate syntax, and propose bad tokens that the target model immediately rejects.

Second, the drafter insists on maintaining its own duplicate KV cache. Storing sixty-four thousand tokens twice wastes gigabytes of high-bandwidth memory (HBM).

Researchers from Shanghai Jiao Tong University, Tsinghua University, and Infinigence-AI identified this root cause and published **DLite** (arXiv:2610.23787).

DLite uses a counter-intuitive principle: **throw away the drafter's history entirely**.

Instead of making the small drafter re-read 64,000 historical tokens and manage its own private KV cache, DLite taps into the target model's mind. When the target model verifies the previous token, it has already compressed the entire 64,000-token context into a single mathematical vector: its final hidden state.

DLite takes that single vector, projects it into the drafter's latent space, and predicts the next block of tokens locally.

```
                      DLITE HISTORY-FREE SPECULATIVE DECODING
                      
   Target Verification Pass:
   [Tokens 1 to 64,000] ──► Target Model ──► Final Hidden State: h_t (Context compressed!)
                                                    │
                                                    ▼
   DLite Drafter (Zero Drafter KV Cache):     [Projection Layer]
                                                    │
                                                    ▼
                                           [Intra-Block Head]
                                                    │
                                                    ▼
                                      Draft Block: [t+1, t+2, t+3, t+4]
                                                    │
   Target Model Parallel Check:                     ▼
   [Verify 4 tokens in one step] ◄──────────────────┘
```

Because DLite has no drafter-side KV cache, its memory consumption is flat. Whether the agent context is 1,000 tokens or 128,000 tokens, DLite uses the exact same tiny memory footprint.

By reusing the target model's contextual understanding, DLite stops the acceptance collapse. On challenging engineering benchmarks like SWE-bench, DLite achieves up to a **2.74x end-to-end speedup**, outperforming prior speculative engines by up to 70%.
:::

:::interactive concept
{
  "title": "DLite History-Free Speculative Execution Pipeline",
  "steps": [
    {
      "label": "Stage 01: State Tap",
      "title": "Target Hidden State Extraction",
      "content": "During target model verification, the runtime extracts the normalized final-layer hidden state tensor without allocating secondary draft KV memory.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 02: Projection",
      "title": "Localized Latent Alignment",
      "content": "A trained projection matrix maps the target representation directly into the drafter's feature space, bypassing the need for sequence re-encoding.",
      "icon": "Layers"
    },
    {
      "label": "Stage 03: Sequential Head",
      "title": "Intra-Block Causal Dependency Recovery",
      "content": "A compact recurrent head processes candidate positions in latent hidden space, maintaining causal order between drafted tokens before vocabulary projection.",
      "icon": "Activity"
    },
    {
      "label": "Stage 04: Verification",
      "title": "Batched Lossless Verification",
      "content": "The candidate block is submitted to the target model in a single batched verification pass. Accepted tokens commit while rejected suffixes rollback instantaneously.",
      "icon": "Zap"
    }
  ]
}
:::

:::interactive chart
{
  "title": "SWE-bench Speculative Decoding Acceleration on NVIDIA H800",
  "description": "Empirical generation speedup relative to vanilla autoregressive decoding on Qwen3-8B across multi-turn software engineering tasks.",
  "type": "bar",
  "xKey": "system",
  "series": [
    { "name": "Mean Accepted Tokens (tau)", "dataKey": "acceptance" },
    { "name": "End-to-End Speedup (x)", "dataKey": "speedup" }
  ],
  "data": [
    { "system": "Autoregressive Baseline", "acceptance": 1.0, "speedup": 1.0 },
    { "system": "Standard Draft (EAGLE)", "acceptance": 1.42, "speedup": 1.28 },
    { "system": "Block Diffusion (DSpark)", "acceptance": 1.95, "speedup": 1.61 },
    { "system": "DLite (History-Free)", "acceptance": 3.64, "speedup": 2.74 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

### 1. The Agentic Context Wall and Speculative Breakdown

Speculative decoding relies on a basic throughput equation. Let $\tau$ denote the average number of accepted tokens per verification step, $c_{\text{draft}}$ denote the execution latency of generating a draft block of length $K$, and $c_{\text{target}}$ denote the latency of a single target model forward pass evaluating $K$ candidate tokens simultaneously. The empirical speedup ratio $S$ is formalized as:

$$S = \frac{\tau \cdot c_{\text{target}}^{(1)}}{c_{\text{draft}} + c_{\text{target}}^{(K)}}$$

In single-turn generation regimes with context lengths $N < 2,048$, lightweight autoregressive drafters (such as EAGLE, SpecInfer, or small distilled transformers) consistently deliver $\tau \in [2.8, 4.5]$, yielding real-world wall-clock speedups between $1.8\times$ and $2.6\times$.

When deploying these speculative runtimes into agentic execution loops (for example, SWE-bench, Terminal-Bench, and multi-turn tool-calling harnesses), the serving mechanics fail.

#### A. The Dual KV Cache Capacity Crisis
Under standard speculative serving engines, both the target model $\mathcal{M}_{\text{target}}$ and the draft model $\mathcal{M}_{\text{draft}}$ maintain distinct Key-Value caches across all attention layers. Let $L$ denote the number of transformer layers, $H_{\text{kv}}$ denote the number of key-value heads, $d_{\text{head}}$ denote the per-head dimension, and $S_{\text{ctx}}$ denote the current sequence length. The aggregate high-bandwidth memory (HBM) allocated to the key-value caches of an active batch $B$ equals:

$$\text{Mem}_{\text{total\_KV}} = 2 \cdot B \cdot S_{\text{ctx}} \cdot \left( L_{\text{target}} H_{\text{kv\_target}} d_{\text{head\_target}} + L_{\text{draft}} H_{\text{kv\_draft}} d_{\text{head\_draft}} \right) \cdot \text{sizeof}(\text{dtype})$$

Consider an enterprise serving cluster hosting a 70B target model with an 8B draft assistant. At a context window of $S_{\text{ctx}} = 64,000$ tokens in FP16 precision:

```
+-------------------------------------------------------------------------------------------------+
|                       KV CACHE VRAM CONSUMPTION AT B=8, S_CTX=64,000                            |
+-------------------------------------+-----------------------------+-----------------------------+
| Parameter Metric                    | Target Model (70B, L=80)    | Draft Model (8B, L=32)      |
+-------------------------------------+-----------------------------+-----------------------------+
| KV Heads (GQA)                      | 8 heads                     | 8 heads                     |
| Head Dimension                      | 128                         | 128                         |
| Per-Token KV Memory                 | 163,840 bytes/token         | 65,536 bytes/token          |
| Sequence KV Memory (64k tokens)     | 10.48 GB per sequence       | 4.19 GB per sequence        |
| Batch KV Memory (Batch Size = 8)    | 83.84 GB VRAM               | 33.52 GB VRAM               |
| Aggregate Allocation Required       | 117.36 GB dedicated solely to KV storage (excluding weights)|
+-------------------------------------+-----------------------------+-----------------------------+
```

The draft model's KV cache occupies nearly 30% of total dynamic memory capacity. In modern PagedAttention runtimes, this auxiliary memory burden triggers premature cache eviction, limits maximum batch sizes, and forces high-latency host-to-device offloading.

#### B. Attention Dispersion and Semantic Degradation
The more severe pathology is algorithmic: **acceptance length collapse**.

Small language models lack the representation capacity to resolve long-range dependencies across complex, multi-turn contexts. When an agent trajectory contains interleaved JSON tool specifications, bash outputs, git diffs, and natural language instructions, small draft models suffer from severe attention dispersion. The attention weight entropy across context positions increases monotonically with sequence length:

$$H(\mathbf{A}_i) = -\sum_{j=1}^{S_{\text{ctx}}} A_{i, j} \log A_{i, j}$$

As $H(\mathbf{A}_i)$ increases, the draft model assigns diffuse probability mass across irrelevant historical tokens. Consequently, its token predictions diverge from the target model's high-capacity distribution. 

On SWE-bench tasks where context expands past 32k tokens, empirical measurements reveal that the average acceptance length $\tau$ of an 8B autoregressive drafter falls from $3.81$ tokens down to $1.14$ tokens, an operational degradation of over 70%. Because the drafter still incurs the fixed latency overhead $c_{\text{draft}}$ to compute these unaccepted candidate tokens, the net system throughput drops below baseline autoregressive generation ($S < 1.0$).

---

### 2. The Architectural Foundation of DLite

DLite (arXiv:2610.23787) eliminates the draft model's historical KV cache. The architecture is built on an empirical observation: **the target model has already performed the hard work of global context aggregation during its verification step**.

During every verification forward pass, the target model processes the full sequence history $y_{\le t}$ and computes an updated contextual hidden state for the latest token:

$$\mathbf{h}_t^{\text{target}} \in \mathbb{R}^{d_{\text{target}}}$$

Because $\mathbf{h}_t^{\text{target}}$ is emitted by the deep, high-parameter target transformer (e.g., 32 to 80 layers with full bidirectional and causal attention), it forms a condensed, high-density semantic representation of the entire multi-turn context.

```
                      DLITE DETAILED TENSOR FLOW ARCHITECTURE
                      
   Target Transformer Layer L_max:
   [ Token y_t Hidden State ] ─────────────────────────┐
                                                       │  (h_t in R^{B x d_target})
                                                       ▼
   Target-to-Draft Dimension Projection:       [ W_proj in R^{d_target x d_draft} ]
                                                       │
                                                       ▼
   Draft Base Representation:                  [ z_t^(0) = LayerNorm(W_proj * h_t) ]
                                                       │
                                   ┌───────────────────┴───────────────────┐
                                   ▼                                       ▼
   Slot 1 Causal State:   [ z_{t+1}^(0) = z_t^(0) + E_pos(1) ]   ... [ z_{t+K}^(0) = z_t^(0) + E_pos(K) ]
                                   │                                       │
                                   ▼                                       ▼
   Intra-Block Sequential Head:    [ L-layer Causal Latent Recurrence (Hidden Dimension Only) ]
                                   │                                       │
                                   ▼                                       ▼
   Unembedding Matrix (W_U):       [ Logits y_{t+1} ]            ... [ Logits y_{t+K} ]
                                   │                                       │
                                   └───────────────────┬───────────────────┘
                                                       │
   Verification Forward Pass:                          ▼
   Target Evaluates Tree:         [ Parallel Verification Matrix (Single Step, Zero Draft KV) ]
```

Instead of requiring the draft model to maintain a historical sequence of keys and values $\mathbf{K}_{\text{draft}}, \mathbf{V}_{\text{draft}} \in \mathbb{R}^{S_{\text{ctx}} \times d}$, DLite casts speculative drafting as a **localized prediction task centered strictly on the current decoding frontier**.

#### Mathematical Formulation of History-Free Projection
Let $\mathbf{h}_t^{\text{target}} \in \mathbb{R}^{B \times d_{\text{target}}}$ denote the final-layer hidden state of the target model at token position $t$. DLite maps this representation into the draft model's feature space via an aligned projection operator:

$$\mathbf{z}_t^{(0)} = \text{RMSNorm}\left( \mathbf{W}_{\text{proj}} \mathbf{h}_t^{\text{target}} + \mathbf{b}_{\text{proj}} \right)$$

where $\mathbf{W}_{\text{proj}} \in \mathbb{R}^{d_{\text{draft}} \times d_{\text{target}}}$.

To prepare candidate generation for a block of length $K$, DLite constructs an initial latent tensor $\mathbf{Z}^{(0)} \in \mathbb{R}^{B \times K \times d_{\text{draft}}}$ by broadcasting $\mathbf{z}_t^{(0)}$ across all $K$ future token slots and adding learned relative positional encodings $\mathbf{E}_{\text{pos}} \in \mathbb{R}^{K \times d_{\text{draft}}}$:

$$\mathbf{Z}_{k}^{(0)} = \mathbf{z}_t^{(0)} + \mathbf{E}_{\text{pos}}(k), \quad \forall k \in \{1, 2, \dots, K\}$$

Notice the architectural consequence: **no historical token representations from positions $1$ to $t-1$ are ingested by the draft model**. The draft pipeline consumes zero historical KV memory. Its working memory footprint is restricted strictly to the candidate block dimension $K$, where $K \ll S_{\text{ctx}}$ (typically $K \in [4, 6]$).

---

### 3. Restoring Intra-Block Causal Dependencies in Hidden Space

A critical failure mode of non-autoregressive block drafting (observed in early discrete diffusion architectures like DFlash) is the **factorization error**. If all $K$ candidate tokens are predicted independently from $\mathbf{z}_t^{(0)}$, the model fails to capture conditional covariance across consecutive positions:

$$P(y_{t+1:t+K} \mid y_{\le t}) \neq \prod_{k=1}^K P(y_{t+k} \mid y_{\le t})$$

In software engineering corpora, syntax requires strict local conditioning. For example, if position $t+1$ generates an opening bracket `[`, position $t+2$ cannot be sampled under the unconditional assumption of an empty line.

Traditional systems resolve this by projecting each slot to full vocabulary logits ($|\mathcal{V}| \approx 152,064$ tokens), sampling a concrete token ID, embedding that token, and passing it back through an autoregressive attention layer with KV caching. This introduces massive memory bandwidth pressure: projecting to a 152k-wide vocabulary requires moving:

$$\text{Bytes moved} = 2 \cdot B \cdot K \cdot d_{\text{model}} \cdot |\mathcal{V}|$$

For $B=16, K=5, d=4,096, |\mathcal{V}|=152,064$, this vocabulary projection transfers over **99.6 megabytes per drafting step**, saturating SRAM and DRAM caches.

#### The DLite Intra-Block Sequential Head
DLite solves this by restoring causal dependencies **exclusively in the latent hidden space** before any vocabulary projection occurs.

The candidate block tensor $\mathbf{Z}^{(0)} \in \mathbb{R}^{B \times K \times d_{\text{draft}}}$ is routed through a compact, $M$-layer causal sequential head (where $M \in [2, 4]$). Within this head, each position $k$ is causally masked such that it attends only to prior candidate positions $\{1, \dots, k\}$:

$$\mathbf{Q}_k = \mathbf{Z}_k^{(l-1)} \mathbf{W}_Q, \quad \mathbf{K}_j = \mathbf{Z}_j^{(l-1)} \mathbf{W}_K, \quad \mathbf{V}_j = \mathbf{Z}_j^{(l-1)} \mathbf{W}_V, \quad \forall j \le k$$

$$\mathbf{A}_{k, j} = \frac{\exp\left( \frac{\mathbf{Q}_k \mathbf{K}_j^T}{\sqrt{d_k}} \right)}{\sum_{m=1}^k \exp\left( \frac{\mathbf{Q}_k \mathbf{K}_m^T}{\sqrt{d_k}} \right)}$$

$$\mathbf{Z}_k^{(l)} = \text{FFN}\left( \text{RMSNorm}\left( \mathbf{Z}_k^{(l-1)} + \sum_{j=1}^k \mathbf{A}_{k, j} \mathbf{V}_j \right) \right)$$

Because $K$ is tiny ($K=5$), the causal attention matrix $\mathbf{A} \in \mathbb{R}^{K \times K}$ requires only 25 scalar operations per head. It fits entirely within GPU register files (RF) and L1 cache, incurring zero High-Bandwidth Memory round-trips.

Only after the final layer $M$ has established intra-block causal conditioning are the latent states projected to vocabulary logits in a single, fused matrix multiplication:

$$\mathbf{P}(y_{t+k} \mid y_{\le t}, \hat{y}_{t+1:t+k-1}) = \text{softmax}\left( \mathbf{W}_U \mathbf{Z}_k^{(M)} \right)$$

This architectural separation delivers the best of both worlds: full intra-block causal dependency without the memory bandwidth tax of multi-turn autoregressive drafting.

---

### 4. Two-Stage Training Mechanics

Training a heterogeneous, history-free draft head to emulate the predictions of a massive target model without access to historical tokens requires a structured optimization strategy. DLite employs a **two-stage training protocol**.

```
                           THE TWO-STAGE TRAINING PIPELINE
                           
    STAGE 1: Latent Space Alignment (Target to Drafter Feature Mapping)
    ┌────────────────────────────────────────────────────────────────────────┐
    │  Target Activations: h_t ──► [ W_proj ] ──► z_t^(0)                    │
    │  Loss: L_align = MSE(z_t^(0), z_t^(ground_truth)) + CosineDistance     │
    │  Goal: Align coordinate manifolds without learning sequential heads.   │
    └────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
    STAGE 2: Intra-Block Causal Distillation (End-to-End Block Prediction)
    ┌────────────────────────────────────────────────────────────────────────┐
    │  Frozen: W_proj (fixed alignment)                                      │
    │  Trainable: Sequential Head Layers + Positional Encodings E_pos        │
    │  Loss: L_distill = Multi-Token Cross-Entropy + KL Divergence           │
    │  Goal: Teach sequential head to recover intra-block grammar & syntax.  │
    └────────────────────────────────────────────────────────────────────────┘
```

#### Stage 1: Latent Representation Alignment
In the first phase, the objective is to teach the linear projection $\mathbf{W}_{\text{proj}}$ to faithfully map the target model's hidden representation into the drafter's intrinsic semantic coordinate space.

Given a diverse dataset of agent execution trajectories $\mathcal{D}$, we record the target model's final-layer representations $\mathbf{h}_t^{\text{target}}$ and the corresponding ground-truth representations from the draft model's original pre-trained backbone $\mathbf{h}_t^{\text{draft}}$. The alignment loss combines Mean Squared Error with negative cosine similarity:

$$\mathcal{L}_{\text{align}} = \frac{1}{B} \sum_{i=1}^B \left( \|\mathbf{z}_{t, i}^{(0)} - \mathbf{h}_{t, i}^{\text{draft}}\|_2^2 + \left(1 - \frac{\mathbf{z}_{t, i}^{(0)} \cdot \mathbf{h}_{t, i}^{\text{draft}}}{\|\mathbf{z}_{t, i}^{(0)}\|_2 \|\mathbf{h}_{t, i}^{\text{draft}}\|_2}\right) \right)$$

This phase converges rapidly (typically under 1,500 gradient steps on 8 NVIDIA H100 GPUs) because it solves a convex representation alignment problem without altering sequence prediction dynamics.

#### Stage 2: Intra-Block Causal Distillation
Once the latent coordinate systems are aligned, $\mathbf{W}_{\text{proj}}$ is frozen or updated with a small learning rate ($\eta = 10^{-5}$). The parameters of the positional encodings $\mathbf{E}_{\text{pos}}$, the intra-block sequential head, and the unembedding head are optimized simultaneously.

The training objective optimizes the multi-step prediction cross-entropy across all $K$ candidate slots against the target model's true output tokens $y_{t+1:t+K}$:

$$\mathcal{L}_{\text{distill}} = -\frac{1}{B \cdot K} \sum_{i=1}^B \sum_{k=1}^K \sum_{v \in \mathcal{V}} \mathbb{I}(y_{t+k, i} = v) \log P_{\text{draft}}\left(y_{t+k, i} = v \mid \mathbf{Z}_{k, i}^{(M)}\right)$$

To further stabilize training on rare tokens and programming syntax, a soft distillation regularization term is added over the top-$p$ target logits:

$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{distill}} + \beta \mathcal{D}_{\text{KL}}\left( P_{\text{target}}(y_{t+1:t+K}) \,\|\, P_{\text{draft}}(y_{t+1:t+K}) \right)$$

where $\beta = 0.15$.

---

### 5. Roofline and Memory Bandwidth Analysis

To understand why DLite provides such high wall-clock acceleration on modern GPU architectures, we examine the Roofline Model on an NVIDIA H100 SXM5 GPU (3.35 TB/s HBM3 memory bandwidth, 989 TFLOPs FP16 Tensor Core compute capacity).

The operational intensity $I$ of an inference kernel is defined as:

$$I = \frac{\text{Floating Point Operations (FLOPs)}}{\text{DRAM Memory Transferred (Bytes)}}$$

```
+----------------------------------------------------------------------------------------------------+
|                         ROOFLINE COMPARISON: DRAFTING A 5-TOKEN BLOCK                              |
+------------------------------------+--------------------------+------------------------------------+
| Operational Metric                 | Standard Drafter (with KV| DLite History-Free Drafter         |
|                                    | Cache at S_ctx=64k)      | (Zero Drafter KV Cache)            |
+------------------------------------+--------------------------+------------------------------------+
| Weight DRAM Reads                  | 1.60 GB (8B FP16 model)  | 0.24 GB (Fused Head & Proj)        |
| KV Cache DRAM Reads                | 4.19 GB per sequence     | 0.00 GB (Strict Zero!)             |
| Total DRAM Memory Transferred      | 5.79 GB                  | 0.24 GB                            |
| Floating Point Operations (FLOPs)  | 48.2 GFLOPs              | 17.8 GFLOPs                        |
| Operational Intensity (FLOPs/byte) | 8.32 FLOPs/Byte          | 74.16 FLOPs/Byte                   |
| Hardware Bound Regime              | Severe Memory Bandwidth  | Compute / Tensor Core Saturated    |
| Kernel Execution Time (P50)        | 1.84 ms                  | 0.31 ms                            |
+------------------------------------+--------------------------+------------------------------------+
```

#### The Memory Bandwidth Bottleneck in Standard Drafters
In standard drafting engines, calculating token $t+1$ requires reading all previously generated keys and values for tokens $1$ through $t$ from High-Bandwidth Memory (HBM3) into the Streaming Multiprocessors (SMs). At $S_{\text{ctx}} = 64,000$, reading 4.19 GB of KV cache per request consumes the majority of the GPU's memory bus. The tensor cores spend over 80% of their operational cycles stalled, waiting for memory transactions to resolve over the crossbar.

#### The DLite Efficiency Regime
DLite reads only the weights of the projection layer and the lightweight sequential head ($0.24\text{ GB}$). Because the target model's hidden state $\mathbf{h}_t^{\text{target}}$ is already resident in SRAM/L2 cache from the immediate prior verification step, **zero HBM round-trips are required for context retrieval**.

The operational intensity jumps from $8.32\text{ FLOPs/byte}$ to $74.16\text{ FLOPs/byte}$. The kernel transitions from the memory-bandwidth-bound plateau directly toward the compute-saturated roofline, executing in just **0.31 milliseconds**.

---

### 6. Triton Kernel Implementation: Fused Projection and Intra-Block Head

The following Triton kernel implementation demonstrates the fused forward pass of DLite's localized projection and intra-block sequential head. By fusing the target state projection, positional embedding addition, and causal recurrent expansion into a single kernel launch, intermediate tensors are kept in GPU shared memory (SRAM), eliminating global DRAM round-trips.

```python
import torch
import triton
import triton.language as tl

@triton.jit
def _fused_dlite_draft_kernel(
    # Pointers to inputs and outputs
    H_target_ptr,      # [B, d_target]: Target model's final hidden state
    W_proj_ptr,        # [d_target, d_draft]: Aligned projection matrix
    E_pos_ptr,         # [K, d_draft]: Learned relative positional embeddings
    W_head_ptr,        # [d_draft, d_draft]: Fused causal recurrence weights
    Output_logits_ptr, # [B, K, vocab_size]: Emitted candidate logits
    W_unembed_ptr,     # [d_draft, vocab_size]: Language model head weights
    # Strides
    stride_hb, stride_hd,
    stride_wp_in, stride_wp_out,
    stride_ep_k, stride_ep_d,
    stride_wh_in, stride_wh_out,
    stride_ob, stride_ok, stride_ov,
    stride_wu_d, stride_wu_v,
    # Dimensions
    d_target: tl.constexpr,
    d_draft: tl.constexpr,
    K_block: tl.constexpr,
    BLOCK_SIZE_V: tl.constexpr
):
    """
    Fused DLite Drafting Kernel:
    1. Reads target hidden state h_t directly from SRAM / L2.
    2. Projects h_t -> z_0 in draft hidden space.
    3. Broadcasts across K slots with relative positional encodings.
    4. Applies intra-block causal recurrence in SRAM.
    5. Projects to vocabulary logits in parallel across candidate positions.
    """
    pid_b = tl.program_id(axis=0)  # Batch index
    pid_v = tl.program_id(axis=1)  # Vocabulary chunk index
    
    # Offsets for target hidden state ingestion
    offs_d_target = tl.arange(0, d_target)
    offs_d_draft = tl.arange(0, d_draft)
    
    # Load target hidden state vector: shape [d_target]
    h_ptr = H_target_ptr + pid_b * stride_hb + offs_d_target * stride_hd
    h_target = tl.load(h_ptr)
    
    # 1. Project target state into draft dimension: z_0 = h_target @ W_proj
    # Handled via tile accumulation in local registers
    z_0 = tl.zeros([d_draft], dtype=tl.float32)
    for i in range(0, d_target, 64):
        h_chunk = tl.load(H_target_ptr + pid_b * stride_hb + (i + tl.arange(0, 64)) * stride_hd)
        wp_chunk = tl.load(W_proj_ptr + (i + tl.arange(0, 64))[:, None] * stride_wp_in + offs_d_draft[None, :] * stride_wp_out)
        z_0 += tl.sum(h_chunk[:, None] * wp_chunk, axis=0)
        
    # Local working buffer for intra-block candidates [K_block, d_draft]
    # Stored in high-speed register tiles
    z_candidates = tl.zeros([K_block, d_draft], dtype=tl.float32)
    
    # 2. Add learned relative positional embeddings
    for k in range(K_block):
        e_pos = tl.load(E_pos_ptr + k * stride_ep_k + offs_d_draft * stride_ep_d)
        z_candidates[k, :] = z_0 + e_pos
        
    # 3. Apply Intra-Block Causal Recurrence in Hidden Space
    # Step sequentially through K slots; slot k attends strictly to slots <= k
    for k in range(1, K_block):
        # Accumulate causal context strictly from prior slots in the block
        causal_context = tl.zeros([d_draft], dtype=tl.float32)
        for j in range(k):
            causal_context += z_candidates[j, :] / (k + 1.0)
            
        # Update current slot via recurrent transition
        wh_chunk = tl.load(W_head_ptr + offs_d_draft[:, None] * stride_wh_in + offs_d_draft[None, :] * stride_wh_out)
        recurrent_delta = tl.sum(causal_context[:, None] * wh_chunk, axis=0)
        z_candidates[k, :] = z_candidates[k, :] + recurrent_delta
        
    # 4. Compute Vocabulary Logits for current vocabulary chunk
    offs_vocab = pid_v * BLOCK_SIZE_V + tl.arange(0, BLOCK_SIZE_V)
    for k in range(K_block):
        # Unembed: logits = z_k @ W_unembed
        wu = tl.load(W_unembed_ptr + offs_d_draft[:, None] * stride_wu_d + offs_vocab[None, :] * stride_wu_v)
        logits_k = tl.sum(z_candidates[k, :][:, None] * wu, axis=0)
        
        # Store emitted candidate logits to global buffer
        out_ptr = Output_logits_ptr + pid_b * stride_ob + k * stride_ok + offs_vocab * stride_ov
        tl.store(out_ptr, logits_k)
```

---

### 7. Production Telemetry and Empirical Benchmarks

The DLite architecture was evaluated across standardized long-context agentic and reasoning benchmarks, comparing against three production baselines:
1. **Vanilla Autoregressive:** Standard single-token generation without speculative execution.
2. **EAGLE Speculative Drafter:** SOTA autoregressive speculative drafter utilizing full draft-side KV cache.
3. **DSpark (Block Diffusion):** Parallel block diffusion drafter with discrete multi-slot generation.

All evaluations were executed on an 8x NVIDIA H800 (80GB HBM3) cluster hosting **Qwen3-8B** and **Llama-3.3-70B-Instruct** in FP8 and BF16 execution modes.

```
+---------------------------------------------------------------------------------------------------------------+
|              SWE-BENCH VERIFIED EVALUATION TELEMETRY (QWEN3-8B TARGET, CONTEXT 32K TO 96K TOKENS)            |
+------------------------------------+--------------------+--------------------+--------------------+-----------+
| System Architecture                | Vanilla AR Base    | EAGLE (with KV)    | DSpark (Diffusion) | DLite     |
+------------------------------------+--------------------+--------------------+--------------------+-----------+
| Drafter Auxiliary VRAM Footprint   | 0.00 MB            | 4,280 MB           | 3,840 MB           | 210 MB    |
| Average Accepted Tokens (tau)      | 1.00 tok/step      | 1.42 tok/step      | 1.95 tok/step      | 3.64 tok  |
| Acceptance at Position k=1         | 100.0%             | 74.2%              | 81.0%              | 94.8%     |
| Acceptance at Position k=3         | N/A                | 31.4%              | 44.8%              | 76.2%     |
| Acceptance at Position k=5         | N/A                | 12.1%              | 22.3%              | 58.1%     |
| Time-to-First-Token (TTFT)         | 342 ms             | 398 ms             | 365 ms             | 344 ms    |
| Inter-Token Latency (ITL P50)      | 9.80 ms/tok        | 7.65 ms/tok        | 6.08 ms/tok        | 3.57 ms   |
| Inter-Token Latency (ITL P95)      | 11.20 ms/tok       | 12.40 ms/tok       | 8.90 ms/tok        | 4.12 ms   |
| End-to-End Speedup on SWE-bench    | 1.00x              | 1.28x              | 1.61x              | 2.74x     |
| LongBench v2 Speedup (128k ctx)    | 1.00x              | 1.08x              | 1.34x              | 2.48x     |
+------------------------------------+--------------------+--------------------+--------------------+-----------+
```

#### Observations from Production Deployments
1. **Immunity to Context Length Degradation:** At 96,000 tokens of context, EAGLE experiences an acceptance crash down to $\tau = 1.42$, and its P95 inter-token latency spikes to $12.40\text{ ms/tok}$ due to memory bus saturation. DLite sustains $\tau = 3.64$ tokens per verification step, delivering a **2.74x end-to-end wall-clock speedup**.
2. **Negligible TTFT Impact:** Because DLite initializes its draft representation directly from the target model's final verification tensor without executing a separate prompt prefill phase for the drafter, Time-to-First-Token (TTFT) increases by only 2 ms (344 ms vs 342 ms), compared to a 56 ms penalty in EAGLE.
3. **Drastic VRAM Savings for Serving Concurrency:** DLite requires only 210 MB of auxiliary GPU memory across all concurrent requests, compared to 4.28 GB per stream in EAGLE. This enables production clusters to quadruple client batch concurrency under identical hardware constraints.

---

### 8. Architectural Dilemmas and Infrastructure Rules of Thumb

When deploying history-free speculative drafters into production inference engines like vLLM, SGLang, and TensorRT-LLM, senior infrastructure engineers should manage three operational trade-offs:

- **Block Length Selection ($K=4$ vs. $K=6$):** In structured coding tasks and deterministic tool-calling workflows, setting $K=5$ or $K=6$ yields peak throughput. The intra-block sequential head maintains a 58.1% acceptance rate even at position 5. In high-entropy, open-ended conversational routing, setting $K=4$ avoids wasting target verification compute on speculative branches with low acceptance probabilities.
- **Handling Multi-Turn Context Appends:** In autonomous agent loops, new tool outputs and user messages are appended dynamically to the prompt. Because DLite does not store a historical draft KV cache, it requires zero cache invalidation, zero tree re-indexing, and zero memory re-allocation when new context arrives. The engine simply executes the target verification step on the appended prompt and immediately begins local drafting from the new hidden state.
- **Target Verification Kernel Tuning:** To achieve the full theoretical speedup, inference engines must verify the $K$ candidate tokens using fused tree-attention kernels (such as FlashInfer or FlashAttention-3 with custom block masks). Running unbatched sequential verification destroys the latency advantage of parallel drafting.
:::

---

### Sources
- Primary Research Paper: [arXiv:2610.23787 - DLite: History-free Speculative Decoding for Agentic AI](https://arxiv.org/abs/2610.23787)
- Official Code Repository: [github.com/SJTU-DAI-Sys/DLite](https://github.com/SJTU-DAI-Sys/DLite)
- Production Engine Runtime Specification: [vLLM Speculative Decoding Documentation](https://docs.vllm.ai/en/latest/features/spec_decode.html)
