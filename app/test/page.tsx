"use client";

import PricingPlan from '../../components/PricingPlan';

export default function TestPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="py-10 text-center">
                <h1 className="text-2xl font-bold text-gray-800">料金プランのプレビュー</h1>
                <p className="text-gray-500 mt-2">ローカル環境での確認用ページです</p>
            </div>

            {/* ここで料金表を呼び出します */}
            <PricingPlan />

            <div className="py-10 text-center text-gray-400 text-sm">
                © Meraboko Preview Mode
            </div>
        </main>
    );
}