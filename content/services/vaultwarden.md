---
id: "vaultwarden"
name: "Vaultwarden"
description: "Bitwarden 密码管理器的非官方轻量级替代版本"
tags:
  - "密码管理"
  - "安全"
  - "Rust"
  - "隐私"
category: "安全工具"
website: "https://github.com/dani-garcia/vaultwarden"
github: "https://github.com/dani-garcia/vaultwarden"
---

# Vaultwarden

Vaultwarden 是一个非官方的 Bitwarden 密码管理器服务器实现，使用 Rust 语言编写。它的资源占用远低于官方版本，使其成为自托管密码管理解决方案的理想选择，尤其适合家庭和小型组织使用。

## 主要功能

- **密码管理**：安全存储并管理密码、安全笔记、信用卡信息等
- **密码生成器**：创建强健、随机的密码
- **跨平台支持**：可使用官方 Bitwarden 客户端（Web、移动、桌面和浏览器扩展）
- **端到端加密**：所有数据在设备上加密，服务器无法访问明文
- **密码共享**：安全地与团队成员共享凭证
- **多因素认证**：支持 TOTP、Yubikey、Duo 等多种双因素验证
- **安全审计**：检测弱密码、重复密码和数据泄露
- **紧急访问**：在紧急情况下授权他人访问您的密码库
- **自动填充**：自动填充网站和应用的登录信息
- **附件支持**：存储重要文档的加密副本

## 部署要求

- 几乎所有平台：Docker 部署或二进制文件
- SQLite（默认）、MySQL 或 PostgreSQL 数据库
- 最低配置：1核 CPU，256MB 内存
- 推荐配置：1核+ CPU，512MB+ 内存
- 存储空间：约 100MB（基础安装，不包括附件）
- 可选：反向代理（如 Nginx）提供 HTTPS
- 可选：SMTP 服务器（用于邮件通知和邀请）
- 可选：U2F、Yubikey（用于高级认证方式） 