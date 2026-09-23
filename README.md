# koi site

The website for [koi](https://github.com/getkoi/koi), a project workflow that keeps plans, phase order, and verification in the repository so coding-agent sessions can pick up where they left off.

This is a Next.js 16 and React 19 application. It includes the koi landing page, documentation, blog, and pages for junji, yokai, dotto, and sensor recipes.

## Getting started

Install [Bun](https://bun.sh/) (the project specifies Bun 1.3.14), then run:

```sh
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```sh
bun run build             # Build the theme and production site
bun run start             # Serve the production build
bun run check             # Generate Next.js types and type-check
bun run test              # Run data and dotto tests
bun run validate:recipes  # Validate sensor recipes
```

The production build runs `theme:build` before `next build`. You can also run `bun run theme:build` on its own.

## Project layout

- `src/app/` — routes and page metadata
- `src/components/` — page and UI components
- `src/content/` — MDX content
- `src/data/` — page data and sensor/sandbox recipes
- `src/dotto/` — dotto theme and related code
- `src/styles/` — site styles
- `public/` — static assets
- `scripts/` — repository validation scripts

For the koi project itself, see the [main repository](https://github.com/getkoi/koi).
