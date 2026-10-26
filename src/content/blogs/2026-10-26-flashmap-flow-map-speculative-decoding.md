---
title: "FlashMap: Flow Map Speculative Decoding and the Mathematical Elimination of Suffix Decay"
date: "2026-10-26"
description: "A systems engineering teardown of FlashMap (arXiv:2610.24365): replacing factorized discrete diffusion drafters with continuous flow matching ODEs, modeling joint inter-token dependencies, eliminating suffix decay, and hitting 6.1x lossless speculative decoding speedups in vLLM and SGLang."
tags: ["FlashMap", "Speculative Decoding", "Flow Matching", "LLM Inference", "vLLM", "SGLang", "GPU Optimization", "Continuous Flow", "Systems Engineering", "Deep Learning Kernels"]
author: "Abrar Akhunji"
heroImage: "/images/blog/flashmap-flow-map-speculative-decoding/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["2026-08-29-dflash-block-diffusion-speculative-decoding", "2026-10-25-llm-d-1-0-cncf-distributed-inference-prefill-decode-disaggregation"]
faq:
  - question: "What is FlashMap and what inference problem does it solve?"
    answer: "FlashMap (arXiv:2610.24365) is an open-source speculative decoding architecture that uses a continuous flow matching drafter to generate multi-token blocks in a single forward pass. It solves the suffix decay bottleneck inherent in previous block diffusion methods like DFlash, where candidate tokens were predicted independently across positions, causing verification acceptance rates to drop steeply on later tokens."
  - question: "Why did previous block diffusion drafters like DFlash suffer from suffix decay?"
    answer: "DFlash and discrete non-causal drafters rely on a factorized conditional independence assumption: they predict each token slot in the block independently given the target model's hidden states. In code generation and formal reasoning, tokens exhibit heavy mutual covariance. When position k is sampled without explicit conditioning on position k-1, grammatical mismatches occur, causing the target model's verification pass to reject the remainder of the draft block."
  - question: "How does continuous flow matching solve the factorization error in parallel drafting?"
    answer: "FlashMap treats draft block generation as transporting a continuous probability distribution along an Ordinary Differential Equation (ODE) velocity field. Starting from a shared Gaussian noise vector, the flow velocity network couples all candidate token positions simultaneously through bidirectional self-attention and cross-attention over target states, modeling the true joint probability distribution across the entire multi-token sequence."
  - question: "How many ODE integration steps does FlashMap execute to draft a block?"
    answer: "FlashMap achieves its peak speedup using a single-step Euler solver (t = 0 to 1 in one forward pass). For high-entropy code or reasoning contexts, a 2-step midpoint integration can be enabled, trading a tiny drafting compute increment for higher acceptance lengths."
  - question: "Is FlashMap strictly lossless with respect to the target model's output distribution?"
    answer: "Yes. Speculative decoding guarantees distribution preservation through modified rejection sampling. The large target model evaluates all proposed candidate tokens simultaneously in a single batched verification forward pass. If a draft token fails rejection sampling, it is discarded and replaced with a sample drawn directly from the adjusted target distribution. The resulting token stream is mathematically indistinguishable from standard autoregressive decoding."
  - question: "How does FlashMap integrate into production inference engines like vLLM and SGLang?"
    answer: "FlashMap integrates as an engine-level speculative draft runner. It reuses the target model's PagedAttention KV cache in place and utilizes FlashInfer tree attention kernels for verification. Because the continuous flow drafter requires only the final hidden state of the target model, it introduces zero drafter-side KV cache overhead, preserving GPU High Bandwidth Memory for serving concurrency."
---

:::eli5
*Written by Abrar Akhunji*

If you have ever watched a large language model output code in your terminal, you know it feels like watching someone type out a letter one key at a time.

Even on an NVIDIA H100 GPU cluster worth hundreds of thousands of dollars, the model cannot guess word four until word three has finished passing through all eighty transformer layers. The tensor cores spend almost all their time sitting idle, waiting for heavy memory chips to move numbers across the bus.

Engineers fixed this partially with **Speculative Decoding**. A tiny, cheap assistant model guesses four or five words ahead. Then the master model checks all of them in a single step.

In August 2026, **DFlash** took this further by using **Block Diffusion**. Instead of guessing words one after another, DFlash used a parallel neural network to propose five tokens at the same time in one forward pass.

It was fast, but it had a hidden trap:

```
                  THE FACTORIZATION TRAP IN BLOCK DRAFTING
                  
    DFlash (Independent Factorized Prediction):
    ┌────────────────────────────────────────────────────────┐
    │ Target context: "def calculate_"                       │
    │ Slot 1 guesses: "total"       ──► Matches target! [OK] │
    │ Slot 2 guesses: "(x):"        ──► Ignored Slot 1! [FAIL│ (Expected "_price")
    │ Slot 3 guesses: "return x"    ──► Cascading rejection! │
    │ Outcome: Tokens 2 and 3 get thrown away.               │
    └────────────────────────────────────────────────────────┘
    
    FlashMap (Continuous Flow Map Coupling):
    ┌────────────────────────────────────────────────────────┐
    │ Shared continuous noise field transports the block     │
    │ Slot 1: "total"                                        │
    │ Slot 2: "_price"              ──► Strongly coupled! [OK│
    │ Slot 3: "(items):"            ──► Structurally valid!  │
    │ Outcome: All tokens accepted in one verification pass. │
    └────────────────────────────────────────────────────────┘
```

When DFlash guessed five words at once, it guessed them independently. Imagine trying to finish a five-word sentence where five different people each write one word on a card without looking at what the other four are writing. 

The first word usually made sense. The second word was hit or miss. By the third and fourth words, the sentence broke down grammatically. The master model had to throw away more than half of the guesses. Inference engineers called this **Suffix Decay**.

On **October 17, 2026**, a team of systems researchers from USC and Flatiron Institute published **FlashMap** (arXiv:2610.24365).

FlashMap replaces independent guessing with a **Continuous Flow Map**. Instead of treating words as isolated slots, it samples a single shared continuous cloud of numbers and runs an Ordinary Differential Equation (ODE) velocity field through it. 

Because all the candidate words flow together through bidirectional attention, word three knows exactly what word two is doing while the drawing takes place. Suffix decay vanishes. 

The master model accepts almost five tokens per verification step, pushing real-world inference speedups up to **6.1x** without altering a single word of the target model's original distribution.
:::

:::interactive concept
{
  "title": "FlashMap Speculative Execution Pipeline",
  "steps": [
    {
      "label": "Stage 01: Context Extraction",
      "title": "Target Hidden State Conditioning",
      "content": "The target model runs a standard decoding step and emits its final layer hidden state, capturing the full semantic history without re-allocating an auxiliary drafter KV cache.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 02: Continuous Prior Sampling",
      "title": "Shared Gaussian Latent Vector",
      "content": "A shared continuous noise vector z_0 is sampled from a standard Gaussian distribution across all K draft block positions simultaneously.",
      "icon": "Layers"
    },
    {
      "label": "Stage 03: Flow Velocity Integration",
      "title": "1-Step Euler ODE Trajectory",
      "content": "The flow velocity network v_theta integrates the latent state along the probability path in a single forward pass, coupling all token positions through bidirectional attention.",
      "icon": "Activity"
    },
    {
      "label": "Stage 04: Lossless Verification",
      "title": "Batched Target Rejection Sampling",
      "content": "The target model evaluates the entire K-token speculative block in one compute-dense forward pass, guaranteeing mathematically identical output distribution.",
      "icon": "Zap"
    }
  ]
}
:::

:::interactive chart
{
  "title": "Token Acceptance Rate by Block Position (K=1 to 8)",
  "description": "Empirical acceptance rate comparison across draft block positions on Qwen3-8B evaluating code and mathematical reasoning tasks.",
  "type": "bar",
  "xKey": "position",
  "series": [
    { "name": "DFlash (Factorized Diffusion)", "dataKey": "dflash", "color": "#FF3366" },
    { "name": "EAGLE-3 (Autoregressive Drafter)", "dataKey": "eagle", "color": "#F59E0B" },
    { "name": "FlashMap (Continuous Flow Map)", "dataKey": "flashmap", "color": "#00E676" }
  ],
  "data": [
    { "position": "Token 1", "dflash": 88, "eagle": 86, "flashmap": 93 },
    { "position": "Token 2", "dflash": 67, "eagle": 78, "flashmap": 89 },
    { "position": "Token 3", "dflash": 48, "eagle": 71, "flashmap": 85 },
    { "position": "Token 4", "dflash": 35, "eagle": 64, "flashmap": 81 },
    { "position": "Token 5", "dflash": 26, "eagle": 58, "flashmap": 76 },
    { "position": "Token 6", "dflash": 18, "eagle": 51, "flashmap": 72 },
    { "position": "Token 7", "dflash": 12, "eagle": 44, "flashmap": 66 },
    { "position": "Token 8", "dflash": 7, "eagle": 38, "flashmap": 59 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Autoregressive decoding is bound by memory bandwidth. For sequence batch size $B=1$, each newly decoded token requires loading tens of gigabytes of model weights from High Bandwidth Memory (HBM) to on-chip SRAM to execute simple matrix-vector products. The operational intensity sits near 1 FLOP per byte, leaving GPU Tensor Cores starved for work.

Speculative decoding alters this dynamic by shifting the workload into the compute-bound regime of the Roofline model. Instead of evaluating one token per memory fetch, a lightweight draft model proposes a candidate sequence of $K$ tokens. The target LLM evaluates the entire proposal simultaneously in a single forward pass, transforming $K$ sequential memory-bound operations into one matrix-matrix multiplication with arithmetic intensity scaling proportionally to $K$.

While autoregressive drafters (such as EAGLE-3 or Medusa) generate draft candidates sequentially, their draft latency scales as $O(K)$. Non-causal block drafters (such as DFlash) addressed this by generating all $K$ tokens in a single $O(1)$ forward pass. 

However, non-causal discrete drafters introduced an architectural limitation: the conditional independence assumption.

```
+---------------------------------------------------------------------------------------------------------------+
| COMPARATIVE SPECULATIVE DRAFTING PARADIGMS                                                                    |
+------------------------------+---------------------------+------------------------+---------------------------+
| Architectural Attribute      | Autoregressive (EAGLE-3)  | Block Diffusion (DFlash)| Flow Map (FlashMap)      |
+------------------------------+---------------------------+------------------------+---------------------------+
| Drafting Complexity          | O(K) sequential passes    | O(1) single pass       | O(1) single pass          |
| Inter-Token Conditioning     | Strict causal conditioning| Factorized independent | Continuous joint coupling |
| Mathematical Formulation     | Chain rule of probability | Factorized categorical | Continuous ODE flow field |
| Suffix Decay Penalty         | Low (sequential feedback) | Catastrophic (>60% drop| Minimal (<15% drop at K=6)|
| Mean Accepted Tokens (MATL)  | 3.1 - 3.8 tokens          | 2.2 - 2.9 tokens       | 4.6 - 5.2 tokens          |
| Drafter KV Cache Overhead    | High (dedicated KV cache) | Medium (Paged state)   | Zero (in-place reuse)     |
| Realized Wall-Clock Speedup  | 2.1x - 3.2x               | 3.0x - 4.2x            | 4.5x - 6.1x               |
| Perplexity Impact            | 0.00% (strictly lossless) | 0.00% (lossless)       | 0.00% (lossless)          |
+------------------------------+---------------------------+------------------------+---------------------------+
```

---

### 1. The Factorization Trap and Suffix Decay

The fundamental flaw in previous non-causal parallel drafting models lies in the conditional independence assumption across target draft positions.

Given the target model hidden state $h_{\text{target}}$ representing context history $x_{\le t}$, a factorized block drafter models the joint probability of future tokens $y_{1:K} = (x_{t+1}, \dots, x_{t+K})$ as:

$$p(y_{1:K} \mid h_{\text{target}}) \approx \prod_{k=1}^K p(y_k \mid h_{\text{target}})$$

This assumption fails in structured domains like code syntax, JSON serialization, and chain-of-thought mathematical derivation. 

Consider a draft block where position $k=1$ produces the identifier `total_price` and position $k=2$ produces the operator `=`. The probability distribution of token $k=2$ is conditionally dependent on token $k=1$:

$$p(y_2 \mid y_1, h_{\text{target}}) \ne p(y_2 \mid h_{\text{target}})$$

When a factorized drafter evaluates position $k=2$, it conditions solely on $h_{\text{target}}$ (which ends at token $t$). It has no mechanism to observe that position $k=1$ selected `total_price`. 

As a consequence, the mutual covariance between tokens is ignored:

$$\text{Cov}_{p}(y_i, y_j \mid h_{\text{target}}) \approx 0 \quad \text{for } i \ne j$$

During target verification via modified rejection sampling, the acceptance probability of candidate token $y_k$ depends on the prefix of accepted tokens:

$$\alpha_k = \min\left(1, \frac{P_{\text{target}}(y_k \mid x_{\le t}, y_1, \dots, y_{k-1})}{P_{\text{draft}}(y_k \mid x_{\le t}, y_1, \dots, y_{k-1})}\right)$$

Because $P_{\text{draft}}$ fails to condition on the earlier proposed tokens, the divergence between $P_{\text{draft}}$ and $P_{\text{target}}$ expands rapidly with sequence index $k$. The cumulative acceptance probability decays exponentially:

$$\mathbb{P}(\text{Accept } y_{1:K}) = \prod_{k=1}^K \alpha_k \longrightarrow 0 \quad \text{as } K \ge 4$$

In production deployments of DFlash, this manifests as high acceptance on position 1 (85% to 92%), followed by a sharp drop to under 20% on position 6. The GPU executes speculative verification for eight tokens but accepts barely two.

---

### 2. Continuous Flow Matching for Language Drafting

FlashMap resolves the factorization trap by formulating block generation not as discrete independent categorical classification, but as a continuous probability transport along a vector field governed by an Ordinary Differential Equation (ODE).

```
                            FLASHMAP ODE CONTINUOUS FLOW
                            
      Prior Base Latent               Flow Velocity Field              Data Target Latent
      z₀ ~ 𝒩(0, I) ∈ ℝ^(K×d)         v_θ(z_t, t | h_target)           z₁ ∈ ℝ^(K×d)
    ┌─────────────────────────┐     ┌───────────────────────┐       ┌─────────────────────────┐
    │ [Pos 1]: Gaussian Noise │     │ Vector Field Network  │       │ [Pos 1]: "total"        │
    │ [Pos 2]: Gaussian Noise │ ──► │  Bidirectional Cross  │ ───►  │ [Pos 2]: "_price"       │
    │ [Pos 3]: Gaussian Noise │     │    and Self-Attention │       │ [Pos 3]: " ="           │
    │ [Pos 4]: Gaussian Noise │     │     across all K      │       │ [Pos 4]: " items"       │
    └─────────────────────────┘     └───────────────────────┘       └─────────────────────────┘
                 t = 0                    Euler Integration                     t = 1
                                    dz_t / dt = v_θ(z_t, t | h)
```

Instead of predicting discrete tokens directly, FlashMap operates on continuous latent embeddings. 

Let $x_1 \in \mathbb{R}^{K \times d}$ denote the continuous representations of the ground-truth target tokens across $K$ positions, and let $x_0 \sim \mathcal{N}(0, I_{K \times d})$ represent a base Gaussian noise prior.

We define a time-dependent probability path $p_t(x)$ for $t \in [0, 1]$ using affine interpolation:

$$\psi_t(x) = (1 - t) x_0 + t x_1$$

The time derivative of this trajectory defines the target vector field:

$$\frac{d \psi_t(x)}{d t} = x_1 - x_0$$

A neural network parameterized by $\theta$, denoted as $v_\theta(z_t, t \mid h_{\text{target}})$, is trained to approximate this vector field by minimizing the Continuous Flow Matching (CFM) objective:

$$\mathcal{L}_{\text{FM}}(\theta) = \mathbb{E}_{t \sim \mathcal{U}(0, 1), x_0 \sim \mathcal{N}(0, I), x_1 \sim p_{\text{data}}} \left[ \left\| v_\theta(\psi_t(x_0), t \mid h_{\text{target}}) - (x_1 - x_0) \right\|_2^2 \right]$$

#### Joint Positional Coupling in the Vector Field
The critical architectural property of FlashMap is that $v_\theta$ operates on the entire block $z_t \in \mathbb{R}^{K \times d}$ concurrently using bidirectional self-attention:

$$Q = z_t W_Q, \quad K_{\text{attn}} = [z_t; h_{\text{target}}] W_K, \quad V = [z_t; h_{\text{target}}] W_V$$

$$\text{Attention}(Q, K_{\text{attn}}, V) = \text{Softmax}\left(\frac{Q K_{\text{attn}}^T}{\sqrt{d_k}}\right) V$$

Because the attention mask across the $K$ candidate positions is unmasked (non-causal bidirectional), the vector field computed for position $k$ directly incorporates the latent states of all other positions $j \ne k$ at time $t$. 

The continuous representation captures inter-token correlations throughout the forward trajectory, eliminating the factorization error.

---

### 3. Numerical ODE Integration and Inference Latency

During online inference, the drafter starts from sampled noise $z_0 \sim \mathcal{N}(0, I)$ and integrates the learned velocity field from $t = 0$ to $t = 1$:

$$z_1 = z_0 + \int_0^1 v_\theta(z_t, t \mid h_{\text{target}}) \, dt$$

Solving an ODE generally requires multiple numerical integration steps (such as Runge-Kutta 4th order). In speculative decoding, every additional forward pass added to the drafter increases draft latency, eroding the wall-clock speedup.

FlashMap trains the vector field using optimal transport straight paths. Because the trajectory $\psi_t(x) = (1 - t)x_0 + tx_1$ is linear, the vector field $v_\theta$ is nearly constant along the path:

$$\frac{d^2 \psi_t(x)}{d t^2} = 0$$

This allows FlashMap to integrate the ODE in a **single Euler step**:

$$z_1 \approx z_0 + v_\theta(z_0, 0 \mid h_{\text{target}})$$

A single forward pass through the lightweight velocity network (typically 4 to 6 transformer layers) yields the final continuous representation $z_1 \in \mathbb{R}^{K \times d}$. 

The continuous vectors are mapped to discrete token logits via the shared language model embedding matrix $W_U$:

$$\text{Logits}_k = z_{1, k} W_U^T \in \mathbb{R}^{V}$$

```
    Single-Step Euler vs. Two-Step Midpoint Latency Breakdown:
    
    1-Step Euler ODE (Default Production Mode):
    [Sample z0] ──► [v_θ Forward Pass (3.2 ms)] ──► [Unembed Logits (0.6 ms)]
    Total Drafting Latency: 3.8 ms (100% of maximum speedup)
    
    2-Step Midpoint ODE (High-Entropy / Reasoning Mode):
    [Sample z0] ──► [v_θ(z0, 0)] ──► [z_mid] ──► [v_θ(z_mid, 0.5)] ──► [Logits]
    Total Drafting Latency: 7.1 ms (Trade-off: +8% acceptance length)
```

---

### 4. Lossless Speculative Verification and Tree Attention

A non-negotiable requirement for production inference is distribution preservation. If speculative decoding alters the output text or degrades benchmark scores, it cannot be deployed in mission-critical applications.

FlashMap guarantees exact distribution preservation using modified rejection sampling.

#### The Rejection Sampling Invariant
Let $q(y_k \mid x_{<k})$ be the draft distribution emitted by FlashMap for position $k$, and let $p(y_k \mid x_{<k})$ be the true distribution computed by the target LLM. 

For each proposed token $y_k$ in the block $k \in \{1, \dots, K\}$, the verification engine evaluates:

1. Sample uniform variable $r \sim \mathcal{U}(0, 1)$.
2. If $r \le \min\left(1, \frac{p(y_k \mid x_{<k})}{q(y_k \mid x_{<k})}\right)$, accept $y_k$.
3. If $r > \frac{p(y_k \mid x_{<k})}{q(y_k \mid x_{<k})}$, reject $y_k$, discard all subsequent candidates $y_{k+1:K}$, and sample a replacement token from the normalized residual distribution:

$$p_{\text{recovery}}(y) = \frac{\max(0, p(y \mid x_{<k}) - q(y \mid x_{<k}))}{\sum_{y'} \max(0, p(y' \mid x_{<k}) - q(y' \mid x_{<k}))}$$

Mathematically, the probability of the accepted token matches the target model distribution:

$$\mathbb{P}(Y = y) = q(y) \min\left(1, \frac{p(y)}{q(y)}\right) + \left(1 - \sum_{y'} q(y') \min\left(1, \frac{p(y')}{q(y')}\right)\right) p_{\text{recovery}}(y) \equiv p(y)$$

The target model's output distribution remains unmodified. FlashMap functions purely as a hardware-level accelerator.

---

### 5. Production Implementation in PyTorch

The following complete PyTorch implementation demonstrates the FlashMap continuous flow drafter module, including the vector field network, Euler integration step, and speculative candidate generation.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class FlashMapFlowVelocityNetwork(nn.Module):
    """
    Continuous Flow Map Drafter (FlashMap).
    Parameterizes the vector field v_theta(z_t, t | h_target)
    for multi-token block speculative decoding.
    """
    def __init__(
        self,
        hidden_dim: int = 4096,
        drafter_layers: int = 5,
        num_heads: int = 32,
        block_size: int = 8,
        vocab_size: int = 151936
    ):
        super().__init__()
        self.hidden_dim = hidden_dim
        self.block_size = block_size
        self.vocab_size = vocab_size

        # Positional embedding for the draft block tokens (1 to K)
        self.block_pos_embed = nn.Embedding(block_size, hidden_dim)
        
        # Continuous time step embedding (t in [0, 1])
        self.time_mlp = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim)
        )

        # Non-causal bidirectional transformer layers
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=hidden_dim,
            nhead=num_heads,
            dim_feedforward=hidden_dim * 4,
            dropout=0.0,
            activation="gelu",
            batch_first=True,
            norm_first=True
        )
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers=drafter_layers)
        
        # Output projection for velocity field
        self.velocity_out = nn.Linear(hidden_dim, hidden_dim)
        self.norm = nn.LayerNorm(hidden_dim)

    def _sinusoidal_time_embedding(self, t: torch.Tensor) -> torch.Tensor:
        """Embeds continuous time t in [0, 1] using sinusoidal frequencies."""
        half_dim = self.hidden_dim // 2
        freqs = torch.exp(-torch.arange(half_dim, device=t.device) * (9.210340371976184 / (half_dim - 1)))
        args = t[:, None] * freqs[None, :]
        embedding = torch.cat([torch.sin(args), torch.cos(args)], dim=-1)
        return self.time_mlp(embedding)

    def forward(
        self,
        z_t: torch.Tensor,
        t: torch.Tensor,
        h_target: torch.Tensor
    ) -> torch.Tensor:
        """
        Calculates the velocity vector field v_theta.
        Args:
            z_t: Current latent state of shape [B, K, D]
            t: Scalar time tensor of shape [B]
            h_target: Final hidden state from target model [B, 1, D]
        Returns:
            v_t: Velocity vector of shape [B, K, D]
        """
        B, K, D = z_t.shape
        pos_ids = torch.arange(K, device=z_t.device).unsqueeze(0).expand(B, K)
        pos_emb = self.block_pos_embed(pos_ids)
        
        # Condition on continuous time step
        t_emb = self._sinusoidal_time_embedding(t).unsqueeze(1)  # [B, 1, D]
        
        # Inject target context into every position in the draft block
        x = z_t + pos_emb + t_emb + h_target
        
        # Evaluate non-causal bidirectional self-attention
        hidden = self.transformer(x)
        v_t = self.velocity_out(self.norm(hidden))
        return v_t

class FlashMapDrafter(nn.Module):
    """
    FlashMap Speculative Engine Runner.
    Executes single-step Euler integration to propose candidate blocks.
    """
    def __init__(self, velocity_net: FlashMapFlowVelocityNetwork, unembed_weight: torch.Tensor):
        super().__init__()
        self.velocity_net = velocity_net
        self.unembed_weight = unembed_weight  # Shared LM head [Vocab, Hidden]

    @torch.inference_mode()
    def draft_block(
        self,
        h_target: torch.Tensor,
        temperature: float = 0.0
    ) -> torch.Tensor:
        """
        Proposes K speculative tokens in one O(1) Euler ODE forward pass.
        Args:
            h_target: Target model context vector [B, 1, D]
            temperature: Sampling temperature (0.0 for greedy argmax)
        Returns:
            draft_token_ids: Proposed candidate token IDs of shape [B, K]
        """
        B = h_target.shape[0]
        K = self.velocity_net.block_size
        D = self.velocity_net.hidden_dim

        # 1. Sample base Gaussian noise prior z_0 ~ N(0, I)
        z_0 = torch.randn(B, K, D, device=h_target.device, dtype=h_target.dtype)
        t_0 = torch.zeros(B, device=h_target.device, dtype=h_target.dtype)

        # 2. Evaluate velocity vector field at t = 0
        v_0 = self.velocity_net(z_0, t_0, h_target)

        # 3. 1-Step Euler ODE integration: z_1 = z_0 + delta_t * v_0 (delta_t = 1.0)
        z_1 = z_0 + v_0

        # 4. Project continuous representation to vocabulary logits
        logits = F.linear(z_1, self.unembed_weight)  # [B, K, Vocab]

        # 5. Token selection
        if temperature > 0.0:
            probs = F.softmax(logits / temperature, dim=-1)
            draft_token_ids = torch.multinomial(probs.view(-1, self.velocity_net.vocab_size), num_samples=1).view(B, K)
        else:
            draft_token_ids = torch.argmax(logits, dim=-1)

        return draft_token_ids
```

---

### 6. Serving Integration and Kernel Execution in vLLM / SGLang

Integrating FlashMap into industrial runtimes like vLLM and SGLang requires coordinating three sub-systems: memory allocation, draft execution, and verification kernels.

```
                           VLLM ENGINE INTEGRATION
                           
    Target Model Forward (Step t)
               │
               ▼ Emits target hidden state h_target (FP16/BF16)
    ┌────────────────────────────────────────────────────────┐
    │ FlashMap Drafter (CUDA Stream A)                       │
    │  - Reads h_target directly in SRAM                     │
    │  - Evaluates 1-step Euler ODE                          │
    │  - Zero auxiliary drafter KV cache allocation          │
    │  - Emits candidate token block (K=8 tokens)            │
    └──────────┬─────────────────────────────────────────────┘
               │
               ▼ Candidate block passed to target worker
    ┌────────────────────────────────────────────────────────┐
    │ Target Verification Kernel (CUDA Stream B)             │
    │  - FlashInfer / FlashAttention-3 Tree Attention        │
    │  - Evaluates all K tokens in single forward pass       │
    │  - Modified rejection sampling kernel                  │
    │  - Updates PagedAttention KV cache with accepted tokens│
    └────────────────────────────────────────────────────────┘
```

#### Zero-Drafter-Side KV Cache Footprint
Standard speculative decoding engines allocate a parallel KV cache for the draft model. In long-context serving (32k to 128k tokens), the drafter KV cache consumes 15% to 25% of total High Bandwidth Memory, limiting the engine's maximum concurrency.

Because FlashMap parameterizes draft generation as an ODE conditioned strictly on the target model's final hidden state $h_{\text{target}}$, the drafter requires **zero historical KV cache**. The memory overhead per request is limited to the current latent tensor $z_t \in \mathbb{R}^{K \times d}$ (less than 128 KB of temporary memory), freeing GPU capacity for user requests.

---

### 7. Empirical Hardware Benchmarks and Performance Analysis

FlashMap was evaluated across frontier open-weight models including Qwen3-8B, LLaMA-3.3-70B, and DeepSeek-V3 on NVIDIA H100 SXM5 (80GB HBM3) and consumer workstation hardware (NVIDIA RTX 4090 / 5090).

```
+---------------------------------------------------------------------------------------------------------------+
| FLASHMAP PRODUCTION INFERENCE BENCHMARK (Qwen3-8B on NVIDIA H100 SXM5)                                        |
+------------------------------+--------------------+---------------------+--------------------+----------------+
| Metric Evaluation            | Baseline vLLM      | vLLM + EAGLE-3      | vLLM + DFlash      | vLLM + FlashMap|
+------------------------------+--------------------+---------------------+--------------------+----------------+
| Decoding Mode                | Autoregressive     | Autoregressive Draft| Discrete Diffusion | Continuous Flow|
| Draft Block Size (K)         | N/A                | 6 tokens            | 8 tokens           | 8 tokens       |
| Draft Forward Passes         | 0                  | 6 passes (O(K))     | 1 pass (O(1))      | 1 pass (O(1))  |
| Drafting Latency             | 0.0 ms             | 14.8 ms             | 3.6 ms             | 3.8 ms         |
| Target Verification Latency  | 8.4 ms (1 token)   | 11.2 ms (6 tokens)  | 12.1 ms (8 tokens) | 12.1 ms (8 tok)|
| Mean Accepted Tokens (MATL)  | 1.00 token/step    | 3.24 tokens/step    | 2.45 tokens/step   | 4.92 tok/step  |
| Acceptance at Position 1     | 100.0%             | 86.4%               | 88.1%              | 93.4%          |
| Acceptance at Position 4     | N/A                | 64.2%               | 35.2%              | 81.2%          |
| Acceptance at Position 6     | N/A                | 51.0%               | 18.4%              | 72.5%          |
| Inter-Token Latency (ITL P50)| 8.40 ms/tok        | 3.45 ms/tok         | 2.88 ms/tok        | 1.62 ms/tok    |
| Peak Wall-Clock Speedup      | 1.00x              | 2.43x               | 3.12x              | 5.18x          |
| Code Generation Peak Speedup | 1.00x              | 2.81x               | 3.40x              | 6.12x          |
| Output Distribution Drift    | 0.00 (Exact Match) | 0.00 (Exact Match)  | 0.00 (Exact Match) | 0.00 (Exact)   |
+------------------------------+--------------------+---------------------+--------------------+----------------+
```

#### Observations from Production Telemetry
1. **Elimination of Suffix Collapse:** At draft position 6, DFlash experiences an acceptance crash down to 18.4%. FlashMap preserves a 72.5% acceptance rate at position 6, proving that continuous flow ODEs effectively propagate inter-token grammatical constraints.
2. **Wall-Clock Gains on High Arithmetic Intensity:** In code generation benchmarks (HumanEval and SWE-bench), FlashMap hits a **6.12x wall-clock speedup**. Because coding syntax exhibits high predictability when joint position coupling is preserved, the target model accepts complete multi-line blocks in single verification steps.
3. **Consumer Hardware Viability:** On a single NVIDIA RTX 4090 (24GB VRAM), running Qwen3-8B in FP8 with FlashMap generates 142 tokens per second, compared to 28 tokens per second on vanilla autoregressive decoding.

---

### 8. Architectural Dilemmas and Practitioner Rules

When integrating continuous flow speculative drafters into production clusters, senior engineers should manage three concrete operational parameters:

- **Block Length Selection ($K=5$ vs. $K=8$):** Setting $K=8$ maximizes speedups on structured code generation and structured JSON generation. However, on creative writing and open-ended dialogue, high semantic entropy reduces token acceptance beyond position 5. In conversational agent pools, configuring $K=5$ minimizes verification compute overhead.
- **Velocity Network Capacity:** Training a drafter with more than 6 layers yields diminishing returns. A 4-layer or 5-layer velocity model matches the representation capacity required for ODE transport while keeping kernel execution under 4 milliseconds on Hopper Tensor Cores.
- **Shared LM Head vs. Independent Projection:** Reusing the target model's language model unembedding weights ($W_U$) saves hundreds of megabytes of GPU memory. However, initializing an independent, low-rank projection layer ($d_{\text{target}} \to d_{\text{vocab}}$) during flow matching training yields a 4% increase in draft acceptance on technical corpora.
:::
