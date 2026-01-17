import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "利用規約",
  description: "メラボコのサービス利用規約。サービスご利用前に必ずお読みください。",
  openGraph: {
    title: "利用規約 | メラボコ",
    description: "サービス利用規約をご確認ください。",
    url: "https://meraboco.jp/terms",
  },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader
          title="利用規約"
          description="メラボコが提供するサービスの利用規約を定めます。サービスをご利用いただく前に、必ずお読みください。"
        />

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6">第1条（適用）</h2>
              <p className="leading-relaxed mb-8">
                本規約は、当社が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を、本サービスを利用するお客様（以下「利用者」）と当社との間で定めるものです。利用者は、本規約に同意したうえで、本サービスを利用するものとします。
              </p>

              <h2 className="text-3xl font-bold mb-6">第2条（定義）</h2>
              <p className="leading-relaxed mb-4">本規約において使用する用語の定義は以下の通りです。</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>「本サービス」：当社が提供するWEB制作、システム開発、デザイン、コンサルティング等のサービス</li>
                <li>「利用者」：本サービスを利用する個人または法人</li>
                <li>「利用契約」：本規約に基づき、当社と利用者との間で締結される契約</li>
                <li>「知的財産権」：著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">第3条（契約の成立）</h2>
              <p className="leading-relaxed mb-8">
                利用契約は、利用者が本規約に同意し、当社所定の方法で申し込みを行い、当社がこれを承諾した時点で成立するものとします。当社は、申し込みを承諾しない場合があり、その理由について開示する義務を負いません。
              </p>

              <h2 className="text-3xl font-bold mb-6">第4条（サービス内容）</h2>
              <p className="leading-relaxed mb-4">本サービスの内容は以下の通りです。</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>WEBサイト制作・運用</li>
                <li>システム開発・保守</li>
                <li>UX/UIデザイン</li>
                <li>デジタルマーケティング支援</li>
                <li>ITコンサルティング</li>
                <li>その他当社が提供するサービス</li>
              </ul>
              <p className="leading-relaxed mb-8">
                サービスの詳細については、個別の契約書または発注書に定めるものとします。
              </p>

              <h2 className="text-3xl font-bold mb-6">第5条（料金および支払い）</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>利用者は、本サービスの対価として、当社が別途定める料金を支払うものとします。</li>
                <li>料金は、個別の見積書または契約書に記載された金額とします。</li>
                <li>
                  支払方法は、銀行振込、クレジットカード決済、その他当社が指定する方法とし、振込手数料は利用者の負担とします。
                </li>
                <li>利用者が支払期日までに料金を支払わない場合、当社は年14.6%の遅延損害金を請求できるものとします。</li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">第6条（知的財産権）</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>
                  本サービスにより作成された成果物の知的財産権は、原則として当社に帰属します。ただし、契約書に別段の定めがある場合はこの限りではありません。
                </li>
                <li>
                  利用者は、当社が成果物を当社の実績として公開すること（ポートフォリオ、WEBサイト掲載等）に同意するものとします。ただし、利用者が事前に書面で異議を申し出た場合はこの限りではありません。
                </li>
                <li>利用者が提供した素材、情報、商標等の知的財産権は、利用者に帰属します。</li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">第7条（禁止事項）</h2>
              <p className="leading-relaxed mb-4">利用者は、以下の行為を行ってはならないものとします。</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社または第三者の知的財産権を侵害する行為</li>
                <li>当社または第三者の名誉、信用、プライバシーを侵害する行為</li>
                <li>虚偽の情報を提供する行為</li>
                <li>当社のサービス運営を妨害する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">第8条（サービスの変更・中断・終了）</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>当社は、事前の通知なく、本サービスの内容を変更、中断、または終了することができるものとします。</li>
                <li>
                  当社は、以下の場合に本サービスを一時的に中断することがあります。
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>サーバー等のメンテナンスを行う場合</li>
                    <li>天災、事変、その他の非常事態が発生した場合</li>
                    <li>その他、当社が必要と判断した場合</li>
                  </ul>
                </li>
                <li>
                  サービスの変更、中断、終了により利用者に生じた損害について、当社は一切の責任を負わないものとします。
                </li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">第9条（契約解除）</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>
                  利用者が以下のいずれかに該当する場合、当社は事前の通知なく、直ちに利用契約を解除することができます。
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>本規約に違反した場合</li>
                    <li>料金の支払いを怠った場合</li>
                    <li>虚偽の申告をした場合</li>
                    <li>当社の信用を毀損する行為を行った場合</li>
                  </ul>
                </li>
                <li>契約解除により利用者に損害が生じても、当社は一切の責任を負わないものとします。</li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">第10条（免責事項）</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>当社は、本サービスの内容、品質、正確性、完全性、有用性について、いかなる保証も行いません。</li>
                <li>
                  当社は、本サービスの利用により利用者に生じた損害について、債務不履行、不法行為その他の法律上の請求原因の如何を問わず、一切の責任を負わないものとします。ただし、当社の故意または重大な過失による場合はこの限りではありません。
                </li>
                <li>
                  前項ただし書きの場合であっても、当社の責任は、利用者が当社に支払った直近1年間の利用料金の総額を上限とします。
                </li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">第11条（秘密保持）</h2>
              <p className="leading-relaxed mb-8">
                当社および利用者は、本サービスの提供・利用を通じて知り得た相手方の営業上・技術上の秘密情報を、相手方の書面による事前の承諾なく第三者に開示または漏洩してはならないものとします。ただし、法令により開示が義務付けられている場合はこの限りではありません。
              </p>

              <h2 className="text-3xl font-bold mb-6">第12条（個人情報の取り扱い）</h2>
              <p className="leading-relaxed mb-8">
                当社は、利用者の個人情報を、当社のプライバシーポリシーに従って適切に取り扱うものとします。プライバシーポリシーの内容は、当社WEBサイトに掲載されています。
              </p>

              <h2 className="text-3xl font-bold mb-6">第13条（規約の変更）</h2>
              <p className="leading-relaxed mb-8">
                当社は、利用者の承諾を得ることなく、本規約を変更することができるものとします。変更後の規約は、当社WEBサイトに掲載した時点から効力を生じるものとします。
              </p>

              <h2 className="text-3xl font-bold mb-6">第14条（準拠法・管轄裁判所）</h2>
              <ol className="list-decimal pl-6 mb-8 space-y-4">
                <li>本規約の解釈および適用は、日本法に準拠するものとします。</li>
                <li>本規約に関連して紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">第15条（協議解決）</h2>
              <p className="leading-relaxed mb-8">
                本規約に定めのない事項または本規約の解釈に疑義が生じた場合は、当社と利用者は誠意をもって協議し、解決を図るものとします。
              </p>

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
