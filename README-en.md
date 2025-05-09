# SelfHost Hub - Hugo Version

This is the Hugo version of SelfHost Hub, a directory website collecting various self-hosted services and tools.

## Features

- Responsive design for mobile and desktop
- Dark mode support
- Multilingual support (Chinese and English)
- Filter services by tags and categories
- Client-side interactions with Alpine.js
- Styled with Tailwind CSS

## Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (Extended version)
- [Node.js](https://nodejs.org/) (for Tailwind CSS)

### Installation

1. Clone this repository

```bash
git clone https://github.com/yourusername/selfhost-hub.git
cd selfhost-hub/hugo-selfhost-hub
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run start
```

This will start both the Hugo development server and the Tailwind CSS watch mode.

### Build

To build the site for production, run:

```bash
npm run deploy
```

This will generate optimized CSS files and build the Hugo site, with output in the `public` directory.

## Adding New Services

To add a new service, create a new Markdown file in the `content/` directory (Chinese version) or `content/en/` directory (English version), using the following template:

```markdown
---
title: "Service Name"
description: "Short description"
date: 2023-01-01
tags:
  - "Tag1"
  - "Tag2"
category: "Category Name"
website: "https://example.com"
github: "https://github.com/example/repo"
image: "/images/services/example.png"
---

# Service Name

Detailed description...

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Deployment Requirements

- Requirement 1
- Requirement 2
- Requirement 3
```

Place the service image in the `static/images/services/` directory.

## Directory Structure

```
hugo-selfhost-hub/
├── archetypes/       # Content templates
├── assets/           # Resources to be processed (e.g., SCSS)
├── content/          # Website content (Chinese)
├── content/en/       # Website content (English)
├── data/             # Data files
├── layouts/          # Template files
├── static/           # Static files
├── themes/           # Themes
├── config.toml       # Hugo configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Contributing

Contributions are welcome! Feel free to submit Pull Requests or create Issues.

## License

MIT 