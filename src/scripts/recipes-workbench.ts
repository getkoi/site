import { afterPaint } from "./after-paint";

type RecipeMode = "sensor" | "sandbox";

interface WorkbenchController {
  syncFromHash: () => void;
}

const boundWorkbenches = new WeakSet<HTMLElement>();
const controllers = new WeakMap<HTMLElement, WorkbenchController>();
let initialized = false;

function recipeMode(detail: HTMLElement): RecipeMode {
  return detail.dataset.recipeKind === "sandbox" ? "sandbox" : "sensor";
}

function bindWorkbench(root: HTMLElement): WorkbenchController {
  const existing = controllers.get(root);
  if (existing) return existing;

  const modeLinks = Array.from(
    root.querySelectorAll<HTMLAnchorElement>("[data-recipe-mode]"),
  );
  const panels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-recipe-mode-panel]"),
  );
  const details = Array.from(
    root.querySelectorAll<HTMLElement>("[data-recipe-detail]"),
  );
  const detailsById = new Map<string, HTMLElement>();
  for (const detail of details) {
    if (detail.dataset.recipeDetail) {
      detailsById.set(detail.dataset.recipeDetail, detail);
    }
  }
  const sensorDetails = details.filter((detail) =>
    recipeMode(detail) === "sensor"
  );
  const sandboxDetails = details.filter((detail) =>
    recipeMode(detail) === "sandbox"
  );
  const choices = Array.from(
    root.querySelectorAll<HTMLAnchorElement>("[data-recipe-choice]"),
  );
  const results = Array.from(
    root.querySelectorAll<HTMLElement>("[data-recipe-result]"),
  );
  const search = root.querySelector<HTMLInputElement>("[data-recipe-search]");
  const stackButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-recipe-stack]"),
  );
  const count = root.querySelector<HTMLElement>("[data-recipe-count]");
  const empty = root.querySelector<HTMLElement>("[data-recipe-empty]");
  const welcome = root.querySelector<HTMLElement>("[data-recipe-welcome]");
  const status = root.querySelector<HTMLElement>("[data-recipe-status]");
  const sandboxOptions = Array.from(
    root.querySelectorAll<HTMLSelectElement>("[data-sandbox-option]"),
  );
  const backButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-recipes-back]"),
  );

  let activeMode: RecipeMode = "sensor";
  let activeStack = "all";
  let activeRecipeId: string | null = null;
  const scrollBehavior = matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  root.dataset.recipesEnhanced = "true";

  function announce(message: string) {
    if (status) status.textContent = message;
  }

  function writeHash(hash: string, replace = false) {
    const url = `${location.pathname}${location.search}#${hash}`;
    if (replace) history.replaceState(null, "", url);
    else history.pushState(null, "", url);
  }

  function setMode(mode: RecipeMode) {
    activeMode = mode;
    root.dataset.recipeActiveMode = mode;

    for (const link of modeLinks) {
      const active = link.dataset.recipeMode === mode;
      link.dataset.active = String(active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }

    for (const panel of panels) {
      panel.hidden = panel.dataset.recipeModePanel !== mode;
    }
  }

  function setChoiceState(id: string | null) {
    for (const choice of choices) {
      const active = choice.dataset.recipeChoice === id;
      choice.dataset.active = String(active);
      if (active) choice.setAttribute("aria-current", "true");
      else choice.removeAttribute("aria-current");
    }
  }

  function setSandboxOptions(detail: HTMLElement) {
    const values: Record<string, string | undefined> = {
      stack: detail.dataset.recipeStack,
      launcher: detail.dataset.recipeLauncher,
      agent: detail.dataset.recipeAgent,
    };
    for (const select of sandboxOptions) {
      const key = select.dataset.sandboxOption;
      if (key && values[key]) select.value = values[key];
    }
  }

  function showDetail(
    id: string,
    options: { focus?: boolean; mobile?: boolean } = {},
  ) {
    const detail = detailsById.get(id);
    if (!detail) return false;

    const mode = recipeMode(detail);
    setMode(mode);
    activeRecipeId = id;
    setChoiceState(id);

    const modeDetails = mode === "sensor" ? sensorDetails : sandboxDetails;
    for (const candidate of modeDetails) {
      candidate.hidden = candidate !== detail;
    }
    if (welcome) welcome.hidden = true;
    if (mode === "sandbox") setSandboxOptions(detail);

    root.dataset.mobileDetail = String(options.mobile ?? true);
    const title = detail.querySelector("h3")?.textContent?.trim() ?? id;
    announce(`Loaded ${title}.`);

    if (options.focus) {
      detail.focus({ preventScroll: true });
      detail.scrollIntoView({ behavior: scrollBehavior, block: "start" });
    }
    return true;
  }

  function showSensorWelcome() {
    setMode("sensor");
    activeRecipeId = null;
    setChoiceState(null);
    for (const detail of sensorDetails) detail.hidden = true;
    if (welcome) welcome.hidden = false;
    root.dataset.mobileDetail = "false";
    announce("Sensor shelf ready.");
  }

  function selectedSandboxDetail(): HTMLElement | undefined {
    const selected = Object.fromEntries(
      sandboxOptions.map((
        select,
      ) => [select.dataset.sandboxOption, select.value]),
    );
    return sandboxDetails.find((detail) =>
      detail.dataset.recipeStack === selected.stack &&
      detail.dataset.recipeLauncher === selected.launcher &&
      detail.dataset.recipeAgent === selected.agent
    );
  }

  function showConfiguredSandbox(
    options: { push?: boolean; mobile?: boolean } = {},
  ) {
    const detail = selectedSandboxDetail() ?? sandboxDetails[0];
    const id = detail?.dataset.recipeDetail;
    if (!detail || !id) return;
    showDetail(id, { mobile: options.mobile });
    if (options.push) writeHash(id);
  }

  function applySensorFilters() {
    const term = search?.value.trim().toLocaleLowerCase() ?? "";
    let visible = 0;

    for (const result of results) {
      const stackMatches = activeStack === "all" ||
        result.dataset.recipeStackValue === activeStack;
      const textMatches = !term ||
        (result.textContent?.toLocaleLowerCase().includes(term) ?? false);
      const matches = stackMatches && textMatches;
      result.hidden = !matches;
      if (matches) visible += 1;
    }

    if (count) {
      count.textContent = `${visible} ${visible === 1 ? "recipe" : "recipes"}`;
    }
    if (empty) empty.hidden = visible > 0;

    if (activeRecipeId) {
      const selectedResult = results.find((result) =>
        result.dataset.recipeResult === activeRecipeId
      );
      if (selectedResult?.hidden) {
        showSensorWelcome();
        writeHash("sensors", true);
      }
    }
  }

  function resetSensorFilters() {
    activeStack = "all";
    if (search) search.value = "";
    for (const button of stackButtons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.recipeStack === "all"),
      );
    }
    activeRecipeId = null;
    applySensorFilters();
  }

  function activateMode(mode: RecipeMode, options: { push?: boolean } = {}) {
    if (mode === "sensor") {
      showSensorWelcome();
    } else {
      setMode("sandbox");
      showConfiguredSandbox({ mobile: false });
      root.dataset.mobileDetail = "false";
      announce("Sandbox configurator ready.");
    }
    if (options.push) writeHash(mode === "sensor" ? "sensors" : "sandboxes");
  }

  function syncFromHash() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash === "sandboxes") {
      activateMode("sandbox");
      return;
    }
    if (hash === "sensors" || !hash || hash === "workbench" || hash === "top") {
      activateMode("sensor");
      return;
    }
    const linkedDetail = detailsById.get(hash);
    if (linkedDetail && recipeMode(linkedDetail) === "sensor") {
      const linkedResult = results.find((result) =>
        result.dataset.recipeResult === hash
      );
      if (linkedResult?.hidden) resetSensorFilters();
    }
    if (showDetail(hash, { mobile: true })) return;
    activateMode("sensor");
  }

  for (const link of modeLinks) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      activateMode(
        link.dataset.recipeMode === "sandbox" ? "sandbox" : "sensor",
        {
          push: true,
        },
      );
      panels.find((panel) => !panel.hidden)?.scrollIntoView({
        behavior: scrollBehavior,
        block: "start",
      });
    });
  }

  for (const choice of choices) {
    choice.addEventListener("click", (event) => {
      event.preventDefault();
      const id = choice.dataset.recipeChoice;
      if (!id) return;
      showDetail(id, { focus: true, mobile: true });
      writeHash(id);
    });
  }

  search?.addEventListener("input", applySensorFilters);

  for (const button of stackButtons) {
    button.addEventListener("click", () => {
      activeStack = button.dataset.recipeStack ?? "all";
      for (const candidate of stackButtons) {
        candidate.setAttribute(
          "aria-pressed",
          String(candidate.dataset.recipeStack === activeStack),
        );
      }
      applySensorFilters();
    });
  }

  for (const select of sandboxOptions) {
    select.addEventListener("change", () => {
      showConfiguredSandbox({ push: true, mobile: true });
    });
  }

  for (const button of backButtons) {
    button.addEventListener("click", () => {
      root.dataset.mobileDetail = "false";
      const panel = panels.find((candidate) => !candidate.hidden);
      const target = panel?.querySelector<HTMLElement>(
        activeMode === "sensor"
          ? "[data-recipe-search]"
          : "[data-sandbox-option]",
      );
      target?.focus({ preventScroll: true });
      panel?.scrollIntoView({ behavior: scrollBehavior, block: "start" });
    });
  }

  applySensorFilters();
  const controller = { syncFromHash };
  controllers.set(root, controller);
  boundWorkbenches.add(root);
  syncFromHash();
  return controller;
}

function initWorkbenches() {
  document.querySelectorAll<HTMLElement>("[data-recipes-workbench]").forEach(
    (root) => {
      if (!boundWorkbenches.has(root)) bindWorkbench(root);
    },
  );
}

function syncCurrentWorkbench() {
  const root = document.querySelector<HTMLElement>("[data-recipes-workbench]");
  if (!root) return;
  controllers.get(root)?.syncFromHash();
}

function focusRecipeSearch(event: KeyboardEvent) {
  if (event.key !== "/") return;
  const target = event.target;
  const isEditing = target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement;
  if (isEditing) return;

  const root = document.querySelector<HTMLElement>("[data-recipes-workbench]");
  if (!root || root.dataset.recipeActiveMode !== "sensor") return;
  const search = root.querySelector<HTMLInputElement>("[data-recipe-search]");
  if (!search) return;
  event.preventDefault();
  search.focus();
}

export function initRecipesWorkbenchLifecycle() {
  if (initialized) return;
  initialized = true;
  document.addEventListener("koi:page-ready", () => afterPaint(initWorkbenches));
  document.addEventListener("keydown", focusRecipeSearch);
  globalThis.addEventListener("hashchange", syncCurrentWorkbench);
  afterPaint(initWorkbenches);
}
