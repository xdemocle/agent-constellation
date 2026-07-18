import * as fs from 'node:fs';
import * as path from 'node:path';

interface AgentMetadata {
  name: string;
  emoji: string;
  domain: string;
  description: string;
  skills: string[];
}

const agentsDirectory = path.join(process.cwd(), 'agents');
const outputFile = path.join(process.cwd(), 'src/data/agents.json');

const agents = fs
  .readdirSync(agentsDirectory, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => {
    const id = entry.name;
    const metadataPath = path.join(agentsDirectory, id, 'metadata.json');
    const contentPath = path.join(agentsDirectory, id, 'index.mdx');
    if (!fs.existsSync(metadataPath) || !fs.existsSync(contentPath)) return null;
    return { id, ...(JSON.parse(fs.readFileSync(metadataPath, 'utf8')) as AgentMetadata) };
  })
  .filter((agent): agent is { id: string } & AgentMetadata => agent !== null)
  .sort((a, b) => a.name.localeCompare(b.name));

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(agents, null, 2)}\n`);
console.log(`Generated agent registry with ${agents.length} agents → ${outputFile}`);
