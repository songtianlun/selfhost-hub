---
id: yopass
name: Yopass
description: 安全的一次性密码和秘密分享服务，支持自动过期
tags:
  - 安全
  - 分享
  - 密码
  - Go
category: 云剪贴板
website: 'https://yopass.se'
repo: 'https://github.com/jhaals/yopass'
updatedAt: '2025-05-10T14:00:00.000Z'
---

Yopass 是一个安全的一次性密码和秘密分享服务。它允许用户安全地分享敏感信息，如密码、密钥等，并支持在指定时间后自动过期。所有内容都经过加密，确保安全性。

## 主要功能

- **端到端加密**：所有内容在客户端加密
- **自动过期**：支持设置过期时间
- **一次性查看**：支持阅后即焚功能
- **命令行工具**：提供便捷的 CLI 工具
- **API 支持**：完整的 RESTful API
- **Docker 支持**：支持容器化部署
- **多种存储后端**：支持 Memcached、Redis、S3 等
- **自定义主题**：支持自定义界面主题
- **多语言支持**：支持多种语言界面
- **轻量级**：资源占用极低

## 部署要求

- Go 环境
- 或直接使用 Docker
- 存储后端（Memcached/Redis/S3）
- 最低配置：0.5核 CPU，128MB 内存
- 推荐配置：1核 CPU，256MB 内存
- 存储空间：基础安装约 20MB，实际需求取决于数据量 