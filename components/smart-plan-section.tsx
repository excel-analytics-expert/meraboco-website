"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
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
  const chooseLabel = language === "ja" ? "このプランで申し込む" : "Apply for this plan"
  const consultLabel = language === "ja" ? "このプランで相談する" : "Consult about this plan"

  const pricedPlans = plans.filter((plan) => hasValidPricing(plan))
  const showEmpty = hasError || pricedPlans.length === 0

  const smartPlans = sortSmartPlans(
    pricedPlans.filter((plan) => isLitePlan(plan) || isStandardPlan(plan) || isProPlan(plan)).slice(0, 3)
  )
  const proPlan = pricedPlans.find((plan) => isProPlan(plan))

  const customWarning =
    language === "ja"
      ? "※デジタル資産のセキュリティ保持のため、お見積り後の経過日数に応じて料金が加算されます。2週間経過後は自動辞退となります。"
      : "Note: Due to digital asset security holding, fees accrue based on days after the estimate. Requests are automatically withdrawn after two weeks."

  return (
    <section className="relative z-10 bg-[#FDFCFB] py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-4">
        {/* Header section */}
        <div className="mx-auto max-w-5xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-sm text-stone-500 mb-4"
          >
            <Sparkles className="h-5 w-5 text-amber-500" />
            {copy.heading}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-3xl md:text-5xl font-semibold text-stone-800 tracking-tight leading-tight"
          >
            {copy.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 text-stone-600 leading-relaxed text-base md:text-lg max-w-2xl"
          >
            {copy.description}
          </motion.p>
        </div>

        {/* Smart Plans Section */}
        <div className="relative z-10">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-[1px] flex-1 bg-stone-100" />
            <h3 className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">
              {copy.smartLabel}
            </h3>
            <span className="h-[1px] flex-1 bg-stone-100" />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {showEmpty ? (
              <div className="col-span-full rounded-3xl border border-stone-200/40 bg-white/50 p-12 text-center text-stone-400">
                {copy.empty}
              </div>
            ) : (
              smartPlans.map((plan, idx) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  idx={idx}
                  isStandard={isStandardPlan(plan)}
                  chooseLabel={chooseLabel}
                  language={language}
                />
              ))
            )}
          </div>
        </div>

        {/* Custom Plans Section */}
        <div className="relative z-10 mt-32">
          <div className="mb-12 flex items-center gap-4">
            <span className="h-[1px] flex-1 bg-stone-100" />
            <h3 className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">
              {copy.customLabel}
            </h3>
            <span className="h-[1px] flex-1 bg-stone-100" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {!showEmpty && proPlan && smartPlans.every((p) => p.id !== proPlan.id) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[2.5rem] border border-stone-200/50 bg-white/80 p-10 md:p-12 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1.5"
              >
                <div className="text-[10px] font-bold tracking-[0.5em] text-slate-400 uppercase mb-8">
                  {language === "ja" ? proPlan.name : proPlan.nameEn ?? proPlan.name_en ?? proPlan.name}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{proPlan.monthlyPrice}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">円 / 毎月</span>
                </div>
                <div className="mt-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  INITIAL {proPlan.initialCost}
                </div>
                <p className="mt-8 text-[11px] leading-relaxed text-slate-400 italic mb-10">{customWarning}</p>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center rounded-full bg-slate-900 py-5 text-xs font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl"
                  >
                    {consultLabel}
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {customPlans.map((plan: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="group relative rounded-[2.5rem] border border-stone-200/50 bg-white/80 p-10 md:p-12 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1.5 text-center flex flex-col items-center"
              >
                <div className="text-[10px] font-bold tracking-[0.5em] text-stone-400 uppercase mb-4">
                  PLAN {index + 1}
                </div>
                <div className="text-xl font-bold text-slate-800 mb-6 tracking-wide">{plan.title}</div>
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">{plan.price}</div>
                <p className="text-[11px] leading-relaxed text-stone-500 italic mb-10 mx-auto max-w-[220px]">
                  {plan.description}
                </p>
                <motion.div className="w-full mt-auto" whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center rounded-full bg-slate-900 py-5 text-xs font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl"
                  >
                    {consultLabel}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan, idx, isStandard, chooseLabel, language }: {
  plan: MicroCmsPricingPlan,
  idx: number,
  isStandard: boolean,
  chooseLabel: string,
  language: string
}) {
  const demoLinks = [
    { label: language === 'ja' ? "宿泊施設" : "Hotel", industry: "hotel" },
    { label: language === 'ja' ? "飲食店" : "Restaurant", industry: "restaurant" },
    { label: language === 'ja' ? "士業・オフィス" : "Office", industry: "office" },
  ]

  const baseDemoHref = getDemoHref(plan)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
      className={`group relative rounded-[3rem] border p-10 md:p-14 transition-all duration-700 ${isStandard
          ? "border-blue-200/50 bg-white/95 shadow-2xl ring-1 ring-blue-500/10"
          : "border-stone-100 bg-white/80 shadow-xl"
        }`}
      whileHover={{ y: -12, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      {isStandard && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-7 py-2 text-[10px] font-bold tracking-[0.2em] text-white shadow-lg shadow-blue-500/30 uppercase z-20">
          Recommended
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="text-[10px] font-bold tracking-[0.6em] text-stone-400 uppercase mb-12 transition-colors group-hover:text-blue-500">
          {language === "ja" ? plan.name : plan.nameEn ?? plan.name_en ?? plan.name}
        </div>

        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            {plan.monthlyPrice}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">円 / 毎月</span>
        </div>
        <div className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-14">
          INITIAL {plan.initialCost}
        </div>

        {/* Demo Switcher */}
        <div className="w-full mb-12">
          <p className="text-[9px] font-bold text-stone-400 tracking-[0.3em] uppercase mb-5 text-center">業種別デモを見る</p>
          <div className="flex flex-wrap justify-center gap-2">
            {demoLinks.map((link) => (
              <motion.div key={link.industry} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`${baseDemoHref}?industry=${link.industry}`}
                  className="inline-block px-5 py-2.5 rounded-full border border-stone-200 bg-white/40 text-[10px] font-bold text-stone-600 transition-all hover:border-blue-400 hover:bg-white hover:text-blue-600 hover:shadow-lg"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <motion.div whileTap={{ scale: 0.96 }}>
            <Link
              href="/contact"
              className={`flex w-full items-center justify-center gap-2 rounded-full py-5 text-sm font-bold text-white transition-all duration-500 ${isStandard ? "bg-blue-600 hover:bg-blue-500 hover:shadow-2xl shadow-blue-500/10" : "bg-slate-900 hover:bg-slate-800 hover:shadow-xl"
                }`}
            >
              {chooseLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function getPlanKind(plan: MicroCmsPricingPlan) {
  if (plan.id === "xctynp4ec") return "lite"
  if (plan.id === "lbliu4bziu") return "standard"
  if (plan.id === "mi20b9d9dfg") return "pro"
  const planId = String(plan.planId || "").toLowerCase()
  const lowerName = String(plan.name || "").toLowerCase()
  if (["lite", "light", "ライト"].some(k => planId.includes(k) || lowerName.includes(k))) return "lite"
  if (["standard", "basic", "スタンダード"].some(k => planId.includes(k) || lowerName.includes(k))) return "standard"
  if (["pro", "premium", "プロ"].some(k => planId.includes(k) || lowerName.includes(k))) return "pro"
  return "unknown"
}

function isLitePlan(plan: MicroCmsPricingPlan) { return getPlanKind(plan) === "lite" }
function isStandardPlan(plan: MicroCmsPricingPlan) { return getPlanKind(plan) === "standard" }
function isProPlan(plan: MicroCmsPricingPlan) { return getPlanKind(plan) === "pro" }

function hasValidPricing(plan: MicroCmsPricingPlan) {
  return String(plan.monthlyPrice || "").trim() !== "" && String(plan.initialCost || "").trim() !== ""
}

function getDemoHref(plan: MicroCmsPricingPlan) {
  const kind = getPlanKind(plan)
  if (kind === "lite") return "/demos/hotel"
  if (kind === "standard") return "/demos/standard"
  return "/demos/pro"
}

function sortSmartPlans(plans: MicroCmsPricingPlan[]) {
  const order = ["xctynp4ec", "lbliu4bziu", "mi20b9d9dfg"]
  return [...plans].sort((a, b) => {
    const aIdx = order.indexOf(a.id)
    const bIdx = order.indexOf(b.id)
    if (aIdx === -1 && bIdx === -1) return 0
    if (aIdx === -1) return 1
    if (bIdx === -1) return -1
    return aIdx - bIdx
  })
}
