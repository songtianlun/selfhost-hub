---
id: gitea
name: Gitea
description: 轻量级的自托管Git服务，类似于GitHub/GitLab但资源占用更低
tags:
  - 协作
  - 开发工具
  - Go
  - Git
rating: 4.5
category: 代码托管
website: 'https://gitea.io'
github: 'https://github.com/go-gitea/gitea'
updatedAt: '2025-05-07T22:07:20.623Z'
---

Gitea 是一个轻量级、开源的自托管 Git 服务解决方案，类似于 GitHub、GitLab 或 Bitbucket，但资源占用极低。它提供了代码托管、协作开发所需的全部核心功能。

## 主要功能

- **Git 仓库管理**：创建、克隆和管理 Git 仓库
- **问题跟踪**：创建、分配和管理项目问题
- **合并请求**：代码审查和协作开发
- **组织和团队**：管理用户组织和团队权限
- **CI/CD 集成**：通过 Actions 或外部工具实现持续集成
- **Wiki 文档**：为项目创建文档
- **用户认证**：支持多种认证方式，包括 OAuth、LDAP 等
- **丰富的 API**：提供完整的 REST API

## 部署要求

- 几乎所有平台：Linux、macOS、Windows、ARM 等
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：2核+ CPU，1GB+ 内存
- 存储空间：取决于代码仓库大小，建议至少 10GB 起步
- 数据库支持：SQLite、MySQL、PostgreSQL
- 无需外部依赖，单一二进制文件即可运行 
