import { AppLink } from "@/components/AppLink";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import type { DottoEntry, DottoSection } from "@/dotto/nav";
import { getDottoKitPage } from "@/dotto/kit-pages";
import { dottoHref, dottoNeighbors } from "@/dotto/nav";
import { DottoEntryBody } from "./DottoEntryBody";
import { DottoKitArticle } from "./DottoKitArticle";

export function DottoEntryPage({
  section,
  entry,
}: {
  section: DottoSection;
  entry: DottoEntry;
}) {
  const neighbors = dottoNeighbors(entry.id);
  const page = getDottoKitPage(entry.id);
  if (!page) throw new Error(`missing kit page copy for ${entry.id}`);

  return (
    <div className="relative max-w-[720px]">
      <DocsBreadcrumbs
        items={[
          { href: "/dotto", label: "dotto" },
          { href: dottoHref(section.entries[0].id), label: section.label },
          { href: dottoHref(entry.id), label: entry.navLabel },
        ]}
      />
      <p className="mb-2.5 font-mono text-[0.78rem] tracking-[0.06em] text-accent before:mr-1 before:text-steel before:content-['//_']">
        {section.label.toLowerCase()}
      </p>
      <h1 className="pixel mb-3.5 font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.12] tracking-normal text-bone [font-smooth:never] [-webkit-font-smoothing:none]">
        {entry.title}
      </h1>
      <DottoKitArticle page={page}>
        <DottoEntryBody id={entry.id} />
      </DottoKitArticle>
      <nav data-slot="prev-next" className="mt-12" aria-label="Adjacent kit pages">
        {neighbors.previous ? (
          <AppLink data-slot="prev-next-link" href={dottoHref(neighbors.previous.id)} rel="prev">
            <span data-slot="prev-next-kicker">Previous</span>
            <strong data-slot="prev-next-title">{neighbors.previous.navLabel}</strong>
          </AppLink>
        ) : (
          <span />
        )}
        {neighbors.next ? (
          <AppLink
            data-slot="prev-next-link"
            className="text-right max-narrow:text-left"
            href={dottoHref(neighbors.next.id)}
            rel="next"
          >
            <span data-slot="prev-next-kicker">Next</span>
            <strong data-slot="prev-next-title">{neighbors.next.navLabel}</strong>
          </AppLink>
        ) : null}
      </nav>
    </div>
  );
}
