---
id: miniflux
name: Miniflux
description: 简约的自托管RSS阅读器，注重速度和效率
tags:
  - RSS
  - 阅读
  - Go
  - 内容聚合
rating: 3.5
category: 信息聚合
website: 'https://miniflux.app'
repo: 'https://github.com/miniflux/v2'
updatedAt: '2025-05-09T04:17:26.766Z'
---

Miniflux 是一个极简的自托管 RSS 阅读器，专注于简洁性、速度和效率。它提供了一个干净的阅读体验，没有杂乱的界面和不必要的功能，同时支持所有核心 RSS 阅读功能。

## 主要功能

- **Feed 管理**：添加、组织和管理多个 RSS/Atom 源
- **阅读视图**：提供原始和阅读模式视图
- **自动发现**：自动发现网站的 Feed 链接
- **键盘快捷键**：高效的键盘导航
- **筛选和分类**：通过分类、状态等筛选内容
- **全文获取**：从摘要 Feed 中获取完整文章内容
- **OPML 导入/导出**：轻松迁移 Feed 集合
- **书签支持**：集成 Instapaper、Pinboard、Pocket 等服务
- **API 支持**：完整的 REST API
- **多语言支持**：界面支持多种语言

## 部署要求

- PostgreSQL 数据库
- 支持 Docker 或二进制部署
- 最低配置：0.5核 CPU，128MB 内存
- 推荐配置：1核 CPU，256MB 内存
- 存储空间：约 50MB（不包括数据库数据）
- 可选的外部服务：Fever API（用于移动应用集成） 
