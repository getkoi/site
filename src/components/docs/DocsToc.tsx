import type { TocItem } from "@/lib/mdx";

export function DocsToc({ items }: { items: TocItem[] }) {
  const filtered = items.filter((item) => item.level === 2 || item.level === 3);
  if (filtered.length <= 2) return null;

  return (
    <nav data-slot="toc" className="docs-toc" aria-label="On this page">
      <p data-slot="toc-title">On this page</p>
      <ul data-slot="toc-list">
        {filtered.map((item) => (
          <li key={item.id}>
            <a
              data-slot="toc-link"
              data-level={item.level}
              data-toc-id={item.id}
              href={`#${item.id}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
