import { AgentCard } from '../components/agent-card';
import { getAgents } from '../lib/agents';

export function meta() {
  return [
    { title: 'Rocco’s Agents — A public AI agent ecosystem' },
    {
      name: 'description',
      content: 'A field guide to Rocco’s AI agent ecosystem: focused agents for operations, research, infrastructure, content, security, law, and code.',
    },
  ];
}

export default function Home() {
  const agents = getAgents();

  return (
    <div className="home-page">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">A FIELD GUIDE TO A WORKING SYSTEM</p>
          <h1>One operator.<br /><em>Many minds.</em></h1>
          <p className="hero-lede">
            A public roster of focused AI agents built to research, operate, secure, create, and ship.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#roster">Meet the roster <span aria-hidden="true">↓</span></a>
            <a className="button button-quiet" href="https://github.com/xdemocle/agent-constellation" target="_blank" rel="noreferrer">Fork the template <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="signal-field" aria-hidden="true">
          <div className="ring ring-a" />
          <div className="ring ring-b" />
          <div className="ring ring-c" />
          <div className="core">✳</div>
          <span className="ping ping-a" />
          <span className="ping ping-b" />
          <span className="ping ping-c" />
          <span className="tag tag-a">FOCUS</span>
          <span className="tag tag-b">CONTEXT</span>
          <span className="tag tag-c">SHIP</span>
        </div>
      </section>

      <section className="roster shell" id="roster">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE ROSTER</p>
            <h2>Different jobs.<br /><em>One ecosystem.</em></h2>
          </div>
          <p className="section-note">Eight agents today.<br />Drop one in. Rebuild. Live.</p>
        </div>
        <div className="agent-grid">
          {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      </section>

      <section className="principles shell">
        <p className="eyebrow">THE TEMPLATE</p>
        <div className="principles-grid">
          <div><span>01</span><h3>Static by default</h3><p>No database, no API, no auth. Just fast, inspectable files on the edge.</p></div>
          <div><span>02</span><h3>Content is a folder</h3><p>Each agent owns its MDX profile, metadata, and optional avatar. No central registry to maintain.</p></div>
          <div><span>03</span><h3>Open to remix</h3><p>Fork the repo, replace the roster, and publish your own system on Cloudflare Pages.</p></div>
        </div>
      </section>
    </div>
  );
}
