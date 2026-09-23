export type Surface = "koi" | "junji" | "yokai" | "docs" | "recipes";

export const SURFACE_ORDER: Surface[] = [
  "koi",
  "junji",
  "yokai",
  "docs",
  "recipes",
];

export function surfaceFromPath(pathname: string): Surface {
  if (pathname === "/junji" || pathname.startsWith("/junji/")) return "junji";
  if (pathname.startsWith("/yokai")) return "yokai";
  if (pathname.startsWith("/blog")) return "docs";
  if (pathname.startsWith("/docs")) return "docs";
  if (pathname.startsWith("/dotto")) return "docs";
  if (pathname.startsWith("/recipes")) return "recipes";
  if (pathname === "/" || pathname === "") return "koi";
  return "koi";
}

export function stageClassFromPath(pathname: string): string {
  if (pathname === "/junji" || pathname.startsWith("/junji/")) return "junji-page";
  if (pathname.startsWith("/yokai")) return "yokai-page";
  if (pathname.startsWith("/recipes")) return "recipes-page";
  if (pathname.startsWith("/blog")) return "blog-page";
  if (pathname.startsWith("/dotto")) return "dotto-gallery";
  if (pathname.startsWith("/docs")) return "docs-page";
  return "koi-page";
}
