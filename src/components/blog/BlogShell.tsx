import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/blog.css";

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="blog-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="blog-shell">{children}</div>
      <SiteFooter />
    </>
  );
}
