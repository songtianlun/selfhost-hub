"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

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
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  translations: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")
  const pathname = usePathname()
  const router = useRouter()

  // Initialize language based on path
  useEffect(() => {
    if (pathname.startsWith("/en")) {
      setLanguage("en")
    } else {
      setLanguage("zh")
    }
  }, [pathname])

  // Handle language change
  const handleSetLanguage = (newLanguage: Language) => {
    // Redirect to corresponding language path
    if (newLanguage === "en" && !pathname.startsWith("/en")) {
      router.push(`/en${pathname}`)
    } else if (newLanguage === "zh" && pathname.startsWith("/en")) {
      router.push(pathname.replace(/^\/en/, ""))
    }

    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
