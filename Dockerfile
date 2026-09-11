# Build stage
FROM node:20-slim AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the application
COPY . .

# Vite bakes VITE_* variables in at build time, not runtime. Since .env is
# git-ignored (it holds live project credentials and shouldn't be committed),
# pass these explicitly at build time instead, e.g.:
#   docker build --build-arg VITE_SUPABASE_URL=... --build-arg VITE_SUPABASE_ANON_KEY=... .
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

RUN npm run build

# Production stage
FROM caddy:alpine

# Copy custom Caddy configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy built React assets from the build stage
COPY --from=build /app/dist /usr/share/caddy

# Expose ports for HTTP and HTTPS
EXPOSE 80 443
