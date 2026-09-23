# Dotto

The pixel design system for the koi site: hours, tokens, and an in-repo Astryx
theme. koi is the product; this context is the visual system it wears.

## Language

**dotto**:
The pixel design system: tokens, hours, and Astryx theme overrides.
_Avoid_: koi (as a system name), UI kit, theme kit, open-box kit

**hour**:
One remap of the same token names: yoru or hiru. Applied on `html[data-hour]`.
Astryx `mode` (`light` / `dark`) is an implementation detail on `html[data-theme]`.
_Avoid_: theme (when meaning an hour), dark mode, light mode

**Astryx theme**:
The `defineTheme` document in `theme.ts` plus generated `dotto.css` / `dotto.js`.
_Avoid_: Base UI, open-box, shadcn, CVA

**variant**:
The action role of a control on Astryx Button: primary, secondary, ghost, outline,
destructive, or notch.
_Avoid_: tone, color, intent (when meaning the action role)

**status**:
A mechanic color on Badge or Banner only: success, warning, error, plus harness
roles `plan` / `tool` / `file` / `judge`.
_Avoid_: tone, variant (when meaning mechanic color)

**notch**:
The marketing CTA Button variant: pixel corner plus dither.
_Avoid_: pixel (as a surface name)

**scene**:
Custom pixel art (Sakura, marks, campaign pond, verb art) that consumes tokens
and is not an Astryx primitive.
_Avoid_: AppShell, illustration kit

**HTML primitive**:
A `dotto/components` export named after an HTML tag (`Button`, `Heading`,
`Summary`). Document tags render native elements; interactive tags wrap Astryx
(ADR-0005).
_Avoid_: open-box slot, shadcn

**kit docs**:
The `/dotto` reading room: Foundations, then Astryx catalog groups, one page
per entry (ADR-0006). Internal, `noindex`.
_Avoid_: Storybook, Astryx docs clone, AppShell

**host**:
The Next.js App Router app in `site/`, run with Bun.
_Avoid_: Astro, Deno Deploy (as the current host)
