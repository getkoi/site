#!/usr/bin/env bash
# .koi/sensors/61-playwright-smoke.sh — tagged smoke subset.
set -euo pipefail

if command -v pnpm >/dev/null 2>&1 && [[ -f pnpm-lock.yaml ]]; then
  pnpm exec playwright test --grep @smoke
elif command -v bun >/dev/null 2>&1 && [[ -f bun.lockb || -f bun.lock ]]; then
  bunx playwright test --grep @smoke
else
  npx playwright test --grep @smoke
fi
