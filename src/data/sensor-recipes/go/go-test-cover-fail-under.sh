#!/usr/bin/env bash
# .koi/sensors/40-go-test-cover-fail-under.sh — go test coverage with a configurable floor.
set -euo pipefail

MIN="${GO_COVER_MIN:-80}"
PROFILE="${GO_COVER_PROFILE:-coverage.out}"

go test ./... -coverprofile="${PROFILE}"

total_line="$(go tool cover -func="${PROFILE}" | awk '/^total:/ { gsub(/%/, "", $3); print $3 }')"
if [[ -z "${total_line}" ]]; then
  echo "Could not parse total coverage from ${PROFILE}." >&2
  exit 1
fi

awk -v actual="${total_line}" -v min="${MIN}" 'BEGIN { if (actual + 0 < min + 0) exit 1 }' \
  || {
    echo "coverage ${total_line}% < ${MIN}%" >&2
    exit 1
  }

echo "coverage ${total_line}% >= ${MIN}%"
