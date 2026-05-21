#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code web sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

echo "Setting up DIY Cure-Time Calculator dev environment..."

# Install pnpm if not available
if ! command -v pnpm &> /dev/null; then
  npm install -g pnpm@10
fi

# Install all dependencies (uses lockfile, idempotent)
pnpm install

# Generate Prisma client (needs to run after install)
pnpm exec prisma generate || true

echo "Session setup complete."
