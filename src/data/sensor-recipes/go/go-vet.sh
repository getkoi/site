#!/usr/bin/env bash
# .koi/sensors/20-go-vet.sh
set -euo pipefail

go vet ./...
