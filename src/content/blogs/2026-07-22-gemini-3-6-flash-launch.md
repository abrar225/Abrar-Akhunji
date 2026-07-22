---
title: "Google Ships Gemini 3.6 Flash While 3.5 Pro Keeps Waiting"
date: "2026-07-22"
description: "Google's Gemini 3.6 Flash cuts output tokens 17%, drops pricing to $7.50/1M output, and ships alongside 3.5 Flash-Lite and a restricted Flash Cyber. Full breakdown."
tags: ["AI", "Gemini 3.6 Flash", "Google", "LLM", "Agentic AI", "Antigravity"]
author: "Abrar Akhunji"
heroImage: "/images/blog/gemini-3-6-flash/hero.jpg"
techTree:
  branch: "AI Models"
  level: 3
  prerequisites: ["2026-07-17-kimi-k3", "2026-07-22-qwen-3-8-max-preview-explained"]
faq:
  - question: "Is Gemini 3.6 Flash free to use?"
    answer: "Gemini 3.6 Flash is available in the consumer Gemini app and Google AI Studio with free usage tiers. For paid production API usage, pricing is $1.50 per 1M input tokens and $7.50 per 1M output tokens."
  - question: "Can developers access Gemini 3.5 Flash Cyber?"
    answer: "No. Gemini 3.5 Flash Cyber is restricted to governments and select security partners as part of a limited pilot program paired with Google's CodeMender agent framework. There is no self-serve API access or public pricing."
  - question: "Is Gemini 3.6 Flash Google's new flagship model?"
    answer: "No. Gemini 3.6 Flash is an efficiency and performance update to the Flash tier. Google explicitly confirmed that Gemini 3.5 Pro remains in partner testing, while pretraining has already begun on Gemini 4."
  - question: "Does Gemini 3.6 Flash work in GitHub Copilot?"
    answer: "Yes. Google and GitHub confirmed Gemini 3.6 Flash is rolling out across Copilot Pro, Pro+, Max, Business, and Enterprise plans, featuring configurable reasoning effort and parallel tool execution."
---

:::eli5
*Written by Abrar Akhunji*

On July 21, 2026, Google announced a major update to its AI model lineup: **Gemini 3.6 Flash**, **Gemini 3.5 Flash-Lite**, and **Gemini 3.5 Flash Cyber**. 

These new models focus heavily on speed, token efficiency, and affordability. For instance, Gemini 3.6 Flash cuts API output costs down to **$7.50 per million tokens** (down from $9) and uses **17% fewer output tokens** to solve the same problems.

However, there is an elephant in the room: developers are still waiting for **Gemini 3.5 Pro**, which Google unveiled back at I/O in May but has kept locked in partner testing. Meanwhile, Google revealed that pretraining is already underway for **Gemini 4**.

Here is a complete, honest look at what Google actually shipped, the verified benchmark numbers, and how developers are reacting.
:::

:::dev
*Written by Abrar Akhunji*

On July 21, 2026, Google announced a triple model drop authored by Tulsee Doshi, Senior Director of Product Management for Gemini. The release introduces **Gemini 3.6 Flash**, **Gemini 3.5 Flash-Lite**, and a specialized security variant, **Gemini 3.5 Flash Cyber**.

Rather than launching a brand-new architecture family, Google engineered these models as high-throughput, agentic iterations built directly on the Gemini 3.5 Flash lineage. Gemini 3.6 Flash drops output pricing to **$7.50 / 1M tokens** while reducing output token consumption by **17% overall** (and up to 65% on coding benchmarks).

However, the launch arrives against a backdrop of community impatience. **Gemini 3.5 Pro**—announced at Google I/O in May 2026—remains confined to partner testing without a public release date. Instead, Google confirmed that pretraining has officially commenced on **Gemini 4**, leaving developers with a split reaction: praise for Flash-tier pricing and frustration over delayed flagship access.
:::

:::interactive concept
{
  "title": "Google Gemini Lineup Evolution (2026)",
  "steps": [
    {
      "label": "May 2026",
      "title": "Gemini 3.5 Pro Announced",
      "content": "Unveiled at Google I/O 2026. Still restricted to private partner testing as of July 2026.",
      "icon": "Clock"
    },
    {
      "label": "July 21, 2026",
      "title": "Gemini 3.6 Flash Family Ships",
      "content": "Google releases 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber focused on agentic efficiency and lower token costs.",
      "icon": "Zap"
    },
    {
      "label": "In Progress",
      "title": "Gemini 4 Pretraining",
      "content": "Google officially confirms pretraining has begun on Gemini 4, its most ambitious foundation model run to date.",
      "icon": "Sparkles"
    }
  ]
}
:::

:::eli5
### Three New Models at a Glance

Google shipped three distinct models designed for different developer workloads:

1. **Gemini 3.6 Flash:** The new flagship workhorse for everyday coding, document analysis, and computer-use agents.
2. **Gemini 3.5 Flash-Lite:** An ultra-fast, low-cost model built to spit out 350 tokens per second for high-volume tasks.
3. **Gemini 3.5 Flash Cyber:** A restricted security model fine-tuned to hunt down software vulnerabilities in parallel.
:::

:::dev
### Three New Models at a Glance

The July 21 launch partitions Google's Flash ecosystem into distinct operational tiers:
:::

| Model | Pricing (Input / Output per 1M) | Context Window | Max Output | Speed (Tokens/sec) | Primary Access |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gemini 3.6 Flash** | **$1.50 / $7.50** | 1,000,000 | 64,000 | Fast (~120 t/s) | Gemini API, Antigravity, Copilot, App |
| **Gemini 3.5 Flash-Lite** | **$0.30 / $2.50** | 1,000,000 | 64,000 | **350 t/s** | AI Studio, Search, Gemini API, App |
| **Gemini 3.5 Flash Cyber** | *Restricted (No Public API)* | 1,000,000 | 64,000 | Variable | Restricted (CodeMender Pilot Only) |

:::eli5
### Gemini 3.6 Flash: The New Workhorse

Gemini 3.6 Flash is designed to be the default choice for developers building autonomous AI agents and complex applications. 

It keeps the massive **1-million token context window** and **March 2026 knowledge cutoff**, but costs significantly less to run. Input tokens cost $1.50 per million, while output tokens drop to $7.50 per million.

What makes 3.6 Flash special isn't just lower prices—it's **token efficiency**. Independent testing by Artificial Analysis shows 3.6 Flash uses 17% fewer output tokens than 3.5 Flash. On coding tasks measured by Datacurve's DeepSWE benchmark, it achieves the same or better results with **up to 65% fewer tokens**, drastically cutting down loop times and API bills.

It also introduces built-in **Computer Use** as a client-side tool via the Gemini API, enabling agents to control desktop and web interfaces directly. Early enterprise adopters include **Figma**, **JetBrains**, **Hebbia**, and **Harvey**.
:::

:::dev
### Gemini 3.6 Flash: The New Workhorse

Gemini 3.6 Flash represents Google's primary production workhorse. Iterated on the 3.5 Flash architecture, it maintains a **1M-token input context window**, a **64K max output token limit**, and a **March 2026 knowledge cutoff**.

Pricing sits at **$1.50 / 1M input tokens** and **$7.50 / 1M output tokens**, marking a 16.6% price drop on output generations compared to 3.5 Flash ($9.00/1M output).

The core technical advance is output concise-reasoning:
- **Artificial Analysis Index:** 3.6 Flash consumes **17% fewer output tokens** on equivalent multi-turn agent benchmarks.
- **DeepSWE Benchmark (Datacurve):** Google reports up to **65% token reduction** per resolved software engineering issue, reducing redundant tool-call iterations and infinite execution loops.

Built-in client-side **Computer Use** capabilities are now natively supported via the Gemini API and Gemini Enterprise Agent Platform. Early adoption partners like **Hebbia** and **Harvey** leverage this for parsing complex financial/legal document suites, while **Figma** and **JetBrains** integrate it for automated UI and IDE workflow orchestration.
:::

:::interactive chart
{
  "title": "Gemini 3.6 Flash vs. 3.5 Flash Benchmark Scores",
  "description": "Official Google-reported evaluations showing precision gains across coding, ML research, and computer-use benchmarks.",
  "type": "bar",
  "xKey": "benchmark",
  "data": [
    {
      "benchmark": "DeepSWE (Coding)",
      "v36Flash": 49,
      "v35Flash": 37
    },
    {
      "benchmark": "MLE Bench (ML Research)",
      "v36Flash": 63.9,
      "v35Flash": 49.7
    },
    {
      "benchmark": "OSWorld-Verified (UI Agent)",
      "v36Flash": 83,
      "v35Flash": 78.4
    }
  ],
  "series": [
    { "dataKey": "v36Flash", "name": "Gemini 3.6 Flash", "color": "#4285F4" },
    { "dataKey": "v35Flash", "name": "Gemini 3.5 Flash (Prior)", "color": "#71717A" }
  ]
}
:::

:::eli5
### Gemini 3.5 Flash-Lite: Built for Scale

If you need extreme speed and low costs, **Gemini 3.5 Flash-Lite** is Google's answer. Clocking in at an astounding **350 output tokens per second** (via Artificial Analysis), it costs just **$0.30 per 1M input tokens** and **$2.50 per 1M output tokens**.

Despite being the "Lite" model, it features a 1M context window and supports **configurable thinking levels**. You can turn thinking down for fast search tasks, or turn it up for multi-step subagents.

Surprisingly, Flash-Lite actually **outperforms the larger Gemini 3 Flash** on several key benchmarks:
- **SWE-Bench Pro:** 54.2% (vs 49.6% on Gemini 3 Flash)
- **OSWorld-Verified:** 74.0% (vs 65.1% on Gemini 3 Flash)

Early enterprise customers like **Ramp**, **Palo Alto Networks**, and **Ashler** are using Flash-Lite to power high-throughput log processing and agentic search.
:::

:::dev
### Gemini 3.5 Flash-Lite: Built for Scale

Positioned as Google's ultra-high-throughput tier, **Gemini 3.5 Flash-Lite** delivers an inference velocity of **350 output tokens/second** (audited by Artificial Analysis) at **$0.30 / 1M input** and **$2.50 / 1M output**.

Flash-Lite retains the full **1M context window**, **64K max output**, and client-side **Computer Use** support, while introducing **configurable thinking effort controls** (minimal/low for real-time lookups; elevated for subagent routing).

Crucially, architectural refinements allow 3.5 Flash-Lite to **outperform the prior-generation full Gemini 3 Flash** on select evaluations:
- **SWE-Bench Pro:** **54.2%** vs. **49.6%** (Gemini 3 Flash)
- **OSWorld-Verified:** **74.0%** vs. **65.1%** (Gemini 3 Flash)
:::

:::interactive chart
{
  "title": "Gemini 3.5 Flash-Lite vs. 3.1 Flash-Lite Gains",
  "description": "Benchmark progress over 3.1 Flash-Lite. Note: 3.5 Flash-Lite also beats full Gemini 3 Flash on SWE-Bench Pro (54.2% vs 49.6%).",
  "type": "bar",
  "xKey": "benchmark",
  "data": [
    {
      "benchmark": "Terminal-Bench 2.1",
      "v35Lite": 54,
      "v31Lite": 31
    },
    {
      "benchmark": "GDM-MRCR v2 (Long Context)",
      "v35Lite": 72.2,
      "v31Lite": 60.1
    }
  ],
  "series": [
    { "dataKey": "v35Lite", "name": "Gemini 3.5 Flash-Lite", "color": "#34A853" },
    { "dataKey": "v31Lite", "name": "Gemini 3.1 Flash-Lite (Prior)", "color": "#71717A" }
  ]
}
:::

:::eli5
### Gemini 3.5 Flash Cyber: The One You Probably Can't Use

The most specialized model in the drop is **Gemini 3.5 Flash Cyber**. It is fine-tuned specifically to find, verify, and patch security vulnerabilities.

It works alongside **CodeMender**, Google's code-security system. Instead of asking one big AI model to scan a project once, CodeMender spins up multiple Flash Cyber agents in parallel. Each agent examines the code from a different angle to catch hidden bugs.

In Google's internal "Big Sleep" test on the V8 JavaScript engine, Flash Cyber discovered **55 confirmed unique vulnerabilities**, beating both standard Gemini 3.5 Flash (47) and Anthropic's Claude Opus 4.6 (36). In a live test, Google's security team used it to find remote-code-execution flaws in public APIs in under 2 hours.

However, **you can't sign up for an API key.** Due to security risks surrounding automated vulnerability discovery, access is restricted to governments and select security partners.
:::

:::dev
### Gemini 3.5 Flash Cyber: The One You Probably Can't Use

**Gemini 3.5 Flash Cyber** is a domain-specialized fine-tune of 3.5 Flash engineered for automated vulnerability discovery, exploit validation, and patch generation. It operates within **CodeMender**, Google's multi-agent code security orchestration framework.

Rather than relying on single monolithic passes, CodeMender deploys multiple Flash Cyber subagents in parallel to explore diverse execution paths across large codebases.

Google evaluated Flash Cyber on its internal **Big Sleep** benchmark targeting the V8 JavaScript engine. Flash Cyber identified **55 unique confirmed vulnerabilities**, catching 10 security flaws missed by both baseline 3.5 Flash and Claude Opus 4.6.
:::

:::interactive chart
{
  "title": "Google Big Sleep V8 Engine Vulnerability Discoveries",
  "description": "Internal Google evaluation measuring unique confirmed V8 vulnerabilities discovered by autonomous agents.",
  "type": "bar",
  "xKey": "model",
  "data": [
    {
      "model": "Gemini 3.5 Flash Cyber",
      "vulnerabilities": 55
    },
    {
      "model": "Gemini 3.5 Flash (Base)",
      "vulnerabilities": 47
    },
    {
      "model": "Claude Opus 4.6",
      "vulnerabilities": 36
    }
  ],
  "series": [
    { "dataKey": "vulnerabilities", "name": "Confirmed Unique Issues Found", "color": "#FBBC04" }
  ]
}
:::

<div class="p-6 rounded-2xl border border-amber-500/30 bg-surface my-8">
  <div class="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
    <span>🛡️ Dual-Use Technology Restriction</span>
  </div>
  <p class="text-sm text-muted leading-relaxed">
    <strong>Restricted Pilot Access:</strong> Gemini 3.5 Flash Cyber has no public pricing schedule or self-serve API endpoint. Google has classified the model under dual-use security protocols, restricting pilot access exclusively to sovereign governments and vetted enterprise security partners via CodeMender.
  </p>
</div>

:::eli5
### Built Into Antigravity 2.0

Google has also integrated Gemini 3.6 Flash directly into **Google Antigravity**, its autonomous AI development environment.

With 3.6 Flash under the hood, Antigravity handles large code migrations with lower latency and higher accuracy. It also powers new features like:
- **Offline Theme Studio:** Generating interactive UI components and themes locally using `tldraw`.
- **Collaborative SDK:** Real-time, multi-user offline-first agent editing.

Check out the official demonstration videos to see 3.6 Flash in action inside Antigravity:
- [Code Migration Latency Comparison](https://antigravity.google/demos/migration-36-flash)
- [Theme Studio Canvas Generator](https://antigravity.google/demos/theme-studio)
- [Offline Collaborative Editor](https://antigravity.google/demos/collab-sdk)
:::

:::dev
### Built Into Antigravity 2.0

Alongside the API rollout, Google updated **Google Antigravity 2.0** to leverage Gemini 3.6 Flash as its default reasoning backend.

Key integration features include:
- **Accelerated Code Migrations:** Lower latency execution loops during multi-file refactoring passes.
- **Offline Canvas & Theme Studio:** Local-first UI prototyping powered by `tldraw` integration.
- **Multi-User Collaborative SDK:** Real-time agent state sync for distributed developer teams.

Developers can inspect the official Antigravity integration demonstrations:
- [Code Migration Latency Breakdown](https://antigravity.google/demos/migration-36-flash)
- [Theme Studio Canvas Builder](https://antigravity.google/demos/theme-studio)
- [Offline-First Collaborative SDK Demo](https://antigravity.google/demos/collab-sdk)
:::

:::eli5
### The Honest Community Reaction

While developers appreciate the lower prices ($7.50 output) and token savings, community reaction to the launch has been mixed.

On Hacker News and Reddit, many developers expressed frustration over the ongoing delay of **Gemini 3.5 Pro**. Some builders noted that Google seems to be shipping efficiency updates to Flash models while keeping its most powerful flagship model behind closed doors.

A widely watched YouTube reaction video summarized the mood with its title: *"Gemini 3.6 Flash is Here But It's Not Great, Where's 3.5 Pro?"* Developers also reported occasional API rate-limiting friction during peak hours, raising questions about Google's current capacity provisioning.
:::

:::dev
### The Honest Community Reaction

While enterprise builders welcomed the $7.50 output pricing and 17% token reduction, community feedback highlighted notable friction:

- **Flagship Delays:** The main point of criticism across Hacker News and developer forums centers on Gemini 3.5 Pro. Originally previewed at Google I/O in May 2026, 3.5 Pro remains unavailable for self-serve testing.
- **Capacity & Provisioning Frustration:** Several active builders reported sudden API rate-limiting during complex agent runs, leading to discussions over whether Google is over-subscribing Flash capacity.
- **Media Sentiment:** A popular YouTube technical breakdown captured developer sentiment in its title: *"Gemini 3.6 Flash is Here But It's Not Great, Where's 3.5 Pro?"*

**Frontier Safety Evaluation**
Per Google's published Gemini 3.6 Flash model card, safety evaluations showed overall improvements in text-to-text safety and multilingual moderation. The card noted a slight tone regression and a marginal increase in unjustified refusals, but confirmed that 3.6 Flash remains below all Critical Capability Levels (CCLs) under Google's Frontier Safety Framework, including re-tested cyber risk parameters.
:::

:::eli5
### Frequently Asked Questions

* **Is Gemini 3.6 Flash free?** It has free tiers in Google AI Studio and the consumer Gemini app. Paid API access is $1.50 / 1M input and $7.50 / 1M output tokens.
* **Can I try Gemini 3.5 Flash Cyber?** No. Access is restricted to governments and vetted security partners via CodeMender.
* **Is 3.6 Flash the new flagship model?** No. It is an efficiency upgrade for the Flash tier. Gemini 3.5 Pro is still in private partner testing.
* **Does it work in GitHub Copilot?** Yes, it is rolling out across Copilot Pro, Business, and Enterprise plans.
:::

:::dev
### FAQ

* **Is Gemini 3.6 Flash free?** Free usage limits apply in Google AI Studio and the consumer Gemini app. Commercial API pricing is set at $1.50 per 1M input tokens and $7.50 per 1M output tokens.
* **Can developers access Gemini 3.5 Flash Cyber?** No. Flash Cyber has no public API endpoint and is restricted to governments and security partners via the CodeMender pilot program.
* **Is 3.6 Flash Google's new flagship?** No. 3.6 Flash is an efficiency iteration on the Flash tier. Gemini 3.5 Pro remains in private partner testing, while pretraining has begun on Gemini 4.
* **Does it work in GitHub Copilot?** Yes. Gemini 3.6 Flash is available across Copilot paid tiers (Pro, Business, Enterprise) with configurable reasoning controls.
:::

:::eli5
### The Verdict

Gemini 3.6 Flash and 3.5 Flash-Lite offer impressive pricing drops and token savings for production developer agents. If you are building cost-sensitive workflows or tool-calling agents, they are solid upgrades.

However, until Google ships Gemini 3.5 Pro, developers seeking absolute frontier capabilities will continue looking closely at alternatives like [Kimi K3](/blog/2026-07-17-kimi-k3) or tracking unverified previews like [Qwen3.8-Max](/blog/2026-07-22-qwen-3-8-max-preview-explained).

Read Google's [official announcement](https://blog.google/technology/ai/gemini-3-6-flash-launch-2026) and check out [Antigravity](https://antigravity.google) for full details.
:::

:::dev
### The Verdict

Google's July 21 launch delivers tangible efficiency improvements: a 17% output token reduction, 350 t/s Flash-Lite throughput, and integrated Computer Use APIs. For agent developers optimizing cost-per-task, Gemini 3.6 Flash is a compelling production choice.

Yet the broader story remains incomplete until Google releases Gemini 3.5 Pro. For developers evaluating the frontier landscape, check out our analysis of [Kimi K3](/blog/2026-07-17-kimi-k3), [OpenCode Desktop](/blog/2026-07-18-opencode-desktop-launch), and [Qwen3.8-Max](/blog/2026-07-22-qwen-3-8-max-preview-explained).

Visit Google's [official blog](https://blog.google/technology/ai/gemini-3-6-flash-launch-2026) and the [Antigravity release notes](https://antigravity.google/blog) to dive deeper.
:::
