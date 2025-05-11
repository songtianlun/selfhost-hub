"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type SortOption = {
  id: string
  label: {
    zh: string
    en: string
  }
}

const sortOptions: SortOption[] = [
  {
    id: "rating",
    label: {
      zh: "评分",
      en: "Rating"
    }
  },
  {
    id: "name",
    label: {
      zh: "名称",
      en: "Name"
    }
  },
  {
    id: "updatedAt",
    label: {
      zh: "更新时间",
      en: "Updated At"
    }
  }
]

export function SortFilter() {
  const { translations, language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [expanded, setExpanded] = useState<boolean>(false)

  // 从 URL 参数中获取当前排序选项
  const currentSorts = searchParams.getAll("sort")

  // 处理排序选项变化
  const handleSortChange = (sortId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (checked) {
      // 添加新的排序选项
      params.append("sort", sortId)
    } else {
      // 移除排序选项
      const newSorts = currentSorts.filter(sort => sort !== sortId)
      params.delete("sort")
      newSorts.forEach(sort => params.append("sort", sort))
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{translations.sortBy || "排序方式"}</h3>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={expanded ? "sorts" : ""}
        onValueChange={(value) => setExpanded(!!value)}
      >
        <AccordionItem value="sorts">
          <AccordionTrigger className="text-sm">{translations.sortOptions || "排序选项"}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {sortOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={currentSorts.includes(option.id)}
                    onCheckedChange={(checked) => handleSortChange(option.id, checked as boolean)}
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label[language]}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 