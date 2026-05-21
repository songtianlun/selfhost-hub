---
id: gatus
name: Gatus
description: Developer-oriented automated service health dashboard configured entirely via YAML to monitor HTTP, TCP, DNS, and more.
tags:
  - Monitoring
  - Status Page
  - Go
  - Docker
  - K8S
rating: 4.5
category: Status / Uptime pages
website: 'https://gatus.io'
repo: 'https://github.com/TwiN/gatus'
updatedAt: '2026-05-21T02:30:08.046Z'
---

Gatus is a developer-oriented automated service health dashboard that lets you monitor HTTP, TCP, DNS, ICMP, and more using a simple YAML configuration. It provides a clean status page and flexible alerting integrations.

## Key Features

- **Multi-protocol support**: Monitor HTTP/HTTPS, TCP, UDP, ICMP (ping), and DNS endpoints
- **Conditional assertions**: Define custom checks on status codes, response body content, certificate expiry, and more
- **Status page**: Built-in public status page with custom domain support and embeddable badges
- **Flexible alerting**: Integrates with Slack, PagerDuty, Telegram, Email, Discord, Teams, and more
- **Charts & history**: Tracks response time trends and provides uptime statistics graphs
- **External storage**: Supports SQLite and PostgreSQL for persistent historical data
- **Kubernetes-ready**: Native K8s support with an official Helm chart
- **Lightweight**: Written in Go with minimal memory footprint, ideal for resource-constrained environments

## Deployment Requirements

- Docker deployment supported (official image available)
- OS: Linux, macOS, Windows
- Minimum: 0.1 CPU core, 32 MB RAM
- Storage: ~20 MB for the image; historical data grows on demand
- Configuration: single YAML file, low learning curve
