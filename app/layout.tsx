import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ScrollToTop } from "@/components/scroll-to-top"
import CursorFollower from "@/components/cursor-follower"
import PageTransition from "@/components/page-transition"
import NatureBackground from "@/components/nature-background"
import MatrixRainBackground from "@/components/matrix-rain-background"
import DigitalGridOverlay from "@/components/digital-grid-overlay"
import FireflyParticles from "@/components/firefly-particles"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

// Viewport設定（モバイル最適化）
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
}

// メタデータ（SEO完全対応）
export const metadata: Metadata = {
  metadataBase: new URL("https://meraboco.jp"),
  title: {
    default: "メラボコ | 東京のWebサイト制作・webサイト作成・サイト作成・システム開発",
    template: "%s | メラボコ - 東京のWebサイト制作会社",
  },
  description:
    "メラボコ（代表：栗林 加奈子）は東京のWebサイト制作・webサイト作成・サイト作成・システム開発会社。月額制Web制作とオーダーメイドで、企業サイト制作・UX/UI設計・DX支援を提供。",
  keywords: [
    "webサイト作成",
    "サイト作成",
    "Webサイト作成",
    "ホームページ作成",
    "SEO",
    "AEO",
    "AI検索最適化",
    "WEB制作",
    "WEB制作会社",
    "ホームページ制作会社",
    "システム開発",
    "WEBシステム開発",
    "UXデザイン",
    "UIデザイン",
    "東京",
    "中小企業",
    "DX支援",
    "デジタルマーケティング",
    "レスポンシブデザイン",
    "SEO対策",
    "ECサイト制作",
    "コーポレートサイト",
    "ランディングページ",
    "LP制作",
  ],
  authors: [{ name: "メラボコ", url: "https://meraboco.jp" }],
  creator: "s.kenichi",
  publisher: "メラボコ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "メラボコ | 東京のWebサイト制作・webサイト作成・サイト作成・システム開発",
    description:
      "メラボコ（代表：栗林 加奈子）は東京のWebサイト制作・webサイト作成・サイト作成・システム開発会社。月額制Web制作とオーダーメイドで、企業サイト制作・UX/UI設計・DX支援を提供。",
    type: "website",
    url: "https://meraboco.jp/",
    siteName: "メラボコ",
    locale: "ja_JP",
    alternateLocale: "en_US",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "メラボコ - 東京のWebサイト制作・システム開発会社",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "メラボコ | 東京のWebサイト制作・webサイト作成・サイト作成・システム開発",
    description:
      "メラボコ（代表：栗林 加奈子）は東京のWebサイト制作・webサイト作成・サイト作成・システム開発会社。月額制Web制作とオーダーメイドで、企業サイト制作・UX/UI設計・DX支援を提供。",
    images: ["/assets/logo.png"],
    creator: "@meraboco",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://meraboco.jp/",
    languages: {
      "ja-JP": "https://meraboco.jp/",
      "en-US": "https://meraboco.jp/?lang=en",
    },
  },
  category: "technology",
  classification: "Business",
}

// 構造化データ（JSON-LD）
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": "https://meraboco.jp/#organization",
      name: "メラボコ",
      url: "https://meraboco.jp/",
      logo: {
        "@type": "ImageObject",
        url: "https://meraboco.jp/assets/logo.png",
        width: 250,
        height: 60,
      },
      description:
        "東京のWebサイト制作・システム開発会社。スマートプラン（月額制Web制作）とオーダーメイドプランで、企業サイト制作・UX/UI設計をワンストップ提供。",
      founder: {
        "@type": "Person",
        name: "栗林 加奈子",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "東京都",
        addressCountry: "JP",
      },
      areaServed: {
        "@type": "Country",
        name: "日本",
      },
      knowsAbout: [
        "Web Design",
        "Web Development",
        "System Development",
        "UX Design",
        "UI Design",
        "Digital Marketing",
        "SEO",
        "AEO",
      ],
      foundingDate: "2024",
      slogan: "デジタルで、新しい前例をつくっていく。",
    },
    // WebSite
    {
      "@type": "WebSite",
      "@id": "https://meraboco.jp/#website",
      url: "https://meraboco.jp/",
      name: "メラボコ",
      description:
        "メラボコは東京のWebサイト制作・システム開発会社。スマートプラン（月額制Web制作）とオーダーメイドプランでDX支援を提供。",
      publisher: {
        "@id": "https://meraboco.jp/#organization",
      },
      inLanguage: ["ja", "en"],
    },
    // WebPage
    {
      "@type": "WebPage",
      "@id": "https://meraboco.jp/#webpage",
      url: "https://meraboco.jp/",
      name: "メラボコ | 東京のWebサイト制作・webサイト作成・サイト作成・システム開発",
      isPartOf: {
        "@id": "https://meraboco.jp/#website",
      },
      about: {
        "@id": "https://meraboco.jp/#organization",
      },
      description:
        "メラボコは東京のWebサイト制作・システム開発会社。スマートプラン（月額制Web制作）とオーダーメイドプランで成果につながるWeb体験を提供。",
      inLanguage: "ja",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: "https://meraboco.jp/",
          },
        ],
      },
    },
    // ProfessionalService
    {
      "@type": "ProfessionalService",
      "@id": "https://meraboco.jp/#professional-service",
      name: "メラボコ",
      image: "https://meraboco.jp/assets/logo.png",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressRegion: "東京都",
        addressCountry: "JP",
      },
      url: "https://meraboco.jp/",
      serviceType: ["Webデザイン", "システム開発"],
      areaServed: "東京都",
    },
    // Service (Subscription Model)
    {
      "@type": "Service",
      "@id": "https://meraboco.jp/#service",
      name: "メラボコ スマートプラン",
      provider: {
        "@id": "https://meraboco.jp/#organization",
      },
      description: "月額制で運用と保守を含むWebサイト・システム提供サービス",
      offers: {
        "@type": "Offer",
        name: "月額制Web制作・SaaS型提供",
        description: "定額でWebサイトの構築から保守・運用までをカバーするプラン。",
      }
    },
    // FAQ（AEO対応）
    {
      "@type": "FAQPage",
      "@id": "https://meraboco.jp/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "メラボコとはどのようなサービスですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "メラボコは東京に拠点を置くWEB制作コンサルタントです。企業サイト制作、システム開発、UX/UIデザイン、デジタルマーケティングをワンストップで提供し、中小企業のデジタル変革を支援しています。",
          },
        },
        {
          "@type": "Question",
          name: "WEBサイト制作の料金の目安はいくらですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ライトプラン、スタンダードプラン、プレミアムプラン等のプランをご用意しております。プロジェクトの規模等により変動するため、詳細はお問い合わせいただき、別途お見積もりとさせていただきます。",
          },
        },
        {
          "@type": "Question",
          name: "制作期間の目安はどのくらいかかりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "プロジェクトの規模により異なりますが、LP制作で数週間、コーポレートサイトで1〜2ヶ月、システム開発等で数ヶ月程が目安です。要件に応じて変動するため、詳細はお見積もり時にご案内いたします。",
          },
        },
        {
          "@type": "Question",
          name: "どのような企業がメラボコを利用していますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "多様な業種の企業様にご利用いただいております。特に中小企業のデジタル化支援に強みを持っています。",
          },
        },
        {
          "@type": "Question",
          name: "保守・運用サポートはありますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、Webサイト公開後の保守・運用サポートも提供しています。定期的なアップデート、システム監視などを行い、安定した運用をサポートします。",
          },
        },
      ],
    },
  ],
}

import { AuthProvider } from "@/components/auth/AuthProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Canonical & Alternate */}
        <link rel="canonical" href="https://meraboco.jp/" />
        <link rel="alternate" hrefLang="ja" href="https://meraboco.jp/" />
        <link rel="alternate" hrefLang="en" href="https://meraboco.jp/?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="https://meraboco.jp/" />

        {/* PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="メラボコ" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          media="all"
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <AuthProvider>
            {/* 背景エフェクト */}
            <NatureBackground />
            <MatrixRainBackground />
            <DigitalGridOverlay />
            <FireflyParticles />

            {/* カーソルエフェクト（デスクトップのみ） */}
            <CursorFollower />

            {/* スクロールトップボタン */}
            <ScrollToTop />

            {/* ページトランジション */}
            <PageTransition>{children}</PageTransition>

            {/* Analytics */}
            <Analytics />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
