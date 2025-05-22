---
id: "one-api"
name: "One API"
description: "一个统一的 AI 接口管理平台，支持多种主流 AI 模型，提供统一的 API 接口，可用于 API Key 管理和二次分发"
tags:
  - "AI"
  - "API"
  - "管理平台"
  - "统一接口"
category: "AI工具"
rating: 
website: "https://github.com/songquanpeng/one-api"
repo: "https://github.com/songquanpeng/one-api"
updatedAt: "2025-05-14T22:00:00+08:00"
---

One API 是一个强大的 AI 接口管理平台，它能够统一管理多种主流 AI 模型的 API，包括 OpenAI、Azure、Anthropic Claude、Google Gemini、DeepSeek、字节豆包、ChatGLM、文心一言、讯飞星火、通义千问、360 智脑、腾讯混元等。通过统一的 API 接口，用户可以方便地进行 API Key 管理和二次分发。

## 主要功能

- **多模型支持**：支持多种主流 AI 模型的统一接入
- **统一接口**：提供标准化的 API 接口
- **Key 管理**：支持 API Key 的统一管理和分发
- **额度控制**：支持用户额度管理和使用限制
- **渠道管理**：支持多渠道配置和负载均衡
- **使用统计**：提供详细的使用统计和监控
- **Docker 支持**：提供 Docker 镜像，一键部署
- **国际化**：支持中英文界面

## 技术栈

- Go 语言开发
- Docker 容器化
- SQLite/MySQL 数据库
- RESTful API
- Web 管理界面

## 部署要求

- 操作系统：支持所有主流操作系统
- 依赖项：
  - Docker（推荐）
  - 或 Go 运行环境
- 服务要求：
  - 数据库（SQLite 或 MySQL）
  - 网络访问
- 内存：建议至少 512MB 可用内存
- 存储空间：根据使用情况而定 