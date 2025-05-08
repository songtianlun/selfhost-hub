"use client"

import { useState, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/components/language-provider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// 包含 useSearchParams 的内部组件
function CategoryFilterContent({ categories, selectedCategory }: { categories: string[], selectedCategory?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { translations } = useLanguage()

    // 处理分类点击
    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (category === selectedCategory) {
            // 如果点击的是已选中的分类，则移除该分类筛选
            params.delete("category")
        } else {
            // 否则设置新的分类筛选
            params.set("category", category)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="space-y-2 pl-2">
            {categories.map((category) => (
                <div
                    key={category}
                    className="flex items-center space-x-2 py-1 cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                >
                    {/* 自定义单选框，支持取消选择 */}
                    <div
                        className={cn(
                            "h-4 w-4 rounded-full border flex items-center justify-center",
                            selectedCategory === category
                                ? "border-primary"
                                : "border-muted-foreground/50"
                        )}
                    >
                        {selectedCategory === category && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                    </div>
                    <span className="text-sm font-medium leading-none">
                        {category}
                    </span>
                </div>
            ))}
        </div>
    )
}

// 主组件使用 Suspense 包裹内部组件
export function CategoryFilter({ categories, selectedCategory }: { categories: string[], selectedCategory?: string }) {
    const { translations } = useLanguage()
    const [expanded, setExpanded] = useState<boolean>(true)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{translations.filterByCategory || "按分类筛选"}</h3>
            </div>

            <Accordion
                type="single"
                collapsible
                className="w-full"
                value={expanded ? "categories" : ""}
                onValueChange={(value) => setExpanded(!!value)}
                defaultValue="categories"
            >
                <AccordionItem value="categories">
                    <AccordionTrigger className="text-sm">{translations.categories || "分类"}</AccordionTrigger>
                    <AccordionContent>
                        <Suspense fallback={<div className="py-2 text-sm">加载中...</div>}>
                            <CategoryFilterContent
                                categories={categories}
                                selectedCategory={selectedCategory}
                            />
                        </Suspense>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
} 