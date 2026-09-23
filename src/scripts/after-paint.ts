/** Run after the current paint so React islands can hydrate first. */
export function afterPaint(fn: () => void) {
  if (typeof requestAnimationFrame !== "function") {
    fn();
    return;
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}
