---
id: trina-ax
name: Trina AX
description: 开源（AGPL-3.0）的团队 AI 工作台，在自己的服务器上运行 Claude Code 和 Codex，每个人的 AI 只能打开本人有权限的文件。可免费自托管，不限人数。
tags:
  - AGPL-3.0
  - AI
  - TypeScript
  - Docker
category: 协同办公
website: 'https://ax.trina.app'
repo: 'https://github.com/trina-app/trina-ax'
---

Trina AX 是一个可自托管的团队 AI 工作台。一个人在服务器上接入 Claude 或 OpenAI 的 API 密钥（或条款允许的套餐），再设置好应用、技能和团队文件，每个人的 AI 从第一个问题起就能用上。不管来自人还是他的 AI，每个文件请求都要经过服务器上的同一道权限检查。

## 主要功能

- **团队云盘**：全公司、小组、项目和个人文件夹
- **共享会话**：点开同事的 AI 会话就能接着做，每个新回答都按提问者本人的权限运行
- **团队聊天**：有频道、私信、话题和 @提及
- **应用**：从应用列表里选 Notion、Linear、Figma 等，或填地址接入任意 MCP 服务器
- **文档与版本**：读取 HWP/HWPX（韩文 Hangul）文字；不管是人改的还是 AI 改的，每次改动都会保留为版本
- **多端可用**：Mac、Windows、Linux、iPhone、Android 和任意浏览器

## 部署要求

- Linux：Debian 12/13 或 Ubuntu 24.04，启用 cgroup v2 的 systemd，amd64 或 arm64
- 4 GB 内存、20 GB 磁盘
- Docker：docker/ 目录里有 compose 文件，比 Linux 安装推出得晚，测试也更少
- 也可部署在办公室的 Mac 上
- 需要 Claude 或 OpenAI 的 API 密钥，或条款允许的套餐
- 文档：https://github.com/trina-app/trina-ax/blob/main/docs/INSTALL-LINUX.en.md
