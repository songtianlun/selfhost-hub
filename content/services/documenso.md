---
id: documenso
name: Documenso
description: 开源的电子合同与签名管理平台
tags:
  - 电子签名
  - 合同
  - 工作流
category: 协同办公
website: 'https://documenso.com'
repo: 'https://github.com/documenso/documenso'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Documenso 是可自托管的电子签名解决方案，专注于将商业 SaaS 的合同签署流程带到本地环境，实现数据可控的合同创建、发送与归档。

## 核心功能

- **拖拽式模板**：可视化定义签名、日期、文本字段，并支持多签署人顺序或并行处理。
- **签署体验**：被邀请者通过浏览器完成签名、填写表单字段并查看审核日志。
- **团队协作**：支持工作区、角色权限与审计记录，便于跨部门管理合同。
- **Webhook 与 API**：在合同状态变化时触发 Webhook，与现有 CRM、ERP 或自动化流程集成。
- **存储合规**：文档与证书存放在自有存储中，满足本地化和隐私合规需求。

## 部署建议

1. 官方 Docker Compose 使用 Next.js、Node.js 后端及 PostgreSQL，部署时需设置 `NEXTAUTH_SECRET`、`DATABASE_URL` 等环境变量。
2. 建议启用对象存储（S3 兼容）保存上传文件，并配置邮件服务用于发送签署邀请。
3. 若要启用 OAuth 登录，可在环境变量中配置 GitHub、Google 等第三方应用凭证。
4. 使用反向代理提供 HTTPS，并定期备份 PostgreSQL 数据库与文件存储以防数据丢失。
