#!/usr/bin/env bash
# .koi/sensors/60-playwright.sh — full E2E suite. Browsers belong in setup, not here.
set -euo pipefail

if command -v pnpm >/dev/null 2>&1 && [[ -f pnpm-lock.yaml ]]; then
  pnpm exec playwright test
elif command -v bun >/dev/null 2>&1 && [[ -f bun.lockb || -f bun.lock ]]; then
  bunx playwright test
else
  npx playwright test
fi
