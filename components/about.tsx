"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatedText, AnimatedLines } from "./animated-text"
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={headingRef}
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent inline-block">
              {isHeadingVisible && (
                <AnimatedText delay={0} staggerDelay={0.05}>
                  {t("about.heading")}
                </AnimatedText>
              )}
              {!isHeadingVisible && t("about.heading")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-light">{t("about.subheading")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                {isVisible && (
                  <>
                    <AnimatedLines lines={[t("about.title1")]} delay={0.5} />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
                      <AnimatedText delay={0.8} staggerDelay={0.03}>
                        {t("about.title2")}
                      </AnimatedText>
                    </span>
                  </>
                )}
                {!isVisible && (
                  <>
                    {t("about.title1")}
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {t("about.title2")}
                    </span>
                  </>
                )}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <p className="text-gray-700 leading-relaxed text-lg font-light">{t("about.description")}</p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="relative aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/web-design-technology-illustration.jpg"
                  alt="デザインとテクノロジーを統合したWEBソリューションのイラスト"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
