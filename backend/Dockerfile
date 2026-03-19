FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set node environment setup
ENV NODE_ENV=production

# Install dependencies exactly as they are in package-lock.json
# Skip devDependencies by relying on NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy application source code
COPY . .

# Change ownership of the directory to the node user
RUN chown -R node:node /app

# Use the built-in non-root node user
USER node

# Expose port
EXPOSE 3001

# Command to run the application securely and with signal handling
CMD ["node", "index.js"]
