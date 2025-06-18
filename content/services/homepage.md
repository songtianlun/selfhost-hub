---
id: "homepage"
name: "Homepage"
description: "高度可定制的首页仪表板，集成Docker和100多种服务API"
tags:
  - "信息聚合"
  - "仪表板"
  - "Docker集成"
  - "Next.js"
category: "信息聚合"
website: "https://gethomepage.dev"
repo: "https://github.com/gethomepage/homepage"
updatedAt: "2025-06-18T00:00:00Z"
---

Homepage 是一个现代化、高度可定制的应用程序仪表板，支持Docker和100多种服务API集成。它提供快速、安全、美观的方式来组织和访问您的所有服务和信息。

## 主要功能

- **快速加载**：静态生成的网站，提供即时加载速度
- **安全代理**：所有API请求都经过代理，隐藏API密钥
- **Docker集成**：容器状态监控和基于标签的自动服务发现
- **丰富集成**：支持100多种服务集成，包括所有流行的自托管应用
- **多语言支持**：支持40多种语言的完整国际化
- **服务书签**：添加自定义链接到首页
- **信息小部件**：天气、时间、日期、搜索等实用工具

## 服务集成

- **媒体服务**：Plex、Jellyfin、Emby等媒体服务器
- **下载工具**：Transmission、qBittorrent、Deluge等
- ***arr应用**：Radarr、Sonarr、Lidarr、Bazarr等自动化工具
- **网络工具**：Ombi、Tautulli、Jackett、NZBGet、SABnzbd等
- **系统监控**：支持各种系统和服务状态监控
- **自定义API**：支持自定义API集成

## 技术特性

- **前端框架**：Next.js（React）
- **样式系统**：Tailwind CSS
- **配置方式**：YAML文件配置
- **容器支持**：原生Docker支持，多架构镜像
- **API代理**：内置API代理确保安全性
- **静态生成**：构建时生成静态页面

## 部署要求

- **运行环境**：Node.js 18+ 或 Docker
- **架构支持**：AMD64、ARM64
- **存储需求**：配置文件存储，需求较小
- **网络要求**：访问各种服务API的网络连接
- **可选依赖**：Docker socket（用于容器集成）

## 安全考虑

- **反向代理**：建议部署在带认证的反向代理后面
- **API安全**：所有API请求都经过代理处理
- **无认证层**：本身不包含认证功能，需要外部认证
- **SSL支持**：建议使用HTTPS部署

## 定制选项

- **自定义主题**：支持自定义CSS和JavaScript
- **布局配置**：灵活的布局和格式设置
- **本地化**：多语言支持和本地化选项
- **小部件配置**：丰富的信息提供商和小部件选项 