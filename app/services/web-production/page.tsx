import type { Metadata } from "next"
import WebProductionClient from "./web-production-client"

export const metadata: Metadata = {
  title: "WEB制作",
  description:
    "企業サイト、ECサイト、ランディングページなど、戦略的なWEBサイト制作サービス。レスポンシブデザイン、SEO対策、CMSで運用しやすいサイトを構築します。",
  openGraph: {
    title: "WEB制作 | メラボコ",
    description: "企業サイト、ECサイト、ランディングページなど、戦略的なWEBサイト制作サービス。",
    url: "https://meraboco.jp/services/web-production",
  },
}

export default function WebProductionPage() {
  return <WebProductionClient />
}
