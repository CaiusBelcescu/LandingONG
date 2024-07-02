# Use a base image with Node.js 18
FROM node:18.16.0

# Set the working directory
WORKDIR /app

# Copy the frontend package.json and package-lock.json
COPY ongagelanding/package*.json ./ongagelanding/

# Copy the backend package.json and package-lock.json
COPY API/package*.json ./API/

# Install dependencies for frontend
RUN cd ongagelanding && npm install

# Install dependencies for backend
RUN cd API && npm install

# Copy the frontend and backend code
COPY ongagelanding ./ongagelanding
COPY API ./API

# Expose ports
EXPOSE 3000 5000

# Copy the entrypoint script
COPY docker-entrypoint.sh /

# Make the entrypoint script executable
RUN chmod +x /docker-entrypoint.sh

# Command to run the entrypoint script
CMD ["/docker-entrypoint.sh"]
