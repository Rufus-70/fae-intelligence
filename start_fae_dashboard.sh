#!/bin/bash

# Start the Notion Dashboard Backend
echo "Starting Notion Dashboard Backend..."
cd /home/rosie/projects/fae-intelligence/notion-dashboard-backend
node index.js &

# Capture the PID of the backend process
BACKEND_PID=$!

echo "Notion Dashboard Backend started with PID: $BACKEND_PID"
echo "Waiting a few seconds for the backend to fully start..."
sleep 5 # Give the backend a moment to initialize

# Start the Consultancy Dashboard Frontend
echo "Starting Consultancy Dashboard Frontend..."
cd /home/rosie/projects/fae-intelligence/consultancy-dashboard
npm install # Ensure dependencies are installed
npm run dev

# When the frontend process exits, kill the backend process
echo "Frontend process exited. Killing backend process (PID: $BACKEND_PID)..."
kill $BACKEND_PID

echo "All processes stopped."
