---
id: "orbi"
name: "Orbi"
description: "Open-source (AGPL-3.0) coding agent that works from GitHub Issues: it implements the change in an isolated worktree, runs tests, opens a PR, and merges after a separate AI review passes. Self-host free or use Orbi Cloud."
tags:
  - "AGPL-3.0"
  - "Python"
  - "Docker"
  - "AI"
  - "GitHub"
category: "Software Development"
website: "https://orbi.build/?ref=dir-selfhosthub"
repo: "https://github.com/orbi-build/orbi"
#image: "/placeholder.svg?height=300&width=400"
---

Orbi is a self-hosted software delivery tool for GitHub. You describe the goal and acceptance criteria in an Issue and label it `ai-ready`; Orbi implements it in an isolated worktree, runs the tests, opens a pull request, and merges it only after a separate AI review session and the merge gate pass. Releases are published only when a maintainer requests one. It is open source under the AGPL-3.0 (the Sustainable Use License is an optional alternative) and free to self-host; a hosted Orbi Cloud is also offered.

## Key Features

- **Issues as the task queue**: The `ai-ready` label dispatches work; GitHub Issues are the only state store, with no database, queue or daemon
- **Isolated runs**: Each task gets its own branch, worktree, logs and PR, tied together by one `run_id`
- **Independent review and merge gate**: A separate review session checks the PR and fixes findings; only the reviewed head can merge
- **Fail fast**: Unrecoverable failures mark the Issue `ai-blocked` for a human instead of retrying silently
- **CLI**: `orbi add`, `status`, `session`, `install-units` and `doctor` for dispatching work, viewing the queue and diagnostics

## Deployment Requirements

- Docker images on GHCR (`ghcr.io/orbi-build/orbi`) and Docker Hub (`orbibuild/orbi`)
- CLI on PyPI: `uv tool install orbi-cli`
- Runtime: Python 3.14+, GitHub CLI 2.94+
- OS: Linux (systemd user timer) or macOS (launchd)
- Documentation: https://docs.orbi.build/
