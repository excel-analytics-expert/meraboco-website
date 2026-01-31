"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import type { MicroCmsSite } from "@/types/microcms"
import { Award, Globe, Layers, MapPin, Search, ShieldCheck, Sparkles, Home, Menu, X } from "lucide-react"
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

type ProDemoClientProps = {
  site: MicroCmsSite | null
  siteError: boolean
  news: MicroCmsNews[]
  newsError: boolean
}

type ProDemoSite = MicroCmsSite & {
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

export default function ProDemoClient(props: ProDemoClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center">Loading...</div>}>
      <ProDemoClientContent {...props} />
    </Suspense>
  )
}

function ProDemoClientContent({ site, siteError, news, newsError }: ProDemoClientProps) {
  const { language, translations, setLanguage } = useLanguage()
  const searchParams = useSearchParams()
  const urlIndustry = searchParams.get("industry")
  const t = translations[language].demos.pro
  const headerCopy = translations[language].header
  const featuresIntro = "featuresIntro" in t ? t.featuresIntro : ""
  const consultLabel = language === "ja" ? "ご相談はこちら" : "Contact Us"
  const homeBackLabel = language === "ja" ? "ホームに戻る" : "Back to Home"
  const fallbackSite = t.fallbackSite
  const dummyInfo = t.dummyInfo
  const displaySite = (site && !siteError ? site : fallbackSite) as ProDemoSite
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
    heroLabel: isJa ? "Premium Hotel Demo" : "Premium Hotel Demo",
    roomsTitle: isJa ? "客室のご案内" : "Rooms",
    roomsSubtitle: isJa ? "上質な寛ぎの空間" : "The definitive premium brand site",
    accessTitle: isJa ? "アクセス" : "Access",
    actionButton: isJa ? "ご予約" : "Reservations",
  }

  if (industryStr?.trim() === "飲食店") {
    labels.heroLabel = isJa ? "Premium Restaurant Demo" : "PREMIUM RESTAURANT DEMO"
    labels.roomsTitle = isJa ? "お品書き・コース" : "Menu & Courses"
    labels.roomsSubtitle = isJa ? "至福のひとときを" : "A blissful moment"
    labels.accessTitle = isJa ? "店舗情報" : "Shop Info"
    labels.actionButton = isJa ? "お席の予約" : "Table Reservation"
  } else if (industryStr?.trim() === "士業・オフィス") {
    labels.heroLabel = isJa ? "Premium Pro Service Demo" : "PREMIUM PRO SERVICE DEMO"
    labels.roomsTitle = isJa ? "業務内容・サービス" : "Services"
    labels.roomsSubtitle = isJa ? "確かな解決と信頼" : "Reliable solutions and trust"
    labels.accessTitle = isJa ? "事務所案内" : "Office Guide"
    labels.actionButton = isJa ? "無料相談・お問い合わせ" : "Free Consultation"
  }

  const fixedNotice = isJa ? "こちらはメラボコ・デモサイトです。" : "This is a Meraboco demo site."

  const sectionImages = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1454165833767-13143895e021?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1600&q=80",
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

      <nav className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 transition-all hover:bg-stone-900 md:hidden">
              <Home className="h-5 w-5 text-stone-600 transition-colors group-hover:text-white" />
            </Link>
            <div className="text-xl font-bold tracking-tight text-stone-900">{siteName}</div>
          </div>

          <div className="hidden items-center gap-7 text-[10px] font-bold tracking-[0.3em] text-stone-500 md:flex">
            <Link href="/" className="flex items-center gap-2 text-stone-900 hover:text-blue-600 transition-all uppercase">
              <Home className="h-4 w-4" />
              {homeBackLabel}
            </Link>
            <a href="#about" className="hover:text-stone-900 transition-all uppercase">{t.nav.about}</a>
            <a href="#rooms" className="hover:text-stone-900 transition-all uppercase">{labels.roomsTitle}</a>
            <a href="#news" className="hover:text-stone-900 transition-all uppercase">{t.nav.news}</a>
            <a href="#info" className="hover:text-stone-900 transition-all uppercase">{labels.accessTitle}</a>
            <a href="#action" className="hover:text-stone-900 transition-all uppercase">{labels.actionButton}</a>

            <div className="flex items-center gap-1 pl-4 border-l border-stone-200 ml-2">
              <button onClick={() => setLanguage("ja")} className={`rounded-lg px-3 py-2 text-[9px] font-bold transition-all ${language === "ja" ? "bg-stone-900 text-white shadow-xl" : "text-stone-400 hover:text-stone-600 hover:bg-stone-50"}`}>JA</button>
              <button onClick={() => setLanguage("en")} className={`rounded-lg px-3 py-2 text-[9px] font-bold transition-all ${language === "en" ? "bg-stone-900 text-white shadow-xl" : "text-stone-400 hover:text-stone-600 hover:bg-stone-50"}`}>EN</button>
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-0 right-0 border-b border-stone-200 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:hidden rounded-b-[2rem]"
          >
            <div className="grid gap-6">
              <Link href="/" className="flex items-center gap-4 py-3 font-bold text-blue-600 text-lg border-b border-stone-50" onClick={() => setIsMobileMenuOpen(false)}>
                <Home className="h-6 w-6" /> {homeBackLabel}
              </Link>
              <a href="#about" className="py-2 text-xl font-bold tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a>
              <a href="#rooms" className="py-2 text-xl font-bold tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>{labels.roomsTitle}</a>
              <a href="#news" className="py-2 text-xl font-bold tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.news}</a>
              <a href="#info" className="py-2 text-xl font-bold tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>{labels.accessTitle}</a>
              <a href="#action" className="py-2 text-xl font-bold tracking-tight" onClick={() => setIsMobileMenuOpen(false)}>{labels.actionButton}</a>
              <div className="flex gap-4 pt-6 mt-4 border-t border-stone-100">
                <button onClick={() => { setLanguage("ja"); setIsMobileMenuOpen(false); }} className={`flex-1 rounded-2xl py-5 text-sm font-bold ${language === "ja" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}>日本語</button>
                <button onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }} className={`flex-1 rounded-2xl py-5 text-sm font-bold ${language === "en" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500"}`}>English</button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <section
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 16, 26, 0.55), rgba(10, 16, 26, 0.45)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.6em] text-white/80 font-bold mb-8">
            <Sparkles className="h-4 w-4 text-amber-400" />
            {labels.heroLabel}
          </div>
          <h1 className="text-4xl md:text-8xl font-bold leading-[1.1] tracking-tighter">
            {siteCatchCopy}
          </h1>
          <p className="mt-10 text-base text-white/90 md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">{siteDescription}</p>
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
        <div className="mx-auto grid max-w-6xl gap-20 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] font-bold tracking-[0.5em] text-amber-800/80 uppercase mb-6">{t.aboutLabel}</p>
            <h2 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter leading-tight mb-10 font-serif">{labels.roomsTitle}</h2>
            <p className="text-xl md:text-2xl leading-relaxed text-stone-600 mb-10 font-bold italic border-l-4 border-amber-500 pl-8">
              {fixedNotice}
            </p>
            <p className="text-lg leading-relaxed text-stone-500 font-medium">
              {siteDescription}
            </p>
          </div>
          <div className="glass-crystal-demo rounded-[4rem] p-12 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-stone-200/50 bg-white/30 backdrop-blur-3xl">
            <p className="text-[10px] font-bold tracking-[0.4em] text-amber-500 uppercase mb-6">{t.featuresLabel}</p>
            <h3 className="text-2xl font-bold text-stone-900 tracking-tight leading-tight mb-8">{labels.roomsSubtitle}</h3>
            <p className="text-base leading-relaxed text-stone-600 font-medium mb-10">{t.aboutText}</p>
            <div className="grid gap-6">
              {t.aboutBullets.map((item: string) => (
                <div key={item} className="flex items-center gap-5 text-sm font-bold text-stone-800">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="service" className="py-24 md:py-40 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20">
            <p className="text-[10px] font-bold tracking-[0.5em] text-amber-800/80 uppercase mb-4">{t.featuresLabel}</p>
            <h2 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter">{t.featuresTitle}</h2>
            <p className="mt-8 text-xl text-stone-500 font-medium max-w-3xl leading-relaxed">{featuresIntro}</p>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            {t.featureItems.map((item: { title: string; description: string }, index: number) => {
              const Icon = [Globe, Search, Layers, ShieldCheck][index] || Globe
              return (
                <div key={item.title} className="group relative rounded-[3rem] border border-stone-100 bg-white p-12 shadow-sm transition-all duration-1000 hover:shadow-2xl hover:-translate-y-3">
                  <div className="mb-10 inline-flex p-5 rounded-3xl bg-amber-50 group-hover:bg-amber-100 transition-all">
                    <Icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-6 tracking-tight">{item.title}</h3>
                  <p className="text-base leading-relaxed text-stone-500 font-medium">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </motion.section>

      <motion.section id="rooms" className="py-24 md:py-40 bg-[#FDFCFB]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-amber-800/80 mb-6">
                <Award className="h-6 w-6" />
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase">{t.pagesLabel}</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tighter leading-tight">{t.pagesTitle}</h2>
            </div>
            <p className="text-lg text-stone-500 font-medium max-w-md">{t.pagesDescription}</p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {sections.map((item) => (
              <motion.div key={item.id} whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[3.5rem] bg-white shadow-2xl transition-all duration-1000">
                <div className="relative h-[450px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-white/70">{item.title}</p>
                    <h3 className="text-3xl font-bold tracking-tight leading-tight">{item.description}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.footer className="py-24 bg-stone-900 text-white" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-16 text-white/30 font-bold tracking-[0.5em] text-sm uppercase italic">{fixedNotice}</div>
          <div className="h-[1px] w-20 bg-amber-500/50 mx-auto mb-16" />
          <p className="text-[10px] font-bold tracking-[0.6em] text-white/40 uppercase">© 2026 Powered by Meraboco Pro Portfolio</p>
        </div>
      </motion.footer>

      <div className="pointer-events-none fixed bottom-10 left-0 right-0 z-50 flex justify-center px-6">
        <motion.div initial={{ y: 150 }} animate={{ y: 0 }} className="rounded-full border border-white/10 bg-stone-900/90 px-10 py-5 text-[10px] font-bold text-white shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl tracking-widest">
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

function getHeroImageUrl(site: ProDemoSite) {
  if (typeof site.heroImage === "string") return site.heroImage
  if (typeof site.hero_image === "string") return site.hero_image
  if (typeof site.heroImageUrl === "string") return site.heroImageUrl
  if (site.heroImage?.url) return site.heroImage.url
  if (site.hero_image?.url) return site.hero_image.url
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
}
