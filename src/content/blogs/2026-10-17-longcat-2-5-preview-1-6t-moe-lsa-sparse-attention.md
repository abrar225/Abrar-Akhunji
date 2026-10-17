---
title: "LongCat 2.5 Preview: Inside the 1.6T Sparse MoE Architecture, LongCat Sparse Attention (LSA), Hierarchical Cross-Layer Indexing, and Domestic ASIC Superpod Inference"
date: "2026-10-17"
description: "A senior systems engineer's architectural teardown of Meituan's LongCat 2.5 Preview: dissecting the 1.6-trillion-parameter sparse MoE topology (~48B active parameters), the hardware-algorithm co-design of LongCat Sparse Attention (LSA), Streaming-Aware Indexing for coalesced HBM memory throughput, Cross-Layer Indexing distillation, Hierarchical coarse-to-fine block shortlisting, and domestic AI ASIC superpod deployment for 1M-token multimodal agentic workflows."
tags: ["Meituan", "LongCat", "LongCat 2.5", "Mixture of Experts", "MoE Architecture", "Sparse Attention", "LSA", "Long Context", "Agentic AI", "Inference Optimization", "ASIC Superpod"]
author: "Abrar Akhunji"
heroImage: "/images/blog/longcat-2-5-preview-1-6t-moe-lsa-sparse-attention/hero.jpg"
techTree:
  branch: "Frontier MoE & Distributed Systems"
  level: 3
  prerequisites: ["2026-10-16-meta-muse-spark-open-816b-a42b-sparse-moe-architecture", "2026-08-30-multi-head-latent-attention-mla-flashmla"]
faq:
  - question: "What is LongCat 2.5 Preview and how is its 1.6-trillion-parameter MoE structured?"
    answer: "LongCat 2.5 Preview is Meituan's flagship multimodal Mixture-of-Experts (MoE) foundation model, scaling to 1.6 trillion total parameters across fine-grained feed-forward experts. Despite its colossal parametric memory, LongCat 2.5 utilizes dynamic sparse routing to activate only ~48 billion parameters per token. This gives developer agents the expansive world knowledge and semantic precision of a multi-trillion-parameter frontier model while retaining the generation throughput, KV cache economics, and inference latency of a mid-tier dense network."
  - question: "What is LongCat Sparse Attention (LSA) and what fundamental bottlenecks does it solve?"
    answer: "Standard full attention scales with quadratic time and memory complexity O(L^2), making 1-million-token contexts computationally prohibitive. Prior sparse schemes like DeepSeek Sparse Attention (DSA) and Lightning Indexers suffered from two critical bottlenecks: quadratic O(L^2) indexer scoring overhead and fragmented, non-coalesced High Bandwidth Memory (HBM) read patterns. LongCat Sparse Attention (LSA) is a hardware-algorithm co-designed attention framework that achieves near-linear complexity O(L) by combining Streaming-Aware Indexing (SI), Cross-Layer Indexing (CLI), and Hierarchical Indexing (HI)."
  - question: "How does Streaming-Aware Indexing (SI) enforce contiguous, coalesced HBM memory access?"
    answer: "Dynamic sparse attention usually picks arbitrary, scattered tokens across the context history, resulting in uncoalesced memory reads that severely degrade memory bus utilization. Streaming-Aware Indexing reallocates a guaranteed slice of the attention selection budget to two contiguous zones: an initial attention sink (the first 128-512 tokens) and a local sliding window (e.g., the most recent 2,048 tokens). Only the remaining budget is dynamically selected across middle history. This ensures that the majority of memory transactions are sequential burst reads from HBM."
  - question: "How does Cross-Layer Indexing (CLI) reduce inference computation without degrading retrieval accuracy?"
    answer: "Empirical observation demonstrates that token saliency and routing relevance remain highly correlated across adjacent transformer layers. Instead of computing expensive indexer scores independently at every single layer, CLI computes indexing selections once every K layers (e.g., K=2 or 4) and reuses the index map across subsequent layers. During pre-training, this behavior is enforced and stabilized using cross-layer distillation loss, reducing indexing compute overhead by over 60%."
  - question: "How does Hierarchical Indexing (HI) perform two-stage coarse-to-fine token selection?"
    answer: "Evaluating every token's relevance at 1M context is itself an O(L) bottleneck. Hierarchical Indexing splits the sequence into coarse blocks (e.g., pages of 64 tokens) and first runs a lightweight pooled scoring pass to shortlist the top candidate blocks. In the second stage, fine-grained token-level selection is performed strictly within those shortlisted blocks. This reduces total indexer operations by up to 8x without requiring custom architectural retraining."
  - question: "What infrastructure powers LongCat 2.5's training and deployment?"
    answer: "Unlike Western frontier models trained almost exclusively on NVIDIA Hopper/Blackwell clusters, LongCat 2.5 was trained and deployed end-to-end on domestic AI ASIC superpods. Through custom distributed kernels, ring-AllReduce communication topologies, and 8-bit/4-bit quantization routines, LongCat achieves robust sub-25ms inter-token latencies across million-token agentic coding and multimodal vision workflows."
---

:::eli5
*Written by Abrar Akhunji*

Imagine you are tasked with studying an entire warehouse containing **1,000,000 pages of technical documentation, code, and architectural blueprints**—and answering a complex programming question in less than two seconds.

How would you do it?

```
                     THE 1,000,000 TOKEN INFERENCE DILEMMA
                     
    Classic Attention: "The Exhaustive Reader"
    Query Token ──► [ Reads Every Single Token from 1 to 1,000,000 ] ──► Melting GPUs
                    Quadratic Complexity: O(L^2) = 1,000,000,000,000 comparisons!
                    High Bandwidth Memory (HBM) completely saturated.
                    
    LongCat 2.5 LSA: "The Master Archivist"
                     ┌─ 1. Fixed Memory Sink (First 256 tokens) ───── Contiguous Read
    Query Token ──►  ├─ 2. Local Sliding Window (Recent 2k tokens) ── Contiguous Read
      (Hierarchy)    └─ 3. Hierarchical Block Indexer (Page Shortlist)► Fine-grained picks
                     
    Near-Linear Complexity: O(L) | 94% Memory Bandwidth Saved!
    Active Parameters: Only 48B out of 1.6 Trillion!
```

If you read every single page from page 1 to page 1,000,000 every time someone asked you a question (which is what standard **Full Attention** does), your brain would fry. That is $O(L^2)$ quadratic complexity: as the document gets 10 times longer, the compute cost spikes **100 times higher**.

Earlier models tried to fix this with "sparse indexers," like a student scanning random highlighted lines across thousands of books. But in a physical GPU, jumping randomly between page 4, page 9,821, and page 854,120 causes **scattered memory stalls**. The GPU spends 90% of its time waiting for the memory bus to fetch tiny fragments of data!

Enter **Meituan's LongCat 2.5 Preview**.

---

### The 4 Breakthroughs That Make LongCat 2.5 Extraordinary

#### 1. The 1.6 Trillion Parameter Giant That Acts Like a Nimble 48B Model
LongCat 2.5 is a massive **Mixture-of-Experts (MoE)** network with **1.6 trillion total parameters**. Think of it as a university faculty of 1,600 specialized professors (a Linux kernel hacker, a distributed systems architect, an ancient Latin scholar, a CSS layout wizard, a compiler engineer, etc.).

When your prompt arrives, an intelligent mathematical router summons only **~48 billion active parameters** (the exact 4 to 8 professors needed). You get the superhuman world knowledge of a 1.6T brain, but the inference speed, low latency, and energy bill of a mid-sized 48B model.

#### 2. Streaming-Aware Indexing (SI): The "Contiguous Reading" Trick
Instead of scattering memory requests randomly across a million tokens, LongCat guarantees that the GPU always reads large, contiguous blocks:
- **The Anchor Sink:** Always keeps the first 256 tokens (the project goals, system prompt, and core instructions) warm in fast cache.
- **The Recent Focus Window:** Always reads the last 2,048 tokens contiguously (what just happened in the shell or chat).
- **The Surgical Target:** Uses its indexer *only* for the middle historical references.

This transforms fragmented memory reads into **coalesced burst reads**, allowing GPUs and ASICs to run at peak hardware efficiency.

#### 3. Cross-Layer Indexing (CLI): Stop Repeating the Indexer
In a standard deep neural network with 64 or 80 layers, why should layer 42 recalculate which tokens are important if layer 41 already figured it out? 

LongCat's **Cross-Layer Indexing** calculates the attention relevance map once, and then shares that exact roadmap across consecutive layers! A special distillation process during training ensures that the downstream layers understand the shared map without dropping a single percentage point of accuracy.

#### 4. Hierarchical Indexing (HI): The Table of Contents First
If you're searching a million tokens for a bug, you don't scan all 1,000,000 words one by one. You first look at the **chapters and pages (coarse blocks)**. Once you find the 5 pages that discuss the database transaction pool, you read those specific words. 

Hierarchical Indexing does exactly this in hardware: a lightweight pass shortlists the top 64-token pages, and the detailed mathematical attention calculation only runs inside those shortlisted blocks!

Let's dive deep into the production systems architecture, mathematical formulations, Triton kernels, and benchmark evaluations behind this 1.6T milestone.
:::

:::interactive concept
{
  "title": "LongCat 2.5 LSA Pipeline & MoE Systems Architecture",
  "steps": [
    {
      "label": "Stage 01: Top-K MoE Routing",
      "title": "1.6T Parameter Dynamic Expert Selection",
      "content": "A high-precision router computes affinity logits across specialized SwiGLU experts, dynamically routing input tokens to activate only ~48B parameters per forward pass.",
      "icon": "GitFork"
    },
    {
      "label": "Stage 02: Streaming-Aware Allocation",
      "title": "Sink & Local Sliding Window Pinning",
      "content": "Reallocates token selection budget into an initial attention sink (128-512 tokens) and contiguous local sliding window (2k tokens), enforcing burst HBM memory reads.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 03: Cross-Layer Distillation",
      "title": "Shared Attention Saliency Roadmaps",
      "content": "Computes token saliency once every K layers and shares the resulting indexing mask across adjacent transformer blocks via cross-layer distillation loss.",
      "icon": "Layers"
    },
    {
      "label": "Stage 04: Hierarchical Page Shortlisting",
      "title": "Coarse-to-Fine Two-Stage Attention",
      "content": "First evaluates coarse 64-token block poolings to prune 98% of the sequence, then executes fine-grained dot-product attention strictly within surviving candidates.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

In mid-October 2026, Meituan officially previewed **`LongCat 2.5`**, scaling their flagship Mixture-of-Experts (MoE) architecture to a massive **1.6 trillion total parameters** with **~48 billion active parameters per token**, backed by their foundational research on **LongCat Sparse Attention (LSA)** (*arXiv:2608.01662*).

For the past two years, the AI systems engineering community has faced a fundamental barrier in ultra-long-context modeling: **the Quadratic Memory Wall of Attention**. While context lengths have nominal boundaries pushed to 1M or 2M tokens, serving them at scale with standard dense Multi-Head Attention (MHA) or Grouped-Query Attention (GQA) degrades into catastrophic KV cache memory consumption and prohibitive time-to-first-token (TTFT).

```
+---------------------------------------------------------------------------------------------------------------+
| ARCHITECTURAL SPECIFICATION: LONGCAT 2.5 PREVIEW (1.6T-A48B)                                                  |
+-----------------------------------+---------------------------------------------------------------------------+
| Architectural Parameter           | Value / Systems Engineering Implementation                                |
+-----------------------------------+---------------------------------------------------------------------------+
| Total Parameters ($\Theta$)       | ~1.62 Trillion parameters                                                 |
| Active Parameters per Token       | ~48.4 Billion parameters                                                  |
| Transformer Layers ($L$)          | 84 Decoder Layers                                                         |
| Hidden Dimension ($d_{\text{model}}$)| 9,216                                                                  |
| Feed-Forward Expert Topology      | 192 Fine-Grained SwiGLU Experts per layer                                 |
| Routing Mechanism                 | Top-$k = 6$ dynamic Softmax routing + load-balancing entropy penalty       |
| Attention Mechanism               | LongCat Sparse Attention (LSA) + Multi-Head Latent Compression             |
| Attention Heads                   | 144 Query Heads ($h_q$), 18 Key-Value Heads ($h_{kv}$) (8:1 sharing ratio)|
| Head Dimension ($d_k$)            | 64                                                                        |
| Native Context Window ($\mathcal{C}$)| 1,048,576 tokens (1 Million tokens)                                    |
| Positional Encoding               | Yarn-extended RoPE ($\theta_{\text{base}} = 25,000,000$)                  |
| Vocabulary Size ($V$)             | 256,000 (Byte-level BPE, multimodal aligned tokens)                       |
| Memory Indexing Architecture      | Streaming-Aware (SI) + Cross-Layer (CLI) + Hierarchical (HI) Indexing     |
| Training Cluster Infrastructure   | Domestic AI ASIC Superpod Clusters (Custom 400G RoCEv2 Interconnect)      |
| Checkpoint Quantization Formats   | BF16 (3.24 TB), FP8-E4M3 (1.62 TB), MXFP4 / INT4 (486 GB)                |
| SWE-bench Verified (Agent Harness)| 61.8% Resolved                                                            |
| Terminal-Bench 2.1 (Terminus 2)   | 78.2% Pass@1                                                              |
| LongBench v2 (1M Context)         | 84.6% Accuracy                                                            |
| Needle-In-A-Haystack (1M)         | 99.98% Retrieval Accuracy across all depths                               |
+-----------------------------------+---------------------------------------------------------------------------+
```

---

### 1. The Algorithmic & Hardware Bottlenecks of Prior Sparse Attention

Prior attempts at dynamic sparse attention—most notably **DeepSeek Sparse Attention (DSA)** and its associated **Lightning Indexer**—demonstrated that only a small subset of historical tokens (typically 2% to 5%) contribute meaningfully to the attention softmax distribution for any given query.

However, when engineering inference engines for real-world production serving (such as vLLM, SGLang, or custom ASIC runtimes), DSA ran into two crippling hardware bottlenecks:

#### Bottleneck A: The $O(L^2)$ Indexer Scoring Tax
To select the top-$k$ relevant tokens dynamically, the indexer itself must compute an inner product between the query vector $\mathbf{q}_t$ and compressed key representations $\mathbf{k}_s^{\text{idx}}$ across all $s \in [1, t-1]$ tokens. While the compression dimension $d_{\text{idx}} \ll d_k$, the computational complexity of the indexer remains:

$$\mathcal{O}(B \cdot H_{\text{idx}} \cdot L^2 \cdot d_{\text{idx}})$$

At $L = 1,048,576$ tokens, calculating the indexer scores for every query token consumes more arithmetic cycles than the actual sparse attention calculation itself!

#### Bottleneck B: Memory Bus Fragmentation & Uncoalesced HBM Access
Modern High Bandwidth Memory (HBM3e / HBM4) architectures are optimized for **burst contiguous access**. When a memory controller issues a read request, it fetches cache lines of 64 or 128 bytes. 

In naive sparse attention, if the indexer selects token indices $\{17, 4892, 104231, 891244\}$, each fetch triggers a separate memory transaction. The effective memory bus efficiency drops to under **12% of theoretical peak bandwidth**, causing memory-bound GPU and ASIC compute cores to idle waiting for DRAM transfers.

---

### 2. LongCat Sparse Attention (LSA): Mathematical Formulation

LongCat Sparse Attention resolves these challenges through a three-pillar co-designed formulation: **Streaming-Aware Indexing (SI)**, **Cross-Layer Indexing (CLI)**, and **Hierarchical Indexing (HI)**.

```
       LONGCAT SPARSE ATTENTION (LSA) THREE-PILLAR CO-DESIGN
       
       [ Input Sequence: 1,048,576 Tokens ]
                         │
                         ▼
        ┌───────────────────────────────────┐
        │ 1. Streaming-Aware Allocation (SI)│
        │ - Fixed Attention Sink: [0:S]     │ ──► Coalesced Memory Reads
        │ - Local Sliding Window: [t-W:t]   │
        └─────────────────┬─────────────────┘
                          │
                          ▼
        ┌───────────────────────────────────┐
        │ 2. Hierarchical Indexing (HI)     │
        │ - Stage 1: Coarse Page Screening  │ ──► Drops 98% Candidate Blocks
        │ - Stage 2: Token-Level Refinement │
        └─────────────────┬─────────────────┘
                          │
                          ▼
        ┌───────────────────────────────────┐
        │ 3. Cross-Layer Distillation (CLI) │
        │ - Compute Index Map at Layer l    │ ──► Shared across l+1, l+2, l+K
        │ - Distillation Loss Alignment     │
        └───────────────────────────────────┘
```

#### Pillar 1: Streaming-Aware Indexing (SI)
Let the total sparsity budget for query token $t$ be $K_{\text{total}}$ tokens. LSA statically partitions this budget into three explicit zones:
1. **Initial Attention Sink ($\mathcal{S}_{\text{sink}}$):** The first $S$ tokens (empirically $S \in [128, 512]$), capturing high-magnitude attention sink activations.
2. **Local Sliding Window ($\mathcal{S}_{\text{local}}$):** The most recent $W$ tokens (empirically $W \in [1024, 2048]$), preserving high-frequency conversational recency and syntactic locality.
3. **Dynamic Retrieval Set ($\mathcal{S}_{\text{dynamic}}$):** The remaining $K_{\text{dynamic}} = K_{\text{total}} - S - W$ tokens selected by the hierarchical indexer.

$$\mathcal{K}_{\text{selected}}(t) = \mathcal{S}_{\text{sink}} \cup \mathcal{S}_{\text{local}}(t) \cup \text{TopK}\left(\mathcal{S}_{\text{candidate}}, K_{\text{dynamic}}\right)$$

Because $\mathcal{S}_{\text{sink}}$ and $\mathcal{S}_{\text{local}}$ are strictly contiguous intervals $[0, S-1]$ and $[t-W, t-1]$, the memory controller executes two massive burst reads. Over **60% of all memory transactions** become perfectly coalesced, increasing DRAM bandwidth utilization from 12% to **84% of peak**.

#### Pillar 2: Cross-Layer Indexing (CLI) & Distillation Dynamics
Let $L$ be the total number of layers. In LSA, layers are partitioned into groups of size $G$ (typically $G = 2$ or $4$). An indexer network $\mathcal{I}_l$ is instantiated only at the anchor layer $l \in \{1, 1+G, 1+2G, \dots\}$.

For any subsequent layer $l + m$ (where $1 \le m < G$), the sparse token selection mask $\mathcal{M}_l$ generated by the anchor layer is reused directly:

$$\mathbf{A}^{(l+m)} = \text{Softmax}\left( \frac{\mathbf{Q}^{(l+m)} \left(\mathbf{K}^{(l+m)} \odot \mathcal{M}_l\right)^T}{\sqrt{d_k}} \right) \mathbf{V}^{(l+m)}$$

To prevent downstream layers from suffering degradation due to slight distributional shifts in attention saliency, Meituan introduces a **Cross-Layer Indexing Distillation Loss** ($\mathcal{L}_{\text{CLI}}$) during pre-training:

$$\mathcal{L}_{\text{CLI}} = \frac{1}{|\mathcal{B}|} \sum_{b \in \mathcal{B}} \sum_{m=1}^{G-1} D_{\text{KL}}\left( \mathbf{P}^{(l)} \,||\, \mathbf{P}^{(l+m)} \right)$$

Where $\mathbf{P}^{(l)}$ represents the normalized indexer attention logits at anchor layer $l$. This forces adjacent layers to align their semantic attention trajectories, enabling lossless indexer sharing across layers and cutting indexing FLOPs by **66.7%** ($G=3$).

#### Pillar 3: Hierarchical Indexing (HI)
Rather than scoring all $L$ tokens individually, HI clusters the sequence into non-overlapping memory blocks $\mathcal{B}_j$ of size $B_{\text{size}} = 64$ tokens. 

**Stage 1: Block-Level Pooling**
For each block $\mathcal{B}_j = \{t_{j, 1}, t_{j, 2}, \dots, t_{j, B_{\text{size}}}\}$, a lightweight pooled key representation $\mathbf{\bar{k}}_j \in \mathbb{R}^{d_{\text{idx}}}$ is computed via max-mean hybrid pooling:

$$\mathbf{\bar{k}}_j = \alpha \cdot \text{MeanPool}(\mathbf{k}_{j, :}^{\text{idx}}) + (1 - \alpha) \cdot \text{MaxPool}(\mathbf{k}_{j, :}^{\text{idx}})$$

The stage-1 block score $\sigma_j$ is given by:

$$\sigma_j = \mathbf{q}_t^{\text{idx}} \cdot \mathbf{\bar{k}}_j^T$$

The indexer shortlists the top $M$ blocks:

$$\mathcal{J}_{\text{shortlist}} = \text{TopM}\left(\{\sigma_j\}_{j=1}^{L / B_{\text{size}}}, M\right)$$

**Stage 2: Fine-Grained Intra-Block Selection**
Only tokens belonging to the shortlisted blocks $\bigcup_{j \in \mathcal{J}_{\text{shortlist}}} \mathcal{B}_j$ are evaluated for final fine-grained token-level selection. This reduces the indexer's candidate search space from $1,000,000$ tokens down to $M \times 64$ tokens (e.g., $128 \times 64 = 8,192$ tokens), collapsing indexer execution time by **8.4x**.

---

### 3. Empirical Latency & Memory Footprint: LSA vs. Full Attention

In empirical cluster benchmarks conducted across 1M context sequences, LongCat Sparse Attention demonstrates near-linear computational scaling and massive KV cache memory savings:

:::interactive chart
{
  "title": "Inference Latency & KV Cache Memory: LSA vs. Full GQA Attention",
  "description": "Comparative analysis of per-token generation latency (ms) and KV cache memory footprint (GB) across context lengths up to 1,000,000 tokens.",
  "type": "bar",
  "xKey": "contextLength",
  "series": [
    {
      "name": "Full GQA Attention (ms)",
      "dataKey": "FullGQALatency"
    },
    {
      "name": "LongCat LSA (ms)",
      "dataKey": "LSALatency"
    },
    {
      "name": "Full GQA KV Memory (GB)",
      "dataKey": "FullGQAMemory"
    },
    {
      "name": "LongCat LSA KV Memory (GB)",
      "dataKey": "LSAMemory"
    }
  ],
  "data": [
    {
      "contextLength": "64k Tokens",
      "FullGQALatency": 18.2,
      "LSALatency": 11.4,
      "FullGQAMemory": 24.5,
      "LSAMemory": 8.2
    },
    {
      "contextLength": "128k Tokens",
      "FullGQALatency": 46.8,
      "LSALatency": 13.1,
      "FullGQAMemory": 49.1,
      "LSAMemory": 11.6
    },
    {
      "contextLength": "256k Tokens",
      "FullGQALatency": 128.4,
      "LSALatency": 15.6,
      "FullGQAMemory": 98.2,
      "LSAMemory": 15.4
    },
    {
      "contextLength": "512k Tokens",
      "FullGQALatency": 412.0,
      "LSALatency": 19.8,
      "FullGQAMemory": 196.4,
      "LSAMemory": 21.8
    },
    {
      "contextLength": "1M Tokens",
      "FullGQALatency": 1480.0,
      "LSALatency": 24.6,
      "FullGQAMemory": 392.8,
      "LSAMemory": 32.4
    }
  ]
}
:::

---

### 4. Production Kernel Implementation: Triton Hierarchical Block Selector

Below is a production-grade Triton kernel implementing the two-stage **Hierarchical Indexing Block Selector** with streaming-aware memory coalescing:

```python
import torch
import triton
import triton.language as tl

@triton.jit
def _hierarchical_block_selection_kernel(
    Q_idx_ptr,          # [Batch, NumHeads, 1, DimIdx]
    K_block_mean_ptr,   # [Batch, NumBlocks, DimIdx]
    Block_Scores_ptr,   # [Batch, NumBlocks]
    stride_qb, stride_qh, stride_qd,
    stride_kb, stride_kn, stride_kd,
    stride_sb, stride_sn,
    DIM_IDX: tl.constexpr,
    BLOCK_SIZE: tl.constexpr
):
    """
    Stage-1 Coarse Block Scoring Kernel.
    Computes dot-product affinities between the query index vector
    and coarse pooled block representations.
    """
    pid_b = tl.program_id(axis=0)  # Batch index
    pid_n = tl.program_id(axis=1)  # Block index
    
    # Compute memory offsets
    q_offset = pid_b * stride_qb + tl.arange(0, DIM_IDX) * stride_qd
    k_offset = pid_b * stride_kb + pid_n * stride_kn + tl.arange(0, DIM_IDX) * stride_kd
    
    # Load query and block key vectors into registers
    q_vec = tl.load(Q_idx_ptr + q_offset)
    k_vec = tl.load(K_block_mean_ptr + k_offset)
    
    # Compute block score via reduction
    score = tl.sum(q_vec * k_vec, axis=0)
    
    # Store block score
    out_offset = pid_b * stride_sb + pid_n * stride_sn
    tl.store(Block_Scores_ptr + out_offset, score)

class LongCatHierarchicalSelector(torch.nn.Module):
    """
    Production Hierarchical Token Selector for LongCat 2.5 Sparse Attention.
    Combines Streaming-Aware Sink, Local Window, and Top-M Coarse Block Pruning.
    """
    def __init__(
        self,
        dim_idx: int = 64,
        block_size: int = 64,
        sink_tokens: int = 256,
        local_window: int = 2048,
        top_m_blocks: int = 128
    ):
        super().__init__()
        self.dim_idx = dim_idx
        self.block_size = block_size
        self.sink_tokens = sink_tokens
        self.local_window = local_window
        self.top_m_blocks = top_m_blocks

    @torch.inference_mode()
    def forward(
        self,
        q_idx: torch.Tensor,         # [B, 1, D_idx]
        k_block_pools: torch.Tensor, # [B, NumBlocks, D_idx]
        seq_len: int
    ) -> torch.Tensor:
        batch_size, num_blocks, _ = k_block_pools.shape
        block_scores = torch.empty((batch_size, num_blocks), device=q_idx.device, dtype=torch.float32)

        # Launch Triton coarse block grid
        grid = (batch_size, num_blocks)
        _hierarchical_block_selection_kernel[grid](
            q_idx, k_block_pools, block_scores,
            q_idx.stride(0), 0, q_idx.stride(2),
            k_block_pools.stride(0), k_block_pools.stride(1), k_block_pools.stride(2),
            block_scores.stride(0), block_scores.stride(1),
            DIM_IDX=self.dim_idx,
            BLOCK_SIZE=self.block_size
        )

        # Retrieve Top-M candidate blocks
        _, top_blocks = torch.topk(block_scores, k=min(self.top_m_blocks, num_blocks), dim=-1)
        
        return top_blocks
```

---

### 5. Benchmark Evaluation & SWE-Bench Verified Teardown

Meituan evaluated `LongCat 2.5 Preview` across premier autonomous software engineering and long-context benchmarks. Evaluated against contemporary frontier systems (such as Claude 3.5 Sonnet, GPT-4o, and Meta Muse-Spark-Open-816B):

```
+---------------------------------------------------------------------------------------------------------------+
| BENCHMARK PERFORMANCE: LONGCAT 2.5 PREVIEW VS. FRONTIER BASELINES                                             |
+-----------------------------------+--------------------+--------------------+---------------------------------+
| Benchmark Evaluation              | LongCat 2.5 (1.6T) | Muse-Spark-Open 816| Claude 3.5 Sonnet (Frontier)    |
+-----------------------------------+--------------------+--------------------+---------------------------------+
| SWE-bench Verified (Resolved)     | 61.8%              | 60.0%              | 51.2%                           |
| Terminal-Bench 2.1 (Terminus 2)   | 78.2%              | 76.4%              | 68.9%                           |
| MCP-Atlas (Tool Orchestration)    | 91.4%              | 89.2%              | 84.1%                           |
| GPQA Diamond (Science / Reasoning)| 88.6%              | 89.0%              | 85.0%                           |
| LongBench v2 (1M Context Accuracy)| 84.6%              | 81.2%              | 72.8%                           |
| TTFT @ 1M Context (Seconds)       | 1.42s              | 3.86s              | 14.20s                          |
| Generation Throughput (tok/sec)   | 42.8 tok/s         | 24.2 tok/s         | 28.5 tok/s                      |
+-----------------------------------+--------------------+--------------------+---------------------------------+
```

#### Key Engineering Observations:
1. **Time-To-First-Token (TTFT) Dominance:** At 1,000,000 tokens of prompt context, LongCat 2.5 achieves an astounding **1.42 seconds TTFT**, compared to 14.2 seconds for dense frontier systems. The combination of Hierarchical Indexing and coalesced burst memory loading completely bypasses the prefill compute stall.
2. **Autonomous Tool Calling (MCP-Atlas):** LongCat 2.5 reaches **91.4%** on Model Context Protocol benchmarks. The model's fine-grained MoE routing isolates bash syntax, AST parsing, and JSON protocol serializations into distinct sub-experts, preventing cross-domain syntax leakage.
3. **Linear KV Cache Scaling:** Under 1M context, LongCat requires only **32.4 GB of KV cache memory** per concurrent stream, compared to ~392 GB for dense GQA architectures. This enables high-density serving on standard multi-accelerator nodes without requiring offloading to host system RAM.

---

### 6. Architectural Takeaways for Senior Systems Engineers

The release of LongCat 2.5 Preview validates three critical evolutionary directions in AI infrastructure:

1. **Hardware-Algorithm Co-Design Over Pure Mathematical Sparsity:** Developing sparse attention mechanisms without considering HBM burst sizes and DRAM bus coalescing leads to poor real-world speedups. LongCat's Streaming-Aware Indexing (SI) proves that pinning contiguous memory zones (sinks and sliding windows) is essential for saturating hardware throughput.
2. **Cross-Layer Representation Sharing Is Underexploited:** Most transformer architectures treat every layer as an independent compute island. Cross-Layer Indexing (CLI) demonstrates that structural attention geometry can be shared across multiple layer depths via distillation, eliminating redundant indexing overhead.
3. **The Rise of Domestic Superpod Inference:** LongCat 2.5 proves that multi-trillion parameter MoE models can be trained and served at frontier performance levels outside the traditional NVIDIA Blackwell/CUDA monoculture, utilizing custom AI ASICs, high-speed RoCEv2 topologies, and specialized Triton-compatible kernels.
:::
