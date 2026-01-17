"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../lib/microcms';

// microCMSから届くデータの型定義
type Plan = {
    id: string;
    planName: string;
    monthlyPrice: string;
    initialCost: string;
    features: string;
};

const PricingPlan = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // microCMS（倉庫）からデータを取ってくる命令
        client.get({ endpoint: 'plans' })
            .then((res) => {
                setPlans(res.contents);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("データ取得エラー:", err);
                setIsLoading(false);
            });
    }, []);

    // 読み込み中の表示
    if (isLoading) {
        return (
            <div className="py-20 text-center text-[#4a4a4a] bg-[#fdfaf7]">
                データを読み込んでいます...
            </div>
        );
    }

    return (
        <section className="py-20 bg-[#fdfaf7] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-bold text-center text-[#4a4a4a] mb-12"
                >
                    ビジネスを支える、安心のプラン
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                            className={`p-8 rounded-2xl bg-white border ${plan.planName === "スタンダード" ? 'border-[#d4a373] shadow-2xl relative' : 'border-gray-100 shadow-md'
                                } flex flex-col hover:shadow-lg transition-shadow duration-300`}
                        >
                            {plan.planName === "スタンダード" && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d4a373] text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                                    おすすめ
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-4 text-[#4a4a4a] text-center">{plan.planName}</h3>
                            <div className="mb-6 text-center">
                                <span className="text-4xl font-bold text-[#4a4a4a]">¥{plan.monthlyPrice}</span>
                                <span className="text-gray-500 text-sm"> / 月額</span>
                                <p className="text-xs text-gray-400 mt-2">初期費用：¥{plan.initialCost}</p>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                {/* 特徴リストを「,」や「改行」で分解して表示 */}
                                {plan.features.split(/[,\n]/).map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-600 text-sm">
                                        <span className="mr-2 text-[#d4a373] font-bold">✔</span>
                                        {feature.trim()}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${plan.planName === "スタンダード"
                                    ? 'bg-[#d4a373] text-white hover:bg-[#c69362] shadow-md'
                                    : 'border-2 border-[#d4a373] text-[#d4a373] hover:bg-[#fdfaf7]'
                                }`}>
                                相談してみる
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingPlan;