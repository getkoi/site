import { mermaidThemeVariables } from "../dotto/mermaid";
import { isHour, type Hour } from "../dotto/types";
import { installDiagramViewer, disposeDiagramViewer, disposeDiagramViewers } from "./diagram-viewer";

const sources = new WeakMap<HTMLElement, string>();
let initialized = false;
let generation = 0;
let scheduled = 0;
let renderQueue = Promise.resolve();

function showRenderError(frame: HTMLElement, original: string) {
  disposeDiagramViewer(frame);
  const message = document.createElement("p");
  message.setAttribute("data-slot", "mermaid-error");
  message.textContent = "This diagram could not be rendered. Its Mermaid source follows.";
  const source = document.createElement("pre");
  source.textContent = original;
  frame.replaceChildren(message, source);
  frame.dataset.mermaidState = "error";
}

function currentHour(): Hour {
  const theme = document.documentElement.dataset.hour;
  return isHour(theme) ? theme : "yoru";
}

function token(style: CSSStyleDeclaration, name: string, fallback: string) {
  return style.getPropertyValue(name).trim() || fallback;
}

async function renderMermaid(run: number) {
  if (run !== generation) return;
  const frames = Array.from(
    document.querySelectorAll<HTMLElement>("[data-mermaid-frame]"),
  );
  if (!frames.length) return;

  // Save every source before any asynchronous work or DOM replacement.
  for (const frame of frames) {
    if (!sources.has(frame)) {
      sources.set(frame, frame.querySelector<HTMLElement>("[data-mermaid-source]")?.textContent ?? "");
    }
  }

  let mermaid;
  try {
    ({ default: mermaid } = await import("mermaid"));
  } catch {
    if (run === generation) {
      for (const frame of frames) showRenderError(frame, sources.get(frame) ?? "");
    }
    return;
  }
  if (run !== generation) return;

  const hour = currentHour();
  const rootStyle = getComputedStyle(document.documentElement);
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    suppressErrorRendering: true,
    theme: "base",
    fontFamily: token(rootStyle, "--font-mono", "ui-monospace, monospace"),
    themeVariables: mermaidThemeVariables(hour),
    flowchart: {
      curve: "stepAfter",
      htmlLabels: false,
    },
    sequence: {
      useMaxWidth: false,
      wrap: true,
      actorMargin: 32,
      messageMargin: 32,
      mirrorActors: false,
    },
  });

  for (const [index, frame] of frames.entries()) {
    if (run !== generation) return;
    const original = sources.get(frame) ?? "";
    frame.dataset.mermaidState = "rendering";

    try {
      if (!original.trim()) throw new Error("Missing Mermaid source");
      // mermaid.run resets its deterministic ID generator on each call. Explicit
      // IDs prevent later diagrams/redraws from deleting an earlier frame's SVG.
      const { svg, bindFunctions } = await mermaid.render(`koi-mermaid-${run}-${index}`, original);
      if (run !== generation) return;
      const diagram = document.createElement("div");
      diagram.className = "mermaid";
      diagram.innerHTML = svg;
      if (!diagram.querySelector("svg")) throw new Error("Mermaid returned no SVG");
      frame.dataset.mermaidKind = original.trimStart().startsWith("sequenceDiagram") ? "sequence" : "flowchart";
      disposeDiagramViewer(frame);
      frame.replaceChildren(diagram);
      bindFunctions?.(diagram);
      installDiagramViewer(frame, diagram);
      frame.dataset.mermaidState = "ready";
    } catch {
      if (run !== generation) return;
      showRenderError(frame, original);
    }
  }
}

function scheduleRender() {
  cancelAnimationFrame(scheduled);
  const run = ++generation;
  scheduled = requestAnimationFrame(() => {
    // Mermaid shares global config and temporary DOM; never overlap render passes.
    renderQueue = renderQueue.then(() => renderMermaid(run));
  });
}

export function initMermaidLifecycle() {
  if (initialized) return;
  initialized = true;
  document.addEventListener("koi:page-ready", scheduleRender);
  document.addEventListener("koi:theme-change", scheduleRender);
  document.addEventListener("koi:before-swap", () => {
    disposeDiagramViewers();
    generation++;
    cancelAnimationFrame(scheduled);
  });
  scheduleRender();
}
