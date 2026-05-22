import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '~/data/categories';

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools');
  const comparisons = await getCollection('comparisons', ({ data }) => !data.noindex);
  const blog = await getCollection('blog');

  let content = `# ${SITE.name}
> ${SITE.description}

## Methodology
- /methodology

## Reviews
`;

  for (const t of tools) {
    content += `- /reviews/${t.slug}: ${t.data.name} review\n`;
  }

  content += `\n## Comparisons\n`;
  for (const c of comparisons) {
    content += `- /compare/${c.slug}/\n`;
  }

  content += `\n## Blog\n`;
  for (const b of blog) {
    content += `- /blog/${b.slug}: ${b.data.title}\n`;
  }

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
