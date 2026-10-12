---
id: libredb-studio
name: LibreDB Studio
description: 部署在数据旁边的浏览器版 SQL IDE，支持十六种数据库引擎
tags:
  - 数据库
  - 自托管
  - Docker
  - TypeScript
category: 数据库管理
website: 'https://libredb.org'
repo: 'https://github.com/libredb/libredb-studio'
updatedAt: '2026-09-18T00:00:00.000Z'
---

LibreDB Studio 把数据库编辑器部署到数据旁边，而不是装到每个人的笔记本上。凭据留在服务器上，团队通过浏览器访问同一批连接。

## 主要功能

- **十六种引擎，一个标签页**：PostgreSQL、MySQL、Oracle、SQL Server、SQLite、ClickHouse、DuckDB、Trino、Cassandra、Druid、Elasticsearch、OpenSearch、MongoDB、Redis、Couchbase 等
- **对象浏览器、ER 图与 schema 对比**：所有 SQL 引擎共用同一套界面，各引擎的例外都写在对应的 provider 文档里
- **SSO 与审计**：OIDC 登录、管理员与普通用户角色、查询历史都在 MIT 版本内，没有企业版
- **AI 辅助查询**：自然语言转 SQL 与查询解释，使用你自己的 LLM API Key，也可以不配置
- **多种部署方式**：单个容器，另有 Helm chart、Kubernetes operator、Snap、deb/rpm 和 npm 启动器

## 部署要求

- Docker：`docker run -p 3000:3000 ghcr.io/libredb/libredb-studio:latest`，首次启动会生成管理员密码并打印到日志
- 存储：`STORAGE_PROVIDER` 可选本地文件、SQLite 或 PostgreSQL，用于保存连接与查询历史
- 通过局域网 HTTP 访问时需要设置 `AUTH_COOKIE_SECURE=false`，否则健康检查正常但登录会静默失败
- 正式使用请置于 HTTPS 反向代理之后，并自行设置 `JWT_SECRET` 与 `ADMIN_PASSWORD`
