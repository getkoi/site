#!/usr/bin/env bash
# .koi/sensors/20-typecheck.sh
set -euo pipefail

if command -v pnpm >/dev/null 2>&1 && [[ -f pnpm-lock.yaml ]]; then
  pnpm exec tsc --noEmit
elif command -v bun >/dev/null 2>&1 && [[ -f bun.lockb || -f bun.lock ]]; then
  bunx tsc --noEmit
else
  npx tsc --noEmit
fi
