import type { MetadataRoute } from "next"

// 强制静态生成
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://selfhost-hub.com/sitemap.xml",
  }
}
