'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { FileText, Newspaper, MessageSquare, LogOut, Sparkles, Crown, Zap, BarChart3, Lock, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface UserData {
    id: string
    email: string
    plan: 'lite' | 'standard' | 'pro'
    created_at: string
}

interface SubscriptionData {
    status: string
    current_period_end: string
}

export default function DashboardPage() {
    const [user, setUser] = useState<UserData | null>(null)
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function loadUserData() {
            const { data: { user: authUser } } = await supabase.auth.getUser()

            if (!authUser) {
                router.push('/login')
                return
            }

            const { data: userData } = await supabase
                .from('users')
                .select('*')
                .eq('id', authUser.id)
                .single()

            const { data: subData } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', authUser.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

            setUser(userData)
            setSubscription(subData)
            setLoading(false)
        }

        loadUserData()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                    className="glass-card p-8"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-white text-lg font-light">読み込み中...</span>
                    </div>
                </motion.div>
            </div>
        )
    }

    if (!user) return null

    const planConfig = {
        lite: {
            name: 'Lite プラン',
            icon: Sparkles,
            gradient: 'from-cyan-500 to-blue-500',
            description: 'シンプルで始めやすい',
        },
        standard: {
            name: 'Standard プラン',
            icon: Zap,
            gradient: 'from-blue-500 to-purple-500',
            description: '充実した機能で成長を加速',
        },
        pro: {
            name: 'Pro プラン',
            icon: Crown,
            gradient: 'from-purple-500 to-pink-500',
            description: 'プロフェッショナルの選択',
        },
    }

    const currentPlan = planConfig[user.plan]
    const PlanIcon = currentPlan.icon

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* ヘッダー */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                    className="glass-card p-6 md:p-8 mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
                                ダッシュボード
                            </h1>
                            <p className="text-slate-300 text-sm md:text-base">
                                ようこそ、<span className="text-cyan-400 font-medium">{user.email}</span> さん
                            </p>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r ${currentPlan.gradient} text-white font-medium shadow-lg`}
                        >
                            <PlanIcon className="w-5 h-5" />
                            <span>{currentPlan.name}</span>
                        </motion.div>
                    </div>

                    {subscription && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.9 }}
                            className="mt-6 pt-6 border-t border-white/10"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-slate-400">ステータス:</span>
                                    <span className={`ml-2 font-medium ${subscription.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {subscription.status === 'active' ? '✓ 有効' : '確認中'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-400">次回更新日:</span>
                                    <span className="ml-2 text-white font-medium">
                                        {new Date(subscription.current_period_end).toLocaleDateString('ja-JP')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* メインコンテンツグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* 契約書カード */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                        whileHover={{ y: -8 }}
                        className="glass-card p-6 group cursor-pointer"
                        onClick={() => router.push('/dashboard/contract')}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-900">
                                <FileText className="w-6 h-6 text-cyan-400" />
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-cyan-400 text-sm"
                            >
                                →
                            </motion.div>
                        </div>
                        <h2 className="text-xl font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors duration-900">
                            契約書
                        </h2>
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                            契約書PDFの確認・ダウンロードができます
                        </p>
                        <div className="text-xs text-slate-400">
                            クリックして確認
                        </div>
                    </motion.div>

                    {/* 新着情報カード */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                        whileHover={{ y: -8 }}
                        className="glass-card p-6 group cursor-pointer"
                        onClick={() => router.push('/dashboard/news')}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-900">
                                <Newspaper className="w-6 h-6 text-blue-400" />
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-blue-400 text-sm"
                            >
                                →
                            </motion.div>
                        </div>
                        <h2 className="text-xl font-medium text-white mb-2 group-hover:text-blue-400 transition-colors duration-900">
                            新着情報
                        </h2>
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                            お知らせの作成・編集・管理
                        </p>
                        <div className="text-xs text-slate-400">
                            {user.plan === 'lite' ? '最大3件まで' : '無制限'}
                        </div>
                    </motion.div>

                    {/* アクセス解析カード（準備中） */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        className="glass-card p-6 group opacity-60 cursor-not-allowed"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                <BarChart3 className="w-6 h-6 text-purple-400" />
                            </div>
                            <Lock className="w-4 h-4 text-slate-500" />
                        </div>
                        <h2 className="text-xl font-medium text-white mb-2">
                            アクセス解析
                        </h2>
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                            訪問者数やページビューを確認
                        </p>
                        <div className="text-xs text-slate-500">
                            準備中
                        </div>
                    </motion.div>

                    {/* AIサポートカード（準備中） */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className="glass-card p-6 group opacity-60 cursor-not-allowed"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500/20 to-orange-500/20">
                                <MessageSquare className="w-6 h-6 text-pink-400" />
                            </div>
                            <Lock className="w-4 h-4 text-slate-500" />
                        </div>
                        <h2 className="text-xl font-medium text-white mb-2">
                            AIサポート
                        </h2>
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                            操作方法の質問にAIが回答
                        </p>
                        <div className="text-xs text-slate-500">
                            準備中
                        </div>
                    </motion.div>
                </div>

                {/* プラン説明カード */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="glass-card p-6 md:p-8 mb-8"
                >
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                        <PlanIcon className="w-5 h-5 mr-2 text-cyan-400" />
                        {currentPlan.name} の特徴
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                        {currentPlan.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 transition-all duration-900 hover:bg-white/10">
                            <div className="text-2xl font-light text-white mb-1">
                                {user.plan === 'lite' ? '3件' : '無制限'}
                            </div>
                            <div className="text-sm text-slate-400">新着情報投稿</div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 transition-all duration-900 hover:bg-white/10">
                            <div className="text-2xl font-light text-white mb-1">24/7</div>
                            <div className="text-sm text-slate-400">AIサポート（準備中）</div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10 transition-all duration-900 hover:bg-white/10">
                            <div className="text-2xl font-light text-white mb-1">5年</div>
                            <div className="text-sm text-slate-400">データ保管</div>
                        </div>
                    </div>
                </motion.div>

                {/* フッター */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.6 }}
                    className="text-center"
                >
                    <button
                        onClick={handleSignOut}
                        className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-all duration-900 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform duration-900" />
                        <span>ログアウト</span>
                    </button>

                    <p className="text-xs text-slate-500 mt-6">
                        © 2026 Meraboco. Created by s.kenichi
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
