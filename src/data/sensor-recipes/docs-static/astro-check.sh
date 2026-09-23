#!/usr/bin/env bash
# .koi/sensors/35-astro-check.sh — Astro project integrity (types + content, no build mutation).
set -euo pipefail

if [[ ! -f astro.config.mjs && ! -f astro.config.ts ]]; then
  echo "No astro.config.{mjs,ts} at repo root." >&2
  exit 1
fi

if command -v pnpm >/dev/null 2>&1 && [[ -f pnpm-lock.yaml ]]; then
  pnpm exec astro check
elif command -v bun >/dev/null 2>&1 && [[ -f bun.lockb || -f bun.lock ]]; then
  bunx astro check
else
  npx astro check
fi
