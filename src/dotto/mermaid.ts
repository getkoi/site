import type { Hour } from "./palette";
import { PALETTE } from "./palette";

export type HourTokens = {
  void: string;
  obsidian: string;
  charcoal: string;
  steel: string;
  fog: string;
  bone: string;
  accent: string;
  select: string;
};

export const HOUR_TOKENS: Record<Hour, HourTokens> = {
  yoru: {
    void: PALETTE.yoru.void,
    obsidian: PALETTE.yoru.obsidian,
    charcoal: PALETTE.yoru.charcoal,
    steel: PALETTE.yoru.steel,
    fog: PALETTE.yoru.fog,
    bone: PALETTE.yoru.bone,
    accent: PALETTE.yoru.accent,
    select: PALETTE.yoru.select,
  },
  hiru: {
    void: PALETTE.hiru.void,
    obsidian: PALETTE.hiru.obsidian,
    charcoal: PALETTE.hiru.charcoal,
    steel: PALETTE.hiru.steel,
    fog: PALETTE.hiru.fog,
    bone: PALETTE.hiru.bone,
    accent: PALETTE.hiru.accent,
    select: PALETTE.hiru.select,
  },
};

/** Per-hour Mermaid `themeVariables`. Labels use bone on charcoal (AA). No handDrawn. */
export function mermaidThemeVariables(hour: Hour) {
  const t = HOUR_TOKENS[hour];
  return {
    darkMode: hour !== "hiru",
    background: t.obsidian,
    primaryColor: t.charcoal,
    primaryTextColor: t.bone,
    primaryBorderColor: t.steel,
    secondaryColor: t.obsidian,
    secondaryTextColor: t.bone,
    secondaryBorderColor: t.steel,
    tertiaryColor: t.void,
    tertiaryTextColor: t.bone,
    tertiaryBorderColor: t.steel,
    lineColor: t.steel,
    textColor: t.bone,
    mainBkg: t.charcoal,
    nodeBorder: t.steel,
    clusterBkg: t.void,
    clusterBorder: t.steel,
    titleColor: t.bone,
    edgeLabelBackground: t.obsidian,
    noteBkgColor: t.charcoal,
    noteTextColor: t.bone,
    noteBorderColor: t.steel,
    actorBkg: t.charcoal,
    actorBorder: t.steel,
    actorTextColor: t.bone,
    actorLineColor: t.steel,
    labelBoxBkgColor: t.charcoal,
    labelTextColor: t.bone,
    loopTextColor: t.bone,
    activationBkgColor: t.select,
    activationBorderColor: t.accent,
    signalColor: t.bone,
    signalTextColor: t.bone,
  };
}
