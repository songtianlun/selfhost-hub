import { NextRequest, NextResponse } from 'next/server';
import { getGithubRepoInfo, GithubRepoInfo, isGithubRepoUrl } from '@/lib/github-api';
import path from 'path';
import fs from 'fs/promises';

// 缓存配置
const CACHE_EXPIRATION_MS = 6 * 60 * 60 * 1000; // 6 小时
const GITHUB_INFO_CACHE_FILE = path.join(process.cwd(), '.next', 'cache', 'github-info.json');

// 内存缓存
const memoryCache = new Map<string, { info: GithubRepoInfo; timestamp: number }>();

/**
 * 从文件加载缓存
 */
async function loadCacheFromFile(): Promise<Map<string, { info: GithubRepoInfo; timestamp: number }>> {
  try {
    const data = await fs.readFile(GITHUB_INFO_CACHE_FILE, 'utf8');
    const cacheArray: Array<{ repo: string; info: GithubRepoInfo; timestamp?: number }> = JSON.parse(data);

    const cacheMap = new Map<string, { info: GithubRepoInfo; timestamp: number }>();
    cacheArray.forEach(({ repo, info, timestamp }) => {
      cacheMap.set(repo, {
        info,
        timestamp: timestamp || Date.now() // 兼容旧缓存格式
      });
    });

    return cacheMap;
  } catch (error) {
    // 文件不存在或读取失败，返回空 Map
    return new Map();
  }
}

/**
 * 保存缓存到文件
 */
async function saveCacheToFile(cache: Map<string, { info: GithubRepoInfo; timestamp: number }>): Promise<void> {
  try {
    const cacheDir = path.dirname(GITHUB_INFO_CACHE_FILE);
    await fs.mkdir(cacheDir, { recursive: true });

    const cacheArray = Array.from(cache.entries()).map(([repo, { info, timestamp }]) => ({
      repo,
      info,
      timestamp
    }));

    await fs.writeFile(GITHUB_INFO_CACHE_FILE, JSON.stringify(cacheArray, null, 2), 'utf8');
  } catch (error) {
    console.error('保存 GitHub 信息缓存失败:', error);
  }
}

/**
 * 检查缓存是否过期
 */
function isCacheExpired(timestamp: number): boolean {
  return Date.now() - timestamp > CACHE_EXPIRATION_MS;
}

/**
 * 获取 GitHub 信息（带缓存）
 */
async function getGithubInfoWithCache(repo: string): Promise<GithubRepoInfo> {
  // 1. 检查内存缓存
  const memoryCached = memoryCache.get(repo);
  if (memoryCached && !isCacheExpired(memoryCached.timestamp)) {
    console.log(`✅ 命中内存缓存: ${repo}`);
    return memoryCached.info;
  }

  // 2. 检查文件缓存
  if (memoryCache.size === 0) {
    const fileCache = await loadCacheFromFile();
    fileCache.forEach((value, key) => {
      memoryCache.set(key, value);
    });
  }

  const fileCached = memoryCache.get(repo);
  if (fileCached && !isCacheExpired(fileCached.timestamp)) {
    console.log(`✅ 命中文件缓存: ${repo}`);
    return fileCached.info;
  }

  // 3. 缓存未命中或已过期，调用 GitHub API
  console.log(`🔄 获取最新数据: ${repo}`);
  const info = await getGithubRepoInfo(repo);

  // 4. 更新缓存
  const cacheEntry = { info, timestamp: Date.now() };
  memoryCache.set(repo, cacheEntry);

  // 5. 异步保存到文件（不阻塞响应）
  saveCacheToFile(memoryCache).catch(err => {
    console.error('异步保存缓存失败:', err);
  });

  return info;
}

/**
 * GET /api/github-info?repo=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const repo = searchParams.get('repo');

    // 验证参数
    if (!repo) {
      return NextResponse.json(
        { error: '缺少 repo 参数' },
        { status: 400 }
      );
    }

    if (!isGithubRepoUrl(repo)) {
      return NextResponse.json(
        { error: '无效的 GitHub 仓库 URL' },
        { status: 400 }
      );
    }

    // 获取 GitHub 信息（带缓存）
    const info = await getGithubInfoWithCache(repo);

    // 返回数据，设置缓存头
    return NextResponse.json(info, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('获取 GitHub 信息失败:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '获取 GitHub 信息失败',
      },
      { status: 500 }
    );
  }
}
