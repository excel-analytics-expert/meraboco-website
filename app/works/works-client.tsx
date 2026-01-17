"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"

const worksJa = [
  {
    id: "hotel-shiro",
    category: "WEB制作",
    title: "ホテルS社 公式Webサイト制作",
    image: "/hotel-shiro-website-preview.jpg",
    tags: ["ホテル", "Next.js", "SEO最適化"],
    description: "船橋市のビジネスホテルの公式サイト。Google評価3.9獲得。",
  },
  {
    id: "corporate-renewal",
    category: "WEB制作",
    title: "製造業A社 コーポレートサイトリニューアル",
    image: "/modern-manufacturing-company-website-design.jpg",
    tags: ["コーポレートサイト", "Next.js", "レスポンシブ"],
    description: "老舗製造業のコーポレートサイトを最新技術でリニューアル。",
  },
  {
    id: "hotel-booking",
    category: "システム開発",
    title: "ホテルB社 オンライン予約システム",
    image: "/hotel-online-booking-system-interface.jpg",
    tags: ["予約システム", "決済連携", "API"],
    description: "宿泊予約からチェックインまで一元管理できるシステムを構築。",
  },
  {
    id: "restaurant-ec",
    category: "EC構築",
    title: "レストランC社 ECサイト",
    image: "/restaurant-ecommerce-website-design.jpg",
    tags: ["ECサイト", "Stripe", "CMS"],
    description: "飲食店のオンライン販売サイト。商品管理から決済まで対応。",
  },
  {
    id: "clinic-crm",
    category: "システム開発",
    title: "クリニックD様 顧客管理システム",
    image: "/clinic-customer-management-system-dashboard.jpg",
    tags: ["CRM", "予約管理", "カルテ管理"],
    description: "患者情報、予約、カルテを一元管理するクラウドシステム。",
  },
  {
    id: "fashion-brand",
    category: "WEB制作",
    title: "ファッションブランドE社 ブランドサイト",
    image: "/fashion-brand-website-design.jpg",
    tags: ["ブランディング", "UX/UI", "アニメーション"],
    description: "ブランドの世界観を表現した、ビジュアル重視のサイト。",
  },
  {
    id: "school-lms",
    category: "システム開発",
    title: "教育機関F様 学習管理システム",
    image: "/online-learning-management-system-interface.jpg",
    tags: ["LMS", "オンライン学習", "動画配信"],
    description: "オンライン授業と学習進捗を管理する教育プラットフォーム。",
  },
]

const worksEn = [
  {
    id: "hotel-shiro",
    category: "Web Production",
    title: "Hotel S Official Website",
    image: "/hotel-shiro-website-preview.jpg",
    tags: ["Hotel", "Next.js", "SEO"],
    description: "Official website for a business hotel in Funabashi. Achieved 3.9 Google rating.",
  },
  {
    id: "corporate-renewal",
    category: "Web Production",
    title: "Manufacturing Company A Corporate Site Renewal",
    image: "/modern-manufacturing-company-website-design.jpg",
    tags: ["Corporate Site", "Next.js", "Responsive"],
    description: "Renewed a long-established manufacturing company's site with latest technology.",
  },
  {
    id: "hotel-booking",
    category: "System Development",
    title: "Hotel B Online Booking System",
    image: "/hotel-online-booking-system-interface.jpg",
    tags: ["Booking System", "Payment", "API"],
    description: "Built a system to manage from reservation to check-in.",
  },
  {
    id: "restaurant-ec",
    category: "E-Commerce",
    title: "Restaurant C E-Commerce Site",
    image: "/restaurant-ecommerce-website-design.jpg",
    tags: ["E-Commerce", "Stripe", "CMS"],
    description: "Online store for restaurant. Supports product management and payments.",
  },
  {
    id: "clinic-crm",
    category: "System Development",
    title: "Clinic D Customer Management System",
    image: "/clinic-customer-management-system-dashboard.jpg",
    tags: ["CRM", "Booking", "Medical Records"],
    description: "Cloud system for unified management of patient info, bookings, and records.",
  },
  {
    id: "fashion-brand",
    category: "Web Production",
    title: "Fashion Brand E Brand Site",
    image: "/fashion-brand-website-design.jpg",
    tags: ["Branding", "UX/UI", "Animation"],
    description: "Visual-focused site expressing the brand's worldview.",
  },
  {
    id: "school-lms",
    category: "System Development",
    title: "Educational Institution F Learning Management System",
    image: "/online-learning-management-system-interface.jpg",
    tags: ["LMS", "Online Learning", "Video Streaming"],
    description: "Educational platform for managing online classes and learning progress.",
  },
]

export default function WorksClient() {
  const { language, t } = useLanguage()

  const works = language === "ja" ? worksJa : worksEn
  const ctaButton = language === "ja" ? "お問い合わせ" : "Contact Us"

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader title={t("worksPage.title")} description={t("worksPage.description")} />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {works.map((work) => (
                <Link
                  key={work.id}
                  href={`/works/${work.id}`}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={work.image || "/placeholder.svg"}
                      alt={work.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {work.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{work.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">{work.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t("worksPage.cta.title")}</h2>
            <p className="text-lg mb-8 text-blue-100">{t("worksPage.cta.subtitle")}</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              {ctaButton}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}