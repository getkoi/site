#!/usr/bin/env bash
# .koi/sensors/40-cargo-llvm-cov-fail-under.sh — instrumented tests + line coverage floor.
set -euo pipefail

LINES="${CARGO_LLVM_COV_LINES:-80}"
OUTPUT="${CARGO_LLVM_COV_OUTPUT:-coverage/lcov.info}"

mkdir -p "$(dirname "${OUTPUT}")"

cargo llvm-cov --lcov --output-path "${OUTPUT}" --fail-under-lines "${LINES}"
