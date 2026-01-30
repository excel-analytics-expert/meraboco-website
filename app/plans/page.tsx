import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import type { Metadata } from "next"
import PlansClient from "./plans-client"

export const metadata: Metadata = {
  title: "プラン詳細",
  description: "スマート・ウェブ・プランの詳細をご案内します。",
  openGraph: {
    title: "プラン詳細 | メラボコ",
    description: "スマート・ウェブ・プランの詳細をご案内します。",
    url: "https://meraboco.jp/plans",
  },
}

export default async function PlansPage() {
  let plans: MicroCmsPricingPlan[] = []
  let plansError = false

  try {
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
      const data = await microcmsClient.getList<MicroCmsPricingPlan>({
        endpoint: "plans",
        queries: { limit: 3, orders: "createdAt" },
      })
      plans = data.contents
    } else {
      plansError = true
    }
  } catch (err) {
    console.error("Plans Fetch Error:", err)
    plansError = true
  }

  return <PlansClient plans={plans} hasError={plansError} />
}
