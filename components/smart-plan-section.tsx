"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import { useLanguage } from "@/contexts/language-context"

type SmartPlanSectionProps = {
  plans: MicroCmsPricingPlan[]
  hasError: boolean
}

export default function SmartPlanSection({ plans, hasError }: SmartPlanSectionProps) {
  const { language, translations } = useLanguage()
  const copy = translations[language].smartPlanSection
  const customPlans = copy.customPlans || []
  const customWarning =
    language === "ja"
      ? "※デジタル資産のセキュリティ保持のため、お見積り後の経過日数に応じて料金が加算されます。2週間経過後は自動辞退となります。"
      : "Note: Due to digital asset security holding, fees accrue based on days after the estimate. Requests are automatically withdrawn after two weeks."
  const chooseLabel = language === "ja" ? "このプランで相談する" : "Consult about this plan"
  const pricedPlans = plans.filter((plan) => hasValidPricing(plan))
  const showEmpty = hasError || pricedPlans.length === 0
  const smartPlanCandidates = pricedPlans.filter(
    (plan) => isLitePlan(plan) || isStandardPlan(plan) || isProPlan(plan),
  )
  const fallbackSmartPlans = pricedPlans.filter((plan) => !isProPlan(plan))
  const smartPlans = sortSmartPlans(
    (smartPlanCandidates.length > 0 ? smartPlanCandidates : fallbackSmartPlans).slice(0, 3),
  )
  const proPlan = pricedPlans.find((plan) => isProPlan(plan))

  const getPlanName = (plan: MicroCmsPricingPlan) => {
    if (language === "ja") return plan.name
    return plan.nameEn ?? plan.name_en ?? plan.name
  }

  return (
    <section className="relative z-10 bg-[#FDFCFB] py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="flex items-center gap-3 text-sm text-stone-500">
            <Sparkles className="h-5 w-5 text-amber-500" />
            {copy.heading}
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-stone-800">
            {copy.title}
          </h2>
          <p className="mt-4 text-stone-600 leading-relaxed">
            {copy.description}
          </p>
        </div>

        <div className="mt-12 grid gap-14">
          <div className="relative z-10">
            <div className="mb-6 text-sm font-semibold text-stone-600">
              {copy.smartLabel}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {showEmpty && (
                <div className="rounded-2xl border border-stone-200/70 bg-white px-6 py-6 text-sm text-stone-600 shadow-lg">
                  {copy.empty}
                </div>
              )}
              {!showEmpty &&
                smartPlans.map((plan) => {
                  const isStandard = isStandardPlan(plan)
                  return (
                    <motion.div
                      key={plan.id}
                      className={`glass-main-pricing group relative rounded-3xl border p-10 transition-all duration-700 ${isStandard
                        ? "border-blue-200/50 bg-white/90 shadow-2xl ring-1 ring-blue-500/10"
                        : "border-stone-200/60 bg-white/70 shadow-xl"
                        }`}
                      initial={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    >
                      <div className="glitter-effect" />
                      {isStandard && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-[10px] font-bold tracking-widest text-white shadow-lg shadow-blue-500/30 uppercase">
                          Recommended
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center">
                        <div className="text-[11px] font-bold tracking-[0.5em] text-slate-400 uppercase transition-colors duration-500 group-hover:text-blue-500">
                          {getPlanName(plan)}
                        </div>

                        {/* Price Section - Always Visible with Elegant Entrance */}
                        <div className="mt-8 w-full">
                          <div className="flex flex-col items-center">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-5xl font-bold tracking-tight text-slate-900">
                                {plan.monthlyPrice}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">円 / 毎月</span>
                            </div>
                            <div className="mt-3 text-[11px] font-medium tracking-wide text-slate-400">
                              {copy.initialCost} {plan.initialCost}
                            </div>

                            <div className="mt-10 grid w-full gap-4">
                              <Link
                                href={getDemoHref(plan)}
                                className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/50 px-6 py-3.5 text-xs font-bold text-slate-700 backdrop-blur-sm transition-all duration-500 hover:border-blue-300 hover:bg-white hover:text-blue-600 hover:shadow-md"
                              >
                                {copy.demo}
                              </Link>
                              <Link
                                href="/contact"
                                className={`inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-xs font-bold text-white transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl ${isStandard ? "bg-blue-600 hover:bg-blue-500" : "bg-slate-900 hover:bg-slate-800"
                                  }`}
                              >
                                {chooseLabel}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </div>

          <div className="relative z-10">
            <div className="mb-6 text-sm font-semibold text-stone-600">
              {copy.customLabel}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {!showEmpty && proPlan && smartPlans.every((plan) => plan.id !== proPlan.id) && (
                <motion.div
                  whileHover={{ y: -8 }}
                >
                  <div className="glitter-effect" />
                  <div className="text-[11px] font-bold tracking-[0.4em] text-slate-400 uppercase">
                    {getPlanName(proPlan)}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">
                      {proPlan.monthlyPrice}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">円 / 毎月</span>
                  </div>
                  <div className="mt-2 text-[11px] font-medium text-slate-400">
                    {copy.initialCost} {proPlan.initialCost}
                  </div>
                  <div className="mt-8">
                    <p className="mb-6 text-[11px] leading-relaxed text-slate-400 italic">{customWarning}</p>
                    <Link
                      href="/#contact"
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-xs font-bold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                    >
                      {copy.consult}
                    </Link>
                  </div>
                </motion.div>
              )}
              {customPlans.map((plan: any, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                >
                  <div className="glitter-effect" />
                  <div className="flex flex-col items-center text-center">
                    <div className="text-[11px] font-bold tracking-[0.3em] text-slate-400 uppercase">
                      PLAN {index + 1}
                    </div>
                    <div className="mt-2 text-lg font-bold tracking-tight text-slate-800">
                      {plan.title}
                    </div>

                    {/* Price Section - Always Visible */}
                    <div className="mt-6 w-full">
                      <div className="flex flex-col items-center">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold tracking-tight text-slate-900">
                            {plan.price}
                          </span>
                        </div>
                        <p className="mt-6 text-[11px] font-medium leading-relaxed text-slate-500 italic max-w-[200px]">
                          {plan.description}
                        </p>

                        <div className="mt-10 grid w-full gap-3">
                          <Link
                            href="/contact"
                            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-xs font-bold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
                          >
                            {chooseLabel}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getPlanKind(plan: MicroCmsPricingPlan) {
  if (plan.id === "xctynp4ec") return "lite"
  if (plan.id === "lbliu4bziu") return "standard"
  if (plan.id === "mi20b9d9dfg") return "pro"
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

function isLitePlan(plan: MicroCmsPricingPlan) {
  return getPlanKind(plan) === "lite"
}

function isStandardPlan(plan: MicroCmsPricingPlan) {
  return getPlanKind(plan) === "standard"
}

function isProPlan(plan: MicroCmsPricingPlan) {
  return getPlanKind(plan) === "pro"
}

function hasValidPricing(plan: MicroCmsPricingPlan) {
  const monthlyPrice = String(plan.monthlyPrice || "").trim()
  const initialCost = String(plan.initialCost || "").trim()
  return monthlyPrice !== "" && initialCost !== ""
}

function getDemoHref(plan: MicroCmsPricingPlan) {
  if (plan.id === "xctynp4ec") return "/demos/hotel"
  if (plan.id === "lbliu4bziu") return "/demos/standard"
  if (plan.id === "mi20b9d9dfg") return "/demos/pro"
  const kind = getPlanKind(plan)
  if (kind === "lite") return "/demos/hotel"
  if (kind === "standard") return "/demos/standard"
  return "/demos/pro"
}

function sortSmartPlans(plans: MicroCmsPricingPlan[]) {
  const order = ["xctynp4ec", "lbliu4bziu", "mi20b9d9dfg"]
  return [...plans].sort((a, b) => {
    const aIndex = order.indexOf(a.id)
    const bIndex = order.indexOf(b.id)
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })
}
