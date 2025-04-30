---
title: 不蒜子
description: 一个轻量级的网站访问统计服务，支持 PV、UV 统计，无需注册即可使用。
tags:
  - category: 类型
    items:
      - 统计
      - 分析
  - category: 技术栈
    items:
      - JavaScript
      - API
features:
  - 轻量级
  - 无需注册
  - 实时统计
  - 支持 PV/UV
  - 简单集成
website: https://busuanzi.ibruce.info
github: https://github.com/ibruce/busuanzi
license: MIT
---

# 不蒜子

不蒜子是一个轻量级的网站访问统计服务，支持 PV（页面访问量）和 UV（独立访客数）统计。它无需注册即可使用，只需要在网站中嵌入一段简单的 JavaScript 代码即可。

## 主要功能

- **访问统计**：
  - PV（页面访问量）统计
  - UV（独立访客数）统计
  - 实时数据更新
- **使用特点**：
  - 无需注册
  - 无需数据库
  - 无需后端
  - 支持 HTTPS
- **数据展示**：
  - 支持多种展示方式
  - 可自定义样式
  - 支持异步加载

## 技术特点

- 纯前端实现
- 轻量级，加载快速
- 支持 HTTPS
- 支持异步加载
- 支持自定义样式

## 使用方法

1. 在网站中引入不蒜子脚本：
```html
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

2. 在需要显示统计数字的地方添加标签：
```html
<span id="busuanzi_value_site_pv"></span>  <!-- 总访问量 -->
<span id="busuanzi_value_site_uv"></span>  <!-- 总访客数 -->
```

## 相关资源

- [官方文档](https://busuanzi.ibruce.info)
- [GitHub 仓库](https://github.com/ibruce/busuanzi)
- [使用示例](https://ibruce.info/2015/04/04/busuanzi/) 