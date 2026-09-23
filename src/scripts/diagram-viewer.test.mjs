import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

const source = stripTypeScriptTypes(readFileSync(new URL("./diagram-viewer.ts", import.meta.url), "utf8")
  .replaceAll("export function", "function"));

function setup() {
  class Element {
    children = [];
    style = {};
    events = new Map();
    clientWidth = 500;
    clientHeight = 300;
    scrollLeft = 0;
    scrollTop = 0;
    classList = { add() {}, remove() {} };
    constructor(tag = "div") { this.tag = tag; }
    append(...items) {
      for (const item of items) { item.remove(); item.parent = this; this.children.push(item); }
    }
    remove() {
      if (this.parent) this.parent.children = this.parent.children.filter(c => c !== this);
      this.parent = undefined;
    }
    setAttribute(name, value) { this[name] = value; }
    addEventListener(name, callback) { this.events.set(name, callback); }
    emit(name, event = {}) { this.events.get(name)?.(event); }
    querySelector(selector) { return selector === "svg" ? svg : null; }
    focus() { this.focused = true; }
    showModal() { this.open = true; }
    close() { this.open = false; this.emit("close"); }
    scrollBy(x, y) { this.scrollLeft += x; this.scrollTop += y; }
    setPointerCapture() {}
  }
  const svg = new Element("svg");
  svg.viewBox = { baseVal: { width: 1000, height: 600 } };
  const body = new Element("body");
  const frame = new Element("figure");
  const diagram = new Element();
  frame.append(diagram);
  let disconnected = false;
  const context = {
    document: { body, createElement: tag => new Element(tag) },
    ResizeObserver: class { observe() {} disconnect() { disconnected = true; } },
  };
  runInNewContext(`${source}\nglobalThis.install = installDiagramViewer; globalThis.dispose = disposeDiagramViewers;`, context);
  context.install(frame, diagram);
  const shell = frame.children.find(c => c.className === "diagram-viewer");
  const toolbar = shell.children[0];
  const viewport = shell.children[1];
  const button = label => toolbar.children.find(c => c.textContent === label);
  return { context, body, frame, diagram, shell, viewport, button, svg, disconnected: () => disconnected };
}

test("fit, zoom, actual size and keyboard panning control SVG dimensions", () => {
  const h = setup();
  assert.equal(h.svg.style.width, "500px");
  h.button("+").emit("click");
  assert.equal(h.svg.style.width, "625px");
  h.button("100%").emit("click");
  assert.equal(h.svg.style.width, "1000px");
  const before = h.viewport.scrollLeft;
  h.viewport.emit("keydown", { key: "ArrowRight", preventDefault() {} });
  assert.equal(h.viewport.scrollLeft, before + 80);
  h.viewport.emit("keydown", { key: "0", preventDefault() {} });
  assert.equal(h.svg.style.width, "500px");
  assert.equal(h.viewport.scrollLeft, 0);
});

test("enlarge moves one diagram into a modal and closing restores focus", () => {
  const h = setup();
  const enlarge = h.button("Enlarge");
  enlarge.emit("click");
  const dialog = h.body.children[0];
  assert.equal(dialog.open, true);
  assert.equal(h.shell.parent, dialog);
  assert.equal(h.diagram.parent, h.viewport);
  dialog.close(); // Native Escape uses this same close event.
  assert.equal(h.shell.parent, h.frame);
  assert.equal(h.body.children.length, 0);
  assert.equal(enlarge.textContent, "Enlarge");
  assert.equal(enlarge.focused, true);
});

test("page disposal removes open modal and disconnects resize observation", () => {
  const h = setup();
  h.button("Enlarge").emit("click");
  h.context.dispose();
  assert.equal(h.body.children.length, 0);
  assert.equal(h.disconnected(), true);
});
