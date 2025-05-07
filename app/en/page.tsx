import { getAllServices, getTags } from "@/lib/services"
import ServiceGrid from "@/components/service-grid"
import { TagFilter } from "@/components/tag-filter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Self-hosted Services and Tools Directory",
  description: "Collection of various self-hosted services and tools, categorized by tags with filtering functionality",
  openGraph: {
    locale: "en_US",
  },
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

  const services = await getAllServices("en")
  const tagGroups = await getTags("en")

  // Filter services by selected tags
  const filteredServices =
    selectedTags.length > 0
      ? services.filter((service) => selectedTags.every((tag) => service.tags.includes(tag)))
      : services

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">Self-hosted Services and Tools Directory</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Discover, explore, and deploy various high-quality self-hosted services and tools to take control of your data
        and infrastructure.
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
