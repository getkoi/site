import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DottoEntryPage } from "@/components/dotto/DottoEntryPage";
import { DottoShell } from "@/components/dotto/DottoShell";
import { dottoEntries, getDottoEntry } from "@/dotto/nav";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return dottoEntries().map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getDottoEntry(slug);
  if (!found) return {};
  return {
    title: `${found.entry.title} — dotto`,
    description: found.entry.lede,
    robots: { index: false, follow: false },
  };
}

export default async function DottoSlugPage({ params }: Props) {
  const { slug } = await params;
  const found = getDottoEntry(slug);
  if (!found) notFound();
  return (
    <DottoShell current={found.entry.id}>
      <DottoEntryPage section={found.section} entry={found.entry} />
    </DottoShell>
  );
}
