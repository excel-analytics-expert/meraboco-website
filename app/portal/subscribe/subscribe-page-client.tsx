"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import SubscribeClient from "./subscribe-client"

type SubscribePageClientProps = {
  plan: MicroCmsPricingPlan | null
}

export default function SubscribePageClient({ plan }: SubscribePageClientProps) {
  const { language, translations } = useLanguage()
  const t = translations[language].subscribePage

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader title={t.title} description={t.description} />
        <SubscribeClient plan={plan} />
      </main>
      <Footer />
    </>
  )
}
