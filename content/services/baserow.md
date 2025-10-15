---
id: baserow
name: Baserow
description: 无代码构建可协作的在线数据库
tags:
  - 无代码
  - 数据库
  - 协作
category: 数据与BI
website: 'https://baserow.io'
repo: 'https://gitlab.com/baserow/baserow'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Baserow 是一个类似 Airtable 的开源无代码数据库平台，支持在浏览器中快速建表、定义视图、协作编辑，并通过 API 与外部系统集成。

## 核心功能

- **灵活的字段类型**：支持文本、数字、关联、查找、公式、附件等多种字段类型。
- **多视图呈现**：提供表格、看板、日历、画廊与表单视图，满足不同团队的展示需求。
- **实时协作**：多人同时编辑表格，自动记录修订历史与审计日志。
- **API 与自动化**：为每个表自动生成 REST API，可结合集成块实现 Webhook 与自动化任务。
- **权限与工作区**：支持多团队、多项目隔离，细粒度控制成员访问级别与共享视图。

## 部署建议

1. 官方 Docker Compose 包含后端、前端、PostgreSQL 与 Redis，部署时请将数据库与媒体卷持久化。
2. 生产环境建议启用 `BASEROW_PUBLIC_URL`、`SECRET_KEY` 等环境变量，并配置邮箱以便发送邀请通知。
3. 若需要横向扩展，可拆分前端和后端容器，使用外部 PostgreSQL/Redis 服务提高可靠性。
4. 通过反向代理开启 HTTPS，并结合备份策略定期导出 PostgreSQL 与媒体文件。
