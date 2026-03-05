// Meraboco. Created by s.kenichi
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    try {
        const { url, email } = await req.json();

        if (!url || !email) {
            return NextResponse.json(
                { ok: false, error: "invalid_input" },
                { status: 400 }
            );
        }

        const supabase = await createSupabaseServerClient();

        console.log(`[Diagnostics API] データの永続化を開始: URL=${url}, Email=${email}`);

        const { error } = await supabase
            .from("diagnostics")
            .insert([{ url, email, status: "pending" }]);

        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error("[Diagnostics API] Error:", error.message);
        return NextResponse.json(
            { ok: false, error: "internal_error" },
            { status: 500 }
        );
    }
}
