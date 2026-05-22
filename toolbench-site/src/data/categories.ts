export const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'general', label: 'General AI', icon: '🤖' },
  { id: 'code', label: 'Code', icon: '💻' },
  { id: 'writing', label: 'Writing', icon: '✍️' },
  { id: 'image', label: 'Image', icon: '🎨' },
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'audio', label: 'Audio', icon: '🎙️' },
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'design', label: 'Design', icon: '🖌️' },
  { id: 'business', label: 'Business', icon: '📊' },
  { id: 'productivity', label: 'Productivity', icon: '⚡' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'support', label: 'Support', icon: '💬' },
  { id: 'hr', label: 'HR', icon: '👥' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.label])
);

export const CATEGORY_ICONS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.icon])
);

export const USE_CASES = [
  { id: 'general', label: 'General Assistant', icon: '🤖', description: 'All-purpose conversational AI for everyday tasks' },
  { id: 'code', label: 'Code Generation', icon: '💻', description: 'Programming, debugging, and software development' },
  { id: 'writing', label: 'Content Writing', icon: '✍️', description: 'Blogs, marketing copy, emails, and long-form content' },
  { id: 'image', label: 'Image Generation', icon: '🎨', description: 'Visual art, illustrations, and design assets' },
  { id: 'video', label: 'Video Creation', icon: '🎬', description: 'AI avatars, video editing, and content production' },
  { id: 'audio', label: 'Voice & Audio', icon: '🎙️', description: 'Text-to-speech, transcription, and voice cloning' },
  { id: 'search', label: 'Research & Search', icon: '🔍', description: 'Information retrieval and academic research' },
  { id: 'music', label: 'Music Creation', icon: '🎵', description: 'Song generation and music composition' },
  { id: 'design', label: 'Design & Branding', icon: '🖌️', description: 'Logos, templates, and visual design' },
  { id: 'business', label: 'Business Intelligence', icon: '📊', description: 'Analytics, dashboards, and data insights' },
  { id: 'productivity', label: 'Productivity', icon: '⚡', description: 'Notes, automation, and workflow tools' },
] as const;

export type UseCaseId = (typeof USE_CASES)[number]['id'];

export const SITE = {
  name: 'ToolBench',
  tagline: 'Find the right AI tool for your business, not the hype.',
  description:
    'Independent AI tool reviews and comparisons for US small business owners. 57 tools tested, 90+ side-by-side comparisons. No vendor sponsorships, no affiliate kickbacks.',
  url: 'https://toolbench.netlify.app',
  totals: {
    toolsReviewed: 57,
    comparisons: '90+',
    independence: '100%',
  },
  // Fill these in only when the real profiles exist. Empty values are omitted
  // from Organization.sameAs / twitter:site to avoid pointing search engines
  // at dead handles (a negative E-E-A-T signal).
  social: {
    twitterHandle: '', // e.g. 'toolbench' (without @)
    twitterUrl: '',    // e.g. 'https://twitter.com/toolbench'
    linkedinUrl: '',   // e.g. 'https://www.linkedin.com/company/toolbench'
    githubUrl: '',     // e.g. 'https://github.com/toolbench'
  },
  authors: {
    elias: {
      name: 'Elias',
      twitterUrl: '',  // fill when real handle exists
      linkedinUrl: '', // fill when real handle exists
    },
  },
};
