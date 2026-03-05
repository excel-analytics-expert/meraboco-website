// Meraboco. Created by s.kenichi
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden font-sans">
            {/* 温かみのある背景・グラデーションで表現 (noise.svgを削除) */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 -translate-x-1/2 bg-orange-500/10 rounded-full mix-blend-multiply blur-[120px] pointer-events-none"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 -translate-y-1/2 translate-x-1/2 bg-amber-500/10 rounded-full mix-blend-multiply blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.9, bounce: 0.4 }}
                className="w-full max-w-lg p-8 relative z-10 text-center"
            >
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 space-y-6">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 italic">404</h1>
                    <h2 className="text-xl font-medium text-zinc-700">お探しのページが見つかりませんでした</h2>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                        URLが変更されたか、入力に間違いがある可能性があります。<br />
                        伝統と革新のサイト「メラボコ」のトップページへお戻りください。
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl active:scale-95"
                        >
                            トップページへ戻る
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
