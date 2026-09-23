#!/usr/bin/env bash
# .koi/sensors/52-pnpm-audit-offline.sh — audit against a cached advisory DB.
set -euo pipefail

pnpm audit --audit-level moderate --offline
