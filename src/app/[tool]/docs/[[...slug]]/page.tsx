import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs/DocsShell";
import { DocsBreadcrumbs } from "@/components/docs/DocsBreadcrumbs";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { getDoc, loadDocs } from "@/lib/content";
import { extractToc, renderMdx } from "@/lib/mdx";
import { DOC_TOOLS, docBreadcrumbs, docNeighbors, docTool, type DocTool } from "@/docs/registry";

type Props = { params: Promise<{ tool: string; slug?: string[] }> };

function entryId(tool: string, slug?: string[]) {
  if (!DOC_TOOLS.includes(tool as DocTool)) notFound();
  const id = `${tool}/${slug?.length ? slug.join("/") : "index"}`;
  return getDoc(id) ? id : `${id}/index`;
}

export function generateStaticParams() {
  return loadDocs().map((entry) => {
    const tool = docTool(entry.id);
    const slug = entry.id.slice(tool.length + 1);
    return { tool, slug: slug === "index" ? [] : slug.split("/").filter((part) => part !== "index") };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool, slug } = await params;
  const entry = getDoc(entryId(tool, slug));
  return entry ? { title: `${entry.data.title} — ${tool}`, description: entry.data.description } : {};
}

export default async function DocPage({ params }: Props) {
  const { tool, slug } = await params;
  const entry = getDoc(entryId(tool, slug));
  if (!entry) notFound();

  const docs = loadDocs();
  const breadcrumbs = docBreadcrumbs(docs, entry);
  const neighbors = docNeighbors(docs, entry);
  const toc = extractToc(entry.body);
  const content = await renderMdx(entry.body);

  return (
    <DocsShell tool={tool as DocTool} current={entry.id} toc={toc}>
      <DocsBreadcrumbs items={breadcrumbs} />
      <p className="mb-2.5 font-mono text-[0.78rem] tracking-[0.06em] text-accent before:mr-1 before:text-steel before:content-['//_']">
        {entry.data.navLabel.toLowerCase()}
      </p>
      <h1 className="pixel mb-3.5 font-display text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.12] tracking-normal text-bone [font-smooth:never] [-webkit-font-smoothing:none]">
        {entry.data.title}
      </h1>
      <p className="mb-9 max-w-[60ch] text-[1.05rem] text-fog">{entry.data.description}</p>
      <div data-slot="prose" className="docs-prose">{content}</div>
      <DocsPrevNext previous={neighbors.previous} next={neighbors.next} />
    </DocsShell>
  );
}
