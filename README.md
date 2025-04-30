# SelfHost Hub

SelfHost Hub 是一个展示和发现可自托管服务的网站平台。该项目旨在帮助用户找到适合自己需求的自托管解决方案，提供详细的服务信息、部署指南和筛选功能。

## 特点

- 🌐 多语言支持（中文和英文）
- 🏷️ 标签和分组系统，方便筛选
- 📱 响应式设计，支持各种设备
- 🚀 基于 Hugo 构建，快速且易于部署
- 🔍 SEO 友好
- 📦 YAML 驱动的内容管理

## 快速开始

### 环境要求

- Hugo v0.147.0 或更高版本
- Git

### 本地开发

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/selfhost-hub.git
cd selfhost-hub
```

2. 初始化子模块（主题）：

```bash
git submodule update --init --recursive
```

3. 启动开发服务器：

```bash
hugo server -D
```

现在你可以访问 http://localhost:1313 查看网站。

### 添加新服务

所有服务信息都存储在 `data/services.{lang}.yaml` 文件中。要添加新服务，请按照以下格式：

```yaml
services:
  - id: "service-id"
    name: "Service Name"
    description: "Service description"
    website: "https://service-website.com"
    github: "username/repo"
    tags: ["tag1", "tag2"]
    features:
      - "Feature 1"
      - "Feature 2"
    requirements:
      cpu: "1 core"
      memory: "1 GB"
      disk: "1 GB"
    ports:
      - "8080"
    docker_compose: |
      version: '3'
      services:
        service:
          image: service:latest
          ports:
            - "8080:8080"
```

### 多语言支持

- 中文内容：`data/services.zh.yaml`
- 英文内容：`data/services.en.yaml`

请确保在添加新服务时同时更新两种语言的文件。

## 部署

本项目可以部署到任何支持静态网站的平台。以下是一些推荐的部署选项：

1. GitHub Pages
2. Netlify
3. Vercel
4. Cloudflare Pages

## 贡献

欢迎提交 Pull Request 来添加新的服务或改进现有功能。在提交 PR 之前，请确保：

1. 服务信息完整且准确
2. 同时更新中文和英文内容
3. 遵循现有的 YAML 格式
4. 提供有效的 Docker Compose 配置

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

# SelfHost Hub (English)

SelfHost Hub is a website platform for showcasing and discovering self-hosted services. The project aims to help users find self-hosted solutions that meet their needs, providing detailed service information, deployment guides, and filtering capabilities.

## Features

- 🌐 Multilingual support (Chinese and English)
- 🏷️ Tags and grouping system for easy filtering
- 📱 Responsive design for all devices
- 🚀 Built with Hugo for speed and easy deployment
- 🔍 SEO friendly
- 📦 YAML-driven content management

## Quick Start

### Requirements

- Hugo v0.147.0 or higher
- Git

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/selfhost-hub.git
cd selfhost-hub
```

2. Initialize submodules (theme):

```bash
git submodule update --init --recursive
```

3. Start the development server:

```bash
hugo server -D
```

You can now visit http://localhost:1313 to view the site.

### Adding New Services

All service information is stored in `data/services.{lang}.yaml` files. To add a new service, follow this format:

```yaml
services:
  - id: "service-id"
    name: "Service Name"
    description: "Service description"
    website: "https://service-website.com"
    github: "username/repo"
    tags: ["tag1", "tag2"]
    features:
      - "Feature 1"
      - "Feature 2"
    requirements:
      cpu: "1 core"
      memory: "1 GB"
      disk: "1 GB"
    ports:
      - "8080"
    docker_compose: |
      version: '3'
      services:
        service:
          image: service:latest
          ports:
            - "8080:8080"
```

### Multilingual Support

- Chinese content: `data/services.zh.yaml`
- English content: `data/services.en.yaml`

Please ensure you update both language files when adding new services.

## Deployment

This project can be deployed to any platform that supports static websites. Here are some recommended deployment options:

1. GitHub Pages
2. Netlify
3. Vercel
4. Cloudflare Pages

## Contributing

Pull requests are welcome to add new services or improve existing functionality. Before submitting a PR, please ensure:

1. Service information is complete and accurate
2. Both Chinese and English content is updated
3. The existing YAML format is followed
4. Valid Docker Compose configurations are provided

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 