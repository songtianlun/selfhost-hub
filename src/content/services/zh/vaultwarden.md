---
title: Vaultwarden
description: Bitwarden 密码管理器的轻量级实现，使用 Rust 编写，资源占用更少。
tags:
  - category: 类型
    items:
      - 安全
      - 密码管理
  - category: 技术栈
    items:
      - Rust
      - SQLite
      - Docker
features:
  - 密码管理
  - 安全存储
  - 多设备同步
  - 浏览器扩展
  - 移动端支持
website: https://github.com/dani-garcia/vaultwarden
github: https://github.com/dani-garcia/vaultwarden
license: GPL-3.0
---

# Vaultwarden

Vaultwarden 是 Bitwarden 密码管理器的轻量级实现，使用 Rust 编写。它提供了与官方 Bitwarden 服务器相同的功能，但资源占用更少，更适合在资源受限的环境中使用。

## 主要功能

- **密码管理**：安全存储和管理所有密码
- **多设备同步**：在所有设备上同步密码数据
- **浏览器扩展**：支持主流浏览器的扩展
- **移动端支持**：支持 iOS 和 Android 客户端
- **安全存储**：使用 AES-256 加密
- **双因素认证**：支持多种 2FA 方式
- **组织功能**：支持团队共享密码

## 技术特点

- 使用 Rust 编写，性能优异
- 支持 SQLite 数据库
- 支持 Docker 部署
- 资源占用低
- 完全兼容 Bitwarden 客户端

## 部署要求

- 支持 Docker 的环境
- 建议使用 HTTPS
- 足够的内存（建议至少 512MB）
- 稳定的网络连接

## 相关资源

- [GitHub 仓库](https://github.com/dani-garcia/vaultwarden)
- [Docker 镜像](https://hub.docker.com/r/vaultwarden/server)
- [Bitwarden 客户端](https://bitwarden.com/download/) 