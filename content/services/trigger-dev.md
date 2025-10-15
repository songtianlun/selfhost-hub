---
id: trigger-dev
name: Trigger.dev
description: 面向 TypeScript 的开源后台任务与工作流编排平台
tags:
  - 后台任务
  - 工作流
  - TypeScript
category: 开发工具
website: 'https://trigger.dev'
repo: 'https://github.com/triggerdotdev/trigger.dev'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Trigger.dev 让开发者以 TypeScript 编写可靠的后台任务、定时器与事件驱动工作流，兼顾本地开发体验与生产可观测性，可替代自建队列服务。

## 核心功能

- **代码即工作流**：使用 TypeScript/JavaScript 定义作业，支持 Cron、Webhook、队列事件等触发方式。
- **自动重试与并发控制**：内置幂等性、超时、重试策略与速率限制，保证任务可靠执行。
- **可观测性**：控制台提供执行日志、参数、持续时间与错误栈，方便排障。
- **集成生态**：内置 Slack、GitHub、Notion、Resend 等连接器，并支持自定义集成。
- **开发者体验**：本地 CLI 热重载，支持直接调试云端任务，提升迭代效率。

## 部署建议

1. 官方 Docker Compose 包含 API、Worker、Web UI、PostgreSQL 与 Redis，部署时需配置 `TRIGGER_API_URL`、`TRIGGER_SECRET_KEY` 等环境变量。
2. 生产环境应为 PostgreSQL 与 Redis 启用高可用部署，并监控队列长度与失败任务。
3. 若要横向扩展，可启动多个 Worker 实例并使用共享 Redis 处理任务分发。
4. 配合反向代理启用 HTTPS，并限制管理界面的访问来源保障安全。
