---
id: "docknest"
name: "DockNest"
description: "Backs up Docker and static nginx sites on your Linux servers over SSH to encrypted SFTP or S3-compatible storage, and restores any recovery point to a separate copy so you can check it works."
tags:
  - "AGPL-3.0"
  - "JavaScript"
  - "Docker"
category: "Self-hosting Solutions"
website: "https://trydocknest.com"
repo: "https://github.com/DahanItamar/DockNest"
#image: "/placeholder.svg?height=300&width=400"
---

DockNest is a self-hosted web app for backing up the sites you run on your own servers. It connects to each Linux server over SSH, discovers its Docker projects and static nginx sites, and backs each one up on its own schedule to storage you own.

DockNest is in beta. Its [support matrix](https://github.com/DahanItamar/DockNest/blob/main/docs/support-matrix.md) lists what has been tested and what has not.

## Key Features

- **Full site capture**: Images, volumes, bind mounts, writable layers and databases (PostgreSQL, MySQL/MariaDB and Redis).
- **Verified recovery**: Restore any recovery point to a separate copy to confirm it works. The live site is not overwritten.
- **Storage you own**: Backups are encrypted with AES-256-GCM and stored on SFTP or S3-compatible storage (S3 support is in beta).
- **Per-site schedules**: Retention rules and pinned backups for each site.
- **Jobs view**: Live transfer progress, a step timeline and a plain-language reason when a job fails.
- **Map and site moves**: See servers, sites and storage as connected nodes, and move a site to another server with a tested copy before switching.
- **Alerts**: Telegram or email messages when a backup fails or passes, a server is unreachable or low on disk.
- **Security**: SSH host keys are pinned, every user signs in with a password and an authenticator app, and the dashboard never uses the Docker socket.

## Installation

The DockNest host needs Linux with Docker and Docker Compose, plus Node.js 24 for the one-time setup:

```sh
git clone https://github.com/DahanItamar/DockNest.git
cd DockNest
npm ci
npm run setup
docker compose --profile https up -d --build
```

A signed `linux/amd64` image is also published at `ghcr.io/dahanitamar/docknest`. See the [deployment guide](https://github.com/DahanItamar/DockNest/blob/main/docs/deployment.md) for details.
