"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/components/language-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function CategoryFilter({ categories, selectedCategory }: { categories: string[], selectedCategory?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { translations } = useLanguage()
    const [expanded, setExpanded] = useState<boolean>(true)

    // 处理分类点击
    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams)

        if (category === selectedCategory) {
            // 如果点击的是已选中的分类，则移除该分类筛选
            params.delete("category")
        } else {
            // 否则设置新的分类筛选
            params.set("category", category)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    // 清除筛选
    const clearFilters = () => {
        const params = new URLSearchParams(searchParams)
        params.delete("category")
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{translations.filterByCategory || "按分类筛选"}</h3>
            </div>

            {selectedCategory && (
                <div className="mb-4 p-3 bg-muted/50 rounded-md">
                    <p className="text-sm font-medium mb-2">{translations.categories || "分类"}:</p>
                    <div className="flex flex-wrap gap-2">
                        <span
                            className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => handleCategoryClick(selectedCategory)}
                        >
                            {selectedCategory} &times;
                        </span>
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80 transition-colors"
                        >
                            {translations.clearFilter || "清除筛选"}
                        </button>
                    </div>
                </div>
            )}

            <Accordion type="single" collapsible className="w-full" value={expanded ? "categories" : ""} onValueChange={(value) => setExpanded(!!value)}>
                <AccordionItem value="categories">
                    <AccordionTrigger className="text-sm">{translations.categories || "分类"}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pl-2">
                            <RadioGroup value={selectedCategory} onValueChange={handleCategoryClick}>
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            id={`category-${category}`}
                                            value={category}
                                        />
                                        <Label
                                            htmlFor={`category-${category}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {category}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
} 