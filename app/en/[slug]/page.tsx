import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/service-card"
import { Rating } from "@/components/rating"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug, "en")
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
  const slugs = await getAllServiceSlugs("en")
  return slugs.map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug, "en")

  if (!service) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/en" className="text-muted-foreground mb-2 hover:text-foreground transition-colors duration-300 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-arrow-left"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
            Back to all services
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">{service.name}</h1>
                {service.rating && <Rating rating={service.rating} />}
              </div>
              <p className="text-xl text-muted-foreground mb-6">{service.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Link href={`/en?category=${encodeURIComponent(service.category)}`}>
                  <Badge variant="outline" className="hover:bg-muted cursor-pointer transition-colors duration-300">
                    {service.category}
                  </Badge>
                </Link>
                {service.tags.map((tag) => (
                  <Link key={tag} href={`/en?tags=${encodeURIComponent(tag)}`}>
                    <Tag tag={tag} clickable={true} />
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
                  Visit Website
                </Link>
              )}

              {service.repo && (
                <Link
                  href={service.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-300 hover:bg-muted"
                >
                  Source Code
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

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: service.content || "" }} />
        </div>
      </div>
    </div>
  )
} 