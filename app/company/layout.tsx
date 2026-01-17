import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "会社概要",
  description: "メラボコの会社情報、代表挨拶、企業理念、沿革をご紹介します。",
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children
}
