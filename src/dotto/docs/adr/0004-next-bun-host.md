# 0004 — Next.js + Bun host

Status: accepted

The koi marketing and docs site is a **Next.js App Router** app under `site/`,
run with **Bun**. It is not an Astro project and is not deployed with Deno.

## Decision

- Host: Next.js 16 App Router, React 19, prerendered routes.
- Toolchain: Bun is the package manager and script runner (`bun install`,
  `bun run dev`, `bun run build`, `bun run start`). Next and Astryx keep their
  Node shebangs — scripts call `next` / `astryx`, not `bun --bun next`.
- Content stays in `site/src/content/{docs,blog}` and is compiled with
  `next-mdx-remote`. Native docs `<details>` stay native (ADR-0002).
- Dotto remains an in-repo Astryx theme (ADR-0003). Icon-rail + rounded stage
  stay; do not replace them with Astryx AppShell / TopNav.
- Canonical public origin is still `https://koi.deno.dev` until a new host is
  published.

## Why

Astro islands could not share Astryx `Theme` context, and Deno Deploy was an
extra runtime for a React tree. Next.js is the host Astryx is built for; Bun
installs packages and runs `package.json` scripts the way `bun create next-app`
does. Next and Astryx still execute on Node via their shebangs.

## Considered options

- **Keep Astro + Deno Deploy** — rejected: Theme context, MDX, and the JS
  toolchain were split across three runtimes.
- **Vite SPA** — rejected: docs MDX, `llms.txt`, and static prerender need a
  document host, not a client-only app.
