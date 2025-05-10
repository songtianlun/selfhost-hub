"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, Menu, X, Github } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, translations, isChangingLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Checking if we're on the homepage
  const isHome = pathname === "/" || pathname === "/en"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={language === "zh" ? "/" : "/en"} className="flex items-center space-x-2">
            <Image
              src="/brand/logo.svg"
              alt="SelfHost Hub Logo"
              width={120}
              height={40}
              className="h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={language === "zh" ? "/" : "/en"}
            className={cn(
              "text-sm font-medium transition-colors",
              isHome ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {translations.home}
          </Link>
          <Link
            href={language === "zh" ? "/tags" : "/en/tags"}
            className={cn(
              "text-sm font-medium transition-colors",
              pathname.includes("/tags") ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {translations.tags}
          </Link>
          {language === "zh" && (
            <Link
              href="/changelog"
              className={cn(
                "text-sm font-medium transition-colors",
                pathname.includes("/changelog") ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              更新日志
            </Link>
          )}
          <Link
            href={language === "zh" ? "/about" : "/en/about"}
            className={cn(
              "text-sm font-medium transition-colors",
              pathname.includes("/about") ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {translations.about}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            aria-label={translations.switchLanguage}
            disabled={isChangingLanguage}
            className="relative"
          >
            {isChangingLanguage ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            ) : (
              <span className="text-sm font-medium">{language === "zh" ? "EN" : "中"}</span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={translations.toggleTheme}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button asChild variant="ghost" size="icon" aria-label="GitHub">
            <Link href="https://github.com/songtianlun/selfhost-hub" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={translations.toggleTheme}
          >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? translations.closeMenu : translations.openMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 h-[calc(100vh-4rem)] w-full overflow-auto bg-background p-6 md:hidden">
          <nav className="flex flex-col space-y-6">
            <Link
              href={language === "zh" ? "/" : "/en"}
              className="text-xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.home}
            </Link>
            <Link
              href={language === "zh" ? "/tags" : "/en/tags"}
              className="text-xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.tags}
            </Link>
            {language === "zh" && (
              <Link
                href="/changelog"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                更新日志
              </Link>
            )}
            <Link
              href={language === "zh" ? "/about" : "/en/about"}
              className="text-xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.about}
            </Link>

            <Button
              variant="outline"
              onClick={() => {
                setLanguage(language === "zh" ? "en" : "zh")
                setIsMenuOpen(false)
              }}
              className="w-full justify-start"
              disabled={isChangingLanguage}
            >
              {isChangingLanguage ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              ) : (
                <>{translations.switchLanguage}: {language === "zh" ? "English" : "中文"}</>
              )}
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link
                href="https://github.com/yourusername/selfhost-hub"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
