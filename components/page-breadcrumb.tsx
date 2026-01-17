"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface BreadcrumbProps {
  customTitle?: string
}

export function PageBreadcrumb({ customTitle }: BreadcrumbProps) {
  const pathname = usePathname()

  // パスを分解してパンくずを生成
  const paths = pathname.split("/").filter(Boolean)

  // 日本語のラベルマッピング
  const labelMap: Record<string, string> = {
    company: "会社概要",
    services: "サービス",
    works: "制作実績",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    "web-production": "WEB制作",
    "system-development": "システム開発",
    "ux-ui-design": "UX/UIデザイン",
    "digital-marketing": "デジタルマーケティング",
    consulting: "ITコンサルティング",
    maintenance: "保守・運用",
  }

  return (
    <nav className="bg-gray-50 py-4 border-b animate-fade-in">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              ホーム
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
