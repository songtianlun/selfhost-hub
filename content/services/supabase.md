---
id: supabase
name: Supabase
description: 开源的后端即服务与实时数据库平台
tags:
  - BaaS
  - 数据库
  - 实时
category: 开发工具
website: 'https://supabase.com'
repo: 'https://github.com/supabase/supabase'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Supabase 提供与 Firebase 类似的后端能力，包括 PostgreSQL、身份认证、存储、实时订阅与 Edge 函数，让团队在自托管环境中快速搭建现代应用。

## 核心功能

- **PostgreSQL 数据库**：自动启用行级安全（RLS），提供 SQL 编辑器与备份工具。
- **身份认证**：支持邮箱、Magic Link、社交登录及多因素认证，并开放管理 API。
- **实时与订阅**：基于 PostgreSQL 逻辑复制实现实时监听，支持 WebSocket 与广播频道。
- **对象存储**：兼容 S3 API 的文件存储服务，内置访问策略与图像变换。
- **Edge Functions**：使用 Deno 编写服务器端逻辑，支持计划任务与 Webhook 触发。

## 部署建议

1. 官方 `supabase/docker` 模板包含 Studio、API、Realtime、Auth、Storage、Postgres 等服务，建议在 `.env` 中配置 `JWT_SECRET`、`ANON_KEY`、`SERVICE_ROLE_KEY`。
2. 生产环境中应将 Postgres 数据目录、对象存储挂载持久化卷，并启用增量备份或外部备份策略。
3. 如果需要水平扩展，可拆分 API、Realtime 与 Studio 节点，结合负载均衡与外部 PostgreSQL 服务。
4. 通过反向代理提供 HTTPS，并限制管理端口的访问范围以提升安全性。
