import { getAllServices } from "@/lib/services"
import { Service } from "@/lib/services"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format, isSameMonth, isSameYear } from "date-fns"
import { zhCN } from "date-fns/locale"

export default async function ChangelogPage() {
  const services = await getAllServices("zh")
  
  // 按更新时间排序
  const sortedServices = [...services].sort((a, b) => {
    if (!a.updatedAt || !b.updatedAt) return 0;
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateB - dateA;
  })

  // 按月份分组
  const groupedServices = sortedServices.reduce((groups, service) => {
    if (!service.updatedAt) return groups;
    const date = new Date(service.updatedAt);
    const monthKey = format(date, "yyyy-MM");
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(service);
    return groups;
  }, {} as Record<string, Service[]>);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">更新日志</h1>
      <div className="relative">
        {/* 时间线 */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
        
        <div className="space-y-8">
          {Object.entries(groupedServices).map(([monthKey, monthServices]) => {
            const firstDate = new Date(monthServices[0].updatedAt || "")
            const monthTitle = format(firstDate, "yyyy年MM月", { locale: zhCN })
            
            return (
              <div key={monthKey} className="relative">
                {/* 月份标题 */}
                <div className="flex items-center mb-4">
                  <div className="absolute -left-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold ml-4">{monthTitle}</h2>
                  <span className="px-2 py-0.5 text-sm bg-primary/10 text-primary rounded-full ml-2">
                    {monthServices.length} 个服务更新
                  </span>
                </div>

                {/* 该月的服务列表 */}
                <div className="ml-4 space-y-4">
                  {monthServices.map((service) => (
                    <Card key={service.id} className="relative">
                      <div className="absolute -left-4 top-6 w-4 h-px bg-border" />
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Link 
                                href={`/${service.slug}`} 
                                className="text-lg font-medium hover:underline truncate"
                              >
                                {service.name}
                              </Link>
                              <span className="text-sm text-muted-foreground whitespace-nowrap">
                                {format(new Date(service.updatedAt || ""), "MM-dd", { locale: zhCN })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {service.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 