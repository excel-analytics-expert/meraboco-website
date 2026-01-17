export const translations = {
  ja: {
    // Header
    header: {
      home: "ホーム",
      about: "私たちについて",
      services: "サービス",
      pricing: "料金",
      works: "実績",
      company: "会社概要",
      contact: "お問い合わせ",
    },
    // Hero
    hero: {
      slides: [
        {
          title: ["伝統を尊び、", "革新の礎を築く。"],
          text: "過去から未来へ繋ぐWEBコンサルティング",
        },
        {
          title: ["現代の複雑さに、新たな秩序を。"],
          text: "ビジネスの本質を捉えるソリューション",
        },
        {
          title: ["デジタルで、", "新しい前例をつくっていく。"],
          text: "WEB制作コンサルタント メラボコ",
        },
      ],
      ariaLabels: {
        previous: "前のスライドへ",
        next: "次のスライドへ",
        goToSlide: "スライド",
      },
    },
    // About
    about: {
      heading: "ABOUT",
      subheading: "メラボコについて",
      title1: "「デザイン」と「テクノロジー」の",
      title2: "力でビジネスを加速する",
      description:
        "メラボコは、最新のWEB技術とクリエイティブなデザインを融合させ、お客様のビジネスに合わせた最適なWEBソリューションを提供します。単なるWEBサイト制作だけでなく、ビジネス戦略からUXデザイン、技術選定まで一貫したコンサルティングで、成果につながるWEB体験を実現します。",
    },
    // Services
    services: {
      heading: "SERVICES",
      subheading: "提供サービス",
      items: [
        {
          title: "WEBサイト制作",
          description:
            "コーポレートサイトからECサイト、ランディングページまで、目的に合わせた最適なWEBサイトを制作します。",
        },
        {
          title: "WEBシステム開発",
          description: "業務効率化や顧客管理のためのWEBシステムを開発。使いやすさと拡張性を重視した設計を行います。",
        },
        {
          title: "UX/UIデザイン",
          description: "ユーザー体験を最適化するデザインで、使いやすく魅力的なインターフェースを実現します。",
        },
        {
          title: "デジタルマーケティング",
          description: "SEO対策、広告運用、アクセス解析など、デジタルマーケティング施策を総合的にサポートします。",
        },
      ],
    },
    // Pricing
    pricing: {
      heading: "PRICING",
      subheading: "料金プラン",
      plans: [
        {
          name: "Light Plan",
          price: "¥150,000~",
          description: "LP制作",
          features: ["1ページ", "スタートアップ・キャンペーン向け", "レスポンシブ対応", "基本SEO対策"],
          target: "初めてのWebサイト、キャンペーン用",
        },
        {
          name: "Standard Plan",
          price: "¥350,000~",
          description: "コーポレートサイト",
          features: ["5-8ページ", "CMS導入", "信頼性を高めたい企業向け", "お問い合わせフォーム", "SNS連携"],
          target: "企業サイト、信頼性重視の方",
          recommended: true,
        },
        {
          name: "Premium Plan",
          price: "¥800,000~",
          description: "ブランディング",
          features: ["高度なアニメーション", "システム開発", "圧倒的な差別化を目指す方向け", "完全オリジナルデザイン"],
          target: "最高品質を求める企業、EC サイト",
        },
      ],
      recommended: "推奨",
    },
    // Works
    works: {
      heading: "WORKS",
      subheading: "制作実績",
      viewMore: "実績をもっと見る",
    },
    // Contact
    contact: {
      heading: "CONTACT",
      subheading: "お問い合わせ",
      description: "プロジェクトのご相談やお見積りなど、お気軽にお問い合わせください。",
      phoneLabel: "お電話でのお問い合わせ",
      phone: "050-1793-1290",
      aiNotice:
        "※ AI秘書システムによる応答となっております。内容に誤りが無いように音声データの取り扱いには慎重に各専門家と協力の上取り扱っております。ご安心ください。",
      form: {
        name: "お名前",
        namePlaceholder: "山田 太郎",
        email: "メールアドレス",
        emailPlaceholder: "example@example.com",
        message: "お問い合わせ内容",
        messagePlaceholder: "お問い合わせ内容をご記入ください",
        submit: "送信する",
        sending: "送信中...",
        success: "お問い合わせを受け付けました。ありがとうございます。",
        error: "送信に失敗しました。もう一度お試しください。",
      },
    },
    // Footer
    footer: {
      sitemap: "サイトマップ",
      company: "会社情報",
      address: "〒107-0061 東京都港区北青山1-3-3",
      phone: "TEL: 050-1793-1290",
      aiNotice:
        "※ AI秘書システムによる応答となっております。内容に誤りが無いように音声データの取り扱いには慎重に各専門家と協力の上取り扱っております。ご安心ください。",
      email: "info@meraboco.com",
      copyright: "© 2026 Meraboco. Created by s.kenichi",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
    },
    // Company Page
    companyPage: {
      title: "会社概要",
      description: "私たちは、テクノロジーとデザインの力で、お客様のビジネスを次のステージへ導きます。",
      greeting: {
        title: "代表挨拶",
        message1:
          "デジタル技術が急速に発展する現代において、ビジネスの成功には適切なWEB戦略とシステム基盤が不可欠となっています。",
        message2:
          "メラボコは、お客様のビジネスを深く理解し、最適なデジタルソリューションを提供することで、持続的な成長を支援します。単なる制作会社ではなく、お客様の成功を共に目指すパートナーとして、誠実に向き合ってまいります。",
        message3:
          "最新の技術とクリエイティブな発想で、お客様のビジネスに新しい価値を創造し続けることをお約束いたします。",
        signature: "メラボコ 代表",
      },
      info: {
        title: "会社情報",
        tradeName: "屋号",
        businessType: "事業形態",
        businessTypeValue: "個人事業主",
        location: "所在地",
        business: "事業内容",
        businessItems: [
          "WEBサイト制作・運用",
          "システム開発・保守",
          "UX/UIデザイン",
          "デジタルマーケティング支援",
          "IT・DXコンサルティング",
        ],
        email: "メールアドレス",
        phone: "電話番号",
        aiNotice:
          "※ AI秘書システムによる応答となっております。内容に誤りが無いように音声データの取り扱いには慎重に各専門家と協力の上取り扱っております。ご安心ください。",
      },
      philosophy: {
        title: "企業理念",
        mission: "ミッション",
        missionText: "テクノロジーとデザインの力で、すべてのビジネスに新しい可能性を。",
        vision: "ビジョン",
        visionText: "すべての企業が最新のデジタル技術を活用し、持続的な成長を実現できる社会を創る。",
      },
      values: {
        title: "私たちの価値観",
        innovation: "革新",
        innovationText: "常に最新の技術とトレンドを追求し、革新的なソリューションを提供します。",
        trust: "信頼",
        trustText: "お客様との長期的なパートナーシップを大切にし、誠実に向き合います。",
        growth: "成長",
        growthText: "お客様とともに成長し、ビジネスの成功を全力でサポートします。",
      },
    },
    // Services Page
    servicesPage: {
      title: "提供サービス",
      description: "お客様のビジネス課題に合わせた、最適なデジタルソリューションをご提供します。",
      services: [
        {
          title: "WEB制作",
          description: "企業サイト、ECサイト、ランディングページなど、目的に応じた戦略的なWEBサイトを制作します。",
        },
        {
          title: "システム開発",
          description: "業務効率化システム、顧客管理システム、予約システムなど、カスタムシステムを開発します。",
        },
        { title: "UX/UIデザイン", description: "ユーザー体験を最優先に考えた、使いやすく美しいデザインを提供します。" },
        {
          title: "デジタルマーケティング",
          description: "SEO対策、広告運用、SNSマーケティングなど、集客を総合的に支援します。",
        },
        { title: "ITコンサルティング", description: "IT戦略立案からDX推進まで、経営課題の解決をサポートします。" },
        { title: "保守・運用", description: "WEBサイト・システムの定期更新、セキュリティ対策、障害対応を行います。" },
      ],
      flow: {
        title: "制作の流れ",
        steps: [
          {
            title: "ヒアリング",
            description: "お客様のビジネス課題や目標を詳しくお伺いし、最適なソリューションをご提案します。",
          },
          {
            title: "企画・設計",
            description: "サイト構成、デザインコンセプト、機能要件を設計し、お客様と合意形成します。",
          },
          {
            title: "デザイン・開発",
            description: "デザインモックアップを作成し、承認後にコーディング・開発を進めます。",
          },
          { title: "テスト・納品", description: "動作確認、ブラウザテストを実施後、本番環境へリリースします。" },
          { title: "運用・保守", description: "公開後も継続的にサポートし、改善提案や機能追加を行います。" },
        ],
      },
    },
    // Works Page
    worksPage: {
      title: "制作実績",
      description: "これまでに手がけた、さまざまな業界のプロジェクト事例をご紹介します。",
      cta: {
        title: "あなたのプロジェクトもお任せください",
        subtitle: "まずは無料でご相談いただけます",
        button: "お問い合わせはこちら",
      },
    },
    // Privacy Page
    privacyPage: {
      title: "プライバシーポリシー",
      description: "メラボコは、お客様の個人情報保護の重要性について認識し、適切な取り扱いと保護に努めます。",
    },
    // Terms Page
    termsPage: {
      title: "利用規約",
      description: "本利用規約は、メラボコが提供するサービスの利用条件を定めるものです。",
    },
  },
  en: {
    // Header
    header: {
      home: "Home",
      about: "About",
      services: "Services",
      pricing: "Pricing",
      works: "Works",
      company: "Company",
      contact: "Contact",
    },
    // Hero
    hero: {
      slides: [
        {
          title: ["Honoring Tradition,", "Building Innovation."],
          text: "Web Consulting Bridging Past to Future",
        },
        {
          title: ["New Order in Modern Complexity."],
          text: "Solutions Capturing Business Essence",
        },
        {
          title: ["Creating New Precedents", "Through Digital."],
          text: "Web Production Consultant Meraboco",
        },
      ],
      ariaLabels: {
        previous: "Previous slide",
        next: "Next slide",
        goToSlide: "Go to slide",
      },
    },
    // About
    about: {
      heading: "ABOUT",
      subheading: "About Meraboco",
      title1: "Accelerating Business with",
      title2: "Design & Technology",
      description:
        "Meraboco combines cutting-edge web technology with creative design to provide optimal web solutions tailored to your business. Beyond website creation, we offer comprehensive consulting from business strategy to UX design and technology selection, delivering web experiences that drive results.",
    },
    // Services
    services: {
      heading: "SERVICES",
      subheading: "Our Services",
      items: [
        {
          title: "Website Development",
          description:
            "From corporate sites to e-commerce and landing pages, we create optimal websites tailored to your goals.",
        },
        {
          title: "Web System Development",
          description:
            "We develop web systems for business efficiency and customer management, prioritizing usability and scalability.",
        },
        {
          title: "UX/UI Design",
          description: "Optimize user experience with design that creates easy-to-use and attractive interfaces.",
        },
        {
          title: "Digital Marketing",
          description:
            "Comprehensive support for digital marketing including SEO, advertising management, and analytics.",
        },
      ],
    },
    // Pricing
    pricing: {
      heading: "PRICING",
      subheading: "Pricing Plans",
      plans: [
        {
          name: "Light Plan",
          price: "$1,500~",
          description: "Landing Page",
          features: ["1 Page", "For Startups & Campaigns", "Responsive Design", "Basic SEO"],
          target: "First website, Campaign use",
        },
        {
          name: "Standard Plan",
          price: "$3,500~",
          description: "Corporate Site",
          features: ["5-8 Pages", "CMS Integration", "For Building Trust", "Contact Form", "SNS Integration"],
          target: "Corporate site, Trust-focused",
          recommended: true,
        },
        {
          name: "Premium Plan",
          price: "$8,000~",
          description: "Branding",
          features: ["Advanced Animations", "System Development", "For Maximum Differentiation", "Fully Custom Design"],
          target: "Premium quality, E-commerce",
        },
      ],
      recommended: "Recommended",
    },
    // Works
    works: {
      heading: "WORKS",
      subheading: "Our Portfolio",
      viewMore: "View More Works",
    },
    // Contact
    contact: {
      heading: "CONTACT",
      subheading: "Get In Touch",
      description: "Feel free to contact us for project consultations or quotes.",
      phoneLabel: "Contact by Phone",
      phone: "050-1793-1290",
      aiNotice:
        "* Calls are answered by our AI Secretary System. Voice data is handled carefully in collaboration with specialists to ensure accuracy. Please feel assured.",
      form: {
        name: "Name",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "example@example.com",
        message: "Message",
        messagePlaceholder: "Please enter your message",
        submit: "Submit",
        sending: "Sending...",
        success: "Thank you for your inquiry. We will get back to you soon.",
        error: "Failed to send. Please try again.",
      },
    },
    // Footer
    footer: {
      sitemap: "Sitemap",
      company: "Company Info",
      address: "1-3-3 Kita-Aoyama, Minato-ku, Tokyo 107-0061, Japan",
      phone: "TEL: 050-1793-1290",
      aiNotice:
        "* Calls are answered by our AI Secretary System. Voice data is handled carefully in collaboration with specialists to ensure accuracy. Please feel assured.",
      email: "info@meraboco.com",
      copyright: "© 2026 Meraboco. Created by s.kenichi",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    // Company Page
    companyPage: {
      title: "About Us",
      description: "We guide your business to the next stage with the power of technology and design.",
      greeting: {
        title: "Message from CEO",
        message1:
          "In today's rapidly evolving digital landscape, proper web strategy and system infrastructure are essential for business success.",
        message2:
          "Meraboco deeply understands your business and supports sustainable growth by providing optimal digital solutions. We are not just a production company, but a partner who sincerely works together to achieve your success.",
        message3:
          "We promise to continue creating new value for your business with cutting-edge technology and creative thinking.",
        signature: "CEO, Meraboco",
      },
      info: {
        title: "Company Information",
        tradeName: "Trade Name",
        businessType: "Business Type",
        businessTypeValue: "Sole Proprietorship",
        location: "Location",
        business: "Business",
        businessItems: [
          "Website Production & Operation",
          "System Development & Maintenance",
          "UX/UI Design",
          "Digital Marketing Support",
          "IT & DX Consulting",
        ],
        email: "Email",
        phone: "Phone",
        aiNotice:
          "* Calls are answered by our AI Secretary System. Voice data is handled carefully in collaboration with specialists to ensure accuracy. Please feel assured.",
      },
      philosophy: {
        title: "Corporate Philosophy",
        mission: "Mission",
        missionText: "New possibilities for all businesses through the power of technology and design.",
        vision: "Vision",
        visionText:
          "Creating a society where all companies can leverage the latest digital technology and achieve sustainable growth.",
      },
      values: {
        title: "Our Values",
        innovation: "Innovation",
        innovationText: "We pursue the latest technology and trends, providing innovative solutions.",
        trust: "Trust",
        trustText: "We value long-term partnerships with customers and approach them sincerely.",
        growth: "Growth",
        growthText: "We grow together with our customers and fully support business success.",
      },
    },
    // Services Page
    servicesPage: {
      title: "Our Services",
      description: "We provide optimal digital solutions tailored to your business challenges.",
      services: [
        {
          title: "Web Production",
          description: "We create strategic websites including corporate sites, e-commerce, and landing pages.",
        },
        {
          title: "System Development",
          description:
            "We develop custom systems including business efficiency, customer management, and reservation systems.",
        },
        {
          title: "UX/UI Design",
          description: "We provide easy-to-use and beautiful designs that prioritize user experience.",
        },
        {
          title: "Digital Marketing",
          description: "We comprehensively support customer acquisition through SEO, advertising, and SNS marketing.",
        },
        {
          title: "IT Consulting",
          description: "We support solving management issues from IT strategy planning to DX promotion.",
        },
        {
          title: "Maintenance",
          description: "We perform regular updates, security measures, and troubleshooting for websites and systems.",
        },
      ],
      flow: {
        title: "Production Flow",
        steps: [
          {
            title: "Hearing",
            description: "We listen to your business challenges and goals in detail and propose optimal solutions.",
          },
          {
            title: "Planning & Design",
            description:
              "We design site structure, design concept, and functional requirements, building consensus with you.",
          },
          {
            title: "Design & Development",
            description: "We create design mockups and proceed with coding and development after approval.",
          },
          {
            title: "Testing & Delivery",
            description: "After operation verification and browser testing, we release to production environment.",
          },
          {
            title: "Operation & Maintenance",
            description: "We continue to support after launch, making improvement proposals and adding features.",
          },
        ],
      },
    },
    // Works Page
    worksPage: {
      title: "Portfolio",
      description: "We introduce various industry project examples we have worked on.",
      cta: {
        title: "Entrust Your Project to Us",
        subtitle: "Free consultation available",
        button: "Contact Us",
      },
    },
    // Privacy Page
    privacyPage: {
      title: "Privacy Policy",
      description:
        "Meraboco recognizes the importance of protecting customer personal information and strives for appropriate handling and protection.",
    },
    // Terms Page
    termsPage: {
      title: "Terms of Service",
      description: "These Terms of Service define the conditions for using services provided by Meraboco.",
    },
  },
}

export type TranslationKey = keyof typeof translations.ja
export type Language = "ja" | "en"