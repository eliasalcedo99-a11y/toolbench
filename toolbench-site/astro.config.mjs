import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// Output is 'static' by default in Astro 5 — all pages prerender unless they
// explicitly export `prerender = false`. The Netlify adapter is required to
// run those on-demand routes (e.g. /api/newsletter) as Netlify Functions.

// Build a set of noindex comparison URLs so the sitemap excludes them.
// Google still crawls noindex URLs that appear in sitemaps, so omitting them
// here saves crawl budget on the ~1.1k cross-category pairs.
const comparisonsDir = fileURLToPath(new URL('./src/content/comparisons', import.meta.url));
const noindexSet = new Set(
  readdirSync(comparisonsDir)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => /^noindex:\s*true\s*$/m.test(readFileSync(join(comparisonsDir, f), 'utf8')))
    .map((f) => `https://toolbench.netlify.app/compare/${basename(f, '.md')}`)
);

export default defineConfig({
  site: 'https://toolbench.netlify.app',
  trailingSlash: 'never',
  output: 'static',
  adapter: netlify(),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      filter: (page) => {
        const stripped = page.replace(/\/$/, '');
        return !noindexSet.has(stripped);
      },
      serialize(item) {
        if (item.url === 'https://toolbench.netlify.app/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        if (item.url === 'https://toolbench.netlify.app/ai-comparator' || item.url === 'https://toolbench.netlify.app/ai-comparator/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        return item;
      },
    }),
  ],
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
