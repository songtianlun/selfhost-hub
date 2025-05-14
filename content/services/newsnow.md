---
id: newsnow
name: NewsNow
description: 一个优雅的实时新闻阅读平台，支持多语言，提供实时热点新闻聚合和个性化阅读体验
tags:
  - 新闻聚合
  - 信息聚合
  - 自托管
  - 开源
  - 多语言
category: 信息聚合
website: 'https://newsnow.busiyi.world'
repo: 'https://github.com/ourongxing/newsnow'
updatedAt: '2025-05-14T14:00:00.000Z'
---

NewsNow 是一个优雅的实时新闻阅读平台，提供实时热点新闻聚合和个性化阅读体验。

## 主要功能

- **实时更新**：自动获取最新热点新闻
- **优雅界面**：简洁优雅的阅读体验
- **GitHub 登录**：支持 GitHub OAuth 登录和数据同步
- **智能缓存**：30分钟默认缓存时间（登录用户可强制刷新）
- **自适应抓取**：基于源更新频率的自适应抓取间隔（最少2分钟）
- **多语言支持**：支持中文、英文、日文等多种语言

## 技术特点

- **Next.js**：现代化的 React 框架
- **TypeScript**：类型安全的开发体验
- **Cloudflare D1**：高性能数据库支持
- **Docker**：容器化部署支持
- **GitHub OAuth**：安全的用户认证系统

## 部署要求

- Node.js >= 20
- Docker（可选）
- Cloudflare D1 数据库（推荐）
- GitHub OAuth 配置（可选）

## 特色功能

- **实时热点**：自动聚合最新热点新闻
- **个性化阅读**：支持自定义新闻分类和偏好
- **数据同步**：登录用户可同步阅读数据
- **资源优化**：智能抓取间隔防止 IP 封禁
- **多语言支持**：支持多种语言内容 