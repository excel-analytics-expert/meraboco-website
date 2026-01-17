"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatedText } from "./animated-text"
import { useLanguage } from "@/contexts/language-context"

const works = [
  {
    id: "hotel-shiro",
    title: "ホテルS社様",
    titleEn: "Hotel S Company",
    subtitle: "公式Webサイト制作",
    subtitleEn: "Official Website Development",
    description: "インバウンド対応として多言語サイトを制作。海外からの直接予約の獲得を可能にしました。",
    descriptionEn: "Created a multilingual site for inbound tourism support, enabling direct bookings from overseas.",
    image: "/hotel-shiro-website-preview.jpg",
  },
  {
    id: "corporate-renewal",
    title: "製造業A社様",
    titleEn: "Manufacturing Company A",
    subtitle: "コーポレートサイトリニューアル",
    subtitleEn: "Corporate Site Renewal",
    description: "老舗製造業のコーポレートサイトを最新技術で全面リニューアル。SEO対策により問い合わせ数が大幅増加。",
    descriptionEn:
      "Complete renewal of a traditional manufacturing company's corporate site with latest technology. Significant increase in inquiries through SEO optimization.",
    image: "/modern-manufacturing-company-website-design.jpg",
  },
  {
    id: "hotel-booking",
    title: "ホテルB社様",
    titleEn: "Hotel B Company",
    subtitle: "オンライン予約システム",
    subtitleEn: "Online Booking System",
    description: "宿泊予約からチェックインまで一元管理できるクラウドシステムを開発。業務効率が70%向上。",
    descriptionEn:
      "Developed a cloud system for unified management from booking to check-in. 70% improvement in operational efficiency.",
    image: "/hotel-online-booking-system-interface.jpg",
  },
]

export default function Works() {
  const { language, translations } = useLanguage()
  const worksData = translations[language].works

  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headingRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(headingRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        },
        { threshold: 0.2 },
      )
      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section
      id="works"
      className="py-32 md:py-40 relative bg-gradient-to-b from-gray-50 to-white mb-24"
      style={{ isolation: "isolate" }}
    >
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent inline-block">
              {isHeadingVisible && (
                <AnimatedText delay={0} staggerDelay={0.05}>
                  {worksData.heading}
                </AnimatedText>
              )}
              {!isHeadingVisible && worksData.heading}
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-light">{worksData.subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {works.map((work, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`transition-all duration-1000 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <Link href={`/works/${work.id}`} className="block group">
                <div className="glass-card-light rounded-3xl overflow-hidden h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative aspect-[3/2] overflow-hidden img-overlay-container">
                    <Image
                      src={work.image || "/placeholder.svg"}
                      alt={`${language === "ja" ? work.title : work.titleEn}の制作事例`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 transition-colors duration-300 hover:text-blue-600 line-reveal">
                      {language === "ja" ? work.title : work.titleEn}
                      <br />
                      <span className="text-base font-normal text-gray-600">
                        {language === "ja" ? work.subtitle : work.subtitleEn}
                      </span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-light">
                      {language === "ja" ? work.description : work.descriptionEn}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 px-12 py-5 bg-gray-900 text-white rounded-full hover:bg-blue-600 hover:scale-105 hover:shadow-2xl transition-all duration-500 font-medium text-lg shadow-lg"
            style={{ position: "relative", zIndex: 50 }}
            aria-label={worksData.viewMore}
          >
            {worksData.viewMore}
            <i className="fas fa-arrow-right text-sm"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
