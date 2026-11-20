---
id: "trina-ax"
name: "Trina AX"
description: "Open-source (AGPL-3.0) team AI workspace that runs Claude Code and Codex on your own server, where each person's AI opens only the files that person may open. Free to self-host with no seat limit."
tags:
  - "AGPL-3.0"
  - "TypeScript"
  - "Docker"
  - "AI"
category: "Groupware"
website: "https://ax.trina.app"
repo: "https://github.com/trina-app/trina-ax"
#image: "/placeholder.svg?height=300&width=400"
---

Trina AX is a self-hosted AI workspace for a company team. One person connects a Claude or OpenAI API key (or a plan whose terms allow it) and sets up apps, skills and team files on the server once, and everyone's AI has them from the first question. Every file request, from a person or their AI, goes through one permission check on the server.

## Key Features

- Team drive with company-wide, group, project and personal folders
- Shared AI sessions: open a teammate's session and keep going, with each new answer running under the access of the person who asked
- Team chat with channels, direct messages, threads and @mentions
- Apps from a list (Notion, Linear, Figma and more) or any MCP server by its address
- Reads Hangul (HWP/HWPX) text, and keeps every change by a person or their AI as a version
- Apps for Mac, Windows, Linux, iPhone and Android, plus any browser

## Deployment Requirements

- Linux: Debian 12/13 or Ubuntu 24.04 with systemd and cgroup v2, on amd64 or arm64
- 4 GB RAM and 20 GB disk
- Docker: compose file in docker/ (newer and less tested than the Linux install)
- An office Mac also works
- A Claude or OpenAI API key, or an account whose terms allow it
- Documentation: https://github.com/trina-app/trina-ax/blob/main/docs/INSTALL-LINUX.en.md
