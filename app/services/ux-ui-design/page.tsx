import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "UX/UIデザイン",
  description:
    "ユーザー体験を最優先に考えた、使いやすく美しいデザインを提供します。ユーザーテスト、プロトタイプ作成、デザインシステム構築まで対応。",
  openGraph: {
    title: "UX/UIデザイン | メラボコ",
    description: "ユーザー体験を最優先に考えた、使いやすく美しいデザインを提供します。",
    url: "https://meraboco.jp/services/ux-ui-design",
  },
}

export default function UXUIDesignPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">UX/UIデザイン</h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              使いやすく美しいデザインで、
              <br />
              ユーザーに最高の体験を提供します。
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">UX/UIデザインとは？</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-900">UXデザイン</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">User Experience（ユーザー体験）</p>
                  <p className="text-gray-600 leading-relaxed">
                    ユーザーが製品やサービスを使う際の「体験全体」をデザインします。使いやすさ、満足度、目的達成のしやすさを追求します。
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-purple-900">UIデザイン</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">User Interface（ユーザーインターフェース）</p>
                  <p className="text-gray-600 leading-relaxed">
                    ユーザーが実際に触れる「見た目」をデザインします。ボタン、色、レイアウトなど、視覚的な美しさと使いやすさを両立します。
                  </p>
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
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-friends text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">ユーザーリサーチ</h3>
                <p className="text-gray-600 leading-relaxed">
                  ターゲットユーザーの行動やニーズを調査し、データに基づいた設計を行います。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-pencil-ruler text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">ワイヤーフレーム作成</h3>
                <p className="text-gray-600 leading-relaxed">
                  ページ構成や情報設計を視覚化し、開発前に構造を最適化します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-paint-brush text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">ビジュアルデザイン</h3>
                <p className="text-gray-600 leading-relaxed">
                  ブランドイメージに合った、美しく洗練されたビジュアルデザインを制作します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-3xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">プロトタイプ作成</h3>
                <p className="text-gray-600 leading-relaxed">
                  実際に動くプロトタイプで、開発前にユーザビリティを検証します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-flask text-3xl text-red-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">ユーザビリティテスト</h3>
                <p className="text-gray-600 leading-relaxed">
                  実際のユーザーにテストしてもらい、改善点を洗い出します。
                </p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-layer-group text-3xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">デザインシステム</h3>
                <p className="text-gray-600 leading-relaxed">
                  一貫性のあるデザインを実現する、再利用可能なコンポーネント集を構築します。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">デザインプロセス</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  01
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">リサーチ・分析</h3>
                  <p className="text-gray-600 leading-relaxed">
                    ユーザーインタビュー、競合分析、データ分析を行い、課題を明確化します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">情報設計</h3>
                  <p className="text-gray-600 leading-relaxed">
                    サイトマップ、ユーザーフロー、ワイヤーフレームを作成し、構造を設計します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  03
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">ビジュアルデザイン</h3>
                  <p className="text-gray-600 leading-relaxed">
                    カラースキーム、タイポグラフィ、UIコンポーネントを設計し、デザインモックを作成します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  04
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">プロトタイピング</h3>
                  <p className="text-gray-600 leading-relaxed">
                    インタラクションを含むプロトタイプを作成し、ユーザビリティを検証します。
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  05
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">テスト・改善</h3>
                  <p className="text-gray-600 leading-relaxed">
                    ユーザーテストを実施し、フィードバックをもとに継続的に改善します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">デザインのご相談はこちら</h2>
            <p className="text-lg mb-8 text-purple-100">ユーザー体験の向上をサポートします</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-purple-50 transition-colors"
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
