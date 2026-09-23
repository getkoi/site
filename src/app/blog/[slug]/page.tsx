import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogShell } from "@/components/blog/BlogShell";
import { getPost, loadPosts } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { formatBlogDate, getBlogAuthor } from "@/data/blog";
import { AppLink } from "@/components/AppLink";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return loadPosts().map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPost(slug);
  if (!entry) return {};
  const author = getBlogAuthor(entry.data.author);
  return {
    title: `${entry.data.title} | koi`,
    description: entry.data.description,
    openGraph: {
      type: "article",
      images: [entry.data.ogImage],
      publishedTime: entry.data.publishedAt.toISOString(),
      authors: [author.profileUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const entry = getPost(slug);
  if (!entry) notFound();

  const author = getBlogAuthor(entry.data.author);
  const content = await renderMdx(entry.body);

  return (
    <BlogShell>
      <article className="blog-post">
        <header className="blog-post__header">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <AppLink href="/blog">Field notes</AppLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{entry.data.title}</span>
          </nav>
          <p className="blog-kicker">field note / working method</p>
          <h1>{entry.data.title}</h1>
          <p className="blog-post__dek">{entry.data.description}</p>
          <div className="blog-byline">
            <a
              className="blog-byline__author"
              href={author.profileUrl}
              target="_blank"
              rel="author noopener"
            >
              <img src={author.avatar} alt="" width={44} height={44} />
              <span>
                <small>written by</small>
                <strong>@{author.handle}</strong>
              </span>
            </a>
            <span className="blog-byline__rule" aria-hidden="true" />
            <time dateTime={entry.data.publishedAt.toISOString()}>
              {formatBlogDate(entry.data.publishedAt)}
            </time>
          </div>
        </header>

        <div className="blog-prose" data-slot="prose">
          {content}
        </div>

        <footer className="blog-post__footer">
          <p>Filed under {entry.data.tags.join(" · ")}.</p>
          <AppLink href="/blog">Back to field notes</AppLink>
        </footer>
      </article>
    </BlogShell>
  );
}
