"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, Suspense } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

type Language = "zh" | "en"

type Translations = {
  home: string
  tags: string
  about: string
  search: string
  switchLanguage: string
  toggleTheme: string
  openMenu: string
  closeMenu: string
  allServices: string
  filterByTags: string
  clearFilters: string
  selectedTags: string
  noServicesFound: string
  showMore: string
  categories: string
  clearFilter: string
  filterByCategory: string
  selectedFilters: string
  sortBy: string
  sortOptions: string
}

const translations: Record<Language, Translations> = {
  zh: {
    home: "首页",
    tags: "标签",
    about: "关于",
    search: "搜索",
    switchLanguage: "切换语言",
    toggleTheme: "切换主题",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    allServices: "所有服务",
    filterByTags: "按标签筛选",
    clearFilters: "清除筛选",
    selectedTags: "已选择标签",
    noServicesFound: "未找到服务",
    showMore: "查看更多",
    categories: "分类",
    clearFilter: "清除筛选",
    filterByCategory: "按分类筛选",
    selectedFilters: "已选择筛选",
    sortBy: "排序方式",
    sortOptions: "排序选项"
  },
  en: {
    home: "Home",
    tags: "Tags",
    about: "About",
    search: "Search",
    switchLanguage: "Switch Language",
    toggleTheme: "Toggle Theme",
    openMenu: "Open Menu",
    closeMenu: "Close Menu",
    allServices: "All Services",
    filterByTags: "Filter by Tags",
    clearFilters: "Clear Filters",
    selectedTags: "Selected Tags",
    noServicesFound: "No services found",
    showMore: "Show More",
    categories: "Categories",
    clearFilter: "Clear Filter",
    filterByCategory: "Filter by Category",
    selectedFilters: "Selected Filters",
    sortBy: "Sort By",
    sortOptions: "Sort Options"
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  translations: Translations
  isChangingLanguage: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 内部组件使用 useSearchParams 和 useRouter
function LanguageProviderInner({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // 语言切换进行中的状态
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)

  // Initialize language based on path
  useEffect(() => {
    if (pathname.startsWith("/en")) {
      setLanguage("en")
    } else {
      setLanguage("zh")
    }
  }, [pathname])

  // 在语言切换成功后重置状态
  useEffect(() => {
    if (isChangingLanguage) {
      setIsChangingLanguage(false)
    }
  }, [pathname, isChangingLanguage])

  // Handle language change
  const handleSetLanguage = (newLanguage: Language) => {
    // 设置语言切换中状态
    setIsChangingLanguage(true)

    // 获取当前的查询参数
    const params = new URLSearchParams(searchParams.toString())
    const queryString = params.toString() ? `?${params.toString()}` : ""

    // 使用startTransition优化路由切换
    startTransition(() => {
      // 从英文切换到中文
      if (newLanguage === "zh" && pathname.startsWith("/en")) {
        // 正确处理 /en, /en/, /en/tags 等各种情况
        const newPath = pathname === "/en" || pathname === "/en/"
          ? "/"
          : pathname.replace(/^\/en/, "")

        router.push(`${newPath}${queryString}`)
      }
      // 从中文切换到英文
      else if (newLanguage === "en" && !pathname.startsWith("/en")) {
        router.push(`/en${pathname === "/" ? "" : pathname}${queryString}`)
      }
    })

    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        translations: translations[language],
        isChangingLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// 导出主组件，使用 Suspense 包装内部组件
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LanguageProviderInner>{children}</LanguageProviderInner>
    </Suspense>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
