// Meraboco. Created by s.kenichi
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"

export default function FreeDiagnostic() {
    const [email, setEmail] = useState("")
    const [url, setUrl] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !url) return

        setStatus("loading")
        try {
            const res = await fetch("/api/diagnose", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, url })
            })

            const data = await res.json().catch(() => ({} as any))

            // HTTP ステータスでまず判定
            if (!res.ok) {
                setStatus("error")
                return
            }

            // JSON の ok/success を尊重（互換）
            const ok =
                (typeof data?.ok === "boolean" ? data.ok : undefined) ??
                (typeof data?.success === "boolean" ? data.success : undefined) ??
                true

            setStatus(ok ? "success" : "error")
        } catch {
            setStatus("error")
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.9, bounce: 0.4 } }
    }

    const successVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.9, bounce: 0.5 } }
    }

    const formVariants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        exit: { opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.5 } }
    }

    const errorVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.9, bounce: 0.5 } }
    }

    const buttonVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.02, transition: { type: "spring", duration: 0.9, bounce: 0.5 } },
        tap: { scale: 0.98 }
    }

    return (
        <section id="free-diagnostic" className="relative overflow-hidden bg-stone-900 py-32 text-stone-50">
            {/* 温かみのある背景・グラデーションで表現 (noise.svgを削除) */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900 to-orange-900/10 pointer-events-none" />
            <div className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

            <div className="container relative mx-auto px-6 max-w-3xl text-center z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl mb-6 tracking-tight text-white">
                        無料診断
                    </h2>
                    <p className="mb-10 text-stone-300 text-lg font-medium leading-relaxed">
                        今のサイトで予約や集客が増えるか、プロの視点で優しく丁寧に診断いたします。
                    </p>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial="hidden"
                                animate="visible"
                                variants={successVariants}
                                className="mx-auto flex max-w-md flex-col items-center justify-center rounded-[2rem] bg-stone-800/40 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 p-10 backdrop-blur-xl"
                            >
                                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="h-8 w-8 text-orange-400" />
                                </div>
                                <p className="text-xl font-bold text-white mb-3">診断依頼を受け付けました</p>
                                <p className="text-sm text-stone-300 leading-relaxed font-medium">
                                    ご依頼ありがとうございます。<br />
                                    担当者が心を込めて診断し、結果をご案内いたします。<br />
                                    今しばらくお待ちくださいませ。
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={formVariants}
                                onSubmit={handleSubmit}
                                className="mx-auto flex max-w-xl flex-col gap-6"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <input
                                        type="url"
                                        required
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://example.com"
                                        disabled={status === "loading"}
                                        className="flex-1 rounded-2xl border border-white/10 bg-stone-800/50 px-6 py-4 text-base font-medium tracking-wide text-white placeholder:text-stone-500 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:border-orange-500/50 focus:bg-stone-800/80 focus:outline-none focus:ring-4 focus:ring-orange-500/20 disabled:opacity-50 transition-all duration-300"
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        disabled={status === "loading"}
                                        className="flex-1 rounded-2xl border border-white/10 bg-stone-800/50 px-6 py-4 text-base font-medium tracking-wide text-white placeholder:text-stone-500 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:border-orange-500/50 focus:bg-stone-800/80 focus:outline-none focus:ring-4 focus:ring-orange-500/20 disabled:opacity-50 transition-all duration-300"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={status === "loading"}
                                    variants={buttonVariants}
                                    initial="idle"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-base font-bold tracking-wide text-stone-900 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(249,115,22,0.3)] focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:opacity-50"
                                >
                                    {status === "loading" ? "送信中..." : "無料診断を申し込む"}
                                    {status !== "loading" && (
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    )}
                                </motion.button>

                                {status === "error" && (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={errorVariants}
                                        className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-amber-200 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 backdrop-blur-md"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p>通信が少し混み合っているようです。恐れ入りますが、少し時間をおいて再度お試しいただけますでしょうか。</p>
                                    </motion.div>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
