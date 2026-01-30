import type { Metadata } from "next"
import UXUIDesignClient from "./ux-ui-design-client"

export const metadata: Metadata = {
  title: "UX/UIデザイン",
  description:
    "ユーザー体験を最優先に考えた、使いやすく美しいデザインを提供します。ユーザーテスト、プロトタイプ作成、デザインシステム構築まで対応。",
  openGraph: {
    title: "UX/UIデザイン | メラボコ",
    description: "ユーザー体験を最優先に考えた、使いやすく美しいデザインを提供します。",
    url: "https://meraboco.jp/services/ux-ui-design",
  },
}

export default function UXUIDesignPage() {
  return <UXUIDesignClient />
}
