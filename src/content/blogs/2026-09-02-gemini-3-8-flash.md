---
title: "Gemini 3.8 Flash: How Google Hit 73.7% on DeepSWE at One-Seventh of Opus 5's Price — and the Terminal-Bench 4.0 Score That Explains the Catch"
date: "2026-09-02"
description: "On September 2, 2026 Google shipped Gemini 3.8 Flash and the gated 3.8 Flash Cyber — its third Flash release in 43 days. This is the senior-developer breakdown: the bounded-agency thesis behind the 14-row benchmark table, the 19.1% on Terminal-Bench 4.0 that explains where the model breaks, the long-running agentic loops used to train it, the token-economics trap hidden in the $0.75 promotional price, and what the Fairwind identity-gated distribution model means for the next wave of capability releases."
tags: ["AI", "Gemini 3.8 Flash", "Google DeepMind", "LLM", "Agentic Coding", "Cybersecurity", "Fairwind", "Terminal-Bench", "DeepSWE", "LLM Economics", "AI Safety"]
author: "Abrar Akhunji"
heroImage: "/images/blog/gemini-3-8-flash/hero.jpg"
techTree:
  branch: "AI Models"
  level: 3
  prerequisites: ["2026-07-22-gemini-3-6-flash-launch"]
faq:
  - question: "What is Gemini 3.8 Flash and when did it ship?"
    answer: "Gemini 3.8 Flash is Google's ninth Gemini release of 2026 and its third Flash model in 43 days. It reached General Availability on September 2, 2026 under the stable model ID `gemini-3.8-flash` and is the same architecture lineage as 3.7 Flash, retrained and post-trained to be measurably better at long-horizon coding, tool-use agents, multi-step reasoning, and specialized professional domains. Google also shipped a restricted Gemini 3.8 Flash Cyber variant on the same day, available only through the new Fairwind Program to vetted defenders."
  - question: "How much does Gemini 3.8 Flash cost?"
    answer: "Until December 31, 2026 Gemini 3.8 Flash is priced at $0.75 per million input tokens and $3.75 per million output tokens, with cached input tokens at $0.075 / 1M and cache storage at $0.50 / 1M / hour. Batch and Flex inference are half price ($0.375 in, $1.875 out). On January 1, 2027 the standard rate doubles to $1.50 / $7.50, so the same workload costs twice as much in the new year. That is roughly 15% of Claude Opus 5's $5.00 / $25.00 list rate and 17% of GPT-5.6 Sol's $4.00 / $20.00 list rate at the introductory price."
  - question: "Is Gemini 3.8 Flash better than Claude Opus 5?"
    answer: "On Google's own 14-row benchmark table, 3.8 Flash wins 8 rows and Opus 5 wins 5, with one draw. The three rows where Opus 5 wins decisively — Terminal-Bench 4.0 (51.8% vs 19.1%), OSWorld-2.0 (75.4% vs 59.0%) and GDPVal-AA v2 (1824 vs 1545 Elo) — are exactly the open-ended, underspecified, GUI-or-knowledge-work tasks. On bounded, verifiable tasks like DeepSWE, Terminal-Bench 2.1, Vals Finance, Harvey Legal, CharXiv, LVBench, HLE-Verified, BioMystery Difficult, and LABBench2, 3.8 Flash either ties or beats Opus 5. The right product rule is to route open-ended agency to Opus 5 and bulk Coding, finance, legal, chart, and video work to 3.8 Flash."
  - question: "What is the Gemini 3.8 Flash Cyber Fairwind Program?"
    answer: "Fairwind is a new gated distribution program from Google DeepMind that gives vetted defenders — government agencies, critical infrastructure operators, and software maintainers — prioritized access to Gemini 3.8 Flash Cyber, a model built on the same core weights as 3.8 Flash but with more permissive cybersecurity mitigations. It is not in the public Gemini API. Google uses it to ship capabilities that would be too dangerous to expose publicly while still putting them in the hands of people who can defend against the same attacks the model could help build. Fairwind is an identity-based capability release — capability shipped, access gated by counterparty trust rather than withheld entirely."
  - question: "Does Gemini 3.8 Flash work on coding agents?"
    answer: "Yes, and that is the entire point of the release. On DeepSWE v1.1 — a long-horizon software engineering benchmark where the model has to read a real repository, understand the bug, edit multiple files, and pass a hidden test suite — 3.8 Flash scores 73.7%, against 65.3% for 3.7 Flash and 74.0% for Claude Opus 5. That is a 0.3-point gap to a model that costs 6.7× more. On Terminal-Bench 2.1 it scores 89.4%, beating Opus 5 (89.1%) and GPT-5.6 Sol (88.8%). For tooling and agent frameworks like Google Antigravity, Android Studio, Stitch, and the Gemini Enterprise Agent Platform, 3.8 Flash is positioned as the new default workhorse."
---

:::eli5
*Written by Abrar Akhunji*

On September 2, 2026, Google pushed out **Gemini 3.8 Flash** — its third Flash model in only 43 days. Six weeks ago it was 3.6. Three weeks ago 3.7. Now 3.8. The model ID is `gemini-3.8-flash`, it is in General Availability, and the introductory price is the same headline figure as 3.7: **$0.75 per million input tokens, $3.75 per million output tokens**, with that promotional rate expiring on December 31, 2026.

The numbers are loud. On **DeepSWE v1.1** — a benchmark where the model has to read a real GitHub repository, understand a real bug, edit several files, and pass a hidden test suite — Gemini 3.8 Flash scores **73.7%**, exactly **0.3 points** behind Claude Opus 5's 74.0%. Opus 5 costs **$5.00 per million input tokens**. Gemini 3.8 Flash costs **$0.75**. You are getting Opus-5-tier coding at **15% of the price**.

It also ships with a restricted sister model, **Gemini 3.8 Flash Cyber**, that Google has *not* put in the public API. The Cyber variant has more permissive cybersecurity mitigations — the same model that is locked down for public use is deliberately loosened for vetted defenders, available only through Google's new **Fairwind Program** for governments, critical infrastructure operators, and software maintainers.

But there is a number buried in the table that you should not ignore: **19.1%** on **Terminal-Bench 4.0**.

That is the second Terminal-Bench result on the same table. The first, Terminal-Bench 2.1, is a closed environment with a clear specification: 3.8 Flash scores 89.4%, slightly above Opus 5's 89.1%. Terminal-Bench 4.0 measures *general* agent capability in open-ended, underspecified environments. There, Opus 5 sits at 51.8%, GPT-5.6 Sol at 37.3%, and 3.8 Flash at **19.1%** — 32.7 points below Opus 5.

This is the whole story in one number. **3.8 Flash has caught up on execution. It has not caught up on planning.** When the task is bounded, verifiable, and the model can see when it is done, Flash wins. When the task is open-ended, underspecified, and the model has to decide what to do next in an unfamiliar environment, Flash falls behind.

The same gap shows up on OSWorld-2.0 (computer use, 59.0% vs Opus 5's 75.4%) and GDPVal-AA v2 (open-ended knowledge work, 1545 vs 1824 Elo). The "Pro" tier models that Anthropic and OpenAI sell at $5–$25 / 1M are still earning that premium on *agency*, not on raw intelligence.

The rest of this post is the deep breakdown: what the 14-row benchmark table actually tells you, the bounded-agency thesis behind it, the long-running agentic training loops Google used, the real cost of running 3.8 Flash at high effort (the $0.75 figure is the *promotion*, not the *cost*), and what Fairwind means for how every frontier lab will distribute the next generation of capable models.
:::

:::dev
*Written by Abrar Akhunji*

On September 2, 2026 Google DeepMind shipped two models built on the same underlying weights: **Gemini 3.8 Flash** (public API, GA) and **Gemini 3.8 Flash Cyber** (Fairwind-gated, no public API). The release is Google's ninth Gemini release of 2026 and its third Flash-tier release in 43 days — 3.6 Flash on July 21, 3.7 Flash on August 13, 3.8 Flash on September 2. The cadence is not the story. The price-per-intelligence-point and the asymmetry of the benchmark table are.

`gemini-3.8-flash` ships at $0.75 / 1M input tokens and $3.75 / 1M output tokens through December 31, 2026, then doubles to $1.50 / $7.50 on January 1, 2027. Context window is 1,048,576 input tokens with a 65,536 output cap. Knowledge cutoff is March 2026 (some domains only January 2025). Supported input modalities: text, image, video, audio, PDF. Output: text only — no image generation, no audio generation, no Live API. Three thinking effort levels — `low`, `medium`, `high` — and `minimal` returns an error.

On Artificial Analysis' Intelligence Index v4.1.1, 3.8 Flash scores 59 (16th of 195 models, up from 56 for 3.7 Flash), with 304.6 output tokens/second and a 13.39-second time-to-first-token. Output speed is faster than 3.7 Flash's 279.4 tok/s; TTFT is *higher* than the price-bracket median. The model "thinks longer, then runs faster," which is the wrong shape for a chat client and the right shape for an agent loop.

Below is the complete benchmark picture, the bounded-agency thesis the data actually supports, and the engineering implications for anyone routing production traffic today.
:::

:::interactive concept
{
  "title": "The Gemini Flash Release Cadence (2026)",
  "steps": [
    {
      "label": "May 2026",
      "title": "Gemini 3.5 Pro Announced at I/O",
      "content": "Gemini 3.5 Pro unveiled at Google I/O 2026 with a promised June release. As of September 2 it still has no public model ID, no API, no listed price — and Google did not mention it in the 3.8 announcement.",
      "icon": "Clock"
    },
    {
      "label": "Jul 21, 2026",
      "title": "Gemini 3.6 Flash",
      "content": "First Flash release in the 3.6 cycle. Pricing set to $1.50 / $7.50 per 1M tokens, then temporarily cut during the introductory period for 3.8. Establishes the Flash as a high-frequency shipping vehicle.",
      "icon": "Zap"
    },
    {
      "label": "Aug 13, 2026",
      "title": "Gemini 3.7 Flash",
      "content": "Three-week iteration. Introduces configurable thinking effort levels (low / medium / high). Sets the 65.3% DeepSWE v1.1 baseline that 3.8 will later beat by 8.4 points.",
      "icon": "Cpu"
    },
    {
      "label": "Sep 02, 2026",
      "title": "Gemini 3.8 Flash · 3.8 Flash Cyber",
      "content": "Third Flash in 43 days. Same $0.75 / $3.75 promo price as 3.7. DeepSWE v1.1 65.3% → 73.7%. Ships with a Fairwind-gated Cyber sibling for vetted defenders.",
      "icon": "Sparkles"
    }
  ]
}
:::

---

### The 14-Row Benchmark Table

Google's model evaluation PDF compares `gemini-3.8-flash` against `gemini-3.7-flash`, Claude Opus 5, and GPT-5.6 Sol on 14 published rows. The win distribution is uneven and *informative*:

| Benchmark | What it measures | **3.8 Flash** | 3.7 Flash | Opus 5 | GPT-5.6 Sol | Winner |
|---|---|---:|---:|---:|---:|---|
| **DeepSWE v1.1** | Long-horizon software engineering | **73.7%** | 65.3% | 74.0% | 72.7% | Opus 5 (Δ 0.3) |
| **GDPVal-AA v2** (Elo) | Open-ended knowledge work | 1545 | 1482 | **1824** | 1710 | Opus 5 (Δ 279) |
| **Vals Finance Agent v2** | Financial analyst tasks | **61.4%** | 59.0% | 58.6% | 53.8% | 3.8 Flash |
| **Harvey's Legal Agent** | Complex legal workflows | **10.0%** | 8.8% | 6.7% | 2.5% | 3.8 Flash |
| **Terminal-Bench 2.1** | Bounded terminal coding agent | **89.4%** | 85.8% | 89.1% | 88.8% | 3.8 Flash |
| **Terminal-Bench 4.0** | Open-ended general agent | 19.1% | 11.2% | **51.8%** | 37.3% | Opus 5 (Δ 32.7) |
| **GDP.PDF** | Expert PDF comprehension | 35.0% | 34.0% | 37.0% | **40.0%** | GPT-5.6 Sol |
| **CharXiv Reasoning** | Synthesis from complex charts | **86.2%** | 84.5% | 83.7% | 85.8% | 3.8 Flash |
| **LVBench (agentic)** | Long video understanding | **87.8%** | 85.4% | 75.4% | 82.1% | 3.8 Flash |
| **HLE-Verified** | Multidisciplinary expert reasoning | **54.9%** | 53.6% | 54.4% | 54.5% | 3.8 Flash |
| **OSWorld-2.0** | Agentic computer use | 59.0% | 50.6% | **75.4%** | 62.6% | Opus 5 (Δ 16.4) |
| **BioMystery (solvable)** | Bioinformatics research | 88.8% | 87.1% | **90.1%** | 79.5% | Opus 5 (Δ 1.3) |
| **BioMystery (difficult)** | Bioinformatics research | **56.5%** | 43.5% | 49.4% | 44.7% | 3.8 Flash |
| **LABBench2** | Real-world biology tasks | **86.2%** | 82.1% | 84.2% | 82.1% | 3.8 Flash |

**Tally:** 3.8 Flash wins 8 of 14 rows. Opus 5 wins 5. GPT-5.6 Sol wins 1. Two of the Opus 5 wins are statistical noise (DeepSWE Δ 0.3, BioMystery solvable Δ 1.3). The three *real* Opus 5 wins are Terminal-Bench 4.0, OSWorld-2.0, and GDPVal-AA v2.

**The pattern is the product.**

---

### The Bounded-Agency Thesis

Sort the 14 rows by the *closure* of the task environment:

```
+---------------------------------------------------------------------------+
|  CLOSED / BOUNDED                       OPEN / UNDERSPECIFIED           |
|  (verifiable terminal state,            (no objective finish line,       |
|   dense machine-checkable feedback)     sparse reward, model must        |
|                                          decide what to do next)         |
|                                                                           |
|  DeepSWE v1.1  (tests pass/fail)        Terminal-Bench 4.0               |
|  Terminal-Bench 2.1  (command exits 0)   OSWorld-2.0                      |
|  Vals Finance Agent v2  (numeric ans)   GDPVal-AA v2                     |
|  Harvey Legal  (document produced)                                      |
|  CharXiv  (chart → claim)                                                |
|  LVBench  (video → answer)                                              |
|  HLE-Verified  (verified answer)                                        |
|  BioMystery Difficult  (research path)                                  |
|  LABBench2  (lab protocol → outcome)                                    |
|                                                                           |
|  3.8 Flash wins all 9                    Opus 5 wins all 3                |
+---------------------------------------------------------------------------+
```

The split is not arbitrary. **Closed-environment tasks share a critical property: the model receives unambiguous, machine-checkable feedback after each action.** A test suite that turns red or green. A command that exits 0 or 1. A numeric answer that can be compared to ground truth. A video frame that contains the queried object. A chart claim that can be verified by re-reading the chart. These tasks reward *iteration*: try a fix, see if tests pass, try another, see if they pass, terminate. The model that can write better code or call tools more reliably wins.

**Open-environment tasks do not have that signal.** Terminal-Bench 4.0 deliberately measures *general* agent capability in environments that are not narrowly specified. OSWorld-2.0 puts the model in front of an unfamiliar Linux/macOS desktop and asks it to complete tasks that span many applications, modal dialogs, and undocumented UI states. GDPVal-AA v2 is a knowledge-work benchmark graded by an Elo judge against human expert deliverables — there is no binary test signal, no terminal state, no dense feedback.

These tasks reward *planning under underspecification* — the capacity to disambiguate goals, choose what to attempt first, recover from a wrong direction, and decide when the work is "good enough" in the absence of an objective test. That is the capability gap between Flash and Opus 5. It is also the gap between *execution* and *agency*.

**This is the headline insight of the 3.8 release: Flash has closed the execution gap. It has not closed the agency gap.**

Google's training recipe used *long-running agentic loops* — recursive self-evaluation during post-training that uses an agent scaffold to repeatedly grade, critique, and refine candidate model outputs in the same way a senior engineer iterates with an agent. The explicit *cybersecurity*-domain training (originally intended to harden the Cyber variant) is the proximate cause of the coding and reasoning gains in 3.8 Flash: the same diagnostic rigor that finds vulnerabilities in a C++ codebase also finds subtle logic bugs in a Python one. Domain transfer, deliberately leveraged.

But long-running loops train execution discipline, not planning under uncertainty. They teach the model to *try harder*, not to *decide what to try*. The fact that 3.8 Flash's DeepSWE number is 0.3 points behind Opus 5 while its Terminal-Bench 4.0 number is 32.7 points behind is the most informative two-line summary of the current state of agent-capable models in 2026:

> **The next dollar of training compute buys execution. Agency is a different problem.**

---

### The Token-Economics Trap

The headline price is misleading in a way that will only become obvious in the production bill.

Google is explicit: "On complex tasks, [3.8 Flash] exhibits greater diligence — executing extra reasoning steps, and calling tools iteratively. At times, the model might use more tokens to maximize performance, especially at higher effort levels."

Translation: at `high` effort, 3.8 Flash is solving the same problem with *more* thinking tokens than 3.7 Flash. The price is the same per token; the *cost* is not. Whether the migration from 3.7 → 3.8 is a net cost win depends on whether the higher success rate offsets the higher per-attempt token spend.

You can derive a break-even token overhead from the published DeepSWE v1.1 numbers alone. Assume geometric retry, i.e. each independent attempt succeeds with probability $p$ and you retry until you pass.

$$
E[\text{attempts}] = \frac{1}{p}
$$

For 3.7 Flash on DeepSWE: $p = 0.653$, so $E = 1.5314$ attempts.
For 3.8 Flash on DeepSWE: $p = 0.737$, so $E = 1.3569$ attempts.

If a single attempt of 3.8 Flash costs $(1 + t)$ times as many tokens as 3.7 Flash (because of the higher reasoning budget), expected *token spend* per success is:

$$
E[\text{tokens}] = \frac{1 + t}{p}
$$

Break-even against 3.7 is reached when:

$$
\frac{1 + t}{0.737} = \frac{1}{0.653} \;\;\Longrightarrow\;\; 1 + t = \frac{0.737}{0.653} = 1.1286 \;\;\Longrightarrow\;\; t \approx 12.86\%
$$

**3.8 Flash is cost-neutral versus 3.7 Flash on DeepSWE-style coding workloads as long as per-attempt token overhead stays below ~12.9%.** Any overhead above that, and the headline price parity starts to understate the real cost. Any overhead below that, and 3.8 is net cheaper per solved task even though it is processing more tokens per attempt.

:::interactive chart
{
  "title": "Expected Token Spend per Solved Task (DeepSWE v1.1)",
  "description": "Break-even analysis: at what per-attempt token overhead does 3.8 Flash lose its cost advantage over 3.7 Flash on long-horizon coding?",
  "type": "bar",
  "xKey": "scenario",
  "series": [
    {
      "name": "Cost vs 3.7 Flash (lower is better)",
      "dataKey": "cost_ratio",
      "color": "#f59e0b"
    }
  ],
  "data": [
    {
      "scenario": "3.7 Flash baseline",
      "cost_ratio": 1.000
    },
    {
      "scenario": "3.8 Flash · +0% token overhead",
      "cost_ratio": 0.886
    },
    {
      "scenario": "3.8 Flash · +5% token overhead",
      "cost_ratio": 0.930
    },
    {
      "scenario": "3.8 Flash · +12.9% (break-even)",
      "cost_ratio": 1.000
    },
    {
      "scenario": "3.8 Flash · +20% token overhead",
      "cost_ratio": 1.063
    },
    {
      "scenario": "3.8 Flash · +30% token overhead",
      "cost_ratio": 1.151
    }
  ]
}
:::

The chart above uses 3.7 Flash's DeepSWE pass rate (65.3%) as the baseline and 3.8 Flash's (73.7%) as the candidate. Cost ratio < 1.0 means 3.8 wins on tokens-per-success; > 1.0 means 3.7 wins.

Two practical rules follow:

1. **Run your own evaluation before migrating in bulk.** A 15% effective token overhead at high effort is a real possibility for tool-heavy workloads, and 3.7 is no longer a strict cost win at that point. The right call is to keep 3.7 in the routing table and choose at runtime based on task shape — bounded tasks to 3.8, very-high-volume bulk to 3.7.
2. **Plan for the January price doubling.** On 2027-01-01 the standard rate goes to $1.50 / $7.50, which is still 30% of Opus 5's $5 / $25, but it is exactly twice what you are paying today. Anything you model assuming $0.75 / $3.75 needs to be re-modeled with $1.50 / $7.50 in three months. DeepSeek V4-Flash ($0.44 in peak / $0.22 off-peak, $1.32 / $0.66 out) is not scheduled to double and is genuinely cheaper at every hour of the day, so the *cheapest* Flash-tier model in the market is no longer a Google product.

The same logic applies to the *latency* side. Artificial Analysis measured 304.6 tok/s output and 13.39s time-to-first-token for 3.8 Flash on a 10k input workload. The 3.7 Flash numbers were 279.4 tok/s and a lower TTFT. 3.8 spends more time before the first token and then generates faster — the front-loaded reasoning signature. For a chat product, the 13.39s TTFT is a regression. For an agent loop that batches many requests and needs the fastest possible completion once the answer starts streaming, it is a net win.

---

### What Was Trained, and Why It Transfers

Google explicitly credits two training mechanisms for the 3.8 numbers:

1. **Long-running agentic loops during post-training.** An outer agent scaffold generates candidate model responses on hard tasks, evaluates them with a grader (test suite, judge model, or rubric), and feeds the result back into a refinement step that updates the model. This is *not* RLHF and it is *not* simple rejection sampling — it is recursive self-improvement at the post-training stage. Google describes the result as a model that "works harder" on difficult problems, calling tools iteratively until it converges.
2. **Rigorous training in the cybersecurity domain.** Originally scoped to harden 3.8 Flash Cyber against dual-use and to make the Cyber variant effective at vulnerability discovery, this training generalises to code reasoning broadly. Reading a C++ codebase to find a use-after-free and reading a Python codebase to find an off-by-one error are the same cognitive operation at different abstraction levels; the cybersecurity corpus is, in effect, a code-reasoning corpus with adversarial data.

The two together explain the most striking result on the table: **3.8 Flash beats Opus 5 on Vals Finance Agent v2, Harvey's Legal Agent, and the difficult subset of BioMysteryBench.** All three are *professional domain* benchmarks where the model has to drive a multi-step process through a large, structured information space (financial filings, legal documents, biology protocols) and converge on a correct answer. These are the kind of tasks where a 5×–17× price reduction directly translates into 5×–17× more end-user calls, and where the *agency gap* on Terminal-Bench 4.0 doesn't bite because the task is well-specified.

The training-method admission matters for forecasting. If long-running agentic loops are the proximate cause of the gain and not just a frontier capability, you should expect every major lab to ship a 3.8 Flash-equivalent in 2026 H2. The training recipe is reproducible and the compute cost is bounded.

---

### Fairwind: Capability Release as an Identity Function

3.8 Flash Cyber is the part of the release with the longest tail.

Google's positioning is precise. From the launch post:

> *"3.8 Flash ships with safeguards against misuse in the domains of Chemical, Biological, Radiological, and Nuclear (CBRN) and cyber offense, while enabling beneficial use cases, as per our Frontier Safety Framework. 3.8 Flash Cyber ships with a more permissive set of mitigations for cybersecurity, and as such, is only available to trusted defenders who require a more comprehensive set of cyber capabilities."*

Same model. Different mitigation profile. Different distribution channel. 3.8 Flash is in the public API at $0.75 / $3.75 with cyber-offense refusal heavily tuned. 3.8 Flash Cyber has *relaxed* cyber mitigations — it will help you find, exploit, and patch vulnerabilities — and is gated to vetted defenders via the Fairwind Program.

This is a new distribution pattern worth naming. The two traditional models for capability release have been:

- **Withhold.** Don't ship the capability until it is safe enough. (Claude Opus 5 is the canonical example: Anthropic ships after red-teaming and does not release a "Cyber" variant at all.)
- **Public.** Ship the capability with mitigations tuned for the median user. (GPT-5.6 Sol, Gemini 3.8 Flash.)

Google is now operating a third model: **capability shipped, access gated by counterparty trust rather than withheld entirely.** The 70% success rate on a 20-language internal vulnerability discovery benchmark, the 47.2% pass@1 on CWE-Bench (Pareto-frontier with a leading frontier model at 47.8%), the 2.6× correct-patch rate vs the best commercial models on Chrome Security's real workload, the 7.5–9.7% higher recall on Wiz's penetration testing benchmark at 1/2.3 to 1/5.2 of the cost — none of that is on the public API. It is on a channel that governments, CNI operators, and software maintainers can apply for.

The pattern will spread. Open-weight releases like DeepSeek V4 are a different kind of answer (capability shipped, no gating at all), but for closed labs the Fairwind model is the path that lets them ship cyber-capable models to the people who need them without exposing those models to the people who shouldn't have them. The implicit contract is: *we will release dangerous capability if you can prove you are the right kind of dangerous.*

---

### The Cyber Numbers, Cross-Checked

The Cyber variant is the part of the launch with the least third-party verification, so the published numbers deserve a closer read.

| Metric | 3.8 Flash Cyber | Reference | Notes |
|---|---|---|---|
| **CyberGym** | Frontier-level, surpasses 3.5 Flash Cyber and larger frontier models | Industry benchmark | Single-pass vulnerability discovery, comparable to prior Google reporting |
| **Internal 20-language vuln discovery** | >70% success | Google's own benchmark | **Not independently reproducible.** Reasonable as directional evidence, not as a cross-vendor claim. |
| **CWE-Bench pass@1** | 47.2% | Leading frontier model 47.8% | Pareto-frontier per Google's own framing |
| **Chrome Security — correct patches** | 2.6× the best commercial models | Chrome Security team | Real production Chrome vulnerability workload, not a synthetic benchmark |
| **Wiz — recall on internal pen-test benchmark** | +7.5% to +9.7% | Wiz internal benchmark | At 1/2.3 to 1/5.2 the cost |
| **Google Cloud Vulnerability Research** | Critical foundational vuln found in <2 hours | Internal team | "Usually takes months" per the launch post — strong claim, single datapoint |

The Chrome Security and Wiz numbers are the most credible because they come from independent security teams running the model on their own production workloads, not Google's evaluation harness. A 2.6× correct-patch rate on Chrome's actual vulnerability backlog is a stronger claim than any benchmark score, because there is no grading methodology to argue about.

The <2 hours-to-critical-vuln datapoint is the most aggressive. If reproducible across Google's broader codebase (it isn't in the public reporting), it changes the economics of offensive security research from "quarterly sprint of senior engineers" to "afternoon with a defended model." The post does not include enough detail to validate that — no chain of custody on the vulnerability, no comparable baseline run, no second finding — and Google has every incentive to cherry-pick the most flattering datapoint for the launch.

Treat the Fairwind channel as a real capability, treat the individual cyber benchmark claims as directional, and wait for independent security-team reproductions before routing any real work to it.

---

### Safety: Where 3.8 Improves and Where It Regresses

Google's launch post names two safety gains and one safety regression:

- **Prompt injection robustness** — measured by Gray Swan, 3.8 models have made "a significant leap." That is a real product-level improvement. Prompt injection has been the single largest unsolved deployment risk for agentic systems since the release of ChatGPT in 2022; an empirical improvement in adversarial-eval resistance is a tangible deployment win.
- **CBRN and cyber-offense safeguards** — the 3.8 Flash public variant has the standard Frontier Safety Framework mitigations. No regression claimed here.
- **Non-English safety regression of 5.4 points** — the launch post discloses that, against 3.7 Flash, non-English language safety evals regressed 5.4 points. For any product serving Chinese, Japanese, Korean, Arabic, or Hindi-speaking users at scale, that is a deployment-relevant number. It means the refusal behaviour, the safe-completion behaviour, and the *style* of refusal have all measurably changed in the multilingual regime.

The Cyber variant is the explicit exception: it has *more permissive* cyber mitigations because the entire point of shipping it is to give defenders cyber capability. The mitigations are tighter, not looser, on CBRN — Google is not relaxing bio or chem refusal to ship the cyber variant. The 5.4-point non-English safety regression is on the public 3.8 Flash variant, not the Cyber one.

For a routing decision, the takeaway is: 3.8 Flash is the right default for English-language coding and agent workloads. For multilingual customer-facing deployments, run a 100-prompt refusal and tone evaluation in your target languages before switching off 3.7. The regression is real and disclosed, which means it is reproducible.

---

### The 3.5 Pro Ghost

There is a context line under every Flash-tier launch in 2026 that no Google announcement will ever spell out: **Gemini 3.5 Pro does not exist as a public model.**

It was announced at Google I/O 2026 in May with a promised June release. It is now September 2. The Gemini API changelog has no `gemini-3.5-pro` entry. There is no model ID, no price, no API surface. A Bloomberg report in July said the cause was coding-performance issues. Google has not given a new date. The 3.8 Flash launch — the third Flash-tier announcement in 43 days — does not mention it.

The pattern, read plainly: **Flash has become Google's shipping vehicle for 2026.** Each release is incremental, each is cheap, and each one moves the cheap tier closer to frontier performance on bounded tasks. 3.6 Flash on July 21 set the floor. 3.7 Flash on August 13 raised it. 3.8 Flash on September 2 raised it again, with one of the largest per-attempt deltas (DeepSWE 65.3% → 73.7%, +8.4 points; Terminal-Bench 4.0 11.2% → 19.1%, +7.9 points) that Google has shipped between adjacent Flash releases.

That is, on its own, a coherent product strategy. The question is what it implies for the next 90 days:

- If 3.5 Pro ships in late 2026, the pricing story collapses to "you can have Opus 5–class coding for $0.75 / 1M *or* for $5 / 1M, your choice" and the routing decision is mostly about which model is currently calibrated for your workload.
- If 3.5 Pro *does not* ship, the Flash cadence becomes the strategic story and you should plan your 2027 H1 capacity on the assumption that 3.9 Flash ships in October and 4.0 Flash by year-end.

The pricing calendar (December 31, 2026 promo expiry, January 1, 2027 standard rate doubling) is the second leg of the same story. It tells you Google expects the value of 3.8 Flash to have decayed enough by Q1 2027 that the price can double without losing customers to Opus 5 / GPT-5.6 / DeepSeek V4.

---

### The Production Routing Decision

Pulling every thread together, the production decision is a routing table, not a single choice:

```ts
// Pseudo-code for an LLM router picking among 2026 H2 Flash-tier models.

type Workload =
  | { kind: 'bounded-coding'; deadline: 'tight' | 'normal' | 'relaxed' }
  | { kind: 'open-agency';     failCost: 'low' | 'medium' | 'high' }
  | { kind: 'multimodal';      lang: 'en' | 'non-en' }
  | { kind: 'bulk-rewrite';    volumeMillions: number };

function pickModel(w: Workload, costTarget: number) {
  if (w.kind === 'bounded-coding') {
    // DeepSWE, Terminal-Bench 2.1, Vals, Harvey, CharXiv, LVBench —
    // 3.8 Flash wins at 15% of Opus 5.
    return {
      model: 'gemini-3.8-flash',
      effort: w.deadline === 'tight' ? 'low' : 'high',
      note: 'Verify token overhead stays below ~12.9% to preserve cost parity with 3.7.',
    };
  }
  if (w.kind === 'open-agency' && w.failCost === 'high') {
    // Terminal-Bench 4.0, OSWorld-2.0, GDPVal-AA — 32.7 points of headroom.
    // Pay for Opus 5. Do not route open-ended agency to a Flash model.
    return { model: 'claude-opus-5', effort: 'high' };
  }
  if (w.kind === 'multimodal' && w.lang === 'non-en') {
    // 3.8 Flash has a 5.4-point non-English safety regression.
    // Stay on 3.7 or run a 100-prompt refusal eval before migrating.
    return { model: 'gemini-3.7-flash', effort: 'medium' };
  }
  if (w.kind === 'bulk-rewrite' && w.volumeMillions > 50) {
    // DeepSeek V4-Flash is cheaper at every hour and isn't scheduled to double.
    return { model: 'deepseek-v4-flash', effort: 'low' };
  }
  // Default: 3.8 Flash at medium effort is the 2026 H2 workhorse.
  return { model: 'gemini-3.8-flash', effort: 'medium' };
}
```

The rules are not arbitrary. Each maps a workload class to the model that wins the relevant row in the 14-row table, with the cost and safety caveats Google itself published. The biggest single rule is the second one: **do not route open-ended agency to a Flash model.** The Terminal-Bench 4.0 19.1% is a 32.7-point gap to Opus 5, and there is no published mitigation. If the work has a clear "what does done look like" answer, Flash wins. If the work has to *decide* what done looks like, Flash loses.

---

### Three Things That Will Break The Analysis

The post is dated September 2, 2026 and the benchmarks are a snapshot. The routing decision is a snapshot too. Three things will move it:

1. **A 3.8 Flash family member that closes the Terminal-Bench 4.0 gap.** If Google (or Anthropic, or OpenAI) ships a Flash-tier model at sub-$2 / 1M that breaks 40% on Terminal-Bench 4.0, the entire routing story inverts. Long-running agentic loops, by Google's own framing, are the proximate cause of the 3.8 gains. The next iteration of that loop, with planning-aware rewards, is a plausible path to closing the agency gap without a model-size increase.
2. **Independent reproductions of the Cyber numbers.** The Chrome Security and Wiz claims are the most credible in the launch because they are from independent teams on their own workloads. If other security teams reproduce them, Fairwind stops being "Google's gated channel" and becomes a category. If they don't, Fairwind is a marketing surface over a real but unverified capability delta.
3. **The January 1, 2027 price doubling.** $0.75 / $3.75 → $1.50 / $7.50 is exactly 2×, and it lands the same day OpenAI and Anthropic typically ship Q1 model refreshes. The Flash-tier price advantage over Opus 5 narrows from 15% to 30% of list, which is still a real but less decisive gap. If 3.9 Flash ships before January 1 with the same promo, the 2026 calendar year of 15%-of-Opus-5 pricing effectively never ends.

---

### Sources

- [Google Blog — *Introducing Gemini 3.8 Flash and 3.8 Flash Cyber*](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) — primary launch post by Tulsee Doshi and Raluca Ada Popa, September 2, 2026.
- [Google DeepMind — *Gemini 3.8 Flash Model Card (PDF)*](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-8-Flash-Model-Card.pdf) — full 14-row evaluation table, methodology footnotes, and the 73.7% / 71.0% DeepSWE discrepancy note.
- [Google — *Gemini Developer API Pricing*](https://ai.google.dev/gemini-api/docs/pricing) and [Gemini API Models](https://ai.google.dev/gemini-api/docs/models) — list prices, context window, supported modalities, thinking effort levels, and the `gemini-3.8-flash` stable model ID.
- [Google DeepMind — *Fairwind Program*](https://deepmind.google/fairwind-program/) — application surface for vetted defenders; Flash Cyber access control.
- [Google — *Gemini API Release Notes*](https://ai.google.dev/gemini-api/docs/changelog) — `gemini-3.8-flash` GA entry dated September 2, 2026.
- [Artificial Analysis — *Gemini 3.8 Flash (high) API Provider Benchmarking*](https://artificialanalysis.ai/models/gemini-3-8-flash/providers) — independent throughput / latency / blended price measurements (304.6 tok/s, 13.39s TTFT, $0.58 blended).
- [AI Post Hub — *Gemini 3.8 正式發布：Flash、Cyber、價格與 Benchmark*](https://www.aiposthub.com/gemini-3-8-flash-cyber-price-benchmark/) — cross-vendor cross-check, CyberGym / CWE-Bench interpretation, methodology caveats.
- [IT之家 — *谷歌推出 Gemini 3.8 Flash Cyber 模型*](https://www.ithome.com/0/997/708.htm) — independent Chinese-language confirmation of Cyber variant details, Fairwind program scope, and Chrome Security / Wiz deployment cases.
- [Sina Finance — *Gemini 3.8 仅用 15% 价格接近 Opus 5，斩获 8 项编程第一*](https://finance.sina.com.cn/tech/roll/2026-09-03/doc-iniqnieq7434260.shtml) — independent price-comparison framing and the "third Flash in six weeks, 3.5 Pro still missing" structural read.
- [LM Market Cap — *Gemini 3.8 Flash*](https://lmmarketcap.com/model/gemini-3-8-flash) — third-party capabilities, recency, and pricing score breakdown; confirms release date 2026-09-02.
- [FelloAI — *Gemini 3.8 Flash: Benchmarks, Pricing and the Real Numbers*](https://felloai.com/gemini-3-8-flash/) — full transcription of the 14-row benchmark table, DeepSWE 73.7% vs leaked 71.0% reconciliation, January 2027 price-doubling analysis, and the LVBench / HLE-Verified / OSWorld-2.0 methodology footnotes.
