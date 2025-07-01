---
id: filegator
name: FileGator
description: 强大的多用户文件管理器，具有完整的权限系统和现代化界面
tags:
  - 存储
  - 文件共享
  - 权限管理
  - PHP
  - 多用户
category: 文件管理
#rating: 4
website: 'https://filegator.io'
repo: 'https://github.com/filegator/filegator'
updatedAt: '2025-07-01T00:00:00.000Z'
---

FileGator 是一个强大的多用户文件管理器，提供现代化的 Web 界面和完整的权限系统。它专为团队和企业使用而设计，支持复杂的文件管理需求和用户权限控制。

## 主要功能

- **多用户系统**：完整的用户管理和身份验证系统
- **细粒度权限**：支持基于角色的访问控制和文件夹级权限
- **现代化界面**：基于 Vue.js 的响应式用户界面
- **文件操作**：上传、下载、复制、移动、重命名、删除文件
- **文件预览**：支持图片、视频、音频、PDF、代码文件预览
- **在线编辑**：内置代码编辑器，支持语法高亮
- **文件搜索**：快速搜索文件和文件夹
- **批量操作**：支持批量选择和操作文件
- **文件分享**：生成公开或私有分享链接
- **拖拽上传**：支持拖拽上传文件和文件夹
- **压缩解压**：支持 ZIP 文件的创建和解压
- **存储适配器**：支持本地存储、AWS S3、Azure 等多种存储后端
- **API 支持**：提供 REST API 用于第三方集成
- **主题自定义**：支持自定义界面主题

## 部署要求

- PHP 7.4 或更高版本
- Web 服务器：Apache/Nginx
- 数据库：MySQL/PostgreSQL/SQLite
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：2核+ CPU，1GB+ 内存
- 存储空间：根据文件存储需求配置
- PHP 扩展：mbstring、fileinfo、zip、curl、gd 等
- 支持 Docker 部署或传统 LAMP/LEMP 环境