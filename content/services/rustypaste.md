---
id: rustypaste
name: Rustypaste
description: 用 Rust 编写的轻量级文件分享服务，支持命令行和 API
tags:
  - 文件
  - 分享
  - Rust
  - CLI
category: 云剪贴板
website: 'https://rustypaste.shuttleapp.rs'
repo: 'https://github.com/orhun/rustypaste'
updatedAt: '2025-05-10T14:00:00.000Z'
---

Rustypaste 是一个用 Rust 编写的轻量级文件分享服务。它提供了简单而强大的文件分享功能，支持命令行工具和 API 接口，适合用于快速分享文件或代码片段。

## 主要功能

- **命令行工具**：提供便捷的 CLI 工具
- **API 支持**：完整的 RESTful API
- **文件上传**：支持多种文件格式
- **过期时间**：可设置文件过期时间
- **一次性查看**：支持阅后即焚功能
- **密码保护**：可为分享内容设置密码
- **语法高亮**：支持代码语法高亮
- **自定义域名**：支持自定义文件 URL
- **Docker 支持**：支持容器化部署
- **轻量级**：资源占用极低

## 部署要求

- Rust 环境
- 或直接使用 Docker
- 最低配置：0.5核 CPU，128MB 内存
- 推荐配置：1核 CPU，256MB 内存
- 存储空间：基础安装约 10MB，实际需求取决于数据量 