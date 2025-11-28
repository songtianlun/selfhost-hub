---
id: openlist
name: OpenList
description: 自托管的愿望清单和礼物登记应用，可与亲友共享并管理心愿物品
tags:
  - 愿望清单
  - 列表管理
  - 分享
  - Next.js
  - 个人工具
category: 个人与生活
website: 'https://github.com/OpenListTeam/OpenList'
repo: 'https://github.com/OpenListTeam/OpenList'
updatedAt: '2025-05-13T00:00:00.000Z'
---

OpenList 是一个开源的愿望清单与礼物登记工具，适合个人或家庭记录心愿、策划礼物，并通过链接与朋友共享。

## 主要功能

- **多清单管理**：按节日、场景或人群创建多个心愿清单
- **礼物登记**：支持价格、链接、备注等字段，方便他人认领或标记购买状态
- **协作分享**：可生成公开链接或邀请亲友协作编辑，减少重复购买
- **隐私控制**：自托管部署保证数据在自己掌控之中
- **跨端访问**：基于 Web 的响应式界面，适合桌面与移动设备

## 部署建议

1. 准备 Node.js 18+ 或直接使用 Docker 镜像启动。
2. 配置数据库连接（如 PostgreSQL / SQLite）并运行初始化脚本。
3. 通过环境变量设置管理员账户、邮件通知等可选项。
4. 部署在带 HTTPS 的反向代理后，以便安全分享清单链接。
