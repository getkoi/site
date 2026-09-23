type Cleanup = () => void;

function stageScrollRoot(): HTMLElement | null {
  const stage = document.querySelector<HTMLElement>(".site-stage__inner");
  if (!stage) return null;
  return getComputedStyle(stage).overflowY === "visible" ? null : stage;
}

function prefersReducedMotion(): boolean {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initHeroKoi(): Cleanup {
  const pond = document.querySelector<HTMLElement>("[data-koi]");
  if (!pond) return () => {};

  if (prefersReducedMotion()) {
    pond.dataset.koiState = "settled";
    return () => {};
  }

  pond.dataset.koiState = "scroll";
  const stage = document.querySelector<HTMLElement>(".site-stage__inner");
  let frame = 0;

  const render = () => {
    frame = 0;
    const root = stageScrollRoot();
    const scrollTop = root?.scrollTop ?? globalThis.scrollY;
    const viewport = root?.clientHeight ?? globalThis.innerHeight;
    const pixelsPerTurn = Math.max(760, viewport * 1.4);
    pond.style.setProperty(
      "--koi-scroll-turn",
      `${scrollTop / pixelsPerTurn}turn`,
    );
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(render);
  };

  stage?.addEventListener("scroll", schedule, { passive: true });
  globalThis.addEventListener("scroll", schedule, { passive: true });
  globalThis.addEventListener("resize", schedule, { passive: true });
  render();

  return () => {
    stage?.removeEventListener("scroll", schedule);
    globalThis.removeEventListener("scroll", schedule);
    globalThis.removeEventListener("resize", schedule);
    if (frame) cancelAnimationFrame(frame);
    pond.style.removeProperty("--koi-scroll-turn");
  };
}

function initCampaign(): Cleanup {
  const campaign = document.querySelector<HTMLElement>("[data-koi-campaign]");
  if (!campaign) return () => {};

  const steps = Array.from(
    campaign.querySelectorAll<HTMLElement>("[data-campaign-step]"),
  );
  const scenes = Array.from(
    campaign.querySelectorAll<HTMLElement>("[data-campaign-scene]"),
  );
  if (!steps.length || steps.length !== scenes.length) return () => {};

  const activate = (index: number) => {
    steps.forEach((step, stepIndex) => {
      step.dataset.active = String(stepIndex === index);
    });
    scenes.forEach((scene, sceneIndex) => {
      scene.dataset.active = String(sceneIndex === index);
      scene.setAttribute("aria-hidden", String(sceneIndex !== index));
    });
  };

  activate(0);

  if (
    prefersReducedMotion() ||
    matchMedia("(max-width: 820px)").matches ||
    !("IntersectionObserver" in window)
  ) {
    steps.forEach((step) => {
      step.dataset.active = "true";
    });
    return () => {};
  }

  const visibility = new Map<Element, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        visibility.set(entry.target, entry.intersectionRatio)
      );

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
      threshold: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85],
    },
  );

  steps.forEach((step) => observer.observe(step));
  return () => observer.disconnect();
}

let activeCleanup: Cleanup | null = null;

export function initKoiStory(): Cleanup {
  activeCleanup?.();
  const stops = [initHeroKoi(), initCampaign()];
  let stopped = false;

  const cleanup = () => {
    if (stopped) return;
    stopped = true;
    stops.forEach((stop) => stop());
    if (activeCleanup === cleanup) activeCleanup = null;
  };

  activeCleanup = cleanup;
  return cleanup;
}
