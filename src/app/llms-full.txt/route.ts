import { docHref, docTool, sectionLabel, sortDocs } from "@/docs/registry";
import { loadDocs } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const all = sortDocs(loadDocs());

  const parts: string[] = [
    "# koi — full documentation",
    "",
    `> Documentation for koi, junji, and yokai. Index: ${SITE_ORIGIN}/llms.txt. Recipes: ${SITE_ORIGIN}/yokai/recipes`,
    "",
  ];

  for (const entry of all) {
    const tool = docTool(entry.id);
    parts.push(`# ${tool === "junji" ? "junji" : `${tool} / ${sectionLabel(tool, entry.data.section)}`} / ${entry.data.title}`);
    parts.push("");
    parts.push(`Source: ${SITE_ORIGIN}${docHref(entry.id)}`);
    parts.push("");
    parts.push(entry.body.trimEnd());
    parts.push("");
    parts.push("---");
    parts.push("");
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
