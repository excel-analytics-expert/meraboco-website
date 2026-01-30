"use client"

import { motion, type Variants } from "framer-motion"
import type { MicroCmsSite } from "@/types/microcms"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

type MicroCmsNews = {
  id: string
  title: string
  summary?: string
  publishedAt?: string
  createdAt?: string
}

type HotelDemoClientProps = {
  site: MicroCmsSite | null
  siteError: boolean
  news: MicroCmsNews[]
  newsError: boolean
}

type HotelDemoSite = MicroCmsSite & {
  map_url?: string
  heroImageUrl?: string
  heroImage?: { url?: string } | string
  hero_image?: { url?: string } | string
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function HotelDemoClient({ site, siteError, news, newsError }: HotelDemoClientProps) {
  const { language, translations, setLanguage } = useLanguage()
  const t = translations[language].demos.hotel
  const headerCopy = translations[language].header
  const consultLabel = language === "ja" ? "ご相談はこちら" : "Contact Us"
  const fallbackSite = t.fallbackSite
  const dummyInfo = t.dummyInfo
  const displaySite = (site && !siteError ? site : fallbackSite) as HotelDemoSite
  const heroImageUrl = getHeroImageUrl(displaySite)
  const mapUrl =
    (language === "ja" ? displaySite.map_url : displaySite.map_url_en ?? displaySite.mapUrlEn ?? displaySite.map_url) ||
    "https://maps.google.com/maps?q=Nagano%20Japan&t=&z=13&ie=UTF8&iwloc=&output=embed"
  const siteName = language === "ja" ? displaySite.name : displaySite.nameEn ?? displaySite.name_en ?? displaySite.name
  const siteCatchCopy =
    language === "ja" ? displaySite.catchCopy : displaySite.catchCopyEn ?? displaySite.catchCopy_en ?? displaySite.catchCopy
  const siteDescription =
    language === "ja"
      ? displaySite.description
      : displaySite.descriptionEn ?? displaySite.description_en ?? displaySite.description

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <nav className="sticky top-0 z-40 border-b border-stone-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight">{siteName}</div>
          <div className="hidden items-center gap-6 text-sm text-stone-600 md:flex">
            <Link href="/" className="hover:text-stone-900">
              {t.home}
            </Link>
            <a href="#about" className="hover:text-stone-900">
              {t.nav.about}
            </a>
            <a href="#news" className="hover:text-stone-900">
              {t.nav.news}
            </a>
            <a href="#info" className="hover:text-stone-900">
              {t.nav.info}
            </a>
            <a href="#action" className="hover:text-stone-900">
              {t.nav.contact}
            </a>
            <div className="flex items-center gap-2 pl-2">
              <button
                type="button"
                onClick={() => setLanguage("ja")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${language === "ja" ? "bg-stone-900 text-white" : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
                  }`}
              >
                {headerCopy.languageJa}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${language === "en" ? "bg-stone-900 text-white" : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
                  }`}
              >
                {headerCopy.languageEn}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            `linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.35)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/80">{t.heroLabel}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            {siteCatchCopy}
          </h1>
          <p className="mt-6 text-base text-white/90 md:text-lg">{siteDescription}</p>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="py-24 bg-[#FDFCFB] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center relative z-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-amber-700/80 uppercase">{t.aboutLabel}</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-800 tracking-wide">{t.aboutTitle}</h2>
            <p className="mt-6 text-base leading-relaxed text-stone-600">
              {siteDescription}
            </p>
          </div>
          <div className="glass-crystal-demo rounded-3xl p-8 shadow-xl border border-stone-200/50">
            <h3 className="text-lg font-bold text-stone-800 tracking-wider">{t.aboutSubtitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 font-medium">
              {t.aboutText}
            </p>
            <div className="mt-6 grid gap-4 text-sm text-stone-600 font-medium">
              {t.aboutBullets.map((item: string) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500/40" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="news"
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-amber-700/80 uppercase">{t.newsLabel}</p>
              <h2 className="mt-4 text-3xl font-bold text-stone-800 tracking-wide">{t.newsTitle}</h2>
            </div>
            <span className="text-sm text-stone-400">{t.newsNote}</span>
          </div>
          {newsError || news.length === 0 ? (
            <div className="rounded-2xl border border-stone-200/60 bg-stone-50/50 px-6 py-6 text-sm text-stone-600">
              {t.newsEmpty}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="glass-crystal-demo rounded-2xl p-6 shadow-lg transition-all duration-700 hover:-translate-y-1 hover:shadow-xl group"
                >
                  <div className="text-xs text-amber-700/60 font-bold uppercase tracking-wider">{formatDate(item, language, t.updatedAtFallback)}</div>
                  <div className="mt-3 text-base font-bold text-stone-800 tracking-wide transition-colors duration-500 group-hover:text-amber-800">{item.title}</div>
                  {item.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-stone-600 font-medium">{item.summary}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        id="info"
        className="py-24 bg-[#FDFCFB]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="glass-crystal-demo rounded-3xl p-8 shadow-xl border border-stone-200/50">
            <p className="text-sm font-bold tracking-[0.25em] text-amber-700/80 uppercase">{t.infoLabel}</p>
            <h2 className="mt-4 text-3xl font-bold text-stone-800 tracking-wide">{t.infoTitle}</h2>
            <div className="mt-8 space-y-6 text-sm text-stone-600 font-medium">
              <div className="border-l-2 border-amber-500/20 pl-4">
                <p className="font-bold text-stone-400 tracking-wider text-[10px] uppercase mb-1">{t.infoLabels.address}</p>
                <p className="text-stone-700">{dummyInfo.address}</p>
              </div>
              <div className="border-l-2 border-amber-500/20 pl-4">
                <p className="font-bold text-stone-400 tracking-wider text-[10px] uppercase mb-1">{t.infoLabels.phone}</p>
                <p className="text-stone-700">{dummyInfo.phone}</p>
              </div>
              <div className="border-l-2 border-amber-500/20 pl-4">
                <p className="font-bold text-stone-400 tracking-wider text-[10px] uppercase mb-1">{t.infoLabels.hours}</p>
                <p className="text-stone-700">{dummyInfo.hours}</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-stone-200/50 bg-white shadow-2xl">
            <iframe
              title="Google Map"
              src={mapUrl}
              className="h-80 w-full border-0 md:h-96 grayscale hover:grayscale-0 transition-all duration-1000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        id="action"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-amber-700/80">{t.actionLabel}</p>
          <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.actionTitle}</h2>
          <p className="mt-4 text-base text-stone-600">
            {t.actionText}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <a
              href={`tel:${dummyInfo.phone}`}
              className="w-full rounded-full bg-amber-800 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-900 md:w-auto"
            >
              {t.actionButtons.call}
            </a>
            <a
              href="https://line.me/R/ti/p/@meraboco"
              className="w-full rounded-full border border-amber-800/30 bg-white px-8 py-4 text-base font-semibold text-stone-800 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-800/50 md:w-auto"
              target="_blank"
              rel="noreferrer"
            >
              {t.actionButtons.line}
            </a>
            <Link
              href="/contact"
              className="w-full rounded-full bg-stone-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 md:w-auto"
            >
              {consultLabel}
            </Link>
          </div>
        </div>
      </motion.section>

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <span className="rounded-full border border-amber-700/30 bg-white/95 px-4 py-2 text-xs font-semibold text-amber-900 shadow-lg">
          {t.note}
        </span>
      </div>
    </div>
  )
}

function formatDate(item: MicroCmsNews, language: "ja" | "en", fallback: string) {
  const dateValue = item.publishedAt ?? item.createdAt
  if (!dateValue) return fallback
  return new Intl.DateTimeFormat(language === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateValue))
}

function getHeroImageUrl(site: HotelDemoSite) {
  if (typeof site.heroImage === "string") return site.heroImage
  if (typeof site.hero_image === "string") return site.hero_image
  if (typeof site.heroImageUrl === "string") return site.heroImageUrl
  if (site.heroImage?.url) return site.heroImage.url
  if (site.hero_image?.url) return site.hero_image.url
  return "/traditional-japanese-street-architecture.jpg"
}
