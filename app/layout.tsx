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
    default: "メラボコ | 東京のWEB制作・システム開発・UXデザイン会社",
    template: "%s | メラボコ - 東京のWEB制作会社",
  },
  description:
    "メラボコ（代表：栗林 加奈子）は東京・港区北青山のWEB制作・システム開発会社。スマートプラン（月額制Web制作）とオーダーメイドプランで、企業サイト制作・UX/UI設計・DX支援をワンストップ提供します。",
  keywords: [
    "WEB制作",
    "WEB制作会社",
    "ホームページ制作",
    "ホームページ制作会社",
    "システム開発",
    "WEBシステム開発",
    "UXデザイン",
    "UIデザイン",
    "東京",
    "港区",
    "北青山",
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
    title: "メラボコ | 東京のWEB制作・システム開発・UXデザイン会社",
    description:
      "最新のWEB技術とデザインで、成果に直結するWEBサイトとシステムを構築。無料相談受付中。",
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
        alt: "メラボコ - 東京のWEB制作・システム開発会社",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "メラボコ | 東京のWEB制作・システム開発・UXデザイン会社",
    description:
      "企業サイト制作、システム開発、UX/UIデザインをワンストップで提供。無料相談受付中。",
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
  verification: {
    google: "your-google-site-verification-code",
  },
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
        "東京・港区北青山のWEB制作・システム開発会社。スマートプラン（月額制Web制作）とオーダーメイドプランで、企業サイト制作・UX/UI設計をワンストップ提供。",
      email: "info@meraboco.jp",
      telephone: "050-1793-1290",
      founder: {
        "@type": "Person",
        name: "栗林 加奈子",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "北青山1-3-3三橋ビル3F",
        addressLocality: "港区",
        addressRegion: "東京都",
        postalCode: "107-0061",
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
        "メラボコは東京・港区北青山のWEB制作・システム開発会社。スマートプラン（月額制Web制作）とオーダーメイドプランでDX支援を提供。",
      publisher: {
        "@id": "https://meraboco.jp/#organization",
      },
      inLanguage: ["ja", "en"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://meraboco.jp/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    // WebPage
    {
      "@type": "WebPage",
      "@id": "https://meraboco.jp/#webpage",
      url: "https://meraboco.jp/",
      name: "メラボコ | 東京のWEB制作・システム開発・UXデザイン会社",
      isPartOf: {
        "@id": "https://meraboco.jp/#website",
      },
      about: {
        "@id": "https://meraboco.jp/#organization",
      },
      description:
        "メラボコは東京・港区北青山のWEB制作・システム開発会社。スマートプラン（月額制Web制作）とオーダーメイドプランで成果につながるWeb体験を提供。",
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
      "@id": "https://meraboco.jp/#service",
      name: "メラボコ",
      image: "https://meraboco.jp/assets/logo.png",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "北青山1-3-3三橋ビル3F",
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
      url: "https://meraboco.jp/",
      telephone: "050-1793-1290",
      serviceType: ["スマートプラン（月額制Web制作）", "オーダーメイドプラン", "Webデザイン", "システム開発"],
      areaServed: "東京都港区北青山",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "提供プラン",
        itemListElement: [
          {
            "@type": "Offer",
            name: "スマートプラン（月額制Web制作）",
            description: "月額制で運用しやすいWeb制作プラン。",
          },
          {
            "@type": "Offer",
            name: "オーダーメイドプラン",
            description: "要件に合わせて設計するフルカスタムプラン。",
          },
        ],
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "10",
        bestRating: "5",
        worstRating: "1",
      },
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
            text: "メラボコは東京・港区北青山に拠点を置くWEB制作コンサルタントです。企業サイト制作、システム開発、UX/UIデザイン、デジタルマーケティングをワンストップで提供し、中小企業のデジタル変革を支援しています。",
          },
        },
        {
          "@type": "Question",
          name: "WEBサイト制作の料金はいくらですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ライトプラン（LP制作：15万円〜）、スタンダードプラン（コーポレートサイト：35万円〜）、プレミアムプラン（ブランディング：80万円〜）の3つのプランを用意しています。お客様のニーズに応じて最適なプランをご提案します。",
          },
        },
        {
          "@type": "Question",
          name: "制作期間はどのくらいかかりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "プロジェクトの規模により異なりますが、LP制作で2-3週間、コーポレートサイトで1-2ヶ月、大規模システム開発で3-6ヶ月程度が目安です。詳細はお問い合わせください。",
          },
        },
        {
          "@type": "Question",
          name: "どのような企業がメラボコを利用していますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "製造業、ホテル業、飲食店、クリニック、ファッションブランド、教育機関など、幅広い業種の企業様にご利用いただいています。特に中小企業のデジタル化支援に強みを持っています。",
          },
        },
        {
          "@type": "Question",
          name: "保守・運用サポートはありますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "はい、Webサイト公開後の保守・運用サポートも提供しています。定期的なセキュリティアップデート、コンテンツ更新、システム監視などを行い、安定した運用をサポートします。",
          },
        },
      ],
    },
  ],
}

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
        </LanguageProvider>
      </body>
    </html>
  )
}
