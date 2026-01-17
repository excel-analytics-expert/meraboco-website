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
