import { DOC_SECTIONS, DOC_TOOLS, docHref, docsBySection } from "@/docs/registry";
import { blogHref } from "@/data/blog";
import { loadDocs, loadPosts } from "@/lib/content";
import { GH_REPO, SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-static";

function linkLine(title: string, path: string, note: string) {
  return `- [${title}](${SITE_ORIGIN}${path}): ${note}`;
}

export function GET() {
  const all = loadDocs();
  const posts = loadPosts().sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  const lines = [
    "# koi",
    "",
    "> Tools that plug into your project and harness for long, multi-session engineering work across disposable context windows. Skills: junji (method) + yokai (sensors helper). Driver: yokai. ACP port: tori. Verification bar: atomic .koi/sensors/*.sh. The gate is their aggregate.",
    "",
    "Prefer this index, then fetch linked pages (or use `/llms-full.txt` for a single concatenated dump of the documentation).",
    "",
    "## Site surfaces",
    "",
    linkLine(
      "koi product homepage",
      "/",
      "Product home: what koi is, and how junji and yokai compose.",
    ),
    linkLine(
      "junji method landing",
      "/junji",
      "The Sentinel landing — method verbs, install, and mental model.",
    ),
    linkLine(
      "yokai brand page",
      "/yokai",
      "Thin driver that verifies phases on disk.",
    ),
    linkLine("recipes", "/yokai/recipes", "Copy-paste sensor scripts and sandbox image pairs."),
    "",
    "## Field notes",
    "",
    linkLine(
      "Field notes index",
      "/blog",
      "Practical working patterns for long engineering efforts with koi.",
    ),
    ...posts.map((post) => linkLine(post.data.title, blogHref(post.id), post.data.description)),
    "",
    ...DOC_TOOLS.flatMap((tool) => [
      `## ${tool} documentation`,
      "",
      ...DOC_SECTIONS[tool].flatMap((section) =>
        docsBySection(all, tool, section.id).map((entry) =>
          linkLine(entry.data.title, docHref(entry.id), entry.data.description),
        ),
      ),
      "",
    ]),
    "## Optional",
    "",
    `- [Full docs dump](${SITE_ORIGIN}/llms-full.txt): Concatenated documentation bodies for offline / single-fetch context.`,
    `- [GitHub repository](${GH_REPO}): Source, skills, crates, and ADRs.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
