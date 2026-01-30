"use client"

import { useState } from "react"
import Link from "next/link"
import type { MicroCmsPricingPlan } from "@/types/microcms"
import { useLanguage } from "@/contexts/language-context"

type SubscribeClientProps = {
  plan: MicroCmsPricingPlan | null
}

export default function SubscribeClient({ plan }: SubscribeClientProps) {
  const { language, translations } = useLanguage()
  const t = translations[language].subscribePage
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeCommerce, setAgreeCommerce] = useState(false)
  const [agreePublicOrder, setAgreePublicOrder] = useState(false)
  const [agreeNoRefund, setAgreeNoRefund] = useState(false)
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")
  const [message, setMessage] = useState<string | null>(null)

  const canProceed =
    Boolean(email && name && plan?.id) &&
    agreeTerms &&
    agreePrivacy &&
    agreeCommerce &&
    agreePublicOrder &&
    agreeNoRefund

  const handleSubmit = async () => {
    if (!canProceed || !plan?.id) return

    setStatus("submitting")
    setMessage(null)

    try {
      const response = await fetch("/api/portal/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          email,
          name,
          agreeTerms,
          agreePrivacy,
          agreeCommerce,
          agreePublicOrder,
          agreeNoRefund,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setMessage(data.error || t.errorDefault)
        return
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      setStatus("error")
      setMessage(t.errorNetwork)
    }
  }

  return (
    <section className="py-24 bg-[#FDFCFB]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl glass-card-light rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="rounded-2xl border border-stone-200/60 bg-white/70 px-5 py-4 text-sm text-stone-700">
            <div className="text-xs uppercase tracking-[0.3em] text-stone-400">{t.selectedPlan}</div>
            <div className="mt-2 text-lg font-semibold text-stone-800">
              {language === "ja"
                ? plan?.name ?? t.planFallback
                : plan?.nameEn ?? plan?.name_en ?? plan?.name ?? t.planFallback}
            </div>
            {plan?.monthlyPrice && <div className="mt-1 text-stone-600">{plan.monthlyPrice}</div>}
            {(language === "ja" ? plan?.summary : plan?.summaryEn ?? plan?.summary_en ?? plan?.summary) && (
              <div className="mt-2 text-xs text-stone-500">
                {language === "ja" ? plan?.summary : plan?.summaryEn ?? plan?.summary_en ?? plan?.summary}
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-5">
            <label className="block text-sm text-stone-600">
              {t.nameLabel}
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t.namePlaceholder}
                className="mt-2 w-full rounded-2xl border border-stone-200/70 px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition-all duration-500 focus:border-stone-400"
              />
            </label>

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
          </div>

          <div className="mt-8 text-sm text-stone-600">
            {t.reviewLinks}
            <div className="mt-3 flex flex-wrap gap-3">
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

          <div className="mt-8 space-y-4 text-sm text-stone-600">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(event) => setAgreeTerms(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800"
              />
              {t.agreeTerms}
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(event) => setAgreePrivacy(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800"
              />
              {t.agreePrivacy}
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreeCommerce}
                onChange={(event) => setAgreeCommerce(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800"
              />
              {t.agreeCommerce}
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreePublicOrder}
                onChange={(event) => setAgreePublicOrder(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800"
              />
              {t.agreePublicOrder}
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreeNoRefund}
                onChange={(event) => setAgreeNoRefund(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800"
              />
              {t.agreeNoRefund}
            </label>
          </div>

          {status === "error" && message && (
            <p className="mt-6 text-sm text-rose-600">{message}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed || status === "submitting"}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {status === "submitting" ? t.processing : t.submit}
          </button>
        </div>
      </div>
    </section>
  )
}
