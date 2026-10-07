import type { ReactNode } from "react";
import { DocsNav } from "@/components/docs/DocsNav";
import { DocsToc } from "@/components/docs/DocsToc";
import SiteFooter from "@/components/SiteFooter";
import { DocsPageEffects } from "@/components/shell/PageEffects";
import type { TocItem } from "@/lib/mdx";
import type { DocTool } from "@/docs/registry";
import "@/styles/docs.css";

export function DocsShell({
  tool,
  current = "home",
  toc = [],
  children,
}: {
  tool: DocTool;
  current?: string;
  toc?: TocItem[];
  children: ReactNode;
}) {
  const hasToc = toc.length > 2;

  return (
    <>
      <div
        className="docs-layout"
        data-has-toc={hasToc ? "true" : "false"}
        data-docs-shell=""
      >
        <DocsNav tool={tool} current={current} />
        <article className="docs-article">{children}</article>
        {hasToc ? <DocsToc items={toc} /> : null}
      </div>
      <p className="sr-only" aria-live="polite" data-copy-status="" />
      <SiteFooter />
      <DocsPageEffects />
    </>
  );
}
