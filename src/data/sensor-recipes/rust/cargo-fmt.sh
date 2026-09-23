#!/usr/bin/env bash
# .koi/sensors/10-cargo-fmt.sh
set -euo pipefail

cargo fmt --all -- --check
