import { loadDocs } from "@/lib/content";
import {
  DOC_SECTIONS,
  docsBySection,
  docHref,
} from "@/docs/registry";
import DocsSearch from "@/components/docs/DocsSearch";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsMobileNav from "@/components/docs/DocsMobileNav";

export function DocsNav({ current = "home" }: { current?: string }) {
  const all = loadDocs();
  const currentLabel =
    current === "home" ? "Overview" : (all.find((doc) => doc.id === current)?.data.navLabel ?? "Docs");

  const sections = DOC_SECTIONS.map((section) => {
    const entries = docsBySection(all, section.id);
    const landing = entries.find((entry) => entry.data.kind === "hub") ?? entries[0];
    return {
      id: section.id,
      label: section.label,
      href: landing ? docHref(landing.id) : "/docs",
      entries: entries.map((doc) => ({
        id: doc.id,
        href: docHref(doc.id),
        navLabel: doc.data.navLabel,
      })),
    };
  }).filter((section) => section.entries.length > 0);

  const nav = { current, currentLabel, sections };

  return (
    <>
      <div className="docs:hidden">
        <DocsMobileNav {...nav} />
      </div>
      <aside
        className="docs-nav-desktop sticky top-5 hidden h-[calc(100dvh-80px)] min-h-0 self-start docs:flex docs:flex-col"
        data-docs-sidebar=""
      >
        <div className="mb-4 shrink-0">
          <DocsSearch />
        </div>
        <DocsSidebar {...nav} />
      </aside>
    </>
  );
}
