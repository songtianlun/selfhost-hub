---
id: windmill
name: Windmill
description: 面向开发团队的自托管自动化与集成平台
tags:
  - 自动化
  - 工作流
  - 脚本
category: 开发工具
website: 'https://www.windmill.dev'
repo: 'https://github.com/windmill-labs/windmill'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Windmill 是开源的自动化与集成平台，允许团队使用 Python、TypeScript、Bash 等脚本构建工作流，编排 API 调用与人工审批，并提供自托管的运行时管理。

## 核心功能

- **多语言脚本**：支持 Python、TypeScript/JavaScript、Go、Bash 等运行时，可在浏览器中编写与调试。
- **工作流编排**：通过可视化编辑器组合任务、分支、循环与人工步骤，支持参数传递与重试。
- **连接器市场**：内置上百个 SaaS 与数据库连接器，简化身份认证与调用配置。
- **权限与审计**：细粒度 RBAC、审批流程与执行日志，确保团队协作和合规。
- **部署选项**：支持多租户工作区、私有运行器以及向外暴露的 API 端点。

## 部署建议

1. 官方 Helm Chart 与 Docker Compose 均依赖 PostgreSQL 与 Redis，部署时需设置 `WINDMILL_ENCRYPTION_KEY`、`BASE_URL` 等环境变量。
2. 生产环境建议将执行器（workers）与控制平面分离，按工作负载扩容 Worker 节点。
3. 若需与内部网络系统集成，可部署自托管 Runner，通过 WebSocket 与控制平面通信。
4. 配置 HTTPS 与身份提供商（如 OIDC、SAML）以实现单点登录，并定期备份 PostgreSQL 数据。
