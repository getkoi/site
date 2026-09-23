import { test } from "bun:test";
import {
  JUNJI_TUTORIAL_STATE_BY_ID,
  JUNJI_TUTORIAL_STATES,
  tutorialStateById,
  type TutorialStateId,
} from "./junji-tutorial";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

test("every tutorial choice points to a known state", () => {
  for (const state of JUNJI_TUTORIAL_STATES) {
    for (const choice of state.choices) {
      if (choice.valid) {
        assert(choice.next, `${state.id}:${choice.id} is valid but has no next state`);
        assert(
          JUNJI_TUTORIAL_STATE_BY_ID.has(choice.next),
          `${state.id}:${choice.id} points to unknown state ${choice.next}`,
        );
      } else {
        assert(!choice.next, `${state.id}:${choice.id} is invalid but advances the tutorial`);
      }
    }
  }
});

test("the main sample hand reaches a closed run", () => {
  const choices = [
    "empty-begin",
    "oriented-plan",
    "planned-refine",
    "sequenced-next",
    "gate-fix",
    "phase-one-next",
    "phase-two-next",
    "all-done-consolidate",
  ];

  let stateId: TutorialStateId = "empty";
  for (const choiceId of choices) {
    const state = tutorialStateById(stateId);
    const choice = state.choices.find((candidate) => candidate.id === choiceId);
    assert(choice?.valid && choice.next, `${choiceId} is not valid from ${stateId}`);
    stateId = choice.next;
  }

  const closed = tutorialStateById(stateId);
  assert(closed.id === "closed", `expected closed, received ${closed.id}`);
  assert(!closed.table.runExists, "consolidate must remove the working folder");
  assert(closed.table.commits === 3, "the sample should leave three phase commits");
});

test("brief is pointer-neutral and optional", () => {
  const before = tutorialStateById("phase-one");
  const brief = before.choices.find((choice) => choice.card === "brief");
  assert(brief?.next === "phase-one-briefed", "brief should open its side-card state");

  const after = tutorialStateById("phase-one-briefed");
  assert(after.table.nextAction === before.table.nextAction, "brief moved Next action");
  assert(after.table.commits === before.table.commits, "brief created a commit");
  assert(
    JSON.stringify(after.table.phases) === JSON.stringify(before.table.phases),
    "brief changed the phase list",
  );
});

test("every active state has a legal move", () => {
  for (const state of JUNJI_TUTORIAL_STATES) {
    if (state.id === "closed") continue;
    assert(
      state.choices.some((choice) => choice.valid),
      `${state.id} has no legal move`,
    );
  }
});
