import type { Config } from '@react-router/dev/config';
import * as fs from 'node:fs';
import * as path from 'node:path';

function getAgentRoutes(): string[] {
  const agentsDir = path.join(process.cwd(), 'agents');

  if (!fs.existsSync(agentsDir)) return [];

  return fs
    .readdirSync(agentsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .filter(entry => fs.existsSync(path.join(agentsDir, entry.name, 'index.mdx')))
    .map(entry => `/${entry.name}`);
}

export default {
  ssr: false,
  appDirectory: 'src',
  buildDirectory: 'dist',
  prerender: ['/', ...getAgentRoutes()],
  splitRouteModules: false,
  future: {
    unstable_optimizeDeps: true,
  },
} satisfies Config;
