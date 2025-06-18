---
id: karakeep
name: Karakeep
description: 一个自托管的书签管理应用，支持链接、笔记和图片的存储，具有 AI 自动标签和全文搜索功能
tags:
  - 书签管理
  - 自托管
  - AI
  - 笔记
  - 图片存储
  - 全文搜索
category: 信息聚合
website: 'https://karakeep.app'
repo: 'https://github.com/karakeep-app/karakeep'
updatedAt: '2025-05-11T16:00:00+08:00'
---

Karakeep 是一个功能强大的自托管书签管理应用，它不仅支持传统的链接收藏，还能存储笔记和图片，并集成了 AI 自动标签功能。

## 主要功能

- **多类型内容支持**：支持链接、笔记和图片的存储
- **AI 自动标签**：使用 AI（支持 ChatGPT 和本地 Ollama 模型）自动为内容添加标签
- **全文搜索**：支持所有存储内容的全文搜索
- **OCR 功能**：支持从图片中提取文本
- **浏览器插件**：提供 Chrome 和 Firefox 插件，方便快速收藏
- **移动端支持**：提供 iOS 和 Android 应用
- **RSS 订阅**：支持自动从 RSS 源获取内容
- **REST API**：提供完整的 API 接口
- **多语言支持**：支持多种语言界面
- **内容高亮**：支持对收藏内容进行高亮标记
- **页面存档**：使用 monolith 进行完整页面存档，防止链接失效
- **视频存档**：支持使用 youtube-dl 自动存档视频
- **批量操作**：支持批量处理功能
- **SSO 支持**：支持单点登录
- **深色模式**：支持深色主题

## 技术栈

- NextJS（使用 app router）
- Drizzle 数据库
- NextAuth 认证
- tRPC 客户端-服务器通信
- Puppeteer 网页爬取
- OpenAI 集成
- Meilisearch 全文搜索

## 部署要求

- Node.js 环境
- 数据库（支持多种数据库）
- 现代浏览器
- 建议配置：2核 CPU，2GB 内存
- 存储空间：根据使用情况而定
- 网络：建议使用高速网络

## References
- [Karakeep GitHub 仓库](https://github.com/karakeep-app/karakeep) 