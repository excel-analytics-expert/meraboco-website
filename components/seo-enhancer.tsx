"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Core Web Vitals監視
export default function SEOEnhancer() {
  const pathname = usePathname()

  useEffect(() => {
    // パフォーマンス監視（Core Web Vitals）
    if (typeof window !== "undefined" && "performance" in window) {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          // 本番環境ではAnalyticsに送信
          if (process.env.NODE_ENV === "development") {
            console.log(`[Core Web Vitals] ${entry.entryType}:`, entry)
          }
        })
      })

      try {
        observer.observe({ type: "largest-contentful-paint", buffered: true })
        observer.observe({ type: "first-input", buffered: true })
        observer.observe({ type: "layout-shift", buffered: true })
      } catch (e) {
        // Safari等の非対応ブラウザ用
      }

      return () => observer.disconnect()
    }
  }, [])

  // ページ遷移時のスクロール位置リセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // プリフェッチの最適化
  useEffect(() => {
    // 重要なリソースのプリロード
    const links = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://cdnjs.cloudflare.com" },
    ]

    links.forEach(({ rel, href, crossOrigin }) => {
      const existing = document.querySelector(`link[href="${href}"]`)
      if (!existing) {
        const link = document.createElement("link")
        link.rel = rel
        link.href = href
        if (crossOrigin) link.crossOrigin = crossOrigin
        document.head.appendChild(link)
      }
    })
  }, [])

  return null
}

// 構造化データコンポーネント
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// FAQ構造化データ（AEO対応）
export function FAQStructuredData({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <StructuredData data={data} />
}

// HowTo構造化データ（AEO対応）
export function HowToStructuredData({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
  totalTime?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }

  return <StructuredData data={data} />
}

// Service構造化データ
export function ServiceStructuredData({
  name,
  description,
  provider,
  areaServed,
  priceRange,
}: {
  name: string
  description: string
  provider: string
  areaServed?: string
  priceRange?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    areaServed: areaServed || "JP",
    priceRange: priceRange || "$$",
  }

  return <StructuredData data={data} />
}

// BreadcrumbList構造化データ
export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <StructuredData data={data} />
}

// LocalBusiness構造化データ
export function LocalBusinessStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "メラボコ",
    image: "https://meraboco.jp/assets/logo.png",
    "@id": "https://meraboco.jp",
    url: "https://meraboco.jp",
    telephone: "050-1793-1290",
    email: "info@meraboco.jp",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "北青山1-3-3",
      addressLocality: "港区",
      addressRegion: "東京都",
      postalCode: "107-0061",
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.6656,
      longitude: 139.72,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "WEB制作サービス",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WEBサイト制作",
            description: "コーポレートサイト、ECサイト、ランディングページの制作",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "システム開発",
            description: "業務効率化システム、予約システム、顧客管理システムの開発",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UX/UIデザイン",
            description: "ユーザー体験を最適化するデザイン設計",
          },
        },
      ],
    },
  }

  return <StructuredData data={data} />
}
