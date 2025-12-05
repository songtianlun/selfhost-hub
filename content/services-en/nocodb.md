---
id: "nocodb"
name: "NocoDB"
description: "No-code platform that turns any database into a smart spreadsheet (alternative to Airtable or Smartsheet)."
tags:
  - "AGPL-3.0"
  - "Nodejs"
  - "Docker"
category: "Database Management"
website: "https://www.nocodb.com/"
repo: "https://github.com/nocodb/nocodb"
updatedAt: "2024-05-12T00:00:00.000Z"
#image: "/placeholder.svg?height=300&width=400"
---

NocoDB converts existing SQL databases such as MySQL, PostgreSQL, SQL Server, or MariaDB into a collaborative spreadsheet UI. Teams can use it as an open-source alternative to Airtable or Smartsheet without rewriting their backend data models.

## Key Features

- **Works with your databases** – Connect to any supported SQL engine and automatically generate tables, views, and relationships with a friendly spreadsheet interface.
- **Multiple view types** – Switch between grid, Kanban, gallery, calendar, and Gantt views to match the needs of product, marketing, or operations teams.
- **Fine-grained permissions** – Invite collaborators with role-based access, limit what they can read or edit at the table, view, or field level, and secure sensitive data.
- **Automations and integrations** – Trigger notifications or workflows via Slack, Teams, Zapier, Make, or custom webhooks to keep downstream systems in sync.
- **API gateway** – Instantly expose your data with generated REST and GraphQL endpoints so developers can build apps on top of shared datasets.

## Deployment Notes

1. The official Docker images are the quickest way to start. Pair NocoDB with an external database for easier upgrades and backups.
2. Set the `NC_DB` environment variables in `docker-compose.yml` to point at the persistent SQL instance that stores metadata.
3. Put NocoDB behind a reverse proxy with HTTPS enabled and configure SMTP so you can invite collaborators via email.
4. Schedule regular backups of both the connected database and uploaded attachments to protect against accidental data loss.
