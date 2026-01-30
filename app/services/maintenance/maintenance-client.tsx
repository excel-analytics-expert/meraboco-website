"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const colorClasses = {
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
}

export default function MaintenanceClient() {
  const { language, translations } = useLanguage()
  const t = translations[language].servicePages.maintenance

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">{t.title}</h1>
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
              <h2 className="text-3xl font-bold mb-12 text-center">{t.importanceTitle}</h2>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-red-900">{t.importanceCardTitle}</h3>
                <p className="text-gray-700 leading-relaxed">{t.importanceDescription}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.servicesTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.services.map(
                (service: { title: string; description: string; icon: string; color: string }) => {
                  const colors = colorClasses[service.color as keyof typeof colorClasses]
                  return (
                    <div key={service.title} className="bg-white rounded-lg p-8 shadow-md">
                      <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <i className={`fas ${service.icon} text-3xl ${colors.text}`}></i>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-center">{service.description}</p>
                    </div>
                  )
                },
              )}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">{t.planTitle}</h2>
            <p className="text-center text-gray-600 mb-10">{t.planIntro}</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.plans.map((plan: { title: string; price: string; description: string }) => (
                <div key={plan.title} className="bg-white rounded-lg p-6 shadow-md text-center">
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-2xl font-semibold text-indigo-700 mb-3">{plan.price}</p>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t.ctaTitle}</h2>
            <p className="text-lg mb-8 text-indigo-100">{t.ctaSubtitle}</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
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
