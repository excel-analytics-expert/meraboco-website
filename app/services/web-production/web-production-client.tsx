"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function WebProductionClient() {
  const { language, translations } = useLanguage()
  const t = translations[language].servicePages.webProduction

  const colorClasses = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">
              {t.title}
            </h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              {t.headline?.map((line: string, index: number) => (
                <span key={line}>
                  {line}
                  {index === 0 && <br />}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">{t.challengesTitle}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {t.challenges.map((item: string) => (
                  <div key={item} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <i className="fas fa-check-circle text-blue-600"></i>
                      {item}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.servicesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.services.map((service: { title: string; description: string; icon: string; color: string }) => {
                const colors = colorClasses[service.color as keyof typeof colorClasses]
                return (
                <div key={service.title} className="bg-white rounded-lg p-8 shadow-md">
                  <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`fas ${service.icon} text-3xl ${colors.text}`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center">{service.description}</p>
                </div>
              )})}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.reasonsTitle}</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {t.reasons.map((reason: { title: string; description: string }, index: number) => (
                <div key={reason.title} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t.ctaTitle}</h2>
            <p className="text-lg mb-8 text-blue-100">{t.ctaSubtitle}</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              {t.ctaButton}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
