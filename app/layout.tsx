import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import { preloadAllData } from "@/lib/services"
import Script from "next/script"
import PageTransition from "@/components/page-transition"
import AdSenseScript from "@/components/adsense-script"

// 预加载所有语言数据
preloadAllData()
  .then(() => console.log("预加载数据完成"))
  .catch(error => console.error("预加载数据失败:", error));

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | SelfHost Hub",
    default: "SelfHost Hub - 自托管服务和工具目录",
  },
  description: "收集各种可自托管的服务、工具等内容，按标签分类并提供筛选功能",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "SelfHost Hub - 自托管服务和工具目录",
    description: "收集各种可自托管的服务、工具等内容，按标签分类并提供筛选功能",
    url: "https://selfhost-hub.com",
    siteName: "SelfHost Hub",
    locale: "zh_CN",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 不蒜子计数器 */}
        <Script defer src="https://busuanzi.frytea.com/js" strategy="afterInteractive" />

        {/* Umami Analytics */}
        <Script
          defer
          data-website-id="655742d4-4bc2-4e52-aea0-71a8a4c2a1c0"
          src="https://umami.frytea.com/script.js"
          strategy="afterInteractive"
        />

        {/* Plausible Analytics */}
        <Script
          defer
          data-domain="selfhost-hub.com"
          src="https://plausible.frytea.com/js/script.js"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CBY95S9GJ1" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CBY95S9GJ1');
          `}
        </Script>

        {/* Google AdSense - 使用客户端组件动态加载 */}
        <AdSenseScript />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <PageTransition>
                <main className="flex-1">{children}</main>
              </PageTransition>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
