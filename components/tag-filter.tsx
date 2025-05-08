"use client"

import { useState, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import type { TagGroup } from "@/lib/services"
import { useLanguage } from "@/components/language-provider"

// 内部组件使用 useSearchParams
function TagFilterInner({
  tagGroups,
  selectedTags = [],
}: {
  tagGroups: TagGroup[]
  selectedTags: string[]
}) {
  const { translations, language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])

  // Toggle accordion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  // Handle tag selection
  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedTags.includes(tag)) {
      // 移除标签
      params.delete("tags")
      const newTags = selectedTags.filter((t) => t !== tag)
      newTags.forEach((t) => params.append("tags", t))
    } else {
      // 添加标签（保留现有标签）
      params.delete("tags")
      const newTags = [...selectedTags, tag]
      newTags.forEach((t) => params.append("tags", t))
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{translations.filterByTags}</h3>
      </div>

      <Accordion type="multiple" className="w-full" value={expandedGroups}>
        {tagGroups.map((group) => (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger onClick={() => toggleGroup(group.id)} className="text-sm">
              {group.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-2">
                {group.tags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

// 外部组件使用 Suspense 包装内部组件
export function TagFilter(props: {
  tagGroups: TagGroup[]
  selectedTags: string[]
}) {
  return (
    <Suspense fallback={
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-40 bg-muted rounded-md"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded-md"></div>
          ))}
        </div>
      </div>
    }>
      <TagFilterInner {...props} />
    </Suspense>
  );
}
