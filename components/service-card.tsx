"use client"

import React from "react"
import type { Service } from "@/lib/services"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export function Tag({ tag, clickable = false }: { tag: string, clickable?: boolean }) {
  const { language } = useLanguage()

  if (clickable) {
    return (
      <Link
        href={language === "zh" ? `/?tags=${encodeURIComponent(tag)}` : `/en?tags=${encodeURIComponent(tag)}`}
        onClick={(e) => e.stopPropagation()} // 防止冒泡到卡片点击事件
        className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 cursor-pointer transition-colors duration-300"
      >
        {tag}
      </Link>
    )
  }

  return (
    <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {tag}
    </span>
  )
}

export default function ServiceCard({ service }: { service: Service }) {
  const { language } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const navigatingRef = useRef(false)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 清理所有计时器
  useEffect(() => {
    return () => {
      navigatingRef.current = false
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current)
    }
  }, [])

  // 启动进度条动画 - 更稳定的实现
  const startProgressAnimation = () => {
    setLoadingProgress(0)

    // 设置更平滑的进度条动画
    const interval = 50; // 更频繁的更新，更平滑的感觉
    const maxDuration = 800; // 最长持续时间
    const totalSteps = maxDuration / interval;
    let step = 0;

    progressTimerRef.current = setInterval(() => {
      step++;
      // 使用easeOutQuad曲线，前进快，后面慢
      const progress = Math.min(90, 100 * (step / totalSteps) * (2 - (step / totalSteps)));
      setLoadingProgress(progress);

      if (step >= totalSteps) {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      }
    }, interval);
  }

  // 处理导航的统一方法，避免重复代码
  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 防止重复点击和导航
    if (navigatingRef.current || isLoading) return;

    navigatingRef.current = true;
    setIsLoading(true);
    startProgressAnimation();

    const targetUrl = language === "zh" ? `/${service.slug}` : `/en/${service.slug}`;

    // 短暂延迟后导航，让进度条有时间显示
    loadingTimeoutRef.current = setTimeout(() => {
      if (navigatingRef.current) {
        setLoadingProgress(100); // 完成进度条
        router.push(targetUrl);

        // 导航开始后不要立即清除加载状态，避免闪烁
        // 下一页面的 PageTransition 组件会处理过渡
      }
    }, 300);

    // 安全保障，确保导航最终会发生
    setTimeout(() => {
      if (navigatingRef.current) {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        router.push(targetUrl); // 使用router.push而不是直接修改location
      }
    }, 2000);
  }

  return (
    <Card
      className={`overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md cursor-pointer ${isLoading ? 'opacity-90' : ''}`}
      onClick={handleNavigation}
    >
      {service.image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className={`object-cover transition-transform duration-300 ${isLoading ? '' : 'hover:scale-105'}`}
            loading="lazy"
          />
        </div>
      )}
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{service.name}</h3>
          <Link
            href={language === "zh" ? `/?category=${encodeURIComponent(service.category)}` : `/en?category=${encodeURIComponent(service.category)}`}
            onClick={(e) => e.stopPropagation()} // 防止冒泡到卡片点击事件
          >
            <Badge variant="outline" className="ml-2 hover:bg-muted cursor-pointer transition-colors duration-300">
              {service.category}
            </Badge>
          </Link>
        </div>
        <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">{service.description}</p>
        {service.rating && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <span>评分：</span>
            <span className="font-medium">{service.rating.toFixed(1)}</span>
            <span className="text-yellow-500">★</span>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} tag={tag} clickable={true} />
          ))}
          {service.tags.length > 3 && <span className="text-xs text-muted-foreground">+{service.tags.length - 3}</span>}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="w-full relative">
          {/* 进度条 - 使用更平滑的过渡效果 */}
          <div className="absolute top-0 left-0 h-full bg-primary/10 rounded-md w-full"></div>
          {isLoading && (
            <div className="absolute top-0 left-0 h-full bg-primary/25 rounded-md transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}>
            </div>
          )}

          <Link
            href={language === "zh" ? `/${service.slug}` : `/en/${service.slug}`}
            className="inline-flex items-center justify-center rounded-md bg-primary w-full px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors duration-300 hover:bg-primary/90 relative z-10"
            onClick={handleNavigation}
          >
            {isLoading ? (
              <div className="flex items-center gap-2 transition-opacity duration-300">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {language === "zh" ? "加载中..." : "Loading..."}
              </div>
            ) : (
              language === "zh" ? "了解详情" : "Learn More"
            )}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
