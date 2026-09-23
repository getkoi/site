import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";
import HarvestCycle from "@/components/blog/HarvestCycle";
import HarvestScene from "@/components/blog/HarvestScene";
import { MdxBlockquote, MdxPre } from "@/components/mdx/MdxChrome";
import { Divider } from "@/dotto/components/astryx";
import { Link } from "@/dotto/components/link";
import {
  Code,
  Details,
  Em,
  Figure,
  FigureCaption,
  Heading,
  Image,
  Kbd,
  List,
  ListItem,
  Strong,
  Summary,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from "@/dotto/components/html";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const mdxComponents: MDXComponents = {
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  p: Text,
  a: Link,
  ul: List,
  ol: (props) => <List as="ol" {...props} />,
  li: ListItem,
  strong: Strong,
  em: Em,
  code: Code,
  kbd: Kbd,
  pre: MdxPre,
  blockquote: MdxBlockquote,
  hr: Divider,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableCell,
  img: Image,
  figure: Figure,
  figcaption: FigureCaption,
  details: Details,
  summary: Summary,
  HarvestCycle,
  HarvestScene,
};

export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/`/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1");
    items.push({ id: slugger.slug(text), text, level });
  }
  return items;
}

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: { light: "github-light", dark: "github-dark" },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });
  return content;
}
