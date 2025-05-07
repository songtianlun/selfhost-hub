import { getTags } from "@/lib/services"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "标签索引",
  description: "浏览自托管服务和工具的所有标签分类",
}

export default async function TagsPage() {
  const tagGroups = await getTags("zh")

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">标签索引</h1>
      <p className="text-xl text-muted-foreground mb-12">浏览所有的标签分类，找到您感兴趣的自托管服务和工具。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tagGroups.map((group) => (
          <div key={group.id} className="space-y-4">
            <h2 className="text-2xl font-bold">{group.name}</h2>
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/?tags=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
