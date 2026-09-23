import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs/DocsShell";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { getDoc, loadDocs } from "@/lib/content";
import { extractToc, renderMdx } from "@/lib/mdx";
import { docBreadcrumbs, docNeighbors } from "@/docs/registry";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return loadDocs().map((entry) => ({ slug: entry.id.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDoc(slug.join("/"));
  if (!entry) return {};
  const title =
    entry.data.title.includes("koi") ||
    entry.data.title.includes("junji") ||
    entry.data.title.includes("yokai")
      ? entry.data.title
      : `${entry.data.title} — koi`;
  return { title, description: entry.data.description };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const id = slug.join("/");
  const entry = getDoc(id);
  if (!entry) notFound();

  const docs = loadDocs();
  const breadcrumbs = docBreadcrumbs(docs, entry);
  const neighbors = docNeighbors(docs, entry);
  const toc = extractToc(entry.body);
  const content = await renderMdx(entry.body);

  return (
    <DocsShell current={entry.id} toc={toc}>
      <DocsBreadcrumbs items={breadcrumbs} />
      <p className="mb-2.5 font-mono text-[0.78rem] tracking-[0.06em] text-accent before:mr-1 before:text-steel before:content-['//_']">
        {entry.data.navLabel.toLowerCase()}
      </p>
      <h1 className="pixel mb-3.5 font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.12] tracking-normal text-bone [font-smooth:never] [-webkit-font-smoothing:none]">
        {entry.data.title}
      </h1>
      <p className="mb-9 max-w-[60ch] text-[1.05rem] text-fog">{entry.data.description}</p>
      <div data-slot="prose" className="docs-prose">
        {content}
      </div>
      <DocsPrevNext previous={neighbors.previous} next={neighbors.next} />
    </DocsShell>
  );
}
