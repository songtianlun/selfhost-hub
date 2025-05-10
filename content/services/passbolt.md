---
id: passbolt
name: Passbolt
description: 开源的团队密码管理器，专注于团队协作和权限管理
tags:
  - 密码管理
  - 安全
  - PHP
  - 团队协作
rating: 
category: 密码管理
website: 'https://www.passbolt.com'
repo: 'https://github.com/passbolt/passbolt_api'
updatedAt: '2025-05-10T14:00:00.000Z'
---

Passbolt 是一个开源的团队密码管理器，使用 PHP 和 CakePHP 框架开发。它特别注重团队协作和权限管理，适合需要严格控制密码访问权限的组织使用。

## 主要功能

- **密码管理**：安全存储并管理密码、安全笔记等
- **团队协作**：基于角色的权限管理系统
- **密码共享**：细粒度的密码共享控制
- **端到端加密**：使用 OpenPGP 进行端到端加密
- **多因素认证**：支持 TOTP、Yubikey 等双因素验证
- **审计日志**：详细的访问和操作日志
- **LDAP/AD 集成**：支持企业目录服务集成
- **API 支持**：提供 REST API 接口
- **自动填充**：支持浏览器扩展自动填充
- **密码生成器**：创建强健、随机的密码
- **标签系统**：使用标签组织密码资源

## 部署要求

- Linux 服务器（推荐 Ubuntu）
- PHP 7.4 或更高版本
- MySQL 5.7 或更高版本
- 最低配置：2核 CPU，2GB 内存
- 推荐配置：4核+ CPU，4GB+ 内存
- 存储空间：约 1GB（基础安装）
- 必需：反向代理（如 Nginx）提供 HTTPS
- 必需：SMTP 服务器（用于邮件通知）
- 必需：OpenPGP 密钥对
- 可选：LDAP/AD 服务器（用于企业集成） 