# SelfHost Hub

SelfHost Hub 是一个收集和展示各种可自托管服务的网站。它提供了详细的服务信息、教程和最佳实践，帮助用户找到并部署适合自己的自托管解决方案。

## 功能特点

- 服务导航：收集和展示各种可自托管的服务
- 标签系统：通过标签快速筛选和查找服务
- 多语言支持：支持中文和英文
- 教程中心：提供详细的部署和配置教程
- SEO 友好：针对搜索引擎优化
- 响应式设计：支持各种设备访问

## 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [MDX](https://mdxjs.com/) - Markdown 扩展

## 开发

1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/selfhost-hub.git
   cd selfhost-hub
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

## 项目结构

```
src/
├── components/     # 可复用组件
├── content/        # 内容文件
│   ├── services/   # 服务内容
│   └── tutorials/  # 教程内容
├── layouts/        # 布局组件
├── pages/          # 页面文件
└── utils/          # 工具函数
```

## 贡献

欢迎提交 Pull Request 或创建 Issue 来改进项目。

## 许可证

MIT

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
