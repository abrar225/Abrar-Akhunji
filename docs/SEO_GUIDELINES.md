# SEO, AEO and GEO guidelines

Publication and technical rules for `abrarakhunji.com`. The strategy and keyword map live in [KEYWORD_STRATEGY.md](./KEYWORD_STRATEGY.md).

## 1. URLs and canonicals

- Every canonical URL ends with a slash: `/`, `/blog/`, `/blog/<slug>/`, `/hire/`.
- Files may keep a `YYYY-MM-DD-` prefix in `src/content/blogs/`; the public slug strips it.
- Old date-prefixed URLs are 301-redirected in `public/.htaccess`. Do not emit redirect HTML pages.
- Never publish two URLs with the same content. Topic filters on `/blog/?tag=` are canonicalized to `/blog/`.

## 2. Static HTML for crawlers

`scripts/generate-seo.mjs` writes a complete semantic article, blog index and hire page into `<div id="root">` for every static HTML file. React replaces that shell after hydration. Crawlers and no-JS visitors receive the full body copy, headings, author, FAQ and links in the initial response.

Shared `Person` and `WebSite` schemas live in `index.html`. Homepage-only schemas carry `data-page-only="true"` and are removed from subpages. Do not duplicate a homepage canonical or title into a generated page.

## 3. Titles and descriptions

- One `<title>` per page, roughly 50–60 characters.
- One `<h1>` per page; primary phrase in the title, H1 and opening paragraph.
- Description: 140–160 characters, specific and click-worthy. No keyword lists.
- Every article needs `datePublished`, `dateModified`, author, section and tags in structured data.

## 4. Article structure

- Answer the H2's question in the first two sentences.
- Use tables for benchmarks, ordered lists for processes, and concrete code or configurations where useful.
- Add a `Sources` or `References` section with primary links.
- Add a short verification note when quoting benchmarks or vendor claims.
- Link to at least two related posts and one commercial page (`/hire/`) where relevant.

## 5. Custom content blocks

- `:::eli5` — simplified explanation.
- `:::dev` — technical breakdown.
- `:::interactive <type>` — JSON widget. The build emits a semantic table or ordered-list fallback so crawlers get the data.
- Interactive widgets may be nested inside ELI5/Developer sections. Blocks must be closed; the build fails otherwise.
- Raw HTML is allowed for trusted authoring, but `<script>`, `<iframe>`, `<object>`, `<embed>`, inline event handlers and `javascript:` URLs fail the build.

## 6. Structured data

- Shared: `Person`, `WebSite`.
- Homepage: `ProfilePage`, `BreadcrumbList`, `SpeakableSpecification`, `ItemList`.
- Article: `TechArticle` + `BlogPosting`, `BreadcrumbList`, `FAQPage` when FAQs exist, `speakable`.
- `/hire/`: `ProfessionalService`, `FAQPage`, `BreadcrumbList`.
- Use `@id` references (`https://abrarakhunji.com/#person`, `#website`) instead of repeating the full author object.
- Do not invent aggregate ratings, review counts, prices or local offices.

## 7. Social and images

- Default social card: `/images/og-default.jpg` at 1200×630.
- Post cards use the hero image; there is no per-post 1200×630 crop, so keep hero images at a wide aspect ratio.
- Every image needs an `alt` attribute. Hero images load eagerly on the article page; everything below the fold is lazy.
- Recommended next step: generate AVIF/WebP variants and per-post OG cards at build time.

## 8. Machine-readable surface

- `/sitemap.xml` — canonical URLs only.
- `/feed.xml` — RSS 2.0, 25 latest posts with full content.
- `/llms.txt` — entity summary, services, locations and post catalogue.
- `/llms-full.txt` — full archive for LLM ingestion.
- `/robots.txt` — explicit allow rules for Google, OpenAI, Anthropic, Perplexity, Apple, Meta, Cohere and Bing.
- `/.well-known/security.txt` — current contact and expiry.

## 9. Location rules

- Real base: Ahmedabad. Real coverage: Ahmedabad, Gandhinagar, Bangalore, remote.
- Use city names where the work genuinely happens. No doorway pages for cities without substance.
- Keep `areaServed`, the visible `/hire/` copy and the email signature consistent.
- A Google Business Profile is appropriate only for a real service-area business.

## 10. Indexation checklist

After every deploy:

- [ ] Sitemap contains only canonical URLs.
- [ ] No `2026-` legacy URLs in the sitemap.
- [ ] `/blog/`, `/hire/` and one post return the trailing-slash canonical.
- [ ] `/api/` does not exist.
- [ ] Unknown routes return the custom 404 with `noindex`.
- [ ] Search Console: canonical URL matches the inspected URL.
- [ ] Search Console: sitemap submitted and processed.
- [ ] `feed.xml` parses.
- [ ] One `Person` and one `WebSite` schema per page; no duplicate titles or canonicals.

## 11. Forbidden practices

- Fake dates, fake “updated” timestamps, fake credentials or fake office locations.
- Mass-generated city pages, tag pages or AI content with no original analysis.
- Unsupported benchmark claims without a source.
- Keyword stuffing in titles, alt text or schema.
- Hiding content from users while showing it to crawlers.
- Committing generated activity-log or CI files that do not correspond to real work.
