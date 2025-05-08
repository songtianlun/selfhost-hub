import { getAllServices, getTags, getAllCategories } from "@/lib/services"
import type { Metadata } from "next"
import { ClientServiceFilter } from "@/components/client-service-filter"

export const metadata: Metadata = {
  title: "自托管服务和工具目录",
  description: "收集各种可自托管的服务、工具等内容，按标签分类并提供筛选功能",
}

// 声明同样的函数参数，但完全不使用它们
export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  // 获取所有数据
  const services = await getAllServices("zh");
  const tagGroups = await getTags("zh");
  const categories = await getAllCategories("zh");

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">自托管服务和工具目录</h1>
      <p className="text-xl text-muted-foreground mb-12">
        发掘、探索并部署各种高质量的自托管服务和工具，掌控您的数据和基础设施。
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
