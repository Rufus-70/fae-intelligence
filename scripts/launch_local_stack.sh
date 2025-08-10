#!/usr/bin/env bash
set -euo pipefail

# Ports
PORT_DASH=5173
PORT_EDITOR=8085
PORT_BLOG=8086
PORT_NOTION=5050

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[launch] Root: $ROOT_DIR"

# Start Consultancy Dashboard (Vite)
(
  cd "$ROOT_DIR/consultancy-dashboard"
  if [ -f package-lock.json ]; then npm ci; else npm install; fi
  npm run dev -- --host 0.0.0.0 --port "$PORT_DASH"
) &

# Serve Visual Editor
(
  if [ -d "$ROOT_DIR/public/visual-editor" ]; then
    npx http-server "$ROOT_DIR/public/visual-editor" -p "$PORT_EDITOR" -c-1
  else
    echo "[warn] Visual editor not found at public/visual-editor"
  fi
) &

# Serve Static Blog
(
  if [ -d "$ROOT_DIR/html-blog" ]; then
    npx http-server "$ROOT_DIR/html-blog" -p "$PORT_BLOG" -c-1
  else
    echo "[warn] html-blog not found"
  fi
) &

# Start Notion Backend (optional)
(
  if [ -f "$ROOT_DIR/notion-dashboard-backend/index.js" ]; then
    cd "$ROOT_DIR/notion-dashboard-backend"
    npm install
    PORT="$PORT_NOTION" node index.js
  else
    echo "[warn] notion-dashboard-backend/index.js not found"
  fi
) &

wait