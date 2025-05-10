import { getServiceBySlug, getAllServiceSlugs, getAllServices } from "@/lib/services"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/service-card"
import { Rating } from "@/components/rating"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug, "zh")
  if (!service) return {}

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.description,
      ...(service.image && { images: [{ url: service.image }] }),
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs("zh")
  return slugs.map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug, "zh")
  const allServices = await getAllServices("zh")

  if (!service) {
    notFound()
  }

  // 计算相似服务
  const similarServices = allServices
    .filter(s => s.slug !== service.slug) // 排除当前服务
    .map(s => ({
      ...s,
      // 计算相似度分数：同类型 + 2分，每个共同标签 + 1分
      similarityScore: (s.category === service.category ? 2 : 0) +
        s.tags.filter(tag => service.tags.includes(tag)).length
    }))
    .filter(s => s.similarityScore > 0) // 只保留有相似度的服务
    .sort((a, b) => b.similarityScore - a.similarityScore) // 按相似度排序
    .slice(0, 6) // 只取前5个

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-muted-foreground mb-2 hover:text-foreground">
            &larr; 返回到所有服务
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">{service.name}</h1>
                {service.rating && <Rating rating={service.rating} />}
              </div>
              <p className="text-xl text-muted-foreground mb-6">{service.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Link href={`/?category=${encodeURIComponent(service.category)}`}>
                  <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                    {service.category}
                  </Badge>
                </Link>
                {service.tags.map((tag) => (
                  <Link key={tag} href={`/?tags=${encodeURIComponent(tag)}`}>
                    <Tag tag={tag} />
                  </Link>
                ))}
              </div>

              {service.website && (
                <Link
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
                >
                  访问官网
                </Link>
              )}

              {service.github && (
                <Link
                  href={service.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm"
                >
                  GitHub
                </Link>
              )}
            </div>

            <div className="flex-shrink-0 w-full md:w-1/3">
              {service.image && (
                <Image
                  src={service.image}
                  alt={service.name}
                  width={400}
                  height={300}
                  className="rounded-md object-cover w-full"
                />
              )}
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: service.content || "" }} />
        </div>

        {/* 相似服务推荐 */}
        {similarServices.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">发现更多</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarServices.map((similarService) => (
                <Link key={similarService.slug} href={`/${similarService.slug}`}>
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {similarService.image && (
                          <div className="flex-shrink-0 w-16 h-16 relative">
                            <Image
                              src={similarService.image}
                              alt={similarService.name}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{similarService.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {similarService.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {similarService.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {similarService.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{similarService.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 