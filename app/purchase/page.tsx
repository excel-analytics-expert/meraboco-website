import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import type { Metadata } from "next"
import PurchasePageClient from "./purchase-page-client"

export const metadata: Metadata = {
  title: "購入フロー",
  description: "ご契約前の確認事項と購入フローのご案内。",
  openGraph: {
    title: "購入フロー | メラボコ",
    description: "ご契約前の確認事項と購入フローのご案内。",
    url: "https://meraboco.jp/purchase",
  },
}

type PurchasePageProps = {
  searchParams?: Promise<{ plan?: string }>
}

export default async function PurchasePage({ searchParams }: PurchasePageProps) {
  let plans: MicroCmsPricingPlan[] = []
  let selectedPlan: MicroCmsPricingPlan | null = null
  const resolvedParams = searchParams ? await searchParams : undefined

  try {
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
      const data = await microcmsClient.getList<MicroCmsPricingPlan>({
        endpoint: "plans",
        queries: { limit: 10, orders: "createdAt" },
      })
      plans = data.contents
      if (resolvedParams?.plan) {
        selectedPlan = plans.find((plan) => plan.id === resolvedParams.plan) ?? null
      }
    }
  } catch (err) {
    console.error("Purchase Fetch Error:", err)
  }

  return <PurchasePageClient plan={selectedPlan} />
}
