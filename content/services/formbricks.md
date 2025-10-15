---
id: formbricks
name: Formbricks
description: 产品团队可自托管的用户调研与反馈平台
tags:
  - 用户调研
  - 客户反馈
  - 产品分析
category: 用户反馈
website: 'https://formbricks.com'
repo: 'https://github.com/formbricks/formbricks'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Formbricks 是一个开源的用户调研与反馈收集平台，支持嵌入式问卷、应用内调查与多渠道触达，帮助产品团队持续获取定性与定量洞察。

## 核心功能

- **多渠道调查**：支持在 Web、移动端嵌入调查，也可通过链接、邮件、二维码等方式发放问卷。
- **丰富的题型**：涵盖 NPS、CSAT、CES 等标准指标以及开放题、打分、排序等题型组合。
- **实时分析**：内置仪表盘即时汇总结果，支持过滤、分组与导出原始数据。
- **用户细分**：可基于事件或属性触发定向问卷，实现针对性的用户调研。
- **集成生态**：提供 JavaScript SDK、API 与 Webhook，方便接入产品分析或数据仓库。

## 部署建议

1. 使用官方 Docker Compose 文件部署，默认包含 Next.js 前端、PostgreSQL 与后台服务。
2. 在 `.env` 中配置 `NEXTAUTH_SECRET`、数据库与邮件服务参数，以便进行身份验证和通知。
3. 如需将数据同步到数据仓库，可启用 Webhook 或编写定时任务调用 API。
4. 建议结合反向代理启用 HTTPS，并限制管理后台访问来源提升安全性。
