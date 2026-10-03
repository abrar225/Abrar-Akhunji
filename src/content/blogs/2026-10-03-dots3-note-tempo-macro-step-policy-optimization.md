---
title: "Inside dots3-note & TEMPO: RedNote's 280B Multimodal MoE and How Macro-Step Policy Optimization Fixes Long-Horizon Agent Degradation"
date: "2026-10-03"
description: "A comprehensive systems deep dive into dots studio's open-weight dots3-note preview (280B total / 16B active MoE) and the TEMPO framework: how macro-step actor-critic switching and test-time value estimation solve credit assignment collapse across 500+ step autonomous agent trajectories."
tags: ["dots3-note", "TEMPO", "Reinforcement Learning", "MoE", "Autonomous Agents", "Multimodal AI", "vLLM", "Long-Horizon Reasoning", "Systems Engineering"]
author: "Abrar Akhunji"
heroImage: "/images/blog/dots3-note-tempo-macro-step-policy-optimization/hero.jpg"
techTree:
  branch: "Autonomous Agent Architectures & RL"
  level: 3
  prerequisites: ["2026-10-02-k2-horizon-mova-mixture-of-value-attention", "2026-08-24-test-time-compute-tree-grpo-mcts-reasoning"]
faq:
  - question: "What is dots3-note and who developed it?"
    answer: "dots3-note preview is an open-weight 280B multimodal Mixture-of-Experts (MoE) foundation model developed by dots studio, the artificial intelligence research lab of RedNote (Xiaohongshu). Released under the Apache 2.0 license, it operates with 16B active parameters per token, natively ingests text, images, video, and audio, and supports a native 512K context window."
  - question: "What is the core breakthrough of the TEMPO reinforcement learning framework?"
    answer: "TEMPO (Test-time-scaled Value Estimation with Macro-step Policy Optimization) is a reinforcement learning architecture specifically formulated to solve the credit assignment collapse in long-horizon autonomous tasks. Rather than calculating advantage functions over hundreds of noisy individual tool calls, TEMPO aggregates execution into discrete macro-steps, periodically toggling the model from an actor into an evaluator (critic) that utilizes test-time compute to estimate remaining trajectory returns."
  - question: "Why do traditional reinforcement learning algorithms (like PPO, DPO, or GRPO) fail on multi-hour agent workflows?"
    answer: "Standard policy optimization relies on Monte Carlo returns or monolithic value heads where the variance of the gradient estimator scales proportionally with trajectory length T. In agent workflows exceeding 50 to 100 tool interactions, sparse terminal feedback causes credit assignment to collapse: an error in step 87 penalizes early correct steps, or accidental success rewards catastrophic intermediate hallucinations."
  - question: "How does Actor-Critic switching operate under TEMPO?"
    answer: "At the conclusion of each macro-step boundary, a specialized control token toggles the model from generation (Actor mode) to verification (Critic mode). In Critic mode, the model allocates test-time reasoning tokens to simulate prospective rollouts and verify intermediate state invariants against contract specifications, producing a dense, highly calibrated advantage signal without requiring an external reward model."
  - question: "What are VibeSearchBench and VibeLifeBench?"
    answer: "VibeSearchBench and VibeLifeBench are two dynamic evaluation environments released alongside dots3-note by dots studio. They benchmark models on open-ended, real-world, long-horizon objectives (such as multi-day logistical coordination, complex full-stack codebase refactors, and research synthesis) where tasks lack deterministic single-token answers."
  - question: "How is dots3-note served efficiently in production inference stacks like vLLM and SGLang?"
    answer: "With 280B total parameters and 16B active parameters per token, dots3-note is deployed using hybrid Tensor Parallelism and Expert Parallelism (TP4-EP2 or TP8). In vLLM and SGLang, radix attention and prefix caching ensure that the frequent switching between actor execution and critic verification incurs minimal Time-to-First-Token (TTFT) latency overhead."
---

:::eli5
*Written by Abrar Akhunji*

Have you ever tried to assemble a 2,000-piece Lego castle without looking at the instruction booklet after step one? 

For the first five minutes, you feel like a genius. By step 40, you’ve put three red pillars in the wrong room. By step 120, your castle roof caves in, and you have no idea which brick caused the disaster.

This is the exact nightmare confronting today's autonomous AI coding agents and assistants.

---

### The Silent Crisis of AI Agents: "Trajectory Drift"
When you ask modern AI models (like Claude, GPT-4o, or DeepSeek) to perform a quick task—such as writing a regex or drafting an email—they shine. But when you ask them to manage an autonomous, 3-hour software migration involving 80 terminal commands, 14 API calls, and 25 file edits, they almost always crash and burn.

Why? Because of **Credit Assignment Collapse**:
1. In standard AI training, the model only gets a "score" at the very end (did the whole task succeed or fail?).
2. If an agent executes 90 great actions and makes one fatal typo on step 91, the training algorithm accidentally punishes all 90 brilliant actions.
3. Conversely, if an agent bumbles around randomly and gets lucky at step 100, the algorithm rewards its terrible intermediate hallucinations!

Over time, this makes long-horizon agents jittery, fragile, and prone to endless hallucination loops.

---

### Enter dots3-note and the TEMPO Framework
In an industry-shaking release, **dots studio** (the frontier AI research laboratory at RedNote/Xiaohongshu) open-sourced **dots3-note preview** under the **Apache 2.0 license**.

It is a massive **280-Billion parameter multimodal Mixture-of-Experts (MoE)** model that runs with the speed and efficiency of a lean **16-Billion active parameter** engine. It natively hears audio, sees images and video, reads text, and handles an enormous **512,000 token context window**.

But the real crown jewel isn't just its raw size—it is **TEMPO** (**T**est-time-scaled Value **E**stimation with **M**acro-step **P**olicy **O**ptimization).

```
Standard Agent: Blind Sprinting until Crash
[ Step 1 ] ──> [ Step 2 ] ──> [ ... ] ──> [ Step 87: Bug! ] ──> [ Step 120: Total Failure ]
(No checkpoints, no reflection, impossible credit assignment)

TEMPO Agent: Structured Macro-Steps with Actor-Critic Checkpoints
[ Macro-Step 1: Scoping ] ──> [ CRITIC PAUSE: Test-Time Value Check ] ── (Pass)
                                              │
[ Macro-Step 2: Core Coding ] ──> [ CRITIC PAUSE: Test-Time Verification ] ── (Catch bug & self-correct)
                                              │
[ Macro-Step 3: Verification ] ──> [ Autonomous Goal Delivery ]
```

### The Magic of Actor-Critic Switching
Instead of running blindly for 200 steps, TEMPO breaks complex missions into **Macro-Steps** (milestones). 

At the end of every milestone:
1. **The Model Freezes Its Hands (Actor Phase Ends):** The agent stops executing commands.
2. **The Model Puts on Its Glasses (Critic Phase Begins):** It temporarily morphs into a harsh, objective code reviewer.
3. **Test-Time "What-If" Reasoning:** It spends extra thinking tokens simulating future outcomes: *"If we proceed down this path, will the build succeed? Are we deviating from the user's constraints?"*
4. **Course Correction:** If it detects drift, it adjusts its strategy and updates its internal memory *before* making the next move.

The result? An agent that can execute hundreds of consecutive actions over hours without losing its mind or wandering into hallucination traps.

Let’s dive into the tensor mathematics, reinforcement learning loss functions, PyTorch architectures, and production serving benchmarks that power this breakthrough.
:::

:::dev
*Written by Abrar Akhunji*

In frontier autonomous systems engineering, the primary operational bottleneck is no longer short-context perceptual reasoning or next-token cross-entropy loss. Rather, the central failure mode of contemporary LLM agents deployed in software engineering, autonomous security auditing, and continuous operations is **long-horizon policy degradation**.

When an agent interacts with a dynamic environment (bash terminals, git version control, database schemas, and microservice APIs) across extended horizons ($T \ge 100$ sequential interactions), traditional Reinforcement Learning (RL) frameworks—such as Proximal Policy Optimization (PPO), Direct Preference Optimization (DPO), and Grouped Relative Policy Optimization (GRPO)—experience catastrophic gradient variance and credit assignment collapse.

In late 2026, **dots studio** (the frontier AI research division of RedNote / Xiaohongshu) addressed this architectural ceiling with the release of **dots3-note preview** under the **Apache 2.0 license**. The release pairs a 280B multimodal Sparse Mixture-of-Experts (MoE) foundation with **TEMPO** (**T**est-time-scaled Value **E**stimation with **M**acro-step **P**olicy **O**ptimization), a mathematically rigorous reinforcement learning framework that redefines intermediate credit assignment for long-horizon agentic workflows.

```
+-------------------------------------------------------------------------------------------------------+
| ARCHITECTURAL SPECIFICATION: DOTS3-NOTE PREVIEW (OCTOBER 2026)                                        |
+--------------------------+----------------------------------------------------------------------------+
| Parameter Base           | 280 Billion Total Parameters                                               |
| Active Params per Token  | 16.2 Billion Parameters (~5.78% activation sparsity)                       |
| Architecture Topology    | Multimodal Sparse MoE Transformer (Text, Vision, Audio, Video Tokens)       |
| Routing Mechanism        | Top-2 Fine-Grained Dynamic Dispatch + 2 Dedicated Shared Invariant Experts |
| Context Horizon          | 512,000 Native Tokens (YaRN-scaled RoPE with Grouped-Query Attention)      |
| Attention Geometry       | 64 Query Heads, 8 Key-Value Heads (GQA 8:1 ratio), Head Dimension = 128    |
| Vocabulary & Tokenizer   | 152,064 Tiktoken-based BPE (Native Multimodal Sensor Modality Embeddings)   |
| Policy Optimization      | TEMPO: Macro-Step Actor-Critic Switching + Test-Time Value Estimation      |
| License                  | Apache 2.0 (Weights, Inference Kernels, and Evaluation Benchmarks)         |
+--------------------------+----------------------------------------------------------------------------+
```

---

### Section 1: The Mathematics of Long-Horizon Credit Assignment Collapse

To understand why TEMPO represents a fundamental pivot in foundation model post-training, we must first formalize the failure mechanics of standard trajectory-level policy optimization.

Consider an agent operating within a Markov Decision Process (MDP) $\mathcal{M} = \langle \mathcal{S}, \mathcal{A}, \mathcal{P}, \mathcal{R}, \gamma \rangle$. In long-horizon agentic workflows, an episode trajectory $\tau$ consists of $T$ state-action-observation transitions:

$$\tau = (s_0, a_0, o_1, s_1, a_1, o_2, \dots, s_{T-1}, a_{T-1}, o_T, s_T)$$

Under standard Policy Gradient theorem, the objective gradient $\nabla_\theta J(\theta)$ is given by:

$$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t \mid s_t) \cdot \hat{A}_t \right]$$

Where $\hat{A}_t$ is the generalized advantage estimator:

$$\hat{A}_t = \sum_{l=0}^{T-t-1} (\gamma \lambda)^l \delta_{t+l}^V, \quad \text{with } \delta_t^V = r_t + \gamma V(s_{t+1}) - V(s_t)$$

#### The Variance Catastrophe as Horizon Scales

In realistic software engineering benchmarks (e.g., SWE-Bench Verified or VibeLifeBench), environmental rewards are strictly sparse:

$$r_t = \begin{cases} 
1.0 & \text{if } t = T \text{ and all unit tests pass} \\
0.0 & \text{for all intermediate steps } t < T
\end{cases}$$

When $T \to \infty$ ($T \ge 100$):
1. **Vanishing Signal-to-Noise Ratio (SNR):** The empirical variance of the cumulative return estimator explodes exponentially:
   $$\text{Var}\left( \sum_{t=0}^{T-1} r_t \right) = \mathcal{O}(T \cdot \sigma_r^2)$$
2. **Spurious Correlation & Intermediate Hallucination:** If step $t=14$ introduces a fatal memory leak that only triggers a test failure at step $t=92$, a standard value head $V(s_t)$ lacks the parametric resolution to assign negative advantage specifically to step 14. Instead, the negative gradient washes across the entire trajectory, penalizing optimal upstream refactors.
3. **Frozen Value Head Drift:** Monolithic critic networks trained alongside the policy suffer from out-of-distribution (OOD) value collapse when the policy explores novel tool invocation chains.

---

### Section 2: The TEMPO Formulation: Macro-Steps & Test-Time Value Estimation

TEMPO resolves the variance catastrophe by abandoning flat, single-token or single-action credit assignment. It introduces two foundational concepts: **Macro-Step Decomposition** and **Test-Time Scaled Value Estimation**.

```
TEMPO TRAJECTORY TOPOLOGY:
 
 Trajectory Horizon: T steps
 ├── Macro-Step M_1 (Steps 0 .. L_1-1) ──────────────┐
 │   └── [ Actor Mode: Fast Tool Execution ]         │
 │                                                   ▼
 │       [ Boundary Tau_1 ]: ACTOR-TO-CRITIC SWITCH ───> Test-Time Value Rollout: V_TEMPO(s_{L1})
 │                                                   ▲
 ├── Macro-Step M_2 (Steps L_1 .. L_2-1) ────────────┘ (Dense Calibrated Advantage)
 │   └── [ Actor Mode: Resumed Execution ]
 │                                                   ▼
 │       [ Boundary Tau_2 ]: ACTOR-TO-CRITIC SWITCH ───> Test-Time Value Rollout: V_TEMPO(s_{L2})
 ...
```

#### 1. Macro-Step State Aggregation

Instead of treating every individual tool call as a reinforcement learning boundary, TEMPO partitions trajectory $\tau$ into $K$ semantic macro-steps:

$$\tau = \{ \mathcal{M}_1, \mathcal{M}_2, \dots, \mathcal{M}_K \}, \quad \text{where } \mathcal{M}_k = (s_{k, 0}, a_{k, 0}, \dots, s_{k, L_k})$$

A macro-step boundary is triggered dynamically when:
- An atomic sub-goal is declared completed (e.g., a git branch is created, a test suite is compiled, or a schema migration script is generated).
- Or the internal token budget for the current operational phase reaches a pre-allocated limit $L_{\max}$.

#### 2. Actor-Critic Dynamic Role Switching

Rather than maintaining a separate, concurrently trained value network that struggles to track the policy's evolving latent space, **dots3-note acts as its own critic**.

At each macro-step boundary $k$, an internal mode switch is executed via a special transition token `[CRITIC_EVAL_ENTER]`. The model halts external environment execution and enters an internal self-evaluation phase.

#### 3. Test-Time Scaled Value Estimation ($V_{\text{TEMPO}}$)

In Critic mode, the model does not emit a scalar logit from a frozen linear head. Instead, it deploys **Test-Time Compute** (Monte Carlo tree search or multi-candidate rollouts with self-verification) to estimate the expected value of the current state:

$$V_{\text{TEMPO}}(s_k) = \frac{1}{N} \sum_{i=1}^N \mathcal{V}_{\text{verify}}\left( \text{Rollout}_i(s_k; \pi_{\text{eval}}) \right)$$

Where $\mathcal{V}_{\text{verify}}$ is a deterministic verifier (e.g., linter output, type-checker verification, invariant consistency checks) combined with model-generated self-critique. 

The advantage function for macro-step $\mathcal{M}_k$ is then computed with minimal variance:

$$\hat{A}_k^{\text{macro}} = \sum_{j=k}^K (\gamma \lambda)^{j-k} \left[ r(\mathcal{M}_j) + \gamma V_{\text{TEMPO}}(s_{j+1, 0}) - V_{\text{TEMPO}}(s_{j, 0}) \right]$$

Because $K \ll T$ (typically $K \approx 5\text{--}15$ macro-steps for a 200-step trajectory), credit assignment variance is compressed by over **92%**, providing stable, directional gradient updates.

---

### Section 3: The dots3-note Multimodal Sparse MoE Architecture

The backbone powering this reasoning loop is the **dots3-note preview** foundation model. Designed by dots studio, it bridges massive cross-modal capacity with ultra-lean inference compute.

```
DOTS3-NOTE DUAL-STREAM SPARSE MOE LAYER:

                 [ Input Token Representation: x_t ]
                                  │
          ┌───────────────────────┴───────────────────────┐
          │                                               │
          ▼                                               ▼
  [ 2 Shared Experts ]                         [ Routing Gate: W_gate ]
  (Always active: invariant                    (Softmax routing over 64
   syntactic & multimodal                      fine-grained experts)
   representations)                                       │
          │                                               ▼
          │                                    [ Top-2 Expert Selection ]
          │                                               │
          │                                  ┌────────────┴────────────┐
          │                                  ▼                         ▼
          │                          [ Expert E_a ]             [ Expert E_b ]
          │                                  │                         │
          └───────────────────────┬──────────┴─────────────────────────┘
                                  ▼
                     [ Weighted Sum & Gated Add ]
                                  │
                                  ▼
                       [ Layer Normalization ]
```

#### Key Structural Details
1. **280B Base / 16.2B Active:** Across 64 Transformer layers, each Feed-Forward block contains **64 fine-grained experts** plus **2 dedicated shared experts**. For each token, the router selects the Top-2 fine-grained experts ($2 \times 7.1\text{B}$) while the 2 shared experts ($2.0\text{B}$) remain permanently active, preserving universal syntactic invariants.
2. **Unified Cross-Modal Embeddings:** Audio, video frames, and high-resolution images are mapped into the shared 6,144-dimensional hidden space using native continuous patch encoders rather than separate external decoders.
3. **512K Long-Context Stability:** Utilizes Grouped-Query Attention (GQA) with YaRN frequency scaling, preventing attention entropy collapse over 512,000 tokens during multi-hour agent executions.

---

### Section 4: Production-Grade PyTorch Reference Implementation

The following implementation provides a complete, runnable reference of the **TEMPO Macro-Step Policy Optimization** engine, demonstrating actor-critic mode switching, test-time rollout valuation, and macro-advantage computation.

```python
"""
tempo_macro_optimizer.py
Reference PyTorch implementation of TEMPO (Test-time-scaled Value Estimation 
with Macro-step Policy Optimization) for long-horizon agent workflows.
As featured in dots studio's dots3-note preview release (October 2026).
"""

import math
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple
import torch
import torch.nn as nn
import torch.nn.functional as F


@dataclass
class MacroStepTransition:
    """Represents an atomic macro-step containing intermediate states and actions."""
    step_id: int
    states: torch.Tensor          # [seq_len, d_model]
    actions: torch.Tensor         # [seq_len] token IDs
    log_probs: torch.Tensor       # [seq_len] action log probabilities
    intermediate_reward: float    # Environment feedback (if any)
    is_terminal: bool
    critic_value_estimate: Optional[float] = None


class TEMPOActorCriticEngine(nn.Module):
    """
    Unified Actor-Critic Backbone with Dynamic Mode Switching.
    Supports generation (Actor) and test-time simulated critique (Critic).
    """
    def __init__(self, d_model: int = 6144, vocab_size: int = 152064):
        super().__init__()
        self.d_model = d_model
        self.vocab_size = vocab_size

        # Mode switching tokens
        self.ACTOR_MODE_ID = 152060
        self.CRITIC_MODE_ID = 152061

        # Policy Generation Head
        self.lm_head = nn.Linear(d_model, vocab_size, bias=False)

        # Lightweight Invariant Projection Head for verification scoring
        self.verification_projector = nn.Sequential(
            nn.Linear(d_model, d_model // 4),
            nn.SiLU(),
            nn.Linear(d_model // 4, 1)
        )

    def forward_actor(self, hidden_states: torch.Tensor) -> torch.Tensor:
        """Actor Mode: Emits next-token logits for environment interaction."""
        return self.lm_head(hidden_states)

    def forward_critic_verification(self, hidden_states: torch.Tensor) -> torch.Tensor:
        """Critic Mode: Computes scalar state consistency invariant score."""
        pooled = hidden_states.mean(dim=1) # [batch, d_model]
        return self.verification_projector(pooled)


class TEMPOPolicyOptimizer:
    """
    Orchestrates Macro-Step Advantage Estimation and Policy Gradient Updates.
    Eliminates trajectory variance via test-time value rollouts.
    """
    def __init__(
        self,
        model: TEMPOActorCriticEngine,
        gamma: float = 0.99,
        gae_lambda: float = 0.95,
        clip_epsilon: float = 0.2,
        test_time_rollout_samples: int = 4
    ):
        self.model = model
        self.gamma = gamma
        self.gae_lambda = gae_lambda
        self.clip_epsilon = clip_epsilon
        self.num_rollouts = test_time_rollout_samples

    @torch.no_grad()
    def estimate_test_time_value(
        self, 
        current_state: torch.Tensor,
        verifier_env_fn
    ) -> float:
        """
        Executes test-time rollout search at macro-step boundary to compute V_TEMPO.
        Averages deterministic verification returns across simulated rollouts.
        """
        rollout_scores = []
        for _ in range(self.num_rollouts):
            # Simulate a multi-token reasoning trajectory using critic projection
            simulated_score = verifier_env_fn(current_state)
            rollout_scores.append(simulated_score)

        # Empirical expectation over test-time rollouts
        v_tempo = float(sum(rollout_scores) / len(rollout_scores))
        return v_tempo

    def compute_macro_advantages(
        self,
        macro_steps: List[MacroStepTransition]
    ) -> List[float]:
        """
        Calculates Generalized Advantage Estimation (GAE) across Macro-Step boundaries.
        Variance is bounded to K macro-steps instead of T atomic steps.
        """
        num_macro = len(macro_steps)
        advantages = [0.0] * num_macro
        last_gae = 0.0

        for t in reversed(range(num_macro)):
            curr_step = macro_steps[t]
            curr_val = curr_step.critic_value_estimate or 0.0

            if t == num_macro - 1:
                next_val = 0.0 if curr_step.is_terminal else curr_val
            else:
                next_val = macro_steps[t + 1].critic_value_estimate or 0.0

            delta = curr_step.intermediate_reward + self.gamma * next_val - curr_val
            last_gae = delta + self.gamma * self.gae_lambda * last_gae
            advantages[t] = last_gae

        return advantages

    def compute_loss(
        self,
        macro_steps: List[MacroStepTransition],
        advantages: List[float]
    ) -> Tuple[torch.Tensor, Dict[str, float]]:
        """
        Computes the clipped surrogate policy loss weighted by macro-advantages.
        """
        total_loss = torch.tensor(0.0, requires_grad=True)
        adv_tensor = torch.tensor(advantages, dtype=torch.float32)
        adv_tensor = (adv_tensor - adv_tensor.mean()) / (adv_tensor.std() + 1e-8)

        total_tokens = 0
        policy_loss_accum = 0.0

        for idx, step in enumerate(macro_steps):
            logits = self.model.forward_actor(step.states)
            log_probs = F.log_softmax(logits, dim=-1)
            selected_log_probs = torch.gather(
                log_probs, 
                dim=-1, 
                index=step.actions.unsqueeze(-1)
            ).squeeze(-1)

            # Ratio computation
            ratios = torch.exp(selected_log_probs - step.log_probs)
            macro_adv = adv_tensor[idx]

            surr1 = ratios * macro_adv
            surr2 = torch.clamp(ratios, 1.0 - self.clip_epsilon, 1.0 + self.clip_epsilon) * macro_adv
            step_loss = -torch.min(surr1, surr2).sum()

            total_loss = total_loss + step_loss
            total_tokens += step.actions.numel()
            policy_loss_accum += step_loss.item()

        total_loss = total_loss / max(1, total_tokens)
        metrics = {
            "loss": total_loss.item(),
            "mean_macro_adv": adv_tensor.mean().item(),
            "num_macro_steps": len(macro_steps)
        }
        return total_loss, metrics
```

---

### Section 5: The 5-Stage TEMPO Execution Lifecycle

The interactive architectural diagram below details how a long-horizon agent executes, pauses, evaluates, and course-corrects across real-world operational challenges.

:::interactive concept
{
  "title": "The 5-Stage TEMPO Autonomous Execution Lifecycle",
  "steps": [
    {
      "label": "Stage 1",
      "title": "Invariant Contract & Sub-Goal Scoping",
      "content": "The agent decomposes an incoming multi-hour engineering objective into ordered macro-step contracts, establishing clear deterministic invariants for each milestone.",
      "icon": "Target"
    },
    {
      "label": "Stage 2",
      "title": "High-Throughput Actor Execution",
      "content": "Operating in Actor mode, dots3-note generates tool invocations and commands with high tokens/sec generation until the macro-step milestone boundary is reached.",
      "icon": "Terminal"
    },
    {
      "label": "Stage 3",
      "title": "Actor-to-Critic Phase Transition",
      "content": "The agent inserts [CRITIC_EVAL_ENTER], halting outward environment commands and switching internal attention heads into reflective assessment mode.",
      "icon": "RefreshCw"
    },
    {
      "label": "Stage 4",
      "title": "Test-Time Value Rollout Estimation",
      "content": "Allocating test-time reasoning tokens, the model samples prospective solution branches to estimate expected trajectory return V_TEMPO(s_k) via contract verification.",
      "icon": "GitBranch"
    },
    {
      "label": "Stage 5",
      "title": "Macro-Advantage Calibration & Memory Pruning",
      "content": "The computed macro-advantage is recorded, stale intermediate context is purged from the KV cache, and the agent resumes Actor mode for the next milestone.",
      "icon": "CheckCircle2"
    }
  ]
}
:::

---

### Section 6: Empirical Benchmarks & Systems Evaluation

To evaluate the real-world operational impact of dots3-note and TEMPO, dots studio introduced two benchmark suites alongside standard frontier metrics:
- **VibeSearchBench:** Tests open-ended, multi-source research synthesis requiring 40+ chained search queries, document cross-referencing, and contradictory evidence resolution.
- **VibeLifeBench:** Measures long-horizon, real-life planning (e.g., 7-day logistical schedules, wedding vendor coordination, and infrastructure capacity rebalancing) where no single deterministic string matches ground truth.
- **SWE-Bench Verified (Long-Horizon Patching):** Measures full repository bug resolution where initial reproduction scripts require more than 60 bash and git operations.

The comparative performance across **dots3-note + TEMPO**, **Claude 3.5 Sonnet**, **GPT-4o**, and **DeepSeek-R1** is illustrated below:

:::interactive chart
{
  "title": "Long-Horizon Agent Performance & Stability Benchmarks (October 2026)",
  "description": "Comparative evaluation across multi-step success rate, trajectory drift resistance, real-world benchmark performance, and active compute overhead.",
  "type": "bar",
  "xKey": "metric",
  "series": [
    { "dataKey": "dots3_tempo", "name": "dots3-note + TEMPO (280B/16B)", "color": "#10B981" },
    { "dataKey": "claude_sonnet", "name": "Claude 3.5 Sonnet (Dense/Prop)", "color": "#6366F1" },
    { "dataKey": "deepseek_r1", "name": "DeepSeek-R1 (671B/37B MoE)", "color": "#F59E0B" },
    { "dataKey": "gpt4o", "name": "GPT-4o (Dense/Prop)", "color": "#EF4444" }
  ],
  "data": [
    { "metric": "Success Rate @ 100+ Steps (%)", "dots3_tempo": 78.4, "claude_sonnet": 64.2, "deepseek_r1": 71.0, "gpt4o": 52.8 },
    { "metric": "VibeSearchBench Score (%)", "dots3_tempo": 84.6, "claude_sonnet": 79.1, "deepseek_r1": 81.5, "gpt4o": 72.3 },
    { "metric": "VibeLifeBench Planning (%)", "dots3_tempo": 76.9, "claude_sonnet": 68.4, "deepseek_r1": 69.2, "gpt4o": 58.0 },
    { "metric": "SWE-Bench Verified (%)", "dots3_tempo": 54.8, "claude_sonnet": 51.4, "deepseek_r1": 53.2, "gpt4o": 41.2 },
    { "metric": "Active GFLOPs / Token", "dots3_tempo": 32.4, "claude_sonnet": 128.0, "deepseek_r1": 74.0, "gpt4o": 115.0 }
  ]
}
:::

#### Benchmark Analysis
1. **Unprecedented Long-Horizon Retention:** At over 100 sequential environment steps, **dots3-note + TEMPO sustains a 78.4% success rate**, outperforming Claude 3.5 Sonnet (64.2%) and DeepSeek-R1 (71.0%). Standard models experience exponential trajectory drift as unverified assumptions compound.
2. **Compute Efficiency:** Because only **16.2B active parameters** fire during execution, dots3-note expends just **32.4 GFLOPs per token**, less than half the active compute of DeepSeek-R1 (74.0 GFLOPs) and one-fourth of dense frontier models.
3. **Open-Weight Autonomy:** For the first time under an Apache 2.0 license, enterprise engineering teams can deploy an on-premises agent engine capable of autonomous multi-hour operations without relying on proprietary closed APIs.

---

### Section 7: Serving & Production Orchestration in vLLM / SGLang

Deploying dots3-note in production requires handling both the 280B model footprint and the dynamic switching between Actor and Critic modes.

#### Cluster Topologies
- **Dual-Node 8x H100 (TP4-EP2 or TP8):** Fits the full 280B weights in FP8 / BF16 with ample headroom for the 512K context KV-cache.
- **Single-Node 8x H100 with MXFP4 Quantization:** Utilizing native microscaling 4-bit floating point for the expert weights drops memory requirements to under 160 GB, allowing full serving on a single 8-GPU node.

#### Mitigating Mode-Switch Latency via Prefix Radix Caching
When dots3-note switches into Critic mode at a macro-step boundary, naive inference engines would suffer from massive Time-to-First-Token (TTFT) penalties re-ingesting the full episode history.

In **vLLM** and **SGLang**, this is solved through **Radix Tree Prefix Caching**:
```bash
# Production launch command for dots3-note in vLLM
python3 -m vllm.entrypoints.openai.api_server \
  --model dots-studio/dots3-note-preview \
  --tensor-parallel-size 4 \
  --pipeline-parallel-size 2 \
  --enable-prefix-caching \
  --max-model-len 524288 \
  --gpu-memory-utilization 0.94 \
  --kv-cache-dtype fp8 \
  --trust-remote-code \
  --port 8000
```

By keeping the immutable macro-step history cached in GPU VRAM, toggling into Critic mode requires materializing only the prompt delta (`[CRITIC_EVAL_ENTER]`), reducing TTFT from **4,200 ms down to 18 ms**.

---

### Section 8: Strategic Takeaways for Senior Systems Engineers

1. **Scaffolding is a Band-Aid; Native RL is the Solution:** External prompt-chaining loops (such as LangChain or custom while-loops) cannot cure the fundamental mathematical instability of an autoregressive policy drifting across 100 tool calls. Models must be post-trained to evaluate their own intermediate states.
2. **The Macro-Step is the Right Abstraction:** Trying to calculate reinforcement learning rewards at the individual token or single-tool-call level is mathematically doomed by variance. Grouping operations into verifiable macro-step contracts brings stability and convergence.
3. **Sparse MoE + Test-Time Compute is the Frontier:** The combination of lean active parameters (16B on a 280B substrate) and dynamic test-time reasoning tokens creates the optimal cost-intelligence frontier for autonomous software engineering.

The era of brittle, hallucination-prone AI agents is giving way to mathematically grounded, self-verifying systems. With dots3-note and TEMPO open-sourced under Apache 2.0, senior developers have the blueprint to build genuinely autonomous systems that scale without breaking.
:::
