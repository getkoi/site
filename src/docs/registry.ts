/** Canonical ordering and URLs shared by docs UI, search, and machine feeds. */

export type DocTool = "koi" | "junji" | "yokai";
export type DocSection = "overview" | "guide" | "reference" | "sensors" | "sandbox";
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

export const DOC_TOOLS: readonly DocTool[] = ["koi", "junji", "yokai"];

export const DOC_SECTIONS: Record<DocTool, ReadonlyArray<{
  id: DocSection;
  label: string;
  description: string;
}>> = {
  koi: [
    { id: "overview", label: "Start here", description: "The project model and how the tools fit together." },
    { id: "guide", label: "Get started", description: "Install the tools and verify your first phase." },
    { id: "reference", label: "Reference", description: "Setup commands, shared terminology, and decisions." },
  ],
  junji: [
    { id: "overview", label: "About junji", description: "The durable planning method." },
    { id: "guide", label: "Use junji", description: "Verbs and the method skill." },
  ],
  yokai: [
    { id: "overview", label: "About yokai", description: "The phase driver and verification contract." },
    { id: "guide", label: "Run yokai", description: "Drive, observe, and recover phases." },
    { id: "sensors", label: "Sensors", description: "Build the verification bar and copy recipes." },
    { id: "sandbox", label: "Sandbox", description: "Run the agent and gate in a project-owned VM." },
    { id: "reference", label: "Reference", description: "Flags, settings, diagnostics, and decisions." },
  ],
};

export { GH_BLOB, GH_REPO, SITE_ORIGIN } from "../lib/site";

export function docTool(id: string): DocTool {
  const tool = id.split("/")[0];
  if (!DOC_TOOLS.includes(tool as DocTool)) throw new Error(`Unknown documentation tool: ${id}`);
  return tool as DocTool;
}

export function docHref(id: string): string {
  const tool = docTool(id);
  const slug = id.slice(tool.length + 1);
  return `/${tool}/docs${slug === "index" ? "" : `/${slug.replace(/\/index$/, "")}`}`;
}

export function sectionLabel(tool: DocTool, section: DocSection): string {
  return DOC_SECTIONS[tool].find((candidate) => candidate.id === section)?.label ?? section;
}

export function sortDocs<T extends DocEntryLike>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const toolA = docTool(a.id);
    const toolB = docTool(b.id);
    return DOC_TOOLS.indexOf(toolA) - DOC_TOOLS.indexOf(toolB) ||
      DOC_SECTIONS[toolA].findIndex((section) => section.id === a.data.section) -
        DOC_SECTIONS[toolB].findIndex((section) => section.id === b.data.section) ||
      a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);
  });
}

export function docsBySection<T extends DocEntryLike>(entries: T[], tool: DocTool, section: DocSection): T[] {
  return sortDocs(entries.filter((entry) => docTool(entry.id) === tool && entry.data.section === section));
}

export function sectionLanding<T extends DocEntryLike>(entries: T[], tool: DocTool, section: DocSection): T | undefined {
  const sectionDocs = docsBySection(entries, tool, section);
  return sectionDocs.find((entry) => entry.data.kind === "hub") ?? sectionDocs[0];
}

export function docBreadcrumbs<T extends DocEntryLike>(entries: T[], current: T): DocCrumb[] {
  const tool = docTool(current.id);
  const root = `/${tool}/docs`;
  const crumbs: DocCrumb[] = [{ href: root, label: `${tool} docs` }];
  if (docHref(current.id) === root) return crumbs;
  if (tool === "junji") {
    crumbs.push({ href: docHref(current.id), label: current.data.navLabel });
    return crumbs;
  }
  const landing = sectionLanding(entries, tool, current.data.section);
  if (landing && landing.id !== current.id && docHref(landing.id) !== root) {
    crumbs.push({ href: docHref(landing.id), label: sectionLabel(tool, current.data.section) });
  }
  crumbs.push({ href: docHref(current.id), label: current.data.navLabel });
  return crumbs;
}

export function docNeighbors<T extends DocEntryLike>(entries: T[], current: T): { previous?: T; next?: T } {
  const tool = docTool(current.id);
  const section = tool === "junji"
    ? sortDocs(entries.filter((entry) => docTool(entry.id) === "junji"))
    : docsBySection(entries, tool, current.data.section);
  const index = section.findIndex((entry) => entry.id === current.id);
  if (index < 0) return {};
  return { previous: section[index - 1], next: section[index + 1] };
}
