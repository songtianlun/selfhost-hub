// GitHub API 工具类 - 用于获取仓库信息

// 设置常量
const MAX_RETRY_COUNT = 3; // 最大重试次数
const RETRY_DELAY_MS = 1000; // 重试延迟，单位毫秒

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

// 通用的重试函数
async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = MAX_RETRY_COUNT,
    delayMs: number = RETRY_DELAY_MS
): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            // console.error(`尝试 ${attempt}/${maxRetries} 失败:`, error instanceof Error ? error.message : error);

            // 最后一次尝试失败直接抛出错误
            if (attempt === maxRetries) {
                throw lastError;
            }

            // 延迟一段时间后重试
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }

    throw lastError; // 理论上不会到达这里，但为了类型安全
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
        // 只打印 token 的前缀和后缀，隐藏中间部分
        const maskedToken = token.length > 8
            ? `${token.substring(0, 8)}...${token.substring(token.length - 4)}`
            : '***';
        console.log(`🔑 使用 GitHub Token: ${maskedToken}`);
        return {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        };
    }
    console.warn(`⚠️  GitHub API 未配置 Token！这将导致 API 限流和 401 错误`);
    console.warn(`   请设置环境变量: GH_TOKEN=your_github_token`);
    return {};
}

// 设置缓存时间常量 - 6小时
const CACHE_REVALIDATION_TIME = 6 * 60 * 60; // 秒

// 以下是保留的旧方法，可能在某些场景下单独使用

// 获取仓库基本信息
export async function fetchRepoInfo(owner: string, repo: string): Promise<{
    stars: number;
    lastUpdated: string;
}> {
    const headers = getAuthHeaders();

    return withRetry(async () => {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers,
            // 增加缓存时间到6小时
            next: { revalidate: CACHE_REVALIDATION_TIME }
        });

        if (!response.ok) {
            throw new Error(`GitHub API with [${owner}/${repo}] error: ${response.status}`);
        }

        const data = await response.json();
        return {
            stars: data.stargazers_count,
            lastUpdated: data.updated_at,
        };
    }).catch(error => {
        console.error("Error fetching repo info after all retries:", error);
        // 所有重试都失败时返回默认值
        return {
            stars: 0,
            lastUpdated: '',
        };
    });
}

// 获取最新版本号
export async function fetchLatestVersion(owner: string, repo: string): Promise<string | undefined> {
    const headers = getAuthHeaders();

    return withRetry(async () => {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
            headers,
            next: { revalidate: CACHE_REVALIDATION_TIME }
        });

        if (!response.ok) {
            // 如果没有发布版本，不报错，只返回undefined
            if (response.status === 404) {
                return undefined;
            }
            throw new Error(`GitHub API with [${owner}/${repo}] error: ${response.status}`);
        }

        const data = await response.json();
        return data.tag_name;
    }).catch(e => {
        // 出错时返回undefined，不阻止其他信息的获取
        console.error("Error fetching latest release after all retries:", e);
        return undefined;
    });
}

// 获取README内容
export async function fetchReadme(owner: string, repo: string): Promise<string | undefined> {
    const headers = getAuthHeaders();

    return withRetry(async () => {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers,
            next: { revalidate: CACHE_REVALIDATION_TIME }
        });

        if (!response.ok) {
            throw new Error(`GitHub API with [${owner}/${repo}] error: ${response.status}`);
        }

        const data = await response.json();
        // 内容是Base64编码的
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return content;
    }).catch(e => {
        console.error("Error fetching readme after all retries:", e);
        return undefined;
    });
}

// 新增：使用REST API一次性获取所有仓库信息
async function fetchAllRepoData(owner: string, repo: string): Promise<{
    stars: number;
    lastUpdated: string;
    latestVersion?: string;
    readme?: string;
    error?: string;
}> {
    return withRetry(async () => {
        const headers = getAuthHeaders();

        // 并行执行所有请求
        const [repoResponse, releaseResponse, readmeResponse] = await Promise.all([
            fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                headers,
                next: { revalidate: CACHE_REVALIDATION_TIME }
            }),
            fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
                headers,
                next: { revalidate: CACHE_REVALIDATION_TIME }
            }),
            fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
                headers,
                next: { revalidate: CACHE_REVALIDATION_TIME }
            })
        ]);

        // 处理基本信息响应
        if (!repoResponse.ok) {
            let errorDetail = '';
            try {
                const errorData = await repoResponse.json();
                errorDetail = errorData.message || errorData.error || '';
            } catch {
                // 无法解析错误响应
            }
            const errorMsg = errorDetail
                ? `获取仓库 [${owner}/${repo}] 的基本信息失败: HTTP ${repoResponse.status} - ${repoResponse.statusText} (${errorDetail})`
                : `获取仓库 [${owner}/${repo}] 的基本信息失败: HTTP ${repoResponse.status} - ${repoResponse.statusText}`;
            console.error(`❌ ${errorMsg}`);
            throw new Error(errorMsg);
        }
        const repoData = await repoResponse.json();

        // 处理最新版本响应 (如果404则视为没有最新版本，不是错误)
        let latestVersion = undefined;
        if (releaseResponse.ok) {
            const releaseData = await releaseResponse.json();
            latestVersion = releaseData.tag_name;
        } else if (releaseResponse.status !== 404) {
            // console.warn(`获取仓库 [${owner}/${repo}] 的最新版本失败: HTTP ${releaseResponse.status} - ${releaseResponse.statusText}`);
        }

        // 处理README响应
        let readme = undefined;
        if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
        } else {
            // console.warn(`获取仓库 [${owner}/${repo}] 的README失败: HTTP ${readmeResponse.status} - ${readmeResponse.statusText}`);
        }

        return {
            stars: repoData.stargazers_count,
            lastUpdated: repoData.updated_at,
            latestVersion,
            readme
        };
    }).catch(error => {
        // console.error(`获取仓库 [${owner}/${repo}] 信息失败:`, error);
        // 出错时返回最小信息集
        return {
            stars: 0,
            lastUpdated: '',
            error: `获取仓库 [${owner}/${repo}] 信息失败: ${error instanceof Error ? error.message : String(error)}`
        };
    });
}

// 完整的获取GitHub仓库信息的函数 - 供服务端组件调用
export async function getGithubRepoInfo(repoUrl: string): Promise<GithubRepoInfo> {
    try {
        // console.log(`开始获取仓库信息: ${repoUrl}`);
        const repoData = extractRepoInfoFromUrl(repoUrl);
        if (!repoData) {
            return {
                stars: 0,
                lastUpdated: '',
                isLoading: false,
                error: `无效的GitHub仓库链接: ${repoUrl}`,
                fetchTime: new Date().toISOString()
            };
        }

        const { owner, repo } = repoData;
        // console.log(`解析仓库路径: owner=${owner}, repo=${repo}`);

        // 设置超时
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error(`获取仓库 [${owner}/${repo}] 信息请求超时（10秒）`)), 10000); // 10秒超时
        });

        // 使用新的一次性API调用方法
        // console.log(`开始获取仓库信息...`);
        const repoInfoPromise = fetchAllRepoData(owner, repo);

        const result = await Promise.race([repoInfoPromise, timeoutPromise]);
        // console.log(`请求已完成，开始处理结果`);

        // 打印获取结果摘要
        // console.log(`仓库 [${owner}/${repo}] 信息获取摘要: 
        //   stars: ${result.stars}
        //   lastUpdated: ${result.lastUpdated ? '有' : '无'}
        //   latestVersion: ${result.latestVersion ? '有' : '无'}
        //   readme: ${result.readme ? '有 (' + result.readme.substring(0, 50).replace(/\n/g, ' ') + '...)' : '无'}`);

        // 检查是否有错误信息
        if ('error' in result) {
            return {
                ...result,
                isLoading: false,
                fetchTime: new Date().toISOString()
            };
        }

        return {
            ...result,
            isLoading: false,
            fetchTime: new Date().toISOString()
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        // console.error(`获取仓库信息出现异常:`, error);
        return {
            stars: 0,
            lastUpdated: '',
            isLoading: false,
            error: errorMessage,
            fetchTime: new Date().toISOString()
        };
    }
} 