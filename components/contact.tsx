"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!privacyAgreed) {
      setStatus("error")
      setErrorMessage("プライバシーポリシーに同意してください")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          privacyAgreed,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setPrivacyAgreed(false)
      } else {
        setStatus("error")
        setErrorMessage(data.error || "送信に失敗しました")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("ネットワークエラーが発生しました")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="pt-20 pb-48 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-semibold tracking-wider">{t("contact.heading")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">{t("contact.subheading")}</h2>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">{t("contact.description")}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">{t("contact.phoneLabel")}</h3>

                <a
                  href={`tel:${t("contact.phone")}`}
                  className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t("contact.phone")}
                </a>
                <p className="text-gray-400 mt-4 text-sm">{t("contact.aiNotice")}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">営業時間</h3>
                <p className="text-gray-300">平日 9:00 - 18:00</p>
                <p className="text-gray-400 text-sm mt-2">土日祝日はお休みをいただいております</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    {t("contact.form.name")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.namePlaceholder")}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    {t("contact.form.email")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.emailPlaceholder")}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    {t("contact.form.message")} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.messagePlaceholder")}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="privacy" className="text-gray-300 text-sm cursor-pointer">
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline" target="_blank">
                      プライバシーポリシー
                    </Link>
                    に同意する <span className="text-red-400">*</span>
                  </label>
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300">
                    {t("contact.form.success")}
                  </div>
                )}

                {status === "error" && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300">
                    {errorMessage || t("contact.form.error")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !privacyAgreed}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${status === "loading" || !privacyAgreed
                    ? "bg-gray-500 cursor-not-allowed text-gray-300"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                  {status === "loading" ? t("contact.form.sending") : t("contact.form.submit")}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}