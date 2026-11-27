# Astrocade website

- **Root (`/`)** — the new Astrocade site (in progress). Next.js 15 + Tailwind CSS v4 + Motion.
- **`old/`** — the previous site (Home, About, Careers, Blog, Press, Alt 1, Alt 2), kept as a
  self-contained Next.js project.

```bash
npm install && npm run dev            # new site
cd old && npm install && npm run dev  # previous site
```

## Vercel
While the new site is being built, the live deployment uses **Root Directory = `old`**
(Project → Settings → Build and Deployment). Switch it back to the repository root when
the new site is ready to go live.
