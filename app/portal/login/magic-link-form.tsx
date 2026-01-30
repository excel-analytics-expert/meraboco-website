"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

type MagicLinkState = {
  status: "idle" | "success" | "error"
  message?: string
}

type MagicLinkFormProps = {
  action: (prevState: MagicLinkState, formData: FormData) => Promise<MagicLinkState>
}

const initialState: MagicLinkState = { status: "idle" }

function SubmitButton() {
  const { pending } = useFormStatus()
  const { language, translations } = useLanguage()
  const t = translations[language].portalLogin

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-500 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? t.sending : t.submit}
    </button>
  )
}

export default function MagicLinkForm({ action }: MagicLinkFormProps) {
  const [state, formAction] = useActionState(action, initialState)
  const { language, translations } = useLanguage()
  const t = translations[language].portalLogin

  return (
    <form action={formAction} className="space-y-4">
      <label className="block text-sm text-gray-200">
        {t.emailLabel}
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-white/40 focus:outline-none"
          placeholder="info@meraboco.jp"
        />
      </label>
      <SubmitButton />
      <AnimatePresence mode="wait">
        {state.status !== "idle" && (
          <motion.div
            key={state.status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
                : "border-rose-300/30 bg-rose-400/10 text-rose-100"
            }`}
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
