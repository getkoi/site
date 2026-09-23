#!/usr/bin/env bash
# .koi/sensors/40-vitest.sh
set -euo pipefail

if command -v pnpm >/dev/null 2>&1 && [[ -f pnpm-lock.yaml ]]; then
  pnpm exec vitest run
elif command -v bun >/dev/null 2>&1 && [[ -f bun.lockb || -f bun.lock ]]; then
  bunx vitest run
else
  npx vitest run
fi
