"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initSiteLifecycle } from "@/scripts/site-lifecycle";
import { initMotionLifecycle } from "@/scripts/motion";
import { initInteractionLifecycle } from "@/scripts/interactions";

export function SiteEffects() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    initSiteLifecycle();
    initMotionLifecycle();
    initInteractionLifecycle();
  }, []);

  useEffect(() => {
    if (previousPath.current !== null && previousPath.current !== pathname) {
      document.dispatchEvent(new CustomEvent("koi:before-swap"));
    }
    previousPath.current = pathname;
    document.dispatchEvent(new CustomEvent("koi:page-ready"));
  }, [pathname]);

  return null;
}
