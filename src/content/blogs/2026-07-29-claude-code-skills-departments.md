---
title: "Your Claude Code Workforce: 42 Skills Across 7 Departments"
date: "2026-07-29"
description: "42 real Claude Code skills, organized into 7 departments — Dev, Design, Marketing, Social, Finance, Ops, Legal. What each one does and how to actually use it."
tags: ["AI", "Claude Code", "Anthropic", "Developer Tools", "AI Agents", "Productivity"]
author: "Abrar Akhunji"
heroImage: "/images/blog/claude-code-skills/hero.jpg"
techTree:
  branch: "AI Tooling"
  level: 2
  prerequisites: ["2026-07-18-opencode-desktop-launch", "2026-07-20-ponytail-ai-agent-lazy-senior-dev"]
faq:
  - question: "What is a Claude Code skill?"
    answer: "A Claude Code skill is an extension packaged around an open SKILL.md file. It provides structured instructions, workflows, and tool integrations that Claude reads automatically when relevant tasks are triggered."
  - question: "Are all 42 of these skills official Anthropic releases?"
    answer: "No. This 7-department framework comes from a curated community org-chart by creator @leadgenman. While some skills (like frontend-design or docx) correspond to Anthropic reference skill categories, many are community-built tools like Jesse Vincent's Superpowers and Upstash's Context7."
  - question: "Should I install all 42 skills at once?"
    answer: "No. Installing too many skills adds unnecessary overhead to Claude's system context and can cause conflicting guidance. Senior developers recommend keeping 3 to 5 core daily drivers installed (like Superpowers and Context7) and running specialized tools on demand."
  - question: "Is it safe to install third-party Claude Code plugins?"
    answer: "As noted in Anthropic's plugin marketplace documentation, third-party skills and MCP servers are not independently audited by Anthropic. Always verify the source repository and author before installing community plugins."
---

:::eli5
*Written by Abrar Akhunji*

Imagine turning your terminal into a virtual company with seven specialized departments.

Recently, tech creator **@leadgenman** published a viral breakdown titled **"Your Claude Workforce"**, organizing **42 real Claude Code skills** into a company org-chart across seven teams: **Dev, Design, Marketing, Social & Content, Finance, Operations, and Legal**.

While this org chart is a community framework rather than an official Anthropic product feature, it is a brilliant mental model for how Claude Code has grown beyond simple code completion.

Here is a complete breakdown of all 42 skills, how the `SKILL.md` plugin architecture works, and how to build your AI workforce like a senior engineer without cluttering your workspace.
:::

:::dev
*Written by Abrar Akhunji*

On social media, creator **@leadgenman** released **"Your Claude Workforce"**—a curated architectural framework mapping **42 real Claude Code skills** across seven functional departments: **Developers, Design, Marketing, Social & Content, Finance, Operations, and Legal**.

It is important to clarify upfront: **this is a community curation, not an official Anthropic release.** However, many of the listed tools (such as Jesse Vincent’s *Superpowers* and Upstash’s *Context7*) are widely adopted, open-source projects in the active Claude ecosystem.

Evaluating this 42-skill map reveals how extensible the CLI environment has become. Below is a deep-dive breakdown of the full 7-department stack, how the underlying `SKILL.md` format functions, security considerations for third-party MCP servers, and strategic recommendations for plugin management.
:::

:::interactive concept
{
  "title": "The Virtual Company Org Chart (42 Skills / 7 Departments)",
  "steps": [
    {
      "label": "Dept 01",
      "title": "Developers",
      "content": "Superpowers, Context7, MCP Builder, Skill Creator, Webapp Testing, Claude-Mem.",
      "icon": "Code"
    },
    {
      "label": "Dept 02",
      "title": "Design Studio",
      "content": "frontend-design, web-artifacts, canvas-design, algorithmic-art, ui-ux-pro-max, slack-gif.",
      "icon": "Palette"
    },
    {
      "label": "Dept 03",
      "title": "Growth & Marketing",
      "content": "seo-audit, programmatic-seo, ai-seo, cro, ad-creative, mktg-psychology.",
      "icon": "TrendingUp"
    },
    {
      "label": "Dept 04",
      "title": "Social & Content",
      "content": "social, copywriting, content-strategy, video, pillar-content, email-sequences.",
      "icon": "MessageSquare"
    },
    {
      "label": "Dept 05",
      "title": "Finance (CFO Desk)",
      "content": "dcf-model, 3-statements, lbo-model, comps-analysis, pricing, pitch-deck.",
      "icon": "DollarSign"
    },
    {
      "label": "Dept 06",
      "title": "Operations Backbone",
      "content": "sop-builder, incident-postmortem, business-case, launch-runbook, internal-comms, xlsx.",
      "icon": "Cpu"
    },
    {
      "label": "Dept 07",
      "title": "Legal Desk",
      "content": "contract-review, nda-triage, legal-risk, compliance, docx, sql-queries.",
      "icon": "Shield"
    }
  ]
}
:::

:::eli5
### What Are Claude Code Skills, Actually?

Before diving into the departments, how do skills actually work in Claude Code?

At the core of every skill is an open format called **`SKILL.md`**. It is a structured Markdown file containing instructions, workflows, and rules. When you install a skill into Claude Code, you don't even have to type a special command every time—Claude automatically reads the file and activates those instructions whenever you ask a relevant question.

You can install skills through Claude Code's built-in plugin marketplace or via CLI commands:
```bash
# Adding a plugin marketplace source
/plugin marketplace add <repository-url>

# Installing a skill by name
/plugin install <skill-name>
```

> ⚠️ **Safety Tip:** Anthropic's plugin marketplace documentation explicitly notes that third-party plugins and MCP servers are **not independently audited by Anthropic**. Always check the plugin's source repository before installing it.
:::

:::dev
### What Are Claude Code Skills, Actually?

Architecturally, a Claude Code skill relies on the open **`SKILL.md`** specification—a standardized markdown metadata structure defined with YAML frontmatter and instructional system prompts. 

When placed in a workspace or installed globally, Claude inspects the active skill manifest during session initialization. When a user prompt matches a skill's declared domain or trigger pattern, Claude contextually loads the instructional block into its reasoning loop without requiring manual invocation flags.

```markdown
---
name: example-skill
description: Automatic workflow trigger for spec validation
---
# Skill Instructions
1. Inspect project root for config files...
2. Run test assertions before generating output...
```

Plugins are typically distributed via git repositories or package registries (`npx skills add <name>`) and managed within the CLI via `/plugin` commands.

> 🔒 **Marketplace Security & Trust Boundary:** As stated in Anthropic's official marketplace documentation, Anthropic does not review, sandbox, or verify third-party plugin source code or bundled MCP (Model Context Protocol) binaries. Because MCP servers can execute arbitrary local shell commands or network requests, developers should audit all third-party `SKILL.md` manifests and associated server implementations prior to deployment.
:::

---

### Department 01/07: Developers
*"Ship code faster, from scaffold to QA."*

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-accent font-mono mb-1">Superpowers</div>
    <p class="text-xs text-muted leading-relaxed">Created by Jesse Vincent ("obra"), this MIT-licensed agentic skill pack enforces test-driven development (TDD), systematic debugging, and git worktree isolation. Includes a meta-skill that prevents Claude from cutting corners.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-accent font-mono mb-1">Context7</div>
    <p class="text-xs text-muted leading-relaxed">Built by Upstash, this MCP server fetches live, version-exact documentation directly from source repositories into Claude's context window, eliminating hallucinations of deprecated APIs.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">MCP Builder</div>
    <p class="text-xs text-muted leading-relaxed">Guides the scaffolding and protocol implementation for building custom Model Context Protocol (MCP) servers to connect Claude to proprietary internal APIs.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">Skill Creator</div>
    <p class="text-xs text-muted leading-relaxed">Automates the creation of new SKILL.md manifests by observing your repeating workflow steps and packaging them into reusable skill modules.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">Webapp Testing</div>
    <p class="text-xs text-muted leading-relaxed">Orchestrates automated headless browser testing (via Playwright or Puppeteer) to verify UI components, form validations, and user navigation flows.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">Claude-Mem</div>
    <p class="text-xs text-muted leading-relaxed">Maintains persistent cross-session memory logs, storing architectural decisions, codebase quirks, and environment configurations across CLI restarts.</p>
  </div>
</div>

---

### Department 02/07: Design
*"UI that never looks templated."*

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">frontend-design</div>
    <p class="text-xs text-muted leading-relaxed">Generates production-grade React components using modern Tailwind CSS patterns, glassmorphic styling, and micro-animations instead of basic generic HTML.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">web-artifacts</div>
    <p class="text-xs text-muted leading-relaxed">Creates self-contained interactive web artifacts powered by shadcn/ui and Radix primitives for quick UI visual prototyping.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">canvas-design</div>
    <p class="text-xs text-muted leading-relaxed">Renders clean vector visual art, marketing banners, and structured layout graphics, exporting directly to high-resolution PNG or PDF formats.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">algorithmic-art</div>
    <p class="text-xs text-muted leading-relaxed">Generates mathematical and generative visual art scripts using p5.js and HTML5 Canvas for dynamic canvas backgrounds.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">ui-ux-pro-max</div>
    <p class="text-xs text-muted leading-relaxed">Provides full design-system audit rules, checking color contrast (WCAG AA/AAA compliance), typography scales, and responsive layout grids.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">slack-gif</div>
    <p class="text-xs text-muted leading-relaxed">Compiles frame-by-frame canvas animations into Slack-ready custom GIFs for feature announcements and team celebrations.</p>
  </div>
</div>

---

### Department 03/07: Marketing
*"Copy, SEO and ads that convert."*

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">seo-audit</div>
    <p class="text-xs text-muted leading-relaxed">Scans HTML documents and React components to identify technical SEO flaws, missing Open Graph tags, heading hierarchy gaps, and image alt attributes.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">programmatic-seo</div>
    <p class="text-xs text-muted leading-relaxed">Generates data-driven landing page templates at scale, mapping CSV/JSON datasets into search-engine-indexed static pages.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">ai-seo</div>
    <p class="text-xs text-muted leading-relaxed">Structures website content, direct answer summaries, and schema markup to maximize visibility inside AI search engines like Perplexity and SearchGPT.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">cro</div>
    <p class="text-xs text-muted leading-relaxed">Analyzes landing page layouts and hero copy against proven Conversion Rate Optimization (CRO) heuristic frameworks to increase sign-up conversion.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">ad-creative</div>
    <p class="text-xs text-muted leading-relaxed">Generates multi-platform ad copy variations (Meta, Google Search, LinkedIn) tailored to different audience segments and pain points.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">mktg-psychology</div>
    <p class="text-xs text-muted leading-relaxed">Applies behavioral economics triggers (loss aversion, social proof, scarcity, anchoring) to product positioning and sales copy.</p>
  </div>
</div>

---

### Department 04/07: Social & Content
*"Feed the algorithm on autopilot."*

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">social</div>
    <p class="text-xs text-muted leading-relaxed">Repurposes long-form blog posts and technical updates into formatted X/Twitter threads, LinkedIn posts, and short social carousels.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">copywriting</div>
    <p class="text-xs text-muted leading-relaxed">Refines existing product descriptions and marketing copy to remove corporate jargon, improve clarity, and heighten emotional impact.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">content-strategy</div>
    <p class="text-xs text-muted leading-relaxed">Maps out multi-week editorial content calendars, keyword target clusters, and publication schedules for tech blogs.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">video</div>
    <p class="text-xs text-muted leading-relaxed">Drafts video scripts, spoken audio hooks, screen-recording storyboards, and YouTube descriptions for product launches.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">pillar-content</div>
    <p class="text-xs text-muted leading-relaxed">Structures comprehensive ultimate guides and links supporting sub-topic articles into cohesive hub-and-spoke content networks.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">email-sequences</div>
    <p class="text-xs text-muted leading-relaxed">Authors multi-stage email onboarding sequences, product update newsletters, and automated churn-recovery drip campaigns.</p>
  </div>
</div>

---

### Department 05/07: Finance
*"Model the numbers before you spend."*

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">dcf-model</div>
    <p class="text-xs text-muted leading-relaxed">Builds Discounted Cash Flow valuation models with terminal value calculations, WACC assumptions, and sensitivity analysis tables.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">3-statements</div>
    <p class="text-xs text-muted leading-relaxed">Constructs dynamically linked Income Statement, Balance Sheet, and Cash Flow financial models for financial forecasting.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">lbo-model</div>
    <p class="text-xs text-muted leading-relaxed">Calculates Leveraged Buyout debt capacity, interest schedules, internal rate of return (IRR), and exit equity multiples.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">comps-analysis</div>
    <p class="text-xs text-muted leading-relaxed">Assembles public comparable company metrics (EV/EBITDA, P/E, EV/Revenue) to establish valuation benchmarks.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">pricing</div>
    <p class="text-xs text-muted leading-relaxed">Models SaaS pricing tiers, freemium conversion boundaries, usage-based unit economics, and expansion revenue levers.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">pitch-deck</div>
    <p class="text-xs text-muted leading-relaxed">Structures seed and Series A investor pitch slide outlines, financial summaries, TAM calculations, and competitive landscapes.</p>
  </div>
</div>

---

### Department 06/07: Operations
*"Run the business like a machine."*

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">sop-builder</div>
    <p class="text-xs text-muted leading-relaxed">Transforms informal team processes into standardized operational procedure documents (SOPs) with clear role assignments and checklists.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">incident-postmortem</div>
    <p class="text-xs text-muted leading-relaxed">Drafts blameless incident post-mortems following production outages, mapping root cause analysis and action item tracking.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">business-case</div>
    <p class="text-xs text-muted leading-relaxed">Authors formal ROI proposals, cost-benefit analyses, and resource allocation business cases for internal executive sign-off.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">launch-runbook</div>
    <p class="text-xs text-muted leading-relaxed">Outlines chronological deployment checklists, DNS cutover steps, database migration procedures, and rollback triggers.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">internal-comms</div>
    <p class="text-xs text-muted leading-relaxed">Drafts company updates, executive memos, internal Q&A documents, and engineering sprint summaries.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">xlsx</div>
    <p class="text-xs text-muted leading-relaxed">Generates, updates, and formats native Microsoft Excel spreadsheets containing dynamic formulas and data validation tables.</p>
  </div>
</div>

---

### Department 07/07: Legal
*"Read the fine print for you."*

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">contract-review</div>
    <p class="text-xs text-muted leading-relaxed">Performs line-by-line risk assessments on vendor and customer service agreements, flagging unusual indemnification clauses.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">nda-triage</div>
    <p class="text-xs text-muted leading-relaxed">Automatically triages standard Mutual Non-Disclosure Agreements against company playbook standards to highlight non-standard terms.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">legal-risk</div>
    <p class="text-xs text-muted leading-relaxed">Evaluates new feature proposals against intellectual property risk, liability exposure, and terms-of-service compliance.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">compliance</div>
    <p class="text-xs text-muted leading-relaxed">Checks data architecture plans against regulatory frameworks including GDPR, CCPA, SOC2, and HIPAA privacy rules.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">docx</div>
    <p class="text-xs text-muted leading-relaxed">Generates and edits Microsoft Word documents with native tracked changes, comments, and structured legal styling.</p>
  </div>
  <div class="p-5 rounded-2xl border border-line bg-surface">
    <div class="text-sm font-bold text-fg font-mono mb-1">sql-queries</div>
    <p class="text-xs text-muted leading-relaxed">Writes precise SQL queries to extract user data audit logs and database records required for legal discovery requests.</p>
  </div>
</div>

---

:::interactive concept
{
  "title": "Recommended Installation Strategy (Don't Hoard Skills)",
  "steps": [
    {
      "label": "Tier 1: Daily Drivers (3–5 Installed)",
      "title": "Core Workspace Extensions",
      "content": "Keep active skills you use every single day. For developers: Superpowers + Context7 + Webapp Testing.",
      "icon": "CheckCircle"
    },
    {
      "label": "Tier 2: Task-Based (On-Demand)",
      "title": "Invoke Per Project",
      "content": "Run Marketing, Legal, or Finance skills only when actively performing those tasks. Don't leave them globally active.",
      "icon": "Clock"
    },
    {
      "label": "Tier 3: Skip / Audit",
      "title": "Clean Up Clutter",
      "content": "Audit installed skills monthly. Remove unused plugins to prevent prompt context bloating and instruction drift.",
      "icon": "Trash"
    }
  ]
}
:::

:::eli5
### How to Use This Like a Senior Developer

Seeing 42 shiny skills makes it tempting to install all of them at once. **Don't do it.**

Here is why: every skill you install adds instructions to Claude's memory on every single turn. If you install 42 skills, Claude has to process hundreds of extra rules before answering even a simple question. This causes "instruction drift"—where Claude gets confused by conflicting rules—and wastes your token budget.

Instead, follow this simple 3-tier strategy:
1. **Always-On Daily Drivers:** Install 3 to 5 core tools for your primary job (e.g., *Superpowers* and *Context7* for developers).
2. **On-Demand Task Tools:** Run skills for other departments (like *contract-review* or *dcf-model*) only when you are actively working on a specific document.
3. **Monthly Audit:** Uninstall skills you haven't used in 30 days, just like you would clean up unused software dependencies.
:::

:::dev
### Strategic Plugin Management: Avoiding Instruction Drift

While @leadgenman's 7-department curation provides an impressive taxonomy, installing all 42 skills simultaneously is anti-pattern in production CLI environments.

#### The Cost of Skill Over-Provisioning
1. **Context Window Contention:** System prompts and instructions defined in active `SKILL.md` manifests are evaluated during session reasoning. Loading dozens of unneeded skills consumes valuable token overhead.
2. **Instruction Drift & Rule Collisions:** Overlapping guidelines (e.g., a marketing copy skill colliding with a strict legal review skill) can degrade Claude's execution precision.
3. **Security Surface Area:** Every active MCP plugin represents an unmanaged external dependency.

#### The 3-Tier Deployment Protocol
- **Tier 1 (Global System Skills):** Keep 3–5 core engineering skills installed globally (e.g., *Superpowers*, *Context7*, *frontend-design*).
- **Tier 2 (Project-Local Manifests):** Store specialized domain skills inside your target repository's `.claude/skills/` directory so they only activate when working in that project.
- **Tier 3 (Transient Execution):** Invoke single-use tools (such as *dcf-model* or *nda-triage*) on demand, then purge them from the workspace configuration once the artifact is delivered.
:::

:::eli5
### Frequently Asked Questions

* **What is a Claude Code skill?** It is a packaged extension using an open `SKILL.md` format that gives Claude specific instructions and tools for specialized tasks.
* **Are these official Anthropic skills?** No. This 42-skill list comes from a community curation by @leadgenman. Some skills correspond to Anthropic reference categories, while others are open-source community projects.
* **Do I need to install all 42 skills?** No. You should only install 3 to 5 core skills that map to your daily workflow.
* **Is it safe to install third-party plugins?** Generally yes for popular tools like *Superpowers* or *Context7*, but you should always inspect third-party plugin repositories before installing.
:::

:::dev
### FAQ

* **What is a Claude Code skill?** A skill is a workspace extension built around a standardized `SKILL.md` file. It exposes structured instructions, API workflows, and MCP server tools to Claude Code.
* **Are these 42 skills officially created by Anthropic?** No. This 7-department org chart was curated by creator @leadgenman. It maps out real open-source tools across the broader Claude ecosystem.
* **Does installing skills increase API token costs?** Yes. Active skill instructions are included in the session context, slightly increasing input token consumption per turn.
* **Where can I browse or search for skills?** You can discover skills via the official Claude Code plugin marketplace (`/plugin marketplace add`) or by browsing the Anthropic community skill directories.
:::

:::eli5
### The Verdict

The real value of @leadgenman's 7-department org chart isn't just the catchy visual—it is realizing how far Claude Code has expanded beyond basic code completion.

Whether you are using [OpenCode Desktop](/blog/2026-07-18-opencode-desktop-launch) for agentic coding, controlling tech debt with [Ponytail](/blog/2026-07-20-ponytail-ai-agent-lazy-senior-dev), or testing models like [Gemini 3.6 Flash](/blog/2026-07-22-gemini-3-6-flash-launch) and [Claude Opus 5](/blog/2026-07-25-claude-opus-5-launch), mastering skill curation is the key to running a lean, powerful AI workflow.

Check out the original carousel by **@leadgenman** on social media, explore the [Superpowers repo](https://github.com/obra/superpowers), and start curating your own custom team today.
:::

:::dev
### The Verdict

The 7-department "Claude Workforce" curation highlights the rapid maturity of the Claude Code ecosystem. By combining modular `SKILL.md` definitions with MCP server integrations, developers can extend their terminal into a full-stack execution hub.

However, disciplined plugin management is critical. Treat skills as targeted dependencies: pin trusted versions, audit third-party code, and keep your global context lean.

For related agentic workflows, explore our deep-dives on [OpenCode Desktop](/blog/2026-07-18-opencode-desktop-launch), [Ponytail](/blog/2026-07-20-ponytail-ai-agent-lazy-senior-dev), and [Claude Opus 5](/blog/2026-07-25-claude-opus-5-launch). Follow creator **@leadgenman** for ongoing workforce updates.
:::
