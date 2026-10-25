# Architecture

## The shape of the system

This is a React 19 + Vite 6 single-page application with a **build-time static SEO layer**. There is no application server, database, CMS, or API key in the deployed bundle. The only runtime dependency is static hosting (Hostinger, Apache/LiteSpeed).

The site has three public routes:

- `/` — the portfolio, services, experience and latest writing.
- `/blog/` — The Neural Log index, topic filters and tech tree.
- `/blog/<slug>/` — a single article with ELI5/Developer modes, interactive widgets, sources and related posts.
- `/hire/` — commercial landing page for AI/ML, vision, LLM and full-stack work.

Anything else resolves to the custom 404 page.

## Data flow

```
src/content/blogs/*.md
        │
        ├── scripts/build-blog-index.mjs  → src/generated/blog-index.json (metadata only)
        │                                      used by Home, BlogList, TechTree, related posts
        │
        └── scripts/generate-seo.mjs      → dist/blog/<slug>/index.html
                                            dist/blog/index.html
                                            dist/hire/index.html
                                            dist/index.html (home fallback)
                                            dist/sitemap.xml
                                            dist/feed.xml
                                            dist/llms.txt + llms-full.txt
                                            dist/robots.txt
```

The React bundle never imports the article bodies eagerly. `src/lib/blogUtils.js` registers the markdown files with `import.meta.glob(..., { eager: false })` and loads exactly one body when a reader opens a post. The metadata index is ~80KB; the full corpus is ~1.6MB and lives in per-post chunks.

`src/lib/content/` is the single source of truth for parsing:

- `frontmatter.js` — frontmatter, custom `:::` blocks, reading time, unsafe-HTML checks. No markdown renderer, so it stays out of the entry graph.
- `markdown.js` — `marked` configuration, heading IDs, table wrapping, math-slot protection.
- `urls.js` — canonical URL helpers, site constants, locations.

Both the browser and the Node build scripts import these modules, so preview and production cannot drift.

## URL policy

Every canonical URL ends with a slash:

- `https://abrarakhunji.com/`
- `https://abrarakhunji.com/blog/`
- `https://abrarakhunji.com/blog/<slug>/`
- `https://abrarakhunji.com/hire/`

Old date-prefixed URLs (`/blog/2026-09-20-slug`) are 301-redirected to the clean slug by `public/.htaccess`. The build does **not** emit hundreds of redirect HTML pages. This keeps the sitemap canonical-only and reduces "Page with redirect" noise in Search Console.

## Structured data ownership

`Person` and `WebSite` entities are shared across every page. Homepage-only schemas are tagged `data-page-only="true"` in `index.html`; `cleanBaseHtml()` strips them when generating subpages. Each article adds `TechArticle`/`BlogPosting`, `BreadcrumbList`, and `FAQPage`. `/hire/` adds `ProfessionalService` and its own FAQ/breadcrumb schemas.

## Error handling

- `src/App.jsx` wraps every route in `ErrorBoundary` keyed by pathname.
- `src/components/ErrorBoundary.jsx` renders a branded recovery screen; stack traces only appear in development.
- `src/pages/NotFound.jsx` handles unknown client routes with `noindex`.
- `public/404.html` is the static server 404 and is wired through `ErrorDocument 404 /404.html`.
- Blog bodies have loading skeletons, a retry state, and a safe markdown renderer.

## Performance budget

- Entry JavaScript: ~200KB minified / ~58KB gzipped.
- Shared vendor core: ~1.3MB minified / ~309KB gzipped.
- KaTeX, Recharts and markdown renderers are lazy chunks.
- All 57 post bodies are lazy chunks.
- The entry HTML is not cached; hashed assets are cached for one year.

Further gains would come from self-hosting font subsets, generating responsive image variants, and replacing the hand-written prerender shell with a full SSG. Those are deliberate follow-ups, not hidden assumptions.

## Security

- No secrets in the client or repository. `.env` is ignored and unused by the build.
- No public PHP proxy or LLM endpoint is deployed.
- `public/.htaccess` sets HSTS, nosniff, referrer policy, permissions policy, frame protection, blocks dotfiles and dot-scoped archives, and adds a custom 404.
- Markdown is validated at build time against raw `<script>`, `<iframe>`, inline event handlers and `javascript:` URLs.

## Known trade-offs

- The static article/home fallback is injected into `#root` for crawlers and no-JS visitors. React replaces it on hydration. This is a prerender shell, not a full SSG; the visible transition is brief because the entry bundle is small.
- Blog hero images are still large JPEGs. The image pipeline is the next meaningful performance project.
- There is no CMS. Content is markdown in git, which is intentional for reviewability and versioned SEO.
