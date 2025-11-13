# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN env && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables
ARG GH_TOKEN
RUN echo "GH_TOKEN=${GH_TOKEN}" >> .env

# Build application with optional IndexNow push
ARG PUSH_ALL=0
ARG PUSH_RECENT=0

RUN if [ "$PUSH_ALL" = "1" ]; then \
    pnpm build && pnpm push:all || true; \
    elif [ "$PUSH_RECENT" = "1" ]; then \
    pnpm build && pnpm push:recent || true; \
    else \
    pnpm build; \
    fi

# Production stage - use nginx to serve static files
FROM nginx:alpine AS runner

# Copy built static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 