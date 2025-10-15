---
id: posthog
name: PostHog
description: 产品分析、事件追踪与特性开关平台
tags:
  - 产品分析
  - 事件追踪
  - 实验
category: 数据与BI
website: 'https://posthog.com'
repo: 'https://github.com/PostHog/posthog'
updatedAt: '2025-05-12T00:00:00.000Z'
---

PostHog 是开源的产品分析平台，提供事件采集、漏斗分析、用户路径、A/B 测试与 Feature Flags，帮助团队在自有环境中掌握用户行为数据。

## 核心功能

- **事件与属性**：灵活定义事件、属性与用户群组，支持客户端与服务器端 SDK。
- **可视化分析**：漏斗、留存、趋势、路径等报表快速搭建，并支持自定义仪表盘。
- **Feature Flags 与实验**：按用户细分发布功能、运行 A/B 测试并衡量影响。
- **会话回放**：记录用户会话，用于复现问题与体验优化。
- **插件与数据流水线**：通过插件系统接入数据仓库、队列或清洗逻辑，实现批量处理。

## 部署建议

1. 官方推荐使用 Helm Chart 或 Docker Compose，依赖 ClickHouse、PostgreSQL、Redis 与 Kafka；生产环境应至少部署三节点 ClickHouse 集群。
2. 设置 `SECRET_KEY`、`SITE_URL`、`EMAIL_HOST` 等环境变量，并配置对象存储保存会话回放文件。
3. 高流量场景下建议将事件采集入口与分析节点分离，开启 Kafka 分区与 ClickHouse 复制。
4. 定期备份 PostgreSQL 与 ClickHouse，同时监控磁盘和队列以防止数据堆积。
