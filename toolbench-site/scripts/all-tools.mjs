// ToolBench — 50 AI Tools Data Combiner (2026)
// Imports all batch files and exports a single array
import { tools as generalTools } from './tools-data.mjs';
import { codeTools } from './batch2-code.mjs';
import { writingTools } from './batch3-writing.mjs';
import { imageTools } from './batch4-image.mjs';
import { videoTools } from './batch5-video.mjs';
import { audioTools } from './batch6-audio.mjs';
import { searchTools, musicTools } from './batch7-search-music.mjs';
import { designTools } from './batch8-design.mjs';
import { businessTools, productivityTools } from './batch9-biz-prod.mjs';

export const allTools = [
  ...generalTools,
  ...codeTools,
  ...writingTools,
  ...imageTools,
  ...videoTools,
  ...audioTools,
  ...searchTools,
  ...musicTools,
  ...designTools,
  ...businessTools,
  ...productivityTools,
];

console.log(`✅ Combined ${allTools.length} tools from all batches.`);
