'use client';

import { GithubRepoInfoCard } from '@/components/github-repo-info';

export function GithubRepoInfoClient({ repoUrl }: { repoUrl: string }) {
    return <GithubRepoInfoCard repoUrl={repoUrl} />;
} 