export type { Hour, Palette } from "./palette";
export {
  HOURS,
  HOUR_ALIASES,
  PALETTE,
  YORU,
  HIRU,
  isHour,
  resolveHour,
  hourMode,
  pair,
} from "./palette";

export type Variant = "primary" | "secondary" | "ghost" | "outline" | "destructive" | "notch";
export type Status =
  | "neutral"
  | "accent"
  | "jade"
  | "amber"
  | "blood"
  | "plan"
  | "tool"
  | "file"
  | "judge";
export type Size = "sm" | "md" | "lg";
