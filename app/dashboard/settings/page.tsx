// Meraboco. Created by s.kenichi
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SiteSettingsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // フォームステート
    const [heroTitle, setHeroTitle] = useState("");
    const [heroSubtitle, setHeroSubtitle] = useState("");

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/portal/login");
                return;
            }

            const uid = session.user.id;
            setUserId(uid);

            // 既存の設定を取得
            const { data, error } = await supabase
                .from("site_settings")
                .select("*")
                .eq("user_id", uid)
                .single();

            if (data) {
                setHeroTitle(data.hero_title || "");
                setHeroSubtitle(data.hero_subtitle || "");
            }
            setIsLoading(false);
        };
        fetchSettings();
    }, [router, supabase]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        setIsSaving(true);
        setMessage(null);

        const { error } = await supabase
            .from("site_settings")
            .upsert({
                user_id: userId,
                hero_title: heroTitle,
                hero_subtitle: heroSubtitle,
                updated_at: new Date().toISOString(),
            }, { onConflict: "user_id" });

        setIsSaving(false);

        if (error) {
            setMessage({ type: "error", text: "設定の保存に失敗しました。" });
        } else {
            setMessage({ type: "success", text: "サイト設定を保存しました。" });
            setTimeout(() => setMessage(null), 3000);
        }
    };

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
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.9, bounce: 0.4 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-zinc-500 hover:text-orange-600 font-medium text-sm flex items-center transition-colors mb-6"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        ダッシュボードへ戻る
                    </button>
                    <h1 className="text-3xl font-bold text-zinc-800 tracking-tight">サイト設定</h1>
                    <p className="text-zinc-500 mt-2">デモサイトの表示内容をカスタマイズします。</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.9, bounce: 0.4, delay: 0.1 }}
                    className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8"
                >
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="heroTitle" className="text-sm font-bold text-zinc-700 block">
                                ヒーロータイトル (メイン見出し)
                            </label>
                            <input
                                id="heroTitle"
                                type="text"
                                value={heroTitle}
                                onChange={(e) => setHeroTitle(e.target.value)}
                                placeholder="例: 現代の複雑さに、新たな秩序を。"
                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-zinc-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="heroSubtitle" className="text-sm font-bold text-zinc-700 block">
                                サブタイトル (補足説明)
                            </label>
                            <textarea
                                id="heroSubtitle"
                                rows={3}
                                value={heroSubtitle}
                                onChange={(e) => setHeroSubtitle(e.target.value)}
                                placeholder="例: 私たちは最先端のテクノロジーを用いて..."
                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-zinc-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all outline-none resize-none"
                            />
                        </div>

                        {message && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-4 rounded-xl text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                            >
                                {message.text}
                            </motion.div>
                        )}

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="py-3 px-8 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center shadow-lg"
                            >
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        保存中...
                                    </>
                                ) : (
                                    "設定を保存する"
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
