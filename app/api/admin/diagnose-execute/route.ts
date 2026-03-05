import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Gemini APIの初期化
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
    console.error("GEMINI_API_KEY is not defined")
}
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export async function POST(request: Request) {
    try {
        const { id, url } = await request.json()

        if (!id || !url) {
            return NextResponse.json({ error: "IDとURLは必須です" }, { status: 400 })
        }

        if (!genAI) {
            return NextResponse.json({ error: "Gemini APIキーが設定されていません" }, { status: 500 })
        }

        // 1. Geminiに診断をリクエスト（プロンプトは温かみのあるプロ仕様を意識）
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
        const prompt = `あなたはプロのWEBコンサルタントです。以下のURLのWEBサイトについて、集客や予約を増やすための改善案を、優しく丁寧で温かみのあるトーンで300文字程度で診断してください。対象URL: ${url}`

        const result = await model.generateContent(prompt)
        const analysisResultText = result.response.text()

        // 2. Supabaseのレコードを更新（Service Role Keyを使用）
        const { error: updateError } = await supabaseAdmin
            .from("diagnostics")
            .update({
                status: "done",
                analysis_result: analysisResultText
            })
            .eq("id", id)

        if (updateError) {
            console.error("Supabase update error:", updateError)
            return NextResponse.json({ error: "データベースの更新に失敗しました: " + updateError.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, analysis_result: analysisResultText })

    } catch (error: any) {
        console.error("Diagnose execute error:", error)
        return NextResponse.json({ error: "診断の実行中に予期せぬエラーが発生しました" }, { status: 500 })
    }
}