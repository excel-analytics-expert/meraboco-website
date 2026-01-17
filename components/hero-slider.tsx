"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { AnimatedLines } from "./animated-text"
import { useLanguage } from "@/contexts/language-context"

const slideIds = ["past", "present", "future"]

const slideImages = [
  "/traditional-japanese-street-architecture.jpg",
  "/modern-zen-garden-architecture.jpg",
  "/futuristic-tokyo-cityscape-with-drones.jpg",
]

const slideFonts = [
  "font-serif", // Traditional Japanese architecture - elegant serif
  "font-sans", // Modern zen - clean sans-serif
  "font-sans", // Futuristic cityscape - modern sans-serif
]

export default function HeroSlider() {
  const { language, translations } = useLanguage()
  const slides = translations[language].hero.slides

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sliderRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 800)
    }, 7000)
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    if (index === currentSlide) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 800)
  }

  const goToPrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsTransitioning(false)
    }, 800)
  }

  const goToNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <section ref={sliderRef} className="hero-slider" aria-label="キービジュアル">
      {slides.map((slide, index) => (
        <div
          key={slideIds[index]}
          className={`hero-slide absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Image
              src={slideImages[index] || "/placeholder.svg"}
              alt={`${slide.title.join("")}のビジュアル`}
              fill
              className="hero-slide__image transition-transform duration-[15000ms] ease-out"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
          <div className="hero-slide__overlay" />

          <div className="hero-slide__content">
            {index === currentSlide && !isTransitioning && (
              <div className={`hero-slide__title ${slideFonts[index]}`} style={{ perspective: "1000px" }}>
                <AnimatedLines lines={slide.title} lineClassName="block" delay={0.3} />
              </div>
            )}
            {index !== currentSlide && (
              <h2 className={`hero-slide__title ${slideFonts[index]} opacity-0`}>
                {slide.title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            )}

            {index === currentSlide && !isTransitioning && (
              <div className="hero-slide__text" style={{ perspective: "1000px" }}>
                <AnimatedLines lines={[slide.text]} delay={0.9} staggerDelay={0.02} />
              </div>
            )}
            {index !== currentSlide && <p className="hero-slide__text opacity-0">{slide.text}</p>}
          </div>
        </div>
      ))}

      <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center gap-6">
        <button
          onClick={goToPrevious}
          className="w-14 h-14 rounded-full glass-card hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-500 ease-out"
          aria-label={translations[language].hero.ariaLabels.previous}
        >
          <i className="fas fa-chevron-left text-white text-lg"></i>
        </button>
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                index === currentSlide
                  ? "bg-white w-12 shadow-lg shadow-white/50"
                  : "bg-white/40 w-1.5 hover:bg-white/60 hover:w-8"
              }`}
              aria-label={`スライド${index + 1}へ`}
            />
          ))}
        </div>
        <button
          onClick={goToNext}
          className="w-14 h-14 rounded-full glass-card hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-500 ease-out"
          aria-label={translations[language].hero.ariaLabels.next}
        >
          <i className="fas fa-chevron-right text-white text-lg"></i>
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
