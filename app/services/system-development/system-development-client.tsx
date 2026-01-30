"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function SystemDevelopmentClient() {
  const { language, translations } = useLanguage()
  const t = translations[language].servicePages.systemDevelopment

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 md:py-24">
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
              <h2 className="text-3xl font-bold mb-12 text-center">{t.achievementsTitle}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {t.achievements.map((item: { title: string; description: string; icon: string }) => (
                  <div
                    key={item.title}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <i className={`fas ${item.icon} text-green-600`}></i>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.stackTitle}</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {t.stacks.map((stack: { title: string; icon: string; items: string[] }) => (
                  <div key={stack.title}>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <i className={`fas ${stack.icon} text-green-600`}></i>
                      {stack.title}
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      {stack.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.featuresTitle}</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {t.features.map((feature: { title: string; description: string }) => (
                <div key={feature.title} className="bg-white border-l-4 border-green-600 p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{t.ctaTitle}</h2>
            <p className="text-lg mb-8 text-green-100">{t.ctaSubtitle}</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-colors"
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
