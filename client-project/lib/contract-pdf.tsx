import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// PDF スタイル定義
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 15,
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    text: {
        marginBottom: 5,
        lineHeight: 1.5,
    },
    footer: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        fontSize: 9,
        textAlign: 'center',
    },
})

interface ContractData {
    userId: string
    email: string
    plan: string
    contractVersion: string
}

// 契約書PDFコンポーネント
const ContractDocument = ({ email, plan, contractVersion }: Omit<ContractData, 'userId'>) => {
    const planName = plan === 'lite' ? 'Lite プラン' : plan === 'standard' ? 'Standard プラン' : 'Pro プラン'
    const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>WEBサイト制作・運用サービス 契約書</Text>

                <View style={styles.section}>
                    <Text style={styles.text}>契約日: {today}</Text>
                    <Text style={styles.text}>契約者メールアドレス: {email}</Text>
                    <Text style={styles.text}>契約プラン: {planName}</Text>
                    <Text style={styles.text}>契約バージョン: {contractVersion}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第1条（サービス提供者）</Text>
                    <Text style={styles.text}>
                        サービス提供者: メラボコ（屋号）{'\n'}
                        代表: 栗林 加奈子{'\n'}
                        所在地: 〒107-0061 東京都港区北青山1-3-3三橋ビル3F{'\n'}
                        電話: 050-1793-1290{'\n'}
                        メール: info@meraboco.jp
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第2条（サービス内容）</Text>
                    <Text style={styles.text}>
                        本契約に基づき、サービス提供者は契約者に対し、以下のサービスを提供します:{'\n'}
                        - WEBサイト制作・運用サービス{'\n'}
                        - プランに応じた機能提供{'\n'}
                        - 技術サポート（AIボットによる基本操作案内）
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第3条（利用規約への同意）</Text>
                    <Text style={styles.text}>
                        契約者は、本契約の締結により、メラボコの利用規約（https://meraboco.jp/terms）に同意したものとみなされます。
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第4条（個人情報の取り扱い）</Text>
                    <Text style={styles.text}>
                        サービス提供者は、個人情報保護法に準拠し、契約者の個人情報を適切に管理します。{'\n'}
                        詳細はプライバシーポリシー（https://meraboco.jp/privacy）をご確認ください。{'\n'}
                        - 保存期間: 最終利用日から5年間{'\n'}
                        - 削除申請: info@meraboco.jp まで
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第5条（料金及び支払い）</Text>
                    <Text style={styles.text}>
                        契約者は、選択したプランに応じた料金を、Stripeを通じて支払うものとします。{'\n'}
                        支払いは月額制のサブスクリプション形式です。
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第6条（契約期間及び解約）</Text>
                    <Text style={styles.text}>
                        本契約は、契約者がサブスクリプションを解約するまで継続します。{'\n'}
                        解約後、データ保護期間（90日間）内であれば、再契約時にデータを復元できます。
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第7条（禁止事項）</Text>
                    <Text style={styles.text}>
                        契約者は、以下の行為を行ってはなりません:{'\n'}
                        - 法令に違反する行為{'\n'}
                        - 第三者の権利を侵害する行為{'\n'}
                        - サービスの運営を妨害する行為
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第8条（免責事項）</Text>
                    <Text style={styles.text}>
                        サービス提供者は、以下について責任を負いません:{'\n'}
                        - 契約者の過失による損害{'\n'}
                        - 不可抗力による損害{'\n'}
                        - 第三者のサービス（Stripe、Supabase等）の障害による損害
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>第9条（準拠法及び管轄裁判所）</Text>
                    <Text style={styles.text}>
                        本契約は日本法に準拠し、紛争が生じた場合は東京地方裁判所を専属的合意管轄裁判所とします。
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text>© 2026 Meraboco. Created by s.kenichi</Text>
                    <Text>本契約書は電子的に生成され、契約者の同意をもって有効となります。</Text>
                </View>
            </Page>
        </Document>
    )
}

/**
 * 契約書PDFを生成し、Supabase Storageにアップロード
 */
export async function generateContractPDF(data: ContractData): Promise<string> {
    const supabase = await createSupabaseServerClient()

    // PDFを生成
    const doc = <ContractDocument email={data.email} plan={data.plan} contractVersion={data.contractVersion} />
    const asPdf = pdf(doc)
    const blob = await asPdf.toBlob()

    // Supabase Storageにアップロード
    const fileName = `contracts/${data.userId}/${Date.now()}.pdf`

    const { data: uploadData, error } = await supabase.storage
        .from('contracts')
        .upload(fileName, blob, {
            contentType: 'application/pdf',
            upsert: false,
        })

    if (error) {
        console.error('[PDF Upload Error]:', error)
        throw new Error('PDF upload failed')
    }

    // 公開URLを取得
    const { data: urlData } = supabase.storage
        .from('contracts')
        .getPublicUrl(uploadData.path)

    return urlData.publicUrl
}
