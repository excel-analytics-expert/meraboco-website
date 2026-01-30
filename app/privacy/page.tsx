import type { Metadata } from "next"
import PrivacyClient from "./privacy-client"

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "メラボコのプライバシーポリシー。個人情報の取り扱いについてご説明します。",
  openGraph: {
    title: "プライバシーポリシー | メラボコ",
    description: "個人情報の取り扱いについてご説明します。",
    url: "https://meraboco.jp/privacy",
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
