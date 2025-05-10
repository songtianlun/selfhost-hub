import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
// 执行脚本
// npx tsx scripts/add-update-times.ts

// 生成最近三天内的随机时间
function getRandomTimeInLastThreeDays(): string {
  const now = new Date()
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
  const randomTime = new Date(threeDaysAgo.getTime() + Math.random() * (now.getTime() - threeDaysAgo.getTime()))
  return randomTime.toISOString()
}

async function addUpdateTimes() {
  const servicesDir = path.join(process.cwd(), 'content', 'services')
  const files = await fs.readdir(servicesDir)

  for (const file of files) {
    if (!file.endsWith('.md')) continue

    const filePath = path.join(servicesDir, file)
    const content = await fs.readFile(filePath, 'utf8')
    const { data, content: markdownContent } = matter(content)

    // 如果已经有 updatedAt，跳过
    if (data.updatedAt) continue

    // 添加更新时间
    const newContent = matter.stringify(markdownContent, {
      ...data,
      updatedAt: getRandomTimeInLastThreeDays()
    })

    await fs.writeFile(filePath, newContent)
    console.log(`Added update time to ${file}`)
  }
}

addUpdateTimes().catch(console.error) 