---
id: nango
name: Nango
description: 自托管的第三方 SaaS 集成与统一 API 平台
tags:
  - 集成平台
  - API
  - OAuth
category: 开发工具
website: 'https://nango.dev'
repo: 'https://github.com/NangoHQ/nango'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Nango 专注于帮助产品快速对接第三方 SaaS，提供 OAuth 授权、令牌轮转、数据同步与统一 API，让团队无需重复实现各类集成逻辑。

## 核心功能

- **统一授权流程**：封装常见 SaaS 的 OAuth/OIDC 流程，自动处理 Refresh Token 与凭证加密。
- **标准化 API**：针对 CRM、工单、存储等领域提供统一的数据模型，简化上层业务开发。
- **数据同步任务**：通过轮询与 Webhook 自动同步第三方数据，支持增量更新与错误重试。
- **连接器模板**：内置数十个官方连接器，可通过 YAML 定义自定义 SaaS 的端点与字段映射。
- **开发者工具链**：提供 CLI、仪表盘与日志追踪，便于调试和监控集成状态。

## 部署建议

1. Docker Compose 默认包含服务端、仪表盘与 PostgreSQL，部署时需设置 `NANGO_ENCRYPTION_KEY`、`NANGO_SERVER_URL` 等变量。
2. 若需水平扩展，可将 PostgreSQL 与 Redis（可选）托管到外部服务，并通过队列处理同步任务。
3. 在生产环境中启用 HTTPS，配置域名并在仪表盘中登记回调地址，以确保 OAuth 重定向正确。
4. 定期备份数据库，特别是存储的 OAuth 凭证，确保灾备安全。
