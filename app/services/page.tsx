"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"

// 固定のサービスリンクマッピング
const serviceLinks = [
  "/services/web-production",
  "/services/system-development",
  "/services/ux-ui-design",
  "/services/digital-marketing",
  "/services/consulting",
  "/services/maintenance",
]

const serviceImages = [
  "/services/web-production-workspace.jpg",
  "/services/system-development-programming.jpg",
  "/services/ux-ui-design-process.jpg",
  "/services/digital-marketing-analytics.jpg",
  "/services/it-consulting-meeting.jpg",
  "/services/website-maintenance-monitoring.jpg",
]

export default function ServicesPage() {
  const { language, t } = useLanguage()
  const services = t("servicesPage.services") as Array<{ title: string; description: string }>
  const flowSteps = t("servicesPage.flow.steps") as Array<{ title: string; description: string }>

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader title={t("servicesPage.title")} description={t("servicesPage.description")} />

        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={serviceLinks[index] || "/services"}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={serviceImages[index] || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      {language === "ja" ? "詳しく見る" : "Learn more"}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t("servicesPage.flow.title")}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {flowSteps.map((step, index) => (
                  <div key={index} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "ja" ? "お気軽にご相談ください" : "Contact Us Today"}
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {language === "ja" 
                ? "プロジェクトのご相談やお見積りなど、お気軽にお問い合わせください。"
                : "Feel free to contact us for project consultations or quotes."}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              {language === "ja" ? "お問い合わせ" : "Contact Us"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
