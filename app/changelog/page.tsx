import { getAllServices } from "@/lib/services"
import { Service } from "@/lib/services"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

export default async function ChangelogPage() {
  const services = await getAllServices("zh")
  
  // 按更新时间排序
  const sortedServices = [...services].sort((a, b) => {
    const dateA = new Date(a.updatedAt || "").getTime()
    const dateB = new Date(b.updatedAt || "").getTime()
    return dateB - dateA
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">更新日志</h1>
      <div className="grid gap-6">
        {sortedServices.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    <Link href={`/services/${service.slug}`} className="hover:underline">
                      {service.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(service.updatedAt || ""), "PPP", { locale: zhCN })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 