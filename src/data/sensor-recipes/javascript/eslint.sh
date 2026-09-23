#!/usr/bin/env bash
# .koi/sensors/10-eslint.sh
set -euo pipefail

if command -v pnpm >/dev/null 2>&1 && [[ -f pnpm-lock.yaml ]]; then
  pnpm exec eslint .
elif command -v bun >/dev/null 2>&1 && [[ -f bun.lockb || -f bun.lock ]]; then
  bunx eslint .
else
  npx eslint .
fi
