'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置NProgress
NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    easing: 'ease',
    speed: 500,
    trickleSpeed: 200,
    parent: 'body',
});

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 清理任何现有的超时
    const clearTimeouts = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    // 开始加载进度条
    const startLoading = useCallback(() => {
        clearTimeouts();
        setIsLoading(true);
        NProgress.start();

        // 安全超时：确保进度条最终会完成
        timeoutRef.current = setTimeout(() => {
            NProgress.done();
            setIsLoading(false);
        }, 5000);
    }, [clearTimeouts]);

    // 完成加载进度条
    const finishLoading = useCallback(() => {
        clearTimeouts();
        setIsLoading(false);
        NProgress.done();
    }, [clearTimeouts]);

    // 路径变化时的处理
    useEffect(() => {
        if (prevPathname === null) {
            // 首次加载，仅保存路径
            setPrevPathname(pathname);
            return;
        }

        if (prevPathname !== pathname) {
            // 路径变化了，完成进度条
            finishLoading();
            setPrevPathname(pathname);
        }
    }, [pathname, prevPathname, finishLoading]);

    // 监听链接点击和页面卸载
    useEffect(() => {
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.href &&
                link.href.startsWith(window.location.origin) &&
                !link.href.includes('#') &&
                !e.ctrlKey && !e.metaKey && !e.shiftKey &&
                link.target !== '_blank') {
                startLoading();
            }
        };

        document.addEventListener('click', handleLinkClick);
        window.addEventListener('beforeunload', startLoading);

        return () => {
            document.removeEventListener('click', handleLinkClick);
            window.removeEventListener('beforeunload', startLoading);
            finishLoading();
        };
    }, [startLoading, finishLoading]);

    return (
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-80' : 'opacity-100'}`}>
            {children}
        </div>
    );
} 