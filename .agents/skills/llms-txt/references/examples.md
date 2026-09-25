# llms.txt Examples

Real-world examples of well-crafted llms.txt files to use as reference.

## Example 1: FastHTML (Official Example)

```markdown
# FastHTML

> FastHTML is a python library which brings together Starlette, Uvicorn, HTMX, and fastcore's `FT` "FastTags" into a library for creating server-rendered hypermedia applications.

Important notes:

- Although parts of its API are inspired by FastAPI, it is *not* compatible with FastAPI syntax and is not targeted at creating API services
- FastHTML is compatible with JS-native web components and any vanilla JS library, but not with React, Vue, or Svelte.

## Docs

- [FastHTML quick start](https://fastht.ml/docs/tutorials/quickstart_for_web_devs.html.md): A brief overview of many FastHTML features
- [HTMX reference](https://github.com/bigskysoftware/htmx/blob/master/www/content/reference.md): Brief description of all HTMX attributes, CSS classes, headers, events, extensions, js lib methods, and config options

## Examples

- [Todo list application](https://github.com/AnswerDotAI/fasthtml/blob/main/examples/adv_app.py): Detailed walk-thru of a complete CRUD app in FastHTML showing idiomatic use of FastHTML and HTMX patterns.

## Optional

- [Starlette full documentation](https://gist.githubusercontent.com/jph00/809e4a4808d4510be0e3dc9565e9cbd3/raw/starlette-sml.md): A subset of the Starlette documentation useful for FastHTML development.
```

**Why it works:**
- Clear project identity in H1
- Blockquote immediately explains what it is
- Important caveats listed upfront (not FastAPI compatible, no React/Vue/Svelte)
- Links include `.md` versions for LLM consumption
- External reference (HTMX) included because it's essential
- Optional section for supplementary material

---

## Example 2: llms.txt Specification Site

```markdown
# llms.txt

> A proposal that those interested in providing LLM-friendly content add a /llms.txt file to their site. This is a markdown file that provides brief background information and guidance, along with links to markdown files providing more detailed information.

## Docs

- [llms.txt proposal](https://llmstxt.org/index.md): The proposal for llms.txt
- [Python library docs](https://llmstxt.org/intro.html.md): Docs for `llms-txt` python lib
```

**Why it works:**
- Meta example (llms.txt for the llms.txt spec)
- Extremely concise
- Links directly to .md versions

---

## Example 3: CLI Tool

```markdown
# mycli

> A command-line tool for managing cloud infrastructure with simple YAML configurations.

Requirements:
- Python 3.9+
- AWS credentials configured

## Docs

- [Getting Started](docs/getting-started.md): Installation and basic usage
- [Configuration Reference](docs/config.md): All YAML configuration options
- [CLI Commands](docs/commands.md): Complete command reference with examples

## Examples

- [Basic Deployment](examples/basic/): Simple single-service deployment
- [Multi-Region Setup](examples/multi-region/): Complex multi-region configuration

## API

- [Python SDK](docs/sdk.md): Programmatic usage from Python

## Optional

- [Migration Guide](docs/migration.md): Migrating from v1 to v2
- [Troubleshooting](docs/troubleshooting.md): Common issues and solutions
```

**Why it works:**
- States requirements upfront
- Logical section organization (Docs → Examples → API → Optional)
- Descriptions indicate complexity level ("Simple", "Complex")

---

## Example 4: JavaScript Library

```markdown
# dateutil

> A lightweight JavaScript library for date parsing, formatting, and manipulation. Zero dependencies, tree-shakeable, TypeScript-first.

Key differences from other libraries:
- Immutable by default (unlike Moment.js)
- 5KB gzipped (vs 70KB for Moment.js)
- Native ESM support

## Docs

- [API Reference](https://dateutil.dev/api.md): Complete function reference
- [Format Tokens](https://dateutil.dev/formats.md): Date format string tokens

## Examples

- [Common Patterns](https://dateutil.dev/examples.md): Parsing, formatting, comparison examples
- [Migration from Moment](https://dateutil.dev/migration.md): Side-by-side comparisons

## Optional

- [Locale Support](https://dateutil.dev/locales.md): Internationalization guide
- [Timezone Handling](https://dateutil.dev/timezones.md): Working with timezones
```

**Why it works:**
- Highlights differentiators vs alternatives
- Includes migration guide for users of similar tools
- Technical specs (size, dependencies) in description

---

## Anti-Patterns to Avoid

**Too verbose:**
```markdown
## Documentation

- [Introduction to Our Amazing Project](url): This comprehensive guide will walk you through every single aspect of our wonderful project, covering installation, configuration, basic usage, advanced features, and much more in extensive detail.
```

**Missing descriptions:**
```markdown
## Docs

- [Guide](url)
- [API](url)
- [Examples](url)
```

**Irrelevant content:**
```markdown
## History

- [Changelog](url): All version changes
- [Contributors](url): Who built this
- [Logo Assets](url): Brand guidelines
```

**Unexplained jargon:**
```markdown
> A DAG-based ETL orchestrator with CQRS patterns for polyglot persistence.
```

---

## Section Naming Conventions

Common H2 section names:
- `## Docs` - General documentation
- `## API` - API reference
- `## Examples` - Code examples, tutorials
- `## Guides` - How-to guides
- `## Reference` - Technical reference
- `## Optional` - Secondary resources (special meaning: can be skipped)
