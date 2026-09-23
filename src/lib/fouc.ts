export const FOUC_SCRIPT = `(function () {
  try {
    var key = "koi-theme";
    var aliases = { yoi: "yoru", asa: "yoru" };
    var hours = ["yoru", "hiru"];
    var colors = { yoru: "#131a2a", hiru: "#e5edff" };
    var stored = localStorage.getItem(key);
    if (stored && aliases[stored]) {
      stored = aliases[stored];
      try { localStorage.setItem(key, stored); } catch (e) {}
    }
    var theme =
      hours.indexOf(stored) >= 0
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "hiru"
          : "yoru";
    document.documentElement.dataset.hour = theme;
    document.documentElement.dataset.theme = theme === "hiru" ? "light" : "dark";
    document.documentElement.dataset.astryxTheme = "dotto";
    document.documentElement.style.colorScheme = theme === "hiru" ? "light" : "dark";
    document.documentElement.dataset.railCollapsed =
      localStorage.getItem("koi-rail-collapsed") === "0" ? "false" : "true";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", colors[theme] || colors.yoru);
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !CSS.supports("animation-timeline: view()")
    ) {
      document.documentElement.dataset.motion = "fallback";
    }
  } catch (e) {
    document.documentElement.dataset.hour = "yoru";
    document.documentElement.dataset.theme = "dark";
  }
})();`;

export const FAVICON_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%23131a2a'/%3E%3Crect x='5' y='3' width='2' height='2' fill='%23d2aaf7'/%3E%3Crect x='7' y='4' width='2' height='1' fill='%23d2aaf7'/%3E%3Crect x='9' y='5' width='2' height='2' fill='%23d2aaf7'/%3E%3Crect x='10' y='7' width='1' height='2' fill='%23d2aaf7'/%3E%3Crect x='9' y='9' width='2' height='2' fill='%23d2aaf7'/%3E%3Crect x='7' y='11' width='2' height='1' fill='%23d2aaf7'/%3E%3Crect x='5' y='11' width='2' height='2' fill='%23d2aaf7'/%3E%3Crect x='3' y='9' width='2' height='2' fill='%23d2aaf7'/%3E%3Crect x='2' y='7' width='1' height='2' fill='%23d2aaf7'/%3E%3Crect x='3' y='5' width='2' height='2' fill='%23d2aaf7'/%3E%3Crect x='5' y='4' width='2' height='1' fill='%23df4a5d'/%3E%3Crect x='9' y='10' width='2' height='1' fill='%23df4a5d'/%3E%3C/svg%3E";
