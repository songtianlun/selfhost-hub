"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import type { TagGroup } from "@/lib/services"
import { useLanguage } from "@/components/language-provider"

export function TagFilter({
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

  // Clear all filters
  const clearFilters = () => {
    router.push(pathname)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{translations.filterByTags}</h3>
      </div>

      {selectedTags.length > 0 && (
        <div className="mb-4 p-3 bg-muted/50 rounded-md">
          <p className="text-sm font-medium mb-2">{translations.selectedTags}:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleTag(tag)}
              >
                {tag} &times;
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              {translations.clearFilters}
            </button>
          </div>
        </div>
      )}

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
