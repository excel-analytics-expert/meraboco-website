import type { Metadata } from "next"
import TermsClient from "./terms-client"

export const metadata: Metadata = {
  title: "利用規約",
  description: "メラボコのサービス利用規約。サービスご利用前に必ずお読みください。",
  openGraph: {
    title: "利用規約 | メラボコ",
    description: "サービス利用規約をご確認ください。",
    url: "https://meraboco.jp/terms",
  },
}

export default function TermsPage() {
  return <TermsClient />
}
