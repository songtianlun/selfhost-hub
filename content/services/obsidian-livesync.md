---
id: obsidian-livesync
name: Obsidian LiveSync
description: Obsidian 的社区同步插件，支持自托管同步和端到端加密
tags:
  - 笔记
  - 知识管理
  - 生产力
  - 同步
  - 插件
category: 笔记管理
website: 'https://github.com/vrtmrz/obsidian-livesync'
repo: 'https://github.com/vrtmrz/obsidian-livesync'
updatedAt: '2025-05-14T14:00:00.000Z'
---

Obsidian LiveSync 是一个社区开发的 Obsidian 同步插件，支持在所有 Obsidian 兼容平台上使用。它利用 CouchDB 或对象存储系统（如 MinIO、S3、R2 等）来确保可靠的数据同步，并支持端到端加密。

## 主要功能

- **自托管同步**：支持使用 CouchDB 或对象存储系统进行同步
- **端到端加密**：确保数据同步的安全性
- **高效同步**：最小化网络流量
- **冲突处理**：自动合并简单冲突
- **WebRTC 点对点同步**：支持设备间直接同步（实验性功能）
- **自定义同步**：支持同步设置、代码片段、主题和插件
- **开源解决方案**：使用开源服务器解决方案
- **多平台支持**：支持所有 Obsidian 兼容平台
- **实时同步**：支持实时数据同步
- **备份功能**：支持差异 ZIP 备份

## 部署要求

- **服务器选项**：
  - CouchDB 服务器
  - 对象存储系统（MinIO、S3、R2 等）
  - 自托管服务器
- **网络要求**：需要稳定的网络连接
- **存储空间**：取决于笔记数量和同步频率
- **安全要求**：建议配置 SSL/TLS
- **系统要求**：支持主流操作系统
- **插件依赖**：需要 Obsidian 客户端 