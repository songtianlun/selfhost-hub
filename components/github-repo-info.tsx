'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GithubRepoInfo } from '@/lib/github-api';
import ReactMarkdown from 'react-markdown';
// 引入rehype和remark插件
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import { Skeleton } from './ui/skeleton';

// 添加GitHub风格Markdown的CSS
import './github-markdown.css';

// 组件直接接收服务端获取的数据
export function GithubRepoInfoCard({ repoInfo }: { repoInfo: GithubRepoInfo }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isReadmeOpen, setIsReadmeOpen] = useState(false);
    const mountedRef = useRef(false);

    // 组件挂载后添加淡入效果
    useEffect(() => {
        mountedRef.current = true;
        // 短暂延迟确保动画效果平滑
        const timer = setTimeout(() => {
            if (mountedRef.current) {
                setIsVisible(true);
            }
        }, 100);

        // 确保即使加载时间很长，也会在5秒后强制显示
        const fallbackTimer = setTimeout(() => {
            if (mountedRef.current) {
                setIsVisible(true);
            }
        }, 5000);

        return () => {
            mountedRef.current = false;
            clearTimeout(timer);
            clearTimeout(fallbackTimer);
        };
    }, []);

    // 格式化日期
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className={`w-full transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    GitHub 仓库信息
                </CardTitle>
            </CardHeader>
            <CardContent>
                {repoInfo.error ? (
                    <div className="text-destructive p-4 bg-destructive/10 rounded-md">{repoInfo.error}</div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            <Badge variant="secondary" className="flex items-center gap-1 text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                {repoInfo.stars.toLocaleString()} 星标
                            </Badge>

                            <div className="text-sm text-muted-foreground">
                                仓库更新: {formatDate(repoInfo.lastUpdated)}
                            </div>

                            {repoInfo.latestVersion && (
                                <Badge variant="outline" className="text-sm">
                                    最新版本: {repoInfo.latestVersion}
                                </Badge>
                            )}
                        </div>

                        {repoInfo.readme && (
                            <Tabs defaultValue="readme" className="w-full">
                                <TabsList>
                                    <TabsTrigger
                                        value="readme"
                                        className="text-base flex items-center gap-2"
                                        onClick={() => setIsReadmeOpen(prev => !prev)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                                        README
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="readme" className="mt-4">
                                    <div className={`max-h-[600px] overflow-y-auto border rounded-md p-6 w-full max-w-none github-markdown transition-all duration-500 ${isReadmeOpen ? 'opacity-100' : 'opacity-90'}`}>
                                        <div className="markdown-body">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]} // GitHub风格Markdown支持
                                                rehypePlugins={[
                                                    rehypeRaw, // 解析HTML标签
                                                    rehypeSanitize, // 净化HTML内容
                                                    [rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }] // 外部链接处理
                                                ]}
                                                components={{
                                                    // 自定义图片渲染 - 修复: 使用span而不是div
                                                    img: ({ node, ...props }) => (
                                                        <span className="block relative">
                                                            <img
                                                                {...props}
                                                                className="max-w-full h-auto rounded-md my-4 transition-all duration-300 hover:shadow-md"
                                                                loading="lazy"
                                                                alt={props.alt || ''}
                                                            />
                                                            <span className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                                        </span>
                                                    ),
                                                    // 自定义链接渲染
                                                    a: ({ node, ...props }) => (
                                                        <a
                                                            {...props}
                                                            className="text-blue-600 hover:underline transition-colors duration-200"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        />
                                                    ),
                                                    // 代码块样式
                                                    code: ({ node, className, children, ...props }) => {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return match ? (
                                                            <div className="relative mb-4">
                                                                <div className="absolute top-0 right-0 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-xs rounded-bl-md rounded-tr-md font-mono">
                                                                    {match[1]}
                                                                </div>
                                                                <pre className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto mt-2">
                                                                    <code
                                                                        className={cn("text-sm", className)}
                                                                    >
                                                                        {children}
                                                                    </code>
                                                                </pre>
                                                            </div>
                                                        ) : (
                                                            <code
                                                                className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md text-sm font-mono"
                                                            >
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    // 段落样式 - 修复: 简化段落渲染
                                                    p: ({ children }) => (
                                                        <p className="my-4 leading-relaxed">{children}</p>
                                                    ),
                                                    // 标题样式
                                                    h1: ({ node, ...props }) => (
                                                        <h1 className="text-2xl font-bold mt-6 mb-4 pb-2 border-b" {...props} />
                                                    ),
                                                    h2: ({ node, ...props }) => (
                                                        <h2 className="text-xl font-bold mt-6 mb-3 pb-1 border-b" {...props} />
                                                    ),
                                                    h3: ({ node, ...props }) => (
                                                        <h3 className="text-lg font-bold mt-5 mb-2" {...props} />
                                                    ),
                                                    // 表格样式
                                                    table: ({ node, ...props }) => (
                                                        <div className="overflow-x-auto my-4">
                                                            <table className="border-collapse w-full" {...props} />
                                                        </div>
                                                    ),
                                                    tr: ({ node, ...props }) => (
                                                        <tr className="border-t dark:border-gray-700" {...props} />
                                                    ),
                                                    th: ({ node, ...props }) => (
                                                        <th className="px-4 py-2 border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 font-semibold text-left" {...props} />
                                                    ),
                                                    td: ({ node, ...props }) => (
                                                        <td className="px-4 py-2 border dark:border-gray-700" {...props} />
                                                    ),
                                                    // 列表样式
                                                    ul: ({ node, ...props }) => (
                                                        <ul className="list-disc pl-8 my-4" {...props} />
                                                    ),
                                                    ol: ({ node, ...props }) => (
                                                        <ol className="list-decimal pl-8 my-4" {...props} />
                                                    ),
                                                    li: ({ node, ...props }) => (
                                                        <li className="my-1" {...props} />
                                                    ),
                                                    // 引用块样式
                                                    blockquote: ({ node, ...props }) => (
                                                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-1 my-4 text-gray-700 dark:text-gray-300" {...props} />
                                                    ),
                                                    // 水平线
                                                    hr: ({ node, ...props }) => (
                                                        <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />
                                                    ),
                                                }}
                                            >
                                                {repoInfo.readme}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>
                )}
            </CardContent>
            {repoInfo.fetchTime && (
                <CardFooter className="text-xs text-muted-foreground pt-0 border-t mt-2 py-3">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>
                        信息更新于: {formatDate(repoInfo.fetchTime)}
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}

// 添加骨架屏组件，用于仓库卡片加载状态
export function GithubRepoInfoSkeleton() {
    return (
        <Card className="w-full animate-pulse">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-6 w-48" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-5 w-36" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-24 rounded-md" />
                        </div>
                        <Skeleton className="h-[200px] w-full rounded-md" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-0 border-t mt-2 py-3">
                <Skeleton className="h-4 w-40" />
            </CardFooter>
        </Card>
    );
} 