---
title: "MiniMax Rebuilt Its Coding Agent on Pi — Here's What Pi Actually Is"
date: "2026-08-09"
description: "MiniMax Code 2.0 is built on Pi, an 85K-star open-source agent framework run by two individual maintainers — with no built-in permission system. Here's the full picture."
tags: ["AI", "MiniMax", "Coding Agents", "Open Source", "Security", "Pi"]
author: "Abrar Akhunji"
heroImage: "/images/blog/minimax-code-2-pi/hero.png"
techTree:
  branch: "AI Tooling"
  level: 4
  prerequisites: ["2026-07-29-claude-code-skills-departments"]
faq:
  - question: "Is Pi actually open source?"
    answer: "Yes, it is MIT licensed and hosted on a real, public GitHub repository (earendil-works/pi)."
  - question: "Can I use Pi myself outside MiniMax Code?"
    answer: "Yes. It is published on npm as @earendil-works/pi-coding-agent and is free to use under the MIT license."
  - question: "Does Pi sandbox itself by default?"
    answer: "No. This is explicitly documented by the maintainers: Pi runs with the permissions of the user or process that launches it. Containment is left up to whoever deploys it."
  - question: "Will my pull request get reviewed?"
    answer: "Not by default if you are a new contributor. New issues and PRs are auto-closed, and you must follow an approval ladder to unlock visibility. This is the project's stated intended behavior."
---

:::eli5
*Written by Abrar Akhunji*

When a major AI company launches a new commercial product, they usually don't advertise the open-source code it's built on. But on August 7, 2026, when MiniMax launched **MiniMax Code 2.0**, they did exactly that. In the very first line of their announcement, they credited a framework called **Pi**.

So, what is Pi?

If you trace the dependency back to GitHub, you won't find a massive corporate engineering team. Instead, you'll find an incredibly popular, minimalist coding agent framework maintained primarily by just two independent developers. You will also find a highly controversial open-source contribution policy, and a documented, deliberate lack of built-in security sandboxing.

Here is the real story behind the framework powering one of the newest AI coding assistants on the market.
:::

:::dev
*Written by Abrar Akhunji*

Corporate AI product launches rarely surface their underlying open-source dependencies in the marquee announcement text. On August 7, 2026, MiniMax proved the exception, launching **MiniMax Code 2.0** and immediately attributing its complete architectural rebuild to an open-source agent framework named **Pi** (credited to `@pidotdev`).

Following the dependency tree to GitHub (`earendil-works/pi`) reveals a fascinating architecture and an even more fascinating open-source governance model. Pi is one of the most popular coding-agent harnesses in the world, maintained day-to-day by two individually named developers, operating under a draconian contribution policy, and shipping with a deliberate, explicitly documented permissions gap.

This is an investigative look at what MiniMax actually shipped, what Pi actually is, and the critical security design choices anyone building on this framework needs to understand.
:::

---

### What MiniMax Actually Shipped

While the underlying framework is the most interesting part of the story, MiniMax Code 2.0 introduces four distinct features in its hosted product:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">Remote Control</div>
    <p class="text-xs text-muted leading-relaxed">Users can connect a mobile device to an active desktop session to monitor the agent's output, view terminal logs and code changes in real time, and approve actions remotely. The phone acts strictly as a control surface, not a localized agent.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">Unified Browse/Edit</div>
    <p class="text-xs text-muted leading-relaxed">Generated web output can be inspected in a dedicated sidebar, while code and configuration files can be modified directly within a preview panel and saved without switching to a separate IDE.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">Dual UI Modes</div>
    <p class="text-xs text-muted leading-relaxed">A "Coding" mode surfaces granular context and repository-management tools for engineers, while a "Work" mode strips away technical telemetry to focus strictly on task progress and deliverables.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">Bring Your Own Key (BYOK)</div>
    <p class="text-xs text-muted leading-relaxed">Users are not locked into MiniMax's models. By supplying a base URL, model name, and API key, developers can route inference through any compliant custom provider directly from the model selector.</p>
  </div>
</div>

However, there is a catch: **much of the underlying infrastructure cannot be independently verified from the outside.** MiniMax Code 2.0 sits behind a strict sign-in wall at `code.minimax.io`. At the time of this publication, neither `minimax.io/news` nor `platform.minimax.io/docs` featured a dedicated technical post detailing this 2.0 relaunch. 

Most critically, how MiniMax's hosted environment isolates and sandboxes the Pi framework remains an open question—one that matters deeply when you look at how Pi is actually built.

---

### The Framework Underneath: Pi

Pi is a deliberately minimalist agent framework. It does not ship with built-in sub-agents, Model Context Protocol (MCP) integrations, or background bash execution. Its philosophy is to provide a clean, un-opinionated harness that developers can extend via TypeScript, prompts, and skills, rather than forcing users to fork its internals.

<div class="my-6 p-6 rounded-xl bg-surface border border-line">
  <h4 class="text-sm font-bold text-fg font-mono mb-4 border-b border-line pb-2">Pi Repository Stats (As of Publish)</h4>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div>
      <div class="text-xs text-muted uppercase tracking-wider font-bold">Stars</div>
      <div class="text-lg font-mono text-accent">~85.7K</div>
    </div>
    <div>
      <div class="text-xs text-muted uppercase tracking-wider font-bold">Forks</div>
      <div class="text-lg font-mono text-fg">~10.6K</div>
    </div>
    <div>
      <div class="text-xs text-muted uppercase tracking-wider font-bold">Watchers</div>
      <div class="text-lg font-mono text-fg">~282</div>
    </div>
    <div>
      <div class="text-xs text-muted uppercase tracking-wider font-bold">License</div>
      <div class="text-lg font-mono text-fg">MIT</div>
    </div>
  </div>
  <div class="mt-4 text-xs text-faint">Repository: earendil-works/pi | Language: TypeScript | Created: August 9, 2025. *Note: These figures fluctuate daily.*</div>
</div>

The npm package (`@earendil-works/pi-coding-agent`) sees anywhere from 1 to 1.6 million weekly downloads. The roughly 8:1 star-to-fork ratio suggests a massive base of developers are consuming the project as an upstream dependency rather than actively modifying it.

### Two People, Not a Company

Despite powering a major corporate product, Pi's GitHub commits are utterly dominated by two individual open-source veterans.

:::interactive chart
{
  "title": "Pi Framework Contribution Volume (Estimate)",
  "description": "Contribution counts drop off sharply after the top two maintainers.",
  "type": "bar",
  "xKey": "contributor",
  "data": [
    {
      "contributor": "badlogic",
      "commits": 850
    },
    {
      "contributor": "mitsuhiko",
      "commits": 420
    },
    {
      "contributor": "Rest of Contributors",
      "commits": 60
    }
  ],
  "series": [
    { "dataKey": "commits", "name": "Relative Commit Volume", "color": "#00A3FF" }
  ]
}
:::

**badlogic** (Mario Zechner, best known for creating the libGDX game framework) and **mitsuhiko** (Armin Ronacher, creator of the Flask Python web framework) lead the project. The juxtaposition is jarring: a frontier Chinese AI lab's commercial coding agent runs directly on a codebase dominated by two independent European developers.

### The Policy That Would Make Most Maintainers Nervous

If you try to contribute to Pi, you will immediately hit a wall. 

The README states upfront that new issues and pull requests from first-time contributors are **auto-closed by default**.

The `CONTRIBUTING.md` file is even blunter: this applies to every new contributor, without exception. Submitting a patch requires climbing a specific approval ladder.

:::interactive concept
{
  "title": "Pi's Contributor Approval Ladder",
  "steps": [
    {
      "label": "Step 1",
      "title": "Auto-Close",
      "content": "All issues and pull requests from first-time contributors are automatically closed by a bot upon submission.",
      "icon": "XCircle"
    },
    {
      "label": "Step 2",
      "title": "Issue Unlock",
      "content": "Maintainers review the closed queue. If flagged as legitimate, the user is approved to open issues without auto-closure.",
      "icon": "MessageSquare"
    },
    {
      "label": "Step 3",
      "title": "PR Unlock",
      "content": "Unlocking issues does not unlock PRs. Maintainers must separately approve a user to submit actual code changes.",
      "icon": "GitPullRequest"
    }
  ]
}
:::

The stated reasoning is highly specific to the AI era: the maintainers have no problem with contributors using AI to help write a patch, but they are aggressively filtering out users who submit AI-generated code they do not actually understand. 

### The Sentence Anyone Shipping on Pi Should Read First

Pi's extreme minimalism comes with a significant architectural tradeoff. Under the "Permissions & Containerization" heading, the README states plainly that Pi **does not ship a built-in permission system.**

By default, Pi executes code with the exact permissions of whoever—or whatever process—launched it. 

If a commercial product runs Pi directly on a host server without isolation, the agent can access any file or network endpoint the host process can. Pi explicitly documents three containment patterns to solve this, leaving the implementation entirely up to the user:

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">1. Gondolin</div>
    <p class="text-xs text-muted leading-relaxed">A Pi extension that keeps credentials on the host machine while routing all shell commands into a lightweight local Linux micro-VM.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">2. Plain Docker</div>
    <p class="text-xs text-muted leading-relaxed">Running the entire Pi process inside a standard Docker container for straightforward, industry-standard process isolation.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">3. OpenShell</div>
    <p class="text-xs text-muted leading-relaxed">Running the entire Pi agent inside a policy-controlled, restricted sandbox environment.</p>
  </div>
</div>

This is not a hidden vulnerability; it is a documented design choice. But it makes the open question about MiniMax Code 2.0 highly relevant. Because the product is locked behind a hosted platform, we simply do not know from the outside which of these containment strategies (if any) MiniMax implemented to secure user sessions. 

*(Note: While Pi skips execution sandboxing, it is strict about its own supply chain. It pins exact dependency versions, enforces a multi-day delay before pulling new npm releases, and blocks install scripts globally.)*

---

### Already Connected, Before This Was Public

While the August 7 announcement framed the MiniMax/Pi connection as news, the relationship predates the launch.

:::interactive concept
{
  "title": "The MiniMax / Pi Timeline",
  "steps": [
    {
      "label": "August 2025",
      "title": "Pi Created",
      "content": "The earendil-works/pi repository is established on GitHub.",
      "icon": "Github"
    },
    {
      "label": "Pre-Launch",
      "title": "MiniMax-M3 Supported",
      "content": "A Pi release (v0.78.1) officially adds direct support for the MiniMax-M3 model, silently connecting the two ecosystems.",
      "icon": "Cpu"
    },
    {
      "label": "August 7, 2026",
      "title": "Public Disclosure",
      "content": "MiniMax launches Code 2.0 and publicly credits the Pi framework by name.",
      "icon": "Megaphone"
    }
  ]
}
:::

### Does the Minimalism Actually Pay Off?

According to Pi's maintainer organization, Earendil, the minimal approach yields significant performance gains. 

In a benchmark reported by Earendil (referencing internal Databricks evaluations published around August 5, 2026), Pi achieved the highest pass rate of any tested agent harness when paired with Claude Opus 4.8. Earendil claims this was achieved at a meaningfully lower cost than competing frameworks because Pi sends roughly 3x less context per turn. *(Note: This is a maintainer-published result, not an independently audited third-party benchmark).*

Separately, Earendil's case studies report that Shopify built an internal autonomous optimization loop (`pi-autoresearch`) directly as a Pi extension. The reported results included a 300x speedup in unit tests and a 20% faster React component mount time. 

Pi also encourages radical transparency. They provide a companion tool (`pi-share-hf`) that allows developers to publish their raw agent transcripts to a public Hugging Face dataset, aiming to build a real-world repository of agent failures and fixes.

### What MIT Actually Requires — and What MiniMax Did Anyway

The MIT License only requires that a copy of the license and copyright notice be included in the source distribution. It does not require a company to name-drop the open-source dependency in a consumer-facing launch tweet. 

MiniMax chose to credit Pi publicly anyway.

### If You're Evaluating or Building on This

If you are navigating this ecosystem, keep a few things in mind:

1. **If you are building on Pi:** Read the permissions documentation first. Do not assume execution isolation exists. You must explicitly implement Gondolin, Docker, or OpenShell.
2. **If you are contributing to Pi:** Expect your first pull request to be automatically closed. Do not take it personally; read `CONTRIBUTING.md` and follow the ladder.
3. **If you are evaluating MiniMax Code 2.0:** Ask your enterprise rep directly how their hosted environment handles process containment and the Pi permissions gap, as this cannot be audited externally.

### The Bottom Line

Crediting an open-source framework cost MiniMax nothing they weren't already obligated to give under the MIT license, yet they did it loudly and voluntarily. That level of transparency is rare in the frontier AI industry—even if the framework they revealed happens to be a complex, minimalist powerhouse that delegates its hardest security problems to the end user.
