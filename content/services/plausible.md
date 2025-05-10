---
id: plausible
name: Plausible Analytics
description: 轻量级、开源的网站分析工具，注重隐私保护
tags:
  - 分析
  - 监控
  - 隐私
  - Elixir
rating: 3.5
category: 网站分析
website: 'https://plausible.io'
repo: 'https://github.com/plausible/analytics'
updatedAt: '2025-05-07T14:08:12.222Z'
---

Plausible Analytics 是一个开源、轻量级的网站访问统计分析工具，专注于简洁性和隐私保护。它提供了清晰直观的访问数据，无需使用 Cookie，也不会收集个人身份信息。

## 主要功能

- **轻量脚本**：分析脚本不到 1KB，加载速度比 Google Analytics 快 45 倍
- **无 Cookie**：不使用 Cookie，无需复杂的 Cookie 横幅
- **隐私保护**：完全符合 GDPR、CCPA 等隐私法规
- **简洁界面**：一目了然的数据展示，无复杂设置
- **实时数据**：实时监控网站访问情况
- **开放数据**：可选择公开分享数据面板
- **目标跟踪**：设置并跟踪转化目标
- **UTM 标签**：分析营销活动效果
- **自定义事件**：跟踪特定用户行为
- **网站过滤器**：精确筛选数据
- **导出功能**：支持导出数据为 CSV 格式

## 部署要求

- 支持 Docker 和 Kubernetes 部署
- 基于 Elixir 和 PostgreSQL
- ClickHouse 数据库（用于数据存储）
- 最低配置：1核 CPU，1GB 内存
- 推荐配置：2核+ CPU，2GB+ 内存
- 存储空间：约 500MB（基础安装），随访问量增长
- 可选：反向代理（如 Nginx）提供 HTTPS 访问
- 可选：SMTP 服务（用于发送报告） 
