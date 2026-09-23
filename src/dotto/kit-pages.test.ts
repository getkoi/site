import { test } from "bun:test";
import { DOTTO_KIT_PAGES, getDottoKitPage } from "./kit-pages";
import { dottoEntries } from "./nav";

const KIT_BARREL = [
  "button",
  "link",
  "card",
  "clickable-card",
  "selectable-card",
  "collapsible",
  "heading",
  "text",
  "blockquote",
  "citation",
  "code",
  "code-block",
  "kbd",
  "timestamp",
  "figure",
  "text-input",
  "text-area",
  "label",
  "badge",
  "divider",
  "landmarks",
  "dialog",
  "list",
  "table",
  "details",
  "description-list",
];

test("every catalog entry has description and usage", () => {
  const ids = dottoEntries().map((entry) => entry.id);
  for (const id of ids) {
    const page = getDottoKitPage(id);
    if (!page) throw new Error(`missing copy: ${id}`);
    if (page.description.trim().length < 40) throw new Error(`short description: ${id}`);
    if (!page.description.includes("\n\n")) throw new Error(`need job + not-this: ${id}`);
    if (page.usage.trim().length < 12) throw new Error(`short usage: ${id}`);
  }
  const extra = Object.keys(DOTTO_KIT_PAGES).filter((id) => !ids.includes(id));
  if (extra.length) throw new Error(`extra copy: ${extra.join(",")}`);
});

test("kit barrel pages import @/dotto/components", () => {
  for (const id of KIT_BARREL) {
    const page = getDottoKitPage(id);
    if (!page?.usage.includes("@/dotto/components")) {
      throw new Error(id);
    }
  }
});
