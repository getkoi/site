# Dotto anatomy

Dotto is an Astryx theme. Interactive chrome comes from `@astryxdesign/core`
with overrides in `theme.ts`. Hours remap on `html[data-hour]`. Astryx writes
`html[data-theme]` as `light` (hiru) or `dark` (yoru). Native docs `<details>`
stay native (ADR-0002). Pixel scenes stay custom.

## Axes

| Attribute | Values |
|-----------|--------|
| Button `variant` | `primary` · `secondary` · `ghost` · `outline` · `destructive` · `notch` |
| Badge `variant` | Astryx status plus `plan` · `tool` · `file` · `judge` |
| Size | `sm` · `md` · `lg` (theme: sm 36px, md/lg 44px) |

Ash is never copy. Jade/amber/blood only on Badge, Banner, Progress.

Style in-page links with Astryx `Button href` when they should look like buttons.

## Parts

| Component | Source |
|-----------|--------|
| Button, TextInput, TextArea, Dialog, Divider, Blockquote, CodeBlock, Timestamp, Card, ClickableCard, SelectableCard, Badge, Citation | Astryx, re-exported from `dotto/components` (ADR-0005) |
| Kbd | Dual: native `<kbd>` children, or Astryx `keys` |
| Link | `AppLink` (Next-aware); Astryx `Link` stays on chrome via `LinkProvider` |
| Heading, Text, List, Code, table family, landmarks, Image, Figure, Details, Summary, Label | Native HTML names in `dotto/components` (ADR-0005) |
| IconButton, CheckboxInput, Banner, Tooltip | Astryx (gallery; not yet kit names) |
| Typeahead | Astryx — docs search and `/dotto` kit search |
| Collapsible | Astryx — docs nav / kit export; not MDX `details` |
| BottomSheet | Astryx — docs mobile nav |
| Native details | Docs optional detail (ADR-0002) |
| `/dotto` sidebar | Astryx catalog groups + Foundations / Presentational (ADR-0006) |
| NavLink, Toc, PrevNext, Prose, Mermaid | Site CSS on `data-slot` / classes |
| Sakura, marks, pond, verb art | Custom scenes |

## A11y

- Body: bone or fog on void/obsidian.
- Interactive chrome shares the 4px pixel corner (`clip-path` on `.astryx-button` and remaining slots) and 2px `--btn-line`. Hairline `--line` / `--line-2` stay atmospheric.
- Do not `filter: drop-shadow` text-bearing chrome.
- Accent hover uses `--accent-btn-hover` so accent-btn-fg stays AA.
- Destructive fill is blood mixed toward black so white label hits 4.5:1 on yoru.
- Focus: 2px accent outline, offset 2, outside the clip.
- `prefers-reduced-motion: reduce` kills Astryx motion tokens, notch dither, and scenes.
- `/` focuses the visible `[data-docs-search] input`.
