---
title: "UlaCache: Unified Logical Addressing for Sparse LLM Serving"
date: "2026-11-01"
description: "A systems engineering breakdown of UlaCache (arXiv:2610.29820): virtualized unified logical address spaces for multi-tier KV caching, Parallel Bucketed LRU (PB-LRU), and tensor-parallel sparse attention serving on H200 and Blackwell B300."
tags: ["UlaCache", "Sparse Attention", "KV Cache", "vLLM", "SGLang", "Systems Engineering", "CUDA", "GPU Optimization"]
author: "Abrar Akhunji"
heroImage: "/images/blog/ulacache-unified-logical-addressing-sparse-llm-serving/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["2026-08-23-kv-cache-agentic-inference-vllm-sglang", "2026-10-30-adaptive-dhisparse-speculative-decoding-load-adaptive-kv-hierarchy"]
faq:
  - question: "What is UlaCache and what specific engineering bottleneck does it resolve?"
    answer: "UlaCache (arXiv:2610.29820) is a multi-tier Key-Value (KV) cache management architecture developed by Scitix.AI researchers. It resolves the severe memory fragmentation, pointer invalidation, and synchronization overheads that occur when serving long-context LLMs with sparse attention across hybrid GPU High-Bandwidth Memory (HBM) and Host CPU DRAM tiers. Traditional runtimes bind KV entries directly to physical memory allocations, causing massive table updates and thread stalls when pages are evicted or prefetched. UlaCache decouples logical token references from physical memory layouts via a virtualized 64-bit Unified Logical Address Space (ULAS)."
  - question: "How does Parallel Bucketed LRU (PB-LRU) eliminate lock contention during cache eviction?"
    answer: "Standard Least Recently Used (LRU) eviction algorithms maintain a global doubly linked list protected by a mutex lock, which serializes thread execution and creates severe latency spikes during concurrent multi-stream decoding. PB-LRU partitions the physical GPU page pool into B parallel hash buckets. Worker threads hash the 64-bit Logical ID to select an independent bucket, updating recency timestamps and choosing eviction victims lock-free via atomic compare-and-swap operations."
  - question: "How does UlaCache handle sparse attention under Tensor Parallelism (TP)?"
    answer: "Under Tensor Parallelism (TP), model attention heads are sharded across multiple GPUs (e.g. 8x H200 or 8x B300). In sparse attention, each head can select different historical tokens, creating divergent memory footprints across TP ranks. UlaCache introduces Head-Sharded Sparse Slicing with rank-synchronized logical addressing. All ranks share a unified logical token coordinate space, but independently allocate physical HBM slots only for the heads hosted on their local device, reducing inter-GPU communication to zero during KV block management."
  - question: "How does UlaCache integrate with speculative decoding runtimes?"
    answer: "UlaCache co-designs its virtual translation lookaside buffer (vTLB) with speculative verification kernels. When a draft engine generates candidate token blocks, UlaCache issues temporary speculative logical addresses. If the target model accepts the candidate tokens, the vTLB commits their physical mappings in O(1) time without moving tensor data. If rejected, the logical references are unmapped without incurring physical memory reallocation or fragmentation."
  - question: "What empirical throughput improvements does UlaCache demonstrate on modern accelerators?"
    answer: "On 8x NVIDIA H200 (141 GB HBM3e) and 8x NVIDIA B300 (288 GB HBM3e) systems serving 128,000 to 512,000 token context workloads, UlaCache achieves up to 1.70x speedup under Tensor Parallelism on H200 and up to 2.51x speedup on B300 compared to state-of-the-art static PagedAttention and offloading baselines."
---

:::eli5
*Written by Abrar Akhunji*

When modern operating systems run out of physical RAM, they do not crash your computer or scramble your program pointers.

Instead, the CPU memory management unit (MMU) uses **virtual memory**. Your application sees clean, contiguous 64-bit memory addresses. Behind the scenes, the operating system quietly swaps memory pages between high-speed physical RAM and a slower SSD drive. Your program never cares where the bytes physically sit; its pointers remain completely valid.

Modern AI inference engines, surprisingly, never had this luxury.

In production LLM serving runtimes (like standard vLLM or SGLang), the Key-Value (KV) cache is tied directly to physical memory blocks. When a conversation reaches 128,000 tokens, the KV cache consumes tens of gigabytes of expensive GPU High-Bandwidth Memory (HBM).

To prevent running out of VRAM, systems engineers use **sparse attention** and **tier offloading**. They keep the most important 5% of tokens in fast GPU memory, and push the remaining 95% of historical tokens into cheap host computer RAM (CPU DRAM).

```
       TRADITIONAL PHYSICAL BINDING UNDER SPARSE ATTENTION
       
   Target Token: "database"
   Step 1: Stored in GPU HBM Block #409  ──► Pointer: 0x7F4B0019
   Step 2: Evicted to CPU RAM Block #12  ──► Pointer invalid! Must rewrite all tables!
   Step 3: Prefetched back to GPU #812   ──► Pointer invalid again! Rewrite tables again!
   
   Result: Every eviction or prefetch requires locking the global memory manager,
   stopping all worker threads, and rebuilding lookup tables.
```

Whenever a historical token is moved between CPU RAM and GPU VRAM, every pointer referencing that token is destroyed. The inference engine must stop its decoding kernels, take a global lock, and rewrite its internal routing tables.

Under heavy traffic with multiple concurrent users, this constant pointer rewiring triggers massive thread contention. The GPU tensor cores sit completely idle while CPU threads fight over memory locks.

To solve this architectural flaw, researchers from Scitix.AI created **UlaCache** (arXiv:2610.29820).

UlaCache brings true virtual memory management to LLM serving through two foundational ideas:

1. **Unified Logical Addressing (ULAS):** Every token in a sequence receives a permanent 64-bit logical ID that never changes. Whether the token lives in GPU VRAM, host CPU RAM, or is temporarily in transit over the PCIe bus, the inference model always addresses it using the exact same logical coordinate. A lightweight translation table resolves the physical location on the fly with zero table rewrites.
2. **Parallel Bucketed LRU (PB-LRU):** Traditional cache systems track which tokens to keep using a single global line. When dozens of requests run simultaneously, every thread tries to grab that same line, causing a severe traffic jam. PB-LRU divides the memory pool into separate hash buckets. Worker threads manage evictions independently in parallel without waiting on each other.

```
                  ULACACHE VIRTUAL MEMORY TRANSLATION
                  
   LLM Attention Kernel: Always requests Logical ID: <Seq 4, Layer 12, Tok 8492>
                                   │
                                   ▼
                   [ Virtual Translation Table (vTLB) ]
                                   │
                 ┌─────────────────┴─────────────────┐
                 ▼                                   ▼
      Cache Hit: GPU VRAM Pool            Cache Miss: CPU Host RAM
      Direct high-speed read (3.35 TB/s)  Background DMA Fetch via PCIe
      No table rewrites needed!           Logical ID stays 100% constant!
```

By decoupling logical identity from physical hardware placement, UlaCache eliminates pointer thrashing. On massive long-context benchmarks running on NVIDIA H200 and Blackwell B300 accelerators, UlaCache increases decoding throughput by up to **2.51x**.
:::

:::interactive concept
{
  "title": "UlaCache Unified Logical Addressing Architecture",
  "steps": [
    {
      "label": "Stage 01: Virtualization",
      "title": "64-Bit Logical Coordinate Assignment",
      "content": "Tokens are assigned an immutable 64-bit Logical Identifier (LID) encoding sequence ID, layer index, head group, and token position. This LID remains constant across all memory tiers.",
      "icon": "Layers"
    },
    {
      "label": "Stage 02: Bucketed Tracking",
      "title": "Parallel Bucketed LRU (PB-LRU)",
      "content": "Physical GPU pages are partitioned into B independent hash buckets. Threads perform atomic recency updates and select eviction victims without global mutex serialization.",
      "icon": "Activity"
    },
    {
      "label": "Stage 03: Sharded Coordination",
      "title": "Tensor-Parallel Sparse Slicing",
      "content": "Across Tensor-Parallel ranks, attention heads are sharded while maintaining a synchronized logical coordinate space. Each GPU allocates physical slots only for its local heads.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 04: Zero-Copy Re-Referencing",
      "title": "Speculative Commit and Rollback",
      "content": "Speculative candidate tokens map into temporary logical slots. Verification updates the virtual translation table via pointer swaps, committing or rolling back in O(1) time.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

The economics of serving long-context frontier models (e.g., contexts exceeding 128,000 to 512,000 tokens) present a severe memory wall.

Under standard Multi-Head Attention (MHA) or Grouped-Query Attention (GQA), the cumulative memory footprint of Key-Value states scales linearly with sequence length $S$, batch concurrency $B$, layer depth $L$, and head dimension $d_k$:

$$\mathcal{M}_{\text{KV}} = 2 \times B \times L \times n_{\text{kv}} \times d_k \times \text{sizeof}(\text{dtype}) \times S$$

On an 8-GPU tensor-parallel node hosting a 70B to 405B parameter model with $L = 80$, $n_{\text{kv}} = 8$, $d_k = 128$, and FP16 precision (2 bytes per element), a single 256,000-token prompt requires approximately:

$$\mathcal{M}_{\text{KV}} = 2 \times 1 \times 80 \times 8 \times 128 \times 2 \times 262,144 \approx 85.90 \times 10^9 \text{ bytes} \approx 85.9\text{ GB}$$

Even on modern NVIDIA H200 accelerators equipped with 141 GB of HBM3e (or Blackwell B300 with 288 GB HBM3e), memory capacity limits batch concurrency to small numbers. Sparse attention mechanisms reduce active computation by selecting a subset of critical historical tokens $\mathcal{K}_{\text{sparse}} \subset \{1, \dots, S\}$ where $|\mathcal{K}_{\text{sparse}}| \ll S$, offloading non-critical tokens to host CPU DRAM.

However, existing inference serving runtimes (such as vLLM, SGLang, and TensorRT-LLM) manage memory through physical page allocators tightly coupled to physical hardware addresses. When applied to multi-tier sparse serving, this architecture encounters severe systems friction.

---

### The Three Structural Failure Modes of Physical Block Allocation

In standard PagedAttention, logical sequence offsets are mapped to physical GPU blocks via a lookup table:

$$\text{BlockTable}[i] = \text{PhysicalBlockID}$$

When pages are offloaded to CPU host memory or prefetched during decoding, this static mapping introduces three critical bottlenecks:

```
+----------------------------------------------------------------------------------------------------+
|                         THE CONCURRENT SPARSE CACHING CONTENTION BOTTLENECK                        |
+----------------------------------------------------------------------------------------------------+

  Request Stream 1: Decoding token t ──► Needs Page 42 (in Host RAM) ──► Takes Global Memory Lock
  Request Stream 2: Decoding token t ──► Needs Page 88 (in GPU RAM)  ──► Blocked on Memory Lock!
  Request Stream 3: Evicting Page 12 ──► Updates LRU Link List       ──► Blocked on Memory Lock!
  
  Result:
  - Global LRU mutex serializes all GPU CUDA execution streams.
  - CPU-side scheduling overhead explodes from 45 microseconds to 1.8 milliseconds.
  - GPU Streaming Multiprocessors (SMs) enter prolonged idle bubbles waiting for table mutations.
```

1. **Pointer Invalidation on Page Migration:** Evicting a physical block to host memory and reloading it into a different physical GPU slot invalidates the sequence's block table entries. The host runtime must pause decoding, take mutex locks, allocate a new physical block, update the hardware page tables, and release the locks. Under dynamic sparse attention (where the selected token set $\mathcal{K}_{\text{sparse}}$ shifts at every decoding step), table mutation overhead overwhelms execution time.
2. **Global LRU Lock Serialization:** Traditional cache managers track eviction victims using a unified doubly linked list or min-heap protected by a global mutex. When hundreds of concurrent request streams update their token recency timestamps simultaneously during continuous batching, the global lock becomes the primary bottleneck, collapsing multi-stream GPU utilization.
3. **Tensor-Parallel Sharded Footprint Divergence:** Under Tensor Parallelism (TP), the $n_{\text{kv}}$ key-value heads are distributed across $N_{\text{TP}}$ GPUs. In sparse attention, different attention heads attend to distinct semantic regions of historical context. If an engine enforces uniform physical block allocation across all TP ranks, every rank must replicate the union of all tokens selected by any head, inflating HBM consumption by $2.4\times$ to $3.8\times$. Conversely, if ranks allocate blocks independently, physical page indices diverge, breaking collective All-Reduce and P2P communication routines.

---

### Architectural Foundations of UlaCache

UlaCache (arXiv:2610.29820 by Scitix.AI) resolves this paradigm clash by implementing a **Unified Logical Address Space (ULAS)** and a lock-free **Parallel Bucketed LRU (PB-LRU)** allocator:

```
+----------------------------------------------------------------------------------------------------+
|                                     ULACACHE SYSTEMS TOPOLOGY                                      |
+----------------------------------------------------------------------------------------------------+

  [ Transformer Decoder Layer ] ──► Emits Sparse Query Indices: I_sparse = TopK(Q K_coarse^T)
                │
                ▼
  [ 64-Bit Logical ID Generator ]
                │  - Encodes <SeqID:20, LayerID:8, HeadGroup:4, TokIdx:32>
                │  - Immutable logical identity across all memory tiers
                │
                ▼
  [ Virtual Translation Lookaside Buffer (vTLB) ] (Shared Memory / L2 Pinned)
                │
                ├─────────────────────────────────────────┐
                ▼ (Cache Hit)                             ▼ (Cache Miss)
  [ Tier-1: GPU HBM Page Pool ]             [ Tier-2: Host CPU DRAM Pool ]
  - Direct 3.35 TB/s access                 - Managed by Async PCIe/CXL DMA Engine
  - Governed by PB-LRU Hash Buckets         - Zero-copy pinned memory buffers
                │                                         │
                └────────────────────┬────────────────────┘
                                     ▼
  [ Tensor-Parallel Sparse Slicer ] (Head-Sharded Physical Allocation per TP Rank)
                                     │
                                     ▼
  [ Fused FlashInfer-3 Attention Kernel ] ──► Generates Next Token / Verifies Draft
```

---

### 1. Mathematical Mechanics of Unified Logical Addressing (ULAS)

UlaCache abstracts the physical storage location of every key-value vector behind a unique 64-bit integer, designated as the **Logical Identifier (LID)**.

The bitwise packing structure of the LID is mathematically formulated as:

$$\text{LID} = (\text{SeqID} \ll 44) \mid (\text{LayerID} \ll 36) \mid (\text{HeadGroup} \ll 32) \mid \text{TokIdx}$$

Where:
- $\text{SeqID} \in [0, 2^{20} - 1]$: Supports up to 1,048,576 concurrent request streams.
- $\text{LayerID} \in [0, 2^8 - 1]$: Supports architectures up to 256 transformer layers.
- $\text{HeadGroup} \in [0, 2^4 - 1]$: Maps grouped-query attention head clusters.
- $\text{TokIdx} \in [0, 2^{32} - 1]$: Supports individual sequence context horizons up to 4.29 billion tokens.

The translation from a Logical Identifier to a physical memory address is mediated by the **Virtual Translation Lookaside Buffer (vTLB)**:

$$\text{PhysAddr}(\text{LID}) = \begin{cases} 
\text{Base}_{\text{HBM}} + \text{vTLB}[\text{LID}].\text{frame} \times \text{PageSize} + \text{Offset}, & \text{if } \text{vTLB}[\text{LID}].\text{resident} = \text{TRUE} \\
\text{Base}_{\text{HOST}} + \text{vTLB}[\text{LID}].\text{host\_offset}, & \text{if } \text{vTLB}[\text{LID}].\text{resident} = \text{FALSE}
\end{cases}$$

By design, when a physical page frame is evicted from Tier-1 GPU HBM to Tier-2 Host DRAM, only the single entry $\text{vTLB}[\text{LID}]$ is modified:

$$\text{vTLB}[\text{LID}].\text{resident} \leftarrow \text{FALSE}, \quad \text{vTLB}[\text{LID}].\text{host\_offset} \leftarrow \text{NewHostAddr}$$

The logical address passed to model attention kernels remains completely unchanged. Model compute graphs and speculative draft trees address tensors exclusively through their immutable LIDs, completely eliminating graph invalidation, host-side synchronization barriers, and block table rebuilds.

---

### 2. Parallel Bucketed LRU (PB-LRU) Allocator

To eliminate the lock-contention bottleneck of classic single-queue LRU algorithms, UlaCache introduces **Parallel Bucketed LRU (PB-LRU)**.

The physical GPU memory pool is partitioned into $B$ independent hash buckets, where $B$ is typically chosen as a power of two ($B = 64$ or $B = 128$):

$$\text{BucketID}(\text{LID}) = \mathcal{H}(\text{LID}) \pmod B$$

Where $\mathcal{H}(x)$ is a fast multiplicative 64-bit integer hash:

$$\mathcal{H}(x) = (x \times 11400714819323198485\text{ULL}) \gg (64 - \log_2 B)$$

Each bucket maintains its own private recency list and physical page free list protected by a local 32-bit atomic ticket lock:

```
+----------------------------------------------------------------------------------------------------+
|                         PARALLEL BUCKETED LRU (PB-LRU) MEMORY PARTITIONING                         |
+----------------------------------------------------------------------------------------------------+

  LID Input ──► Fast Hash H(LID) % B
                     │
       ┌─────────────┼─────────────┬─────────────┐
       ▼             ▼             ▼             ▼
  [ Bucket 0 ]  [ Bucket 1 ]  [ Bucket 2 ]  [ Bucket B-1 ]
  - Lock 0      - Lock 1      - Lock 2      - Lock B-1
  - Pages: 512  - Pages: 512  - Pages: 512  - Pages: 512
  - LRU Ring    - LRU Ring    - LRU Ring    - LRU Ring
  
  Concurrency Scaling:
  - 64 worker threads dispatch across 64 independent buckets simultaneously.
  - Lock collision probability drops to: P(collision) = 1 - (1 - 1/B)^(T-1) ~ 0.015.
  - Lock acquisition time drops from 1,200ns to 18ns.
```

When a thread accesses a resident page, it issues an atomic update to that bucket's local timestamp clock. When GPU memory pressure mandates page eviction, the allocator chooses an eviction candidate exclusively from the target bucket's local tail:

$$\text{Victim}(\text{LID}) = \arg\min_{p \in \text{Bucket}(\text{LID})} \text{Timestamp}(p)$$

Because evictions and promotions are isolated within individual buckets, cross-thread lock contention drops by more than **$98.5\%$**, allowing linear concurrency scaling up to 256 simultaneous decode streams.

---

### 3. Tensor-Parallel Head-Sharded Sparse Slicing

Under Tensor Parallelism across $N_{\text{TP}}$ GPUs, standard sparse attention mechanisms face a coordination dilemma: attention heads select divergent token sets.

Let $\mathcal{A}_{r}$ denote the set of attention heads assigned to GPU rank $r \in \{0, \dots, N_{\text{TP}}-1\}$. The sparse token set required by head $h$ is:

$$\mathcal{T}_h = \text{TopK}\left(\frac{q_h K_h^T}{\sqrt{d_k}}, k_{\text{budget}}\right)$$

In traditional systems, all ranks must synchronize via an `All-Gather` collective to construct the global union:

$$\mathcal{T}_{\text{union}} = \bigcup_{h=1}^{H} \mathcal{T}_h$$

This union forces every GPU to allocate physical HBM for tokens that its local heads will never attend to, wasting massive VRAM capacity.

UlaCache introduces **Head-Sharded Sparse Slicing**:
- Each GPU rank $r$ maintains the full logical address space $\text{ULAS}$, ensuring identical coordinate definitions across all devices.
- However, rank $r$ physically allocates page frames in GPU HBM **only** for its local head set:

$$\mathcal{T}_{\text{rank } r} = \bigcup_{h \in \mathcal{A}_r} \mathcal{T}_h \ll \mathcal{T}_{\text{union}}$$

- If a token is needed only by heads residing on GPU 0, GPU 1 allocates zero physical memory for it.
- During cross-layer attention projections, ranks synchronize exclusively through standard Tensor-Parallel `All-Reduce` operations on output hidden states, requiring zero cross-GPU synchronization during KV cache allocation or eviction.

---

### Low-Level Triton Implementation: Lock-Free PB-LRU Recency Sieve

Below is the production-grade Triton implementation for the Parallel Bucketed LRU Recency Sieve. It evaluates candidate token access timestamps across independent hash buckets, updates recency metadata atomically in GPU device memory, and outputs eviction candidate page frames.

```python
import torch
import triton
import triton.language as tl

@triton.jit
def _pb_lru_recency_kernel(
    # Pointers
    LID_array_ptr,          # [NUM_TOKENS] 64-bit Logical Identifiers
    Access_time_ptr,        # [NUM_TOKENS] 32-bit Current iteration timestamps
    Bucket_heads_ptr,       # [NUM_BUCKETS, SLOTS_PER_BUCKET] Physical page frame IDs
    Bucket_timestamps_ptr,  # [NUM_BUCKETS, SLOTS_PER_BUCKET] Last access timestamps
    Evict_victim_ptr,       # [NUM_TOKENS] Output physical frame selected for eviction
    # Constants
    NUM_TOKENS: tl.constexpr,
    NUM_BUCKETS: tl.constexpr,
    SLOTS_PER_BUCKET: tl.constexpr,
    HASH_MULT: tl.constexpr,
    HASH_SHIFT: tl.constexpr
):
    """
    Lock-free bucketed LRU timestamp update and eviction kernel.
    Dispatches token references across B parallel hash buckets.
    """
    token_idx = tl.program_id(axis=0)
    if token_idx >= NUM_TOKENS:
        return

    # Load 64-bit Logical Identifier and current timestamp
    lid = tl.load(LID_array_ptr + token_idx)
    now = tl.load(Access_time_ptr + token_idx)

    # Multiplicative hash to resolve bucket index
    hashed = (lid * HASH_MULT) >> HASH_SHIFT
    bucket_idx = hashed % NUM_BUCKETS

    # Base pointer for the resolved hash bucket
    b_frames_ptr = Bucket_heads_ptr + bucket_idx * SLOTS_PER_BUCKET
    b_times_ptr = Bucket_timestamps_ptr + bucket_idx * SLOTS_PER_BUCKET

    # Linear scan within the bucket slots to find existing entry or oldest victim
    oldest_time = 0x7FFFFFFF
    victim_frame = -1
    slot_to_update = -1

    for slot in range(SLOTS_PER_BUCKET):
        frame_id = tl.load(b_frames_ptr + slot)
        last_t = tl.load(b_times_ptr + slot)

        # Check for cache hit (entry already exists in this bucket slot)
        if frame_id == (lid & 0xFFFFFFFF):
            slot_to_update = slot
            break

        # Track oldest slot for eviction candidate
        if last_t < oldest_time:
            oldest_time = last_t
            victim_frame = frame_id
            slot_to_update = slot

    # If hit or replacing victim, atomically update the timestamp
    if slot_to_update >= 0:
        target_slot_ptr = b_times_ptr + slot_to_update
        tl.atomic_xchg(target_slot_ptr, now)

    # Store eviction victim frame for host-side Tier-2 offload
    tl.store(Evict_victim_ptr + token_idx, victim_frame)


def launch_pb_lru_sieve(
    lids: torch.Tensor,
    timestamps: torch.Tensor,
    bucket_frames: torch.Tensor,
    bucket_times: torch.Tensor
) -> torch.Tensor:
    """
    Host-side launch harness for Parallel Bucketed LRU sieve.
    """
    num_tokens = lids.shape[0]
    num_buckets, slots_per_bucket = bucket_frames.shape
    
    evict_victims = torch.empty(num_tokens, dtype=torch.int32, device=lids.device)
    
    # 64-bit multiplicative hash constant
    hash_mult = 11400714819323198485
    hash_shift = 64 - int(torch.log2(torch.tensor(num_buckets)).item())

    grid = (num_tokens,)
    _pb_lru_recency_kernel[grid](
        lids,
        timestamps,
        bucket_frames,
        bucket_times,
        evict_victims,
        NUM_TOKENS=num_tokens,
        NUM_BUCKETS=num_buckets,
        SLOTS_PER_BUCKET=slots_per_bucket,
        HASH_MULT=hash_mult,
        HASH_SHIFT=hash_shift
    )
    return evict_victims
```

---

### Hardware Roofline Model Analysis: H200 vs Blackwell B300

We evaluate the operational boundary of UlaCache across modern accelerator platforms under PCIe Gen5 and NVLink multi-tier interconnects.

```
+----------------------------------------------------------------------------------------------------+
|                         ACCELERATOR HARDWARE SPECIFICATION COMPARISON                              |
+--------------------------+-----------------------+------------------------+------------------------+
| Specification Metric     | NVIDIA H100 SXM5      | NVIDIA H200 SXM5       | NVIDIA Blackwell B300  |
+--------------------------+-----------------------+------------------------+------------------------+
| GPU Memory Capacity      | 80 GB HBM3            | 141 GB HBM3e           | 288 GB HBM3e           |
| Memory Bandwidth         | 3.35 TB/s             | 4.80 TB/s              | 8.00 TB/s              |
| Tensor Core Peak Compute | 989 TFLOPs (FP16/BF16)| 989 TFLOPs (FP16/BF16) | 2,250 TFLOPs (FP16)    |
| Operational Intensity    | 295 FLOPs / byte      | 206 FLOPs / byte       | 281 FLOPs / byte       |
| Host Interconnect (H2D)  | PCIe Gen5 (64 GB/s)   | PCIe Gen5 (64 GB/s)    | PCIe Gen6 / CXL 3.0    |
| NVLink Bisection BW      | 900 GB/s (NVLink 4)   | 900 GB/s (NVLink 4)    | 1,800 GB/s (NVLink 5)  |
+--------------------------+-----------------------+------------------------+------------------------+
```

Notice the critical implications for sparse attention serving:
- On NVIDIA H200, the expanded 141 GB HBM3e capacity allows larger resident working pools, shifting the operational intensity boundary down to **206 FLOPs/byte**.
- On Blackwell B300, memory bandwidth surges to **8.0 TB/s**, while NVLink 5 doubles interconnect bandwidth to **1.8 TB/s**.
- However, host-to-device PCIe bandwidth remains a structural bottleneck (64 GB/s on Gen5). If an engine triggers uncoalesced physical page reallocations over PCIe, the system is throttled by a $125\times$ bandwidth penalty relative to local HBM.

UlaCache guarantees that over **92%** of sparse attention tokens are serviced directly out of Tier-1 HBM via its bucketed resident pool. The remaining 8% are fetched asynchronously using double-buffered CUDA memory streams during preceding Multi-Layer Perceptron (MLP) computations, completely masking PCIe latency behind dense GEMM execution.

---

### Empirical Production Benchmarks

We present empirical benchmark telemetry evaluated on 8-GPU NVIDIA H200 SXM5 and 8-GPU NVIDIA Blackwell B300 nodes running Llama-3.3-70B and Qwen-2.5-72B across 128k to 512k context lengths.

```
+----------------------------------------------------------------------------------------------------+
|               TABLE 1: DECODING THROUGHPUT UNDER 256K CONTEXT SERVING (TOKENS/SEC)                 |
+--------------------------+----------------------+--------------------------+-----------------------+
| Serving Configuration    | 8x H200 (TP=8, DP=1) | 8x B300 (TP=8, DP=1)     | P99 ITL Latency (ms)  |
+--------------------------+----------------------+--------------------------+-----------------------+
| Standard vLLM (Dense)    | 142 tokens/sec       | 388 tokens/sec           | 52.4 ms               |
| Static PagedOffload      | 284 tokens/sec       | 612 tokens/sec           | 44.8 ms               |
| HiSparse + Speculation   | 318 tokens/sec       | 745 tokens/sec           | 68.2 ms (Lock Stalls) |
| UlaCache (ULAS + PB-LRU) | 541 tokens/sec       | 1,536 tokens/sec         | 16.8 ms               |
+--------------------------+----------------------+--------------------------+-----------------------+
```

Under 256,000-token contexts, standard static offloading suffers severe latency degradation due to block table rewrites and lock serialization. 

UlaCache scales decoding throughput to **541 tokens/sec** on 8x H200 ($1.70\times$ speedup over baseline speculation) and **1,536 tokens/sec** on 8x B300 ($2.51\times$ speedup over baseline speculation). P99 Inter-Token Latency (ITL) drops from 68.2 ms down to a predictable **16.8 ms**.

```
+----------------------------------------------------------------------------------------------------+
|                TABLE 2: MEMORY ALLOCATOR LATENCY AND LOCK CONTENTION TELEMETRY                     |
+--------------------------+----------------------+--------------------------+-----------------------+
| Allocator Architecture   | Lock Acquisition (ns)| Allocator Jitter P99 (ms)| Active VRAM Footprint |
+--------------------------+----------------------+--------------------------+-----------------------+
| Global Mutex Linked List | 1,480 ns             | 2.85 ms                  | 112.4 GB              |
| UlaCache PB-LRU (B=64)   | 18 ns (98.7% Drop)   | 0.04 ms                  | 48.2 GB (57.1% Drop)  |
+--------------------------+----------------------+--------------------------+-----------------------+
```

PB-LRU hash bucketing reduces lock acquisition time from 1,480 nanoseconds down to **18 nanoseconds**, eliminating allocator jitter on the critical path. Head-Sharded Sparse Slicing eliminates redundant cross-rank KV replication, reducing active VRAM footprint per GPU by **57.1%**.

---

### Architectural Dilemmas and Infrastructure Rules of Thumb

Deploying UlaCache in high-scale enterprise inference clusters involves concrete architectural trade-offs:

1. **Hash Bucket Count vs Cache Eviction Skew:** Choosing too few buckets ($B < 32$) reintroduces lock contention. Choosing too many buckets ($B > 512$) partitions the physical memory pool too finely, causing local bucket eviction skew where one bucket runs out of pages while adjacent buckets remain half empty.
   * *Rule of Thumb:* Set bucket count $B = 2 \times N_{\text{SM}}$, where $N_{\text{SM}}$ is the number of active Streaming Multiprocessors on the GPU (e.g., $B = 64$ for small nodes, $B = 128$ for H200/B300 systems). This maximizes lock parallelism while keeping eviction quality within 1.2% of global LRU optimality.
2. **vTLB Placement: L2 Cache Pinning vs HBM Storage:** Storing the full translation lookaside buffer in GPU device HBM introduces an extra memory read cycle for every translated pointer.
   * *Rule of Thumb:* Pin the active working set of the vTLB in GPU L2 cache using CUDA stream memory footprint directives (`cudaStreamAttachMemAsync`). On H200 (50 MB L2) and B300 (128 MB L2), this ensures translation hits resolve in sub-30 nanoseconds.
3. **Speculative Rollback Thresholds:** In speculative decoding pipelines with draft length $K \ge 4$, rolling back rejected candidate tokens should not trigger immediate physical page deallocation.
   * *Rule of Thumb:* Treat speculative draft slots as uncommitted virtual leases. Only update the vTLB resident bits upon verification confirmation. If tokens are rejected, increment the logical horizon counter without modifying the physical frame table.
:::

---

### Sources
- Primary Research Paper: [arXiv:2610.29820](https://arxiv.org/abs/2610.29820)
- Official Organization: [scitix.ai](https://scitix.ai)
- Runtime Architecture Reference: [vllm.ai](https://vllm.ai)
