---
id: "umami-dashboard"
name: "Umami Dashboard"
description: "现代化的Umami分析仪表板，提供实时网站流量统计和监控功能"
tags:
  - "网站分析"
  - "实时监控"
  - "仪表板"
  - "Next.js"
category: "网站分析"
website: "https://ud.frytea.com"
repo: "https://github.com/songtianlun/umami-dashboard"
updatedAt: "2025-06-18T00:00:00Z"
---

Umami Dashboard 是一个现代化的 Umami 分析仪表板，提供实时网站流量统计和监控功能。基于 Next.js 14 构建，具有清洁的界面设计和强大的数据可视化能力。

## 主要功能

- **实时流量监控**：显示最近24小时的网站访问统计
- **多网站聚合**：支持多个网站的统计数据聚合显示
- **历史数据图表**：可视化展示历史访问数据和趋势
- **灵活配置管理**：支持环境变量和本地存储配置
- **自动刷新设置**：可配置的数据自动刷新间隔
- **本地数据存储**：支持配置信息的本地持久化存储
- **环境变量支持**：便于容器化部署和配置管理

## 技术特性

- **前端框架**：Next.js 14 (App Router)
- **UI组件**：Shadcn/ui + Tailwind CSS
- **图表库**：Recharts
- **状态管理**：React Hooks
- **数据存储**：LocalStorage + Session History
- **类型支持**：TypeScript

## 部署要求

- **运行环境**：Node.js 18+ 或 Docker
- **存储需求**：较小，主要用于配置存储
- **网络要求**：需要访问 Umami 服务器
- **依赖服务**：Umami Analytics 服务器

## 配置选项

支持通过环境变量预设配置：
- UMAMI_SERVER_URL：Umami服务器地址
- UMAMI_USERNAME：登录用户名
- UMAMI_PASSWORD：登录密码
- NEXT_PUBLIC_UMAMI_ANALYTICS_URL：分析脚本URL
- NEXT_PUBLIC_UMAMI_WEBSITE_ID：网站ID 