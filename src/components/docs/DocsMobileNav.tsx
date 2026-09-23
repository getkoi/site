"use client";

import { useState } from "react";
import { BottomSheet } from "@astryxdesign/core/BottomSheet";
import { Button } from "@astryxdesign/core/Button";
import { MenuIcon } from "../../icons/docs/pixels";
import DocsSearch from "./DocsSearch";
import { DocsNavTree } from "./DocsNavTree";
import type { DocsNavData } from "./nav-types";

function DocsMobileNavSheet({ current, currentLabel, sections }: DocsNavData) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="docs-mobile-trigger"
        label={`${currentLabel} · menu`}
        variant="ghost"
        width="100%"
        icon={<MenuIcon className="size-4 shrink-0" />}
        onClick={() => setOpen(true)}
      />
      <BottomSheet isOpen={open} onOpenChange={setOpen} label="Documentation" height="tall">
        <div className="flex flex-col gap-4 px-1 pb-6">
          <DocsSearch />
          <DocsNavTree current={current} sections={sections} />
        </div>
      </BottomSheet>
    </>
  );
}

export default function DocsMobileNav(props: DocsNavData) {
  return <DocsMobileNavSheet {...props} />;
}
