"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import PurchaseClient from "./purchase-client"

type PurchasePageClientProps = {
  plan: MicroCmsPricingPlan | null
}

export default function PurchasePageClient({ plan }: PurchasePageClientProps) {
  const { language, translations } = useLanguage()
  const t = translations[language].purchasePage

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader title={t.title} description={t.description} />
        <PurchaseClient plan={plan} />
      </main>
      <Footer />
    </>
  )
}
