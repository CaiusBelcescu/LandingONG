#!/bin/sh

# Start the frontend
cd /app/ongagelanding && npm run build && npm start &

# Start the backend
cd /app/API && npm run dev &

# Wait indefinitely to keep the container running
tail -f /dev/null
 