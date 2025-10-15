---
id: novu
name: Novu
description: 开源的多渠道通知服务平台
tags:
  - 通知
  - 消息队列
  - 工作流
category: 通知与消息
website: 'https://novu.co'
repo: 'https://github.com/novuhq/novu'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Novu 提供统一的通知编排服务，帮助开发者在一个控制面板中管理邮件、短信、Push、聊天机器人等多种渠道，并追踪发送状态。

## 核心功能

- **可视化工作流**：通过拖拽定义通知流程、分支、延迟与重试策略。
- **多渠道适配**：内置数十个邮件、短信、聊天、推送服务的集成适配器。
- **模板与变量**：支持多语言模板、条件渲染与自定义 payload，便于复用。
- **受众分组与偏好**：按用户偏好选择渠道，支持订阅管理与静默时间设置。
- **观测与日志**：提供仪表盘查看送达率、失败原因，并暴露 REST API 与 SDK。

## 部署建议

1. Docker Compose 默认包含 API、Web 控制台、Worker、Redis、MongoDB，部署时请配置 `JWT_SECRET`、`ENCRYPTION_KEY` 等变量。
2. 生产环境建议将 MongoDB、Redis 迁移到托管服务，并使用多个 Worker 提升吞吐。
3. 为 Web 与 API 配置反向代理和 HTTPS，避免 WebSocket 通信被阻断。
4. 定期备份 MongoDB 数据库，并监控队列处理状况防止通知积压。
