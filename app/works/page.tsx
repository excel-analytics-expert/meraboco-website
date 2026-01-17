import type { Metadata } from "next"
import WorksClient from "./works-client"

export const metadata: Metadata = {
  title: "制作実績",
  description:
    "メラボコの制作実績一覧。企業サイト、ECサイト、予約システム、業務管理システムなど、さまざまなWEB制作・システム開発の事例をご紹介します。",
  openGraph: {
    title: "制作実績 | メラボコ",
    description: "企業サイト、ECサイト、システム開発など、さまざまな制作事例をご紹介します。",
    url: "https://meraboco.jp/works",
  },
}

export default function WorksPage() {
  return <WorksClient />
}
