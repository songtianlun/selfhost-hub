---
id: "filebrowser"
name: "File Browser"
description: "轻量级的文件管理系统，提供简洁的 Web 界面来管理文件"
tags:
  - "存储"
  - "文件共享"
  - "Go"
category: "文件存储"
website: "https://filebrowser.org"
github: "https://github.com/filebrowser/filebrowser"
---

File Browser 是一个轻量级的文件管理系统，提供简洁的 Web 界面来管理文件。它支持多用户、权限管理，并且可以轻松部署在任何支持 Go 的环境中。

## 主要功能

- **文件管理**：上传、下载、删除、重命名、移动文件
- **用户系统**：支持多用户和权限管理
- **文件预览**：支持图片、视频、音频、PDF 等文件预览
- **文件编辑**：内置文本编辑器，支持在线编辑文件
- **文件分享**：支持生成分享链接
- **命令行工具**：提供命令行工具进行管理
- **自定义样式**：支持自定义界面样式
- **WebDAV**：支持 WebDAV 协议
- **命令执行**：支持在文件操作前后执行自定义命令
- **多语言支持**：支持多种语言界面

## 部署要求

- Go 1.16 或更高版本
- SQLite/MySQL/PostgreSQL（可选，用于存储用户数据）
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：1核+ CPU，1GB+ 内存
- 存储空间：根据需求配置 