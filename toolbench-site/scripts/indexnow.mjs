import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'toolbench.netlify.app';
const KEY = '8c7e9f1a2b3c4d5e6f7a8b9c0d1e2f3a';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  console.log('Starting IndexNow submission...');
  
  // Wait for the sitemap to be fully written by Astro build
  const sitemapPath = path.join(__dirname, '../dist/sitemap-0.xml');
  let sitemapContent;
  try {
    sitemapContent = await fs.readFile(sitemapPath, 'utf8');
  } catch (err) {
    console.error(`Could not read sitemap at ${sitemapPath}: ${err.message}`);
    process.exit(0); // Soft exit, might not be generated in all environments
  }

  // Extract URLs from sitemap
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
    }
  }

  console.log(`Found ${urls.length} URLs to submit.`);

  if (urls.length === 0) {
    console.log('No URLs found. Exiting.');
    return;
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('IndexNow submission successful!');
    } else {
      console.error(`IndexNow submission failed: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(`Response: ${text}`);
    }
  } catch (err) {
    console.error('Error submitting to IndexNow:', err);
  }
}

main();
