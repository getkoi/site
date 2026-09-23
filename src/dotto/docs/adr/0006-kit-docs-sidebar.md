# 0006 — Dotto kit docs follow Astryx catalog groups

Status: accepted

`/dotto` is the internal kit reading room. Its sidebar copies Astryx's
**component catalog groups** (Action, Container, Content, Data Input,
Feedback & Status, Layout, Navigation, Overlay, Table & List), plus two
dotto-owned groups Astryx puts elsewhere: **Foundations** (hours, tokens,
type) and **Presentational** (`data-slot` leftovers and Mermaid).

## Decision

- Stay `noindex`, off the product chrome, structured as if it will be
  published later.
- One overview at `/dotto` and one route per entry (`/dotto/button`), not a
  single scrolling gallery.
- Flat links inside each group. Nested families (Button → Icon Button) wait
  until those siblings are first-class kit exports.
- Membership is kit exports, gallery-already-used Astryx pieces (Icon Button,
  Checkbox, Banner, Tooltip, Bottom Sheet), and presentational leftovers.
  Chat, App Shell, and Top Nav stay out.
- Sidebar chrome reuses the docs pattern (Collapsible groups, sticky aside,
  BottomSheet on narrow viewports, `/` search) with a **separate** tree. Do
  not mix junji/yokai docs into `/dotto`. Do not replace the icon-rail with
  Astryx AppShell / TopNav / SideNav. Kit search looks up this tree only.

## Why

Astryx's organization is a tree of pages grouped by job. A hash TOC on one
gallery is not that tree. The docs sidebar already solves sticky nav and
mobile; a second nav anatomy on the same site would fight the reading room.

## Considered options

- **Clone Astryx SideNav inside LayoutPanel** — rejected: second chrome on
  the same stage (ADR-0003).
- **Keep one `/dotto` page with in-page jumps** — rejected: that is a TOC,
  not the catalog.
- **List the full Astryx library with stubs** — rejected: ghosts for Chat
  and App Shell.
