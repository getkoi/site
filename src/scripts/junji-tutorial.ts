/// <reference lib="dom" />

import { junjiCardById } from "../data/junji-cards";
import {
  JUNJI_TUTORIAL_STATES,
  tutorialStateById,
  type TutorialChoice,
  type TutorialState,
  type TutorialStateId,
} from "../data/junji-tutorial";

const spineOrder = ["begin", "plan", "refine", "next", "consolidate"] as const;

const activeSpineByState: Record<TutorialStateId, (typeof spineOrder)[number]> = {
  empty: "begin",
  oriented: "plan",
  planned: "refine",
  sequenced: "next",
  "gate-red": "next",
  "phase-one": "next",
  "phase-one-briefed": "next",
  "phase-two": "next",
  "all-done": "consolidate",
  closed: "consolidate",
};

function requiredElement<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Junji tutorial is missing ${selector}`);
  return element;
}

function setText(root: ParentNode, selector: string, value: string) {
  requiredElement<HTMLElement>(root, selector).textContent = value;
}

function cardImage(cardId: string, className?: string): HTMLImageElement {
  const image = document.createElement("img");
  image.src = `/junji-cards/junji-${cardId}.webp`;
  image.alt = "";
  image.width = 768;
  image.height = 512;
  image.loading = "lazy";
  image.decoding = "async";
  if (className) image.className = className;
  return image;
}

function choiceButton(choice: TutorialChoice): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "tutorial-choice";
  button.dataset.tutorialChoice = choice.id;

  if (choice.card) {
    const art = document.createElement("span");
    art.className = "tutorial-choice__art";
    art.append(cardImage(choice.card));
    button.append(art);
  } else {
    const move = document.createElement("span");
    move.className = "tutorial-choice__move";
    move.ariaHidden = "true";
    move.textContent = "◆";
    button.append(move);
  }

  const kind = document.createElement("span");
  kind.className = "tutorial-choice__kind mono";
  kind.textContent = choice.kind === "verb" ? "verb card" : "inside this turn";

  const label = document.createElement("strong");
  label.className = "mono";
  label.textContent = choice.label;

  const hint = document.createElement("span");
  hint.textContent = choice.hint;

  button.append(kind, label, hint);
  return button;
}

function renderChoices(root: HTMLElement, state: TutorialState) {
  const hand = requiredElement<HTMLElement>(root, "[data-tutorial-hand]");
  hand.replaceChildren(...state.choices.map(choiceButton));
  hand.hidden = state.choices.length === 0;
}

function renderFiles(root: HTMLElement, state: TutorialState) {
  const rack = requiredElement<HTMLElement>(root, "[data-tutorial-files]");
  const files = state.table.files.map((file) => {
    const chip = document.createElement("span");
    chip.className = "file-chip";
    chip.textContent = file;
    return chip;
  });
  rack.replaceChildren(...files);

  const runLabel =
    state.id === "closed"
      ? "Working folder removed"
      : state.table.runExists
        ? "Working folder on disk"
        : "No working folder yet";
  setText(root, "[data-tutorial-run-label]", runLabel);
}

function renderPhases(root: HTMLElement, state: TutorialState) {
  const list = requiredElement<HTMLOListElement>(root, "[data-tutorial-phases]");
  if (!state.table.phases.length) {
    const empty = document.createElement("li");
    empty.className = "phase-board__empty";
    empty.textContent = "No phases have been dealt.";
    list.replaceChildren(empty);
    return;
  }

  const items = state.table.phases.map((phase, index) => {
    const item = document.createElement("li");
    item.className = "tutorial-phase";
    item.dataset.status = phase.status;

    const number = document.createElement("span");
    number.className = "tutorial-phase__n";
    number.textContent = String(index + 1).padStart(2, "0");

    const label = document.createElement("span");
    label.textContent = phase.label;

    const status = document.createElement("span");
    status.className = "tutorial-phase__status";
    status.textContent = `[${phase.status}]`;

    item.append(number, label, status);
    return item;
  });
  list.replaceChildren(...items);
}

function renderTriggers(root: HTMLElement, state: TutorialState) {
  const stack = requiredElement<HTMLElement>(root, "[data-tutorial-triggers]");
  const list = requiredElement<HTMLElement>(root, "[data-tutorial-trigger-list]");
  stack.hidden = state.triggered.length === 0;

  const chips = state.triggered.map((trigger) => {
    const chip = document.createElement("span");
    chip.className = "trigger-chip";
    chip.dataset.relation = trigger.relation;
    chip.append(cardImage(trigger.card));

    const copy = document.createElement("span");
    const card = junjiCardById(trigger.card);
    const name = document.createElement("strong");
    name.textContent = `${trigger.relation} · ${card.title}`;
    const note = document.createElement("span");
    note.textContent = trigger.note;
    copy.append(name, note);
    chip.append(copy);
    return chip;
  });

  list.replaceChildren(...chips);
}

function renderSpine(root: HTMLElement, state: TutorialState) {
  const active = activeSpineByState[state.id];
  const activeIndex = spineOrder.indexOf(active);

  root.querySelectorAll<HTMLElement>("[data-spine-card]").forEach((item) => {
    const id = item.dataset.spineCard as (typeof spineOrder)[number];
    const index = spineOrder.indexOf(id);
    const status =
      state.id === "closed" || index < activeIndex
        ? "done"
        : index === activeIndex
          ? "current"
          : "pending";
    item.dataset.state = status;
    if (status === "current" && state.id !== "closed") {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function renderState(
  root: HTMLElement,
  state: TutorialState,
  feedback?: { kind: "accepted" | "rejected"; text: string },
) {
  root.dataset.tutorialState = state.id;
  setText(root, "[data-tutorial-chapter]", state.chapter);
  setText(root, "[data-tutorial-title]", state.title);
  setText(root, "[data-tutorial-prompt]", state.prompt);
  setText(root, "[data-tutorial-result]", state.result);
  setText(root, "[data-tutorial-rule]", state.rule);
  setText(
    root,
    "[data-tutorial-position]",
    `position ${String(JUNJI_TUTORIAL_STATES.indexOf(state) + 1).padStart(2, "0")}/${String(JUNJI_TUTORIAL_STATES.length).padStart(2, "0")}`,
  );
  setText(root, "[data-tutorial-next]", state.table.nextAction ?? "not set");
  setText(root, "[data-tutorial-gate-label]", state.table.gateNote);
  setText(root, "[data-tutorial-commits]", String(state.table.commits));

  const gate = requiredElement<HTMLElement>(root, "[data-tutorial-gate]");
  gate.dataset.gate = state.table.gate;

  const feedbackBox = requiredElement<HTMLElement>(root, ".turn-feedback");
  const feedbackMark = requiredElement<HTMLElement>(root, ".turn-feedback__mark");
  if (feedback) {
    feedbackBox.dataset.kind = feedback.kind;
    feedbackMark.textContent = feedback.kind === "accepted" ? "✓" : "!";
    setText(root, "[data-tutorial-feedback]", feedback.text);
  } else {
    feedbackBox.dataset.kind = "neutral";
    feedbackMark.textContent = "?";
    setText(
      root,
      "[data-tutorial-feedback]",
      "Choose a card. Invalid choices explain what the table still needs.",
    );
  }

  renderChoices(root, state);
  renderFiles(root, state);
  renderPhases(root, state);
  renderTriggers(root, state);
  renderSpine(root, state);

  const start = requiredElement<HTMLElement>(root, "[data-tutorial-start]");
  start.hidden = state.id !== "closed";
}

export function initJunjiTutorial(): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  document.querySelectorAll<HTMLElement>("[data-junji-tutorial]").forEach((root) => {
    let state = tutorialStateById("empty");
    renderState(root, state);
    root.dataset.ready = "true";

    root.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        if (target.closest("[data-tutorial-reset]")) {
          state = tutorialStateById("empty");
          renderState(root, state);
          requiredElement<HTMLElement>(root, "[data-tutorial-title]").focus({
            preventScroll: true,
          });
          return;
        }

        const button = target.closest<HTMLButtonElement>("[data-tutorial-choice]");
        if (!button) return;
        const choice = state.choices.find(
          (candidate) => candidate.id === button.dataset.tutorialChoice,
        );
        if (!choice) return;

        root
          .querySelectorAll<HTMLElement>("[data-tutorial-choice]")
          .forEach((candidate) => delete candidate.dataset.rejected);

        if (!choice.valid || !choice.next) {
          button.dataset.rejected = "true";
          const feedbackBox = requiredElement<HTMLElement>(root, ".turn-feedback");
          feedbackBox.dataset.kind = "rejected";
          requiredElement<HTMLElement>(root, ".turn-feedback__mark").textContent = "!";
          setText(root, "[data-tutorial-feedback]", choice.feedback);
          return;
        }

        state = tutorialStateById(choice.next);
        renderState(root, state, { kind: "accepted", text: choice.feedback });
        requiredElement<HTMLElement>(root, "[data-tutorial-title]").focus({
          preventScroll: true,
        });
      },
      { signal },
    );
  });

  return () => controller.abort();
}
