"use client"

import type React from "react"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { language, translations } = useLanguage()
  const contactData = translations[language].contact
  const inquiryNotice =
    language === "ja"
      ? "現在、お申し込みが集中しており、決済システムを最終調整中です。スマートプランのお申し込みをご希望の方は、本フォームよりその旨をお知らせください。優先的にご案内いたします。"
      : "We are currently seeing high demand and finalizing the payment system. If you wish to apply for a Smart Plan, please mention it in this form and we will prioritize your request."

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [formMessage, setFormMessage] = useState("")
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("sending")
    setFormMessage(contactData.form.sending)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus("success")
        setFormMessage(contactData.form.success)
        setFormData({ name: "", email: "", company: "", message: "" })

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormMessage("")
          setFormStatus("idle")
        }, 5000)
      } else {
        setFormStatus("error")
        setFormMessage(data.error || contactData.form.error)

        // Clear error message after 5 seconds
        setTimeout(() => {
          setFormMessage("")
          setFormStatus("idle")
        }, 5000)
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setFormStatus("error")
      setFormMessage(contactData.form.error)

      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormMessage("")
        setFormStatus("idle")
      }, 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 md:py-40 relative bg-transparent mt-24 pb-80 md:pb-[28rem]"
      style={{ isolation: "isolate" }}
    >

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-xs font-semibold tracking-[0.35em] text-blue-300/80">
            {contactData.heading}
          </p>
          <h2 className="mt-3 text-4xl md:text-6xl font-semibold text-white">
            {contactData.subheading}
          </h2>
          <p className="mt-6 text-base text-white/70 font-light max-w-2xl mx-auto">
            {contactData.description}
          </p>
        </div>

        <div
          className={`mx-auto mb-10 max-w-3xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="glass-card-light rounded-3xl border border-white/20 bg-white/10 backdrop-blur-3xl p-6 text-left shadow-xl">
            <p className="text-sm leading-relaxed text-white/80">{inquiryNotice}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="glass-card-light rounded-3xl border border-white/20 bg-white/10 backdrop-blur-3xl p-8 text-left shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-white/90">{contactData.phoneLabel}</h3>
              <a
                href="tel:050-1793-1290"
                className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                <i className="fas fa-phone-volume"></i>
                {contactData.phone}
              </a>
              <p className="text-sm text-white/60 mt-4 leading-relaxed">{contactData.aiNotice}</p>
            </div>
            <div className="glass-card-light rounded-3xl border border-white/20 bg-white/10 backdrop-blur-3xl p-8 text-left shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-white/90">
                {language === "ja" ? "営業時間" : "Business Hours"}
              </h3>
              <div className="text-sm text-white/70 space-y-2">
                <p>{language === "ja" ? "平日 9:00 - 18:00" : "Weekdays 9:00 - 18:00"}</p>
                <p>{language === "ja" ? "土日祝日はお休みをいただいております" : "Closed on weekends and holidays"}</p>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="glass-card-light rounded-3xl border border-white/20 bg-white/10 backdrop-blur-3xl p-8 md:p-12 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-3 text-white/80 transition-colors duration-300 group-focus-within:text-blue-300"
                  >
                    {contactData.form.name}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder={contactData.form.namePlaceholder}
                    className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/10 text-white placeholder-white/50 outline-none transition-all duration-300 hover:border-white/40 focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60"
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-3 text-white/80 transition-colors duration-300 group-focus-within:text-blue-300"
                  >
                    {contactData.form.email}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder={contactData.form.emailPlaceholder}
                    className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/10 text-white placeholder-white/50 outline-none transition-all duration-300 hover:border-white/40 focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60"
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-3 text-white/80 transition-colors duration-300 group-focus-within:text-blue-300"
                  >
                    {language === "ja" ? "会社名" : "Company"}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    maxLength={200}
                    autoComplete="organization"
                    className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/10 text-white placeholder-white/50 outline-none transition-all duration-300 hover:border-white/40 focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60"
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-3 text-white/80 transition-colors duration-300 group-focus-within:text-blue-300"
                  >
                    {contactData.form.message}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    minLength={10}
                    maxLength={5000}
                    placeholder={contactData.form.messagePlaceholder}
                    className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/10 text-white placeholder-white/50 outline-none transition-all duration-300 resize-none hover:border-white/40 focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400/60"
                    disabled={formStatus === "sending"}
                  />
                </div>
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full px-12 py-5 rounded-full bg-white/20 text-white border border-white/20 hover:bg-blue-600 transition-all duration-700 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-blue-500/20"
                  >
                    {formStatus === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {contactData.form.sending}
                      </span>
                    ) : (
                      contactData.form.submit
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {formMessage && (
          <div className="mt-10 text-center">
            <p
              className={`font-medium glass-card-light border border-white/20 bg-white/10 backdrop-blur-3xl py-4 px-6 rounded-2xl inline-block animate-fade-in ${formStatus === "success" ? "text-emerald-300" :
                formStatus === "error" ? "text-red-300" :
                  "text-blue-300"
                }`}
            >
              {formStatus === "success" && (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {formMessage}
                </span>
              )}
              {formStatus === "error" && (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {formMessage}
                </span>
              )}
              {formStatus === "sending" && formMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
