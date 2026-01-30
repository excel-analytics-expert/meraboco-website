"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

interface BreadcrumbProps {
  customTitle?: string
}

export function PageBreadcrumb({ customTitle }: BreadcrumbProps) {
  const pathname = usePathname()
  const { language, translations } = useLanguage()

  // パスを分解してパンくずを生成
  const paths = pathname.split("/").filter(Boolean)

  const labelMap = translations[language].breadcrumbs || {}

  return (
    <nav className="bg-gray-50 py-4 border-b animate-fade-in">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              {translations[language].header.home}
            </Link>
          </li>
          {paths.map((path, index) => {
            const href = "/" + paths.slice(0, index + 1).join("/")
            const isLast = index === paths.length - 1
            const label = customTitle || labelMap[path] || path

            return (
              <li key={href} className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                {isLast ? (
                  <span className="text-foreground font-medium">{label}</span>
                ) : (
                  <Link href={href} className="hover:text-primary transition-colors duration-200">
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
