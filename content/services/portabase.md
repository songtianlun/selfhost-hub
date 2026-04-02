---
id: portabase
name: Portabase
description: 用于简化数据库实例备份和恢复的工具，支持 PostgreSQL、MySQL、MariaDB、MongoDB、SQLite、Redis、Valkey 和 Firebird。
tags:
  - 数据库
  - 备份
  - Docker
category: 数据备份
website: 'https://portabase.io/'
repo: 'https://github.com/Portabase/portabase'
---

Portabase 是一款开源的自托管数据库备份与恢复平台，旨在简化数据库实例的备份管理。它通过部署在数据库容器旁边的轻量级 [Portabase Agent](https://github.com/Portabase/agent) 安全、高效地处理备份操作，所有任务均可通过简洁的 Web 控制台统一管理。

## 支持的数据库

| 数据库引擎 | 状态 | 支持版本 | 恢复支持 |
|---|---|---|---|
| **PostgreSQL** | ✅ 稳定 | 12, 13, 14, 15, 16, 17, 18 | 是 |
| **MySQL** | ✅ 稳定 | 5.7, 8, 9 | 是 |
| **MariaDB** | ✅ 稳定 | 10, 11 | 是 |
| **MongoDB** | ✅ 稳定 | 4, 5, 6, 7, 8 | 是 |
| **SQLite** | ✅ 稳定 | 3.x | 是 |
| **Redis** | ✅ 稳定 | 2.8+ | 否 |
| **Valkey** | ✅ 稳定 | 7.2+ | 否 |
| **Firebird** | ✅ 稳定 | 3.0, 4.0, 5.0 | 是 |

## 主要功能

- **统一控制台**：通过单一 Web 界面管理所有数据库备份任务。
- **Agent 架构**：轻量级 Agent 与数据库容器并行部署，与 Portabase 服务器安全通信。
- **计划备份**：为每个数据库实例配置自动备份计划。
- **备份恢复**：支持从控制台直接恢复数据库（适用于支持恢复的引擎）。
- **多数据库支持**：兼容主流关系型、文档型和键值型数据库。
- **完全开源**：Apache-2.0 授权，数据始终存储在自己的基础设施中。

## 部署方式

Portabase 支持以下四种部署方式：

1. **自动化 CLI**（推荐）：使用官方 CLI 一键完成 Portabase 及 Agent 的部署。
2. **Docker Run**：通过单条 `docker run` 命令快速启动容器。
3. **Docker Compose**：使用官方提供的 `docker-compose.yml` 进行多容器编排部署。
4. **Kubernetes / Helm**：通过官方 Helm Chart 部署到 Kubernetes 集群。

开始前请确保已安装 Docker。详细步骤请参阅[官方安装文档](https://portabase.io/docs/dashboard/setup)。
