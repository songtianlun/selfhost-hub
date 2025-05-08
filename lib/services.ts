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
  services: Service[]
  tagGroups: TagGroup[]
}

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

// Load YAML content
async function loadYamlContent(language: "zh" | "en"): Promise<YamlContent> {
  try {
    const filePath = path.join(process.cwd(), "data", `services-${language}.yaml`)
    const fileContents = await fs.readFile(filePath, "utf8")
    return yaml.load(fileContents) as YamlContent
  } catch (error) {
    console.error(`Error loading YAML content for ${language}:`, error)
    return { services: [], tagGroups: [] }
  }
}

// Get all services
export async function getAllServices(language: "zh" | "en", filterTags: string[] = []): Promise<Service[]> {
  // Load services from Markdown files instead of YAML
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
  const content = await loadYamlContent(language)
  return content.tagGroups
}

// Get service by slug
export async function getServiceBySlug(slug: string, language: "zh" | "en"): Promise<Service | null> {
  const services = await getAllServices(language)
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return null
  }

  return service
}

// Get all service slugs
export async function getAllServiceSlugs(language: "zh" | "en"): Promise<string[]> {
  const services = await getAllServices(language)
  return services.map((service) => service.slug)
}
