---
id: postgrest
name: PostgREST
description: 为任何 PostgreSQL 数据库提供 RESTful API 的服务器
tags:
  - 数据库
  - API
  - PostgreSQL
  - REST
category: 低代码开发
website: 'https://postgrest.org'
repo: 'https://github.com/PostgREST/postgrest'
updatedAt: '2025-05-14T14:00:00.000Z'
---

PostgREST 是一个强大的开源工具，它能够自动为任何 PostgreSQL 数据库生成 RESTful API。它提供了一个比手动编写更清晰、更符合标准、更快速的 API 解决方案。

## 主要功能

- **自动 API 生成**：自动将数据库表转换为 RESTful 端点
- **高性能**：使用 Haskell 和 Warp HTTP 服务器，支持每秒数千请求
- **安全性**：支持 JWT 认证，并利用数据库角色进行授权
- **版本控制**：通过数据库模式实现 API 版本管理
- **自动文档**：使用 OpenAPI 标准生成 API 文档
- **数据完整性**：依赖数据库约束确保数据一致性
- **二进制协议**：使用 PostgreSQL 二进制协议提高性能
- **连接池**：维护数据库连接池以优化性能

## 部署要求

- PostgreSQL 9.5 或更高版本
- 支持的操作系统：Linux、macOS、Windows
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：2核+ CPU，1GB+ 内存
- 存储空间：取决于数据库大小 