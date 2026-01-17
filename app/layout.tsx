import type React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP, Inter, Noto_Serif_JP } from "next/font/google"
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

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: true,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: true,
})

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

export const metadata: Metadata = {
  metadataBase: new URL("https://meraboco.jp"),
  title: {
    default: "メラボコ | 東京のWEB制作・システム開発・UXデザイン会社",
    template: "%s | メラボコ - 東京のWEB制作会社",
  },
  description:
    "東京・港区北青山のWEB制作コンサルタント『メラボコ』。Next.jsやAI技術（AEO）を活用した企業サイト制作、WEBシステム開発、UX/UIデザインをワンストップで提供。中小企業の集客とDXを支援します。",
  keywords: [
    "WEB制作",
    "WEB制作会社",
    "ホームページ制作",
    "システム開発",
    "UXデザイン",
    "AEO対策",
    "SEO対策",
    "Next.js",
    "Supabase",
    "東京",
    "港区",
    "DX支援",
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
      "最新のWEB技術とデザインで、成果に直結するWEBサイトとシステムを構築。AI回答エンジン（AEO）に最適化されたモダンな開発を提供します。",
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
      "企業サイト制作、システム開発、UX/UIデザインをワンストップで提供。AI時代に選ばれるWEB戦略を。",
    images: ["/assets/logo.png"],
    creator: "@meraboco",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "L-1Y42OSYyE1tjN6DqNnRY6qLVZuwYbWcxyJPHjF5h4",
  },
  alternates: {
    canonical: "https://meraboco.jp/",
    languages: {
      "ja-JP": "https://meraboco.jp/",
      "en-US": "https://meraboco.jp/?lang=en",
    },
  },
}

// AEO(AI Engine Optimization)を強化した構造化データ
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://meraboco.jp/#organization",
      name: "メラボコ",
      url: "https://meraboco.jp/",
      logo: {
        "@type": "ImageObject",
        url: "https://meraboco.jp/assets/logo.png",
      },
      description: "東京・港区北青山のWEB制作コンサルタント。Next.jsを用いた高性能なサイト制作とDX支援。",
      email: "meraboco.2025.8@gmail.com",
      telephone: "050-1793-1290",
      address: {
        "@type": "PostalAddress",
        streetAddress: "北青山1-3-3",
        addressLocality: "港区",
        addressRegion: "東京都",
        postalCode: "107-0061",
        addressCountry: "JP",
      },
      knowsAbout: ["Web Development", "AEO", "SEO", "UX Design", "Next.js", "Supabase"],
      foundingDate: "2024",
    },
    {
      "@type": "WebSite",
      "@id": "https://meraboco.jp/#website",
      url: "https://meraboco.jp/",
      name: "メラボコ",
      publisher: { "@id": "https://meraboco.jp/#organization" },
      inLanguage: ["ja", "en"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://meraboco.jp/#service",
      name: "メラボコ WEBコンサルティング",
      image: "https://meraboco.jp/assets/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "北青山1-3-3",
        addressLocality: "港区",
        addressRegion: "東京都",
        postalCode: "107-0061",
        addressCountry: "JP",
      },
      priceRange: "¥150,000 - ¥2,000,000",
      telephone: "050-1793-1290",
    },
    {
      "@type": "FAQPage",
      "@id": "https://meraboco.jp/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "メラボコの特徴は何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "最新のNext.js技術とAI回答エンジン最適化（AEO）を組み合わせ、高速かつ検索に強いWebサイト制作を提供することです。",
          },
        },
        {
          "@type": "Question",
          name: "対応エリアはどこですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "東京・港区を拠点としていますが、オンラインにて全国対応可能です。",
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
    <html lang="ja" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Font Awesome 読み込み維持 */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${notoSansJP.variable} ${inter.variable} ${notoSerifJP.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {/* 背景コンポーネント群を維持 */}
          <NatureBackground />
          <MatrixRainBackground />
          <DigitalGridOverlay />
          <FireflyParticles />

          {/* インタラクション要素を維持 */}
          <CursorFollower />
          <ScrollToTop />

          {/* メインコンテンツ */}
          <PageTransition>{children}</PageTransition>

          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}