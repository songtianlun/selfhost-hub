---
id: "uptime-kuma"
name: "Uptime Kuma"
description: "现代化的自托管监控工具，用于网站和服务可用性监测"
tags:
  - "监控"
  - "可用性"
  - "JavaScript"
  - "告警"
category: "系统监控"
rating: 4.5
website: "https://uptime.kuma.pet"
github: "https://github.com/louislam/uptime-kuma"
---

Uptime Kuma 是一个现代化、易用的自托管监控工具，用于监控网站、API、端口和其他服务的可用性。它提供了丰富的告警选项和精美的界面，让您能够实时了解服务状态。

## 主要功能

- **监控多种资源**：支持 HTTP(S)、TCP、PING、DNS、MQTT、Docker、SQL 等
- **状态页面**：提供公开的状态页面，展示服务的运行状态
- **多种告警方式**：支持 Telegram、Discord、Email、Slack、微信等多种通知渠道
- **响应时间图表**：详细记录并展示响应时间趋势
- **证书监控**：监控 SSL 证书过期情况
- **多语言支持**：界面支持多种语言，包括中文
- **代理支持**：可通过代理进行监控
- **API 监控**：支持 JSON 路径和关键字检测
- **用户管理**：多用户支持，包括 2FA 认证
- **移动友好**：响应式设计，适配移动设备

## 部署要求

- Node.js 14 或更高版本
- 数据库：SQLite（默认内置）
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：2核+ CPU，1GB+ 内存
- 存储空间：约 100MB 加上历史数据（取决于监控项数量）
- 推荐 Docker 部署或使用 Node.js 直接运行
- 网络连接：能够访问被监控的服务 