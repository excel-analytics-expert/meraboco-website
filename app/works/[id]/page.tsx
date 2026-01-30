import type { Metadata } from "next"
import { notFound } from "next/navigation"
import WorkDetailClient from "./work-detail-client"

const worksData: Record<
  string,
  {
    category: string
    categoryEn?: string
    title: string
    titleEn?: string
    client: string
    clientEn?: string
    period: string
    periodEn?: string
    image: string
    description: string
    descriptionEn?: string
    challenge: string
    challengeEn?: string
    solution: string
    solutionEn?: string
    result: string[]
    resultEn?: string[]
    technologies: string[]
    technologiesEn?: string[]
    url?: string
    googleRating?: number
    googleReviews?: number
    seoMetrics?: {
      label: string
      labelEn?: string
      value: string
      status: "excellent" | "good" | "average"
    }[]
  }
> = {
  "hotel-shiro": {
    category: "WEB制作",
    categoryEn: "Web Production",
    title: "ホテルS社 公式Webサイト制作",
    titleEn: "Hotel S Official Website",
    client: "ホテルS社様",
    clientEn: "Hotel S",
    period: "2024年2月 〜 2024年4月（3ヶ月）",
    periodEn: "Feb 2024 – Apr 2024 (3 months)",
    image: "/hotel-shiro-website-preview.jpg",
    description:
      "千葉県船橋市にある全42室のビジネスホテル「ホテルS社」の公式Webサイトを制作。JR船橋駅から徒歩7分の好立地を活かし、ビジネス・観光両方に対応した魅力的なサイトを構築しました。",
    descriptionEn:
      "Developed the official website for Hotel S, a 42-room business hotel in Funabashi, Chiba. Highlighted its convenient location and appealed to both business and leisure travelers.",
    challenge:
      "リニューアルしたホテル設備や新しいサービス内容を効果的に伝える必要がありました。また、舞浜エリアや幕張メッセへのアクセスの良さをアピールし、直接予約を増やすことが課題でした。",
    challengeEn:
      "We needed to communicate renovated facilities and new services while emphasizing access to Maihama and Makuhari Messe to increase direct bookings.",
    solution:
      "Next.jsを採用し、SEOに強く高速なサイトを構築。客室の写真を大きく使い、マニフレックス高反発マットレス・枕などの設備の魅力を視覚的に表現。周辺観光地の情報を充実させ、ビジネス利用だけでなく観光での利用も促進。Googleマップ連携で簡単にアクセス情報を確認できるようにしました。",
    solutionEn:
      "Built a fast, SEO-friendly site with Next.js. Highlighted rooms and amenities with large imagery, enhanced nearby attractions content, and integrated Google Maps for easy access info.",
    result: [
      "Google評価3.9獲得（182件のレビュー）",
      "直接予約が月間40%増加",
      "サイト訪問者数が前年比3倍に増加",
      "モバイルからの予約が70%に向上",
    ],
    resultEn: [
      "Google rating 3.9 (182 reviews)",
      "Direct bookings increased by 40% monthly",
      "Site visits tripled year-over-year",
      "Mobile bookings rose to 70%",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Maps API", "SEO最適化"],
    technologiesEn: ["Next.js", "TypeScript", "Tailwind CSS", "Google Maps API", "SEO Optimization"],
    url: "https://www.hotel-shiro-official.com/",
    googleRating: 3.9,
    googleReviews: 182,
    seoMetrics: [
      { label: "ページ速度", labelEn: "Page Speed", value: "95/100", status: "excellent" },
      { label: "モバイル対応", labelEn: "Mobile Friendly", value: "100%", status: "excellent" },
      { label: "SEOスコア", labelEn: "SEO Score", value: "92/100", status: "excellent" },
      { label: "アクセシビリティ", labelEn: "Accessibility", value: "88/100", status: "good" },
    ],
  },
  "corporate-renewal": {
    category: "WEB制作",
    categoryEn: "Web Production",
    title: "製造業A社 コーポレートサイトリニューアル",
    titleEn: "Manufacturing Company A Corporate Renewal",
    client: "製造業A社様",
    clientEn: "Manufacturing Company A",
    period: "2024年10月 〜 2024年12月（3ヶ月）",
    periodEn: "Oct 2024 – Dec 2024 (3 months)",
    image: "/modern-manufacturing-company-website-design.jpg",
    description:
      "創業50年を迎える老舗製造業のコーポレートサイトを、最新技術を用いて全面リニューアル。企業の歴史と技術力を伝えつつ、モダンで洗練されたデザインで再構築しました。",
    descriptionEn:
      "Fully renewed the corporate site of a 50-year manufacturer using modern technology, balancing heritage and technical strength with a refined design.",
    challenge:
      "古いHTMLサイトで更新が困難、スマートフォン非対応、SEO対策が不十分という課題がありました。また、BtoB向けのため、技術力と信頼性を効果的に伝える必要がありました。",
    challengeEn:
      "The legacy HTML site was hard to update, not mobile-friendly, and weak on SEO. We also needed to convey technical expertise and trust for B2B audiences.",
    solution:
      "Next.jsを採用し、高速で SEO に強いサイトを構築。CMSを導入し、社内で簡単に更新できる仕組みを実現。製品紹介ページは動画と3Dモデルを活用し、技術力を視覚的に表現しました。",
    solutionEn:
      "Built a fast, SEO-strong site with Next.js and a CMS for easy updates. Product pages use video and 3D models to showcase technical capabilities.",
    result: [
      "ページ表示速度が従来比3倍向上",
      "Google検索順位が平均15位上昇",
      "問い合わせ数が月間20件から50件に増加",
      "採用応募数が2倍に増加",
    ],
    resultEn: [
      "Page speed improved 3x",
      "Average Google ranking improved by 15 positions",
      "Monthly inquiries increased from 20 to 50",
      "Job applications doubled",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CMS", "Google Analytics"],
    technologiesEn: ["Next.js", "TypeScript", "Tailwind CSS", "CMS", "Google Analytics"],
  },
  "hotel-booking": {
    category: "システム開発",
    categoryEn: "System Development",
    title: "ホテルB社 オンライン予約システム",
    titleEn: "Hotel B Online Booking System",
    client: "ホテルB社様",
    clientEn: "Hotel B",
    period: "2024年8月 〜 2024年11月（4ヶ月）",
    periodEn: "Aug 2024 – Nov 2024 (4 months)",
    image: "/hotel-online-booking-system-interface.jpg",
    description:
      "地方のリゾートホテル向けに、宿泊予約からチェックイン、顧客管理まで一元管理できるクラウドシステムを開発。外部OTA連携にも対応しました。",
    descriptionEn:
      "Developed a cloud system for resort hotels covering reservations, check-in, and customer management, with OTA integrations.",
    challenge:
      "電話・メールでの予約管理に限界があり、ダブルブッキングや入力ミスが頻発。また、外部予約サイトとの在庫連携が手動で非効率でした。",
    challengeEn:
      "Phone/email booking caused double bookings and errors. Inventory sync with external booking sites was manual and inefficient.",
    solution:
      "リアルタイム在庫管理システムを構築し、複数チャネルからの予約を一元管理。Stripe決済を組み込み、事前決済とキャンセルポリシーの自動適用を実現。スタッフ向けの管理画面も直感的に操作できるUIで設計しました。",
    solutionEn:
      "Implemented real-time inventory management and unified bookings across channels. Added Stripe payments with automatic prepayment and cancellation policy handling, plus an intuitive admin UI.",
    result: [
      "予約業務の作業時間が70%削減",
      "ダブルブッキングがゼロに",
      "直接予約率が40%向上（OTA手数料削減）",
      "顧客満足度が15%向上",
    ],
    resultEn: [
      "Booking operations time reduced by 70%",
      "Double bookings eliminated",
      "Direct booking rate increased by 40% (lower OTA fees)",
      "Customer satisfaction improved by 15%",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "REST API"],
    technologiesEn: ["React", "Node.js", "PostgreSQL", "Stripe", "REST API"],
  },
  "restaurant-ec": {
    category: "EC構築",
    categoryEn: "E-commerce",
    title: "レストランC社 ECサイト",
    titleEn: "Restaurant C E-commerce Site",
    client: "レストランC社様",
    clientEn: "Restaurant C",
    period: "2024年9月 〜 2024年10月（2ヶ月）",
    periodEn: "Sep 2024 – Oct 2024 (2 months)",
    image: "/restaurant-ecommerce-website-design.jpg",
    description:
      "人気レストランのオリジナル商品をオンライン販売するECサイト。ブランドの世界観を保ちながら、購入しやすいUXを実現しました。",
    descriptionEn:
      "E-commerce site for a popular restaurant’s original products, preserving brand identity while improving purchase UX.",
    challenge:
      "コロナ禍で店舗売上が減少し、オンライン販売への転換が急務。しかし、ECサイト運営の知識がなく、複雑な管理画面は避けたいとの要望でした。",
    challengeEn:
      "With in-store sales down during COVID, moving online was urgent. The team lacked EC experience and wanted a simple admin UI.",
    solution:
      "Next.jsで高速なECサイトを構築し、Stripeで安全な決済を実現。商品管理はHeadless CMSで簡単に操作可能に。配送管理システムも統合し、注文から配送までシームレスに管理できるようにしました。",
    solutionEn:
      "Built a fast Next.js storefront with Stripe payments. Product management uses a headless CMS, and shipping management was integrated for seamless operations.",
    result: [
      "月間売上300万円を達成（開始3ヶ月後）",
      "リピート購入率60%",
      "平均購入単価8,000円",
      "顧客データベース構築により、マーケティング施策が可能に",
    ],
    resultEn: [
      "Monthly sales reached ¥3,000,000 after three months",
      "Repeat purchase rate 60%",
      "Average order value ¥8,000",
      "Customer database enabled marketing initiatives",
    ],
    technologies: ["Next.js", "Stripe", "Headless CMS", "Tailwind CSS", "Vercel"],
    technologiesEn: ["Next.js", "Stripe", "Headless CMS", "Tailwind CSS", "Vercel"],
  },
  "clinic-crm": {
    category: "システム開発",
    categoryEn: "System Development",
    title: "クリニックD様 顧客管理システム",
    titleEn: "Clinic D Customer Management System",
    client: "クリニックD様",
    clientEn: "Clinic D",
    period: "2024年7月 〜 2024年10月（4ヶ月）",
    periodEn: "Jul 2024 – Oct 2024 (4 months)",
    image: "/clinic-customer-management-system-dashboard.jpg",
    description:
      "歯科クリニック向けに、患者情報、予約、カルテ、会計を一元管理するクラウドシステム。スタッフ間の情報共有も効率化しました。",
    descriptionEn:
      "Cloud system for dental clinics to manage patient data, reservations, records, and billing, improving staff collaboration.",
    challenge:
      "紙カルテと複数のExcelファイルで管理しており、情報の検索や共有に時間がかかる。また、予約の二重登録や見落としが発生していました。",
    challengeEn:
      "Paper records and multiple spreadsheets made search and sharing slow, and double bookings and missed entries occurred.",
    solution:
      "患者ごとに情報を一元管理できるCRMシステムを開発。予約カレンダーは視覚的に操作でき、リマインドメールも自動送信。カルテはテンプレート機能で入力を効率化し、画像添付や検索も可能にしました。",
    solutionEn:
      "Built a unified CRM with visual scheduling and automated reminders. Templates streamlined records, with attachments and search built in.",
    result: [
      "カルテ記入時間が50%削減",
      "予約ミスがゼロに",
      "患者情報の検索時間が90%削減",
      "スタッフ間の情報共有がスムーズに",
    ],
    resultEn: [
      "Charting time reduced by 50%",
      "Booking errors eliminated",
      "Search time reduced by 90%",
      "Smoother staff information sharing",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "WebSocket"],
    technologiesEn: ["React", "Node.js", "PostgreSQL", "AWS", "WebSocket"],
  },
  "fashion-brand": {
    category: "WEB制作",
    categoryEn: "Web Production",
    title: "ファッションブランドE社 ブランドサイト",
    titleEn: "Fashion Brand E Website",
    client: "ファッションブランドE社様",
    clientEn: "Fashion Brand E",
    period: "2024年6月 〜 2024年8月（3ヶ月）",
    periodEn: "Jun 2024 – Aug 2024 (3 months)",
    image: "/fashion-brand-website-design.jpg",
    description:
      "新進気鋭のファッションブランドの世界観を表現した、ビジュアル重視のブランドサイト。アニメーションとインタラクションで没入感を演出しました。",
    descriptionEn:
      "A visual-first brand site for an emerging fashion label, with immersive animations and interactions.",
    challenge:
      "新ブランドのため、認知度がゼロ。ブランドの独自性と世界観を強く印象づけ、SNSでのシェアを促進したいとの要望でした。",
    challengeEn:
      "With zero awareness as a new brand, the goal was to express uniqueness and drive social sharing.",
    solution:
      "パララックス効果、動画背景、スムーススクロールなどのインタラクションを駆使し、ストーリー性のあるサイトを構築。InstagramのフィードをAPIで連携し、常に最新情報を表示。ルックブックページは画像を大きく使い、ビジュアルを最大限に活かしました。",
    solutionEn:
      "Built a story-driven site using parallax, video backgrounds, and smooth scrolling. Integrated Instagram feeds and created a bold lookbook layout.",
    result: [
      "サイト公開1週間でSNSシェア1,000件超",
      "Instagram フォロワーが3ヶ月で5,000人増加",
      "オンラインショップへの流入が月間10,000件",
      "ブランド認知度が大幅向上",
    ],
    resultEn: [
      "Over 1,000 social shares in the first week",
      "Instagram followers increased by 5,000 in three months",
      "10,000 monthly visits to the online shop",
      "Significant increase in brand awareness",
    ],
    technologies: ["Next.js", "Framer Motion", "GSAP", "Instagram API", "Vercel"],
    technologiesEn: ["Next.js", "Framer Motion", "GSAP", "Instagram API", "Vercel"],
  },
  "school-lms": {
    category: "システム開発",
    categoryEn: "System Development",
    title: "教育機関F様 学習管理システム",
    titleEn: "Education F Learning Management System",
    client: "教育機関F様",
    clientEn: "Education F",
    period: "2024年4月 〜 2024年7月（4ヶ月）",
    periodEn: "Apr 2024 – Jul 2024 (4 months)",
    image: "/online-learning-management-system-interface.jpg",
    description:
      "オンライン授業と学習進捗を管理する教育プラットフォーム。動画配信、テスト機能、レポート提出、成績管理を統合しました。",
    descriptionEn:
      "Education platform for managing online classes and progress, integrating video delivery, tests, reports, and grades.",
    challenge:
      "コロナ禍でオンライン授業へ移行したが、Zoom + Googleドライブの組み合わせでは管理が煩雑。学習進捗の把握や成績管理が困難でした。",
    challengeEn:
      "Moving online during COVID made management complex with Zoom and Google Drive, making progress and grading difficult to track.",
    solution:
      "動画配信プラットフォームと学習管理機能を統合したLMSを開発。生徒は授業動画の視聴、課題提出、テスト受験を一つのプラットフォームで完結。教師は進捗状況をダッシュボードで一覧でき、個別フィードバックも容易に。",
    solutionEn:
      "Developed an LMS integrating video delivery and learning management. Students complete learning tasks in one place; teachers track progress via dashboards.",
    result: [
      "管理業務の時間が60%削減",
      "学習進捗の可視化により、中退率が20%減少",
      "生徒満足度が25%向上",
      "オンライン授業の受講者数が2倍に",
    ],
    resultEn: [
      "Administrative workload reduced by 60%",
      "Dropout rate reduced by 20% with progress visibility",
      "Student satisfaction improved by 25%",
      "Online class participation doubled",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Video Streaming API", "WebSocket"],
    technologiesEn: ["React", "Node.js", "PostgreSQL", "Video Streaming API", "WebSocket"],
  },
}

export function generateStaticParams() {
  return Object.keys(worksData).map((id) => ({
    id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const work = worksData[id]

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
  const work = worksData[id]

  if (!work) {
    notFound()
  }

  return <WorkDetailClient work={work} />
}
