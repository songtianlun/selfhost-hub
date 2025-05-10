---
id: tegon
name: Tegon
description: 开源的GitOps平台，专注于Kubernetes环境
tags:
  - DevOps
  - Kubernetes
  - GitOps
  - Go
category: 代码托管
website: 'https://tegon.io'
repo: 'https://github.com/tegonhq/tegon'
updatedAt: '2025-05-10T14:00:00.000Z'
---

Tegon 是一个开源的GitOps平台，专注于Kubernetes环境的自动化部署和管理。它通过Git作为单一事实来源，实现基础设施和应用的声明式管理。

## 主要功能

- **GitOps工作流**：基于Git的自动化部署
- **Kubernetes集成**：原生支持K8s环境
- **多集群管理**：支持管理多个K8s集群
- **自动化同步**：自动同步Git仓库到集群
- **健康检查**：应用健康状态监控
- **回滚支持**：快速回滚到之前的版本
- **权限管理**：细粒度的访问控制
- **审计日志**：完整的操作审计
- **通知集成**：支持多种通知渠道

## 部署要求

- 支持平台：Kubernetes集群
- 最低配置：2核CPU，4GB内存
- 推荐配置：4核+ CPU，8GB+ 内存
- 存储空间：建议至少20GB
- 依赖：Kubernetes 1.19+
- 网络：需要访问Git仓库 