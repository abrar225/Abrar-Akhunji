# SEO, AEO and GEO strategy

This is the working plan for visibility on Google, Bing/Copilot, ChatGPT Search, Perplexity, Claude and Gemini. It is deliberately concrete: page mapping, indexation fixes, content rules and a 90-day sequence.

## 1. Current diagnosis

Search Console showed 39 indexed pages and 53 not indexed. The architecture had three likely contributors:

1. **URL ambiguity.** Every post was served with a trailing slash, while canonical tags and the sitemap used the non-slash URL. That creates a redirect/canonical conflict.
2. **Redirect bloat.** Fifty-seven legacy date-prefixed URLs were emitted as HTML redirect pages. Those become "Page with redirect" entries and consume crawl attention.
3. **A client-rendered article with a hand-maintained static copy.** Crawlers had content, but the canonical layer was duplicated and drift-prone.

All three are fixed in this repository. The sitemap now contains only canonical trailing-slash URLs, legacy URLs are 301s in `.htaccess`, and static pages are generated from the same data as the React app.

## 2. Page and keyword map

| Intent | Primary phrase | Supporting phrases | Target page |
|---|---|---|---|
| Identity | AI/ML engineer Ahmedabad | full-stack developer Ahmedabad, Python developer Ahmedabad, computer vision engineer India | `/` |
| Commercial | hire AI engineer Ahmedabad | AI consultant Ahmedabad, computer vision consultant, LLM engineer Gandhinagar, full-stack developer Bangalore | `/hire/` |
| Services | computer vision development India | image classification, Vision Transformer, medical imaging AI | `/hire/` + case studies |
| Services | LLM and RAG development | agent systems, retrieval augmented generation, LLM evaluation | `/hire/` + technical posts |
| Informational | LLM inference optimization | KV cache, speculative decoding, vLLM, SGLang, quantization | `/blog/` cluster |
| Informational | agent memory architecture | context compression, long-term memory, tool-using agents | `/blog/` cluster |
| Informational | model architecture explained | mixture of experts, latent attention, Mamba, test-time compute | `/blog/` cluster |
| Local | AI engineer near me / Gujarat | Ahmedabad, Gandhinagar, Gujarat | `/` + `/hire/` |

The `<meta name="keywords">` tag is present for completeness but does not influence Google rankings. Rankings come from the page copy, internal links, entity consistency, source quality and crawl health.

## 3. Location strategy

The site now states a real base (Ahmedabad) and real service coverage (Ahmedabad, Gandhinagar, Bangalore, remote). Keep it factual:

- Do not create dozens of thin "AI engineer in <city>" doorway pages. One strong `/hire/` page with service, process, proof and FAQ is better than ten empty city pages.
- If a Google Business Profile is appropriate, use the real service-area business setup for Ahmedabad/Gandhinagar. Do not invent a Bangalore office.
- Add city context only where it is true: on-site work, workshops, project travel, time-zone overlap.
- Use `ProfessionalService` schema with `areaServed` for Ahmedabad, Gandhinagar, Bangalore and Remote.

## 4. Indexation plan

Do these in order after deploying:

1. **Verify the canonical URLs.** In Search Console, inspect `/`, `/blog/`, `/hire/` and three posts. Confirm the user-declared canonical matches the inspected URL and returns 200.
2. **Submit `sitemap.xml`.** It contains 60 canonical URLs.
3. **Request indexing** for `/hire/`, `/blog/` and the five strongest posts. Do not request all 57 at once.
4. **Watch the "Page indexing" reasons.** Expect the 57 legacy redirect URLs to drop out over time. If "Crawled – currently not indexed" persists, work on source quality and internal links, not on resubmission.
5. **Add IndexNow** for Bing after the domain is stable. Generate a key file and ping the API on deploy. This is optional but cheap.
6. **Keep HTML uncached** (the `.htaccess` does), so a publish is visible immediately.

## 5. Content quality and E-E-A-T

The archive has strong technical depth but only 4 of 57 posts had a Sources section. That is the biggest content risk. Every new post should include:

- A `Sources` or `References` section with primary links (paper, repo, official docs, release notes).
- A short "What I verified / what I did not verify" note when benchmark claims are quoted.
- One concrete example, diagram, table or measurement the reader cannot get from a press release.
- Internal links to 2–3 related posts and to `/hire/` where commercially relevant.
- A canonical author identity: AI/ML & Full-Stack Engineer, Ahmedabad. Avoid "Senior" unless it matches the public record.

A realistic cadence is two strong, sourced posts per week rather than seven thin daily posts. Search quality systems reward depth and originality, not volume.

## 6. On-page rules

- One `<h1>` per page; the primary phrase appears naturally in the title, H1 and first paragraph.
- Title: roughly 50–60 characters. Description: roughly 140–160 characters, written as a reason to click.
- Every H2 should be answerable in its first two sentences (AEO).
- Use tables for benchmarks, ordered lists for processes, and FAQ blocks for real questions.
- Add related posts and topic filters so every article is two clicks from the index.
- Keep the `BlogPosting`/`TechArticle`, `BreadcrumbList`, `FAQPage`, `Person` and `WebSite` entities consistent.
- Do not stuff city names or keywords into every paragraph.

## 7. AEO / GEO checklist

- `llms.txt` and `llms-full.txt` are generated with services, locations, post summaries and full text.
- RSS is generated at `/feed.xml`.
- AI crawler permissions are explicit in `robots.txt`.
- Each article has a direct-answer block, FAQ schema, author entity and a stable canonical URL.
- Quotes and statistics must have a visible source. LLM answer engines preferentially cite passages that are attributable and specific.
- Keep the "About the author" block on every post with a link to `/hire/`.

## 8. Off-page and distribution

- Keep GitHub, LinkedIn, X, Hugging Face and the site's `sameAs` links consistent.
- Republish selected posts on LinkedIn or dev.to with a canonical back to the original. Do not republish the whole archive.
- For client work, link the `/hire/` page from LinkedIn, proposals and project READMEs.
- Ask for a link only where it is earned: open-source READMEs, guest analyses, community write-ups.
- Avoid link schemes and paid guest-post networks.

## 9. 90-day sequence

**Weeks 1–2**
- Deploy the new canonical/sitemap/301 architecture.
- Submit the sitemap; request indexing for `/hire/`, `/blog/` and the top five posts.
- Confirm no legacy redirect pages remain in the sitemap.
- Add a Google Business Profile only if eligible.

**Weeks 3–6**
- Publish two sourced case studies: one computer-vision system, one full-stack product.
- Add Sources sections to the ten highest-impression posts.
- Add related posts and internal links from every post to `/hire/` or a relevant cluster.

**Weeks 7–12**
- Build four comparison/explainer pages around commercial intent (for example: RAG vs fine-tuning, on-device vs cloud inference, Vision Transformer vs CNN for inspection).
- Update titles/descriptions for pages with impressions but low CTR.
- Review Search Console queries weekly and map every new query to a page.

## 10. Measurement

Track monthly:

- Indexed canonical pages / total canonical pages.
- Impressions and clicks for the target phrases in the table above.
- Average position for `/hire/` and the top five posts.
- CTR on pages ranking 5–20; improve title/description before writing new content.
- Referring domains from genuine sources.
- Contact form/email enquiries attributed to `/hire/`.

Do not judge success by the number of posts. Judge it by indexed pages, qualified impressions and enquiries.
