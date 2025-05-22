---
id: "hacker-news-ai"
name: "Hacker News 每日播报"
description: "一个基于 AI 的 Hacker News 中文播客项目，每天自动抓取 Hacker News 热门文章，通过 AI 生成中文总结并转换为播客内容"
tags:
  - "AI"
  - "播客"
  - "自动化"
  - "内容生成"
category: "AI工具"
rating: 
website: "https://hacker-news.agi.li"
repo: "https://github.com/ccbikai/hacker-news"
updatedAt: "2025-05-14T22:00:00+08:00"
---

Hacker News 每日播报是一个创新的 AI 驱动项目，它能够自动抓取 Hacker News 上的热门文章，并通过 AI 技术将其转换为中文播客内容。这个项目完美结合了技术新闻聚合和 AI 内容生成，为用户提供便捷的技术资讯获取方式。

## 主要功能

- **自动抓取**：每日自动获取 Hacker News 热门文章
- **AI 总结**：使用 AI 智能生成中文摘要和播报文稿
- **语音合成**：通过 Edge TTS 生成中文播报
- **多平台支持**：支持网页和播客 App 收听
- **RSS 订阅**：提供 RSS feed 方便订阅
- **实时更新**：每日自动更新内容
- **完整文本**：提供文章摘要和完整播报文本

## 技术栈

- Next.js 应用框架
- Cloudflare Workers 部署和运行环境
- Edge TTS 语音合成
- OpenAI API 内容生成
- Tailwind CSS 样式处理
- shadcn-ui 组件库

## 部署要求

- 操作系统：支持所有主流操作系统
- 依赖项：
  - Node.js (>=18.x)
  - PNPM (>=8.x)
- 服务要求：
  - Cloudflare Workers
  - Cloudflare R2 存储
  - Cloudflare KV 存储
  - OpenAI API 访问权限
- 内存：建议至少1GB可用内存
- 存储空间：根据使用情况而定 