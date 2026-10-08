---
id: codeotter
name: CodeOtter
description: Self-hosted AI pull request reviewer for GitHub, Forgejo and Gitea, with local or bring-your-own-key models.
tags:
  - AI
  - LLM
  - Code Review
  - Node.js
  - Docker
rating: 4.0
category: Software Development
website: 'https://codeotter.io'
repo: 'https://github.com/dharmeshgurnani/CodeOtter'
updatedAt: '2026-10-08T08:00:00.000Z'
---

CodeOtter is a self-hosted AI pull request reviewer for GitHub, Forgejo and Gitea. It scores each pull request, enforces merge gates as status checks, and posts inline suggestion fixes. It can run fully offline on local GGUF models or use your own API key for a hosted provider. It is free to self-host under the Elastic License 2.0.

## Key Features

- **PR scoring**: Scores quality, risk, blast radius and tests for every pull request
- **Merge gates**: Enforces configurable gates as commit status checks
- **Inline fixes**: Posts review comments with suggested changes on the diff
- **Repository guidelines**: Follows the repository's AGENTS.md / CLAUDE.md when reviewing
- **Multiple forges**: Works with GitHub, Forgejo and Gitea, with OAuth sign-in for each
- **Local or hosted models**: Local GGUF models via llama.cpp, or Anthropic, OpenAI, OpenRouter and MiniMax with your own API key

## Deployment Requirements

- Docker deployment supported (official image for amd64 and arm64, docker-compose in the repository)
- OS: Linux, macOS, Windows
- Runtime: Node.js 20+ when running without Docker
- Storage: PocketBase (bundled in the Docker image), or JSON files
- Configuration: web UI
