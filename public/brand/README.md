# 品牌资源文件

此目录包含网站的品牌资源，如 logo 和 favicon。

## 文件说明

- `logo.svg` - 矢量格式的网站 logo
- `favicon.svg` - 矢量格式的网站图标

## 如何生成其他格式

### 生成 PNG 格式的 logo

可以使用以下命令将 SVG 转换为 PNG（需要安装 Inkscape 或其他 SVG 转换工具）：

```bash
inkscape -w 240 -h 80 logo.svg -o logo.png
```

或使用在线转换工具，如 [SVG to PNG](https://svgtopng.com/)。

### 生成 favicon.ico

可以使用以下命令将 SVG 转换为 ICO（需要安装 ImageMagick）：

```bash
convert -background transparent favicon.svg -define icon:auto-resize=16,32,48,64 favicon.ico
```

或使用在线转换工具，如 [favicon.io](https://favicon.io/)。

## 在项目中使用

在 Next.js 项目中，可以在 `app/layout.tsx` 或 `pages/_document.tsx` 文件中设置 favicon：

```tsx
// 在 app/layout.tsx 中（App Router）
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/brand/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

或者在导航栏组件中使用 logo：

```tsx
import Image from 'next/image';

export function Navbar() {
  return (
    <nav>
      <div className="flex items-center">
        <Image src="/brand/logo.svg" alt="SelfhostHub Logo" width={120} height={40} />
        {/* 其他导航元素 */}
      </div>
    </nav>
  );
}
``` 