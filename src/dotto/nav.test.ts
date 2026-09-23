import { test } from "bun:test";
import {
  DOTTO_SECTIONS,
  currentFromDottoPath,
  dottoEntries,
  dottoHref,
  getDottoEntry,
  searchDottoKit,
} from "./nav";

test("every entry id is unique and hrefs are /dotto/<id>", () => {
  const ids = dottoEntries().map((entry) => entry.id);
  if (new Set(ids).size !== ids.length) throw new Error("duplicate ids");
  for (const id of ids) {
    if (dottoHref(id) !== `/dotto/${id}`) throw new Error(id);
    if (!getDottoEntry(id)) throw new Error(`missing ${id}`);
  }
});

test("Astryx catalog groups are present after Foundations", () => {
  const ids = DOTTO_SECTIONS.map((section) => section.id);
  const expected = [
    "foundations",
    "action",
    "container",
    "content",
    "data-input",
    "feedback",
    "layout",
    "navigation",
    "overlay",
    "table-list",
    "presentational",
  ];
  if (ids.join() !== expected.join()) throw new Error(ids.join(","));
});

test("currentFromDottoPath reads overview and entry slugs", () => {
  if (currentFromDottoPath("/dotto") !== "home") throw new Error("home");
  if (currentFromDottoPath("/dotto/button") !== "button") throw new Error("button");
});

test("searchDottoKit matches title, group, and lede", () => {
  const buttons = searchDottoKit("Button");
  if (!buttons.some((hit) => hit.id === "button" && hit.href === "/dotto/button")) {
    throw new Error("button");
  }
  const overlay = searchDottoKit("overlay dialog");
  if (!overlay.some((hit) => hit.id === "dialog")) throw new Error("dialog");
  if (searchDottoKit("   ").length !== 0) throw new Error("blank");
});
