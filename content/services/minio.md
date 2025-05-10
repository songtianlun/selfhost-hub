---
id: minio
name: MinIO
description: 高性能的分布式对象存储系统，兼容 Amazon S3 API
tags:
  - 存储
  - 对象存储
  - Go
rating: 3
category: 文件存储
website: 'https://min.io'
repo: 'https://github.com/minio/minio'
updatedAt: '2025-05-10T12:19:25.648Z'
---

MinIO 是一个高性能的分布式对象存储系统，兼容 Amazon S3 API。它专为云原生应用设计，支持容器化部署，是一个企业级的对象存储解决方案。

## 主要功能

- **S3 兼容**：完全兼容 Amazon S3 API
- **分布式存储**：支持分布式部署和扩展
- **数据保护**：支持数据加密和纠删码
- **版本控制**：支持对象版本控制
- **事件通知**：支持多种事件通知方式
- **访问控制**：细粒度的访问权限控制
- **数据管理**：支持数据生命周期管理
- **监控告警**：内置监控和告警功能
- **多租户**：支持多租户隔离
- **容器化**：支持 Docker 和 Kubernetes 部署

## 部署要求

- Go 1.16 或更高版本
- 支持的操作系统：Linux、Windows、macOS
- 最低配置：2核 CPU，2GB 内存
- 推荐配置：4核+ CPU，4GB+ 内存
- 存储空间：根据需求配置
- 网络：建议使用高速网络 
