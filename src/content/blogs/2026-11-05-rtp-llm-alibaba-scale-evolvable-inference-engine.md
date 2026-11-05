---
title: "RTP-LLM: Building an Evolvable and Reliable LLM Inference Engine at Alibaba Scale"
date: "2026-11-05"
description: "A systems engineering teardown of RTP-LLM (arXiv:2611.00967): decoupling Python model definitions from a high-throughput C++ runtime, FlexLB prefill-decode disaggregation, and EPLB MoE load balancing across 100M+ users."
tags: ["RTP-LLM", "Alibaba", "LLM Inference", "Distributed Systems", "DeepSeek-V3", "MoE", "CUDA", "Systems Engineering"]
author: "Abrar Akhunji"
heroImage: "/images/blog/rtp-llm-alibaba-scale-evolvable-inference-engine/hero.jpg"
techTree:
  branch: "Distributed Inference & Kernel Architecture"
  level: 11
  prerequisites: ["2026-10-25-llm-d-1-0-cncf-distributed-inference-prefill-decode-disaggregation", "2026-11-04-fluidpd-in-place-elasticity-prefill-decode-disaggregated-serving"]
faq:
  - question: "What is RTP-LLM and what production challenge does it address?"
    answer: "RTP-LLM (arXiv:2611.00967) is an industrial-scale large language model inference engine designed, deployed, and proven across Alibaba Group. Serving over 100 million active users across mission-critical services like Taobao Wenwen, OpenSearch, and the Aidge AI platform, it resolves the fundamental tension between rapid algorithmic evolution and strict production reliability. While open-source research introduces new architectures and custom operators weekly, enterprise serving demands five-nines uptime, sub-second latency, and zero-regression cluster management."
  - question: "How does RTP-LLM reconcile fast model iteration with a high-performance C++ runtime?"
    answer: "RTP-LLM enforces a strict architectural decoupling: model-specific semantics and structural definitions are written in Python/PyTorch close to reference implementations, while request queuing, continuous batching, memory arenas, and hardware dispatch reside in an ultra-fast C++ runtime. To prevent Python global interpreter lock (GIL) contention and launch latency, RTP-LLM captures the execution graphs of the Python model forward passes into CUDA Graphs. The C++ runtime replays these graphs directly on hardware, achieving native C++ execution speeds with Python development velocity."
  - question: "What is FlexLB and how does it optimize Prefill-Decode disaggregated clusters?"
    answer: "FlexLB is the centralized cluster coordination master in RTP-LLM. In a disaggregated cluster spanning hundreds of nodes, FlexLB routes incoming prompts to prefill workers by combining RadixTree Key-Value (KV) prefix cache matching with estimated worker queue wait times. Once prefill completes, FlexLB assigns the request to a decode worker based on real-time memory headroom and KV cache paging capacity, completely eliminating prefill-decode interference without manual load balancing."
  - question: "How does Expert Parallel Load Balancing (EPLB) solve MoE straggler bottlenecks?"
    answer: "In massive Mixture-of-Experts (MoE) models such as DeepSeek-V3/R1 and Qwen-MoE, token routing naturally exhibits heavy skew toward a few popular experts, creating severe hardware stragglers that slow down entire tensor-parallel and expert-parallel cliques. EPLB dynamically monitors expert activation frequencies, replicates high-traffic expert weights across multiple GPUs, and uses DeepEP low-latency all-to-all communication kernels to overlap token dispatch with micro-batch computation."
  - question: "How does pipelined file-order model loading eliminate cluster cold-start downtime?"
    answer: "Standard inference frameworks load checkpoints by having each GPU read separate weight files sequentially, creating severe NVMe disk contention and multi-minute cluster boot delays. RTP-LLM uses file-order-driven I/O paired with parallel I/O-communication overlapping. One reader thread streams contiguous parameter chunks from SSD storage into pinned host DRAM, immediately staging them into GPU memory via asynchronous DMA engines while simultaneously broadcasting weight slices across peer GPUs over NVLink and PCIe bus lanes. This cuts 70B and 671B checkpoint loading time by up to 3.8x."
---

:::eli5
*Written by Abrar Akhunji*

Imagine operating an international airline that carries one hundred million passengers every single month:

```
                  THE AIRLINE ENGINEERING PARADOX
                  
   The Aviation Dilemma:
   - Passengers want brand-new plane designs with new seat layouts every single week.
   - Air traffic controllers and flight mechanics need absolute, unchanging safety standards.
   - If mechanics have to rebuild the entire turbine engine every time a seat layout changes,
     the entire airline shuts down!
   
   The Monolithic Software Trap:
   - When AI research drops a new model (like DeepSeek-V3, Qwen-2.5-Coder, or a new MoE),
     engineers usually have to rewrite low-level C++ drivers from scratch.
   - Or, they run everything in raw Python, which runs slow, crashes under load, and wastes millions in cloud bills.
```

In production enterprise infrastructure, serving large language models (LLMs) faces an identical operational conflict:

1. **The Research Speed Problem:** AI researchers release new neural network tricks every week: different attention formulas, rotary position schemes, and sparse routing methods. If your production serving engine is hard-coded in rigid C++, it takes months of software development to support each new model.
2. **The Industrial Reliability Problem:** When an engine serves production traffic for global e-commerce and search engines, it cannot crash. It must handle thousands of queries per second, balance memory down to the last kilobyte, and guarantee responses within fractions of a second.

To resolve this conflict across hundreds of AI applications, Alibaba engineered **RTP-LLM** (arXiv:2611.00967).

```
          HOW RTP-LLM SEPARATES CONCERNS
          
    Layer 1: The Model Blueprint (Written in Python)
    - Quick to write and simple to modify.
    - Researchers define new layers, attention shapes, and MoE experts.
    - Runs once during startup to build a mathematical map.
                      |
                      v  [ Baked into Hardware via CUDA Graphs ]
                      |
    Layer 2: The Industrial Engine (Written in C++)
    - Handles continuous batching queues, networking, and memory pages.
    - Runs continuously with zero Python interpreter overhead.
    - Replays the baked hardware map at full silicon speed.
```

Instead of forcing developers to choose between Python flexibility and C++ performance, RTP-LLM splits the system into two distinct layers:

- **The Model Blueprint (Python):** Developers write new model architectures in clean, straightforward Python/PyTorch code. 
- **The Industrial Engine (C++):** A rock-solid C++ runtime manages request queues, network sockets, token streaming, and memory pages.

During startup, RTP-LLM takes the Python model operations and bakes them directly into the GPU silicon using **CUDA Graphs**. Once baked, the C++ engine replays the hardware graph over and over. You get the quick development speed of Python, but during live serving, the GPU runs at maximum C++ bare-metal speed with zero Python pauses.

```
          FLEXLB: THE AIR TRAFFIC CONTROLLER FOR GPU CLUSTERS
          
                     Incoming User Prompts
                               |
                               v
                       [ FlexLB Master ]
                      /                 \
                     /                   \
        [ Prefill Cluster ]         [ Decode Cluster ]
        - Ingests 4k prompt files   - Emits words one-by-one
        - Matches prefix cache      - Balances memory capacity
        - Finishes in 200 ms        - Zero hesitation or delays
```

On top of this split, RTP-LLM coordinates hundreds of servers using an intelligent manager named **FlexLB**:

- When a user submits a prompt, FlexLB inspects whether part of that prompt is already cached in memory on another machine. It routes the prompt to the exact server that has the memory warm, cutting processing time in half.
- It keeps prompt crunching (prefill) and token generation (decode) completely separated on different machines, ensuring that long inputs never stall active conversations.
- For massive models with hundreds of specialized expert networks (like DeepSeek-V3), RTP-LLM balances the work across all chips so no single chip gets overwhelmed while others sit empty.

The outcome is a battle-tested infrastructure standard: RTP-LLM serves over 100 million users reliably while letting engineering teams roll out new model architectures in days instead of months.
:::

:::interactive concept
{
  "title": "RTP-LLM Industrial Inference Pipeline",
  "steps": [
    {
      "label": "Stage 01: Ingress",
      "title": "FlexLB Prefix Affinity & Queue Routing",
      "content": "The central FlexLB coordinator checks incoming requests against RadixTree prefix caches across all prefill nodes, dispatching prompts to workers with maximal KV cache hits and minimal queue backlogs.",
      "icon": "Activity"
    },
    {
      "label": "Stage 02: Prefill",
      "title": "Disaggregated Dense GEMM Processing",
      "content": "The assigned prefill worker executes FlashAttention-3 kernels across Tensor Parallel cliques, computing prompt activations and streaming generated KV cache blocks directly to decode memory arenas via RDMA.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 03: Dispatch",
      "title": "EPLB MoE Expert Parallel Load Balancing",
      "content": "For sparse MoE layers, Expert Parallel Load Balancing monitors token routing frequencies, replicating hot expert weights and using DeepEP all-to-all communication to overlap token dispatch with compute.",
      "icon": "Layers"
    },
    {
      "label": "Stage 04: Paged Decode",
      "title": "Continuous Paged Memory Autoregressive Emission",
      "content": "Decode workers generate response tokens incrementally through CUDA Graph replay, streaming output tokens to client sockets while reclaiming finished KV cache page tables in real time.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Operating large language model inference at hyperscale introduces an architectural dilemma that traditional systems software was never designed to solve: the **evolution-reliability trade-off**.

In typical enterprise distributed systems (such as high-performance database engines or key-value stores), the core computational kernel and state machine remain stable for years. Systems engineering investments focus almost exclusively on static C++ optimization, kernel tuning, and memory locality.

In frontier AI infrastructure, this stability does not exist:
- Model architectures evolve rapidly. Within a single twelve-month window, production fleets transitioned from standard dense Multi-Head Attention (MHA) to Grouped-Query Attention (GQA), Multi-Head Latent Attention (MLA), and deeply sparse Mixture-of-Experts (MoE) with 256 to 512 dynamic routed experts (exemplified by DeepSeek-V3/R1 and Qwen-2.5-Max).
- Custom operators appear continuously: specialized rotary position embeddings (RoPE with dynamic NTK-aware scaling), hybrid linear-attention blocks (Mamba, RWKV), and non-standard quantization schemes (FP8 with block-wise scaling factors, INT4-AWQ, GPTQ).

If an inference system implements models purely in low-level C++/CUDA, supporting a newly released architecture requires weeks of manual kernel refactoring, operator binding, and regression testing. Conversely, if an inference system relies heavily on Python runtimes (e.g., standard Hugging Face pipeline loops), performance degrades by $3\times$ to $5\times$ due to Python Global Interpreter Lock (GIL) contention, host-side kernel launch latencies, and garbage collection pauses.

RTP-LLM (Alibaba Group, arXiv:2611.00967) presents the definitive systems blueprint for resolving this conflict, scaling across thousands of heterogeneous GPUs serving over 100 million production users.

---

### The Two-Tier Architecture: Python Semantic Expressiveness Meets C++ Execution Rigor

RTP-LLM achieves evolvability without sacrificing execution speed by enforcing an absolute architectural boundary between **Model Definition** and **Runtime Execution**:

```
+----------------------------------------------------------------------------------------------------+
|                                 RTP-LLM TWO-TIER RUNTIME ARCHITECTURE                              |
+----------------------------------------------------------------------------------------------------+

  [ Tier 1: Model Definition Layer (Python / PyTorch) ]
  - Architectural Topology (Qwen, Llama, DeepSeek-V3, Mistral)
  - Custom Attention Masking & RoPE Embedding Logic
  - Weight Loading, Sharding Mappings, and Structural Variations
  - Executed during Engine Warmup & Graph Capture Phase
                               |
                               | Ahead-Of-Time (AOT) Graph Tracing & Capture
                               v
  [ Hardware Execution Boundary: CUDA Graphs / Pinned Static Execution Trees ]
  - Static Buffer Allocations (No Dynamic Tensor Mallocs during Serving)
  - Pre-Constructed Kernel Launch Parameters
  - Host-to-Device Memory Offsets Fixed in Device Virtual Memory
                               ^
                               | Replay Triggered via Sub-Microsecond C++ Dispatch
                               |
  [ Tier 2: Shared High-Performance Runtime Layer (Pure C++) ]
  - Continuous Dynamic Batching Queues & Iteration Schedulers
  - PagedAttention / RadixTree Multi-Tiered KV Cache Manager
  - Inter-Node Communication Coordinator (NCCL / DeepEP / UCX)
  - Network Ingress, HTTP/gRPC Handlers, and SSE Token Streaming
```

#### The Python Model Definition Layer
Model definitions in RTP-LLM are written in native Python/PyTorch. A new model topology is authored using declarative PyTorch modules that mirror the original research implementation. 

Instead of writing complex C++ class hierarchies for every new attention block, developers write Python code that specifies:
1. The tensor shapes and tensor-parallel sharding dimensions.
2. The sequence of layer normalizations, projections, and attention operations.
3. The specific kernel bindings (e.g., calling FlashAttention-3, FlashInfer, or CUTLASS GEMM templates).

#### The C++ High-Performance Runtime
The C++ runtime manages everything that requires deterministic, nanosecond-level control:
- High-concurrency request admission queues.
- RadixTree prefix matching and page table mapping.
- Token generation dispatch loops.
- RDMA buffer allocation for cross-node KV transfers.
- SSE (Server-Sent Events) network streaming.

#### Bridging the Boundary: Zero-Overhead CUDA Graph Replay
To bridge Python and C++ without interpreter overhead during live inference, RTP-LLM uses **ahead-of-time CUDA Graph capturing**:
1. During worker initialization, the C++ runtime allocates fixed, static memory arenas in GPU High-Bandwidth Memory (HBM) for input token IDs, positional offsets, activation scratchpads, and KV cache pointers.
2. The runtime invokes the Python model forward pass across predefined batch size buckets (e.g., $B \in \{1, 2, 4, 8, 16, 32, 64, 128\}$) inside a `cudaStreamBeginCapture()` block.
3. The NVIDIA CUDA driver captures the entire sequence of GPU kernel launches, parameter structures, and memory dependencies into an instantiated executable graph (`cudaGraphExec_t`).
4. During live inference, the C++ scheduler selects the appropriate graph bucket and executes `cudaGraphLaunch()` directly from C++.

The host CPU overhead drops from **$180\ \mu\text{s}$ per layer in pure Python** down to **sub-$2\ \mu\text{s}$ for the entire model forward pass in C++**, completely removing host CPU bottlenecks while leaving model development entirely in Python.

---

### FlexLB Master: Cluster-Scale Prefill-Decode Disaggregation

In hyperscale deployments, collocated inference (running prefill and decode on the same GPU) causes severe Quality-of-Service (QoS) degradation. A long 8,192-token prompt prefill monopolizes GPU Tensor Cores for hundreds of milliseconds, blocking active decode iterations and causing severe Time-Between-Tokens (TBT) latency spikes.

RTP-LLM enforces physical Prefill-Decode (P/D) disaggregation, dedicating distinct GPU cliques to prefill computation and decode generation.

To coordinate these fleets across hundreds of distributed nodes, RTP-LLM deploys **FlexLB**, an intelligent cluster-level master scheduler:

```
+----------------------------------------------------------------------------------------------------+
|                         FLEXLB DISAGGREGATED CLUSTER ROUTING TOPOLOGY                              |
+----------------------------------------------------------------------------------------------------+

                                      [ Ingress Client Request R ]
                                                  |
                                                  v
                                      +-----------------------+
                                      |     FlexLB Master     |
                                      +-----------------------+
                                        /                   \
        1. Prefix Match & Queue Scoring/                     \ 2. Memory Headroom Allocation
                                      /                       \
                                     v                         v
                       +---------------------------+   +---------------------------+
                       | Prefill Node Pool         |   | Decode Node Pool          |
                       | (Worker w_p)              |   | (Worker w_d)              |
                       | - Evaluates RadixTree Hits|   | - Tracks Active Paged KV  |
                       | - Executes FlashAttention |   | - Continuous Token Output |
                       +---------------------------+   +---------------------------+
                                     \                             ^
                                      \=== Direct RDMA / RoCE ====/
                                           KV Cache Transfer
```

#### Mathematical Routing Policy of FlexLB
When a request $R$ arrives with prompt token sequence $\mathcal{S}_{\text{prompt}}$, FlexLB selects the optimal prefill worker $w^* \in \mathcal{W}_P$ by jointly maximizing prefix cache hit length while minimizing estimated queue waiting time.

Let $\mathcal{H}(R, w)$ denote the length of the prefix token match between request $R$ and the RadixTree resident in the memory of prefill worker $w$. Let $Q_w$ be the number of prompt tokens currently queued on worker $w$, and let $\mu_w$ be the historical prefill throughput (tokens per millisecond) of that worker:

$$\text{Score}_{\text{prefill}}(R, w) = \beta \cdot \frac{\mathcal{H}(R, w)}{|\mathcal{S}_{\text{prompt}}|} - (1 - \beta) \cdot \frac{Q_w}{\mu_w}$$

where $\beta \in [0, 1]$ is a tunable balancing factor. 
- If $\beta \to 1$, FlexLB behaves as a pure prefix-affinity router, maximizing KV cache reuse and minimizing redundant FLOPs.
- If $\beta \to 0$, FlexLB acts as a pure least-loaded scheduler, routing traffic away from backlogged nodes to prevent Time-To-First-Token (TTFT) queue spikes.

Once the prefill worker finishes generating the initial token and intermediate KV activations, FlexLB routes the session to the optimal decode worker $d^* \in \mathcal{W}_D$. The decode selection prioritizes memory headroom:

$$d^* = \arg\max_{d \in \mathcal{W}_D} \left( K_{\text{free}}^{(d)} - \gamma \cdot \mathbb{E}[S_{\text{gen}}] \right)$$

where $K_{\text{free}}^{(d)}$ is the unallocated PagedAttention block count on decode worker $d$, and $\mathbb{E}[S_{\text{gen}}]$ is the predicted output sequence length.

The prefill worker transmits the computed KV cache blocks directly into the decode worker's pre-allocated PagedAttention arena using asynchronous RDMA over RoCEv2 (over InfiniBand or 400GbE NICs), bypassing host CPU memory entirely.

---

### Mixture-of-Experts Scaling: EPLB and Communication Overlapping

Serving frontier Mixture-of-Experts (MoE) models (such as DeepSeek-V3 with 256 routed experts and 1 shared expert, totaling 671 billion parameters) introduces a severe distributed systems bottleneck: **expert load imbalance**.

Under standard Expert Parallelism (EP), the $E$ experts are partitioned evenly across $N_{\text{gpu}}$ GPUs (each GPU hosting $E / N_{\text{gpu}}$ experts). During inference, a learned top-$k$ gating network routes each token to $k$ specific experts.

In real-world traffic, token routing distributions are heavily non-uniform. Certain experts (e.g., common punctuation, syntax tokens, or foundational reasoning branches) process $20\times$ more tokens than specialized experts:

```
+----------------------------------------------------------------------------------------------------+
|                         MOE STRAGGLER BOTTLENECK VS EPLB REPLICATION                               |
+----------------------------------------------------------------------------------------------------+

  Standard Naive Expert Parallelism:
  GPU 0: [ Expert 0 (Idle: 5 tokens)   ] ===> Finishes in 2 ms  ===> Stalls waiting for GPU 1!
  GPU 1: [ Expert 1 (HOT: 800 tokens!) ] ===> Finishes in 38 ms ===> Straggler slows down entire TP/EP clique!
  GPU 2: [ Expert 2 (Idle: 12 tokens)  ] ===> Finishes in 3 ms  ===> Stalls waiting for GPU 1!

  RTP-LLM EPLB (Expert Parallel Load Balancing):
  GPU 0: [ Expert 0 (5 tokens)  | Expert 1 Replica A (400 tokens) ] ===> Finishes in 19 ms!
  GPU 1: [ Expert 3 (10 tokens) | Expert 1 Replica B (400 tokens) ] ===> Finishes in 19 ms!
  All GPUs finish simultaneously. Straggler latency eliminated.
```

When one expert is overloaded, the GPU hosting that expert becomes a severe straggler. Because the all-to-all communication barrier requires every GPU to exchange expert output activations before moving to the next transformer layer, the slowest GPU dictates the latency of the entire cluster.

#### Expert Parallel Load Balancing (EPLB)
To squash stragglers, RTP-LLM implements **EPLB (Expert Parallel Load Balancing)**:
1. **Dynamic Frequency Profiling:** The C++ runtime maintains a sliding-window histogram of expert activation counts $\mathcal{C}_e$ across all layers.
2. **Dynamic Weight Replication:** High-frequency "hot" experts are identified and duplicated across multiple GPUs. If Expert $e$ receives traffic exceeding threshold $\theta_{\text{hot}}$, its weights are replicated into spare HBM scratchpad memory on peer GPUs.
3. **Redundant Gating Dispatch:** The gating router splits incoming tokens for Expert $e$ evenly across its physical replicas, reducing peak per-GPU computation by up to $3\times$.

#### DeepEP Communication-Compute Overlapping
For the physical exchange of token activations between GPUs, RTP-LLM integrates **DeepEP**, an ultra-low-latency all-to-all communication kernel designed specifically for MoE inference.

DeepEP divides the active token batch into micro-chunks. While the GPU computes GEMM operations for micro-chunk $m$, the NVLink/RDMA network concurrently transmits the input activations for micro-chunk $m+1$:

$$\mathcal{T}_{\text{layer}} \approx \max\left( \mathcal{T}_{\text{GEMM}}, \mathcal{T}_{\text{AllToAll}} \right) + \epsilon_{\text{sync}}$$

This communication-compute overlap hides up to **85% of all-to-all network latency**, enabling near-linear throughput scaling on 8-way and 16-way Expert Parallel cliques.

---

### Pipelined File-Order Model Loading: Slashing Cluster Cold Starts

In enterprise serving environments, rolling out a new model version or recovering from a hardware failure requires loading massive parameter checkpoints (e.g. 140 GB for Qwen-2.5-72B, or 340 GB for FP8-quantized DeepSeek-V3).

Standard open-source inference frameworks (such as baseline vLLM or Hugging Face Transformers) load checkpoints through uncoordinated Python file reads. Each GPU process independently opens checkpoint files and issues random reads. This causes catastrophic NVMe drive queue saturation, PCIe bus thrashing, and takes **3 to 8 minutes** per node.

RTP-LLM introduces **Pipelined File-Order Model Loading**, treating model weight initialization as a hardware streaming problem:

```
+----------------------------------------------------------------------------------------------------+
|                         PIPELINED FILE-ORDER WEIGHT STREAMING TIMELINE                             |
+----------------------------------------------------------------------------------------------------+

  Standard Uncoordinated Loading (vLLM / HF Baseline): Total = 184 seconds
  [ NVMe Random File Reads (Python) ] ===> [ Host DRAM ] ===> [ PCIe Copy ] ===> [ GPU Weight Alloc ]
  (Drives thrash; GPUs sit completely idle waiting on disk blocks)

  RTP-LLM Pipelined Streaming: Total = 48 seconds (3.8x Speedup!)
  Time (s): 0s -------- 12s -------- 24s -------- 36s -------- 48s
  Thread 1: [ NVMe Chunk 1 ] [ NVMe Chunk 2 ] [ NVMe Chunk 3 ] [ NVMe Chunk 4 ]  (Sequential Direct I/O)
  Thread 2:                  [ DMA to GPU 0 ] [ DMA to GPU 0 ] [ DMA to GPU 0 ]  (Async cudaMemcpy)
  Thread 3:                                   [ NVLink Bcast ] [ NVLink Bcast ]  (Peer-to-Peer Interconnect)
```

The pipelined loading engine operates through three synchronized stages:

1. **Sequential Contiguous Reads (Direct I/O):** Model weights are stored on disk in pre-sharded, contiguous binary formats aligned with GPU memory layouts. A dedicated host I/O thread pool reads file blocks sequentially using `O_DIRECT`, bypassing the Linux page cache and achieving the full sequential read speed of enterprise NVMe SSDs (up to 14 GB/s per drive).
2. **Double-Buffered Host-to-Device DMA:** While chunk $k$ is being read from disk into pinned host DRAM Buffer A, chunk $k-1$ in pinned host DRAM Buffer B is transferred into GPU High-Bandwidth Memory via asynchronous Direct Memory Access (DMA) over PCIe Gen5 lanes.
3. **NVLink Inter-GPU Broadcast:** For tensor-parallel weights, only one primary GPU ingests the weight tensor from the host CPU. It immediately broadcasts the tensor across the high-speed NVLink mesh (900 GB/s on H100) to its peer GPUs, completely bypassing slow CPU-to-GPU PCIe links for secondary workers.

Total cold-start loading time for a 72B parameter model collapses from **184 seconds down to 48 seconds**, representing a **$3.8\times$ speedup** that drastically improves autoscaling responsiveness and failover recovery.

---

### Production Telemetry and Empirical Benchmarks

RTP-LLM was benchmarked in production deployments at Alibaba against industry-standard serving engines: **vLLM (v0.6.x)**, **SGLang (v0.3.x)**, and **TensorRT-LLM**.

Testing was conducted across two enterprise GPU cluster configurations:
- **Cluster Alpha (Dense Models):** 8-GPU NVIDIA H100 SXM5 (80 GB HBM3, 3.35 TB/s memory bandwidth, NVLink 900 GB/s) serving Qwen-2.5-72B-Instruct.
- **Cluster Beta (MoE Models):** 16-GPU NVIDIA H100 SXM5 interconnected via 400 Gbps RoCEv2 serving DeepSeek-V3 (FP8 precision, 671B total parameters, 37B active parameters).

Workloads were generated using authentic traffic traces from Taobao Wenwen (e-commerce customer service queries with mixed short/long context distributions) and synthetic code-generation benchmarks (long context prefill with moderate output generation).

```
+----------------------------------------------------------------------------------------------------+
|                  TABLE 1: HIGH-CONCURRENCY SERVING BENCHMARK (QWEN-2.5-72B)                        |
+--------------------------+-----------------------+------------------------+------------------------+
| Serving Framework        | Throughput (tok/sec)  | P99 TTFT Latency (ms)  | P99 TBT Latency (ms)   |
+--------------------------+-----------------------+------------------------+------------------------+
| Baseline vLLM (v0.6.x)   | 1,420 tok/sec         | 3,840 ms               | 48.2 ms                |
| SGLang (v0.3.x)          | 1,890 tok/sec         | 2,410 ms               | 36.4 ms                |
| TensorRT-LLM             | 2,150 tok/sec         | 1,980 ms               | 32.1 ms                |
| RTP-LLM (Collocated)     | 2,280 tok/sec         | 1,750 ms               | 29.8 ms                |
| RTP-LLM (FlexLB P/D)     | 3,140 tok/sec (+66%!) | 620 ms (-74.3% Drop!)  | 24.2 ms (-33.5% Drop!) |
+--------------------------+-----------------------+------------------------+------------------------+
```

As shown in Table 1, standard collocated engines suffer severe queuing latency under high concurrency. Baseline vLLM achieves 1,420 tokens per second with a P99 Time-To-First-Token latency of 3,840 ms.

By activating FlexLB Prefill-Decode disaggregation, RTP-LLM lifts aggregate throughput to **3,140 tokens per second** (a **66.1% increase over SGLang** and **121% over vLLM**). P99 TTFT drops by **74.3% down to 620 ms**, while P99 Time-Between-Tokens improves to a responsive **24.2 ms**.

```
+----------------------------------------------------------------------------------------------------+
|                  TABLE 2: DEEPSEEK-V3 MOE SCALING EVALUATION (16x H100 SXM5)                       |
+--------------------------+-----------------------+------------------------+------------------------+
| Engine Configuration     | Expert Imbalance Skew | All-to-All Comm Stall  | Decoding Speed (tok/s) |
+--------------------------+-----------------------+------------------------+------------------------+
| Naive EP (No EPLB)       | 4.82x Max/Min Ratio   | 42.6% of Layer Latency | 840 tok/sec            |
| Static Expert Placement  | 2.91x Max/Min Ratio   | 28.4% of Layer Latency | 1,210 tok/sec          |
| RTP-LLM + EPLB + DeepEP  | 1.12x (Balanced!)     | 6.2% of Layer Latency  | 2,050 tok/sec (+144%!) |
+--------------------------+-----------------------+------------------------+------------------------+
```

Table 2 evaluates the impact of Expert Parallel Load Balancing (EPLB) and DeepEP communication kernels on DeepSeek-V3. Under naive Expert Parallelism, token distribution skew creates a $4.82\times$ workload gap between the hottest and coldest experts, causing all-to-all communication stalls to consume **42.6% of total layer execution time**.

With EPLB dynamic replication and DeepEP overlapping, the maximum-to-minimum workload ratio flattens to **1.12x**. Communication stalls collapse to just **6.2% of layer time**, and decoding throughput surges to **2,050 tokens per second** (a **$2.44\times$ speedup** over naive EP).

---

### Architectural Dilemmas and Infrastructure Rules of Thumb

Senior infrastructure engineers operating hyperscale serving clusters face non-obvious operational trade-offs when deploying RTP-LLM:

1. **FlexLB Prefix Balancing Factor ($\beta$) Tuning:** Setting $\beta$ too high ($\beta > 0.85$) forces FlexLB to route requests exclusively to nodes with partial KV cache matches, even if those nodes have deep request queues. This creates severe tail latency spikes during traffic bursts.
   * *Rule of Thumb:* Profile the average prompt sharing ratio across your application. For multi-turn conversational agents with heavy shared system prompts, set $\beta = 0.65$. For heterogeneous user search queries with low prefix commonality, drop $\beta$ to **0.30**, prioritizing queue drainage over cache reuse.

2. **EPLB Expert Replication Headroom:** Replicating hot MoE experts requires reserving GPU High-Bandwidth Memory that would otherwise be allocated to PagedAttention KV cache blocks.
   * *Rule of Thumb:* Cap total expert replication memory at **15% of free GPU HBM**. Replicate only the top $5\%$ most frequently routed experts. If memory pressure exceeds $85\%$, dynamically drop replicas in favor of KV cache space to prevent request evictions.

3. **CUDA Graph Bucket Granularity:** Allocating too many CUDA Graph batch buckets (e.g. 32 distinct graph captures) consumes significant device memory for static activation buffers and increases initialization time.
   * *Rule of Thumb:* Use exponential batch bucketing with a base of 2 (e.g. $B \in \{1, 2, 4, 8, 16, 32, 64\}$) paired with prompt padding. Cap maximum graph batch size at 64, deferring larger batches to non-graph streaming kernels.
:::

---

### Sources
- Primary Research Paper: [arXiv:2611.00967](https://arxiv.org/abs/2611.00967)
- Official GitHub Repository: [github.com/alibaba/rtp-llm](https://github.com/alibaba/rtp-llm)
- DeepSeek-V3 Architecture: [arxiv.org/abs/2412.19437](https://arxiv.org/abs/2412.19437)
- DeepEP Low-Latency Communication Kernels: [github.com/deepseek-ai/DeepEP](https://github.com/deepseek-ai/DeepEP)
- FlashAttention-3 Kernel Specification: [arxiv.org/abs/2407.08608](https://arxiv.org/abs/2407.08608)
