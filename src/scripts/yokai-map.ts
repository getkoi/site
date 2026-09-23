import { afterPaint } from "./after-paint";

let initialized = false;
const boundMaps = new WeakSet<HTMLElement>();

function bindMap(map: HTMLElement) {
  if (boundMaps.has(map)) return;
  boundMaps.add(map);

  const nodes = Array.from(
    map.querySelectorAll<HTMLButtonElement>("[data-map-node]"),
  );
  const details = Array.from(
    map.querySelectorAll<HTMLElement>("[data-map-detail]"),
  );
  const edges = Array.from(
    map.querySelectorAll<SVGPathElement>("[data-map-edge]"),
  );
  if (!nodes.length) return;

  const activate = (id: string, focus = false) => {
    nodes.forEach((node) => {
      const active = node.dataset.mapNode === id;
      node.dataset.active = String(active);
      node.setAttribute("aria-pressed", String(active));
      if (active && focus) node.focus();
    });
    details.forEach((detail) => {
      const active = detail.dataset.mapDetail === id;
      detail.dataset.active = String(active);
      detail.setAttribute("aria-hidden", String(!active));
    });
    edges.forEach((edge) => {
      const connected = edge.dataset.mapEdge?.split(" ").includes(id) ?? false;
      edge.dataset.active = String(connected);
    });
  };

  nodes.forEach((node, index) => {
    node.addEventListener("click", () => activate(node.dataset.mapNode ?? ""));
    node.addEventListener("focus", () => activate(node.dataset.mapNode ?? ""));
    node.addEventListener("keydown", (event) => {
      if (
        !["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"]
          .includes(event.key)
      ) {
        return;
      }
      event.preventDefault();
      let next = index;
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = nodes.length - 1;
      else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = (index + 1) % nodes.length;
      } else {
        next = (index - 1 + nodes.length) % nodes.length;
      }
      activate(nodes[next].dataset.mapNode ?? "", true);
    });
  });

  activate(
    nodes.find((node) => node.dataset.active === "true")?.dataset.mapNode ??
      "prepared",
  );
}

function initMaps() {
  document.querySelectorAll<HTMLElement>("[data-yokai-map]").forEach(bindMap);
}

export function initYokaiMapLifecycle() {
  if (initialized) return;
  initialized = true;
  document.addEventListener("koi:page-ready", () => afterPaint(initMaps));
  afterPaint(initMaps);
}
