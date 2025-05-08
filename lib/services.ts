import fs from "fs/promises"
import path from "path"
import yaml from "js-yaml"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"

export type Service = {
  id: string
  slug: string
  name: string
  description: string
  image?: string
  tags: string[]
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
  "media-type": { zh: "媒体类型", en: "Media Type" }
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
  "数据库": "technology",
  "物联网": "technology",

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

  "IoT": "technology"
};

// Load services from Markdown files
async function loadServicesFromMarkdown(language: "zh" | "en"): Promise<Service[]> {
  try {
    const contentDir = language === "zh" ? "services" : "services-en";
    const servicesDirectory = path.join(process.cwd(), "content", contentDir);
    const fileNames = await fs.readdir(servicesDirectory);

    const services = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(servicesDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Process content with remark to convert markdown into HTML string
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        // Extract slug from filename
        const slug = fileName.replace(/\.md$/, "");

        return {
          ...data,
          slug,
          content: contentHtml,
        } as Service;
      })
    );

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
    service.tags.forEach(tag => {
      const count = tagCounts.get(tag) || 0;
      tagCounts.set(tag, count + 1);
    });
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
      const groupId = tagToGroupMap[tag] || "purpose"; // 默认放到 purpose 组
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
  try {
    // 尝试从自定义 YAML 文件加载标签组
    const filePath = path.join(process.cwd(), "data", `tag-groups-${language}.yaml`);
    const fileExists = await fs.stat(filePath).then(() => true).catch(() => false);

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
      const filteredTagGroups = content.tagGroups.map(group => ({
        ...group,
        tags: group.tags.filter(tag => usedTags.has(tag))
      })).filter(group => group.tags.length > 0); // 只保留非空标签组

      return filteredTagGroups;
    } else {
      // 如果文件不存在，从 Markdown 服务数据生成标签组
      const services = await loadServicesFromMarkdown(language);
      return generateTagGroupsFromServices(services, language);
    }
  } catch (error) {
    console.error(`Error loading tag groups for ${language}:`, error);
    // 出错时返回一个空数组
    return [];
  }
}

// Get all services
export async function getAllServices(language: "zh" | "en", filterTags: string[] = []): Promise<Service[]> {
  // Load services from Markdown files
  const services = await loadServicesFromMarkdown(language);

  // If no filter tags, return all services
  if (!filterTags.length) {
    return services;
  }

  // Filter services that have ALL the selected tags
  return services.filter((service) =>
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
