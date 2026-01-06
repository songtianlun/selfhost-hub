---
id: gitea-mirror
name: Gitea Mirror
description: 将外部 Git 仓库自动镜像到 Gitea 的同步工具
tags:
  - Git
  - 同步
  - 备份
  - 自动化
rating: 3.5
category: 代码托管
website: 'https://github.com/RayLabsHQ/gitea-mirror'
repo: 'https://github.com/RayLabsHQ/gitea-mirror'
updatedAt: '2026-01-06T00:00:00.000Z'
---

Gitea Mirror 用于将外部 Git 仓库镜像到 Gitea，并保持持续同步，便于集中管理、备份与迁移。

## 主要功能

- **批量同步**：支持按仓库列表批量镜像到 Gitea
- **定时更新**：周期性拉取远端更新，保持镜像一致
- **权限访问**：可通过访问令牌同步私有仓库
- **结果日志**：输出同步结果，便于排查失败原因

## 部署要求

- 可访问的 Gitea 实例及 API 访问令牌
- 能够访问源仓库的网络与凭据
- 为镜像目标配置足够的存储空间
