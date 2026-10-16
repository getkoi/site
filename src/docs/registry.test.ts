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


test("Jira setup is an agent conversation with retained runtime safeguards", () => {
  for (const id of ["junji/guide", "junji/index", "junji/skills", "yokai/visibility", "yokai/preparation", "yokai/cli"]) {
    const entry = docs.find((entry) => entry.id === id);
    expect(entry).toBeDefined();
    expect(entry!.body).toContain("/junji connect");
  }
  const visibility = docs.find((entry) => entry.id === "yokai/visibility")!.body.replace(/\s+/g, " ");
  for (const term of [
    "dedicated host connection agent", "MCP", "ACP", "exact configuration and scope",
    "Existing remote issues and bindings are preserved", "actual discovery evidence",
    "Setup saved", "publication verified", "live publication was checked",
    "Coding phase agents never call Jira tools", "supervisor owns verified state",
    "matching local verification proof", "reconciled before retrying",
    "host OS store", "coding sandbox", ".koi/adapters/jira.json", ".koi/visibility/",
    "`prepare`, `review` and `sync` remain compatible", "Advanced authentication support",
  ]) {
    expect(visibility).toContain(term);
  }
  const guide = docs.find((entry) => entry.id === "junji/guide")!.body.replace(/\s+/g, " ");
  expect(guide).toContain("## `connect`");
  expect(guide).toContain("Next action, accepted scope and execution gates are unchanged");
  expect(guide).toContain("standalone `next` records local proof");
  expect(guide).toContain("supervisor owns proof and sync");
});

test("public setup examples do not turn internal visibility tooling into the engineer workflow", () => {
  for (const entry of docs) {
    for (const [, command] of entry.body.matchAll(/```(?:bash|sh|shell)\n([\s\S]*?)```/g)) {
      expect(command).not.toMatch(/(?:junji-board|yokai) visibility (?:setup|prepare|review|sync)\b/);
    }
    expect(entry.body).not.toMatch(/\bten verbs\b/i);
  }
  const visibility = docs.find((entry) => entry.id === "yokai/visibility")!.body;
  expect(visibility).toContain("visibility login --auth-method api-token");
  expect(visibility).toContain("visibility login --auth-method oauth");
  const preparation = docs.find((entry) => entry.id === "yokai/preparation")!.body;
  expect(preparation).not.toContain("Jira setup and Sync Jira");
});
