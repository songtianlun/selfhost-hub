"use client"

import type { Service } from "@/lib/services"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import Link from "next/link"

export function Tag({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {tag}
    </span>
  )
}

export default function ServiceCard({ service }: { service: Service }) {
  const { language } = useLanguage()

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {service.image && (
        <div className="relative aspect-video overflow-hidden">
          <Image src={service.image} alt={service.name} fill className="object-cover" />
        </div>
      )}
      <CardContent className="flex-1 flex flex-col p-4">
        <h3 className="text-xl font-bold mt-2 mb-2">{service.name}</h3>
        <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">{service.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
          {service.tags.length > 3 && <span className="text-xs text-muted-foreground">+{service.tags.length - 3}</span>}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link
          href={language === "zh" ? `/${service.slug}` : `/en/${service.slug}`}
          className="inline-flex items-center justify-center rounded-md bg-primary w-full px-4 py-2 text-sm font-medium text-primary-foreground shadow"
        >
          {language === "zh" ? "了解详情" : "Learn More"}
        </Link>
      </CardFooter>
    </Card>
  )
}
