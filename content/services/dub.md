---
id: dub
name: Dub
description: 可自托管的短链接与营销转化追踪平台
tags:
  - 短链接
  - 营销
  - 统计分析
category: 营销工具
website: 'https://dub.co'
repo: 'https://github.com/dubinc/dub'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Dub 是一个开源、注重隐私的短链接平台，支持品牌化域名、团队协作、A/B 测试和转化追踪，可替代 Bitly、Rebrandly 等商业服务。

## 核心功能

- **自定义域名**：绑定多个自有域名，支持路径与参数管理，提升品牌一致性。
- **团队协作**：可创建工作区并分配成员角色，集中管理营销链接与活动。
- **转化追踪**：内置实时统计面板，提供点击趋势、来源渠道、地理位置等数据。
- **A/B 测试**：为同一链接配置多个目标地址，按权重分发以验证转化效果。
- **API 与集成**：提供 REST API、Webhook，与 Zapier、Slack 等工具集成自动化流程。

## 部署建议

1. 官方提供 Docker Compose 模板，依赖 PostgreSQL、Redis 与 Next.js 前端，可快速启动。
2. 在 `.env` 文件中配置数据库、缓存、JWT 密钥以及第三方登录与存储服务。
3. 如需启用地理定位统计，可配置 MaxMind GeoLite2 数据库或第三方 IP API。
4. 将静态资源与日志存储在持久化卷中，并通过反向代理启用 HTTPS，确保链接安全可用。
