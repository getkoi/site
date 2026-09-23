# 0001 — dotto is the design system; CSS-first open box

Status: superseded by [0003](0003-astryx-theme.md) (Astryx is the component
base; product hours live on `data-hour`). The naming decision still holds:
**dotto** is the visual system; koi is the product.

koi is the product. The visual system that used to be named “koi” in DESIGN.md is **dotto**. Cast marks sit on it; they are not its name. Changing that later would mean renaming tokens, slots, Claude Design ingest, and every `data-slot` contract.

Components are **open-box**: CSS targets `data-slot` / `data-variant` / `data-size` / `data-surface` / `data-status` plus Base UI state attributes. React wrappers only add behavior. Astro stamps the same slots without an island. The site is mixed Astro + React islands; putting utilities only in TSX would force every breadcrumb and filter chip through React, or duplicate class strings.

Rejected: keeping DESIGN.md named `koi` with `dotto` as an implementation folder only (two names for one system). Rejected: shadcn-style CVA class maps as the source of truth (Astro cannot share them). Rejected: a pxlkit-like `tone` prop on every control (breaks the Status-Only Rule).
