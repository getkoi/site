#!/usr/bin/env bash
# .koi/sensors/05-package-manager-present.sh — detect npm, pnpm, or bun without installing deps.
set -euo pipefail

if command -v pnpm >/dev/null 2>&1; then
  pnpm --version >/dev/null
  exit 0
fi

if command -v bun >/dev/null 2>&1; then
  bun --version >/dev/null
  exit 0
fi

if command -v npm >/dev/null 2>&1; then
  npm --version >/dev/null
  exit 0
fi

echo "No supported package manager on PATH (pnpm, bun, or npm)." >&2
exit 1
