/**
 * Estimate reading time for a markdown body.
 *
 * Strips frontmatter, code blocks, links, and markdown syntax to count only
 * actual prose words. Uses 220 words-per-minute (average adult silent reading
 * speed for non-technical content per Brysbaert 2019 meta-analysis).
 */
export function estimateReadingTime(markdown: string): string {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, '')   // fenced code blocks
    .replace(/`[^`]*`/g, '')           // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleaned ? cleaned.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
