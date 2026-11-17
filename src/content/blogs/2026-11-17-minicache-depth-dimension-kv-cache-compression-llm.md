---
title: "MiniCache: Why Evicting Tokens Destroys Long Contexts, and How Depth-Dimension Merging Squeezes KV Caches by 5x"
date: "2026-11-17"
description: "A systems engineering deep dive into MiniCache, explaining why token pruning damages reasoning, and how cross-layer KV cache merging using magnitude-direction disentanglement achieves 5x lossless compression."
tags: ["MiniCache", "KV Cache", "Inference Systems", "LLM Inference", "vLLM", "CUDA", "Systems Engineering"]
author: "Abrar Akhunji"
heroImage: "/images/blog/minicache-depth-dimension-kv-cache-compression-llm/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["cacheblend-fast-rag-serving-cached-knowledge-fusion", "sparsespec-pillarattn-sparse-self-speculative-decoding-reasoning-models", "kv-cache-agentic-inference-vllm-sglang"]
faq:
  - question: "What is MiniCache and what specific engineering bottleneck does it resolve?"
    answer: "MiniCache is a training-free KV cache compression framework that operates along the depth dimension of transformers. In long-context serving (32k to 128k tokens), the KV cache consumes up to 80 percent of GPU high-bandwidth memory (HBM). Traditional compression methods either discard tokens along the sequence dimension (causing information loss in multi-hop reasoning) or quantize weights to low bit-widths (causing precision degradation). MiniCache compresses the cache across adjacent transformer layers, achieving a 5.02x footprint reduction without token eviction."
  - question: "How does depth-dimension compression differ from token eviction or quantization?"
    answer: "Token eviction methods like StreamingLLM, H2O, or SnapKV compress the sequence length dimension by dropping historical tokens, creating blind spots for distant retrieval. Quantization compresses the bit-precision dimension per parameter. Depth-dimension compression operates orthogonally: it retains all sequence tokens across the entire context window, but merges highly redundant key-value state representations across adjacent middle-to-deep transformer layers."
  - question: "What is Magnitude-Direction Disentanglement and why is it necessary?"
    answer: "In deep transformers, key vectors between adjacent layers exhibit high cosine similarity (often exceeding 0.90) in direction, but vary significantly in magnitude. Naively averaging adjacent layer states distorts vector lengths, degrading attention distributions and increasing perplexity. Magnitude-Direction Disentanglement separates vectors into unit directional vectors and scalar L2 norms. It performs spherical linear interpolation (Slerp) on directions while retaining scalar norms, preventing representation collapse."
  - question: "How does MiniCache integrate with production serving runtimes like vLLM?"
    answer: "MiniCache integrates directly with PagedAttention block allocators. Layers designated for merging share physical KV block pointers in GPU memory, cutting page table allocations in half for target layer groups. A lightweight fused unpacking kernel reconstitutes layer-specific representations into SRAM during attention forward passes, maintaining compatibility with standard FlashAttention-3 execution."
---

:::eli5
*Written by Abrar Akhunji*

Imagine a 100-story skyscraper with an observation deck on every floor. On each floor, a team of cartographers sketches a panoramic map of the surrounding mountain ranges, city streets, and river valleys.

```
+-----------------------------------------------------------------------------+
|              THE THREE AXES OF KEY-VALUE CACHE COMPRESSION                  |
+-----------------------------------------------------------------------------+
|                                                                             |
|  1. The Sequence Length Axis (Token Eviction / Pruning):                    |
|     Tear out pages from the middle of the notebook.                         |
|     Tokens: [t_0, t_1, t_2, ..., t_32768] --> Keep only 2,048 tokens.       |
|     Problem: The model forgets facts, numbers, and needle-in-a-haystack data.|
|                                                                             |
|  2. The Bit Precision Axis (Quantization):                                  |
|     Write smaller with faint pencils (FP16 --> FP8 --> INT4).               |
|     Problem: Rounding errors accumulate across 80 layers; math degrades.    |
|                                                                             |
|  3. The Depth Dimension Axis (MiniCache Cross-Layer Merging):               |
|     Observe that Floor 45 and Floor 46 see the exact same mountain peaks!   |
|     Store ONE master panorama for both floors with small altitude offsets.  |
|                                                                             |
|  Result: 100% of tokens preserved, zero facts deleted, 5x memory saving.    |
+-----------------------------------------------------------------------------+
```

On Floor 1, the view is mostly trees and street signs. On Floor 5, the view includes highway interchanges. But once you travel up to Floor 45, Floor 46, and Floor 47, the view is virtually identical. Every window looks out at the same distant mountain ridges.

Traditional AI memory optimization behaves like an inspector who visits the skyscraper and demands that every floor tear out eighty percent of its map pages to save filing cabinet space. The inspector calls this token pruning. When someone asks a question about a small bridge drawn on page 200, the building staff cannot answer because the page was thrown away.

MiniCache discovers a much smarter filing system. Instead of throwing away pages, it looks across the floors. 

In deep artificial intelligence models (such as an 80-layer model like Llama-3-70B), the early floors process raw text and syntax. But once processing reaches the middle and upper layers, adjacent layers look at the exact same semantic concepts. Their internal reading notes share more than 90 percent of the same directional meaning.

MiniCache combines the filing cabinets of adjacent upper floors. It stores one master directional map shared between Floor 45 and Floor 46, while recording small local altitude adjustments for each floor. 

No pages are thrown away. Every single historical word remains in memory from start to finish. By merging shared notes across the depth of the building, the filing cabinets take up one-fifth the physical space, allowing the server to handle five times more concurrent visitors without buying extra hardware.
:::

:::interactive concept
{
  "title": "MiniCache Depth-Dimension Compression Pipeline",
  "steps": [
    {
      "label": "Stage 01: Layer Profiling",
      "title": "Cross-Layer Cosine Similarity Profiling",
      "content": "The inference engine profiles key-value state representations across transformer depth. Middle and deep layers showing cosine similarity above 0.90 are grouped into candidate merging pairs.",
      "icon": "Layers"
    },
    {
      "label": "Stage 02: Disentanglement",
      "title": "Magnitude-Direction Disentanglement (MDD)",
      "content": "Candidate KV vectors are decomposed into unit directional vectors on a hypersphere and scalar L2 norms. Directions are merged via spherical linear interpolation (Slerp) while vector lengths are preserved.",
      "icon": "Activity"
    },
    {
      "label": "Stage 03: Outlier Retention",
      "title": "Token Retention Strategy (TRS)",
      "content": "Tokens with high cross-layer angular variance (outliers holding unique factual cues) bypass merging entirely. Dedicated unmerged vectors protect factual accuracy with minimal memory cost.",
      "icon": "Zap"
    },
    {
      "label": "Stage 04: Paged Allocation",
      "title": "Fused Quantized Memory Storage",
      "content": "Merged directional vectors and scalar norms are packed into 4-bit paged memory blocks. Physical GPU block allocators share memory pointers across paired layers, achieving 5.02x total compression.",
      "icon": "Cpu"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Serving large language models at extreme context windows (32,768 to 131,072 tokens) presents an aggressive hardware bottleneck. In autoregressive decoding, the memory footprint of model weights remains fixed, but the Key-Value (KV) cache grows linearly with sequence length $S$, batch size $B$, layer count $L$, and hidden dimension $D$.

### The Memory Footprint Crisis in Long-Context Serving

Consider a standard enterprise deployment of Meta Llama-3-70B running on an 8-GPU NVIDIA H100 SXM5 cluster. The model architecture uses Grouped-Query Attention (GQA) with $L = 80$ transformer layers, $H_{kv} = 8$ key-value heads, and head dimension $d = 128$.

The memory allocated for storing the KV cache of a single sequence at context length $S = 65,536$ in FP16 precision is:

$$M_{\text{KV}} = 2 \times L \times H_{kv} \times d \times S \times \text{sizeof(FP16)}$$

$$M_{\text{KV}} = 2 \times 80 \times 8 \times 128 \times 65,536 \times 2 \text{ bytes} \approx 21.47 \text{ GB per sequence}$$

With a concurrent batch size of $B = 16$, the KV cache requires:

$$M_{\text{batch}} = 16 \times 21.47 \text{ GB} = 343.5 \text{ GB of VRAM}$$

This memory pressure dwarfs the 140 GB footprint of the FP16 model weights. High-Bandwidth Memory (HBM3) capacity is rapidly exhausted, forcing inference runtimes to limit batch concurrency, evict idle sessions, or offload cache blocks to host DRAM over PCIe Gen5 buses.

```
+-----------------------------------------------------------------------------+
|              VRAM CAPACITY BREAKDOWN AT S=65,536 (LLAMA-3-70B, B=16)        |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Uncompressed Serving (FP16):                                               |
|  [ Model Weights: 140 GB ] [ KV Cache: 343.5 GB ] [ Activations: 24 GB ]    |
|  Total VRAM Required: 507.5 GB (Consumes 80% of an 8x H100 80GB Node)       |
|                                                                             |
|  MiniCache (Depth Merging + 4-Bit Quantization):                            |
|  [ Model Weights: 140 GB ] [ KV Cache: 68.4 GB ] [ Activations: 24 GB ]     |
|  Total VRAM Required: 232.4 GB (5.02x KV Reduction, 5x Concurrency Headroom)|
|                                                                             |
+-----------------------------------------------------------------------------+
```

### The Failure of Sequence-Length Eviction in Complex Reasoning

To mitigate this memory explosion, substantial research has targeted sequence-length compression. Methods such as StreamingLLM, Heavy Hitter Oracle (H2O), SnapKV, and PyramidKV evict tokens from the KV cache based on attention score heuristics, retaining only initial sink tokens and recent local sliding windows.

While effective for superficial conversational chatting or single-document summaries, sequence eviction exhibits severe failure modes in production systems:
1. **Needle-in-a-Haystack Collapse:** Dropping 80 percent of historical tokens destroys the model's ability to locate isolated facts positioned thousands of tokens back in the context window.
2. **Multi-Hop Dependency Severing:** Complex mathematical derivations, code repository comprehension, and multi-step agent reasoning require referencing intermediate variables and structural definitions established early in the prompt. Evicting non-local tokens triggers logical hallucinations and syntax parsing errors.
3. **Irreversible Loss:** Once a token vector is evicted from physical GPU memory, its information is permanently lost. If a subsequent generation step requires that token, the engine must either fail or incur massive prefill recomputation overhead.

### The Depth-Dimension Insight: Cross-Layer Redundancy

MiniCache departs from sequence eviction by recognizing that transformer state redundancy exists along an orthogonal architectural axis: the **depth dimension**.

In deep transformer networks, representations evolve hierarchically. Early layers (Layers 0 to 12) specialize in tokenization, syntactic parsing, and low-level lexical features. However, as representations propagate into middle and deep layers (Layers 16 to 72 in an 80-layer architecture), hidden states enter a stable semantic plateau.

To quantify this phenomenon across model layers, let $K^{(l)} \in \mathbb{R}^{S \times d}$ denote the key cache tensor at layer $l$, and let $K^{(l+1)} \in \mathbb{R}^{S \times d}$ denote the key cache tensor at the subsequent layer. The mean cross-layer cosine similarity across all tokens $t \in [1, S]$ is defined as:

$$\operatorname{Sim}(l, l+1) = \frac{1}{S} \sum_{t=1}^{S} \frac{\langle K_t^{(l)}, K_t^{(l+1)} \rangle}{\|K_t^{(l)}\|_2 \cdot \|K_t^{(l+1)}\|_2}$$

```
+-----------------------------------------------------------------------------+
|              CROSS-LAYER KEY SIMILARITY ACROSS TRANSFORMER DEPTH            |
+-----------------------------------------------------------------------------+
|  Cosine Similarity between Adjacent Layers (K^(l) vs K^(l+1))               |
|                                                                             |
|  1.0 |                                       *---*---*---*---*              |
|      |                                 *---*                   *---*        |
|  0.9 |                           *---*                               *      |
|      |                     *---*                                            |
|  0.8 |               *---*                                                  |
|      |         *---*                                                        |
|  0.7 |   *---*                                                              |
|      |                                                                      |
|  0.6 +---+-------+-------+-------+-------+-------+-------+-------+-------+  |
|      0   8      16      24      32      40      48      56      64      80  |
|                                Transformer Layer                            |
|                                                                             |
|  Notice: Layers 20 through 68 maintain sustained similarity > 0.92.         |
|  Storing completely separate KV states for each layer is highly redundant.  |
+-----------------------------------------------------------------------------+
```

Across middle-to-deep layers, adjacent key states share over 90 percent directional alignment. Storing independent, uncompressed FP16 tensors for both layers wastes memory controllers and HBM capacity on duplicate information.

### Magnitude-Direction Disentanglement (MDD)

Naive cross-layer merging (such as taking the arithmetic mean of adjacent key vectors: $K_{\text{merged}} = (K^{(l)} + K^{(l+1)}) / 2$) fails catastrophically. 

While directional alignment is high, vector magnitudes ($\|K_t\|_2$) vary across layers due to residual stream accumulation and LayerNorm gain parameters. Averaging raw vectors compresses the variance of token norms, attenuates high-magnitude outlier tokens, and introduces representation collapse, increasing perplexity by 8 to 14 percent.

MiniCache solves this via **Magnitude-Direction Disentanglement (MDD)**. 

Every key vector $k \in \mathbb{R}^d$ and value vector $v \in \mathbb{R}^d$ is factorized into a unit directional vector $u$ lying on a $(d-1)$-dimensional hypersphere and a scalar norm $m$:

$$k = m \cdot u, \quad \text{where } m = \|k\|_2 \in \mathbb{R}^+, \quad u = \frac{k}{\|k\|_2} \in \mathbb{S}^{d-1}$$

For an adjacent layer pair $(l, l+1)$, MiniCache computes the merged directional vector $u_{\text{merged}}$ using Spherical Linear Interpolation (Slerp), which preserves constant angular velocity across hyperspherical manifolds:

$$\theta = \arccos(\langle u^{(l)}, u^{(l+1)} \rangle)$$

$$u_{\text{merged}} = \frac{\sin((1 - \alpha)\theta)}{\sin(\theta)} u^{(l)} + \frac{\sin(\alpha \theta)}{\sin(\theta)} u^{(l+1)}$$

where $\alpha \in [0, 1]$ represents the interpolation weight (typically $\alpha = 0.5$ for balanced layers).

Importantly, rather than discarding individual layer magnitudes, MiniCache preserves the original scalar norms $m^{(l)}$ and $m^{(l+1)}$ separately. Because a scalar requires only 2 bytes in FP16 compared to $2 \times d = 256$ bytes for a full vector, storing separate layer norms incurs less than 1 percent memory overhead while preserving the exact scale required by downstream attention softmax operations.

During the attention forward pass, the effective key vector for layer $l$ is reconstituted in on-chip SRAM:

$$\hat{k}^{(l)} = m^{(l)} \cdot u_{\text{merged}}$$

```
+-----------------------------------------------------------------------------+
|              MAGNITUDE-DIRECTION DISENTANGLEMENT (HYPERSPHERE SLERP)        |
+-----------------------------------------------------------------------------+
|                                                                             |
|                       Direction Vector u^(l+1)                              |
|                              ^                                              |
|                             /                                               |
|                            /  Merged Direction u_merged                     |
|                           /  /  (Slerp on Hypersphere)                      |
|                          /  /                                               |
|                         / v/                                                |
|                        +--+-----------------> Direction Vector u^(l)        |
|                                                                             |
|  Vector Deconstruction:                                                     |
|  k^(l)   = m^(l)   * u^(l)     (m^(l) = 14.2)                               |
|  k^(l+1) = m^(l+1) * u^(l+1)   (m^(l+1) = 18.6)                             |
|                                                                             |
|  Memory Layout:                                                             |
|  Shared Direction Tensor:  [ u_merged ] (Stored once in 4-bit / FP8)        |
|  Per-Layer Scale Buffers:  [ m^(l) ], [ m^(l+1) ] (1 scalar per token)     |
|                                                                             |
|  Result: 50% storage reduction per layer pair with zero norm distortion.    |
+-----------------------------------------------------------------------------+
```

### Token Retention Strategy (TRS): Outlier Protection

While the vast majority of tokens exhibit high cross-layer similarity, a critical minority of tokens (such as rare named entities, numerical digits, or punctuation delimiters) exhibit sharp directional shifts between adjacent layers. 

Forcing these outlier tokens through hyperspherical merging introduces local distortion that impairs factual recall.

MiniCache employs a **Token Retention Strategy (TRS)**. Before merging, it computes the angular similarity for each token position $t$:

$$\cos(\theta_t) = \langle u_t^{(l)}, u_t^{(l+1)} \rangle$$

Tokens whose similarity falls below a strict retention threshold $\tau$ (empirically set to $\tau = 0.85$) are flagged as outliers:

$$\mathcal{T}_{\text{outlier}} = \{ t \in [1, S] \mid \cos(\theta_t) < \tau \}$$

For tokens in $\mathcal{T}_{\text{outlier}}$, MiniCache retains distinct, unmerged vectors for both layers. Because outliers account for fewer than 4 percent of tokens across standard sequences, the additional storage overhead is negligible (under 0.08x), while retaining 100 percent of multi-hop factual accuracy.

### High-Performance Fused Unpacking Kernel

To eliminate the overhead of allocating intermediate tensors during generation, MiniCache uses a fused Triton kernel. 

During the autoregressive decode phase, the kernel streams the shared directional vector $u_{\text{merged}}$ directly from HBM, reads the layer-specific scalar norm $m^{(l)}$, scales the vector in registers, and evaluates the query-key dot product in a single fused pass.

```python
import torch
import triton
import triton.language as tl

@triton.jit
def _minicache_fused_decode_kernel(
    Q_ptr, U_merged_ptr, M_norm_ptr, Out_ptr,
    stride_qb, stride_qh, stride_qd,
    stride_ub, stride_uh, stride_us, stride_ud,
    stride_mb, stride_mh, stride_ms,
    stride_ob, stride_oh, stride_os,
    seq_len,
    sm_scale,
    BLOCK_S: tl.constexpr,
    HEAD_DIM: tl.constexpr,
):
    """
    MiniCache Fused Unpacking & Attention Scoring Kernel.
    Reconstitutes layer-specific keys from shared directions and scalar norms
    directly in SRAM registers, bypassing intermediate DRAM allocations.
    """
    batch_id = tl.program_id(0)
    head_id = tl.program_id(1)
    
    # Offset pointers for current batch and head
    q_offset = batch_id * stride_qb + head_id * stride_qh
    dim_offsets = tl.arange(0, HEAD_DIM)
    
    # Load Query vector (1, HEAD_DIM) into SRAM registers
    q_ptrs = Q_ptr + q_offset + dim_offsets * stride_qd
    q = tl.load(q_ptrs)
    
    # Iterate across sequence blocks
    for s_start in range(0, seq_len, BLOCK_S):
        s_offsets = s_start + tl.arange(0, BLOCK_S)
        mask_s = s_offsets < seq_len
        
        # Load Shared Unit Direction Vectors [BLOCK_S, HEAD_DIM]
        u_ptrs = (U_merged_ptr + batch_id * stride_ub + head_id * stride_uh + 
                  s_offsets[:, None] * stride_us + dim_offsets[None, :] * stride_ud)
        u_vectors = tl.load(u_ptrs, mask=mask_s[:, None], other=0.0)
        
        # Load Layer-Specific Scalar Norms [BLOCK_S]
        m_ptrs = M_norm_ptr + batch_id * stride_mb + head_id * stride_mh + s_offsets * stride_ms
        m_norms = tl.load(m_ptrs, mask=mask_s, other=0.0)
        
        # In-register key reconstruction: k = m * u
        k_reconstructed = u_vectors * m_norms[:, None]
        
        # Compute Query-Key Attention Logits
        scores = tl.sum(q[None, :] * k_reconstructed, axis=1) * sm_scale
        
        # Store unnormalized attention logits to output buffer
        out_ptrs = Out_ptr + batch_id * stride_ob + head_id * stride_oh + s_offsets * stride_os
        tl.store(out_ptrs, scores.to(tl.float16), mask=mask_s)
```

By fusing scaling into the attention scoring loop, memory traffic matches the compressed tensor footprint, delivering pure bandwidth savings with zero extra kernel launches.

### Empirical Benchmarks & Hardware Telemetry

MiniCache was evaluated on an 8-GPU NVIDIA H100 SXM5 cluster running Meta Llama-3-70B-Instruct and Mistral-7B across long-context benchmarks (LongBench, Needle-In-A-Haystack, and GSM8K-16k).

#### Compression Ratio and Memory Footprint Comparison

| Compression Configuration | KV Cache Precision | Active Merged Layers | Footprint per 64k Req | Compression Ratio | Max Concurrent Concurrency |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **vLLM Standard Baseline** | FP16 (16-bit) | None (0/80) | 21.47 GB | 1.00x | 16 seqs |
| **FP8 KV Quantization** | FP8 (E4M3) | None (0/80) | 10.74 GB | 2.00x | 32 seqs |
| **INT4 KV Quantization** | INT4 | None (0/80) | 5.37 GB | 4.00x | 64 seqs |
| **MiniCache (MDD Only)** | FP16 | 56 layers (28 pairs) | 11.22 GB | 1.91x | 31 seqs |
| **MiniCache + 4-Bit Quant** | **INT4 + Scale** | **56 layers (28 pairs)** | **4.27 GB** | **5.02x** | **81 seqs (5.06x)** |

```
+-----------------------------------------------------------------------------+
|           NEEDLE-IN-A-HAYSTACK RETRIEVAL ACCURACY (32K CONTEXT)             |
+-----------------------------------------------------------------------------+
|  Retrieval Accuracy (%) Across Sequence Depth                               |
|                                                                             |
|  100% | ********************************************************** (100.0%) |
|       |                                                                     |
|   90% |                                                                     |
|       |                                                                     |
|   80% |                     ^^^^^^^^^^^^^^^^^^^^                            |
|       |                     Token Eviction (H2O, SnapKV) Dips to 64%        |
|   70% |                     in Middle Context Depths                        |
|       |                                                                     |
|   60% +-----+-----------+-----------+-----------+-----------+               |
|       0%    25%         50%         75%         100%                        |
|                         Needle Placement Depth                              |
|                                                                             |
|  MiniCache (Green Asterisks) preserves 100% retrieval accuracy at all       |
|  depths because all sequence tokens remain present in physical memory.      |
+-----------------------------------------------------------------------------+
```

#### Long-Context Benchmark Performance Metrics

| Benchmark Task | Evaluation Metric | Uncompressed FP16 | SnapKV (4x Eviction) | INT4 Quant Alone | MiniCache + 4-Bit | Performance Retention |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **LongBench Multi-Doc QA** | F1 Score | 46.2 | 34.8 (-24.7%) | 45.1 (-2.4%) | **45.9** | **99.3%** |
| **Needle-In-A-Haystack** | Retrieval Accuracy | 100.0% | 68.4% (-31.6%) | 98.8% (-1.2%) | **99.8%** | **99.8%** |
| **NarrativeQA** | F1 Score | 28.4 | 19.2 (-32.4%) | 27.6 (-2.8%) | **28.1** | **98.9%** |
| **WikiText-103** | Perplexity | 4.82 | 6.42 (+33.2%) | 5.04 (+4.5%) | **4.89** | **+0.07 Perplexity** |

While sequence-length eviction suffers catastrophic drops of over 30 percent on complex multi-document QA and needle retrieval, MiniCache preserves over 99 percent of uncompressed baseline accuracy.

### Production Architectural Rules for Infrastructure Teams

When implementing cross-layer depth compression in production clusters, senior systems teams should enforce these architectural rules:

1. **Layer Boundary Invariants:**
   Never merge early transformer layers (Layers 0 through 14). Early layers extract local syntax, token boundaries, and high-frequency structural signals where cross-layer similarity drops below 0.65. Restrict depth merging strictly to middle-to-deep layers (e.g. Layers 16 to 70 in 80-layer architectures).

2. **Orthogonal Compression Stacking:**
   Treat depth merging as an independent dimension. Combine MiniCache with 4-bit block quantization (such as AWQ or QuaRot) and PagedAttention memory virtualization. The gains multiply: 2x from depth merging multiplied by 2.5x from 4-bit quantization yields an effective 5.02x density improvement.

3. **Outlier Threshold Calibration:**
   Maintain an outlier retention threshold of $\tau = 0.85$. Setting $\tau > 0.95$ forces too many unmerged tokens into memory, degrading the compression ratio. Setting $\tau < 0.75$ forces disparate tokens to merge, inducing subtle factual drifts in financial and medical analysis.

MiniCache proves that sequence-length eviction is a blunt instrument. By exploiting cross-layer redundancy through magnitude-direction disentanglement, infrastructure engineers can overcome the GPU memory wall without sacrificing reasoning capability.
:::

---

### Sources
- Primary Research Paper: [arXiv:2405.14366 - MiniCache: KV Cache Compression in Depth Dimension for Large Language Models](https://arxiv.org/abs/2405.14366)
- Official Open-Source Repository: [AkideLiu/MiniCache on GitHub](https://github.com/AkideLiu/MiniCache)
- NeurIPS 2024 Proceedings: [NeurIPS Conference Oral & Spotlight Archives](https://neurips.cc/)
