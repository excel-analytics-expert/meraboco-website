"use client"

import type React from "react"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { language, translations } = useLanguage()
  const contactData = translations[language].contact

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
      className="py-32 md:py-40 relative bg-white mt-24 mb-24"
      style={{ isolation: "isolate" }}
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {contactData.heading}
            </span>
          </h2>
          <p className="text-lg text-gray-600 font-light mb-8">{contactData.subheading}</p>
          <p className="text-lg text-gray-700 font-light max-w-2xl mx-auto">{contactData.description}</p>
        </div>

        <div
          className={`max-w-3xl mx-auto mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="glass-card-light rounded-3xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">{contactData.phoneLabel}</h3>
            <a
              href="tel:050-1793-1290"
              className="inline-flex items-center gap-3 text-3xl md:text-4xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300"
            >
              <i className="fas fa-phone-volume"></i>
              {contactData.phone}
            </a>
            <p className="text-sm text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">{contactData.aiNotice}</p>
          </div>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="glass-card-light rounded-3xl p-8 md:p-12 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-3 transition-colors duration-300 group-focus-within:text-blue-600"
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
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                  disabled={formStatus === "sending"}
                />
              </div>
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-3 transition-colors duration-300 group-focus-within:text-blue-600"
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
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                  disabled={formStatus === "sending"}
                />
              </div>
              <div className="group">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-3 transition-colors duration-300 group-focus-within:text-blue-600"
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
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                  disabled={formStatus === "sending"}
                />
              </div>
              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-3 transition-colors duration-300 group-focus-within:text-blue-600"
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
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-none hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                  disabled={formStatus === "sending"}
                />
              </div>
              <div className="text-center pt-8 pb-4">
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="px-12 py-5 bg-gray-900 text-white rounded-full hover:bg-blue-600 hover:scale-105 hover:shadow-2xl transition-all duration-500 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 btn-primary"
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

          {formMessage && (
            <div className="mt-8 mb-12 text-center">
              <p 
                className={`font-medium glass-card-light py-4 px-6 rounded-2xl inline-block animate-fade-in ${
                  formStatus === "success" ? "text-green-600" : 
                  formStatus === "error" ? "text-red-600" : 
                  "text-blue-600"
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
      </div>
    </section>
  )
}
