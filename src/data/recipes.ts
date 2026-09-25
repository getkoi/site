/** Copy-ready recipe registry for the /yokai/recipes surface. */

export interface RecipeFile {
  /** Path inside the kind's recipe root (src/data/sensor-recipes or src/data/sandbox-recipes). */
  path: string;
  /** Shiki language for the code block. */
  lang: string;
  /** Label shown above the block (the on-disk target filename). */
  label: string;
}

export const RECIPE_STACKS = ["rust", "node", "python", "go", "docs"] as const;
export type RecipeStack = (typeof RECIPE_STACKS)[number];

export interface RecipeStep {
  label: string;
  command: string;
}

export interface Recipe {
  /** Anchor slug. */
  id: string;
  kind: "sensor" | "sandbox";
  stack: RecipeStack;
  /** Sandbox only. */
  launcher?: "docker" | "apple";
  /** Sandbox only — the coding agent baked into the image. */
  agent?: "opencode" | "claude" | "cursor";
  title: string;
  summary: string;
  /** Where the recipe lands in project home, e.g. .koi/sensors/20-cargo-clippy.sh. */
  target: string;
  /** What a passing sensor proves, or what a sandbox pair provides. */
  outcome: string;
  /** Conditions that must already be true before this artifact is useful. */
  requirements: readonly string[];
  /** Commands to run after the files land in project home. */
  steps: readonly RecipeStep[];
  files: RecipeFile[];
}

const SANDBOX_STACKS = [
  {
    id: "rust" as const,
    label: "Rust",
    bases: {
      docker:
        "Docker Sandboxes template base + rustup toolchain, clippy/fmt, cargo-llvm-cov.",
      apple:
        "rust:1-bookworm base + coverage tools. Final USER stays root; 8g / 4 cpus VM sizing.",
    },
  },
  {
    id: "node" as const,
    label: "Node",
    bases: {
      docker:
        "Docker Sandboxes template base + Node/npm. DevDependencies via npm ci at setup.",
      apple:
        "node:22-bookworm base. Final USER stays root; 8g / 4 cpus VM sizing.",
    },
  },
];

const SANDBOX_AGENTS = [
  {
    id: "opencode" as const,
    note: "opencode baked via npm (opencode-ai@latest).",
    requirement:
      "Authenticate opencode for the environment where the sandbox runs.",
  },
  {
    id: "claude" as const,
    note: "claude-code CLI baked via npm on the node/npx ACP adapter.",
    requirement:
      "Authenticate Claude Code for the environment where the sandbox runs.",
  },
  {
    id: "cursor" as const,
    note:
      "cursor-agent placeholder probe — bake it yourself; no reliable headless Linux install.",
    requirement:
      "Supply cursor-agent on PATH yourself; the provided Dockerfile intentionally fails until you do.",
  },
];

/** Full stack × launcher × agent matrix; cards differ only in the agent RUN block. */
function sandboxRecipes(): Recipe[] {
  return SANDBOX_STACKS.flatMap((stack) =>
    (["docker", "apple"] as const).flatMap((launcher) =>
      SANDBOX_AGENTS.map((agent) => ({
        id: `sandbox-${stack.id}-${launcher}-${agent.id}`,
        kind: "sandbox" as const,
        stack: stack.id,
        launcher,
        agent: agent.id,
        title: `${stack.label} sandbox — ${launcher} · ${agent.id}`,
        summary: `${stack.bases[launcher]} ${agent.note}`,
        target: ".koi/yokai.yml + .koi/Dockerfile.sandbox",
        outcome:
          `A repo-owned ${stack.label} Linux image configured for ${agent.id} on the ${launcher} sandbox backend.`,
        requirements: [
          launcher === "docker"
            ? "Docker Desktop with a responding daemon, plus the sbx CLI and login."
            : "macOS 26 on Apple silicon, with Apple Container installed and its system running.",
          "Linux koi and yokai harness artifacts produced by ./install.sh.",
          agent.requirement,
        ],
        steps: [
          {
            label: "build image",
            command: `${
              launcher === "docker" ? "docker" : "container"
            } build -f .koi/Dockerfile.sandbox -t koi-myproj-sandbox .`,
          },
          { label: "probe sandbox", command: "yokai doctor --probe" },
        ],
        files: [
          {
            path: `${stack.id}/${launcher}/yokai.yml`,
            lang: "yaml",
            label: "yokai.yml",
          },
          {
            path: `${stack.id}/${launcher}/${agent.id}/Dockerfile.sandbox`,
            lang: "dockerfile",
            label: "Dockerfile.sandbox",
          },
        ],
      }))
    )
  );
}

const SENSOR_BASE_REQUIREMENTS: Record<RecipeStack, string> = {
  rust:
    "A Rust project with Cargo and its locked dependencies already available.",
  node:
    "A Node project with its locked dependencies and package manager already available.",
  python:
    "A Python project with its environment and locked dependencies already available.",
  go: "A Go module with its dependencies already available.",
  docs:
    "A docs project with its declared toolchain and dependencies already available.",
};

function sensorRequirements(stack: RecipeStack, path: string): string[] {
  const requirements = [SENSOR_BASE_REQUIREMENTS[stack]];

  if (path.includes("cargo-fmt")) {
    requirements.push("The rustfmt component installed.");
  }
  if (path.includes("cargo-clippy")) {
    requirements.push("The clippy component installed.");
  }
  if (path.includes("cargo-llvm-cov")) {
    requirements.push("cargo-llvm-cov installed on PATH.");
  }
  if (path.includes("cargo-audit")) {
    requirements.push(
      "cargo-audit installed, Cargo.lock present, and its advisory database seeded.",
    );
  }
  if (path.includes("package-manager-present")) {
    requirements.push("At least one of pnpm, bun, or npm available on PATH.");
  }
  if (path.includes("eslint")) {
    requirements.push("ESLint available through the detected package manager.");
  }
  if (path.includes("typecheck")) {
    requirements.push(
      "TypeScript available through the detected package manager.",
    );
  }
  if (path.endsWith("javascript/build.sh")) {
    requirements.push("A package.json build script.");
  }
  if (path.endsWith("javascript/test.sh")) {
    requirements.push("A package.json test script.");
  }
  if (path.includes("vitest")) {
    requirements.push("Vitest available through the detected package manager.");
  }
  if (path.includes("vite-plus")) {
    requirements.push("The vp executable available on PATH.");
  }
  if (path.includes("playwright")) {
    requirements.push(
      "Playwright and its browser binaries installed before the gate runs.",
    );
  }
  if (path.includes("npm-audit")) {
    requirements.push(
      "npm with a lockfile and a locally seeded advisory cache.",
    );
  }
  if (path.includes("pnpm-audit")) {
    requirements.push("pnpm with an offline advisory cache.");
  }
  if (path.includes("ruff")) requirements.push("ruff installed on PATH.");
  if (path.includes("mypy")) {
    requirements.push("mypy installed and configured for the project.");
  }
  if (path.includes("pytest")) {
    requirements.push("pytest installed in the project environment.");
  }
  if (path.includes("pytest-cov")) {
    requirements.push("pytest-cov installed in the project environment.");
  }
  if (path.includes("markdown-link")) {
    requirements.push("mlc available on PATH.");
  }
  if (path.includes("astro-check")) {
    requirements.push(
      "An Astro project with the astro check command available.",
    );
  }

  return requirements;
}

function sensor(
  id: string,
  stack: RecipeStack,
  title: string,
  summary: string,
  target: string,
  path: string,
): Recipe {
  const filename = target.replace(".koi/sensors/", "");
  return {
    id,
    kind: "sensor",
    stack,
    title,
    summary,
    target,
    outcome: summary,
    requirements: sensorRequirements(stack, path),
    steps: [{ label: "smoke-run", command: `bash ${target}` }],
    files: [{ path, lang: "bash", label: filename }],
  };
}

export const RECIPES: Recipe[] = [
  sensor(
    "rust-cargo-fmt",
    "rust",
    "cargo fmt — check",
    "Format gate. Fails when any file drifts from rustfmt output.",
    ".koi/sensors/10-cargo-fmt.sh",
    "rust/cargo-fmt.sh",
  ),
  sensor(
    "rust-cargo-clippy",
    "rust",
    "cargo clippy — deny warnings",
    "Lint gate across all targets and features; any warning is red.",
    ".koi/sensors/20-cargo-clippy.sh",
    "rust/cargo-clippy.sh",
  ),
  sensor(
    "rust-cargo-test",
    "rust",
    "cargo test — all features",
    "Unit and integration tests with every feature enabled.",
    ".koi/sensors/30-cargo-test.sh",
    "rust/cargo-test.sh",
  ),
  sensor(
    "rust-cargo-llvm-cov",
    "rust",
    "cargo llvm-cov — coverage floor",
    "Native --fail-under-lines gate; exits 1 below the floor, no parser scripts.",
    ".koi/sensors/40-cargo-llvm-cov-fail-under.sh",
    "rust/cargo-llvm-cov-fail-under.sh",
  ),
  sensor(
    "rust-cargo-audit",
    "rust",
    "cargo audit — local DB",
    "Rust advisories against a seeded local DB. --no-fetch; never upgrades lockfiles.",
    ".koi/sensors/51-cargo-audit-check.sh",
    "security/cargo-audit-check.sh",
  ),

  sensor(
    "node-package-manager-present",
    "node",
    "Package manager present",
    "Asserts pnpm / bun / npm is on PATH. Never installs inside the gate.",
    ".koi/sensors/05-package-manager-present.sh",
    "javascript/package-manager-present.sh",
  ),
  sensor(
    "node-eslint",
    "node",
    "ESLint",
    "Lint via the detected package manager (pnpm / bun / npm). No --fix.",
    ".koi/sensors/10-eslint.sh",
    "javascript/eslint.sh",
  ),
  sensor(
    "node-typecheck",
    "node",
    "TypeScript — noEmit",
    "Type gate: tsc --noEmit through the detected package manager.",
    ".koi/sensors/20-typecheck.sh",
    "javascript/typecheck.sh",
  ),
  sensor(
    "node-build",
    "node",
    "Build",
    "Production build. Split from test so a compile failure names 30-build.",
    ".koi/sensors/30-build.sh",
    "javascript/build.sh",
  ),
  sensor(
    "node-test",
    "node",
    "Unit tests",
    "npm test, serial. Swap npm for pnpm/bun with the same detection pattern.",
    ".koi/sensors/40-test.sh",
    "javascript/test.sh",
  ),
  sensor(
    "node-vitest",
    "node",
    "Vitest run",
    "vitest run (never bare vitest) so watch mode cannot hang the driver.",
    ".koi/sensors/40-vitest.sh",
    "vitest-vite/vitest-run.sh",
  ),
  sensor(
    "node-vitest-coverage",
    "node",
    "Vitest — coverage thresholds",
    "Native coverage.thresholds fail the run below the floor; no post-hoc parser.",
    ".koi/sensors/45-vitest-coverage-threshold.sh",
    "vitest-vite/vitest-coverage-threshold.sh",
  ),
  sensor(
    "node-vp-check",
    "node",
    "Vite+ check",
    "vp check: format, lint, and types. No --fix.",
    ".koi/sensors/10-vp-check.sh",
    "vite-plus/vp-check.sh",
  ),
  sensor(
    "node-vp-test",
    "node",
    "Vite+ test",
    "vp test in non-watch mode.",
    ".koi/sensors/40-vp-test.sh",
    "vite-plus/vp-test.sh",
  ),
  sensor(
    "node-vp-coverage",
    "node",
    "Vite+ test + coverage",
    "vp test run --coverage. Thresholds live in vite.config.ts.",
    ".koi/sensors/45-vp-test-coverage.sh",
    "vite-plus/vp-test-coverage.sh",
  ),
  sensor(
    "node-vp-build",
    "node",
    "Vite+ build",
    "vp build. Split from test so a compile failure names 50-vp-build.",
    ".koi/sensors/50-vp-build.sh",
    "vite-plus/vp-build.sh",
  ),
  sensor(
    "node-playwright",
    "node",
    "Playwright — full suite",
    "playwright test via the detected package manager. Browsers belong in setup.",
    ".koi/sensors/60-playwright.sh",
    "playwright/playwright-test.sh",
  ),
  sensor(
    "node-playwright-smoke",
    "node",
    "Playwright — smoke",
    "Tagged @smoke subset. Keep E2E after unit tests in filename order.",
    ".koi/sensors/61-playwright-smoke.sh",
    "playwright/playwright-smoke.sh",
  ),
  sensor(
    "node-npm-audit",
    "node",
    "npm audit — offline",
    "Advisories from a locally cached DB. Seed with an online npm audit during setup.",
    ".koi/sensors/50-npm-audit-offline.sh",
    "security/npm-audit-offline.sh",
  ),
  sensor(
    "node-pnpm-audit",
    "node",
    "pnpm audit — offline",
    "pnpm audit --offline. Seed advisories during image build.",
    ".koi/sensors/52-pnpm-audit-offline.sh",
    "security/pnpm-audit-offline.sh",
  ),

  sensor(
    "python-ruff",
    "python",
    "ruff check",
    "Lint only. Do not pass --fix.",
    ".koi/sensors/10-ruff-check.sh",
    "python/ruff-check.sh",
  ),
  sensor(
    "python-mypy",
    "python",
    "mypy",
    "Type-check at the project's configured strictness. Tools come from setup, not pip install here.",
    ".koi/sensors/20-mypy.sh",
    "python/mypy.sh",
  ),
  sensor(
    "python-pytest",
    "python",
    "pytest",
    "Tests without a coverage floor. Split from the coverage sensor so a failure names 30-pytest.",
    ".koi/sensors/30-pytest.sh",
    "python/pytest.sh",
  ),
  sensor(
    "python-pytest-cov",
    "python",
    "pytest — coverage floor",
    "pytest with native --cov-fail-under. Default floor 80 via PYTEST_COV_FAIL_UNDER.",
    ".koi/sensors/40-pytest-cov-fail-under.sh",
    "python/pytest-cov-fail-under.sh",
  ),

  sensor(
    "go-fmt",
    "go",
    "gofmt",
    "Fails when any file would be rewritten by gofmt.",
    ".koi/sensors/10-go-fmt.sh",
    "go/go-fmt.sh",
  ),
  sensor(
    "go-vet",
    "go",
    "go vet",
    "Static analysis across the module. Modules download during setup, not here.",
    ".koi/sensors/20-go-vet.sh",
    "go/go-vet.sh",
  ),
  sensor(
    "go-test",
    "go",
    "go test",
    "All packages, no coverage floor. Split from the coverage sensor.",
    ".koi/sensors/30-go-test.sh",
    "go/go-test.sh",
  ),
  sensor(
    "go-test-cover",
    "go",
    "go test — coverage floor",
    "go tool cover with a configurable floor (GO_COVER_MIN, default 80).",
    ".koi/sensors/40-go-test-cover-fail-under.sh",
    "go/go-test-cover-fail-under.sh",
  ),

  sensor(
    "docs-markdown-links",
    "docs",
    "Markdown links — offline",
    "Local .md links via mlc --offline. Remote URLs are skipped.",
    ".koi/sensors/30-markdown-link-check.sh",
    "docs-static/markdown-link-check.sh",
  ),
  sensor(
    "docs-astro-check",
    "docs",
    "astro check",
    "Astro content collections and frontmatter. Not a production build.",
    ".koi/sensors/35-astro-check.sh",
    "docs-static/astro-check.sh",
  ),

  ...sandboxRecipes(),
];
