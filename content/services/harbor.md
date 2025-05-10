---
id: harbor
name: Harbor
description: 企业级容器镜像仓库，提供安全、审计和管理功能
tags:
  - 容器
  - DevOps
  - Go
  - Docker
category: 容器平台
website: 'https://goharbor.io'
github: 'https://github.com/goharbor/harbor'
updatedAt: '2025-05-10T09:15:04.027Z'
---

Harbor 是一个开源的企业级容器镜像仓库服务，提供了内容签名、漏洞扫描、RBAC 和审计等功能。它为 Docker 和 Kubernetes 环境提供安全可靠的镜像存储和分发服务。

## 主要功能

- **安全扫描**：内置 Clair 和 Trivy 漏洞扫描
- **内容签名**：支持 Docker Notary 以验证镜像真实性
- **复制功能**：在多个仓库实例间同步镜像
- **身份验证**：集成 LDAP/AD、OIDC 等身份认证系统
- **RBAC 权限控制**：细粒度的资源访问控制
- **审计日志**：记录所有关键操作
- **垃圾回收**：自动清理未使用的镜像
- **图形界面**：友好的 Web 用户界面
- **API/CLI**：提供编程接口和命令行工具

## 部署要求

- Docker Compose 或 Kubernetes
- 最低配置：2核 CPU，4GB 内存
- 推荐配置：4核+ CPU，8GB+ 内存
- 存储空间：取决于镜像数量和大小，建议至少 50GB
- 支持的数据库：PostgreSQL
- 外部组件：Redis 
