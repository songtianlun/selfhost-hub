"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import type { Service, TagGroup } from "@/lib/services"
import ServiceGrid from "@/components/service-grid"
import { TagFilter } from "@/components/tag-filter"
import { CategoryFilter } from "@/components/category-filter"
import { SortFilter } from "@/components/sort-filter"
import { useRouter, usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { SearchInput } from "@/components/search-input"

// 筛选状态显示组件
function FilterStatus({
    selectedCategory,
    selectedTags,
    filteredCount,
    totalCount
}: {
    selectedCategory?: string,
    selectedTags: string[],
    filteredCount: number,
    totalCount: number
}) {
    const { translations, language } = useLanguage()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // 没有筛选条件时不显示
    if (!selectedCategory && selectedTags.length === 0) {
        return null
    }

    // 清除所有筛选
    const clearAllFilters = () => {
        router.push(pathname)
    }

    // 移除单个标签
    const removeTag = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("tags")
        const newTags = selectedTags.filter(t => t !== tag)
        newTags.forEach(t => params.append("tags", t))
        router.push(`${pathname}?${params.toString()}`)
    }

    // 移除分类
    const removeCategory = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("category")
        router.push(`${pathname}?${params.toString()}`)
    }

    // 多语言结果数量显示
    const getResultCountText = () => {
        if (filteredCount === totalCount) {
            return language === 'zh'
                ? `共 ${filteredCount} 个服务`
                : `Total: ${filteredCount} services`;
        } else {
            return language === 'zh'
                ? `筛选出 ${filteredCount}/${totalCount} 个服务`
                : `Filtered: ${filteredCount} of ${totalCount} services`;
        }
    };

    return (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                    {translations.selectedFilters}:
                </span>

                {selectedCategory && (
                    <Badge variant="outline" className="flex items-center gap-1 pl-3 pr-2 py-1.5">
                        <span className="text-xs font-medium">{selectedCategory}</span>
                        <button
                            onClick={removeCategory}
                            className="ml-1 text-muted-foreground hover:text-foreground rounded-full"
                            aria-label={language === 'zh' ? `移除分类 ${selectedCategory}` : `Remove category ${selectedCategory}`}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                )}

                {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 pl-3 pr-2 py-1.5">
                        <span className="text-xs font-medium">{tag}</span>
                        <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-muted-foreground hover:text-foreground rounded-full"
                            aria-label={language === 'zh' ? `移除标签 ${tag}` : `Remove tag ${tag}`}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}

                <button
                    onClick={clearAllFilters}
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                    {translations.clearFilters}
                </button>
            </div>

            <div className="text-sm text-muted-foreground">
                {getResultCountText()}
            </div>
        </div>
    )
}

// 创建一个内部组件来使用 useSearchParams
function ServiceFilterInner({
    allServices,
    tagGroups,
    categories
}: {
    allServices: Service[]
    tagGroups: TagGroup[]
    categories: string[]
}) {
    const searchParams = useSearchParams();
    const [filteredServices, setFilteredServices] = useState<Service[]>(allServices);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    // 当 URL 参数变化时，更新筛选条件
    useEffect(() => {
        // 获取标签参数
        const tags = searchParams.getAll('tags');

        // 获取分类参数
        const category = searchParams.get('category') || undefined;

        setSelectedTags(tags);
        setSelectedCategory(category);
    }, [searchParams]);

    // 当筛选条件变化时，筛选服务
    useEffect(() => {
        let filtered = allServices;

        // 按分类筛选
        if (selectedCategory) {
            filtered = filtered.filter(service => service.category === selectedCategory);
        }

        // 按标签筛选
        if (selectedTags.length > 0) {
            filtered = filtered.filter(service =>
                selectedTags.every(tag => service.tags.includes(tag))
            );
        }

        // 按搜索关键词筛选
        const searchQuery = searchParams.get('q')?.toLowerCase();
        if (searchQuery) {
            filtered = filtered.filter(service =>
                service.name.toLowerCase().includes(searchQuery) ||
                service.description.toLowerCase().includes(searchQuery) ||
                service.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }

        // 获取排序参数
        const sortParams = searchParams.getAll('sort');

        // 应用排序
        if (sortParams.length > 0) {
            filtered.sort((a, b) => {
                for (const sortParam of sortParams) {
                    let comparison = 0;
                    switch (sortParam) {
                        case 'rating':
                            comparison = (b.rating || 0) - (a.rating || 0);
                            break;
                        case 'name':
                            comparison = a.name.localeCompare(b.name);
                            break;
                        case 'updatedAt':
                            const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                            const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                            comparison = dateB - dateA;
                            break;
                    }
                    if (comparison !== 0) return comparison;
                }
                return 0;
            });
        } else {
            // 默认排序：优先评分，其次名称
            filtered.sort((a, b) => {
                const ratingComparison = (b.rating || 0) - (a.rating || 0);
                if (ratingComparison !== 0) return ratingComparison;
                return a.name.localeCompare(b.name);
            });
        }

        setFilteredServices(filtered);
    }, [allServices, selectedTags, selectedCategory, searchParams]);

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <SearchInput />
            </div>

            <FilterStatus
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                filteredCount={filteredServices.length}
                totalCount={allServices.length}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="lg:col-span-1 space-y-6">
                    <SortFilter />
                    <CategoryFilter categories={categories} selectedCategory={selectedCategory} />
                    <TagFilter tagGroups={tagGroups} selectedTags={selectedTags} />
                </div>
                <div className="lg:col-span-3">
                    <ServiceGrid services={filteredServices} />
                </div>
            </div>
        </div>
    );
}

// 外部组件使用 Suspense 包装内部组件
export function ClientServiceFilter(props: {
    allServices: Service[]
    tagGroups: TagGroup[]
    categories: string[]
}) {
    return (
        <Suspense fallback={
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="lg:col-span-1 space-y-6">
                    {/* 加载中的占位符 */}
                    <div className="border rounded-md p-4 h-[400px] animate-pulse" />
                </div>
                <div className="lg:col-span-3">
                    {/* 服务列表加载中占位符 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="border rounded-md p-4 h-[200px] animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        }>
            <ServiceFilterInner {...props} />
        </Suspense>
    );
} 