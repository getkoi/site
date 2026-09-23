import fs from "node:fs";
import path from "node:path";

export function loadMark(name: string): string {
  return fs.readFileSync(path.join(process.cwd(), "src/assets/marks", name), "utf8");
}
