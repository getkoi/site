#!/usr/bin/env bash
# .koi/sensors/45-vp-test-coverage.sh — Vite+ test run with coverage (thresholds live in vite.config.ts).
set -euo pipefail

if ! command -v vp >/dev/null 2>&1; then
  echo "vp (Vite+) not on PATH — bake it into the sandbox image during setup." >&2
  exit 1
fi

# Thresholds belong in vite.config.ts under test.coverage.thresholds (Vitest semantics).
# Tune VITEST_COVERAGE_* env vars if your project reads them in config; this sensor only runs the gate.
vp test run --coverage
