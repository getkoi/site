import type { DocCrumb } from "@/docs/registry";
import { AppLink } from "@/components/AppLink";

export function DocsBreadcrumbs({ items }: { items: DocCrumb[] }) {
  return (
    <nav data-slot="breadcrumb" aria-label="Breadcrumb">
      <ol data-slot="breadcrumb-list">
        {items.map((item, index) => (
          <li key={`${item.href}-${item.label}`} data-slot="breadcrumb-item">
            {index === items.length - 1 ? (
              <span data-slot="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <AppLink data-slot="breadcrumb-link" href={item.href}>
                {item.label}
              </AppLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
