---
id: chatwoot
name: Chatwoot
description: 全渠道客户沟通与客服协作平台
tags:
  - 客户支持
  - 在线客服
  - 工单
category: 客户支持
website: 'https://www.chatwoot.com'
repo: 'https://github.com/chatwoot/chatwoot'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Chatwoot 是开源的全渠道客服平台，整合邮件、Web 聊天、社交媒体与消息应用，帮助团队集中处理客户对话并自动化分配工单。

## 核心功能

- **多渠道收件箱**：集成网站聊天、电子邮件、WhatsApp、Telegram、Facebook 等渠道。
- **团队协作**：可创建多个收件箱、自动分配负责人，并支持内部备注与标签管理。
- **自动化与机器人**：提供业务时间、自动回复与聊天机器人集成，减轻人工负担。
- **知识库与调查**：嵌入式知识库与会话后 CSAT 调查，提升用户自助率与满意度。
- **扩展 API**：GraphQL/REST API、Webhook 与应用市场，方便与 CRM、工单或数据仓库连接。

## 部署建议

1. 官方 Docker Compose 依赖 PostgreSQL、Redis 与 Rails 后端，部署时为数据库和上传目录挂载持久化卷。
2. 在 `.env` 中配置 `SECRET_KEY_BASE`、`FRONTEND_URL`、`MAILER_*`、第三方渠道凭证等关键变量。
3. 建议配合 Nginx/Traefik 设置 HTTPS 与 WebSocket 转发，并在后台启用对象存储以减轻本地磁盘压力。
4. 通过 Sidekiq 队列处理异步任务，可使用多 worker 实例提升高并发消息处理能力。
