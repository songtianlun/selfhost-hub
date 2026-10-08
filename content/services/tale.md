---
id: "tale"
name: "Tale"
description: "可自托管的项目工作空间，支持团队向 AI 代理分配任务并审核返回的报告与交付文件。"
tags:
  - "MIT"
  - "Docker"
  - "协作"
  - "自动化"
category: "项目管理"
website: "https://tale.dev"
repo: "https://github.com/tale-project/tale"
updatedAt: "2026-10-08T00:00:00Z"
---

Tale 将项目任务、共享上下文和 AI 代理执行放在同一个团队工作空间中。团队可以准备任务说明与附件、分配代理、明确启动执行，并审核返回的报告和文件。

## 核心功能

- 项目任务看板，支持任务说明、附件和共享项目上下文。
- 代理在持久化的项目工作空间中执行任务，团队可查看进度并审核结果。
- 共享知识与可复用的自动化流程。
- 在团队自己的部署中提供需要认证的 HTTP MCP 端点，用于知识和自动化工具。

## 自托管

请按照[官方安装快速入门](https://docs.tale.dev/self-hosted/install/quickstart)配置受支持的 Docker 部署。Community 软件采用 MIT 许可证，可免费自托管；服务器与模型使用成本另计。另有可选的 Enterprise 运维与支持服务。

分配代理不会自动启动执行，需要明确启动；返回的交付结果应由团队审核。

## 官方文档

- [项目代理](https://docs.tale.dev/platform/projects/project-agents)
- [MCP 端点](https://docs.tale.dev/develop/mcp-endpoint)
- [费用与部署方式](https://tale.dev/pricing)
