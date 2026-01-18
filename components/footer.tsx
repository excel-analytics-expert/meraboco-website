"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { language, translations } = useLanguage()
  const footerData = translations[language].footer

  return (
    <footer
      className="bg-gray-900 text-white pt-16 md:pt-24 pb-16 mt-12 md:mt-24 border-t-8 border-gray-800"
      style={{ isolation: "isolate" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white transition-transform duration-300 hover:rotate-12">
                <Image
                  src="/assets/logo.png"
                  alt={language === "ja" ? "メラボコのロゴ" : "Meraboco Logo"}
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
              <span className="text-2xl font-bold">{language === "ja" ? "メラボコ" : "Meraboco"}</span>
            </div>
            <div className="flex gap-4 mb-6">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === "ja" ? "Instagram（準備中）" : "Instagram (Coming Soon)"}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  alert(language === "ja" ? "準備中です" : "Coming Soon")
                }}
              >
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === "ja" ? "X（旧Twitter）（準備中）" : "X (Twitter) (Coming Soon)"}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  alert(language === "ja" ? "準備中です" : "Coming Soon")
                }}
              >
                <i className="fa-brands fa-x-twitter"></i>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{footerData.sitemap}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {translations[language].header.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/company"
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {translations[language].header.company}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {language === "ja" ? "サービス一覧" : "Services"}
                </Link>
              </li>
              <li>
                <Link
                  href="/works"
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {language === "ja" ? "制作実績" : "Portfolio"}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault()
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    } else {
                      window.location.href = "/#contact"
                    }
                  }}
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {translations[language].header.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{footerData.company}</h3>
            <div className="mb-6">
              <p className="mb-2">{footerData.address}</p>
              <p className="mb-2">
                <a
                  href="tel:050-1793-1290"
                  className="hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <i className="fas fa-phone text-sm"></i>
                  {footerData.phone}
                </a>
              </p>
              <p className="mb-4">MAIL: meraboco.2025.8@gmail.com</p>
              <p className="text-xs text-gray-400 leading-relaxed border-l-2 border-gray-600 pl-3">
                {footerData.aiNotice}
              </p>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {footerData.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {footerData.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/law"
                  className="hover:text-gray-300 hover:translate-x-2 inline-block transition-all duration-300"
                >
                  {footerData.law}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p className="hover:text-white transition-colors duration-300">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
