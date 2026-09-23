import type { Metadata } from "next";
import { DocsShell } from "@/components/docs/DocsShell";
import { loadDocs } from "@/lib/content";
import { DOC_SECTIONS, docHref, sectionLanding } from "@/docs/registry";
import { BookMark } from "@/icons/docs/pixels";
import { AppLink } from "@/components/AppLink";

export const metadata: Metadata = {
  title: "Docs — koi",
  description: "What koi is, a first green run, then the method, driver, sensors, and sandbox.",
};

export default function DocsIndexPage() {
  const all = loadDocs();
  const sections = DOC_SECTIONS.map((section) => ({
    ...section,
    landing: sectionLanding(all, section.id),
  })).filter((section) => section.landing);

  return (
    <DocsShell current="home">
      <div className="docs-home relative max-w-[720px]">
        <BookMark className="mb-2 size-[clamp(4rem,12vw,6.5rem)] opacity-35 [image-rendering:pixelated] drop-shadow-[0_0_40px_rgba(var(--accent-rgb),0.25)]" />
        <p className="docs-kicker mb-2.5 font-mono text-[0.78rem] tracking-[0.06em] text-accent before:mr-1 before:text-steel before:content-['//_']">
          reading room
        </p>
        <h1 className="docs-page-title pixel mb-4 font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.12] tracking-normal text-bone [font-smooth:never] [-webkit-font-smoothing:none]">
          Documentation
        </h1>
        <p className="mb-10 max-w-[55ch] text-[1.05rem] text-fog [&_a]:text-accent [&_a]:no-underline hover:[&_a]:underline">
          New here? Read <AppLink href="/docs/start-here">Start here</AppLink> for what koi is, then the{" "}
          <AppLink href="/docs/start-here/quickstart">Quickstart</AppLink> for a first green run. The cards
          below are the rest of the reading room. Working patterns live in <AppLink href="/blog">Field notes</AppLink>
          . Machines: <a href="/llms.txt">llms.txt</a> and <a href="/llms-full.txt">llms-full.txt</a>.
        </p>
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {sections.map((section, i) => (
            <li key={section.id}>
              <AppLink
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-[18px] gap-y-1 border-b border-line py-[22px] no-underline hover:border-accent-line hover:[&_h2]:text-accent-core"
                href={docHref(section.landing!.id)}
              >
                <span
                  className="pixel row-span-3 self-start pt-0.5 font-display text-[1.6rem] leading-none text-accent opacity-55 [font-smooth:never] [-webkit-font-smoothing:none]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="m-0 font-mono text-[0.78rem] text-accent">{section.landing!.data.kind}</p>
                <h2 className="m-0 font-display text-[1.35rem] font-normal tracking-normal text-bone [font-smooth:never] [-webkit-font-smoothing:none]">
                  {section.label}
                </h2>
                <p className="col-start-2 m-0 text-[0.95rem] leading-[1.55] text-fog">
                  {section.description}
                </p>
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </DocsShell>
  );
}
