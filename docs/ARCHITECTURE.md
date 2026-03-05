# Meraboco Architecture Documentation

**Last Updated**: 2026-02-16  
**Maintainer**: s.kenichi

---

## 1. System Architecture Overview

### High-Level Design

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  - Next.js 16 App Router                                │
│  - React 19 + Framer Motion                             │
│  - Tailwind CSS v4 (OKLCH color space)                  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ HTTPS (TLS 1.3)
                  ▼
┌─────────────────────────────────────────────────────────┐
│              MIDDLEWARE LAYER (Edge)                     │
│  - Security Headers (HSTS, CSP, X-Frame-Options)        │
│  - Portal Access Control (Supabase token check)         │
│  - API CORS Protection (Origin whitelist)               │
└─────────────────┬───────────────────────────────────────┘
                  │
        ┌─────────┴─────────┬─────────────┬──────────────┐
        ▼                   ▼             ▼              ▼
┌───────────────┐  ┌────────────┐  ┌──────────┐  ┌─────────────┐
│   APP ROUTES  │  │ API ROUTES │  │  PORTAL  │  │    DEMOS    │
│   (Pages)     │  │ (/api/*)   │  │ (/portal)│  │ (/demos/*)  │
└───────────────┘  └─────┬──────┘  └────┬─────┘  └─────────────┘
                         │               │
        ┌────────────────┴───────┬───────┴────────┐
        ▼                        ▼                ▼
┌───────────────┐       ┌────────────────┐  ┌──────────┐
│   SUPABASE    │       │     RESEND     │  │  STRIPE  │
│  (Database)   │       │    (Email)     │  │(Payment) │
│  (Auth)       │       │  Magic Link    │  │          │
└───────────────┘       └────────────────┘  └──────────┘
        ▲
        │
        ▼
┌───────────────┐
│   microCMS    │
│  (Headless)   │
│   Plans/News  │
└───────────────┘
```

---

## 2. Directory Structure (Detailed)

### `/app` - Application Routes

```
app/
├── api/                        # Backend API endpoints
│   ├── checkout/
│   │   └── route.ts            # Stripe checkout creation
│   ├── contact/
│   │   └── route.ts            # Contact form (Resend email + Supabase storage)
│   ├── cron/
│   │   └── publish/route.ts    # (Future) Auto-posting system
│   └── portal/
│       └── subscribe/route.ts  # Subscription management
│
├── commerce/                   # E-commerce flows
│   ├── contract/page.tsx       # Contract agreement screen
│   └── purchase/page.tsx       # Purchase confirmation
│
├── company/                    # Company info
│   ├── page.tsx                # Representative greeting
│   └── philosophy/page.tsx     # Corporate philosophy
│
├── contact/
│   └── page.tsx                # Contact form
│
├── dashboard/
│   └── page.tsx                # (Future) Client dashboard
│
├── demos/                      # Demo sites (microCMS integration)
│   ├── hotel/                  # Hotel demo (high-end hospitality)
│   ├── pro/                    # Pro demo (advanced features)
│   └── standard/               # Standard demo (basic features)
│
├── law/
│   └── page.tsx                # 特定商取引法表記
│
├── plans/
│   └── page.tsx                # Pricing plans
│
├── portal/                     # Client portal (Magic Link auth)
│   ├── login/page.tsx          # Magic Link login
│   ├── callback/route.ts       # Auth callback handler
│   └── dashboard/page.tsx      # Portal dashboard
│
├── privacy/
│   └── page.tsx                # Privacy policy
│
├── services/                   # Service catalog (13 pages)
│   ├── web-production/
│   ├── system-development/
│   ├── ux-ui-design/
│   └── ... (10 more)
│
├── terms/
│   └── page.tsx                # Terms of service
│
├── works/                      # Portfolio (4 projects)
│   ├── project-1/
│   └── ...
│
├── globals.css                 # 🎨 Core design system
├── layout.tsx                  # Root layout (SEO, structured data)
├── page.tsx                    # Homepage
├── robots.ts                   # Dynamic robots.txt
└── sitemap.ts                  # Dynamic sitemap.xml
```

### `/components` - UI Components (84 files)

```
components/
├── ui/                         # shadcn/ui base components
│   ├── button.tsx              # Button variants
│   ├── card.tsx                # Card container
│   ├── dialog.tsx              # Modal dialogs
│   └── ... (40+ Radix UI wrappers)
│
├── cursor-follower.tsx         # Custom cursor effect (desktop)
├── digital-grid-overlay.tsx    # Neon grid background
├── firefly-particles.tsx       # Floating particles
├── hero-slider.tsx             # Ken Burns hero effect
├── matrix-rain-background.tsx  # Matrix-style animation
├── nature-background.tsx       # Organic background
├── page-transition.tsx         # Page transition wrapper
├── scroll-to-top.tsx           # Scroll-to-top button
├── smart-plan-section.tsx      # Pricing cards (with shimmer)
└── ... (custom components)
```

### `/lib` - Utility Libraries

```
lib/
├── microcms.ts                 # microCMS client initialization
├── security.ts                 # 🛡️ Input sanitization & error masking
├── utils.ts                    # General utilities (cn, etc.)
└── supabase/
    ├── client.ts               # Client-side Supabase client
    └── server.ts               # Server-side Supabase client
```

### `/middleware.ts` - Edge Middleware

```typescript
// Applied to all routes except static files
matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']

Features:
- Security headers injection
- Portal authentication check
- API CORS protection
```

---

## 3. Data Flow Diagrams

### Contact Form Flow

```
┌──────────┐
│  USER    │
│ (Browser)│
└────┬─────┘
     │ 1. Submit form
     ▼
┌──────────────────┐
│ /contact/page.tsx│
│ (React Hook Form)│
│ + Zod validation │
└────┬─────────────┘
     │ 2. POST /api/contact
     ▼
┌────────────────────────┐
│ /api/contact/route.ts  │
│ - sanitizeInput()      │
│ - Send email (Resend)  │
│ - Store in Supabase    │
└────┬───────────────────┘
     │ 3. Email sent
     ▼
┌──────────────┐         ┌──────────────┐
│   RESEND     │         │   SUPABASE   │
│ info@        │         │  inquiries   │
│ meraboco.jp  │         │  table       │
└──────────────┘         └──────────────┘
```

### Magic Link Authentication Flow

```
┌──────────┐
│  USER    │
└────┬─────┘
     │ 1. Enter email
     ▼
┌────────────────────┐
│ /portal/login      │
│ page.tsx           │
└────┬───────────────┘
     │ 2. Call Supabase Auth
     ▼
┌────────────────────────┐
│ Supabase Auth API      │
│ - Generate magic link  │
│ - Send email via Resend│
└────┬───────────────────┘
     │ 3. User clicks link
     ▼
┌────────────────────┐
│ /portal/callback   │
│ route.ts           │
│ - Verify token     │
│ - Set session      │
└────┬───────────────┘
     │ 4. Redirect
     ▼
┌────────────────────┐
│ /portal/dashboard  │
│ (Authenticated)    │
└────────────────────┘
```

### Stripe Checkout Flow

```
┌──────────┐
│  USER    │
└────┬─────┘
     │ 1. Click "Subscribe"
     ▼
┌────────────────────────┐
│ smart-plan-section.tsx │
│ handleSubscribe()      │
└────┬───────────────────┘
     │ 2. POST /api/checkout
     ▼
┌────────────────────────┐
│ /api/checkout/route.ts │
│ - Create Stripe session│
│ - Return checkout URL  │
└────┬───────────────────┘
     │ 3. Redirect
     ▼
┌────────────────────┐
│  STRIPE CHECKOUT   │
│  (External)        │
└────┬───────────────┘
     │ 4. Payment complete
     ▼
┌────────────────────┐
│ /success/page.tsx  │
│ (Thank you page)   │
└────────────────────┘
```

---

## 4. Authentication & Authorization

### Supabase Auth Strategy

- **Method**: Magic Link (passwordless)
- **Email Provider**: Resend
- **Session Storage**: HTTP-only cookies (`sb-access-token`, `sb-refresh-token`)
- **Token Lifetime**: 1 hour (access), 7 days (refresh)

### Protected Routes

**Portal Routes** (`/portal/*`):
- Middleware checks for Supabase session
- Redirects to `/portal/login` if unauthenticated
- Exception: `/portal/login` itself

**API Routes** (`/api/*`):
- Origin whitelist enforcement
- CORS headers for allowed origins only
- Returns 403 Forbidden for unknown origins

---

## 5. External Service Integration

### Supabase

**Database Tables**:
- `inquiries` - Contact form submissions
- `users` - User accounts (for portal)
- `subscriptions` - (Future) Subscription records

**Environment Variables**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...
```

### Resend

**Use Cases**:
- Contact form notifications → `info@meraboco.jp`
- Magic Link emails (Supabase integration)

**Environment Variables**:
```env
RESEND_API_KEY=re_xxxxxxxx
```

### microCMS

**Content Types**:
- `plans` - Pricing plans (Lite, Standard, Pro)
- `news` - Company news
- `showcases` - Portfolio items

**Environment Variables**:
```env
MICROCMS_SERVICE_DOMAIN=your-domain
MICROCMS_API_KEY=xxxxxxxx
```

### Stripe

**Features**:
- Checkout sessions (one-time & subscription)
- Payment intent management
- Webhook handling (Future)

**Environment Variables**:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 6. Security Architecture

### Middleware-Level Protection (`middleware.ts`)

**1. Security Headers**:
```typescript
X-Powered-By: [DELETED]              // Hide tech stack
X-Frame-Options: DENY                // Anti-clickjacking
X-Content-Type-Options: nosniff      // Anti-MIME-sniffing
X-XSS-Protection: 1; mode=block      // XSS filter
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**2. Portal Access Control**:
- Checks for `sb-access-token` or `sb-refresh-token`
- Redirects unauthenticated users to `/portal/login`

**3. API CORS Protection**:
```typescript
allowedOrigins = [
  'https://hotel-shiro-official.com',
  'http://localhost:3000'
]
```

### Application-Level Protection (`lib/security.ts`)

**1. Input Sanitization**:
```typescript
sanitizeInput(content: string): string
// Uses DOMPurify to remove dangerous HTML tags
```

**2. Error Masking**:
```typescript
handleApiError(error: unknown)
// Logs internally, returns generic error to client
```

**3. Validation Schemas**:
```typescript
commonSchemas.safeId  // Alphanumeric + hyphens only
commonSchemas.safeUrl // http/https only
```

---

## 7. Performance Optimization

### Core Web Vitals Strategy

**LCP (Largest Contentful Paint)**:
- Hero images optimized as WebP/AVIF
- Ken Burns effect uses GPU-accelerated transforms
- Critical CSS inlined in `globals.css`

**FID (First Input Delay)**:
- React 19 concurrent rendering
- Debounced form inputs
- Lazy-loaded components (demos, modals)

**CLS (Cumulative Layout Shift)**:
- Fixed aspect ratios for images
- Skeleton loaders for dynamic content
- Pre-calculated grid layouts

### Bundle Optimization

- **Code Splitting**: Automatic via Next.js App Router
- **Tree Shaking**: Unused Radix UI components eliminated
- **Font Loading**: Google Fonts with `font-display: swap`

---

## 8. SEO & Structured Data

### Metadata (in `app/layout.tsx`)

- **Title Template**: `%s | メラボコ - 東京のWEB制作会社`
- **Canonical URL**: `https://meraboco.jp/`
- **Open Graph**: Full OG tags for social sharing
- **Twitter Card**: `summary_large_image`
- **Robots**: `index, follow` with specific bot rules

### JSON-LD Structured Data

**Implemented Schemas**:
1. `Organization` - Company info, address, contact
2. `WebSite` - Search action, breadcrumbs
3. `WebPage` - Page-specific metadata
4. `ProfessionalService` - Service catalog, hours, reviews
5. `FAQPage` - Frequently asked questions (AEO)

---

## 9. Deployment Architecture

### Vercel (Primary)

**Build Command**: `next build`  
**Output**: Server-side rendering (SSR) + Static generation (ISR)  
**Edge Functions**: Middleware runs on Vercel Edge Network  
**Environment**: Production variables set in Vercel dashboard

### Git Workflow

```bash
git add .
git commit -m "Your message"
git push origin main
```

**Auto-Deploy**: Vercel automatically deploys on push to `main`

---

## 10. Monitoring & Error Tracking

### Vercel Analytics

- **Real-time metrics**: Page views, unique visitors
- **Web Vitals**: LCP, FID, CLS tracking
- **Geo distribution**: Visitor locations

### Console Logging (Development)

```typescript
console.error('[INTERNAL ERROR LOG]:', error)
// Production: Only generic errors sent to client
```

---

## 11. Future Architecture Considerations

### Planned Features

1. **Auto-Posting System** (`/api/cron/publish`)
   - MetaTrader5 integration
   - SNS automation (Instagram, Facebook)

2. **Dashboard Real-time Updates**
   - WebSocket integration via Supabase Realtime
   - Live market data stream

3. **Advanced Analytics**
   - Conversion tracking
   - Heatmap integration (Hotjar/Microsoft Clarity)

---

**Document Maintainer**: Antigravity  
**Last Review**: 2026-02-16

For design parameters, see `docs/DESIGN_SYSTEM.md`.  
For business rules, see `docs/BUSINESS_RULES.md`.
