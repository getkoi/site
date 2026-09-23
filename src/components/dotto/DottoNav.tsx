import { DocsNavTree } from "@/components/docs/DocsNavTree";
import { DottoKitSearch } from "./DottoKitSearch";
import { DottoMobileNav } from "./DottoMobileNav";
import { dottoEntries, dottoNavSections } from "@/dotto/nav";

export function DottoNav({ current = "home" }: { current?: string }) {
  const sections = dottoNavSections();
  const currentLabel =
    current === "home"
      ? "Overview"
      : (dottoEntries().find((entry) => entry.id === current)?.navLabel ?? "dotto");

  const nav = { current, currentLabel, sections };

  return (
    <>
      <div className="docs:hidden">
        <DottoMobileNav {...nav} />
      </div>
      <aside
        className="docs-nav-desktop sticky top-5 hidden h-[calc(100dvh-80px)] min-h-0 self-start docs:flex docs:flex-col"
        data-docs-sidebar=""
      >
        <div className="mb-4 shrink-0">
          <DottoKitSearch />
        </div>
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-auto" data-docs-nav-scroll>
            <DocsNavTree
              current={current}
              sections={sections}
              tree="dotto"
              overviewHref="/dotto"
              overviewLabel="dotto"
              ariaLabel="dotto"
              defaultOpen={current === "home"}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
