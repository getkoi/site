import { AppLink } from "@/components/AppLink";
import type { Surface } from "@/lib/surface";

const tabs: Record<Surface, { label: string; href: string }[]> = {
  koi: [
    { label: "Overview", href: "/" },
    { label: "Docs", href: "/koi/docs" },
    { label: "Blog", href: "/blog" },
  ],
  junji: [
    { label: "Overview", href: "/junji" },
    { label: "Docs", href: "/junji/docs" },
  ],
  yokai: [
    { label: "Overview", href: "/yokai" },
    { label: "Docs", href: "/yokai/docs" },
    { label: "Recipes", href: "/yokai/recipes" },
  ],
};

export function SiteTopbar({ pathname, surface }: { pathname: string; surface: Surface }) {
  if (pathname.startsWith("/dotto") || pathname.endsWith(".txt")) return null;

  return (
    <nav className="site-topbar" aria-label={`${surface} sections`}>
      <span className="site-topbar__name">{surface}</span>
      <div className="site-topbar__tabs">
        {tabs[surface].map(({ href, label }) => {
          const current = href === "/"
            ? pathname === "/"
            : href === "/blog"
              ? pathname === "/blog" || pathname.startsWith("/blog/")
              : pathname === href || (href.endsWith("/docs") && pathname.startsWith(`${href}/`));
          return (
            <AppLink key={href} href={href} aria-current={current ? "page" : undefined}>
              {label}
            </AppLink>
          );
        })}
      </div>
    </nav>
  );
}
