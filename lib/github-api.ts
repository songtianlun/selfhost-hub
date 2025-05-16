// GitHub API 工具类 - 用于获取仓库信息

// 定义GitHub仓库信息的类型
export interface GithubRepoInfo {
    stars: number;
    lastUpdated: string;
    latestVersion?: string;
    readme?: string;
    isLoading: boolean;
    error?: string;
}

// 从GitHub URL提取仓库所有者和名称
export function extractRepoInfoFromUrl(url: string): { owner: string; repo: string } | null {
    try {
        // 支持以下格式的URL:
        // https://github.com/owner/repo
        // https://github.com/owner/repo/
        // https://github.com/owner/repo/tree/main
        // https://github.com/owner/repo.git

        const parsedUrl = new URL(url);
        if (parsedUrl.hostname !== 'github.com') {
            return null;
        }

        const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
        if (pathParts.length < 2) {
            return null;
        }

        const owner = pathParts[0];
        let repo = pathParts[1];

        // 移除.git后缀(如果存在)
        if (repo.endsWith('.git')) {
            repo = repo.slice(0, -4);
        }

        return { owner, repo };
    } catch {
        return null;
    }
}

// 获取仓库基本信息
export async function fetchRepoInfo(owner: string, repo: string): Promise<{
    stars: number;
    lastUpdated: string;
}> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return {
        stars: data.stargazers_count,
        lastUpdated: data.updated_at,
    };
}

// 获取最新版本号
export async function fetchLatestVersion(owner: string, repo: string): Promise<string | undefined> {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);

        if (!response.ok) {
            // 如果没有发布版本，不报错，只返回undefined
            if (response.status === 404) {
                return undefined;
            }
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        return data.tag_name;
    } catch (e) {
        // 出错时返回undefined，不阻止其他信息的获取
        console.error("Error fetching latest release:", e);
        return undefined;
    }
}

// 获取README内容
export async function fetchReadme(owner: string, repo: string): Promise<string | undefined> {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        // 内容是Base64编码的
        const content = atob(data.content);
        return content;
    } catch (e) {
        console.error("Error fetching readme:", e);
        return undefined;
    }
} 