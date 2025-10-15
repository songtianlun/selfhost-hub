---
id: nocodb
name: NocoDB
description: 将任何关系型数据库转换成协作型在线表格
tags:
  - 无代码
  - 数据库
  - 表格
category: 低代码开发
website: 'https://www.nocodb.com'
repo: 'https://github.com/nocodb/nocodb'
updatedAt: '2025-05-12T00:00:00.000Z'
---

NocoDB 可以把 MySQL、PostgreSQL、SQL Server 等关系型数据库转换成类似 Airtable 的在线协作表格，帮助团队在无需写代码的情况下搭建内部系统与数据工作流。

## 核心功能

- **多数据库支持**：兼容主流 SQL 数据库，也可连接现有业务库直接生成表格视图。
- **丰富的视图类型**：提供表格、看板、画廊、日历、甘特图等不同视图，满足多场景需求。
- **角色与权限**：支持多种权限级别，并能针对视图或字段设置访问范围，保障数据安全。
- **自动化与集成**：内置自动化流程，可连接 Slack、Teams、Zapier 等服务触发通知或同步。
- **API 网关**：自动生成 REST 与 GraphQL API，便于快速对接前端或第三方系统。

## 部署建议

1. 使用官方 Docker 镜像即可快速启动，推荐搭配外部数据库以便升级与备份。
2. 在 `docker-compose.yml` 中配置 `NC_DB` 相关环境变量，指向持久化数据库实例。
3. 生产环境建议启用反向代理与 HTTPS，并配置 SMTP 邮件服务用于邀请协作者。
4. 定期备份数据库与上传的静态资源，确保视图配置和文件附件安全。
