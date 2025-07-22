FROM node:20-alpine3.19

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Update Alpine packages and install dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    npm ci

# Add resolution for ip package vulnerability
RUN npm install ip@2.0.1 --save-exact

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Use dumb-init as PID 1 for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application
CMD ["npm", "start"]