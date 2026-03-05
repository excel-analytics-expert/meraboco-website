"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, CheckCircle2, Clock, AlertCircle, Trash2, Download } from "lucide-react"

type DiagnosticRecord = {
    id: string
    created_at: string
    email: string
    url: string
    status: string
    analysis_result?: string
}

export default function DiagnosticsClient({ initialData }: { initialData: DiagnosticRecord[] }) {
    const [diagnostics, setDiagnostics] = useState<DiagnosticRecord[]>(initialData)
    const [processingId, setProcessingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // AI診断実行処理
    const handleExecuteAI = async (id: string, url: string) => {
        setProcessingId(id)
        setErrorMessage(null)

        try {
            const res = await fetch("/api/admin/diagnose-execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, url })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "診断の実行に失敗しました")
            }

            setDiagnostics(prev =>
                prev.map(d =>
                    d.id === id
                        ? { ...d, status: 'done', analysis_result: data.analysis_result }
                        : d
                )
            )
        } catch (error: any) {
            console.error(error)
            setErrorMessage(error.message)
        } finally {
            setProcessingId(null)
        }
    }

    // 削除処理
    const handleDelete = async (id: string) => {
        if (!window.confirm("この診断リクエストを本当に削除しますか？\n削除すると元に戻せません。")) return

        setDeletingId(id)
        setErrorMessage(null)

        try {
            const res = await fetch("/api/admin/diagnose-delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "削除に失敗しました")
            }

            // 成功した場合、ローカルのステートから対象を削除（アニメーションで消える）
            setDiagnostics(prev => prev.filter(d => d.id !== id))
        } catch (error: any) {
            console.error(error)
            setErrorMessage(error.message)
        } finally {
            setDeletingId(null)
        }
    }

    // CSVダウンロード処理（Excel文字化け対策BOM付き）
    const handleDownloadCSV = () => {
        const headers = ["受付日時", "お客様メールアドレス", "対象URL", "ステータス", "診断結果"]

        const csvRows = diagnostics.map(d => {
            const date = new Date(d.created_at).toLocaleString('ja-JP').replace(/,/g, '')
            const result = d.analysis_result ? `"${d.analysis_result.replace(/"/g, '""')}"` : ""
            return `${date},${d.email},${d.url},${d.status},${result}`
        })

        const csvContent = [headers.join(","), ...csvRows].join("\n")
        // Excelで開く際の文字化けを防ぐため、UTF-8のBOMを付与
        const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" })

        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `診断リクエスト一覧_${new Date().getTime()}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="min-h-screen bg-stone-50 py-16 px-6 lg:px-12 font-sans text-stone-800 selection:bg-orange-200">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight mb-3">
                            診断リクエスト管理
                        </h1>
                        <p className="text-stone-500 text-lg font-medium">
                            ユーザーからのAI診断リクエスト状況をご確認いただけます。
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadCSV}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-stone-200 text-sm font-bold text-stone-600 shadow-sm hover:shadow-md hover:border-orange-200 hover:text-orange-600 transition-all duration-300"
                    >
                        <Download className="w-4 h-4" />
                        CSVダウンロード
                    </motion.button>
                </motion.div>

                <AnimatePresence>
                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2 text-sm font-medium"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-50/80 border-b border-stone-100 text-stone-500 text-sm font-semibold tracking-wide">
                                    <th className="py-6 px-8 whitespace-nowrap w-48">受付日時</th>
                                    <th className="py-6 px-8 whitespace-nowrap min-w-[200px]">お客様情報 / URL</th>
                                    <th className="py-6 px-8 whitespace-nowrap min-w-[300px]">診断結果 (AI回答)</th>
                                    <th className="py-6 px-8 whitespace-nowrap w-32">ステータス</th>
                                    <th className="py-6 px-8 text-right whitespace-nowrap w-56">アクション</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {diagnostics.map((item, index) => (
                                        <motion.tr
                                            key={item.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, backgroundColor: "#fef2f2" }}
                                            transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                                            className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors duration-500"
                                        >
                                            <td className="py-6 px-8 text-sm text-stone-600 font-medium align-top">
                                                {new Date(item.created_at).toLocaleString('ja-JP')}
                                            </td>
                                            <td className="py-6 px-8 align-top">
                                                <div className="text-sm font-bold text-stone-800 mb-1">{item.email}</div>
                                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 hover:text-orange-700 underline underline-offset-4 decoration-orange-200 hover:decoration-orange-500 transition-colors duration-300 break-all">
                                                    {item.url}
                                                </a>
                                            </td>
                                            <td className="py-6 px-8 align-top">
                                                {item.analysis_result ? (
                                                    <div className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap bg-stone-50 p-4 rounded-xl border border-stone-100">
                                                        {item.analysis_result}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-stone-400">まだ診断されていません</span>
                                                )}
                                            </td>
                                            <td className="py-6 px-8 align-top">
                                                {item.status === 'pending' ? (
                                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100/50 shadow-sm">
                                                        <Clock className="w-3.5 h-3.5" /> 未実施
                                                    </span>
                                                ) : item.status === 'done' ? (
                                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100/50 shadow-sm">
                                                        <CheckCircle2 className="w-3.5 h-3.5" /> 診断完了
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-bold border border-stone-200/50 shadow-sm">
                                                        <AlertCircle className="w-3.5 h-3.5" /> {item.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-6 px-8 text-right align-top">
                                                <div className="flex items-center justify-end gap-3">
                                                    <motion.button
                                                        whileHover={{ scale: item.status === 'pending' && processingId !== item.id ? 1.02 : 1 }}
                                                        whileTap={{ scale: item.status === 'pending' && processingId !== item.id ? 0.98 : 1 }}
                                                        disabled={item.status !== 'pending' || processingId === item.id || deletingId === item.id}
                                                        onClick={() => handleExecuteAI(item.id, item.url)}
                                                        className={`inline-flex items-center justify-center min-w-[130px] gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-500 shadow-sm ${item.status === 'pending'
                                                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400 focus:outline-none focus:ring-4 focus:ring-orange-500/20'
                                                                : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200/50'
                                                            }`}
                                                    >
                                                        {processingId === item.id ? (
                                                            <>
                                                                <motion.div
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                                />
                                                                実行中
                                                            </>
                                                        ) : item.status === 'pending' ? (
                                                            <>
                                                                <Play className="w-4 h-4 fill-current" /> 診断実行
                                                            </>
                                                        ) : (
                                                            "完了済み"
                                                        )}
                                                    </motion.button>

                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        disabled={deletingId === item.id || processingId === item.id}
                                                        className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:opacity-50"
                                                        title="削除する"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                    {diagnostics.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-16 text-center text-stone-400 font-medium">
                                                現在、診断リクエストはありません。
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}