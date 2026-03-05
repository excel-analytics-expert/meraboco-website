'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Eye, EyeOff, Calendar, AlertCircle, ArrowLeft, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NewsItem {
    id: string
    title: string
    content: string
    is_published: boolean
    published_at: string | null
    created_at: string
}

interface UserData {
    id: string
    plan: 'lite' | 'standard' | 'pro'
    isActive?: boolean
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [showNewForm, setShowNewForm] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')
    const [publishing, setPublishing] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (!authUser) {
            router.push('/login')
            return
        }

        const { data: userData } = await supabase
            .from('users')
            .select('id, plan')
            .eq('id', authUser.id)
            .single()

        const { data: subData } = await supabase
            .from('subscriptions')
            .select('status')
            .eq('user_id', authUser.id)
            .maybeSingle()

        setUser({
            id: userData?.id || '',
            plan: userData?.plan || 'lite',
            isActive: subData?.status === 'active'
        })

        const { data: newsData } = await supabase
            .from('news')
            .select('*')
            .eq('user_id', authUser.id)
            .order('created_at', { ascending: false })

        setNews(newsData || [])
        setLoading(false)
    }

    async function handleCreate() {
        if (!user?.isActive) return

        if (!newTitle.trim() || !newContent.trim()) {
            setError('タイトルと本文を入力してください')
            setTimeout(() => setError(''), 5000)
            return
        }

        if (user?.plan === 'lite' && news.length >= 3) {
            setError('Lite プランは最大3件までです。Standard または Pro プランへのアップグレードをご検討ください。')
            setTimeout(() => setError(''), 8000)
            return
        }

        setPublishing(true)
        setError('')
        setSuccess('')

        const { error: insertError } = await supabase
            .from('news')
            .insert({
                user_id: user!.id,
                title: newTitle.trim(),
                content: newContent.trim(),
                is_published: true,
                published_at: new Date().toISOString(),
            })

        if (insertError) {
            setError('投稿に失敗しました。もう一度お試しください。')
            setTimeout(() => setError(''), 5000)
            setPublishing(false)
            return
        }

        setSuccess('新着情報を公開しました')
        setTimeout(() => setSuccess(''), 5000)
        setNewTitle('')
        setNewContent('')
        setShowNewForm(false)
        setPublishing(false)
        loadData()
    }

    async function handleTogglePublish(id: string, currentStatus: boolean) {
        if (!user?.isActive) return
        await supabase
            .from('news')
            .update({
                is_published: !currentStatus,
                published_at: !currentStatus ? new Date().toISOString() : null,
            })
            .eq('id', id)

        loadData()
    }

    async function handleDelete(id: string) {
        if (!user?.isActive) return
        if (!confirm('この新着情報を削除してもよろしいですか？')) return

        await supabase.from('news').delete().eq('id', id)
        setSuccess('削除しました')
        setTimeout(() => setSuccess(''), 3000)
        loadData()
    }

    const maxNews = user?.plan === 'lite' ? 3 : 999
    const canCreateMore = (news.length < maxNews) && user?.isActive

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
            <div className="max-w-5xl mx-auto">
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
                                新着情報管理
                            </h1>
                            <p className="text-slate-300 text-sm">
                                {user?.plan === 'lite' ? (
                                    <>
                                        <span className={news.length >= 3 ? 'text-yellow-400' : 'text-cyan-400'}>
                                            {news.length}/3 件
                                        </span>
                                        <span className="text-slate-400 ml-2">(Lite プラン制限)</span>
                                    </>
                                ) : (
                                    <span className="text-cyan-400">{news.length} 件</span>
                                )}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: canCreateMore ? 1.05 : 1 }}
                            whileTap={{ scale: canCreateMore ? 0.95 : 1 }}
                            onClick={() => canCreateMore && setShowNewForm(!showNewForm)}
                            disabled={!canCreateMore}
                            className={`neon-button inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-900 ${!canCreateMore ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <Plus className="w-5 h-5" />
                            <span>新規作成</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* エラー・成功メッセージ */}
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
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-green-300 text-sm leading-relaxed">{success}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 新規作成フォーム */}
                <AnimatePresence>
                    {showNewForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                            className="overflow-hidden mb-8"
                        >
                            <div className="glass-card p-6 md:p-8">
                                <h2 className="text-2xl font-light text-white mb-6">新しい新着情報</h2>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-200 mb-2">
                                            タイトル
                                        </label>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            placeholder="例: 新サービスのお知らせ"
                                            className="hologram-input w-full px-4 py-3 rounded-lg transition-all duration-900"
                                            maxLength={100}
                                        />
                                        <p className="text-xs text-slate-400 mt-1">{newTitle.length}/100</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-200 mb-2">
                                            本文
                                        </label>
                                        <textarea
                                            value={newContent}
                                            onChange={(e) => setNewContent(e.target.value)}
                                            placeholder="訪問者に伝えたい内容を入力してください..."
                                            rows={8}
                                            className="hologram-input w-full px-4 py-3 rounded-lg resize-none transition-all duration-900"
                                            maxLength={1000}
                                        />
                                        <p className="text-xs text-slate-400 mt-1">{newContent.length}/1000</p>
                                    </div>

                                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCreate}
                                            disabled={publishing}
                                            className="neon-button px-6 py-3 rounded-lg flex-1 transition-all duration-900"
                                        >
                                            {publishing ? '公開中...' : '公開する'}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setShowNewForm(false)
                                                setError('')
                                                setNewTitle('')
                                                setNewContent('')
                                            }}
                                            className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-900"
                                        >
                                            キャンセル
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* News 一覧 */}
                <div className="space-y-4">
                    {news.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9 }}
                            className="glass-card p-12 text-center"
                        >
                            <p className="text-slate-400 text-lg font-light">まだ新着情報がありません</p>
                            <p className="text-slate-500 text-sm mt-2">「新規作成」から最初の投稿を作成しましょう</p>
                        </motion.div>
                    ) : (
                        news.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                className="glass-card p-6 group"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-2 flex-wrap">
                                            <h3 className="text-xl font-medium text-white truncate">{item.title}</h3>
                                            {item.is_published ? (
                                                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs whitespace-nowrap">
                                                    <Eye className="w-3 h-3" />
                                                    <span>公開中</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-500/20 text-slate-400 text-xs whitespace-nowrap">
                                                    <EyeOff className="w-3 h-3" />
                                                    <span>非公開</span>
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-300 text-sm mb-3 line-clamp-2 leading-relaxed">{item.content}</p>
                                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                                            <span className="flex items-center space-x-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(item.created_at).toLocaleDateString('ja-JP')}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleTogglePublish(item.id, item.is_published)}
                                            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-900"
                                            title={item.is_published ? '非公開にする' : '公開する'}
                                        >
                                            {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-900"
                                            title="削除"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* フッター */}
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
                        <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform duration-900" />
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
