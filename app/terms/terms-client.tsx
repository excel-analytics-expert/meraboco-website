"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"

export default function TermsClient() {
  const { language } = useLanguage()
  const isJa = language === "ja"

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader
          title={isJa ? "利用規約" : "Terms of Service"}
          description={
            isJa
              ? "メラボコが提供するサービスの利用規約を定めます。サービスをご利用いただく前に、必ずお読みください。"
              : "These Terms of Service govern the use of services provided by Meraboco. Please read them before using the services."
          }
        />

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

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第1条（適用）" : "Article 1 (Scope)"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "本規約は、当社が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を、本サービスを利用するお客様（以下「利用者」）と当社との間で定めるものです。利用者は、本規約に同意したうえで、本サービスを利用するものとします。"
                  : "These Terms set forth the conditions for using all services provided by the Company (“Services”) between users (“Users”) and the Company. Users shall use the Services after agreeing to these Terms."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第2条（定義）" : "Article 2 (Definitions)"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa ? "本規約において使用する用語の定義は以下の通りです。" : "Definitions of terms used in these Terms are as follows:"}
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                {(isJa
                  ? [
                      "「本サービス」：当社が提供するWEB制作、システム開発、デザイン、コンサルティング等のサービス",
                      "「利用者」：本サービスを利用する個人または法人",
                      "「利用契約」：本規約に基づき、当社と利用者との間で締結される契約",
                      "「知的財産権」：著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権",
                    ]
                  : [
                      "\"Services\": web production, system development, design, consulting, and other services provided by the Company",
                      "\"User\": an individual or entity that uses the Services",
                      "\"Service Agreement\": an agreement concluded between the Company and the User under these Terms",
                      "\"Intellectual Property Rights\": copyrights, patents, utility models, trademarks, design rights, and other IP rights",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第3条（契約の成立）" : "Article 3 (Formation of Contract)"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "利用契約は、利用者が本規約に同意し、当社所定の方法で申し込みを行い、当社がこれを承諾した時点で成立するものとします。当社は、申し込みを承諾しない場合があり、その理由について開示する義務を負いません。"
                  : "A Service Agreement is formed when the User agrees to these Terms, applies in the prescribed manner, and the Company accepts the application. The Company may decline applications without obligation to disclose reasons."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第4条（サービス内容）" : "Article 4 (Service Content)"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa ? "本サービスの内容は以下の通りです。" : "The Services include the following:"}
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                {(isJa
                  ? ["WEBサイト制作・運用", "システム開発・保守", "UX/UIデザイン", "デジタルマーケティング支援", "ITコンサルティング", "その他当社が提供するサービス"]
                  : [
                      "Website production and operation",
                      "System development and maintenance",
                      "UX/UI design",
                      "Digital marketing support",
                      "IT consulting",
                      "Other services provided by the Company",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "サービスの詳細については、個別の契約書または発注書に定めるものとします。"
                  : "Details of services are defined in individual contracts or purchase orders."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第5条（料金および支払い）" : "Article 5 (Fees and Payment)"}</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                {(isJa
                  ? [
                      "利用者は、本サービスの対価として、当社が別途定める料金を支払うものとします。",
                      "料金は、個別の見積書または契約書に記載された金額とします。",
                      "支払方法は、銀行振込、クレジットカード決済、その他当社が指定する方法とし、振込手数料は利用者の負担とします。",
                      "利用者が支払期日までに料金を支払わない場合、当社は年14.6%の遅延損害金を請求できるものとします。",
                    ]
                  : [
                      "Users shall pay fees set separately by the Company as consideration for the Services.",
                      "Fees are the amounts stated in individual estimates or contracts.",
                      "Payment methods include bank transfer, credit card, or other methods specified by the Company; transfer fees are borne by the User.",
                      "If payment is not made by the due date, the Company may charge late fees at 14.6% per annum.",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第6条（知的財産権）" : "Article 6 (Intellectual Property)"}</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                {(isJa
                  ? [
                      "本サービスにより作成された成果物の知的財産権は、原則として当社に帰属します。ただし、契約書に別段の定めがある場合はこの限りではありません。",
                      "利用者は、当社が成果物を当社の実績として公開すること（ポートフォリオ、WEBサイト掲載等）に同意するものとします。ただし、利用者が事前に書面で異議を申し出た場合はこの限りではありません。",
                      "利用者が提供した素材、情報、商標等の知的財産権は、利用者に帰属します。",
                    ]
                  : [
                      "Intellectual property rights in deliverables created through the Services belong to the Company in principle, unless otherwise specified in a contract.",
                      "Users agree that the Company may publish deliverables as its portfolio (e.g., on websites). This does not apply if the User objects in writing in advance.",
                      "IP rights of materials, information, and trademarks provided by the User belong to the User.",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第7条（禁止事項）" : "Article 7 (Prohibited Acts)"}</h2>
              <p className="leading-relaxed mb-4">
                {isJa ? "利用者は、以下の行為を行ってはならないものとします。" : "Users must not engage in the following acts:"}
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                {(isJa
                  ? [
                      "法令または公序良俗に違反する行為",
                      "犯罪行為に関連する行為",
                      "当社または第三者の知的財産権を侵害する行為",
                      "当社または第三者の名誉、信用、プライバシーを侵害する行為",
                      "虚偽の情報を提供する行為",
                      "当社のサービス運営を妨害する行為",
                      "その他、当社が不適切と判断する行為",
                    ]
                  : [
                      "Acts that violate laws or public order and morals",
                      "Acts related to criminal activity",
                      "Infringing intellectual property rights of the Company or third parties",
                      "Infringing honor, reputation, or privacy of the Company or third parties",
                      "Providing false information",
                      "Interfering with the operation of the Services",
                      "Other acts deemed inappropriate by the Company",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第8条（サービスの変更・中断・終了）" : "Article 8 (Changes, Suspension, Termination)"}</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>
                  {isJa
                    ? "当社は、事前の通知なく、本サービスの内容を変更、中断、または終了することができるものとします。"
                    : "The Company may change, suspend, or terminate the Services without prior notice."}
                </li>
                <li>
                  {isJa
                    ? "当社は、以下の場合に本サービスを一時的に中断することがあります。"
                    : "The Company may temporarily suspend the Services in the following cases:"}
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {(isJa
                      ? ["サーバー等のメンテナンスを行う場合", "天災、事変、その他の非常事態が発生した場合", "その他、当社が必要と判断した場合"]
                      : ["Server maintenance", "Natural disasters or emergency situations", "Other cases deemed necessary by the Company"]
                    ).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  {isJa
                    ? "サービスの変更、中断、終了により利用者に生じた損害について、当社は一切の責任を負わないものとします。"
                    : "The Company shall not be liable for any damages incurred by Users due to changes, suspension, or termination of the Services."}
                </li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第9条（契約解除）" : "Article 9 (Termination)"}</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>
                  {isJa
                    ? "利用者が以下のいずれかに該当する場合、当社は事前の通知なく、直ちに利用契約を解除することができます。"
                    : "If a User falls under any of the following, the Company may immediately terminate the Service Agreement without notice:"}
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {(isJa
                      ? ["本規約に違反した場合", "料金の支払いを怠った場合", "虚偽の申告をした場合", "当社の信用を毀損する行為を行った場合"]
                      : ["Violation of these Terms", "Failure to pay fees", "Making false statements", "Acts that damage the Company's credibility"]
                    ).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  {isJa
                    ? "契約解除により利用者に損害が生じても、当社は一切の責任を負わないものとします。"
                    : "The Company shall not be liable for any damages resulting from termination."}
                </li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第10条（免責事項）" : "Article 10 (Disclaimer)"}</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                {(isJa
                  ? [
                      "当社は、本サービスの内容、品質、正確性、完全性、有用性について、いかなる保証も行いません。",
                      "当社は、本サービスの利用により利用者に生じた損害について、債務不履行、不法行為その他の法律上の請求原因の如何を問わず、一切の責任を負わないものとします。ただし、当社の故意または重大な過失による場合はこの限りではありません。",
                      "前項ただし書きの場合であっても、当社の責任は、利用者が当社に支払った直近1年間の利用料金の総額を上限とします。",
                    ]
                  : [
                      "The Company makes no warranties regarding the content, quality, accuracy, completeness, or usefulness of the Services.",
                      "The Company is not liable for any damages incurred by Users, regardless of legal cause, except in cases of willful misconduct or gross negligence.",
                      "Even in the above exception, liability is limited to the total fees paid by the User to the Company in the most recent one-year period.",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第11条（秘密保持）" : "Article 11 (Confidentiality)"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "当社および利用者は、本サービスの提供・利用を通じて知り得た相手方の営業上・技術上の秘密情報を、相手方の書面による事前の承諾なく第三者に開示または漏洩してはならないものとします。ただし、法令により開示が義務付けられている場合はこの限りではありません。"
                  : "The Company and Users shall not disclose or leak the other party’s business or technical confidential information obtained through the Services without prior written consent, except where disclosure is required by law."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第12条（個人情報の取り扱い）" : "Article 12 (Handling of Personal Information)"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "当社は、利用者の個人情報を、当社のプライバシーポリシーに従って適切に取り扱うものとします。プライバシーポリシーの内容は、当社WEBサイトに掲載されています。"
                  : "The Company handles Users’ personal information in accordance with the Privacy Policy posted on our website."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第13条（規約の変更）" : "Article 13 (Amendments)"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "当社は、利用者の承諾を得ることなく、本規約を変更することができるものとします。変更後の規約は、当社WEBサイトに掲載した時点から効力を生じるものとします。"
                  : "The Company may amend these Terms without obtaining Users’ consent. The amended Terms take effect when posted on the Company website."}
              </p>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第14条（準拠法・管轄裁判所）" : "Article 14 (Governing Law and Jurisdiction)"}</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                {(isJa
                  ? ["本規約の解釈および適用は、日本法に準拠するものとします。", "本規約に関連して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。"]
                  : [
                      "These Terms are governed by the laws of Japan.",
                      "The Tokyo District Court shall have exclusive jurisdiction as the court of first instance for disputes related to these Terms.",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>

              <h2 className="text-3xl font-bold mb-6">{isJa ? "第15条（協議解決）" : "Article 15 (Consultation)"}</h2>
              <p className="leading-relaxed mb-8">
                {isJa
                  ? "本規約に定めのない事項または本規約の解釈に疑義が生じた場合は、当社と利用者は誠意をもって協議し、解決を図るものとします。"
                  : "If any matters not stipulated in these Terms or any interpretational disputes arise, the Company and Users will consult in good faith to resolve them."}
              </p>

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
