import fs from "fs/promises"
import path from "path"
import { remark } from "remark"
import html from "remark-html"
import matter from "gray-matter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于本站",
  description: "了解自托管服务和工具目录的使命、特点以及如何参与贡献",
}

async function getAboutContent() {
  const filePath = path.join(process.cwd(), "content", "about.md")
  const fileContents = await fs.readFile(filePath, "utf8")
  const { content } = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(content)
  return processedContent.toString()
}

export default async function AboutPage() {
  const content = await getAboutContent()

  return (
    <div className="container py-10">
      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}
