"use client"

import { motion, type Variants } from "framer-motion"
import type { MicroCmsSite } from "@/types/microcms"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { Home, Menu, X } from "lucide-react"

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

export default function HotelDemoClient(props: HotelDemoClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center">Loading...</div>}>
      <HotelDemoClientContent {...props} />
    </Suspense>
  )
}

function HotelDemoClientContent({ site, siteError, news, newsError }: HotelDemoClientProps) {
  const { language, translations, setLanguage } = useLanguage()
  const searchParams = useSearchParams()
  const urlIndustry = searchParams.get("industry")
  const t = translations[language].demos.hotel
  const headerCopy = translations[language].header
  const consultLabel = language === "ja" ? "ご相談はこちら" : "Contact Us"
  const homeBackLabel = language === "ja" ? "ホームに戻る" : "Back to Home"
  const fallbackSite = t.fallbackSite
  const dummyInfo = t.dummyInfo
  const displaySite = (site && !siteError ? site : fallbackSite) as HotelDemoSite
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
    heroLabel: isJa ? "Hotel & Ryokan" : "Hotel & Ryokan",
    roomsTitle: isJa ? "客室のご案内" : "Rooms",
    roomsSubtitle: isJa ? "上質な寛ぎの空間" : "A stay that stays in memory",
    accessTitle: isJa ? "アクセス" : "Access",
    actionButton: isJa ? "ご予約" : "Reservations",
  }

  if (industryStr?.trim() === "飲食店") {
    labels.heroLabel = isJa ? "Restaurant" : "RESTAURANT"
    labels.roomsTitle = isJa ? "お品書き・コース" : "Menu & Courses"
    labels.roomsSubtitle = isJa ? "至福のひとときを" : "A blissful moment"
    labels.accessTitle = isJa ? "店舗情報" : "Shop Info"
    labels.actionButton = isJa ? "お席の予約" : "Table Reservation"
  } else if (industryStr?.trim() === "士業・オフィス") {
    labels.heroLabel = isJa ? "Professional Service" : "PROFESSIONAL SERVICE"
    labels.roomsTitle = isJa ? "業務内容・サービス" : "Services"
    labels.roomsSubtitle = isJa ? "確かな解決と信頼" : "Reliable solutions and trust"
    labels.accessTitle = isJa ? "事務所案内" : "Office Guide"
    labels.actionButton = isJa ? "無料相談・お問い合わせ" : "Free Consultation"
  }

  const restrictedNews = news.slice(0, 1)
  const fixedNotice = isJa ? "こちらはメラボコ・デモサイトです。" : "This is a Meraboco demo site."

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

          <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
            <Link href="/" className="flex items-center gap-2 text-stone-900 hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              {homeBackLabel}
            </Link>
            <a href="#about" className="hover:text-stone-900 transition-colors">{labels.roomsTitle}</a>
            <a href="#news" className="hover:text-stone-900 transition-colors">{t.nav.news}</a>
            <a href="#info" className="hover:text-stone-900 transition-colors">{labels.accessTitle}</a>
            <a href="#action" className="hover:text-stone-900 transition-colors">{labels.actionButton}</a>

            <div className="flex items-center gap-1 pl-4 border-l border-stone-200">
              <button onClick={() => setLanguage("ja")} className={`rounded-full px-3 py-1.5 text-[10px] font-bold transition-all ${language === "ja" ? "bg-stone-900 text-white shadow-lg" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100"}`}>JA</button>
              <button onClick={() => setLanguage("en")} className={`rounded-full px-3 py-1.5 text-[10px] font-bold transition-all ${language === "en" ? "bg-stone-900 text-white shadow-lg" : "text-stone-400 hover:text-stone-600 hover:bg-stone-100"}`}>EN</button>
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
            className="absolute left-0 right-0 border-b border-stone-200 bg-white p-6 shadow-2xl md:hidden"
          >
            <div className="grid gap-4">
              <Link href="/" className="flex items-center gap-3 py-2 font-bold text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                <Home className="h-5 w-5" /> {homeBackLabel}
              </Link>
              <a href="#about" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{labels.roomsTitle}</a>
              <a href="#news" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.news}</a>
              <a href="#info" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{labels.accessTitle}</a>
              <a href="#action" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>{labels.actionButton}</a>
              <div className="flex gap-4 pt-4 border-t border-stone-100">
                <button onClick={() => { setLanguage("ja"); setIsMobileMenuOpen(false); }} className={`flex-1 rounded-xl py-3 text-sm font-bold ${language === "ja" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}>日本語</button>
                <button onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }} className={`flex-1 rounded-xl py-3 text-sm font-bold ${language === "en" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}>English</button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <section
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.4)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/80 font-bold mb-6">{labels.heroLabel}</p>
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
            <p className="text-[10px] font-bold tracking-[0.3em] text-amber-700/80 uppercase mb-4">{t.aboutLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight leading-tight mb-8">{labels.roomsTitle}</h2>
            <p className="text-base md:text-lg leading-relaxed text-stone-600 font-medium">
              {siteDescription}
            </p>
          </div>
          <div className="glass-crystal-demo rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-stone-200/50 bg-white/50 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-stone-800 tracking-tight mb-6">{labels.roomsSubtitle}</h3>
            <p className="text-base leading-relaxed text-stone-600 font-bold mb-8 italic">
              {fixedNotice}
            </p>
            <div className="grid gap-5">
              {t.aboutBullets.map((item: string) => (
                <div key={item} className="flex items-center gap-4 text-sm font-bold text-stone-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/30" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section
        id="news"
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-end justify-between border-b border-stone-100 pb-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] text-amber-700/80 uppercase mb-2">{t.newsLabel}</p>
              <h2 className="text-3xl font-bold text-stone-800 tracking-tight">{t.newsTitle}</h2>
            </div>
          </div>
          {newsError || restrictedNews.length === 0 ? (
            <div className="rounded-3xl border border-stone-100 bg-stone-50/50 p-12 text-center text-stone-400 font-medium italic">
              {t.newsEmpty}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {restrictedNews.map((item) => (
                <div key={item.id} className="group relative rounded-3xl border border-stone-100 bg-white p-8 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2">
                  <div className="text-[10px] font-bold text-amber-700/60 uppercase tracking-widest mb-4">{formatDate(item, language, t.updatedAtFallback)}</div>
                  <h3 className="text-lg font-bold text-stone-800 group-hover:text-amber-800 transition-colors mb-4 leading-tight">{item.title}</h3>
                  {item.summary && <p className="text-sm font-medium text-stone-500 leading-relaxed">{item.summary}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        id="info"
        className="py-24 md:py-32 bg-[#FDFCFB]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="glass-crystal-demo rounded-[2.5rem] p-10 md:p-14 shadow-2xl bg-white/60 backdrop-blur-xl">
            <p className="text-[10px] font-bold tracking-[0.3em] text-amber-700/80 uppercase mb-4">{t.infoLabel}</p>
            <h2 className="text-3xl font-bold text-stone-800 tracking-tight mb-10">{labels.accessTitle}</h2>
            <div className="space-y-8">
              <div className="pl-6 border-l-2 border-amber-500/20">
                <p className="text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-2">{t.infoLabels.address}</p>
                <p className="text-stone-800 font-bold">{displaySite.address || dummyInfo.address}</p>
              </div>
              <div className="pl-6 border-l-2 border-amber-500/20">
                <p className="text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-2">{t.infoLabels.phone}</p>
                <p className="text-stone-800 font-bold">{displaySite.phone || dummyInfo.phone}</p>
              </div>
              <div className="pl-6 border-l-2 border-amber-500/20">
                <p className="text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-2">{t.infoLabels.hours}</p>
                <p className="text-stone-800 font-bold">{displaySite.hours || dummyInfo.hours}</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] border border-stone-200/50 bg-white shadow-2xl">
            <iframe title="Map" src={mapUrl} className="h-[400px] w-full border-0 grayscale hover:grayscale-0 transition-all duration-1000" loading="lazy" />
          </div>
        </div>
      </motion.section>

      <motion.section id="action" className="py-24 md:py-32 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[10px] font-bold tracking-[0.4em] text-amber-700/80 mb-6 uppercase">{t.actionLabel}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 tracking-tight mb-8">{labels.actionButton}</h2>
          <p className="text-lg text-stone-600 font-medium mb-12 max-w-xl mx-auto leading-relaxed">{t.actionText}</p>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <motion.a href={`tel:${dummyInfo.phone}`} whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }} className="w-full md:w-auto rounded-full bg-amber-900 px-10 py-5 text-sm font-bold text-white shadow-xl hover:bg-amber-800 transition-all tracking-widest">{t.actionButtons.call}</motion.a>
            <motion.a href="https://line.me/R/ti/p/@meraboco" target="_blank" whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }} className="w-full md:w-auto rounded-full border border-stone-200 bg-white px-10 py-5 text-sm font-bold text-stone-800 shadow-xl hover:border-amber-800/30 transition-all tracking-widest">{t.actionButtons.line}</motion.a>
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }} className="w-full md:w-auto">
              <Link href="/contact" className="flex items-center justify-center rounded-full bg-stone-900 px-10 py-5 text-sm font-bold text-white shadow-xl hover:bg-stone-800 transition-all tracking-widest">{consultLabel}</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <footer className="py-20 bg-stone-50 border-t border-stone-100">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8 text-stone-300 font-bold tracking-[0.2em] text-[10px] uppercase italic">{fixedNotice}</div>
          <p className="text-[10px] font-bold tracking-[0.5em] text-stone-400 uppercase">© 2026 Powered by Meraboco</p>
        </div>
      </footer>

      <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6">
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="rounded-full border border-amber-900/10 bg-white/95 px-6 py-3 text-[10px] font-bold text-amber-900 shadow-2xl backdrop-blur-xl">
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

function getHeroImageUrl(site: HotelDemoSite) {
  if (typeof site.heroImage === "string") return site.heroImage
  if (typeof site.hero_image === "string") return site.hero_image
  if (typeof site.heroImageUrl === "string") return site.heroImageUrl
  if (site.heroImage?.url) return site.heroImage.url
  if (site.hero_image?.url) return site.hero_image.url
  return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
}
