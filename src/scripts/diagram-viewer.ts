const viewers = new Map<HTMLElement, () => void>();

export function disposeDiagramViewer(frame: HTMLElement) {
  viewers.get(frame)?.();
  viewers.delete(frame);
}

export function disposeDiagramViewers() {
  for (const frame of viewers.keys()) disposeDiagramViewer(frame);
}

export function clampZoom(scale: number) {
  return Math.max(0.1, Math.min(4, scale));
}

/** Move the same SVG into a modal: never duplicate Mermaid's IDs or bindings. */
export function installDiagramViewer(frame: HTMLElement, diagram: HTMLElement) {
  const svg = diagram.querySelector("svg");
  if (!svg) return;
  const box = svg.viewBox.baseVal;
  const width = box.width || svg.getBoundingClientRect().width || 800;
  const height = box.height || svg.getBoundingClientRect().height || 600;
  const title = svg.querySelector("title")?.textContent || "Diagram";
  const shell = document.createElement("div");
  shell.className = "diagram-viewer";
  const toolbar = document.createElement("div");
  toolbar.className = "diagram-toolbar";
  toolbar.setAttribute("role", "group");
  toolbar.setAttribute("aria-label", "Diagram controls");
  const viewport = document.createElement("div");
  viewport.className = "diagram-viewport";
  viewport.tabIndex = 0;
  viewport.setAttribute("role", "region");
  viewport.setAttribute("aria-label", `${title}. Arrow keys pan; plus and minus zoom; zero fits.`);
  const readout = document.createElement("output");
  readout.setAttribute("aria-label", "Diagram zoom");
  const hint = document.createElement("p");
  hint.className = "diagram-hint";
  hint.textContent = "Drag or scroll to pan · + / − to zoom · 0 to fit · Esc to close enlarged view";
  let scale = 1;
  let fitting = true;
  let dialog: HTMLDialogElement | undefined;
  let disposed = false;

  function zoom(next: number, fit = false) {
    const x = (viewport.scrollLeft + viewport.clientWidth / 2) / scale;
    const y = (viewport.scrollTop + viewport.clientHeight / 2) / scale;
    scale = clampZoom(next);
    fitting = fit;
    svg!.style.width = `${width * scale}px`;
    svg!.style.height = `${height * scale}px`;
    readout.textContent = `${Math.round(scale * 100)}%`;
    viewport.scrollLeft = fit ? 0 : x * scale - viewport.clientWidth / 2;
    viewport.scrollTop = fit ? 0 : y * scale - viewport.clientHeight / 2;
  }
  function fit() {
    zoom(Math.min(1, viewport.clientWidth / width, viewport.clientHeight / height), true);
  }
  function button(label: string, action: () => void, accessible = label) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.setAttribute("aria-label", accessible);
    b.addEventListener("click", action);
    toolbar.append(b);
    return b;
  }
  button("−", () => zoom(scale / 1.25), "Zoom out");
  toolbar.append(readout);
  button("+", () => zoom(scale * 1.25), "Zoom in");
  button("Fit", fit, "Fit whole diagram");
  button("100%", () => zoom(1), "Actual size");
  const enlarge = button("Enlarge", () => {
    if (dialog) { dialog.close(); return; }
    dialog = document.createElement("dialog");
    dialog.className = "diagram-dialog";
    dialog.setAttribute("aria-label", title);
    dialog.setAttribute("data-slot", "mermaid");
    dialog.append(shell);
    document.body.append(dialog);
    enlarge.textContent = "Close";
    enlarge.setAttribute("aria-label", "Close enlarged diagram");
    dialog.addEventListener("close", () => {
      if (disposed) return;
      frame.append(shell);
      dialog?.remove();
      dialog = undefined;
      enlarge.textContent = "Enlarge";
      enlarge.setAttribute("aria-label", "Enlarge diagram");
      fit();
      enlarge.focus();
    }, { once: true });
    dialog.showModal();
    fit();
    enlarge.focus();
  }, "Enlarge diagram");
  viewport.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-80, 0], ArrowRight: [80, 0], ArrowUp: [0, -80], ArrowDown: [0, 80],
    };
    if (moves[event.key]) {
      event.preventDefault();
      viewport.scrollBy(...moves[event.key]);
    } else if (["+", "=", "-", "0"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "0") fit();
      else zoom(scale * (event.key === "-" ? 0.8 : 1.25));
    }
  });
  let drag: { id: number; x: number; y: number; left: number; top: number } | undefined;
  viewport.addEventListener("pointerdown", event => {
    // Touch retains native two-axis scrolling; don't intercept links in diagrams.
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as Element).closest("a")) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-panning");
    viewport.focus({ preventScroll: true });
    event.preventDefault();
  });
  viewport.addEventListener("pointermove", event => {
    if (!drag || drag.id !== event.pointerId) return;
    viewport.scrollLeft = drag.left + drag.x - event.clientX;
    viewport.scrollTop = drag.top + drag.y - event.clientY;
  });
  const stopDrag = () => { drag = undefined; viewport.classList.remove("is-panning"); };
  viewport.addEventListener("pointerup", stopDrag);
  viewport.addEventListener("pointercancel", stopDrag);
  viewport.addEventListener("lostpointercapture", stopDrag);

  viewport.append(diagram);
  shell.append(toolbar, viewport, hint);
  frame.append(shell);
  const observer = new ResizeObserver(() => { if (fitting) fit(); });
  observer.observe(viewport);
  fit();
  viewers.set(frame, () => {
    disposed = true;
    observer.disconnect();
    // Remove directly: disposal must not restore a stale view or steal focus.
    dialog?.remove();
    dialog = undefined;
  });
}
