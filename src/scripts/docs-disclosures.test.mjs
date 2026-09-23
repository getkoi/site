import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

const source = stripTypeScriptTypes(
  readFileSync(new URL("./docs-disclosures.ts", import.meta.url), "utf8"),
).replace("export function", "function");

function harness() {
  class Details {
    open = false;
    constructor(parentElement = null) { this.parentElement = parentElement; }
  }
  const outer = new Details();
  const inner = new Details(outer);
  const target = { parentElement: inner };
  const context = {
    HTMLDetailsElement: Details,
    document: { getElementById: id => id === "optional detail" ? target : null },
  };
  runInNewContext(source, context);
  return { ...context, target, inner, outer };
}

test("an encoded anchor opens every enclosing disclosure", () => {
  const h = harness();
  assert.equal(h.revealDisclosureTarget("#optional%20detail"), h.target);
  assert.equal(h.inner.open, true);
  assert.equal(h.outer.open, true);
});

test("empty, missing and malformed anchors leave disclosures closed", () => {
  const h = harness();
  for (const hash of ["", "#", "#missing", "#%E0%A4%A"]) {
    assert.equal(h.revealDisclosureTarget(hash), null);
  }
  assert.equal(h.inner.open, false);
  assert.equal(h.outer.open, false);
});
