// GitHub API 工具类 - 用于获取仓库信息

// 定义GitHub仓库信息的类型
export interface GithubRepoInfo {
    stars: number;
    lastUpdated: string;
    latestVersion?: string;
    readme?: string;
    isLoading: boolean;
    error?: string;
    fetchTime?: string; // 更改为字符串类型，便于序列化
}

// 检查URL是否为GitHub仓库链接
export function isGithubRepoUrl(url: string | undefined): boolean {
    if (!url) return false;

    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname === 'github.com' &&
            parsedUrl.pathname.split('/').filter(Boolean).length >= 2;
    } catch {
        return false;
    }
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

// 获取带有 GitHub token 的请求头
function getAuthHeaders(): HeadersInit {
    const token = process.env.GH_TOKEN;
    if (token) {
        return {
            'Authorization': `token ${token}`
        };
    }
    return {};
}

// 获取仓库基本信息
export async function fetchRepoInfo(owner: string, repo: string): Promise<{
    stars: number;
    lastUpdated: string;
}> {
    const headers = getAuthHeaders();
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers,
        // 添加缓存选项 - 默认缓存60秒
        next: { revalidate: 60 }
    });

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
        const headers = getAuthHeaders();
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
            headers,
            next: { revalidate: 60 }
        });

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
        const headers = getAuthHeaders();
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers,
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        // 内容是Base64编码的
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return content;
    } catch (e) {
        console.error("Error fetching readme:", e);
        return undefined;
    }
}

// 完整的获取GitHub仓库信息的函数 - 供服务端组件调用
export async function getGithubRepoInfo(repoUrl: string): Promise<GithubRepoInfo> {
    try {
        const repoData = extractRepoInfoFromUrl(repoUrl);
        if (!repoData) {
            return {
                stars: 0,
                lastUpdated: '',
                isLoading: false,
                error: '无效的GitHub仓库链接',
                fetchTime: new Date().toISOString()
            };
        }

        const { owner, repo } = repoData;

        // 并行请求所有数据
        const [basicInfo, latestVersion, readme] = await Promise.all([
            fetchRepoInfo(owner, repo),
            fetchLatestVersion(owner, repo),
            fetchReadme(owner, repo)
        ]);

        return {
            ...basicInfo,
            latestVersion,
            readme,
            isLoading: false,
            fetchTime: new Date().toISOString()
        };
    } catch (error) {
        return {
            stars: 0,
            lastUpdated: '',
            isLoading: false,
            error: `无法加载仓库信息: ${error instanceof Error ? error.message : '未知错误'}`,
            fetchTime: new Date().toISOString()
        };
    }
} 