// Meraboco. Created by s.kenichi
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { id, url } = await req.json();
        const supabase = await createSupabaseServerClient();

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `あなたは「メラボコ」のAIコンサルタントです。以下のURLのサイトについて、集客と成約率を上げるための具体的な改善案を3つ、専門的かつ温かみのある言葉で提案してください。URL: ${url}`;

        const result = await model.generateContent(prompt);
        const analysisText = result.response.text();

        const { error } = await supabase
            .from("diagnostics")
            .update({ analysis_result: analysisText, status: "analyzed" })
            .eq("id", id);

        if (error) throw error;
        return NextResponse.json({ success: true, analysis: analysisText });
    } catch (error: any) {
        console.error("[AI Analysis Error]:", error.message);
        return NextResponse.json({ error: "AI解析に失敗しました" }, { status: 500 });
    }
}