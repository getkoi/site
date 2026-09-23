export type DocsNavEntry = {
  id: string;
  href: string;
  navLabel: string;
};

export type DocsNavSectionData = {
  id: string;
  label: string;
  href: string;
  entries: DocsNavEntry[];
};

export type DocsNavData = {
  current: string;
  currentLabel: string;
  sections: DocsNavSectionData[];
  overviewHref?: string;
  ariaLabel?: string;
  flat?: boolean;
};
