"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // メニュー開閉時のスクロールロック
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1)
      }
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.top = ""
    }
  }, [isMenuOpen])

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Escキーでメニューを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const navItems = [
    { href: "/company", label: t("header.company") },
    { href: "/services", label: t("header.services") },
    { href: "/works", label: t("header.works") },
  ]

  // アクティブリンクの判定
  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
            : "bg-white shadow-sm py-3"
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity z-50"
              onClick={closeMenu}
              aria-label="メラボコ ホームへ戻る"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-white shadow-sm">
                <Image 
                  src="/assets/logo.png" 
                  alt="メラボコ" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-base sm:text-lg font-bold text-gray-900">
                メラボコ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" role="navigation" aria-label="メインナビゲーション">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActiveLink(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Language Switch */}
              <button
                onClick={() => setLanguage(language === "ja" ? "en" : "ja")}
                className="ml-2 px-3 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                aria-label={language === "ja" ? "Switch to English" : "日本語に切り替え"}
              >
                {language === "ja" ? "EN" : "JA"}
              </button>

              {/* Contact Button */}
              <Link
                href="/#contact"
                className="ml-2 px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-200 font-medium"
              >
                {t("header.contact")}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors z-50"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              <div className="w-6 h-5 relative flex flex-col justify-center items-center">
                <span
                  className={`block absolute h-0.5 w-6 bg-gray-900 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-gray-900 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-gray-900 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45" : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <nav
        id="mobile-menu"
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-40 transform transition-transform duration-300 ease-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="navigation"
        aria-label="モバイルナビゲーション"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full pt-20 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-6">
            <ul className="space-y-1">
              {/* Home Link */}
              <li>
                <Link
                  href="/"
                  className={`flex items-center justify-between px-4 py-4 rounded-xl font-medium transition-all duration-200 ${
                    pathname === "/"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-800 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {t("header.home")}
                  </span>
                  {pathname === "/" && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </Link>
              </li>
              
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-4 rounded-xl font-medium transition-all duration-200 ${
                      isActiveLink(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-800 hover:bg-gray-50 active:bg-gray-100"
                    }`}
                    onClick={closeMenu}
                  >
                    <span className="flex items-center gap-3">
                      {item.href === "/company" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                      {item.href === "/services" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {item.href === "/works" && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {item.label}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200" />

            {/* Language Switch */}
            <div className="px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {language === "ja" ? "言語設定" : "Language"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setLanguage("ja")
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    language === "ja"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  日本語
                </button>
                <button
                  onClick={() => {
                    setLanguage("en")
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    language === "en"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Contact Button (Fixed at bottom) */}
          <div className="px-6 pt-4 border-t border-gray-100">
            <Link
              href="/#contact"
              className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/30"
              onClick={closeMenu}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t("header.contact")}
            </Link>
            
            {/* Phone number */}
            <a
              href="tel:050-1793-1290"
              className="flex items-center justify-center gap-2 w-full mt-3 py-3 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">050-1793-1290</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-[70px] sm:h-[80px]" />
    </>
  )
}
