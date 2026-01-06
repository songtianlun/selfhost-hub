---
id: databasus
name: Databasus
description: 面向 PostgreSQL、MySQL、MariaDB 与 MongoDB 的开源数据库备份平台
tags:
  - 数据库
  - 备份
  - DevOps
  - 监控
  - Docker
category: 数据备份
rating: 3.5
website: 'https://databasus.com'
repo: 'https://github.com/databasus/databasus'
updatedAt: '2025-05-16T00:00:00.000Z'
---

Databasus 是一款免费、开源、自托管的数据库备份工具，支持 PostgreSQL、MySQL、MariaDB 与 MongoDB。它提供定时备份、压缩、加密、多存储与多通知渠道，适合团队化管理数据库备份流程。

## 主要功能

- **多数据库支持**：PostgreSQL、MySQL、MariaDB、MongoDB
- **计划任务**：按小时/天/周/月或 Cron 执行备份
- **多存储目标**：本地、S3、Cloudflare R2、Google Drive、Dropbox、NAS、SFTP、Rclone 等
- **通知集成**：Email、Telegram、Slack、Discord、Webhook
- **安全加密**：AES-256-GCM 备份加密与密钥保护
- **团队协作**：工作区、角色权限、审计日志
- **友好界面**：深浅色主题与移动端适配

## 部署要求

- 推荐 Docker 部署（支持 Docker Compose）
- 可选：Kubernetes/Helm
- 需要配置数据库连接、存储与通知渠道
