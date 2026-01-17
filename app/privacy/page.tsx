import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "メラボコのプライバシーポリシー。個人情報の取り扱いについてご説明します。",
  openGraph: {
    title: "プライバシーポリシー | メラボコ",
    description: "個人情報の取り扱いについてご説明します。",
    url: "https://meraboco.jp/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader
          title="プライバシーポリシー"
          description="メラボコは、お客様の個人情報保護の重要性について認識し、適切な取り扱いと保護に努めます。"
        />

        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">プライバシーポリシー</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              メラボコ（以下「当社」）は、お客様の個人情報保護の重要性について認識し、
              <br />
              適切な取り扱いと保護に努めます。
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6">1. 個人情報の定義</h2>
              <p className="leading-relaxed mb-8">
                本プライバシーポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含む）を指します。
              </p>

              <h2 className="text-3xl font-bold mb-6">2. 個人情報の収集</h2>
              <p className="leading-relaxed mb-4">当社は、以下の目的のために個人情報を収集します。</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>お問い合わせ対応、見積もり提示のため</li>
                <li>サービス提供、契約履行のため</li>
                <li>サポート、メンテナンス対応のため</li>
                <li>新サービスや製品のご案内のため</li>
                <li>アンケート調査や各種イベントのご案内のため</li>
                <li>統計データの作成（個人を特定できない形式）</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">3. 収集する個人情報の項目</h2>
              <p className="leading-relaxed mb-4">当社が収集する個人情報は以下の通りです。</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>氏名、会社名、部署名</li>
                <li>メールアドレス、電話番号</li>
                <li>住所、郵便番号</li>
                <li>お問い合わせ内容</li>
                <li>当社WEBサイトの閲覧履歴（Cookie情報等）</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">4. 個人情報の利用</h2>
              <p className="leading-relaxed mb-8">
                当社は、収集した個人情報を、収集目的の範囲内で利用します。本人の同意なく、目的外での利用は行いません。
              </p>

              <h2 className="text-3xl font-bold mb-6">5. 個人情報の第三者提供</h2>
              <p className="leading-relaxed mb-4">
                当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                </li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">6. 個人情報の管理</h2>
              <p className="leading-relaxed mb-8">
                当社は、個人情報の漏洩、滅失、毀損等を防止するため、適切なセキュリティ対策を実施します。また、個人情報は正確かつ最新の内容に保つよう努めます。
              </p>

              <h2 className="text-3xl font-bold mb-6">7. Cookieについて</h2>
              <p className="leading-relaxed mb-8">
                当社のWEBサイトでは、サービス向上のためCookieを使用しています。Cookieは、お客様のブラウザを識別するための小さなデータファイルです。Cookieの使用を希望されない場合は、ブラウザの設定で無効化できますが、一部機能が制限される場合があります。
              </p>

              <h2 className="text-3xl font-bold mb-6">8. Google Analyticsの利用</h2>
              <p className="leading-relaxed mb-4">
                当社のWEBサイトでは、サイトの利用状況を把握し、サービス向上のためにGoogle Analyticsを使用しています。
              </p>
              <p className="leading-relaxed mb-4">
                Google
                Analyticsは、当サイトが発行するCookie（クッキー）を利用して、訪問者のサイト利用状況（アクセス状況、トラフィック、閲覧ページ等）を分析します。このCookieにより生成された情報は、Google社のサーバーに送信・保存されます。
              </p>
              <p className="leading-relaxed mb-4">
                <strong>重要：</strong>Google
                Analyticsで収集されるデータは匿名化されており、訪問者個人を特定できる情報（お名前、メールアドレス、Googleアカウント情報など）は含まれません。IPアドレスも匿名化処理されます。
              </p>
              <p className="leading-relaxed mb-4">
                Google Analyticsの使用を希望されない場合は、
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Analyticsオプトアウトアドオン
                </a>
                をブラウザに追加することで、データ収集を無効化できます。
              </p>
              <p className="leading-relaxed mb-8">
                Google Analyticsの利用規約及びプライバシーポリシーについては、
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Googleのプライバシーポリシー
                </a>
                及び
                <a
                  href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mx-1"
                >
                  Google Analyticsの利用規約
                </a>
                をご確認ください。
              </p>

              <h2 className="text-3xl font-bold mb-6">9. 個人情報の開示・訂正・削除</h2>
              <p className="leading-relaxed mb-8">
                お客様は、当社が保有する自己の個人情報について、開示、訂正、利用停止、削除を請求することができます。ご請求の際は、本人確認のうえ、合理的な期間内に対応いたします。お問い合わせは、下記の連絡先までお願いいたします。
              </p>

              <h2 className="text-3xl font-bold mb-6">10. プライバシーポリシーの変更</h2>
              <p className="leading-relaxed mb-8">
                当社は、法令の変更や社会情勢の変化に応じて、本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当社WEBサイトに掲載した時点から効力を生じるものとします。
              </p>

              <h2 className="text-3xl font-bold mb-6">11. お問い合わせ窓口</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2">
                  <strong>メラボコ</strong>
                </p>
                <p className="mb-2">〒107-0061 東京都港区北青山1-3-3</p>
                <p className="mb-2">
                  Email:{" "}
                  <a href="mailto:meraboco.2025.8@gmail.com" className="text-blue-600 hover:underline">
                    meraboco.2025.8@gmail.com
                  </a>
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-12">制定日：2025年1月1日</p>
              <p className="text-sm text-gray-600">最終更新日：2026年1月5日</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
