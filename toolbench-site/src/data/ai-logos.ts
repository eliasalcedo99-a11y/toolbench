/**
 * Real brand logos for the 50 indexed AI tools.
 *
 * SVG files live in /public/logos/<key>.svg and are downloaded from the
 * SimpleIcons CDN at build time via `node scripts/download-logos.mjs`.
 * Re-run that script if a brand's logo updates or a new tool is added.
 *
 * Tools whose SimpleIcons entry has been removed (trademark requests, e.g.
 * Adobe, Microsoft, Slack, OpenAI) have `slug: null` and fall back to the
 * frontmatter emoji defined on each tool's content file.
 */

export interface AILogo {
  /** SimpleIcons slug used by scripts/download-logos.mjs. null = no logo. */
  slug: string | null;
  /** Brand color hex (no `#`) used to tint the SimpleIcons SVG at download. */
  color: string;
  /** Emoji shown when the local logo file is missing. */
  fallback: string;
}

export const AI_LOGOS: Record<string, AILogo> = {
  // === General AI ===
  chatgpt:           { slug: null,             color: '10A37F', fallback: '💬' },
  claude:            { slug: 'anthropic',      color: 'D97757', fallback: '🤖' },
  gemini:            { slug: 'googlegemini',   color: '8E75B2', fallback: '✨' },
  copilot:           { slug: null,             color: '0078D4', fallback: '🪟' },
  perplexity:        { slug: 'perplexity',     color: '20808D', fallback: '🔍' },

  // === Code ===
  codeium:           { slug: null,             color: '09B6A2', fallback: '⌨️' },
  'github-copilot':  { slug: 'githubcopilot',  color: 'FFFFFF', fallback: '🐙' },
  'replit-ghostwriter': { slug: 'replit',     color: 'F26207', fallback: '👻' },
  tabnine:           { slug: null,             color: '6635FB', fallback: '⚡' },
  cursor:            { slug: 'cursor',         color: 'FFFFFF', fallback: '✏️' },

  // === Writing ===
  'copy-ai':         { slug: null,             color: 'FF7B5C', fallback: '📝' },
  'jasper-ai':       { slug: null,             color: '6C5CE7', fallback: '🪄' },
  anyword:           { slug: null,             color: '0052FF', fallback: '📄' },
  writesonic:        { slug: null,             color: '5C56F1', fallback: '🖋️' },
  grammarly:         { slug: 'grammarly',      color: '15C39A', fallback: '✓' },
  quillbot:          { slug: null,             color: '64A95C', fallback: '🪶' },

  // === Image ===
  'adobe-firefly':   { slug: null,             color: 'FF0000', fallback: '🔥' },
  'dall-e-3':        { slug: null,             color: 'FFB000', fallback: '🎨' },
  'leonardo-ai':     { slug: null,             color: 'FFC857', fallback: '🦁' },
  midjourney:        { slug: null,             color: 'FFFFFF', fallback: '⛵' },
  'stable-diffusion':{ slug: null,             color: 'FF1493', fallback: '🌊' },

  // === Video ===
  heygen:            { slug: null,             color: '7559FF', fallback: '🎬' },
  'opus-clip':       { slug: null,             color: 'FF6B35', fallback: '✂️' },
  runway:            { slug: null,             color: 'FFFFFF', fallback: '🎥' },
  synthesia:         { slug: null,             color: '0000FF', fallback: '👔' },

  // === Audio ===
  descript:          { slug: null,             color: '00C2A8', fallback: '🎙️' },
  elevenlabs:        { slug: 'elevenlabs',     color: 'FFFFFF', fallback: '🔊' },
  notebooklm:        { slug: 'google',         color: '4285F4', fallback: '📓' },
  'otter-ai':        { slug: null,             color: '4F46E5', fallback: '🦦' },
  'murf-ai':         { slug: null,             color: '6366F1', fallback: '🗣️' },

  // === Search / Research ===
  consensus:         { slug: null,             color: '00875A', fallback: '🔬' },
  kagi:              { slug: 'kagi',           color: 'FFB319', fallback: '🐉' },
  'you-com':         { slug: null,             color: '7C3AED', fallback: '🌐' },
  scholarcy:         { slug: null,             color: '1E88E5', fallback: '🎓' },

  // === Music ===
  suno:              { slug: null,             color: '000000', fallback: '🎵' },
  udio:              { slug: null,             color: 'EF4444', fallback: '🎶' },
  aiva:              { slug: null,             color: '8B5CF6', fallback: '🎼' },

  // === Design ===
  'figma-ai':        { slug: 'figma',          color: 'F24E1E', fallback: '🎨' },
  'canva-magic-design': { slug: null,         color: '00C4CC', fallback: '🪄' },
  'adobe-express':   { slug: null,             color: 'FF0000', fallback: '⚡' },
  looka:             { slug: null,             color: 'EC4899', fallback: '👁️' },
  'microsoft-designer': { slug: null,         color: '0078D4', fallback: '🖌️' },

  // === Business ===
  'power-bi-copilot':   { slug: null,          color: 'F2C811', fallback: '📊' },
  'google-workspace-ai':{ slug: null,          color: '4285F4', fallback: '🏢' },
  'hubspot-chatspot':   { slug: 'hubspot',     color: 'FF7A59', fallback: '💼' },
  mindstudio:           { slug: null,          color: '7C3AED', fallback: '🧠' },

  // === Productivity ===
  'notion-ai':            { slug: 'notion',           color: 'FFFFFF', fallback: '📝' },
  'tableau-ai':           { slug: null,               color: 'E97627', fallback: '📈' },
  chatpdf:                { slug: null,               color: 'EF4444', fallback: '📄' },
  'microsoft-365-copilot':{ slug: null,               color: 'D83B01', fallback: '🪟' },
  'slack-ai':             { slug: null,               color: '4A154B', fallback: '💬' },
};

const LOCAL_EXTENSIONS: Record<string, string> = {
  "adobe-express": ".webp",
  "adobe-firefly": ".webp",
  "aiva": ".png",
  "anyword": ".avif",
  "canva-magic-design": ".webp",
  "chatgpt": ".webp",
  "chatpdf": ".svg",
  "claude": ".png",
  "copilot": ".png",
  "copy-ai": ".svg",
  "dall-e-3": ".webp",
  "descript": ".webp",
  "figma-ai": ".webp",
  "gemini": ".webp",
  "github-copilot": ".webp",
  "google-workspace-ai": ".webp",
  "grammarly": ".webp",
  "gusto": ".webp",
  "heygen": ".webp",
  "hubspot-chatspot": ".webp",
  "jasper-ai": ".webp",
  "kagi": ".webp",
  "leonardo-ai": ".webp",
  "looka": ".webp",
  "microsoft-365-copilot": ".png",
  "microsoft-designer": ".png",
  "midjourney": ".webp",
  "mindstudio": ".png",
  "murf-ai": ".webp",
  "notebooklm": ".jpg",
  "notion-ai": ".png",
  "opus-clip": ".png",
  "otter-ai": ".webp",
  "pecan-ai": ".webp",
  "perplexity": ".webp",
  "power-bi-copilot": ".png",
  "quillbot": ".webp",
  "replit-ghostwriter": ".png",
  "runway": ".webp",
  "scholarcy": ".jpg",
  "slack-ai": ".png",
  "stable-diffusion": ".webp",
  "suno": ".webp",
  "surfer-seo": ".webp",
  "synthesia": ".webp",
  "tableau-ai": ".png",
  "tabnine": ".png",
  "tidio": ".webp",
  "udio": ".webp",
  "writesonic": ".webp",
  "you-com": ".png",
  "zapier": ".webp",
  "hubspot-ai": ".webp"
};

/**
 * Returns the local logo URL for a tool slug, or null if no logo is available.
 * Maps to the exact file extension we pulled from the logos folder.
 */
export function getLogoUrl(slug: string): string | null {
  const ext = LOCAL_EXTENSIONS[slug];
  if (ext) {
    return `/logos/${slug}${ext}`;
  }

  const logo = AI_LOGOS[slug];
  if (!logo || !logo.slug) return null;
  return `/logos/${slug}.svg`;
}

export function getFallback(slug: string, defaultIcon: string): string {
  const logo = AI_LOGOS[slug];
  return logo?.fallback ?? defaultIcon;
}
