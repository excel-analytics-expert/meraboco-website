import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ error: "削除対象のIDが指定されていません" }, { status: 400 })
        }

        // Supabaseから対象のレコードを削除（Service Role Keyを使用）
        const { error } = await supabaseAdmin
            .from("diagnostics")
            .delete()
            .eq("id", id)

        if (error) {
            console.error("Supabase delete error:", error)
            return NextResponse.json({ error: "データベースからの削除に失敗しました" }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Diagnose delete error:", error)
        return NextResponse.json({ error: "削除の実行中に予期せぬエラーが発生しました" }, { status: 500 })
    }
}
