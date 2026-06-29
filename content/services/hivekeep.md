---
id: hivekeep
name: Hivekeep
description: 自托管平台，运行一支具备持久记忆和 Web 界面的专业 AI 智能体团队。
tags:
  - AI
  - LLM
  - 智能体
  - TypeScript
  - Docker
rating: 4.0
category: AI工具
website: 'https://hivekeep.app'
repo: 'https://github.com/MarlBurroW/hivekeep'
updatedAt: '2026-06-29T08:00:00.000Z'
---

Hivekeep 是一个自托管平台，可运行一支由多个专业 AI 智能体组成的团队。它们相互协作、共享持久记忆，并能自行构建工具、迷你应用和插件。Hivekeep 自带 Web 界面，并可通过 Telegram、Slack、Discord 和 Matrix 访问，全部运行在单个容器中。

## 主要功能

- **智能体团队**：运行多个专业智能体，相互协作并分配任务
- **持久记忆**：跨智能体和对话共享的长期记忆
- **自我扩展**：智能体可自行构建工具、迷你应用和插件
- **多渠道接入**：除 Web 界面外，还支持 Telegram、Slack、Discord、Matrix
- **模型无关**：支持云端 LLM 服务商，或通过 OpenAI 兼容接口接入本地模型
- **单容器部署**：以单个 Docker 容器运行（Bun + SQLite），无需外部数据库

## 部署要求

- 支持 Docker 一键部署（官方提供镜像）
- 操作系统：Linux、macOS、Windows
- 存储空间：SQLite，无需外部数据库
- 配置方式：基于 Web 的引导式安装向导
