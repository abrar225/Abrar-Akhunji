---
title: "AgentSpec: Why Speculative Decoding Collapses in Agent Batches, and How Structure-Isolated Drafting Recovers 2.4x Throughput"
date: "2026-11-09"
description: "A systems engineering breakdown of the batch speculative decoding collapse in LLM agents, and how AgentSpec uses structure-isolated drafting and redundancy-aware budget allocation to recover 2.4x throughput on vLLM."
tags: ["AgentSpec", "Speculative Decoding", "vLLM", "LLM Inference", "Agentic AI", "CUDA", "Systems Engineering"]
author: "Abrar Akhunji"
heroImage: "/images/blog/agentspec-speculative-decoding-batch-inference-llm-agents/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 9
  prerequisites: ["dlite-history-free-speculative-decoding-agentic-llm", "kv-cache-agentic-inference-vllm-sglang", "rtp-llm-alibaba-scale-evolvable-inference-engine"]
faq:
  - question: "Why does standard speculative decoding degrade when scaling to large batch sizes in LLM serving?"
    answer: "Standard speculative decoding assumes memory-bandwidth-bound execution where extra verification compute is free. At batch sizes above 8 or 16 on modern accelerators like NVIDIA H100, the target model enters a compute-bound regime. Parallel verification requires a synchronous barrier across all requests in the batch. If even a few requests experience token rejections, the entire batch stalls waiting for corrective resampling, causing effective throughput to drop below plain autoregressive serving."
  - question: "What is the structural boundary problem in autonomous agent workloads?"
    answer: "Agent workloads alternate between distinct syntactic regions: freeform chain-of-thought reasoning, tool-call syntax tags, rigid JSON schema arguments, and environment observation parsing. Standard draft models trained on natural prose drift across structural boundaries. Speculating past a closing JSON bracket or tool delimiter drops target acceptance probability from roughly 75% down to under 12%, introducing systematic verification rejections."
  - question: "How does Structure-Isolated Drafting prevent cross-boundary hallucinated tokens?"
    answer: "Structure-Isolated Drafting enforces semantic and grammatical checkpointing. A state machine monitors output token types and halts speculation before crossing structural delimiters. By confining the draft model strictly to semantically coherent segments such as internal reasoning steps or individual argument strings, it eliminates invalid boundary transitions and maintains acceptance rates above 80%."
  - question: "What is Redundancy-Aware Dynamic Budget Allocation and how does it resolve the straggler barrier?"
    answer: "Rather than assigning a fixed speculative draft depth (such as K=5) to every sequence, Redundancy-Aware Budget Allocation computes a dynamic token budget per request based on real-time prefix cache redundancy, segment entropy, and historical segment acceptance rates. Requests in stable reasoning segments receive deeper draft trees (up to K=7), while requests near syntax boundaries receive small budgets (K=1 or 0), eliminating wasted verification FLOPs."
---

:::eli5
*Written by Abrar Akhunji*

Imagine a bustling courtroom with thirty-two trials taking place in parallel. Each courtroom judge has an assistant stenographer who tries to predict what will be said next to speed up the official trial record.

```
+-----------------------------------------------------------------------------+
|               THE BATCH SPECULATION PROBLEM IN AGENT WORKLOADS             |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Standard Speculative Decoding (Blind Drafting):                           |
|                                                                             |
|  Request 01: [Thought: Search DB] --> [Tool: sql_query {"table": ...       |
|              ^^^^^^^^^^^^^^^^^^^^     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        |
|              Accepted (90%)           REJECTED! Drifts across JSON schema   |
|                                                                             |
|  Request 02: [Thought: Analyze rows] -> [Thought: The total sum is...       |
|              ^^^^^^^^^^^^^^^^^^^^^^^    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^       |
|              Accepted (85%)             Accepted (80%)                      |
|                                                                             |
|  Request 32: [Tool: call_api {"id": 42}] -> [WAITING FOR RESPONSE...]       |
|              ^^^^^^^^^^^^^^^^^^^^^^^^^^^     ^^^^^^^^^^^^^^^^^^^^^^^^       |
|              Accepted (75%)                  REJECTED! Guesses external IO  |
|                                                                             |
|  SYNCHRONOUS VERIFICATION BARRIER:                                          |
|  The entire batch must pause and resample whenever any request is rejected. |
|  Result: Batch throughput collapses. Autoregressive decoding is faster!     |
|                                                                             |
+-----------------------------------------------------------------------------+
|  AgentSpec Fix (Structure-Isolated Drafting + Dynamic Budgets):             |
|                                                                             |
|  Request 01: [Thought: Search DB] | [STOP: Barrier] (K=0, wait for verify)  |
|  Request 02: [Thought: Analyze rows in detail...] (K=6 deep speculation)    |
|  Request 32: [Tool: call_api {"id": 42}] | [STOP: Barrier] (No hallucination|
|                                                                             |
|  Result: 0 wasted FLOPs, zero cross-boundary errors, 2.4x batch speedup.    |
+-----------------------------------------------------------------------------+
```

When an assistant guesses words during a long closing speech, guessing works well. The assistant can predict five or six words ahead, the judge nods, and the court finishes early. This is speculative decoding running on a single user prompt.

The system breaks down when the trial shifts from continuous speech to formal paperwork. If an attorney starts citing a legal document, the assistant cannot guess the exact docket number. If the assistant tries to guess anyway, the judge rejects the transcript, erases the draft, and forces everyone to wait while the correct number is spoken word by word.

In a large courtroom building with thirty-two parallel trials, the rules require all thirty-two judges to synchronize their session clocks before turning the page. If thirty-one judges hear continuous speeches while just one assistant guesses an invalid docket number, all thirty-two trials freeze. The fast trials gain nothing, and the entire building moves slower than if no one had guessed at all.

This is the batch speculative decoding collapse in autonomous agents. Agents do not just generate smooth prose. They switch rapidly between internal reasoning thoughts, function-calling syntax, JSON arguments, and waiting for external software tools. 

AgentSpec fixes this with two practical rules:
First, it tells the assistant never to guess across a document boundary. When a tool call begins, guessing stops immediately until the structure is confirmed.
Second, it gives different guessing allowances to different rooms. A room in the middle of a predictable thought gets permission to draft seven words ahead. A room approaching an API delimiter gets a budget of zero. No one makes bad guesses, the synchronization barrier clears instantly, and the full batch runs twice as fast.
:::

:::interactive concept
{
  "title": "AgentSpec Execution Lifecycle",
  "steps": [
    {
      "label": "Stage 01: Semantic Ingestion",
      "title": "Boundary Detection & Syntactic Tagging",
      "content": "The engine inspects token streams across the batch. Sequences are tagged as freeform reasoning, tool-call syntax, JSON arguments, or external observation intake.",
      "icon": "Layers"
    },
    {
      "label": "Stage 02: Budget Allocation",
      "title": "Redundancy-Aware Dynamic Budgeting",
      "content": "Rather than assigning static K=5 draft depths, the scheduler evaluates segment entropy and prefix cache hits to assign variable depths (K=0 to K=7) per request.",
      "icon": "Activity"
    },
    {
      "label": "Stage 03: Isolated Drafting",
      "title": "Structure-Isolated Speculation",
      "content": "Draft models speculate strictly within the active syntactic segment. Speculation is hard-masked before reaching tool tags or JSON closing delimiters.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 04: Batch Verification",
      "title": "Coalesced PagedAttention Verification",
      "content": "Target model verifies all variable-depth draft trees in a single forward pass. Zero cross-boundary rejections mean the batch barrier clears with 2.4x throughput.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Speculative decoding has been standard practice for single-stream Large Language Model (LLM) acceleration since its independent formalization by Leviathan et al. and Chen et al. in 2023. By pairing a compact draft model $M_{\text{draft}}$ (such as a 1B parameter model) with a heavy target model $M_{\text{target}}$ (such as a 70B parameter model), the system generates $K$ draft candidate tokens in $K$ fast autoregressive steps, then validates all $K$ tokens simultaneously in a single target forward pass.

Under a single-stream regime (batch size $B = 1$), speculative decoding operates entirely in memory-bandwidth-bound territory. The GPU spends most of its time streaming 140 GB of model weights from High Bandwidth Memory (HBM) into SRAM just to process one token. Running a forward pass over $K+1$ tokens takes virtually the same wall-clock time as running it over 1 token. As long as the acceptance rate $\alpha$ remains moderately high (for example, $\alpha > 0.65$), the system achieves an immediate 2.0x to 2.8x speedup.

When deploying agentic workloads in enterprise production, serving systems do not operate at $B = 1$. They run continuous iteration-level batching in engines like vLLM, SGLang, or TensorRT-LLM at batch sizes of 16, 32, or 64. 

At these batch sizes, two structural failure modes emerge simultaneously:
1. The hardware shifts along the roofline curve from memory-bound to compute-bound execution.
2. The agentic token stream violates the stationary distribution assumption upon which speculative draft models rely.

The result is the batch speculative decoding collapse: as concurrency increases, speculative speedup decays monotonically until it drops below 1.0x. Systems teams find themselves turning speculative decoding off in production.

AgentSpec (arXiv:2608.24004, Wang et al., EMNLP 2026) isolates the mathematical mechanisms behind this degradation and provides a production-tested fix. Here is the architectural anatomy of the failure and the system design that recovers 2.4x throughput.

---

### The Mathematical Pathology of Batch Speculative Collapse

To understand why batching breaks speculative decoding, consider the target forward pass latency as a function of batch size $B$ and sequence length $L$.

In plain autoregressive decoding, each engine step processes $B$ tokens (one token per sequence). The step latency $T_{\text{AR}}(B)$ is governed by:

$$T_{\text{AR}}(B) = \max\left(\frac{2 \cdot P \cdot B}{\text{TFLOPS}_{\text{peak}}}, \frac{P \cdot \text{BytesPerParam}}{\text{BW}_{\text{HBM}}}\right) + T_{\text{attn}}(B, L)$$

Where $P$ is parameter count and $\text{BW}_{\text{HBM}}$ is memory bandwidth. On an NVIDIA H100 SXM5 (3.35 TB/s HBM3, 989 TFLOPS FP16 Tensor Core compute), the memory-to-compute break-even point for a 70B FP16 model ($P = 70 \times 10^9$, 140 GB weight footprint) occurs at:

$$B_{\text{crit}} \approx \frac{\text{TFLOPS}_{\text{peak}} \times \text{BytesPerParam}}{\text{BW}_{\text{HBM}}} = \frac{989 \times 10^{12} \times 2}{3.35 \times 10^{12}} \approx 590 \text{ tokens in flight}$$

When speculative decoding is enabled with fixed draft length $K$, the target model must verify $\sum_{i=1}^B (K_i + 1)$ tokens in parallel. For $B = 32$ and $K = 5$, the number of tokens verified in a single step is $32 \times 6 = 192$ tokens. 

The verification forward pass is no longer free. The GEMM operations for projection layers ($W_Q, W_K, W_V, W_O, W_{\text{gate}}, W_{\text{up}}, W_{\text{down}}$) leave the memory-bandwidth roofline and become compute-bound.

Now examine the step duration for speculative verification across batch $B$:

$$T_{\text{spec}}(B, K) = \sum_{k=1}^K T_{\text{draft}}(B, 1) + T_{\text{verify}}(B, K + 1) + T_{\text{resample}}(B)$$

The speedup $S(B)$ over vanilla autoregressive decoding is the ratio of accepted tokens to the normalized time spent:

$$S(B) = \frac{\mathbb{E}[\text{Accepted Tokens in Batch}]}{T_{\text{spec}}(B, K) / T_{\text{AR}}(B)}$$

In a single sequence $i$, the expected number of accepted tokens given token acceptance probabilities $\alpha_{i, 1}, \alpha_{i, 2}, \dots, \alpha_{i, K}$ is:

$$\mathbb{E}[N_i] = 1 + \sum_{k=1}^K \prod_{j=1}^k \alpha_{i, j}$$

In batched execution, continuous batching engines must synchronize all sequences at the end of each iteration to update PagedAttention block tables and allocate memory. The effective batch step latency is bounded by the slowest request in the batch:

$$T_{\text{batch\_sync}} = \max_{i \in [1, B]} \left( T_{\text{verify}, i} + \mathbb{I}(\text{rejected}_i) \cdot T_{\text{resample}, i} \right)$$

When sequences in the batch have uneven acceptance distributions, requests that reject their drafts early still pay the full compute and memory footprint of the verification pass, while holding up the scheduler. As $B$ increases, the probability that at least one request experiences catastrophic rejection approaches 1.0:

$$P(\text{at least one rejection in batch}) = 1 - \prod_{i=1}^B \left( \prod_{j=1}^K \alpha_{i, j} \right) \xrightarrow[B \to 32]{} 0.999+$$

---

### The Agentic Boundary Hazard

In standard conversational tasks, text distributions are relatively stationary. Word follows word with stable entropy. Autonomous agents, however, are non-stationary state machines. 

A typical agent step contains four distinct semantic phases:

```
+-----------------------------------------------------------------------------+
|                     THE 4 SEMANTIC PHASES OF AN AGENT STEP                  |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [PHASE 1: CoT Reasoning]                                                   |
|  "I need to query the user table to check permissions for account 9821..."  |
|  --> Low entropy, smooth natural prose. Acceptance rate: 78% - 84%.         |
|                                                                             |
|  [PHASE 2: Structural Tool-Call Trigger]                                    |
|  "<tool_call>\n{\"name\": \"database_query\", \"arguments\": {"             |
|  --> High entropy punctuation & syntax markers. Acceptance rate: 22% - 35%. |
|                                                                             |
|  [PHASE 3: Strict Argument Payloads]                                        |
|  "\"query\": \"SELECT * FROM users WHERE id = 9821;\"}\n</tool_call>"       |
|  --> Rigid grammar. One missing quote invalidates the entire block.         |
|                                                                             |
|  [PHASE 4: Tool Observation Intake]                                         |
|  "<observation>\n{\"status\": 200, \"role\": \"admin\"}\n</observation>"    |
|  --> External data stream. Cannot be drafted by an internal model.          |
|                                                                             |
+-----------------------------------------------------------------------------+
```

When a standard draft model (such as an EAGLE head or a distilled small LM) drafts tokens across the boundary between Phase 1 and Phase 2, it does not know the exact schema requirements of the target model's tool-calling parser. 

It hallucinates tokens past the structural boundary. For example, while the target model wants to emit `<tool_call>`, the draft model might emit `Let me call the tool:`. 

Because speculative decoding requires exact prefix matching:

$$x_k = \hat{x}_k \iff \text{Token ID match}$$

A single mismatched token at position 1 immediately invalidates positions 2, 3, 4, and 5. The target model rejects the entire draft tree for that request. In an agent batch with 32 concurrent requests, multiple requests are crossing boundary delimiters on every single step. 

Empirical profiling on vLLM serving LLaMA-3-70B reveals that while internal reasoning tokens maintain an acceptance rate of 79.4%, boundary transition tokens plunge to 11.2%. Standard speculative decoding wastes 88.8% of its draft FLOPs at every structural boundary.

---

### Structure-Isolated Drafting (SID)

AgentSpec eliminates cross-boundary drafting failures through Structure-Isolated Drafting (SID). 

SID models the agent generation process as a formal grammar state machine over token types:

$$\mathcal{G} = (\mathcal{S}_{\text{states}}, \Sigma, \delta, s_0)$$

Where states $\mathcal{S}_{\text{states}} = \{\text{REASONING}, \text{TOOL\_TAG}, \text{ARGUMENT\_JSON}, \text{OBSERVATION\_WAIT}\}$.

Before launching draft steps, the SID controller inspects the sequence context. If the current sequence is within the `REASONING` state, drafting proceeds normally. However, the controller computes a lookahead token mask against the set of boundary trigger tokens $\mathcal{B}_{\text{trans}}$:

$$\mathcal{B}_{\text{trans}} = \{\text{"<tool_call>", "<|plugin|>", "```json", "{\\"name\\":", "</tool_call>"}\}$$

If the draft model's top-1 prediction belongs to $\mathcal{B}_{\text{trans}}$ or if the token distance to the predicted structural boundary is less than the current draft step $k$, the drafting loop triggers an immediate **Isolation Barrier**:

$$\text{DraftStep}(x_t) = \begin{cases} 
\text{Sample}(M_{\text{draft}}, x_{<t}) & \text{if } x_t \notin \mathcal{B}_{\text{trans}} \text{ and } \text{depth} < K_{\text{limit}} \\
\text{HALT} & \text{if } x_t \in \mathcal{B}_{\text{trans}} \text{ (Boundary Trigger)}
\end{cases}$$

Halting draft generation before crossing the boundary guarantees that:
1. The target model evaluates the boundary token directly using its full parameter capacity, without inheriting an invalid draft prefix.
2. The draft model never wastes memory bandwidth writing speculative keys and values into the KV cache for tokens that will be discarded.
3. Verification latency for that specific sequence drops to 1 token, releasing GPU compute resources for other sequences in the batch.

---

### Redundancy-Aware Dynamic Budget Allocation (RABA)

Halting at boundaries solves the accuracy collapse, but leaves a scheduling imbalance. If Request 1 halts at $K = 1$ due to an isolation boundary, while Request 2 drafts to $K = 5$, a naive serving engine pads Request 1 with dummy tokens or leaves its verification slot idle.

AgentSpec addresses this with Redundancy-Aware Dynamic Budget Allocation (RABA). 

RABA re-conceptualizes speculative depth not as a fixed global hyperparameter $K$, but as a dynamic resource allocation problem across the batch vector $\mathbf{K} = [K_1, K_2, \dots, K_B]$ subject to a total token budget:

$$\sum_{i=1}^B K_i \le K_{\text{total\_batch}}$$

Where $K_{\text{total\_batch}}$ is calibrated to keep the target verification pass within the optimal arithmetic intensity ceiling of the hardware.

The allocation for request $i$ depends on three real-time variables:

1. **Segment Acceptance History ($\bar{\alpha}_{i, \text{seg}}$)**: An exponential moving average of accepted tokens in the current semantic segment:
   $$\bar{\alpha}_{i, \text{seg}}^{(t)} = \beta \bar{\alpha}_{i, \text{seg}}^{(t-1)} + (1 - \beta) \frac{\text{AcceptedTokens}_i^{(t)}}{K_i^{(t)}}$$

2. **Predictive Entropy ($\mathcal{H}_i$)**: The Shannon entropy of the draft model's output distribution at the start of the draft step:
   $$\mathcal{H}_i = - \sum_{v \in \mathcal{V}} P_{\text{draft}}(v \mid x_{<t}) \log_2 P_{\text{draft}}(v \mid x_{<t})$$

3. **Prefix Cache Redundancy ($R_i$)**: The fraction of prompt and context tokens shared with other requests in the vLLM Radix Tree prefix cache:
   $$R_i = \frac{|\text{SharedPrefixNodes}(i)|}{|\text{TotalPromptTokens}(i)|}$$

RABA computes the optimal draft budget $K_i^*$ using:

$$K_i^* = \text{clamp}\left( \left\lfloor K_{\text{base}} \cdot \left(\frac{\bar{\alpha}_{i, \text{seg}}}{\alpha_{\text{target}}}\right) \cdot (1 - \hat{\mathcal{H}}_i) \cdot (1 + \lambda R_i) \right\rfloor, K_{\text{min}}, K_{\text{max}} \right)$$

Where $\hat{\mathcal{H}}_i = \frac{\mathcal{H}_i}{\log_2 |\mathcal{V}|}$ is normalized entropy, $K_{\text{min}} \in \{0, 1\}$, and $K_{\text{max}} = 7$.

```
+-----------------------------------------------------------------------------+
|                 DYNAMIC BUDGET ALLOCATION (RABA) SCHEDULING                 |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Request Index | State         | Entropy | Hist. Alpha | Budget (K_i)       |
|  --------------+---------------+---------+-------------+------------------- |
|  Seq 01        | REASONING     | 0.14    | 0.88        | K = 7 (Deep Draft) |
|  Seq 02        | BOUNDARY_NEAR | 0.82    | 0.31        | K = 1 (Short Draft)|
|  Seq 03        | JSON_ARGUMENT | 0.22    | 0.82        | K = 5 (Med Draft)  |
|  Seq 04        | TOOL_TAG      | 0.95    | 0.12        | K = 0 (Direct AR)  |
|                                                                             |
|  Total Batch Verification Shape: Exactly fits hardware Tensor Core ceiling.  |
|  Straggler Penalty: Reduced by 74% compared to uniform K=5 allocation.      |
+-----------------------------------------------------------------------------+
```

When a request has high entropy or approaches a boundary, its budget drops to 0 or 1. The freed token capacity is transferred to requests in low-entropy reasoning blocks, allowing them to speculate up to 7 tokens deep. The average accepted tokens per batch step increases without increasing the total verification FLOPs.

---

### Low-Level Engine Integration: The vLLM Execution Path

Integrating AgentSpec into vLLM requires modifying the model runner and scheduler loops. Below is the simplified Python implementation of the Structure-Isolated Drafting scheduler and token mask verification logic.

```python
"""
AgentSpec: Structure-Isolated Drafting & Dynamic Budget Controller for vLLM
Target: vLLM v0.6+ Worker / ModelRunner
"""

import torch
import torch.nn as nn
from typing import List, Dict, Tuple

class AgentSpecController:
    def __init__(
        self,
        boundary_token_ids: List[int],
        k_min: int = 0,
        k_max: int = 7,
        alpha_target: float = 0.75,
        ema_beta: float = 0.85
    ):
        self.boundary_token_set = set(boundary_token_ids)
        self.k_min = k_min
        self.k_max = k_max
        self.alpha_target = alpha_target
        self.beta = ema_beta
        
        # State tracking per active sequence_id in the batch
        self.seq_history: Dict[int, Dict[str, float]] = {}

    def register_sequence(self, seq_id: int):
        self.seq_history[seq_id] = {
            "ema_alpha": self.alpha_target,
            "last_k": 3
        }

    def compute_dynamic_budget(
        self, 
        seq_id: int, 
        draft_logits: torch.Tensor, 
        is_near_boundary: bool
    ) -> int:
        """
        Calculates K_i* based on output entropy and historical acceptance.
        draft_logits shape: [1, vocab_size]
        """
        if is_near_boundary:
            return self.k_min

        # Compute normalized Shannon entropy
        probs = torch.softmax(draft_logits, dim=-1)
        log_probs = torch.log_softmax(draft_logits, dim=-1)
        entropy = -torch.sum(probs * log_probs, dim=-1).item()
        max_entropy = 11.5  # log(vocab_size ~ 100k)
        norm_entropy = min(entropy / max_entropy, 1.0)

        history = self.seq_history.get(seq_id, {"ema_alpha": self.alpha_target})
        alpha_ratio = history["ema_alpha"] / self.alpha_target

        # Budget formula
        raw_budget = self.k_max * alpha_ratio * (1.0 - norm_entropy)
        budget = int(torch.clamp(torch.tensor(raw_budget), self.k_min, self.k_max).item())
        return budget

    def structure_isolated_draft(
        self,
        seq_id: int,
        draft_model: nn.Module,
        input_ids: torch.Tensor,
        budget_k: int
    ) -> Tuple[torch.Tensor, int]:
        """
        Drafts up to budget_k tokens, halting immediately if a boundary token is hit.
        Returns: (drafted_token_ids, actual_drafted_count)
        """
        if budget_k == 0:
            return torch.empty((1, 0), dtype=torch.long, device=input_ids.device), 0

        drafted_tokens = []
        curr_input = input_ids

        for step in range(budget_k):
            with torch.no_grad():
                logits = draft_model(curr_input)
                next_token = torch.argmax(logits[:, -1, :], dim=-1, keepdim=True)

            token_val = next_token.item()
            
            # Structural Isolation Check: Stop before boundary delimiters
            if token_val in self.boundary_token_set:
                break

            drafted_tokens.append(token_val)
            curr_input = torch.cat([curr_input, next_token], dim=-1)

        if len(drafted_tokens) == 0:
            return torch.empty((1, 0), dtype=torch.long, device=input_ids.device), 0

        draft_tensor = torch.tensor([drafted_tokens], dtype=torch.long, device=input_ids.device)
        return draft_tensor, len(drafted_tokens)

    def update_acceptance_telemetry(self, seq_id: int, accepted_count: int, draft_count: int):
        if seq_id not in self.seq_history or draft_count == 0:
            return
        
        step_alpha = accepted_count / draft_count
        prev_alpha = self.seq_history[seq_id]["ema_alpha"]
        self.seq_history[seq_id]["ema_alpha"] = self.beta * prev_alpha + (1.0 - self.beta) * step_alpha
```

---

### Empirical Benchmarks & Hardware Telemetry

AgentSpec was evaluated in the original paper across four leading open-weights models:
- LLaMA-3-70B-Instruct (Draft: LLaMA-3-8B-Instruct or EAGLE-2 head)
- Qwen-2.5-72B-Instruct (Draft: Qwen-2.5-7B)
- DeepSeek-V2-Lite / 236B (Draft: DeepSeek-V2-Chat 16B)

Hardware environment: An 8x NVIDIA H100 SXM5 (80GB HBM3, 3.35 TB/s per GPU) cluster linked via NVLink-4 (900 GB/s bidirectional per GPU), running vLLM v0.6 with Tensor Parallelism = 4.

Workloads: AgentBench (multi-turn reasoning), ToolBench (high-density function calling), and SWE-bench Lite (code repair loops).

```
+-----------------------------------------------------------------------------+
|             THROUGHPUT SPEEDUP OVER AUTOREGRESSIVE BASELINE                |
|             (LLaMA-3-70B on 4x H100 SXM5, ToolBench Workload)              |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Batch Size | Standard Spec (K=5) | EAGLE-2 (Tree) | AgentSpec (SID + RABA) |
|  -----------+---------------------+----------------+----------------------- |
|  B = 1      | 2.12x               | 2.45x          | 2.51x                  |
|  B = 4      | 1.74x               | 1.98x          | 2.42x                  |
|  B = 8      | 1.32x               | 1.54x          | 2.38x                  |
|  B = 16     | 0.94x (SLOWER!)     | 1.18x          | 2.31x                  |
|  B = 32     | 0.81x (CATASTROPHIC)| 0.89x (SLOWER!)| 2.24x                  |
|                                                                             |
+-----------------------------------------------------------------------------+
```

```
+-----------------------------------------------------------------------------+
|                      ACCEPTANCE RATE BY SEMANTIC REGION                     |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Semantic Segment          | Standard Speculative | AgentSpec (SID)        |
|  --------------------------+----------------------+----------------------- |
|  Internal Chain-of-Thought | 79.4%                | 81.2%                  |
|  Tool Call Delimiter Tags  | 11.2% (Collapse)     | N/A (Isolated/Bypassed)|
|  JSON Key Strings          | 84.1%                | 86.5%                  |
|  JSON Argument Values      | 48.2%                | 77.8% (Budget Adjusted)|
|  Overall Batch Average     | 43.6%                | 82.4%                  |
|                                                                             |
+-----------------------------------------------------------------------------+
```

Key observations from the telemetry:
1. **The 0.81x Wall**: Standard speculative decoding with static $K = 5$ crashes at $B = 16$ and $B = 32$. The overhead of running 5 draft forward passes plus a heavy 6-token verification pass exceeds the time required to simply execute one autoregressive token.
2. **Rejection Elimination**: Structure-Isolated Drafting completely eliminates the 11.2% acceptance penalty at structural boundaries by refusing to speculate across delimiters.
3. **Sustained Concurrency**: AgentSpec maintains a 2.24x speedup even at batch size 32, converting speculative decoding into an asset for production cluster scale rather than a single-user demo feature.

---

### Architectural Trade-offs & Infrastructure Rules of Thumb

Deploying AgentSpec in high-throughput enterprise infrastructure introduces three practical engineering considerations:

1. **Draft Model Sizing & VRAM Contention**:
   The draft model consumes dedicated GPU memory that could otherwise serve KV cache blocks. For LLaMA-3-70B on 4x H100 GPUs (320 GB total VRAM), running a 70B FP16 model consumes ~140 GB, leaving 180 GB for KV cache. Adding an 8B draft model consumes an extra 16 GB of weights plus its own KV cache. 
   *Rule of thumb*: If average prompt context exceeds 32k tokens and concurrency is memory-bound, prefer speculative heads (like Medusa or EAGLE-style lightweight projection layers, ~1.5 GB) over full draft language models, combining them with SID boundary masks.

2. **Boundary Token Configuration**:
   The set of boundary tokens $\mathcal{B}_{\text{trans}}$ must be synchronized with the system's tool-calling parser. If a user defines custom XML tags (for instance `<function_calls>` instead of OpenAI-style JSON), failure to register the tag tokens in the sentinel table will cause the draft model to leak past the boundary, re-introducing the acceptance collapse.
   *Rule of thumb*: Derive $\mathcal{B}_{\text{trans}}$ directly from the serving engine's active chat template and grammar parser at worker initialization.

3. **Dynamic Batching Interaction**:
   In continuous batching with iteration-level scheduling, requests enter and exit the running batch on arbitrary steps. RABA must compute its budget $K_i^*$ using lightweight CPU operations (or pre-computed Triton lookup tables) to ensure scheduling overhead does not add more than 50 microseconds to the step latency.
   *Rule of thumb*: Keep RABA entropy estimation within the draft model's final sampling kernel rather than executing separate synchronization barriers between host and device.
:::

---

### Sources
- Primary Research Paper: [arXiv:2608.24004 - AgentSpec: Speculative Decoding for Batch Inference of LLM Agents](https://arxiv.org/abs/2608.24004)
- Official vLLM Project Repository: [github.com/vllm-project/vllm](https://github.com/vllm-project/vllm)
- Conference Publication: Proceedings of the 2026 Conference on Empirical Methods in Natural Language Processing (EMNLP 2026)
