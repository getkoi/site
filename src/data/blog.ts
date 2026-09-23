export const BLOG_AUTHORS = {
  matheusps: {
    handle: "matheusps",
    profileUrl: "https://github.com/matheusps",
    avatar: "/authors/matheusps.webp",
  },
} as const;

export type BlogAuthorKey = keyof typeof BLOG_AUTHORS;

export function getBlogAuthor(key: BlogAuthorKey) {
  return BLOG_AUTHORS[key];
}

export function blogHref(id: string) {
  return `/blog/${id}`;
}

export function formatBlogDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
