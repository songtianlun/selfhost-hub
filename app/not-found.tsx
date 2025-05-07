"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function NotFound() {
  const { language } = useLanguage()

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-bold mb-4">{language === "zh" ? "页面未找到" : "Page Not Found"}</h1>
      <p className="text-muted-foreground mb-8">
        {language === "zh" ? "我们找不到您正在寻找的页面。" : "We could not find the page you were looking for."}
      </p>
      <Link
        href={language === "zh" ? "/" : "/en"}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
      >
        {language === "zh" ? "返回首页" : "Return to Home"}
      </Link>
    </div>
  )
}
