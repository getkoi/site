import { test } from "bun:test";
import {
  YOKAI_CONTRACT,
  YOKAI_MAP_EDGES,
  YOKAI_MAP_NODES,
  YOKAI_RUN_STATES,
} from "./yokai-landing";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

test("system map edges reference real nodes", () => {
  const ids = new Set(YOKAI_MAP_NODES.map((node) => node.id));

  for (const edge of YOKAI_MAP_EDGES) {
    assert(ids.has(edge.from), `unknown edge source: ${edge.from}`);
    assert(ids.has(edge.to), `unknown edge target: ${edge.to}`);
  }
});

test("guided run tells one ordered phase story", () => {
  assert(YOKAI_RUN_STATES.length === 6, "guided run must have six chapters");
  assert(
    YOKAI_RUN_STATES[0].id === "select",
    "run must begin with phase selection",
  );
  assert(
    YOKAI_RUN_STATES.at(-1)?.id === "contract",
    "run must end at the contract",
  );

  const rail = YOKAI_RUN_STATES.map((state) => state.rail);
  assert(rail.includes("plan"), "run must teach Plan");
  assert(rail.includes("build"), "run must teach Build");
  assert(rail.includes("seal"), "run must teach Seal");
  assert(rail.includes("gate"), "run must finish at the gate");

  const failed = YOKAI_RUN_STATES.find((state) => state.id === "build-red");
  const corrected = YOKAI_RUN_STATES.find((state) =>
    state.id === "build-green"
  );
  assert(failed?.feedback, "failed Build must leave durable feedback");
  assert(
    corrected?.gate.startsWith("GREEN"),
    "fresh Build turn must correct the failure",
  );
});

test("the completion contract exposes all four facts", () => {
  assert(YOKAI_CONTRACT.length === 4, "completion requires exactly four facts");
  assert(
    YOKAI_CONTRACT.some((fact) => fact.id === "tree"),
    "completion contract must include a clean tree",
  );
});
