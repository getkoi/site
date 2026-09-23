#!/usr/bin/env bash
# .koi/sensors/30-cargo-test.sh
set -euo pipefail

cargo test --all-features
