import { test, expect } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { loadDocs } from "../lib/content";
import { DOC_SECTIONS, DOC_TOOLS, docHref, docNeighbors, docTool } from "./registry";

const docs = loadDocs();

test("each documentation page has one tool-owned URL", () => {
  const urls = docs.map((entry) => docHref(entry.id));
  expect(new Set(urls).size).toBe(urls.length);
  for (const entry of docs) {
    expect(DOC_TOOLS).toContain(docTool(entry.id));
    expect(docHref(entry.id)).toStartWith(`/${docTool(entry.id)}/docs`);
    const { previous, next } = docNeighbors(docs, entry);
    for (const neighbor of [previous, next]) {
      if (neighbor) expect(docTool(neighbor.id)).toBe(docTool(entry.id));
    }
  }
  expect(urls).toContain("/koi/docs");
  expect(urls).toContain("/junji/docs");
  expect(urls).toContain("/yokai/docs");
  expect(urls).toContain("/yokai/docs/sensors");
  expect(urls).toContain("/yokai/docs/sandbox");
});

test("documentation and blog prose link to existing tool-owned pages", () => {
  const routes = new Set(docs.map((entry) => docHref(entry.id)));
  routes.add("/yokai/recipes");
  const contentRoot = path.join(process.cwd(), "src/content");
  const files = [...docs.map((entry) => path.join(contentRoot, "docs", `${entry.id}.mdx`))];
  files.push(...fs.readdirSync(path.join(contentRoot, "blog")).filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(contentRoot, "blog", file)));
  for (const file of files) {
    const body = fs.readFileSync(file, "utf8");
    for (const [, href] of body.matchAll(/\]\((\/(?:koi|junji|yokai)\/(?:docs|recipes)[^)]*)\)/g)) {
      expect(routes.has(href.split(/[?#]/)[0])).toBe(true);
    }
    expect(body).not.toMatch(/\]\(\/(?:docs|recipes)(?:[\/#)]|$)/);
  }
});

test("junji has a single reading sequence without reference pages", () => {
  const junji = docs.filter((entry) => docTool(entry.id) === "junji");
  expect(junji.map((entry) => entry.id).sort()).toEqual([
    "junji/guide", "junji/index", "junji/skills",
  ]);
  expect(DOC_SECTIONS.junji.map((section) => section.id)).toEqual(["overview", "guide"]);
  expect(docNeighbors(docs, junji.find((entry) => entry.id === "junji/index")!).next?.id).toBe("junji/guide");
  expect(docNeighbors(docs, junji.find((entry) => entry.id === "junji/guide")!).next?.id).toBe("junji/skills");
});
