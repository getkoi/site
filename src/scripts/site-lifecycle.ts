import { surfaceFromPath } from "../lib/surface";
import { applyHour, HOUR_LABELS, readHour, storedHour, THEME_KEY, toggleHour } from "../dotto/hour";
import { resolveHour, type Hour } from "../dotto/palette";

let initialized = false;

function currentTheme(): Hour {
  return readHour();
}

function updateThemeControls(theme: Hour) {
  const next = toggleHour(theme);
  document.querySelectorAll<HTMLButtonElement>(".theme-toggle").forEach((button) => {
    button.setAttribute("aria-label", `Switch to ${HOUR_LABELS[next]}`);
    button.setAttribute(
      "title",
      `Theme: ${HOUR_LABELS[theme]} — click for ${HOUR_LABELS[next]}`,
    );
  });
}

function bindThemeControls() {
  const theme = currentTheme();
  applyHour(theme, false, false);
  updateThemeControls(theme);
}

function updateCurrentSurface() {
  const pathname = location.pathname;
  const onLlms = pathname === "/llms.txt" || pathname.endsWith("/llms.txt");
  document.querySelectorAll<HTMLAnchorElement>(".icon-rail__link").forEach((link) => {
    const href = link.getAttribute("href");
    const isLlmsLink = href === "/llms.txt";
    const isHome = href === "/";
    const current = onLlms
      ? isLlmsLink
      : isHome
        ? pathname === "/" || pathname === ""
        : !isLlmsLink && link.dataset.surface === surfaceFromPath(pathname);
    if (current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function pageLoad() {
  bindThemeControls();
  updateCurrentSurface();
  document.dispatchEvent(new CustomEvent("koi:page-ready"));
}

export function initSiteLifecycle() {
  if (initialized) return;
  initialized = true;

  document.addEventListener("koi:page-ready", () => {
    bindThemeControls();
    updateCurrentSurface();
  });
  document.addEventListener("koi:rail-ready", bindThemeControls);

  globalThis.addEventListener("storage", (event) => {
    if (event.key !== THEME_KEY) return;
    applyHour(resolveHour(event.newValue), false);
  });

  const colorScheme = matchMedia("(prefers-color-scheme: light)");
  colorScheme.addEventListener?.("change", () => {
    if (!storedHour()) applyHour(colorScheme.matches ? "hiru" : "yoru", false);
  });

  pageLoad();
}
