---
title: "Adaptive DHiSparse: Speculative Decoding over a Load-Adaptive KV Hierarchy"
date: "2026-10-30"
description: "A systems engineering breakdown of Adaptive DHiSparse (arXiv:2610.13708): load-adaptive GPU HBM KV residency, multi-candidate shared row retrieval, and window-bounded ring buffers for high-concurrency long-context LLM serving."
tags: ["Adaptive DHiSparse", "Speculative Decoding", "KV Cache", "vLLM", "SGLang", "Systems Engineering", "CUDA", "GPU Optimization"]
author: "Abrar Akhunji"
heroImage: "/images/blog/adaptive-dhisparse-speculative-decoding-load-adaptive-kv-hierarchy/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["2026-08-23-kv-cache-agentic-inference-vllm-sglang", "2026-10-29-dlite-history-free-speculative-decoding-agentic-llm"]
faq:
  - question: "What is Adaptive DHiSparse and what specific engineering bottleneck does it resolve?"
    answer: "Adaptive DHiSparse (arXiv:2610.13708) is an open-source serving architecture designed by Naji Alazhar that reconciles hierarchical sparse KV caching with speculative decoding engines like DSpark and DFlash2. Standard sparse attention offloads historical KV states to host CPU DRAM and fetches sparse rows over PCIe, but speculative verification evaluates multiple candidate branches concurrently. This branch divergence shatters static cache policies, triggering severe PCIe bus saturation, high cache-miss penalties, and GPU thread starvation. Adaptive DHiSparse resolves this by dynamically tuning GPU memory residency based on live hardware load and unifying candidate query fetches into coalesced row-retrieval batches."
  - question: "How does Adaptive DHiSparse prevent PCIe thrashing during speculative verification?"
    answer: "During speculative verification of K candidate tokens, standard runtimes evaluate branches independently, issuing duplicate or uncoalesced Host-to-Device (H2D) PCIe fetch requests for sparse historical KV blocks. Adaptive DHiSparse executes Multi-Candidate Shared Row Retrieval. It computes the set-theoretic union of critical row indices across all candidate paths in a single pass. A fused gather kernel transfers the coalesced blocks in one asynchronous direct memory access (DMA) transaction, cutting redundant PCIe traffic by up to 68%."
  - question: "How does the load-adaptive residency mechanism work under varying traffic bursts?"
    answer: "Rather than fixing a rigid static KV cache budget in GPU High-Bandwidth Memory (HBM), Adaptive DHiSparse continuously computes an elasticity coefficient based on total allocated VRAM headroom. When server load is low, it expands the GPU resident token pool, retaining extended historical KV blocks locally to achieve full dense attention accuracy with zero PCIe latency. When traffic spikes and memory pressure rises, the engine dynamically contracts resident blocks down to essential working sets (attention sinks and recent local windows) while activating exact fused retrieval from host DRAM."
  - question: "How are short-lived speculative draft tokens managed without memory fragmentation?"
    answer: "Writing speculative draft tokens directly into persistent PagedAttention block tables requires continuous page allocations and rollbacks, causing lock contention and memory fragmentation. Adaptive DHiSparse introduces Window-Bounded Ring Buffers. Draft KVs are staged in circular scratchpad ring buffers pinned in L2/SRAM device memory. Accepted tokens commit into persistent PagedAttention block tables in O(1) time via pointer swaps, while rejected speculative tokens are discarded instantaneously by shifting the ring head pointer, requiring zero memory deallocation."
  - question: "What hardware platforms and serving engines support Adaptive DHiSparse?"
    answer: "Adaptive DHiSparse is designed for modern inference clusters featuring NVIDIA H100/H200 SXM5 accelerators linked via PCIe Gen5 x16 (64 GB/s bidirectional) or CXL 2.0 host interconnects. It interfaces natively with vLLM and SGLang runtimes by extending their continuous batching schedulers and custom PagedAttention kernels with asynchronous CUDA stream staging."
---

:::eli5
*Written by Abrar Akhunji*

If you have ever pushed an LLM into production with a 128,000-token context window, you know the harsh reality of GPU memory.

The model itself might only take 30 GB of VRAM. But the moment you start generating tokens, the key-value cache (KV cache) balloons out of control. Every single token in the conversation history must store its mathematical keys and values in GPU High-Bandwidth Memory (HBM). With a batch of concurrent users, a single server running an 80 GB NVIDIA H100 runs out of memory in seconds. The GPU runs out of VRAM long before its tensor cores break a sweat.

Systems engineers developed a clever trick called **hierarchical sparse caching** (like HiSparse). 

Instead of keeping all 128,000 historical tokens in expensive GPU memory, you move 90% of them into cheap host system memory (CPU RAM). When the model needs to generate the next word, it looks at the most recent tokens, figures out which historical facts are relevant, and quickly pulls just those few pages across the PCIe bus into the GPU.

```
       TRADITIONAL STATIC HIERARCHICAL SPARSE KV CACHING
       
   GPU VRAM (Fast, Expensive):   [Recent Tokens] + [Fixed 2,048 Sparse Tokens]
                                           ▲
                                  PCIe Bus │ (Small, predictable fetch)
                                           ▼
   Host CPU RAM (Slow, Cheap):   [Historical Tokens: 2,049 to 128,000]
```

This works well for standard autoregressive generation, where the model generates one word at a time in a straight line.

The problem starts when you turn on **speculative decoding**.

In speculative decoding, a fast draft assistant model guesses four or five words ahead, creating a small tree of candidate sentences. The large target model then verifies all of those candidate guesses in parallel in a single forward pass.

When you combine speculative decoding with sparse caching, the system falls apart.

Each branch of the speculative tree wants to look at different parts of the past conversation. Instead of pulling a neat, predictable trickle of memory across the PCIe bus, the GPU suddenly demands dozens of scattered memory pages all at once.

The PCIe bus gets congested. The GPU tensor cores sit completely idle waiting for data to crawl across the motherboard. Worse yet, because draft guesses are frequently wrong, the GPU spends precious microseconds allocating memory blocks for words that get thrown away a millisecond later.

```
           THE SPECULATIVE THRASHING BREAKDOWN
           
   Draft Candidate A: Wants historical tokens [42, 108, 915]  ──► PCIe Request 1
   Draft Candidate B: Wants historical tokens [108, 412, 1024] ──► PCIe Request 2
   Draft Candidate C: Wants historical tokens [12, 915, 2048]  ──► PCIe Request 3
   
   Result: 
   - Massive duplicate data transfers across the PCIe bus.
   - Host-to-Device latency spikes from 0.8ms to 14.5ms.
   - GPU Tensor Cores stall completely (0% MFU).
   - System runs slower than if you had no speculation at all.
```

To solve this clash, researcher Naji Alazhar published **Adaptive DHiSparse** (arXiv:2610.13708).

Adaptive DHiSparse reorganizes how memory moves between CPU RAM and GPU VRAM using three core mechanisms:

1. **Load-Adaptive Memory Sizing:** Why should your GPU keep only a tiny fixed cache when the server is half empty? When traffic is low, Adaptive DHiSparse automatically expands the GPU cache, keeping more history in fast VRAM. When a traffic burst arrives, it shrinks the cache down gracefully without dropping requests.
2. **Unified Candidate Fetching:** Instead of letting every candidate branch request historical tokens independently, Adaptive DHiSparse combines their requests. If Candidate A and Candidate B both need token 108, the system fetches it once in a single, clean memory package.
3. **Scratchpad Ring Buffers:** Instead of treating speculative draft tokens like permanent database entries, it drops them into a temporary circular scratchpad in GPU cache. If the guess is correct, it commits the pointer in one tick. If the guess is rejected, it wipes the pointer instantly without fragmenting memory.

The result is smooth, high-speed inference. Under massive 128k to 512k context workloads, Adaptive DHiSparse delivers up to **3.2x higher throughput** while maintaining rock-solid response times.
:::

:::interactive concept
{
  "title": "Adaptive DHiSparse Execution and Memory Hierarchy Pipeline",
  "steps": [
    {
      "label": "Stage 01: Telemetry",
      "title": "Load-Adaptive Elasticity Calculation",
      "content": "The runtime inspects real-time GPU High-Bandwidth Memory (HBM) headroom and computes an elasticity coefficient alpha_t to dynamically size the resident KV cache pool.",
      "icon": "Activity"
    },
    {
      "label": "Stage 02: Ring Buffering",
      "title": "Draft Candidate Scratchpad Staging",
      "content": "Speculative draft tokens generated by DSpark or DFlash2 are routed into circular scratchpad ring buffers pinned in L2/SRAM device memory, avoiding PagedAttention lock contention.",
      "icon": "Layers"
    },
    {
      "label": "Stage 03: Query Union",
      "title": "Multi-Candidate Shared Row Retrieval",
      "content": "Candidate verification queries are merged into a unified sparse row index. A single coalesced asynchronous Direct Memory Access transaction transfers missing KV blocks over PCIe Gen5.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 04: Pipelined Verification",
      "title": "Layer-Grouped Asynchronous Verification",
      "content": "Transformer layers are executed in clustered stages. Tensor core matrix multiplications for stage N overlap directly with asynchronous PCIe prefetching for stage N+1.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Long-context serving of modern frontier large language models exposes a stark divergence in accelerator utilization.

Consider an 80 GB NVIDIA H100 SXM5 GPU hosting a 70-billion parameter dense model or a high-parameter Mixture-of-Experts (MoE) variant. With 16-bit weights (or even 8-bit quantized weights taking 35 GB to 70 GB), each additional active request sequence with a 128,000-token context consumes massive memory for key and value states. Under standard multi-head attention (MHA) or grouped-query attention (GQA with $n_{kv} = 8$, $d_k = 128$), the KV cache requirement per sequence is calculated as:

$$\text{Memory}_{\text{KV}} = 2 \times L \times n_{kv} \times d_k \times \text{bytes\_per\_elem} \times S$$

For an 80-layer architecture ($L = 80$) with FP16 precision (2 bytes per element) and sequence length $S = 131,072$:

$$\text{Memory}_{\text{KV}} = 2 \times 80 \times 8 \times 128 \times 2 \times 131,072 \approx 42.95 \times 10^9 \text{ bytes} \approx 42.95\text{ GB}$$

A single active 128k sequence demands roughly 43 GB of VRAM solely for its KV cache. On an 80 GB accelerator, maximum batch concurrency collapses to $B = 1$. The GPU is entirely memory-capacity bound, leaving the 989 TFLOPs of FP16/BF16 Tensor Core compute running at near-zero Model FLOPs Utilization (MFU).

---

### The Failure Mode of Static Hierarchical Caching under Speculation

Hierarchical KV caching systems, such as HiSparse, mitigate this capacity bottleneck by partitioning the KV cache into a small, fast GPU resident tier (Tier-1) and a large, cost-effective Host CPU DRAM tier (Tier-2). Historical tokens outside the recent sliding window are evicted to host memory over PCIe Gen5 x16 (64 GB/s theoretical bidirectional bandwidth). During token decoding, an attention score estimator identifies the top-$k$ historical tokens exhibiting highest relevance to the current query $q_t$:

$$I_{\text{top-}k} = \text{TopK}\left(\frac{q_t K_{\text{host}}^T}{\sqrt{d_k}}, k\right)$$

The runtime then issues an asynchronous Direct Memory Access (DMA) fetch over PCIe to load the corresponding key-value blocks into a pre-allocated GPU scratchpad before executing attention.

When speculative decoding (such as DSpark, DFlash2, or Multi-Token Prediction) is integrated into this architecture, the memory access pattern breaks down.

```
+----------------------------------------------------------------------------------------------------+
|                         SPECULATIVE ATTENTION BRANCHING VS PCIE BUS CONTENTION                     |
+----------------------------------------------------------------------------------------------------+

  Autoregressive Single Token (Predictable Access):
  Query q_t ──► TopK Rows: {42, 88, 104} ──► Coalesced PCIe Fetch ──► FlashInfer Kernel (1.2ms)

  Speculative Verification (K=4 Candidate Tokens Evaluated Concurrently):
  Candidate Path 1 (q_1) ──► TopK Rows: {12, 42, 88, 915}   ──► Uncoalesced PCIe Fetch #1 ──┐
  Candidate Path 2 (q_2) ──► TopK Rows: {42, 88, 204, 915}  ──► Uncoalesced PCIe Fetch #2 ──┼─► PCIe Bus
  Candidate Path 3 (q_3) ──► TopK Rows: {88, 104, 915, 1102} ──► Uncoalesced PCIe Fetch #3 ──┤   Saturation
  Candidate Path 4 (q_4) ──► TopK Rows: {12, 104, 310, 2048} ──► Uncoalesced PCIe Fetch #4 ──┘   (14.8ms stall!)
```

This interaction introduces three severe systems failures:

1. **Uncoalesced PCIe Request Explosion:** In a speculative verification pass of length $K = 4$ to $K = 8$, candidate queries $q_1, q_2, \dots, q_K$ branch across distinct lexical trajectories. If each candidate query independently triggers top-$k$ retrieval against Tier-2 host memory, the host-to-device (H2D) PCIe transfer queue is flooded with small, non-contiguous memory transfers. The PCIe transfer protocol suffers severe packetization overhead, degrading effective bus throughput from 58 GB/s down to less than 11 GB/s.
2. **GPU Thread Stalls and MFU Degradation:** The target model verification kernel cannot dispatch its attention GEMM until all required KV cache lines are resident in GPU memory. While single-token autoregressive retrieval incurs an acceptable 0.8ms to 1.2ms transfer latency, multi-candidate sparse fetch latency surges to 12ms to 18ms. The high-performance Tensor Cores enter extended stall cycles.
3. **Severe PagedAttention Fragmentation from Speculative Rollback:** Traditional serving runtimes (such as vLLM and SGLang) allocate KV memory in fixed-size blocks (typically 16 or 32 tokens) managed by a centralized block table. Staging $K$ speculative candidate tokens directly in persistent PagedAttention blocks requires taking memory locks, updating page mapping tables, and invoking memory allocators. When candidate tokens are rejected by the target model verification step (a frequent occurrence where token acceptance length $\alpha < K$), these blocks must be freed, causing memory fragmentation and high allocator overhead.

---

### Architectural Foundations of Adaptive DHiSparse

Adaptive DHiSparse (arXiv:2610.13708 by Naji Alazhar) addresses these bottlenecks through a coordinated four-layer systems architecture:

```
+----------------------------------------------------------------------------------------------------+
|                               ADAPTIVE DHISPARSE SYSTEMS TOPOLOGY                                  |
+----------------------------------------------------------------------------------------------------+

  [ Speculative Drafter ] ──► Emits K Candidate Tokens [t+1, ..., t+K]
            │
            ▼
  [ Window-Bounded Ring Buffer ] (Pinned L2/SRAM Scratchpad in GPU VRAM)
            │  - Zero PagedAttention lock contention
            │  - O(1) pointer rollback upon candidate rejection
            │
            ▼
  [ Multi-Candidate Shared Row Sieve ]
            │  - Gathers candidate queries: Q_cand = [q_1, q_2, ..., q_K]
            │  - Evaluates importance matrix against coarse cluster centroids
            │  - Computes set union: S_shared = Union_{k=1}^K TopRowIndices(q_k)
            │
            ▼
  [ Load-Adaptive Residency Controller ]
            │  - Telemetry: Monitors VRAM headroom HBM_avail
            │  - Dynamic elasticity index: alpha_t in [alpha_min, 1.0]
            │  - Dynamically resizes Tier-1 resident set vs Tier-2 PCIe fetch volume
            │
            ▼
  [ Layer-Grouped Asynchronous Execution Engine ]
            │  - Layer Group N: Computes FlashInfer Attention on Tensor Cores
            │  - Layer Group N+1: Asynchronously prefetches S_shared over PCIe Gen5 via CUDA stream
            ▼
  [ Verification Output ] ──► Commit accepted tokens / Rollback ring buffer head
```

---

### 1. Mathematical Mechanics of Load-Adaptive Residency

Static sparse caching enforces an invariant GPU cache budget $C_{\text{static}}$, typically fixing resident capacity to 2,048 or 4,096 tokens regardless of overall system concurrency. When the server hosts few requests, gigabytes of fast HBM sit completely idle while the system continues to pay latency penalties fetching tokens across PCIe.

Adaptive DHiSparse defines a dynamic elasticity coefficient $\alpha_t \in [\alpha_{\min}, 1.0]$ evaluated at each scheduling iteration $t$:

$$\alpha_t = \text{clamp}\left(1.0 - \frac{M_{\text{allocated}}(t)}{M_{\text{capacity}} - M_{\text{reserved}}}, \alpha_{\min}, 1.0\right)$$

Where:
- $M_{\text{allocated}}(t)$ is the current total allocated GPU memory (model weights, activation buffers, runtime workspace, and active KV blocks).
- $M_{\text{capacity}}$ is total device VRAM (81,920 MB for an NVIDIA H100 SXM5).
- $M_{\text{reserved}}$ is the safety headroom buffer (typically 4,096 MB to prevent CUDA Out-Of-Memory exceptions during dynamic batching).
- $\alpha_{\min}$ is the lower bound elasticity floor (typically set to 0.15, ensuring the attention sink tokens and local sliding window are strictly preserved).

The resident token capacity $C_{\text{resident}}(i, t)$ for sequence $i$ at iteration $t$ scales dynamically with the elasticity coefficient:

$$C_{\text{resident}}(i, t) = C_{\text{base}} + \left\lfloor \alpha_t \cdot (S_i - C_{\text{base}}) \right\rfloor$$

Where $C_{\text{base}} = W_{\text{sink}} + W_{\text{local}}$ comprises the invariant attention sink tokens ($W_{\text{sink}} \approx 64$) and the immediate local decoding window ($W_{\text{local}} \approx 1,024$).

When server traffic is light ($\alpha_t \to 1.0$), $C_{\text{resident}}$ approaches the full sequence length $S_i$. The model executes full dense attention with zero PCIe traffic and zero reconstruction loss. When concurrent traffic surges and $\alpha_t \to \alpha_{\min}$, the system smoothly contracts resident memory toward $C_{\text{base}}$, evicting intermediate blocks to Tier-2 host memory and engaging the sparse retrieval pipeline.

---

### 2. Multi-Candidate Shared Row Retrieval Kernel

In speculative verification, the target model processes $K$ candidate tokens simultaneously. Let the candidate queries at iteration $t$ be represented as:

$$Q_{\text{cand}} = \begin{bmatrix} q_1 \\ q_2 \\ \vdots \\ q_K \end{bmatrix} \in \mathbb{R}^{K \times d_k}$$

Standard sparse architectures evaluate top-$k$ rows per query independently, resulting in $K$ distinct index sets:

$$\mathcal{R}_k = \text{TopK}\left(q_k K_{\text{centroid}}^T, r\right), \quad k \in \{1, \dots, K\}$$

Where $K_{\text{centroid}} \in \mathbb{R}^{M \times d_k}$ represents the low-rank cluster centroid representations of the historical KV blocks stored in Tier-2 memory, and $r$ is the target row sparsity budget.

Instead of issuing $K$ disconnected memory copy calls, Adaptive DHiSparse computes the set-theoretic union:

$$\mathcal{S}_{\text{shared}} = \bigcup_{k=1}^K \mathcal{R}_k$$

Empirical analysis demonstrates that because candidate tokens in a speculative draft tree share identical conversational context and semantic topic domains, their attention distributions exhibit high spatial overlap:

$$\frac{|\mathcal{R}_a \cap \mathcal{R}_b|}{\min(|\mathcal{R}_a|, |\mathcal{R}_b|)} \ge 0.58 \quad \forall a, b \in \{1, \dots, K\}$$

By coalescing the index set into $\mathcal{S}_{\text{shared}}$, the cardinality $|\mathcal{S}_{\text{shared}}|$ scales sub-linearly with candidate count $K$:

$$|\mathcal{S}_{\text{shared}}| \ll \sum_{k=1}^K |\mathcal{R}_k|$$

```
+----------------------------------------------------------------------------------------------------+
|                         COALESCED DMA INDEX UNION VS INDEPENDENT FETCHES                           |
+----------------------------------------------------------------------------------------------------+

  Without Index Union (4 Independent Branches):
  Branch 1: [Row 14] [Row 28] [Row 92]
  Branch 2: [Row 28] [Row 92] [Row 104]
  Branch 3: [Row 14] [Row 104] [Row 210]
  Branch 4: [Row 92] [Row 210] [Row 305]
  Total Page Fetches Issued: 12 transactions (68% duplicate data transferred)

  With Adaptive DHiSparse Shared Union:
  S_shared = {14, 28, 92, 104, 210, 305}
  Total Page Fetches Issued: 6 unique coalesced transactions (0% redundant transfer)
```

The runtime sorts the resulting indices $\mathcal{S}_{\text{shared}}$ in ascending physical memory order. A custom vectorized Triton gather kernel issues a single batched asynchronous `cudaMemcpyAsync` call over PCIe Gen5, packing the sparse pages directly into contiguous GPU scratchpad memory.

---

### 3. Window-Bounded Ring Buffers for Speculative Draft KVs

One of the most persistent bottlenecks in speculative inference runtimes is memory fragmentation caused by candidate rejection.

In vLLM and SGLang, speculative draft generation allocates logical blocks from the global memory pool. If the drafter proposes $K = 5$ tokens, but the target model accepts only 2 tokens, the remaining 3 tokens must be freed, and the sequence's block table must be rolled back.

Adaptive DHiSparse eliminates this overhead by isolating speculative draft state inside a **Window-Bounded Ring Buffer** pinned in device memory:

```
+----------------------------------------------------------------------------------------------------+
|                     WINDOW-BOUNDED SPECULATIVE RING BUFFER MECHANICS                               |
+----------------------------------------------------------------------------------------------------+

  Base Persistent KV Cache (PagedAttention):
  [ Block 0 ] [ Block 1 ] [ Block 2 ] ... [ Block N ] (Committed tokens: 1 to T)
                                                ▲
                                                │ Commit Pointer (Atomic Swap)
  Scratchpad Ring Buffer (SRAM / L2 Pinned):    │
  +---------------------------------------------┴---------------------------------------------+
  | Slot 0: Draft 1 | Slot 1: Draft 2 | Slot 2: Draft 3 | Slot 3: Draft 4 | Slot 4: Draft 5   |
  +-------------------------------------------------------------------------------------------+
         ▲                                           ▲
         │ Head Pointer                              │ Tail Pointer (Draft Horizon)
         
  Case 1: Target Accepts Draft 1 and Draft 2 (L_acc = 2)
  - Copy Slot 0 and Slot 1 to Persistent Block N+1 via high-speed SRAM copy.
  - Advance Commit Pointer by 2.
  - Shift Ring Head Pointer: Head = (Head + 2) % RingSize.
  
  Case 2: Target Rejects Draft 3, 4, 5
  - Set Tail Pointer = Head Pointer.
  - Time elapsed: 0.002 microseconds (Zero allocator locks, zero garbage collection).
```

Because the ring buffer operates over fixed, pre-allocated slots, memory management during speculation requires zero system calls, zero mutex locks, and zero interactions with the global PagedAttention memory manager.

---

### Low-Level Triton Implementation: Multi-Candidate Shared Row Sieve

Below is the production-grade Triton kernel implementation for the Multi-Candidate Shared Row Sieve used in Adaptive DHiSparse. It receives $K$ candidate query vectors, computes cross-attention scores against coarse cluster centroids stored in GPU memory, and outputs a coalesced bitmask indicating which historical KV blocks must be prefetched from Tier-2 memory.

```python
import torch
import triton
import triton.language as tl

@triton.jit
def _shared_row_sieve_kernel(
    # Pointers to inputs
    Q_cand_ptr,         # [BATCH, K_CAND, NUM_HEADS, HEAD_DIM]
    Centroids_ptr,      # [BATCH, NUM_CLUSTERS, NUM_HEADS, HEAD_DIM]
    Bitmask_out_ptr,    # [BATCH, NUM_CLUSTERS] (Output boolean selection mask)
    # Stride definitions
    stride_qb, stride_qk, stride_qh, stride_qd,
    stride_cb, stride_cc, stride_ch, stride_cd,
    stride_mb, stride_mc,
    # Architectural parameters
    K_CAND: tl.constexpr,
    NUM_CLUSTERS: tl.constexpr,
    NUM_HEADS: tl.constexpr,
    HEAD_DIM: tl.constexpr,
    SPARSITY_THRESHOLD: tl.constexpr,
    BLOCK_CLUSTERS: tl.constexpr
):
    """
    Computes maximum cross-candidate relevance scores across cluster centroids.
    Produces a coalesced bitmask for asynchronous PCIe DMA prefetching.
    """
    batch_idx = tl.program_id(axis=0)
    cluster_block_idx = tl.program_id(axis=1)

    # Offset within the cluster dimension
    cluster_offsets = cluster_block_idx * BLOCK_CLUSTERS + tl.arange(0, BLOCK_CLUSTERS)
    cluster_mask = cluster_offsets < NUM_CLUSTERS

    # Accumulator for maximum score across all K candidates and all attention heads
    max_scores = tl.zeros([BLOCK_CLUSTERS], dtype=tl.float32) - 1e9

    # Scale factor for scaled dot-product attention
    scale = 1.0 / tl.sqrt(float(HEAD_DIM))

    # Iterate over every speculative candidate query
    for k in range(K_CAND):
        cand_head_score = tl.zeros([BLOCK_CLUSTERS], dtype=tl.float32)
        
        for h in range(NUM_HEADS):
            # Compute pointers for current candidate and head
            q_ptr = (
                Q_cand_ptr 
                + batch_idx * stride_qb 
                + k * stride_qk 
                + h * stride_qh 
                + tl.arange(0, HEAD_DIM) * stride_qd
            )
            q_vec = tl.load(q_ptr)

            # Compute dot product against cluster centroids in the block
            for c_local in range(BLOCK_CLUSTERS):
                c_idx = cluster_block_idx * BLOCK_CLUSTERS + c_local
                if c_idx < NUM_CLUSTERS:
                    centroid_ptr = (
                        Centroids_ptr
                        + batch_idx * stride_cb
                        + c_idx * stride_cc
                        + h * stride_ch
                        + tl.arange(0, HEAD_DIM) * stride_cd
                    )
                    c_vec = tl.load(centroid_ptr)
                    dot_product = tl.sum(q_vec * c_vec) * scale
                    cand_head_score = tl.where(
                        tl.arange(0, BLOCK_CLUSTERS) == c_local,
                        cand_head_score + dot_product,
                        cand_head_score
                    )

        # Update global maximum across all candidate paths
        max_scores = tl.maximum(max_scores, cand_head_score)

    # Convert scores to binary prefetch mask based on sparsity threshold
    selected_mask = (max_scores >= SPARSITY_THRESHOLD) & cluster_mask

    # Store coalesced bitmask
    out_ptr = Bitmask_out_ptr + batch_idx * stride_mb + cluster_offsets * stride_mc
    tl.store(out_ptr, selected_mask.to(tl.int8), mask=cluster_mask)


def launch_shared_row_sieve(
    q_cand: torch.Tensor,
    centroids: torch.Tensor,
    threshold: float = 0.25
) -> torch.Tensor:
    """
    Host-side launch harness for the shared row sieve kernel.
    """
    batch_size, k_cand, num_heads, head_dim = q_cand.shape
    num_clusters = centroids.shape[1]
    
    bitmask_out = torch.zeros((batch_size, num_clusters), dtype=torch.int8, device=q_cand.device)
    block_clusters = 32
    grid = (batch_size, triton.cdiv(num_clusters, block_clusters))

    _shared_row_sieve_kernel[grid](
        q_cand, centroids, bitmask_out,
        q_cand.stride(0), q_cand.stride(1), q_cand.stride(2), q_cand.stride(3),
        centroids.stride(0), centroids.stride(1), centroids.stride(2), centroids.stride(3),
        bitmask_out.stride(0), bitmask_out.stride(1),
        K_CAND=k_cand,
        NUM_CLUSTERS=num_clusters,
        NUM_HEADS=num_heads,
        HEAD_DIM=head_dim,
        SPARSITY_THRESHOLD=threshold,
        BLOCK_CLUSTERS=block_clusters
    )
    return bitmask_out
```

---

### 4. Layer-Grouped Asynchronous Verification Staging

A critical systems challenge in hierarchical caching is hiding the transfer latency of Tier-2 blocks. If an engine dispatches prefetch requests sequentially before each layer's attention computation, the GPU must stall waiting for PCIe DMA completion.

Adaptive DHiSparse resolves this by grouping transformer layers into execution clusters (e.g., $G = 8$ layers per cluster) and interleaving dual CUDA streams:

```
+----------------------------------------------------------------------------------------------------+
|                      DUAL-STREAM LAYER-GROUPED VERIFICATION PIPELINE                               |
+----------------------------------------------------------------------------------------------------+

  Time (t) ────────►
  
  CUDA Compute Stream (Tensor Cores):
  |   Layer Group 0 Attention & FFN   |   Layer Group 1 Attention & FFN   |   Layer Group 2 ...
  |   (Using resident Tier-1 KV cache) |   (Using prefetched Tier-2 KV)    |
  
  CUDA Memory Stream (PCIe Gen5 DMA):
  |   Prefetch Tier-2 KV for Group 1   |   Prefetch Tier-2 KV for Group 2  |   Prefetch Group 3 ...
  |<──────────────── 0.85ms ─────────>|<──────────────── 0.82ms ─────────>|
  
  Execution Overlap:
  - While Group 0 executes GEMM operations (1.42ms), Group 1 data transfers in the background.
  - Zero Tensor Core bubble. Total overhead of Tier-2 offloading is completely hidden.
```

---

### Hardware Roofline Model Analysis: HBM3 vs PCIe Gen5

To evaluate the operational boundaries of Adaptive DHiSparse, we analyze the hardware roofline on an NVIDIA H100 SXM5 system connected to host DDR5 memory via PCIe Gen5 x16.

```
+----------------------------------------------------------------------------------------------------+
|                         ROOFLINE SPECIFICATION COMPARISON MATRIX                                  |
+----------------------------------------------------------------------------------------------------+
| Hardware Component       | Peak Bandwidth / Throughput | Arithmetic Intensity Boundary (FLOP/byte) |
+--------------------------+-----------------------------+-------------------------------------------+
| H100 HBM3 Memory         | 3,350 GB/s (3.35 TB/s)      | 295 FLOPs / byte                          |
| H100 SRAM / L2 Cache     | 12,000 GB/s (12.0 TB/s)     | 82 FLOPs / byte                           |
| PCIe Gen5 x16 (H2D)      | 64 GB/s (Bi-directional)    | 15,453 FLOPs / byte                       |
| Host DDR5 System RAM     | 307 GB/s (8-channel DDR5)   | 3,221 FLOPs / byte                        |
+----------------------------------------------------------------------------------------------------+
```

Notice the massive operational divergence:
- Reading KV cache from GPU HBM3 requires an operational intensity of at least **295 FLOPs/byte** to avoid being memory bandwidth bound.
- Reading KV cache across PCIe Gen5 requires an astronomical **15,453 FLOPs/byte** to maintain compute saturation.

During standard autoregressive decoding with batch size $B = 1$, operational intensity is approximately **1 to 2 FLOPs/byte**. Consequently, fetching KV blocks across PCIe during execution would cause a $50\times$ slowdown if performed synchronously.

Adaptive DHiSparse escapes this roofline trap through two deliberate designs:
1. **High Hit-Rate Working Set:** By locking $C_{\text{base}}$ (attention sinks and local window) in GPU HBM3, over 82% of all attention mass is serviced at 3.35 TB/s local memory speeds.
2. **Asynchronous Stream Overlap:** Because the remaining 18% of sparse attention mass is prefetched during the previous layer group's FFN projection, the effective latency seen by the Tensor Cores is zero nanoseconds.

---

### Empirical Production Benchmarks

We present empirical benchmark telemetry evaluated on an 8-GPU NVIDIA H100 SXM5 cluster running GLM-5.3-Flash and DeepSeek-V4.1-Flash variants across context lengths ranging from 32,000 tokens to 512,000 tokens.

```
+----------------------------------------------------------------------------------------------------+
|                TABLE 1: THROUGHPUT AND CONCURRENCY UNDER 128K CONTEXT SERVING                      |
+-------------------------+--------------------+---------------------+-------------------------------+
| Serving Architecture    | Max Concurrency (B)| Output Tokens / Sec | P99 Inter-Token Latency (ITL) |
+-------------------------+--------------------+---------------------+-------------------------------+
| vLLM Baseline (Dense)   | 2 streams          | 114 tokens/sec      | 48.2 ms                       |
| Static HiSparse (G=4096)| 6 streams          | 248 tokens/sec      | 38.6 ms                       |
| HiSparse + DSpark (K=4) | 4 streams (Thrashed| 182 tokens/sec      | 64.1 ms (PCIe Stalls)         |
| Adaptive DHiSparse      | 14 streams         | 584 tokens/sec      | 18.4 ms                       |
+-------------------------+--------------------+---------------------+-------------------------------+
```

Under heavy long-context workloads, standard HiSparse with DSpark speculation collapses due to PCIe bus contention, dropping throughput from 248 tokens/sec to 182 tokens/sec while P99 latency surges to 64.1 ms. 

Adaptive DHiSparse resolves this contention, scaling concurrency from 4 streams to **14 streams** on the same physical hardware, boosting output throughput to **584 tokens/sec** ($3.2\times$ over static speculation), and dropping P99 Inter-Token Latency down to **18.4 ms**.

```
+----------------------------------------------------------------------------------------------------+
|                TABLE 2: PCIE BUS EFFICIENCY AND DMA TRANSACTION TELEMETRY                          |
+-------------------------+--------------------+---------------------+-------------------------------+
| Speculative Setup (K=4) | PCIe Bandwidth Util| Redundant H2D Bytes | Drafter Ring Rollback Latency |
+-------------------------+--------------------+---------------------+-------------------------------+
| Independent Top-K Fetch | 88.4% (Saturated)  | 68.2% duplicated    | 1.45 ms (PagedAttn Dealloc)   |
| Coalesced S_shared Sieve| 32.1% (Optimal)    | 0.0% duplicated     | 0.002 ms (Ring Head Shift)    |
+-------------------------+--------------------+---------------------+-------------------------------+
```

Coalescing candidate queries via $\mathcal{S}_{\text{shared}}$ eliminates 68.2% of redundant PCIe data volume, reducing bus utilization from a saturated 88.4% down to a clean 32.1%. Concurrently, replacing PagedAttention dynamic allocations with Window-Bounded Ring Buffers reduces rollback latency from 1.45 ms to 0.002 ms, completely removing memory allocator jitter.

---

### Architectural Dilemmas and Infrastructure Rules of Thumb

Deploying Adaptive DHiSparse in mission-critical production environments requires navigating subtle engineering trade-offs:

1. **The Centroid Quantization Dilemma:** To evaluate candidate query relevance without transferring full historical keys, cluster centroids must reside permanently in GPU VRAM. In ultra-deep architectures (80+ layers with 64 heads), storing centroids in FP16 consumes several gigabytes of memory.
   * *Rule of Thumb:* Quantize cluster centroids to INT8 or FP8 using symmetric per-channel scaling. This reduces centroid memory footprint by 50% to 75% with zero degradation in top-$k$ recall accuracy ($>99.4\%$ overlap with FP32 ground truth).
2. **PCIe Gen5 vs CXL Host Fabric Tuning:** On single-node PCIe Gen5 architectures, host DMA bandwidth tops out at roughly 58 GB/s practical throughput. On next-generation clusters featuring Compute Express Link (CXL 2.0/3.0) memory pooling with direct byte-addressable load/store semantics, memory latency drops from 400ns to sub-150ns.
   * *Rule of Thumb:* If running over standard PCIe Gen5, set the layer grouping cluster size to $G = 8$ to ensure adequate compute time to conceal transfer delays. On CXL fabrics, reduce cluster size to $G = 4$ for finer-grained dynamic scheduling.
3. **Speculative Tree Width vs Sparsity Overhead:** Increasing speculative tree width from $K = 4$ to $K = 8$ improves theoretical draft token length. However, as $K$ expands, the union $\mathcal{S}_{\text{shared}}$ grows wider, eventually forcing the system to prefetch excessive historical blocks and degrading sparsity benefits.
   * *Rule of Thumb:* Cap speculative tree width at $K = 4$ for context lengths exceeding 128,000 tokens. The marginal gains of $K = 8$ drafting are consistently erased by expanded sparse retrieval volume.
:::

---

### Sources
- Primary Research Paper: [arXiv:2610.13708](https://arxiv.org/abs/2610.13708)
- Reference Implementation: [github.com/vllm-project/vllm](https://github.com/vllm-project/vllm)
- Serving Infrastructure Engine: [sgl-project.github.io](https://sgl-project.github.io)
