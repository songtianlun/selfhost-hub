---
id: prometheus
name: Prometheus
description: 开源的监控和告警系统，专注于可靠性，提供强大的查询语言和告警功能
tags:
  - 监控
  - 时序数据库
  - 告警
  - 指标收集
category: 系统监控
website: 'https://prometheus.io'
repo: 'https://github.com/prometheus/prometheus'
updatedAt: '2025-05-10T15:00:00.000Z'
---

Prometheus 是一个开源的监控和告警系统，专注于可靠性，提供强大的查询语言和告警功能。它采用拉取模式收集指标，支持多种服务发现机制，是云原生监控的事实标准。

## 主要功能

- **多维度数据模型**：支持标签和指标的多维度查询
- **强大的查询语言**：PromQL 提供灵活的数据查询能力
- **告警管理**：支持灵活的告警规则和通知
- **多种集成**：支持多种客户端库和导出器
- **服务发现**：支持多种服务发现机制
- **高可用性**：支持数据持久化和复制
- **可视化**：与 Grafana 等工具集成
- **长期存储**：支持远程存储接口

## 部署要求

- 支持多种部署方式：Docker、Kubernetes、二进制安装
- 操作系统：支持 Linux、macOS、Windows
- 最低配置：2核 CPU，4GB 内存
- 推荐配置：4核+ CPU，8GB+ 内存
- 存储空间：取决于监控指标数量和保留时间 