"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import Link from "next/link"
import { motion } from "framer-motion"

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
                  <motion.div
                    key={plan.id}
                    className="glass-main-pricing group relative rounded-3xl p-8 shadow-xl border border-stone-100 transition-all duration-700"
                    initial="initial"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase transition-colors duration-500 group-hover:text-blue-700">
                        {planLabel(plan, t.labels)}
                      </div>
                      <div className="mt-3 text-xl font-bold text-slate-900 tracking-wide">{getPlanName(plan)}</div>

                      {/* Interactive Reveal Section */}
                      <motion.div
                        className="overflow-hidden"
                        variants={{
                          initial: { height: 0, opacity: 0, marginTop: 0 },
                          hover: { height: "auto", opacity: 1, marginTop: 32 }
                        }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-slate-900">
                              {plan.monthlyPrice}
                            </span>
                            <span className="text-sm text-slate-500 font-medium">円 / 毎月</span>
                          </div>
                          <div className="mt-2 text-xs font-medium text-slate-400">
                            {t.initialCost} {plan.initialCost}
                          </div>
                          <p className="mt-6 text-sm text-slate-600 leading-relaxed font-medium">{getPlanSummary(plan)}</p>

                          {getPlanFeatures(plan).length > 0 && (
                            <ul className="mt-6 space-y-3 text-sm text-slate-500 font-medium w-full text-left">
                              {getPlanFeatures(plan).map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500/30" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="mt-8 grid gap-3 w-full">
                            <Link
                              href={demoHrefForPlan(plan)}
                              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/50 px-6 py-4 text-sm font-bold text-slate-800 transition-all duration-500 hover:border-blue-400/50 hover:bg-white hover:text-blue-600 shadow-sm"
                            >
                              {t.demo}
                            </Link>
                            <Link
                              href={`/portal/subscribe?plan=${plan.id}`}
                              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-sm font-bold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                            >
                              {t.contract}
                            </Link>
                            <p className="text-center text-[10px] text-slate-400 mt-2">{t.contractNote}</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
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
