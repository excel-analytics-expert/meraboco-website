"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import MagicLinkForm from "./magic-link-form"
import { useLanguage } from "@/contexts/language-context"

type MagicLinkState = {
  status: "idle" | "success" | "error"
  message?: string
}

type PortalLoginClientProps = {
  action: (prevState: MagicLinkState, formData: FormData) => Promise<MagicLinkState>
}

export default function PortalLoginClient({ action }: PortalLoginClientProps) {
  const { language, translations } = useLanguage()
  const t = translations[language].portalLogin

  return (
    <div className="min-h-screen bg-[#0b0b17] text-white">
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-160px)] max-w-4xl flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl shadow-amber-500/10 backdrop-blur transition duration-700 hover:shadow-amber-500/20">
          <div className="mb-6 space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">{t.label}</p>
            <h1 className="text-3xl font-semibold">{t.title}</h1>
            <p className="text-sm text-gray-300">{t.description}</p>
          </div>
          <MagicLinkForm action={action} />
          <div className="mt-6 text-xs text-gray-400">
            {t.sender}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
