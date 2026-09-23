import { test } from "bun:test";
import { RECIPES } from "./recipes";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const SENSOR_IDS = [
  "rust-cargo-fmt",
  "rust-cargo-clippy",
  "rust-cargo-test",
  "rust-cargo-llvm-cov",
  "rust-cargo-audit",
  "node-package-manager-present",
  "node-eslint",
  "node-typecheck",
  "node-build",
  "node-test",
  "node-vitest",
  "node-vitest-coverage",
  "node-vp-check",
  "node-vp-test",
  "node-vp-coverage",
  "node-vp-build",
  "node-playwright",
  "node-playwright-smoke",
  "node-npm-audit",
  "node-pnpm-audit",
  "python-ruff",
  "python-mypy",
  "python-pytest",
  "python-pytest-cov",
  "go-fmt",
  "go-vet",
  "go-test",
  "go-test-cover",
  "docs-markdown-links",
  "docs-astro-check",
] as const;

const SANDBOX_IDS = (["rust", "node"] as const).flatMap((stack) =>
  (["docker", "apple"] as const).flatMap((backend) =>
    (["opencode", "claude", "cursor"] as const).map(
      (agent) => `sandbox-${stack}-${backend}-${agent}`,
    )
  )
);

test("recipe IDs stay unique and stable", () => {
  const ids = RECIPES.map((recipe) => recipe.id);
  const expected = [...SENSOR_IDS, ...SANDBOX_IDS];

  assert(ids.length === 42, `expected 42 recipes, received ${ids.length}`);
  assert(new Set(ids).size === ids.length, "recipe IDs must be unique");
  assert(
    JSON.stringify(ids) === JSON.stringify(expected),
    "recipe IDs or their canonical order changed",
  );
});

test("every recipe carries complete operational metadata", () => {
  for (const recipe of RECIPES) {
    assert(
      recipe.target.startsWith(".koi/"),
      `${recipe.id} has a non-project-home target`,
    );
    assert(recipe.outcome.trim().length > 0, `${recipe.id} has no outcome`);
    assert(recipe.requirements.length > 0, `${recipe.id} has no requirements`);
    assert(recipe.steps.length > 0, `${recipe.id} has no next command`);
    assert(
      recipe.steps.every((step) => step.label.trim() && step.command.trim()),
      `${recipe.id} has an incomplete command step`,
    );

    if (recipe.kind === "sensor") {
      assert(
        recipe.files.length === 1,
        `${recipe.id} must contain one atomic sensor`,
      );
      assert(
        recipe.steps[0].command === `bash ${recipe.target}`,
        `${recipe.id} must smoke-run its project-home target`,
      );
    } else {
      assert(
        recipe.files.length === 2,
        `${recipe.id} must contain a sandbox pair`,
      );
      assert(
        recipe.files.some((file) => file.label === "sandbox.yml"),
        `${recipe.id} is missing sandbox.yml`,
      );
      assert(
        recipe.files.some((file) => file.label === "Dockerfile.sandbox"),
        `${recipe.id} is missing Dockerfile.sandbox`,
      );
      assert(
        recipe.steps.at(-1)?.command === "koi doctor --probe",
        `${recipe.id} must end with the in-sandbox probe`,
      );
    }
  }
});

import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

function walkFiles(directory: string, prefix = ""): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(path, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }
  return files.sort();
}

test("sandbox registry covers every source file", () => {
  const root = fileURLToPath(new URL("./sandbox-recipes/", import.meta.url)).replace(
    /\/$/,
    "",
  );
  const sourcePaths = walkFiles(root);
  const registryPaths = [
    ...new Set(
      RECIPES.filter((recipe) => recipe.kind === "sandbox").flatMap((recipe) =>
        recipe.files.map((file) => file.path)
      ),
    ),
  ].sort();

  assert(
    JSON.stringify(registryPaths) === JSON.stringify(sourcePaths),
    "sandbox registry paths do not exactly match the source tree",
  );
});
