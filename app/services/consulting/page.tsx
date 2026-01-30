import type { Metadata } from "next"
import ConsultingClient from "./consulting-client"

export const metadata: Metadata = {
  title: "ITコンサルティング",
  description:
    "IT戦略立案からDX推進まで、経営課題の解決をサポート。システム選定、業務改善、デジタル変革をトータルで支援します。",
  openGraph: {
    title: "ITコンサルティング | メラボコ",
    description: "IT戦略立案からDX推進まで、経営課題の解決をサポートします。",
    url: "https://meraboco.jp/services/consulting",
  },
}

export default function ConsultingPage() {
  return <ConsultingClient />
}
