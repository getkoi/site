import fs from "node:fs";
import path from "node:path";

type Props = {
  path: string;
  /** Which recipe collection to read from. */
  root?: "sensors" | "sandboxes";
  /** Language hint for the code block. */
  lang?: string;
  /** User-facing destination used by the copy button label. */
  targetPath?: string;
};

function recipeSource(root: "sensors" | "sandboxes", recipePath: string): string {
  const collection = root === "sandboxes" ? "sandbox-recipes" : "sensor-recipes";
  const file = path.join(process.cwd(), "src/data", collection, recipePath);
  return fs.readFileSync(file, "utf8").trimEnd();
}

export default function RecipeCode({
  path: recipePath,
  root = "sensors",
  targetPath = recipePath,
}: Props) {
  const source = recipeSource(root, recipePath);

  return (
    <figure className="code-frame recipe-code" data-slot="code-block" data-recipe={recipePath}>
      <button
        type="button"
        className="copy"
        data-slot="copy-button"
        data-size="sm"
        data-surface="frame"
        aria-label={`Copy ${targetPath}`}
      >
        copy
      </button>
      <pre>
        <code>{source}</code>
      </pre>
    </figure>
  );
}
