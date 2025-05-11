import fs from 'fs/promises'
import path from 'path'
import { getAllServices } from '../lib/services.js'

const INDEXNOW_API_URL = 'https://www.bing.com/indexnow'
const BASE_URL = 'https://selfhost-hub.com'

async function findIndexNowKey(): Promise<string> {
  const publicDir = path.join(process.cwd(), 'public')
  const files = await fs.readdir(publicDir)
  
  // 查找长度为 32 的 .txt 文件
  const keyFile = files.find(file => 
    file.endsWith('.txt') && 
    file.replace('.txt', '').length === 32
  )
  
  if (!keyFile) {
    throw new Error('IndexNow key file not found in public directory')
  }
  
  return keyFile.replace('.txt', '')
}

async function getUrlsToSubmit(onlyRecent: boolean = false): Promise<string[]> {
  const zhServices = await getAllServices('zh')
  const enServices = await getAllServices('en')
  
  const allServices = [...zhServices, ...enServices]
  const urls = new Set<string>()
  
  // 添加静态页面
  urls.add(BASE_URL)
  urls.add(`${BASE_URL}/en`)
  urls.add(`${BASE_URL}/tags`)
  urls.add(`${BASE_URL}/en/tags`)
  urls.add(`${BASE_URL}/about`)
  urls.add(`${BASE_URL}/en/about`)
  
  // 添加服务页面
  allServices.forEach(service => {
    const isEnglish = enServices.some(s => s.id === service.id)
    const prefix = isEnglish ? '/en' : ''
    urls.add(`${BASE_URL}${prefix}/${service.slug}`)
  })
  
  if (onlyRecent) {
    const oneDayAgo = new Date()
    oneDayAgo.setDate(oneDayAgo.getDate() - 1)
    
    return Array.from(urls).filter(url => {
      const service = allServices.find(s => 
        url.endsWith(s.slug) || 
        (url.endsWith(`/en/${s.slug}`))
      )
      if (!service) return true // 保留静态页面
      
      const updatedAt = service.updatedAt ? new Date(service.updatedAt) : null
      return updatedAt && updatedAt >= oneDayAgo
    })
  }
  
  return Array.from(urls)
}

async function submitToIndexNow(urls: string[], key: string) {
  const payload = {
    host: new URL(BASE_URL).host,
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList: urls
  }
  
  try {
    const response = await fetch(INDEXNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    if (!response.ok) {
      throw new Error(`IndexNow API returned ${response.status}: ${await response.text()}`)
    }
    
    console.log(`Successfully submitted ${urls.length} URLs to IndexNow`)
  } catch (error) {
    console.error('Error submitting to IndexNow:', error)
    throw error
  }
}

async function main() {
  const args = process.argv.slice(2)
  const onlyRecent = args.includes('--recent')
  
  try {
    const key = await findIndexNowKey()
    const urls = await getUrlsToSubmit(onlyRecent)
    await submitToIndexNow(urls, key)
  } catch (error) {
    console.error('Failed to submit to IndexNow:', error)
    process.exit(1)
  }
}

main() 