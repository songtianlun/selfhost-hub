---
id: "glance"
name: "Glance"
description: "自托管的信息聚合仪表板，将所有数据源集中在一个地方"
tags:
  - "信息聚合"
  - "仪表板"
  - "RSS阅读"
  - "Go"
category: "信息聚合"
website: "https://github.com/glanceapp/glance"
repo: "https://github.com/glanceapp/glance"
updatedAt: "2025-06-18T00:00:00Z"
---

Glance 是一个自托管的信息聚合仪表板，可以将RSS订阅源、社交媒体、天气预报、市场行情等各种信息源集中显示在一个页面上，打造个性化的信息中心。

## 主要功能

- **多样化小组件**：RSS订阅、Reddit帖子、Hacker News、天气预报、YouTube频道、Twitch直播、市场行情、Docker容器状态、服务器统计等
- **快速轻量**：低内存占用，单个20MB以下的二进制文件
- **高度自定义**：不同布局、多页面支持、丰富的配置选项、自定义CSS
- **移动优化**：针对移动设备优化的响应式设计
- **主题支持**：内置多种主题，支持自定义主题

## 技术特性

- **开发语言**：Go 语言开发
- **前端技术**：原生JavaScript，无复杂依赖
- **配置方式**：YAML文件配置
- **部署方式**：单一二进制文件或Docker容器
- **架构支持**：支持多种操作系统和架构

## 支持的组件

- **内容聚合**：RSS订阅源、Subreddit帖子、Hacker News
- **媒体内容**：YouTube频道更新、Twitch直播状态
- **实用工具**：天气预报、日历、市场行情
- **系统监控**：Docker容器状态、服务器统计信息
- **自定义组件**：iframe嵌入、HTML组件、API数据展示

## 部署要求

- **操作系统**：Linux、Windows、macOS
- **存储需求**：极小，主要用于配置文件
- **运行时**：无需额外运行时，或Docker环境
- **网络要求**：访问各种数据源的网络连接
- **硬件要求**：最小配置即可运行

## 配置特性

- **YAML配置**：通过简单的YAML文件配置所有组件
- **多页面支持**：可创建多个标签页组织不同类型的信息
- **响应式布局**：自动适应不同屏幕尺寸
- **缓存机制**：可配置的数据缓存策略提高性能

## References
- [Glance：自托管个人仪表板](https://lala.im/9181.html)