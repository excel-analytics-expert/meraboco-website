import type { Metadata } from "next"
import CommerceClient from "./commerce-client"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "特定商取引法に基づく表記を掲載しています。",
  openGraph: {
    title: "特定商取引法に基づく表記 | メラボコ",
    description: "特定商取引法に基づく表記を掲載しています。",
    url: "https://meraboco.jp/commerce",
  },
}

export default function CommercePage() {
  return <CommerceClient />
}
