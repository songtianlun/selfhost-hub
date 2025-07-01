---
id: goatcounter
name: GoatCounter
description: 简单、隐私友好的开源网站访问统计工具
tags:
  - 统计分析
  - 隐私保护
  - Go
  - 访问分析
category: 网站监控
#rating: 4
website: 'https://www.goatcounter.com'
repo: 'https://github.com/arp242/goatcounter'
updatedAt: '2025-07-01T00:00:00.000Z'
---

GoatCounter 是一个简单、隐私友好的开源网站访问统计工具。它专注于提供有用的数据而不侵犯用户隐私，不使用 cookie，不收集个人信息，并且符合 GDPR 规范。

## 主要功能

- **隐私友好**：不使用 cookie，不收集个人数据，符合 GDPR
- **轻量级**：JavaScript 代码只有 3.5KB，对网站性能影响最小
- **实时数据**：实时显示访问统计数据
- **详细统计**：包括页面浏览量、唯一访问者、引荐来源、浏览器信息等
- **多站点支持**：单个实例可管理多个网站
- **API 支持**：提供 REST API 用于数据导出和集成
- **自定义事件**：支持跟踪自定义事件和目标转化
- **移动友好**：响应式界面，适配移动设备
- **导出功能**：支持数据导出为 CSV 格式
- **无 JavaScript 模式**：即使用户禁用 JavaScript 也能统计访问

## 部署要求

- Go 1.21 或更高版本
- 数据库：SQLite（默认）或 PostgreSQL
- 最低配置：1核 CPU，256MB 内存
- 推荐配置：1核+ CPU，512MB+ 内存
- 存储空间：约 50MB 加上统计数据（数据量较小）
- 支持 Docker 部署或直接运行
- 可选择使用官方托管服务或自托管