---
id: papercups
name: Papercups
description: 开源的实时客服与站内消息系统
tags:
  - 客户支持
  - 实时聊天
  - 嵌入组件
category: 客户支持
website: 'https://papercups.io'
repo: 'https://github.com/papercups-io/papercups'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Papercups 提供可嵌入网站的实时聊天组件，帮助团队搭建自托管的客服对话与站内消息体验，同时保持客户数据可控。

## 核心功能

- **可定制的聊天窗口**：通过简单配置修改主题、语言、触发方式及欢迎语。
- **多渠道收件箱**：集中管理来自网站、Slack、电子邮件等渠道的消息。
- **自动化回复**：支持常见问题的快捷回复、自动分配与 SLA 提醒。
- **客户档案与事件**：记录访问者信息、页面轨迹与自定义属性，便于精准服务。
- **API 与 Webhook**：与 Slack、Zapier、CRM 等系统集成，实现通知和数据同步。

## 部署建议

1. 官方 Docker Compose 依赖 Elixir Phoenix 后端、PostgreSQL 与 Redis，部署时需设置 `SECRET_KEY_BASE`、`DATABASE_URL` 等变量。
2. 若需要将聊天消息同步到 Slack，请在管理后台配置 Slack Bot Token 与频道映射。
3. 配置反向代理启用 HTTPS，并设置 `HOST`、`URL` 环境变量确保嵌入脚本加载正确。
4. 定期备份数据库，尤其是客户对话与事件数据，满足合规要求。
