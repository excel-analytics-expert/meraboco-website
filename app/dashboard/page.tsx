// Meraboco. Created by s.kenichi
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/portal/login");
            } else {
                setUserEmail(session.user.email ?? "");
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router, supabase]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="animate-spin h-10 w-10 border-4 border-orange-400 border-t-transparent rounded-full relative z-10"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 relative overflow-hidden font-sans">
            {/* フィルムグレインと温かみのある背景装飾 */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.9, bounce: 0.4 }}
                    className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 space-y-4 md:space-y-0"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-800 tracking-tight">Dashboard</h1>
                        <p className="text-zinc-500 mt-1">現代の複雑さに、新たな秩序を。</p>
                    </div>
                    <div className="flex items-center space-x-6 bg-white/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/40 shadow-sm">
                        <span className="text-sm font-medium text-zinc-700">{userEmail}</span>
                        <div className="w-px h-4 bg-zinc-300"></div>
                        <button
                            onClick={async () => { await supabase.auth.signOut(); router.push("/portal/login"); }}
                            className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                            ログアウト
                        </button>
                    </div>
                </motion.header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* ご利用状況（プラン情報）カード */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", duration: 0.9, bounce: 0.4, delay: 0.1 }}
                        className="col-span-1 md:col-span-2 bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8"
                    >
                        <h2 className="text-xl font-bold text-zinc-800 mb-6">現在のご利用状況</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white/50 p-6 rounded-2xl border border-white/60 shadow-sm">
                                <p className="text-sm font-medium text-zinc-500 mb-1">契約プラン</p>
                                <p className="text-2xl font-bold text-zinc-800">Standard Plan</p>
                                <p className="text-xs font-semibold text-green-600 mt-2 flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 relative"><span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span></span>
                                    Active
                                </p>
                            </div>
                            <div className="bg-white/50 p-6 rounded-2xl border border-white/60 shadow-sm">
                                <p className="text-sm font-medium text-zinc-500 mb-1">ステータス</p>
                                <p className="text-lg font-bold text-zinc-800 mt-1">決済同期完了</p>
                                <p className="text-xs text-zinc-500 mt-2">Stripeサブスクリプションと連携中</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* サイト設定 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", duration: 0.9, bounce: 0.4, delay: 0.2 }}
                        className="col-span-1 bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-xl border border-orange-100 shadow-xl rounded-3xl p-8 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-500"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-bold text-zinc-800">サイト設定</h2>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">稼働中</span>
                            </div>
                            <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                                デモサイトのメインビジュアルやロゴ情報の更新を行うコントロールパネルです。
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/dashboard/settings")}
                            className="w-full py-4 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-all shadow-lg flex justify-center items-center group"
                        >
                            設定画面を開く
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
