# SelfHost Hub

SelfHost Hub 是一个收集和展示可自托管开源服务的目录网站。它支持多语言（中文和英文），并提供标签系统来帮助用户快速找到需要的服务。

## 特点

- 多语言支持（中文和英文）
- 标签系统，支持按标签筛选
- 搜索功能
- 响应式设计
- SEO 友好
- 基于 YAML 的内容管理

## 开发

### 前提条件

- Node.js 14+
- npm 或 yarn

### 安装

```bash
npm install
```

### 开发服务器

```bash
npm start
```

### 构建

```bash
npm run build
```

## 内容管理

所有服务内容都存储在 `src/_data/{lang}/services.yaml` 文件中。每个服务包含以下信息：

- name: 服务名称
- description: 服务描述
- url: 服务官网
- github: GitHub 仓库地址
- tags: 标签（分组）
- features: 主要功能
- license: 许可证
- language: 开发语言

## 贡献

欢迎提交 Pull Request 来添加新的服务或改进现有内容。

## 许可证

MIT 