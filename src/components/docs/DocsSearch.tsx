"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Typeahead, TypeaheadItem } from "@astryxdesign/core/Typeahead";
import type { SearchableItem, SearchSource } from "@astryxdesign/core/Typeahead";

export type DocsSearchEntry = {
  title: string;
  navLabel: string;
  description: string;
  section: string;
  href: string;
  text: string;
};

type DocsSearchItem = SearchableItem<{
  href: string;
  section: string;
  description: string;
}>;

function matches(item: DocsSearchEntry, query: string) {
  const trimmed = query.trim();
  if (trimmed.length < 2) return false;
  const terms = trimmed.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const haystack =
    `${item.title} ${item.navLabel} ${item.description} ${item.section} ${item.text}`.toLocaleLowerCase();
  return terms.every((term) => haystack.includes(term));
}

function toItem(entry: DocsSearchEntry): DocsSearchItem {
  return {
    id: entry.href,
    label: entry.title,
    auxiliaryData: {
      href: entry.href,
      section: entry.section,
      description: entry.description,
    },
  };
}

function DocsSearchField() {
  const router = useRouter();
  const [items, setItems] = useState<DocsSearchEntry[]>([]);
  const [value, setValue] = useState<DocsSearchItem | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/docs/search.json")
      .then((response) => {
        if (!response.ok) throw new Error(`docs search failed: ${response.status}`);
        return response.json() as Promise<DocsSearchEntry[]>;
      })
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const searchSource = useMemo<SearchSource<DocsSearchItem>>(
    () => ({
      search(query: string) {
        return items.filter((item) => matches(item, query)).map(toItem);
      },
      bootstrap() {
        return [];
      },
    }),
    [items],
  );

  return (
    <div data-docs-search>
      <Typeahead
        label="Search docs"
        description="Press / to search"
        placeholder="sensor, sandbox, recovery…"
        searchSource={searchSource}
        value={value}
        onChange={(item) => {
          setValue(item);
          const href = item?.auxiliaryData?.href;
          if (href) router.push(href as Parameters<typeof router.push>[0]);
        }}
        minQueryLength={2}
        debounceMs={0}
        maxMenuItems={12}
        width="100%"
        size="md"
        emptySearchResultsText={
          error ? "Search is unavailable." : "No matching documentation."
        }
        renderItem={(item) => (
          <TypeaheadItem
            item={item}
            description={`${item.auxiliaryData?.section} · ${item.auxiliaryData?.description}`}
          />
        )}
      />
    </div>
  );
}

export default function DocsSearch() {
  return <DocsSearchField />;
}
