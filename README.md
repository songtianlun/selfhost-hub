# SelfHost Hub

SelfHost Hub是一个收集和展示各种自托管服务的中文平台，帮助用户发现和比较适合本地部署的开源软件解决方案。

![SelfHost Hub](static/images/og-image.png)

## 功能特点

- 多语言支持（中文和英文）
- 基于Hugo的高性能静态站点
- 快速搜索和过滤服务
- 按分类和标签组织服务
- 响应式设计，适配各种设备
- 深色模式支持

## 快速开始

### 环境要求

- [Hugo](https://gohugo.io/installation/) (建议安装最新版本)
- [Node.js](https://nodejs.org/) (v14或更高版本)
- npm (通常随Node.js安装)

### 安装和运行

1. 克隆仓库
```bash
git clone https://github.com/songtianlun/selfhost-hub.git
cd selfhost-hub/hugo-selfhost-hub
```

2. 使用启动脚本运行
```bash
./start.sh
```

启动脚本将自动:
- 安装所需的npm依赖
- 生成Tailwind CSS
- 提示是否从Next.js项目导入服务
- 启动Hugo开发服务器

访问 http://localhost:1313/ 查看网站。

### 手动启动步骤

如果不想使用启动脚本，也可以手动执行以下步骤：

1. 安装依赖
```bash
npm install
```

2. 生成CSS
```bash
npm run css
```

3. 启动开发服务器
```bash
npm run start
```

## 添加新服务

1. 在`content/services/`目录下创建一个新的目录，使用服务的名称作为目录名（小写，使用连字符代替空格）

2. 在该目录中创建`index.md`文件，使用以下格式：

```markdown
---
title: "服务名称"
description: "简短的服务描述"
categories: ["类别"]
tags: ["标签1", "标签2"]
website: "https://服务官网.com"
github: "https://github.com/服务仓库"
image: "/images/services/服务名称.png"
date: 2023-05-01
---

服务的详细介绍内容...
```

3. 如果有服务的图片，将其放在`static/images/services/`目录下

4. 为英文版本创建相同的文件结构在`content/en/services/`目录下

## 贡献指南

我们欢迎各种形式的贡献，包括：

- 添加新的自托管服务
- 修正或更新现有服务的信息
- 改进网站功能和设计
- 翻译内容

请参阅[贡献指南](CONTRIBUTING.md)了解详细信息。

## 许可证

本项目采用MIT许可证 - 详见[LICENSE](LICENSE)文件 