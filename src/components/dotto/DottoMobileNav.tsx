"use client";

import { useState } from "react";
import { BottomSheet } from "@astryxdesign/core/BottomSheet";
import { Button } from "@astryxdesign/core/Button";
import { DocsNavTree } from "@/components/docs/DocsNavTree";
import type { DocsNavData } from "@/components/docs/nav-types";
import { MenuIcon } from "@/icons/docs/pixels";
import { DottoKitSearch } from "./DottoKitSearch";

function DottoMobileNavSheet({ current, currentLabel, sections }: DocsNavData) {
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
      <BottomSheet isOpen={open} onOpenChange={setOpen} label="dotto" height="tall">
        <div className="flex flex-col gap-4 px-1 pb-6">
          <DottoKitSearch />
          <DocsNavTree
            current={current}
            sections={sections}
            tree="dotto"
            overviewHref="/dotto"
            overviewLabel="dotto"
            ariaLabel="dotto"
            defaultOpen={current === "home"}
          />
        </div>
      </BottomSheet>
    </>
  );
}

export function DottoMobileNav(props: DocsNavData) {
  return <DottoMobileNavSheet {...props} />;
}
