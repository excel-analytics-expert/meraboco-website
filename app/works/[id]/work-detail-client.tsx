"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"

type WorkData = {
    category: string
    title: string
    client: string
    period: string
    image: string
    description: string
    challenge: string
    solution: string
    result: string[]
    technologies: string[]
    url?: string
    googleRating?: number
    googleReviews?: number
    seoMetrics?: {
        label: string
        value: string
        status: "excellent" | "good" | "average"
    }[]
}

type Props = {
    id: string
    workJa: WorkData
    workEn: WorkData
}

export default function WorkDetailClient({ id, workJa, workEn }: Props) {
    const { language } = useLanguage()
    const work = language === "ja" ? workJa : workEn

    const labels = language === "ja" ? {
        client: "クライアント",
        period: "期間",
        googleRating: "Google評価",
        reviews: "件",
        projectOverview: "プロジェクト概要",
        challenge: "課題",
        solution: "ソリューション",
        results: "成果",
        technologies: "使用技術",
        visitSite: "サイトを見る",
        backToWorks: "実績一覧に戻る",
        contact: "お問い合わせ",
        ctaTitle: "同様のプロジェクトをご検討ですか？",
        ctaText: "お気軽にご相談ください。無料でお見積りいたします。",
    } : {
        client: "Client",
        period: "Period",
        googleRating: "Google Rating",
        reviews: "reviews",
        projectOverview: "Project Overview",
        challenge: "Challenge",
        solution: "Solution",
        results: "Results",
        technologies: "Technologies Used",
        visitSite: "Visit Site",
        backToWorks: "Back to Portfolio",
        contact: "Contact Us",
        ctaTitle: "Considering a similar project?",
        ctaText: "Feel free to contact us. Free estimates available.",
    }

    return (
        <>
            <Header />
            <main className="pt-20">
                <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-6">
                                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                    {work.category}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{work.title}</h1>
                            <div className="flex flex-wrap gap-6 text-gray-600">
                                <div>
                                    <span className="font-semibold">{labels.client}:</span> {work.client}
                                </div>
                                <div>
                                    <span className="font-semibold">{labels.period}:</span> {work.period}
                                </div>
                            </div>
                            {work.googleRating && (
                                <div className="mt-6 flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-bold text-yellow-500">{work.googleRating}</span>
                                        <div>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className={`fas fa-star ${i < Math.floor(work.googleRating!) ? "text-yellow-500" : "text-gray-300"}`}
                                                    ></i>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {labels.googleRating} ({work.googleReviews}{labels.reviews})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-12">
                                <Image
                                    src={work.image || "/placeholder.svg"}
                                    alt={work.title}
                                    width={1200}
                                    height={675}
                                    className="w-full rounded-xl shadow-2xl"
                                />
                            </div>

                            {work.seoMetrics && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                    {work.seoMetrics.map((metric) => (
                                        <div
                                            key={metric.label}
                                            className={`p-4 rounded-lg text-center ${metric.status === "excellent"
                                                ? "bg-green-50 border border-green-200"
                                                : metric.status === "good"
                                                    ? "bg-blue-50 border border-blue-200"
                                                    : "bg-gray-50 border border-gray-200"
                                                }`}
                                        >
                                            <div
                                                className={`text-2xl font-bold ${metric.status === "excellent"
                                                    ? "text-green-600"
                                                    : metric.status === "good"
                                                        ? "text-blue-600"
                                                        : "text-gray-600"
                                                    }`}
                                            >
                                                {metric.value}
                                            </div>
                                            <div className="text-sm text-gray-600">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">{labels.projectOverview}</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">{work.description}</p>

                                <h2 className="text-2xl font-bold mb-4 text-gray-900">{labels.challenge}</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">{work.challenge}</p>

                                <h2 className="text-2xl font-bold mb-4 text-gray-900">{labels.solution}</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">{work.solution}</p>

                                <h2 className="text-2xl font-bold mb-4 text-gray-900">{labels.results}</h2>
                                <ul className="space-y-3 mb-8">
                                    {work.result.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h2 className="text-2xl font-bold mb-4 text-gray-900">{labels.technologies}</h2>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {work.technologies.map((tech) => (
                                        <span key={tech} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {work.url && (
                                    <div className="mt-8">
                                        <a
                                            href={work.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <i className="fas fa-external-link-alt"></i>
                                            {labels.visitSite}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">{labels.ctaTitle}</h2>
                        <p className="text-lg mb-8 text-blue-100">{labels.ctaText}</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/#contact"
                                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                            >
                                {labels.contact}
                            </Link>
                            <Link
                                href="/works"
                                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
                            >
                                {labels.backToWorks}
                            </Link>
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    )
}