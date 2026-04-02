---
id: "portabase"
name: "Portabase"
description: "A tool designed to simplify the backup and restoration of your database instances. Supports PostgreSQL, MySQL, MariaDB, MongoDB, SQLite, Redis, Valkey, and Firebird."
tags:
  - "Apache-2.0"
  - "Docker"
category: "Database Management"
website: "https://portabase.io/"
repo: "https://github.com/Portabase/portabase"
#image: "/placeholder.svg?height=300&width=400"
---

Portabase is an open-source, self-hosted platform designed to simplify the backup and restoration of database instances. It integrates with lightweight [Portabase agents](https://github.com/Portabase/agent) deployed alongside your databases to handle backup operations securely and efficiently, all managed through a clean web dashboard.

## Supported Databases

| Engine | Status | Supported Versions | Restore |
|---|---|---|---|
| **PostgreSQL** | ✅ Stable | 12, 13, 14, 15, 16, 17, 18 | Yes |
| **MySQL** | ✅ Stable | 5.7, 8, 9 | Yes |
| **MariaDB** | ✅ Stable | 10, 11 | Yes |
| **MongoDB** | ✅ Stable | 4, 5, 6, 7, 8 | Yes |
| **SQLite** | ✅ Stable | 3.x | Yes |
| **Redis** | ✅ Stable | 2.8+ | No |
| **Valkey** | ✅ Stable | 7.2+ | No |
| **Firebird** | ✅ Stable | 3.0, 4.0, 5.0 | Yes |

## Key Features

- **Unified dashboard**: Manage all your database backup jobs from a single web interface.
- **Agent-based architecture**: Lightweight agents run alongside your database containers and communicate with the Portabase server securely.
- **Scheduled backups**: Configure automated backup schedules for each database instance.
- **Backup restoration**: Restore databases directly from the dashboard for supported engines.
- **Multi-database support**: Works with the most popular relational, document, and key-value databases.
- **Open source**: Apache-2.0 licensed and fully self-hosted — your data never leaves your infrastructure.

## Installation

Portabase can be deployed in four ways:

1. **Automated CLI** (recommended): Use the official CLI to set up Portabase and its agents automatically.
2. **Docker Run**: Launch the container with a single `docker run` command.
3. **Docker Compose**: Use the provided `docker-compose.yml` for a multi-container setup.
4. **Kubernetes / Helm**: Deploy on Kubernetes using the official Helm chart.

Docker must be installed before getting started. See the [installation docs](https://portabase.io/docs/dashboard/setup) for full details.
