-- ============================================================
-- Site Settings テーブル
-- ============================================================
-- 購入者がデモサイトのメインビジュアルを制御するためのテーブル

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  hero_title TEXT DEFAULT '静寂と、美学。',
  hero_subtitle TEXT DEFAULT 'Luxury Hotel Demo',
  hero_image TEXT DEFAULT 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- RLS ポリシー
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分の設定のみ閲覧可能
CREATE POLICY "Users can view own site settings"
  ON site_settings
  FOR SELECT
  USING (auth.uid() = user_id);

-- ユーザーは自分の設定のみ作成可能
CREATE POLICY "Users can create own site settings"
  ON site_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ユーザーは自分の設定のみ更新可能
CREATE POLICY "Users can update own site settings"
  ON site_settings
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 公開アクセス（デモサイト表示用）
CREATE POLICY "Public can view all site settings"
  ON site_settings
  FOR SELECT
  USING (true);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_site_settings_user_id ON site_settings(user_id);

-- 更新日時の自動更新
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();

-- ============================================================
-- 使用例
-- ============================================================
-- INSERT INTO site_settings (user_id, hero_title, hero_subtitle, hero_image)
-- VALUES (
--   'user-uuid-here',
--   '静寂と、美学。',
--   'Luxury Hotel Demo',
--   'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070'
-- );
