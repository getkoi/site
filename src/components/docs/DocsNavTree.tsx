"use client";

import type { ComponentType, ReactNode } from "react";
import { Collapsible } from "@astryxdesign/core/Collapsible";
import {
  BookMark,
  BoxIcon,
  FoxIcon,
  GateIcon,
  HashIcon,
  LanternIcon,
  LeafIcon,
  MenuIcon,
  PagesIcon,
} from "../../icons/docs/pixels";
import type { DocsNavSectionData } from "./nav-types";
import { AppLink } from "../AppLink";

const DOCS_SECTION_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  overview: LanternIcon,
  guide: PagesIcon,
  start: LanternIcon,
  junji: PagesIcon,
  yokai: FoxIcon,
  sensors: GateIcon,
  sandbox: BoxIcon,
  reference: HashIcon,
};

const DOTTO_SECTION_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  foundations: LanternIcon,
  action: PagesIcon,
  container: BoxIcon,
  content: LeafIcon,
  "data-input": GateIcon,
  feedback: HashIcon,
  layout: BoxIcon,
  navigation: MenuIcon,
  overlay: FoxIcon,
  "table-list": PagesIcon,
  presentational: HashIcon,
};

function sectionContains(section: DocsNavSectionData, current: string) {
  return section.entries.some((entry) => entry.id === current);
}

function TriggerLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="docs-nav-section__label">
      {icon}
      <span className="flex-1">{children}</span>
    </span>
  );
}

export function DocsNavTree({
  current,
  sections,
  overviewHref = "/koi/docs",
  overviewLabel = "Documentation",
  ariaLabel = "Documentation",
  tree = "docs",
  defaultOpen = false,
  flat = false,
}: {
  current: string;
  sections: DocsNavSectionData[];
  overviewHref?: string;
  overviewLabel?: string;
  ariaLabel?: string;
  tree?: "docs" | "dotto";
  defaultOpen?: boolean;
  flat?: boolean;
}) {
  const overviewCurrent = current === "home" || current === `${overviewHref.split("/")[1]}/index`;
  const icons = tree === "dotto" ? DOTTO_SECTION_ICONS : DOCS_SECTION_ICONS;

  return (
    <nav className="docs-nav flex min-h-0 flex-1 flex-col" aria-label={ariaLabel}>
      {flat ? (
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          <li>
            <AppLink data-slot="nav-link" href={overviewHref} aria-current={overviewCurrent ? "page" : undefined}>
              <span>Overview</span>
            </AppLink>
          </li>
          {sections.flatMap((section) => section.entries).map((entry) => (
            <li key={entry.id}>
              <AppLink
                data-slot="nav-link"
                href={entry.href}
                aria-current={current === entry.id ? "page" : undefined}
              >
                <span>{entry.navLabel}</span>
              </AppLink>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <AppLink
            data-slot="nav-link"
            className="dither-link mb-3"
            href={overviewHref}
            aria-current={overviewCurrent ? "page" : undefined}
          >
            <BookMark className="size-6 shrink-0" />
            <span>{overviewLabel}</span>
          </AppLink>
          <div className="flex min-h-0 flex-1 flex-col gap-1">
            {sections.map((section) => {
              const Icon = icons[section.id] ?? LeafIcon;
              const open = sectionContains(section, current);
              return (
                <Collapsible
                  key={section.id}
                  className="docs-nav-section"
                  defaultIsOpen={open || defaultOpen}
                  chevronPosition="end"
                  trigger={
                    <TriggerLabel icon={<Icon className="size-4 shrink-0" />}>
                      {section.label}
                    </TriggerLabel>
                  }
                >
                  <ul className="m-0 flex list-none flex-col gap-0.5 py-1 pl-2">
                    {section.entries.map((entry) => (
                      <li key={entry.id}>
                        <AppLink
                          data-slot="nav-link"
                          href={entry.href}
                          aria-current={current === entry.id ? "page" : undefined}
                        >
                          <LeafIcon className="size-4 shrink-0" />
                          <span>{entry.navLabel}</span>
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                </Collapsible>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
}
