---
id: fider
name: Fider
description: 面向社区与客户的开源反馈收集平台
tags:
  - 用户反馈
  - 社区
  - 投票
category: 客户反馈
website: 'https://fider.io'
repo: 'https://github.com/getfider/fider'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Fider 帮助产品团队集中收集和管理用户建议，通过投票排名与状态同步，让路线图规划透明可追踪。

## 核心功能

- **反馈门户**：用户提交想法、讨论并通过投票表达优先级。
- **状态流转**：管理员可将条目标记为计划中、进行中、已完成等，自动通知订阅者。
- **单点登录**：支持 OAuth、SAML 或自定义认证，保护私有社区。
- **多租户**：同一实例可创建多个社区，为不同产品或客户群组隔离反馈。
- **集成与 API**：提供 Webhook、Zapier、REST API，方便与工单、项目管理或通知系统联动。

## 部署建议

1. 官方镜像基于 Go 与 PostgreSQL，使用 Docker Compose 时需为数据库和上传文件配置持久化卷。
2. 设置 `FIDER_HOST`、`FIDER_EMAIL_PROVIDER` 等环境变量，启用邮件发送以便用户确认与通知。
3. 若需 SSO，按照文档配置 OAuth 客户端或反向代理头部。
4. 建议放置在 HTTPS 反向代理之后，并定期备份 PostgreSQL 数据库。
