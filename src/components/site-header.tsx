import { Link } from 'react-router';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" to="/" aria-label="Rocco’s Agents home">
          <span className="wordmark-mark">✳</span>
          <span>ROCCO’S AGENTS</span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="https://github.com/xdemocle/agent-constellation" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
