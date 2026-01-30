"use client"

import { useState } from "react"
import Link from "next/link"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import { useLanguage } from "@/contexts/language-context"

type PurchaseClientProps = {
  plan: MicroCmsPricingPlan | null
}

export default function PurchaseClient({ plan }: PurchaseClientProps) {
  const { language, translations } = useLanguage()
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const canProceed = Boolean(email && agreed)

  const t = translations[language].purchasePage
  const planName = language === "ja" ? plan?.name : plan?.nameEn ?? plan?.name_en ?? plan?.name
  const planSummary = language === "ja" ? plan?.summary : plan?.summaryEn ?? plan?.summary_en ?? plan?.summary

  return (
    <section className="py-16 md:py-24 bg-[#FDFCFB]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200/60 bg-white px-6 py-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">{t.label}</p>
          <h2 className="mt-3 text-2xl font-semibold text-stone-800">{t.title}</h2>
          <p className="mt-2 text-sm text-stone-600">{t.description}</p>

          <div className="mt-6 rounded-2xl border border-stone-200/60 bg-stone-50 px-5 py-4 text-sm text-stone-600">
            <div className="font-semibold text-stone-800">
              {t.planLabel}: {planName ?? t.planFallback}
            </div>
            {plan?.monthlyPrice && (
              <div className="mt-1 text-stone-700">{plan.monthlyPrice}</div>
            )}
            {planSummary && (
              <div className="mt-2 text-xs text-stone-500">{planSummary}</div>
            )}
          </div>

          <div className="mt-6 grid gap-4">
            <label className="block text-sm text-stone-600">
              {t.emailLabel}
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.emailPlaceholder}
                className="mt-2 w-full rounded-2xl border border-stone-200/70 px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition-all duration-500 focus:border-stone-400"
              />
            </label>

            <div className="text-sm text-stone-600">
              {t.legalTitle}
              <div className="mt-2 flex flex-wrap gap-3">
                <Link
                  href="/terms"
                  className="rounded-full border border-stone-200/70 bg-stone-50 px-4 py-2 text-xs font-semibold text-stone-600 transition-all duration-500 hover:bg-stone-100"
                >
                  {t.terms}
                </Link>
                <Link
                  href="/privacy"
                  className="rounded-full border border-stone-200/70 bg-stone-50 px-4 py-2 text-xs font-semibold text-stone-600 transition-all duration-500 hover:bg-stone-100"
                >
                  {t.privacy}
                </Link>
                <Link
                  href="/commerce"
                  className="rounded-full border border-stone-200/70 bg-stone-50 px-4 py-2 text-xs font-semibold text-stone-600 transition-all duration-500 hover:bg-stone-100"
                >
                  {t.commerce}
                </Link>
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-stone-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800"
              />
              {t.agreeLabel}
            </label>
          </div>

          <button
            type="button"
            disabled={!canProceed}
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {t.proceed}
          </button>
        </div>
      </div>
    </section>
  )
}
