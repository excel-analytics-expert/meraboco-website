import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsSite } from "@/types/microcms"
import HotelDemoClient from "./hotel-demo-client"
import { LanguageProvider } from "@/contexts/language-context"
import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/lib/supabase/server"

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

type SupabaseNews = {
  id: string
  title: string
  content: string
  is_published: boolean
  published_at: string | null
  created_at: string
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

  // Supabase News 取得（購入者が投稿したNews）
  try {
    const supabase = await createSupabaseServerClient()
    const { data: supabaseNews, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3)

    if (!error && supabaseNews && supabaseNews.length > 0) {
      // Supabase News を microCMS 形式に変換
      news = supabaseNews.map((item: SupabaseNews) => ({
        id: item.id,
        title: item.title,
        summary: item.content.substring(0, 100) + (item.content.length > 100 ? '...' : ''),
        publishedAt: item.published_at || item.created_at,
        createdAt: item.created_at,
      }))
    } else {
      // Supabase News がない場合、microCMS にフォールバック
      if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
        const newsData = await microcmsClient.getList<MicroCmsNews>({
          endpoint: "news",
          queries: { limit: 3, orders: "-publishedAt" },
        })
        news = newsData.contents ?? []
      } else {
        newsError = true
      }
    }
  } catch {
    newsError = true
  }

  return (
    <HotelDemoClient site={site} siteError={siteError} news={news} newsError={newsError} />
  )
}
