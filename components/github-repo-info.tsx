'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { extractRepoInfoFromUrl, fetchRepoInfo, fetchLatestVersion, fetchReadme, GithubRepoInfo } from '@/lib/github-api';
import ReactMarkdown from 'react-markdown';

export function GithubRepoInfoCard({ repoUrl }: { repoUrl: string }) {
    const [repoInfo, setRepoInfo] = useState<GithubRepoInfo>({
        stars: 0,
        lastUpdated: '',
        isLoading: true,
    });

    useEffect(() => {
        async function loadRepoInfo() {
            try {
                const repoData = extractRepoInfoFromUrl(repoUrl);
                if (!repoData) {
                    setRepoInfo({
                        stars: 0,
                        lastUpdated: '',
                        isLoading: false,
                        error: '无效的GitHub仓库链接'
                    });
                    return;
                }

                const { owner, repo } = repoData;

                // 并行请求所有数据
                const [basicInfo, latestVersion, readme] = await Promise.all([
                    fetchRepoInfo(owner, repo),
                    fetchLatestVersion(owner, repo),
                    fetchReadme(owner, repo)
                ]);

                setRepoInfo({
                    ...basicInfo,
                    latestVersion,
                    readme,
                    isLoading: false
                });
            } catch (error) {
                setRepoInfo({
                    stars: 0,
                    lastUpdated: '',
                    isLoading: false,
                    error: `无法加载仓库信息: ${error instanceof Error ? error.message : '未知错误'}`
                });
            }
        }

        loadRepoInfo();
    }, [repoUrl]);

    // 格式化日期
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    GitHub 仓库信息
                </CardTitle>
            </CardHeader>
            <CardContent>
                {repoInfo.isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-[200px] w-full" />
                    </div>
                ) : repoInfo.error ? (
                    <div className="text-destructive">{repoInfo.error}</div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                {repoInfo.stars.toLocaleString()} 星标
                            </Badge>

                            <div className="text-sm text-muted-foreground">
                                最近更新: {formatDate(repoInfo.lastUpdated)}
                            </div>

                            {repoInfo.latestVersion && (
                                <Badge variant="outline">
                                    最新版本: {repoInfo.latestVersion}
                                </Badge>
                            )}
                        </div>

                        {repoInfo.readme && (
                            <Tabs defaultValue="readme" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="readme">README</TabsTrigger>
                                </TabsList>
                                <TabsContent value="readme" className="mt-4">
                                    <div className="max-h-[500px] overflow-y-auto border rounded-md p-4 prose dark:prose-invert prose-sm">
                                        <ReactMarkdown>{repoInfo.readme}</ReactMarkdown>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 