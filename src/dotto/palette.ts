/**
 * Binding hexes for the dotto Astryx theme.
 * Tuples in theme.ts are [hiru, yoru] = [light, dark].
 * DESIGN.md YAML/JSON must stay in lockstep.
 */

export const HOURS = ["yoru", "hiru"] as const;
export type Hour = (typeof HOURS)[number];

/** Stored yoi/asa from the retired four-hour cycle collapse to yoru. */
export const HOUR_ALIASES: Record<string, Hour> = {
  yoi: "yoru",
  asa: "yoru",
};

export type Palette = {
  void: string;
  obsidian: string;
  charcoal: string;
  steel: string;
  ash: string;
  fog: string;
  bone: string;
  accent: string;
  accentCore: string;
  accentBtnFg: string;
  accentBtnHover: string;
  blood: string;
  jade: string;
  amber: string;
  blossom: string;
  blossomSoft: string;
  plan: string;
  tool: string;
  file: string;
  judge: string;
  select: string;
};

/** Remixed night: yoru depth + yoi ink/blood + asa glow. */
export const YORU: Palette = {
  void: "#131a2a",
  obsidian: "#0c1323",
  charcoal: "#2c3343",
  steel: "#464d5e",
  ash: "#5f6677",
  fog: "#aea5c4",
  bone: "#d5caf1",
  accent: "#d2aaf7",
  accentCore: "#f8bce3",
  accentBtnFg: "#131a2a",
  accentBtnHover: "#f8bce3",
  blood: "#ed5765",
  jade: "#95d898",
  amber: "#f6d297",
  blossom: "#ffbbf5",
  blossomSoft: "#ffd2f5",
  plan: "#8cbaf7",
  tool: "#7ed4de",
  file: "#89cebb",
  judge: "#aabaf8",
  select: "#3b2b46",
};

/** AA courtyard — unchanged from the four-hour hiru table. */
export const HIRU: Palette = {
  void: "#e5edff",
  obsidian: "#dbe3f5",
  charcoal: "#c7cedf",
  steel: "#b4baca",
  ash: "#9298a6",
  fog: "#555768",
  bone: "#3a3c4c",
  accent: "#67437d",
  accentCore: "#8d5e8f",
  accentBtnFg: "#e5edff",
  accentBtnHover: "#563869",
  blood: "#ad1034",
  jade: "#21652d",
  amber: "#85652b",
  blossom: "#d88ec7",
  blossomSoft: "#dfabcd",
  plan: "#3c5aa1",
  tool: "#02717a",
  file: "#256b5b",
  judge: "#5c649c",
  select: "#ecdff3",
};

export const PALETTE: Record<Hour, Palette> = { yoru: YORU, hiru: HIRU };

export function isHour(value: string | null | undefined): value is Hour {
  return value === "yoru" || value === "hiru";
}

export function resolveHour(value: string | null | undefined): Hour {
  if (isHour(value)) return value;
  if (value && value in HOUR_ALIASES) return HOUR_ALIASES[value];
  return "yoru";
}

export function hourMode(hour: Hour): "light" | "dark" {
  return hour === "hiru" ? "light" : "dark";
}

/** Astryx token tuples are [light, dark] = [hiru, yoru]. */
export function pair<K extends keyof Palette>(key: K): [string, string] {
  return [HIRU[key], YORU[key]];
}
