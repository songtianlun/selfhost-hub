import { getAllServices, getTags, getAllCategories } from "@/lib/services"
import type { Metadata } from "next"
import { ClientServiceFilter } from "@/components/client-service-filter"

export const metadata: Metadata = {
  title: "Self-hosted Services and Tools Directory",
  description: "Collection of various self-hosted services and tools, categorized by tags with filtering functionality",
  openGraph: {
    locale: "en_US",
  },
}

// 声明同样的函数参数，但完全不使用它们
export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // 获取所有数据
  const services = await getAllServices("en");
  const tagGroups = await getTags("en");
  const categories = await getAllCategories("en");

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">Self-hosted Services and Tools Directory</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Discover, explore, and deploy various high-quality self-hosted services and tools to take control of your data
        and infrastructure.
      </p>

      {/* 使用客户端组件处理筛选逻辑 */}
      <ClientServiceFilter
        allServices={services}
        tagGroups={tagGroups}
        categories={categories}
      />
    </div>
  )
}
