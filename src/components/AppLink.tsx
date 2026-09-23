"use client";

import Link from "next/link";
import type { Route } from "next";
import type { ComponentProps } from "react";

type AppLinkProps = ComponentProps<"a"> & { href: string };

function isNativeHref(href: string) {
  return (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href === "/llms.txt" ||
    href === "/llms-full.txt" ||
    href.endsWith("/llms.txt") ||
    href.endsWith("/llms-full.txt")
  );
}

export function AppLink({ href, ...props }: AppLinkProps) {
  if (isNativeHref(href)) {
    return <a href={href} {...props} />;
  }
  return <Link href={href as Route} {...props} />;
}
