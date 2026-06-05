# syntax=docker/dockerfile:1.7

# Build stage: Astro renders the site to static files in /app/dist.
FROM node:20-alpine AS builder

WORKDIR /app

# Install a Node 20 compatible pnpm version. Avoid pnpm@latest, which may require newer Node built-ins.
ARG PNPM_VERSION=10.28.1
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Copy package metadata first to improve Docker layer caching.
COPY package.json ./

# Install dependencies. This Astro rewrite intentionally has no committed lockfile yet, so do not require one.
RUN pnpm install --no-frozen-lockfile

# Copy source code.
COPY . .

# Build the static site. GH_TOKEN is consumed during build so GitHub repository metadata is embedded in HTML.
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

# Runtime stage: serve the pure static Astro output with nginx.
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

RUN cat > /etc/nginx/conf.d/default.conf <<'EOF_NGINX'
server {
    listen 3000;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /404.html;
    }

    location ~* \.(?:css|js|mjs|svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$ {
        try_files $uri =404;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }
}
EOF_NGINX

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
