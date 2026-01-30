import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import type { Metadata } from "next"
import SubscribePageClient from "./subscribe-page-client"

export const metadata: Metadata = {
  title: "契約合意",
  description: "ご契約前の合意事項を確認し、手続きを進めます。",
  openGraph: {
    title: "契約合意 | メラボコ",
    description: "ご契約前の合意事項を確認し、手続きを進めます。",
    url: "https://meraboco.jp/portal/subscribe",
  },
}

type SubscribePageProps = {
  searchParams?: Promise<{ plan?: string }>
}

export default async function SubscribePage({ searchParams }: SubscribePageProps) {
  let selectedPlan: MicroCmsPricingPlan | null = null
  const resolvedParams = searchParams ? await searchParams : undefined
  const stripePriceMap: Record<string, string | undefined> = {
    xctynp4ec: process.env.STRIPE_PRICE_LITE,
    lbliu4bziu: process.env.STRIPE_PRICE_STANDARD,
    mi20b9d9dfg: process.env.STRIPE_PRICE_PRO,
  }

  try {
    if (process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY) {
      if (resolvedParams?.plan) {
        const plan = await microcmsClient.getListDetail<MicroCmsPricingPlan>({
          endpoint: "plans",
          contentId: resolvedParams.plan,
        })
        if (plan) {
          const fallbackStripePriceId = stripePriceMap[plan.id]
          selectedPlan = {
            ...plan,
            stripePriceId: plan.stripePriceId ?? fallbackStripePriceId,
          }
        }
      }
    }
  } catch (err) {
    console.error("Subscribe Fetch Error:", err)
  }

  return <SubscribePageClient plan={selectedPlan} />
}
