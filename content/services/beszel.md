---
id: beszel
name: Beszel
description: 轻量级服务器监控平台，包含历史数据、Docker 统计和告警功能
tags:
  - 监控
  - Docker
  - 系统管理
  - Go
rating: 4
category: 监控工具
website: 'https://beszel.dev'
repo: 'https://github.com/henrygd/beszel'
updatedAt: '2025-04-29T22:30:14.935Z'
---

Beszel 是一个轻量级的服务器监控平台，包含 Docker 统计信息、历史数据和告警功能。它提供友好的 Web 界面、简单的配置，开箱即用。支持自动备份、多用户、OAuth 认证和 API 访问。

## 主要功能

- **轻量级**：比主流解决方案更小、更节省资源
- **简单**：易于设置，无需公网暴露
- **Docker 统计**：追踪每个容器的 CPU、内存和网络使用历史
- **告警**：可配置的 CPU、内存、磁盘、带宽、温度和状态告警
- **多用户**：用户管理自己的系统，管理员可以跨用户共享系统
- **OAuth / OIDC**：支持多种 OAuth2 提供商，可禁用密码认证
- **自动备份**：从磁盘或 S3 兼容存储保存和恢复数据
- **REST API**：在自己的脚本和应用程序中使用或更新数据

## 部署要求

- 支持 Docker 部署
- 操作系统：支持 Linux、macOS、Windows
- 最低配置：0.5核 CPU，128MB 内存
- 推荐配置：1核+ CPU，256MB+ 内存
- 存储空间：基础安装约 20MB，实际需求取决于监控系统数量
- 包含两个主要组件：hub（web应用）和 agent（在被监控系统上运行） 
