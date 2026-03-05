// Meraboco. Created by s.kenichi
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function PortalLogin() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard/auth`,
        },
      });

      if (error) throw error;
      setStatus("success");
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "ログイン処理に失敗しました。");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden font-sans">
      {/* フィルムグレインと背景の温かみのある装飾 - モバイルでのblobの縮小 */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-64 h-64 sm:w-96 sm:h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-64 h-64 sm:w-96 sm:h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.9, bounce: 0.4 }}
        className="w-full max-w-md p-4 sm:p-8 relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-800">ポータルへログイン</h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              ご登録いただいているメールアドレスを入力してください。<br />
              <span className="font-semibold text-orange-600">※パスワードは不要です。</span><br />
              安全なログインリンク（マジックリンク）をお送りします。
            </p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.9 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
            >
              <h3 className="text-green-800 font-medium mb-2">メールを送信しました</h3>
              <p className="text-sm text-green-700">
                {email} 宛にログイン用のリンクをお送りしました。<br />メール内のリンクをクリックしてダッシュボードへお進みください。
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700 block">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-zinc-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all outline-none"
                />
              </div>

              {status === "error" && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {status === "loading" ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "ログインリンクを送信"
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
