import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ITコンサルティング",
  description:
    "IT戦略立案からDX推進まで、経営課題の解決をサポート。システム選定、業務改善、デジタル変革をトータルで支援します。",
  openGraph: {
    title: "ITコンサルティング | メラボコ",
    description: "IT戦略立案からDX推進まで、経営課題の解決をサポートします。",
    url: "https://meraboco.jp/services/consulting",
  },
}

export default function ConsultingPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-teal-50 to-teal-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">ITコンサルティング</h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              IT戦略とデジタル変革で、
              <br />
              ビジネスの成長を加速します。
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">こんなお悩みありませんか？</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
                  <p className="leading-relaxed">ITシステムの導入を検討しているが、何から始めればいいかわからない</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
                  <p className="leading-relaxed">業務効率化を進めたいが、どのツールを選べばいいかわからない</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
                  <p className="leading-relaxed">DXを推進したいが、社内にITの知識を持つ人材がいない</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
                  <p className="leading-relaxed">IT投資の費用対効果が見えず、経営判断ができない</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">提供サービス</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-route text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">IT戦略立案</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  経営目標に基づいた、中長期的なIT戦略ロードマップを策定します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tasks text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">業務プロセス改善</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  現状の業務フローを分析し、ITを活用した効率化を提案します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clipboard-check text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">システム選定支援</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  業務に最適なシステム・ツールの選定をサポートします。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-pie text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">DX推進支援</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  デジタルトランスフォーメーションの戦略立案から実行まで支援します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-3xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">セキュリティ診断</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  情報セキュリティのリスク診断と対策提案を行います。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-graduation-cap text-3xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">IT教育・研修</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  社員向けのITリテラシー向上研修を実施します。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">コンサルティングの流れ</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  01
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">現状把握・課題抽出</h3>
                  <p className="text-gray-600 leading-relaxed">
                    経営課題、業務フロー、既存システムを詳しくヒアリングし、課題を特定します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">分析・戦略立案</h3>
                  <p className="text-gray-600 leading-relaxed">
                    現状を分析し、費用対効果を考慮した最適なIT戦略を立案します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  03
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">提案・合意形成</h3>
                  <p className="text-gray-600 leading-relaxed">
                    具体的な施策、スケジュール、予算を提案し、合意を形成します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  04
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">実行支援</h3>
                  <p className="text-gray-600 leading-relaxed">
                    システム導入、業務改善の実行をハンズオンでサポートします。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  05
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">効果測定・改善</h3>
                  <p className="text-gray-600 leading-relaxed">導入後の効果を測定し、継続的な改善をサポートします。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">ITコンサルティングのご相談はこちら</h2>
            <p className="text-lg mb-8 text-teal-100">初回相談は無料です</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-bold hover:bg-teal-50 transition-colors"
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
