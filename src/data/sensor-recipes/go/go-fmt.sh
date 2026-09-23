#!/usr/bin/env bash
# .koi/sensors/10-go-fmt.sh
set -euo pipefail

test -z "$(gofmt -l .)"
