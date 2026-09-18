---
id: "libredb-studio"
name: "LibreDB Studio"
description: "Self-hosted SQL IDE that runs in the browser and connects to sixteen database engines."
tags:
  - "MIT"
  - "Nodejs"
  - "Docker"
  - "K8S"
category: "Database Management"
website: "https://libredb.org"
repo: "https://github.com/libredb/libredb-studio"
updatedAt: "2026-09-18T00:00:00.000Z"
#image: "/placeholder.svg?height=300&width=400"
---

LibreDB Studio is a database editor you deploy next to your data instead of installing on every laptop. Credentials stay on the server, and the team reaches the same connections through the browser.

## Key Features

- **Sixteen engines in one tab** – PostgreSQL, MySQL, Oracle, SQL Server, SQLite, ClickHouse, DuckDB, Trino, Cassandra, Druid, Elasticsearch, OpenSearch, MongoDB, Redis, Couchbase and more, through one interface.
- **Schema browser, ER diagrams and schema diff** – Shared across the SQL engines. The provider docs say per engine which of these a given engine cannot support and why.
- **SSO and an audit trail** – OIDC login, admin and user roles, and query history are part of the MIT build. There is no paid tier.
- **AI query assistance** – Natural language to SQL and query explanation, using your own LLM API key. It can be left unconfigured.
- **Runs where you already deploy** – One container, plus a Helm chart, a Kubernetes operator, Snap, deb/rpm and an npm launcher.

## Deployment Notes

1. `docker run -p 3000:3000 ghcr.io/libredb/libredb-studio:latest` is enough for a first run. Admin credentials are generated on first start and printed to the log.
2. Connections and query history live in the storage backend you pick with `STORAGE_PROVIDER`: local files, SQLite or PostgreSQL.
3. Reaching it over plain HTTP on a LAN address needs `AUTH_COOKIE_SECURE=false`, otherwise login fails silently while every health check stays green.
4. Put it behind a reverse proxy with HTTPS, and set `JWT_SECRET` and `ADMIN_PASSWORD` yourself for anything beyond a trial.
