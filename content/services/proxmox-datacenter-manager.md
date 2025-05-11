---
id: proxmox-datacenter-manager
name: Proxmox Datacenter Manager
description: 基于 Rust 构建的现代化 Proxmox 数据中心管理工具，提供集中化的节点和集群管理界面
tags:
  - 虚拟化
  - 管理工具
  - Rust
  - 数据中心
category: 服务器虚拟化
website: 'https://pve.proxmox.com/wiki/Proxmox_Datacenter_Manager_Roadmap'
repo: 'https://git.proxmox.com/?p=pdm.git;a=summary'
updatedAt: '2025-05-11T09:00:00.000Z'
---

Proxmox Datacenter Manager 是一个基于 Rust 构建的现代化数据中心管理工具，旨在提供集中化的节点和集群管理界面，让您能够更好地管理分布式的 Proxmox VE 环境。

## 主要功能

- **集中化管理**：提供统一的界面来管理多个独立的节点或集群
- **资源监控**：查看所有节点和虚拟机的资源使用情况
- **远程迁移**：支持在不同数据中心之间迁移虚拟机
- **多因素认证**：支持标准的 Proxmox 多因素认证
- **ACME 支持**：内置 Let's Encrypt 证书管理
- **现代化界面**：采用全新的 widget 工具包构建，提供更好的用户体验
- **Rust 开发**：后端 API 服务器、CLI 工具和前端均使用 Rust 开发

## 部署要求

- Debian Bookworm (12.8) 或更高版本
- 6.8.12-5 或 6.11 内核
- ZFS 2.2.6（如果使用 6.11 内核需要兼容性补丁）
- 网络连接：能够访问 Proxmox VE 节点

## References
- [官方文档](https://pve.proxmox.com/wiki/Proxmox_Datacenter_Manager_Roadmap)
- [论坛讨论](https://forum.proxmox.com/threads/proxmox-datacenter-manager-first-alpha-release.159323/) 