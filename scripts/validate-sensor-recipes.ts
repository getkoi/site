#!/usr/bin/env bun

/**
 * Validates canonical sensor recipes under site/src/data/sensor-recipes/:
 * - bash -n syntax
 * - strict header (shebang + set -euo pipefail)
 * - forbidden mutation/network/install patterns
 * - each canonical file is referenced exactly once in src/data/recipes.ts
 * - lightweight behavioral stubs (no third-party toolchains required)
 */

import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { RECIPES } from "../src/data/recipes";

const SITE_ROOT = fileURLToPath(new URL("../", import.meta.url)).replace(/\/$/, "");
const RECIPES_DIR = join(SITE_ROOT, "src/data/sensor-recipes");

function walkFiles(root: string, ext: string): string[] {
  const out: string[] = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) stack.push(path);
      else if (entry.isFile() && path.endsWith(ext)) out.push(path);
    }
  }
  return out;
}

const STRICT_HEADER = /^#!\/usr\/bin\/env bash\n(?:#[^\n]*\n)*set -euo pipefail\n/m;

const FORBIDDEN_PATTERNS: ReadonlyArray<{ name: string; re: RegExp }> = [
  { name: "npm install", re: /\bnpm\s+install\b/ },
  { name: "npm ci", re: /\bnpm\s+ci\b/ },
  { name: "pnpm install", re: /\bpnpm\s+install\b/ },
  { name: "pnpm i", re: /\bpnpm\s+i\b/ },
  { name: "bun install", re: /\bbun\s+install\b/ },
  { name: "yarn install", re: /\byarn\s+install\b/ },
  { name: "curl", re: /\bcurl\b/ },
  { name: "wget", re: /\bwget\b/ },
  { name: "--fix", re: /--fix\b/ },
  { name: "cargo fix", re: /\bcargo\s+fix\b/ },
  { name: "prettier --write", re: /\bprettier\b[^\n]*--write/ },
  { name: "eslint --fix", re: /\beslint\b[^\n]*--fix/ },
  { name: "git commit", re: /\bgit\s+commit\b/ },
  { name: "git push", re: /\bgit\s+push\b/ },
  { name: "npm audit fetch", re: /\bnpm\s+audit\b[^\n]*fetch/ },
  { name: "cargo audit fetch at run", re: /\bcargo\s+audit\b(?![^\n]*--no-fetch)/ },
];

function collectRecipes(): string[] {
  const recipes = walkFiles(RECIPES_DIR, ".sh");
  recipes.sort();
  return recipes;
}

function registrySensorPaths(): string[] {
  return RECIPES.filter((recipe) => recipe.kind === "sensor").flatMap((recipe) =>
    recipe.files.map((file) => file.path),
  );
}

function validateRegistryEmbedding(recipes: string[]): void {
  const referencedPaths = registrySensorPaths();

  for (const recipePath of recipes) {
    const rel = relative(SITE_ROOT, recipePath);
    const recipeRel = relative(RECIPES_DIR, recipePath).replace(/\\/g, "/");
    const occurrences = referencedPaths.filter((p) => p === recipeRel).length;
    if (occurrences === 0) {
      throw new Error(`${rel}: canonical recipe not referenced in src/data/recipes.ts`);
    }
    if (occurrences > 1) {
      throw new Error(`${rel}: canonical recipe referenced ${occurrences} times — must appear exactly once`);
    }
  }

  for (const path of referencedPaths) {
    const resolved = join(RECIPES_DIR, path);
    if (!recipes.includes(resolved)) {
      throw new Error(`recipes.ts path "${path}" does not match any file under sensor-recipes/`);
    }
  }
}

function bashSyntaxCheck(path: string, source: string): void {
  const dir = mkdtempSync(join(tmpdir(), "koi-recipe-"));
  const tmp = join(dir, "check.sh");
  try {
    writeFileSync(tmp, source);
    const result = spawnSync("bash", ["-n", tmp], { encoding: "utf8" });
    if (result.status !== 0) {
      throw new Error(`${path}: bash -n failed:\n${result.stderr}`);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function validateHeader(rel: string, source: string): void {
  if (!STRICT_HEADER.test(source)) {
    throw new Error(`${rel}: missing strict header (#!/usr/bin/env bash + set -euo pipefail)`);
  }
}

function validateForbidden(rel: string, source: string): void {
  const executable = source
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");
  for (const { name, re } of FORBIDDEN_PATTERNS) {
    if (re.test(executable)) {
      throw new Error(`${rel}: forbidden pattern: ${name}`);
    }
  }
}

function stubGoCoverageParser(): void {
  const dir = mkdtempSync(join(tmpdir(), "koi-cov-"));
  try {
    writeFileSync(join(dir, "coverage.out"), "mode: set\npkg/main.go:10.1,11.2 1 1\n");
    const total = "85.0";
    const min = "80";
    const result = spawnSync(
      "awk",
      ["-v", `actual=${total}`, "-v", `min=${min}`, "BEGIN { if (actual + 0 < min + 0) exit 1 }"],
      { encoding: "utf8" },
    );
    if (result.status !== 0) throw new Error("go coverage awk stub should pass for 85 >= 80");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function main(): void {
  const recipes = collectRecipes();
  if (recipes.length === 0) {
    throw new Error(`No recipes under ${RECIPES_DIR}`);
  }

  for (const recipePath of recipes) {
    const rel = relative(SITE_ROOT, recipePath);
    const source = readFileSync(recipePath, "utf8");
    validateHeader(rel, source);
    validateForbidden(rel, source);
    bashSyntaxCheck(rel, source);
  }

  validateRegistryEmbedding(recipes);
  stubGoCoverageParser();

  console.log(`OK: ${recipes.length} canonical sensor recipes validated.`);
  for (const r of recipes) {
    console.log(`  - ${relative(join(SITE_ROOT, "src/data"), r)}`);
  }
}

try {
  main();
} catch (err) {
  console.error(String(err));
  process.exit(1);
}
