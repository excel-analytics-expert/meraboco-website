import { supabaseAdmin } from "@/lib/supabase/admin"
import DiagnosticsClient from "./DiagnosticsClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDiagnosticsPage() {
    let diagnostics: any[] | null = null
    let error: string | null = null

    try {
        const { data, error: sbError } = await supabaseAdmin
            .from("diagnostics")
            .select("id, created_at, email, url, status, analysis_result")
            .order("created_at", { ascending: false })
            .limit(200)

        if (sbError) {
            error = sbError.message
        } else {
            diagnostics = data
        }
    } catch (e: any) {
        error = e.message
    }

    if (error) {
        return (
            <div className="p-8 font-sans bg-stone-50 min-h-screen">
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                    <p className="font-bold">Database Error:</p>
                    <p>{error}</p>
                </div>
            </div>
        )
    }

    return <DiagnosticsClient initialData={diagnostics || []} />
}
