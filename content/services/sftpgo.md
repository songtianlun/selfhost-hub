---
id: sftpgo
name: SFTPGo
description: 功能完整的 SFTP 服务器，支持多种认证方式和存储后端
tags:
  - 存储
  - 文件共享
  - Go
  - SFTP
  - FTP
  - WebDAV
  - 对象存储
  - 云存储
category: 文件管理
website: 'https://github.com/drakkan/sftpgo'
repo: 'https://github.com/drakkan/sftpgo'
updatedAt: '2025-05-08T00:16:18.051Z'
---

SFTPGo 是一个功能完整的 SFTP 服务器，支持多种认证方式和存储后端。它提供了丰富的功能和灵活的配置选项，是一个企业级的 SFTP 解决方案。

## 主要功能

- **多协议支持**：支持 SFTP、SCP、FTP/S、WebDAV
- **多种认证**：支持密码、公钥、OIDC、LDAP 等认证方式
- **多存储后端**：支持本地存储、S3 兼容存储、Azure Blob 等
- **虚拟文件夹**：支持虚拟文件夹和符号链接
- **配额管理**：支持用户和文件夹配额
- **带宽限制**：支持上传和下载带宽限制
- **事件通知**：支持多种事件通知方式
- **Web 管理**：提供 Web 管理界面
- **API 接口**：提供 REST API
- **数据加密**：支持传输和存储加密

## 部署要求

- Go 1.16 或更高版本
- SQLite/MySQL/PostgreSQL（用于存储用户数据）
- 最低配置：1核 CPU，1GB 内存
- 推荐配置：2核+ CPU，2GB+ 内存
- 存储空间：根据需求配置
- 网络：建议使用高速网络 
