"use client"

import type { Service } from "@/lib/services"
import ServiceCard from "@/components/service-card"
import { useLanguage } from "@/components/language-provider"

export default function ServiceGrid({ services }: { services: Service[] }) {
  const { translations } = useLanguage()

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{translations.noServicesFound}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
