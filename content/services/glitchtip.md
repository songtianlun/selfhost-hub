---
id: glitchtip
name: GlitchTip
description: 一个兼容Sentry协议的轻量级开源监控系统，使用Django开发，支持错误收集和性能监控，可作为Sentry的替代方案，部署简单且资源占用较低
tags:
  - 错误跟踪
  - 性能监控
  - 应用监控
  - Python
category: 系统监控
website: 'https://glitchtip.com/'
repo: 'https://gitlab.com/glitchtip'
updatedAt: '2025-05-10T15:00:00.000Z'
---

GlitchTip是一个兼容Sentry协议的轻量级开源监控系统，使用Django开发，支持错误收集和性能监控，可作为Sentry的替代方案，部署简单且资源占用较低。

## 主要功能

### 1. **错误追踪与收集**  
- 支持通过 **Sentry 协议** 接收应用程序的错误数据，兼容 Sentry 的开源 SDK，可收集并组织错误信息，方便开发者快速定位和修复问题。  
- 提供基本的错误报告功能，包括堆栈跟踪、环境信息、请求数据等，帮助开发者分析异常。  

### 2. **应用性能监控（APM）**  
- 监控应用程序的性能瓶颈，支持 **请求追踪** 和 **事务分析**，帮助优化代码执行效率。  
- 在最新版本（如 4.2）中，支持 **服务端限流**，可设置组织和项目级别的限流策略，减少不必要的性能开销。  

### 3. **网站可用性监测**  
- 提供 **定期 Ping 检测**，监控网站的响应状态，并在网站不可用时通过 **电子邮件或 Webhook** 发送警报。  

### 4. **轻量级与易部署**  
- 相比 Sentry，GlitchTip 采用更轻量的架构（基于 **Django + PostgreSQL + Redis + Celery**），部署更简单，适合资源有限的环境。  
- 支持 **Docker 和 Helm Chart** 部署，并提供托管和自托管选项。  

### 5. **兼容性与扩展性**  
- 完全兼容 Sentry SDK，可无缝替换 Sentry，同时支持 **Source Map** 解析，优化 JavaScript 错误调试体验。  
- 提供 **API 集成**，并计划在未来版本中增强前端配置功能（如限流设置）。  

## 部署要求

GlitchTip 需要以下组件：PostgreSQL（版本13及以上）、Redis 或 Valkey、一个 Web 服务以及一个工作服务（Worker Service）。

**推荐的系统配置**：1GB 内存，x86 或 arm64 架构的 CPU
**最低系统配置**：512MB 内存 + 交换分区（swap）
磁盘使用量取决于使用情况和事件大小。粗略估算，每月处理 100 万个事件的实例可能需要约 30GB 的磁盘空间。

为了获得最佳性能，建议使用支持请求缓冲（request buffering）并能处理分块传输编码（chunked Transfer-Encoding）的代理或负载均衡器，例如 nginx。

GlitchTip 可以通过 Docker 运行。推荐使用 Docker Compose、DigitalOcean App Platform、PikaPods 或 Elestio。对于 Kubernetes，也提供了 Helm Chart。

具体部署可以参考官方[文档](https://glitchtip.com/documentation/install)