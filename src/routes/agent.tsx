import type { LoaderFunctionArgs } from 'react-router';
import { Link } from 'react-router';
import type { AgentProfile } from '../lib/agents';
import { getAgent, getAgents } from '../lib/agents';

const mdxModules = import.meta.glob('../../agents/*/index.mdx', { eager: true }) as Record<
  string,
  { default: React.ComponentType }
>;

function getAgentContent(agentId: string): React.ComponentType | null {
  const entry = Object.entries(mdxModules).find(([filePath]) => filePath.endsWith(`/${agentId}/index.mdx`));
  return entry?.[1].default ?? null;
}

export function meta({ params }: { params: { agentId?: string } }) {
  const agent = getAgent(params.agentId ?? '');
  return agent
    ? [
        { title: `${agent.name} — Rocco’s Agents` },
        { name: 'description', content: agent.description },
      ]
    : [{ title: 'Agent not found — Rocco’s Agents' }];
}

export function loader({ params }: LoaderFunctionArgs) {
  const agent = getAgent(params.agentId ?? '');
  if (!agent) throw new Response('Agent not found', { status: 404 });
  return { agent, agents: getAgents() };
}

export default function AgentPage({ loaderData }: { loaderData: { agent: AgentProfile; agents: AgentProfile[] } }) {
  const { agent, agents } = loaderData;
  const MDXContent = getAgentContent(agent.id);
  const nextAgent = agents[(agents.findIndex(candidate => candidate.id === agent.id) + 1) % agents.length];

  return (
    <div className="agent-page shell">
      <Link className="back-link" to="/">← All agents</Link>
      <header className="agent-hero">
        <div className="agent-hero-mark" aria-hidden="true">{agent.emoji}</div>
        <div>
          <p className="eyebrow">AGENT PROFILE <span>/{agent.id}</span></p>
          <h1>{agent.name}</h1>
          <p className="agent-domain large">{agent.domain}</p>
        </div>
      </header>
      <div className="agent-layout">
        <aside className="agent-aside">
          <p className="aside-label">OPERATING RANGE</p>
          <ul className="skill-list">
            {agent.skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
          <p className="aside-label">NEXT SIGNAL</p>
          <Link className="next-agent" to={`/${nextAgent.id}`}>
            <span>{nextAgent.emoji}</span> {nextAgent.name} <span aria-hidden="true">↗</span>
          </Link>
        </aside>
        <article className="mdx-content">
          {MDXContent ? <MDXContent /> : <p>Profile content is missing.</p>}
        </article>
      </div>
    </div>
  );
}
