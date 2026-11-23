---
id: discodrive
name: DiscoDrive
description: 一台服务器搞定文件、照片、日历、联系人、音乐和电子书，通过 WebDAV、CalDAV/CardDAV、OpenSubsonic 和 OPDS 提供服务，直接用你已有的应用连接
tags:
  - PolyForm-Noncommercial-1.0.0
  - 存储
  - 文件共享
  - Go
  - Docker
category: 文件管理
website: 'https://discodrive.app'
repo: 'https://github.com/discodrive-cloud/discodrive'
---

DiscoDrive 用一台服务器、一个账号，取代原本分开部署的文件服务、相册、CalDAV 服务、Subsonic 音乐服务和电子书库。文件以普通文件的形式保存在磁盘上的普通文件夹里，即使不用 DiscoDrive 也能直接读取。

DiscoDrive 采用 PolyForm Noncommercial License 1.0.0 授权，源代码公开（source-available），个人及其他非商业用途免费。

## 主要功能

- **文件与同步**：网页文件管理器，支持预览、历史版本、回收站和公开分享链接；可通过 WebDAV 在访达、Windows 资源管理器和 Linux 文件管理器中挂载；桌面同步客户端遇到冲突时保留冲突副本，不会直接覆盖
- **加密保险库**：端到端加密文件夹，采用 Cryptomator 保险库格式，也可以用 Cryptomator 打开
- **日历、联系人与任务**：CalDAV/CardDAV，可直接使用苹果系统自带应用、DAVx⁵ 和 Thunderbird；支持共享日历和通讯录
- **音乐**：OpenSubsonic API，兼容各类 Subsonic 播放器，另有网络电台、播客和标签编辑器
- **电子书**：OPDS 书库，支持 KOReader、PocketBook 等阅读器及阅读进度同步；支持 EPUB、FB2、PDF、MOBI、CBZ 和 CBR
- **照片**：时间线、地图、收藏、共享相册，支持 HEIC/HDR 和实况照片；可选人脸识别，按人物归类照片，完全在你自己的服务器上运行；重复照片查找
- **收藏夹**：通过浏览器扩展同步书签和稍后阅读，支持服务器端离线下载
- **账号**：多用户及存储配额，支持 TOTP、通行密钥（Passkey）和应用专用密码
- **客户端**：macOS、Windows、Linux 桌面应用，Android 应用，以及已上架 App Store 的 iOS 应用

## 部署要求

- Docker 和 Docker Compose；compose 文件会同时启动 PostgreSQL 和 nginx
- 服务器镜像已预构建，支持 amd64 和 arm64，包括树莓派
- 人脸识别为可选的独立容器
- 安装文档：https://discodrive.app/docs/install
