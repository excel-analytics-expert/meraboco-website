"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { Mail, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const supabase = createClient()

    const handleSendMagicLink = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        setError(null)
        setSuccessMsg(null)

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: false, // 管理者のみなので新規登録不可
                    emailRedirectTo: "http://127.0.0.1:3001/admin/diagnostics",
                }
            })

            if (error) {
                if (error.message.includes("Signups not allowed")) {
                    throw new Error("このメールアドレスは管理者として登録されていません。")
                }
                throw error
            }

            setSuccessMsg("メールを送信しました。届いたリンクをクリックしてログインを完了してください。")
            setIsSuccess(true)
        } catch (err: any) {
            console.error(err)
            setError(err.message || "ログインリンクの送信に失敗しました")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-stone-50 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 left-20 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/50">

                    <div className="p-8 sm:p-10">
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner border border-blue-100">
                                <ShieldCheck className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>

                        <h2 className="text-center text-2xl font-bold text-gray-900 tracking-tight mb-2">
                            管理者ログイン
                        </h2>
                        <p className="text-center text-sm text-gray-500 mb-8 font-medium">
                            セキュアなアクセスシステム
                        </p>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 bg-red-50 text-red-600 text-sm p-4 rounded-xl font-medium border border-red-100"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl border border-emerald-100 text-center shadow-sm"
                            >
                                <div className="flex justify-center mb-4">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">メール送信完了</h3>
                                <p className="text-sm font-medium leading-relaxed">
                                    {successMsg}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="email-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleSendMagicLink}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                        メールアドレス
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="admin@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 font-medium sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isLoading || !email}
                                    type="submit"
                                    className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 shadow-lg shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            ログインリンクを送信
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </div>

                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-center">
                        <span className="text-xs text-gray-400 font-medium">
                            Secure Managed System
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
