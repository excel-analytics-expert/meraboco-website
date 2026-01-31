import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsSite } from "@/types/microcms"
import HotelDemoClient from "./hotel-demo-client"
import { LanguageProvider } from "@/contexts/language-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ホテル・旅館向けデモ | ライトプラン",
  description: "ライトプラン（月額2,980円）の標準機能で構成されたホテル・旅館向けデモサイトです。",
}

type MicroCmsNews = {
  id: string
  title: string
  summary?: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
}

export default async function HotelDemoPage() {
  let site: MicroCmsSite | null = null
  let siteError = false
  let news: MicroCmsNews[] = []
  let newsError = false

  try {
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
      site = await microcmsClient.getListDetail<MicroCmsSite>({
        endpoint: "sites",
        contentId: "test",
      })
    } else {
      siteError = true
    }
  } catch {
    siteError = true
  }

  try {
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
      const newsData = await microcmsClient.getList<MicroCmsNews>({
        endpoint: "news",
        queries: { limit: 3, orders: "-publishedAt" },
      })
      news = newsData.contents ?? []
    } else {
      newsError = true
    }
  } catch {
    newsError = true
  }

  return (
    <HotelDemoClient site={site} siteError={siteError} news={news} newsError={newsError} />
  )
}
