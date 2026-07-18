import type { AgentProfile } from '../lib/agents';
import { Link } from 'react-router';

export function AgentCard({ agent }: { agent: AgentProfile }) {
  return (
    <Link className="agent-card" to={`/${agent.id}`}>
      <div className="agent-card-topline">
        <span className="agent-emoji" aria-hidden="true">{agent.emoji}</span>
        <span className="agent-id">/{agent.id}</span>
      </div>
      <h2>{agent.name}</h2>
      <p className="agent-domain">{agent.domain}</p>
      <p className="agent-description">{agent.description}</p>
      <span className="card-link">Read profile <span aria-hidden="true">↗</span></span>
    </Link>
  );
}
