import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const tools = await getCollection('tools');
const blog = await getCollection('blog');
const comparisons = await getCollection('comparisons');

const pages: Record<string, any> = {};

tools.forEach(tool => {
  pages[`tools/${tool.slug}`] = {
    title: tool.data.name,
    description: tool.data.description,
  };
});

blog.forEach(post => {
  pages[`blog/${post.slug}`] = {
    title: post.data.title,
    description: post.data.description,
  };
});

comparisons.forEach(comp => {
  pages[`compare/${comp.slug}`] = {
    title: comp.data.title,
    description: comp.data.description,
  };
});

// Add static pages
pages['methodology'] = {
  title: 'Methodology - ToolBench',
  description: 'How we test, review, and score AI tools for small businesses.',
};
pages['index'] = {
  title: 'ToolBench - AI Tools Directory',
  description: 'Independent AI tools review and comparison site for US small business owners.',
};

const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages: pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    format: 'webp',
    logo: {
      path: './public/favicon.svg',
      size: [100],
    },
    bgGradient: [[24, 24, 27], [9, 9, 11]],
    border: { color: [245, 158, 11], width: 20, side: 'inline-start' },
    padding: 80,
    font: {
      title: {
        size: 72,
        weight: 'Bold',
        families: ['sans-serif'],
        color: [255, 255, 255],
      },
      description: {
        size: 40,
        families: ['sans-serif'],
        color: [161, 161, 170],
      },
    },
  }),
});

export { getStaticPaths, GET };
