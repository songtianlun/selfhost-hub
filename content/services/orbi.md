---
id: orbi
name: Orbi
description: 开源（AGPL-3.0）的 GitHub 交付工具：Issue 打上 ai-ready 后，在隔离工作区里实现、运行测试并创建 PR，另一个 AI 会话评审通过后合并。可免费自托管，也可使用 Orbi Cloud。
tags:
  - AGPL-3.0
  - AI
  - GitHub
  - Python
  - Docker
category: 开发工具
website: 'https://orbi.build/zh/?ref=dir-selfhosthub'
repo: 'https://github.com/orbi-build/orbi'
---

Orbi 是一个可自托管的 GitHub 软件交付工具。在 Issue 中写清目标和验收项并打上 `ai-ready` 标签后，Orbi 会在隔离的工作区里实现需求、运行测试并创建 PR，只有在另一个 AI 会话评审通过、合并门禁检查通过后才会合并。发版只在维护者请求时进行。基于 AGPL-3.0 开源（可选 Sustainable Use License），可免费自托管，也提供托管的 Orbi Cloud。

## 主要功能

- **Issue 即任务队列**：`ai-ready` 标签派发任务；GitHub Issue 是唯一的状态存储，无需数据库、队列或常驻进程
- **隔离运行**：每个任务有独立的分支、工作区、日志和 PR，通过同一个 `run_id` 关联
- **独立评审与合并门禁**：独立评审会话检查 PR 并修复问题，只有评审过的提交才能合并
- **快速失败**：无法恢复的失败会把 Issue 标记为 `ai-blocked` 交给人处理，不会静默重试
- **命令行工具**：`orbi add`、`status`、`session`、`install-units`、`doctor`，用于派发任务、查看队列和诊断

## 部署要求

- Docker 镜像：GHCR（`ghcr.io/orbi-build/orbi`）和 Docker Hub（`orbibuild/orbi`）
- PyPI 上的 CLI：`uv tool install orbi-cli`
- 运行环境：Python 3.14+、GitHub CLI 2.94+
- 操作系统：Linux（systemd 用户定时器）或 macOS（launchd）
- 文档：https://docs.orbi.build/
