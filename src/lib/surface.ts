export type Surface = "koi" | "junji" | "yokai";

export const SURFACE_ORDER: Surface[] = [
  "koi",
  "junji",
  "yokai",
];

export function surfaceFromPath(pathname: string): Surface {
  if (pathname === "/junji" || pathname.startsWith("/junji/")) return "junji";
  if (pathname.startsWith("/yokai")) return "yokai";
  if (pathname === "/" || pathname === "") return "koi";
  return "koi";
}

export function stageClassFromPath(pathname: string): string {
  if (pathname.includes("/docs")) return "docs-page";
  if (pathname.startsWith("/yokai/recipes")) return "recipes-page";
  if (pathname.startsWith("/blog")) return "blog-page";
  if (pathname.startsWith("/dotto")) return "dotto-gallery";
  if (pathname === "/junji" || pathname.startsWith("/junji/")) return "junji-page";
  if (pathname.startsWith("/yokai")) return "yokai-page";
  return "koi-page";
}
