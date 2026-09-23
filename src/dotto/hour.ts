import type { Hour } from "./palette";
import { hourMode, PALETTE, resolveHour } from "./palette";

export const THEME_KEY = "koi-theme";

export const HOUR_LABELS: Record<Hour, string> = {
  yoru: "yoru",
  hiru: "hiru",
};

export function readHour(): Hour {
  if (typeof document === "undefined") return "yoru";
  return resolveHour(document.documentElement.dataset.hour);
}

export function storedHour(): Hour | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    if (!value) return null;
    return resolveHour(value);
  } catch {
    return null;
  }
}

export function applyHour(hour: Hour, persist = false, announce = true) {
  const root = document.documentElement;
  root.dataset.hour = hour;
  root.dataset.theme = hourMode(hour);
  root.dataset.astryxTheme = "dotto";
  root.style.colorScheme = hourMode(hour);
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", PALETTE[hour].void);

  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, hour);
    } catch {
      /* storage is optional */
    }
  }

  if (announce) {
    document.dispatchEvent(new CustomEvent("koi:theme-change", { detail: { theme: hour } }));
  }
}

export function toggleHour(current: Hour): Hour {
  return current === "yoru" ? "hiru" : "yoru";
}
