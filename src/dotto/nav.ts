/** Dotto kit docs IA — Astryx catalog groups plus Foundations / Presentational. */

export type DottoSectionId =
  | "foundations"
  | "action"
  | "container"
  | "content"
  | "data-input"
  | "feedback"
  | "layout"
  | "navigation"
  | "overlay"
  | "table-list"
  | "presentational";

export type DottoEntry = {
  id: string;
  navLabel: string;
  title: string;
  lede: string;
};

export type DottoSection = {
  id: DottoSectionId;
  label: string;
  entries: DottoEntry[];
};

export const DOTTO_SECTIONS: readonly DottoSection[] = [
  {
    id: "foundations",
    label: "Foundations",
    entries: [
      {
        id: "hours",
        navLabel: "Hours",
        title: "Hours",
        lede: "yoru and hiru remap the same token names. Toggle them in the rail.",
      },
      {
        id: "color",
        navLabel: "Color",
        title: "Color",
        lede: "Bone or fog on void. Ash is never copy. Jade and amber are status.",
      },
      {
        id: "layout",
        navLabel: "Layout",
        title: "Layout",
        lede: "4px base, one centered column, icon rail on the left.",
      },
      {
        id: "typography",
        navLabel: "Typography",
        title: "Typography",
        lede: "Geist Pixel Square display, Geist body, Geist Mono labels.",
      },
      {
        id: "elevation",
        navLabel: "Elevation",
        title: "Elevation",
        lede: "Stack by tone. No soft gray drop-shadow.",
      },
      {
        id: "motion",
        navLabel: "Motion",
        title: "Motion",
        lede: "Short feedback, longer scenes, killed by prefers-reduced-motion.",
      },
      {
        id: "iconography",
        navLabel: "Iconography",
        title: "Iconography",
        lede: "Filled pixel rects on a 16px box. Name by job.",
      },
    ],
  },
  {
    id: "action",
    label: "Action",
    entries: [
      {
        id: "button",
        navLabel: "Button",
        title: "Button",
        lede: "Astryx Button in the dotto theme, including notch.",
      },
      {
        id: "icon-button",
        navLabel: "Icon Button",
        title: "Icon Button",
        lede: "Compact action. Used in chrome; not a kit export yet.",
      },
      {
        id: "link",
        navLabel: "Link",
        title: "Link",
        lede: "AppLink, Next-aware. Astryx Link stays on chrome via LinkProvider.",
      },
    ],
  },
  {
    id: "container",
    label: "Container",
    entries: [
      {
        id: "card",
        navLabel: "Card",
        title: "Card",
        lede: "Static surface. Tokens remap with the hour.",
      },
      {
        id: "clickable-card",
        navLabel: "Clickable Card",
        title: "Clickable Card",
        lede: "Whole-card navigation or action.",
      },
      {
        id: "selectable-card",
        navLabel: "Selectable Card",
        title: "Selectable Card",
        lede: "Toggle selection with an inset ring.",
      },
      {
        id: "collapsible",
        navLabel: "Collapsible",
        title: "Collapsible",
        lede: "Nav and UI disclosure. Not MDX details.",
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    entries: [
      {
        id: "heading",
        navLabel: "Heading",
        title: "Heading",
        lede: "Native h1–h6 via level. Server component for MDX prose.",
      },
      {
        id: "text",
        navLabel: "Text",
        title: "Text",
        lede: "Native p, plus Strong, Em, and Small.",
      },
      {
        id: "blockquote",
        navLabel: "Blockquote",
        title: "Blockquote",
        lede: "Astryx Blockquote. MDX blockquotes stay MdxBlockquote.",
      },
      {
        id: "citation",
        navLabel: "Citation",
        title: "Citation",
        lede: "Inline source chip or number.",
      },
      {
        id: "code",
        navLabel: "Code",
        title: "Code",
        lede: "Native inline code.",
      },
      {
        id: "code-block",
        navLabel: "Code Block",
        title: "Code Block",
        lede: "Astryx CodeBlock. Fenced MDX pre stays MdxPre.",
      },
      {
        id: "kbd",
        navLabel: "Kbd",
        title: "Kbd",
        lede: "Children for a chord, or keys for an Astryx shortcut.",
      },
      {
        id: "timestamp",
        navLabel: "Timestamp",
        title: "Timestamp",
        lede: "Astryx Timestamp. Requires a value, not time children.",
      },
      {
        id: "figure",
        navLabel: "Figure",
        title: "Figure",
        lede: "Native figure, img, and figcaption.",
      },
    ],
  },
  {
    id: "data-input",
    label: "Data Input",
    entries: [
      {
        id: "text-input",
        navLabel: "Text Input",
        title: "Text Input",
        lede: "Astryx TextInput.",
      },
      {
        id: "text-area",
        navLabel: "Text Area",
        title: "Text Area",
        lede: "Astryx TextArea.",
      },
      {
        id: "checkbox",
        navLabel: "Checkbox",
        title: "Checkbox",
        lede: "Astryx CheckboxInput. Used in chrome; not a kit export yet.",
      },
      {
        id: "label",
        navLabel: "Label",
        title: "Label",
        lede: "Native label. Astryx FieldLabel is a different API.",
      },
    ],
  },
  {
    id: "feedback",
    label: "Feedback & Status",
    entries: [
      {
        id: "badge",
        navLabel: "Badge",
        title: "Badge",
        lede: "Status plus plan, tool, file, and judge.",
      },
      {
        id: "banner",
        navLabel: "Banner",
        title: "Banner",
        lede: "Astryx Banner. Used in the gallery; not a kit export yet.",
      },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    entries: [
      {
        id: "divider",
        navLabel: "Divider",
        title: "Divider",
        lede: "Astryx Divider. MDX hr maps here. Not a native hr.",
      },
      {
        id: "landmarks",
        navLabel: "Landmarks",
        title: "Landmarks",
        lede: "Native Header, Nav, Main, Footer, Article, Section, Aside.",
      },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    entries: [
      {
        id: "breadcrumbs",
        navLabel: "Breadcrumbs",
        title: "Breadcrumbs",
        lede: "Presentational breadcrumb slots. Not Astryx Breadcrumbs.",
      },
    ],
  },
  {
    id: "overlay",
    label: "Overlay",
    entries: [
      {
        id: "dialog",
        navLabel: "Dialog",
        title: "Dialog",
        lede: "Astryx Dialog with DialogHeader.",
      },
      {
        id: "tooltip",
        navLabel: "Tooltip",
        title: "Tooltip",
        lede: "Astryx Tooltip. Used in the gallery; not a kit export yet.",
      },
      {
        id: "bottom-sheet",
        navLabel: "Bottom Sheet",
        title: "Bottom Sheet",
        lede: "Docs mobile nav. Not a kit export yet.",
      },
    ],
  },
  {
    id: "table-list",
    label: "Table & List",
    entries: [
      {
        id: "list",
        navLabel: "List",
        title: "List",
        lede: "Native ul/ol and li. Not the Astryx data list.",
      },
      {
        id: "table",
        navLabel: "Table",
        title: "Table",
        lede: "Native table family. Not the Astryx data grid.",
      },
      {
        id: "details",
        navLabel: "Details",
        title: "Details",
        lede: "Native details and summary. Optional docs detail (ADR-0002).",
      },
      {
        id: "description-list",
        navLabel: "Description List",
        title: "Description List",
        lede: "Native dl, dt, and dd.",
      },
    ],
  },
  {
    id: "presentational",
    label: "Presentational",
    entries: [
      {
        id: "chip",
        navLabel: "Chip",
        title: "Chip",
        lede: "data-slot chip leftover, not an Astryx primitive.",
      },
      {
        id: "alert",
        navLabel: "Alert",
        title: "Alert",
        lede: "data-slot alert leftover. Prefer Banner for new UI.",
      },
      {
        id: "panel",
        navLabel: "Panel",
        title: "Panel",
        lede: "data-slot panel leftover.",
      },
      {
        id: "mermaid",
        navLabel: "Mermaid",
        title: "Mermaid",
        lede: "Diagrams in docs and on this kit. Scene, not a primitive.",
      },
    ],
  },
] as const;

export function dottoHref(id: string): string {
  return `/dotto/${id}`;
}

export function dottoEntries(): DottoEntry[] {
  return DOTTO_SECTIONS.flatMap((section) => [...section.entries]);
}

export function getDottoEntry(id: string): { section: DottoSection; entry: DottoEntry } | undefined {
  for (const section of DOTTO_SECTIONS) {
    const entry = section.entries.find((item) => item.id === id);
    if (entry) return { section, entry };
  }
  return undefined;
}

export function dottoNavSections() {
  return DOTTO_SECTIONS.map((section) => ({
    id: section.id,
    label: section.label,
    href: dottoHref(section.entries[0]?.id ?? ""),
    entries: section.entries.map((entry) => ({
      id: entry.id,
      href: dottoHref(entry.id),
      navLabel: entry.navLabel,
    })),
  }));
}

export function dottoNeighbors(id: string): {
  previous?: DottoEntry;
  next?: DottoEntry;
} {
  const all = dottoEntries();
  const index = all.findIndex((entry) => entry.id === id);
  if (index < 0) return {};
  return { previous: all[index - 1], next: all[index + 1] };
}

export function currentFromDottoPath(pathname: string): string {
  if (pathname === "/dotto" || pathname === "/dotto/") return "home";
  const match = pathname.match(/^\/dotto\/([^/]+)\/?$/);
  return match?.[1] ?? "home";
}

export type DottoSearchHit = {
  id: string;
  title: string;
  navLabel: string;
  lede: string;
  section: string;
  href: string;
};

export function searchDottoKit(query: string): DottoSearchHit[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return DOTTO_SECTIONS.flatMap((section) =>
    section.entries.map((entry) => ({
      id: entry.id,
      title: entry.title,
      navLabel: entry.navLabel,
      lede: entry.lede,
      section: section.label,
      href: dottoHref(entry.id),
    })),
  ).filter((hit) => {
    const haystack = `${hit.title} ${hit.navLabel} ${hit.lede} ${hit.section}`.toLocaleLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
