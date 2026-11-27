---
title: "kv4-hopper: Why 4-Bit KV Caches Stall on Hopper GPUs, and How Register-Direct WGMMA Fixes Them"
date: "2026-11-27"
description: "An architectural breakdown of kv4-hopper (arXiv:2611.30027), showing why vLLM's 4-bit KV-cache paths drop to 10-20% HBM bandwidth on NVIDIA H200 and how TMA warp specialization plus operand-swapped WGMMA reaches 67-75% bandwidth."
tags: ["CUDA", "Hopper", "KV Cache", "Quantization", "vLLM", "Inference Systems", "WGMMA"]
author: "Abrar Akhunji"
heroImage: "/images/blog/kv4-hopper-4bit-kv-cache-decoding-cuda-kernels/hero.jpg"
techTree:
  branch: "Inference Systems & Kernel Architecture"
  level: 10
  prerequisites: ["kv-cache-agentic-inference-vllm-sglang", "minicache-depth-dimension-kv-cache-compression-llm", "h-spec-parallel-speculative-decoding-drafter-kv-cache"]
faq:
  - question: "What is kv4-hopper and what specific engineering bottleneck does it resolve?"
    answer: "kv4-hopper is a Hopper-native (sm_90a) 4-bit KV-cache decode attention kernel and vLLM 0.33 plugin introduced in arXiv:2611.30027. On NVIDIA H200 GPUs, existing 4-bit paths like FlashInfer NVFP4 and Triton UltraQuant drop to 10-20% of peak HBM3e bandwidth and run up to 1.7x slower than FP8 because Hopper lacks FP4 hardware and hits a strict 7 thread-instructions-per-byte issue ceiling. kv4-hopper fixes both instruction inflation and barrier stalls, reaching 67-75% of peak bandwidth at batch sizes 32-128."
  - question: "How does kv4-hopper differ from FlashInfer NVFP4 and BitDecoding on Hopper?"
    answer: "NVBit profiling shows FlashInfer NVFP4 executes 8.3 instructions per value (2-3x above Hopper's 3.9 instructions/value budget at 72 bytes per 128-element row), while Triton UltraQuant hits 11.7 instructions per value with 3-5 shared-memory round trips. BitDecoding decodes in fewer instructions (3.6 without spin-waits) but spends 38% of executed instructions spin-waiting on barriers and pads 4 query heads onto a 64-row WGMMA M dimension. kv4-hopper overlaps a single TMA producer warp with two compute warpgroups, permutes the cache at write time so decoded values enter WGMMA directly from registers, and swaps matrix operands so query heads occupy N=8."
  - question: "What are the exact hardware math and memory capacity gains on an H200?"
    answer: "An NVIDIA H200 pairs 4.8 TB/s of HBM3e bandwidth with roughly 33 trillion thread instructions per second (132 SMs x 4 schedulers x 32 lanes x 1.98 GHz), yielding an issue budget of about 7 instructions per byte. Packing 128-element KV rows into 72 bytes (64 bytes of 4-bit codes plus 8 bytes of E4M3 scales) increases KV capacity inside vLLM by 1.63x (2,867,200 tokens vs 1,761,600 for FP8 on Llama-3.1-8B) and raises maximum sustainable request rate under latency SLOs by 1.67-2.20x on Qwen2.5-72B."
  - question: "How does the accuracy recipe prevent reasoning collapse in production serving?"
    answer: "kv4-hopper pairs its vLLM plugin (--kv-cache-dtype ultraquant_4bit) with four safeguards: static per-channel K mean removal, Hadamard rotation of K, retaining the first 4 sink tokens in BF16, and keeping Layer 0 in BF16. Removing the K mean before rotation prevents concentrated channel outliers from polluting every 16-value quantization block, while keeping Layer 0 in BF16 eliminates a RoPE-rotated key-projection bias that otherwise causes Qwen2-family reasoning models to collapse."
---

:::eli5
*Written by Abrar Akhunji*

Imagine an auto assembly line where the delivery truck carries twice as many parts because every box is vacuum-sealed in shrink wrap.

```
+-----------------------------------------------------------------------------+
|            THE 4-BIT SHRINK-WRAP TRAP ON HOPPER GPUs                        |
+-----------------------------------------------------------------------------+
|                                                                             |
|  1. Standard 8-Bit Cache (FP8):                                             |
|     Parts arrive in simple snap-lid boxes.                                  |
|     Workers open a box in one motion and bolt the part onto the chassis.    |
|     Result: Conveyor runs near full speed (85-90% of belt capacity).        |
|                                                                             |
|  2. Naive 4-Bit Cache on Hopper (FlashInfer NVFP4 / Triton):                |
|     Boxes are half the size, so the truck fits 1.6x more parts.             |
|     Catch: The factory has NO automatic unwrapper machine (no FP4 silicon). |
|     Workers spend 8 to 11 manual knife cuts per tiny bolt, then drop the    |
|     unwrapped parts back into a bin before picking them up again.           |
|     Result: Workers choke on unpacking. Belt drops to 10-20% speed.        |
|                                                                             |
|  3. kv4-hopper (Write-Time Packing + Register-Direct Assembly):             |
|     The warehouse pre-sorts every shrink-wrapped part in the exact order    |
|     each worker's left and right hands expect to grab it.                   |
|     One dedicated loader slides bins onto the table while two teams         |
|     unwrap parts straight into their palms and bolt them in one fluid pass. |
|     Result: 67-75% belt speed, 1.63x more cars on the lot, zero stalling.   |
+-----------------------------------------------------------------------------+
```

When you run a large language model in production, generating each new word forces the GPU to read its entire memory of past words, called the Key-Value (KV) cache. Reading that memory is almost always the slowest part of the job.

A natural fix is compression. Instead of storing every number in 16 bits or 8 bits, you pack each number into 4 bits. The data shrinks by half, so you expect the model to run twice as fast.

On NVIDIA's newer Blackwell chips, that works as advertised because the silicon has built-in 4-bit math circuits. On Hopper GPUs like the H100 and H200, which still power most production clusters, those circuits do not exist. The GPU has to unpack every 4-bit number back into 16 bits using regular software instructions before its math cores can touch it.

In practice, turning on 4-bit KV caching in vLLM on an H200 actually makes generation up to 1.7 times slower than 8-bit caching.

Why does shrinking the data make the chip slower? Because an H200 reads memory so fast (4.8 terabytes every second) that each worker thread only gets about seven instructions per byte read before falling behind the memory conveyor belt. Existing 4-bit software kernels burn two to three times that instruction budget unpacking bits, shifting masks, and bouncing unpacked numbers back and forth through shared scratchpad memory.

`kv4-hopper` fixes this with three clean hardware tricks.

First, it separates loading from math. One tiny crew (a single TMA producer warp) does nothing except slide compressed memory chunks into fast on-chip buffers. Two larger crews (compute warpgroups) alternate working on those buffers without waiting on each other.

Second, it sorts the compressed numbers when writing them to memory in the first place. Instead of packing values linearly and forcing the reader to untangle them later, the writer arranges every 4-bit chunk to match the exact register layout of the Hopper tensor core. When a thread reads a 32-bit word, a couple of bitmasks snap the values directly into place in registers. Nothing ever bounces back to scratchpad memory.

Third, it flips the math table sideways. Normally, a small group of 4 or 8 query heads sits in the rows of a 64-row matrix, leaving 56 rows empty and wasting tensor core work on zeroes. `kv4-hopper` swaps the matrix sides so the 4 or 8 query heads sit in the tiny 8-column slot, while the compressed memory rows fill all 64 active rows.

The result is a 4-bit cache that actually runs faster than 8-bit on Hopper, while letting a single H200 hold 1.63 times more conversation history before running out of VRAM.
:::

:::interactive chart
{
  "title": "vLLM 0.33 Pure Decode Step Latency on NVIDIA H200 (Llama-3.1-8B)",
  "description": "Median CUDA-graph replay time per decode step in milliseconds across batch x context shapes (lower is faster). Measured on H200 SXM from arXiv:2611.30027 Table 6.",
  "type": "bar",
  "xKey": "shape",
  "series": [
    { "name": "vLLM FlashInfer FP8 (XQA)", "dataKey": "fp8" },
    { "name": "vLLM Native NVFP4 (FlashInfer)", "dataKey": "vllm_nvfp4" },
    { "name": "kv4-hopper NVFP4 (Full Recipe)", "dataKey": "kv4_hopper" }
  ],
  "data": [
    { "shape": "1 x 32K", "fp8": 5.57, "vllm_nvfp4": 6.42, "kv4_hopper": 5.31 },
    { "shape": "8 x 32K", "fp8": 10.25, "vllm_nvfp4": 15.69, "kv4_hopper": 8.06 },
    { "shape": "32 x 16K", "fp8": 12.66, "vllm_nvfp4": 26.36, "kv4_hopper": 10.94 },
    { "shape": "32 x 32K", "fp8": 20.42, "vllm_nvfp4": 47.80, "kv4_hopper": 16.43 },
    { "shape": "64 x 16K", "fp8": 24.80, "vllm_nvfp4": 48.23, "kv4_hopper": 16.74 },
    { "shape": "16 x 64K", "fp8": 26.90, "vllm_nvfp4": 47.59, "kv4_hopper": 16.35 },
    { "shape": "128 x 8K", "fp8": 21.81, "vllm_nvfp4": 49.18, "kv4_hopper": 17.43 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

Compressed KV caches come with an obvious promise on paper: cut each cached element from 16 bits or 8 bits down to 4 bits, and decode attention should run nearly twice as fast while doubling effective context capacity.

On NVIDIA Hopper GPUs (H100, H200, H20), that promise breaks in production.

In `vLLM 0.33.0` on an H200 SXM running Llama-3.1-8B at batch 32 with 16K context, FlashInfer's BF16 decode attention takes 0.495 ms. Enabling FP8 KV drops it to 0.395 ms (or 0.255 ms with XQA). Turning on `--kv-cache-dtype nvfp4` inflates the same attention step to 0.669 ms. Memory consumption drops, yet token generation slows down by up to 1.7x against FP8.

Jian Zhang's November 2026 systems report, *Fast 4-bit KV-Cache Decoding on Hopper GPUs* ([arXiv:2611.30027](https://arxiv.org/abs/2611.30027), code at `thomaszhang2661/kv4-hopper`), isolates why existing 4-bit kernels collapse on Hopper and builds a `sm_90a` decode path that restores both speed and reasoning accuracy inside vLLM.

### The Hopper Instruction-Issue Wall

Why does a 4-bit kernel stall on an H200 when identical quantization logic speeds up an A100 or L40S? The answer lives in the ratio between peak instruction-issue rate and HBM3e bandwidth.

Blackwell (`sm_100a`) provides native hardware instructions to consume 4-bit floating-point operands directly in tensor cores. Hopper (`sm_90a`) supports BF16 and FP8 WGMMA, not FP4. Every 4-bit element must be unpacked, bit-shifted, and scaled in software registers using SIMT integer and FP16 instructions before reaching the tensor core.

Look at the hardware ceiling on an NVIDIA H200 SXM:
- **Peak HBM3e Bandwidth:** $4.8\text{ TB/s}$
- **Peak Thread Instruction Issue Rate:** $132\text{ SMs} \times 4\text{ warp schedulers} \times 32\text{ lanes} \times 1.98\text{ GHz} \approx 33.45 \times 10^{12}\text{ thread instructions/s}$

Dividing those two ceilings establishes the hard **instruction-issue budget per byte** at full memory saturation:

$$\text{Issue Budget}_{\text{H200}} = \frac{33.45 \times 10^{12}\text{ inst/s}}{4.8 \times 10^{12}\text{ B/s}} \approx 6.97\text{ thread instructions/byte}$$

In NVFP4, a single 128-element KV head row occupies 64 bytes of packed E2M1 codes plus 8 bytes of E4M3 group scales (one scale per 16 elements), totaling 72 bytes per row. Multiply 72 bytes by 6.97 instructions/byte and divide by 128 values: a decode kernel saturating H200 HBM3e cannot spend more than **3.9 thread instructions per 4-bit value** across the entire pipeline (address calculation, load, unpack, scale, tensor core issue, and online softmax).

Compare that 3.9 budget across older architectures using the same formula:
- **H200 SXM:** ~7 instructions/byte (~3.9 instructions/value)
- **H100 SXM / A100:** ~10 instructions/byte
- **L40S (GDDR6):** ~53 instructions/byte

Software dequantization loops tuned on L40S or A100 fit comfortably inside 10 to 53 instructions/byte. When deployed on H200's 4.8 TB/s HBM3e bus, those exact kernels hit an instruction-issue ceiling long before saturating memory traffic.

NVBit binary instrumentation at $B=32, S=16\text{K}$ confirms two distinct failure modes across existing kernels:

| Kernel Implementation | Executed Inst / Value | H200 HBM Bandwidth Used | Implied Issue Utilization | Primary Bottleneck |
| :--- | :--- | :--- | :--- | :--- |
| Baseline Triton NVFP4 | 11.7 | 17% | 52% | Issue budget + SMEM round-trips (3-5/tile) |
| FlashInfer NVFP4 (vLLM) | 8.3 | 19% | 40% | Issue budget (`IMAD`/`LOP3`/`PRMT`) + serialization |
| BitDecoding INT4 (Hopper) | 3.6 (excl. spin-waits) | 25% | ~24% | 38% instructions spent spin-waiting + 4/64 M-row padding |
| **kv4-hopper NVFP4 (`sm_90a`)** | **~3.8 (incl. scales)** | **67-75%** | **TMA-overlapped** | **HBM3e bandwidth-bound at B=32-128** |

Triton and FlashInfer burn 2x to 3x the Hopper issue budget on bit manipulation (`IMAD`, `LOP3`, `PRMT`), type conversions, and redundant shared-memory round-trips. BitDecoding keeps dequantization instructions lean (roughly 1.3 unpack instructions per value), yet still stalls at 25% bandwidth because 38% of its executed instructions spin-wait on barriers and its `wgmma` mapping places 4 GQA query heads onto the 64-row $M$ dimension, wasting softmax work on 60 padding rows.

### Roofline & Tensor Shape Geometry in GQA Decode

For Llama-3.1-8B (32 query heads, 8 KV heads, head dimension $d = 128$, GQA group size $G = 4$), every KV row in BF16 is 256 bytes and feeds roughly 1,024 FLOPs (512 multiply-adds across $QK^T$ and $PV$), giving an operational intensity of:

$$I_{\text{BF16}} = \frac{1024\text{ FLOPs}}{256\text{ B}} = 4.0\text{ FLOPs/byte}$$

In NVFP4 at 72 bytes per row (plus 72 bytes for $V$ = 144 bytes per token pair), operational intensity climbs to roughly 7.1 FLOPs/byte. Because an H200 delivers 989 TFLOPS of dense BF16 tensor core compute over 4.8 TB/s of bandwidth, the machine's hardware ridge point sits at:

$$I_{\text{ridge}} = \frac{989 \times 10^{12}\text{ FLOP/s}}{4.8 \times 10^{12}\text{ B/s}} \approx 206\text{ FLOPs/byte}$$

Decode attention remains strictly memory-bound even at batch 128. Any kernel optimization must therefore minimize **bytes transferred**, **stall cycles between global loads and WGMMA**, and **SIMT instructions per byte**.

### Five-Part Architecture of `kv4-hopper` (`decode_fp4.cu`)

Inspecting `kv4/cuda/decode_fp4.cu` reveals how the kernel eliminates both waiting and instruction inflation across NVFP4 (E2M1 with per-16 E4M3 scales), MXFP4 (E2M1 with per-32 E8M0 scales), and INT4 under one unified `sm_90a` skeleton.

```
+---------------------------------------------------------------------------------+
|                   kv4-hopper KERNEL EXECUTION PIPELINE (sm_90a)                 |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  [HBM3e Paged Pool: 64-token pages]                                             |
|   Pre-permuted at write time: K/V codes (16 KB/stage) + scales (2 KB/stage)     |
|          |                                                                      |
|          v (Async TMA bulk copy via producer warp, double-buffered mbarriers)   |
|  [Shared Memory: 2 Stages x 256 Tokens]                                         |
|          |                                                                      |
|          +-------------------------------+-----------------------------------+  |
|          | (Tokens 0..127)               | (Tokens 128..255)                 |  |
|          v                               v                                   |  |
|  [Compute Warpgroup 0 (4 warps)] [Compute Warpgroup 1 (4 warps)]             |  |
|   1. 128-bit LDS -> registers     1. 128-bit LDS -> registers                |  |
|   2. Bitmask unpack E2M1 -> f16x2 2. Bitmask unpack E2M1 -> f16x2            |  |
|   3. cvt.rn.f16x2.e4m3x2 + HMUL2  3. cvt.rn.f16x2.e4m3x2 + HMUL2             |  |
|   4. wgmma.m64n8k16 (S^T = K*q^T) 4. wgmma.m64n8k16 (S^T = K*q^T)            |  |
|   5. Online softmax (P * 2^10)    5. Online softmax (P * 2^10)               |  |
|   6. Write P' to SMEM (2 KB/wg)   6. Write P' to SMEM (2 KB/wg)              |  |
|   7. wgmma.m64n8k16 (O^T=V^T*P^T) 7. wgmma.m64n8k16 (O^T=V^T*P^T)            |  |
|          |                               |                                   |  |
|          +---------------+---------------+                                   |  |
|                          v                                                   |  |
|         [Cross-Warpgroup Online Softmax Merge + BF16 Sink Merge]             |  |
+---------------------------------------------------------------------------------+
```

#### 1. Warp Specialization with TMA Double Buffering
The kernel launches 9 warps (`NTHREADS = 8 * 32 + 32 = 288` threads) with `__launch_bounds__(NTHREADS, 2)`. A single **producer warp** issues asynchronous Tensor Memory Accelerator (TMA) bulk copies from paged HBM buffers into two 256-token shared memory stages guarded by `mbarrier` objects.

Meanwhile, two **compute warpgroups** (4 warps each, 128 threads per warpgroup) own tokens `0..127` and `128..255` of each stage respectively. While both compute warpgroups unpack registers and drive `wgmma` on stage $s$, the producer warp prefetches stage $s+1$. Each warpgroup maintains an independent online-softmax state $(m, l, O)$ and merges once at the end before a split-K and BF16 sink merge.

#### 2. Operand Swapping on `wgmma.m64n8k16`
Standard Hopper attention maps the $G$ query heads in a GQA group onto the $M = 64$ row dimension of `wgmma.m64n8k16` (`Q * K^T`). For $G = 4$ or $G = 8$, 56 to 60 rows of $M$ are zeroes, wasting tensor-core capacity and forcing softmax threads to track dead rows. Worse, `wgmma` reads operand $A$ from **registers** (or SMEM) while operand $B$ must come from **shared memory**. If $K$ and $V$ sit in $B$, software-dequantized values must be written back to SMEM first, eating bandwidth and triggering bank conflicts.

`kv4-hopper` transposes both attention multiplies:

$$S^T = K \cdot q^T \qquad \text{and} \qquad O^T = V^T \cdot P^T$$

This single algebraic transpose solves two problems at once:
1. $K$ (64 tokens $\times$ 16 dims) and $V^T$ (64 dims $\times$ 16 tokens) become operand $A$ in `wgmma.m64n8k16`, letting decoded FP16 pairs pass **directly from registers into the tensor core** with zero SMEM writebacks.
2. The GQA query group $q^T$ occupies the $N = 8$ dimension (`G = 8` fills all 8 columns; `G = 4` pads only 4 columns and avoids extra softmax work). Only the tiny 2 KB probability tile $P^T$ per warpgroup ever touches shared memory.

#### 3. Write-Time Cache Permutation (`store_fp4.cu`)
If the KV cache were stored row-major, each thread would have to shuffle nibbles across lanes after loading from SMEM to satisfy the `wgmma` $A$-operand register layout (`R0..R3` across 4 lanes per quad). Instead, `store_fp4.cu` permutes each $K$ row and each 256-token $V$ block **once at cache-write time**.

During decode, every thread pulls a contiguous 128-bit vector straight from shared memory with zero bank conflicts and zero cross-lane `__shfl` instructions. Each 32-bit word `w` holds four E2M1 pairs positioned identically across the low and high halves of an `f16x2` register.

#### 4. Branchless Bit-Placement E2M1 & INT4 Reconstruction
Look at the exact inline PTX reconstruction in `kv4/cuda/decode_fp4.cu`. An E2M1 code `(s e1 e0 m)` placed at FP16 bits `11..9` (with sign `s` at bit `15`) represents the exact value scaled by $2^{-14}$, including the subnormal `0.5` which maps cleanly to $2^{-15}$:

```cpp
// Four E2M1 slots packed in a 32-bit word -> four f16x2 registers (* 2^-14)
__device__ __forceinline__ uint32_t fA(uint32_t w) {
  return w & 0x8E008E00u;
}
__device__ __forceinline__ uint32_t fB(uint32_t w) {
  return (w << 3) & 0x8E008E00u;
}
__device__ __forceinline__ uint32_t fC(uint32_t w) {
  return ((w << 9) & 0x0E000E00u) | ((w << 2) & 0x80008000u);
}
__device__ __forceinline__ uint32_t fD(uint32_t w) {
  return ((w << 6) & 0x0E000E00u) | ((w << 1) & 0x80008000u);
}

// Convert two E4M3 group scales to f16x2 and multiply directly in register
__device__ __forceinline__ uint32_t e4m3x2_f16x2(uint32_t lo16) {
  uint32_t r;
  asm("{\n .reg .b16 x;\n cvt.u16.u32 x, %1;\n cvt.rn.f16x2.e4m3x2 %0, x;\n}"
      : "=r"(r) : "r"(lo16));
  return r;
}

__device__ __forceinline__ uint32_t hmul2_lo(uint32_t a, uint32_t s) {
  uint32_t r;
  asm("{\n .reg .b16 l, h;\n .reg .b32 t;\n"
      " mov.b32 {l, h}, %2;\n mov.b32 t, {l, l};\n"
      " mul.rn.f16x2 %0, %1, t;\n}" : "=r"(r) : "r"(a), "r"(s));
  return r;
}
```

Notice the `mov.b32 {l, l}` pattern in `hmul2_lo`: `ptxas` compiles this into `HMUL2` using native `.H0_H0` and `.H1_H1` half-operand selectors, avoiding an extra `PRMT` instruction per scale application. Meanwhile, the constant $2^{14}$ factor and per-tensor FP32 scale fold into the final scalar score/output multipliers (`score_mul` and `out_mul`) at zero per-element cost.

For INT4, `decode_int4.cu` uses classic FP16 magic-number construction (`(w & 0x000F000F) | 0x64006400` yielding $1024 + c$, and `0x00F000F0` yielding $1024 + 16c$ with the factor of $16$ folded into $q$) at **0.625 unpack instructions per value**, bringing total instructions down to 2.6 per value (vs 3.8 for NVFP4 due to E4M3 scale multiplies).

#### 5. Two Subtle Numerical Bugs Exposed Only at Long Context
Testing against random 128-token blocks misses two real hardware pathologies that `kv4-hopper` caught on multi-thousand-token sequences:
1. **Hopper WGMMA Truncation Drift (INT4):** Subtracting the `1024` magic-number bias *after* the tensor-core multiply caused $2 \times 10^{-2}$ relative error across thousands of tokens because Hopper's FP16 tensor-core accumulation truncates rather than executing IEEE round-to-nearest. Subtracting `1024` *before* `wgmma` via one `HADD2` per register cut error down to $1.3 \times 10^{-4} \text{ to } 2.3 \times 10^{-4}$.
2. **Subnormal Underflow Next to Attention Sinks:** On real Llama-3.1-8B activations, strong attention sinks leave thousands of tail tokens with tiny weights that underflow to FP16 subnormals or zero when $P$ is computed directly. Scaling $P$ by $2^{10}$ (`P_SHIFT = 10.f`) before writing to SMEM eliminates underflow with zero runtime overhead.

### Kernel & vLLM Serving Benchmarks (NVIDIA H200 SXM)

Across all 11 tested $(B \times S)$ shapes on an H200 SXM, `kv4-hopper` NVFP4 hits **67-75% of peak HBM3e bandwidth** at $B = 32\text{ to }128$, beating FlashInfer FA2 FP8 by **1.4x-2.3x**, XQA FP8 by **1.24x-2.05x**, and even unmerged FlashAttention-4 native FP8 (`commit 8ef2c611`) by **1.12x-1.49x** across the faster of XQA and FA4-FP8.

| Shape ($B \times S$) | FA2 FP8 (ms) | XQA FP8 (ms) | XQA BW % | kv4-hopper NVFP4 (ms) | Speedup vs XQA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| $1 \times 16\text{K}$ | 0.033 | 0.027 | 26% | **0.022** | 1.24x |
| $1 \times 128\text{K}$ | 0.119 | 0.121 | 46% | **0.063** | 1.93x |
| $4 \times 32\text{K}$ | 0.118 | 0.125 | 45% | **0.061** | 2.05x |
| $16 \times 128\text{K}$ | 1.552 | 1.314 | 68% | **0.678** | 1.94x |
| $32 \times 16\text{K}$ | 0.396 | 0.255 | 88% | **0.187** | 1.37x |
| $64 \times 16\text{K}$ | 0.794 | 0.615 | 73% | **0.352** | 1.75x |
| $128 \times 16\text{K}$ | 1.552 | 0.993 | 90% | **0.675** | 1.47x |

Paging with 64-token vLLM block tables adds virtually zero penalty (`0.99x-1.035x` of contiguous kernel speed).

When wired into `vLLM 0.33.0` (`--kv-cache-dtype ultraquant_4bit`) with the full accuracy recipe enabled, pure decode step times on Llama-3.1-8B accelerate by **1.12x-1.64x** over FlashInfer FP8 (XQA) at batch 8 and above, while holding **1.63x more tokens** in the same GPU memory budget (2,867,200 tokens vs 1,761,600 tokens for FP8).

Under realistic serving request streams on a single H200 SXM with strict latency Service Level Objectives (SLOs), memory capacity quickly dictates goodput:
- **Llama-3.1-8B (reasoning stream):** Sustains **1.23x-1.32x** higher request rate than FP8 before SLA violations.
- **Qwen3-32B (reasoning stream):** Sustains **1.45x-1.80x** higher request rate than FP8.
- **Qwen2.5-72B (reasoning stream):** Sustains **1.67x-2.20x** higher request rate than FP8, because FP8 exhausts KV capacity and triggers request queueing and preemption far earlier.

There is a concrete trade-off on prefill-heavy streams: time-to-first-token (TTFT) is **1.5%-6% slower** (up to 7% on prefill-dominated traces) due to cache-write permutation and quantization overhead during FlashAttention-3 BF16 prefill.

### Why Qwen2 Reasoning Collapses (and the Layer-0 Fix)

Quantizing KV caches to 4 bits without architectural guardrails destroys accuracy on modern reasoning models. `kv4-hopper` pairs its kernel with four specific accuracy steps:
1. **Static per-channel K mean removal** ($\tilde{K} = K - \mu_K$), calibrated once per model (`bench/calib_kv.py`).
2. **Hadamard rotation** of mean-removed keys.
3. **4 BF16 sink tokens** per sequence (`merge.cu`).
4. **Layer 0 kept in BF16.**

The interaction between steps 1 and 2 explains a counter-intuitive failure on Qwen3-8B-Base. Applying Hadamard rotation alone on Qwen3-8B-Base causes NVFP4 KL divergence against BF16 to spike to **0.210** (+1.38 perplexity), which is 18x worse than removing the mean first (**KL 0.0114, +0.041 perplexity**). In Qwen3, roughly half of $K$'s total energy sits in a single static per-channel mean vector shared across all tokens. Rotating before subtracting that mean smears a massive outlier spike across every 16-element NVFP4 group. Removing $\mu_K$ first solves this at zero read-time cost because $q \cdot \mu_K$ is constant across all cached positions.

Even more striking is the discovery in **Qwen2-family models** (such as Qwen2.5-7B-Instruct and DeepSeek-R1-Distill-Qwen-7B), whose reasoning outputs collapse under *both* 4-bit and FP8 KV quantization. The paper proves that Layer 0's massive key mean originates almost entirely from the model's learned `k_proj` bias vector passed through RoPE, which can be calculated analytically from the weights alone. Keeping Layer 0 in BF16 completely restores FP8 KV accuracy and, paired with K mean removal, stabilizes 4-bit KV across repeated MATH-500 runs:

| Model (vLLM 0.33, MATH-500) | Runs | BF16 KV (%) | kv4-hopper NVFP4 (%) | Delta [95% CI] |
| :--- | :--- | :--- | :--- | :--- |
| Qwen2.5-7B-Instruct | 5 | 71.2 | **72.0** | +0.8 [-1.6, +3.3] ($p = 0.49$) |
| DeepSeek-R1-Distill-Qwen-7B | 5 | 70.8 | **71.2** | +0.4 [-2.0, +3.1] ($p = 0.71$) |
| DeepSeek-R1-Distill-Llama-8B | 3 | 67.7 | **67.7** | +0.07 [-3.1, +3.3] ($p = 1.0$) |
| Phi-4 | 3 | 75.3 | **74.1** | -1.2 [-3.5, +1.1] ($p = 0.33$) |
| Qwen3-32B (thinking on, 16K) | 3 | 90.0 | **90.3** | +0.3 [-2.7, +3.2] ($p = 0.89$) |

Across 450 paired RULER-style multi-key and variable-tracking trials from 32K to 120K tokens on Llama-3-8B-ProLong-512k-Instruct, `kv4-hopper` registers +0.6 points over BF16, staying within run-to-run numerical noise.

### The Production Dilemma for Hopper Clusters

Two real engineering limitations remain in the current `kv4-hopper` release. First, the kernel targets GQA groups of 1 to 8 query heads per KV head at head dimension $d = 128$, meaning DeepSeek-style Multi-Head Latent Attention (MLA), $d = 64/256$, and sliding-window layers are currently out of scope. Second, because prefill pays a 1.5%-7% quantization and permutation tax, 4-bit KV caching degrades pure summarization or short-output prefill workloads.

For infrastructure teams running long-context reasoning models (7B to 72B GQA) on Hopper H100/H200 clusters where decode concurrency and KV VRAM dictate cluster cost, enabling register-direct 4-bit KV caching beats FP8 on both latency and capacity. If your traffic profile is prefill-dominated with short outputs, or relies on MLA compression, stay on BF16 or native FP8 until Blackwell FP4 hardware replaces your fleet.
:::

---

### Sources
- Primary Research Paper: [arXiv:2611.30027: Fast 4-bit KV-Cache Decoding on Hopper GPUs: Why vLLM's 4-bit Paths Are Slow and How to Fix Them](https://arxiv.org/abs/2611.30027)
- Official Code Repository: [github.com/thomaszhang2661/kv4-hopper](https://github.com/thomaszhang2661/kv4-hopper)
- Serving Engine Context: [vLLM Documentation](https://docs.vllm.ai/)
