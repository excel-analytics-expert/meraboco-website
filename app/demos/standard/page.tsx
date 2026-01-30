import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsSite } from "@/types/microcms"
import StandardDemoClient from "./standard-demo-client"
import { LanguageProvider } from "@/contexts/language-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ホテル・旅館向けデモ | スタンダードプラン",
  description: "スタンダードプラン（月額4,980円）の標準機能で構成されたホテル・旅館向けデモサイトです。",
}

type MicroCmsNews = {
  id: string
  title: string
  summary?: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
}

export default async function StandardDemoPage() {
  let site: MicroCmsSite | null = null
  let siteError = false
  let news: MicroCmsNews[] = []
  let newsError = false

  try {
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
      site = await microcmsClient.getListDetail<MicroCmsSite>({
        endpoint: "sites",
        contentId: "standard-test",
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
    <LanguageProvider>
      <StandardDemoClient site={site} siteError={siteError} news={news} newsError={newsError} />
    </LanguageProvider>
  )
}
