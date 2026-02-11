---
id: vikunja
name: Vikunja
description: 开源的自托管任务管理与待办事项应用，帮助你高效组织个人与团队工作
tags:
  - 生产力
  - 协作
  - Go
  - Vue
  - Docker
  - AGPL-3.0
rating: 3.5
category: 任务管理
website: 'https://vikunja.io'
repo: 'https://github.com/go-vikunja/vikunja'
updatedAt: '2026-02-10T00:00:00.000Z'
---

Vikunja 是一个开源的自托管任务管理应用，旨在帮助用户通过待办事项列表来组织个人和工作生活。它提供了丰富的项目管理功能，支持多种视图模式，适合个人和小型团队使用。

## 主要功能

- **多视图模式**：支持列表、看板、甘特图和表格等多种视图
- **项目管理**：创建项目和子项目，灵活组织任务层级
- **团队协作**：支持团队和用户之间共享项目和命名空间
- **标签与筛选**：通过标签、优先级和截止日期对任务进行分类和筛选
- **提醒通知**：为任务设置提醒，不遗漏重要事项
- **文件附件**：支持为任务上传和关联文件
- **CalDAV 支持**：可与 Thunderbird、DAVx5 等日历客户端同步
- **API 驱动**：提供完整的 REST API 和 Swagger 文档
- **数据导入**：支持从 Todoist、Trello、Microsoft To-Do 等平台迁移数据

## 部署要求

- 支持 Docker / Docker Compose 部署
- 后端使用 Go 语言，前端使用 Vue.js
- 支持 SQLite、MySQL 和 PostgreSQL 数据库
- 最低配置：1 核 CPU，512MB 内存
- 推荐配置：2 核+ CPU，1GB+ 内存
- 可选：反向代理（如 Nginx / Caddy）提供 HTTPS 访问
