---
id: nginx-proxy-manager
name: Nginx Proxy Manager
description: 简单易用的 Nginx 代理管理界面，支持反向代理、SSL 证书管理等功能
tags:
  - 反向代理
  - SSL
  - 负载均衡
  - Docker
category: 反向代理
website: 'https://nginxproxymanager.com'
repo: 'https://github.com/NginxProxyManager/nginx-proxy-manager'
updatedAt: '2025-05-14T14:00:00.000Z'
---

Nginx Proxy Manager 是一个简单易用的 Nginx 代理管理界面，让用户可以通过 Web 界面轻松管理 Nginx 反向代理和 SSL 证书。

## 主要功能

- **反向代理**：轻松配置网站反向代理
- **SSL 证书**：支持 Let's Encrypt 自动申请证书
- **访问控制**：支持基本认证和 IP 访问控制
- **WebSocket**：支持 WebSocket 代理
- **Docker 支持**：提供官方 Docker 镜像
- **Web 界面**：直观的管理界面
- **自定义配置**：支持自定义 Nginx 配置
- **HTTP/2**：支持 HTTP/2 协议
- **负载均衡**：支持多种负载均衡策略
- **日志查看**：支持查看访问日志

## 部署要求

- Docker 环境
- 端口要求：80、443、81（管理界面）
- 存储空间：建议至少 1GB
- 内存要求：建议 1GB 以上
- 网络要求：需要公网 IP 或域名 