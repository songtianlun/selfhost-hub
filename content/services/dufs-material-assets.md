---
id: dufs-material-assets
name: Dufs Material Assets
description: 为 Dufs 提供 Material 风格界面的静态资源包，可替换默认前端样式与图标
tags:
  - Dufs
  - 主题
  - 前端资源
  - 文件管理
  - 美化
category: 文件管理
website: 'https://github.com/TransparentLC/dufs-material-assets'
repo: 'https://github.com/TransparentLC/dufs-material-assets'
updatedAt: '2025-05-13T00:00:00.000Z'
---

Dufs Material Assets 是面向 Dufs 文件服务器的 Material Design 静态资源包，提供替换版的 HTML、CSS 和图标，让自托管文件站点拥有更现代的界面。

## 主要功能

- **一键美化**：将 Dufs 默认前端替换为 Material 风格的布局、颜色与字体
- **高分辨率图标**：提供针对不同文件类型的 SVG/PNG 图标，界面更清晰
- **独立资源包**：仅包含静态文件，可在升级 Dufs 时独立维护
- **配置灵活**：支持通过 `--assets` 参数或挂载目录将自定义前端注入容器
- **可二次定制**：在原有主题基础上调整颜色、字体或 LOGO 以匹配品牌

## 使用提示

1. 下载项目生成的前端资源包，并放置在服务器可访问的目录下。
2. 启动 Dufs 时通过 `--assets` 指向该目录，或在 Docker Compose 中挂载到容器内。
3. 清理浏览器缓存后访问，确认新主题已生效；如需回滚，移除该目录即可。
