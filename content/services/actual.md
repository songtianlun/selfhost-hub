---
id: actual
name: Actual
description: 本地优先的开源记账与预算管理工具
tags:
  - 个人理财
  - 预算
  - 本地优先
category: 财务管理
website: 'https://actualbudget.org'
repo: 'https://github.com/actualbudget/actual'
updatedAt: '2025-05-12T00:00:00.000Z'
---

Actual 是一款本地优先（Local-first）的开源记账与预算管理工具，提供零基预算（Zero-based Budgeting）体验，既能离线使用，也支持在多端之间加密同步。

## 核心功能

- **零基预算体系**：以收入减支出的方式规划每一笔预算，帮助团队或个人精准掌控现金流。
- **多账户管理**：支持活期、信用卡、现金等多种账户类型，并可自定义类别与标签。
- **规则与自动化**：可为账目设置规则，自动归类重复交易，减少重复劳动。
- **数据导入导出**：支持 QIF、OFX、QFX 等常见银行文件格式导入，数据可随时导出备份。
- **安全同步**：通过自托管同步服务或 WebDAV 等方式加密同步，数据完全掌控在自己手中。

## 部署建议

1. 准备 Node.js 18+ 与 Yarn（或 pnpm），在服务器或 NAS 上安装依赖。
2. 克隆仓库后执行 `yarn install && yarn start` 启动 Web 端，也可使用官方 Docker 镜像部署。
3. 如需多端同步，可额外部署 Actual Sync Server，配置密钥后在客户端中填写同步地址。
4. 建议定期备份 `server-files` 数据目录，确保账本与加密密钥安全。
