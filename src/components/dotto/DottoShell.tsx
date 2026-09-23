import type { ReactNode } from "react";
import { DottoNav } from "./DottoNav";
import SiteFooter from "@/components/SiteFooter";
import { DocsPageEffects } from "@/components/shell/PageEffects";
import "@/styles/docs.css";

export function DottoShell({
  current = "home",
  children,
}: {
  current?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div
        className="relative mx-auto grid min-h-[50vh] max-w-[1100px] items-start gap-x-[clamp(20px,3.5vw,36px)] px-[var(--pad)] pt-[clamp(22px,3vw,32px)] pb-16 docs:grid-cols-[var(--docs-sidebar,200px)_minmax(0,1fr)]"
        data-docs-shell=""
      >
        <DottoNav current={current} />
        <div className="relative z-[1] min-w-0">{children}</div>
      </div>
      <SiteFooter />
      <DocsPageEffects />
    </>
  );
}
