"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"

export default function PrivacyClient() {
  const { language } = useLanguage()
  const isJa = language === "ja"

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader
          title={isJa ? "プライバシーポリシー" : "Privacy Policy"}
          description={
            isJa
              ? "メラボコは、お客様の個人情報保護の重要性について認識し、適切な取り扱いと保護に努めます。"
              : "Meraboco recognizes the importance of protecting personal information and strives for proper handling and safeguarding."
          }
        />

        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-balance">
              {isJa ? "プライバシーポリシー" : "Privacy Policy"}
            </h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              {isJa
                ? "メラボコ（以下「当社」）は、お客様の個人情報保護の重要性について認識し、適切な取り扱いと保護に努めます。"
                : "Meraboco (\"the Company\") recognizes the importance of protecting personal information and is committed to proper handling and protection."}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6">{isJa ? "重要事項（決済と辞退ルール）" : "Important Notices (Payment & Withdrawal)"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa
                  ? "スマートプランは即時決済のみとし、デジタル資産の性質上、返金は不可とします。"
                  : "Smart plans are immediate-payment only, and refunds are not available due to the nature of digital assets."}
              </p>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "オーダーメイドプランは、セキュリティ保持費用により見積後から毎日料金が加算され、2週間で自動辞退となります。"
                  : "For custom plans, daily fees accrue after an estimate due to security holding costs, and the request is automatically withdrawn after two weeks."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "1. 個人情報の定義" : "1. Definition of Personal Information"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "本プライバシーポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含む）を指します。"
                  : "In this Privacy Policy, “personal information” refers to information about a living individual that can identify a specific person by name, date of birth, address, phone number, email address, or other descriptions, including information that can be matched with other data to identify a specific individual."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "2. 個人情報の収集" : "2. Collection of Personal Information"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa ? "当社は、以下の目的のために個人情報を収集します。" : "We collect personal information for the following purposes:"}
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                {(isJa
                  ? [
                      "お問い合わせ対応、見積もり提示のため",
                      "サービス提供、契約履行のため",
                      "サポート、メンテナンス対応のため",
                      "新サービスや製品のご案内のため",
                      "アンケート調査や各種イベントのご案内のため",
                      "統計データの作成（個人を特定できない形式）",
                    ]
                  : [
                      "Responding to inquiries and providing estimates",
                      "Providing services and fulfilling contracts",
                      "Support and maintenance",
                      "Information about new services or products",
                      "Surveys and event announcements",
                      "Creating statistical data in a non-identifiable form",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "3. 収集する個人情報の項目" : "3. Categories of Personal Information Collected"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa ? "当社が収集する個人情報は以下の通りです。" : "We collect the following personal information:"}
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                {(isJa
                  ? ["氏名、会社名、部署名", "メールアドレス、電話番号", "住所、郵便番号", "お問い合わせ内容", "当社WEBサイトの閲覧履歴（Cookie情報等）"]
                  : [
                      "Name, company name, department",
                      "Email address, phone number",
                      "Address, postal code",
                      "Inquiry content",
                      "Browsing history on our website (cookie data, etc.)",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "4. 個人情報の利用" : "4. Use of Personal Information"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "当社は、収集した個人情報を、収集目的の範囲内で利用します。本人の同意なく、目的外での利用は行いません。"
                  : "We use collected personal information within the scope of the stated purposes and do not use it for other purposes without consent."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "5. 個人情報の第三者提供" : "5. Provision to Third Parties"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa
                  ? "当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。"
                  : "We do not provide personal information to third parties except in the following cases:"}
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                {(isJa
                  ? [
                      "お客様の同意がある場合",
                      "法令に基づく場合",
                      "人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合",
                      "国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合",
                    ]
                  : [
                      "When you have given consent",
                      "When required by law",
                      "When necessary to protect life, body, or property and consent is difficult to obtain",
                      "When cooperation is required for a national or local government agency or its delegate to perform legally mandated duties",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "6. 個人情報の管理" : "6. Management of Personal Information"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "当社は、個人情報の漏洩、滅失、毀損等を防止するため、適切なセキュリティ対策を実施します。また、個人情報は正確かつ最新の内容に保つよう努めます。"
                  : "We implement appropriate security measures to prevent leakage, loss, or damage of personal information and strive to keep it accurate and up to date."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "7. Cookieについて" : "7. Cookies"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "当社のWEBサイトでは、サービス向上のためCookieを使用しています。Cookieは、お客様のブラウザを識別するための小さなデータファイルです。Cookieの使用を希望されない場合は、ブラウザの設定で無効化できますが、一部機能が制限される場合があります。"
                  : "Our website uses cookies to improve services. Cookies are small data files that identify your browser. You can disable cookies in your browser settings, but some features may be limited."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "8. Google Analyticsの利用" : "8. Use of Google Analytics"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa
                  ? "当社のWEBサイトでは、サイトの利用状況を把握し、サービス向上のためにGoogle Analyticsを使用しています。"
                  : "We use Google Analytics to understand site usage and improve our services."}
              </p>
              <p className="leading-relaxed mb-4">
                {isJa
                  ? "Google Analyticsは、当サイトが発行するCookie（クッキー）を利用して、訪問者のサイト利用状況（アクセス状況、トラフィック、閲覧ページ等）を分析します。このCookieにより生成された情報は、Google社のサーバーに送信・保存されます。"
                  : "Google Analytics uses cookies issued by our site to analyze usage (access status, traffic, pages viewed, etc.). Information generated by these cookies is sent to and stored on Google servers."}
              </p>
              <p className="leading-relaxed mb-4">
                <strong>{isJa ? "重要：" : "Important:"}</strong>{" "}
                {isJa
                  ? "Google Analyticsで収集されるデータは匿名化されており、訪問者個人を特定できる情報（お名前、メールアドレス、Googleアカウント情報など）は含まれません。IPアドレスも匿名化処理されます。"
                  : "Data collected by Google Analytics is anonymized and does not include personally identifiable information (name, email address, Google account information, etc.). IP addresses are also anonymized."}
              </p>
              <p className="leading-relaxed mb-4">
                {isJa ? "Google Analyticsの使用を希望されない場合は、" : "If you do not wish to use Google Analytics, "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {isJa ? "Google Analyticsオプトアウトアドオン" : "Google Analytics Opt-out Add-on"}
                </a>
                {isJa ? "をブラウザに追加することで、データ収集を無効化できます。" : " can be added to your browser to disable data collection."}
              </p>
              <p className="leading-relaxed mb-8">
                {isJa ? "Google Analyticsの利用規約及びプライバシーポリシーについては、" : "For Google Analytics terms and privacy policy, please review the "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {isJa ? "Googleのプライバシーポリシー" : "Google Privacy Policy"}
                </a>
                {isJa ? "及び" : " and the "}
                <a
                  href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mx-1"
                >
                  {isJa ? "Google Analyticsの利用規約" : "Google Analytics Terms of Service"}
                </a>
                {isJa ? "をご確認ください。" : "."}
              </p>

              <h2 className="text-3xl font-bold mb-6">
                {isJa ? "9. 個人情報の開示・訂正・削除" : "9. Disclosure, Correction, and Deletion"}
              </h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "お客様は、当社が保有する自己の個人情報について、開示、訂正、利用停止、削除を請求することができます。ご請求の際は、本人確認のうえ、合理的な期間内に対応いたします。お問い合わせは、下記の連絡先までお願いいたします。"
                  : "You may request disclosure, correction, suspension of use, or deletion of your personal information held by us. We will respond within a reasonable timeframe after identity verification. Please contact us at the address below."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "10. プライバシーポリシーの変更" : "10. Changes to This Policy"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "当社は、法令の変更や社会情勢の変化に応じて、本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当社WEBサイトに掲載した時点から効力を生じるものとします。"
                  : "We may update this Privacy Policy in response to legal changes or social circumstances. The revised policy becomes effective when posted on our website."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "11. お問い合わせ窓口" : "11. Contact"}</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2">
                  <strong>{isJa ? "メラボコ" : "Meraboco"}</strong>
                </p>
                <p className="mb-2">
                  {isJa ? "〒107-0061 東京都港区北青山1-3-3" : "1-3-3 Kita-Aoyama, Minato-ku, Tokyo 107-0061, Japan"}
                </p>
                <p className="mb-2">
                  Email:{" "}
                  <a href="mailto:info@meraboco.jp" className="text-blue-600 hover:underline">
                    info@meraboco.jp
                  </a>
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-12">{isJa ? "制定日：2025年1月1日" : "Effective date: Jan 1, 2025"}</p>
              <p className="text-sm text-gray-600">{isJa ? "最終更新日：2026年1月5日" : "Last updated: Jan 5, 2026"}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
