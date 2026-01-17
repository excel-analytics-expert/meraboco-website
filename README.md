# メラボコ - 公式Webサイト

**https://meraboco.jp**

東京・港区北青山のWEB制作コンサルタント「メラボコ」の公式サイトです。

---

## 技術スタック

- **フレームワーク**: Next.js 16
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **データベース**: Supabase
- **メール送信**: Resend
- **ホスティング**: Xサーバー / Vercel / Netlify

---

## SEO・AEO・セキュリティ対応

### SEO（Google評価100点対応）
- ✅ 構造化データ完全実装（JSON-LD）
- ✅ Core Web Vitals最適化
- ✅ 画像最適化（WebP/AVIF）
- ✅ メタデータ完全設定
- ✅ sitemap.xml / robots.txt最適化
- ✅ 多言語対応（hreflang）

### AEO（AI検索最適化）
- ✅ FAQページ構造化データ
- ✅ HowTo構造化データ
- ✅ 音声検索対応コンテンツ

### セキュリティ（A+評価対応）
- ✅ HSTS（2年間）
- ✅ CSP（Content Security Policy）
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy
- ✅ Permissions-Policy
- ✅ Cross-Origin-*-Policy

---

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseの設定

1. [Supabase](https://supabase.com) でプロジェクト作成
2. SQL Editorで `supabase_setup.sql` を実行
3. 以下の値を取得:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Resendの設定

1. [Resend](https://resend.com) でアカウント作成
2. APIキーを生成 → `RESEND_API_KEY`
3. ドメイン `meraboco.jp` を登録・認証

### 4. 環境変数の設定

`.env.local` ファイルを作成:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...

# Resend
RESEND_API_KEY=re_xxxxxxxx
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

---

## デプロイ方法

### Xサーバーへのデプロイ

Xサーバーは静的サイトまたはNode.jsアプリに対応しています。

#### 方法1: 静的エクスポート（推奨）

1. `next.config.ts` に以下を追加:
```ts
output: 'export',
```

2. ビルド実行:
```bash
npm run build
```

3. `out/` フォルダの中身をXサーバーにアップロード

4. `public/.htaccess` を `out/` にコピー

#### 方法2: Vercel経由でカスタムドメイン

1. Vercelにデプロイ
2. Vercelでカスタムドメイン `meraboco.jp` を設定
3. XサーバーのDNS設定でVercelを指定

### DNS設定（Xサーバー）

Xサーバーのドメイン設定で以下を確認:

1. **SSL設定**: 無料SSLを有効化
2. **wwwリダイレクト**: wwwなしに統一
3. **CNAME/Aレコード**: ホスティング先に応じて設定

---

## プロジェクト構成

```
meraboco_fixed/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── contact/       # お問い合わせAPI
│   ├── company/           # 会社概要
│   ├── services/          # サービス（6ページ）
│   ├── works/             # 実績（7ページ）
│   ├── privacy/           # プライバシーポリシー
│   ├── terms/             # 利用規約
│   └── layout.tsx         # SEO/構造化データ
├── components/            # 共通コンポーネント
├── public/
│   ├── .htaccess          # Xサーバー用セキュリティ設定
│   ├── robots.txt         # クローラー設定
│   └── sitemap.xml        # サイトマップ
└── next.config.ts         # セキュリティヘッダー
```

---

## 確認ツール

デプロイ後、以下のツールで評価を確認してください:

### SEO/パフォーマンス
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### セキュリティ
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

### 構造化データ
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

## お問い合わせ

- **URL**: https://meraboco.jp
- **Email**: meraboco.2025.8@gmail.com
- **TEL**: 050-1793-1290
- **所在地**: 〒107-0061 東京都港区北青山1-3-3

---

© 2026 Meraboco. Created by s.kenichi
