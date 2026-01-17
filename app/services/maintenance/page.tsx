import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "保守・運用",
  description:
    "WEBサイト・システムの定期更新、セキュリティ対策、障害対応、サーバー監視など、安定稼働をトータルサポートします。",
  openGraph: {
    title: "保守・運用 | メラボコ",
    description: "WEBサイト・システムの定期更新、セキュリティ対策、障害対応を行います。",
    url: "https://meraboco.jp/services/maintenance",
  },
}

export default function MaintenancePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">保守・運用</h1>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              公開後も安心して運営できる、
              <br />
              万全のサポート体制。
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">保守・運用の重要性</h2>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-red-900">WEBサイトは「公開して終わり」ではありません</h3>
                <p className="text-gray-700 leading-relaxed">
                  セキュリティの脅威、プログラムの更新、コンテンツの鮮度維持など、
                  継続的な保守・運用が必要です。適切な管理がなければ、サイトの安全性とパフォーマンスは低下してしまいます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">提供サービス</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-sync-alt text-3xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">定期更新</h3>
                <ul className="space-y-2 text-gray-600 leading-relaxed">
                  <li>・CMS（WordPress等）の更新</li>
                  <li>・プラグイン・ライブラリの更新</li>
                  <li>・コンテンツの更新代行</li>
                  <li>・画像・テキストの差し替え</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-shield-alt text-3xl text-red-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">セキュリティ対策</h3>
                <ul className="space-y-2 text-gray-600 leading-relaxed">
                  <li>・脆弱性診断・修正</li>
                  <li>・SSL証明書の更新</li>
                  <li>・不正アクセス監視</li>
                  <li>・マルウェアスキャン</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-life-ring text-3xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">障害対応</h3>
                <ul className="space-y-2 text-gray-600 leading-relaxed">
                  <li>・24時間365日の監視</li>
                  <li>・障害発生時の緊急対応</li>
                  <li>・サーバーダウン復旧</li>
                  <li>・バックアップからの復元</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-tachometer-alt text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">パフォーマンス最適化</h3>
                <ul className="space-y-2 text-gray-600 leading-relaxed">
                  <li>・表示速度の改善</li>
                  <li>・画像・コードの最適化</li>
                  <li>・キャッシュの設定</li>
                  <li>・サーバーリソースの調整</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">料金プラン</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-indigo-400 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-center">ライトプラン</h3>
                <p className="text-4xl font-bold text-center mb-6 text-indigo-600">
                  ¥10,000
                  <span className="text-lg text-gray-600">/月</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>月1回のコンテンツ更新</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>セキュリティ更新</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>月次レポート</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>メールサポート</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-500 text-center">小規模サイト向け</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-4 border-indigo-600 rounded-lg p-8 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  おすすめ
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">スタンダードプラン</h3>
                <p className="text-4xl font-bold text-center mb-6 text-indigo-600">
                  ¥30,000
                  <span className="text-lg text-gray-600">/月</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>月4回のコンテンツ更新</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>セキュリティ監視・更新</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>障害対応（営業時間内）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>月次詳細レポート</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>電話・チャットサポート</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-700 text-center font-semibold">中規模サイト向け</p>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-indigo-400 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-center">プレミアムプラン</h3>
                <p className="text-4xl font-bold text-center mb-6 text-indigo-600">
                  ¥50,000
                  <span className="text-lg text-gray-600">/月</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>無制限のコンテンツ更新</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>24/365セキュリティ監視</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>24時間障害対応</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>パフォーマンス最適化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>専任担当者</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-600 mt-1"></i>
                    <span>改善提案</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-500 text-center">大規模サイト・ECサイト向け</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">保守・運用のご相談はこちら</h2>
            <p className="text-lg mb-8 text-indigo-100">最適なプランをご提案します</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
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
