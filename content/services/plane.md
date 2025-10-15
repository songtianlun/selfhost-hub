---
id: plane
name: Plane
description: 现代化的开源产品规划与缺陷跟踪平台
tags:
  - 项目管理
  - 产品规划
  - issue 跟踪
category: 项目管理
website: 'https://plane.so'
repo: 'https://github.com/makeplane/plane'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Plane 是一款面向产品与工程团队的开源项目管理工具，聚焦于迭代计划、缺陷跟踪与路线图协作，可作为 Linear、Jira 等 SaaS 服务的自托管替代品。

## 核心功能

- **模块化工作区**：通过项目、迭代、里程碑等模块拆分工作，支持自定义工作流状态。
- **多视图管理**：提供列表、看板、日历与甘特图视图，帮助团队从不同角度审视任务。
- **路线图规划**：支持可视化产品路线图与版本规划，关联需求、任务与缺陷。
- **讨论与评论**：在任务下直接交流，支持 Markdown 与文件附件，减少上下文切换。
- **权限与共享**：细粒度角色权限，可邀请外部协作者并设置只读共享页面。

## 部署建议

1. 官方提供 Docker Compose 与 Helm Chart，可根据基础设施选择部署方式。
2. 运行前准备 PostgreSQL、Redis，配置 `PLANE_BASE_URL` 与邮件发送服务确保通知可用。
3. 如需与 GitHub、GitLab、Sentry 等集成，可在管理后台配置访问令牌。
4. 建议结合反向代理（如 Nginx）开启 HTTPS，并在对象存储中保存附件数据。
