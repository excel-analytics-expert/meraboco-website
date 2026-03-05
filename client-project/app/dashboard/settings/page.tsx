'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Image as ImageIcon, Type, ChevronLeft, Loader2, CheckCircle2, AlertCircle, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SiteSettings {
    id?: string
    user_id?: string
    hero_title: string
    hero_subtitle: string
    hero_image: string
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<SiteSettings>({
        hero_title: '静寂と、美学。',
        hero_subtitle: 'Luxury Hotel Demo',
        hero_image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/login')
            return
        }

        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('user_id', user.id)
            .single()

        if (data) {
            setSettings(data)
        }

        const { data: subData } = await supabase
            .from('subscriptions')
            .select('status')
            .eq('user_id', user.id)
            .maybeSingle()
        setIsActive(subData?.status === 'active')

        setLoading(false)
    }

    async function handleSave() {
        setSaving(true)
        setError('')
        setSuccess('')

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            setError('ログインが必要です')
            setSaving(false)
            return
        }

        if (!isActive) {
            setError('サブスクリプション有効時のみ編集可能です')
            setSaving(false)
            setTimeout(() => setError(''), 5000)
            return
        }

        const { error: saveError } = await supabase
            .from('site_settings')
            .upsert({
                user_id: user.id,
                hero_title: settings.hero_title,
                hero_subtitle: settings.hero_subtitle,
                hero_image: settings.hero_image,
            })

        if (saveError) {
            setError('保存に失敗しました。もう一度お試しください。')
            setTimeout(() => setError(''), 5000)
        } else {
            setSuccess('サイト設定を更新しました')
            setTimeout(() => setSuccess(''), 5000)
        }

        setSaving(false)
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                    className="glass-card p-6 md:p-8 mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
                                サイト設定
                            </h1>
                            <p className="text-slate-300 text-sm">
                                デモサイトのメインビジュアルをカスタマイズ
                            </p>
                        </div>
                        <motion.a
                            href="/demos/hotel"
                            target="_blank"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-900"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">プレビュー</span>
                        </motion.a>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="glass-card p-4 mb-6 border-l-4 border-red-500"
                        >
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-300 text-sm leading-relaxed">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="glass-card p-4 mb-6 border-l-4 border-green-500"
                        >
                            <div className="flex items-start space-x-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-green-300 text-sm leading-relaxed">{success}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="glass-card p-6 md:p-10"
                >
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Type className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">
                                    Hero Section Control
                                </h3>
                            </div>
                            <p className="text-sm text-slate-400 mb-6">
                                デモサイトのメインビジュアルに表示される内容を編集できます
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2">
                                    メインキャッチコピー
                                </label>
                                <input
                                    type="text"
                                    value={settings.hero_title}
                                    onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                                    placeholder="例: 静寂と、美学。"
                                    className="hologram-input w-full px-4 py-3 rounded-lg text-2xl font-bold transition-all duration-900"
                                    maxLength={50}
                                />
                                <p className="text-xs text-slate-400 mt-1">{settings.hero_title.length}/50</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2">
                                    サブタイトル
                                </label>
                                <input
                                    type="text"
                                    value={settings.hero_subtitle}
                                    onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                                    placeholder="例: Luxury Hotel Demo"
                                    className="hologram-input w-full px-4 py-3 rounded-lg transition-all duration-900"
                                    maxLength={100}
                                />
                                <p className="text-xs text-slate-400 mt-1">{settings.hero_subtitle.length}/100</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-200 mb-2 flex items-center space-x-2">
                                    <ImageIcon className="w-4 h-4" />
                                    <span>背景画像 URL</span>
                                </label>
                                <input
                                    type="url"
                                    value={settings.hero_image}
                                    onChange={(e) => setSettings({ ...settings, hero_image: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="hologram-input w-full px-4 py-3 rounded-lg text-xs font-mono transition-all duration-900"
                                />
                                <p className="text-xs text-slate-400 mt-2">
                                    推奨: Unsplash の高解像度画像（1920x1080以上）
                                </p>

                                {settings.hero_image && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ duration: 0.5 }}
                                        className="mt-4 overflow-hidden rounded-xl border border-white/10"
                                    >
                                        <img
                                            src={settings.hero_image}
                                            alt="Hero preview"
                                            className="w-full h-48 object-cover opacity-70 hover:opacity-100 transition-opacity duration-900"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=Image+Not+Found'
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: isActive ? 0.98 : 1 }}
                                onClick={handleSave}
                                disabled={saving || !isActive}
                                className={`neon-button w-full py-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-900 ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>保存中...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>サイトに反映する</span>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-all duration-900 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform duration-900" />
                        <span>ダッシュボードに戻る</span>
                    </button>
                </motion.div>

                <p className="text-xs text-slate-500 text-center mt-6">
                    © 2026 Meraboco. Created by s.kenichi
                </p>
            </div>
        </div>
    )
}
