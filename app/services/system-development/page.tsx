import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "システム開発",
  description:
    "業務効率化システム、顧客管理、予約システムなど、お客様のニーズに合わせたカスタムシステムを開発します。クラウド対応、API連携も可能です。",
  openGraph: {
    title: "システム開発 | メラボコ",
    description: "業務効率化システム、顧客管理、予約システムなど、カスタムシステムを開発します。",
    url: "https://meraboco.jp/services/system-development",
  },
}

export default function SystemDevelopmentPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">システム開発</h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              業務効率化を実現する、
              <br />
              カスタムシステムを開発します。
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">開発実績</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-users text-green-600"></i>
                    顧客管理システム（CRM）
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    顧客情報の一元管理、営業進捗の可視化、メール配信機能を備えたCRMシステム。
                  </p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-calendar-check text-green-600"></i>
                    予約管理システム
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    オンライン予約、空き状況確認、リマインドメール、決済機能付き予約システム。
                  </p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-warehouse text-green-600"></i>
                    在庫管理システム
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    リアルタイム在庫確認、入出庫管理、発注アラート機能を持つ在庫管理システム。
                  </p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-400 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <i className="fas fa-file-invoice text-green-600"></i>
                    請求書発行システム
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    見積書・請求書の自動作成、メール送信、入金管理機能を備えた請求システム。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">開発技術</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-laptop-code text-green-600"></i>
                    フロントエンド
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      React / Next.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Tailwind CSS
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-server text-green-600"></i>
                    バックエンド
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Node.js / Python
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      PostgreSQL / MySQL
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      REST API / GraphQL
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-cloud text-green-600"></i>
                    インフラ
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Vercel / AWS / GCP
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Docker / Kubernetes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      CI/CD自動化
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-plug text-green-600"></i>
                    外部連携
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      決済API（Stripe等）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Google API連携
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Slack / LINE連携
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">開発の特徴</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white border-l-4 border-green-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">アジャイル開発</h3>
                <p className="text-gray-600 leading-relaxed">
                  短期間でのリリースと改善を繰り返し、お客様のフィードバックを反映しながら開発を進めます。
                </p>
              </div>
              <div className="bg-white border-l-4 border-green-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">セキュリティ重視</h3>
                <p className="text-gray-600 leading-relaxed">
                  最新のセキュリティ対策を実装し、個人情報や機密データを安全に保護します。
                </p>
              </div>
              <div className="bg-white border-l-4 border-green-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">スケーラブル設計</h3>
                <p className="text-gray-600 leading-relaxed">
                  ビジネスの成長に合わせて拡張可能な、柔軟なシステム設計を行います。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">システム開発のご相談はこちら</h2>
            <p className="text-lg mb-8 text-green-100">要件定義から運用まで、トータルサポート</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-colors"
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
