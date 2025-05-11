---
id: imageFlow
name: ImageFlow
description: 现代化的图片服务系统，支持多种图片格式和存储方式
tags:
  - 图床
  - 存储
  - Go
  - 媒体
rating: 
category: 图像托管
website: 'https://github.com/Yuri-NagaSaki/ImageFlow'
repo: 'https://github.com/Yuri-NagaSaki/ImageFlow'
updatedAt: '2025-05-11T08:00:00.000Z'
---

ImageFlow 是一个现代化的图片服务系统，使用 Go 语言开发，提供了高性能的图片处理和存储解决方案。它支持多种图片格式和存储方式，并提供了友好的 Web 界面。

## 主要功能

- **多种图片格式**：支持 WebP、AVIF 等现代图片格式
- **多存储支持**：本地存储、S3 兼容存储
- **图片处理**：自动转换图片格式、优化图片质量
- **元数据管理**：使用 Redis 存储图片元数据和标签
- **API 接口**：提供完整的 RESTful API
- **随机图片**：支持获取随机图片，可按标签筛选
- **图片管理**：支持图片上传、删除、标签管理
- **安全特性**：API 密钥认证、防盗链等

## 部署要求

- Docker 环境
- Redis（用于元数据存储）
- 支持 S3 兼容存储（可选）
- 最低配置：1核 CPU，1GB 内存
- 推荐存储空间：根据预期存储图片数量，建议至少 10GB 

## References
- [ImageFlow 一款更适合你的图床](https://catcat.blog/imageflow-install.html)