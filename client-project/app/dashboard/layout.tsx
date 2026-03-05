import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createSupabaseServerClient()

    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        // 取得エラー or 未ログインならログインへ
        if (error || !user) {
            // ログイン後に戻れるように next を付与（不要なら削除OK）
            redirect("/login?next=/dashboard")
        }

        return (
            // ここは「共通の枠」を置ける場所（必要なければ <>children</> でもOK）
            <main className="min-h-screen">{children}</main>
        )
    } catch {
        // 例外時も安全側に倒す
        redirect("/login?next=/dashboard")
    }
}