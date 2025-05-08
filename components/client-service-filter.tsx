"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import type { Service, TagGroup } from "@/lib/services"
import ServiceGrid from "@/components/service-grid"
import { TagFilter } from "@/components/tag-filter"
import { CategoryFilter } from "@/components/category-filter"

export function ClientServiceFilter({
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

        setFilteredServices(filtered);
    }, [allServices, selectedTags, selectedCategory]);

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1 space-y-6">
                <CategoryFilter categories={categories} selectedCategory={selectedCategory} />
                <TagFilter tagGroups={tagGroups} selectedTags={selectedTags} />
            </div>
            <div className="lg:col-span-3">
                <ServiceGrid services={filteredServices} />
            </div>
        </div>
    );
} 