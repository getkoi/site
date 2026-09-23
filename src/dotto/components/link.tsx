"use client";

import type { ComponentProps } from "react";
import { AppLink } from "@/components/AppLink";

export function Link({ href, ...props }: ComponentProps<"a">) {
  if (!href) return <a {...props} />;
  return <AppLink href={href} {...props} />;
}
