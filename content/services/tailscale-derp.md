---
id: tailscale-derp
name: Tailscale DERP
description: Tailscale的中继服务器，用于帮助设备穿越NAT建立连接
tags:
  - 网络
  - VPN
  - 穿透
  - Go
rating: 3
category: 网络工具
website: 'https://tailscale.com/kb/1118/custom-derp-servers'
repo: 'https://github.com/tailscale/tailscale'
updatedAt: '2025-05-09T21:40:13.578Z'
---

Tailscale DERP（Designated Encrypted Relay for Packets）是 Tailscale 网络使用的中继服务器，用于在直接连接不可用时（如双重 NAT）帮助设备建立连接。自托管 DERP 服务器可以提高网络性能并减少对公共中继的依赖。

## 主要功能

- **中继功能**：当设备无法直接连接时提供中继服务
- **加密传输**：所有流量在传输过程中都经过加密
- **NAT 穿透**：帮助设备穿越 NAT 或防火墙限制
- **性能提升**：自托管版本可以提供更低的延迟和更高的带宽
- **故障转移**：作为 Tailscale 网络的后备连接方式
- **地理位置优化**：可以在靠近您的用户的地方部署
- **完全兼容**：与 Tailscale 客户端无缝集成
- **简单部署**：单一二进制文件，易于配置
- **轻量高效**：资源占用少，性能出色
- **流量监控**：可以监控中继流量和连接状态

## 部署要求

- Linux 服务器（其他操作系统也支持）
- 公网 IP 或可公开访问的端口
- 通常使用 443/TCP 端口（可配置）
- 最低配置：1核 CPU，512MB 内存
- 推荐配置：2核+ CPU，1GB+ 内存（取决于用户数量）
- 存储空间：约 20MB（基础安装）
- 带宽：取决于用户数量和使用模式
- TLS 证书（可选，推荐）
