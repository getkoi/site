# 0005 — HTML-named primitives

Status: accepted

Dotto exports HTML-named primitives so an artifact-like page can be composed
from the kit (`button` → `Button`, `summary` → `Summary`). Odd tags use the
Astryx name (`a` → `Link`, `h1`–`h4` → `Heading`, `hr` → `Divider`).

## Decision

- **Document tags** (`Heading`, `Text`, `List`, `ListItem`, `Code`, `Strong`,
  `Em`, `Small`, table family, landmarks, `Image`, `Figure`,
  `FigureCaption`, `Dl`/`Dt`/`Dd`, `Details`/`Summary`, `Label`) render the
  matching native element. They stay server components so MDX prose (and Shiki
  `style` strings) do not hydrate as a client tree. Astryx `ListItem` /
  `FieldLabel` APIs are not 1:1 with HTML children, so they are not the kit
  names.
- **Surfaces** wrap Astryx: `Card`, `ClickableCard`, `SelectableCard`,
  `Badge`, `Citation`, `Blockquote`, `Dialog`. Kit `Kbd` accepts HTML
  children (`<Kbd>/</Kbd>`) or Astryx `keys` (`<Kbd keys="mod+k" />`). MDX
  `kbd` stays the native server `<kbd>` so prose does not hydrate.
- **Interactive / overlay tags** wrap Astryx: `Button`, `TextInput`,
  `TextArea`, `Collapsible`, `Divider`, `CodeBlock`, `Timestamp`. `Link` is
  `AppLink` (Next-aware `<a>`), not Astryx `Link`, so MDX prose does not
  hydrate StyleX onto every anchor.
- **MDX** maps headings, paragraphs, lists, links, tables, emphasis, code,
  images, figures, details, and `hr` through the kit. Fenced `pre` stays
  `MdxPre` (copy + mermaid). `blockquote` stays `MdxBlockquote`. `details` /
  `summary` stay native (ADR-0002). `Collapsible` is a separate Astryx export
  for nav/UI.
- **Tables** are native `<table>` markup, not the Astryx data grid.
- Landmarks and `Image` are native. Do not use Astryx `Section`, `Layout`,
  `Thumbnail`, `AppShell`, or `TopNav` for these names.

## Why

Astryx primitives are `'use client'`. Wiring every MDX `p` / `li` / `code`
through them would restyle the reading room and hydrate Shiki spans. Native
document tags keep `[data-slot=prose]` in charge; Astryx still owns buttons,
fields, dialogs, and dividers.
