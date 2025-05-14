---
id: changedetection
name: ChangeDetection.io
description: 一个强大的开源网页变更检测和监控工具，支持多种通知方式和灵活的配置选项
tags:
  - 监控
  - 网页监控
  - 变更检测
  - 自托管
  - 通知
category: 网络监控
website: 'https://github.com/dgtlmoon/changedetection.io'
repo: 'https://github.com/dgtlmoon/changedetection.io'
updatedAt: '2025-05-14T14:00:00.000Z'
---

ChangeDetection.io 是一个功能强大的开源网页变更检测和监控工具，它可以帮助您监控网页内容的变化，并在检测到变更时通过多种方式通知您。

## 主要功能

- **网页监控**：监控任何网页的内容变化
- **多种通知方式**：
  - Discord
  - Flock
  - Gitter
  - Google Chat
  - Microsoft Teams
  - Office 365
  - Rocket.Chat
  - 电子邮件
  - 自定义 API
  - Syslog
- **灵活的检测选项**：
  - XPath 支持
  - JSONPath 支持
  - jq 支持
  - CSS 选择器支持

## 高级功能

- **JSON API 监控**：支持监控和解析 JSON API 数据
- **HTML 中的 JSON 解析**：自动提取和解析嵌入在 HTML 中的 JSON 数据
- **代理配置**：支持配置代理服务器
- **定时检测**：支持设置检测时间表
- **Chrome 扩展**：提供便捷的网页添加功能

## 部署要求

- Docker 环境
- 现代浏览器
- 最低配置：1核 CPU，1GB 内存
- 存储空间：根据监控网站数量而定
- 网络：建议使用稳定的网络连接

## 特色功能

- **多语言支持**：支持多种语言界面
- **导入导出**：支持 Excel 格式导入导出监控列表
- **API 支持**：提供完整的 API 接口
- **自定义通知模板**：支持使用 Jinja2 模板自定义通知内容
- **Raspberry Pi 支持**：支持在树莓派等 ARM 设备上运行 