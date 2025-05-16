import { getServiceBySlug, getAllServiceSlugs, getAllServices } from "@/lib/services"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/service-card"
import { Rating } from "@/components/rating"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import { GithubRepoInfoCard, GithubRepoInfoSkeleton } from "@/components/github-repo-info"
import { getGithubRepoInfo, isGithubRepoUrl } from "@/lib/github-api"
import { Suspense, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Service } from "@/lib/services"

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

// 服务详情骨架屏组件
function ServiceDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="h-6 w-32 bg-muted rounded mb-2"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-48 bg-muted rounded"></div>
              <div className="h-6 w-24 bg-muted rounded"></div>
            </div>
            <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
            <div className="h-6 w-2/3 bg-muted rounded mb-6"></div>
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="h-6 w-20 bg-muted rounded"></div>
              <div className="h-6 w-24 bg-muted rounded"></div>
              <div className="h-6 w-16 bg-muted rounded"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-24 bg-primary/20 rounded"></div>
              <div className="h-10 w-28 bg-muted rounded"></div>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-1/3">
            <div className="aspect-video w-full bg-muted rounded"></div>
          </div>
        </div>
      </div>
      <GithubRepoInfoSkeleton />
      <div className="space-y-4">
        <div className="h-6 w-48 bg-muted rounded"></div>
        <div className="h-32 w-full bg-muted rounded"></div>
      </div>
    </div>
  )
}

// GitHubu4fe1u606fu52a0u8f7du5668u7ec4u4ef6 - u6dfbu52a0u66f4u52a0u5e73u6ed1u7684u52a0u8f7du8fc7u6e21
function EnhancedGithubInfoLoader({ repoUrl }: { repoUrl: string }) {
  return (
    <Suspense fallback={<GithubRepoInfoSkeleton />}>
      <GithubInfoLoader repoUrl={repoUrl} />
    </Suspense>
  );
}

// GitHub信息加载器组件
async function GithubInfoLoader({ repoUrl }: { repoUrl: string }) {
  const githubRepoInfo = await getGithubRepoInfo(repoUrl);

  // 检查是否有有效的GitHub仓库信息
  const hasValidRepoInfo = !(
    githubRepoInfo.stars === 0 &&
    !githubRepoInfo.lastUpdated &&
    !githubRepoInfo.latestVersion &&
    !githubRepoInfo.readme
  );

  // 如果没有有效的仓库信息，并且没有错误，则直接返回null
  if (!hasValidRepoInfo && !githubRepoInfo.error) {
    return null;
  }

  return <GithubRepoInfoCard repoInfo={githubRepoInfo} />;
}

// 相似服务卡片
function SimilarServiceCard({ service }: { service: Service & { similarityScore?: number } }) {
  return (
    <Link key={service.slug} href={`/${service.slug}`}>
      <Card className="h-full hover:bg-muted/50 transition-colors duration-300 hover:shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {service.image && (
              <div className="flex-shrink-0 w-16 h-16 relative">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="rounded-md object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{service.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {service.tags.slice(0, 2).map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {service.tags.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{service.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
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
    .slice(0, 6) // 只取前6个

  // 判断是否有GitHub仓库信息
  const hasGithubRepo = service.repo && isGithubRepoUrl(service.repo);

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/"
            className="text-muted-foreground mb-2 hover:text-foreground transition-colors duration-300 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-arrow-left"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            返回到所有服务
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
                  <Badge variant="outline" className="hover:bg-muted cursor-pointer transition-colors duration-300">
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
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors duration-300 hover:bg-primary/90"
                >
                  访问网站
                </Link>
              )}

              {service.repo && (
                <Link
                  href={service.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-300 hover:bg-muted"
                >
                  源码仓库
                </Link>
              )}
            </div>

            <div className="flex-shrink-0 w-full md:w-1/3">
              {service.image && (
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={400}
                    height={300}
                    className="rounded-md object-cover w-full transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GitHub仓库信息 - 使用增强的加载器组件 */}
        {hasGithubRepo && (
          <EnhancedGithubInfoLoader repoUrl={service.repo!} />
        )}

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: service.content || "" }} />
        </div>

        {/* 相似服务推荐 */}
        {similarServices.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">发现更多</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarServices.map((similarService) => (
                <SimilarServiceCard key={similarService.slug} service={similarService} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 