---
id: n8n
name: n8n
description: 强大的工作流自动化工具，可连接各种服务和API
tags:
  - 自动化
  - 工作流
  - 集成
  - JavaScript
category: 实用工具
website: 'https://n8n.io'
repo: 'https://github.com/n8n-io/n8n'
updatedAt: '2025-05-08T01:24:51.131Z'
---

n8n 是一个开源的工作流自动化平台，允许您连接不同的服务和 API，以创建自动化的工作流程。它提供了直观的可视化界面，让用户无需编程知识也能构建复杂的自动化流程。

## 主要功能

- **节点式工作流**：通过可视化界面拖拽节点创建工作流
- **丰富的集成**：支持 200+ 服务的预构建节点
- **自定义函数**：使用 JavaScript/TypeScript 实现自定义逻辑
- **错误处理**：内置的错误处理和重试机制
- **数据转换**：强大的数据映射和转换能力
- **定时触发**：基于时间或事件触发工作流
- **Webhook 支持**：通过 Webhook 接收外部触发
- **子工作流**：模块化工作流设计
- **API 访问**：完整的 REST API
- **执行历史**：查看和调试工作流执行历史

## 部署要求

- Node.js 16 或更高版本
- 数据库：SQLite（默认，内置）、MySQL、PostgreSQL
- 最低配置：1核 CPU，1GB 内存
- 推荐配置：2核+ CPU，2GB+ 内存
- 存储空间：约 500MB（基础安装）
- 网络连接：可连接到您希望集成的各种服务
- 可选 Redis：用于队列（大规模部署推荐） 
