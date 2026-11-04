---
title: "FluidPD: In-Place Elasticity for SLO-Aware Prefill-Decode Disaggregated LLM Serving"
date: "2026-11-04"
description: "A deep systems engineering teardown of FluidPD (arXiv:2610.06917): eliminating phase imbalance and SLO violations in prefill-decode disaggregated inference via FluidToken micro-borrowing and zero-reload FluidRole transitions."
tags: ["FluidPD", "LLM Inference", "Prefill-Decode Disaggregation", "Distributed Systems", "GPU Scheduling", "vLLM", "SGLang", "SLO Optimization"]
author: "Abrar Akhunji"
heroImage: "/images/blog/fluidpd-in-place-elasticity-prefill-decode-disaggregated-serving/hero.jpg"
techTree:
  branch: "Distributed Inference & Kernel Architecture"
  level: 11
  prerequisites: ["2026-11-02-hawk-gpu-npu-phase-disaggregated-kv-cache-transfer", "2026-11-03-saria-persistence-aware-kv-cache-dram-ssd-llm-agents"]
faq:
  - question: "What is FluidPD and what operational problem does it solve in LLM serving?"
    answer: "FluidPD (arXiv:2610.06917) is an in-place elasticity runtime for prefill-decode (P/D) disaggregated LLM serving developed by researchers from UIUC and IBM Research. Prefill-decode disaggregation separates compute-heavy prompt ingestion (prefill) from memory-bandwidth-bound token generation (decode) across dedicated GPU worker pools. However, static worker ratios cannot adapt to dynamic traffic shifts. When prompt arrivals burst or output sequence lengths fluctuate, static clusters suffer severe latency Service Level Objective (SLO) violations while idle hardware capacity sits unused in the opposite pool. FluidPD introduces adaptive elasticity without provisioning extra GPUs or restarting worker runtimes."
  - question: "Why do traditional cloud autoscalers fail during inference phase shifts?"
    answer: "Traditional cloud autoscalers provision or de-provision virtual machines and GPU instances on minutes-long timescales. In large language model serving, spinning up a worker requires pulling weights over the network, allocating tens of gigabytes of GPU High-Bandwidth Memory (HBM), setting up tensor-parallel communication communicators, and warming up execution graphs. Traffic bursts in production occur over milliseconds or seconds. Waiting minutes for an autoscaler causes catastrophic queue buildups and massive Time-To-First-Token (TTFT) or Time-Between-Tokens (TBT) SLO breaches."
  - question: "How does FluidToken provide fine-grained micro-elasticity?"
    answer: "FluidToken handles transient prefill spikes on millisecond timescales by borrowing idle compute slack on decode workers. During decoding iterations, decode workers frequently run sub-saturated batches or experience brief pipeline synchronization bubbles. FluidToken chunks incoming prefill prompts and dispatches them to run on decode workers during these idle intervals. It enforces a strict mathematical deadline budget to ensure that borrowed prefill execution finishes before the next decode token step, guaranteeing zero degradation to Time-Between-Tokens (TBT) latency."
  - question: "How does FluidRole execute in-place macro-elastic worker transitions?"
    answer: "When workload shifts persist over seconds or minutes, FluidRole dynamically reassigns the operational role of running GPU workers between prefill and decode without restarting processes or reloading model weights. Because prefill and decode workers execute identical model parameters, FluidRole drains in-flight requests on the transitioning node, resizes the internal memory allocator between activation scratchpads (for prefill throughput) and KV cache page arenas (for decode capacity), and updates the cluster routing scheduler in hundreds of milliseconds."
  - question: "What empirical performance gains does FluidPD achieve over static serving frameworks?"
    answer: "Evaluated against production Azure LLM serving traces on NVIDIA A100 and H100 clusters, FluidPD increases combined SLO attainment (joint compliance with TTFT and TBT targets) by up to 94.6 percentage points compared to static SGLang configurations. It reduces 99th percentile Time-To-First-Token latency by up to 3.4x during prompt arrival surges while sustaining 99% token generation deadline compliance."
---

:::eli5
*Written by Abrar Akhunji*

Imagine walking into a high-end restaurant with two specialized teams in the kitchen:

```
                  THE FIXED KITCHEN BOTTLENECK
                  
   Prep Cooks (Prefill Team)            Plating Chefs (Decode Team)
   - Heavy chopping & boiling           - Delicate garnishing & plating
   - Massive batch processing           - One plate every 30 seconds
   - Runs out of counter space!         - Twiddling thumbs waiting for food!
   
   Customer Queue: 200 orders backlogged at prep station.
   Result: Customers wait 45 minutes for appetizers while plating chefs sit idle.
```

In modern AI data centers, serving large language models (LLMs) faces an identical structural divide:

1. **The Prefill Stage:** When you send a prompt with 4,000 tokens of text or code, the GPU processes all 4,000 tokens at once in parallel. This is compute-heavy. It pushes GPU tensor cores to 100% capacity to calculate the initial mathematical key-value representations.
2. **The Decode Stage:** Once the prompt is digested, the model produces answers one single token at a time. This is memory-bandwidth-heavy. The GPU loads tens of gigabytes of past conversation memory from memory chips just to generate one word.

To keep these two jobs from colliding on the same chip, leading serving systems use **Prefill-Decode (P/D) Disaggregation**. They put the prefill workload on one set of GPUs and the decode workload on another.

Here is the trap: **Traffic is never predictable.**

```
       DYNAMIC WORKLOAD MISMATCH IN STATIC SERVING
       
   Scenario A: Prompt Arrival Surge (Many users paste 8k codebases)
   Prefill Pool:  [ 100% Saturated ] -> Huge queue delay! TTFT SLO violated!
   Decode Pool:   [ 15% Utilized   ] -> Sitting idle, waiting for work.
   
   Scenario B: Long Generation Wave (Many users ask for 2,000-word essays)
   Prefill Pool:  [ 10% Utilized   ] -> Sitting idle, no new prompts arriving.
   Decode Pool:   [ 100% Saturated ] -> Overloaded memory! TBT SLO violated!
```

If you set up four prefill GPUs and twelve decode GPUs, that ratio is only optimal for one specific traffic mix. 

When a swarm of developers suddenly submit large prompt files, the prefill GPUs drown under the load. Users wait seconds for their first word. Meanwhile, the decode GPUs sit half-empty with spare compute power, unable to help because the system configuration is locked in stone.

Cloud autoscalers cannot fix this. Spinning up a new GPU server takes three to five minutes because the server has to download 140 gigabytes of model weights from storage. By the time the new server boots, the traffic surge has already ruined your service latency.

```
       FLUIDPD: IN-PLACE DUAL-SCALE ELASTICITY
       
   1. FluidToken (Micro-Elasticity: Milliseconds)
      Prefill queue spikes? 
      --> Decode GPUs borrow spare compute cycles between token steps.
      --> Chunks of prefill run in decode bubbles without delaying words.
      
   2. FluidRole (Macro-Elasticity: Seconds)
      Sustained prefill wave?
      --> A decode GPU flips its operational role to become a prefill worker!
      --> No weight reload. No process restart.
      --> Memory instantly shifts from KV cache pages to activation buffers.
```

To solve this problem, researchers from the University of Illinois Urbana-Champaign (UIUC) and IBM Research designed **FluidPD** (arXiv:2610.06917).

Instead of treating GPU roles as permanent hardware silos, FluidPD makes capacity completely fluid across two distinct operational speeds:

- **FluidToken (Transient Micro-Borrowing):** When a sudden prompt burst hits, decode GPUs have microsecond idle pauses between token steps. FluidToken sends small chunks of prompt prefill to those idle decode workers. Because the chunks are carefully budgeted against strict deadlines, the decode workers finish the prefill chunks without slowing down ongoing word generation.
- **FluidRole (In-Place Role Swapping):** When traffic shifts stay heavy for several seconds, FluidPD tells an idle decode worker to switch roles and become a prefill worker on the fly. The worker does not reboot. It keeps the model weights in memory, drains its current batch, swaps its memory allocations in a few hundred milliseconds, and starts chewing through the prefill queue.

The result is extraordinary: FluidPD improves latency compliance by up to **94.6 percentage points** over static setups on real production traces, without buying a single extra GPU.
:::

:::interactive concept
{
  "title": "FluidPD In-Place Elasticity Coordination Architecture",
  "steps": [
    {
      "label": "Stage 01: Telemetry",
      "title": "Dual-Index Pressure Monitoring (PPI & DPI)",
      "content": "A centralized coordinator continuously computes the Prefill Pressure Index and Decode Pressure Index. The indices quantify real-time queue delays against Time-To-First-Token and Time-Between-Tokens service level objectives.",
      "icon": "Activity"
    },
    {
      "label": "Stage 02: FluidToken",
      "title": "Transient Chunked Prefill Borrowing",
      "content": "When a transient prompt spike elevates PPI, the coordinator dispatches bounded prefill token chunks to decode workers exhibiting compute slack. Chunks execute within idle decode pipeline bubbles without missing token deadlines.",
      "icon": "Layers"
    },
    {
      "label": "Stage 03: FluidRole",
      "title": "Zero-Reload In-Place Worker Role Transition",
      "content": "When pressure imbalances persist past the temporal stability threshold, FluidRole drains in-flight work on selected workers and transitions them between prefill and decode roles in-place, restructuring memory arenas in under 350 ms.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 04: Stabilization",
      "title": "End-to-End Latency SLO Attainment",
      "content": "Cluster capacity aligns precisely with incoming workload dynamics. The system preserves 99th percentile Time-To-First-Token and Time-Between-Tokens guarantees while driving aggregate GPU utilization to peak efficiency.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

In distributed large language model inference architectures, Prefill-Decode (P/D) disaggregation has emerged as the standard design pattern for high-throughput serving (embodied in systems such as DistServe, Splitwise, TetriSched, and llm-d).

The physical rationale behind P/D disaggregation stems from the stark divergence in computational characteristics across the two operational phases:

1. **The Prefill Phase (Compute-Bound):** Input prompt ingestion computes full multi-head self-attention across all prompt tokens $S_{\text{prompt}}$ simultaneously. This operation achieves high arithmetic intensity (FLOPs per byte of memory accessed), fully saturating GPU Tensor Cores via dense Matrix Multiplication (GEMM) kernels:

$$\mathcal{I}_{\text{prefill}} \approx \frac{2 \times N_{\text{params}} \times S_{\text{prompt}}}{2 \times N_{\text{params}} + 2 \times L \times n_{\text{kv}} \times d_k \times S_{\text{prompt}}} \gg 100 \text{ FLOPs/byte}$$

2. **The Decode Phase (Memory-Bandwidth-Bound):** Autoregressive token generation emits tokens incrementally ($S_{\text{gen}} = 1$) per iteration. For each emitted token, the GPU must stream the entire active Key-Value (KV) cache history for that request across High-Bandwidth Memory (HBM) channels into on-chip SRAM registers. Arithmetic intensity collapses below the hardware ridge point:

$$\mathcal{I}_{\text{decode}} \approx \frac{2 \times N_{\text{params}} \times 1 + 4 \times L \times n_{\text{kv}} \times d_k \times S_{\text{ctx}}}{2 \times N_{\text{params}} + 2 \times L \times n_{\text{kv}} \times d_k \times S_{\text{ctx}}} \approx \mathcal{O}(1) \text{ FLOPs/byte}$$

Under collocated execution (such as standard vLLM or Hugging Face TGI), scheduling a newly arrived 4,096-token prefill alongside 64 ongoing decode streams introduces catastrophic pipeline interference. The prefill GEMM kernel occupies GPU execution units for hundreds of milliseconds, blocking decode forward passes and causing severe Time-Between-Tokens (TBT) jitter.

P/D disaggregation eliminates this interference by physically dedicating $M_P$ GPU nodes to prefill computation and $M_D$ GPU nodes to decode computation, shuttling generated KV caches across low-latency network interconnects (such as RDMA over InfiniBand or RoCEv2).

However, static P/D disaggregation introduces a fundamental operational fragility: **phase imbalance under dynamic real-world workloads**.

---

### The Anatomy of Phase Imbalance in Production Serving

Real-world enterprise LLM workloads (exemplified by public traces from Microsoft Azure, LMSYS Chatbot Arena, and internal coding agent loops) display extreme temporal variance across two orthogonal dimensions:

- **Prompt Arrival Rate ($\lambda_P$):** Highly bursty, non-Poisson arrival distributions driven by interactive user sessions, scheduled batch workflows, and autonomous agent loops.
- **Prompt-to-Decode Length Ratio ($\rho = S_{\text{prompt}} / S_{\text{gen}}$):** Varies by orders of magnitude. Summarization and code review tasks exhibit $\rho \gg 10$ ($S_{\text{prompt}} \approx 8,192$, $S_{\text{gen}} \approx 256$), whereas creative generation and step-by-step reasoning chains exhibit $\rho \ll 1$ ($S_{\text{prompt}} \approx 256$, $S_{\text{gen}} \approx 4,096$).

```
+----------------------------------------------------------------------------------------------------+
|                         THE RIGID STATIC DISAGGREGATION FAILURE MODES                              |
+----------------------------------------------------------------------------------------------------+

  Pattern 1: Prompt Ingress Surge (High Arrival Rate lambda_P, High Prompt Ratio rho)
  
  Prefill Cluster (M_P = 2 GPUs):
  [ Saturated GEMM Engines ] ===> Queue Backlog Inflates ===> TTFT Exceeds SLO Target!
  
  Decode Cluster (M_D = 6 GPUs):
  [ Sub-Saturated Batches  ] ===> Compute Slack Unused   ===> Idle GPU Cycles Wasted!

  --------------------------------------------------------------------------------------------------
  
  Pattern 2: Deep Autoregressive Generation Wave (Low Arrival Rate lambda_P, Low Prompt Ratio rho)
  
  Prefill Cluster (M_P = 2 GPUs):
  [ Idle Tensor Cores      ] ===> Empty Request Queues   ===> Zero Compute Utilization!
  
  Decode Cluster (M_D = 6 GPUs):
  [ Memory Capacity Full   ] ===> Iteration Chunk Delays ===> TBT Exceeds SLO Target!
```

Under a fixed allocation of $M_P$ prefill workers and $M_D$ decode workers, any shift in traffic distribution creates an asymmetric bottleneck:

1. **Prefill Starvation:** If prompt arrivals surge, the queue delay $W_P$ at the prefill pool expands exponentially:

$$W_P \approx \frac{\lambda_P \mathbb{E}[S_{\text{prompt}}^2]}{2 M_P \mu_P (M_P \mu_P - \lambda_P \mathbb{E}[S_{\text{prompt}}])}$$

The Time-To-First-Token ($\text{TTFT} = W_P + T_{\text{prefill}} + T_{\text{xfer}}$) breaches its Service Level Objective ($\text{SLO}_{\text{TTFT}}$). Simultaneously, decode workers run under-capacity batches, wasting memory bandwidth and compute cycles.

2. **Decode Saturation:** Conversely, if requests trigger extensive multi-step reasoning, active KV caches fill decode GPU memory. Batch sizes must be throttled to prevent Out-Of-Memory (OOM) faults. Iteration latencies stretch, violating the Time-Between-Tokens objective ($\text{SLO}_{\text{TBT}}$). Simultaneously, prefill workers sit idle with empty request queues.

Conventional infrastructure autoscaling mechanisms cannot solve this problem:
- Provisioning an additional GPU instance takes 3 to 8 minutes (virtual machine allocation, model weight initialization across PCIe/SXM interconnects, CUDA context creation, and engine warm-up).
- Repartitioning tensor-parallel model states across different node counts requires cluster-wide communication pauses and pipeline draining.

FluidPD resolves this dilemma by introducing **in-place elasticity**: dynamically adapting the effective compute and memory capacity of prefill and decode phases without provisioning additional hardware or altering the total cluster world size.

---

### Dual-Scale Elasticity Architecture: FluidToken and FluidRole

FluidPD coordinates elasticity across two distinct temporal granularities using two complementary engines:

```
+----------------------------------------------------------------------------------------------------+
|                                FLUIDPD SYSTEM ARCHITECTURE OVERVIEW                                |
+----------------------------------------------------------------------------------------------------+

                                      [ Ingress Request Queue ]
                                                  |
                                                  v
                              +---------------------------------------+
                              | Dual-Index Telemetry Coordinator      |
                              | - Calculates Prefill Pressure Index   |
                              | - Calculates Decode Pressure Index    |
                              +---------------------------------------+
                                        /                   \
                                       /                     \
       (Transient Spike: ms Scale)    /                       \   (Sustained Imbalance: s Scale)
                                     v                         v
                       +---------------------------+   +---------------------------+
                       | FluidToken Micro-Engine   |   | FluidRole Macro-Engine    |
                       | - Chunked Prefill Borrow  |   | - In-Place Worker Shift   |
                       | - Bubble Slack Harvester  |   | - Memory Layout Remap     |
                       | - Strict TBT Deadline Cap |   | - Zero-Reload Process Run |
                       +---------------------------+   +---------------------------+
                                     |                             |
                                     v                             v
                       +---------------------------+   +---------------------------+
                       | Prefill GPU Pool          | <===> | Decode GPU Pool       |
                       | [Activation Buffers]      |   | [Paged KV Cache Arenas]   |
                       +---------------------------+   +---------------------------+
```

1. **FluidToken (Micro-Elasticity on Millisecond Scales):**
   Handles transient prefill bursts by dynamically offloading bounded prefill chunks onto decode workers that possess idle compute slack. FluidToken calculates a strict deadline budget for each decode iteration to ensure that borrowed prefill computation completes within the inter-token idle bubble, strictly preserving the decode $\text{SLO}_{\text{TBT}}$.

2. **FluidRole (Macro-Elasticity on Second Scales):**
   Handles sustained workload shifts by reassigning running worker instances between prefill and decode roles in-place. Because all workers load the exact same model weights, FluidRole drains in-flight tokens, restructures the GPU memory pool between activation scratchpads and KV cache page arenas, and redirects request routing in hundreds of milliseconds, completely bypassing process restarts and weight reloads.

---

### Mathematical Formalization: Telemetry Indices and Pressure Control

To decide when to invoke FluidToken micro-borrowing versus FluidRole macro-reassignment, FluidPD continuously evaluates two lightweight operational indices: the **Prefill Pressure Index ($\text{PPI}$)** and the **Decode Pressure Index ($\text{DPI}$)**.

Let $Q_P$ denote the set of pending requests waiting in the prefill queue. For each request $i \in Q_P$, let $s_i$ be its prompt length, $a_i$ its arrival timestamp, and $\text{SLO}_{\text{TTFT}}$ its target latency threshold. The estimated prefill processing time on worker $k$ is given by an empirically calibrated polynomial function $f_P(s_i)$.

The **Prefill Pressure Index ($\text{PPI}(t)$)** measures the normalized queue backlog relative to available prefill capacity:

$$\text{PPI}(t) = \frac{\sum_{i \in Q_P} \max\left(0, t - a_i + f_P(s_i) - \text{SLO}_{\text{TTFT}}\right) + \sum_{i \in Q_P} f_P(s_i)}{\sum_{k \in \mathcal{W}_P} C_P^{(k)}}$$

where $\mathcal{W}_P$ is the set of active prefill workers, and $C_P^{(k)}$ is the processing throughput capacity of prefill worker $k$. A value of $\text{PPI}(t) > 1.0$ indicates that the prefill cluster is oversubscribed and imminent $\text{SLO}_{\text{TTFT}}$ violations will occur without intervention.

Conversely, let $\mathcal{W}_D$ denote the active decode worker fleet. For each decode worker $j \in \mathcal{W}_D$, let $B_j(t)$ be its active batch size, $K_j(t)$ its allocated KV cache capacity, and $T_{\text{iter}}^{(j)}(B_j)$ its measured single-token iteration execution latency.

The **Decode Pressure Index ($\text{DPI}(t)$)** quantifies decode execution stress and memory saturation:

$$\text{DPI}(t) = \frac{1}{|\mathcal{W}_D|} \sum_{j \in \mathcal{W}_D} \left( \alpha \frac{T_{\text{iter}}^{(j)}(B_j)}{\text{SLO}_{\text{TBT}}} + (1 - \alpha) \frac{K_j(t)}{K_{\text{max}}^{(j)}} \right)$$

where $\alpha \in [0, 1]$ weights latency headroom against memory capacity exhaustion.

The control plane executes the following decision logic at each scheduling cycle $\Delta t_{\text{sched}}$ (typically 10 ms):

```
+----------------------------------------------------------------------------------------------------+
|                                COORDINATED ELASTICITY DECISION LOGIC                               |
+----------------------------------------------------------------------------------------------------+

  1. If PPI(t) <= 1.0 and DPI(t) <= 1.0:
     -> State: Balanced. Normal disaggregated operation. Zero offloading.

  2. If PPI(t) > 1.0 and DPI(t) < theta_D_low:
     -> State: Transient Prefill Spike with Decode Slack.
     -> Action: Trigger FluidToken. Dispatch bounded prefill chunks to decode nodes.

  3. If PPI(t) > theta_P_high for duration tau_persist and DPI(t) < theta_D_idle:
     -> State: Sustained Prefill Deficit.
     -> Action: Trigger FluidRole. Select optimal decode worker j* and transition to Prefill.

  4. If DPI(t) > theta_D_high for duration tau_persist and PPI(t) < theta_P_idle:
     -> State: Sustained Decode Deficit.
     -> Action: Trigger FluidRole. Select optimal prefill worker k* and transition to Decode.
```

---

### FluidToken Mechanics: Exploiting Decode Compute Slack

The design of FluidToken hinges on a core systems insight: **decode workers are memory-bandwidth-bound, leaving GPU Tensor Cores largely underutilized during decode passes.**

During a decode step with batch size $B$, the GPU streams weights and KV caches from HBM to compute attention for just $B$ tokens. Because arithmetic intensity is low, tensor execution pipelines spend significant cycles waiting on memory controller return paths. Furthermore, when batch sizes fall below the memory-saturating threshold $B_{\text{sat}}$, the iteration finishes well before the $\text{SLO}_{\text{TBT}}$ deadline.

Let $T_{\text{iter}}(B)$ be the baseline decode iteration time for batch size $B$, and let $\text{SLO}_{\text{TBT}}$ be the target inter-token latency budget (for instance, 40 ms for interactive reading speed). The available slack time $\Delta T_{\text{slack}}$ on the decode worker is:

$$\Delta T_{\text{slack}} = \text{SLO}_{\text{TBT}} - T_{\text{iter}}(B) - \delta_{\text{guard}}$$

where $\delta_{\text{guard}}$ is a conservative safety margin (typically 2 to 3 ms) to account for kernel launch jitter and memory controller contention.

```
+----------------------------------------------------------------------------------------------------+
|                         FLUIDTOKEN ITERATION CHUNK SCHEDULING TIMELINE                             |
+----------------------------------------------------------------------------------------------------+

  Standard Decode Iteration (With Compute Slack):
  |<- T_iter(B) = 18 ms ->|              |<- Slack = 19 ms ->|<- Guard = 3 ms ->|
  +-----------------------+----------------------------------------------------+
  | Decode Forward Pass   | Idle GPU Pipeline Bubbles                          |  Total SLO = 40 ms
  +-----------------------+----------------------------------------------------+
  
  FluidToken Co-Scheduled Iteration:
  |<- T_iter(B) = 18 ms ->|<- Chunked Prefill = 16 ms ->|<- Margin = 6 ms ---->|
  +-----------------------+-----------------------------+----------------------+
  | Decode Forward Pass   | Prefill Chunk GEMM (C tokens)| Idle Slack (Safe)   |  Total SLO = 40 ms
  +-----------------------+-----------------------------+----------------------+
  [ Decode Token Emitted ]                              [ Next Decode Step ]
```

FluidToken calculates the maximum chunk size $C_{\text{chunk}}$ of prefill tokens that can execute within $\Delta T_{\text{slack}}$ without exceeding the deadline:

$$C_{\text{chunk}} = \arg\max_{c} \left\{ f_P(c) \le \Delta T_{\text{slack}} \right\}$$

When the coordinator identifies an elevated $\text{PPI}(t)$, it strips a chunk of $C_{\text{chunk}}$ tokens from the head of the prefill queue and dispatches it directly to the underutilized decode worker.

The decode worker executes the prefill chunk as an asynchronous CUDA stream immediately after the decode attention kernel completes. The newly generated KV cache blocks for those $C_{\text{chunk}}$ tokens are appended directly into the decode worker's local KV cache pool, avoiding network transfer overhead if the request continues decoding on that same instance.

If the prompt is large ($S_{\text{prompt}} > C_{\text{chunk}}$), FluidToken executes chunked prefill across multiple successive decode iterations or spreads chunks across multiple decode workers in parallel, aggregating the KV representations before initiating autoregressive generation.

---

### FluidRole Mechanics: Zero-Reload In-Place Worker Reconfiguration

While FluidToken absorbs brief milliseconds-long traffic ripples, sustained changes in user behavior (such as an influx of document analysis jobs lasting tens of seconds) overwhelm micro-borrowing. Attempting to run heavy prefill workloads entirely inside decode slack eventually drives $\Delta T_{\text{slack}} \to 0$, causing decode batch queuing and TBT degradations.

For sustained imbalances, FluidPD activates **FluidRole**, transitioning running GPU nodes between prefill and decode modes in-place.

In conventional systems, converting a worker requires killing the inference process, updating configuration scripts, relaunching the runtime, reloading 70B+ model weights from disk or network storage, and rebuilding execution graphs. This traditional teardown incurs 90 to 240 seconds of downtime.

FluidRole eliminates this downtime completely by recognizing that:
1. Prefill and decode instances execute identical model architectures and parameter weights.
2. The difference between prefill and decode roles lies entirely in **memory arena partitioning** and **kernel dispatch targets**.

```
+----------------------------------------------------------------------------------------------------+
|                         FLUIDROLE IN-PLACE MEMORY RESTRUCTURING PIPELINE                           |
+----------------------------------------------------------------------------------------------------+

  Role: DECODE WORKER
  +--------------------------------------------------------------------------------------------------+
  | Model Weights (FP16/FP8) | Small Temp Buffer | Paged KV Cache Arena (Tens of Gigabytes)          |
  | 70B Parameters (35-70GB) | 2 to 4 GB         | Dynamic Page Tables (30 to 80 GB)                 |
  +--------------------------------------------------------------------------------------------------+
                                                |
                                                | 1. Drain active tokens (100 - 250 ms)
                                                | 2. Re-slice memory virtual pools (15 ms)
                                                v
  Role: PREFILL WORKER
  +--------------------------------------------------------------------------------------------------+
  | Model Weights (FP16/FP8) | Activation Scratchpad (High Batch GEMM) | Minimal KV Staging Buffer   |
  | 70B Parameters (35-70GB) | Dense GEMM Workspaces (30 to 60 GB)     | Transfer Outflow (5 to 10GB)|
  +--------------------------------------------------------------------------------------------------+
```

The FluidRole transition protocol executes through four deterministic phases:

#### Phase 1: In-Flight Drain and Context Handoff (Duration: 80 to 250 ms)
When decode worker $j^*$ is selected for promotion to prefill:
- The coordinator stops routing new decode requests to $j^*$.
- Ongoing decode requests with few remaining tokens are allowed to complete naturally.
- Requests with long generation horizons have their active KV caches serialized and transferred via RDMA to peer decode workers with available capacity, preserving generation continuity.

#### Phase 2: Memory Arena Remapping (Duration: 10 to 25 ms)
GPU memory in FluidPD is managed through a custom CUDA virtual memory allocator (`cuMemCreate`, `cuMemMap`). 
- Instead of freeing physical memory back to the operating system, FluidRole unmaps the virtual memory address range assigned to PagedAttention KV cache blocks.
- It remaps the underlying physical pages into contiguous virtual memory addresses reserved for dense intermediate activation buffers, GEMM scratchpads, and FlashAttention workspaces required for long-context prefill kernels.

#### Phase 3: Kernel Dispatch and Graph Reconfiguration (Duration: 15 to 30 ms)
The execution engine swaps its active dispatch table from token-by-token generation kernels to chunked prefill FlashAttention-3 kernels. Tensor-parallel communicators (NCCL communicators) remain initialized and untouched, avoiding collective communicator rebuild latency.

#### Phase 4: Coordinator Route Update (Duration: sub-5 ms)
The central scheduler registers the worker under $\mathcal{W}_P$, updates the global throughput capacity metric $C_P$, and immediately routes incoming prefill requests to the newly minted prefill node.

Total transition time from start of drain to active prefill ingestion consistently clocks between **120 ms and 320 ms**, representing a **$500\times$ speedup** over traditional process restarts.

---

### Empirical Production Telemetry and Evaluation

FluidPD was evaluated against production serving workloads derived from public Azure LLM traces, LMSYS Chatbot Arena traffic, and high-concurrency coding agent benchmarks. 

The testbed consisted of an 8-GPU NVIDIA H100 SXM5 cluster (80 GB HBM3 per GPU, 3.35 TB/s bandwidth, 900 GB/s NVLink interconnect) serving Llama-3.3-70B under FP8 and FP16 precisions.

Baseline systems evaluated under identical hardware:
- **Static SGLang P/D:** Fixed 2 Prefill : 6 Decode allocation using RadixAttention.
- **Static vLLM P/D:** Fixed 2 Prefill : 6 Decode allocation using PagedAttention.
- **DistServe:** State-of-the-art static disaggregated serving runtime with phase-specific kernel tuning.
- **FluidPD:** Dynamic 8-GPU cluster operating with FluidToken micro-borrowing and FluidRole in-place transitions.

```
+----------------------------------------------------------------------------------------------------+
|                  TABLE 1: COMPREHENSIVE SLO ATTAINMENT AND LATENCY BENCHMARKS                      |
+--------------------------+-----------------------+------------------------+------------------------+
| System Architecture      | Joint SLO Attainment  | P99 TTFT Latency (ms)  | P99 TBT Latency (ms)   |
+--------------------------+-----------------------+------------------------+------------------------+
| Static vLLM (Collocated) | 48.2%                 | 4,210 ms               | 88.4 ms                |
| Static SGLang (P/D Fixed)| 62.4%                 | 2,840 ms               | 42.1 ms                |
| DistServe (P/D Fixed)    | 67.8%                 | 2,190 ms               | 39.5 ms                |
| FluidPD (FluidToken Only)| 84.1% (+16.3% vs DS)  | 1,120 ms (-48.8% vs DS)| 38.6 ms                |
| FluidPD (Full Dual-Scale)| 96.8% (+29.0% vs DS)  | 640 ms (-70.7% vs DS)  | 37.2 ms                |
+--------------------------+-----------------------+------------------------+------------------------+
```

Under bursty Azure prompt traces, static systems suffer severe phase imbalance. Static SGLang achieves only 62.4% joint SLO attainment due to massive queue buildups during prompt bursts (P99 TTFT exploding to 2,840 ms).

Enabling FluidToken micro-borrowing allows decode workers to absorb transient prefill spikes, cutting P99 TTFT down to 1,120 ms and lifting joint SLO attainment to 84.1%.

Activating full dual-scale FluidPD (FluidToken plus FluidRole) delivers **96.8% joint SLO attainment** (a **+34.4 percentage point gain over static SGLang**, and up to **+94.6 percentage points** on adversarial burst traces). P99 TTFT drops to **640 ms**, while P99 TBT remains rock-solid at **37.2 ms**, well within the 40 ms interactive threshold.

```
+----------------------------------------------------------------------------------------------------+
|                  TABLE 2: DYNAMIC WORKLOAD TRANSITION DURATION COMPARISON                          |
+--------------------------+-----------------------+------------------------+------------------------+
| Transition Mechanism     | Model Weight Reload   | Context Rebuild Time   | Total Worker Downtime  |
+--------------------------+-----------------------+------------------------+------------------------+
| Cold Process Restart     | 82.4 seconds (Disk IO)| 4.8 seconds (NCCL Init)| 87.2 seconds           |
| Warm Container Restart   | 14.1 seconds (Shm/IPC)| 3.2 seconds            | 17.3 seconds           |
| Dynamic Autoscaler (K8s) | 185.0 seconds (VM Prov| 8.4 seconds            | 193.4 seconds          |
| FluidRole (In-Place)     | 0.0 seconds (Zero IO) | 0.0 seconds (Kept NCCL)| 0.28 seconds (280 ms!) |
+--------------------------+-----------------------+------------------------+------------------------+
```

Table 2 highlights the structural advantage of in-place remapping. While Kubernetes and cloud autoscalers require over three minutes to introduce new prefill capacity, FluidRole reconfigures an active decode worker into a prefill worker in **280 milliseconds**, executing before queue delays can violate client latency objectives.

---

### Architectural Dilemmas and Infrastructure Rules of Thumb

Deploying in-place elasticity in production LLM inference clusters introduces concrete systems trade-offs:

1. **Slack Guard Margin Tuning ($\delta_{\text{guard}}$):** Setting $\delta_{\text{guard}}$ too low risks overlapping chunked prefill execution with the start of the next decode iteration, introducing micro-jitter that degrades Time-Between-Tokens.
   * *Rule of Thumb:* Profile the 99.9th percentile kernel launch latency of your decode forward pass under maximum batch size. Set $\delta_{\text{guard}}$ to exactly $1.5\times$ this measured tail latency (typically 2.5 to 3.5 ms on NVIDIA H100). Never allow the estimated prefill chunk time $f_P(C_{\text{chunk}})$ to exceed $\text{SLO}_{\text{TBT}} - T_{\text{iter}}(B) - \delta_{\text{guard}}$.

2. **Transition Hysteresis and Thrashing Prevention:** Rapidly alternating worker roles (e.g. converting Worker 4 from Decode to Prefill and back to Decode within 500 ms) wastes capacity in transition draining phases.
   * *Rule of Thumb:* Enforce a minimum role residency duration ($\tau_{\text{residence}} \ge 5.0\text{ seconds}$). Require that the sustained imbalance condition ($\text{PPI} > \theta_P^{\text{high}}$) holds continuously for at least $\tau_{\text{persist}} = 1.0\text{ second}$ before issuing a FluidRole transition command.

3. **Inter-Node KV Transfer Bandwidth Allocation:** When FluidRole reassigns a decode worker with active long-lived context, transferring active KV caches to peer nodes consumes network interconnect bandwidth.
   * *Rule of Thumb:* Cap RDMA handoff bandwidth at 40% of total InfiniBand/RoCE link capacity (e.g. reserving 160 Gbps on a 400 Gbps NIC). This prevents migration traffic from congesting real-time prefill-to-decode KV cache transfers for newly completed prompts.
:::

---

### Sources
- Primary Research Paper: [arXiv:2610.06917](https://arxiv.org/abs/2610.06917)
- DistServe P/D Disaggregation Architecture: [arxiv.org/abs/2401.09670](https://arxiv.org/abs/2401.09670)
- SGLang RadixAttention Serving Engine: [github.com/sgl-project/sglang](https://github.com/sgl-project/sglang)
- Mooncake Kimi Distributed Inference Store: [arxiv.org/abs/2407.00079](https://arxiv.org/abs/2407.00079)
