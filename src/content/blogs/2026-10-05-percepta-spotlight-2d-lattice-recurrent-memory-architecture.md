---
title: "Percepta Spotlight Deep Dive: Decoupling Intelligence from Memory with 2D Lattice Recurrent States and O(1) Token-Time Compute"
date: "2026-10-05"
description: "An architectural breakdown of Percepta's Spotlight release: how spatial 2D lattice addressing of recurrent cells breaks the Transformer KV-cache bottleneck, providing unbounded memory expansion with strict O(1) step complexity and native autoregressive program execution."
tags: ["Percepta Spotlight", "Memory Architecture", "Linear Attention", "Transformer Alternatives", "2D Lattice Memory", "LLM Inference", "Systems Engineering", "KV Cache"]
author: "Abrar Akhunji"
heroImage: "/images/blog/percepta-spotlight-2d-lattice-recurrent-memory-architecture/hero.jpg"
techTree:
  branch: "Sub-Quadratic Architectures & Neural Memory"
  level: 3
  prerequisites: ["2026-10-03-dots3-note-tempo-macro-step-policy-optimization", "2026-08-28-titans-neural-memory-nltm-test-time-learning"]
faq:
  - question: "What is Spotlight and who developed it?"
    answer: "Spotlight is a novel sparse neural memory architecture introduced by research lab Percepta in October 2026. It decouples an LLM's computational reasoning core (the intelligence module) from its long-term state storage (the memory module) by organizing memory as a continuous 2D spatial lattice of recurrent cells."
  - question: "How does Spotlight solve the Transformer KV-cache scaling problem?"
    answer: "Standard Transformers suffer from quadratic computational complexity O(T^2) and linear memory growth O(T), requiring the entire KV cache to be loaded from high-bandwidth memory for every generated token. Spotlight maps tokens to continuous 2D coordinates (u, v) and restricts reads and writes to localized patches of recurrent cells via differentiable kernels, achieving strict O(1) per-token compute regardless of sequence length."
  - question: "How does Spotlight differ from Linear Attention and State Space Models (SSMs) like Mamba?"
    answer: "Linear attention and SSMs compress all past history into a single, fixed-size hidden state vector. While this achieves O(1) inference, it suffers from a catastrophic information bottleneck, failing at exact associative recall or high-capacity multi-key retrieval. Spotlight maintains an expandable 2D grid of recurrent cells that allocates new cells upon first write, providing virtually unbounded storage while preserving O(1) step computation."
  - question: "What is the role of the Static Intelligence Core in Spotlight?"
    answer: "The intelligence core in Spotlight is a compact neural module (under 100K matrix parameters in minimal implementations) that handles execution semantics, control flow, and coordinate routing. Because the memory is external and structured as a writable 2D lattice, the model can acquire new capabilities, store evolving data, and host runtime environments without updating or fine-tuning its core weights."
  - question: "How does Spotlight execute code autoregressively within its memory?"
    answer: "Because each cell in the 2D lattice maintains a writable recurrent state that supports key rewrites and localized retrieval, the model can represent program symbol tables, stack frames, and AST execution states across dedicated coordinate regions. Percepta demonstrated hosting an entire Python runtime and package ecosystem inside Spotlight memory, allowing the model to simulate program execution step-by-step without an external sandbox."
  - question: "How well does Spotlight extrapolate beyond its training context length?"
    answer: "In empirical benchmarks, Spotlight demonstrates robust length generalization up to 16x beyond its training window. Because attention coordinates are normalized and localized to bounded cell neighborhoods, attention entropy does not collapse, and perplexity remains flat across sequences exceeding 1 million tokens."
---

:::eli5
*Written by Abrar Akhunji*

Imagine you are hired as the lead detective on a massive criminal investigation spanning 100,000 pages of evidence.

### The Problem with Today's AI: Two Bad Choices
Every modern AI model is forced to choose between two fundamentally flawed memory systems:

1. **The Standard Transformer (Llama, Claude, GPT-4): "The Exhausting Desk"**
   Every time the detective wants to write a single word, they must pick up **every single page** they have ever read, re-scan all of them from page 1 to 100,000, and calculate how each word relates to every other word. 
   - *Result:* Incredible precision, but your computer runs out of memory (the dreaded **KV-cache explosion**), and inference slows to a crawl as the document gets longer ($O(T^2)$ computational complexity).

2. **The Recurrent / Mamba Model: "The Shrinking Notebook"**
   To make things faster, models like Mamba or RWKV give the detective a tiny, fixed-size pocket notebook. As new evidence arrives, the detective scribbles over previous notes.
   - *Result:* Blazing fast, constant-speed writing ($O(1)$), but by page 500, the notebook is a smeared, unreadable blob of ink. The model forgets specific facts, numbers, and code variables.

---

### Percepta's Breakthrough: The "Spotlight" 2D Lattice
Announced in October 2026 by **Percepta**, the **Spotlight architecture** completely shatters this trade-off by separating **Thinking** from **Remembering**.

Instead of a giant stack of paper or a tiny pocket notebook, Spotlight gives the AI a **massive, expandable pinboard organized like a 2D map with GPS coordinates $(u, v)$**:

```
      Traditional Attention (KV-Cache)              Percepta Spotlight (2D Lattice)
      Every token scans EVERY previous token         Every token shines a narrow SPOTLIGHT
                                                     onto exact GPS coordinates (u, v)

      [ Token t ]                                    [ Token t ]
           │                                              │
           ├──> Scans Token 1 (Memory read)               ▼ Coordinates: (u=0.42, v=-0.18)
           ├──> Scans Token 2 (Memory read)          ┌───────────────────────────────────┐
           ├──> Scans Token 3 (Memory read)          │  2D LATTICE OF RECURRENT CELLS    │
           │    ...                                  │  [·] [·] [·] [·] [·] [·] [·] [·]  │
           └──> Scans Token 100,000!                 │  [·] [·] [🔦] [🔦] [·] [·] [·]    │
           (Cost blows up quadratically: O(T^2))     │  [·] [·] [🔦] [🔦] [·] [·] [·]    │
                                                     │  [·] [·] [·] [·] [·] [·] [·] [·]  │
                                                     └───────────────────────────────────┘
                                                     (Only reads 4-9 cells: Constant O(1)!)
```

### How Spotlight Works Under the Hood
1. **The Tiny Brain (Static Intelligence Core):** The part of the model that calculates logic, grammar, and arithmetic is tiny (under 100K parameters) and never needs retraining.
2. **The Coordinate GPS:** When the model sees a piece of data (e.g., `user_id = 94821`), it computes a continuous 2D location on the board, say $(u=0.74, v=-0.32)$.
3. **The Narrow Beam (The "Spotlight"):** Instead of reading the whole board, it shines a narrow flashlight beam over just a tiny $3 \times 3$ cluster of cells around those coordinates.
4. **Living Cells:** Each pin on the board is a tiny recurrent cell that can store, update, or overwrite information on the fly.
5. **Infinite Expansion with Zero Slowdown:** As you feed the model millions of tokens, the board simply adds more grid cells. But because the flashlight beam never gets bigger, **every single token generates at the exact same lightning-fast speed!**

Even more wild: Percepta demonstrated that you can store an entire **Python interpreter** and its library ecosystem directly inside these memory cells. The model can execute code inside its own memory lattice without needing an external computer!

Let’s dive into the tensor mathematics, continuous coordinate projections, PyTorch implementation, and inference benchmarks that make Spotlight tick.
:::

:::dev
*Written by Abrar Akhunji*

In sequence modeling and large foundation model design, the central systems engineering dilemma has long been framed as a Pareto frontier between **representational fidelity** and **computational complexity**:

- **Full Multi-Head Attention (MHA/GQA):** Delivers optimal associative recall and in-context learning by computing pairwise dot-products across all $T$ positions. However, it incurs quadratic prefill complexity $\mathcal{O}(T^2)$ and demands linear memory allocation $\mathcal{O}(T \cdot d \cdot L)$ for the Key-Value (KV) cache. In long-horizon deployments (128K to 1M+ tokens), the KV cache saturates GPU High-Bandwidth Memory (HBM) and degrades arithmetic intensity into a memory-bandwidth-bound bottleneck.
- **Linear Attention & State Space Models (Mamba, RWKV, GLA):** Achieve $\mathcal{O}(1)$ autoregressive step latency and $\mathcal{O}(T)$ linear prefill by compressing history into a fixed-dimensional recurrence state $\mathbf{h}_t \in \mathbb{R}^{d_h}$. However, the fixed state size creates an immutable information-theoretic capacity limit, leading to catastrophic degradation on multi-needle retrieval, associative key rewrites, and algorithmic state tracking.

In October 2026, **Percepta** introduced **Spotlight**, a sub-quadratic neural architecture that resolves this tension by introducing **spatially addressed, continuous 2D lattice recurrent memory**. 

Spotlight completely decouples the **computational intelligence module** (which executes control flow and semantic transformations) from an **external writable memory substrate**. By projecting queries and keys into a 2D continuous coordinate space and routing reads and writes through localized differentiable kernels, Spotlight achieves **unbounded memory capacity with strict $\mathcal{O}(1)$ step latency**.

```
+---------------------------------------------------------------------------------------------------+
| COMPARATIVE SEQUENCE MEMORY TAXONOMY (OCTOBER 2026)                                               |
+--------------------------+-----------------------+-----------------------+------------------------+
| Dimension                | Standard Transformer  | Linear Attention/SSM  | Percepta Spotlight     |
+--------------------------+-----------------------+-----------------------+------------------------+
| Step Time Complexity     | O(T) memory access    | O(1) constant FLOPs   | O(1) localized patch   |
| Total Prefill Complexity | O(T^2) quadratic      | O(T) linear           | O(T) linear            |
| Memory State Footprint   | O(T) unbounded KV     | O(1) fixed compressed | O(M) dynamically alloc |
| Associative Recall Cap   | High (lossless)       | Low (lossy bottleneck)| High (lossless patch)  |
| Key Rewrite Capability   | Append-only (static)  | Diffuse decay         | Exact in-place update  |
| Length Extrapolation     | Severe entropy drift  | Finite state decay    | Up to 16x zero-shot    |
| Intelligence Coupling    | Entangled with KV     | Entangled with state  | Decoupled static core  |
+--------------------------+-----------------------+-----------------------+------------------------+
```

---

### Section 1: The Mathematical Formulation of Spotlight

To understand how Spotlight achieves constant per-token computational complexity while scaling memory capacity arbitrarily, we formalize its continuous coordinate projection and differentiable kernel addressing.

#### 1. Continuous Coordinate Projection

Let $\mathbf{x}_t \in \mathbb{R}^{d_{\text{model}}}$ denote the input token embedding at time step $t$. The model projects $\mathbf{x}_t$ into a query vector $\mathbf{q}_t$, key vector $\mathbf{k}_t$, value vector $\mathbf{v}_t$, and spatial coordinate pairs $\mathbf{c}_t^{\text{read}}, \mathbf{c}_t^{\text{write}} \in \mathbb{R}^2$:

$$\mathbf{q}_t = \mathbf{x}_t \mathbf{W}_q, \quad \mathbf{k}_t = \mathbf{x}_t \mathbf{W}_k, \quad \mathbf{v}_t = \mathbf{x}_t \mathbf{W}_v$$

$$\mathbf{c}_t^{\text{write}} = \tanh(\mathbf{x}_t \mathbf{W}_{\text{coord}, w}) \in [-1, 1]^2$$

$$\mathbf{c}_t^{\text{read}} = \tanh(\mathbf{x}_t \mathbf{W}_{\text{coord}, r}) \in [-1, 1]^2$$

Where $\mathbf{W}_{\text{coord}, w}, \mathbf{W}_{\text{coord}, r} \in \mathbb{R}^{d_{\text{model}} \times 2}$. The continuous coordinates map the token to a position $(u_t, v_t)$ on a 2D plane.

#### 2. The 2D Lattice Discretization

The physical memory is organized as a 2D discrete lattice of recurrent cells $\mathcal{L} = \{ C_{i, j} \mid i \in \{1, \dots, N_u\}, j \in \{1, \dots, N_v\} \}$, where each cell $C_{i, j}$ possesses a fixed coordinate center:

$$\mathbf{p}_{i, j} = \left( \frac{2i - N_u - 1}{N_u}, \frac{2j - N_v - 1}{N_v} \right) \in [-1, 1]^2$$

Each cell $C_{i, j}$ maintains its own recurrent hidden state $\mathbf{h}_{i, j} \in \mathbb{R}^{d_h}$.

```
SPOTLIGHT 2D LATTICE TOPOLOGY:
 
  v ^  (-1, 1)                           (1, 1)
    │   ┌──────┬──────┬──────┬──────┬──────┐
    │   │ C_1,5│ C_2,5│ C_3,5│ C_4,5│ C_5,5│
    │   ├──────┼──────┼──────┼──────┼──────┤
    │   │ C_1,4│ C_2,4│ [░░] │ [██] │ C_5,4│  <── Localized Spotlight Kernel
    │   ├──────┼──────┼──────┼──────┼──────┤      Concentration at (u_t, v_t)
    │   │ C_1,3│ C_2,3│ [██] │ [░░] │ C_5,3│
    │   ├──────┼──────┼──────┼──────┼──────┤
    │   │ C_1,2│ C_2,2│ C_3,2│ C_4,2│ C_5,2│
    │   ├──────┼──────┼──────┼──────┼──────┤
    │   │ C_1,1│ C_2,1│ C_3,1│ C_4,1│ C_5,1│
    └───┴──────┴──────┴──────┴──────┴──────┴───> u
       (-1, -1)                          (1, -1)
```

#### 3. Differentiable Spotlight Addressing Kernel

Instead of performing an exhaustive inner product over all cells, Spotlight uses a localized, differentiable radial basis function (RBF) kernel with learned spatial bandwidth $\sigma$:

$$\kappa(\mathbf{c}, \mathbf{p}_{i, j}) = \exp\left( -\frac{\|\mathbf{c} - \mathbf{p}_{i, j}\|_2^2}{2\sigma^2} \right)$$

To enforce strict $\mathcal{O}(1)$ computation, the kernel is evaluated **strictly over the $K \times K$ neighborhood** $\mathcal{N}(\mathbf{c})$ surrounding the nearest discrete lattice anchor $\lfloor \mathbf{c} \rceil$:

$$\mathcal{N}(\mathbf{c}) = \left\{ C_{i, j} \mid |i - \hat{i}| \le \left\lfloor \frac{K}{2} \right\rfloor, |j - \hat{j}| \le \left\lfloor \frac{K}{2} \right\rfloor \right\}$$

The normalized kernel attention weights $w_{i, j}$ within neighborhood $\mathcal{N}(\mathbf{c})$ are computed via softmax:

$$w_{i, j}(\mathbf{c}) = \frac{\kappa(\mathbf{c}, \mathbf{p}_{i, j})}{\sum_{C_{a, b} \in \mathcal{N}(\mathbf{c})} \kappa(\mathbf{c}, \mathbf{p}_{a, b})}$$

#### 4. Gated Recurrent Write Dynamics

When writing value $\mathbf{v}_t$ to memory at coordinates $\mathbf{c}_t^{\text{write}}$, each cell $C_{i, j} \in \mathcal{N}(\mathbf{c}_t^{\text{write}})$ updates its recurrent state using a gated balance between retention and injection:

$$\alpha_{i, j}^{(t)} = \sigma\left( \mathbf{v}_t \mathbf{W}_{\text{gate}} \right) \cdot w_{i, j}\left(\mathbf{c}_t^{\text{write}}\right)$$

$$\mathbf{h}_{i, j}^{(t)} = \left( 1 - \alpha_{i, j}^{(t)} \right) \mathbf{h}_{i, j}^{(t-1)} + \alpha_{i, j}^{(t)} \cdot \left( \mathbf{v}_t \mathbf{W}_{\text{write}} \right)$$

This allows exact, localized **in-place overwriting** of stale variables without disrupting memory stored in distant spatial coordinates.

#### 5. Localized Query Read Dynamics

To retrieve information, the query vector $\mathbf{q}_t$ reads from the neighborhood $\mathcal{N}(\mathbf{c}_t^{\text{read}})$:

$$\mathbf{y}_t = \sum_{C_{i, j} \in \mathcal{N}(\mathbf{c}_t^{\text{read}})} w_{i, j}\left(\mathbf{c}_t^{\text{read}}\right) \cdot \left( \mathbf{h}_{i, j}^{(t)} \mathbf{W}_{\text{read}} \right)$$

The final retrieved vector $\mathbf{y}_t \in \mathbb{R}^{d_{\text{model}}}$ is passed to the output projection and added via residual connection into the Transformer block.

Because $|\mathcal{N}(\mathbf{c})| = K^2$ is a fixed constant (typically $K=3$ or $K=5$), **the entire read and write operation requires exactly $K^2 \cdot d$ operations per token**, completely decoupling inference FLOPs from context length $T$.

---

### Section 2: Complete PyTorch Reference Implementation

The following production-grade PyTorch implementation provides a complete reference for the `Spotlight2DLatticeMemory` sub-layer, featuring continuous coordinate generation, localized neighborhood extraction, gated recurrent state updates, and forward reading.

```python
"""
spotlight_lattice_memory.py
Production-grade PyTorch reference implementation of Percepta's Spotlight 
2D Lattice Recurrent Memory Architecture.
"""

import math
from typing import Optional, Tuple
import torch
import torch.nn as nn
import torch.nn.functional as F


class Spotlight2DLatticeMemory(nn.Module):
    """
    Spotlight 2D Lattice Memory Layer.
    Maps tokens to continuous 2D coordinates (u, v) and interacts with a 
    dynamically addressable grid of recurrent state cells with O(1) step cost.
    """
    def __init__(
        self,
        d_model: int = 2048,
        d_cell: int = 512,
        grid_size: int = 64,       # 64x64 = 4,096 recurrent cells per head
        num_heads: int = 8,
        kernel_window: int = 3,    # 3x3 localized spotlight patch (K=3)
        init_sigma: float = 0.25
    ):
        super().__init__()
        self.d_model = d_model
        self.d_cell = d_cell
        self.grid_size = grid_size
        self.num_heads = num_heads
        self.kernel_window = kernel_window
        self.patch_radius = kernel_window // 2

        # Linear projections for Query, Key, Value
        self.w_q = nn.Linear(d_model, num_heads * d_cell, bias=False)
        self.w_k = nn.Linear(d_model, num_heads * d_cell, bias=False)
        self.w_v = nn.Linear(d_model, num_heads * d_cell, bias=False)
        self.w_out = nn.Linear(num_heads * d_cell, d_model, bias=False)

        # Coordinate projection matrices: emit (u, v) coordinates in [-1, 1]
        self.w_coord_write = nn.Linear(d_model, num_heads * 2, bias=True)
        self.w_coord_read = nn.Linear(d_model, num_heads * 2, bias=True)

        # Gating parameter for in-place write retention
        self.w_gate = nn.Linear(d_model, num_heads, bias=True)

        # Trainable kernel bandwidth log_sigma per head
        self.log_sigma = nn.Parameter(torch.full((num_heads,), math.log(init_sigma)))

        # Precompute normalized lattice coordinate anchors
        ticks = torch.linspace(-1.0, 1.0, grid_size)
        grid_u, grid_v = torch.meshgrid(ticks, ticks, indexing="ij")
        # Shape: [grid_size, grid_size, 2]
        self.register_buffer("lattice_coords", torch.stack([grid_u, grid_v], dim=-1))

    def _get_localized_patch(
        self,
        coords: torch.Tensor, # [batch, num_heads, 2]
    ) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """
        Maps continuous coordinates (u, v) to discrete anchor indices and
        extracts the KxK localized neighborhood bounding box.
        """
        batch_size, num_heads, _ = coords.shape
        # Convert continuous [-1, 1] to discrete index [0, grid_size - 1]
        scaled = (coords + 1.0) * 0.5 * (self.grid_size - 1)
        center_idx = torch.round(scaled).long().clamp(
            self.patch_radius, 
            self.grid_size - 1 - self.patch_radius
        ) # [batch, num_heads, 2]

        # Generate KxK relative offsets
        offsets = torch.arange(
            -self.patch_radius, 
            self.patch_radius + 1, 
            device=coords.device
        )
        du, dv = torch.meshgrid(offsets, offsets, indexing="ij")
        patch_offsets = torch.stack([du.flatten(), dv.flatten()], dim=-1) # [K^2, 2]

        # Expand patch indices: [batch, num_heads, K^2, 2]
        patch_indices = center_idx.unsqueeze(2) + patch_offsets.view(1, 1, -1, 2)
        
        # Gather spatial coordinates for the patch
        # lattice_coords: [grid_size, grid_size, 2]
        u_idx = patch_indices[..., 0]
        v_idx = patch_indices[..., 1]
        patch_anchor_coords = self.lattice_coords[u_idx, v_idx] # [batch, num_heads, K^2, 2]

        # Compute radial basis kernel weights: exp(- ||c - p||^2 / (2 * sigma^2))
        diff = patch_anchor_coords - coords.unsqueeze(2) # [batch, num_heads, K^2, 2]
        dist_sq = torch.sum(diff ** 2, dim=-1)          # [batch, num_heads, K^2]
        
        sigma = torch.exp(self.log_sigma).view(1, -1, 1) # [1, num_heads, 1]
        kernel_logits = -dist_sq / (2.0 * (sigma ** 2) + 1e-6)
        patch_weights = F.softmax(kernel_logits, dim=-1) # [batch, num_heads, K^2]

        return u_idx, v_idx, patch_weights

    def forward_token(
        self,
        x_t: torch.Tensor,                      # [batch, d_model]
        memory_state: torch.Tensor             # [batch, num_heads, grid_size, grid_size, d_cell]
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Processes a single token autoregressively with strict O(1) FLOP complexity.
        """
        batch_size = x_t.shape[0]

        # 1. Projections
        q_t = self.w_q(x_t).view(batch_size, self.num_heads, self.d_cell)
        v_t = self.w_v(x_t).view(batch_size, self.num_heads, self.d_cell)
        
        write_coords = torch.tanh(self.w_coord_write(x_t)).view(batch_size, self.num_heads, 2)
        read_coords = torch.tanh(self.w_coord_read(x_t)).view(batch_size, self.num_heads, 2)
        write_gate = torch.sigmoid(self.w_gate(x_t)).view(batch_size, self.num_heads, 1)

        # 2. Extract Read Patch and Aggregate Output
        read_u, read_v, read_weights = self._get_localized_patch(read_coords)
        
        # Batch index gather over memory state: [batch, num_heads, K^2, d_cell]
        batch_idx = torch.arange(batch_size, device=x_t.device).view(-1, 1, 1, 1)
        head_idx = torch.arange(self.num_heads, device=x_t.device).view(1, -1, 1, 1)
        
        gathered_states = memory_state[
            batch_idx, 
            head_idx, 
            read_u.unsqueeze(-1), 
            read_v.unsqueeze(-1), 
            torch.arange(self.d_cell, device=x_t.device)
        ] # [batch, num_heads, K^2, d_cell]

        # Read readout: weighted sum over localized K^2 patch
        read_out = torch.sum(gathered_states * read_weights.unsqueeze(-1), dim=2)
        # Combine with query projection
        head_out = read_out * q_t # [batch, num_heads, d_cell]
        output = self.w_out(head_out.reshape(batch_size, -1))

        # 3. In-Place Gated Write Update to 2D Lattice
        write_u, write_v, write_weights = self._get_localized_patch(write_coords)
        alpha = (write_gate * write_weights).unsqueeze(-1) # [batch, num_heads, K^2, 1]

        # Update specific localized memory cells
        # New cell state = (1 - alpha) * old_state + alpha * v_t
        old_write_states = memory_state[
            batch_idx, 
            head_idx, 
            write_u.unsqueeze(-1), 
            write_v.unsqueeze(-1), 
            torch.arange(self.d_cell, device=x_t.device)
        ]
        new_write_states = (1.0 - alpha) * old_write_states + alpha * v_t.unsqueeze(2)

        # Write back to lattice memory tensor
        updated_memory = memory_state.clone()
        updated_memory[
            batch_idx,
            head_idx,
            write_u.unsqueeze(-1),
            write_v.unsqueeze(-1),
            torch.arange(self.d_cell, device=x_t.device)
        ] = new_write_states

        return output, updated_memory
```

---

### Section 3: The 5-Stage Spotlight Memory Lifecycle

The interactive architectural diagram below details how incoming tokens map to continuous coordinates, trigger localized kernel spotlights, update the 2D lattice in-place, and retrieve state with constant-time efficiency.

:::interactive concept
{
  "title": "The 5-Stage Spotlight 2D Lattice Memory Execution Lifecycle",
  "steps": [
    {
      "label": "Stage 1",
      "title": "Continuous Coordinate Projection",
      "content": "The token representation is projected via linear transformations into normalized continuous 2D coordinates (u, v) in [-1, 1]^2 for both reading and writing.",
      "icon": "Crosshair"
    },
    {
      "label": "Stage 2",
      "title": "Localized Spotlight Kernel Synthesis",
      "content": "A differentiable radial basis function (RBF) evaluates kernel affinity strictly across a localized KxK patch of neighboring lattice anchors, yielding normalized weights.",
      "icon": "Sun"
    },
    {
      "label": "Stage 3",
      "title": "Constant-Time Neighborhood Read",
      "content": "The query gathers states from the KxK cell neighborhood via weighted dot-product, bypassing the need to scan any historical sequence tokens (O(1) step latency).",
      "icon": "Eye"
    },
    {
      "label": "Stage 4",
      "title": "Gated In-Place Recurrent State Update",
      "content": "Selected memory cells execute in-place state updates using learned retention gates, writing new information while preserving unrelated spatial lattice regions.",
      "icon": "Edit3"
    },
    {
      "label": "Stage 5",
      "title": "Static Intelligence Output Synthesis",
      "content": "The retrieved state is merged with the static core representations and routed into the next transformer layer with zero KV-cache memory allocation.",
      "icon": "Cpu"
    }
  ]
}
:::

---

### Section 4: Empirical Benchmarks & Comparative Scaling

To evaluate the operational performance of Percepta's Spotlight, benchmarks were conducted across **1 Million token sequences**, measuring **KV-Cache Memory Footprint (GB)**, **Per-Token Generation Latency (ms)**, **Multi-Needle Retrieval Accuracy at 512K context (%)**, and **Key Rewrite Preservation (%)**.

The comparison pits **Spotlight (64x64 Lattice)** against **Standard Transformer GQA (Llama-3.1 70B style)**, **Titans Neural Long-Term Memory (NLTM)**, and **Mamba-2 State Space Model**:

:::interactive chart
{
  "title": "Sequence Memory Architecture Scaling & Retrieval Benchmarks (1M Context)",
  "description": "Comparative evaluation of Percepta Spotlight against standard GQA Attention, Titans NLTM, and Mamba-2 SSM across memory footprint, latency, and long-context precision.",
  "type": "bar",
  "xKey": "metric",
  "series": [
    { "dataKey": "spotlight", "name": "Percepta Spotlight (2D Lattice)", "color": "#10B981" },
    { "dataKey": "transformer_gqa", "name": "Transformer GQA (PagedAttention)", "color": "#EF4444" },
    { "dataKey": "titans_nltm", "name": "Titans (Neural Long-Term Memory)", "color": "#6366F1" },
    { "dataKey": "mamba2", "name": "Mamba-2 SSM (Linear Recurrence)", "color": "#F59E0B" }
  ],
  "data": [
    { "metric": "HBM Memory @ 1M Tokens (GB / 10)", "spotlight": 4.2, "transformer_gqa": 64.0, "titans_nltm": 8.5, "mamba2": 1.2 },
    { "metric": "Decode Latency @ 1M Tokens (ms)", "spotlight": 8.4, "transformer_gqa": 142.0, "titans_nltm": 24.6, "mamba2": 7.8 },
    { "metric": "Needle Retrieval @ 512K (%)", "spotlight": 98.7, "transformer_gqa": 99.1, "titans_nltm": 91.2, "mamba2": 58.4 },
    { "metric": "Key Rewrite Fidelity (%)", "spotlight": 96.4, "transformer_gqa": 42.1, "titans_nltm": 84.0, "mamba2": 51.2 },
    { "metric": "Zero-Shot 16x Length Extrap (%)", "spotlight": 94.2, "transformer_gqa": 21.0, "titans_nltm": 82.5, "mamba2": 66.8 }
  ]
}
:::

#### Key Benchmark Insights
1. **Dramatically Bounded HBM Footprint:** At 1 million tokens, standard Transformer GQA consumes **640 GB of VRAM** solely for KV-cache tensors, requiring multi-node tensor-parallel clusters. Spotlight maintains a fixed **42 GB** lattice allocation throughout the entire execution.
2. **Deterministic Step Latency:** Decoding latency in standard attention surges from 12 ms at token 1,000 to **142 ms at token 1,000,000**. Spotlight sustains a flat **8.4 ms per token**, competitive with pure state space models like Mamba-2 (7.8 ms).
3. **Lossless Multi-Key Retrieval:** Unlike Mamba-2, which collapses under 512K needle retrieval (58.4%) due to state squashing, Spotlight preserves **98.7% retrieval accuracy**, closely matching full uncompressed attention (99.1%).
4. **Key Rewrite Superiority:** Standard autoregressive transformers struggle when variables are reassigned in long prompts (42.1% fidelity) because old key-value pairs linger in the attention history. Spotlight’s localized in-place gating updates overwrite stale coordinates directly, achieving **96.4% rewrite fidelity**.

---

### Section 5: In-Memory Software Ecosystems: Running Python in Latent Space

Perhaps the most radical capability demonstrated by Percepta is hosting entire software execution environments inside the 2D lattice.

#### The Virtual Machine Analogy
Because Spotlight features:
- **Spatial Isolation:** Distinct coordinate clusters $[u_1, v_1]$ and $[u_2, v_2]$ do not interfere with each other.
- **In-Place Mutation:** Cell states can increment, rebind, or clear values via gated writes.
- **Persistent Addressing:** Consistent token projections map identical variable names to identical coordinate anchors.

Researchers demonstrated allocating coordinate sectors to serve as **virtual execution segments**:
- **Sector A ($u \in [-1, -0.5]$):** Lexical Symbol Table (Variable Name $\to$ Memory Value pointer).
- **Sector B ($u \in [-0.5, 0.0]$):** Call Stack & Local Frame Registers.
- **Sector C ($u \in [0.0, 0.5]$):** Heap Memory for complex data structures.
- **Sector D ($u \in [0.5, 1.0]$):** Program Counter & Control Flow Invariants.

When executing a Python script autoregressively, the model does not require an external Docker container or subprocess sandbox. It simulates bytecode execution by updating cell states across these sectors token-by-token, effectively operating as a **neural Turing machine with constant-time memory overhead**.

---

### Section 6: Systems Engineering & Production Deployment (vLLM / SGLang)

Deploying Spotlight in production inference stacks like vLLM or SGLang requires rethinking memory allocators:

1. **Elimination of PagedAttention Fragmentation:** In standard LLM serving, PagedAttention allocates non-contiguous physical blocks to hold token KV states. In Spotlight, the KV allocator is replaced by a static **Lattice Block Pool**. Memory is pre-allocated per sequence and never dynamically expands or fragments during generation.
2. **Fused Triton Spotlight Kernels:** Because reads and writes only access $K \times K$ patches (e.g. 9 or 25 cells), specialized Triton kernels load the target cell states directly into GPU Shared Memory (SRAM), perform the RBF weighting and gated accumulation in registers, and write back to HBM in a single memory transaction.
3. **Multi-Head Spatial Divergence:** Different attention heads learn to project into different coordinate subspaces. Head 0 might organize memory syntactically, Head 1 by entity identity, and Head 2 by temporal sequence. This natural spatial specialization prevents memory collisions across complex, multi-turn agent dialogues.

---

### Section 7: Strategic Takeaways for Senior Systems Engineers

1. **The KV-Cache is an Architectural Dead End:** Storing raw, uncompressed Key-Value vectors for every generated token cannot scale to multi-day, millions-of-token agent workflows. Continuous spatial addressing provides a mathematically elegant escape hatch.
2. **Decoupling Thinking from Remembering:** Separating a tiny, static intelligence kernel from an expandable, writable 2D lattice memory mimics biological neocortical organization far more closely than monolithic Transformers.
3. **Constant Compute is the Non-Negotiable Future:** Real-time interactive agents, continuous code execution loops, and autonomous operating systems require predictable, constant-time inference latency. Architectures that cannot deliver $\mathcal{O}(1)$ step guarantees will inevitably be replaced.

With Spotlight, Percepta has provided the blueprint for the next evolutionary leap beyond the standard Transformer: infinite context with finite, deterministic compute.
:::
