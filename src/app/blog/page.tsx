import type { Metadata } from "next";
import { BlogShell } from "@/components/blog/BlogShell";
import BlogIndex from "@/components/blog/BlogIndex";
import { loadPosts } from "@/lib/content";
import { blogHref, formatBlogDate, getBlogAuthor } from "@/data/blog";

export const metadata: Metadata = {
  title: "Field notes | koi",
  description: "Working patterns for planning, driving, and caring for long engineering efforts with koi.",
};

export default function BlogIndexPage() {
  const posts = loadPosts()
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .map((post) => {
      const author = getBlogAuthor(post.data.author);
      return {
        id: post.id,
        href: blogHref(post.id),
        title: post.data.title,
        description: post.data.description,
        coverImage: post.data.coverImage,
        publishedAt: post.data.publishedAt.toISOString(),
        publishedLabel: formatBlogDate(post.data.publishedAt),
        authorHandle: author.handle,
        tags: post.data.tags,
      };
    });

  return (
    <BlogShell>
      <BlogIndex posts={posts} />
    </BlogShell>
  );
}
