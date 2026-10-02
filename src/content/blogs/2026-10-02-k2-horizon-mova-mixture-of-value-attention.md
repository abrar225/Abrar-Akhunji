---
title: "IFM K2 Horizon Deep Dive: Inside Mixture-of-Value Attention (MoVA), 2,880 Value Matrices, and the 36B-A4B Sparse Inference Frontier"
date: "2026-10-02"
description: "An architectural breakdown of IFM's K2 Horizon release and Mixture-of-Value Attention (MoVA): how routing tokens across 2,880 value projection matrices instead of FFN experts delivers 36B reasoning capacity with 4B active parameters, reshaping KV-cache scaling and agentic inference."
tags: ["K2 Horizon", "MoVA", "Mixture of Value Attention", "MoE", "Transformer Architecture", "LLM Inference", "vLLM", "Open Source AI", "Systems Engineering"]
author: "Abrar Akhunji"
heroImage: "/images/blog/k2-horizon-mova-mixture-of-value-attention/hero.jpg"
techTree:
  branch: "Transformer Architecture & Inference Scaling"
  level: 3
  prerequisites: ["2026-08-30-multi-head-latent-attention-mla-flashmla", "2026-09-06-qwen-3-8-flash-next-ngram-moe-mtp"]
faq:
  - question: "What is K2 Horizon and who developed it?"
    answer: "K2 Horizon is an open-source model family released under the Apache 2.0 license by the Institute of Foundation Models (IFM) at MBZUAI in October 2026. The family spans six models from 0.9B to 375B parameters, fully open-sourcing weights, training recipes, data mixtures, the xLLM infrastructure, and intermediate checkpoints."
  - question: "What is Mixture-of-Value Attention (MoVA) and how does it differ from traditional MoE?"
    answer: "Traditional Mixture-of-Experts (MoE) architectures (such as Mixtral, DeepSeek-V3, or Qwen MoE) apply conditional routing exclusively to the Feed-Forward Network (FFN) blocks while keeping the Multi-Head Attention layers dense. MoVA shifts sparse routing directly into the Multi-Head Attention layer by dynamically routing input tokens across a large pool of specialized Value projection matrices (W_v) while keeping Query and Key projections shared. This decouples parametric representation capacity from inference compute."
  - question: "How does the K2-Horizon-MoVA-36B-A4B model achieve 4B active parameter compute with 36B capacity?"
    answer: "The 36B-A4B architecture contains 45 transformer layers, with each layer hosting 64 distinct Value projection matrices (totaling 2,880 value matrices across the network). A lightweight gating network selects the Top-4 value experts per token. Because only 4 of the 64 value matrices and a compact shared FFN are activated per token, the compute footprint and FLOP count match a 4B dense model, while parameter capacity remains at 36B."
  - question: "What are the primary KV-cache implications of Mixture-of-Value Attention?"
    answer: "Because MoVA retains shared, dense Query and Key projections, attention score computation (Q K^T / sqrt(d_k)) remains structurally uniform across sequence positions. However, dynamically routed Value vectors introduce memory management trade-offs: either caching the pre-projection representations or caching the sparse dynamic value outputs. This requires specialized PagedAttention kernels in inference engines like vLLM and SGLang to prevent memory fragmentation and ensure high throughput during speculative decoding."
  - question: "How does K2-Horizon-MoVA perform on real-world engineering and agent benchmarks?"
    answer: "On agentic tool-use and coding benchmarks—such as Terminal-Bench 2.1 and tau3-Banking—K2-Horizon-MoVA-36B-A4B matches or exceeds the accuracy of 32B–70B dense models while delivering up to 4.2x higher generation throughput and a significantly lower Time-to-First-Token (TTFT) footprint on single-node GPU clusters."
  - question: "Is K2 Horizon supported in standard inference frameworks like vLLM and SGLang?"
    answer: "Yes, IFM collaborated with the vLLM and SGLang communities to provide Day-0 support. The implementation features fused Top-K Value router kernels, custom scatter-gather Triton primitives, and FlashAttention-3 integration for high-concurrency production deployments."
---

:::eli5
*Written by Abrar Akhunji*

Imagine a bustling restaurant kitchen staffed by talented chefs:

### The Traditional Transformer: "One Recipe Book, One Pantry"
In standard models (like Llama 3 or GPT-4), every time a customer orders a dish (a token), every single chef must read from the exact same recipe card, fetch ingredients from the exact same spice rack, and cook using the exact same pans. As the restaurant grows to serve complex 10-course meals, making the kitchen bigger means every chef must carry a heavier, slower tray.

### The Classic Mixture-of-Experts (MoE): "Specialized Pastry Chefs"
Models like Mixtral or DeepSeek made things faster by hiring 8 or 64 specialized chefs for the *dessert and plating phase* (the Feed-Forward Network). When a token arrives, an expeditor decides: *"Hey, this is a pastry order, route it to Chef 3 and Chef 7."* But before reaching the dessert station, every token still had to go through the exact same heavy, dense prep station (the Multi-Head Attention block).

---

### The K2 Horizon Revolution: Mixture-of-Value Attention (MoVA)
Released in early October 2026 by the **Institute of Foundation Models (IFM)** under the Apache 2.0 license, **K2 Horizon** introduces a radical architectural breakthrough called **Mixture-of-Value Attention (MoVA)**:

Instead of putting all the specialized experts at the back of the kitchen (in the FFN), MoVA puts the specialization **directly into how the model looks at information**.

1. **Universal Radar (Shared Query & Key):** Every token still scans the sentence with universal radar. The questions asked (*"Where is the subject?"*, *"What function was just called?"*) use shared coordinates so the model never gets disoriented.
2. **2,880 Specialized Ingredient Drawers (Dynamic Value Routing):** When it's time to actually pull meaning out of that token (the **Value vector**), the model opens only 4 out of 64 specialized drawers per layer.
   - One drawer specializes in Python AST syntax.
   - Another drawer specializes in algebraic constraints.
   - Another drawer holds conversational idioms.
3. **Massive Brain, Tiny Footprint:** The flagship **K2-Horizon-MoVA-36B-A4B** model stores **36 billion parameters** of world knowledge. But because it only pulls from 4 value drawers at any instant, your GPU only burns the electricity and computing power of a tiny **4 billion parameter model**!

```
Traditional FFN Mixture-of-Experts (Mixtral / DeepSeek):
[ Input Token ] ──> [ Dense Self-Attention (Q, K, V) ] ──> [ Router ] ──> [ Top-2 FFN Experts ] ──> [ Output ]
                     (All 100% compute active)                     (Sparse compute)

K2 Horizon Mixture-of-Value Attention (MoVA):
                    ┌──> Dense Query (Q) ────────────────────────┐
[ Input Token ] ────┼──> Dense Key (K) ──────────────────────────┼──> [ Attention Dot Product ]
                    └──> [ Value Router ] ──> [ Top-4 of 64      │                   │
                                              Value Matrices ] ──┘                   ▼
                                              (Ultra-Sparse V)          [ Scaled Weighted Sum ]
                                                                                     │
                                                                                     ▼
                                                                        [ Compact Shared FFN ]
                                                                                     │
                                                                                     ▼
                                                                                 [ Output ]
```

The result? Senior developers get the intelligence and agentic tool-calling reliability of a 70B parameter enterprise powerhouse, but with the lightning-fast inference speed and single-GPU friendliness of a 4B lightweight engine.

Let's dive under the hood to dissect the tensor math, Triton kernels, KV-cache engineering, and deployment recipes that make MoVA tick.
:::

:::dev
*Written by Abrar Akhunji*

In modern foundation model engineering, scaling parameter capacity while bounding inference latency has sparked an intense architectural arms race. While conditional computation through Feed-Forward Network Mixture-of-Experts (FFN-MoE)—popularized by Mixtral 8x7B, DeepSeek-V3, and Qwen-2.5-Max—succeeded in decoupling total model parameters from active FLOPs per token, it left the attention sub-layer fundamentally unoptimized.

Multi-Head Attention (MHA) and Grouped-Query Attention (GQA) remain structurally dense in existing architectures. As context lengths scale past 128k to 512k tokens, attention projections and KV data movement consume an increasingly dominant share of total memory bandwidth.

In October 2026, the **Institute of Foundation Models (IFM)** at MBZUAI open-sourced the **K2 Horizon** model family under the **Apache 2.0 license**. The centerpiece of this release is **Mixture-of-Value Attention (MoVA)**, an attention-level sparsity paradigm implemented in the flagship **K2-Horizon-MoVA-36B-A4B**.

Rather than delegating sparse routing solely to post-attention MLPs, MoVA dynamically routes token representations through an ensemble of **2,880 specialized Value projection matrices** across the model's 45 layers, activating only 4 Value experts per token.

```
+---------------------------------------------------------------------------------------------------+
| COMPARATIVE CONDITIONAL COMPUTATION PARADIGMS (OCTOBER 2026)                                      |
+--------------------------+------------------------+-----------------------+-----------------------+
| Architectural Dimension  | Standard Dense MHA/GQA | FFN-MoE (Mixtral/Qwen)| IFM MoVA (K2 Horizon) |
+--------------------------+------------------------+-----------------------+-----------------------+
| Attention Projection     | Dense (Q, K, V shared) | Dense (Q, K, V shared)| Sparse Value Routing  |
| Routing Target           | None (No routing)      | FFN Intermediate W1/W2| Value Projections W_v |
| Total Parameter Base     | 32B                    | 32B – 280B            | 36B (Flagship)        |
| Active Params per Token  | 32B (100%)             | 6.8B – 24B            | 4.1B (~11.4%)         |
| Value Expert Pool/Layer  | 1 (Dense)              | 1 (Dense)             | 64 Value Matrices     |
| Total Value Matrices     | 45 (1 per layer)       | 45 (1 per layer)      | 2,880 (across 45 lyr) |
| Top-K Dispatch           | N/A                    | Top-2 to Top-8        | Top-4 Value Experts   |
| Attention Coordinate Sync| Perfectly Aligned      | Perfectly Aligned     | Perfectly Aligned (QK)|
| KV-Cache Storage Format  | Static FP16/FP8 Tensors| Static FP16/FP8       | Dual-State / PagedMoVA|
| TTFT Latency Scaling     | O(N) Compute Heavy     | Moderate              | 3.8x Speedup vs Dense |
+--------------------------+------------------------+-----------------------+-----------------------+
```

---

### Section 1: The Mathematics of Mixture-of-Value Attention (MoVA)

To understand MoVA, recall the canonical scaled dot-product attention formulation for sequence representation $\mathbf{X} \in \mathbb{R}^{T \times d_{\text{model}}}$:

$$\mathbf{Q} = \mathbf{X} \mathbf{W}_q, \quad \mathbf{K} = \mathbf{X} \mathbf{W}_k, \quad \mathbf{V} = \mathbf{X} \mathbf{W}_v$$

$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{Softmax}\left(\frac{\mathbf{Q} \mathbf{K}^T}{\sqrt{d_k}}\right) \mathbf{V}$$

In traditional transformers, the Value matrix $\mathbf{W}_v \in \mathbb{R}^{d_{\text{model}} \times (N_h \cdot d_v)}$ forces a single, monolithic projection onto every token regardless of semantic modality, syntactic depth, or task orientation.

#### The MoVA Reformulation

MoVA preserves the unified relational space between Query and Key projections to maintain spatial and rotational attention alignment (e.g., via RoPE). However, it replaces the static $\mathbf{W}_v$ with a parametric bank of $E$ independent value expert matrices:

$$\mathcal{E}^{(l)} = \left\{ \mathbf{W}_{v, 1}^{(l)}, \mathbf{W}_{v, 2}^{(l)}, \dots, \mathbf{W}_{v, E}^{(l)} \right\}, \quad \text{where } \mathbf{W}_{v, i}^{(l)} \in \mathbb{R}^{d_{\text{model}} \times d_v}$$

For layer $l$ and token embedding $\mathbf{x}_t \in \mathbb{R}^{d_{\text{model}}}$, a parameterized routing gate $g^{(l)}(\mathbf{x}_t)$ computes unnormalized gating logits across all $E$ value matrices:

$$\mathbf{h}_t^{(l)} = \mathbf{x}_t \mathbf{W}_g^{(l)} + \mathbf{b}_g^{(l)}, \quad \mathbf{W}_g^{(l)} \in \mathbb{R}^{d_{\text{model}} \times E}$$

The router selects the Top-$k$ value experts with the highest gating affinities:

$$\mathcal{T}_t^{(l)} = \text{TopK}\left( \mathbf{h}_t^{(l)}, k \right) \subset \{1, \dots, E\}$$

The normalized expert dispatch probabilities $p_{t, i}^{(l)}$ are computed via a conditioned softmax over the selected set $\mathcal{T}_t^{(l)}$:

$$p_{t, i}^{(l)} = \begin{cases} 
\frac{\exp(h_{t, i}^{(l)})}{\sum_{j \in \mathcal{T}_t^{(l)}} \exp(h_{t, j}^{(l)})} & \text{if } i \in \mathcal{T}_t^{(l)} \\
0 & \text{otherwise}
\end{cases}$$

The dynamic sparse value projection $\mathbf{v}_t^{(l)}$ is synthesized as a convex combination of the activated value matrices:

$$\mathbf{v}_t^{(l)} = \sum_{i \in \mathcal{T}_t^{(l)}} p_{t, i}^{(l)} \cdot \left( \mathbf{x}_t \mathbf{W}_{v, i}^{(l)} \right)$$

Because $k \ll E$ (in K2 Horizon, $k=4$ and $E=64$), the computational FLOPs required to generate the value tensor are reduced by a factor of:

$$\text{FLOP Ratio} = \frac{k}{E} = \frac{4}{64} = 6.25\%$$

This dynamic value vector $\mathbf{V}_{\text{MoVA}}$ is then consumed by the standard attention dot-product weights, producing an expressive, token-adaptive representation without bloating the FLOP count during autoregressive decoding.

```
K2 HORIZON MOVA LAYER TOPOLOGY:

      [ Input Representation: x_t ]
             │
             ├───> [ W_q ] ───> Q_t (Shared Attention Query)
             │
             ├───> [ W_k ] ───> K_t (Shared Attention Key)
             │
             ├───> [ Router: W_g ] ───> Logits h_t ──> Top-4 Gate Selection
             │                                              │
             │         ┌────────────────────────────────────┘
             │         │ (Dispatch indices: {e_1, e_2, e_3, e_4})
             ▼         ▼
     ┌────────────────────────────────────────────────────────┐
     │ Bank of 64 Value Matrices: { W_v,1 ... W_v,64 }        │
     │                                                        │
     │   [ W_v,e1 ]       [ W_v,e2 ]   [ W_v,e3 ]   [ W_v,e4 ]│
     │       │                │            │            │     │
     │       ▼                ▼            ▼            ▼     │
     │   ( x W_v,e1 )     ( x W_v,e2 ) ( x W_v,e3 ) ( x W_v,e4)│
     │       │                │            │            │     │
     │       └────────┬───────┴────────────┴────────────┘     │
     │                ▼                                       │
     │     Weighted Gated Sum ( p_1·v_1 + ... + p_4·v_4 )     │
     └────────────────────────┬───────────────────────────────┘
                              │
                              ▼
                   Dynamic Value Vector: V_t
                              │
                              ▼
               [ Softmax( Q K^T / sqrt(d) ) · V ]
                              │
                              ▼
                   [ Output Projection W_o ]
                              │
                              ▼
                [ LayerNorm & Compact FFN ]
```

---

### Section 2: Complete PyTorch Reference Implementation

The following production-grade PyTorch implementation illustrates the core `MixtureOfValueAttention` block with auxiliary load-balancing loss, top-$k$ routing, and fused linear transformations.

```python
"""
k2_horizon_mova.py
Production-grade PyTorch implementation of Mixture-of-Value Attention (MoVA)
As implemented in IFM K2-Horizon-MoVA-36B-A4B.
"""

import math
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Tuple, Optional


class MoVARouter(nn.Module):
    """
    Top-K Gating Router for Mixture-of-Value Attention.
    Computes routing probabilities across E value expert matrices.
    """
    def __init__(self, d_model: int, num_experts: int = 64, top_k: int = 4):
        super().__init__()
        self.d_model = d_model
        self.num_experts = num_experts
        self.top_k = top_k
        self.gate = nn.Linear(d_model, num_experts, bias=False)

    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        # x shape: [batch_size, seq_len, d_model]
        batch_size, seq_len, d_model = x.shape
        flat_x = x.view(-1, d_model)

        # Compute raw routing logits
        logits = self.gate(flat_x) # [batch_size * seq_len, num_experts]

        # Top-K selection
        top_k_logits, top_k_indices = torch.topk(logits, self.top_k, dim=-1)
        top_k_probs = F.softmax(top_k_logits, dim=-1) # [batch_size * seq_len, top_k]

        # Auxiliary Load Balancing Loss (Switch Transformer style)
        router_probs = F.softmax(logits, dim=-1)
        density = router_probs.mean(dim=0)
        mask = F.one_hot(top_k_indices, self.num_experts).float().sum(dim=1)
        fraction = mask.mean(dim=0)
        aux_loss = self.num_experts * torch.sum(density * fraction)

        return top_k_indices, top_k_probs, aux_loss


class MixtureOfValueAttention(nn.Module):
    """
    Mixture-of-Value Attention (MoVA) Layer.
    Retains standard multi-head Query and Key projections while dispatching
    tokens across a pool of sparse Value projection matrices.
    """
    def __init__(
        self,
        d_model: int = 4096,
        num_heads: int = 32,
        num_value_experts: int = 64,
        top_k_experts: int = 4,
        dropout: float = 0.0
    ):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.head_dim = d_model // num_heads
        self.num_experts = num_value_experts
        self.top_k = top_k_experts
        self.scale = 1.0 / math.sqrt(self.head_dim)

        # Standard dense Query and Key projections
        self.q_proj = nn.Linear(d_model, d_model, bias=False)
        self.k_proj = nn.Linear(d_model, d_model, bias=False)

        # Bank of 64 Value Expert Matrices
        # Implemented as 3D Parameter Tensor: [num_experts, d_model, d_model]
        self.v_experts = nn.Parameter(
            torch.empty(num_value_experts, d_model, d_model)
        )
        nn.init.normal_(self.v_experts, std=0.02)

        # Gating router
        self.router = MoVARouter(d_model, num_value_experts, top_k_experts)

        # Output projection
        self.o_proj = nn.Linear(d_model, d_model, bias=False)
        self.dropout = nn.Dropout(dropout)

    def forward(
        self,
        x: torch.Tensor,
        mask: Optional[torch.Tensor] = None
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        batch_size, seq_len, _ = x.shape

        # 1. Project dense Queries and Keys
        q = self.q_proj(x).view(batch_size, seq_len, self.num_heads, self.head_dim).transpose(1, 2)
        k = self.k_proj(x).view(batch_size, seq_len, self.num_heads, self.head_dim).transpose(1, 2)

        # 2. Route tokens through Value Experts
        flat_x = x.view(-1, self.d_model) # [N, d_model]
        top_k_indices, top_k_probs, aux_loss = self.router(x) # indices: [N, K], probs: [N, K]

        # 3. Compute dynamic sparse Value projections
        # Gather expert weights for active indices
        # In optimized Triton kernels, this is executed via fused scatter-gather GEMMs
        N = flat_x.size(0)
        v_out = torch.zeros_like(flat_x)

        for k_idx in range(self.top_k):
            expert_ids = top_k_indices[:, k_idx] # [N]
            probs = top_k_probs[:, k_idx].unsqueeze(-1) # [N, 1]

            # Vectorized expert weight gather
            selected_weights = self.v_experts[expert_ids] # [N, d_model, d_model]
            projected = torch.bmm(flat_x.unsqueeze(1), selected_weights).squeeze(1) # [N, d_model]
            v_out += probs * projected

        # Reshape dynamic value tensor into multi-head format
        v = v_out.view(batch_size, seq_len, self.num_heads, self.head_dim).transpose(1, 2)

        # 4. Scaled Dot-Product Attention
        scores = torch.matmul(q, k.transpose(-2, -1)) * self.scale
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        attn_weights = F.softmax(scores, dim=-1)
        attn_weights = self.dropout(attn_weights)

        # Attention aggregation
        context = torch.matmul(attn_weights, v) # [batch, num_heads, seq_len, head_dim]
        context = context.transpose(1, 2).contiguous().view(batch_size, seq_len, self.d_model)

        # 5. Output Projection
        output = self.o_proj(context)
        return output, aux_loss
```

---

### Section 3: The 5-Stage MoVA Execution Pipeline

The interactive concept visualizer below walks through the end-to-end lifecycle of a token flowing through a K2 Horizon Mixture-of-Value Attention block.

:::interactive concept
{
  "title": "The 5-Stage Mixture-of-Value Attention (MoVA) Execution Pipeline",
  "steps": [
    {
      "label": "Stage 1",
      "title": "Dual-Stream Input Decomposition",
      "content": "The input token vector x_t splits into two parallel streams: the deterministic geometric stream (Queries and Keys) and the parametric content stream (Router and Values).",
      "icon": "Split"
    },
    {
      "label": "Stage 2",
      "title": "Gating Router Top-K Dispatch",
      "content": "The MoVA gating router evaluates token affinity across all 64 Value matrices, selecting the Top-4 expert matrices with softmax weight normalization.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 3",
      "title": "Sparse Fused Value Projection",
      "content": "Specialized Triton kernels perform scatter-gather matrix multiplications against only the 4 selected Value matrices, generating a dense contextual Value vector.",
      "icon": "Layers"
    },
    {
      "label": "Stage 4",
      "title": "Unified Attention Map Computation",
      "content": "Dense Queries and Keys compute standard scaled dot-product attention scores across sequence positions, maintaining consistent spatial RoPE coordinates.",
      "icon": "Network"
    },
    {
      "label": "Stage 5",
      "title": "Dynamic Aggregation & Residual Return",
      "content": "Attention probabilities weight the dynamic Value vectors across heads, followed by final linear output projection and residual connection into the compact FFN.",
      "icon": "CheckCircle"
    }
  ]
}
:::

---

### Section 4: The KV-Cache Dilemma & Memory Bandwidth Analysis

While MoVA delivers unprecedented compute efficiency during prefill and generation, it introduces a critical systems engineering trade-off: **How does one cache Key-Value states when the Value projection is conditioned on dynamic routing?**

In standard Multi-Query Attention (MQA) or Grouped-Query Attention (GQA), the KV cache stores static vectors:

$$\mathbf{K}_{\text{cached}} = \mathbf{X} \mathbf{W}_k, \quad \mathbf{V}_{\text{cached}} = \mathbf{X} \mathbf{W}_v$$

#### The Two Architectural Caching Strategies for MoVA

1. **Option A: Post-Routing Projected Value Cache (Default vLLM Integration)**
   - The inference engine computes the dynamic value projection $\mathbf{v}_t$ at token generation time and stores the resulting projected vector in standard PagedAttention memory pools.
   - **Advantage:** Preserves exact compatibility with FlashAttention-2/3 kernels; attention dot products execute with zero routing overhead on cached tokens.
   - **Disadvantage:** Memory footprint remains identical to standard GQA; no KV cache size reduction is realized from parameter sparsity.

2. **Option B: Dual-State Compact Representation Cache (Experimental SGLang Primitives)**
   - Rather than storing the expanded $d_{\text{model}}$ Value vector, the engine stores the unprojected activation $\mathbf{x}_t$ alongside a 16-bit bitmask encoding the Top-4 expert indices and their 4 routing weights (fp16).
   - At attention time, the Value vector is materialized on-the-fly inside SRAM via fused tensor-core kernels before the dot product.
   - **Advantage:** Reduces KV cache storage requirements by up to **64%** for ultra-long context sequences (up to 512k tokens).
   - **Disadvantage:** Requires ~8% additional arithmetic intensity on memory-bound decoding steps.

```
KV-CACHE OPERATIONAL TRADEOFF MATRIX (512K CONTEXT):

Strategy                   | Memory Footprint | Decoding Throughput | Kernel Complexity
---------------------------|------------------|---------------------|------------------
Standard Dense GQA         | 32.0 GB / seq    | Baseline (1.0x)     | Low (PagedAttention)
MoVA Post-Projected (vLLM) | 32.0 GB / seq    | 3.8x (vs 36B Dense) | Low (Standard Kernels)
MoVA Dual-State (SGLang)   | 11.5 GB / seq    | 3.2x (vs 36B Dense) | High (Fused SRAM Decode)
```

---

### Section 5: Comparative Benchmarks & Empirical Efficiency

To quantify the real-world operational benefits of Mixture-of-Value Attention, the table and interactive chart below compare **K2-Horizon-MoVA-36B-A4B** against established frontier models: **Mixtral-8x22B**, **Llama-3.1-70B**, and **Qwen-2.5-32B**.

Tests evaluated **Terminal-Bench 2.1** (measuring complex CLI agent execution and multi-step tool reasoning), **Active TFLOPs per Token**, **Time-To-First-Token (TTFT)** at 32k prompt length, and **Decoding Tokens/sec** on an 8x NVIDIA H100 SXM5 node.

:::interactive chart
{
  "title": "K2-Horizon-MoVA-36B-A4B Benchmark & Compute Efficiency (October 2026)",
  "description": "Comparative evaluation of K2-Horizon-MoVA against leading dense and MoE architectures across agentic task accuracy, active compute, latency, and generation throughput.",
  "type": "bar",
  "xKey": "metric",
  "series": [
    { "dataKey": "k2_mova", "name": "K2-Horizon-MoVA-36B-A4B", "color": "#10B981" },
    { "dataKey": "mixtral", "name": "Mixtral-8x22B (FFN-MoE)", "color": "#6366F1" },
    { "dataKey": "llama70b", "name": "Llama-3.1-70B (Dense)", "color": "#F59E0B" },
    { "dataKey": "qwen32b", "name": "Qwen-2.5-32B (Dense)", "color": "#EF4444" }
  ],
  "data": [
    { "metric": "Terminal-Bench 2.1 (%)", "k2_mova": 68.4, "mixtral": 63.8, "llama70b": 67.2, "qwen32b": 61.5 },
    { "metric": "tau3-Banking Score (%)", "k2_mova": 74.2, "mixtral": 69.1, "llama70b": 72.8, "qwen32b": 67.9 },
    { "metric": "Active GFLOPs/Token", "k2_mova": 8.2, "mixtral": 39.0, "llama70b": 140.0, "qwen32b": 64.0 },
    { "metric": "Decoding (tokens/sec / 10)", "k2_mova": 18.5, "mixtral": 7.4, "llama70b": 3.8, "qwen32b": 8.2 },
    { "metric": "TTFT Latency @ 32k (ms / 10)", "k2_mova": 12.0, "mixtral": 28.5, "llama70b": 46.0, "qwen32b": 24.2 }
  ]
}
:::

#### Key Architectural Takeaways

1. **Agentic Mastery with 4B Active Cost:** On Terminal-Bench 2.1, K2-Horizon-MoVA scores **68.4%**, edging out the 70B dense baseline (67.2%) while requiring only **8.2 GFLOPs per token** compared to Llama-3.1-70B's 140 GFLOPs—an astonishing **17x reduction in active compute**.
2. **Throughput Dominance:** In production vLLM serving, K2-Horizon-MoVA sustains **185 tokens/second per stream**, outperforming Qwen-2.5-32B (82 tokens/sec) by **2.25x** and Llama-3.1-70B (38 tokens/sec) by **4.8x**.
3. **Low Prompt Latency:** Because Query and Key representations are processed via unified dense projections while Value computations scale down via Top-4 gating, prefill TTFT drops to just **120 ms** on 32k sequence prompts.

---

### Section 6: Production Serving with vLLM & SGLang

Deploying K2-Horizon-MoVA in production environments is streamlined thanks to IFM's Day-0 integration pull requests.

#### Deploying via vLLM

Ensure you are running `vllm >= 0.7.2` with native MoVA kernel support enabled:

```bash
# Launch K2-Horizon-MoVA-36B-A4B with Tensor Parallelism = 2
python3 -m vllm.entrypoints.openai.api_server \
    --model IFM/K2-Horizon-MoVA-36B-A4B \
    --tensor-parallel-size 2 \
    --max-model-len 131072 \
    --gpu-memory-utilization 0.92 \
    --enable-chunked-prefill \
    --trust-remote-code \
    --port 8000
```

#### Querying the Engine via OpenAI-Compatible Client

```python
import openai

client = openai.OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="EMPTY"
)

response = client.chat.completions.create(
    model="IFM/K2-Horizon-MoVA-36B-A4B",
    messages=[
        {
            "role": "system",
            "content": "You are an autonomous systems engineering agent. Optimize the following CUDA kernel for coalesced global memory access."
        },
        {
            "role": "user",
            "content": "__global__ void matrix_transpose(float* out, float* in, int width, int height) { ... }"
        }
    ],
    temperature=0.2,
    max_tokens=2048
)

print(response.choices[0].message.content)
```

---

### Section 7: The Future of Sparse Attention

The launch of the IFM K2 Horizon model suite signals an inevitable shift in foundation model architecture. For years, the AI community treated Multi-Head Attention as an untouchable dense core, relegating all conditional routing experiments to post-attention MLPs.

By demonstrating that **Mixture-of-Value Attention (MoVA)** achieves state-of-the-art agentic reasoning and code synthesis while activating a mere **4 billion parameters out of 36 billion**, IFM has proven that the attention pathway itself can be sparsely partitioned without compromising spatial coordinate integrity.

As context windows push towards 1M tokens and autonomous agents demand millisecond-level responsiveness, sparse value routing will likely become a cornerstone of next-generation transformer designs.

*The full K2 Horizon family (0.9B, 3.7B, 7B, 32B, 36B-A4B, and 375B) is accessible on Hugging Face under the Apache 2.0 license via `huggingface.co/IFM`.*
:::
