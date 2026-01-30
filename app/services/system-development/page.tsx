import type { Metadata } from "next"
import SystemDevelopmentClient from "./system-development-client"

export const metadata: Metadata = {
  title: "システム開発",
  description:
    "業務効率化システム、顧客管理、予約システムなど、お客様のニーズに合わせたカスタムシステムを開発します。クラウド対応、API連携も可能です。",
  openGraph: {
    title: "システム開発 | メラボコ",
    description: "業務効率化システム、顧客管理、予約システムなど、カスタムシステムを開発します。",
    url: "https://meraboco.jp/services/system-development",
  },
}

export default function SystemDevelopmentPage() {
  return <SystemDevelopmentClient />
}
