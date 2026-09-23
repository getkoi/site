import { afterPaint } from "./after-paint";

let observer: IntersectionObserver | null = null;
let storyObservers: IntersectionObserver[] = [];
let initialized = false;

function stageScrollRoot(): HTMLElement | null {
  const stage = document.querySelector<HTMLElement>(".site-stage__inner");
  if (!stage) return null;
  return getComputedStyle(stage).overflowY === "visible" ? null : stage;
}

function revealEverything() {
  document.querySelectorAll<HTMLElement>(".reveal").forEach((item) => item.classList.add("in"));
}

function initFallbackReveals() {
  observer?.disconnect();
  observer = null;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nativeTimelines = CSS.supports("animation-timeline: view()");
  if (nativeTimelines && !reduced) {
    return;
  }
  if (reduced || !("IntersectionObserver" in window)) {
    revealEverything();
    return;
  }

  const items = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer?.unobserve(entry.target);
      });
    },
    {
      root: stageScrollRoot(),
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    },
  );
  items.forEach((item) => observer?.observe(item));
}

function disconnectStoryObservers() {
  storyObservers.forEach((storyObserver) => storyObserver.disconnect());
  storyObservers = [];
}

function initScrollStories() {
  disconnectStoryObservers();

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .querySelectorAll<HTMLElement>(".verb-story__layout, .driver-story__layout, .sensors-story__layout")
    .forEach((story) => {
      const steps = Array.from(story.querySelectorAll<HTMLElement>("[data-story-step]"));
      const scenes = Array.from(story.querySelectorAll<HTMLElement>("[data-story-scene]"));
      if (!steps.length || steps.length !== scenes.length) return;

      const activate = (index: number) => {
        scenes.forEach((scene, sceneIndex) => {
          scene.dataset.active = String(sceneIndex === index);
        });
        steps.forEach((step, stepIndex) => {
          step.dataset.active = String(stepIndex === index);
        });
      };
      activate(0);

      if (reduced || !("IntersectionObserver" in window)) return;

      const visibility = new Map<Element, number>();
      const storyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => visibility.set(entry.target, entry.intersectionRatio));
          let activeIndex = 0;
          let activeRatio = 0;
          steps.forEach((step, index) => {
            const ratio = visibility.get(step) ?? 0;
            if (ratio > activeRatio) {
              activeIndex = index;
              activeRatio = ratio;
            }
          });
          if (activeRatio > 0) activate(activeIndex);
        },
        {
          root: stageScrollRoot(),
          threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
        },
      );
      steps.forEach((step) => storyObserver.observe(step));
      storyObservers.push(storyObserver);
    });
}

function initMotionPage() {
  afterPaint(() => {
    initFallbackReveals();
    initScrollStories();
  });
}

export function initMotionLifecycle() {
  if (initialized) return;
  initialized = true;
  document.addEventListener("koi:page-ready", initMotionPage);
  document.addEventListener("koi:before-swap", () => {
    observer?.disconnect();
    disconnectStoryObservers();
  });
  initMotionPage();
}
