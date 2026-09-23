import { AppLink } from "@/components/AppLink";

export type BlogIndexPost = {
  id: string;
  href: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  publishedLabel: string;
  authorHandle: string;
  tags: readonly string[];
};

type Props = {
  posts: readonly BlogIndexPost[];
};

export default function BlogIndex({ posts }: Props) {
  return (
    <>
      <header className="blog-index__hero">
        <p className="blog-kicker">blog / field notes</p>
        <h1>Field notes</h1>
        <p>
          Practical ways to run long engineering work with junji, yokai, and the
          project state they share on disk.
        </p>
      </header>

      <section className="blog-index__posts" aria-labelledby="field-notes-heading">
        <h2 className="sr-only" id="field-notes-heading">
          Published field notes
        </h2>
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="blog-card"
            data-featured={index === 0 ? "true" : undefined}
          >
            <AppLink className="blog-card__art" href={post.href} aria-label={`Read ${post.title}`}>
              <img
                src={post.coverImage}
                alt=""
                width="768"
                height="512"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="blog-card__wash" />
            </AppLink>
            <div className="blog-card__body">
              <div className="blog-card__meta">
                <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
                <span aria-hidden="true">·</span>
                <span>@{post.authorHandle}</span>
              </div>
              <h2>
                <AppLink href={post.href}>{post.title}</AppLink>
              </h2>
              <p>{post.description}</p>
              <ul className="blog-card__tags" aria-label="Topics">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <AppLink className="blog-card__read" href={post.href}>
                Read the field note <span aria-hidden="true">→</span>
              </AppLink>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
