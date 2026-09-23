import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "bun:test";
import {
  Code,
  Heading,
  Kbd,
  List,
  ListItem,
  Summary,
  Table,
  Text,
} from "./html";

test("Heading uses the matching h* tag", () => {
  const html = renderToStaticMarkup(createElement(Heading, { level: 2 }, "Next"));
  if (html !== "<h2>Next</h2>") throw new Error(html);
});

test("Text defaults to p and List can render ol", () => {
  const p = renderToStaticMarkup(createElement(Text, null, "body"));
  const ol = renderToStaticMarkup(
    createElement(List, { as: "ol" }, createElement(ListItem, null, "one")),
  );
  if (p !== "<p>body</p>") throw new Error(p);
  if (ol !== "<ol><li>one</li></ol>") throw new Error(ol);
});

test("Summary and table keep HTML names", () => {
  const summary = renderToStaticMarkup(createElement(Summary, null, "More"));
  const table = renderToStaticMarkup(createElement(Table, null, "rows"));
  if (summary !== "<summary>More</summary>") throw new Error(summary);
  if (!table.startsWith("<table") || !table.includes("data-slot=\"table\"")) {
    throw new Error(table);
  }
});

test("Code is a native code element", () => {
  const html = renderToStaticMarkup(createElement(Code, null, "koi"));
  if (html !== "<code>koi</code>") throw new Error(html);
});

test("Kbd is a native kbd element", () => {
  const html = renderToStaticMarkup(createElement(Kbd, null, "/"));
  if (html !== '<kbd data-slot="kbd">/</kbd>') throw new Error(html);
});
