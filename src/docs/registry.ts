/** The one ordering and URL model shared by docs UI and machine feeds. */

export type DocSection =
  | "start"
  | "junji"
  | "yokai"
  | "sensors"
  | "sandbox"
  | "reference";

export type DocKind = "hub" | "tutorial" | "how-to" | "explanation" | "reference";

export interface DocEntryLike {
  id: string;
  data: {
    title: string;
    navLabel: string;
    description: string;
    section: DocSection;
    kind: DocKind;
    order: number;
  };
}

export interface DocCrumb {
  href: string;
  label: string;
}

export const DOC_SECTIONS: ReadonlyArray<{
  id: DocSection;
  label: string;
  description: string;
}> = [
  { id: "start", label: "Start here", description: "What koi is, then a first green run." },
  { id: "junji", label: "Learn junji", description: "Plan and execute durable, phased work." },
  { id: "yokai", label: "Drive with yokai", description: "Run, observe, and recover the driver." },
  { id: "sensors", label: "Verify with sensors", description: "Choose checks, copy recipes, and verify your work." },
  { id: "sandbox", label: "Run in a sandbox", description: "Run the agent and gate inside a repo-owned VM." },
  { id: "reference", label: "Reference", description: "Look up commands, configuration, language, and decisions." },
];

const sectionRank = new Map(DOC_SECTIONS.map((section, index) => [section.id, index]));

export { GH_BLOB, GH_REPO, SITE_ORIGIN } from "../lib/site";

export function docHref(id: string): string {
  return `/docs/${id}`;
}

export function sectionLabel(section: DocSection): string {
  return DOC_SECTIONS.find((candidate) => candidate.id === section)?.label ?? section;
}

export function sortDocs<T extends DocEntryLike>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) =>
      (sectionRank.get(a.data.section) ?? 99) - (sectionRank.get(b.data.section) ?? 99) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

export function docsBySection<T extends DocEntryLike>(entries: T[], section: DocSection): T[] {
  return sortDocs(entries.filter((entry) => entry.data.section === section));
}

export function sectionLanding<T extends DocEntryLike>(entries: T[], section: DocSection): T | undefined {
  return docsBySection(entries, section).find((entry) => entry.data.kind === "hub") ??
    docsBySection(entries, section)[0];
}

export function docBreadcrumbs<T extends DocEntryLike>(entries: T[], current: T): DocCrumb[] {
  const crumbs: DocCrumb[] = [{ href: "/docs", label: "Docs" }];
  const landing = sectionLanding(entries, current.data.section);

  if (landing && landing.id !== current.id) {
    crumbs.push({ href: docHref(landing.id), label: sectionLabel(current.data.section) });
  }

  crumbs.push({ href: docHref(current.id), label: current.data.navLabel });
  return crumbs;
}

export function docNeighbors<T extends DocEntryLike>(
  entries: T[],
  current: T,
): { previous?: T; next?: T } {
  const section = docsBySection(entries, current.data.section);
  const index = section.findIndex((entry) => entry.id === current.id);
  if (index < 0) return {};
  return {
    previous: index > 0 ? section[index - 1] : undefined,
    next: index + 1 < section.length ? section[index + 1] : undefined,
  };
}
