#!/bin/bash
# Prepara las sesiones de Claude Code en la nube: instala Playwright (lo usan los bots y la huella) y apunta al
# Chromium que ya trae el contenedor, porque ahí no se pueden bajar navegadores.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-audit --no-fund

if [ -x /opt/pw-browsers/chromium ]; then
  echo 'export PW_CHROMIUM=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi
