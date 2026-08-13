---
id: hivekeep
name: Hivekeep
description: Self-hosted platform to run a team of specialized AI agents with persistent memory and a web UI.
tags:
  - AI
  - LLM
  - Agents
  - TypeScript
  - Docker
rating: 4.0
category: Generative Artificial Intelligence (GenAI)
website: 'https://hivekeep.app'
repo: 'https://github.com/MarlBurroW/hivekeep'
updatedAt: '2026-06-29T08:00:00.000Z'
---

Hivekeep is a self-hosted platform to run a team of specialized AI agents that collaborate, share persistent memory, and build their own tools, mini-apps, and plugins. It ships with a web UI and can be reached over Telegram, Slack, Discord, and Matrix, all from a single container.

## Key Features

- **Team of agents**: Run multiple specialized agents that collaborate and delegate tasks to each other
- **Persistent memory**: Long-term memory shared across agents and conversations
- **Self-extending**: Agents build their own tools, mini-apps, and plugins
- **Multi-channel**: Reachable over Telegram, Slack, Discord, and Matrix in addition to the web UI
- **Provider-agnostic**: Works with cloud LLM providers or local models via an OpenAI-compatible API
- **Single container**: Runs as one Docker container (Bun + SQLite), no external database required

## Deployment Requirements

- Docker deployment supported (official image available)
- OS: Linux, macOS, Windows
- Storage: SQLite, no external database required
- Configuration: web-based onboarding wizard
