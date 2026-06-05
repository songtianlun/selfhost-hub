# syntax=docker/dockerfile:1.7

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install a Node 20 compatible pnpm version. Avoid pnpm@latest, which may require newer Node built-ins.
ARG PNPM_VERSION=10.28.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application with optional IndexNow push
ARG PUSH_ALL=0
ARG PUSH_RECENT=0

RUN --mount=type=secret,id=gh_token \
    export GH_TOKEN="$(cat /run/secrets/gh_token 2>/dev/null || true)"; \
    if [ "$PUSH_ALL" = "1" ]; then \
    pnpm build && pnpm push:all || true; \
    elif [ "$PUSH_RECENT" = "1" ]; then \
    pnpm build && pnpm push:recent || true; \
    else \
    pnpm build; \
    fi

# Production stage - use Next.js server
FROM node:20-alpine AS runner

WORKDIR /app

# Install a Node 20 compatible pnpm version. Avoid pnpm@latest, which may require newer Node built-ins.
ARG PNPM_VERSION=10.28.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/content ./content

# Set environment to production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start Next.js server
CMD ["pnpm", "start"] 