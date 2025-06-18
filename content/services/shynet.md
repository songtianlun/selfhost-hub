---
id: "shynet"
name: "Shynet"
description: "注重隐私的现代化网站分析工具，无需Cookie和JavaScript即可工作"
tags:
  - "网站分析"
  - "隐私保护"
  - "无Cookie"
  - "Django"
category: "网站分析"
website: "https://github.com/milesmcc/shynet"
repo: "https://github.com/milesmcc/shynet"
updatedAt: "2025-06-18T00:00:00Z"
---

Shynet 是一个现代化、注重隐私的网站分析工具，无需使用Cookie或JavaScript即可工作。它为用户提供详细的网站访问统计，同时完全尊重访客隐私，是Google Analytics的优秀替代方案。

## 主要功能

- **隐私友好**：无Cookie追踪，支持Do Not Track（DNT）信号
- **无JavaScript依赖**：可使用1x1像素图片进行跟踪
- **轻量级**：跟踪脚本小于1KB，加载速度快
- **自托管**：数据完全归用户所有，无需第三方服务
- **多用户支持**：单个实例可支持多个用户和网站

## 统计指标

- **访问量统计**：页面点击量（Hits）和会话（Sessions）
- **页面性能**：页面加载时间监控
- **用户行为**：跳出率、停留时间统计
- **流量来源**：访问来源和推荐页面分析
- **设备信息**：操作系统、浏览器、设备类型
- **地理位置**：访客地理位置和网络信息
- **页面热度**：网站各页面的相对受欢迎程度

## 技术架构

- **后端框架**：Django（Python）
- **数据库**：PostgreSQL
- **前端**：HTML + CSS + 少量JavaScript
- **部署**：Docker容器或直接部署
- **扩展性**：支持Redis缓存和负载均衡

## 部署选项

- **单机部署**：适合中小型网站的Docker容器部署
- **集群部署**：支持Kubernetes集群和多节点部署
- **云平台**：支持Heroku、DigitalOcean等云平台
- **传统部署**：支持传统的服务器直接部署

## 隐私特性

- **无Cookie追踪**：完全不使用Cookie进行用户追踪
- **DNT支持**：默认尊重用户的Do Not Track设置
- **数据自主**：所有数据存储在用户自己的服务器上
- **GDPR友好**：收集的数据量少，更容易符合GDPR要求
- **透明度**：开源代码，用户可完全了解数据收集机制

## 适用场景

- 个人项目和博客的访问统计
- 中小型企业网站分析
- 注重用户隐私的组织
- 需要数据自主控制的场景
- 不希望依赖第三方分析服务的项目 