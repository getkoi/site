import { DocsNavTree } from "./DocsNavTree";
import type { DocsNavData } from "./nav-types";

function DocsSidebarTree({ current, sections, overviewHref, ariaLabel, flat }: DocsNavData) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-auto" data-docs-nav-scroll>
        <DocsNavTree current={current} sections={sections} overviewHref={overviewHref} ariaLabel={ariaLabel} flat={flat} />
      </div>
    </div>
  );
}

export default function DocsSidebar(props: DocsNavData) {
  return <DocsSidebarTree {...props} />;
}
