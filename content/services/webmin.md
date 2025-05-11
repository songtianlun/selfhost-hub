---
id: webmin
name: Webmin
description: 基于 Web 的 Unix 系统管理工具，提供直观的界面来管理系统配置
tags:
  - 面板
  - 服务器管理
  - 运维
  - Perl
category: 运维管理面板
website: 'https://www.webmin.com'
repo: 'https://github.com/webmin/webmin'
updatedAt: '2025-05-11T08:00:00.000Z'
---

Webmin 是一个基于 Web 的 Unix 系统管理工具，使用 Perl 开发。它提供了一个直观的 Web 界面，让管理员可以轻松管理系统配置，包括用户账户、Apache、DNS、文件共享等。

## 主要功能

- **系统管理**：用户账户、软件包、系统服务管理
- **网络服务**：Apache、BIND DNS、Postfix 邮件服务器配置
- **文件管理**：文件系统、磁盘配额、Samba 文件共享
- **安全设置**：防火墙、SSH 配置、SSL 证书管理
- **集群管理**：支持多服务器集中管理
- **备份还原**：系统配置和文件备份功能
- **日志查看**：系统日志和 Web 服务器日志查看
- **模块扩展**：支持通过模块扩展功能

## 部署要求

- 支持的操作系统：Unix、Linux、BSD
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：1核+ CPU，1GB+ 内存
- 存储空间：基础安装约 100MB，实际需求取决于安装的模块 