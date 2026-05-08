/**
 * Download SimpleIcons SVGs to /public/logos/<slug>.svg
 *
 * Run from project root: `node scripts/download-logos.mjs`
 *
 * Reads src/data/ai-logos.ts, downloads every entry that has a non-null slug,
 * and writes the resulting SVG to public/logos/<tool-slug>.svg.
 *
 * Failed downloads are logged and reported so the source map can be cleaned.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'logos');
const SRC_FILE = path.join(ROOT, 'src', 'data', 'ai-logos.ts');

async function parseLogos() {
  const src = await readFile(SRC_FILE, 'utf-8');
  // Multi-line regex: match the full object body for each tool key.
  // Keys may be unquoted bare identifiers (chatgpt) or quoted ('copy-ai').
  const re = /(?:^|\s|,)(?:['"]([a-z0-9-]+)['"]|([a-z0-9-]+)):\s*\{[^}]*?slug:\s*(?:['"]([a-z0-9]+)['"]|null)[^}]*?color:\s*['"]([0-9A-Fa-f]+)['"][^}]*?\}/gms;
  const entries = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const key = m[1] || m[2];
    const slug = m[3];
    const color = m[4];
    if (slug) entries.push({ key, slug, color });
  }
  return entries;
}

async function fetchSvg(slug, color) {
  const url = `https://cdn.simpleicons.org/${slug}/${color}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  const entries = await parseLogos();
  console.log(`Found ${entries.length} entries with slug. Downloading…\n`);

  const ok = [];
  const fail = [];

  for (const { key, slug, color } of entries) {
    const dest = path.join(OUT_DIR, `${key}.svg`);
    try {
      const svg = await fetchSvg(slug, color);
      await writeFile(dest, svg, 'utf-8');
      ok.push({ key, slug });
      console.log(`  ✓  ${key.padEnd(28)} <- ${slug}`);
    } catch (err) {
      fail.push({ key, slug, color });
      console.warn(`  ✗  ${key.padEnd(28)} <- ${slug}    (${err.message})`);
    }
  }

  console.log(`\nDone. ${ok.length} downloaded, ${fail.length} failed.`);

  if (fail.length > 0) {
    console.log('\nThese keys should have slug: null in src/data/ai-logos.ts:');
    fail.forEach(({ key }) => console.log(`  ${key}`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
