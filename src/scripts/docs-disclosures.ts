/** Reveal an anchored section before the browser scrolls to it. */
export function revealDisclosureTarget(hash: string): HTMLElement | null {
  if (!hash || hash === "#") return null;
  let id: string;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return null;
  }
  const target = document.getElementById(id);
  if (!target) return null;
  let parent: HTMLElement | null = target;
  while (parent) {
    if (parent instanceof HTMLDetailsElement) parent.open = true;
    parent = parent.parentElement;
  }
  return target;
}
