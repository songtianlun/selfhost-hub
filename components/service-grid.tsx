"use client"

import type { Service } from "@/lib/services"
import ServiceCard from "@/components/service-card"
import { useLanguage } from "@/components/language-provider"
import { useEffect, useState, useRef } from "react"

export default function ServiceGrid({ services }: { services: Service[] }) {
  const { translations } = useLanguage()
  // 添加状态用于控制卡片的淡入动画
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  // 用于跟踪请求ID来防止竞态条件
  const animationRequestIdRef = useRef<number>(0)
  // 动画是否已完成的标记
  const [animationComplete, setAnimationComplete] = useState(false)

  // 控制卡片的顺序淡入
  useEffect(() => {
    // 重置动画状态
    setVisibleItems([])
    setAnimationComplete(false)

    // 递增请求ID以取消旧的动画
    const currentRequestId = ++animationRequestIdRef.current

    // 立即显示前几张卡片，然后顺序显示其余卡片
    const showItems = () => {
      // 确保仍是最新的请求
      if (currentRequestId !== animationRequestIdRef.current) return

      // 立即显示屏幕上可能可见的前6张卡片（第一屏）
      const initialVisible = Math.min(6, services.length);
      const initialVisibleItems = Array.from({ length: initialVisible }, (_, i) => i);
      setVisibleItems(initialVisibleItems);

      // 如果服务数量较多，则顺序显示剩余卡片
      if (services.length > initialVisible) {
        // 创建一个进行中的可见项数组
        let newVisibleItems = [...initialVisibleItems];

        services.slice(initialVisible).forEach((_, idx) => {
          const index = idx + initialVisible;
          // 按顺序展示剩余卡片，每张卡片之间有30ms的延迟
          setTimeout(() => {
            // 再次检查请求ID
            if (currentRequestId !== animationRequestIdRef.current) return

            newVisibleItems = [...newVisibleItems, index];
            setVisibleItems([...newVisibleItems]);

            // 检查是否所有卡片都已显示
            if (index === services.length - 1) {
              setAnimationComplete(true);
            }
          }, idx * 30);
        });
      } else {
        // 如果服务数量很少，立即完成动画
        setAnimationComplete(true);
      }
    }

    // 几乎立即显示卡片，无需等待
    const timer = setTimeout(showItems, 50);

    // 确保在2秒后强制显示所有卡片，防止任何问题导致卡片永远不显示
    const fallbackTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [services]); // 当服务列表变化时重新运行动画

  // 兜底处理：如果动画完成标记为true，强制显示所有卡片
  useEffect(() => {
    if (animationComplete) {
      setVisibleItems(services.map((_, index) => index));
    }
  }, [animationComplete, services]);

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{translations.noServicesFound}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={`transition-all duration-200 transform ${visibleItems.includes(index) || animationComplete
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }`}
          style={{
            transitionDelay: `${Math.min(index * 20, 200)}ms`,
          }}
        >
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  );
}
