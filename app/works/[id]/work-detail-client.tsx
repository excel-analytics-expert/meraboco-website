"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

type SeoMetric = {
  label: string
  labelEn?: string
  value: string
  status: "excellent" | "good" | "average"
}

type WorkDetail = {
  category: string
  categoryEn?: string
  title: string
  titleEn?: string
  client: string
  clientEn?: string
  period: string
  periodEn?: string
  image: string
  description: string
  descriptionEn?: string
  challenge: string
  challengeEn?: string
  solution: string
  solutionEn?: string
  result: string[]
  resultEn?: string[]
  technologies: string[]
  technologiesEn?: string[]
  url?: string
  googleRating?: number
  googleReviews?: number
  seoMetrics?: SeoMetric[]
}

type WorkDetailClientProps = {
  work: WorkDetail
}

export default function WorkDetailClient({ work }: WorkDetailClientProps) {
  const { language, translations } = useLanguage()
  const isJa = language === "ja"
  const t = translations[language].workDetail

  const statusLabel = (status: SeoMetric["status"]) => {
    const labels = t.statusLabels || {}
    return labels[status] || status
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {isJa ? work.category : work.categoryEn ?? work.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                {isJa ? work.title : work.titleEn ?? work.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div>
                  <span className="font-semibold">{t.clientLabel}:</span>{" "}
                  {isJa ? work.client : work.clientEn ?? work.client}
                </div>
                <div>
                  <span className="font-semibold">{t.periodLabel}:</span>{" "}
                  {isJa ? work.period : work.periodEn ?? work.period}
                </div>
              </div>
              {work.googleRating && (
                <div className="mt-6 flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-yellow-500">{work.googleRating}</span>
                    <div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < Math.floor(work.googleRating!) ? "text-yellow-500" : "text-gray-300"}`}
                          ></i>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        {t.googleRatingLabel} ({work.googleReviews}{isJa ? "件" : ""})
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl mb-16">
                <Image
                  src={work.image || "/placeholder.svg"}
                  alt={isJa ? work.title : work.titleEn ?? work.title}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>

              {work.seoMetrics && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-6">{t.siteScores}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {work.seoMetrics.map((metric, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg border-l-4 ${
                          metric.status === "excellent"
                            ? "bg-green-50 border-green-600"
                            : metric.status === "good"
                              ? "bg-blue-50 border-blue-600"
                              : "bg-yellow-50 border-yellow-600"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-800">
                            {isJa ? metric.label : metric.labelEn ?? metric.label}
                          </span>
                          <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`text-sm font-semibold ${
                              metric.status === "excellent"
                                ? "text-green-600"
                                : metric.status === "good"
                                  ? "text-blue-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {statusLabel(metric.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4">{t.scoresNote}</p>
                </div>
              )}

              <div className="prose prose-lg max-w-none mb-16">
                <h2 className="text-3xl font-bold mb-4">{t.overview}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {isJa ? work.description : work.descriptionEn ?? work.description}
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{t.challenges}</h2>
                <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {isJa ? work.challenge : work.challengeEn ?? work.challenge}
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{t.solutions}</h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {isJa ? work.solution : work.solutionEn ?? work.solution}
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{t.results}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {(isJa ? work.result : work.resultEn ?? work.result).map((item, index) => (
                    <div key={index} className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                      <p className="font-semibold text-gray-800 flex items-start gap-2">
                        <i className="fas fa-check-circle text-green-600 mt-1"></i>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">{t.technologies}</h2>
                <div className="flex flex-wrap gap-3">
                  {(isJa ? work.technologies : work.technologiesEn ?? work.technologies).map((tech) => (
                    <span key={tech} className="bg-gray-800 text-white px-4 py-2 rounded-full font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {work.url && (
                <div className="text-center mb-16">
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    {t.visitSite} <i className="fas fa-external-link-alt ml-2"></i>
                  </a>
                </div>
              )}

              <div className="border-t pt-8">
                <Link href="/works" className="text-blue-600 hover:underline font-semibold flex items-center gap-2">
                  <i className="fas fa-arrow-left"></i>
                  {t.backToWorks}
                </Link>
              </div>
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
