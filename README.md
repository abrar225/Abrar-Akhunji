# Abrar Akhunji — Portfolio & The Neural Log

The production site at [abrarakhunji.com](https://abrarakhunji.com): a portfolio, a daily-ish engineering blog, and a hire page for AI/ML and full-stack work.

Built with React 19 and Vite 6. Content is markdown in git. The deploy target is static hosting on Hostinger; there is no application server, database, CMS or API key.

## What is in the site

- **Portfolio** — hero, selected work, capabilities, experience, recognition, writing and contact, with a custom Three.js/ASCII hero and a footer ecosystem.
- **The Neural Log** — 57 AI/systems posts with ELI5 and Developer reading modes, interactive widgets, topic filters, a prerequisite tech tree and related posts.
- **Hire** — services, engagement models, process, FAQ and location coverage for Ahmedabad, Gandhinagar, Bangalore and remote work.
- **Static SEO layer** — per-post semantic HTML, canonical URLs, Person/WebSite/Article/FAQ schema, sitemap, RSS, `llms.txt`, `llms-full.txt` and explicit AI crawler rules.
- **Error handling** — app-level error boundary, branded recovery screen, custom client 404 and static `404.html`.

## Stack

- React 19, React Router 7, Vite 6
- Tailwind CSS 4
- Framer Motion, GSAP, Lenis, Three.js
- `marked` for markdown, KaTeX for math, Recharts for interactive charts
- Vitest? No — `node:test` for units, Playwright for browser E2E
- Hostinger (Apache/LiteSpeed) for static hosting

## Quick start

```bash
npm install
npm run dev
```

`predev` builds the content index from `src/content/blogs/*.md`. No environment variables are required.

Production:

```bash
npm run build
npm run preview
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Content index → Vite build → static SEO artifacts |
| `npm run preview` | Preview the built site |
| `npm run lint` | ESLint |
| `npm run validate:content` | Validate every post |
| `npm test` | Unit tests |
| `npm run test:e2e` | Build + Playwright browser checks |
| `npm run deploy:hostinger` | Build and deploy `dist/` |

Full setup, authoring and troubleshooting: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Architecture in one minute

```
src/content/blogs/*.md
  ├─ build-blog-index.mjs → src/generated/blog-index.json (metadata, ~80KB)
  └─ generate-seo.mjs     → dist/blog/<slug>/index.html + sitemap + feed + llms
```

`src/lib/blogUtils.js` loads one post body on demand; the full corpus never enters the entry bundle. The parser is split into `frontmatter.js` (no renderer) and `markdown.js` (marked) so the homepage does not ship markdown tooling. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Content

Add a markdown file with frontmatter, a hero image and optional `:::eli5`, `:::dev` and `:::interactive` blocks. The build validates dates, slugs, prerequisites, images, JSON and unsafe HTML. Detailed authoring rules: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## SEO / AEO / GEO

The canonical policy is trailing-slash URLs. Legacy date-prefixed URLs are 301s in `.htaccess`, not redirect pages. Every article is pre-rendered for crawlers, has Article/Breadcrumb/FAQ schema, and is included in the sitemap and RSS feed. `llms.txt` and `llms-full.txt` expose the archive to AI crawlers.

Read [docs/SEO_GUIDELINES.md](docs/SEO_GUIDELINES.md) and the keyword/location plan in [docs/KEYWORD_STRATEGY.md](docs/KEYWORD_STRATEGY.md).

## Tests

- Unit tests cover frontmatter, custom blocks, markdown/math, URL normalization, content-index integrity and hosting configuration.
- E2E covers the home page, blog list, article, reading-mode toggle, tech tree, hire page, 404, theme, mobile navigation and console errors.
- CI runs lint, content validation, unit tests and the production build on every push and pull request.

## Deploy

See [DEPLOY.md](DEPLOY.md). The short version: `npm run deploy:hostinger`, then verify canonical tags, the sitemap, the custom 404 and security headers.

## Repo notes

- `dist/` and `src/generated/` are build artifacts and ignored.
- No secrets are required. If an old `.env` with `FREELLM_*` keys remains, rotate those keys and delete it; the AI proxy was removed.
- `AGENTS.md` is agent instructions, not application code.
- Reference clones and analysis output directories are local-only and ignored.
