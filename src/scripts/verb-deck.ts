type RelationKind = "activates" | "embeds" | "reads";
type Relation = { target: string; kind: RelationKind };

const SVG_NS = "http://www.w3.org/2000/svg";

function parseRelations(value: string | undefined): Relation[] {
  if (!value) return [];
  return value.split(",").flatMap((entry) => {
    const [target, kind] = entry.split(":");
    if (!target || !["activates", "embeds", "reads"].includes(kind)) return [];
    return [{ target, kind: kind as RelationKind }];
  });
}

function snap(value: number): number {
  return Math.round(value / 4) * 4;
}

function pathBetween(source: DOMRect, target: DOMRect, map: DOMRect): string {
  const sourceCenter = {
    x: source.left + source.width / 2 - map.left,
    y: source.top + source.height / 2 - map.top,
  };
  const targetCenter = {
    x: target.left + target.width / 2 - map.left,
    y: target.top + target.height / 2 - map.top,
  };
  const dx = targetCenter.x - sourceCenter.x;
  const dy = targetCenter.y - sourceCenter.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const sx = dx >= 0 ? source.right - map.left : source.left - map.left;
    const tx = dx >= 0 ? target.left - map.left : target.right - map.left;
    const midX = snap(sx + (tx - sx) / 2);
    return `M ${snap(sx)} ${snap(sourceCenter.y)} H ${midX} V ${snap(targetCenter.y)} H ${snap(tx)}`;
  }

  const sy = dy >= 0 ? source.bottom - map.top : source.top - map.top;
  const ty = dy >= 0 ? target.top - map.top : target.bottom - map.top;
  const midY = snap(sy + (ty - sy) / 2);
  return `M ${snap(sourceCenter.x)} ${snap(sy)} V ${midY} H ${snap(targetCenter.x)} V ${snap(ty)}`;
}

function addPath(group: SVGGElement, d: string, kind: RelationKind) {
  const halo = document.createElementNS(SVG_NS, "path");
  halo.setAttribute("class", "relation-path-halo");
  halo.setAttribute("d", d);
  group.append(halo);

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("class", "relation-path");
  path.dataset.kind = kind;
  path.setAttribute("d", d);
  group.append(path);
}

function addNode(group: SVGGElement, x: number, y: number, kind: RelationKind) {
  const node = document.createElementNS(SVG_NS, "rect");
  node.setAttribute("class", "relation-node");
  node.dataset.kind = kind;
  node.setAttribute("x", String(snap(x) - 4));
  node.setAttribute("y", String(snap(y) - 4));
  node.setAttribute("width", "8");
  node.setAttribute("height", "8");
  group.append(node);
}

export function initVerbDeck(): () => void {
  const controller = new AbortController();
  const { signal } = controller;
  const resizeObservers: ResizeObserver[] = [];
  let animationFrame = 0;

  document.querySelectorAll<HTMLElement>("[data-verb-deck]").forEach((deck) => {
    const cards = Array.from(deck.querySelectorAll<HTMLButtonElement>("[data-verb-card]"));
    const details = Array.from(deck.querySelectorAll<HTMLElement>("[data-verb-detail]"));
    const relationMap = deck.querySelector<SVGSVGElement>("[data-relation-map]");
    const relationLines = relationMap?.querySelector<SVGGElement>("[data-relation-lines]");
    const rail = deck.querySelector<HTMLElement>(".deck-families");
    const rulebook = deck.querySelector<HTMLElement>(".rulebook");
    const stage = document.querySelector<HTMLElement>(".site-stage");
    const stageScroller = document.querySelector<HTMLElement>(".site-stage__inner");
    if (!cards.length || cards.length !== details.length) return;

    const cardById = new Map(cards.map((card) => [card.dataset.verbCard, card]));
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let selectedCard: HTMLButtonElement | null = null;

    const drawRelations = () => {
      animationFrame = 0;
      if (rulebook) {
        const top = Math.max(16, rulebook.getBoundingClientRect().top);
        const viewportBottom = stage?.getBoundingClientRect().bottom ?? globalThis.innerHeight;
        const room = Math.max(320, viewportBottom - top - 16);
        rulebook.style.setProperty("--rulebook-room", `${room}px`);
      }

      if (!relationMap || !relationLines || !selectedCard) return;
      relationLines.replaceChildren();

      const relations = parseRelations(selectedCard.dataset.relations);
      const mapRect = relationMap.getBoundingClientRect();
      relationMap.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);
      if (!relations.length || mapRect.width === 0 || mapRect.height === 0) return;

      const sourceRect = selectedCard.getBoundingClientRect();
      relations.forEach((relation) => {
        const target = cardById.get(relation.target);
        if (!target) return;

        const targetRect = target.getBoundingClientRect();
        const d = pathBetween(sourceRect, targetRect, mapRect);
        addPath(relationLines, d, relation.kind);

        const dx = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
        const dy = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);
        const endpoint =
          Math.abs(dx) >= Math.abs(dy)
            ? {
                x: dx >= 0 ? targetRect.left - mapRect.left : targetRect.right - mapRect.left,
                y: targetRect.top + targetRect.height / 2 - mapRect.top,
              }
            : {
                x: targetRect.left + targetRect.width / 2 - mapRect.left,
                y: dy >= 0 ? targetRect.top - mapRect.top : targetRect.bottom - mapRect.top,
              };
        addNode(relationLines, endpoint.x, endpoint.y, relation.kind);
      });
    };

    const scheduleDraw = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(drawRelations);
    };

    const selectCard = (
      card: HTMLButtonElement,
      options: { focus?: boolean; scroll?: boolean } = {},
    ) => {
      const id = card.dataset.verbCard;
      if (!id) return;
      const relations = parseRelations(card.dataset.relations);
      const relatedIds = new Set(relations.map((relation) => relation.target));
      selectedCard = card;

      cards.forEach((candidate) => {
        const selected = candidate === card;
        candidate.dataset.selected = String(selected);
        candidate.setAttribute("aria-pressed", String(selected));
        candidate.tabIndex = selected ? 0 : -1;
        delete candidate.dataset.relatedKind;
        delete candidate.dataset.dimmed;

        const candidateId = candidate.dataset.verbCard;
        if (relations.length && !selected && (!candidateId || !relatedIds.has(candidateId))) {
          candidate.dataset.dimmed = "true";
        }
      });

      details.forEach((detail) => {
        detail.hidden = detail.dataset.verbDetail !== id;
      });

      relations.forEach((relation) => {
        const target = cardById.get(relation.target);
        if (target) target.dataset.relatedKind = relation.kind;
      });

      scheduleDraw();
      if (options.focus) card.focus();
      if (options.scroll) {
        card.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    };

    cards.forEach((card, index) => {
      card.addEventListener("click", () => selectCard(card), { signal });
      card.addEventListener(
        "keydown",
        (event) => {
          let nextIndex: number | null = null;
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % cards.length;
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + cards.length) % cards.length;
          } else if (event.key === "Home") {
            nextIndex = 0;
          } else if (event.key === "End") {
            nextIndex = cards.length - 1;
          }

          if (nextIndex === null) return;
          event.preventDefault();
          selectCard(cards[nextIndex], { focus: true, scroll: true });
        },
        { signal },
      );
    });

    deck.querySelectorAll<HTMLButtonElement>("[data-deck-link]").forEach((link) => {
      link.addEventListener(
        "click",
        () => {
          const target = cardById.get(link.dataset.deckLink);
          if (target) selectCard(target, { focus: true, scroll: true });
        },
        { signal },
      );
    });

    globalThis.addEventListener("resize", scheduleDraw, { signal });
    globalThis.addEventListener("scroll", scheduleDraw, { signal, passive: true });
    stageScroller?.addEventListener("scroll", scheduleDraw, { signal, passive: true });
    rail?.addEventListener("scroll", scheduleDraw, { signal, passive: true });
    if ("ResizeObserver" in window && relationMap) {
      const resizeObserver = new ResizeObserver(scheduleDraw);
      resizeObserver.observe(relationMap);
      resizeObservers.push(resizeObserver);
    }

    const initial =
      cards.find((card) => card.dataset.selected === "true") ??
      cardById.get(details.find((detail) => !detail.hidden)?.dataset.verbDetail) ??
      cards[0];
    if (initial) selectCard(initial);
    deck.dataset.ready = "true";
  });

  return () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    resizeObservers.forEach((observer) => observer.disconnect());
    controller.abort();
  };
}
