# Meraboco Project Handover - Current State

**Last Updated**: 2026-02-16 08:08 JST  
**Status**: Development Active  
**Dev Server**: Running at `http://localhost:3000`

---

## 1. 🔍 Project Overview

### Basic Information
- **Project Name**: Meraboco (メラボコ) Official Website
- **Representative**: 栗林 加奈子 (Kurubayashi Kanako)
- **Creator**: s.kenichi
- **Location**: 東京都港区北青山1-3-3三橋ビル3F
- **Production URL**: https://meraboco.jp
- **Local Path**: `c:\meraboco_fixed`

### Brand Identity
- **Catchphrase**: "現代の複雑さに、新たな秩序を。" (Bring new order to modern complexity.)
- **Mission**: デザインとテクノロジーの力で、ビジネスを加速する
- **Tone**: Professional yet warm, sophisticated, innovative
- **Visual Identity**: High-end digital consultancy with glassy textures, neon accents, smooth animations

---

## 2. 🛠️ Technical Stack

### Core Framework
- **Next.js**: 16.0.10 (Canary, App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Node.js**: Development via `npm run dev`

### Styling & Animation
- **Tailwind CSS**: v4.1.9 (with `@tailwindcss/postcss`)
- **Vanilla CSS**: `app/globals.css` (グラスモーフィズム、カスタムアニメーション)
- **Framer Motion**: 12.23.26
- **Design System**: OKLCH color space, 0.9s animation standard

### Backend Services
- **Database & Auth**: Supabase (v2.93.2)
- **Email**: Resend (v4.0.0) - Magic Link authentication
- **CMS**: microCMS (v3.2.0)
- **Payment**: Stripe (v20.3.0)
- **Analytics**: Vercel Analytics

### UI Components
- **Base**: Radix UI (40+ components)
- **Utilities**: shadcn/ui custom components in `/components/ui/`

---

## 3. 📁 Project Structure

```
c:\meraboco_fixed/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── checkout/             # Stripe checkout
│   │   ├── contact/              # Contact form (Resend)
│   │   └── portal/               # Portal API
│   ├── demos/                    # Demo sites
│   │   ├── hotel/                # Hotel demo
│   │   ├── pro/                  # Pro demo
│   │   └── standard/             # Standard demo
│   ├── portal/                   # Client portal (Magic Link auth)
│   ├── services/                 # Service pages
│   ├── works/                    # Portfolio
│   ├── globals.css               # 🎨 Design system core
│   ├── layout.tsx                # SEO + Structured data
│   └── page.tsx                  # Homepage
├── components/                   # 84 UI components
├── lib/                          # Utilities
│   ├── microcms.ts               # CMS client
│   ├── security.ts               # 🛡️ NEW: Input sanitization
│   └── supabase/                 # DB clients
├── middleware.ts                 # 🛡️ NEW: Security middleware
├── public/                       # Static assets
├── translations/                 # i18n (JA/EN)
├── .env.local                    # Environment variables
├── PROJECT_KNOWLEDGE.md          # Brand identity & prohibitions
├── HANDOVER.md                   # This file
└── README.md                     # Setup & deployment guide
```

---

## 4. 🔐 Environment Variables

**File**: `.env.local` (not in Git)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...

# Resend
RESEND_API_KEY=re_xxxxxxxx

# microCMS
MICROCMS_SERVICE_DOMAIN=your-domain
MICROCMS_API_KEY=xxxxxxxx

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 5. 🎨 Design Philosophy (Critical Parameters)

### Animation Standards
- **Base Duration**: 0.9s (or 1.2s for complex transitions)
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-based)
- **Hero Effect**: Ken Burns (20s slow zoom)
- **Grain Texture**: `opacity: 0.015` (film-like quality)

### Glassmorphism
- **Blur**: `backdrop-filter: blur(20px)`
- **Saturation**: `saturate(180%)`
- **Border**: `1px solid rgba(255, 255, 255, 0.15)`
- **3D Tilt**: `rotateX(2deg) rotateY(-2deg)` on hover

### Color System
- **Primary**: `oklch(0.55 0.22 263)` - Deep Blue/Cyan
- **Neon Accents**: Cyan, Green, Blue pulses
- **Dark/Light**: Fully supported with smooth transitions

### Typography
- **Tracking**: `letter-spacing: 0.01em` (base)
- **Kerning**: `font-feature-settings: "kern" 1, "liga" 1`

---

## 6. 🚨 Recent Changes (2026-02-16)

### Security Implementation
1. **`middleware.ts`** (NEW)
   - Security headers (X-Frame-Options, HSTS, etc.)
   - Portal access control (Supabase token check)
   - API CORS protection (origin whitelist)

2. **`lib/security.ts`** (NEW)
   - Input sanitization (`DOMPurify`)
   - Error masking for API responses
   - Zod validation schemas

3. **`.vscode/settings.json`** (UPDATED)
   - Added `"css.lint.unknownAtRules": "ignore"` (Tailwind v4 fix)

4. **Dependencies**
   - Installed: `isomorphic-dompurify`

---

## 7. ⚠️ Prohibitions (Absolute Rules)

**DO NOT** perform the following actions without explicit permission:

1. ❌ Remove "v0" or "Meraboco" signatures from components
2. ❌ Alter representative information (栗林 加奈子)
3. ❌ Change location data (港区北青山1-3-3三橋ビル3F)
4. ❌ Modify the 0.9s animation standard
5. ❌ Remove glassmorphism effects or grain texture
6. ❌ Perform large-scale refactors without consultation
7. ❌ Delete or modify `PROJECT_KNOWLEDGE.md` content

---

## 8. 🔄 Active Development State

### Running Processes
- **Terminal**: `npm run dev` (running for 1h30m+)
- **Port**: `http://localhost:3000`
- **Status**: ✅ Compiled successfully

### Open Documents (Current Session)
- `app/globals.css`
- `.env.local`
- `HANDOVER.md` (this file)

### Next Steps
- Dashboard implementation (awaiting Commander's instructions)
- Further integration of Security utilities

---

## 9. 📚 Essential Reading for New AI Agents

**Priority Order**:
1. `HANDOVER.md` (this file) - Current state
2. `PROJECT_KNOWLEDGE.md` - Brand identity & prohibitions
3. `docs/ARCHITECTURE.md` - Technical deep-dive (to be created)
4. `docs/DESIGN_SYSTEM.md` - Design parameters (to be created)
5. `docs/BUSINESS_RULES.md` - Operational guidelines (to be created)
6. `app/globals.css` - Visual language source of truth
7. `app/layout.tsx` - SEO & structured data
8. `README.md` - Setup & deployment

---

## 10. 🧭 How to Continue Work

### For Antigravity (Current Agent)
1. Maintain security protocols
2. Follow 0.9s animation standard
3. Use glassmorphism consistently
4. Never alter prohibited content

### For Gemini (Handover Target)
1. Read all documents in Priority Order (Section 9)
2. Review `app/globals.css` to absorb design philosophy
3. Check `.env.local` for service credentials
4. Understand restrictions in `PROJECT_KNOWLEDGE.md`

### For Human Developers (Cursor/VSCode)
1. Run `npm run dev` to start server
2. Edit locally in `c:\meraboco_fixed`
3. Test at `http://localhost:3000`
4. Follow Git workflow: `git add . && git commit && git push`

---

**Handover Status**: Ready for transfer to Gemini or other AI agents.  
**Contact**: s.kenichi (Creator)

---

© 2026 Meraboco. All configurations documented by Antigravity.
