"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import type { MicroCmsSite } from "@/types/microcms"
import { Globe, Layers, MapPin, Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type MicroCmsNews = {
  id: string
  title: string
  summary?: string
  publishedAt?: string
  createdAt?: string
}

type StandardDemoClientProps = {
  site: MicroCmsSite | null
  siteError: boolean
  news: MicroCmsNews[]
  newsError: boolean
}

type StandardDemoSite = MicroCmsSite & {
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

export default function StandardDemoClient({
  site,
  siteError,
  news,
  newsError,
}: StandardDemoClientProps) {
  const { language, translations, setLanguage } = useLanguage()
  const t = translations[language].demos.standard
  const headerCopy = translations[language].header
  const consultLabel = language === "ja" ? "ご相談はこちら" : "Contact Us"
  const fallbackSite = t.fallbackSite
  const dummyInfo = t.dummyInfo
  const displaySite = (site && !siteError ? site : fallbackSite) as StandardDemoSite
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

  const sectionImages = [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  ]
  const sections = t.pageSections.map((section: { id: string; title: string; description: string }, index: number) => ({
    ...section,
    image: sectionImages[index] || sectionImages[0],
  }))

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
          <div className="hidden items-center gap-5 text-xs font-medium tracking-[0.2em] text-stone-600 md:flex">
            <Link href="/" className="hover:text-stone-900">
              {t.home}
            </Link>
            <a href="#about" className="hover:text-stone-900">
              {t.nav.about}
            </a>
            <a href="#rooms" className="hover:text-stone-900">
              {t.nav.rooms}
            </a>
            <a href="#cuisine" className="hover:text-stone-900">
              {t.nav.cuisine}
            </a>
            <a href="#news" className="hover:text-stone-900">
              {t.nav.news}
            </a>
            <a href="#info" className="hover:text-stone-900">
              {t.nav.info}
            </a>
            <a href="#sightseeing" className="hover:text-stone-900">
              {t.nav.sightseeing}
            </a>
            <a href="#action" className="hover:text-stone-900">
              {t.nav.contact}
            </a>
            <div className="flex items-center gap-2 pl-2">
              <button
                type="button"
                onClick={() => setLanguage("ja")}
                className={`rounded-full px-3 py-1 text-[10px] font-semibold transition ${language === "ja" ? "bg-stone-900 text-white" : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
                  }`}
              >
                {headerCopy.languageJa}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1 text-[10px] font-semibold transition ${language === "en" ? "bg-stone-900 text-white" : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
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
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.3)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">{t.heroLabel}</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
            {siteCatchCopy}
          </h1>
          <p className="mt-6 text-base text-white/90 md:text-lg">{siteDescription}</p>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.aboutLabel}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.aboutTitle}</h2>
            <p className="mt-6 text-base leading-relaxed text-stone-600">
              {siteDescription}
            </p>
          </div>
          <div className="glass-card-light rounded-3xl border border-stone-200/70 bg-white/90 p-8 shadow-lg">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.highlightsLabel}</p>
            <h3 className="mt-3 text-xl font-semibold text-stone-800">{t.highlightsTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">{t.highlightsIntro}</p>
            <div className="mt-6 grid gap-3 text-sm text-stone-600">
              {t.serviceHighlights.map((item: string) => (
                <div key={item}>・{item}</div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="service"
        className="relative py-24 bg-stone-900/95 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,113,108,0.1),transparent)]" />
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-400/80 uppercase">{t.sectionLabel}</p>
            <h2 className="mt-4 text-3xl font-bold text-white text-shadow-glow">{t.highlightsTitle}</h2>
            <p className="mt-4 text-base text-stone-300 max-w-2xl">{t.highlightsIntro}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {t.featureItems.map((item: { title: string; description: string }, index: number) => {
              const Icon = [Globe, Search, Layers][index] || Globe
              return (
                <div
                  key={item.title}
                  className="glass-refined-demo rounded-2xl p-8 group"
                >
                  <div className="flex items-center gap-4 text-amber-400">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-amber-400/50 transition-colors duration-500">
                      <Icon className="h-6 w-6 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                    </div>
                    <p className="text-sm font-bold tracking-[0.15em] text-white text-shadow-sm">{item.title}</p>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-gray-200 text-shadow-sm font-medium">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="rooms"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.pagesLabel}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.pagesTitle}</h2>
            <p className="mt-4 text-base text-stone-600">{t.pagesDescription}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">
                    {item.title}
                  </p>
                  <p className="mt-3 text-base font-semibold text-stone-800">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="cuisine"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.sectionLabel}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.cuisineTitle}</h2>
            <p className="mt-6 text-base leading-relaxed text-stone-600">{t.cuisineText}</p>
          </div>
          <div className="group overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-lg">
            <div className="relative h-72 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1514516870926-206ade9f0e97?auto=format&fit=crop&w=1600&q=80)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.sectionLabel}</p>
              <p className="mt-3 text-base font-semibold text-stone-800">{t.cuisineBadge}</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="news"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.newsLabel}</p>
              <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.newsTitle}</h2>
            </div>
            <span className="text-sm text-stone-500">{t.newsNote}</span>
          </div>
          {newsError || news.length === 0 ? (
            <div className="rounded-2xl border border-stone-200/60 bg-white/90 px-6 py-6 text-sm text-stone-600 shadow-lg">
              {t.newsEmpty}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="glass-card-light rounded-2xl border border-stone-200/70 bg-white/90 p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="text-xs text-stone-500">{formatDate(item, language, t.updatedAtFallback)}</div>
                  <div className="mt-3 text-base font-semibold text-stone-800">{item.title}</div>
                  {item.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.summary}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        id="info"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="glass-card-light rounded-3xl border border-stone-200/70 bg-white/90 p-8 shadow-lg">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.infoLabel}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.accessTitle}</h2>
            <div className="mt-6 space-y-4 text-sm text-stone-600">
              <div>
                <p className="font-semibold text-stone-700">{t.infoLabels.address}</p>
                <p>{dummyInfo.address}</p>
              </div>
              <div>
                <p className="font-semibold text-stone-700">{t.infoLabels.phone}</p>
                <p>{dummyInfo.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-stone-700">{t.infoLabels.hours}</p>
                <p>{dummyInfo.hours}</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-stone-200/70 bg-white/90 shadow-lg">
            <iframe
              title="Google Map"
              src={mapUrl}
              className="h-80 w-full border-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        id="sightseeing"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="group overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-lg">
            <div className="relative h-72 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">{t.sectionLabel}</p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.sightseeingTitle}</h2>
            <p className="mt-6 text-base leading-relaxed text-stone-600">{t.sightseeingText}</p>
            <div className="mt-6 space-y-3 text-sm text-stone-600">
              {t.sightseeingItems.map((item: string) => (
                <div key={item} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-700" />
                  {item}
                </div>
              ))}
            </div>
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
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-700/80">RESERVATION</p>
          <h2 className="mt-4 text-3xl font-semibold text-stone-800">{t.actionTitle}</h2>
          <p className="mt-4 text-base text-stone-600">{t.actionText}</p>
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

function getHeroImageUrl(site: StandardDemoSite) {
  if (typeof site.heroImage === "string") return site.heroImage
  if (typeof site.hero_image === "string") return site.hero_image
  if (typeof site.heroImageUrl === "string") return site.heroImageUrl
  if (site.heroImage?.url) return site.heroImage.url
  if (site.hero_image?.url) return site.hero_image.url
  return "/traditional-japanese-street-architecture.jpg"
}
