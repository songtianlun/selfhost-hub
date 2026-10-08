---
id: codeotter
name: CodeOtter
description: 自托管 AI 拉取请求审查工具，支持 GitHub、Forgejo 和 Gitea，可使用本地模型或自带 API Key。
tags:
  - AI
  - LLM
  - 代码审查
  - Node.js
  - Docker
rating: 4.0
category: 开发工具
website: 'https://codeotter.io'
repo: 'https://github.com/dharmeshgurnani/CodeOtter'
updatedAt: '2026-10-08T08:00:00.000Z'
---

CodeOtter 是一个自托管的 AI 拉取请求（PR）审查工具，支持 GitHub、Forgejo 和 Gitea。它会为每个 PR 打分，以状态检查的形式执行合并门禁，并在代码中发布行内修改建议。它可以完全离线运行本地 GGUF 模型，也可以使用您自己的 API Key 调用云端模型服务商。基于 Elastic License 2.0，可免费自部署。

## 主要功能

- **PR 评分**：为每个 PR 评估质量、风险、影响范围和测试情况
- **合并门禁**：以提交状态检查的形式执行可配置的门禁
- **行内修复**：在 diff 上发布带有修改建议的审查评论
- **仓库规范**：审查时遵循仓库中的 AGENTS.md / CLAUDE.md
- **多平台支持**：支持 GitHub、Forgejo 和 Gitea，均可使用 OAuth 登录
- **本地或云端模型**：通过 llama.cpp 运行本地 GGUF 模型，或使用自带 API Key 接入 Anthropic、OpenAI、OpenRouter、MiniMax

## 部署要求

- 支持 Docker 部署（官方镜像支持 amd64 和 arm64，仓库内提供 docker-compose）
- 操作系统：Linux、macOS、Windows
- 运行环境：不使用 Docker 时需要 Node.js 20+
- 存储：PocketBase（Docker 镜像内置）或 JSON 文件
- 配置方式：Web 界面
