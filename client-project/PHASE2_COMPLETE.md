# Phase 2: Stripe Webhook 実装完了

**実装日**: 2026-02-16  
**実装者**: Antigravity (Execution Unit)

---

## ✅ 実装完了ファイル

### 1. Stripe Webhook エンドポイント
**Path**: `app/api/webhook/stripe/route.ts`

**機能**:
- `checkout.session.completed`: 決済完了時にユーザー作成
- `customer.subscription.updated`: サブスク更新時にステータス同期
- `customer.subscription.deleted`: サブスク削除時にステータス更新

**処理フロー**:
```
Stripe決済完了
  ↓
Webhook受信
  ↓
1. users テーブルにユーザー作成
2. subscriptions テーブルにサブスク記録
3. 契約書PDF生成（react-pdf）
4. contracts テーブルに契約書URL保存
5. ウェルカムメール送信（Resend + Magic Link）
6. audit_logs に操作履歴記録
```

### 2. 契約書PDF生成
**Path**: `lib/contract-pdf.tsx`

**機能**:
- react-pdf を使用した日本語契約書生成
- Supabase Storage へのアップロード
- 公開URL取得

**契約書内容**:
- サービス提供者情報（栗林 加奈子）
- 利用規約への同意
- 個人情報保護法準拠の記載
- 料金・支払い条件
- 契約期間・解約条件

### 3. ウェルカムメール送信
**Path**: `lib/email.ts`

**機能**:
- Resend を使用したHTML形式メール
- Magic Link 生成（Supabase Auth）
- 契約書PDFダウンロードリンク
- ダッシュボードログインリンク

---

## 🔧 Supabase 設定手順

### Storage バケット作成

Supabase ダッシュボードで以下を実行:

1. **Storage** → **New bucket** をクリック
2. バケット名: `contracts`
3. **Public bucket** にチェック（契約書PDFを公開URLで配信するため）
4. **Create bucket** をクリック

### RLS ポリシー設定（contracts バケット）

```sql
-- 契約書のアップロード（サーバーサイドのみ）
CREATE POLICY "Service role can upload contracts"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'contracts');

-- 契約書の閲覧（誰でも可能、公開URL経由）
CREATE POLICY "Anyone can view contracts"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'contracts');
```

---

## 🔗 Stripe Webhook 設定

### Webhook URL
```
https://client.meraboco.jp/api/webhook/stripe
```

### 監視イベント
Stripe Dashboard → Developers → Webhooks で以下を選択:

- ✅ `checkout.session.completed`
- ✅ `customer.subscription.updated`
- ✅ `customer.subscription.deleted`

### Webhook Secret
作成後に表示される `whsec_...` を `.env.local` に設定:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🧪 テスト方法

### ローカルテスト（Stripe CLI）

```bash
# Stripe CLI をインストール
# https://stripe.com/docs/stripe-cli

# Webhook をローカルに転送
stripe listen --forward-to localhost:3001/api/webhook/stripe

# テスト決済を実行
stripe trigger checkout.session.completed
```

### 確認ポイント

1. **users テーブル**: 新規ユーザーが作成されているか
2. **subscriptions テーブル**: サブスクが記録されているか
3. **contracts テーブル**: 契約書URLが保存されているか
4. **Supabase Storage**: PDF がアップロードされているか
5. **メール**: ウェルカムメールが届いているか

---

## 📋 次のステップ（Phase 3）

Commander の指示待ち:

1. **News CRUD 機能**: 購入者がお知らせを作成・編集・削除
2. **AIサポートボット**: microCMS + OpenAI 統合
3. **契約書閲覧ページ**: ダッシュボード内でPDF表示

---

**Status**: Phase 2 完了  
**Antigravity、待機中。**
