---
title: "H-Spec: Why Block-Parallel Drafters Waste 30% of VRAM on Shadow KV Caches, and How Hybrid Context Injection Eliminates Them"
date: "2026-11-19"
description: "A systems engineering deep dive into H-Spec, detailing why block-parallel drafters suffer severe memory fragmentation in high-concurrency serving, and how hybrid Mamba-attention eliminates drafter KV caches entirely."
tags: ["H-Spec", "Speculative Decoding", "KV Cache", "Inference Systems", "vLLM", "Mamba", "CUDA"]
author: "Abrar Akhunji"
heroImage: "/images/blog/h-spec-parallel-speculative-decoding-drafter-kv-cache/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["dflash-block-diffusion-speculative-decoding", "minicache-depth-dimension-kv-cache-compression-llm", "kv-cache-agentic-inference-vllm-sglang"]
faq:
  - question: "What is H-Spec and what specific engineering bottleneck does it resolve?"
    answer: "H-Spec is a parallel speculative decoding architecture that eliminates the dedicated drafter-side Key-Value (KV) cache. In production serving runtimes like vLLM and SGLang, block-parallel drafters (such as DFlash and DSpark) project target hidden states at every input position into an auxiliary drafter KV cache. Under high concurrency (batch sizes 32 to 64 at sequence lengths 8k to 16k), this shadow cache consumes 20 to 35 percent of total GPU VRAM and fragments PagedAttention block tables. H-Spec eliminates this memory overhead entirely, preserving zero auxiliary KV cache allocations while accelerating token generation."
  - question: "Why does naive in-place reuse of target KV caches fail in speculative drafting?"
    answer: "If a drafter attention module directly reads the target model's KV cache without target context injection, the drafter lacks intermediate semantic steering from the target model's upper layers. Across multi-token speculative horizons (K = 4 to 8), drafting accuracy decays rapidly after the first token. Empirical evaluations show that naive in-place reuse collapses the mean accepted token length from 3.8 tokens down to 1.4 tokens per step, rendering speculative execution slower than standard autoregressive decoding."
  - question: "What is Hybrid Target-Context Injection and how does Mamba eliminate shadow caches?"
    answer: "H-Spec decouples context injection into two separate channels. First, attention modules query the target model's existing KV cache in-place without copying or allocating new memory. Second, the target model's hidden state from exclusively the final input token position is projected and used to initialize a State Space Model (Mamba) layer. Mamba utilizes an associative parallel prefix scan to broadcast this semantic steering across all K draft block positions in O(log K) step latency, achieving high drafting accuracy without storing historical drafter states."
  - question: "How does H-Spec integrate into production serving engines like vLLM?"
    answer: "H-Spec removes the drafter model from PagedAttention page table allocations. The drafter's multi-head attention kernels bind directly to the target model's physical block tables via FlashInfer or FlashAttention-3. Meanwhile, the Mamba scan executes entirely within GPU SRAM and register files, requiring zero global memory allocations across generation steps. This frees up to 24.6 percent of GPU memory, allowing servers to scale concurrent request batches without encountering out-of-memory evictions."
---

:::eli5
*Written by Abrar Akhunji*

Picture a courtroom where a senior court stenographer transcribes every word of a complex trial into a master ledger.

```
+-----------------------------------------------------------------------------+
|               THE SPECULATIVE DRAFTING MEMORY DILEMMA                       |
+-----------------------------------------------------------------------------+
|                                                                             |
|  1. Standard Autoregressive Generation:                                     |
|     One word per step. The stenographer checks the whole ledger every time.  |
|     Speed: 25 words/sec. Hardware is idle waiting for memory reads.         |
|                                                                             |
|  2. Block Drafter with Shadow Notebook (DFlash, DSpark):                    |
|     An apprentice guesses the next 5 words in parallel.                     |
|     Catch: The apprentice copies EVERY page of the stenographer's ledger    |
|     into a second notebook to stay aligned.                                 |
|     Problem: The courtroom table runs out of physical space. Memory fills.   |
|                                                                             |
|  3. Naive Ledger Peeking (Direct Target KV Reuse):                          |
|     The apprentice looks directly at the stenographer's ledger.             |
|     Catch: Without personal context notes, the apprentice guesses the       |
|     first word correctly, but guesses the next 4 words completely wrong.    |
|                                                                             |
|  4. H-Spec (Hybrid Target-Context Injection):                               |
|     The apprentice peeks directly at the master ledger (zero extra space),  |
|     and the stenographer whispers ONE single summary clue from the final    |
|     spoken word. A fast mental formula spreads that clue across 5 guesses.  |
|                                                                             |
|  Result: 100% accurate guesses, zero duplicate notebooks, 3x faster trial.  |
+-----------------------------------------------------------------------------+
```

To make the trial move faster, the court hires a junior assistant. The assistant tries to predict the next five words the judge will say. If the assistant guesses correctly, the stenographer can stamp all five words at once in a single second. This process is called speculative decoding.

In recent systems like block-parallel drafters, the assistant generates an entire block of five words at the same time. But to do this accurately, the assistant needs to know what the master stenographer was thinking.

Existing systems solve this by forcing the assistant to duplicate the entire master ledger into a second, auxiliary notebook. Every time a new piece of evidence arrives, the assistant writes down fresh notes for every single word in the history. 

When hundreds of trials happen at the same time in the same courthouse, these duplicate notebooks consume thirty percent of the physical desk space. Servers run out of memory, forcing the court to turn away new cases.

Engineers tried telling the assistant to just read the master ledger directly without writing any notes. That saved desk space, but the assistant became lost. The assistant could guess the first word, but words two, three, four, and five turned into wild gibberish.

H-Spec solves this dilemma with a clean insight.

The assistant does not need a duplicate notebook of the entire trial. The assistant reads the master ledger directly in place. Then, right before guessing the next block of words, the master stenographer passes a single sticky note containing the summary of the very last spoken word.

The assistant runs that single clue through a fast associative formula called Mamba. In a fraction of a millisecond, that single clue ripples through all five predicted words at once. 

No duplicate notebooks are ever purchased. The desk remains clean, memory usage drops by a quarter, and the court finishes cases three times faster.
:::

:::interactive concept
{
  "title": "H-Spec Parallel Speculative Execution Architecture",
  "steps": [
    {
      "label": "Stage 01: In-Place Binding",
      "title": "Target Model KV Cache In-Place Binding",
      "content": "The drafter attention sub-layers bind directly to the target model physical KV pages via PagedAttention. Zero auxiliary drafter KV pages are allocated in GPU High-Bandwidth Memory (HBM).",
      "icon": "Cpu"
    },
    {
      "label": "Stage 02: State Projection",
      "title": "Last-Token Hidden State Projection",
      "content": "The target model final hidden state h_T from the last input position is extracted and projected via linear weights W_proj into the drafter hidden dimension, capturing complete sequence steering.",
      "icon": "Layers"
    },
    {
      "label": "Stage 03: Mamba Scan",
      "title": "Parallel Associative Scan Across Draft Block",
      "content": "A Mamba state space layer initialized with projected state h_0 executes an associative parallel prefix scan across all K candidate draft positions in O(log K) time using GPU SRAM.",
      "icon": "Activity"
    },
    {
      "label": "Stage 04: Verification",
      "title": "Single-Pass Target Model Verification",
      "content": "The target model validates all K candidate tokens concurrently using tree attention masking, accepting valid prefixes and updating the master KV cache in one memory-efficient step.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Autoregressive inference in modern large language models is fundamentally constrained by the memory bandwidth of GPU accelerators. During token generation, every decoding step loads the full parameter weight matrix from High-Bandwidth Memory (HBM) into on-chip Static Random-Access Memory (SRAM) to compute hidden states for just a single active token.

Speculative decoding mitigates this memory wall by trading idle computational capability (arithmetic FLOPs) for reduced memory transactions. A lightweight drafter proposes a candidate sequence of $K$ tokens, and the larger target model verifies the candidate block in a single forward pass. Because verifying $K$ tokens in parallel exhibits high arithmetic intensity (FLOPs/byte), execution shifts from a bandwidth-bound regime toward a compute-bound regime, yielding speedups of $2.0\times$ to $3.5\times$.

However, in production serving systems handling high request concurrency, block-parallel speculative drafting introduces an aggressive memory bottleneck: **the drafter-side Key-Value (KV) cache**.

### The Shadow KV Cache Crisis in Block Drafters

Serial speculative drafting frameworks (such as small draft models) generate candidate tokens sequentially. Drafting $K$ tokens requires $K$ autoregressive forward steps. This serial drafting overhead bounds end-to-end acceleration, especially when the target model itself is optimized.

To overcome serial latency, recent architectures introduce block-parallel drafting:
1. **Medusa and Multi-Token Prediction (MTP):** Independent prediction heads mounted on top of target layers predict offsets $t+1, t+2, \dots, t+K$ without recurrence.
2. **Block Diffusion and Parallel Drafters (DFlash, DSpark):** Small transformer drafters predict an entire block of $K$ future tokens in parallel using iterative denoising or multi-token attention masks.

To preserve acceptable draft accuracy across long blocks, these parallel drafters require deep conditioning on the target model's internal activations. DFlash and DSpark achieve this conditioning by projecting the target model's hidden states across **all historical positions** $t \in [1, S]$ into a separate, dedicated drafter Key-Value cache.

```
+-----------------------------------------------------------------------------+
|             THE MEMORY FOOTPRINT CRISIS IN PRODUCTION SERVING               |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Standard Target Model KV Cache (PagedAttention):                           |
|  Shape: [Batch B, Layers L_t, Heads H_kv, SeqLen S, HeadDim d]               |
|  Footprint for Llama-3.1-70B (FP16, S=8,192, B=32):                         |
|  2 * 80 * 8 * 128 * 8,192 * 32 * 2 bytes = 85.89 GB VRAM                    |
|                                                                             |
|  Conventional Parallel Drafter Auxiliary KV Cache (DFlash, DSpark):         |
|  Shape: [Batch B, Layers L_d, Heads H_d, SeqLen S, HeadDim d]               |
|  Footprint for 5-layer Drafter (FP16, S=8,192, B=32, H_d=32, d=128):        |
|  2 * 5 * 32 * 128 * 8,192 * 32 * 2 bytes = 21.47 GB VRAM                    |
|                                                                             |
|  Memory Tax: An extra 21.47 GB (25.0% memory overhead) dedicated solely to  |
|  storing auxiliary drafter states in GPU HBM!                               |
|                                                                             |
+-----------------------------------------------------------------------------+
```

This auxiliary cache imposes three critical production penalties:

1. **Virtual Memory Table Fragmentation:** Runtimes like vLLM and SGLang manage KV caches using page tables (PagedAttention). Maintaining two separate page tables per request (one for the target model and one for the drafter) multiplies page allocation overhead and leads to internal table fragmentation.
2. **Concurrency Starvation:** In an 8x NVIDIA H100 SXM5 cluster (640 GB total HBM3), model weights for Llama-3.1-70B consume 140 GB. Under peak traffic with $S = 16,384$, the auxiliary drafter cache consumes over 42 GB of VRAM. This directly reduces the maximum concurrent request capacity from 64 streams down to 44 streams before out-of-memory (OOM) evictions occur.
3. **Bandwidth Penalty on Drafter KV Writes:** In every decoding iteration, the serving engine must compute projections of the target model hidden states and write them to global memory for the drafter, consuming precious HBM write bandwidth.

### Why Naive In-Place Target KV Reuse Fails

A natural engineering instinct is to eliminate the drafter's auxiliary cache by making the drafter's multi-head attention layers directly query the target model's KV cache in place.

Let $K^{\text{target}} \in \mathbb{R}^{S \times d_k}$ and $V^{\text{target}} \in \mathbb{R}^{S \times d_v}$ denote the target model's key-value tensors at a selected intermediate layer. In naive in-place reuse, the drafter computes queries $Q^{\text{draft}} \in \mathbb{R}^{K \times d_k}$ for the candidate block and executes:

$$\operatorname{Attention}(Q^{\text{draft}}, K^{\text{target}}, V^{\text{target}}) = \operatorname{softmax}\left(\frac{Q^{\text{draft}} (K^{\text{target}})^T}{\sqrt{d_k}}\right) V^{\text{target}}$$

While this eliminates auxiliary memory allocations, it exhibits an immediate architectural failure: **draft decay across block positions**.

```
+-----------------------------------------------------------------------------+
|              ACCEPTANCE DECAY: NAIVE IN-PLACE REUSE VS H-SPEC               |
+-----------------------------------------------------------------------------+
|  Position Acceptance Rate (%) Across Block Horizon K=5                      |
|                                                                             |
|  100% |  #     *                                                            |
|       |  #     *         * (H-Spec: Hybrid Mamba-Attention)                 |
|   80% |  #     *         *                                                  |
|       |  #     *         *         *                                        |
|   60% |  #     *         *         *         *                              |
|       |  #                                                                  |
|   40% |  #     # (Naive In-Place: Fast Decay)                               |
|       |  #                                                                  |
|   20% |  #     #         #                                                  |
|       |  #     #         #         #         #                              |
|    0% +--+-----+---------+---------+---------+                              |
|         k=1   k=2       k=3       k=4       k=5                             |
|                        Draft Token Index                                    |
|                                                                             |
|  Naive in-place attention accepts token k=1 (88%), but collapses to 14% at  |
|  k=4. Mean accepted length alpha drops from 3.8 to 1.4 tokens per step.     |
+-----------------------------------------------------------------------------+
```

The reason for this collapse lies in the nature of transformer attention. The target model's Key and Value states $K^{\text{target}}$ and $V^{\text{target}}$ reflect representations computed up to sequence position $T$. When predicting future tokens $T+1, T+2, \dots, T+K$, the drafter queries $Q^{\text{draft}}_{k}$ must capture autoregressive dependencies among the future candidate tokens themselves. 

Because naive in-place reuse lacks intermediate target activations and cannot condition future tokens on preceding draft choices, tokens at positions $k \ge 2$ suffer high entropy and drift away from the target distribution.

### The H-Spec Solution: Hybrid Target-Context Injection

H-Spec resolves this deadlock through a key empirical finding: **the target model's semantic steering is overwhelmingly concentrated in the hidden state of the final input position $h_T \in \mathbb{R}^{d_{\text{target}}}$**. 

Instead of caching target hidden states across all historical positions $t \in [1, S]$, H-Spec decouples context conditioning into two independent mechanisms:
1. **In-place target KV reuse for cross-token memory:** Drafter attention sub-layers read historical context directly from the target model's existing KV blocks via zero-copy memory pointers.
2. **Last-token hidden state injection into a State Space Model (Mamba):** The final target hidden state $h_T$ is injected into the drafter's State Space Model backbone, which propagates context forward across all $K$ candidate positions in parallel.

```
+-----------------------------------------------------------------------------+
|                      H-SPEC ARCHITECTURAL EXECUTION FLOW                    |
+-----------------------------------------------------------------------------+
|                                                                             |
|       Target Model (L Layers)                                               |
|       +-------------------------------------------------------------+       |
|       | Input Tokens: [x_1, x_2, ..., x_T]                          |       |
|       | KV Cache: Blocks allocated in PagedAttention HBM            |       |
|       | Final Token Hidden State: h_T in R^(d_target)               |       |
|       +-------------------------------------------------------------+       |
|                                |                                            |
|                +---------------+---------------+                            |
|                |                               |                            |
|                v (Zero Memory Copy)            v (Linear Projection)        |
|     Direct KV Binding                       h_0 = W_proj * h_T              |
|                |                               |                            |
|                v                               v                            |
|       +-------------------------------------------------------------+       |
|       | H-Spec Drafter Backbone:                                    |       |
|       |                                                             |       |
|       | 1. Mamba SSM Layer:                                         |       |
|       |    Initialized with h_0.                                    |       |
|       |    Executes parallel associative prefix scan across         |       |
|       |    candidate block positions [1, 2, ..., K] in SRAM.        |       |
|       |                                                             |       |
|       | 2. Attention Layer:                                         |       |
|       |    Queries target KV blocks directly via FlashInfer.        |       |
|       |    Zero auxiliary drafter pages allocated.                  |       |
|       +-------------------------------------------------------------+       |
|                                |                                            |
|                                v                                            |
|       Draft Candidates: [x_{T+1}, x_{T+2}, ..., x_{T+K}]                     |
|                                |                                            |
|                                v (Single Verification Forward Pass)         |
|       Target Model Verifier --> Accepts valid tokens, commits to KV cache   |
+-----------------------------------------------------------------------------+
```

### Mathematical Formulation of the Hybrid Drafter

Let $h_T \in \mathbb{R}^{d_{\text{target}}}$ be the hidden state emitted by the target model at sequence position $T$. H-Spec projects this vector into the drafter model's hidden dimension $d_{\text{draft}}$:

$$h_0^{\text{mamba}} = W_{\text{proj}} h_T + b_{\text{proj}}$$

where $W_{\text{proj}} \in \mathbb{R}^{d_{\text{draft}} \times d_{\text{target}}}$ and $b_{\text{proj}} \in \mathbb{R}^{d_{\text{draft}}}$.

The candidate token representations for the speculative block are denoted by $X = [x_1, x_2, \dots, x_K] \in \mathbb{R}^{K \times d_{\text{draft}}}$. 

#### State Space Model Formulation

The continuous-time linear state space model is defined by the differential equations:

$$h'(t) = A h(t) + B x(t)$$

$$y(t) = C h(t) + D x(t)$$

Using zero-order hold (ZOH) discretization with input-dependent step sizes $\Delta_k = \operatorname{softplus}(\operatorname{Linear}(x_k))$, the discretized transition matrices become:

$$\bar{A}_k = \exp(\Delta_k A)$$

$$\bar{B}_k = (\Delta_k A)^{-1} (\exp(\Delta_k A) - I) \cdot (\Delta_k B)$$

In H-Spec, the hidden state recurrence across the draft horizon $k \in \{1, \dots, K\}$ is initialized directly with the projected target vector $h_0^{\text{mamba}}$:

$$h_k = \bar{A}_k h_{k-1} + \bar{B}_k x_k, \quad \text{for } k = 1, \dots, K$$

$$y_k^{\text{ssm}} = C_k h_k + D x_k$$

#### Parallel Associative Scan in SRAM

Crucially, because $K$ is known and small (typically $K = 4$ or $K = 8$), this recurrence does not execute sequentially. The state transitions form an associative binary operation:

$$(A_i, B_i x_i) \bullet (A_j, B_j x_j) = (A_j A_i, A_j (B_i x_i) + B_j x_j)$$

This prefix scan runs in parallel across GPU threads in $O(\log K)$ step latency using shared memory (SRAM) and register banks. The context from $h_0^{\text{mamba}}$ propagates to all $K$ positions concurrently.

#### Multi-Head Attention Sub-Layer with In-Place KV Binding

After passing through the state space block, the intermediate activations $Y^{\text{ssm}} \in \mathbb{R}^{K \times d_{\text{draft}}}$ enter the attention sub-layer.

The drafter computes query projections:

$$Q_k = Y^{\text{ssm}}_k W_Q, \quad Q_k \in \mathbb{R}^{H_d \times d_k}$$

Instead of querying a drafter-side cache, $Q_k$ attends directly to the target model's key and value representations stored in GPU HBM:

$$K^{\text{target}} \in \mathbb{R}^{S \times H_{\text{kv}} \times d_k}, \quad V^{\text{target}} \in \mathbb{R}^{S \times H_{\text{kv}} \times d_v}$$

$$\operatorname{AttnOut}_k = \operatorname{FlashInfer}\left(Q_k, K^{\text{target}}, V^{\text{target}}\right)$$

Because the target model uses Grouped-Query Attention (GQA), the drafter shares the same head dimension $d_k = 128$ and maps its query heads across the target's $H_{\text{kv}}$ heads. 

Total auxiliary memory allocated in HBM for the drafter across sequence length $S$: **exactly 0 bytes**.

### Roofline Model & Operational Intensity Analysis

To understand why H-Spec delivers dramatic throughput gains, we evaluate the arithmetic intensity and memory bandwidth characteristics on an NVIDIA H100 SXM5 GPU (3.35 TB/s HBM3 bandwidth, 989 TFLOPS FP16 Tensor Core throughput).

```
+-----------------------------------------------------------------------------+
|                ROOFLINE ANALYSIS: MEMORY VS COMPUTE BOUNDS                  |
+-----------------------------------------------------------------------------+
|  Operational Intensity (FLOPs/byte)                                         |
|                                                                             |
|  Peak Compute: 989 TFLOPS FP16                                              |
|  Peak Bandwidth: 3,350 GB/s HBM3                                            |
|  Machine Knee: 989,000 / 3,350 = 295.2 FLOPs/byte                           |
|                                                                             |
|  1. Autoregressive Decoding (Batch Size 1):                                 |
|     FLOPs/byte: ~0.50 (Deeply Memory Bandwidth Bound)                       |
|     GPU Compute Utilization: < 1.0% MFU                                     |
|                                                                             |
|  2. DFlash / DSpark Parallel Drafter:                                       |
|     Must write & read drafter KV cache: 2 * L_d * H_d * d * S bytes         |
|     Memory Traffic per Draft Step: 1.84 GB                                  |
|                                                                             |
|  3. H-Spec Parallel Drafter:                                                |
|     Reads target KV cache in place; Mamba scan runs in SRAM registers.      |
|     Memory Traffic per Draft Step: 0.61 GB (3.0x less HBM traffic!)         |
|     Effective Drafter Step Latency: 2.14 ms vs 4.82 ms                      |
+-----------------------------------------------------------------------------+
```

Under batch size $B = 32$ and sequence length $S = 8,192$, the memory traffic comparison per draft iteration highlights H-Spec's efficiency:

| Operation Component | DFlash (Dedicated KV Cache) | H-Spec (In-Place + Mamba) | Bandwidth Reduction |
| :--- | :--- | :--- | :--- |
| **Target Hidden State Projections** | Written to HBM ($S \times d$) | Injected into SRAM ($1 \times d$) | **99.98% less write traffic** |
| **Drafter KV Cache Read/Write** | 1,228 MB read / 153 MB write | 0 MB read / 0 MB write | **100% eliminated** |
| **Target KV Cache Access** | 614 MB read | 614 MB read | Same (In-place) |
| **Mamba State Scan** | N/A | In-register associative scan | **0 MB HBM traffic** |
| **Total Drafter HBM Traffic** | **1,995 MB** | **614 MB** | **69.2% Memory Traffic Drop** |

By slashing HBM traffic by nearly 70 percent during drafting, the drafter forward pass finishes in 2.14 milliseconds instead of 4.82 milliseconds.

### Python & PyTorch System Implementation

Below is a reference implementation of H-Spec's hybrid context injection and drafter block, demonstrating in-place target KV cache binding and fused Mamba associative scan initialization:

```python
"""
H-Spec: Parallel Speculative Decoding Without a Drafter-Side KV Cache
Reference implementation of Hybrid Target-Context Injection.
"""

import math
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Optional, Tuple


class HSpecTargetContextInjection(nn.Module):
    """
    Projects the target model's final hidden state h_T into the drafter's
    hidden dimension to initialize the Mamba state space recurrent state.
    Zero allocations occur along the sequence length dimension.
    """
    def __init__(self, d_target: int, d_draft: int):
        super().__init__()
        self.d_target = d_target
        self.d_draft = d_draft
        self.proj = nn.Linear(d_target, d_draft, bias=True)
        self.norm = nn.LayerNorm(d_draft)

    def forward(self, h_target_last: torch.Tensor) -> torch.Tensor:
        """
        Args:
            h_target_last: Tensor of shape [batch_size, d_target]
                           representing target hidden state at position T.
        Returns:
            h_0: Tensor of shape [batch_size, d_draft] to initialize Mamba.
        """
        # Shape: [B, d_target] --> [B, d_draft]
        projected = self.proj(h_target_last)
        return self.norm(projected)


class HSpecParallelDrafterBlock(nn.Module):
    """
    A unified H-Spec drafter block combining:
    1. A Mamba State Space layer initialized with h_0.
    2. A Multi-Head Cross-Attention layer bound in-place to target KV caches.
    """
    def __init__(
        self,
        d_draft: int,
        d_state: int = 16,
        d_conv: int = 4,
        expand: int = 2,
        num_heads: int = 8,
        head_dim: int = 128
    ):
        super().__init__()
        self.d_draft = d_draft
        self.d_inner = expand * d_draft
        self.d_state = d_state
        self.num_heads = num_heads
        self.head_dim = head_dim

        # Mamba SSM parameters
        self.in_proj = nn.Linear(d_draft, self.d_inner * 2, bias=False)
        self.conv1d = nn.Conv1d(
            in_channels=self.d_inner,
            out_channels=self.d_inner,
            kernel_size=d_conv,
            groups=self.d_inner,
            padding=d_conv - 1
        )
        self.x_proj = nn.Linear(self.d_inner, d_state * 2 + 1, bias=False)
        self.dt_proj = nn.Linear(1, self.d_inner, bias=True)
        self.A_log = nn.Parameter(torch.log(torch.arange(1, d_state + 1, dtype=torch.float32).repeat(self.d_inner, 1)))
        self.D = nn.Parameter(torch.ones(self.d_inner))
        self.out_proj = nn.Linear(self.d_inner, d_draft, bias=False)

        # Cross-Attention parameters (attends directly to target model K, V)
        self.q_proj = nn.Linear(d_draft, num_heads * head_dim, bias=False)
        self.attn_out = nn.Linear(num_heads * head_dim, d_draft, bias=False)
        self.norm1 = nn.RMSNorm(d_draft)
        self.norm2 = nn.RMSNorm(d_draft)

    def forward(
        self,
        x_block: torch.Tensor,
        h_0_mamba: torch.Tensor,
        target_k_cache: torch.Tensor,
        target_v_cache: torch.Tensor
    ) -> torch.Tensor:
        """
        Executes parallel draft generation across K positions.
        
        Args:
            x_block: Draft candidate query inputs [B, K, d_draft]
            h_0_mamba: Projected target state [B, d_draft]
            target_k_cache: Physical target key cache [B, H_kv, S, head_dim]
            target_v_cache: Physical target value cache [B, H_kv, S, head_dim]
        Returns:
            Output representations for candidate tokens [B, K, d_draft]
        """
        batch_size, k_tokens, _ = x_block.shape

        # -------------------------------------------------------------
        # 1. Mamba Branch with Parallel Scan initialized from h_0
        # -------------------------------------------------------------
        residual = x_block
        norm_x = self.norm1(x_block)
        
        # In-project: [B, K, d_inner * 2]
        xz = self.in_proj(norm_x)
        x_branch, z_branch = xz.chunk(2, dim=-1)

        # 1D Convolution over block length K
        x_conv = self.conv1d(x_branch.transpose(1, 2))[:, :, :k_tokens].transpose(1, 2)
        x_act = F.silu(x_conv)

        # Compute delta, B, C from input representations
        ssm_inputs = self.x_proj(x_act)
        dt, B_ssm, C_ssm = torch.split(ssm_inputs, [1, self.d_state, self.d_state], dim=-1)
        dt = F.softplus(self.dt_proj(dt))

        # Discretize continuous matrices A and B
        A = -torch.exp(self.A_log.float()) # [d_inner, d_state]
        dA = torch.exp(torch.einsum('bkd,dn->bkdn', dt, A))
        dB = torch.einsum('bkd,bkn->bkdn', dt, B_ssm)

        # Parallel Associative Scan across K positions
        # Inject h_0_mamba as the initial state for step k=0
        h_state = h_0_mamba.unsqueeze(1).unsqueeze(-1).repeat(1, 1, self.d_inner, self.d_state)
        y_steps = []
        current_h = h_state[:, 0] # [B, d_inner, d_state]

        for k in range(k_tokens):
            # Recurrence across draft block (simulated; fused kernel runs parallel scan)
            current_h = dA[:, k] * current_h + dB[:, k] * x_act[:, k].unsqueeze(-1)
            y_k = torch.einsum('bdn,bn->bd', current_h, C_ssm[:, k])
            y_steps.append(y_k)

        y_ssm = torch.stack(y_steps, dim=1) + x_act * self.D
        y_mamba = self.out_proj(y_ssm * F.silu(z_branch))
        x_mid = residual + y_mamba

        # -------------------------------------------------------------
        # 2. In-Place Target Cross-Attention (Zero Extra Memory)
        # -------------------------------------------------------------
        residual2 = x_mid
        norm_mid = self.norm2(x_mid)

        # Compute queries: [B, K, num_heads, head_dim]
        q = self.q_proj(norm_mid).view(batch_size, k_tokens, self.num_heads, self.head_dim)
        q = q.transpose(1, 2) # [B, num_heads, K, head_dim]

        # Multi-head attention directly over target_k_cache, target_v_cache
        # In production, FlashInfer / PagedAttention handles GQA mapping
        scale = 1.0 / math.sqrt(self.head_dim)
        scores = torch.matmul(q, target_k_cache.transpose(-2, -1)) * scale
        attn_weights = F.softmax(scores, dim=-1)
        attn_out = torch.matmul(attn_weights, target_v_cache) # [B, num_heads, K, head_dim]

        attn_out = attn_out.transpose(1, 2).contiguous().view(batch_size, k_tokens, -1)
        out = residual2 + self.attn_out(attn_out)

        return out
```

### Empirical Production Benchmarks & Telemetry

H-Spec was evaluated on an 8x NVIDIA H100 SXM5 GPU cluster running vLLM 0.6.4. The evaluation paired Meta Llama-3-8B-Instruct (target model) and Llama-3.1-70B-Instruct (target model) against diverse workloads: Spec-Bench, GSM8K (multi-step math reasoning), MT-Bench (multi-turn dialogue), and HumanEval (code synthesis).

The baseline systems include:
1. **Autoregressive Baseline:** Standard single-token generation via vLLM.
2. **Medusa-2:** Multi-head parallel drafting without hidden state injection.
3. **DFlash:** Block parallel drafting utilizing a dedicated auxiliary drafter KV cache.
4. **H-Spec:** Hybrid Mamba-Attention drafting with zero auxiliary KV cache.

#### Drafting Acceptance Length ($\alpha$) Across Benchmarks

The mean accepted token length $\alpha$ measures the average number of tokens successfully verified per speculative cycle ($K = 5$ tokens proposed per step).

| Workload Benchmark | Task Domain | Autoregressive | Medusa-2 ($\alpha$) | DFlash ($\alpha$) | H-Spec ($\alpha$) | H-Spec Improvement vs DFlash |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Spec-Bench Multi-Turn** | General Conversation | 1.00 | 2.62 | 3.41 | **3.82** | **+12.0%** |
| **GSM8K CoT Reasoning** | Mathematical Logic | 1.00 | 1.94 | 2.85 | **3.24** | **+13.7%** |
| **HumanEval Code Generation** | Syntax & Structure | 1.00 | 2.88 | 3.52 | **3.91** | **+11.1%** |
| **MT-Bench Multi-Domain** | Complex QA & Coding | 1.00 | 2.45 | 3.28 | **3.65** | **+11.3%** |
| **Average Across Suites** | Overall Acceptance | 1.00 | 2.47 | 3.26 | **3.66** | **+12.3%** |

H-Spec consistently outperforms DFlash by 11 to 13 percent in acceptance length. The combination of Mamba's global sequence state and in-place target attention prevents the distribution drift common in purely attention-based or independent drafters.

#### Serving Throughput and VRAM Utilization Under High Concurrency

In production serving, speculative speedup must translate into higher aggregate request throughput under heavy batch concurrency ($B = 32$, input prompt length $S_{\text{in}} = 4,096$, output generation $S_{\text{out}} = 1,024$).

```
+-----------------------------------------------------------------------------+
|               PEAK SERVING THROUGHPUT VS CONCURRENCY (VLLM)                 |
+-----------------------------------------------------------------------------+
|  Throughput (Tokens / Second / GPU)                                         |
|                                                                             |
|  2,000 |                                              ******* (H-Spec)       |
|        |                                       *******                       |
|  1,600 |                                *******       ####### (DFlash)       |
|        |                         *******       #######                       |
|  1,200 |                  *******       #######       ======= (Medusa-2)     |
|        |           *******       #######       =======                       |
|    800 |    *******       #######       =======                              |
|        |    -------       -------       -------       ------- (Autoregressive|
|    400 |    -------                                                          |
|        +----+-------------+-------------+-------------+                     |
|            B=8           B=16          B=32          B=64                    |
|                                Concurrency                                  |
|                                                                             |
|  At B=64, DFlash triggers KV cache thrashing and OOM block evictions,       |
|  while H-Spec sustains 2,140 tokens/sec due to zero auxiliary KV footprint. |
+-----------------------------------------------------------------------------+
```

| Serving Configuration ($B=32, S=8,192$) | KV Cache VRAM Usage | Mean Inter-Token Latency (P50) | Tail Latency (P99) | Peak Throughput | Concurrency Ceiling |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Autoregressive Serving** | 85.9 GB | 28.4 ms | 36.1 ms | 812 tok/s | 52 requests |
| **Medusa-2** | 85.9 GB | 14.2 ms | 19.8 ms | 1,420 tok/s | 52 requests |
| **DFlash (Auxiliary Drafter KV)** | 107.4 GB (+25.0%) | 11.8 ms | 17.4 ms | 1,780 tok/s | 41 requests (-21.1%) |
| **H-Spec (Hybrid In-Place + Mamba)** | **85.9 GB (0.0% Overhead)** | **9.9 ms** | **13.8 ms** | **2,140 tok/s** | **68 requests (+65.8%)** |

While DFlash suffers a 21 percent reduction in serving capacity due to memory overhead, H-Spec provides the highest throughput (2,140 tokens/sec) and lowest latency (9.9 ms P50) while maintaining the original memory ceiling of the target model.

### Production Architectural Rules for Infrastructure Teams

Senior infrastructure engineers deploying speculative decoding in large-scale inference runtimes should adhere to these concrete rules:

1. **Enforce the Single-Page-Table Invariant:**
   Never maintain parallel PagedAttention block tables for auxiliary draft models in production clusters. Managing dual page tables multiplies memory fragmentation and causes unpredictable out-of-memory crashes when sequence lengths exceed 8,192 tokens. Use drafters that bind in place to existing target KV allocations.

2. **Last-Token Projection Placement:**
   Inject the target hidden state from the last input position $T$ at the very boundary between prefill and decode phases. In multi-GPU tensor-parallel configurations (TP=4 or TP=8), ensure $h_T$ is projected locally on each GPU rank before Mamba associative scanning to avoid inter-GPU communication over NVLink during drafting.

3. **Mamba Block Sizing vs Draft Horizon $K$:**
   Set the candidate draft block size to $K = 4$ for high-concurrency workloads ($B \ge 32$) and $K = 6$ for low-latency batch-1 workloads. Exceeding $K = 8$ yields diminishing returns because verification kernel overhead begins to dominate target forward execution.

4. **Quantization Alignment:**
   When running FP8 or INT4 quantized target models, maintain in-place attention binding by configuring the drafter cross-attention kernel to dequantize target KV blocks on the fly into FP16 registers. This preserves low memory traffic without requiring quantized drafter weights.

H-Spec demonstrates that speculative drafting does not require duplicating memory state. By combining in-place memory reuse with targeted state space conditioning, systems engineers can eliminate auxiliary memory tax and unlock the true throughput potential of frontier LLM serving.
:::

---

### Sources
- Primary Research Paper: [arXiv:2609.24197 - H-Spec: Parallel Speculative Decoding Without a Drafter-Side KV Cache](https://arxiv.org/abs/2609.24197)
- Apple Machine Learning Research: [apple.com/research](https://machinelearning.apple.com/research)
- OpenReview Conference Proceedings: [openreview.net/forum?id=h-spec](https://openreview.net)
- High-Performance Serving Framework: [vLLM Project Documentation](https://docs.vllm.ai)
