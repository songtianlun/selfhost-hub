import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tag } from "@/components/service-card"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug, "en")
  if (!service) return {}

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.description,
      ...(service.image && { images: [{ url: service.image }] }),
      locale: "en_US",
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs("en")
  return slugs.map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug, "en")

  if (!service) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/en" className="text-muted-foreground mb-2 hover:text-foreground">
            &larr; Back to all services
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{service.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {service.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
                <div className="flex items-center ml-auto">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Category:</span>
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                    {service.category}
                  </span>
                </div>
              </div>

              {service.website && (
                <Link
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
                >
                  Visit Website
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
      </div>
    </div>
  )
}
