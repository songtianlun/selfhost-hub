---
id: erxes
name: erxes
description: 市场营销、销售与客服一体化增长平台
tags:
  - 客户关系
  - 营销自动化
  - 销售
category: 客户关系
website: 'https://erxes.io'
repo: 'https://github.com/erxes/erxes'
updatedAt: '2025-05-12T00:00:00.000Z'
---

erxes 是一个模块化的开源增长平台，结合潜在客户收集、销售漏斗、营销自动化与客户支持，适合需要掌握数据主权的企业团队。

## 核心功能

- **线索捕获与 CRM**：提供 Web 表单、Messenger、集成插件收集潜在客户，并以管道视图追踪销售阶段。
- **营销自动化**：构建邮件、短信、推送等多渠道自动化流程，支持分段与触发条件。
- **客服中心**：集中管理来自多渠道的客户请求，提供工单、知识库与团队协作。
- **插件体系**：内置任务管理、OKR、订阅计费等模块，可按需启用。
- **数据隐私**：所有客户数据保存在自有基础设施，满足合规与定制需求。

## 部署建议

1. 官方提供 Docker Compose，依赖 Node.js、MongoDB、Redis 与 Elasticsearch；生产环境建议使用外部托管数据库以提高稳定性。
2. 在 `.env` 中设置 `MAIN_APP_DOMAIN`、`MONGO_URL`、`REDIS_HOST`、邮件服务与身份认证相关配置。
3. 若需扩展实时消息，可水平扩展 API 和 Worker 容器，并启用消息队列确保任务可靠性。
4. 配置 HTTPS、备份 MongoDB 数据，并定期更新到最新版本以获得安全修复。
