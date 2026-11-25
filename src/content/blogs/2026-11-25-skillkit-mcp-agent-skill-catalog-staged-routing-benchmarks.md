---
title: "SkillKit Architecture: Staged MCP Skill Routing, 317-Byte Payloads, and Honest Gap Refusal Benchmarks"
date: "2026-11-25"
description: "Inside SkillKit (skilllkit.vercel.app), built by Abrar Akhunji: an open catalog of 192 engineering skills and 157 web resources across 14 domains with staged find_kit/explain_match routing, 317-byte median first payloads, 95% held-out constraint adherence, and 0% confidently-wrong rate."
tags: ["SkillKit", "MCP", "Agent Skills", "Prompt Routing", "Context Engineering", "Open Source", "Abrar Akhunji", "Vercel"]
author: "Abrar Akhunji"
heroImage: "/images/blog/skillkit-mcp-agent-skill-catalog-staged-routing-benchmarks/hero.jpg"
techTree:
  branch: "Agentic AI"
  level: 9
  prerequisites: ["claude-code-skills-departments", "omniroute-agentic-ai-gateway-rtk-compression", "claude-fable-5-2-mythos-architecture-benchmarks"]
faq:
  - question: "Who created SkillKit and what problems does it solve for AI coding agents?"
    answer: "SkillKit (https://skilllkit.vercel.app/, GitHub abrar225/SkillKit) is built by Abrar Akhunji to cure two opposite agent failures: blindly stuffing massive markdown playbooks into context windows before knowing whether they fit, or hallucinating advice when a catalog has zero matching skill. It ships 192 structured engineering skills and 157+ technical resources across 14 domains via web search, 3D skill atlas, CLI (vibe-skills), stdio MCP, and Streamable HTTP MCP."
  - question: "What changed between the SkillKit baseline and staged routing release candidate?"
    answer: "Across a frozen 40-brief held-out evaluation suite, staged routing with explain_match and honest gap reporting pushed all-constraints adherence from 55.0% to 95.0% (38/40), format compliance from 87.5% to 100.0%, required-tool adherence from 42.86% to 92.86%, and gap-refusal recall from 0.0% to 81.82%, while cutting confidently-wrong hallucinations from 7.5% down to 0.0% (0/40)."
  - question: "How fast and compact is SkillKit's MCP routing response?"
    answer: "Instead of streaming full multi-kilobyte SKILL.md bodies on the first turn, SkillKit's first routing step returns a 317-byte median payload (1,017 bytes P95, ~80 median tokens, 100% under 2 KiB) in 0.385 ms median local latency (0.618 ms P95) on held-out queries."
  - question: "How does SkillKit compare to skills.sh, rohitg00/SkillKit, SkillsMP, obra/superpowers, and Tessl?"
    answer: "On top-3 gold-skill match across the 12-brief comparative suite, SkillKit scored 5/12 ahead of skills.sh (2/12), rohitg00/SkillKit (1/12), and SkillsMP (0/12). While superpowers leads on tight Claude Code hook discipline and Tessl offers commercial enterprise governance, SkillKit combines zero-cost open licensing, sub-kilobyte staged MCP discovery, interactive 3D catalog inspection, and verified stack-manifest routing."
---

:::eli5
*Written by Abrar Akhunji*

Giving an AI coding agent 192 engineering manuals inside its starting system prompt is like handing an intern a 4,000-page binders shelf before asking them to rename one database column. Half your token budget burns before the first tool call, instructions contradict each other mid-file, and the agent still guesses with straight-faced confidence when the exact manual does not exist.

```
+-----------------------------------------------------------------------------+
|            SKILLKIT : THREE-STAGE ROUTING INSTEAD OF PROMPT BLOAT           |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [ Coding Brief + Optional Repo Stack Manifest ]                            |
|                        |                                                    |
|                        v                                                    |
|  STAGE 1: find_kit (Compact Index Search, ~317 B Median / 0.385 ms Local)   |
|  - Filters across 192 Skills & 157+ Web Resources in 14 Engineering Domains |
|                        |                                                    |
|                        v                                                    |
|  STAGE 2: explain_match + Explicit Gap Gate                                 |
|  - Checks required tools, output format, & stack fit                        |
|  - No gold match? Refuse cleanly (81.82% gap recall, 0% hallucinated match) |
|                        |                                                    |
|                        v                                                    |
|  STAGE 3: use / handoff / export (Targeted Playbook Load)                   |
|  - Loads exact SKILL.md + references only after verified match              |
|  - Served via Web Catalog, /llms.txt, CLI, Stdio MCP, & Streamable HTTP MCP |
|                                                                             |
+-----------------------------------------------------------------------------+
```

I built **SkillKit** (**Abrar Akhunji**, live at `https://skilllkit.vercel.app/` and open source at `github.com/abrar225/SkillKit`) as both a visual engineering atlas for humans and a precision staged lookup engine for coding agents.

Humans get a fast dark-mode web index (**192 curated skills**, **157 published web resources** backed by 164 repo references, **14 specialized domains**, and an interactive 3D constellation graph where you can orbit clusters across Architecture, Engineering & Ops, Security, Design & UX, Frontend, Backend & API, and Agent Tooling).

Agents get a thin MCP library card (`bin/mcp-server.js` locally over `stdio`, or Streamable HTTP at `/api/mcp`). Rather than force-feeding thousands of words blindly, the agent asks `find_kit` for tiny ~80-token candidate summaries, verifies fit via `explain_match` (or admits cleanly when the catalog lacks a match), and loads the exact playbook through `use` only after constraints pass.
:::

:::interactive chart
{
  "title": "SkillKit Routing Evaluation: Baseline vs Release Candidate (40 Held-Out Briefs, %)",
  "description": "Measured across the frozen 40-brief held-out test set comparing initial baseline (commit 99a5430) against the staged-routing release candidate. Higher is better for all green metrics; lower is better for Confidently Wrong (dropped 7.5% to 0.0%).",
  "type": "bar",
  "xKey": "metric",
  "series": [
    { "name": "Baseline Commit (%)", "dataKey": "baseline" },
    { "name": "Release Candidate (%)", "dataKey": "release" }
  ],
  "data": [
    { "metric": "All Constraints Respected", "baseline": 55.0, "release": 95.0 },
    { "metric": "Format Compliance", "baseline": 87.5, "release": 100.0 },
    { "metric": "Required Tool Respected", "baseline": 42.9, "release": 92.9 },
    { "metric": "Honest Gold-Gap Fallback", "baseline": 0.0, "release": 81.8 },
    { "metric": "Confidently Wrong (Lower Best)", "baseline": 7.5, "release": 0.0 }
  ]
}
:::

:::dev
*Written by Abrar Akhunji*

### 1. Why Single-Shot Skill Registries Fail Agents in Production

**SkillKit** (`https://skilllkit.vercel.app/`, open source by **Abrar Akhunji** at `github.com/abrar225/SkillKit`) addresses a structural mismatch across first-generation agent skill directories. Almost every early skill marketplace falls into one of two failure traps:
1. **Unindexed Megaprompts:** Installing dozens of community skills clones raw `SKILL.md` directories directly into agent context folders (`.cursor/rules`, `.claude/commands`, `AGENTS.md`). Ten verbose skills easily consume **15,000 to 30,000 input tokens** before the user finishes typing their first bug report, diluting attention over unrelated domains and raising cost per turn.
2. **Blind Top-K Guessing:** Simple keyword or vector indexes always return their top-3 matches even when constraints forbid a dependency, require a missing tool, or fall outside the catalog entirely. On held-out tasks containing missing "gold gaps" (`11/40` tasks intentionally lacking a matching catalog skill), blind search forces downstream agents to run wrong playbooks confidently.

SkillKit solves both failure modes by separating **lightweight discovery** (`find_kit`), **constraint inspection** (`explain_match`), **explicit fallback gating**, and **late playbook materialization** (`use` / `handoff` / `export` / `vibe-skills`).

```
  [ Agent Client: Claude Desktop / Cursor / Codex / Antigravity ]
        |
        +---(stdio: bin/mcp-server.js OR Streamable HTTP: /api/mcp)--->+
                                                                        |
  +---------------------------------------------------------------------+
  | SKILLKIT STAGED ENGINE                                              |
  |                                                                     |
  |  1. normalize(brief, stack_manifest, format, required_tools)        |
  |     -> inspects package.json / Cargo.toml / pyproject triggers       |
  |                                                                     |
  |  2. find_kit()  --> 317 B median payload (80 tokens, 0.385 ms)      |
  |     -> returns ranked compact IDs + domain + match scores only      |
  |                                                                     |
  |  3. explain_match() + constraint solver                             |
  |     -> checks constraint_mask & threshold -> PASS or GAP_FALLBACK   |
  |                                                                     |
  |  4. use() / handoff() / export()                                    |
  |     -> hydrates exact SKILL.md + referenced snippets on demand      |
  +---------------------------------------------------------------------+
```

---

### 2. Formal Context Budget and Constrained Abstention Model

Let a repository contain a skill library $S = \{s_1, \dots, s_{192}\}$ paired with companion web resources $R = \{r_1, \dots, r_{157}\}$, each carrying metadata $\mu(s)$, constraint predicates $C(s)$ (required framework, tool binary, output schema, license), and full instruction token count $L(s)$. Naive prompt injection incurs an unavoidable prefix tax:

$$
\text{Tokens}_{\text{naive}} = \sum_{s \in S_{\text{installed}}} L(s)
$$

SkillKit replaces unconditional loading with a three-stage expected token cost controlled by retrieval rank threshold $\tau$ and constraint match indicator $\mathbb{I}[q \models C(s)]$:

$$
\text{Tokens}_{\text{staged}}(q) = L_{\text{index}}(k) + \mathbb{I}\!\left[\max_{s \in \text{Top}_k} \text{score}(q, s) \ge \tau \;\land\; q \models C(s)\right] \cdot L(s^*)
$$

Because Stage 1 (`find_kit`) serializes strictly stripped signatures rather than full markdown bodies, measured first-turn payloads stay bounded cleanly at **317 bytes median** (`~80 tokens`) and **1,017 bytes P95** (`~255 tokens`) with **100% of responses under 2 KiB** (`RELEASE-EVALUATION.md`). When the gate condition evaluates false (`81.82%` accuracy on held-out absent-skill briefs), Stage 2 emits a typed refusal/gap explanation instead of wasting tokens or poisoning context with an ill-fitting `SKILL.md`.

---

### 3. Live Product Walkthrough: Home, Browser, 3D Constellation, and MCP Setup

Capturing screenshots directly from the deployed production build at `https://skilllkit.vercel.app/` (edition `NOV 17, 2026`, `204` statically generated Next.js pages) highlights how SkillKit serves both human browsing and zero-friction agent wiring.

![SkillKit live homepage showing Give your agent a playbook hero, interactive 3D particle Knot switcher, 192 skills CTA, and 157 resources link](/images/blog/skillkit-mcp-agent-skill-catalog-staged-routing-benchmarks/skillkit-home.png)

*Figure 1: SkillKit live homepage at `skilllkit.vercel.app` featuring an interactive procedural particle visualizer (`Knot`, `Halo`, `Helix`, `Bloom`) alongside direct entry into 192 curated skills and 157 technical resources.*

![SkillKit Agent skills directory page with natural language search bar and 14-domain faceted filters](/images/blog/skillkit-mcp-agent-skill-catalog-staged-routing-benchmarks/skillkit-skills.png)

*Figure 2: SkillKit `/skills` browser filtering 192 instructions live by natural language query (`animation`, `debugging`), included reference files, and domains including `Orchestration (13)`, `Planning (22)`, `Architecture (6)`, `Engineering (36)`, and `Design & UX (31)`.*

![SkillKit interactive 3D constellation Skill map plotting 192 skills across 14 clustered engineering domains](/images/blog/skillkit-mcp-agent-skill-catalog-staged-routing-benchmarks/skillkit-graph.png)

*Figure 3: SkillKit `/graph` 3D constellation and domain atlas connecting 192 skills across 14 engineering domains (`PLANNING`, `UI & UX`, `ENGINEERING & OPS`, `BACKEND & API`, `SECURITY`, `SCRAPING`, `SOCIAL`, `MEDIA`, `AGENT TOOLING`, `FRONTEND`, `MOBILE`, `AUTOMATIONS`, `ORCHESTRATION`).*

![SkillKit MCP integration page generating copy-ready stdio config JSON for Claude Desktop, Cursor, and Antigravity](/images/blog/skillkit-mcp-agent-skill-catalog-staged-routing-benchmarks/skillkit-mcp.png)

*Figure 4: SkillKit `/mcp` one-click client integration view generating `stdio` config blocks (`node .../bin/mcp-server.js`) tailored for Claude Desktop, Cursor, and Antigravity alongside remote Streamable HTTP MCP access (`/api/mcp`).*

Four high-leverage developer workflows anchor SkillKit's adoption across teams and solo engineers:
1. **Stack-Manifest-Aware Multi-Language Routing:** Supplying a repository `package.json`, `Cargo.toml`, or `pyproject.toml` fingerprint lets SkillKit distinguish React/Next.js tasks from Rust or Python backend briefs. In controlled stack-context ablation benchmarks, providing project manifests raised relevant framework matching from **`0/9` down to `4/9` (`44.4%`)** while keeping unrelated control queries at **`0/3`** false positives.
2. **Zero-Hallucination Abstention in CI Coding Loops:** Before an autonomous agent edits infrastructure or writes database migrations, SkillKit enforces format, tool-availability, and constraint predicates so unsupported requests fail gracefully (`0.0%` confidently-wrong rate on held-out evals) instead of injecting mismatched instructions.
3. **Human Exploration + Raw Artifact Fetching (`/llms.txt`, `/api/kit`, CLI):** Beyond interactive React exploration, LLM agents without MCP runtimes can ingest raw machine-readable catalogs via `/llms.txt` or install locally via `vibe-skills` CLI (`npx vibe-skills`) and zero-cost `stdio` MCP (`bin/mcp-server.js`).
4. **End-to-End Task Deliverable Quality:** Rather than judging retrieval on synthetic BLEU scores alone, Abrar Akhunji paired GPT-6.2 Sol across **15 blind end-to-end artifact generation trials** comparing routed SkillKit guidance against base prompting cleanly.

---

### 4. Exact Empirical Benchmarks and Self-Evaluation Honesty

Evaluating agent tooling honestly requires separating constraint compliance, false confidence, latency/payload budgets, and strict gold-skill precision (`docs/RELEASE-EVALUATION.md`, frozen **120-brief full benchmark** and **40-brief held-out test set**):

| Metric | All 120: Baseline | All 120: Release Candidate | Held-Out (40): Baseline | Held-Out (40): Release Candidate |
| :--- | :--- | :--- | :--- | :--- |
| **All Constraints Respected** | 66.67% | **90.00%** | 55.00% | **95.00%** (`38/40`) |
| **Format Compliance** | 95.83% | **99.17%** | 87.50% | **100.00%** (`40/40`) |
| **Required Tool Respected** | 83.75% | **97.50%** | 42.86% | **92.86%** (`26/28`) |
| **Confidently Wrong (Lower Best)** | 11.67% | **5.83%** | 7.50% | **0.00%** (`0/40`) |
| **Correct Fallback on Gold Gaps** | 7.69% | **84.62%** | 0.00% | **81.82%** (`9/11`) |
| **Usable Kit Rate (Strict Gold Match)** | 20.83% | **29.17%** | 7.50% | **15.00%** (`6/40`) |
| **Median First Payload Bytes** | 709 B | **317 B** | 736 B | **317 B** (`~80` est. tok; P95 `1,017 B`) |
| **Median First Skill Latency (Local)** | 1.662 ms | **0.423 ms** | 1.584 ms | **0.385 ms** (P95 `0.618 ms`) |

Look closely at the **strict `usable_kit` rate (`15.00%` on Held-out / `29.17%` on All 120)** alongside the **`95.0%` constraint adherence** and **`0.0%` confidently-wrong rate**. Why report a `15.0%` top-kit metric right beside a `95.0%` constraint score instead of hiding it? Because **40 held-out briefs intentionally span adversarial gold gaps (`11/40` tasks with zero exact catalog skill)** and narrow cross-stack phrasings. Rather than inflating recall by lowering thresholds and corrupting the agent with semi-relevant bloat, SkillKit chooses to refuse cleanly when exact gold fit isn't met (`81.82%` gap detection) and score **`3 wins, 12 ties, 0 losses`** in paired GPT-6.2 Sol execution trials (`105` Node tests + `19` Python tests passing, `204` static Next.js pages built cleanly).

---

### 5. Competitive Landscape Benchmarking

How does SkillKit stack up against leading open-source and commercial agent skill ecosystems (`docs/COMPETITIVE-GAP.md` and `docs/RELEASE-EVALUATION.md`)?

| Platform / Framework | Pricing & License | Top-3 Gold Match (12-Brief Bench) | Discovery & Transport Model | Key Strength | Trade-off vs SkillKit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SkillKit (Abrar Akhunji)** | **$0 Free / Open Source** | **5 / 12** (and **6/40** on strict held-out) | **Staged MCP (`find_kit` -> `explain_match` -> `use`), CLI, `/llms.txt`, 3D Atlas** | Sub-400 B payloads, 0% held-out hallucination rate, explicit gap refusal | Strict abstention caps single-shot recall at 15% on held-out gap mix |
| **skills.sh** | Free Directory (CLI) | **2 / 12** | Web directory + CLI install scripts | Large community registry footprint | Single-shot keyword retrieval; no staged constraint solver or gap refusal |
| **rohitg00/SkillKit** | Free Open Source | **1 / 12** | Registry / CLI tooling (`4.8k` GitHub stars ecosystem) | Early ecosystem adoption & multi-tool links | Lacks sub-millisecond staged constraint solver & 0%-hallucination held-out gating |
| **SkillsMP** | Free Marketplace Index | **0 / 12** | Catalog search directory | Broad third-party aggregator breadth | Weak top-3 precision on multi-constraint briefs; no compact MCP negotiation |
| **obra/superpowers** | Free Open Source | N/A (workflow suite) | Tight behavioral prompt + hook framework | Deep discipline on TDD/brainstorming/verification flows | Focused workflow enforcement rather than 192-skill multi-domain search index |
| **Tessl** | Commercial / Enterprise Tiers | N/A (enterprise platform) | Commercial spec-driven registry + agent governance | Hosted evaluation suites, enterprise packaging & org RBAC | Proprietary commercial billing vs open $0 local MCP + source catalog |

Notice two clear strategic contrasts: **obra/superpowers** excels when you want rigid behavioral gates across a tight coding methodology inside Claude Code, whereas **SkillKit** operates as the cross-domain engineering library (`192` skills, `157` resources, `14` domains) wired safely across Claude Desktop, Cursor, Antigravity, Codex CLI, and any MCP host. Meanwhile, commercial registries like **Tessl** solve enterprise governance billing, whereas SkillKit keeps local execution, open `/api/kit` inspection, and `stdio` MCP completely dependency-free.

---

### 6. Rules of Thumb for Scaling Agent Skill Registries

1. **Never Stream Full `SKILL.md` Files During Discovery:** Keep initial search payloads strictly under 500 bytes (`317 B` median in SkillKit). Let the orchestrating model inspect compact signatures and constraint flags before burning context tokens on verbose instructions.
2. **Benchmark Confidently-Wrong Hallucination Separately from Recall:** A skill router that always returns its closest nearest neighbor silently poisons agent output whenever your catalog covers 80% of engineering tasks instead of 100%. Track absent-skill gap detection as a first-class metric.
3. **Pass Stack Fingerprints (`package.json`, `Cargo.toml`, `pyproject.toml`) Into Routing Calls:** Plaintext verbs like "deploy" or "write tests" remain fundamentally ambiguous without runtime context; supplying project manifests lifted relevant SkillKit stack retrieval from `0/9` to `4/9` with zero added false positives.
4. **Ship Identical Contracts Across Web, CLI, and MCP:** Keeping `/skills`, `/graph`, `/llms.txt`, `vibe-skills`, and `bin/mcp-server.js` backed by the exact same tested snapshot guarantees humans browsing the 3D atlas and coding agents querying MCP never diverge on available instructions.
:::

---

### Sources
- Live Production Deployment: [SkillKit Open Catalog (`skilllkit.vercel.app`)](https://skilllkit.vercel.app/) and [SkillKit 3D Skill Map](https://skilllkit.vercel.app/graph)
- Open-Source Repository: [SkillKit GitHub Repository (Abrar Akhunji)](https://github.com/abrar225/SkillKit)
- Release Benchmark & Evaluation Record: [SkillKit docs/RELEASE-EVALUATION.md](https://github.com/abrar225/SkillKit/blob/main/docs/RELEASE-EVALUATION.md)
- Competitive Landscape Audit: [SkillKit docs/COMPETITIVE-GAP.md](https://github.com/abrar225/SkillKit/blob/main/docs/COMPETITIVE-GAP.md) and [bench/README.md](https://github.com/abrar225/SkillKit/blob/main/bench/README.md)
- Ecosystem References: [skills.sh](https://skills.sh), [obra/superpowers](https://github.com/obra/superpowers), [Tessl](https://tessl.io), [rohitg00/SkillKit](https://github.com/rohitg00/SkillKit)
