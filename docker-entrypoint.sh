#!/bin/sh

# Start the frontend
cd /app/ongagelanding && npm build && npm start &

# Start the backend
cd /app/API && npm run dev &

# Wait indefinitely to keep the container running
tail -f /dev/null
