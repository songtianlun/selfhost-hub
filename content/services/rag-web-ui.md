---
id: "rag-web-ui"
name: "RAG Web UI"
description: "一个基于 RAG (Retrieval-Augmented Generation) 技术的智能对话系统，帮助构建基于自有知识库的智能问答系统"
tags:
  - "AI"
  - "RAG"
  - "知识库"
  - "问答系统"
category: "AI平台"
rating: 
website: "https://github.com/rag-web-ui/rag-web-ui"
repo: "https://github.com/rag-web-ui/rag-web-ui"
updatedAt: "2025-05-14T22:00:00+08:00"
---

RAG Web UI 是一个基于 RAG (Retrieval-Augmented Generation) 技术的智能对话系统，它能够帮助用户构建基于自有知识库的智能问答系统。通过结合文档检索和大语言模型，实现准确可靠的知识库问答服务。

## 主要功能

- **多模型支持**：支持多种 LLM 部署选项，包括 OpenAI、DeepSeek 等云服务，以及通过 Ollama 进行本地模型部署
- **知识库管理**：支持文档导入、处理和向量化存储
- **智能问答**：基于知识库的智能问答服务
- **API 接口**：提供 OpenAPI 接口，方便通过 API 调用访问知识库
- **隐私保护**：支持本地部署，保护数据隐私
- **Docker 支持**：提供 Docker 镜像，一键部署

## 技术栈

- **后端**：
  - Python FastAPI
  - MySQL + ChromaDB
  - MinIO 对象存储
  - Langchain
  - JWT + OAuth2 认证
- **前端**：
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Shadcn/UI
  - Vercel AI SDK

## 部署要求

- **系统要求**：
  - Docker & Docker Compose v2.0+
  - Node.js 18+
  - Python 3.9+
  - 8GB+ RAM
- **依赖服务**：
  - MySQL 数据库
  - ChromaDB 向量数据库
  - MinIO 对象存储
- **网络要求**：
  - 可访问 LLM API（如使用云服务）
  - 或本地部署 LLM 模型 