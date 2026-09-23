#!/usr/bin/env bash
# .koi/sensors/40-test.sh
set -euo pipefail

npm test -- --runInBand
