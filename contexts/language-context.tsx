"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations as translationsData } from "@/translations"

type Language = "ja" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => any
  translations: typeof translationsData
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ja")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null
    if (saved && (saved === "ja" || saved === "en")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): any => {
    const keys = key.split(".")
    let value: any = translationsData[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value !== undefined ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translationsData }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
