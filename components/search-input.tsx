"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"

export function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  // 使用防抖处理搜索
  const debouncedSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set("q", value)
      } else {
        params.delete("q")
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  // 当搜索参数变化时更新输入框
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
  }, [searchParams])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={language === "zh" ? "搜索服务..." : "Search services..."}
        className="pl-9"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          debouncedSearch(e.target.value)
        }}
      />
    </div>
  )
} 