import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// Output is 'static' by default in Astro 5 — all pages prerender unless they
// explicitly export `prerender = false`. The Netlify adapter is required to
// run those on-demand routes (e.g. /api/newsletter) as Netlify Functions.
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
