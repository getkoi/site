#!/usr/bin/env bash
# .koi/sensors/10-ruff-check.sh — lint only; never --fix.
set -euo pipefail

ruff check .
