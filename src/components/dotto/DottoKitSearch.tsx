"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Typeahead, TypeaheadItem } from "@astryxdesign/core/Typeahead";
import type { SearchableItem, SearchSource } from "@astryxdesign/core/Typeahead";
import { searchDottoKit } from "@/dotto/nav";

type KitSearchItem = SearchableItem<{
  href: string;
  section: string;
  description: string;
}>;

export function DottoKitSearch() {
  const router = useRouter();
  const [value, setValue] = useState<KitSearchItem | null>(null);

  const searchSource = useMemo<SearchSource<KitSearchItem>>(
    () => ({
      search(query: string) {
        return searchDottoKit(query).map((entry) => ({
          id: entry.href,
          label: entry.navLabel,
          auxiliaryData: {
            href: entry.href,
            section: entry.section,
            description: entry.lede,
          },
        }));
      },
      bootstrap() {
        return [];
      },
    }),
    [],
  );

  return (
    <div data-docs-search>
      <Typeahead
        label="Search components"
        description="Press / to search"
        placeholder="Button, Card, Dialog…"
        searchSource={searchSource}
        value={value}
        onChange={(item) => {
          setValue(item);
          const href = item?.auxiliaryData?.href;
          if (href) router.push(href as Parameters<typeof router.push>[0]);
        }}
        minQueryLength={1}
        debounceMs={0}
        maxMenuItems={12}
        width="100%"
        size="md"
        emptySearchResultsText="No matching kit pages."
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
