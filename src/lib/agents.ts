import agentsData from '../data/agents.json';

export interface AgentProfile {
  id: string;
  name: string;
  emoji: string;
  domain: string;
  description: string;
  skills: string[];
}

const agents = agentsData as AgentProfile[];

export function getAgents(): AgentProfile[] {
  return agents;
}

export function getAgent(id: string): AgentProfile | null {
  return agents.find(agent => agent.id === id) ?? null;
}
