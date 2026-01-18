"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BadgeCheck, Home } from "lucide-react"
import MatrixRainBackground from "@/components/matrix-rain-background"

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#000814] flex items-center justify-center px-4 font-sans overflow-hidden relative">
            {/* Background with MatrixRain personalization */}
            <MatrixRainBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full z-10"
            >
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl text-center">

                    {/* ロゴエリア：メラボコ & Stripe（修正版） */}
                    <div className="flex items-center justify-center space-x-6 mb-8">
                        {/* メラボコ */}
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/icon-512.png"
                                alt="メラボコ ロゴアイコン"
                                width={24}
                                height={24}
                                className="rounded-md"
                            />
                            <span className="text-white font-bold tracking-widest text-xl">メラボコ</span>
                        </div>

                        {/* 区切り線 */}
                        <div className="h-6 w-px bg-white/20"></div>

                        {/* Stripe */}
                        <div className="text-white/80 font-semibold tracking-wider text-lg flex items-center">
                            Powered by <span className="text-white ml-2 font-bold text-xl">Stripe</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="mb-6 flex justify-center"
                    >
                        <BadgeCheck className="h-16 w-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                    </motion.div>

                    <h1 className="text-2xl font-bold text-white mb-4 tracking-tight">
                        Transaction Secured
                    </h1>

                    <div className="text-gray-400 text-sm leading-relaxed mb-8 space-y-4">
                        <p>精算の確認が正常に完了いたしました。</p>
                        <p className="bg-white/5 border border-white/10 p-4 rounded-lg text-xs text-cyan-200/80">
                            ※本サイトの決済および請求は、専門業者のStripeにより安全に管理・保護されています。
                        </p>
                        <p className="text-xs">
                            これより最新の進捗内容をシステムへ反映いたします。<br />
                            数分後、専用プレビューURLをメールにて送信します。
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="group flex items-center justify-center w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-lg transition-all duration-300"
                    >
                        <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Dashboard / Home
                    </Link>
                </div>

                <p className="text-center text-[10px] text-white/30 mt-8 tracking-[0.2em] uppercase">
                    Security Protocol Active &copy; 2026 Meraboco
                </p>
            </motion.div>
        </div>
    )
}
