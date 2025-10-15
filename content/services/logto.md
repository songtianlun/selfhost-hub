---
id: logto
name: Logto
description: 面向现代应用的开源身份认证与用户管理平台
tags:
  - 身份认证
  - OAuth
  - 多租户
category: 身份认证
website: 'https://logto.io'
repo: 'https://github.com/logto-io/logto'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Logto 提供类似 Auth0 的开源身份服务，支持 OAuth 2.1、OpenID Connect、社交登录与多租户管理，帮助团队快速构建安全的登录体验并掌控用户数据。

## 核心功能

- **多种身份源**：支持密码登录、社交账号、企业 IdP、密码less 与多因素认证。
- **统一用户中心**：提供管理控制台查看用户档案、会话、角色与权限。
- **多租户与组织**：可为企业客户开启独立的目录与 SSO 集成，实现 B2B 场景。
- **精细的授权流程**：内置权限模型、Scopes、API 资源与审计日志，满足复杂应用需求。
- **SDK 与前端组件**：提供 Web、React Native 等 SDK 及托管登录页面，快速接入。

## 部署建议

1. 官方提供 Docker Compose，依赖 PostgreSQL 与 Redis，部署时需设置 `ENCRYPTION_KEY`、`ENDPOINT`、`ADMIN_ENDPOINT` 等环境变量。
2. 管理后台默认使用端口 3002，建议通过反向代理分别映射用户端与管理端域名，并启用 HTTPS。
3. 若需要与对象存储或短信服务集成，可在管理后台配置相应的连接器。
4. 定期备份 PostgreSQL 数据，并关注版本更新以获得安全修复与协议改进。
