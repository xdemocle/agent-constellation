# Agent Constellation

A static, open-source showcase for an AI agent ecosystem. Each agent gets a focused profile at `/agent-id`, backed by an MDX file and a small metadata object.

Built with React Router 7 framework mode, Tailwind CSS v4, MDX, and Cloudflare Pages. No SSR. No backend. No auth. No chat.

## Fork and deploy in under five minutes

### 1. Fork

Fork this repository on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/agent-constellation.git
cd agent-constellation
bun install
```

Node 22+ and Bun 1.2+ are recommended.

### 2. Add your agents

Copy an existing folder under `agents/`:

```text
agents/
└── my-agent/
    ├── index.mdx
    ├── metadata.json
    └── avatar.png       # optional; reserved for your design
```

`metadata.json`:

```json
{
  "name": "My Agent",
  "emoji": "🛠️",
  "domain": "What it does",
  "description": "One sentence for the homepage card.",
  "skills": ["Skill one", "Skill two"]
}
```

Write the profile in `index.mdx`. The folder name becomes the URL. No route file or central registry needs editing.

### 3. Check locally

```bash
bun run build
bun dev
```

The build discovers every valid `agents/*/` folder, prerenders `/` and each agent URL, and writes a sitemap plus Cloudflare-friendly flat HTML files.

### 4. Deploy to Cloudflare Pages

In Cloudflare Pages, create a project from your fork:

- **Production branch:** `main`
- **Build command:** `bun run build`
- **Build output directory:** `dist/client`
- **Root directory:** `/`

Push your changes. Cloudflare Pages will build and deploy them automatically.

You can also deploy from a terminal with Wrangler:

```bash
bun run build
bunx wrangler pages deploy dist/client --project-name YOUR-PAGES-PROJECT
```

## Content rules

- Keep profiles public-safe. Never publish credentials, private messages, phone numbers, or operational secrets.
- Treat `metadata.json` as the homepage contract: short description, useful skills.
- Keep each agent self-contained. A folder should be easy to copy, delete, or fork.
- Use standard Markdown and MDX components supported by the existing pipeline.

## Project layout

```text
agent-constellation/
├── agents/                  # one folder per public agent
├── public/                  # favicon, sitemap, Pages redirects
├── scripts/                 # build-time sitemap + route flattening
├── src/
│   ├── components/          # shared shell and cards
│   ├── lib/agents.ts        # metadata auto-discovery
│   ├── routes.ts            # only `/` and `/:agentId`
│   └── routes/              # homepage and agent page
├── react-router.config.ts   # static prerender route discovery
└── wrangler.jsonc           # Cloudflare Pages output
```

## Why a fresh repo?

This is intentionally not a fork of `rocco-s-realm`. The reference site contains a large personal-brand surface, blog/RSS integrations, and private project context. A clean repository keeps this template understandable, safe to fork, and focused on the agent roster while retaining the proven RR7 + MDX + Pages conventions.

## License

MIT. See [LICENSE](./LICENSE).
