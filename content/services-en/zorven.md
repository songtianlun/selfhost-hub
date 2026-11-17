---
id: "zorven"
name: "Zorven"
description: "Self-hosted, open-source reverse proxy, secure tunneling, and private networking platform behind CGNAT and firewalls."
tags:
  - "AGPL-3.0"
  - "Go"
  - "Docker"
category: "Self-hosting Solutions"
website: "https://zorven.app/"
repo: "https://github.com/tkodcumpeg4/zorven"
#image: "/placeholder.svg?height=300&width=400"
---

Zorven is a self-hostable, open-source (AGPL-3.0) reverse proxy, secure tunneling, and private networking platform written in Go. It exposes local HTTP, WebSocket, TCP, and UDP services at public HTTPS URLs over an outbound connection without router port forwarding—working behind CGNAT, DS-Lite, Starlink, and 5G.

## Key Features

- **Zero Port Forwarding**: Publishes local services over encrypted outbound tunnels (`zorven http 3000` or auto-expiring `zorven ephemeral 3000`).
- **Zero-Trust Access Controls**: Built-in visitor authentication (password, Google, GitHub), IP allowlists, mTLS, WAF logging, and bot protection.
- **Private Networking**: WireGuard-based private overlay network (`Zorven Network`) to connect distributed machines safely.
- **Deployments & Remote UI**: Deploy Git repositories or Docker images (`zorven deploy`), plus web-based remote terminal, file transfers, and screen sharing.
- **Built-in MCP Server**: Manage tunnels via `zorven mcp`.

## Installation

```sh
curl -fsSL https://zorven.app/install.sh | sudo bash
```

Or on Windows PowerShell:

```powershell
irm https://zorven.app/install.ps1 | iex
```
