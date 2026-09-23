import { defineTheme } from "@astryxdesign/core/theme";
import { pair, YORU, HIRU } from "./palette";

/**
 * Dotto — koi's visual identity as an Astryx theme.
 * Product hours are yoru / hiru; Astryx mode is an implementation detail.
 */
export const dottoTheme = defineTheme({
  name: "dotto",

  color: {
    accent: [HIRU.accent, YORU.accent],
    neutralStyle: "cool",
    contrast: "standard",
  },

  typography: {
    scale: { base: 17, ratio: 1.2 },
    body: {
      family: "Geist",
      fallbacks: "ui-sans-serif, system-ui, sans-serif",
      weight: "normal",
    },
    heading: {
      family: "Geist Pixel Square",
      fallbacks: "DotGothic16, ui-monospace, monospace",
      weight: "normal",
    },
    code: {
      family: "Geist Mono",
      fallbacks: "ui-monospace, Menlo, Consolas, monospace",
      weight: "medium",
    },
  },

  radius: { base: 4, multiplier: 0.5 },

  motion: { fast: 160, medium: 240, slow: 520, ratio: 0.75 },

  tokens: {
    "--color-accent": pair("accent"),
    "--color-on-accent": pair("accentBtnFg"),
    "--color-background-body": pair("void"),
    "--color-background-surface": pair("obsidian"),
    "--color-background-muted": pair("obsidian"),
    "--color-background-card": pair("charcoal"),
    "--color-background-popover": pair("charcoal"),
    "--color-text-primary": pair("bone"),
    "--color-text-secondary": pair("fog"),
    "--color-text-disabled": pair("ash"),
    "--color-text-accent": pair("accent"),
    "--color-icon-primary": pair("bone"),
    "--color-icon-secondary": pair("fog"),
    "--color-icon-disabled": pair("ash"),
    "--color-icon-accent": pair("accent"),
    "--color-border": [
      "color-mix(in srgb, #3a3c4c 18%, transparent)",
      "color-mix(in srgb, #d5caf1 18%, transparent)",
    ],
    "--color-border-emphasized": pair("steel"),
    "--color-error": pair("blood"),
    "--color-error-muted": [
      "color-mix(in srgb, #ad1034 12%, transparent)",
      "color-mix(in srgb, #ed5765 16%, transparent)",
    ],
    "--color-on-error": ["#ffffff", "#ffffff"],
    "--color-success": pair("jade"),
    "--color-success-muted": [
      "color-mix(in srgb, #21652d 10%, transparent)",
      "color-mix(in srgb, #95d898 14%, transparent)",
    ],
    "--color-on-success": pair("void"),
    "--color-warning": pair("amber"),
    "--color-warning-muted": [
      "color-mix(in srgb, #85652b 10%, transparent)",
      "color-mix(in srgb, #f6d297 15%, transparent)",
    ],
    "--color-on-warning": pair("void"),
    "--color-shadow": ["transparent", "transparent"],
    "--shadow-low": "none",
    "--shadow-med": "none",
    "--shadow-high": "none",
    "--size-element-sm": "36px",
    "--size-element-md": "44px",
    "--size-element-lg": "44px",
    "--radius-inner": "2px",
    "--radius-element": "4px",
    "--radius-container": "8px",
    "--radius-page": "12px",
    "--radius-chat": "8px",
    "--border-width": "2px",
    "--focus-outline-width": "2px",
    "--focus-outline-style": "solid",
    "--focus-outline-color": "var(--color-accent)",
    "--focus-outline-offset": "2px",
    "--font-family-heading":
      '"Geist Pixel Square", DotGothic16, ui-monospace, monospace',
    "--font-family-body": "Geist, ui-sans-serif, system-ui, sans-serif",
    "--font-family-code": '"Geist Mono", ui-monospace, Menlo, Consolas, monospace',
  },

  localTokens: {
    "--astryx-theme-dotto-color-accent-core": pair("accentCore"),
    "--astryx-theme-dotto-color-accent-hover": pair("accentBtnHover"),
    "--astryx-theme-dotto-color-blossom": pair("blossom"),
    "--astryx-theme-dotto-color-blossom-soft": pair("blossomSoft"),
    "--astryx-theme-dotto-color-plan": pair("plan"),
    "--astryx-theme-dotto-color-tool": pair("tool"),
    "--astryx-theme-dotto-color-file": pair("file"),
    "--astryx-theme-dotto-color-judge": pair("judge"),
    "--astryx-theme-dotto-color-select": pair("select"),
    "--astryx-theme-dotto-color-void": pair("void"),
    "--astryx-theme-dotto-color-obsidian": pair("obsidian"),
    "--astryx-theme-dotto-color-charcoal": pair("charcoal"),
    "--astryx-theme-dotto-color-steel": pair("steel"),
    "--astryx-theme-dotto-color-ash": pair("ash"),
    "--astryx-theme-dotto-color-fog": pair("fog"),
    "--astryx-theme-dotto-color-bone": pair("bone"),
    "--astryx-theme-dotto-color-blood": pair("blood"),
    "--astryx-theme-dotto-color-jade": pair("jade"),
    "--astryx-theme-dotto-color-amber": pair("amber"),
  },

  components: {
    button: {
      base: {
        borderRadius: "4px",
        fontWeight: "500",
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: "none",
        "--button-focus-offset": "2px",
      },
      "variant:primary": {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-on-accent)",
        borderColor: "var(--color-accent)",
      },
      "variant:secondary": {
        backgroundColor: "var(--color-background-card)",
        color: "var(--color-text-primary)",
        borderColor: "color-mix(in srgb, var(--color-text-primary) 50%, var(--color-background-body))",
      },
      "variant:ghost": {
        backgroundColor: "transparent",
        color: "var(--color-text-secondary)",
        borderColor: "color-mix(in srgb, var(--color-text-primary) 50%, var(--color-background-body))",
      },
      "variant:destructive": {
        backgroundColor: "color-mix(in srgb, var(--color-error) 75%, #000)",
        color: "#ffffff",
        borderColor: "color-mix(in srgb, var(--color-error) 75%, #000)",
      },
      "variant:outline": {
        backgroundColor: "transparent",
        color: "var(--color-text-primary)",
        borderColor: "color-mix(in srgb, var(--color-text-primary) 50%, var(--color-background-body))",
      },
      "variant:notch": {
        backgroundColor: "var(--color-background-card)",
        color: "var(--color-text-primary)",
        borderColor: "color-mix(in srgb, var(--color-text-primary) 50%, var(--color-background-body))",
      },
      "elevation:none": { boxShadow: "none" },
      "elevation:low": { boxShadow: "none" },
      "elevation:med": { boxShadow: "none" },
      "elevation:high": { boxShadow: "none" },
    },
    card: {
      base: {
        borderRadius: "4px",
        boxShadow: "none",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor:
          "color-mix(in srgb, var(--color-text-primary) 18%, transparent)",
        backgroundColor: "var(--color-background-card)",
      },
    },
    badge: {
      "variant:plan": {
        backgroundColor: "color-mix(in srgb, var(--astryx-theme-dotto-color-plan) 22%, transparent)",
        color: "var(--astryx-theme-dotto-color-plan)",
      },
      "variant:tool": {
        backgroundColor: "color-mix(in srgb, var(--astryx-theme-dotto-color-tool) 22%, transparent)",
        color: "var(--astryx-theme-dotto-color-tool)",
      },
      "variant:file": {
        backgroundColor: "color-mix(in srgb, var(--astryx-theme-dotto-color-file) 22%, transparent)",
        color: "var(--astryx-theme-dotto-color-file)",
      },
      "variant:judge": {
        backgroundColor: "color-mix(in srgb, var(--astryx-theme-dotto-color-judge) 22%, transparent)",
        color: "var(--astryx-theme-dotto-color-judge)",
      },
    },
    banner: {
      base: { borderRadius: "4px", boxShadow: "none" },
    },
    text: {
      "type:display": {
        fontFamily: "var(--font-family-heading)",
        fontWeight: "400",
        letterSpacing: "0",
      },
    },
    "text-input": {
      base: {
        borderRadius: "4px",
        borderWidth: "2px",
      },
    },
    tooltip: {
      base: {
        borderRadius: "4px",
        boxShadow: "none",
        borderWidth: "2px",
        borderStyle: "solid",
      },
    },
  },

  adaptations: {
    rules: [
      {
        when: { pointer: "coarse" },
        value: {
          tokens: {
            "--size-element-sm": "36px",
            "--size-element-md": "44px",
            "--size-element-lg": "44px",
          },
        },
      },
      {
        when: { motion: "reduce" },
        value: {
          tokens: {
            "--duration-fast-min": "1ms",
            "--duration-fast": "1ms",
            "--duration-fast-max": "1ms",
            "--duration-medium-min": "1ms",
            "--duration-medium": "1ms",
            "--duration-medium-max": "1ms",
          },
        },
      },
    ],
  },
});
