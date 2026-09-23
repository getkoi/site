#!/usr/bin/env bash
# .koi/sensors/40-pytest-cov-fail-under.sh — pytest with coverage floor (native --cov-fail-under).
set -euo pipefail

MIN="${PYTEST_COV_FAIL_UNDER:-80}"
TARGET="${PYTEST_COV_TARGET:-.}"

if command -v pytest >/dev/null 2>&1; then
  PY=(pytest)
elif command -v python3 >/dev/null 2>&1; then
  PY=(python3 -m pytest)
else
  echo "pytest not on PATH." >&2
  exit 1
fi

"${PY[@]}" "${TARGET}" --cov="${PYTEST_COV_SOURCE:-.}" --cov-report=term-missing --cov-fail-under="${MIN}"
