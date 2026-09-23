# 0003 — Dotto is an Astryx theme

Status: accepted — supersedes [0001](0001-dotto-open-box.md) for the component
base. [0002](0002-docs-progressive-disclosure.md) still stands: optional docs
detail stays native `<details>`.

## Decision

Dotto is the in-repo **Astryx theme** for koi, not a parallel open-box kit.
Primitives come from `@astryxdesign/core`. Identity lives in
`site/src/dotto/theme.ts` (`defineTheme`) plus `palette.ts`.

Product hours are **yoru** and **hiru** on `html[data-hour]`. Astryx `mode` maps
hiru → `light` and yoru → `dark` and writes `html[data-theme]`. FOUC and
`applyHour` set `data-hour`, `data-theme`, `data-astryx-theme="dotto"`, and
`color-scheme` together. Built CSS is `@scope ([data-astryx-theme="dotto"])`.

The site host is Next.js + Bun ([0004](0004-next-bun-host.md)). Shell chrome,
landing bodies, and docs chrome are React trees of Astryx components. Pixel
scenes (Sakura, marks, campaign pond, verb art) stay custom and consume tokens.
Do not replace the icon-rail + rounded stage with Astryx AppShell / TopNav.

The theme is not published as an npm package.

## Why

Astryx already owns accessible React primitives, light/dark tuples, and a
theme pipeline. Restyling those is identity; maintaining Base UI wrappers and
`data-slot` CSS in parallel is a second kit.

## Considered options

- **Four hours as `data-theme` ids** — rejected: Astryx Theme overwrites
  `data-theme` with `light`/`dark`.
- **Keep Base UI open-box beside Astryx** — rejected: two anatomies, two
  states, no shared Theme context.
- **Host the site as a React app** — superseded by [0004](0004-next-bun-host.md).
