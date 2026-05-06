/**
 * ToolBench Content Generator
 * Generates tool profiles and comparison articles from tools-data.mjs
 * Run: node scripts/generate.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allTools as tools } from './all-tools.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS_DIR = path.join(__dirname, '..', 'src', 'content', 'tools');
const COMP_DIR = path.join(__dirname, '..', 'src', 'content', 'comparisons');

// ── Helpers ──────────────────────────────────────────────────────────────────
function esc(s) {
  if (typeof s !== 'string') return String(s);
  if (/[:#{}[\],&*?|>!'"%@`\n]/.test(s) || s.startsWith(' ') || s.endsWith(' ')) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return `"${s}"`;
}

function buildToolFrontmatter(t) {
  let y = '---\n';
  y += `name: ${esc(t.name)}\n`;
  y += `category: ${esc(t.category)}\n`;
  y += `icon: ${esc(t.icon)}\n`;
  y += `iconBg: ${esc(t.iconBg)}\n`;
  y += `iconColor: ${esc(t.iconColor)}\n`;
  if (t.badge) y += `badge: ${t.badge}\n`;
  y += `rating: ${t.rating}\n`;
  y += `priceLabel: ${esc(t.priceLabel)}\n`;
  y += `description: ${esc(t.description)}\n`;
  y += `keywords: [${t.keywords.map(k => esc(k)).join(', ')}]\n`;
  y += `verdict: ${esc(t.verdict)}\n`;
  y += `pros:\n${t.pros.map(p => `  - ${esc(p)}`).join('\n')}\n`;
  y += `cons:\n${t.cons.map(c => `  - ${esc(c)}`).join('\n')}\n`;
  y += `pricing:\n`;
  for (const p of t.pricing) {
    y += `  - name: ${esc(p.name)}\n`;
    y += `    price: ${esc(p.price)}\n`;
    y += `    summary: ${esc(p.summary)}\n`;
    y += `    featured: ${p.featured || false}\n`;
    if ((p.features || []).length > 0) {
      y += `    features:\n${(p.features || []).map(f => `      - ${esc(f)}`).join('\n')}\n`;
    } else {
      y += `    features: []\n`;
    }
    if ((p.notIncluded || []).length > 0) {
      y += `    notIncluded:\n${(p.notIncluded || []).map(n => `      - ${esc(n)}`).join('\n')}\n`;
    } else {
      y += `    notIncluded: []\n`;
    }
  }
  y += `personas:\n`;
  for (const p of t.personas) {
    y += `  - icon: ${esc(p.icon)}\n`;
    y += `    title: ${esc(p.title)}\n`;
    y += `    description: ${esc(p.description)}\n`;
  }
  y += `relatedComparisons: []\n`;
  if (t.websiteUrl) y += `websiteUrl: ${esc(t.websiteUrl)}\n`;
  y += `scores:\n`;
  y += `  price: ${t.scores.price}\n`;
  y += `  ease: ${t.scores.ease}\n`;
  y += `  quality: ${t.scores.quality}\n`;
  y += `  integrations: ${t.scores.integrations}\n`;
  y += `  support: ${t.scores.support}\n`;
  y += `publishedDate: 2026-05-06\n`;
  y += `updatedDate: 2026-05-06\n`;
  y += '---\n\n';
  return y;
}

// ── Comparison generator ─────────────────────────────────────────────────────
const GENERAL_FEATURES = [
  'Starting price',
  'Free tier',
  'AI model / engine',
  'API access',
  'Mobile app',
  'Team collaboration',
  'Enterprise plan',
  'Customer support',
  'Data privacy / SOC 2',
  'Integration ecosystem',
  'Offline mode',
  'Custom training / fine-tuning',
];

function featureVal(tool, feature) {
  const m = {
    'Starting price': tool.priceLabel.split('–')[0].split('—')[0].trim(),
    'Free tier': tool.pricing.some(p => p.price === '$0' || p.price.toLowerCase().includes('free')) ? 'Yes' : 'No',
    'AI model / engine': tool._engine || 'Proprietary',
    'API access': tool._api || 'Available',
    'Mobile app': tool._mobile || 'Web only',
    'Team collaboration': tool._team || 'Yes',
    'Enterprise plan': tool.pricing.some(p => p.name.toLowerCase().includes('enterprise') || p.price.toLowerCase().includes('custom')) ? 'Yes' : 'No',
    'Customer support': tool._support || 'Email + docs',
    'Data privacy / SOC 2': tool._privacy || 'Standard',
    'Integration ecosystem': tool._integrations || 'Limited',
    'Offline mode': tool._offline || 'No',
    'Custom training / fine-tuning': tool._customTrain || 'No',
  };
  return m[feature] || 'N/A';
}

function featureType(val) {
  const v = val.toLowerCase();
  if (v === 'yes') return 'yes';
  if (v === 'no') return 'no';
  return 'value';
}

function generateVerdict(a, b) {
  const aTotal = Object.values(a.scores).reduce((s, v) => s + v, 0);
  const bTotal = Object.values(b.scores).reduce((s, v) => s + v, 0);
  const winner = aTotal >= bTotal ? a : b;
  const loser = aTotal >= bTotal ? b : a;
  if (a.category === b.category) {
    return `${winner.name} edges ahead on overall quality and integration depth, making it the stronger pick for most users. ${loser.name} remains competitive on price and is worth considering if budget is the primary constraint.`;
  }
  return `${a.name} and ${b.name} serve fundamentally different use cases. Choose ${a.name} for ${a.category} tasks and ${b.name} for ${b.category} workflows — they complement rather than compete.`;
}

function generateRecommendations(a, b) {
  const recs = [];
  // Budget-conscious
  const cheaperScores = a.scores.price > b.scores.price ? a : b;
  recs.push({
    for: 'Budget-conscious users',
    pick: cheaperScores.name,
    reason: `Offers better value per dollar with a price score of ${cheaperScores.scores.price}/100, making it the more accessible option without sacrificing core functionality.`,
  });
  // Quality-focused
  const betterQuality = a.scores.quality > b.scores.quality ? a : b;
  recs.push({
    for: 'Quality-focused professionals',
    pick: betterQuality.name,
    reason: `Delivers superior output quality (${betterQuality.scores.quality}/100) that justifies the investment for teams where results matter more than cost.`,
  });
  // Beginners
  const easier = a.scores.ease > b.scores.ease ? a : b;
  recs.push({
    for: 'Beginners and non-technical users',
    pick: easier.name,
    reason: `Lower learning curve (ease score: ${easier.scores.ease}/100) means faster onboarding and less time spent reading documentation.`,
  });
  return recs;
}

function generateFAQ(a, b) {
  return [
    {
      q: `Is ${a.name} or ${b.name} cheaper?`,
      a: `${a.name} starts at ${a.priceLabel} while ${b.name} starts at ${b.priceLabel}. The better value depends on your usage volume — compare the specific tier that matches your needs rather than just the entry price.`,
    },
    {
      q: `Can I use ${a.name} and ${b.name} together?`,
      a: a.category === b.category
        ? `While both serve ${a.category} use cases, some teams use ${a.name} for specific tasks and ${b.name} for others. However, most users find one tool sufficient for their workflow.`
        : `Yes — they serve different purposes. ${a.name} handles ${a.category} tasks while ${b.name} focuses on ${b.category}. Many teams use both as part of their AI stack.`,
    },
    {
      q: `Which has better customer support?`,
      a: `${a.scores.support > b.scores.support ? a.name : b.name} scores higher on support (${Math.max(a.scores.support, b.scores.support)}/100 vs ${Math.min(a.scores.support, b.scores.support)}/100). Both offer documentation and community forums; paid tiers unlock priority support.`,
    },
    {
      q: `Which is better for enterprise teams?`,
      a: `${a.scores.integrations > b.scores.integrations ? a.name : b.name} has stronger enterprise integration support (${Math.max(a.scores.integrations, b.scores.integrations)}/100). Check each tool's enterprise plan for SSO, SCIM, and compliance features specific to your requirements.`,
    },
  ];
}

function buildComparisonFile(a, b) {
  const slug = `${a.slug}-vs-${b.slug}`;
  const title = `${a.name} vs ${b.name}: Which is Better in 2026?`;
  const desc = `Head-to-head comparison of ${a.name} and ${b.name} across pricing, quality, ease of use, and integrations for ${a.category === b.category ? a.category : 'AI'} workflows.`;

  const features = GENERAL_FEATURES.map(label => {
    const aVal = featureVal(a, label);
    const bVal = featureVal(b, label);
    return { label, a: aVal, b: bVal, aType: featureType(aVal), bType: featureType(bVal) };
  });

  const verdict = generateVerdict(a, b);
  const recs = generateRecommendations(a, b);
  const faq = generateFAQ(a, b);

  let y = '---\n';
  y += `title: ${esc(title)}\n`;
  y += `description: ${esc(desc)}\n`;
  y += `toolA: ${esc(a.slug)}\n`;
  y += `toolB: ${esc(b.slug)}\n`;
  y += `verdict: ${esc(verdict)}\n`;
  y += `features:\n`;
  for (const f of features) {
    y += `  - label: ${esc(f.label)}\n`;
    y += `    a: ${esc(f.a)}\n`;
    y += `    b: ${esc(f.b)}\n`;
    y += `    aType: ${esc(f.aType)}\n`;
    y += `    bType: ${esc(f.bType)}\n`;
  }
  y += `recommendations:\n`;
  for (const r of recs) {
    y += `  - for: ${esc(r.for)}\n`;
    y += `    pick: ${esc(r.pick)}\n`;
    y += `    reason: ${esc(r.reason)}\n`;
  }
  y += `faq:\n`;
  for (const f of faq) {
    y += `  - q: ${esc(f.q)}\n`;
    y += `    a: ${esc(f.a)}\n`;
  }
  y += `publishedDate: 2026-05-06\n`;
  y += `updatedDate: 2026-05-06\n`;
  y += '---\n\n';

  // Body
  y += `### ${a.name}\n\n`;
  y += `${a.name} is ${a.description} `;
  y += `With scores of ${a.scores.quality}/100 for output quality and ${a.scores.ease}/100 for ease of use, it targets ${a.personas[0]?.title || 'professionals'} who need reliable ${a.category} capabilities. `;
  y += `Pricing starts at ${a.priceLabel}, positioning it as a ${a.scores.price > 70 ? 'competitive' : 'premium'} option in the ${a.category} space.\n\n`;
  y += `Key strengths include ${a.pros[0]?.toLowerCase() || 'strong output quality'} and ${a.pros[1]?.toLowerCase() || 'solid integrations'}. `;
  y += `The main trade-offs are ${a.cons[0]?.toLowerCase() || 'pricing at scale'} and ${a.cons[1]?.toLowerCase() || 'learning curve for advanced features'}. `;
  y += `${a.name} is best suited for ${a.personas.map(p => p.title.toLowerCase()).join(', ')}.\n\n`;

  y += `### ${b.name}\n\n`;
  y += `${b.name} is ${b.description} `;
  y += `Scoring ${b.scores.quality}/100 for quality and ${b.scores.ease}/100 for ease of use, it appeals to ${b.personas[0]?.title || 'professionals'} looking for dependable ${b.category} tools. `;
  y += `Plans start at ${b.priceLabel}, making it a ${b.scores.price > 70 ? 'budget-friendly' : 'premium'} choice.\n\n`;
  y += `Notable advantages include ${b.pros[0]?.toLowerCase() || 'output quality'} and ${b.pros[1]?.toLowerCase() || 'ease of onboarding'}. `;
  y += `Limitations include ${b.cons[0]?.toLowerCase() || 'pricing'} and ${b.cons[1]?.toLowerCase() || 'integration gaps'}. `;
  y += `${b.name} works best for ${b.personas.map(p => p.title.toLowerCase()).join(', ')}.\n`;

  return { slug, content: y };
}

// ── Main ─────────────────────────────────────────────────────────────────────
function main() {
  // Ensure dirs exist
  fs.mkdirSync(TOOLS_DIR, { recursive: true });
  fs.mkdirSync(COMP_DIR, { recursive: true });

  // 1. Generate tool profiles
  console.log(`\n⚙️  Generating ${tools.length} tool profiles...`);
  for (const tool of tools) {
    const content = buildToolFrontmatter(tool) + tool.body + '\n';
    const filepath = path.join(TOOLS_DIR, `${tool.slug}.md`);
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`  ✅ ${tool.slug}.md`);
  }

  // 2. Generate ALL comparison pairs
  const pairs = [];
  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      pairs.push([tools[i], tools[j]]);
    }
  }
  console.log(`\n⚙️  Generating ${pairs.length} comparison articles...`);
  let count = 0;
  for (const [a, b] of pairs) {
    const { slug, content } = buildComparisonFile(a, b);
    const filepath = path.join(COMP_DIR, `${slug}.md`);
    fs.writeFileSync(filepath, content, 'utf-8');
    count++;
    if (count % 100 === 0) console.log(`  📝 ${count}/${pairs.length} done...`);
  }
  console.log(`  ✅ All ${pairs.length} comparisons generated.`);

  console.log(`\n🎉 Done! Generated ${tools.length} tools + ${pairs.length} comparisons.\n`);
}

main();
