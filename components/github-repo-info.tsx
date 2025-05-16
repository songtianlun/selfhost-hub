'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GithubRepoInfo } from '@/lib/github-api';
import ReactMarkdown from 'react-markdown';

// 组件直接接收服务端获取的数据
export function GithubRepoInfoCard({ repoInfo }: { repoInfo: GithubRepoInfo }) {
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
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    GitHub 仓库信息
                </CardTitle>
            </CardHeader>
            <CardContent>
                {repoInfo.error ? (
                    <div className="text-destructive">{repoInfo.error}</div>
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
                                    <TabsTrigger value="readme" className="text-base">README</TabsTrigger>
                                </TabsList>
                                <TabsContent value="readme" className="mt-4">
                                    <div className="max-h-[600px] overflow-y-auto border rounded-md p-6 prose prose-sm md:prose-base dark:prose-invert w-full max-w-none">
                                        <ReactMarkdown>{repoInfo.readme}</ReactMarkdown>
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