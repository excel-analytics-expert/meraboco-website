"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import type { MicroCmsSite } from "@/types/microcms"
import { Globe, Layers, MapPin, Search, Home, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

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

export default function StandardDemoClient(props: StandardDemoClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center">Loading...</div>}>
      <StandardDemoClientContent {...props} />
    </Suspense>
  )
}

function StandardDemoClientContent({
  site,
  siteError,
  news,
  newsError,
}: StandardDemoClientProps) {
  const { language, translations, setLanguage } = useLanguage()
  const searchParams = useSearchParams()
  const urlIndustry = searchParams.get("industry")
  const t = translations[language].demos.standard
  const headerCopy = translations[language].header
  const consultLabel = language === "ja" ? "ご相談はこちら" : "Contact Us"
  const homeBackLabel = language === "ja" ? "ホームに戻る" : "Back to Home"
  const fallbackSite = t.fallbackSite
  const dummyInfo = t.dummyInfo
  const displaySite = (site && !siteError ? site : fallbackSite) as StandardDemoSite
  const heroImageUrl = getHeroImageUrl(displaySite)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const isJa = language === "ja"
  const rawIndustry = displaySite.industry
  let industryStr = Array.isArray(rawIndustry) ? rawIndustry[0] : (typeof rawIndustry === 'string' ? rawIndustry : '');

  if (urlIndustry === "restaurant") industryStr = "飲食店"
  else if (urlIndustry === "office") industryStr = "士業・オフィス"
  else if (urlIndustry === "hotel") industryStr = "宿泊施設"

  const labels = {
    heroLabel: isJa ? "Hotel Website Demo" : "Hotel Website Demo",
    roomsTitle: isJa ? "客室のご案内" : "Rooms",
    roomsSubtitle: isJa ? "上質な寛ぎの空間" : "A refined stay experience",
    accessTitle: isJa ? "アクセス" : "Access",
    actionButton: isJa ? "ご予約" : "Reservations",
  }

  if (industryStr?.trim() === "飲食店") {
    labels.heroLabel = isJa ? "Restaurant Website Demo" : "RESTAURANT WEBSITE DEMO"
    labels.roomsTitle = isJa ? "お品書き・コース" : "Menu & Courses"
    labels.roomsSubtitle = isJa ? "至福のひとときを" : "A blissful moment"
    labels.accessTitle = isJa ? "店舗情報" : "Shop Info"
    labels.actionButton = isJa ? "お席の予約" : "Table Reservation"
  } else if (industryStr?.trim() === "士業・オフィス") {
    labels.heroLabel = isJa ? "Professional Service Demo" : "PROFESSIONAL SERVICE DEMO"
    labels.roomsTitle = isJa ? "業務内容・サービス" : "Services"
    labels.roomsSubtitle = isJa ? "確かな解決と信頼" : "Reliable solutions and trust"
    labels.accessTitle = isJa ? "事務所案内" : "Office Guide"
    labels.actionButton = isJa ? "無料相談・お問い合わせ" : "Free Consultation"
  }

  const restrictedNews = news.slice(0, 3)
  const fixedNotice = isJa ? "こちらはメラボコ・デモサイトです。" : "This is a Meraboco demo site."

  const sectionImages = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1454165833767-13143895e021?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1504384308090-c89eecaa338a?auto=format&fit=crop&w=1600&q=80",
  ]
  const sections = t.pageSections.map((section: { id: string; title: string; description: string }, index: number) => ({
    ...section,
    title: section.id === "rooms" ? labels.roomsTitle : section.id === "access" ? labels.accessTitle : section.title,
    image: sectionImages[index] || sectionImages[0],
  }))

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <nav className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 transition-all hover:bg-stone-900 md:hidden">
              <Home className="h-5 w-5 text-stone-600 transition-colors group-hover:text-white" />
            </Link>
            <div className="text-lg font-bold tracking-tight text-stone-900">{siteName}</div>
          </div>

          <div className="hidden items-center gap-6 text-xs font-bold tracking-[0.2em] text-stone-600 md:flex">
            <Link href="/" className="flex items-center gap-2 text-stone-900 hover:text-blue-600 transition-colors uppercase">
              <Home className="h-4 w-4" />
              {homeBackLabel}
            </Link>
            <a href="#about" className="hover:text-stone-900 transition-colors uppercase">{t.nav.about}</a>
            <a href="#rooms" className="hover:text-stone-900 transition-colors uppercase">{labels.roomsTitle}</a>
            <a href="#news" className="hover:text-stone-900 transition-colors uppercase">{t.nav.news}</a>
            <a href="#info" className="hover:text-stone-900 transition-colors uppercase">{labels.accessTitle}</a>
            <a href="#action" className="hover:text-stone-900 transition-colors uppercase">{labels.actionButton}</a>

            <div className="flex items-center gap-1 pl-4 border-l border-stone-200">
              <button onClick={() => setLanguage("ja")} className={`rounded-full px-3 py-1.5 text-[9px] font-bold transition-all ${language === "ja" ? "bg-stone-900 text-white shadow-lg" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100"}`}>JA</button>
              <button onClick={() => setLanguage("en")} className={`rounded-full px-3 py-1.5 text-[9px] font-bold transition-all ${language === "en" ? "bg-stone-900 text-white shadow-lg" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100"}`}>EN</button>
            </div>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 border-b border-stone-200 bg-white p-8 shadow-2xl md:hidden"
          >
            <div className="grid gap-5">
              <Link href="/" className="flex items-center gap-3 py-2 font-bold text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                <Home className="h-5 w-5" /> {homeBackLabel}
              </Link>
              <a href="#about" className="py-2 text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a>
              <a href="#rooms" className="py-2 text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>{labels.roomsTitle}</a>
              <a href="#news" className="py-2 text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.news}</a>
              <a href="#info" className="py-2 text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>{labels.accessTitle}</a>
              <a href="#action" className="py-2 text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>{labels.actionButton}</a>
              <div className="flex gap-4 pt-6 border-t border-stone-100">
                <button onClick={() => { setLanguage("ja"); setIsMobileMenuOpen(false); }} className={`flex-1 rounded-xl py-4 text-sm font-bold ${language === "ja" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}>日本語</button>
                <button onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }} className={`flex-1 rounded-xl py-4 text-sm font-bold ${language === "en" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}>English</button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <section
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.45)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/80 font-bold mb-8">{labels.heroLabel}</p>
          <h1 className="text-4xl font-bold leading-tight md:text-7xl tracking-tight">
            {siteCatchCopy}
          </h1>
          <p className="mt-8 text-base text-white/90 md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">{siteDescription}</p>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="py-24 md:py-32 bg-[#FDFCFB]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] text-amber-700/80 uppercase mb-4">{t.aboutLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight leading-tight mb-8 font-serif">{labels.roomsTitle}</h2>
            <p className="text-base md:text-lg leading-relaxed text-stone-600 mb-8 italic">
              {fixedNotice}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-stone-500 font-medium">
              {siteDescription}
            </p>
          </div>
          <div className="glass-crystal-demo rounded-[3rem] p-10 md:p-14 shadow-2xl border border-stone-200/50 bg-white/40 backdrop-blur-2xl">
            <p className="text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase mb-4">{t.highlightsLabel}</p>
            <h3 className="text-xl font-bold text-stone-800 tracking-tight mb-6 leading-tight">{labels.roomsSubtitle}</h3>
            <p className="text-sm leading-relaxed text-stone-600 font-medium mb-8">{t.highlightsIntro}</p>
            <div className="grid gap-4">
              {t.serviceHighlights.map((item: string) => (
                <div key={item} className="flex items-center gap-4 text-xs font-bold text-stone-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/30" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Standard Plan Specific Features */}
      <motion.section id="service" className="py-24 md:py-32 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16">
            <p className="text-[10px] font-bold tracking-[0.4em] text-amber-700/80 uppercase mb-4">{t.sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight">{t.highlightsTitle}</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {t.featureItems.map((item: { title: string; description: string }, index: number) => {
              const Icon = [Globe, Search, Layers][index] || Globe
              return (
                <div key={item.title} className="group relative rounded-3xl border border-stone-100 bg-white p-10 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
                  <div className="mb-8 inline-flex p-4 rounded-2xl bg-amber-50 group-hover:bg-amber-100 transition-colors">
                    <Icon className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-800 mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-500 font-medium">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </motion.section>

      <motion.section id="rooms" className="py-24 md:py-32 bg-stone-50" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16">
            <p className="text-[10px] font-bold tracking-[0.4em] text-amber-700/80 uppercase mb-4">{t.pagesLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight">{t.pagesTitle}</h2>
            <p className="mt-6 text-stone-500 font-medium max-w-2xl">{t.pagesDescription}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {sections.map((item) => (
              <motion.div key={item.id} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-[2.5rem] border border-stone-200/50 bg-white shadow-lg transition-all duration-700 hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/80">{item.title}</p>
                    <h3 className="text-2xl font-bold tracking-tight">{item.description}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="news" className="py-24 md:py-32 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 flex items-end justify-between border-b border-stone-100 pb-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] text-amber-700/80 uppercase mb-2">{t.newsLabel}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight">{t.newsTitle}</h2>
            </div>
          </div>
          {newsError || restrictedNews.length === 0 ? (
            <div className="rounded-[2.5rem] border border-stone-100 bg-stone-50/50 p-20 text-center text-stone-400 font-medium italic">
              {t.newsEmpty}
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-3">
              {restrictedNews.map((item) => (
                <div key={item.id} className="group relative rounded-3xl border border-stone-100 bg-white p-10 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
                  <div className="text-[10px] font-bold text-amber-700/60 uppercase tracking-widest mb-6">{formatDate(item, language, t.updatedAtFallback)}</div>
                  <h3 className="text-xl font-bold text-stone-800 group-hover:text-amber-800 transition-colors mb-6 leading-tight">{item.title}</h3>
                  {item.summary && <p className="text-sm font-medium text-stone-500 leading-relaxed line-clamp-3">{item.summary}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.footer className="py-24 bg-stone-50 border-t border-stone-100" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12 text-stone-300 font-bold tracking-[0.3em] text-xs uppercase italic">{fixedNotice}</div>
          <p className="text-[10px] font-bold tracking-[0.5em] text-stone-400 uppercase">© 2026 Powered by Meraboco Standard Demo</p>
        </div>
      </motion.footer>

      <div className="pointer-events-none fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6">
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="rounded-full border border-amber-900/10 bg-white/95 px-8 py-4 text-xs font-bold text-amber-900 shadow-2xl backdrop-blur-2xl">
          {t.note}
        </motion.div>
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
  return "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80"
}
