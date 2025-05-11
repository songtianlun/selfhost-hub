---
id: syncclipboard
name: SyncClipboard
description: 跨平台剪贴板同步方案，支持多设备间安全同步文本、图片和文件
tags:
  - 同步
  - 跨平台
  - 安全
  - C#
category: 云剪贴板
website: 'https://github.com/Jeric-X/SyncClipboard'
repo: 'https://github.com/Jeric-X/SyncClipboard'
updatedAt: '2025-05-11T07:00:00.000Z'
---

SyncClipboard 是一个跨平台的剪贴板同步解决方案，支持在 Windows、Linux、macOS、iOS 和 Android 设备之间安全同步文本、图片和文件。

## 主要功能

- **跨平台支持**：支持 Windows、Linux、macOS、iOS 和 Android
- **多种同步方式**：
  - 独立服务器部署
  - WebDAV 服务器支持
  - 客户端内置服务器
- **安全传输**：支持 HTTPS 加密传输
- **用户认证**：支持用户名密码认证
- **文件同步**：支持文本、图片和文件同步
- **自动同步**：后台自动同步剪贴板内容
- **手动同步**：支持手动触发同步
- **验证码同步**：支持自动同步短信验证码
- **多种客户端**：
  - 桌面客户端（Windows/Linux/macOS）
  - iOS 快捷指令
  - Android 多种方案（HTTP Request Shortcuts、Autox.js、SmsForwarder、Tasker）

## 部署要求

### 服务器端
- .NET 6.0 或更高版本
- 最低配置：1核 CPU，256MB 内存
- 存储空间：基础安装约 50MB，实际需求取决于数据量
- 可选 HTTPS 证书：用于安全传输

### 客户端
- Windows：Windows 10 2004 或更高版本
- Linux：主流发行版
- macOS：主流版本
- iOS：支持快捷指令
- Android：支持多种自动化工具 