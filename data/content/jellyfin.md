# Jellyfin - 自由的媒体系统

![Jellyfin Logo](../images/services/jellyfin.png)

## 什么是 Jellyfin？

Jellyfin 是一个免费的开源媒体系统，让您可以控制自己的媒体收藏和流媒体服务。它是 Emby 和 Plex 的完全免费、无限制且注重隐私的替代品。Jellyfin 允许您收集、管理和流式传输您的媒体到任何设备。

## 主要特点

- **媒体组织**：自动整理您的电影、电视节目、音乐和照片
- **实时转码**：动态转换媒体格式以适应不同的设备和带宽条件
- **用户管理**：创建多个用户帐户，每个帐户都有自己的观看进度和偏好设置
- **移动和网络应用**：几乎任何设备都可以访问您的媒体
- **完全免费**：无订阅、无高级功能锁定、没有隐藏的限制
- **元数据抓取**：自动下载电影封面、演员信息、简介等
- **字幕支持**：自动查找和下载字幕
- **直播电视**：支持 HDHomeRun 和 M3U IPTV
- **离线观看**：下载媒体以便在没有互联网连接的情况下观看

## 为什么选择 Jellyfin？

相比于其他媒体服务器，Jellyfin 具有以下优势：

1. **100% 自由开源**：没有商业公司控制您的媒体访问
2. **隐私至上**：不收集任何用户数据
3. **无成本**：完全免费，所有功能均可使用
4. **无用户限制**：可以添加任意数量的用户
5. **社区驱动**：由用户为用户开发和维护
6. **全平台支持**：可在几乎任何设备上使用

## 系统要求

最低系统要求：
- x86_64、ARM 或其他支持的 CPU 架构
- 至少 1GB RAM
- 足以存储您媒体的存储空间
- .NET Core 兼容的操作系统（Linux、Windows、macOS、FreeBSD）

推荐配置：
- 多核 CPU
- 至少 2GB RAM（转码时更多）
- SSD 用于应用程序和数据库
- 高速网络连接
- 硬件转码支持（如 Intel QSV 或 NVIDIA NVENC）

## 详细安装指南

### 使用 Docker 安装

最简单的方法是使用 Docker：

```bash
docker run -d \
  --name=jellyfin \
  -e PUID=1000 \
  -e PGID=1000 \
  -p 8096:8096 \
  -v /path/to/config:/config \
  -v /path/to/media:/media \
  --restart unless-stopped \
  jellyfin/jellyfin
```

### 使用 Docker Compose 安装

创建 `docker-compose.yml` 文件：

```yaml
version: '3'
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    user: 1000:1000
    ports:
      - 8096:8096
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - /path/to/media:/media
    restart: unless-stopped
```

运行 `docker-compose up -d` 启动服务。

### 在 Debian/Ubuntu 上安装

```bash
wget -O - https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo apt-key add -
echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
sudo apt update
sudo apt install jellyfin
```

## 初始设置

1. 安装完成后，访问 `http://您的服务器IP:8096`
2. 按照设置向导创建管理员帐户
3. 添加媒体库，指定您的媒体文件位置
4. 设置媒体类型和元数据提供商
5. 等待媒体库扫描完成

## 客户端应用

Jellyfin 支持多种客户端应用：

- 网页界面（所有设备）
- Android 和 iOS 应用
- Android TV 和 Fire TV
- Roku
- Kodi 插件
- Xbox One
- 智能电视（Samsung、LG）

## 优化技巧

1. **组织您的媒体**：按照建议的文件命名结构整理文件
2. **使用硬件加速**：配置 GPU 转码以减轻 CPU 负担
3. **优化网络**：确保服务器和客户端之间有足够的带宽
4. **定期维护**：定期清理数据库和元数据以保持性能
5. **正确的文件格式**：尽可能使用直接播放格式，减少实时转码需求

## 常见问题解答

### Jellyfin 和 Plex/Emby 有什么区别？
Jellyfin 是完全免费和开源的，没有高级功能锁定或订阅。它还更注重隐私，不收集用户数据。

### 如何获取电影和电视节目的元数据？
Jellyfin 自动从 TMDb、TVDB、MusicBrainz 等数据源获取元数据。

### 可以远程访问我的 Jellyfin 服务器吗？
是的，通过端口转发或反向代理，您可以从外部网络安全地访问您的媒体库。

## 参考资源

- [官方文档](https://jellyfin.org/docs/)
- [GitHub 仓库](https://github.com/jellyfin/jellyfin)
- [社区论坛](https://forum.jellyfin.org/) 