import * as fs from 'node:fs';
import * as path from 'node:path';

const outputFile = path.join(process.cwd(), 'public/sitemap.xml');
const siteUrl = 'https://agents.rocco.me';
const agentsDirectory = path.join(process.cwd(), 'agents');
const agentIds = fs
  .readdirSync(agentsDirectory, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .filter(entry => fs.existsSync(path.join(agentsDirectory, entry.name, 'metadata.json')))
  .map(entry => entry.name)
  .sort();

const urls = ['/', ...agentIds.map(id => `/${id}`)]
  .map(route => `  <url><loc>${siteUrl}${route}</loc></url>`)
  .join('\n');

fs.writeFileSync(
  outputFile,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`Generated sitemap with ${agentIds.length + 1} URLs → ${outputFile}`);
