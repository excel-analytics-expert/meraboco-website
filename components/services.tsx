"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { LevitatingCard } from "./levitating-card"
import { AnimatedText } from "./animated-text"
import { useLanguage } from "@/contexts/language-context"

const Services = () => {
  const { t } = useLanguage()

  const services = [
    {
      title: t("services.items.0.title"),
      description: t("services.items.0.description"),
      image: "/services/web-production-workspace.jpg",
      href: "/services/web-production",
    },
    {
      title: t("services.items.1.title"),
      description: t("services.items.1.description"),
      image: "/services/system-development-programming.jpg",
      href: "/services/system-development",
    },
    {
      title: t("services.items.2.title"),
      description: t("services.items.2.description"),
      image: "/services/ux-ui-design-process.jpg",
      href: "/services/ux-ui-design",
    },
    {
      title: t("services.items.3.title"),
      description: t("services.items.3.description"),
      image: "/services/digital-marketing-analytics.jpg",
      href: "/services/digital-marketing",
    },
  ]

  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
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
    <section ref={sectionRef} id="services" className="section-padding relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent inline-block">
              {isHeadingVisible && (
                <AnimatedText delay={0} staggerDelay={0.05}>
                  {t("services.heading")}
                </AnimatedText>
              )}
              {!isHeadingVisible && t("services.heading")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-light">{t("services.subheading")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`transition-all duration-1000 ${visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                perspective: "1000px",
              }}
            >
              <Link href={service.href} className="block">
                <LevitatingCard className="glass-card-light rounded-3xl overflow-hidden h-full">
                  <div className="relative aspect-[4/3] overflow-hidden img-overlay-container">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={`${service.title}のイメージ`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 transition-colors duration-300 hover:text-blue-600 line-reveal">
                      {service.title}
                    </h3>
                    {/* 【改善箇所】色をtext-gray-900（真っ黒に近いグレー）にし、太さをfont-normalに強化 */}
                    <p className="text-gray-900 leading-relaxed font-normal">{service.description}</p>
                  </div>
                </LevitatingCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services