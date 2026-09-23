#!/usr/bin/env bash
# .koi/sensors/45-vitest-coverage-threshold.sh — Vitest run with native coverage thresholds (CLI).
set -euo pipefail

LINES="${VITEST_COVERAGE_LINES:-80}"
FUNCTIONS="${VITEST_COVERAGE_FUNCTIONS:-80}"
BRANCHES="${VITEST_COVERAGE_BRANCHES:-80}"
STATEMENTS="${VITEST_COVERAGE_STATEMENTS:-80}"

if command -v pnpm >/dev/null 2>&1 && [[ -f pnpm-lock.yaml ]]; then
  RUNNER=(pnpm exec vitest)
elif command -v bun >/dev/null 2>&1 && [[ -f bun.lockb || -f bun.lock ]]; then
  RUNNER=(bunx vitest)
else
  RUNNER=(npx vitest)
fi

"${RUNNER[@]}" run --coverage \
  --coverage.thresholds.lines="${LINES}" \
  --coverage.thresholds.functions="${FUNCTIONS}" \
  --coverage.thresholds.branches="${BRANCHES}" \
  --coverage.thresholds.statements="${STATEMENTS}"
