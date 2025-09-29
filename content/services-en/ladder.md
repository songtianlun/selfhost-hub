---
id: "ladder"
name: "Ladder"
description: "Self-hosted HTTP proxy that mirrors 1ft/12ft techniques to bypass soft paywalls"
tags:
  - "Self-hosted"
  - "HTTP Proxy"
  - "Paywall Bypass"
  - "Web"
category: "Utilities"
website: "https://github.com/everywall/ladder"
repo: "https://github.com/everywall/ladder"
#image: "/placeholder.svg?height=300&width=400"
---

Ladder is a lightweight proxy inspired by 13ft and the hosted services 1ft.io and 12ft.io. It rewrites incoming requests so that many news and magazine websites serve their crawler-friendly versions without the soft paywall overlay.

## Features

- **Path based routing** — prepend Ladder's origin to a target URL (for example `/https://example.com/story`) to fetch the cleaned article view
- **Crawler header spoofing** — automatically rewrites `User-Agent`, `Referer`, and other headers to mimic search engine crawlers that receive unrestricted pages
- **DOM sanitising** — ships with selector rules that strip subscription modals, overlays, and blocking scripts while keeping the readable body intact; custom rules can be added
- **Lean responses** — returns HTML without analytics and ad scripts so the output can be archived or processed further

## Deployment

- Official Docker images make it easy to run the service with Compose or a single `docker run`, mounting configuration files as needed
- The Node.js server can also be executed directly, with environment variables controlling port, caching behaviour, and allowed or blocked domains
- Place the instance behind a reverse proxy or CDN, enforce HTTPS, and consider basic auth or an allowlist to prevent abuse
- Persist any cache directories if caching is enabled and schedule cleanups to keep disk usage predictable

## Use cases

- Individuals occasionally reading soft-paywalled articles while keeping full control over traffic and logs
- Teams that need a shared gateway to access research sources or news articles without individual subscriptions
- Developers wanting to feed the cleaned HTML into downstream tooling such as text extraction, summarisation, or archiving pipelines
