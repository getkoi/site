#!/usr/bin/env bash
# .koi/sensors/30-markdown-link-check.sh — verify local markdown links (no network fetches).
set -euo pipefail

GLOB="${MARKDOWN_LINK_GLOB:-**/*.md}"

if command -v mlc >/dev/null 2>&1; then
  mlc --offline --ignore-path node_modules --ignore-path .git "${GLOB}"
  exit 0
fi

echo "Install mlc during setup; this sensor intentionally checks links offline." >&2
exit 1
