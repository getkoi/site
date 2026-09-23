#!/usr/bin/env bash
# .koi/sensors/51-cargo-audit-check.sh — cargo-audit using a local advisory DB (no db fetch at run).
set -euo pipefail

if ! command -v cargo-audit >/dev/null 2>&1; then
  echo "cargo-audit not on PATH." >&2
  exit 1
fi

if [[ ! -f Cargo.lock ]]; then
  echo "Cargo.lock missing — generate it during setup, not in the sensor." >&2
  exit 1
fi

# Prerequisite (outside the sensor): run `cargo audit fetch` once with network to seed the local DB.
cargo audit --no-fetch
