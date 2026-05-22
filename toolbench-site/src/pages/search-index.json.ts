import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools');
  const comparisons = await getCollection('comparisons', ({ data }) => !data.noindex);
  const blog = await getCollection('blog');

  const index = [
    ...tools.map((t) => ({
      type: 'tool' as const,
      slug: t.slug,
      title: t.data.name,
      description: t.data.description,
      url: `/reviews/${t.slug}`,
      category: t.data.category,
      icon: t.data.icon,
      iconBg: t.data.iconBg,
      iconColor: t.data.iconColor,
      keywords: (t.data.keywords || []).join(' '),
      rating: t.data.rating,
    })),
    ...comparisons.map((c) => ({
      type: 'comparison' as const,
      slug: c.slug,
      title: c.data.title,
      description: c.data.description,
      url: `/compare/${c.slug}`,
      keywords: `${c.data.toolA} ${c.data.toolB} vs comparison`,
    })),
    ...blog.map((p) => ({
      type: 'blog' as const,
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
      url: `/blog/${p.slug}`,
      category: p.data.category,
      keywords: '',
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
