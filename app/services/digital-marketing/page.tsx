import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "デジタルマーケティング",
  description:
    "SEO対策、広告運用、SNSマーケティング、コンテンツマーケティングで集客を総合的に支援。データ分析に基づいた効果的な施策を提案します。",
  openGraph: {
    title: "デジタルマーケティング | メラボコ",
    description: "SEO対策、広告運用、SNSマーケティングで集客を総合的に支援します。",
    url: "https://meraboco.jp/services/digital-marketing",
  },
}

export default function DigitalMarketingPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">デジタルマーケティング</h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              データドリブンな戦略で、
              <br />
              売上と集客を最大化します。
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">提供サービス</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-search text-orange-600"></i>
                    SEO対策
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    検索エンジンで上位表示されるよう、サイト構造、コンテンツ、技術的SEOを最適化します。
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>・キーワード調査・選定</li>
                    <li>・内部SEO対策</li>
                    <li>・外部リンク獲得</li>
                    <li>・技術的SEO改善</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-bullhorn text-orange-600"></i>
                    Web広告運用
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Google広告、Meta広告などを効果的に運用し、費用対効果を最大化します。
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>・Google検索広告</li>
                    <li>・ディスプレイ広告</li>
                    <li>・Facebook/Instagram広告</li>
                    <li>・リターゲティング広告</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-share-alt text-orange-600"></i>
                    SNSマーケティング
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    各SNSの特性を活かし、ブランド認知と集客を促進します。
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>・Instagram運用代行</li>
                    <li>・X（旧Twitter）運用</li>
                    <li>・YouTube企画・運用</li>
                    <li>・SNS広告運用</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-orange-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-pen-fancy text-orange-600"></i>
                    コンテンツマーケティング
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    ユーザーに価値ある情報を提供し、自然な集客とファン化を実現します。
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>・ブログ記事制作</li>
                    <li>・ホワイトペーパー作成</li>
                    <li>・メールマガジン配信</li>
                    <li>・動画コンテンツ企画</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">選ばれる理由</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white border-l-4 border-orange-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">データ分析に基づいた戦略</h3>
                <p className="text-gray-600 leading-relaxed">
                  Google Analytics等のデータを徹底分析し、効果的な施策を立案・実行します。
                </p>
              </div>
              <div className="bg-white border-l-4 border-orange-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">定期レポートで透明性確保</h3>
                <p className="text-gray-600 leading-relaxed">
                  施策の効果を数値で可視化し、月次レポートでわかりやすくご報告します。
                </p>
              </div>
              <div className="bg-white border-l-4 border-orange-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">最新トレンドへの対応</h3>
                <p className="text-gray-600 leading-relaxed">
                  常に変化するデジタルマーケティングのトレンドをキャッチアップし、最適な施策を提案します。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">サポートの流れ</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  01
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">現状分析・目標設定</h3>
                  <p className="text-gray-600 leading-relaxed">
                    現在の状況を分析し、具体的なKPI（目標指標）を設定します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">戦略立案</h3>
                  <p className="text-gray-600 leading-relaxed">
                    ターゲット、予算、期間に基づいた、最適なマーケティング戦略を立案します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  03
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">施策実行</h3>
                  <p className="text-gray-600 leading-relaxed">
                    SEO、広告、SNS、コンテンツなど、複合的な施策を実行します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  04
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">効果測定・改善</h3>
                  <p className="text-gray-600 leading-relaxed">
                    データを分析し、PDCAサイクルを回して継続的に改善します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-orange-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">マーケティングのご相談はこちら</h2>
            <p className="text-lg mb-8 text-orange-100">無料で現状分析・改善提案いたします</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-orange-50 transition-colors"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
