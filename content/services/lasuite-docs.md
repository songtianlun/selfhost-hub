---
id: lasuite-docs
name: La Suite Docs
description: 法国政府开源的实时协作文档与知识管理平台
tags:
  - 文档协作
  - 知识管理
  - AI
  - 自托管
category: 知识管理
website: 'https://lasuite.numerique.gouv.fr/produits/docs'
repo: 'https://github.com/suitenumerique/docs'
updatedAt: '2025-01-30T00:00:00.000Z'
---

La Suite Docs 是由法国政府（DINUM）与德国政府（ZenDiS）联合开发的开源协作文档平台，专注于实时多人编辑、知识沉淀与团队协作，适合政府机构、企业及个人自托管部署。

## 核心功能

- **实时协作编辑**：基于 Yjs 与 HocusPocus 实现多用户同时在线编辑，支持光标位置同步与冲突自动合并。
- **丰富的编辑体验**：采用 BlockNote.js 编辑器，支持 Markdown 语法、斜杠命令与快捷键快速插入内容块。
- **离线与同步**：支持离线编辑，网络恢复后自动同步变更，确保工作连续性。
- **AI 辅助能力**：内置 AI 功能可对内容进行改写、摘要与翻译，提升文档处理效率。
- **细粒度权限控制**：支持文档级别的访问权限管理，保障敏感信息安全。
- **子页面组织**：通过子页面结构组织复杂文档，构建层次化知识库。
- **多格式导出**：支持导出为 ODT、DOCX、PDF 等格式，并可自定义导出模板。

## 技术架构

- 后端：Django Rest Framework (Python)
- 前端：Next.js + React (TypeScript)
- 实时协作：Yjs + HocusPocus
- 编辑器：BlockNote.js

## 部署建议

1. 推荐使用 Docker Compose 或 Kubernetes 进行部署，官方提供完整的容器化配置。
2. 为数据库与文件存储配置持久化卷，确保数据安全与升级平滑。
3. 通过反向代理（如 Nginx、Caddy）配置 HTTPS 访问，保护传输安全。
4. 如需启用 AI 功能，需配置兼容的大模型 API 端点与密钥。
