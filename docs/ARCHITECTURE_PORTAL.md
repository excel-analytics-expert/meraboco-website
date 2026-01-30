# ARCHITECTURE_PORTAL

## 1. ルーティング構成
- Next.js App Router（`app/` ディレクトリ）
- 主要ルート
  - `app/page.tsx`（ホーム）
  - `app/portal/login`（Magic Linkログイン）
  - `app/portal/callback`（認証コード交換）
  - `app/portal/dashboard`（契約者ダッシュボード）

## 2. 認証とアクセス制御（Supabase）
- 認証エンジン: Supabase Auth（OTP/Magic Link）
- サーバー側クライアント: `lib/supabase/server.ts`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 管理者クライアント: `lib/supabase/admin.ts`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- ミドルウェア: `middleware.ts`
  - `/portal/*` 配下は未認証時に `/portal/login` へリダイレクト
  - ログイン済みで `/portal/login` にアクセスした場合は `/portal/dashboard` へ

## 3. ダッシュボードの認可ロジック
- `app/portal/dashboard/page.tsx`（Server Component）
  - `customers` テーブルを参照
  - `subscriptionStatus === "active"` のみ編集可能扱い

## 4. microCMS 連携
- SDK初期化: `lib/microcms.ts`
  - `MICROCMS_SERVICE_DOMAIN`
  - `MICROCMS_API_KEY`
- 型定義: `types/microcms.ts`
  - `MicroCmsSite` / `MicroCmsPlan`
- 取得箇所:
  - `app/portal/dashboard/page.tsx`（ダッシュボードで最新サイトを取得）

## 5. API・DB
- Stripe Webhook: `app/api/webhook/stripe/route.ts`
- お問い合わせAPI: `app/api/contact/route.ts`
- DBスキーマ: `supabase_setup.sql`
  - `contacts` / `customers`

## 6. 法的リンク
- `app/terms/page.tsx`（利用規約）
- `app/privacy/page.tsx`（プライバシーポリシー）
- `app/commerce/page.tsx`（特定商取引法に基づく表記）
