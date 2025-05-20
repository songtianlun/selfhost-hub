"use client";

import { useEffect } from "react";

export default function AdSenseScript() {
    useEffect(() => {
        try {
            // 检查是否已经存在AdSense脚本
            const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');

            if (!existingScript) {
                // 创建新的AdSense脚本
                const script = document.createElement("script");
                script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7296634171837358";
                script.async = true;
                script.crossOrigin = "anonymous";

                // 添加到文档头部
                document.head.appendChild(script);
            }
        } catch (error) {
            console.error("Failed to load AdSense script:", error);
        }
    }, []);

    return null;
} 