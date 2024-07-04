# Use a base image with Node.js 18
FROM node:18.16.0

# Set the working directory for frontend
WORKDIR /app/ongagelanding

# Copy the frontend package.json and package-lock.json
COPY ongagelanding/package*.json ./

# Install dependencies for frontend
RUN npm install

# Set the working directory for backend
WORKDIR /app/API

# Copy the backend package.json and package-lock.json
COPY API/package*.json ./

# Install dependencies for backend
RUN npm install

# Copy the frontend and backend code
COPY ongagelanding /app/ongagelanding
COPY API /app/API

# Expose ports
EXPOSE 8080 5000

# Copy the entrypoint script
COPY docker-entrypoint.sh /

# Make the entrypoint script executable
RUN chmod +x /docker-entrypoint.sh

# Command to run the entrypoint script
CMD ["/docker-entrypoint.sh"]
