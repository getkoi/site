import { docHref, docTool, sectionLabel, sortDocs } from "@/docs/registry";
import { loadDocs } from "@/lib/content";

export const dynamic = "force-static";

function searchableText(body: string): string {
  return body.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ")
    .replace(/[[\]_*`>#|()-]/g, " ").replace(/\s+/g, " ").trim();
}

export function GET() {
  const docs = sortDocs(loadDocs()).map((entry) => ({
    title: entry.data.title,
    navLabel: entry.data.navLabel,
    description: entry.data.description,
    section: `${docTool(entry.id)} · ${sectionLabel(docTool(entry.id), entry.data.section)}`,
    href: docHref(entry.id),
    text: searchableText(entry.body),
  }));
  return new Response(JSON.stringify(docs), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
