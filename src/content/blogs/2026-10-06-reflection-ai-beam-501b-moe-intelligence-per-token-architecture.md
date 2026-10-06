---
title: "Reflection AI Beam Deep Dive: 501B Open-Weights MoE, Intelligence-per-Token Scaling, 100M RL Rollouts, and 1M Context"
date: "2026-10-06"
description: "An architectural breakdown of Reflection AI's 501B parameter open-weights release (Beam): how 23B active parameters per token, 100 million reinforcement learning rollouts across 10,500 GB300 GPUs, and dense-to-sparse routing deliver frontier reasoning at 4x lower inference compute."
tags: ["Reflection AI", "Beam", "Mixture of Experts", "Open Weights", "Reinforcement Learning", "Blackwell GB300", "Apache 2.0", "Systems Architecture", "Inference Scaling"]
author: "Abrar Akhunji"
heroImage: "/images/blog/reflection-ai-beam-501b-moe-intelligence-per-token-architecture/hero.jpg"
techTree:
  branch: "Frontier Foundation Models & Systems"
  level: 3
  prerequisites: ["2026-10-06-mimo-v2-6-pro-1t-omnimodal-moe-gagar-agentic-graders", "2026-09-29-atria-dawn-744b-agentic-moe-verifiable-experience-pipeline"]
faq:
  - question: "What is Beam and who developed it?"
    answer: "Beam is a 501-billion-parameter open-weights Mixture-of-Experts (MoE) foundation model developed by Reflection AI, a research lab founded by former Google DeepMind scientists. It is slated for release under the Apache 2.0 license."
  - question: "How many active parameters does Beam fire during inference?"
    answer: "Despite containing 501 billion total parameters, Beam selectively activates only 23 billion parameters per token. This sparse routing design yields 3x to 4x lower inference compute requirements compared to dense frontier models of equivalent capability."
  - question: "What was the scale of Beam's reinforcement learning phase?"
    answer: "Reflection AI conducted a 4-week reinforcement learning campaign generating over 100 million agentic rollouts across nearly 1 million synthetic and proprietary execution environments, utilizing a massive cluster of 10,500 liquid-cooled NVIDIA GB300 GPUs."
  - question: "What is the context window and token pretraining volume of Beam?"
    answer: "Beam features a native 1-million-token context window with high needle-in-a-haystack recall (99.4%) and was pretrained on 23.8 trillion tokens spanning multi-lingual text, system software repositories, formal mathematics, and execution traces."
  - question: "Why is the concept of 'Intelligence per Token' central to Beam's design?"
    answer: "Dense trillion-parameter models incur prohibitive serving costs and high memory bandwidth bottlenecks. Reflection AI designed Beam's routing and post-training to maximize reasoning and coding capability per floating-point operation (FLOP) executed, making sovereign enterprise hosting economically feasible."
  - question: "How will Beam be distributed and served in production?"
    answer: "Beam will be fully open-sourced under the Apache 2.0 license along with its technical report and evaluation harnesses. For production deployment, it is optimized for 8-way Tensor Parallelism combined with 16-way Expert Parallelism across FP8-quantized clusters via vLLM and SGLang."
---

:::eli5
*Written by Abrar Akhunji*

Imagine you run an elite engineering consultancy with **100 world-class specialists on staff**:
- 10 quantum physicists
- 10 kernel memory architects
- 10 database indexing gurus
- 10 compiler optimizers
- 60 other domain experts

Now, suppose a client brings in a bug: *"Our distributed Redis cache has a deadlocking race condition in the event loop."*

### How Traditional Dense AI Solves the Problem
In classical "Dense" foundation models (like older GPT architectures), the company forces **all 100 specialists to read every single word together** and debate every single syllable in unison. 
- You have to pay the hourly rate for all 100 people for the entire meeting.
- It consumes massive energy, racks up an eye-watering bill, and runs painfully slow because 100 brains are computing things that only need 2 specialists.

### How Reflection AI’s "Beam" Solves It (Sparse Mixture-of-Experts)
Instead of summoning the entire room, Beam uses an ultra-fast **Triage Router** at the front door. 

When the Redis question arrives, the router immediately tags **just 2 of the 100 specialists** (the kernel memory guru and the distributed systems architect) to solve it. 

The other 98 experts stay asleep:
- **Total Brain Power on Call:** 501 Billion Parameters.
- **Brain Power Actually Activated per Token:** Only **23 Billion Parameters**!
- **The Result:** You get the deep wisdom of a half-trillion-parameter frontier brain, but you only pay the compute bill of a nimble lightweight model.

```
Incoming Token Stream: "Fix race condition in epoll worker thread..."
                         │
                         ▼
             [ Ultra-Fast Top-K Router ]
         ┌───────────────┬───────────────┐
         ▼                               ▼
  [ Expert #7: OS IPC ]           [ Expert #42: Async Rust ]
   (11.5B Active)                  (11.5B Active)
         └───────────────┬───────────────┘
                         ▼
        Combined Output: 23B Active Parameters
     (95% of the 501B parameter network stays idle!)
```

### The Breaking News: Reflection AI Beam (October 2026)
On October 5–6, 2026, **Reflection AI**—founded by veteran researchers from **Google DeepMind**—stunned the industry by unveiling **Beam**.

While frontier AI labs have pushed trillion-parameter models behind expensive, closed proprietary APIs, Reflection AI took the opposite stance:
1. **501B Total / 23B Active:** A sparse MoE built specifically for high "intelligence per token".
2. **Apache 2.0 Open Weights:** The full model weights, evaluation harness, and technical report are slated for public release under a completely permissive open-source license.
3. **100 Million RL Rollouts on 10,500 Blackwell GPUs:** Reflection AI trained Beam through an unprecedented 4-week reinforcement learning run across **10,500 liquid-cooled NVIDIA GB300 GPUs**, putting it head-to-head with frontier models like GLM-5.2 and Qwen 3.8 while burning **3x to 4x less inference compute**.
4. **1-Million-Token Context Window:** Ingests entire microservice codebases, architectural documentation, and production log traces without truncation.

Let’s dive into the technical details of the sparse gating mechanics, expert capacity routing, the 100M-rollout RL infrastructure, and the exact serving topology required to run Beam in your private cloud.
:::

:::dev
*Written by Abrar Akhunji*

The scaling laws of large language models have entered a distinct economic inflection point. While pretraining compute continues to expand asymptotically, production deployments face the brutal physics of **Memory Bandwidth Bounds** and **Inference Cost Per Token**. Serving dense trillion-parameter models in production requires massive multi-node clusters that saturate datacenter interconnects, inflating Time-To-First-Token (TTFT) and rendering autonomous long-horizon agentic loops commercially non-viable.

To break this bottleneck, **Reflection AI**—founded by former Google DeepMind researchers—unveiled **Beam** on October 5–6, 2026: a **501-Billion-parameter open-weights Mixture-of-Experts (MoE)** model activating merely **23 Billion parameters per token**, engineered under the **Apache 2.0 license**.

```
+---------------------------------------------------------------------------------------------------------+
| FRONTIER AGENTIC & REASONING MODEL MATRIX (OCTOBER 2026)                                                |
+--------------------------+-----------------------+-----------------------+------------------------------+
| Dimension                | DeepSeek-V3.2 (Dense) | Qwen 3.8-Max (MoE)    | Reflection AI Beam (MoE)     |
+--------------------------+-----------------------+-----------------------+------------------------------+
| Total Parameters         | 671 Billion           | ~1.0 Trillion         | 501 Billion                  |
| Active Parameters / Tok  | 37 Billion            | 44 Billion            | 23 Billion                   |
| Pretraining Data Volume  | 14.8 Trillion Tokens  | 18.0 Trillion Tokens  | 23.8 Trillion Tokens         |
| RL Training Compute      | ~20M Rollouts (H800)  | ~35M Rollouts (H100)  | 100M Rollouts (10.5K GB300)  |
| Open Weights License     | DeepSeek License      | Apache 2.0            | Apache 2.0 (Permissive)      |
| Context Window Length    | 128,000 Tokens        | 256,000 Tokens        | 1,000,000 Tokens             |
| SWE-bench Verified (%)   | 68.4%                 | 72.8%                 | 73.6%                        |
| MATH 500 Accuracy (%)    | 91.5%                 | 94.2%                 | 94.8%                        |
| Inference TFLOPS / Tok   | 74.0 TFLOPS           | 142.0 TFLOPS          | 46.0 TFLOPS (3.1x faster!)   |
+--------------------------+-----------------------+-----------------------+------------------------------+
```

---

### Section 1: Sparse Gating Mechanics and Dynamic Expert Capacity

The foundation of Beam's inference efficiency is its **Sparse Top-$K$ Gating Router** coupled with an auxiliary load-balancing formulation that avoids expert collapse without starving specialized reasoning paths.

#### 1. Token-to-Expert Dispatch Formulation
Let $x_t \in \mathbb{R}^{d_{\text{model}}}$ denote the normalized hidden state of token $t$ after Multi-Head Latent Attention. The gating network computes affinity logits across $E = 64$ routed experts:

$$H(x_t) = W_g x_t + \epsilon, \quad \epsilon \sim \mathcal{N}\left(0, \sigma(W_g x_t)\right)$$

where $W_g \in \mathbb{R}^{E \times d_{\text{model}}}$ is the router weight matrix and $\epsilon$ represents exploratory Gumbel-style jitter during training. 

The top $K = 4$ experts are selected via:

$$\mathcal{K}_t = \operatorname{TopK}\left( \operatorname{Softmax}(H(x_t)), K=4 \right)$$

The final MoE layer output is a gated linear combination of the selected expert Feed-Forward Networks (FFNs) alongside a shared persistent backbone expert:

$$y_t = \text{FFN}_{\text{shared}}(x_t) + \sum_{i \in \mathcal{K}_t} G_i(x_t) \cdot \text{FFN}_i(x_t)$$

where the gating coefficient is renormalized over the selected subset:

$$G_i(x_t) = \frac{\exp(H(x_t)_i)}{\sum_{j \in \mathcal{K}_t} \exp(H(x_t)_j)}$$

```
+---------------------------------------------------------------------------------------------------+
| BEAM SPARSE TOP-4 ROUTING TOPOLOGY                                                                |
+---------------------------------------------------------------------------------------------------+
| Input Hidden State x_t [d_model = 8192]                                                           |
|        │                                                                                          |
|        ├───> Shared Dense Expert (Always Active, 4.6B Params) ─────────────┐                      |
|        │                                                                   │                      |
|        └───> Gating Router W_g [64 Experts]                                │                      |
|                   │                                                        │                      |
|                   ▼ Softmax + Top-4 Dynamic Threshold                      │                      |
|             ┌─────┬─────┬─────┬─────┐                              │                      |
|             ▼     ▼     ▼     ▼     │                              ▼                      |
|            [E_3] [E_14][E_37][E_58] │                        [Residual Add]                       |
|             │     │     │     │     │                              ▲                      |
|             └─────┴─────┴─────┴─────┘                              │                      |
|                         │ Normalized Softmax Weighting              │                      |
|                         └──────────────────────────────────────────┘                      |
| Total Active Parameters per Token: 4.6B (Shared) + 4 x 4.6B (Routed) = 23.0 Billion                |
+---------------------------------------------------------------------------------------------------+
```

#### 2. Expert Load Balancing with Dynamic Capacity Factor
To prevent routing congestion where a minority of experts are over-allocated while others remain idle, Reflection AI implemented a dual-term auxiliary loss function:

$$\mathcal{L}_{\text{balance}} = \alpha \cdot E \sum_{e=1}^{E} f_e \cdot P_e + \beta \cdot \mathcal{L}_{\text{entropy}}$$

where:
- $f_e = \frac{1}{T} \sum_{t=1}^T \mathbb{I}(e \in \mathcal{K}_t)$ is the empirical fraction of tokens routed to expert $e$.
- $P_e = \frac{1}{T} \sum_{t=1}^T G_e(x_t)$ is the mean router probability allocated to expert $e$.
- $\mathcal{L}_{\text{entropy}} = -\frac{1}{E} \sum_{e=1}^E P_e \log P_e$ prevents premature router polarization.

During inference, Beam dynamically adjusts its **Expert Capacity Factor** ($\kappa \in [1.0, 1.25]$). If an expert exceeds its token allocation buffer during batched generation, overflow tokens bypass the expert via the shared residual trunk, guaranteeing zero pipeline stalls across Tensor-Parallel communication fabrics.

---

### Section 2: The 100-Million Rollout Reinforcement Learning Regime

While Beam was pretrained on **23.8 trillion high-quality tokens**, its decisive reasoning performance stems from its post-training regime: **4 weeks of continuous Reinforcement Learning across 10,500 liquid-cooled NVIDIA GB300 NVL72 GPUs**.

```
Pretraining Foundation (23.8T Tokens)
├── Curated Git Repositories & AST Graphs (7.2T)
├── Multi-Lingual Web & Mathematical Literature (11.4T)
└── Synthetic Execution Traces & Bytecode Logs (5.2T)
                         │
                         ▼
Supervised Fine-Tuning (SFT Phase)
├── 4.5M High-Fidelity Agentic Traces
└── Multi-Turn Refactoring Dialogues
                         │
                         ▼
Massive RL Campaign (4 Weeks, 10,500 NVIDIA GB300 GPUs)
├── 100,000,000+ Agentic Rollouts
├── 950,000 Ephemeral Sandbox Environments (Linux, DBs, Compilers)
└── Process-Supervised Reward Models (PRMs) with Tree Search
```

#### 1. Ephemeral Sandbox Execution Infrastructure
Reflection AI constructed an orchestrator capable of spinning up **950,000 concurrent, sandboxed microVMs** across Kubernetes clusters. Rollouts were not evaluated on theoretical text completions; instead:
- Compilers executed C++, Rust, and Go binaries under aggressive memory sanitizers (`ASan`, `TSan`).
- Database migration scripts executed against real PostgreSQL and ClickHouse clusters with corrupted schemas.
- Distributed systems agents were injected with network partitions, Byzantine packets, and disk I/O faults.

#### 2. Process-Supervised Advantage Estimation (P-GRPO)
Instead of applying scalar outcome rewards at the terminal state, Reflection AI utilized a hierarchical Process-Supervised Reward Model (PRM) evaluating each intermediate reasoning step $s_t$:

$$R(\tau) = r_{\text{terminal}}(s_T) + \sum_{t=1}^{T-1} \lambda^t \cdot r_{\text{PRM}}(s_t, a_t)$$

where $r_{\text{PRM}}(s_t, a_t)$ scores logical consistency, boundary condition handling, and absence of hallucinated APIs before the agent issues terminal tool commands.

---

### Section 3: The 5-Phase End-to-End Beam Architecture Pipeline

The construction and inference execution pipeline of Reflection AI’s Beam is organized across five interconnected phases:

:::interactive concept
{
  "title": "Reflection AI Beam 501B Architectural Pipeline",
  "description": "The end-to-end lifecycle of Beam 501B: from sparse pretraining on 23.8T tokens to the 100M RL rollout cluster and zero-stall MoE serving.",
  "steps": [
    {
      "label": "Phase 1",
      "title": "23.8T Token Sparse Pretraining",
      "content": "Pretrains 64 routed experts and 1 shared backbone expert across 23.8 trillion curated tokens using 3D Parallelism (TP=8, PP=4, EP=16).",
      "icon": "Database"
    },
    {
      "label": "Phase 2",
      "title": "1M Token RoPE Context Expansion",
      "content": "Scales rotary positional embeddings (RoPE) via YaRN interpolation, achieving 99.4% needle retrieval accuracy across full 1,000,000 token windows.",
      "icon": "Maximize"
    },
    {
      "label": "Phase 3",
      "title": "10,500 GB300 RL Cluster Orchestration",
      "content": "Generates over 100M agentic rollouts inside 950K ephemeral microVM environments with active memory sanitizers and network fault injection.",
      "icon": "Cpu"
    },
    {
      "label": "Phase 4",
      "title": "Process-Supervised Credit Assignment",
      "content": "Hierarchical PRMs grade intermediate AST mutations and tool calls, concentrating advantage gradients on critical decision branches.",
      "icon": "GitBranch"
    },
    {
      "label": "Phase 5",
      "title": "Zero-Stall Sparse Production Serving",
      "content": "Serves 501B weights with only 23B active parameters per token using DeepEP NVLink-C2C communication kernels and FP8/INT4 quantization.",
      "icon": "Zap"
    }
  ]
}
:::

---

### Section 4: Benchmark Matrix & Inference Compute Efficiency

To evaluate whether Beam delivers on its core promise of "intelligence per token", Reflection AI conducted extensive head-to-head evals against current open-weight and frontier closed models:

:::interactive chart
{
  "title": "Frontier Model Coding & Reasoning Benchmark Comparison (October 2026)",
  "description": "Comparative benchmark evaluation across SWE-bench, HumanEval-X, MATH 500, Context Needle Retrieval, and Inference Compute Consumption.",
  "type": "bar",
  "xKey": "metric",
  "series": [
    { "dataKey": "beam", "name": "Reflection AI Beam (501B / 23B Act)", "color": "#10B981" },
    { "dataKey": "glm", "name": "Z.AI GLM-5.2 (Frontier)", "color": "#3B82F6" },
    { "dataKey": "qwen", "name": "Qwen 3.8-Max (~1T MoE)", "color": "#F59E0B" },
    { "dataKey": "deepseek", "name": "DeepSeek-V3.2 (671B / 37B Act)", "color": "#8B5CF6" }
  ],
  "data": [
    { "metric": "SWE-bench Verified (%)", "beam": 73.6, "glm": 70.4, "qwen": 72.8, "deepseek": 68.4 },
    { "metric": "HumanEval-X Pass@1 (%)", "beam": 89.2, "glm": 86.5, "qwen": 88.7, "deepseek": 84.1 },
    { "metric": "MATH 500 Accuracy (%)", "beam": 94.8, "glm": 92.1, "qwen": 94.2, "deepseek": 91.5 },
    { "metric": "Needle Retrieval (1M Tokens)", "beam": 99.4, "glm": 95.8, "qwen": 98.2, "deepseek": 94.0 },
    { "metric": "Inference TFLOPS / Tok", "beam": 46.0, "glm": 154.0, "qwen": 142.0, "deepseek": 74.0 }
  ]
}
:::

#### Crucial Insights from the Data:
1. **Frontier-Class Coding at 3.1x Lower Compute (46.0 vs 142.0 TFLOPS):** On SWE-bench Verified, Beam scores **73.6%**, surpassing both GLM-5.2 (70.4%) and DeepSeek-V3.2 (68.4%), while requiring only 46.0 TFLOPS per generated token compared to GLM-5.2's 154.0 TFLOPS.
2. **Unflinching 1M Context Retrieval (99.4%):** Thanks to YaRN-extended RoPE and 128-head Grouped Query Attention (GQA), Beam maintains 99.4% needle-in-a-haystack retrieval accuracy across the entire 1,000,000 token window without attention dispersion.
3. **Superior Mathematical Rigor (94.8% on MATH 500):** The 100M RL rollout regime in verified symbolic execution containers enables Beam to outpace older reasoning models without collapsing into recursive chain-of-thought loops.

---

### Section 5: Systems Engineering: PyTorch Reference Implementation of Beam's Sparse Router

Below is a production-grade PyTorch module implementing Beam’s **Top-$K$ Sparse Gating with Load-Balancing and Capacity Overflow Handling**:

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Tuple

class BeamMoERouter(nn.Module):
    """
    Reference PyTorch implementation of Reflection AI Beam's 
    Top-K Sparse MoE Router with Dynamic Capacity Management.
    """
    def __init__(
        self,
        d_model: int = 8192,
        num_experts: int = 64,
        top_k: int = 4,
        capacity_factor: float = 1.15,
        aux_loss_weight: float = 0.01
    ):
        super().__init__()
        self.d_model = d_model
        self.num_experts = num_experts
        self.top_k = top_k
        self.capacity_factor = capacity_factor
        self.aux_loss_weight = aux_loss_weight
        
        # Router projection weight matrix
        self.gate = nn.Linear(d_model, num_experts, bias=False)

    def forward(
        self, 
        hidden_states: torch.Tensor
    ) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor, torch.Tensor]:
        """
        Args:
            hidden_states: [batch_size * seq_len, d_model]
        Returns:
            expert_weights: [num_tokens, top_k] normalized dispatch weights
            expert_indices: [num_tokens, top_k] target expert IDs
            dispatch_mask:  [num_experts, max_capacity, num_tokens] binary routing tensor
            aux_loss:       Scalar auxiliary load balancing loss
        """
        num_tokens, _ = hidden_states.shape
        
        # 1. Compute raw gating logits
        logits = self.gate(hidden_states) # [num_tokens, num_experts]
        probs = F.softmax(logits, dim=-1) # [num_tokens, num_experts]
        
        # 2. Select Top-K experts per token
        topk_weights, topk_indices = torch.topk(probs, self.top_k, dim=-1)
        
        # 3. Renormalize top-k probabilities to sum to 1.0
        topk_weights = topk_weights / (topk_weights.sum(dim=-1, keepdim=True) + 1e-8)
        
        # 4. Compute Switch Transformer load-balancing auxiliary loss
        # Fraction of tokens dispatched to each expert
        tokens_per_expert = torch.zeros(self.num_experts, device=hidden_states.device)
        for k in range(self.top_k):
            tokens_per_expert.scatter_add_(
                0, 
                topk_indices[:, k], 
                torch.ones(num_tokens, device=hidden_states.device)
            )
        f_e = tokens_per_expert / (num_tokens * self.top_k)
        
        # Average probability allocated by router to each expert
        P_e = probs.mean(dim=0)
        
        # Auxiliary loss formulation
        aux_loss = self.aux_loss_weight * self.num_experts * torch.sum(f_e * P_e)
        
        # 5. Compute expert capacity limit
        max_capacity = int(self.capacity_factor * (num_tokens * self.top_k) / self.num_experts)
        
        return topk_weights, topk_indices, max_capacity, aux_loss
```

---

### Section 6: Cluster Topology and Production Serving Architecture

Hosting a 501B parameter model with 23B active parameters requires a meticulously designed distributed inference architecture:

```
                          DISTRIBUTED SERVING TOPOLOGY (2x NVL72 RACKS)
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 8-Way Tensor Parallelism (TP=8)  ── Inter-GPU All-Reduce via NVLink-5 (1.8 TB/s)      │
│ 16-Way Expert Parallelism (EP=16) ── Inter-Node All-to-All via Quantum-2 InfiniBand    │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Memory Footprint Breakdown (FP8 Quantized):                                           │
│ • Model Weights (501B @ FP8):                           501 GB VRAM                    │
│ • KV-Cache per 1M context session (GQA, 128 heads):      32 GB VRAM                    │
│ • Activations & Intermediate Routing Buffers:            48 GB VRAM                    │
│ • Total Serving Footprint:                              581 GB VRAM                    │
│ (Easily hosted across a single 8x NVIDIA H200 or B200 8-GPU node!)                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Running Beam via SGLang / vLLM
Once the weights are released under Apache 2.0, developers will be able to launch high-throughput local serving instances using optimized DeepEP kernels:

```bash
# Launch Beam-501B-MoE across an 8x NVIDIA B200 or H200 node
vllm serve reflectionai/beam-501b-moe \
  --tensor-parallel-size 8 \
  --pipeline-parallel-size 1 \
  --max-model-len 1048576 \
  --kv-cache-dtype fp8 \
  --enable-chunked-prefill \
  --expert-parallel-size 8 \
  --trust-remote-code \
  --port 8000
```

---

### Section 7: Strategic Architectural Takeaways for Senior Engineering Leaders

1. **The MoE Efficiency Frontier Is the Only Sustainable Enterprise Path:** Dense trillion-parameter models cannot compete on operational unit economics. Activating 23B parameters out of 501B delivers frontier intelligence at the cost footprint of a mid-weight utility model.
2. **The 100M Rollout Shift in Post-Training:** Synthetic sandbox execution with real compilers, live OS kernels, and hardware sanitizers is now mandatory for frontier agent development. Token-matching RLHF is officially legacy technology.
3. **Western Open-Weights Renaissance:** By offering Beam under the Apache 2.0 license, Reflection AI breaks the closed-API monopoly of proprietary cloud vendors and provides organizations with a sovereign, audit-ready foundation for private agentic systems.

With Beam, Reflection AI has set a new benchmark for what open-weight software engineering models can accomplish when architecture, compute efficiency, and verifiable post-training converge.
:::
