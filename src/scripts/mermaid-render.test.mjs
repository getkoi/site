import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

// Exercise the actual lifecycle with a small DOM/API double; no browser globals
// or sanitization are bypassed in the production renderer.
const source = stripTypeScriptTypes(
  readFileSync(new URL("./mermaid-render.ts", import.meta.url), "utf8")
    .replace(/^import .*;\n/gm, "")
    .replace('await import("mermaid")', "await Promise.resolve({ default: mermaidMock })")
    .replace("export function", "function"),
);

class Element {
  dataset = {};
  children = [];
  textContent = "";
  innerHTML = "";
  constructor(source) { this.source = source; }
  querySelector(selector) {
    if (selector === "[data-mermaid-source]") return { textContent: this.source };
    if (selector === "svg") return this.innerHTML.includes("<svg") ? {} : null;
    return null;
  }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this[name] = value; }
}

function harness(render) {
  const frames = [new Element("sequenceDiagram\nA->>B: Hello"), new Element("flowchart LR\nA-->B")];
  const events = new Map();
  const raf = new Map();
  let next = 0;
  const context = {
    document: {
      documentElement: { dataset: { theme: "yoru" } },
      querySelectorAll: () => frames,
      createElement: () => new Element(),
      addEventListener: (name, callback) => events.set(name, callback),
    },
    requestAnimationFrame: callback => { raf.set(++next, callback); return next; },
    cancelAnimationFrame: id => raf.delete(id),
    getComputedStyle: () => ({ getPropertyValue: () => "monospace" }),
    isHour: () => true,
    mermaidThemeVariables: () => ({}),
    mermaidMock: { initialize() {}, render },
    installDiagramViewer() {},
    disposeDiagramViewer() {},
    disposeDiagramViewers() {},
  };
  runInNewContext(`${source}\nglobalThis.boot = initMermaidLifecycle;`, context);
  context.boot();
  return {
    frames,
    fire: name => events.get(name)(),
    async flush() {
      for (const [id, callback] of raf) { raf.delete(id); callback(); }
      await new Promise(resolve => setImmediate(resolve));
    },
  };
}

test("multiple diagrams and theme redraws use unique SVG IDs and retain source", async () => {
  const calls = [];
  const h = harness(async (id, text) => {
    calls.push({ id, text });
    return { svg: `<svg id="${id}"></svg>` };
  });
  await h.flush();
  assert.deepEqual(h.frames.map(f => f.dataset.mermaidState), ["ready", "ready"]);
  assert.equal(h.frames[0].dataset.mermaidKind, "sequence");
  h.fire("koi:theme-change");
  await h.flush();
  assert.equal(new Set(calls.map(c => c.id)).size, 4);
  assert.equal(calls[0].text, calls[2].text);
  assert.ok(h.frames.every(f => f.children[0].innerHTML.includes("<svg")));
});

test("a rejected or empty render shows source instead of an empty ready frame", async () => {
  let calls = 0;
  const h = harness(async () => {
    if (++calls === 1) throw new Error("Invalid diagram");
    return { svg: "" };
  });
  await h.flush();
  for (const frame of h.frames) {
    assert.equal(frame.dataset.mermaidState, "error");
    assert.match(frame.children[0].textContent, /could not be rendered/);
    assert.equal(frame.children[1].textContent, frame.source);
  }
});

test("theme changes serialize rendering and discard stale results", async () => {
  let release;
  let active = 0;
  let calls = 0;
  const h = harness(async id => {
    assert.equal(active++, 0, "Mermaid render calls must not overlap");
    if (++calls === 1) await new Promise(resolve => { release = resolve; });
    active--;
    return { svg: `<svg id="${id}"></svg>` };
  });
  await h.flush();
  h.fire("koi:theme-change");
  await h.flush();
  assert.equal(calls, 1);
  release();
  await h.flush();
  assert.equal(calls, 3);
  assert.ok(h.frames.every(f => f.dataset.mermaidState === "ready"));
});
