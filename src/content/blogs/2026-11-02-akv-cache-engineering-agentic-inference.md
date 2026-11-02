---
title: "AKV: Cache Engineering for Autonomous Agents and State-Preserving Prefix Invalidation Bypass"
date: "2026-11-02"
description: "A systems engineering breakdown of AKV (arXiv:2610.28577): eliminating catastrophic re-prefills in long-horizon LLM agents via direct drop and repos KV cache primitives, extended radix tree matching, and segment-batch attention."
tags: ["AKV", "Cache Engineering", "KV Cache", "vLLM", "SGLang", "Systems Engineering", "Inference", "Agentic AI"]
author: "Abrar Akhunji"
heroImage: "/images/blog/akv-cache-engineering-agentic-inference/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["2026-08-23-kv-cache-agentic-inference-vllm-sglang", "2026-10-21-headroom-claude-mem-agent-context-compression-cache-alignment"]
faq:
  - question: "What is Cache Engineering and what specific engineering bottleneck does it resolve?"
    answer: "Cache Engineering (arXiv:2610.28577) is an inference paradigm designed by researchers from Tsinghua University and CUHK that enables LLM agents to manipulate Key-Value (KV) cache tensors directly in GPU memory. In long-horizon agent workflows, context windows fill rapidly with tool outputs and terminal logs. Conventional systems modify the text prompt via truncation or summarization, but editing text tokens alters prefix hashes, invalidating downstream cached blocks in standard Radix Tree structures. This forces an expensive O(N) re-prefill. Cache Engineering introduces drop and repos operations that prune or shift KV states without changing prompt text or invalidating cached prefixes."
  - question: "How does the drop and repos primitive pair maintain mathematical coherence in RoPE?"
    answer: "The drop primitive flags physical KV pages to be masked out of attention computations during decode. Because dropping intermediate tokens creates coordinate gaps in Rotary Position Embeddings (RoPE), the repos primitive applies an in-register delta rotation matrix R_(Theta, -Delta) directly to retained key vectors. Because 2D Givens rotations form an orthogonal SO(2) group, multiplying by R_(Theta, -Delta) shifts token coordinates without reading hidden states or re-executing QKV projection matrices."
  - question: "What is history dependence and how does AKV's Extended Radix Tree solve it?"
    answer: "Standard Radix Tree engines (such as SGLang's RadixAttention) assume that token sequences uniquely determine KV cache tensors. In Cache Engineering, two agent requests with identical text prefixes can possess entirely different KV states if one executed a drop operation while the other did not. AKV resolves this history dependence by attaching operation metadata to radix edges. Each edge is keyed by the tuple (Token_Sequence, Op_History), preventing cross-session pollution while enabling exact cache hit detection."
  - question: "What are the empirical throughput and latency gains delivered by AKV?"
    answer: "Benchmarked on NVIDIA H100 and A100 clusters across SWE-bench, WebArena, and AgentBench, AKV reduces total agent serving costs by 27.7%, cuts P95 request latency by 1.5x (from 1,240 ms to 810 ms on 64k contexts), and increases output token throughput by 1.2x while improving agent task success rates by 1.7 points over text-summarization baselines."
---

:::eli5
*Written by Abrar Akhunji*

Imagine you are working with an assistant who keeps notes on a long whiteboard during a multi-step debugging session.

Every time the assistant runs a command, the complete terminal output gets copied onto the whiteboard. After twenty commands, the whiteboard runs out of space. 

Under the old approach (called **context engineering**), you erase lines from the middle of the whiteboard or replace an old command output with a brief summary. But there is a huge catch: modern AI inference chips work like strict assembly lines. They index words sequentially from left to right. The moment you erase or alter a single word in the middle of the board, the AI loses its place. It cannot trust any notes written to the right of your edit. To keep working, the AI must wipe everything clean and re-read the entire history from scratch, word for word. On long transcripts, this re-reading process burns massive amounts of computing power and causes noticeable lag.

```
+-------------------------------------------------------------------------+
|                  OLD APPROACH: CONTEXT ENGINEERING                      |
|                                                                         |
| Step 1: Prompt Text = [System] -> [Turn 1] -> [Turn 2] -> [Turn 3]      |
| Step 2: Turn 2 output is too long. Agent edits text to summarize it.   |
| Step 3: Prefix hash breaks at Turn 2!                                   |
| Result: GPU wipes cached memory for Turn 2 and Turn 3.                  |
| Penalty: Complete re-prefill of thousands of tokens from scratch.       |
+-------------------------------------------------------------------------+
                                    vs
+-------------------------------------------------------------------------+
|                   NEW APPROACH: CACHE ENGINEERING (AKV)                 |
|                                                                         |
| Step 1: Prompt Text remains identical in the text log.                  |
| Step 2: Agent sends a "drop" command targeting Turn 2 memory blocks.    |
| Step 3: Prefix tree keeps the text mapping intact.                      |
| Result: GPU simply skips reading Turn 2 blocks during attention.        |
| Benefit: Zero re-prefill. Instant execution. 27.7% lower compute cost.  |
+-------------------------------------------------------------------------+
```

Cache Engineering replaces text editing with direct memory control. 

Instead of rewriting the transcript, the agent leaves the text alone and gives two simple instructions to the graphics chip:

1. **`drop`**: "Ignore pages 4 through 7 when calculating your next thought."
2. **`repos`**: "Slide the remaining page numbers backward so there are no empty gaps in your timeline."

The AI never has to re-read the document from page one. It keeps running at full speed without wasting memory or compute cycles.
:::

:::interactive concept
{
  "title": "AKV Execution Pipeline: State-Preserving Cache Engineering",
  "steps": [
    {
      "label": "Stage 01: Identification",
      "title": "Agent Trajectory Analysis & Selective Drop Pruning",
      "content": "The agent runtime marks transient tool outputs, verbose terminal logs, or stale JSON payloads for removal while retaining the conversational logical identity.",
      "icon": "Cpu"
    },
    {
      "label": "Stage 02: Radix Lookup",
      "title": "Extended Radix Tree Traversal & Operation Match",
      "content": "Unlike standard prefix trees keyed solely by token IDs, AKV branches on (Token_Sequence, Cache_Op). Matching nodes bypass re-prefill even when past tokens were selectively dropped.",
      "icon": "Layers"
    },
    {
      "label": "Stage 03: RoPE Repos",
      "title": "In-Register Delta Positional Rotation",
      "content": "Retained keys are repositioned to compact coordinate gaps left by dropped spans. Delta rotations R_(Theta, -Delta) are applied directly to registers before matrix multiply, avoiding HBM writes.",
      "icon": "Activity"
    },
    {
      "label": "Stage 04: Execution",
      "title": "Segment-Batch Attention & Fused KV Prefill",
      "content": "A unified FlashAttention kernel evaluates heterogeneous non-contiguous KV segments in a single prefill pass, achieving zero-reprefill execution and 1.5x lower P95 latency.",
      "icon": "Zap"
    }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

### 1. The Breakdown of Prefix Caching in Multi-Turn Agent Trajectories

Autonomous agent execution patterns diverge fundamentally from typical chat interactions. In human conversation, turns are short, conversational, and monotonically additive. In contrast, autonomous software agents (operating across SWE-bench, WebArena, or OSWorld environments) generate deeply asymmetric, heterogeneous contexts:

1. Large initial environment setups (repository maps, architecture definitions, API schemas).
2. Repetitive command dispatches (`git status`, `grep`, `cat`, AST queries).
3. Massive raw observation payloads (compiler outputs, stack traces, full HTML DOM snapshots).
4. Deliberative chain-of-thought traces leading to tool invocation decisions.

Across a 40-step trajectory, the token sequence quickly swells past 64,000 tokens. Serving engines like vLLM and SGLang rely on PagedAttention and RadixAttention to amortize computational overhead. When an incoming prompt shares a prefix with a previous request, the engine avoids recalculating the Key-Value (KV) activations for those tokens:

$$\text{FLOPs}_{\text{saved}} = 4 \cdot L \cdot N_{\text{shared}} \cdot d_{\text{model}}$$

Here, $L$ represents the number of transformer layers, $N_{\text{shared}}$ denotes the length of the matched prefix, and $d_{\text{model}}$ is the hidden dimension.

```
Radix Tree Prefix Matching (Standard Serving):

        [System Prompt (Tokens 0..1023)]
                       |
        [Tool Schemas (Tokens 1024..2047)]
                       |
        [Turn 1: Bash Execution (Tokens 2048..4095)]
                       |
        [Turn 2: Compiler Error Dump (Tokens 4096..12287)]  <-- 8,192 tokens of raw stdout
                       |
        [Turn 3: Current Observation & Action]              <-- Cache Hit: 12,288 tokens reused
```

The fundamental systems failure occurs during **context compaction**. When the context approaches GPU High Bandwidth Memory (HBM) limits or context window ceilings, the agent runtime applies text-level context engineering. Common techniques include:
- Truncating earlier tool outputs.
- Running an LLM summarizer to condense intermediate bash traces.
- Slicing out intermediate turn dictionaries from the prompt JSON array.

The moment the text prefix is modified at position $m$, its token sequence changes:

$$T' = [t_0, t_1, \dots, t_{m-1}, t'_m, t'_{m+1}, \dots, t'_k]$$

Because radix trees and hash-based prefix caches are keyed on token ID sequences:

$$\text{Hash}(T'_{0:k}) \neq \text{Hash}(T_{0:k})$$

The lookup fails at token $m$. Even though tokens $t_{k+1 \dots N}$ might be identical to the original trajectory, the engine treats the entire post-compaction context as a cache miss. 

```
The Prefix Invalidation Trap (Context Engineering):

[System Prompt] -> [Tool Schemas] -> [Turn 1] -> [Turn 2: SUMMARIZED] -> [Turn 3] -> [Turn 4]
       |                  |              |                  |
   Cache Hit          Cache Hit      Cache Hit         CACHE MISS! (Hash Mismatch)
                                                            |
                                             +------------------------------+
                                             | FORCED RE-PREFILL:           |
                                             | Recompute KV for Turn 3 & 4  |
                                             | Stalls GPU compute pipelines |
                                             | Latency penalty: 1200ms+     |
                                             +------------------------------+
```

On an 8-way NVIDIA H100 SXM5 node running Llama-3.1-70B, re-prefilling 32,000 tokens consumes roughly 1,400 milliseconds of compute time. The memory bandwidth required to ingest and store intermediate activation tensors saturates the HBM3 subsystem (3.35 TB/s per GPU), elevating Time-To-First-Token (TTFT) and degrading Inter-Token Latency (ITL) for all concurrent serving streams.

---

### 2. The Cache Engineering Abstraction: `Drop` and `Repos`

AKV (introduced by Fu et al. in arXiv:2610.28577) shifts the paradigm from modifying the string representation to manipulating the physical KV cache. The prompt text sequence remains strictly immutable, preserving its position in the radix tree, while the engine exposes fine-grained cache control primitives.

```
       LOGICAL VIEW (Text Sequence) vs PHYSICAL VIEW (GPU Memory)

Logical Prompt:   [System] [Turn 1] [Turn 2: Raw Trace] [Turn 3] [Turn 4]
                     |        |            |               |        |
Physical KV Cache: [Block 0] [Block 1]  [Block 2..7]    [Block 8] [Block 9]
                                            |
                                  APPLY: drop(Block 2..7)
                                  APPLY: repos(Block 8..9, delta=-6*16)
                                            |
Active Attention:  [Block 0] [Block 1]   [EXCLUDED]     [Block 8*] [Block 9*]
                                                        (Compacted Coordinates)
```

The architecture relies on two core primitives:

#### 1. The `Drop` Primitive
The `drop` operator marks a specified token span $[s, e)$ or page list $\{p_i\}$ as inactive:

$$\text{drop}(s, e) \implies \mathcal{M}_t = 0 \quad \forall t \in [s, e)$$

Where $\mathcal{M}$ is the attention visibility mask applied during the softmax calculation:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}} + \mathcal{M}\right)V$$

Specifically, dropping tokens does not deallocate or rewrite the prefix tokens on the host. It informs the PagedAttention kernel to bypass the physical page indices associated with $[s, e)$ during memory address resolution.

#### 2. The `Repos` Primitive and Rotary Position Embeddings
Simply masking out tokens leaves coordinate gaps in positional encodings. Modern autoregressive models use Rotary Position Embeddings (RoPE). For a 2D component of a query or key vector at position $m$, RoPE applies an orthogonal rotation matrix:

$$R_{\Theta, m} = \begin{pmatrix} \cos(m\theta) & -\sin(m\theta) \\ \sin(m\theta) & \cos(m\theta) \end{pmatrix}$$

The dot product between a query at position $n$ and a key at position $m$ depends strictly on their relative distance:

$$q_n^T k_m = (R_{\Theta, n} W_Q x_n)^T (R_{\Theta, m} W_K x_m) = x_n^T W_Q^T R_{\Theta, m - n} W_K x_m$$

If an agent drops a span of length $\Delta = e - s$, any downstream token originally at position $m > e$ now sits at an effective distance of $(m - \Delta)$ from the query. If its key vector remains rotated by $m\theta$, the attention score reflects an artificial coordinate displacement, degrading reasoning coherence.

Instead of recomputing $W_K x_m$ and applying $R_{\Theta, m - \Delta}$ from raw hidden states (which would require a full forward pass through the transformer layers), AKV leverages the algebraic group property of $SO(2)$:

$$R_{\Theta, a} \cdot R_{\Theta, b} = R_{\Theta, a + b}$$

$$R_{\Theta, m - \Delta} = R_{\Theta, -\Delta} \cdot R_{\Theta, m}$$

To reposition a cached key from index $m$ to $(m - \Delta)$, the engine applies a delta rotation $R_{\Theta, -\Delta}$ directly to the stored key vector:

$$k'_{m - \Delta} = R_{\Theta, -\Delta} k_m = \begin{pmatrix} \cos(\Delta\theta) & \sin(\Delta\theta) \\ -\sin(\Delta\theta) & \cos(\Delta\theta) \end{pmatrix} \begin{pmatrix} k_{m, 2i} \\ k_{m, 2i+1} \end{pmatrix}$$

This matrix multiplication has $O(1)$ complexity with respect to sequence length and requires zero access to input activations or intermediate projections.

---

### 3. Resolving History Dependence via Extended Radix Trees

In conventional serving frameworks (such as SGLang), the radix tree node maps token slices to physical cache block tables:

```
Standard Radix Edge:
Node_A --[ Tokens: "def solve():\n" ]--> Node_B (Physical Blocks: [104, 105])
```

This design relies on a strict invariant: **Token sequence uniquely determines KV cache activations.**

In Cache Engineering, this invariant collapses. Consider two independent agent sessions:
- **Session 1:** Executes Turn 1, generates 4,000 tokens of tool output, and drops tokens 1,000 to 3,500.
- **Session 2:** Executes Turn 1, retains the full tool output, and proceeds.

Both sessions share the identical prompt text prefix up to Turn 2. If Session 2 executes a prefix lookup on a standard radix tree, it might hit a cache node whose physical blocks were already dropped or repositioned by Session 1. This is known as **history dependence**.

```
                       HISTORY DEPENDENCE CONFLICT
                                
                             [Root: System Prompt]
                                       |
                         [Tokens: Tool Execution Trace]
                                      / \
    Agent 1 (with drop):             /   \             Agent 2 (without drop):
    KV State: Tokens 0..1000        /     \            KV State: Tokens 0..4000
              Tokens 3500..4000    /       \                     All intact
    Repos applied: Delta=-2500    /         \          Repos applied: Delta=0
                                 v           v
                    [State A: Compacted]   [State B: Full]
```

AKV solves this by extending the radix tree definition. Each edge in the tree is annotated not only with the token sequence, but with the ordered sequence of cache operations applied to that sequence:

$$\mathcal{E} = \left( \mathcal{T}_{\text{tokens}}, \mathcal{O}_{\text{ops}} \right)$$

Where $\mathcal{O}_{\text{ops}}$ is a deterministic operation descriptor:

$$\mathcal{O}_{\text{ops}} = [(\text{op}_0, \text{args}_0), (\text{op}_1, \text{args}_1), \dots]$$

#### Tree Matching Algorithm
When a new request arrives, the AKV scheduler performs a two-dimensional graph walk:
1. **Token Match:** Traverse edges matching the token IDs of the request.
2. **Operation Verification:** Compare the requested cache manipulation policy (e.g., rolling window drops, explicit tool-call masking) against the edge's $\mathcal{O}_{\text{ops}}$ signature.
3. **Branching on Divergence:** If the tokens match but the operation history diverges, AKV forks the node. The existing physical blocks are cloned using Copy-On-Write (CoW) page table references, preventing cross-tenant corruption.

```
Extended Radix Node Structure in AKV:

struct RadixEdge {
    std::vector<int32_t> tokens;
    std::vector<CacheOp> op_history;
    std::vector<int32_t> physical_block_ids;
    std::shared_ptr<RadixNode> child;
    uint32_t ref_count;
    uint64_t last_accessed_timestamp;
};
```

---

### 4. Segment-Batch Attention Kernel Architecture

Under standard inference engines, KV blocks for a sequence are assumed to be logically continuous, indexed by sequential slots $0, 1, 2, \dots, N-1$. When tokens are dropped and repositioned, the logical-to-physical block mapping becomes piecewise discontinuous.

Executing separate FlashAttention kernel calls for each continuous segment induces severe kernel launch overhead and under-utilizes GPU Streaming Multiprocessors (SMs).

AKV implements **Segment-Batch Attention**, a fused GPU kernel written in Triton/CUDA that evaluates heterogeneous segments in a single execution grid.

```
+-----------------------------------------------------------------------------+
|                      SEGMENT-BATCH ATTENTION PIPELINE                       |
|                                                                             |
| Query Token (Pos: N-Delta)                                                  |
|       |                                                                     |
|       v                                                                     |
| +-------------------------------------------------------------------------+ |
| | GPU Shared Memory (SRAM) - FlashAttention Tile Loop                     | |
| |                                                                         | |
| | Tile 0: System Prompt (Pos: 0..127)                                     | |
| |   --> Load K, V from HBM Block 4                                        | |
| |   --> Standard QK^T dot product                                         | |
| |                                                                         | |
| | Tile 1: Pre-Drop Context (Pos: 128..255)                                | |
| |   --> Load K, V from HBM Block 5                                        | |
| |   --> Standard QK^T dot product                                         | |
| |                                                                         | |
| | Tile 2: Post-Drop Context (Original Pos: 1024..1151)                    | |
| |   --> Load K, V from HBM Block 18                                       | |
| |   --> In-Register RoPE Delta Rotation: K' = R_(-Delta) * K               | |
| |   --> Compute QK'^T directly in registers                               | |
| |   --> Zero HBM write traffic!                                           | |
| +-------------------------------------------------------------------------+ |
|       |                                                                     |
|       v                                                                     |
| Online Softmax Accumulator -> Output Tensor                                |
+-----------------------------------------------------------------------------+
```

#### Kernel Optimization: In-Register RoPE Delta Rotation
Rather than writing rotated key vectors back to global HBM memory, AKV fuses the delta rotation directly into the SRAM register load stage of FlashAttention:

1. Thread blocks load raw key vectors $k_m$ from global GPU HBM into shared memory (SRAM).
2. While loading keys from SRAM into registers for Tensor Core matrix multiplication (`mma.sync`), the kernel reads the segment metadata table.
3. If the segment has an associated positional shift $\Delta$, the thread applies the 2D rotation in registers using fused multiply-add (FMA) instructions:
   ```c
   // In-register 2D Givens rotation for RoPE adjustment
   float k_even = r_k[2 * i];
   float k_odd  = r_k[2 * i + 1];
   r_k[2 * i]     = k_even * cos_delta + k_odd * sin_delta;
   r_k[2 * i + 1] = -k_even * sin_delta + k_odd * cos_delta;
   ```
4. The rotated keys immediately feed the GEMM warp tiles. 

This eliminates global memory write-backs entirely. Operational intensity (FLOPs/byte) increases from 12.4 to over 98.2 for the repositioning step, transforming a memory-bound operation into a compute-bound operation that hides behind tensor core latencies.

---

### 5. Triton Implementation: In-Register Repos Kernel

Below is a reference implementation of the fused repos-attention projection kernel, illustrating how delta rotations execute within the inner attention loop:

```python
import torch
import triton
import triton.language as tl

@triton.jit
def _fused_rope_repos_kernel(
    K_ptr,                 # Pointer to Key tensors [B, H, SeqLen, D]
    K_out_ptr,             # Pointer to Output Key tensors
    Segment_Offsets_ptr,   # Start/End boundaries of dropped segments
    Delta_ptr,             # Positional shift per segment
    Cos_Table_ptr,         # Precomputed cos values
    Sin_Table_ptr,         # Precomputed sin values
    stride_k_b, stride_k_h, stride_k_s, stride_k_d,
    D: tl.constexpr,       # Head dimension (e.g. 128)
    BLOCK_SIZE: tl.constexpr
):
    pid = tl.program_id(0)
    batch_idx = tl.program_id(1)
    head_idx = tl.program_id(2)

    seq_idx = pid * BLOCK_SIZE + tl.arange(0, BLOCK_SIZE)
    dim_half = D // 2
    dim_idx = tl.arange(0, dim_half)

    # Determine delta shift for current token indices
    delta = tl.load(Delta_ptr + pid)

    # Load original Keys from HBM
    offset_even = (
        batch_idx * stride_k_b +
        head_idx * stride_k_h +
        seq_idx[:, None] * stride_k_s +
        (dim_idx[None, :] * 2) * stride_k_d
    )
    offset_odd = offset_even + stride_k_d

    k_even = tl.load(K_ptr + offset_even)
    k_odd = tl.load(K_ptr + offset_odd)

    # Load delta rotation coefficients
    cos_val = tl.load(Cos_Table_ptr + delta * dim_half + dim_idx)
    sin_val = tl.load(Sin_Table_ptr + delta * dim_half + dim_idx)

    # Apply orthogonal SO(2) rotation in register space
    k_rot_even = k_even * cos_val + k_odd * sin_val
    k_rot_odd  = -k_even * sin_val + k_odd * cos_val

    # Store back to designated PagedAttention buffer
    out_offset_even = (
        batch_idx * stride_k_b +
        head_idx * stride_k_h +
        seq_idx[:, None] * stride_k_s +
        (dim_idx[None, :] * 2) * stride_k_d
    )
    out_offset_odd = out_offset_even + stride_k_d

    tl.store(K_out_ptr + out_offset_even, k_rot_even)
    tl.store(K_out_ptr + out_offset_odd, k_rot_odd)
```

---

### 6. Production Telemetry & Comparative Benchmarks

The empirical advantages of Cache Engineering were evaluated across three multi-turn agent benchmarks: **SWE-bench Lite** (software engineering tasks), **WebArena** (web navigation), and **AgentBench** (tool manipulation).

Experiments were run on an 8x NVIDIA H100 SXM5 80GB server using Llama-3.1-70B-Instruct with FP8 quantized weights and FP16 KV cache pages.

#### 1. Latency & Throughput Profile Across Trajectory Lengths

```
+-------------------------------------------------------------------------------+
| SYSTEM LATENCY AND COMPUTATIONAL OVERHEAD (SWE-BENCH LITE, 64K CONTEXT)       |
+--------------------------+------------+------------+------------+-------------+
| Serving Configuration    | TTFT (P50) | TTFT (P95) | ITL (P95)  | Cost/Run    |
+--------------------------+------------+------------+------------+-------------+
| Baseline (No Compaction) | OOM (>64k) | OOM (>64k) | N/A        | Failed      |
| Text Summarization       | 1,180 ms   | 2,420 ms   | 28.4 ms    | $1.84       |
| Truncation (Sliding Win) | 420 ms     | 980 ms     | 24.1 ms    | $1.52       |
| AKV (Rolling Drop+Repos) | 185 ms     | 410 ms     | 22.8 ms    | $1.33       |
+--------------------------+------------+------------+------------+-------------+
```

```
     TTFT (P95) COMPARISON UNDER 64K AGENT CONTEXT
     
Text Summarization | ######################################## 2,420 ms
Truncation         | ################ 980 ms
AKV (Ours)         | ####### 410 ms  (5.9x faster than Summarization)
                   +-------------------------------------------------> Latency
```

#### 2. Downstream Task Accuracy Retained

Text summarization often introduces hallucination or omits obscure error codes that are vital for compiler fixes. By preserving the exact tokens and only dropping non-informative intermediate states (e.g. repetitive status polling or massive raw dataframes), AKV achieves higher completion rates:

```
+-------------------------------------------------------------------------------+
| BENCHMARK ACCURACY & COMPLETION RATES                                         |
+--------------------------+-----------------+-----------------+----------------+
| Metric                   | SWE-bench Lite  | WebArena        | AgentBench     |
+--------------------------+-----------------+-----------------+----------------+
| Text Summarization       | 24.3%           | 14.8%           | 38.2%          |
| Raw Truncation           | 21.0%           | 12.1%           | 34.5%          |
| AKV Cache Engineering    | 26.0% (+1.7%)   | 16.5% (+1.7%)   | 40.1% (+1.9%)  |
+--------------------------+-----------------+-----------------+----------------+
```

#### 3. Roofline Model and Memory Bandwidth Analysis
On the NVIDIA H100 SXM5:
- HBM3 Peak Bandwidth: 3,350 GB/s
- FP16 Tensor Core Peak Compute: 989 TFLOPs

In conventional text summarization, re-prefilling 24,000 tokens requires fetching model weights (140 GB) and writing 24,000 intermediate key-value projections (1.5 GB per layer). Operational intensity drops to roughly 2.8 FLOPs/byte, severely bottlenecking memory channels.

In AKV, because the prefix matches in the extended radix tree, the operational intensity of processing the new query token against the pruned cache rises to 142.6 FLOPs/byte, remaining comfortably within the compute-bound zone of the H100 Roofline curve.

---

### 7. Architectural Dilemmas & Production Rules of Thumb

Deploying Cache Engineering in production infrastructure introduces distinct systems trade-offs that infrastructure leads must manage.

```
       PRODUCTION SERVING DECISION TREE: CACHE vs CONTEXT ENGINEERING

                       Incoming Agent Turn
                                |
               Is trajectory length > Context Threshold?
                               / \
                             No   Yes
                            /       \
             Standard Radix Match    Do intermediate blocks have
             (Zero overhead)         deterministic drop annotations?
                                     / \
                                   No   Yes
                                  /       \
                Fallback to LLM           Dispatch AKV drop + repos
                Summarizer (Slow)         (Zero re-prefill, in-register RoPE)
```

#### Dilemma 1: Client-Side vs Server-Side Drop Policy
Should the agent model emit explicit drop tags, or should the serving engine infer droppable spans automatically?
- **Client-Driven (`agent-directed`):** The agent runtime wraps tool outputs in semantic blocks (`<ephemeral_observation> ... </ephemeral_observation>`). The client API passes exact token offsets to AKV. This yields optimal accuracy retention because the agent knows which tool outputs are disposable.
- **Server-Driven (`engine-directed`):** The serving engine monitors attention scores over historical blocks. Blocks whose cumulative attention weight falls below an $\epsilon$-threshold over three consecutive decode turns are automatically scheduled for `drop`. While zero client changes are needed, attention mass is an imperfect proxy for task relevance, occasionally pruning critical environment variables.

#### Dilemma 2: Memory Fragmentation in Paged Pools
Dropping non-contiguous blocks creates fragmented page allocations. If an agent allocates 64 blocks and drops every second block, the pool holds 32 active pages separated by 32 empty slots.
- **Mitigation:** AKV adopts a virtual memory compacting allocator. When page fragmentation in an active sequence exceeds 40%, the memory manager performs an asynchronous defragmentation pass during decode bubbles, copying surviving blocks into contiguous physical spans without pausing the inference loop.

#### Rule of Thumb for Senior Systems Engineers
1. **Never edit prompt strings to save context in agent runtimes.** Mutating the text prefix guarantees a cache miss on modern radix architectures, converting an instantaneous memory lookup into an expensive re-prefill penalty.
2. **Apply RoPE rotations in registers, never in global memory.** Rewriting key vectors in HBM burns memory bandwidth. Execute the $SO(2)$ delta rotation matrix on register tiles immediately prior to matrix multiplication.
3. **Partition radix edges by operation signatures.** If multiple agent instances share common tool definitions but employ distinct memory eviction policies, edge operation tags prevent cross-session cache corruption while preserving maximum prefix sharing.
:::

---

### Sources
- Primary Research Paper: [arXiv:2610.28577 - Cache Engineering for Agents](https://arxiv.org/abs/2610.28577)
- Official Code Repository: [github.com/thu-nics/AKV](https://github.com/thu-nics/AKV)
- SGLang RadixAttention Specification: [sgl-project.github.io](https://sgl-project.github.io)
- vLLM PagedAttention Architectural Documentation: [docs.vllm.ai](https://docs.vllm.ai)
