---
id: "keel"
name: "Keel"
description: "Kubernetes自动化部署工具，实现容器镜像的自动更新"
tags:
  - "DevOps"
  - "Kubernetes"
  - "自动化"
  - "Go"
category: "容器编排"
website: "https://keel.sh"
github: "https://github.com/keel-hq/keel"
---

Keel 是一个专为 Kubernetes 设计的自动化部署工具，可以自动检测镜像更新并相应地更新 Kubernetes 工作负载。它让持续部署变得更简单，减少了手动干预的需求。

## 主要功能

- **自动更新**：监控镜像仓库并自动更新 Kubernetes 资源
- **多种更新策略**：支持语义化版本、强制更新、不同滚动策略
- **通知集成**：支持 Slack、HipChat、Mattermost 等通知渠道
- **Webhook 触发器**：通过 webhook 触发部署
- **审批机制**：可选的部署审批流程
- **扩展 API**：丰富的 API 用于集成其他系统
- **多种部署方式**：支持 Helm、Kubernetes 清单或 Keel CLI
- **安全策略**：防止不安全镜像的更新

## 部署要求

- Kubernetes 集群 1.9+
- Helm（如果使用 Helm 安装）
- 最低配置：0.5核 CPU，256MB 内存
- 推荐配置：1核+ CPU，512MB+ 内存
- 与容器仓库的网络连接（如 Docker Hub、GCR、Harbor 等）
- 适当的 RBAC 权限（用于更新 Kubernetes 资源）