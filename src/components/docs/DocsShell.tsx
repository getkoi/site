import type { ReactNode } from "react";
import { DocsNav } from "@/components/docs/DocsNav";
import { DocsToc } from "@/components/docs/DocsToc";
import SiteFooter from "@/components/SiteFooter";
import { DocsPageEffects } from "@/components/shell/PageEffects";
import type { TocItem } from "@/lib/mdx";
import "@/styles/docs.css";

export function DocsShell({
  current = "home",
  toc = [],
  children,
}: {
  current?: string;
  toc?: TocItem[];
  children: ReactNode;
}) {
  const hasToc = toc.length > 2;
  const gridClass = hasToc
    ? "docs:grid-cols-[var(--docs-sidebar,200px)_minmax(0,1fr)_190px]"
    : "docs:grid-cols-[var(--docs-sidebar,200px)_minmax(0,1fr)]";

  return (
    <>
      <div
        className={`mx-auto grid min-h-[50vh] max-w-[1100px] items-start gap-x-[clamp(20px,3.5vw,36px)] px-[var(--pad)] pt-[clamp(22px,3vw,32px)] pb-16 relative ${gridClass}`}
        data-has-toc={hasToc ? "true" : "false"}
        data-docs-shell=""
      >
        <DocsNav current={current} />
        <div className="relative z-[1] min-w-0">{children}</div>
        {hasToc ? <DocsToc items={toc} /> : null}
      </div>
      <p className="sr-only" aria-live="polite" data-copy-status="" />
      <SiteFooter />
      <DocsPageEffects />
    </>
  );
}
