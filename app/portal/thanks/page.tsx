import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ThanksPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-stone-800">
            <Header />
            <main className="mx-auto flex min-h-[calc(100vh-160px)] max-w-2xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
                <h1 className="text-3xl font-semibold md:text-5xl text-stone-800">決済が完了しました</h1>
                <p className="text-lg text-stone-600">
                    ご登録のメールアドレスでログインしてください
                </p>
                <div className="pt-8">
                    <Link
                        href="/portal/login"
                        className="rounded-full bg-stone-900 px-10 py-4 text-base font-medium text-white transition hover:bg-stone-800 shadow-md"
                    >
                        ログイン画面へ
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    )
}
