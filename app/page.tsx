import { getAllServices, getTags } from "@/lib/services"
import ServiceGrid from "@/components/service-grid"
import { TagFilter } from "@/components/tag-filter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "自托管服务和工具目录",
  description: "收集各种可自托管的服务、工具等内容，按标签分类并提供筛选功能",
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const selectedTags = searchParams?.tags
    ? Array.isArray(searchParams.tags)
      ? searchParams.tags
      : [searchParams.tags]
    : []

  const services = await getAllServices("zh")
  const tagGroups = await getTags("zh")

  // Filter services by selected tags
  const filteredServices =
    selectedTags.length > 0
      ? services.filter((service) => selectedTags.every((tag) => service.tags.includes(tag)))
      : services

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">自托管服务和工具目录</h1>
      <p className="text-xl text-muted-foreground mb-12">
        发现、探索和部署各种优质的自托管服务和工具，让您掌控自己的数据和基础设施。
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <TagFilter tagGroups={tagGroups} selectedTags={selectedTags} />
        </div>
        <div className="lg:col-span-3">
          <ServiceGrid services={filteredServices} />
        </div>
      </div>
    </div>
  )
}
