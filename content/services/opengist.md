---
id: opengist
name: OpenGist
description: 基于 Git 的自托管代码片段分享平台，开源替代 GitHub Gist
tags:
  - 代码
  - 分享
  - Git
  - Go
category: 云剪贴板
website: 'https://opengist.io'
repo: 'https://github.com/thomiceli/opengist'
updatedAt: '2025-05-10T14:00:00.000Z'
---

OpenGist 是一个基于 Git 的自托管代码片段分享平台，是 GitHub Gist 的开源替代品。所有代码片段都存储在 Git 仓库中，可以通过标准的 Git 命令或网页界面进行读写和修改。

## 主要功能

- **Git 集成**：支持通过 HTTP 或 SSH 进行 Git 操作
- **语法高亮**：支持多种编程语言的代码高亮
- **Markdown 支持**：支持 Markdown 和 CSV 格式
- **搜索功能**：支持在代码片段中搜索
- **版本历史**：完整的修改历史记录
- **嵌入功能**：支持将代码片段嵌入到其他网站
- **主题标签**：可以为代码片段添加主题标签
- **点赞/复刻**：支持点赞和复刻他人的代码片段
- **下载选项**：支持下载原始文件或 ZIP 压缩包
- **OAuth2 登录**：支持 GitHub、GitLab、Gitea 和 OpenID Connect 登录
- **访问控制**：可限制或开放匿名用户访问权限

## 部署要求

- Docker 支持
- 或 Go 1.23+ 环境
- Node.js 16+
- Git 2.28+
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：2核 CPU，1GB 内存
- 存储空间：基础安装约 100MB，实际需求取决于数据量 