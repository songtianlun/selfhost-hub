---
id: "privatebin"
name: "PrivateBin"
description: "极简、开源的加密在线剪贴板，实现零知识分享"
tags:
  - "隐私"
  - "分享"
  - "安全"
  - "PHP"
category: "文本分享"
website: "https://privatebin.info"
github: "https://github.com/PrivateBin/PrivateBin"
---

# PrivateBin

PrivateBin 是一个极简的开源在线剪贴板，内容在浏览器中加密和解密，服务器对存储的数据一无所知。它实现了真正的零知识隐私，让用户能够安全地分享文本和文件。

## 主要功能

- **浏览器端加密**：所有内容在浏览器中加密，服务器永远无法读取
- **一次性阅读**：支持阅后即焚功能
- **密码保护**：可为分享内容设置额外密码
- **文件附件**：支持加密文件上传
- **阅读期限**：设置内容的过期时间
- **Markdown 支持**：格式化文本内容
- **代码高亮**：支持多种编程语言的语法高亮
- **讨论功能**：允许在分享内容上添加评论
- **纯静态前端**：无需 JavaScript 框架
- **移动友好**：响应式设计，适配各种设备

## 部署要求

- PHP 7.0 或更高版本
- Web 服务器：Apache、Nginx、Lighttpd 等
- 最低配置：0.5核 CPU，128MB 内存
- 推荐配置：1核 CPU，256MB 内存
- 存储空间：基础安装约 2MB，实际需求取决于数据量
- 可选 Redis/Memcached：用于提升性能
- 可选 GD/Imagick：用于图片预览（如启用） 