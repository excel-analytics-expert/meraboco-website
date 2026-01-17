import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "WEB制作",
  description:
    "企業サイト、ECサイト、ランディングページなど、戦略的なWEBサイト制作サービス。レスポンシブデザイン、SEO対策、CMSで運用しやすいサイトを構築します。",
  openGraph: {
    title: "WEB制作 | メラボコ",
    description: "企業サイト、ECサイト、ランディングページなど、戦略的なWEBサイト制作サービス。",
    url: "https://meraboco.jp/services/web-production",
  },
}

export default function WebProductionPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">WEB制作</h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              目的に応じた戦略的なWEBサイトで、
              <br />
              ビジネスの成長を加速させます。
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">このような課題を解決します</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <i className="fas fa-check-circle text-blue-600"></i>
                    古いサイトを最新デザインにリニューアルしたい
                  </h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <i className="fas fa-check-circle text-blue-600"></i>
                    スマホ対応していないサイトを改善したい
                  </h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <i className="fas fa-check-circle text-blue-600"></i>
                    検索エンジンで上位表示されるサイトを作りたい
                  </h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <i className="fas fa-check-circle text-blue-600"></i>
                    自分で更新できるサイトにしたい
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">提供サービス</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-building text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">コーポレートサイト</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  企業の信頼性を高める、プロフェッショナルなコーポレートサイトを制作します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shopping-cart text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">ECサイト</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  売上を最大化する、使いやすいECサイトを構築します。決済システムも完備。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-rocket text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">LP制作</h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  コンバージョンを最大化する、戦略的なランディングページを制作します。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">選ばれる理由</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  01
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">最新技術で高速・安全</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Next.js、React等の最新技術を活用し、高速で安全なWEBサイトを構築します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">SEO対策万全</h3>
                  <p className="text-gray-600 leading-relaxed">
                    検索エンジンに最適化された構造で、Googleでの上位表示を実現します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  03
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">レスポンシブデザイン</h3>
                  <p className="text-gray-600 leading-relaxed">
                    PC、タブレット、スマートフォン、すべてのデバイスで最適な表示を実現します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  04
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">運用しやすいCMS</h3>
                  <p className="text-gray-600 leading-relaxed">
                    専門知識がなくても、お客様自身で簡単にコンテンツを更新できます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">まずはお気軽にご相談ください</h2>
            <p className="text-lg mb-8 text-blue-100">お見積もり・ご相談は無料です</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
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
