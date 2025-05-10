---
id: "wewerss"
name: "WeweRSS"
description: "一个简单的RSS阅读器和生成器，支持多种数据源抓取"
tags:
  - "RSS"
  - "阅读"
  - "内容聚合"
  - "PHP"
category: "信息聚合"
website: "https://github.com/YieldRay/wewe-rss"
github: "https://github.com/YieldRay/wewe-rss"
---

WeweRSS 是一个轻量级的 RSS 阅读器和生成器，可以从多种数据源抓取内容并生成 RSS 订阅源。它提供了简洁的界面和灵活的配置选项，让您能够将各种网络内容转换为标准的 RSS 格式。

## 主要功能

- **RSS 生成**：从网页、API 等数据源抓取内容生成 RSS 源
- **RSS 阅读**：内置简洁的阅读器界面，查看订阅的内容
- **多种抓取方式**：支持 XPath、CSS 选择器等多种抓取方法
- **自定义规则**：为不同网站创建自定义的抓取规则
- **内容转换**：将非标准内容转换为标准 RSS 格式
- **定时更新**：自动定期更新订阅源内容
- **数据持久化**：保存历史文章数据
- **响应式设计**：支持移动设备访问
- **订阅管理**：分类和管理多个 RSS 订阅源
- **简单部署**：容易部署和配置

## 部署要求

- PHP 7.0 或更高版本
- Web 服务器（Apache、Nginx 等）
- 支持 Docker 部署
- 最低配置：0.5核 CPU，128MB 内存
- 推荐配置：1核 CPU，256MB 内存
- 存储空间：约 50MB（基础安装）
- 可选数据库（用于存储历史内容）
- 可选 crontab（用于定时更新） 