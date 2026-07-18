import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LinksFunction } from 'react-router';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import './index.css';

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
];

export const meta = () => [
  { title: 'Rocco’s Agents — A public AI agent ecosystem' },
  {
    name: 'description',
    content: 'Meet the AI agents in Rocco’s open-source ecosystem: focused, opinionated, and built to ship.',
  },
  { name: 'theme-color', content: '#10100f' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="error-page">
      <p className="eyebrow">SIGNAL LOST</p>
      <h1>{isNotFound ? 'That agent is not in the roster.' : 'The roster hit an error.'}</h1>
      <a className="button button-primary" href="/">
        Back to the roster
      </a>
    </main>
  );
}
