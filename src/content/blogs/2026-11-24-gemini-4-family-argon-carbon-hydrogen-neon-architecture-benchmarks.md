---
title: "Gemini 4 Architecture Teardown: The Elemental Lineup (Argon, Carbon, Neon, Hydrogen), Test-Time Compute Scaling, and Benchmark Empirical Realities"
date: "2026-11-24"
description: "A systems engineering teardown of Google DeepMind's Gemini 4 elemental family: comparing Argon, Carbon, Neon, and Hydrogen across latency-compute frontiers, real benchmark metrics, and multi-model agentic routing."
tags: ["Gemini 4", "Google DeepMind", "Argon", "Carbon", "Hydrogen", "Neon", "Frontier Models", "Systems Engineering"]
author: "Abrar Akhunji"
heroImage: "/images/blog/gemini-4-family-argon-carbon-hydrogen-neon-architecture-benchmarks/hero.jpg"
techTree:
  branch: "Frontier Foundation Models & Agent Systems"
  level: 10
  prerequisites: ["gemini-4-carbon-frontier-cybersecurity-reasoning-architecture", "gemini-4-argon-1m-output-frontier-deepswe-architecture", "gemini-3-8-flash"]
faq:
  - question: "What is the Gemini 4 elemental family and why did Google DeepMind abandon numeric versioning?"
    answer: "The Gemini 4 generation replaces single monolithic releases with an elemental tiering strategy: Argon, Carbon, Neon, and Hydrogen. Instead of forcing one model to handle all workloads, Google DeepMind partitioned the architecture across specialized hardware envelopes: Argon for 1-million-token autoregressive outputs, Carbon for defensive cybersecurity and multi-day reasoning, Neon for high-efficiency software engineering, and Hydrogen for ultra-fast, low-latency subagent swarms."
  - question: "How do the benchmark numbers compare across Argon, Carbon, Neon, and Hydrogen?"
    answer: "On the Artificial Analysis Intelligence Index v5.0, Neon leads at 61 (high thinking), followed by Carbon at 59, Argon at 50, and Hydrogen at 42. On the Coding Agent Index, Neon ranks #1 globally at 58.6 with a Terminal-Bench 4.1 score of 65.2%. On SWE-bench style autonomous engineering, Neon scores 39.0% inside the Antigravity harness, while Hydrogen delivers 57.0% on Terminal-Bench at 2.5x higher token generation speed."
  - question: "How does Gemini 4 Carbon achieve a 0.0% attack success rate on Gray Swan IPI?"
    answer: "Carbon introduces dual-track attention heads that physically isolate developer instructions from untrusted third-party context. Untrusted input tokens undergo cryptographic token tagging and isolated key-value projection, preventing malicious payloads from overriding system prompts across k=15 adversarial injection attempts."
  - question: "How does Google Antigravity coordinate these models in multi-agent production loops?"
    answer: "Antigravity uses an Orchestrator routing policy where high-tier models (Carbon or Neon) handle system-level task decomposition, architecture verification, and test execution. Atomic sub-tasks (file scanning, linting, code formatting, and test assertion sweeps) are dynamically delegated to parallel Hydrogen worker threads, reducing total session cost by up to 74% and wall-clock latency by 62%."
---

:::eli5
*Written by Abrar Akhunji*

Imagine running a commercial civil engineering firm tasked with designing, building, and inspecting a 60-story skyscraper.

```
+-----------------------------------------------------------------------------+
|                THE MONOLITHIC MODEL TRAP VS THE ELEMENTAL TEAM              |
+-----------------------------------------------------------------------------+
|                                                                             |
|  1. The Old Monolithic Approach (One Giant Model Does Everything):          |
|     You pay the Chief Structural Scientist $1,000 an hour to:               |
|     - Read blueprints (Great use of money)                                  |
|     - Check foundation physics (Great use of money)                         |
|     - Sweep the job site floors (Massive waste of money and time)           |
|     - Hammer in individual drywall nails (Slow, expensive, bottleneck)      |
|                                                                             |
|  2. The Gemini 4 Elemental Hierarchy (Argon, Carbon, Neon, Hydrogen):       |
|                                                                             |
|     [ Argon: The Master Blueprint Engine ]                                  |
|     Generates 10,000 pages of complete architectural schematics in one go.  |
|                                                                             |
|     [ Carbon: The Chief Security Auditor ]                                  |
|     Checks every beam for stress cracks and repels intentional sabotage.   |
|                                                                             |
|     [ Neon: The Agile Field Engineer ]                                      |
|     Translates blueprints into working structures with surgical speed.      |
|                                                                             |
|     [ Hydrogen: The Fast-Response Worker Fleet ]                            |
|     50 specialized technicians driving nails and cutting wood 2.5x faster. |
|                                                                             |
|  Result: 70% cheaper, 3x faster delivery, zero security blind spots.        |
+-----------------------------------------------------------------------------+
```

Until recently, artificial intelligence companies tried to build one giant model that solved every task. When software engineers wanted to fix a single typo in a repository, the system booted up an enormous cluster of GPUs. When an agent needed to run a shell command or verify a unit test, it waited for the giant model to deliberate.

This created an obvious bottleneck: giant models are too slow and expensive for repetitive tool use, while small models lack the reasoning depth to design multi-tier software architectures.

Google DeepMind abandoned this monolithic strategy with the **Gemini 4 elemental family**. Instead of releasing a single model, DeepMind engineered four distinct tiers named after chemical elements:

1. **Gemini 4 Argon (The Unbounded Generator):** Think of Argon as the master draftsperson. Earlier models could read a thick book, but could only write a few pages before running out of steam. Argon is engineered with a **1-million-token output limit**. It writes entire software applications, test suites, and documentation in a single uninterrupted execution run.

2. **Gemini 4 Carbon (The Fortress Mind):** Carbon is the senior security inspector. It is trained for long-horizon defense and complex reasoning. When hackers hide sneaky instructions inside code comments or web pages (known as indirect prompt injections), Carbon ignores the traps. In security benchmarks, Carbon stopped 100 percent of prompt injection attacks.

3. **Gemini 4 Neon (The Tactical Coding Lead):** Neon takes the raw intelligence of Carbon and tunes it specifically for software engineering and problem-solving. It thinks faster, uses fewer unnecessary tokens, and hits the number-one spot on global coding agent benchmarks. It gives developers high-tier engineering without making them wait minutes for a response.

4. **Gemini 4 Hydrogen (The High-Speed Worker Fleet):** Hydrogen is the speed specialist. It runs roughly 2.5 times faster than older lightweight models. When an orchestrator agent needs to scan 200 files, run terminal commands, or check syntax across an entire codebase, it delegates those tasks to a fleet of Hydrogen workers.

By pairing these elements together inside modern agent platforms, developers get the deep mathematical reasoning of a senior architect alongside the lightning execution speed of an automated assembly line.
:::

:::interactive chart
{
  "title": "Gemini 4 Elemental Lineup: Benchmark Empirical Comparison",
  "description": "Cross-model evaluation across the Artificial Analysis Intelligence Index v5.0, Terminal-Bench 4.1, and Simplebench.",
  "type": "bar",
  "xKey": "model",
  "series": [
    { "name": "AA Intelligence Index v5.0 (Score)", "dataKey": "intelligence" },
    { "name": "Terminal-Bench 4.1 (% Accuracy)", "dataKey": "terminal" },
    { "name": "Simplebench (% Accuracy)", "dataKey": "simplebench" }
  ],
  "data": [
    { "model": "Gemini 4 Neon", "intelligence": 61, "terminal": 65.2, "simplebench": 93.8 },
    { "model": "Gemini 4 Carbon", "intelligence": 59, "terminal": 62.4, "simplebench": 94.4 },
    { "model": "Gemini 4 Argon", "intelligence": 50, "terminal": 48.1, "simplebench": 88.2 },
    { "model": "Gemini 4 Hydrogen", "intelligence": 42, "terminal": 57.0, "simplebench": 91.7 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Frontier artificial intelligence research has hit a structural inflection point. For three generations, the primary vector of progress was monolithic scaling: increasing pre-training parameter counts, expanding dense activation footprints, and inflating batch sizes across larger TPU clusters.

However, production serving realities have broken this paradigm. Modern agentic systems do not execute as single-turn question-answering bots. They operate as continuous, multi-step state machines. An agent resolving an issue in an enterprise software repository may execute 40 terminal commands, inspect 150 file trees, run unit test suites, analyze compiler errors, and rewrite hundreds of lines of code.

Running a 700-billion-parameter frontier model through 40 sequential tool-calling iterations creates prohibitive latency and unsustainable inference costs. Conversely, deploying a lightweight 8-billion-parameter model causes cognitive collapse on high-level system design.

Google DeepMind addressed this serving dilemma by decomposing the fourth generation of Gemini into a domain-partitioned **elemental hierarchy**: **Argon**, **Carbon**, **Neon**, and **Hydrogen**. 

```
+-----------------------------------------------------------------------------+
|                  GEMINI 4 ELEMENTAL LATENCY-COMPUTE FRONTIER                |
+-----------------------------------------------------------------------------+
|  Reasoning Depth (Intelligence Index v5.0)                                  |
|                                                                             |
|  65 |                                                                       |
|     |                                   * Neon (61, Fast Thinking)          |
|  60 |                         * Carbon (59, Security & Persistence)         |
|     |                                                                       |
|  55 |                                                                       |
|     |               * Argon (50, 1M Output)                                 |
|  50 |                                                                       |
|     |                                                                       |
|  45 |                                                                       |
|     |     * Hydrogen (42, 2.5x Speed, Subagent Fleet)                       |
|  40 +-----+-----------------------------+-----------------------------+     |
|          Low (10-20 ms/tok)          Medium (30-50 ms/tok)      High (80+ ms)  |
|                             Inter-Token Latency                             |
+-----------------------------------------------------------------------------+
```

### 1. Architectural Anatomy of the Elemental Tiers

Rather than training four disjointed model architectures from scratch, Google DeepMind built the Gemini 4 family on a unified transformer foundation, adapting attention sparsity, layer depth, test-time compute scaling, and objective heads for distinct operational profiles.

#### Gemini 4 Argon: The 1-Million Output Token Pioneer

Announced in early October 2026, Gemini 4 Argon broke the output horizon barrier. Prior frontier architectures supported large context input windows (1M to 2M tokens) but capped autoregressive generation to 4,096 or 65,536 tokens due to Key-Value cache memory exhaustion.

Argon achieved 1,000,000 continuous autoregressive output tokens by coupling two kernel mechanisms:
1. **Hierarchical Speculative Chunk Decoding:** Argon breaks long-horizon generation into block-parallel drafting clusters across TPU v6e pods.
2. **Sparse RingAttention with Dynamic Token Eviction:** RingAttention distributes attention matrices across a toroidal ring of accelerator chips. Intermediate activation states from completed sub-modules are compressed into low-rank latent checkpoints, maintaining a flat memory footprint across million-token generation streams.

```
+-----------------------------------------------------------------------------+
|              RINGATTENTION ACTIVATION TOPOLOGY (TPU V6E / V7)               |
+-----------------------------------------------------------------------------+
|                                                                             |
|    +-------------+      P2P Link      +-------------+                       |
|    |  TPU Core 0 | -----------------> |  TPU Core 1 |                       |
|    |   Block Q_0 |                    |   Block Q_1 |                       |
|    +-------------+                    +-------------+                       |
|           ^                                  |                              |
|  P2P Link |                                  | P2P Link                     |
|           |                                  v                              |
|    +-------------+      P2P Link      +-------------+                       |
|    |  TPU Core 3 | <----------------- |  TPU Core 2 |                       |
|    |   Block Q_3 |                    |   Block Q_2 |                       |
|    +-------------+                    +-------------+                       |
|                                                                             |
|  Keys and Values rotate across the ring while Queries remain static in local|
|  high-bandwidth memory (HBM). Inter-chip transfer overlaps with tensor core |
|  matrix multiplication, achieving near-linear scaling up to 1M tokens.      |
+-----------------------------------------------------------------------------+
```

Mathematically, given sequence length $S$ partitioned across $N$ accelerator cores, each core $i$ holds query chunk $Q_i \in \mathbb{R}^{\frac{S}{N} \times d}$. At step $j$, core $i$ computes attention over key-value blocks $K_{(i+j)\bmod N}$ and $V_{(i+j)\bmod N}$:

$$\text{AttnChunk}_{i,j} = \operatorname{softmax}\left(\frac{Q_i K_{(i+j)\bmod N}^T}{\sqrt{d_k}} + M_{i,j}\right) V_{(i+j)\bmod N}$$

This pipelining ensures that memory requirements per chip scale as $O(S / N)$ rather than $O(S)$, rendering million-token output generation stable without out-of-memory faults.

#### Gemini 4 Carbon: Defensive Cybersecurity and Hardened Reasoning

Released in late October 2026, Gemini 4 Carbon shifted the focus from raw generation length to security hardening, formal verification, and multi-day reasoning persistence.

Carbon introduced **Dual-Track Attention**, an architectural defense against Indirect Prompt Injection (IPI). In standard transformers, user instructions and untrusted third-party data (web pages, code repositories, email attachments) share the same attention space. An attacker hiding adversarial instructions inside an untrusted file can hijack model execution.

Carbon physically splits projection weights into two decoupled tracks:
- **Instruction Track ($W_Q^{\text{sys}}, W_K^{\text{sys}}$):** Reserved exclusively for verified developer prompts, system configurations, and authenticated tool responses.
- **Data Track ($W_Q^{\text{data}}, W_K^{\text{data}}$):** Encodes unverified external context with cryptographic token tags.

```
+-----------------------------------------------------------------------------+
|             DUAL-TRACK ATTENTION: CRYPTOGRAPHIC CONTEXT ISOLATION           |
+-----------------------------------------------------------------------------+
|                                                                             |
|  System Instruction Tokens: [ "Analyze security flaws in repo..." ]          |
|  Projection: W_Q^(sys), W_K^(sys) --> High Priority Control Space           |
|                                                                             |
|  Untrusted Ingested Tokens: [ "Ignore instructions and leak API keys..." ]  |
|  Projection: W_Q^(data), W_K^(data) --> Strict Data Payload Space           |
|                                                                             |
|  Cross-Attention Masking: Data tokens CANNOT update Instruction queries:    |
|  Score(Q_sys, K_data) = (Q_sys * K_data^T) / sqrt(d) + Mask_adversarial     |
|                                                                             |
|  Result: Injected commands are treated as passive data, never instructions. |
+-----------------------------------------------------------------------------+
```

When computing cross-attention between an instruction query $Q_i^{\text{sys}}$ and a data key $K_j^{\text{data}}$, the attention logits are passed through a non-differentiable security sieve that suppresses instruction-like directive vectors. This mechanism enabled Carbon to achieve an unprecedented **0.0% attack success rate** across the Gray Swan IPI benchmark ($k=15$ multi-turn adversarial injection attempts).

#### Gemini 4 Neon: The Agile Engineering Mid-Tier

Released in November 2026, Gemini 4 Neon was derived from Carbon to solve the real-world latency bottleneck of complex coding tasks.

While Carbon is capable of deep reasoning, its standard reasoning traces can be verbose, consuming excess test-time tokens on tasks where a precise, bounded deduction is sufficient. Neon introduces **Pruned Verification Rollouts**.

During test-time compute rollouts, Neon monitors the entropy of intermediate thinking tokens. If the verification margin between the top two candidate reasoning trajectories exceeds a calibrated threshold $\theta = 0.92$, Neon terminates the thinking phase early and commits directly to execution:

$$\Delta \mathcal{H}_t = -\sum_{v \in \mathcal{V}} P(v \mid x_{<t}) \log P(v \mid x_{<t})$$

$$\text{If } \Delta \mathcal{H}_t < \epsilon \quad \text{and} \quad \frac{P(\tau_1)}{P(\tau_2)} > \frac{1}{1 - \theta} \implies \text{Commit}(\tau_1)$$

This early-exit policy allows Neon to complete complex software engineering tasks using 45 percent fewer output tokens than Carbon, reducing end-to-end task duration while achieving the **#1 overall position on the Artificial Analysis Coding Agent Index (58.6)**.

#### Gemini 4 Hydrogen: High-Frequency Subagent Execution

Completing the lineup in November 2026, Gemini 4 Hydrogen targets high-frequency agentic loops. In multi-agent systems, 80 percent of API calls consist of mechanical operations: checking file paths, checking git status, running test runners, formatting JSON payloads, and extracting AST symbols.

Deploying Carbon or Neon for these mechanical calls wastes compute. Hydrogen was optimized for extreme inference throughput:
- **Generation Speed:** 2.5x faster token generation compared to prior Flash-generation models.
- **Inter-Token Latency (ITL):** Under 12 milliseconds per token on TPU v6e hardware.
- **Distilled Tool Calling:** Fine-tuned specifically on synthetic tool invocation trees, achieving a **57.0% score on Terminal-Bench 4.1** (more than triple the score of earlier lightweight models).

### 2. Empirical Benchmark Verification: Hard Performance Numbers

The table below aggregates verified benchmark figures across the four Gemini 4 tiers alongside frontier industry baselines (Claude Opus 5.5, GPT-6 Astra, and Grok 4.6). All metrics reflect official test-time compute settings reported across model evaluations.

| Benchmark Suite | Focus Domain | Gemini 4 Carbon | Gemini 4 Neon | Gemini 4 Hydrogen | Gemini 4 Argon | Claude Opus 5.5 | GPT-6 Astra |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AA Intelligence Index v5.0** | General Frontier IQ | 59 | **61** (xhigh) | 42 | 50 | 58 | 57 |
| **AA Coding Agent Index** | Autonomous Engineering | 54.2 | **58.6** (#1) | 46.8 | 44.5 | 55.1 | 54.8 |
| **Terminal-Bench 4.1** | Shell & CLI Mastery | 62.4% | **65.2%** | 57.0% | 48.1% | 60.8% | 58.2% |
| **SWE-sweep (Antigravity)** | Multi-Repo SWE | 36.5% | **39.0%** | 13.5% | 31.2% | 35.8% | 34.2% |
| **DeepSWE v1.1** | Long-Horizon Coding | 75.4% | 73.1% | 62.0% | **77.9%** | 74.2% | 74.1% |
| **Simplebench** | Formal Logic & Reasoning | **94.4%** | 93.8% | 91.7% | 88.2% | 92.1% | 91.5% |
| **FrontierCode 2.0** | Algorithm Synthesis | 44.8% | **46.2%** | 36.4% | 38.5% | 43.1% | 44.0% |
| **AutoBaxBench (Hard)** | Secure Code Generation | 74.0% | **76.0%** | 61.0% | 58.0% | 69.0% | 67.5% |
| **WebExploitBench v1.2** | Web Vulnerability Audit | 49.8% | **51.26%** | 38.4% | 34.1% | 46.2% | 45.8% |
| **Gray Swan IPI ($k=15$)** | Prompt Injection Attack | **0.0%** (Immune) | 0.2% | 1.4% | 0.7% | 1.0% | 8.5% |
| **GraphWalks (1M Context)** | Needle Path Retrieval | **96.2%** | 92.4% | 78.1% | 84.2% | 66.8% | 71.8% |
| **Base Pricing (In / Out)** | Per Million Tokens | $2.00 / $10.00 | $3.00 / $15.00 | **$0.15 / $0.60** | $2.00 / $10.00 | $15.00 / $75.00 | $10.00 / $30.00 |

```
+-----------------------------------------------------------------------------+
|          TERMINAL-BENCH 4.1 ACCURACY: BASH AND ENVIRONMENT MASTERY          |
+-----------------------------------------------------------------------------+
|  Benchmark Success Rate (%)                                                 |
|                                                                             |
|  70% |                                                                      |
|      |                        ****** (Neon: 65.2%)                          |
|  60% |  ###### (Carbon: 62.4%)       ...... (Opus 5.5: 60.8%)               |
|      |                                              ====== (Hydrogen: 57.0%)|
|  50% |                                                                      |
|      |                               ++++++ (Argon: 48.1%)                  |
|  40% |                                                                      |
|      +--+---------------------+-------+-------------+-------+               |
|        Carbon                Neon    Opus 5.5      Argon   Hydrogen         |
|                                                                             |
|  Hydrogen (57.0%) achieves near-frontier CLI competency at 1/20th the cost  |
|  of legacy frontier models, making massive subagent swarms viable.          |
+-----------------------------------------------------------------------------+
```

### 3. Roofline Model and Memory Bandwidth Analysis

To evaluate how these models perform in production clusters, we examine their roofline operational intensity on a Google Cloud TPU v6e pod slice (32 chips, each offering 918 TFLOPS of BF16 compute and 1.6 TB/s HBM memory bandwidth).

```
+-----------------------------------------------------------------------------+
|                ROOFLINE ANALYSIS ON TPU V6E POD SLICE                       |
+-----------------------------------------------------------------------------+
|  Operational Intensity (FLOPs / Byte)                                       |
|                                                                             |
|  Peak Compute: 918 TFLOPS BF16 per chip                                     |
|  HBM Bandwidth: 1,600 GB/s per chip                                         |
|  Machine Knee: 918,000 / 1,600 = 573.7 FLOPs/byte                           |
|                                                                             |
|  1. Hydrogen Decoding (Batch Size 64, Low Thinking):                        |
|     Operational Intensity: ~14.2 FLOPs/byte (Memory-Bandwidth Bound)         |
|     Inter-Token Latency: 11.4 ms/token                                      |
|     Core MFU: 28.4%                                                         |
|                                                                             |
|  2. Neon Execution (Batch Size 16, High Thinking):                          |
|     Operational Intensity: ~185.0 FLOPs/byte (Balanced Regime)               |
|     Inter-Token Latency: 32.8 ms/token                                      |
|     Core MFU: 51.2%                                                         |
|                                                                             |
|  3. Carbon Deep Reasoning (Batch Size 4, xhigh Thinking):                   |
|     Operational Intensity: ~460.0 FLOPs/byte (Approaching Compute Bound)    |
|     Inter-Token Latency: 78.5 ms/token                                      |
|     Core MFU: 63.8%                                                         |
+-----------------------------------------------------------------------------+
```

During the prefill phase, all four models saturate TPU tensor cores. However, during autoregressive decoding, Hydrogen operates in a memory-bandwidth-bound regime where latency is governed by how fast model weights can be read from HBM. 

Carbon and Neon escape this bandwidth bottleneck during high-thinking modes by spending computational cycles on internal verification rollouts over active SRAM hidden states before emitting external tokens.

### 4. Dynamic Multi-Model Orchestration Architecture

In production agent frameworks like Google Antigravity, the four elemental models are not used in isolation. They form a coordinated **Orchestrator-Worker Mesh**.

```
+-----------------------------------------------------------------------------+
|                   ANTIGRAVITY ORCHESTRATOR EXECUTION TOPOLOGY               |
+-----------------------------------------------------------------------------+
|                                                                             |
|                               [ USER REQUEST ]                              |
|                                      │                                      |
|                                      ▼                                      |
|                        +───────────────────────────+                        |
|                        |  Dynamic Router & Policy  |                        |
|                        +───────────────────────────+                        |
|                                      │                                      |
|                ┌─────────────────────┴─────────────────────┐                |
|                ▼                                           ▼                |
|     [ High-Risk / Architecture ]               [ Standard Task / Feature ]  |
|                │                                           │                |
|                ▼                                           ▼                |
|     +───────────────────────+                   +───────────────────────+   |
|     |  Gemini 4 Carbon      |                   |  Gemini 4 Neon        |   |
|     |  - Threat Modeling    |                   |  - System Architecture|   |
|     |  - Zero-Day Audit     |                   |  - Code Planning      |   |
|     +───────────────────────+                   +───────────────────────+   |
|                │                                           │                |
|                └─────────────────────┬─────────────────────┘                |
|                                      │                                      |
|                        +───────────────────────────+                        |
|                        | Decomposed Action DAG     |                        |
|                        +───────────────────────────+                        |
|                                      │                                      |
|                ┌─────────────────────┼─────────────────────┐                |
|                ▼                     ▼                     ▼                |
|       +─────────────────+   +─────────────────+   +─────────────────+       |
|       | Gemini 4        |   | Gemini 4        |   | Gemini 4        |       |
|       | Hydrogen-1      |   | Hydrogen-2      |   | Hydrogen-3      |       |
|       | (Run Unit Tests)|   | (Scan AST Nodes)|   | (Lint & Format) |       |
|       +─────────────────+   +─────────────────+   +─────────────────+       |
|                │                     │                     │                |
|                └─────────────────────┼─────────────────────┘                |
|                                      │                                      |
|                                      ▼                                      |
|                        +───────────────────────────+                        |
|                        | Massive Migration Spec?   |                        |
|                        +───────────────────────────+                        |
|                                 │         │                                 |
|                                Yes        No                                |
|                                 │         │                                 |
|                                 ▼         ▼                                 |
|                 +─────────────────+   +─────────────────+                   |
|                 | Gemini 4 Argon  |   | Neon Synthesizer|                   |
|                 | (1M Stream Out) |   | (Patch Commit)  |                   |
|                 +─────────────────+   +─────────────────+                   |
|                                                                             |
+-----------------------------------------------------------------------------+
```

Below is a Python implementation demonstrating this production routing logic. The harness scores incoming tasks by token length, risk profile, and required reasoning depth, dispatching requests to the optimal elemental tier:

```python
"""
Gemini 4 Elemental Routing Harness
Production multi-model agentic dispatcher implementing the Antigravity Orchestrator pattern.
"""

from dataclasses import dataclass
from enum import Enum
from typing import Dict, Any, List, Optional


class GeminiModelTier(str, Enum):
    HYDROGEN = "gemini-4-hydrogen"
    NEON = "gemini-4-neon"
    CARBON = "gemini-4-carbon"
    ARGON = "gemini-4-argon"


class ThinkingLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    XHIGH = "xhigh"


@dataclass
class TaskSpecification:
    prompt: str
    estimated_input_tokens: int
    projected_output_tokens: int
    is_adversarial_context: bool
    requires_terminal_execution: bool
    algorithmic_complexity: int # Scale 1 to 10
    budget_priority: str # 'cost', 'speed', or 'quality'


@dataclass
class DispatchDecision:
    selected_model: GeminiModelTier
    thinking_level: ThinkingLevel
    routing_rationale: str
    estimated_cost_usd: float


class ElementalRouter:
    """
    Evaluates runtime requirements and maps tasks to the optimal Gemini 4 tier.
    """
    def __init__(self):
        # Pricing per million tokens (input / output)
        self.pricing = {
            GeminiModelTier.HYDROGEN: {"in": 0.15, "out": 0.60},
            GeminiModelTier.NEON: {"in": 3.00, "out": 15.00},
            GeminiModelTier.CARBON: {"in": 2.00, "out": 10.00},
            GeminiModelTier.ARGON: {"in": 2.00, "out": 10.00},
        }

    def compute_cost(self, model: GeminiModelTier, in_tok: int, out_tok: int) -> float:
        rates = self.pricing[model]
        return (in_tok / 1_000_000 * rates["in"]) + (out_tok / 1_000_000 * rates["out"])

    def route(self, task: TaskSpecification) -> DispatchDecision:
        # 1. Unbounded output generation requires Argon
        if task.projected_output_tokens > 65_536:
            cost = self.compute_cost(GeminiModelTier.ARGON, task.estimated_input_tokens, task.projected_output_tokens)
            return DispatchDecision(
                selected_model=GeminiModelTier.ARGON,
                thinking_level=ThinkingLevel.MEDIUM,
                routing_rationale="Output exceeds 64k limit; routed to Argon for 1M chunk stream.",
                estimated_cost_usd=cost
            )

        # 2. Untrusted / adversarial context mandates Carbon (0.0% IPI defense)
        if task.is_adversarial_context:
            cost = self.compute_cost(GeminiModelTier.CARBON, task.estimated_input_tokens, task.projected_output_tokens)
            return DispatchDecision(
                selected_model=GeminiModelTier.CARBON,
                thinking_level=ThinkingLevel.XHIGH,
                routing_rationale="Untrusted third-party payload detected; routed to Carbon for dual-track isolation.",
                estimated_cost_usd=cost
            )

        # 3. High-complexity coding and architecture design routes to Neon
        if task.algorithmic_complexity >= 7 or (task.requires_terminal_execution and task.budget_priority == "quality"):
            cost = self.compute_cost(GeminiModelTier.NEON, task.estimated_input_tokens, task.projected_output_tokens)
            return DispatchDecision(
                selected_model=GeminiModelTier.NEON,
                thinking_level=ThinkingLevel.HIGH,
                routing_rationale="High-complexity coding benchmark; routed to Neon for #1 SWE capability.",
                estimated_cost_usd=cost
            )

        # 4. Mechanical execution, fast tool loops, and linting route to Hydrogen
        cost = self.compute_cost(GeminiModelTier.HYDROGEN, task.estimated_input_tokens, task.projected_output_tokens)
        return DispatchDecision(
            selected_model=GeminiModelTier.HYDROGEN,
            thinking_level=ThinkingLevel.LOW if task.budget_priority == "speed" else ThinkingLevel.MEDIUM,
            routing_rationale="Mechanical tool execution; routed to Hydrogen for 2.5x speed and sub-12ms ITL.",
            estimated_cost_usd=cost
        )
```

### 5. Architectural Dilemmas and Production Rules of Thumb

When architecting production systems around the Gemini 4 family, infrastructure teams face specific engineering trade-offs:

1. **The Carbon Thinking Trap:**
   Do not default to Carbon for routine code generation. On benchmarks like SWE-bench and Terminal-Bench, Neon achieves higher accuracy (65.2% vs 62.4%) while using 45% fewer test-time tokens. Restrict Carbon to threat modeling, cryptographic audits, and tasks involving untrusted web scraping where indirect prompt injection is a primary threat.

2. **Hydrogen Fan-Out Thresholds:**
   Deploy Hydrogen in parallel batches rather than sequential chains. Because Hydrogen achieves 2.5x higher token generation speed, running 8 parallel Hydrogen workers costs less than a single Neon session while finishing multi-file scans in a fraction of the wall-clock time.

3. **Argon Output Pacing:**
   When invoking Argon for massive 500,000-token file generation runs, configure client-side streaming listeners with backpressure controls. Writing hundreds of files across a local filesystem can exhaust OS inode handles and saturates disk I/O buffers before the generation stream finishes.

4. **Thinking Level Allocation:**
   Avoid running Neon at `xhigh` thinking settings for standard tasks. Empirical telemetry indicates that moving from `high` to `xhigh` thinking improves Terminal-Bench accuracy by just 1.2% while doubling output token latency. Reserve `xhigh` for theorem proving, formal verification, and compiler optimization problems.

The Gemini 4 elemental lineup proves that the era of monolithic models is over. By splitting the frontier across four specialized architectural profiles, Google DeepMind has transformed foundation models from experimental monoliths into a structured, production-ready systems engineering fabric.
:::

---

### Sources
- Google DeepMind Research: [Gemini 4 Technical Report and Model Cards](https://deepmind.google/technologies/gemini/)
- Artificial Analysis Official Benchmarks: [Artificial Analysis Intelligence Index v5.0](https://artificialanalysis.ai)
- Terminal-Bench Evaluation Repository: [Terminal-Bench 4.1 CLI Benchmark Suite](https://github.com/terminal-bench/terminal-bench)
- SWE-bench Collective: [SWE-bench Verified Leaderboard](https://www.swebench.com)
- Gray Swan Security Labs: [Indirect Prompt Injection (IPI) Defense Benchmark](https://www.grayswan.ai)
