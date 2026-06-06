# Build stage
FROM node:20-slim AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the application
COPY . .

RUN npm run build

# Production stage
FROM caddy:alpine

# Copy custom Caddy configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy built React assets from the build stage
COPY --from=build /app/dist /usr/share/caddy

# Expose ports for HTTP and HTTPS
EXPOSE 80 443
