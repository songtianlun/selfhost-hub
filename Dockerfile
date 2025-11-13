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

# Set environment variables for build time
ARG GH_TOKEN
ENV GH_TOKEN=${GH_TOKEN}

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

# Production stage - use Next.js server
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Set environment to production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start Next.js server
CMD ["pnpm", "start"] 