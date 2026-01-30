"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import Link from "next/link"

type PlansClientProps = {
  plans: MicroCmsPricingPlan[]
  hasError: boolean
}

export default function PlansClient({ plans, hasError }: PlansClientProps) {
  const { language, translations } = useLanguage()
  const t = translations[language].plansPage

  const getPlanName = (plan: MicroCmsPricingPlan) =>
    language === "ja" ? plan.name : plan.nameEn ?? plan.name_en ?? plan.name

  const getPlanSummary = (plan: MicroCmsPricingPlan) =>
    language === "ja" ? plan.summary : plan.summaryEn ?? plan.summary_en ?? plan.summary

  const getPlanFeatures = (plan: MicroCmsPricingPlan) =>
    language === "ja"
      ? normalizeFeatures(plan.features)
      : normalizeFeatures(plan.featuresEn ?? plan.features_en ?? plan.features)

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader title={t.title} description={t.description} />
        <section className="py-16 md:py-24 bg-[#FDFCFB]">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {hasError && (
                <div className="rounded-2xl border border-stone-200/60 bg-white px-6 py-6 text-sm text-stone-600 shadow-sm">
                  {t.empty}
                </div>
              )}
              {!hasError &&
                plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-2xl border border-stone-200/60 bg-white px-6 py-6 shadow-sm"
                  >
                    <div className="text-xs font-semibold tracking-[0.2em] text-amber-700/80">
                      {planLabel(plan, t.labels)}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-stone-500">{getPlanName(plan)}</div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-stone-800">
                        {plan.monthlyPrice}
                      </span>
                      <span className="text-sm text-stone-500">円 / 毎月</span>
                    </div>
                    <div className="mt-1 text-xs text-stone-500">
                      {t.initialCost} {plan.initialCost}
                    </div>
                    <p className="mt-2 text-sm text-stone-600">{getPlanSummary(plan)}</p>
                    {getPlanFeatures(plan).length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm text-stone-600">
                        {getPlanFeatures(plan).map((feature) => (
                          <li key={feature}>・{feature}</li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6 grid gap-3">
                      <Link
                        href={demoHrefForPlan(plan)}
                        className="inline-flex w-full items-center justify-center rounded-2xl border border-blue-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-stone-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-100"
                      >
                        {t.demo}
                      </Link>
                      <Link
                        href={`/portal/subscribe?plan=${plan.id}`}
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800"
                      >
                        {t.contract}
                      </Link>
                      <p className="text-xs text-stone-500">{t.contractNote}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-10 text-sm text-stone-600">
              {t.legalPrefix}
              <a href="/terms" className="underline underline-offset-4">
                {t.terms}
              </a>
              、
              <a href="/privacy" className="underline underline-offset-4">
                {t.privacy}
              </a>
              、
              <a href="/commerce" className="underline underline-offset-4">
                {t.commerce}
              </a>
              {t.legalSuffix}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function normalizeFeatures(value: MicroCmsPricingPlan["features"] | string[] | string | null | undefined): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim() !== "")
  }
  if (typeof value === "string") {
    return value
      .split(/[\n,]/g)
      .map((item: string) => item.trim())
      .filter((item: string) => item !== "")
  }
  return []
}

function planLabel(
  plan: MicroCmsPricingPlan,
  labels: { lite: string; standard: string; pro: string; fallback: string },
) {
  const kind = getPlanKind(plan)
  if (kind === "lite") return labels.lite
  if (kind === "standard") return labels.standard
  if (kind === "pro") return labels.pro
  return labels.fallback
}

function demoHrefForPlan(plan: MicroCmsPricingPlan) {
  const kind = getPlanKind(plan)
  if (kind === "standard") return "/demos/standard"
  if (kind === "lite") return "/demos/hotel"
  if (plan.demoUrl) return plan.demoUrl
  return "/demos/standard"
}

function getPlanKind(plan: MicroCmsPricingPlan) {
  if (plan.id === "xctynp4ec") return "lite"
  if (plan.id === "lbliu4bziu") return "standard"
  const planId = String(plan.planId || "").toLowerCase()
  const rawName = String(plan.name || "")
  const lowerName = rawName.toLowerCase()
  if (["lite", "light"].some((key) => planId.includes(key) || lowerName.includes(key) || rawName.includes("ライト"))) {
    return "lite"
  }
  if (
    ["standard", "basic"].some((key) => planId.includes(key) || lowerName.includes(key)) ||
    rawName.includes("スタンダード")
  ) {
    return "standard"
  }
  if (["pro", "premium"].some((key) => planId.includes(key) || lowerName.includes(key) || rawName.includes("プロ"))) {
    return "pro"
  }
  return "unknown"
}
