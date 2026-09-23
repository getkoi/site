#!/usr/bin/env bash
# .koi/sensors/50-vp-build.sh
set -euo pipefail

command -v vp >/dev/null 2>&1 || { echo "vp not on PATH" >&2; exit 1; }
vp build
