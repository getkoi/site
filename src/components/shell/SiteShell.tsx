"use client";

import { usePathname } from "next/navigation";
import { LinkProvider } from "@astryxdesign/core/Link";
import { SURFACE_ORDER, stageClassFromPath, surfaceFromPath } from "@/lib/surface";
import IconRail from "@/components/IconRail";
import { SiteTopbar } from "@/components/shell/SiteTopbar";
import { AppLink } from "@/components/AppLink";
import { DottoTheme } from "@/dotto/DottoTheme";
import { SiteEffects } from "@/components/shell/SiteEffects";
import "@/styles/layers.css";
import "@/styles/shell.css";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const surface = surfaceFromPath(pathname);
  const surfaceIndex = SURFACE_ORDER.indexOf(surface);
  const stageClass = stageClassFromPath(pathname);
  const stageClasses = [
    "site-stage relative min-h-[calc(100dvh-var(--rail-gap)*2)] min-w-0 isolate overflow-hidden rounded-[var(--stage-radius)] border border-line bg-[color-mix(in_srgb,var(--obsidian)_88%,var(--void))] max-docs:min-h-[calc(100dvh-var(--dock-h)-var(--rail-gap)*2-8px)] max-docs:overflow-clip max-docs:rounded-[14px]",
    stageClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <DottoTheme>
      <LinkProvider component={AppLink}>
        <div
          className="site-shell isolate grid min-h-dvh grid-cols-[72px_minmax(0,1fr)] gap-[var(--rail-gap)] p-[var(--rail-gap)] max-docs:grid-cols-1 max-docs:gap-0 max-docs:pb-[calc(var(--dock-h)+var(--rail-gap)+8px)]"
          data-surface={surface}
          data-surface-index={surfaceIndex}
        >
          <IconRail />
          <div className={stageClasses}>
            <main
              className="site-stage__inner relative z-[1] max-h-[calc(100dvh-var(--rail-gap)*2)] min-h-full overflow-auto scroll-pt-6 outline-none max-docs:max-h-none max-docs:overflow-visible"
              id="main"
              tabIndex={-1}
            >
              <SiteTopbar pathname={pathname} surface={surface} />
              {children}
            </main>
          </div>
          <SiteEffects />
        </div>
      </LinkProvider>
    </DottoTheme>
  );
}
