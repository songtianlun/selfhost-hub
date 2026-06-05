---
id: gatus
name: Gatus
description: 开发者向的自动化服务健康仪表盘，通过 YAML 配置监控 HTTP、TCP、DNS 等服务状态
tags:
  - 监控
  - 状态页面
  - Go
  - Docker
  - K8S
rating: 4.0
category: 系统监控
website: 'https://gatus.io'
repo: 'https://github.com/TwiN/gatus'
updatedAt: '2026-05-21T02:07:00.141Z'
---

Gatus 是一个面向开发者的自动化服务健康仪表盘，通过简洁的 YAML 配置即可监控 HTTP、TCP、DNS、ICMP 等多种服务，并提供美观的状态页面和灵活的告警通知。

## 主要功能

- **多协议支持**：支持 HTTP、HTTPS、TCP、UDP、ICMP（Ping）、DNS 等多种监控协议
- **条件断言**：可自定义响应状态码、响应体内容、证书有效期等检查条件
- **状态页面**：内置公开状态页面，支持自定义域名和徽章（Badge）嵌入
- **灵活告警**：集成 Slack、PagerDuty、Telegram、Email、Discord、Teams 等多种通知渠道
- **图表与历史**：记录响应时间趋势，提供直观的可用性统计图表
- **外部存储**：支持 SQLite 和 Postgres 持久化历史数据
- **Kubernetes 就绪**：原生支持 K8s 部署，提供 Helm Chart
- **轻量高效**：使用 Go 编写，内存占用极低，适合资源受限环境

## 部署要求

- 支持 Docker 一键部署（官方提供镜像）
- 操作系统：Linux、macOS、Windows
- 最低配置：0.1核 CPU，32MB 内存
- 存储空间：镜像约 20MB，历史数据按需增长
- 配置方式：单一 YAML 配置文件，学习成本低
