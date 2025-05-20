"use client";

import React, { useEffect, useRef } from "react";

// 声明全局 AdSense 类型
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

type AdSenseAdProps = {
    className?: string;
    slot?: string;
};

export default function AdSenseAd({
    className = "w-full mb-8 overflow-hidden",
    slot = "3744772454"
}: AdSenseAdProps) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 确保只在客户端运行
        if (typeof window === 'undefined' || !adRef.current) return;

        try {
            // 创建广告容器
            const adContainer = document.createElement('ins');
            adContainer.className = 'adsbygoogle';
            adContainer.style.display = 'block';
            adContainer.setAttribute('data-ad-client', 'ca-pub-7296634171837358');
            adContainer.setAttribute('data-ad-slot', slot);
            adContainer.setAttribute('data-ad-format', 'auto');
            adContainer.setAttribute('data-full-width-responsive', 'true');

            // 清空并添加广告容器
            if (adRef.current.firstChild) {
                adRef.current.innerHTML = '';
            }
            adRef.current.appendChild(adContainer);

            // 确保 adsbygoogle 已定义，然后推送广告
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log("广告组件已加载，推送广告请求", window.adsbygoogle);
        } catch (error) {
            console.error("加载广告时出错:", error);
        }
    }, [slot]);

    return (
        <div className={className}>
            <div ref={adRef} />
        </div>
    );
} 