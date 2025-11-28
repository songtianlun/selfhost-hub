---
id: next-ai-draw-io
name: Next AI Draw.io
description: 基于 Next.js 的自托管 AI 流程图生成与编辑器，支持提示生成、在线修改及多格式导出
tags:
  - 流程图
  - AI
  - Next.js
  - 设计
  - 可视化
category: 协作与设计
website: 'https://github.com/DayuanJiang/next-ai-draw-io'
repo: 'https://github.com/DayuanJiang/next-ai-draw-io'
updatedAt: '2025-05-13T00:00:00.000Z'
---

Next AI Draw.io 是一个基于 Next.js 的 AI 辅助流程图与架构图工具，结合提示生成与图形化编辑，帮助团队快速搭建可分享的图表。

## 主要功能

- **提示生成图表**：支持输入自然语言描述，由大模型生成 draw.io 兼容的节点与连线
- **在线编辑**：内置可视化编辑器，支持拖拽、分组、颜色与图标调整
- **文件兼容**：支持导入/导出 `.drawio`、PNG、SVG，方便与现有流程对接
- **多模型接入**：可配置不同的 API Key 或自托管模型服务，保护数据隐私
- **部署友好**：基于 Next.js，可以以 Docker 或 Vercel/自有服务器方式一键部署

## 部署建议

1. 准备 Node.js 18+ 与 pnpm，或直接使用官方 Docker 镜像。
2. 配置环境变量中的模型 API Key 以及回调地址，确保生成能力可用。
3. 首次启动后在管理页面设置默认模型、温度与可访问的导出格式。
4. 如需团队协作，建议开启用户认证或在反向代理层加上访问控制。
