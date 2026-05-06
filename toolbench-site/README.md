# ToolBench (Astro)

Independent AI tools review and comparison site for US small business owners. Built with Astro 5 and content collections.

## Stack

- **Astro 5** — static site generation, content collections, file-based routing
- **TypeScript** strict mode
- **Zod** schemas for type-safe content
- **@astrojs/sitemap** for automatic `sitemap.xml`
- No CSS framework — vanilla CSS with custom properties (single `global.css`)
- No JS framework — vanilla `<script>` blocks for the few interactive widgets

## Project layout

```
toolbench-site/
├── astro.config.mjs           # site URL + sitemap integration
├── tsconfig.json              # strict + ~/* alias
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── env.d.ts
    ├── data/
    │   └── categories.ts      # SITE constants + category labels
    ├── styles/
    │   └── global.css         # all styling, dark mode only
    ├── content/
    │   ├── config.ts          # zod schemas for tools / comparisons / blog
    │   ├── tools/             # 10 tool reviews (markdown + frontmatter)
    │   ├── comparisons/       # comparison articles
    │   └── blog/              # editorial articles
    ├── layouts/
    │   └── BaseLayout.astro   # SEO, OG, JSON-LD, fonts
    ├── components/
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── Stars.astro
    │   ├── Stats.astro
    │   ├── ToolCard.astro
    │   ├── CategoryFilter.astro
    │   ├── ProsCons.astro
    │   ├── PricingTable.astro
    │   ├── Personas.astro
    │   ├── RelatedComparisons.astro
    │   ├── CompareTable.astro
    │   ├── ScoreWidget.astro  # interactive (vanilla JS)
    │   └── FAQ.astro          # interactive (vanilla JS)
    └── pages/
        ├── index.astro                # /
        ├── reviews/[slug].astro       # /reviews/jasper-ai
        ├── compare/[slug].astro       # /compare/jasper-vs-copyai
        └── blog/[slug].astro          # /blog/ai-lists-useless-2026
```

## Getting started

```bash
cd toolbench-site
npm install
npm run dev      # http://localhost:4321
```

## Commands

| Command            | What it does                                          |
| ------------------ | ----------------------------------------------------- |
| `npm run dev`      | Start dev server with HMR                             |
| `npm run build`    | Generate static `dist/` for production                |
| `npm run preview`  | Serve the built `dist/` locally                       |
| `npm run type-check` | Run `astro check` (TypeScript + content collection validation) |

## Adding a new tool review

1. Create `src/content/tools/<slug>.md`.
2. Provide all required frontmatter (see `src/content/config.ts` for the schema — Astro will fail the build if any field is missing or wrong-typed).
3. The body of the markdown is the long-form review (rendered as the "full review" section).
4. The page will be auto-generated at `/reviews/<slug>` and included in the homepage grid + sitemap on next build.

## Adding a comparison

1. Create `src/content/comparisons/<slug>.md`.
2. `toolA` and `toolB` must reference existing tool slugs (build will fail otherwise).
3. The frontmatter holds the comparison table, recommendations, and FAQ.
4. The markdown body is the deep-dive narrative — typically two `### ToolName` sections with 2 paragraphs each.

## Adding a blog post

1. Create `src/content/blog/<slug>.md`.
2. The TOC sidebar is auto-generated from `##` and `###` headings in the markdown body.
3. The Article JSON-LD schema is emitted automatically.

## SEO surface

Every page emits:

- `<title>`, meta description, canonical URL
- Open Graph + Twitter card
- JSON-LD: `WebSite` (home), `Review` + `BreadcrumbList` (tool detail), `Article` (comparison + blog)
- Sitemap entry via `@astrojs/sitemap`

Update `SITE.url` in `src/data/categories.ts` and `site:` in `astro.config.mjs` before deploying.

## Deployment

Static output. Drop `dist/` into any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront).

```bash
npm run build
# upload dist/
```
