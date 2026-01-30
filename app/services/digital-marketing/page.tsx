import type { Metadata } from "next"
import DigitalMarketingClient from "./digital-marketing-client"

export const metadata: Metadata = {
  title: "デジタルマーケティング",
  description:
    "SEO対策、広告運用、SNSマーケティング、コンテンツマーケティングで集客を総合的に支援。データ分析に基づいた効果的な施策を提案します。",
  openGraph: {
    title: "デジタルマーケティング | メラボコ",
    description: "SEO対策、広告運用、SNSマーケティングで集客を総合的に支援します。",
    url: "https://meraboco.jp/services/digital-marketing",
  },
}

export default function DigitalMarketingPage() {
  return <DigitalMarketingClient />
}
