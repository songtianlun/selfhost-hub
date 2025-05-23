---
id: dozzle
name: Dozzle
description: 轻量级 Docker 容器日志查看器，支持实时监控、搜索和过滤功能
tags:
  - 监控
  - Docker
  - 日志
  - Go
rating: 
category: 系统监控
website: 'https://dozzle.dev'
repo: 'https://github.com/amir20/dozzle'
updatedAt: '2025-05-24T00:00:00+08:00'
---

Dozzle 是一个轻量级的 Docker 容器日志查看器，提供实时日志监控、搜索和过滤功能。它通过 Web 界面展示容器日志，无需存储任何日志文件，专注于实时监控。

## 主要功能

- **实时监控**：实时查看容器日志，支持自动滚动
- **智能搜索**：支持容器名称的模糊搜索
- **高级过滤**：支持正则表达式和 SQL 查询进行日志搜索
- **多容器视图**：支持分屏查看多个容器的日志
- **实时统计**：显示内存和 CPU 使用情况
- **多用户认证**：支持代理转发认证
- **集群支持**：支持 Docker Swarm 模式
- **代理模式**：支持监控多个 Docker 主机
- **深色模式**：提供深色主题支持

## 部署要求

- 支持 Docker 部署
- 操作系统：支持 Linux、macOS、Windows
- 最低配置：0.5核 CPU，128MB 内存
- 推荐配置：1核+ CPU，256MB+ 内存
- 存储空间：基础安装约 7MB
- 需要访问 Docker socket 以获取容器日志 

## References
- <https://www.reddit.com/r/selfhosted/comments/1ks0kca/easily_the_most_elegant_selfhosted_monitoring/>