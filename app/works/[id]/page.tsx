import type { Metadata } from "next"
import { notFound } from "next/navigation"
import WorkDetailClient from "./work-detail-client"

const worksDataJa: Record<
  string,
  {
    category: string
    title: string
    client: string
    period: string
    image: string
    description: string
    challenge: string
    solution: string
    result: string[]
    technologies: string[]
    url?: string
    googleRating?: number
    googleReviews?: number
    seoMetrics?: {
      label: string
      value: string
      status: "excellent" | "good" | "average"
    }[]
  }
> = {
  "hotel-shiro": {
    category: "WEB制作",
    title: "ホテルS社 公式Webサイト制作",
    client: "ホテルS社様",
    period: "2024年2月 〜 2024年4月（3ヶ月）",
    image: "/hotel-shiro-website-preview.jpg",
    description:
      "千葉県船橋市にある全42室のビジネスホテル「ホテルS社」の公式Webサイトを制作。JR船橋駅から徒歩7分の好立地を活かし、ビジネス・観光両方に対応した魅力的なサイトを構築しました。",
    challenge:
      "リニューアルしたホテル設備や新しいサービス内容を効果的に伝える必要がありました。また、舞浜エリアや幕張メッセへのアクセスの良さをアピールし、直接予約を増やすことが課題でした。",
    solution:
      "Next.jsを採用し、SEOに強く高速なサイトを構築。客室の写真を大きく使い、マニフレックス高反発マットレス・枕などの設備の魅力を視覚的に表現。周辺観光地の情報を充実させ、ビジネス利用だけでなく観光での利用も促進。Googleマップ連携で簡単にアクセス情報を確認できるようにしました。",
    result: [
      "Google評価3.9獲得（182件のレビュー）",
      "直接予約が月間40%増加",
      "サイト訪問者数が前年比3倍に増加",
      "モバイルからの予約が70%に向上",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Maps API", "SEO最適化"],
    url: "https://www.hotel-shiro-official.com/",
    googleRating: 3.9,
    googleReviews: 182,
    seoMetrics: [
      { label: "ページ速度", value: "95/100", status: "excellent" },
      { label: "モバイル対応", value: "100%", status: "excellent" },
      { label: "SEOスコア", value: "92/100", status: "excellent" },
      { label: "アクセシビリティ", value: "88/100", status: "good" },
    ],
  },
  "corporate-renewal": {
    category: "WEB制作",
    title: "製造業A社 コーポレートサイトリニューアル",
    client: "製造業A社様",
    period: "2024年10月 〜 2024年12月（3ヶ月）",
    image: "/modern-manufacturing-company-website-design.jpg",
    description:
      "創業50年を迎える老舗製造業のコーポレートサイトを、最新技術を用いて全面リニューアル。企業の歴史と技術力を伝えつつ、モダンで洗練されたデザインで再構築しました。",
    challenge:
      "古いHTMLサイトで更新が困難、スマートフォン非対応、SEO対策が不十分という課題がありました。また、BtoB向けのため、技術力と信頼性を効果的に伝える必要がありました。",
    solution:
      "Next.jsを採用し、高速で SEO に強いサイトを構築。CMSを導入し、社内で簡単に更新できる仕組みを実現。製品紹介ページは動画と3Dモデルを活用し、技術力を視覚的に表現しました。",
    result: [
      "ページ表示速度が従来比3倍向上",
      "Google検索順位が平均15位上昇",
      "問い合わせ数が月間20件から50件に増加",
      "採用応募数が2倍に増加",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CMS", "Google Analytics"],
  },
  "hotel-booking": {
    category: "システム開発",
    title: "ホテルB社 オンライン予約システム",
    client: "ホテルB社様",
    period: "2024年8月 〜 2024年11月（4ヶ月）",
    image: "/hotel-online-booking-system-interface.jpg",
    description:
      "地方のリゾートホテル向けに、宿泊予約からチェックイン、顧客管理まで一元管理できるクラウドシステムを開発。外部OTA連携にも対応しました。",
    challenge:
      "電話・メールでの予約管理に限界があり、ダブルブッキングや入力ミスが頻発。また、外部予約サイトとの在庫連携が手動で非効率でした。",
    solution:
      "リアルタイム在庫管理システムを構築し、複数チャネルからの予約を一元管理。Stripe決済を組み込み、事前決済とキャンセルポリシーの自動適用を実現。スタッフ向けの管理画面も直感的に操作できるUIで設計しました。",
    result: [
      "予約業務の作業時間が70%削減",
      "ダブルブッキングがゼロに",
      "直接予約率が40%向上（OTA手数料削減）",
      "顧客満足度が15%向上",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "REST API"],
  },
  "restaurant-ec": {
    category: "EC構築",
    title: "レストランC社 ECサイト",
    client: "レストランC社様",
    period: "2024年9月 〜 2024年10月（2ヶ月）",
    image: "/restaurant-ecommerce-website-design.jpg",
    description:
      "人気レストランのオリジナル商品をオンライン販売するECサイト。ブランドの世界観を保ちながら、購入しやすいUXを実現しました。",
    challenge:
      "コロナ禍で店舗売上が減少し、オンライン販売への転換が急務。しかし、ECサイト運営の知識がなく、複雑な管理画面は避けたいとの要望でした。",
    solution:
      "Next.jsで高速なECサイトを構築し、Stripeで安全な決済を実現。商品管理はHeadless CMSで簡単に操作可能に。配送管理システムも統合し、注文から配送までシームレスに管理できるようにしました。",
    result: [
      "月間売上300万円を達成（開始3ヶ月後）",
      "リピート購入率60%",
      "平均購入単価8,000円",
      "顧客データベース構築により、マーケティング施策が可能に",
    ],
    technologies: ["Next.js", "Stripe", "Headless CMS", "Tailwind CSS", "Vercel"],
  },
  "clinic-crm": {
    category: "システム開発",
    title: "クリニックD様 顧客管理システム",
    client: "クリニックD様",
    period: "2024年7月 〜 2024年10月（4ヶ月）",
    image: "/clinic-customer-management-system-dashboard.jpg",
    description:
      "歯科クリニック向けに、患者情報、予約、カルテ、会計を一元管理するクラウドシステム。スタッフ間の情報共有も効率化しました。",
    challenge:
      "紙カルテと複数のExcelファイルで管理しており、情報の検索や共有に時間がかかる。また、予約の二重登録や見落としが発生していました。",
    solution:
      "患者ごとに情報を一元管理できるCRMシステムを開発。予約カレンダーは視覚的に操作でき、リマインドメールも自動送信。カルテはテンプレート機能で入力を効率化し、画像添付や検索も可能にしました。",
    result: [
      "カルテ記入時間が50%削減",
      "予約ミスがゼロに",
      "患者情報の検索時間が90%削減",
      "スタッフ間の情報共有がスムーズに",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "WebSocket"],
  },
  "fashion-brand": {
    category: "WEB制作",
    title: "ファッションブランドE社 ブランドサイト",
    client: "ファッションブランドE社様",
    period: "2024年6月 〜 2024年8月（3ヶ月）",
    image: "/fashion-brand-website-design.jpg",
    description:
      "新進気鋭のファッションブランドの世界観を表現した、ビジュアル重視のブランドサイト。アニメーションとインタラクションで没入感を演出しました。",
    challenge:
      "新ブランドのため、認知度がゼロ。ブランドの独自性と世界観を強く印象づけ、SNSでのシェアを促進したいとの要望でした。",
    solution:
      "パララックス効果、動画背景、スムーススクロールなどのインタラクションを駆使し、ストーリー性のあるサイトを構築。InstagramのフィードをAPIで連携し、常に最新情報を表示。ルックブックページは画像を大きく使い、ビジュアルを最大限に活かしました。",
    result: [
      "サイト公開1週間でSNSシェア1,000件超",
      "Instagram フォロワーが3ヶ月で5,000人増加",
      "オンラインショップへの流入が月間10,000件",
      "ブランド認知度が大幅向上",
    ],
    technologies: ["Next.js", "Framer Motion", "GSAP", "Instagram API", "Vercel"],
  },
  "school-lms": {
    category: "システム開発",
    title: "教育機関F様 学習管理システム",
    client: "教育機関F様",
    period: "2024年4月 〜 2024年7月（4ヶ月）",
    image: "/online-learning-management-system-interface.jpg",
    description:
      "オンライン授業と学習進捗を管理する教育プラットフォーム。動画配信、テスト機能、レポート提出、成績管理を統合しました。",
    challenge:
      "コロナ禍でオンライン授業へ移行したが、Zoom + Googleドライブの組み合わせでは管理が煩雑。学習進捗の把握や成績管理が困難でした。",
    solution:
      "動画配信プラットフォームと学習管理機能を統合したLMSを開発。生徒は授業動画の視聴、課題提出、テスト受験を一つのプラットフォームで完結。教師は進捗状況をダッシュボードで一覧でき、個別フィードバックも容易に。",
    result: [
      "管理業務の時間が60%削減",
      "学習進捗の可視化により、中退率が20%減少",
      "生徒満足度が25%向上",
      "オンライン授業の受講者数が2倍に",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Video Streaming API", "WebSocket"],
  },
}

const worksDataEn: Record<
  string,
  {
    category: string
    title: string
    client: string
    period: string
    image: string
    description: string
    challenge: string
    solution: string
    result: string[]
    technologies: string[]
    url?: string
    googleRating?: number
    googleReviews?: number
    seoMetrics?: {
      label: string
      value: string
      status: "excellent" | "good" | "average"
    }[]
  }
> = {
  "hotel-shiro": {
    category: "Web Production",
    title: "Hotel S Official Website",
    client: "Hotel S",
    period: "Feb 2024 - Apr 2024 (3 months)",
    image: "/hotel-shiro-website-preview.jpg",
    description:
      "Created an official website for Hotel S, a 42-room business hotel in Funabashi, Chiba. Built an attractive site suitable for both business and tourism.",
    challenge:
      "Needed to effectively communicate renovated hotel facilities and new services. Also needed to promote easy access to Maihama area and Makuhari Messe, and increase direct bookings.",
    solution:
      "Built a fast, SEO-optimized site using Next.js. Used large room photos to visually express the appeal of amenities. Enhanced local tourism information to promote leisure stays.",
    result: [
      "Achieved 3.9 Google rating (182 reviews)",
      "40% increase in monthly direct bookings",
      "3x increase in site visitors year-over-year",
      "70% of bookings now from mobile",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Maps API", "SEO Optimization"],
    url: "https://www.hotel-shiro-official.com/",
    googleRating: 3.9,
    googleReviews: 182,
    seoMetrics: [
      { label: "Page Speed", value: "95/100", status: "excellent" },
      { label: "Mobile Ready", value: "100%", status: "excellent" },
      { label: "SEO Score", value: "92/100", status: "excellent" },
      { label: "Accessibility", value: "88/100", status: "good" },
    ],
  },
  "corporate-renewal": {
    category: "Web Production",
    title: "Manufacturing Company A Corporate Site Renewal",
    client: "Manufacturing Company A",
    period: "Oct 2024 - Dec 2024 (3 months)",
    image: "/modern-manufacturing-company-website-design.jpg",
    description:
      "Completely renewed the corporate site of a 50-year-old manufacturing company using latest technology.",
    challenge:
      "Old HTML site was difficult to update, not mobile-friendly, and had poor SEO.",
    solution:
      "Built a fast, SEO-optimized site with Next.js. Implemented CMS for easy internal updates.",
    result: [
      "3x improvement in page load speed",
      "Average 15-position rise in Google search rankings",
      "Inquiries increased from 20 to 50 per month",
      "Job applications doubled",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CMS", "Google Analytics"],
  },
  "hotel-booking": {
    category: "System Development",
    title: "Hotel B Online Booking System",
    client: "Hotel B",
    period: "Aug 2024 - Nov 2024 (4 months)",
    image: "/hotel-online-booking-system-interface.jpg",
    description:
      "Developed a cloud system for a regional resort hotel that centrally manages everything from booking to check-in and customer management.",
    challenge:
      "Phone and email reservation management had limitations, causing frequent double bookings and input errors.",
    solution:
      "Built real-time inventory management system to centrally manage bookings from multiple channels. Integrated Stripe payment.",
    result: [
      "70% reduction in booking operation time",
      "Zero double bookings",
      "40% increase in direct booking rate",
      "15% improvement in customer satisfaction",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "REST API"],
  },
  "restaurant-ec": {
    category: "E-Commerce",
    title: "Restaurant C E-Commerce Site",
    client: "Restaurant C",
    period: "Sep 2024 - Oct 2024 (2 months)",
    image: "/restaurant-ecommerce-website-design.jpg",
    description:
      "E-commerce site for online sales of popular restaurant's original products.",
    challenge:
      "Store sales declined during COVID, urgent need to shift to online sales.",
    solution:
      "Built fast e-commerce site with Next.js and secure payments with Stripe.",
    result: [
      "Achieved ¥3 million monthly sales (after 3 months)",
      "60% repeat purchase rate",
      "Average purchase price ¥8,000",
      "Built customer database enabling marketing initiatives",
    ],
    technologies: ["Next.js", "Stripe", "Headless CMS", "Tailwind CSS", "Vercel"],
  },
  "clinic-crm": {
    category: "System Development",
    title: "Clinic D Customer Management System",
    client: "Clinic D",
    period: "Jul 2024 - Oct 2024 (4 months)",
    image: "/clinic-customer-management-system-dashboard.jpg",
    description:
      "Cloud system for dental clinic that centrally manages patient information, appointments, medical records, and billing.",
    challenge:
      "Managing with paper records and multiple Excel files made searching and sharing information time-consuming.",
    solution:
      "Developed CRM system for unified patient information management with visual appointment calendar.",
    result: [
      "50% reduction in record entry time",
      "Zero booking errors",
      "90% reduction in patient info search time",
      "Smooth information sharing among staff",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "WebSocket"],
  },
  "fashion-brand": {
    category: "Web Production",
    title: "Fashion Brand E Brand Site",
    client: "Fashion Brand E",
    period: "Jun 2024 - Aug 2024 (3 months)",
    image: "/fashion-brand-website-design.jpg",
    description:
      "Visual-focused brand site expressing the world view of an up-and-coming fashion brand.",
    challenge:
      "New brand with zero recognition. Wanted to strongly impress brand uniqueness.",
    solution:
      "Built story-driven site using parallax effects, video backgrounds, and smooth scrolling.",
    result: [
      "Over 1,000 SNS shares within 1 week of launch",
      "5,000 Instagram follower increase in 3 months",
      "10,000 monthly visitors to online shop",
      "Significant increase in brand awareness",
    ],
    technologies: ["Next.js", "Framer Motion", "GSAP", "Instagram API", "Vercel"],
  },
  "school-lms": {
    category: "System Development",
    title: "Educational Institution F Learning Management System",
    client: "Educational Institution F",
    period: "Apr 2024 - Jul 2024 (4 months)",
    image: "/online-learning-management-system-interface.jpg",
    description:
      "Educational platform for managing online classes and learning progress.",
    challenge:
      "Shifted to online classes during COVID, but management was cumbersome.",
    solution:
      "Developed LMS integrating video platform and learning management.",
    result: [
      "60% reduction in administrative work time",
      "20% decrease in dropout rate",
      "25% improvement in student satisfaction",
      "2x increase in online class enrollment",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Video Streaming API", "WebSocket"],
  },
}

export function generateStaticParams() {
  return Object.keys(worksDataJa).map((id) => ({
    id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const work = worksDataJa[id]

  if (!work) {
    return {
      title: "制作実績詳細",
    }
  }

  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: `${work.title} | メラボコ`,
      description: work.description,
      url: `https://meraboco.jp/works/${id}`,
    },
  }
}

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const workJa = worksDataJa[id]
  const workEn = worksDataEn[id]

  if (!workJa || !workEn) {
    notFound()
  }

  return <WorkDetailClient id={id} workJa={workJa} workEn={workEn} />
}