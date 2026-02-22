# Use a lightweight Node.js 18 image to install dependencies
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev


# Create the final production image
FROM node:18-alpine AS production

# Install dumb-init to handle system signals properly
RUN apk add --no-cache dumb-init

# Create a non-root user and group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory
WORKDIR /app

# Copy installed dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application source files
COPY src/App.js ./src/App.js
COPY src/index.html ./src/index.html
COPY src/script.js ./src/script.js
COPY src/style.css ./src/style.css
COPY package.json ./

# Give ownership of app files to the non-root user
RUN chown -R appuser:appgroup /app

# Run the container as the non-root user
USER appuser

# Document the port the app uses
EXPOSE 3001

# Periodically check if the app is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/status || exit 1

# Use dumb-init so the app shuts down cleanly
ENTRYPOINT ["dumb-init", "--"]

# Start the Node.js application
CMD ["node", "src/App.js"]
