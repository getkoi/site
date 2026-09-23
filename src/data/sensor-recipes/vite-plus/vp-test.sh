#!/usr/bin/env bash
# .koi/sensors/40-vp-test.sh — non-watch. Do not use `vp test watch` in sensors.
set -euo pipefail

command -v vp >/dev/null 2>&1 || { echo "vp not on PATH" >&2; exit 1; }
vp test
