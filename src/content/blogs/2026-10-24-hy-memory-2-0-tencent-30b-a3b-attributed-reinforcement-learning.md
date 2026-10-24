---
title: "Hy-Memory 2.0 and Hy-Memory-30B-A3B: Tencent Open-Sources a 3B-Active Cognitive Memory Architecture"
date: "2026-10-24"
description: "An architectural teardown of Tencent Hunyuan's Hy-Memory 2.0 and Hy-Memory-30B-A3B: dedicated MoE memory write-path specialization, Attributed Memory Reinforcement Learning (AMRL), and tripartite cognitive persistence across chat, working, and code memory."
tags: ["Tencent", "Hunyuan", "Hy-Memory", "Agent Memory", "Mixture of Experts", "MoE", "Reinforcement Learning", "Coding Agents", "Open Source AI", "Systems Architecture"]
author: "Abrar Akhunji"
heroImage: "/images/blog/hy-memory-2-0-tencent-30b-a3b-attributed-reinforcement-learning/hero.jpg"
techTree:
  branch: "Autonomous Agent Memory & Cognitive Systems"
  level: 3
  prerequisites: ["2026-10-21-headroom-claude-mem-agent-context-compression-cache-alignment", "2026-09-27-hindsight-tempr-epistemic-agent-memory-architecture"]
faq:
  - question: "What is Hy-Memory 2.0 and who created it?"
    answer: "Hy-Memory 2.0 is an open-source, full-stack cognitive memory architecture released by Tencent Hunyuan under the Apache 2.0 license on October 24, 2026. It provides a complete three-tier memory ecosystem comprising a specialized Mixture-of-Experts memory writer model (Hy-Memory-30B-A3B), a multi-modal memory framework SDK, and a desktop/CLI multi-agent sync hub called MemHub."
  - question: "What is Hy-Memory-30B-A3B and how does it specialize in the memory write path?"
    answer: "Hy-Memory-30B-A3B is a 30-billion parameter Mixture-of-Experts foundation model that activates only ~3 billion parameters per token. Instead of burning expensive frontier generalist LLMs (like Claude 3.5 Sonnet or GPT-4o) on parsing transcripts, resolving fact conflicts, and structuring storage, Hy-Memory-30B-A3B is trained exclusively on the memory write path, outperforming frontier models on memory extraction benchmarks while cutting serving latency and token costs by over 80%."
  - question: "What is Attributed Memory Reinforcement Learning (AMRL)?"
    answer: "AMRL is Tencent's specialized reinforcement learning objective for memory systems. Instead of evaluating memory entries in isolation, AMRL rolls out multi-turn task trajectories and measures downstream answerability while penalizing over-storage and context pollution. If a generated memory chunk does not contribute to solving future tasks, the policy receives a negative reward, preventing memory bloat."
  - question: "What are the three cognitive memory types supported in Hy-Memory 2.0?"
    answer: "Hy-Memory 2.0 introduces three distinct memory engines: Chat Memory (temporal event graphs with automatic conflict resolution), Working Memory (dynamic tracking of intermediate task goals, execution branches, and paused states for multi-day jobs), and Code Memory (tracking repository design patterns, compiler constraints, and architectural trade-offs for coding agents)."
  - question: "What is MemHub and how does it enable cross-agent memory sharing?"
    answer: "MemHub is a local daemon and application layer that centralizes personal memory across fragmented AI tools. It allows autonomous terminal agents (like Claude Code or Aider), local IDE extensions, and browser copilots to read and write from a single synchronized SQLite and vector store without corrupting state or creating duplicate records."
  - question: "Can Hy-Memory 2.0 integrate with existing memory frameworks like Mem0 or EverMemOS?"
    answer: "Yes. Tencent engineered Hy-Memory-30B-A3B and the Hy-Memory SDK to be drop-in compatible with external memory runtimes including Mem0, MemOS, and EverMemOS. Developers can substitute general-purpose LLM extraction endpoints with a local Hy-Memory-30B-A3B instance running via vLLM or Ollama."
---

:::eli5
*Written by Abrar Akhunji*

If you build autonomous AI agents today, you are probably making an expensive mistake with how your agents remember things.

Whenever an agent finishes a task, you have to decide what to save to long-term memory. Most developer stacks take the easy way out: they take the entire conversation transcript, throw it at a massive, expensive frontier model (like Claude Opus or GPT-4o), and prompt it: *"Extract the important facts and update the database."*

```
                    THE FRONTIER MODEL MEMORY TRAP
                    
    Traditional Memory Extraction:
    ┌────────────────────────────────────────────────────────┐
    │ 1. Raw transcript (45,000 tokens)                      │ ──► Frontier API Cost: $0.15 / turn
    │ 2. Generalist LLM extracts 50 redundant facts          │     Context Bloat: Massive
    │ 3. Contradictions go unresolved                        │     Downstream Accuracy: 54%
    │ 4. CEO model is acting as an expensive secretary       │     "Why did we store my lunch order?"
    └────────────────────────────────────────────────────────┘
    
    Tencent Hy-Memory 2.0 Pipeline:
    ┌────────────────────────────────────────────────────────┐
    │ 1. Raw transcript routed to Hy-Memory-30B-A3B          │ ──► Dedicated 3B-Active Sparse MoE
    │ 2. Attributed RL prunes useless noise before storage    │     Downstream Accuracy: 72.6%
    │ 3. Tripartite split: Chat, Working, and Code Memory    │     80% Token and Cost Savings
    │ 4. MemHub syncs state across all local coding tools    │     Unified Cross-Session Recall
    └────────────────────────────────────────────────────────┘
```

Think of it like hiring a Fortune 500 Chief Executive Officer at $2,000 an hour just to sit in your daily standup, transcribe notes, and file receipts into a folder. It works, but it is slow, wildly expensive, and prone to stuffing the filing cabinet with useless clutter.

On **October 24, 2026**, Tencent Hunyuan released **`Hy-Memory 2.0`** and the open-source **`Hy-Memory-30B-A3B`** model under the Apache 2.0 license. It completely rethinks how AI remembers.

---

### The Three Structural Shifts in Hy-Memory 2.0

#### 1. A Dedicated 3B-Active Memory Model (Hy-Memory-30B-A3B)
Instead of using a 200-billion-parameter generalist model, Tencent built a compact Mixture-of-Experts (MoE) network with 30 billion total parameters, but only **3 billion active parameters** during inference. 

This model does not care about writing poetry or playing chess. It is trained on exactly one job: reading messy conversations, deduplicating facts, resolving conflicting rules, and writing clean, structured memory entries. Because it only activates 3B parameters, it runs locally on consumer GPUs and executes four times faster than cloud API calls.

#### 2. Attributed Reinforcement Learning (Anti-Hoarding Training)
Most memory systems suffer from digital hoarding. They save every minor detail, filling your database with junk that distracts the agent later.

Tencent trained Hy-Memory using **Attributed Memory Reinforcement Learning (AMRL)**. During training, the model is tested on downstream tasks over days of simulated user interactions. If the model saves a fact that helps solve a future problem, it gets a reward. If it saves useless fluff that burns tokens without providing answers, it receives a harsh mathematical penalty.

#### 3. Tripartite Storage: Chat, Working, and Code Memory
Human brains do not dump phone numbers, active coding tasks, and project architecture into a single bucket. Hy-Memory splits memory into three distinct operational engines:
- **Chat Memory:** Temporal facts anchored by time, place, and people (e.g., "The user moved to Berlin on October 12").
- **Working Memory:** Active task state. If an agent is executing a 10-step refactor, working memory tracks completed steps, active blockers, and planned next actions so you can pause and resume tasks across days.
- **Code Memory:** Custom-built for software engineers. It records repository decisions, library constraints, and compiler gotchas so your agent never repeats a failed build pattern.

Let us inspect the MoE tensor specifications, the AMRL loss formulations, benchmark scorecards, and deployment pipelines.
:::

:::interactive concept
{
  "title": "Hy-Memory 2.0 Cognitive Execution Pipeline",
  "steps": [
    {
      "label": "Stage 01: Multi-Modal Ingestion",
      "title": "Raw Interaction Streaming",
      "content": "Multi-turn transcripts, terminal execution logs, and AST diffs are streamed directly into the Hy-Memory ingestion buffer without manual pre-filtering.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 02: Hy-Memory-30B-A3B Routing",
      "title": "Sparse 3B-Active MoE Dispatch",
      "content": "Tokens route through 64 sparse experts (8 active per token), extracting atomic facts and resolving conflicting updates at sub-50ms inference latency.",
      "icon": "Layers"
    },
    {
      "label": "Stage 03: Tripartite Cognitive Partitioning",
      "title": "Structured Storage Segregation",
      "content": "Facts are dispatched to Chat Memory (temporal event graph), Working Memory (task execution trees), or Code Memory (architectural constraints).",
      "icon": "Database"
    },
    {
      "label": "Stage 04: MemHub Cross-Agent Sync",
      "title": "Universal IPC & Storage Bus",
      "content": "MemHub broadcasts memory mutations across local CLI agents, IDE copilots, and background daemons using conflict-free replicated data structures.",
      "icon": "Zap"
    }
  ]
}
:::

:::interactive chart
{
  "title": "Long-Term Memory Benchmark Accuracy vs. Token Overhead",
  "description": "Comparative evaluation on the LoCoMo benchmark measuring factual answerability against cumulative context token consumption.",
  "type": "bar",
  "xKey": "system",
  "series": [
    { "name": "LoCoMo Retrieval Accuracy (%)", "dataKey": "accuracy", "color": "#10B981" },
    { "name": "Token Storage Footprint (kTokens)", "dataKey": "tokens", "color": "#8B5CF6" }
  ],
  "data": [
    { "system": "Raw Transcript History", "accuracy": 48.2, "tokens": 142.5 },
    { "system": "Naive LangChain Buffer", "accuracy": 54.1, "tokens": 88.4 },
    { "system": "Mem0 + GPT-4o-mini", "accuracy": 63.8, "tokens": 46.2 },
    { "system": "EverMemOS + Claude 3.5", "accuracy": 68.4, "tokens": 41.8 },
    { "system": "Hy-Memory 2.0 (30B-A3B)", "accuracy": 72.6, "tokens": 28.4 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Long-term memory systems for autonomous agents have historically been architected as an afterthought, relying on heuristic vector RAG pipelines or generalist LLM prompt wrappers. When deployed on production software engineering tasks spanning multiple days and thousands of repository modifications, these approaches fail due to three core systems breakdowns:

1. **The Write-Path Generalization Tax:** Using frontier models (Claude 3.5 Sonnet, GPT-4o, DeepSeek-V3) to parse conversation histories and extract state changes creates prohibitive operating expenses. Memory writing is fundamentally an extractive, conflict-resolving task that does not require 200B+ active parameters.
2. **Context Bloat from Over-Storage:** Standard memory extraction pipelines maximize recall at the expense of precision. Because LLMs lack counterfactual feedback during extraction, they store irrelevant conversational noise, polluting vector databases and degrading downstream retrieval precision.
3. **Cross-Agent State Fragmentation:** Engineers frequently run Claude Code in the terminal, Cursor in the editor, and local background cron agents simultaneously. Without an OS-level shared memory coordinator, each agent maintains a fragmented, conflicting world state.

Tencent Hunyuan's **Hy-Memory 2.0** suite addresses these limitations by introducing a purpose-built 3B-active sparse Mixture-of-Experts model, an attributed reinforcement learning objective, and a local cross-process memory hub.

```
+---------------------------------------------------------------------------------------------------------------+
| HY-MEMORY 2.0 ARCHITECTURAL SPECIFICATION                                                                     |
+-----------------------------------+---------------------------------------------------------------------------+
| Architectural Subsystem           | Systems Implementation / Engine Responsibility                            |
+-----------------------------------+---------------------------------------------------------------------------+
| Dedicated Memory Writer Model     | Hy-Memory-30B-A3B (Tencent Hunyuan Sparse MoE)                            |
| Total Parameter Count ($\Theta$)  | 30.4 Billion parameters                                                   |
| Active Parameters per Token ($A$) | 3.2 Billion parameters (8 active experts out of 64 routed experts)        |
| Context Window Length             | 32,768 tokens (optimized for multi-turn session dumps)                    |
| Training Paradigm                 | Stage 1: Memory On-Policy Distillation (OPD)                              |
|                                   | Stage 2: Attributed Memory Reinforcement Learning (AMRL)                  |
| Memory Modalities                 | Chat Memory (Event Graphs), Working Memory (DAGs), Code Memory (Rules)    |
| Sync Daemon                       | MemHub: Local IPC daemon with SQLite WAL + ChromaDB vector storage        |
| Hardware Footprint (INT4 / FP8)   | 16.4 GB VRAM (FP8) / 8.8 GB VRAM (INT4 GGUF/AWQ)                          |
| Inference Runtimes                | vLLM, SGLang, Ollama, llama.cpp, Hugging Face TGI                         |
| Open Source License               | Apache 2.0 (Weights and Source Code)                                      |
+-----------------------------------+---------------------------------------------------------------------------+
```

---

### 1. The Write-Path Dilemma: Separating Read and Write Compute

In conventional agent pipelines (such as Mem0 or LangChain Memory), memory operations are handled symmetrically by the primary generation model:

```
Legacy Symmetrical Pipeline:
User Request ──► [Frontier LLM (200B+)] ──► Response Generation
                         │
                         ▼
                 [Frontier LLM (200B+)] ──► Extract Memory Entries (High Latency, High Cost)
```

This architecture is deeply inefficient. Generation requires broad world knowledge, creative planning, and deep code synthesis. Memory writing, by contrast, requires:
- Strict entity-relation tuple extraction.
- Temporal resolution (determining if "tomorrow" refers to October 25).
- Contradiction reconciliation (updating "database=PostgreSQL" to "database=ClickHouse").
- Noise elimination (discarding conversational filler).

Hy-Memory decouples the write path into an asynchronous, specialized sub-tier:

```
Hy-Memory Decoupled Architecture:
User Request ──► [Any Target LLM] ──► Fast Response to User
                         │ (Asynchronous Event Stream)
                         ▼
                 [Hy-Memory-30B-A3B] (3B Active MoE)
                         │
                         ├─► Chat Memory (Temporal Event Graph)
                         ├─► Working Memory (Task DAG State)
                         └─► Code Memory (Architectural Rules)
```

By offloading the write path to a 3B-active model running locally on the same host or on cheap GPU instances, the primary agent operates with zero added latency, while memory maintenance costs drop by over 80%.

---

### 2. Hy-Memory-30B-A3B Model Topology: Sparse MoE Specialization

Hy-Memory-30B-A3B is structured as a decoder-only sparse Mixture-of-Experts transformer. Out of 32 total layers, 28 layers utilize routed MoE feed-forward networks:

$$y_l = x_l + \sum_{i \in \text{TopK}(G(x_l), K)} g_i(x_l) \cdot \text{Expert}_i(x_l)$$

Where:
- Total routed experts: $E = 64$ experts per MoE layer.
- Active experts per token: $K = 8$ experts.
- Shared experts: 2 dedicated shared experts active across all tokens for general syntactic cohesion.
- Hidden dimension: $d_{\text{model}} = 3,072$.
- Feed-forward intermediate dimension: $d_{\text{ffn}} = 1,536$ per expert.

Because only 8 of the 64 routed experts fire per token, the computational density during inference is identical to a dense 3.2-billion-parameter model, while retaining the parametric capacity of a 30.4-billion-parameter network.

---

### 3. Two-Stage Training: Memory On-Policy Distillation and Attributed RL

Training a small MoE model to surpass 200B+ parameter models on complex memory reasoning required a novel two-stage training curriculum:

```
                            TWO-STAGE TRAINING CURRICULUM
                            
    Raw Multi-Session Transcripts
                 │
                 ▼
    ┌───────────────────────────────────────────┐
    │ Stage 1: Memory On-Policy Distillation    │ ──► Dense token-level supervision from
    │          (OPD)                            │     teacher models on student rollout states
    └────────────────────┬──────────────────────┘
                         │
                         ▼
    ┌───────────────────────────────────────────┐
    │ Stage 2: Attributed Memory RL (AMRL)      │ ──► Multi-turn trajectory evaluations
    │          - Answerability Reward (+)       │     Penalizes over-storage and noise
    │          - Memory Bloat Penalty (-)       │     Optimizes downstream utility
    └───────────────────────────────────────────┘
```

#### Stage 1: Memory On-Policy Distillation (OPD)
Standard distillation applies teacher supervision on offline target datasets. In dynamic memory systems, student models generate their own intermediate memory states that drift from the training distribution. 

Tencent's OPD forces the student model to generate memory candidate graphs on-policy. A frontier teacher model (Hunyuan-Large) then evaluates the student's generated state transitions, providing dense step-level KL divergence feedback:

$$\mathcal{L}_{\text{OPD}}(\theta) = \mathbb{E}_{x \sim \mathcal{D}, y \sim \pi_\theta} \left[ D_{\text{KL}} \left( \pi_{\text{teacher}}(y|x) \;\middle\|\; \pi_\theta(y|x) \right) \right]$$

#### Stage 2: Attributed Memory Reinforcement Learning (AMRL)
The primary failure mode of memory systems is storing facts that look plausible but are never useful. AMRL resolves this through downstream trajectory rollouts.

Given a multi-turn session trajectory $\tau = (s_1, a_1, \dots, s_T, a_T)$, the model generates a memory bank $\mathcal{M}$. Downstream probe tasks then query the agent across subsequent synthetic sessions. The reward function is explicitly partitioned:

$$R(\mathcal{M}, \tau) = R_{\text{answerability}}(\mathcal{M}) - \lambda_{\text{cost}} \cdot |\mathcal{M}|_{\text{tokens}} - \lambda_{\text{conflict}} \cdot \mathcal{C}(\mathcal{M})$$

Where:
- $R_{\text{answerability}}$ measures whether downstream questions can be answered using retrieved memory chunks.
- $|\mathcal{M}|_{\text{tokens}}$ penalizes total token consumption, directly discouraging the model from storing trivial pleasantries or redundant facts.
- $\mathcal{C}(\mathcal{M})$ computes the contradiction index across stored facts.

This dual-reward optimization produces a model that aggressively filters conversational noise, yielding compact, high-utility memory snapshots.

---

### 4. Tripartite Memory Topology: Chat, Working, and Code Memory

Hy-Memory 2.0 abandons flat vector stores in favor of three specialized cognitive storage engines:

```
                       HY-MEMORY 2.0 TRIPARTITE ENGINES
                       
    ┌─────────────────────────┬─────────────────────────┬─────────────────────────┐
    │       Chat Memory       │     Working Memory      │       Code Memory       │
    ├─────────────────────────┼─────────────────────────┼─────────────────────────┤
    │ - Temporal Event Graph  │ - Active Goal DAGs      │ - Architecture Rules    │
    │ - Entity Relationships  │ - Step Preconditions    │ - Compiler Constraints  │
    │ - Conflict Resolution   │ - Checkpoint / Resume   │ - Anti-Pattern Warnings │
    │ - User Preferences      │ - Failure Recovery Tree │ - File Ownership Maps   │
    └─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

#### Chat Memory (Temporal Event Graph)
Facts are modeled as temporal assertions $(e_1, r, e_2, [t_{\text{start}}, t_{\text{end}}])$. When a new user interaction states *"I no longer live in London, I relocated to Zurich yesterday"*, the conflict engine updates the validity window of the previous location assertion rather than appending a contradictory duplicate.

#### Working Memory (Task Execution DAGs)
Working memory maintains the active execution graph of long-horizon tasks. If a coding agent crashes during a database migration on Step 4 of a 7-step plan, working memory preserves the execution stack, environmental variables, and failed intermediate outputs. When the session resumes, the agent continues from Step 4 without re-executing Steps 1 through 3.

#### Code Memory (Repository Architectural Constraints)
Specifically engineered for software development, Code Memory records repository invariants:
- Approved architectural patterns (e.g., *"All API handlers must use zod validation schema"*).
- Hard environmental constraints (e.g., *"Node.js runtime limited to v20 on target runner"*).
- Known regression traps discovered during past debugging sessions.

---

### 5. MemHub: Local Multi-Agent Coordination Protocol

In production engineering workflows, developers run multiple autonomous tools simultaneously. Without coordination, Claude Code in the terminal and Cursor in the editor overwrite each other's assumptions.

MemHub operates as a background daemon over Unix domain sockets or local HTTP:

```
                     MEMHUB LOCAL COORDINATION TOPOLOGY
                     
         [Claude Code CLI]      [Cursor IDE]      [Background Cron Bot]
                 │                    │                    │
                 └──────────┐         │         ┌──────────┘
                            ▼         ▼         ▼
                    ┌───────────────────────────────┐
                    │     MemHub Local IPC Bus      │
                    │   (Unix Socket / HTTP 8787)   │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ Hy-Memory-30B-A3B Write Engine│
                    └───────────────┬───────────────┘
                                    │
                        ┌───────────┴───────────┐
                        ▼                       ▼
               [SQLite WAL Store]       [Chroma Vector DB]
               (Structured State)       (Semantic Embeddings)
```

MemHub uses conflict-free replicated data structures (CRDTs) to ensure concurrent updates from multiple CLI sessions merge without state corruption.

---

### 6. Benchmark Evaluation: LoCoMo, LongMemEval, and Latency Profiles

Hy-Memory 2.0 was benchmarked against leading open-source and proprietary memory frameworks on the **LoCoMo** and **LongMemEval** benchmark suites:

```
+---------------------------------------------------------------------------------------------------------------+
| BENCHMARK EVALUATION: HY-MEMORY 2.0 VS. PRODUCTION MEMORY FRAMEWORKS                                         |
+-----------------------------------+--------------------+--------------------+---------------------------------+
| Evaluation Metric                 | Mem0 (GPT-4o-mini) | EverMemOS (Sonnet) | Hy-Memory 2.0 (30B-A3B)         |
+-----------------------------------+--------------------+--------------------+---------------------------------+
| LoCoMo Overall Accuracy (%)       | 63.8%              | 68.4%              | 72.6%                           |
| Temporal Event Tracking (%)       | 58.2%              | 64.1%              | 74.8%                           |
| Contradiction Resolution Rate (%) | 61.4%              | 67.9%              | 79.2%                           |
| Code Constraint Adherence (%)     | 54.0%              | 69.2%              | 81.4%                           |
| Average Memory Write Latency (ms) | 1,840 ms           | 2,120 ms           | 380 ms (Local FP8)              |
| Context Storage Overhead (kTok)   | 46.2 kTokens       | 41.8 kTokens       | 28.4 kTokens (32% reduction)    |
| Relative Monthly Operating Cost   | 1.0x (Baseline)    | 1.45x              | 0.18x (82% cost reduction)      |
+-----------------------------------+--------------------+--------------------+---------------------------------+
```

#### Key Engineering Insights:
1. **79.2% Contradiction Resolution:** Hy-Memory-30B-A3B achieved a 79.2% success rate in identifying and updating conflicting statements, outperforming Claude 3.5 Sonnet by 11.3%. The AMRL training directly penalizes contradictory memory entries.
2. **Sub-400ms Memory Write Latency:** Running locally in FP8 precision on a single RTX 4090 or Apple Silicon Mac, write latency averaged 380ms, eliminating the 2-second cloud round-trip latency of proprietary APIs.
3. **32% Reduction in Storage Footprint:** By punishing conversational noise, the AMRL objective pruned non-essential facts, keeping the long-term context store lean and preventing downstream context saturation.

---

### 7. Production Deployment: SDK Setup and vLLM Serving

Deploying Hy-Memory 2.0 into an agent workflow can be accomplished using the open-source Python SDK:

#### Serving Hy-Memory-30B-A3B with vLLM
Launch the model endpoint using vLLM with FP8 quantization:

```bash
vllm serve tencent/Hy-Memory-30B-A3B \
  --quantization fp8 \
  --max-model-len 32768 \
  --gpu-memory-utilization 0.90 \
  --port 8080
```

#### Python SDK Integration
Integrate Hy-Memory 2.0 directly into an existing agent loop:

```python
# -*- coding: utf-8 -*-
"""
Hy-Memory 2.0 Integration Example
Demonstrating tripartite memory management for autonomous coding agents.
"""

from hy_memory import HyMemoryClient, MemoryConfig

# Initialize client pointing to local vLLM endpoint
client = HyMemoryClient(
    base_url="http://localhost:8080/v1",
    storage_path="~/.local/share/memhub/memory.db",
    config=MemoryConfig(
        enable_chat_memory=True,
        enable_working_memory=True,
        enable_code_memory=True,
        contradiction_threshold=0.85
    )
)

def handle_coding_turn(session_id: str, transcript: list[dict]):
    """
    Asynchronously extracts architectural decisions and updates working memory.
    """
    # Step 1: Update memory state in background
    write_receipt = client.write_turn(
        session_id=session_id,
        messages=transcript,
        domain="code"
    )
    
    # Step 2: Query active constraints for next generation turn
    active_constraints = client.query_memory(
        session_id=session_id,
        query="What database migration constraints are active?",
        modalities=["code", "working"]
    )
    
    return active_constraints

if __name__ == "__main__":
    test_transcript = [
        {"role": "user", "content": "We are migrating from SQLite to Postgres 16. Do not use raw SQL queries."},
        {"role": "assistant", "content": "Understood. I will enforce Drizzle ORM schemas for all migrations."}
    ]
    
    constraints = handle_coding_turn("dev_session_01", test_transcript)
    print("Retrieved Constraints:", constraints)
```

---

### 8. Architectural Takeaways for Senior Systems Engineers

The release of Hy-Memory 2.0 demonstrates three foundational shifts in autonomous AI architecture:

1. **The Write Path Demands Model Specialization:** Forcing a single generalist model to handle user dialogue, tool calling, code generation, and memory maintenance is an anti-pattern. Specialized 3B-active MoE models trained via Attributed RL outperform frontier models at memory extraction while slashing latency and operational cost.
2. **Attributed Loss Prevents Context Rot:** Without counterfactual reinforcement learning that penalizes memory bloat based on downstream answerability, memory systems inevitably degenerate into unmanageable context dumps.
3. **Cognitive Tripartition Over Flat Vector RAG:** Treating chat history, active execution goals, and code constraints as interchangeable text chunks degrades agent reliability. Explicitly partitioning memory into Chat, Working, and Code engines provides the structural rigor required for multi-day autonomous workflows.
:::

---

### Primary References & Technical Repositories
- Tencent Hunyuan Hy-Memory Technical Report: [arXiv:2610.22196](https://arxiv.org/abs/2610.22196)
- Model Weights on Hugging Face: [huggingface.co/tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B)
- Hy-Memory Framework Repository: [github.com/Tencent-Hunyuan/Hy-Memory](https://github.com/Tencent-Hunyuan/Hy-Memory)
- MemHub Multi-Agent Local Daemon: [github.com/Tencent-Hunyuan/MemHub](https://github.com/Tencent-Hunyuan/MemHub)
