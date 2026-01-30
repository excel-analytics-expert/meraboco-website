"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"

const works = [
  {
    id: "hotel-shiro",
    category: "WEB制作",
    categoryEn: "Web Production",
    title: "ホテルS社 公式Webサイト制作",
    titleEn: "Hotel S Official Website",
    image: "/hotel-shiro-website-preview.jpg",
    tags: ["ホテル", "Next.js", "SEO最適化"],
    tagsEn: ["Hotel", "Next.js", "SEO Optimization"],
    description: "船橋市のビジネスホテルの公式サイト。Google評価3.9獲得。",
    descriptionEn: "Official site for a business hotel in Funabashi. Google rating 3.9.",
  },
  {
    id: "corporate-renewal",
    category: "WEB制作",
    categoryEn: "Web Production",
    title: "製造業A社 コーポレートサイトリニューアル",
    titleEn: "Manufacturing Company A Corporate Renewal",
    image: "/modern-manufacturing-company-website-design.jpg",
    tags: ["コーポレートサイト", "Next.js", "レスポンシブ"],
    tagsEn: ["Corporate Site", "Next.js", "Responsive"],
    description: "老舗製造業のコーポレートサイトを最新技術でリニューアル。",
    descriptionEn: "Renewed a long-established manufacturer’s corporate site with modern tech.",
  },
  {
    id: "hotel-booking",
    category: "システム開発",
    categoryEn: "System Development",
    title: "ホテルB社 オンライン予約システム",
    titleEn: "Hotel B Online Booking System",
    image: "/hotel-online-booking-system-interface.jpg",
    tags: ["予約システム", "決済連携", "API"],
    tagsEn: ["Reservation System", "Payments", "API"],
    description: "宿泊予約からチェックインまで一元管理できるシステムを構築。",
    descriptionEn: "Built a system for unified management from booking to check-in.",
  },
  {
    id: "restaurant-ec",
    category: "EC構築",
    categoryEn: "E-commerce",
    title: "レストランC社 ECサイト",
    titleEn: "Restaurant C E-commerce Site",
    image: "/restaurant-ecommerce-website-design.jpg",
    tags: ["ECサイト", "Stripe", "CMS"],
    tagsEn: ["E-commerce", "Stripe", "CMS"],
    description: "飲食店のオンライン販売サイト。商品管理から決済まで対応。",
    descriptionEn: "Online sales site for a restaurant with product management and payments.",
  },
  {
    id: "clinic-crm",
    category: "システム開発",
    categoryEn: "System Development",
    title: "クリニックD様 顧客管理システム",
    titleEn: "Clinic D Customer Management System",
    image: "/clinic-customer-management-system-dashboard.jpg",
    tags: ["CRM", "予約管理", "カルテ管理"],
    tagsEn: ["CRM", "Reservations", "Medical Records"],
    description: "患者情報、予約、カルテを一元管理するクラウドシステム。",
    descriptionEn: "Cloud system for unified patient data, reservations, and records.",
  },
  {
    id: "fashion-brand",
    category: "WEB制作",
    categoryEn: "Web Production",
    title: "ファッションブランドE社 ブランドサイト",
    titleEn: "Fashion Brand E Website",
    image: "/fashion-brand-website-design.jpg",
    tags: ["ブランディング", "UX/UI", "アニメーション"],
    tagsEn: ["Branding", "UX/UI", "Animation"],
    description: "ブランドの世界観を表現した、ビジュアル重視のサイト。",
    descriptionEn: "A visual-first site expressing the brand’s world view.",
  },
  {
    id: "school-lms",
    category: "システム開発",
    categoryEn: "System Development",
    title: "教育機関F様 学習管理システム",
    titleEn: "Education F Learning Management System",
    image: "/online-learning-management-system-interface.jpg",
    tags: ["LMS", "オンライン学習", "動画配信"],
    tagsEn: ["LMS", "Online Learning", "Video Delivery"],
    description: "オンライン授業と学習進捗を管理する教育プラットフォーム。",
    descriptionEn: "Platform for managing online classes and learning progress.",
  },
]

export default function WorksClient() {
  const { t, language } = useLanguage()

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
                      alt={language === "ja" ? work.title : work.titleEn}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {language === "ja" ? work.category : work.categoryEn}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {language === "ja" ? work.title : work.titleEn}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                      {language === "ja" ? work.description : work.descriptionEn}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(language === "ja" ? work.tags : work.tagsEn).map((tag) => (
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
              {t("worksPage.cta.button")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
