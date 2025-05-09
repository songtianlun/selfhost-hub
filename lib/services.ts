import fs from "fs/promises"
import path from "path"
import yaml from "js-yaml"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"

// 缓存机制
const cache = {
  services: {
    zh: null as Service[] | null,
    en: null as Service[] | null,
  },
  tagGroups: {
    zh: null as TagGroup[] | null,
    en: null as TagGroup[] | null,
  },
  categories: {
    zh: null as string[] | null,
    en: null as string[] | null,
  },
};

export type Service = {
  id: string
  slug: string
  name: string
  description: string
  image?: string
  tags: string[]
  category: string
  website?: string
  github?: string
  content?: string
}

export type TagGroup = {
  id: string
  name: string
  tags: string[]
}

export type YamlContent = {
  tagGroups: TagGroup[]
}

// 默认标签组定义
const defaultTagGroups: Record<string, { zh: string; en: string }> = {
  "purpose": { zh: "用途", en: "Purpose" },
  "technology": { zh: "技术", en: "Technology" },
  "media-type": { zh: "媒体类型", en: "Media Type" },
  "license": { zh: "许可证", en: "License" },
  "others": { zh: "其他", en: "Others" }
};

// 特定标签的组映射
const tagToGroupMap: Record<string, string> = {
  // 中文标签
  "存储": "purpose",
  "媒体": "purpose",
  "流媒体": "purpose",
  "协作": "purpose",
  "生产力": "purpose",
  "智能家居": "purpose",
  "自动化": "purpose",
  "监控": "purpose",
  "安全": "purpose",

  "视频": "media-type",
  "音乐": "media-type",
  "照片": "media-type",
  "文件共享": "media-type",
  "文档": "media-type",

  "Docker": "technology",
  "Kubernetes": "technology",
  "Python": "technology",
  "JavaScript": "technology",
  "PHP": "technology",
  "Go": "technology",
  "C#": "technology",
  "数据库": "technology",
  "物联网": "technology",
  "deb": "technology",

  // 英文标签
  "Storage": "purpose",
  "Media": "purpose",
  "Streaming": "purpose",
  "Collaboration": "purpose",
  "Productivity": "purpose",
  "Smart Home": "purpose",
  "Automation": "purpose",
  "Monitoring": "purpose",
  "Security": "purpose",

  "Video": "media-type",
  "Music": "media-type",
  "Photos": "media-type",
  "File Sharing": "media-type",
  "Documents": "media-type",

  // 许可证
  "AGPL-3.0": "license",
  "GPL-2.0": "license",
  "Apache-2.0": "license",
  "MIT": "license",

  "IoT": "technology"
};

// Load services from Markdown files
async function loadServicesFromMarkdown(language: "zh" | "en"): Promise<Service[]> {
  // 检查缓存
  if (cache.services[language]) {
    return cache.services[language]!;
  }

  try {
    const contentDir = language === "zh" ? "services" : "services-en";
    const servicesDirectory = path.join(process.cwd(), "content", contentDir);
    const fileNames = await fs.readdir(servicesDirectory);

    const services: Service[] = [];

    // 使用 for 循环而不是 Promise.all，这样可以在单个文件解析失败时继续处理其他文件
    for (const fileName of fileNames) {
      try {
        const fullPath = path.join(servicesDirectory, fileName);

        // 检查是否为文件，跳过目录
        const stat = await fs.stat(fullPath);
        if (!stat.isFile()) {
          console.log(`Skipping directory: ${fileName}`);
          continue;
        }

        const fileContents = await fs.readFile(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // 确保必要的字段存在
        if (!data.id || !data.name || !data.description || !data.tags || !data.category) {
          console.warn(`Skipping ${fileName} due to missing required fields`);
          console.warn(`ID: [${data.id}] Name: [${data.name}] Description: [${data.description}] Tags: [${data.tags}] Category: [${data.category}]`);
          continue;
        }

        // 确保标签是数组
        if (!Array.isArray(data.tags)) {
          console.warn(`Skipping ${fileName} because tags is not an array`);
          continue;
        }

        // Process content with remark to convert markdown into HTML string
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        // Extract slug from filename
        const slug = fileName.replace(/\.md$/, "");

        services.push({
          ...data,
          slug,
          content: contentHtml,
        } as Service);
      } catch (error) {
        // 记录错误但继续处理其他文件
        console.error(`Error processing [${fileName}]: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // 保存到缓存
    cache.services[language] = services;
    return services;
  } catch (error) {
    console.error(`Error loading services from Markdown for ${language}:`, error);
    return [];
  }
}

// 从服务中生成标签组
function generateTagGroupsFromServices(services: Service[], language: "zh" | "en"): TagGroup[] {
  // 收集所有唯一标签并统计每个标签的使用次数
  const tagCounts = new Map<string, number>();
  services.forEach(service => {
    // 确保 tags 是一个数组
    if (Array.isArray(service.tags)) {
      service.tags.forEach(tag => {
        const count = tagCounts.get(tag) || 0;
        tagCounts.set(tag, count + 1);
      });
    }
  });

  // 按组分类标签
  const groupedTags: Record<string, string[]> = {};

  // 初始化默认组
  Object.keys(defaultTagGroups).forEach(groupId => {
    groupedTags[groupId] = [];
  });

  // 将标签分配到相应的组（只包含至少被一个服务使用的标签）
  tagCounts.forEach((count, tag) => {
    if (count > 0) { // 只有使用次数大于 0 的标签才会被包含
      // 如果标签没有在映射中定义，放入"others"组
      const groupId = tagToGroupMap[tag] || "others";
      if (!groupedTags[groupId]) {
        groupedTags[groupId] = [];
      }
      groupedTags[groupId].push(tag);
    }
  });

  // 创建最终的标签组数组，仅包含非空标签组
  return Object.entries(groupedTags)
    .filter(([_, tags]) => tags.length > 0) // 过滤掉没有标签的组
    .map(([groupId, tags]) => ({
      id: groupId,
      name: defaultTagGroups[groupId]?.[language] || (language === "zh" ? "其他" : "Others"),
      tags: tags.sort() // 按字母排序标签
    }));
}

// 加载标签组
async function loadTagGroups(language: "zh" | "en"): Promise<TagGroup[]> {
  // 检查缓存
  if (cache.tagGroups[language]) {
    return cache.tagGroups[language]!;
  }

  try {
    // 尝试从自定义 YAML 文件加载标签组
    const filePath = path.join(process.cwd(), "data", `tag-groups-${language}.yaml`);
    const fileExists = await fs.stat(filePath).then(() => true).catch(() => false);

    let tagGroups;
    if (fileExists) {
      const fileContents = await fs.readFile(filePath, "utf8");
      const content = yaml.load(fileContents) as YamlContent;
      const services = await loadServicesFromMarkdown(language);

      // 收集实际使用的标签
      const usedTags = new Set<string>();
      services.forEach(service => {
        service.tags.forEach(tag => usedTags.add(tag));
      });

      // 过滤标签组，只保留实际使用的标签
      tagGroups = content.tagGroups.map(group => ({
        ...group,
        tags: group.tags.filter(tag => usedTags.has(tag))
      })).filter(group => group.tags.length > 0); // 只保留非空标签组
    } else {
      // 如果文件不存在，从 Markdown 服务数据生成标签组
      const services = await loadServicesFromMarkdown(language);
      tagGroups = generateTagGroupsFromServices(services, language);
    }

    // 保存到缓存
    cache.tagGroups[language] = tagGroups;
    return tagGroups;
  } catch (error) {
    console.error(`Error loading tag groups for ${language}:`, error);
    // 出错时返回一个空数组
    return [];
  }
}

// Get all categories
export async function getAllCategories(language: "zh" | "en"): Promise<string[]> {
  // 检查缓存
  if (cache.categories[language]) {
    return cache.categories[language]!;
  }

  const services = await loadServicesFromMarkdown(language);

  // 收集所有唯一的分类
  const categoriesSet = new Set<string>();
  services.forEach(service => {
    if (service.category) {
      categoriesSet.add(service.category);
    }
  });

  // 将 Set 转换为数组并排序
  const categories = Array.from(categoriesSet).sort();

  // 保存到缓存
  cache.categories[language] = categories;
  return categories;
}

// Get all services
export async function getAllServices(
  language: "zh" | "en",
  filterTags: string[] = [],
  filterCategory?: string
): Promise<Service[]> {
  // Load services from Markdown files
  const services = await loadServicesFromMarkdown(language);

  // 首先根据分类过滤服务
  let filteredServices = filterCategory
    ? services.filter(service => service.category === filterCategory)
    : services;

  // 如果没有标签过滤，则返回按分类过滤后的服务
  if (!filterTags.length) {
    return filteredServices;
  }

  // 继续根据标签过滤服务
  return filteredServices.filter((service) =>
    filterTags.every((tag) => service.tags.includes(tag))
  );
}

// Get all tags
export async function getTags(language: "zh" | "en"): Promise<TagGroup[]> {
  return loadTagGroups(language);
}

// Get service by slug
export async function getServiceBySlug(slug: string, language: "zh" | "en"): Promise<Service | null> {
  const services = await getAllServices(language);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return null;
  }

  return service;
}

// Get all service slugs
export async function getAllServiceSlugs(language: "zh" | "en"): Promise<string[]> {
  const services = await getAllServices(language);
  return services.map((service) => service.slug);
}

// 预加载所有数据，可以在应用启动时调用
export async function preloadAllData(): Promise<void> {
  // 并行预加载中英文数据
  await Promise.all([
    loadServicesFromMarkdown("zh"),
    loadServicesFromMarkdown("en"),
    getTags("zh"),
    getTags("en"),
    getAllCategories("zh"),
    getAllCategories("en")
  ]);
}
