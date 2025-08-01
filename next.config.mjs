/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',

  // 禁用服务器端功能，确保完全静态
  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 静态导出时必须禁用图片优化
    unoptimized: true,
  },

  // 静态导出配置
  distDir: 'out',

  // 确保所有页面都能静态生成
  experimental: {
    // 启用静态生成优化
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // 禁用不兼容静态导出的功能
  poweredByHeader: false,
}

export default nextConfig
