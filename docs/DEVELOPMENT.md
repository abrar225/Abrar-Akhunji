# Development

## Requirements

- Node.js 20 or newer
- npm
- No PHP, database, or API keys are required.

## Install and run

```bash
npm install
npm run dev
```

`predev` generates `src/generated/blog-index.json` from the markdown corpus. The file is gitignored and rebuilt automatically.

Production build and preview:

```bash
npm run build
npm run preview
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server with the content index |
| `npm run build` | Content index → Vite build → static SEO layer |
| `npm run preview` | Preview the built site |
| `npm run lint` | ESLint for app, scripts and tests |
| `npm run validate:content` | Validate every post without writing the index |
| `npm test` | Unit tests for parsers, URLs, index integrity and hosting config |
| `npm run test:e2e` | Build, start preview, run browser checks (requires Playwright Chromium) |
| `npm run deploy:hostinger` | Build and deploy `dist/` through the Hostinger API |

Install the E2E browser once:

```bash
npx playwright install chromium
```

## Adding or editing a post

Create `src/content/blogs/YYYY-MM-DD-your-slug.md`. The date prefix is stripped from the public URL.

```markdown
---
title: "A precise, specific title"
date: "2026-10-25"
updated: "2026-10-26"
description: "One or two sentences that work as a meta description."
tags: ["LLM Inference", "Systems"]
author: "Abrar Akhunji"
heroImage: "/images/blog/your-slug/hero.jpg"
techTree:
  branch: "Systems & Inference"
  level: 2
  prerequisites: ["some-earlier-post-slug"]
faq:
  - question: "A question someone would search for?"
    answer: "A direct, factual answer."
---

Opening section.

:::eli5
Plain-language explanation.
:::

:::dev
Technical breakdown.
:::interactive chart
{"title":"Benchmark","xKey":"metric","data":[{"metric":"A","value":1}],"series":[{"name":"Score","dataKey":"value"}]}
:::
More technical detail.
:::
```

Rules enforced by the build:

- `title`, `date`, `description`, `author` and at least one tag are required.
- Local `heroImage` and inline image paths must exist under `public/`.
- `:::eli5`, `:::dev` and `:::interactive` blocks must be closed.
- Interactive blocks must contain valid JSON.
- Raw `<script>`, `<iframe>`, `<object>`, `<embed>`, inline event handlers and `javascript:` URLs fail the build.
- Slugs must be unique.
- Prerequisite slugs must match a published post (otherwise a warning).

## Content blocks

- `:::eli5` — simplified mode.
- `:::dev` — developer mode.
- `:::interactive <type>` — a JSON widget. Types: `chart`, `concept`, `flashcards`, `quiz`, `timeline`, `prompt-playground`.
- Interactive widgets can be nested inside an ELI5 or Developer block; the parser flushes the surrounding text and resumes the parent mode afterwards.
- A bare `:::` closes the current block.

## Changing services, locations or projects

- `src/data/services.json` powers the `/hire/` page, static hire page, schema and `llms.txt`.
- `src/data/portfolio.json` powers the portfolio, static homepage fallback and project list.
- Never duplicate this copy by hand in the static generator.

## SEO output

`npm run build` generates:

- `dist/blog/<slug>/index.html`
- `dist/blog/index.html`
- `dist/hire/index.html`
- `dist/sitemap.xml`
- `dist/feed.xml`
- `dist/llms.txt`, `dist/llms-full.txt`
- `dist/robots.txt`

Open a generated page and check that it contains exactly one `<title>`, one canonical, `Person`/`WebSite` JSON-LD, the article schema and the visible article body.

## Troubleshooting

- **`blog-index.json` missing** — run `npm run validate:content` or `npm run build`.
- **Playwright browser missing** — run `npx playwright install chromium`.
- **Content build failure** — read the `[content] error:` line; it names the file and the exact problem.
- **Hire page or static page out of date** — run `npm run build`; those pages are generated, not edited directly.

## Environment

No environment variables are needed. If an old `.env` with `FREELLM_*` keys still exists from the removed Digital Twin, rotate those keys and delete the file; nothing in the current build reads them.
