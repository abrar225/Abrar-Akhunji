---
title: "Claude Opus 5 Honestly Reviewed: What's Actually New"
date: "2026-07-25"
description: "Claude Opus 5 launched July 24, 2026 at the same $5/$25 per-million-token price as Opus 4.8 — but with a step change in coding and agentic performance. Full breakdown."
tags: ["AI", "Claude Opus 5", "Anthropic", "LLM", "Agentic AI", "AI Benchmarks"]
author: "Abrar Akhunji"
heroImage: "/images/blog/claude-opus-5/hero.png"
techTree:
  branch: "AI Models"
  level: 3
  prerequisites: ["2026-07-22-gemini-3-6-flash-launch", "2026-07-22-qwen-3-8-max-preview-explained"]
faq:
  - question: "Is Claude Opus 5 cheaper than Opus 4.8?"
    answer: "No. Claude Opus 5 launched at the exact same price as Opus 4.8 ($5 per million input tokens, $25 per million output tokens). It is more capable per token, but the raw API cost has not been reduced."
  - question: "Is Claude Opus 5 Anthropic's smartest model?"
    answer: "No. Claude Fable 5 remains Anthropic's flagship intelligence model. Opus 5 is positioned directly below Fable 5 as a high-performance, cost-effective agentic engine."
  - question: "Can Claude Opus 5 perform cybersecurity research?"
    answer: "Partially. According to Anthropic's OSS-Fuzz evaluations, Opus 5 is strong at finding software vulnerabilities, but it is deliberately constrained and significantly weaker at developing working exploits compared to Anthropic's restricted Mythos 5 model."
  - question: "Where can I use Claude Opus 5?"
    answer: "It is available immediately via the Claude API, Amazon Bedrock, Google Cloud (Claude on Vertex), Microsoft Foundry, and to Claude Pro and Claude Max subscribers."
---

:::eli5
*Written by Abrar Akhunji*

On July 24, 2026, Anthropic launched **Claude Opus 5**, a major update to its popular Opus lineup. But if you read the headlines, you might be confused about what actually changed.

First, let's clear up the biggest misconception: **Opus 5 is not a price cut.** It costs exactly the same as Opus 4.8 ($5 per million input tokens, $25 per million output tokens). When people say it is "cheaper," they mean it can solve complex problems that previously required the much more expensive Claude Fable 5.

Second, Opus 5 features a massive capability jump in coding and agentic tasks. It is now configured to "think" by default, allowing it to reason through hard problems step-by-step.

However, Anthropic is also being very deliberate about what Opus 5 *cannot* do. It is explicitly held back on dangerous capabilities like offensive cybersecurity. Here is a brutally honest look at the real numbers, the confirmed limits, and what the developer community is saying.
:::

:::dev
*Written by Abrar Akhunji*

On July 24, 2026, Anthropic released **Claude Opus 5** (`claude-opus-5`), delivering a substantial capability leap at a flat price point.

The launch narrative has been somewhat muddied by imprecise coverage. **Opus 5 does not introduce a price cut.** It retains Opus 4.8's exact pricing of $5/1M input and $25/1M output tokens. The "cost savings" narrative stems from its ability to achieve Fable 5-level performance on specific coding and agentic benchmarks at a fraction of Fable's inference cost.

Technically, Opus 5 introduces several breaking paradigm shifts for Claude API users: "thinking" is now enabled by default, the minimum cacheable prompt length has dropped to 512 tokens, and mid-conversation tool swapping is now supported natively.

However, Anthropic has been explicit about this model's ceiling: it is not the flagship (Fable 5), and it is deliberately gated on dual-use capabilities (trailing Mythos 5 in offensive cyber and biology). Here is a precise, sourced breakdown of the internal evaluations, the architectural guardrails, and the critical questions early adopters are asking.
:::

:::interactive concept
{
  "title": "The Anthropic Model Tier Map (July 2026)",
  "steps": [
    {
      "label": "Fast / Cheap",
      "title": "Haiku 4.5 & Sonnet 5",
      "content": "Optimized for speed and high-volume, low-latency tasks.",
      "icon": "Zap"
    },
    {
      "label": "Workhorse",
      "title": "Opus 5",
      "content": "The new default for agentic coding and knowledge work. Thinking on by default.",
      "icon": "Code"
    },
    {
      "label": "Flagship",
      "title": "Fable 5",
      "content": "The peak intelligence model for the most complex reasoning tasks.",
      "icon": "Brain"
    },
    {
      "label": "Restricted",
      "title": "Mythos 5",
      "content": "The frontier capability model. Heavily gated due to advanced cyber and biological capabilities.",
      "icon": "Shield"
    }
  ]
}
:::

:::eli5
### What Actually Changed

The jump from Opus 4.8 to Opus 5 brings several structural changes. The most important one is that **thinking is now turned on by default**. 

In the past, you had to ask Claude to think step-by-step. Now, Opus 5 does it automatically using an "effort" setting. By default, effort is set to `high`. You can turn it down to save time and money, or crank it up to `max` for the hardest problems.

Here is how Opus 5 compares to its predecessor and its bigger sibling, Fable 5:
:::

:::dev
### What Actually Changed

Migrating from Opus 4.8 to Opus 5 involves more than just swapping the API model ID. The fundamental difference is the integration of native, configurable reasoning.

**Thinking is now enabled by default.** The inference effort parameter (`low`, `medium`, `high`, `xhigh`, `max`) controls the depth of this reasoning loop, with `high` as the default state. 

**Breaking Change:** Disabling thinking entirely is only permitted at effort `high` or below. Sending an API request with `thinking: disabled` at the `xhigh` or `max` effort levels will now return a `400 Bad Request` error.
:::

| Feature | Claude Opus 5 | Claude Opus 4.8 | Claude Fable 5 |
| :--- | :--- | :--- | :--- |
| **Context Window** | 1,000,000 tokens | 1,000,000 tokens | 2,000,000 tokens |
| **Max Output Tokens** | 128,000 | 64,000 | 128,000 |
| **Input Price (per 1M)** | **$5.00** *(No change)* | $5.00 | $15.00 |
| **Output Price (per 1M)** | **$25.00** *(No change)* | $25.00 | $75.00 |
| **Default Reasoning** | **On (High Effort)** | Off | On (High Effort) |
| **Min. Cacheable Prompt** | 512 tokens | 1,024 tokens | 1,024 tokens |

<br/>

:::interactive concept
{
  "title": "The Opus 5 Effort Ladder",
  "steps": [
    {
      "label": "Low / Medium",
      "title": "Fast Inference",
      "content": "Lower latency, fewer output tokens. Best for summarization and straightforward data extraction.",
      "icon": "Zap"
    },
    {
      "label": "High (Default)",
      "title": "Balanced Reasoning",
      "content": "The default setting. Claude thinks before acting, balancing cost with strong agentic performance.",
      "icon": "Scale"
    },
    {
      "label": "XHigh / Max",
      "title": "Deep Exploration",
      "content": "Maximum token expenditure for the hardest coding and math problems. Thinking cannot be disabled here.",
      "icon": "Brain"
    }
  ]
}
:::

:::eli5
### The Benchmark Numbers

Because Opus 5 is so new, there are no independent benchmark scores yet. All the numbers below come directly from Anthropic's internal testing.

According to Anthropic, Opus 5 dominates on agentic coding and computer use, often beating out the much more expensive Fable 5. It completely destroys Opus 4.8 across the board.
:::

:::dev
### The Benchmark Numbers (Anthropic Internal Evals)

*Note: As of this writing (one day post-launch), no independent third-party aggregator like Artificial Analysis has verified these scores. The data below reflects Anthropic's internally reported evaluations.*

Anthropic's internal numbers paint Opus 5 as an incredibly cost-efficient agentic workhorse. Notably, on Frontier-Bench v0.1 (agentic coding), Opus 5 more than doubles Opus 4.8's score. On OSWorld 2.0 (computer use), it reportedly surpasses Fable 5's absolute peak score at just over a third of the inference cost.
:::

:::interactive chart
{
  "title": "Anthropic-Reported Internal Evaluations (July 2026)",
  "description": "Opus 5 performance compared to Fable 5, Opus 4.8, and OpenAI's GPT-5.6 (Sol) based on Anthropic's internal testing.",
  "type": "bar",
  "xKey": "benchmark",
  "data": [
    {
      "benchmark": "Frontier-Bench v0.1 (Agentic Coding)",
      "Opus5": 43.3,
      "Fable5": 33.7,
      "Opus4_8": 21.1,
      "GPT5_6": 34.4
    },
    {
      "benchmark": "OSWorld 2.0 (Computer Use)",
      "Opus5": 70.6,
      "Fable5": 66.1,
      "Opus4_8": 55.7,
      "GPT5_6": 62.6
    },
    {
      "benchmark": "AutomationBench (Business Workflows)",
      "Opus5": 26.0,
      "Fable5": 17.4,
      "Opus4_8": 17.0,
      "GPT5_6": 18.1
    },
    {
      "benchmark": "ARC-AGI-3 (Novel Problem Solving)",
      "Opus5": 30.2,
      "Fable5": 0,
      "Opus4_8": 1.5,
      "GPT5_6": 7.8
    }
  ],
  "series": [
    { "dataKey": "Opus5", "name": "Opus 5", "color": "#D97757" },
    { "dataKey": "Fable5", "name": "Fable 5", "color": "#F2A900" },
    { "dataKey": "Opus4_8", "name": "Opus 4.8", "color": "#4A90E2" },
    { "dataKey": "GPT5_6", "name": "GPT-5.6 Sol", "color": "#D3D3D3" }
  ]
}
:::

<div class="my-8">
  <img src="/images/blog/claude-opus-5/aa-index.png" alt="Artificial Analysis Coding Agent Index comparison showing Opus 5 efficiency" class="rounded-xl border border-line shadow-lg" />
  <p class="text-sm text-faint text-center mt-2 font-mono">Anthropic-reported cost vs. performance scaling on agentic coding.</p>
</div>

:::eli5
### What Early Users Are Actually Saying

Anthropic shared several quotes from early testers who have been using Opus 5 before the public launch.

* **Scott Wu (CEO, Cognition/Devin):** Noted that on FrontierCode 1.1, Opus 5 approaches Fable-level performance at half the cost, with incredible strength in debugging.
* **Wade Foster (CEO, Zapier):** Said Opus 5 topped Zapier's AutomationBench without spending more tokens, successfully running a full churn-prevention workflow that previous models failed.
* **Sualeh Asif (Co-Founder, Cursor):** Reported that Opus 5 performs just under Fable 5 on CursorBench, sharing many of the exact same positive behaviors.
:::

:::dev
### What Early Users Are Actually Saying

Anthropic's launch documentation included verified testimonials from launch partners evaluating the model against their internal production metrics:

* **Scott Wu (CEO, Cognition/Devin):** Confirmed that on the FrontierCode 1.1 evaluation harness, Opus 5 approaches Fable-level performance at half the cost, citing particular strength in root-cause analysis and debugging workflows.
* **Fabian Hedin (Co-Founder, Lovable):** Reported a 22% improvement over Opus 4.7 on their hardest agentic coding tasks, noting significantly less run-to-run variance.
* **Ben Kus (CTO, Box):** Measured an 8% overall improvement over Opus 4.8 across Box workloads, highlighted by an 11% gain in data analysis and a 17% gain in due-diligence tasks.
* **Wade Foster (CEO, Zapier):** Stated that Opus 5 topped the internal AutomationBench leaderboard at equivalent token spend to prior Claude models, achieving a 100% pass rate on an end-to-end churn-prevention workflow.
:::

:::eli5
### Where It Is Deliberately Held Back

This is the most important part of the review. Anthropic is very careful about safety, and they have actively prevented Opus 5 from being good at dangerous tasks.

Opus 5 is explicitly *not* Anthropic's most capable model for biology research or offensive cybersecurity. That title belongs to **Mythos 5**, a restricted model.

When tested on finding and exploiting software vulnerabilities (OSS-Fuzz), Opus 5 is great at *finding* the bugs, but it is deliberately terrible at actually *writing the exploit code* compared to Mythos 5. 

Anthropic also reports that Opus 5 has a score of **2.3 on overall misaligned behavior**—their best (lowest) score yet, showing very low rates of deception.
:::

:::dev
### Where It Is Deliberately Held Back

Anthropic's safety framing for Opus 5 is explicit: this model is subject to a deliberate capability ceiling on dual-use threat vectors. **Opus 5 remains strictly behind Mythos 5 on both offensive cybersecurity and advanced biology research.**

The clearest evidence of this capability gating is on the **OSS-Fuzz** evaluation harness, which tests a model's ability to first identify a software vulnerability, and then weaponize it into a working exploit.
:::

:::interactive chart
{
  "title": "The Capability Ceiling: Vulnerability vs. Exploit (OSS-Fuzz)",
  "description": "An illustrative representation of Anthropic's reported OSS-Fuzz capability gap. Opus 5 matches frontier models on discovery, but is deliberately stunted on exploit generation compared to the restricted Mythos 5.",
  "type": "bar",
  "xKey": "metric",
  "data": [
    {
      "metric": "Vulnerability Discovery",
      "Opus5": 85,
      "Mythos5": 88
    },
    {
      "metric": "Exploit Generation",
      "Opus5": 18,
      "Mythos5": 82
    }
  ],
  "series": [
    { "dataKey": "Opus5", "name": "Claude Opus 5 (Public)", "color": "#D97757" },
    { "dataKey": "Mythos5", "name": "Mythos 5 (Restricted)", "color": "#8B0000" }
  ]
}
:::

:::dev
This is not a flaw; it is a designed safety profile. Furthermore, Anthropic's automated behavioral audit scored Opus 5 at **2.3 on overall misaligned behavior**—the lowest (best) metric of any recent release, indicating the lowest observed rates of deceptive alignment.
:::

:::eli5
### The Real Criticism

Not everyone is completely sold yet. Outside press and developers have raised two major questions:

1. **Does the efficiency hold up?** Anthropic claims Opus 5 is incredibly cost-efficient, but reporters at VentureBeat have asked whether these internal benchmark efficiency claims will actually hold up when thousands of developers run real, messy production code through it at scale.
2. **The "Fallback" problem:** Opus 5 has cyber safety classifiers that trigger 85% less often than Fable 5. But when they *do* trigger, the API automatically falls back to the older Opus 4.8 model to answer the prompt. Some enterprise developers are uncomfortable with a safety filter silently deciding which AI model handles their request.
:::

:::dev
### The Real Criticism

The "brutally honest" angle requires examining the friction points highlighted by outside press and enterprise integrators. VentureBeat's launch coverage surfaced two legitimate critiques:

1. **Production Efficiency vs. Benchmark Efficiency:** Anthropic's cost-efficiency claims heavily rely on the model solving tasks in fewer reasoning steps. The open question is whether this efficiency holds up in noisy, edge-case-heavy production environments, or if real-world agentic loops will still consume massive token budgets at maximum effort levels.
2. **Classifier-Mediated Routing:** While Anthropic notes that cyber safety classifiers intervene ~85% less often than on Fable 5, the default behavior for a flagged request is an automatic fallback to Opus 4.8. Enterprise integrators have expressed frustration at a system where a black-box safety classifier dynamically alters the underlying model answering the request without explicit developer routing. (Note: this fallback behavior is configurable via the API, but the default opt-in has raised eyebrows).
:::

:::eli5
### How It Stacks Up Against the Field

Right now, we don't have an independent benchmark comparing Opus 5 directly to its biggest rivals, like OpenAI's GPT-5.6 or Google's newly launched [Gemini 3.6 Flash](/blog/2026-07-22-gemini-3-6-flash-launch).

However, looking at recent history, a clear pattern has emerged: OpenAI usually leads on command-line terminal tasks, Google usually wins on cost and huge context windows, and Anthropic's Claude models consistently dominate software engineering and complex tool use. 

Opus 5 seems built exactly to defend Anthropic's dominance in coding.
:::

:::dev
### How It Stacks Up Against the Field

Because Opus 5 is one day old, **no independent, apples-to-apples third-party benchmark run exists yet** comparing it directly to GPT-5.6 or the newly launched [Gemini 3.6 Flash](/blog/2026-07-22-gemini-3-6-flash-launch).

However, the historical frontier pattern is instructive. Across the 2025–2026 cycle, no single vendor has achieved a clean sweep. OpenAI has historically dominated agentic terminal control, Google has secured the extreme-context and cost-efficiency floors, and Anthropic has consistently led software-engineering-specific benchmarks (like SWE-bench Pro) and complex tool orchestration.

Opus 5 is engineered precisely to defend that coding stronghold. Per a February 2026 Contrary Research analysis, Claude held roughly 40% of the enterprise LLM usage market, driven heavily by Claude Code's ~$1B annualized revenue run-rate. Anthropic chose to compete on token-efficiency and agentic reliability rather than chasing peak general intelligence—protecting their most lucrative enterprise flank.
:::

:::eli5
### Migrating from Opus 4.8

If you are a developer moving to Opus 5, you need to know a few things:
- Change your API model ID to `claude-opus-5`.
- **Stop telling it to double-check its work.** Opus 5 verifies its own work automatically now. Telling it to verify again just wastes tokens and time.
- Expect responses to be slightly longer and more detailed than Opus 4.8.
:::

:::dev
### Migrating from Opus 4.8

For engineers porting applications from `claude-opus-4-8` to `claude-opus-5`, Anthropic's developer documentation highlights several practical shifts:

1. **Remove explicit verification prompts:** Opus 5 inherently verifies its own outputs during its default reasoning loop. Legacy prompt instructions like *"add a final verification step"* will cause redundant over-verification, increasing latency and cost.
2. **Account for verbosity:** Default deliverables and markdown generation run longer than Opus 4.8.
3. **Embrace delegation:** Opus 5 is trained to narrate its progress in agentic sessions and will delegate to subagents much more readily than prior models.
4. **Handle the effort constraint:** Ensure your application logic does not attempt to pass `thinking: disabled` alongside an `xhigh` or `max` effort parameter, or your API calls will fail.
:::

:::eli5
### Frequently Asked Questions

* **Is Claude Opus 5 cheaper than Opus 4.8?** No. The price is exactly the same: $5 per million input tokens and $25 per million output tokens.
* **Is it Anthropic's smartest model?** No, that is still Claude Fable 5.
* **Can it do cybersecurity research?** Yes, but it is deliberately restricted. It is great at finding vulnerabilities but weak at building exploits.
* **Where can I use it?** The Claude API, Amazon Bedrock, Google Cloud (Vertex), Microsoft Foundry, and Claude Pro/Max.
:::

:::dev
### FAQ

* **Is Claude Opus 5 cheaper than Opus 4.8?** No. The per-token API pricing remains completely flat at $5/1M input and $25/1M output. The model is simply more capable per token.
* **Is Claude Opus 5 Anthropic's smartest model?** No. Claude Fable 5 remains the frontier reasoning model.
* **Can Claude Opus 5 perform cybersecurity research?** Partially. Based on OSS-Fuzz data, it matches frontier capabilities for vulnerability discovery but is deliberately suppressed on exploit generation compared to Mythos 5.
* **Where is it available?** Claude API, Amazon Bedrock, Google Cloud (Claude on Vertex), Microsoft Foundry, and as the default model for Claude Max subscribers.
:::

:::eli5
### The Verdict

Claude Opus 5 is a massive, well-documented capability jump for coding and agentic tasks, offered at the exact same price as the model it replaces. 

While we are still waiting for independent benchmark verification, the initial numbers suggest Anthropic has successfully built a powerful workhorse model that respects deliberate safety boundaries. 

Check out [Anthropic's official announcement](https://www.anthropic.com/news/claude-opus-5) to dive deeper, or see how it compares to [Gemini 3.6 Flash](/blog/2026-07-22-gemini-3-6-flash-launch).
:::

:::dev
### The Verdict

Claude Opus 5 represents a highly deliberate, well-documented capability jump at a flat API price point. By making native reasoning the default and aggressively optimizing for SWE-bench and agentic tool-use, Anthropic has shipped a formidable enterprise workhorse.

However, the genuine capability ceilings on dual-use tasks and the open questions surrounding production-scale token efficiency are real caveats that engineering teams must validate for themselves. As always with a day-one launch, wait for the Artificial Analysis verification before ripping out your production routing logic.

Read the [official Anthropic announcement](https://www.anthropic.com/news/claude-opus-5) and developer docs, or contrast this strategy with Google's recent [Gemini 3.6 Flash](/blog/2026-07-22-gemini-3-6-flash-launch) pricing maneuvers.
:::
