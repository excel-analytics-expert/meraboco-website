"use client"

import { motion } from "framer-motion"
import {
  Activity,
  BadgeCheck,
  Database,
  LayoutDashboard,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import type { MicroCmsSite } from "@/types/microcms"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"

type DashboardClientProps = {
  userEmail: string
  customer: {
    subscriptionStatus?: string | null
    planId?: string | null
    tenantId?: string | null
    updatedAt?: string | null
  } | null
  hasError: boolean
  sites: MicroCmsSite[]
  microcmsError: boolean
}

const fadeSlide = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9 } },
}

export default function DashboardClient({
  userEmail,
  customer,
  hasError,
  sites,
  microcmsError,
}: DashboardClientProps) {
  const { language, translations } = useLanguage()
  const t = translations[language].portalDashboard
  const status = customer?.subscriptionStatus ?? "inactive"
  const isActive = status === "active"
  const debugStatus = hasError ? "db_error" : customer?.subscriptionStatus ?? "null"
  const tenantIdStatus = hasError ? "unknown" : customer?.tenantId ? "present" : "missing"
  const showSkeleton = microcmsError || sites.length === 0

  const planLabelMap = t.planLabels || {}

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800">
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-160px)] max-w-6xl flex-col gap-8 px-6 py-16">
        <motion.section {...fadeSlide} className="space-y-3">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-stone-500">
            <LayoutDashboard className="h-4 w-4 text-stone-400" />
            {t.label}
          </div>
          <h1 className="text-3xl font-semibold text-stone-800">{t.title}</h1>
          <p className="text-sm text-stone-500">
            {t.loggedIn}: <span className="text-stone-700">{userEmail}</span>
          </p>
        </motion.section>

        {hasError && (
          <motion.section {...fadeSlide}>
            <div className="rounded-2xl border border-rose-200/60 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-sm">
              <p className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                {t.connectionTitle}
              </p>
              <p className="mt-2 text-xs text-rose-600/80">
                {t.connectionDescription}
              </p>
            </div>
          </motion.section>
        )}

        <motion.section {...fadeSlide} className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200/60 bg-white px-6 py-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-stone-400">
                {t.debugStatus}
              </p>
              <span className="rounded-full border border-stone-200/70 bg-stone-100 px-3 py-1 text-[11px] text-stone-500">
                {t.debugBadge}
              </span>
            </div>
            <div className="grid gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-stone-400" />
                {t.debugEmail}: <span className="text-stone-700">{userEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-stone-400" />
                {t.debugSubscription}:{" "}
                <span className="text-stone-700">{debugStatus}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-stone-400" />
                {t.debugTenant}: <span className="text-stone-700">{tenantIdStatus}</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-stone-400" />
                {t.debugFooter}: <span className="text-stone-700">{t.footerRendered}</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border px-6 py-5 shadow-sm ${
              isActive
                ? "border-emerald-200/60 bg-emerald-50"
                : "border-amber-200/60 bg-amber-50"
            }`}
          >
            <h2 className="text-xl font-semibold text-stone-800">
              {isActive ? t.activeTitle : t.inactiveTitle}
            </h2>
            <p className="mt-3 text-sm text-stone-600">
              {isActive ? t.activeDescription : t.inactiveDescription}
            </p>
            <div className="mt-6 grid gap-3 text-sm text-stone-600">
              <div>
                {t.statusLabel}: {status}
              </div>
              {customer?.planId && (
                <div>
                  {t.planIdLabel}: {customer.planId}
                </div>
              )}
              {customer?.tenantId && (
                <div>
                  {t.tenantIdLabel}: {customer.tenantId}
                </div>
              )}
            </div>
            {!isActive && (
              <div className="mt-6 text-sm text-stone-600">
                {t.paymentContact}{" "}
                <a
                  href="mailto:info@meraboco.jp"
                  className="text-stone-800 underline-offset-4 hover:underline"
                >
                  info@meraboco.jp
                </a>{" "}
                {t.paymentContactSuffix}
              </div>
            )}
          </div>
        </motion.section>

        <motion.section {...fadeSlide} className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Database className="h-4 w-4 text-stone-400" />
            {t.microcmsPreview}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {showSkeleton &&
              t.skeletonLabels.map((label: string) => (
                <div
                  key={label}
                  className="rounded-2xl border border-stone-200/60 bg-white px-5 py-4 shadow-sm"
                >
                  <div className="mb-3 text-sm font-semibold text-stone-700">
                    {label}
                  </div>
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 w-3/4 rounded-full bg-stone-200"></div>
                    <div className="h-3 w-5/6 rounded-full bg-stone-200"></div>
                    <div className="h-3 w-2/3 rounded-full bg-stone-200"></div>
                  </div>
                </div>
              ))}
            {!showSkeleton &&
              sites.map((site) => (
                <motion.div
                  key={site.id}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-stone-200/60 bg-white px-5 py-4 shadow-sm transition-all duration-500 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    {language === "ja" ? site.name : site.nameEn ?? site.name_en ?? site.name}
                  </div>
                  <p className="text-xs text-stone-500">
                    {language === "ja" ? site.catchCopy : site.catchCopyEn ?? site.catchCopy_en ?? site.catchCopy}
                  </p>
                  <p className="mt-3 text-sm text-stone-600 line-clamp-3">
                    {language === "ja"
                      ? site.description
                      : site.descriptionEn ?? site.description_en ?? site.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-orange-50/50 px-3 py-1 text-[11px] text-orange-700">
                    <span className="h-1 w-1 rounded-full bg-orange-400"></span>
                    {planLabelMap[site.plan] || site.plan}
                  </div>
                </motion.div>
              ))}
          </div>
          {microcmsError && (
            <p className="text-xs text-stone-400">
              {t.microcmsError}
            </p>
          )}
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}
