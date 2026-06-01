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
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
