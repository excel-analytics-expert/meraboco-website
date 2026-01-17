import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // セキュリティ: X-Powered-Byヘッダーを無効化
  poweredByHeader: false,
  
  // パフォーマンス: Gzip圧縮を有効化
  compress: true,
  
  // ビルド設定
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // 画像最適化（Core Web Vitals向上）
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1年キャッシュ
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 実験的機能（パフォーマンス向上）
  experimental: {
    optimizeCss: true,
  },
  
  // セキュリティヘッダー（A+評価対応）
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // DNS Prefetch
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // HSTS（HTTP Strict Transport Security）- 2年間
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // クリックジャッキング防止
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // MIMEタイプスニッフィング防止
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // XSS保護
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // リファラーポリシー
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // パーミッションポリシー
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Content Security Policy（厳格版）
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com",
              "connect-src 'self' https://va.vercel-scripts.com https://*.supabase.co",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Cross-Origin設定
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
      // 静的アセットのキャッシュ設定（パフォーマンス向上）
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
  
  // リダイレクト設定
  async redirects() {
    return [
      // wwwありからwwwなしにリダイレクト
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.meraboco.jp" }],
        destination: "https://meraboco.jp/:path*",
        permanent: true,
      },
    ]
  },
  
  // トレイリングスラッシュの統一
  trailingSlash: false,
}

export default nextConfig
