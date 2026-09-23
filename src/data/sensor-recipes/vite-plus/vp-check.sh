#!/usr/bin/env bash
# .koi/sensors/10-vp-check.sh — format + lint + types. No --fix.
set -euo pipefail

command -v vp >/dev/null 2>&1 || { echo "vp not on PATH" >&2; exit 1; }
vp check
