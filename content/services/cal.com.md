---
id: cal.com
name: Cal.com
description: 开源的会议预约与日程安排平台
tags:
  - 日程安排
  - 协同办公
  - SaaS 替代
category: 协同办公
website: 'https://cal.com'
repo: 'https://github.com/calcom/cal.com'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Cal.com 是一个开源的会议预约系统，可自托管替代 Calendly 等 SaaS 服务，帮助团队自动协调会议时间、同步日历并支持付费预约。

## 核心功能

- **多日历同步**：支持 Google、Microsoft、Apple 等主流日历，自动避开冲突时段。
- **多类型事件**：可创建一对一、群组或轮询分配等多种会议类型，并设定缓冲时间、最小提前量等规则。
- **自定义表单与工作流**：通过自定义字段收集参会信息，并可结合 Webhook、Zapier 等触发后续自动化。
- **品牌化体验**：自定义主题、域名与邮件模板，提供统一的预约页面体验。
- **支付与增值**：可对接 Stripe、Lemon Squeezy 等支付渠道，实现付费咨询或课程预约。

## 部署建议

1. 推荐使用 Docker Compose 部署，服务依赖 PostgreSQL、Redis 与 Next.js Web 前端。
2. 配置 `NEXTAUTH_SECRET`、`DATABASE_URL` 等环境变量，并在 OAuth 控制台启用相应日历 API。
3. 如果需要发送邮件通知，需配置 SMTP 服务或使用 Postmark、SendGrid 等第三方。
4. 通过反向代理提供 HTTPS 访问，并为 Webhook 与支付回调开放公网入口。
