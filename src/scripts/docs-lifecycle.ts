import { revealDisclosureTarget } from "./docs-disclosures";

let observer: IntersectionObserver | null = null;
let initialized = false;
let docsNavScrollTop = 0;

function focusSearchShortcut(event: KeyboardEvent) {
  if (
    event.key !== "/" ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement
  ) {
    return;
  }
  const visibleInput = Array.from(
    document.querySelectorAll<HTMLInputElement>("[data-docs-search] input"),
  ).find((input) => input.offsetParent !== null);
  if (!visibleInput) return;
  event.preventDefault();
  visibleInput.focus();
}

function syncDocsNavigation() {
  const currentPath =
    location.pathname.length > 1 ? location.pathname.replace(/\/$/, "") : location.pathname;
  document.querySelectorAll<HTMLAnchorElement>(".docs-nav a[href]").forEach((link) => {
    const linkPath = new URL(link.href, location.href).pathname.replace(/\/$/, "") || "/";
    if (linkPath === currentPath) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function rememberDocsNavScroll() {
  const nav = document.querySelector<HTMLElement>("[data-docs-nav-scroll]");
  if (nav) docsNavScrollTop = nav.scrollTop;
}

function restoreDocsNavScroll() {
  const nav = document.querySelector<HTMLElement>("[data-docs-nav-scroll]");
  if (!nav) return;
  nav.scrollTop = docsNavScrollTop;
  requestAnimationFrame(() => {
    nav.scrollTop = docsNavScrollTop;
  });
}

function stageScrollRoot(): HTMLElement | null {
  const stage = document.querySelector<HTMLElement>(".site-stage__inner");
  if (!stage) return null;
  return getComputedStyle(stage).overflowY === "visible" ? null : stage;
}

function activate(link: HTMLAnchorElement) {
  const toc = link.closest<HTMLElement>("[data-slot='toc'], .docs-toc");
  if (!toc) return;
  toc.querySelectorAll<HTMLAnchorElement>('a[aria-current="location"]').forEach((current) => {
    current.removeAttribute("aria-current");
  });
  link.setAttribute("aria-current", "location");

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targetTop = link.offsetTop - toc.clientHeight / 2 + link.clientHeight / 2;
  toc.scrollTo({ top: Math.max(0, targetTop), behavior: reduced ? "auto" : "smooth" });
}

function initScrollspy() {
  observer?.disconnect();
  observer = null;

  const toc = document.querySelector<HTMLElement>("[data-slot='toc'], .docs-toc");
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>("a[data-toc-id]"));
  const byId = new Map(links.map((link) => [link.dataset.tocId, link]));
  const headings = links
    .map((link) => document.getElementById(link.dataset.tocId ?? ""))
    .filter((heading): heading is HTMLElement => Boolean(heading));
  if (!headings.length) return;

  const hashLink = byId.get(decodeURIComponent(location.hash.slice(1)));
  activate(hashLink ?? links[0]);

  observer = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const heading = entering.at(-1)?.target as HTMLElement | undefined;
      const link = heading ? byId.get(heading.id) : undefined;
      if (link) activate(link);
    },
    {
      root: stageScrollRoot(),
      rootMargin: "-8% 0px -78% 0px",
      threshold: [0, 1],
    },
  );
  headings.forEach((heading) => observer?.observe(heading));
}

function revealCurrentHash() {
  const target = revealDisclosureTarget(location.hash);
  if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
}

export function initDocsLifecycle() {
  if (initialized) return;
  initialized = true;
  document.addEventListener("koi:page-ready", () => {
    restoreDocsNavScroll();
    syncDocsNavigation();
    revealCurrentHash();
    initScrollspy();
  });
  document.addEventListener("koi:before-swap", () => {
    rememberDocsNavScroll();
    observer?.disconnect();
  });
  window.addEventListener("hashchange", revealCurrentHash);
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname) {
      revealDisclosureTarget(url.hash);
    }
  });
  document.addEventListener("keydown", focusSearchShortcut);
  revealCurrentHash();
  syncDocsNavigation();
  initScrollspy();
}
