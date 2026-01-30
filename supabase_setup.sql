-- Supabase contacts テーブル作成SQL
-- Supabaseダッシュボードの SQL Editor で実行してください

-- contactsテーブルの作成
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  company VARCHAR(200),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

-- インデックスの作成（検索パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- RLS（Row Level Security）の有効化
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- サービスロールキーからのみアクセスを許可
CREATE POLICY "Allow service role full access" ON contacts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- コメント
COMMENT ON TABLE contacts IS 'お問い合わせフォームからの送信データ';
COMMENT ON COLUMN contacts.name IS '送信者名';
COMMENT ON COLUMN contacts.email IS 'メールアドレス';
COMMENT ON COLUMN contacts.company IS '会社名（任意）';
COMMENT ON COLUMN contacts.message IS 'お問い合わせ内容';
COMMENT ON COLUMN contacts.ip_address IS '送信元IPアドレス';
COMMENT ON COLUMN contacts.created_at IS '送信日時';
COMMENT ON COLUMN contacts.read_at IS '既読日時';
COMMENT ON COLUMN contacts.replied_at IS '返信日時';
COMMENT ON COLUMN contacts.status IS 'ステータス（new/read/replied/archived）';

-- customersテーブルの作成（Stripe連携）
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(254) NOT NULL,
  "stripeCustomerId" TEXT,
  "subscriptionStatus" TEXT NOT NULL,
  "planId" TEXT,
  "tenantId" UUID NOT NULL,
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- インデックスの作成（検索パフォーマンス向上）
CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_email_unique ON customers(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_stripe_customer_id ON customers("stripeCustomerId");
CREATE INDEX IF NOT EXISTS idx_customers_tenant_id ON customers("tenantId");
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers("subscriptionStatus");

-- RLS（Row Level Security）の有効化
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- サービスロールキーからのみアクセスを許可
CREATE POLICY "Allow service role full access" ON customers
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 合意情報の拡張カラム
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_name TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_email TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_signed_at TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_timezone TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_ip TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_plan_id TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_terms BOOLEAN;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_privacy BOOLEAN;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_commerce BOOLEAN;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_prohibited_use BOOLEAN;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS agreement_no_refund BOOLEAN;

-- コメント
COMMENT ON TABLE customers IS 'Stripe顧客とサブスクリプションの状態';
COMMENT ON COLUMN customers.email IS 'メールアドレス';
COMMENT ON COLUMN customers."stripeCustomerId" IS 'Stripe Customer ID';
COMMENT ON COLUMN customers."subscriptionStatus" IS 'サブスクリプション状態';
COMMENT ON COLUMN customers."planId" IS 'Stripe Plan/Price ID';
COMMENT ON COLUMN customers."tenantId" IS 'テナントID（UUID v4）';
COMMENT ON COLUMN customers."updatedAt" IS '最終更新日時';
