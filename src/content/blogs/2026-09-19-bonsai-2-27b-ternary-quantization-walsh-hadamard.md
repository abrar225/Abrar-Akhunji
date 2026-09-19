---
title: "Ternary Bonsai 2 27B Dissection: 1.58-Bit Weights, Walsh-Hadamard Rotations, and Why Integer Addition Replaces FP GEMMs on Consumer Hardware"
date: "2026-09-19"
description: "A senior systems engineer's architectural breakdown of PrismML's Bonsai 2 27B: how ternary quantization ({−1, 0, +1}) and offline Walsh-Hadamard matrix rotations compress a 27B frontier model to 5.9 GB with 98.2% performance retention, the SIMD/Metal addition-kernel mechanics replacing floating-point GEMM, and the hidden KV-cache memory inversion at 262k context."
tags: ["Ternary Quantization", "Bonsai 2", "Model Compression", "Walsh-Hadamard Transform", "llama.cpp", "MLX", "LLM Inference", "Qwen 3.8", "Systems Architecture"]
author: "Abrar Akhunji"
heroImage: "/images/blog/bonsai-2-27b-ternary-quantization-walsh-hadamard/hero.jpg"
techTree:
  branch: "Systems & Inference"
  level: 3
  prerequisites: ["2026-08-23-kv-cache-agentic-inference-vllm-sglang", "2026-09-15-paddock-rust-cuda-inference-engine-vllm-sglang"]
faq:
  - question: "What is Bonsai 2 27B and who created it?"
    answer: "Bonsai 2 27B is an ultra-compact multimodal foundation model released on September 17, 2026, by AI systems research firm PrismML. It compresses Alibaba's Qwen3.8 27B base architecture down from 54 GB in FP16 to 5.9 GB using end-to-end ternary quantization ({−1, 0, +1}) and offline randomized Walsh-Hadamard transforms, achieving 98.2% aggregate benchmark parity."
  - question: "How does ternary quantization achieve 1.58 bits per parameter?"
    answer: "In ternary representation, each neural network weight is constrained to a discrete trinary alphabet: {-1, 0, +1}. The theoretical information entropy of three states is log2(3) ≈ 1.58496 bits. In practical binary storage, weights are bit-packed using custom encodings (such as 1.76 bpw in PTQ1_0 or 2-bit unpacked 2.0 bpw in PQ2_0) along with FP16 block-level scaling factors."
  - question: "Why is the Walsh-Hadamard Transform (WHT) required for ternary quantization?"
    answer: "Aggressive sub-2-bit quantization typically suffers catastrophic perplexity blowups due to 'activation outliers'—sparse channels in hidden states that exhibit 10x-100x higher magnitudes. The randomized Walsh-Hadamard Transform orthogonally rotates the activation and weight spaces offline and at runtime, dispersing outlier energy uniformly across all dimensions so no single feature clips or distorts when rounded to {-1, 0, +1}."
  - question: "Why does ternary inference replace floating-point GEMM with integer addition?"
    answer: "Because weights only take values in {-1, 0, +1}, the core inner product W · x no longer requires floating-point multiply-accumulate (MAC) circuits. Multiplying by +1 is an identity copy, multiplying by -1 is a sign negation, and multiplying by 0 is an accumulator skip. The matrix multiplication reduces to pure integer additions, subtractions, and hardware popcount operations."
  - question: "Why can't mainline llama.cpp or stock Ollama run Bonsai 2 27B out-of-the-box?"
    answer: "Mainline llama.cpp and Ollama assume traditional quantization layouts (INT4/INT8/FP16) where activations undergo standard BLAS GEMM. Bonsai 2 requires an activation-side fast Walsh-Hadamard transform kernel before layer entry, followed by specialized SIMD/Metal ternary matrix-vector addition routines. Users must run PrismML's custom llama.cpp or MLX forks until upstream PRs merge."
  - question: "What is the 'Memory Inversion' dilemma at 262k context?"
    answer: "While Bonsai 2 compresses static model weights down to 5.9 GB, active KV-cache requirements remain tied to sequence length. At 262,144 context tokens, an uncompressed FP16 KV-cache for a 27B model requires over 32 GB of RAM—more than 5x the weight footprint of the model itself. Deploying 1.58-bit models on consumer 8GB-16GB silicon requires aggressive KV-cache quantization (INT4/FP8) or sliding-window attention."
  - question: "What is the difference between the PTQ1_0 and PQ2_0 GGUF formats?"
    answer: "PTQ1_0 is a packed 1.76 bits-per-weight format that achieves the smallest footprint (5.9 GB) by packing trits into base-3 byte representations, ideal for memory-bandwidth-constrained setups. PQ2_0 uses a slightly larger 2.16 bpw layout that aligns ternary values to 2-bit boundaries, reducing CPU unpack overhead and delivering up to 18% higher decode throughput on AVX-512 and ARM NEON architectures."
---

:::eli5
*Written by Abrar Akhunji*

Imagine you want to pack an enormous 27-volume encyclopedia into a tiny pocket backpack. 

Normally, each word in the encyclopedia is written with excruciatingly fine precision—using decimal numbers with 16 digits of detail (**FP16 floating-point numbers**). Storing all 27 billion words this way takes **54 gigabytes of memory**, meaning you need an expensive, loud, power-hungry $2,000 graphics card just to open the book.

On **September 17, 2026**, AI lab **PrismML** released **Bonsai 2 27B**, proving we’ve been doing the math wrong all along.

Instead of writing down 16-digit decimals for every single concept, they converted every single connection in the brain of the AI into just three simple states:
- **+1** (Turn it on / agree)
- **0** (Ignore it completely)
- **-1** (Turn it off / disagree)

Because there are only three options, each connection takes only **1.58 bits of computer memory** instead of 16 bits! The entire 27-billion-parameter brain collapses from **54 GB down to just 5.9 GB**. 

Suddenly, a massive frontier-grade intelligence can run smoothly on an ordinary MacBook Air or an inexpensive consumer PC with only 8GB of RAM.

**The Clever Trick: The Walsh-Hadamard Magic Mirror**
In normal AI models, certain ideas shout 100 times louder than others (called *activation outliers*). If you force those loud ideas into just (+1, 0, -1), the AI gets brain damage and outputs gibberish. 
To fix this, PrismML used a mathematical mirror trick called the **Walsh-Hadamard Transform**. It tilts and spreads the loud ideas evenly across the entire room before doing the math, so nothing gets distorted or clipped.

**The Golden Takeaway for Developers:**
When weights are only +1, 0, and -1, computers don't even need heavy floating-point multiplication units anymore. The processor doesn't multiply—it just adds, subtracts, or skips! It’s cooler, consumes a fraction of the electricity, and brings 27-billion-parameter local AI to the laptop in your backpack.
:::

:::dev
*Written by Abrar Akhunji*

On September 17, 2026, AI research and systems engineering collective **PrismML** officially published **Ternary Bonsai 2 27B**, an open-weights multimodal foundation model derived from Alibaba’s **Qwen3.8 27B** architecture. 

For the past two years, the open-source inference community on `/r/LocalLLaMA` and developer channels like WTF-Code have chased post-training quantization (PTQ) schemes: AWQ, GPTQ, EXL2, and standard GGUF k-quants (`Q4_K_M`, `IQ3_XXS`). Yet, pushing weights below 3 bits per weight (bpw) historically triggered steep degradation in perplexity, chain-of-thought coherence, and HumanEval coding benchmarks.

Bonsai 2 27B represents a seismic architectural milestone:
- **5.9 GB Total Weight Footprint:** Down from **54 GB** in standard FP16/BF16—a **9.15x parameter compression ratio**.
- **98.2% Benchmark Retention:** Retains 98.2% of Qwen3.8 27B's base scores across MMLU-Pro, HumanEval, and GSM8K.
- **Pure Integer Addition Kernels:** Replaces compute-heavy floating-point Multiply-Accumulate (FP-MAC) units with low-power addition/subtraction accumulations.
- **Zero Outlier Destruction via Walsh-Hadamard Rotations:** Solves sub-2-bit quantization collapse by mathematically dispersing channel activation spikes across orthogonal hyperplanes.

```
+-----------------------------------------------------------------------------------------+
| BONSAI 2 27B ARCHITECTURAL PROFILE & INFERENCE PARAMETERS                               |
+--------------------------+--------------------------------------------------------------+
| Base Architecture        | Qwen3.8 27B (Dense Transformer + Multimodal Vision Tower)     |
| Lead Systems Lab         | PrismML (Released September 17, 2026 under Apache 2.0)       |
| Weight Precision         | Trinary Alphabet W ∈ {-1, 0, +1} (Theoretical: 1.58 bpw)     |
| Physical GGUF Formats    | PTQ1_0 (1.76 bpw: 5.9 GB) | PQ2_0 (2.16 bpw: 7.2 GB)        |
| Scaling Granularity      | Block-wise FP16/BF16 Scale Factors (Group Size = 128)        |
| Outlier Invariant        | Block-wise Randomized Walsh-Hadamard Transform (R-WHT)       |
| Arithmetic Core          | GEMM replaced by integer sign-flip additions & popcount      |
| Context Window           | 262,144 Tokens (Rotary Position Embeddings with YaRN)        |
| Memory Bandwidth Peak    | Up to 143 tokens/sec on RTX 5090; 48 tokens/sec on M3 Max     |
| Primary Runtime Support  | PrismML custom fork of llama.cpp (AVX-512/NEON) & MLX Metal   |
+--------------------------+--------------------------------------------------------------+
```

---

### Section 1: The Mathematics of 1.58-Bit Weights & Trinary Information Entropy

To understand why ternary models are radically different from standard INT4 or INT8 integer quantization, we must revisit the information-theoretic foundation established by the seminal BitNet b1.58 research.

In standard $b$-bit uniform quantization, an FP16 weight matrix $W \in \mathbb{R}^{M \times N}$ is scaled into a discrete integer lattice:

$$\hat{W} = \text{round}\left( \text{clamp}\left( \frac{W}{\gamma}, -2^{b-1}, 2^{b-1}-1 \right) \right)$$

where $\gamma$ is a dynamic scaling factor. In INT4 ($b=4$), the alphabet consists of 16 discrete states ($[-8, 7]$), consuming exactly 4 bits of physical memory per weight.

#### The 1.58-Bit Theoretical Limit
In trinary quantization, the weight alphabet is strictly restricted to:

$$\mathcal{A}_{\text{trinary}} = \{-1, 0, +1\}$$

The maximum information entropy $H$ of an unconstrained three-state discrete random variable is:

$$H(X) = \log_2(3) \approx 1.58496 \text{ bits/parameter}$$

Quantizing continuous FP16 weights into $\mathcal{A}_{\text{trinary}}$ is accomplished via an absolute-mean scaling objective:

$$\gamma = \frac{1}{M \cdot N} \sum_{i,j} |W_{i,j}|$$

$$\widetilde{W}_{i,j} = \text{RoundClip}\left( \frac{W_{i,j}}{\gamma}, -1, 1 \right) = \begin{cases} +1 & \text{if } W_{i,j} > 0.5 \cdot \gamma \\ 0 & \text{if } |W_{i,j}| \le 0.5 \cdot \gamma \\ -1 & \text{if } W_{i,j} < -0.5 \cdot \gamma \end{cases}$$

The reconstruction of the weight matrix is simply:

$$W \approx \gamma \cdot \widetilde{W}$$

Where $\gamma$ is retained as a single half-precision scalar per group (typically $G = 128$ parameters).

```
Continuous FP16 Weight Space vs. Discrete Ternary Lattice:

FP16 Continuum:  [--o---o--o--o-o-oo--o---o--o--o-o-oo--o--] (16 bits per number)
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
        Threshold: -0.5γ            Threshold: +0.5γ
             │                           │
Ternary: ────[-1]───────────[0]───────────[+1]──── (1.58 bits per weight)
```

At first glance, truncating 16-bit continuous values into just three discrete scalars seems like it should destroy the model's ability to perform nuanced linguistic and reasoning tasks. However, in models above 20 billion parameters, capacity is governed primarily by **parameter count and high-dimensional geometry**, rather than per-weight scalar precision.

---

### Section 2: Overcoming Activation Outliers with the Walsh-Hadamard Transform

The reason earlier attempts to run 1.58-bit post-training quantization on models like Llama 3 or Mistral failed was the **Activation Outlier Catastrophe**.

#### The Outlier Dilemma
In modern transformer architectures (especially those employing RMSNorm and SwiGLU activations), intermediate activations $X \in \mathbb{R}^{T \times D}$ exhibit extreme Kurtosis. While 99.9% of activation dimensions fluctuate between $[-2.0, +2.0]$, a tiny fraction of specific channels (e.g., channel 142 or 809) consistently spike to values between $[+80.0, +250.0]$.

These sparse, high-magnitude channels encode critical contextual coordination. If you perform ternary quantization directly on an unrotated weight matrix:

$$Y = X \cdot (\gamma \widetilde{W})$$

The massive dynamic range of the outlier channels causes severe clipping errors. The rounding error $\epsilon = W - \gamma \widetilde{W}$ is magnified by the outlier magnitude $X_{\text{outlier}}$, resulting in catastrophic perplexity spikes ($>10^4$).

```
THE ACTIVATION OUTLIER PROBLEM:
Activation Channels X:
Channel 0..141:   [ 0.12, -0.45,  0.89, -0.05, ...]  <-- Low dynamic range
Channel 142:      [+184.20]                          <-- MASSIVE OUTLIER SPIKE!
Channel 143..D:   [ 0.31, -0.18,  0.64,  0.02, ...]

When multiplied against a 1.58-bit quantized weight:
Error = |X_142 * (W_142 - Quant(W_142))| = 184.20 * 0.49 = 90.25 (CATASTROPHIC NOISE!)
```

#### The Randomized Walsh-Hadamard Rotation (R-WHT)
To solve this without needing to maintain expensive unquantized outlier matrices (as FP4/AWQ does), PrismML utilizes the mathematical elegance of **Orthogonal Matrix Rotations** (pioneered by QuaRot and QuIP#).

The Walsh-Hadamard matrix $H_n$ of order $2^n$ is a symmetric, orthogonal matrix containing only $+1$ and $-1$ entries, defined recursively:

$$H_0 = [1], \quad H_k = \frac{1}{\sqrt{2}} \begin{bmatrix} H_{k-1} & H_{k-1} \\ H_{k-1} & -H_{k-1} \end{bmatrix}$$

Because $H$ is orthogonal ($H^T H = I$), we can insert $H$ and $H^T$ between the activation and weight matrices without changing the mathematical output of the linear layer:

$$Y = X W = X (H^T H) W = (X H^T) (H W)$$

Let the rotated weights be $\bar{W} = H W$ and the rotated activations be $\bar{X} = X H^T$.

By applying this orthogonal rotation:
1. The extreme magnitude of the outlier channels is distributed uniformly across all $D$ dimensions via the Walsh-Hadamard projection.
2. The peak-to-average activation ratio drops from **>65.0 down to <2.3**.
3. The rotated weight matrix $\bar{W}$ is perfectly Gaussian, allowing uniform ternary quantization with virtually zero clipping error!

The rotation of $W$ into $\bar{W}$ is pre-computed **offline once** by PrismML during quantization. At inference time, the runtime only needs to perform the Fast Walsh-Hadamard Transform on incoming activations $\bar{X} = \text{FWHT}(X)$, which runs in $O(D \log D)$ time using zero floating-point multiplications—pure addition and subtraction butterflies!
:::

:::interactive concept
{
  "title": "Bonsai 2 27B: The 4-Phase Walsh-Hadamard Ternary Pipeline",
  "steps": [
    {
      "label": "1. Offline Rotation",
      "title": "Randomized Hadamard Projection",
      "content": "Full-precision weights W are multiplied offline by orthogonal Walsh-Hadamard matrices: W_rot = H · W. This spreads activation energy evenly across all orthogonal hyperplanes.",
      "icon": "RotateCcw"
    },
    {
      "label": "2. Ternary Discretization",
      "title": "Absolute-Mean Quantization",
      "content": "Rotated weights are segmented into groups of 128 parameters. Each group calculates scalar scale factor gamma = mean(|W_rot|) and rounds every weight to {-1, 0, +1}.",
      "icon": "Cpu"
    },
    {
      "label": "3. Bit-Packed Layout",
      "title": "PTQ1_0 / PQ2_0 Binary Packing",
      "content": "Trit states {-1, 0, +1} are packed into binary memory words. PTQ1_0 achieves 1.76 bpw via base-3 grouping, while PQ2_0 packs 4 trits per byte (2.0 bpw) for rapid SIMD decoding.",
      "icon": "Layers"
    },
    {
      "label": "4. Runtime FWHT & Addition",
      "title": "Multiplication-Free Inference",
      "content": "At inference, input activations undergo a Fast Walsh-Hadamard Transform O(D log D), then pass to addition-only accumulation kernels, eliminating FP GEMM silicon bottlenecks.",
      "icon": "CheckCircle"
    }
  ]
}
:::

:::dev
---

### Section 3: Hardware Execution: Replacing Floating-Point MACs with Integer Addition

The fundamental bottleneck of large language model inference during the autoregressive generation (token decode) phase is **Memory Bandwidth**. In standard FP16 or INT8 inference, execution is bounded by the speed at which weights can be pulled from VRAM into the compute cores.

However, once weights are compressed to 1.58 bits, memory traffic drops by **80% to 90%**, suddenly shifting the execution bottleneck toward kernel decompression overhead and vector ALU throughput.

```
CONVENTIONAL FP16 GEMM vs. TERNARY ADDITION KERNEL:

Standard GEMM Core (FP16/BF16):
┌───────────┐       ┌───────────┐
│ Weight    │ × FP  │ Activation│ ──> [ FP Multiply-Accumulate (MAC) ] ──> Output
└───────────┘       └───────────┘     (High power, wide silicon area, thermal throttling)

Bonsai 2 Ternary SIMD Kernel:
┌───────────┐       ┌───────────┐
│ Trits     │       │ Activation│
│ {-1, 0, +1│ ─────>│ (Rotated) │ ──> [ Multiplexer / Sign Inverter ]
└───────────┘       └───────────┘          │
                                           ├─ If +1: Accumulate (+X)
                                           ├─ If  0: Skip
                                           └─ If -1: Subtraction (-X)
                                      (Zero FP multipliers used! Pure Integer Addition)
```

#### How the Vector ALU Computes Inner Products Without Multiplying
Consider an inner product between a rotated activation vector $\mathbf{x} \in \mathbb{R}^{128}$ and a ternary weight vector $\mathbf{w} \in \{-1, 0, +1\}^{128}$:

$$\mathbf{y} = \gamma \sum_{i=1}^{128} w_i x_i = \gamma \left( \sum_{i \in \mathcal{S}^+} x_i - \sum_{i \in \mathcal{S}^-} x_i \right)$$

where:
- $\mathcal{S}^+ = \{i \mid w_i = +1\}$
- $\mathcal{S}^- = \{i \mid w_i = -1\}$
- Indices where $w_i = 0$ are completely omitted from memory accumulation.

On modern CPU architectures (x86 AVX-512 and ARM NEON) and Apple Silicon GPUs (Metal Shading Language), this inner product is executed via **bit-mask partitioning and vector addition**:
1. The 128 ternary weights are unpacked into two 128-bit bitmasks: `mask_pos` and `mask_neg`.
2. Hardware vector instructions use `_mm512_mask_add_ps` and `_mm512_mask_sub_ps` (or ARM `vaddq_f32` / `vsubq_f32`) to selectively add or subtract activations directly into the accumulator register.
3. Not a single floating-point multiplier circuit is energized during this step.
:::

:::interactive chart
{
  "title": "Bonsai 2 27B vs. SOTA Quantization Paradigms (27B Scale)",
  "description": "Comparative evaluation of memory footprint, decode throughput, and MMLU-Pro accuracy retention across inference formats",
  "type": "bar",
  "xKey": "format",
  "series": [
    { "dataKey": "memoryGB", "name": "VRAM Footprint (GB)", "color": "#EF4444" },
    { "dataKey": "tokensPerSec", "name": "Throughput (tok/s on RTX 5090)", "color": "#10B981" },
    { "dataKey": "accuracyPct", "name": "Accuracy Retention (%)", "color": "#6366F1" }
  ],
  "data": [
    { "format": "FP16 Baseline", "memoryGB": 54.2, "tokensPerSec": 32, "accuracyPct": 100.0 },
    { "format": "INT8 (SmoothQuant)", "memoryGB": 27.8, "tokensPerSec": 58, "accuracyPct": 99.4 },
    { "format": "INT4 (AWQ / Q4_K_M)", "memoryGB": 15.6, "tokensPerSec": 94, "accuracyPct": 96.8 },
    { "format": "IQ2_XXS (2.06 bpw)", "memoryGB": 7.8, "tokensPerSec": 62, "accuracyPct": 84.1 },
    { "format": "Bonsai 2 PTQ1_0 (Ternary)", "memoryGB": 5.9, "tokensPerSec": 143, "accuracyPct": 98.2 }
  ]
}
:::

:::dev
---

### Section 4: The Memory Inversion Dilemma: When the 262K KV-Cache Dwarfs Model Weights

While packing a 27-billion-parameter intelligence into **5.9 GB of VRAM** is an astonishing engineering achievement, deploying Bonsai 2 27B into production reveals a profound architectural shift: **The Memory Inversion Dilemma**.

In conventional models (FP16 or INT8), model weights dominate system memory:
- Model Weights: 54 GB
- KV-Cache (4,096 tokens, FP16): ~1.2 GB
- Ratio: Weights consume **98%** of available VRAM.

In Bonsai 2 27B with its **262,144 token context window**, the equation flips completely upside down!

```
THE MEMORY INVERSION PHENOMENON (At 262,144 Context Length):
┌────────────────────────────────────────────────────────┐
│ STATIC MODEL WEIGHTS (Bonsai 2 PTQ1_0):   5.9 GB       │
└────────────────────────────────────────────────────────┘
  ▲
  │ At short context (1k tokens), weights dominate.
  │ But as sequence length scales to 262k tokens...
  ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ACTIVE DYNAMIC KV-CACHE (FP16 @ 262k tokens):  32.8 GB                                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
  ▲
  CRITICAL: The KV-cache consumes 555% MORE memory than the entire neural network itself!
```

#### Calculating the KV-Cache Footprint for Qwen3.8 27B
The memory consumed by the key-value cache during generation is governed by:

$$\text{Memory}_{\text{KV}} = 2 \times L \times N_{\text{kv}} \times D_{\text{head}} \times P_{\text{bytes}} \times S$$

Where:
- $L = 64$ (Transformer layers)
- $N_{\text{kv}} = 8$ (Key-Value heads in Grouped Query Attention)
- $D_{\text{head}} = 128$ (Head dimension)
- $P_{\text{bytes}} = 2$ (FP16 precision)
- $S = \text{Sequence Length}$

Plugging in the parameters:

$$\text{Memory per token} = 2 \times 64 \times 8 \times 128 \times 2 = 262,144 \text{ bytes/token} = 0.25 \text{ MB/token}$$

At various context lengths:
- **4,096 tokens:** $4,096 \times 0.25 \text{ MB} = \mathbf{1.02 \text{ GB}}$ (Fits comfortably on an 8GB machine).
- **32,768 tokens:** $32,768 \times 0.25 \text{ MB} = \mathbf{8.19 \text{ GB}}$ (Already exceeds total weight memory!).
- **131,072 tokens:** $131,072 \times 0.25 \text{ MB} = \mathbf{32.76 \text{ GB}}$ (Requires an enterprise 48GB GPU).
- **262,144 tokens:** $262,144 \times 0.25 \text{ MB} = \mathbf{65.53 \text{ GB}}$ (Massive memory inversion).

#### Production Implication for Senior Engineers
If your goal is to deploy Bonsai 2 27B on consumer edge hardware (such as an Apple M2/M3 with 16GB Unified Memory, or an NVIDIA RTX 4070 12GB):
1. **You must quantize the KV-Cache:** Pair Bonsai 2 weights with `FP8` or `INT4` KV-cache quantization (`--cache-type-k q4_0 --cache-type-v q4_0`), cutting KV memory consumption by 50% to 75%.
2. **Context Window Capping:** Bound agentic working memory to 16k–32k tokens unless running on unified high-RAM workstations (64GB+ Apple Silicon or multi-GPU nodes).

---

### Section 5: Practical Implementation: Custom llama.cpp & Metal Kernel Walkthrough

Because standard upstream runtimes (stock Ollama, vLLM 0.10, mainline `llama.cpp`) lack the activation-side Fast Walsh-Hadamard Transform dispatch and ternary unpacking routines, attempting to run Bonsai 2 GGUF files in vanilla software will trigger:
`error: unsupported quant format: PTQ1_0 (id: 48)`.

Here is the production engineering blueprint for compiling and serving Bonsai 2 27B using the PrismML optimized runtime.

#### 1. Building the PrismML Ternary Inference Fork

```bash
# Clone the specialized PrismML llama.cpp fork supporting PTQ1_0 and WHT kernels
git clone --recurse-submodules https://github.com/PrismML-Eng/llama.cpp-ternary.git
cd llama.cpp-ternary

# Compile for Apple Silicon (Metal Accelerated)
cmake -B build -DGGML_METAL=ON -DGGML_ACCELERATE=ON
cmake --build build --config Release -j$(sysctl -n hw.ncpu)

# OR Compile for Linux / NVIDIA CUDA (with AVX-512 & CUDA Tensor Core additions)
cmake -B build -DGGML_CUDA=ON -DGGML_AVX512=ON -DCMAKE_CUDA_ARCHITECTURES="89;90"
cmake --build build --config Release -j$(nproc)
```

#### 2. Inspecting the Metal Shading Language Ternary Kernel
Below is the core Metal kernel routine implemented by PrismML engineers to execute ternary vector additions inside Apple Silicon threadgroups:

```metal
#include <metal_stdlib>
using namespace metal;

// PrismML Metal SIMD Kernel: Ternary Inner Product with Zero FP Multipliers
kernel void kernel_ternary_gemv_ptq1_0(
    device const uchar*     weights_packed  [[buffer(0)]], // 2-bit packed trits
    device const half*      activations_rot [[buffer(1)]], // WHT-rotated input vector
    device half*            output_vector   [[buffer(2)]],
    device const half*      group_scales    [[buffer(3)]], // FP16 group scales
    constant uint&          dim_k           [[buffer(4)]],
    uint2                   threadgroup_pos [[threadgroup_position_in_grid]],
    uint                    simd_lane_id    [[thread_index_in_simdgroup]]
) {
    const uint row = threadgroup_pos.x;
    const uint group_idx = (row * dim_k) / 128;
    
    half accumulator = 0.0h;
    
    // Each thread processes 8 trits packed in two bytes
    for (uint k = simd_lane_id * 8; k < dim_k; k += 32 * 8) {
        uchar packed_byte = weights_packed[(row * (dim_k / 4)) + (k / 4)];
        
        // Unroll 4 trits per byte (states: 00 = 0, 01 = +1, 10 = -1, 11 = reserved)
        #pragma unroll
        for (int trit_idx = 0; trit_idx < 4; ++trit_idx) {
            uchar code = (packed_byte >> (trit_idx * 2)) & 0x03;
            half act = activations_rot[k + trit_idx];
            
            // Branchless conditional addition/subtraction
            accumulator += (code == 1) ? act : ((code == 2) ? -act : 0.0h);
        }
    }
    
    // SIMD group reduction sum
    accumulator = simd_sum(accumulator);
    
    // Apply block-level scaling factor
    if (simd_lane_id == 0) {
        output_vector[row] = accumulator * group_scales[group_idx];
    }
}
```

#### 3. Serving via Local OpenAI-Compatible Daemon

```bash
# Launch local OpenAI-compatible endpoint with INT4 KV cache to conserve VRAM
./build/bin/llama-server \
  --model ./models/bonsai-2-27b-qwen3.8-ptq1_0.gguf \
  --ctx-size 32768 \
  --cache-type-k q4_0 \
  --cache-type-v q4_0 \
  --n-gpu-layers 99 \
  --threads 8 \
  --port 8080
```

---

### Section 6: Systems Takeaways & Technical Attribution

The launch of **Ternary Bonsai 2 27B** crystallizes a turning point in the economics of foundation model deployment:

1. **Sub-2-Bit Quantization is Solved via Coordinate Geometry:** The historic failure of low-bit quantization was not an intrinsic flaw of discrete weights; it was a geometric failure to manage activation spikes. The randomized Walsh-Hadamard Transform permanently eliminates the activation outlier barrier without consuming runtime overhead.
2. **The Death of Floating-Point Multiplications in Edge Decodes:** By replacing expensive FP-MAC units with simple integer multiplexing and additions, ternary neural networks cut power consumption by up to **65%**, opening the door for sustained, unthrottled inference on passive-cooled devices and mobile edge compute.
3. **The New Architecture Bottleneck is KV-Cache Memory:** With static weights compressed into single-digit gigabytes, future inference optimization efforts must focus aggressively on KV-cache compression (e.g., Cross-Layer Attention sharing, NSA native sparse attention, and aggressive 2-bit KV quantization).

**Primary References & Technical Attribution:**
- **Primary Model Release:** PrismML Research Team, *"Ternary Bonsai 2 27B: Breaking the 2-Bit Barrier via Rotated Hadamard Bases and Addition-Only Kernels"*, released September 17, 2026 (prismml.com/research/bonsai-2-27b).
- **Base Architecture:** Alibaba Cloud Qwen Team, *"Qwen3.8 Technical Report: Dense Transformer Architectures and Long-Horizon Agentic Reasoning"*, published September 2026 (github.com/QwenLM/Qwen3.8).
- **Foundational 1.58-bit Research:** Microsoft Research, *"The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits (BitNet b1.58)"*, Ma et al., arXiv:2402.17764.
- **Outlier Rotation Mechanics:** Tseng et al., *"QuIP#: Even Cheaper LLM Quantization with Hadamard Incoherence and Lattice Codes"* & Salehi et al., *"QuaRot: Outlier-Free 4-Bit Inference in Rotated LLMs"*.
- **Community Benchmarks & Discussion:** Technical analysis and SIMD unpack profiling hosted across Reddit `/r/LocalLLaMA` (*"Bonsai 2 27B Tested: 140 tok/s on Consumer Hardware"*, Sept 18, 2026) and WTF-Code (*"Running 27B Models on 8GB VRAM"*).
:::
