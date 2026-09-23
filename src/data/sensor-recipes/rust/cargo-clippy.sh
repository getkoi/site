#!/usr/bin/env bash
# .koi/sensors/20-cargo-clippy.sh
set -euo pipefail

cargo clippy --all-targets --all-features -- -D warnings
