"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"
import Head from "next/head"

export default function LawPage() {
    const { language, translations } = useLanguage()
    const t = translations[language].lawPage

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t.title,
        "description": t.description,
        "publisher": {
            "@type": "Organization",
            "name": "メラボコ",
            "logo": {
                "@type": "ImageObject",
                "url": "https://meraboco.jp/assets/logo.png"
            }
        }
    }

    return (
        <>
            {/* noindex設定をHEADに注入 */}
            <Head>
                <title>{t.title} | メラボコ</title>
                <meta name="description" content={t.description} />
                <meta name="robots" content="noindex, follow" />
            </Head>

            <Header />
            <PageBreadcrumb />
            <main className="pt-20">
                <PageHeader
                    title={t.title}
                    description={t.intro}
                />

                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-balance text-stone-800">{t.title}</h1>
                            <p className="text-gray-600">
                                {t.notice}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="pb-16 md:pb-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
                            <div className="space-y-10">
                                {/* 販売業者 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.seller.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.seller.value}</dd>
                                </div>

                                {/* 運営責任者 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.representative.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.representative.value}</dd>
                                </div>

                                {/* 所在地 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.location.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.location.value}</dd>
                                </div>

                                {/* 電話番号 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.phone.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">
                                        <a href={`tel:${t.phone.value}`} className="hover:text-blue-600 transition-colors">{t.phone.value}</a>
                                    </dd>
                                </div>

                                {/* メールアドレス */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.email.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">
                                        <a href={`mailto:${t.email.value}`} className="hover:text-blue-600 transition-colors">{t.email.value}</a>
                                    </dd>
                                </div>

                                {/* 販売価格 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.price.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.price.value}</dd>
                                </div>

                                {/* 必要料金 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.otherCharges.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.otherCharges.value}</dd>
                                </div>

                                {/* 支払方法 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.paymentMethod.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.paymentMethod.value}</dd>
                                </div>

                                {/* 支払時期 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.paymentTime.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">
                                        <ul className="list-disc pl-5 space-y-1">
                                            {t.paymentTime.value.map((item: string, idx: number) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </dd>
                                </div>

                                {/* 役務の提供時期 */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.deliveryTime.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.deliveryTime.value}</dd>
                                </div>

                                {/* 返品・キャンセル */}
                                <div className="grid md:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                                    <dt className="font-bold text-stone-800 text-lg">{t.returns.label}</dt>
                                    <dd className="md:col-span-2 text-gray-600 leading-relaxed">{t.returns.value}</dd>
                                </div>
                            </div>

                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-500 text-right">{t.updatedAt}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 構造化データ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </main>
            <Footer />
        </>
    )
}
