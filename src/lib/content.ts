import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const docsSchema = z.object({
  title: z.string(),
  navLabel: z.string(),
  description: z.string(),
  section: z.enum(["overview", "guide", "sensors", "sandbox", "reference"]),
  kind: z.enum(["hub", "tutorial", "how-to", "explanation", "reference"]),
  order: z.number(),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  author: z.enum(["matheusps"]),
  coverImage: z.string(),
  coverAlt: z.string(),
  ogImage: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type DocData = z.infer<typeof docsSchema>;
export type BlogData = z.infer<typeof blogSchema>;

export type DocEntry = {
  id: string;
  data: DocData;
  body: string;
};

export type BlogEntry = {
  id: string;
  data: BlogData;
  body: string;
};

function walkFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile() && /\.mdx?$/.test(entry.name)) out.push(full);
    }
  }
  return out.sort();
}

function stripMdxImports(body: string) {
  return body.replace(/^import\s.+from\s+['"][^'"]+['"];?\n/gm, "");
}

function loadCollection<T>(
  kind: "docs" | "blog",
  schema: z.ZodType<T>,
): Array<{ id: string; data: T; body: string }> {
  const root =
    kind === "docs"
      ? path.join(process.cwd(), "src/content/docs")
      : path.join(process.cwd(), "src/content/blog");
  return walkFiles(root).map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const id = path.relative(root, file).replaceAll("\\", "/").replace(/\.mdx?$/, "");
    return {
      id,
      data: schema.parse(data),
      body: stripMdxImports(content),
    };
  });
}

export function loadDocs(): DocEntry[] {
  return loadCollection("docs", docsSchema);
}

export function getDoc(id: string): DocEntry | undefined {
  return loadDocs().find((entry) => entry.id === id);
}

export function loadPosts(): BlogEntry[] {
  return loadCollection("blog", blogSchema).filter((entry) => !entry.data.draft);
}

export function getPost(id: string): BlogEntry | undefined {
  return loadPosts().find((entry) => entry.id === id);
}
