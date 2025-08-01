import { getAllServiceSlugs, getAllServices } from "@/lib/services"
import type { MetadataRoute } from "next"

// 强制静态生成
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://selfhost-hub.com"

  // Get all service slugs and services for Chinese and English
  const zhSlugs = await getAllServiceSlugs("zh")
  const enSlugs = await getAllServiceSlugs("en")
  const zhServices = await getAllServices("zh")
  const enServices = await getAllServices("en")

  // 创建服务 slug 到 updatedAt 的映射
  const zhServiceMap = new Map(zhServices.map(service => [service.slug, service.updatedAt]))
  const enServiceMap = new Map(enServices.map(service => [service.slug, service.updatedAt]))

  // 默认时间：2025-05-10 22:00 +8 时区
  const defaultDate = new Date("2025-05-10T14:00:00Z")
  // 编译时的当前时间
  const currentDate = new Date()

  // Create sitemap entries for static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/tags`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]

  // Create sitemap entries for Chinese service pages
  const zhServicePages = zhSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(zhServiceMap.get(slug) || defaultDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Create sitemap entries for English service pages
  const enServicePages = enSlugs.map((slug) => ({
    url: `${baseUrl}/en/${slug}`,
    lastModified: new Date(enServiceMap.get(slug) || defaultDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Combine all entries
  return [...staticPages, ...zhServicePages, ...enServicePages]
}
