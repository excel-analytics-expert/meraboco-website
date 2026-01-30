"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function DigitalMarketingClient() {
  const { language, translations } = useLanguage()
  const t = translations[language].servicePages.digitalMarketing

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-16 md:py-24">
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
              <h2 className="text-3xl font-bold mb-12 text-center">{t.servicesTitle}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {t.services.map(
                  (service: { title: string; description: string; icon: string; items: string[] }) => (
                    <div
                      key={service.title}
                      className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-400 transition-colors"
                    >
                      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <i className={`fas ${service.icon} text-orange-600`}></i>
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {service.items.map((item) => (
                          <li key={item}>・{item}</li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.reasonsTitle}</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {t.reasons.map((reason: { title: string; description: string }) => (
                <div key={reason.title} className="bg-white border-l-4 border-orange-600 p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.flowTitle}</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {t.flowSteps.map((step: { title: string; description: string }, index: number) => (
                <div key={step.title} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
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
        </section>

        <section className="bg-orange-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t.ctaTitle}</h2>
            <p className="text-lg mb-8 text-orange-100">{t.ctaSubtitle}</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-orange-50 transition-colors"
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
