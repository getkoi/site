#!/usr/bin/env bash
# .koi/sensors/50-npm-audit-offline.sh — audit against a locally cached advisory DB (no network at run).
set -euo pipefail

LEVEL="${NPM_AUDIT_LEVEL:-moderate}"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not on PATH." >&2
  exit 1
fi

if [[ ! -f package-lock.json && ! -f npm-shrinkwrap.json ]]; then
  echo "No npm lockfile — audit offline needs a resolved dependency tree." >&2
  exit 1
fi

# Prerequisite (outside the sensor): run `npm audit` once with network to populate ~/.npm/_cacache advisories.
npm audit --audit-level="${LEVEL}" --offline
