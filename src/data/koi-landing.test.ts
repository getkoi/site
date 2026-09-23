import { test } from "bun:test";
import {
  KOI_CAMPAIGN_PHASES,
  KOI_CAMPAIGN_STATES,
  KOI_CONTRACT_FACTS,
} from "./koi-landing";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

test("campaign has four independently measured phases", () => {
  assert(KOI_CAMPAIGN_PHASES.length === 4, "campaign must contain four phases");
  assert(
    KOI_CAMPAIGN_PHASES.every((phase) => phase.sensor.endsWith(".sh")),
    "every phase must name an executable sensor",
  );
  assert(
    KOI_CAMPAIGN_PHASES.at(-1)?.gated === true,
    "the traffic cutover must be gated",
  );
});

test("campaign demonstrates context disposal and measured correction", () => {
  const reset = KOI_CAMPAIGN_STATES.find((state) => state.id === "reset");
  const rejected = KOI_CAMPAIGN_STATES.find((state) => state.id === "rejected");
  const proven = KOI_CAMPAIGN_STATES.at(-1);

  assert(
    reset?.window.includes("fresh"),
    "the reset state must open a fresh window",
  );
  assert(
    rejected?.gate.startsWith("RED"),
    "the agent claim must fail a sensor",
  );
  assert(rejected?.feedback, "the failed sensor must leave durable feedback");
  assert(
    proven?.gate.startsWith("GREEN"),
    "the final state must have a green gate",
  );
  assert(proven?.assembled, "the final state must assemble the whole system");
});

test("final contract exposes all four completion facts", () => {
  assert(KOI_CONTRACT_FACTS.length === 4, "contract must expose four facts");
  assert(
    KOI_CONTRACT_FACTS.some((fact) => fact.includes("clean")),
    "contract must include a clean tree",
  );
});
