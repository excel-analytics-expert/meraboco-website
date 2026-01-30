"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"

export default function CommerceClient() {
  const { language, translations } = useLanguage()
  const isJa = language === "ja"
  const t = translations[language].commercePage
  const makeTextImage = (text: string, width: number) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
  <rect width="100%" height="100%" fill="transparent"/>
  <text x="0" y="19" fill="#1c1917" font-size="16" font-family="Noto Sans JP, Arial, sans-serif">${text}</text>
</svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  const protectedFields: Record<string, { src: string; width: number; alt: string }> = {
    販売事業者: {
      src: makeTextImage("メラボコ", 140),
      width: 140,
      alt: "メラボコ",
    },
    運営責任者: {
      src: makeTextImage("栗林 加奈子", 180),
      width: 180,
      alt: "栗林 加奈子",
    },
    所在地: {
      src: makeTextImage("東京都港区北青山1-3-3三橋ビル3F", 420),
      width: 420,
      alt: "東京都港区北青山1-3-3三橋ビル3F",
    },
    電話番号: {
      src: makeTextImage("050-1793-1290", 180),
      width: 180,
      alt: "050-1793-1290",
    },
    Seller: {
      src: makeTextImage("Meraboco", 140),
      width: 140,
      alt: "Meraboco",
    },
    "Responsible Manager": {
      src: makeTextImage("Kanako Kuribayashi", 220),
      width: 220,
      alt: "Kanako Kuribayashi",
    },
    Address: {
      src: makeTextImage("1-3-3 Kita-Aoyama, Minato-ku, Tokyo, Mitsuhashi Bldg 3F", 520),
      width: 520,
      alt: "1-3-3 Kita-Aoyama, Minato-ku, Tokyo, Mitsuhashi Bldg 3F",
    },
    Phone: {
      src: makeTextImage("050-1793-1290", 180),
      width: 180,
      alt: "050-1793-1290",
    },
  }

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader title={t.title} description={t.description} />
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              {t.sections.map((section: { title: string; body: string }) => {
                const protectedField = protectedFields[section.title]
                return (
                  <div key={section.title}>
                    <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                    <p className="leading-relaxed mb-8">
                      {protectedField ? (
                        <span className="inline-flex items-center">
                          <img
                            src={protectedField.src}
                            width={protectedField.width}
                            height={28}
                            alt={protectedField.alt}
                            className="h-7 w-auto"
                          />
                        </span>
                      ) : (
                        section.body
                      )}
                    </p>
                  </div>
                )
              })}
              <h2 className="text-3xl font-bold mb-6">
                {isJa ? "重要事項（決済と辞退ルール）" : "Important Notices (Payment & Withdrawal)"}
              </h2>
              <p className="leading-relaxed mb-4">
                {isJa
                  ? "スマートプランは即時決済のみとし、デジタル資産の性質上、返金は不可とします。"
                  : "Smart plans are immediate-payment only, and refunds are not available due to the nature of digital assets."}
              </p>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "オーダーメイドプランは、セキュリティ保持費用により見積後から毎日料金が加算され、2週間で自動辞退となります。"
                  : "For custom plans, daily fees accrue after an estimate due to security holding costs, and the request is automatically withdrawn after two weeks."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
