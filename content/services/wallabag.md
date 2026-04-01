---
id: wallabag
name: wallabag
description: 自托管的网页内容保存工具，支持稍后阅读，可提取文章正文并去除干扰元素
tags:
  - 稍后阅读
  - 书签管理
  - PHP
  - 网页归档
category: 信息聚合
website: 'https://wallabag.org'
repo: 'https://github.com/wallabag/wallabag'
updatedAt: '2025-05-11T16:00:00+08:00'
---

wallabag 是一个自托管的网页内容保存应用，允许您将网页文章保存以供稍后阅读。它能自动提取文章正文内容，去除广告、弹窗等干扰元素，让您专注于阅读。

## 主要功能

- **稍后阅读**：一键保存网页文章，随时在任意设备上阅读
- **内容提取**：自动提取文章正文，去除干扰元素，提供清爽的阅读体验
- **标签与分类**：支持使用标签和分类组织文章
- **搜索功能**：支持全文搜索已保存的文章
- **多用户支持**：支持多用户系统，每位用户拥有独立的文章库
- **浏览器扩展**：提供 Firefox 和 Chrome 浏览器扩展，便于快速保存
- **移动应用**：提供 Android 和 iOS 原生应用
- **离线阅读**：支持将文章下载为 ePub、PDF、CSV、JSON 等格式导出
- **API 支持**：提供完整的 REST API，方便与第三方应用集成
- **RSS 订阅**：为每个分类生成 RSS 订阅源
- **导入支持**：支持从 Pocket、Instapaper、Readability 等服务导入数据
- **多语言支持**：界面支持多种语言

## 部署要求

- PHP 8.1+ 环境
- MySQL/MariaDB、PostgreSQL 或 SQLite 数据库
- Web 服务器（Apache/Nginx）
- 支持 Docker 部署
- 最低配置：1核 CPU，256MB 内存
- 推荐配置：2核 CPU，512MB 内存
- 存储空间：约 200MB（不包括数据库及文章缓存数据）
