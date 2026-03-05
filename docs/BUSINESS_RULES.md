# Meraboco Business Rules & Operational Guidelines

**Last Updated**: 2026-02-16  
**Authority**: s.kenichi (Project Creator)  
**Purpose**: Define absolute boundaries and operational policies

---

## 1. Prohibited Actions (ABSOLUTE RULES)

### ❌ Never Alter These Without Explicit Permission

#### Identity Information
1. **Representative Name**: 栗林 加奈子 (Kurubayashi Kanako)
   - Location: `app/layout.tsx`, structured data
   - Must remain unchanged across all pages

2. **Company Address**: 〒107-0061 東京都港区北青山1-3-3三橋ビル3F
   - Location: Footer, contact pages, structured data
   - Never change to other locations (e.g., "Edogawa" is forbidden)

3. **Contact Information**:
   - Email: `info@meraboco.jp`
   - Phone: `050-1793-1290`
   - Location: Multiple pages, API routes

#### Branding Elements
4. **Signatures**:
   - **v0 Signature**: Must not be removed from components
   - **Meraboco Signature**: Must remain in footers/credits
   - **Creator Credit**: `© 2026 Meraboco. Created by s.kenichi`

5. **Brand Messaging**:
   - Catchphrase: "現代の複雑さに、新たな秩序を。"
   - Slogan: "デジタルで、新しい前例をつくっていく。"
   - Mission: "デザインとテクノロジーの力で、ビジネスを加速する"

#### Design Standards
6. **Animation Duration**: 0.9s standard (never change to 0.3s or generic values)
7. **Glassmorphism Effects**: `blur(20px)` standard (core identity)
8. **Grain Texture**: `opacity: 0.015` (must remain subtle)
9. **OKLCH Color Space**: Never revert to RGB/HEX without approval

---

## 2. Content Guidelines

### Tone & Voice

**Professional yet Warm**:
- Use polite Japanese (です・ます調)
- Avoid overly technical jargon
- Balance sophistication with approachability

**Example (Correct)**:
```
"私たちは、デザインとテクノロジーの力で、ビジネスを加速します。"
```

**Example (Incorrect)**:
```
"最新のフレームワークとデータベースを使用してWebシステムを構築します。"
```

### Word Choice Standards

**Preferred Terms**:
- "WEB制作" (not "ホームページ作成")
- "システム開発" (not "プログラミング")
- "UX/UI設計" (not "デザイン")
- "DX支援" (not "IT化")
- "デジタルマーケティング" (not "ネット広告")

**Forbidden Terms**:
- "激安" (cheap)
- "格安ホームページ" (cheap website)
- "簡単" (easy, implies low quality)
- "即日対応" (same-day service, unrealistic promise)

---

## 3. Service Terminology

### Pricing Plans

**Official Names** (must use exact capitalization):
- **Lite プラン** (not "ライトプラン")
- **Standard プラン** (not "スタンダードプラン")
- **Pro プラン** (not "プロプラン")

### Service Categories

**Exact Names**:
1. WEB制作
2. システム開発
3. UX/UI設計
4. デジタルマーケティング
5. WEBコンサルティング
6. 保守・運用

---

## 4. Legal & Compliance

### Required Pages (Must Exist)

1. **特定商取引法表記** (`/law`)
   - Business type: 個人事業主 (Sole Proprietorship)
   - Name: メラボコ（屋号） 栗林 加奈子
   - Service: WEBサイト制作・運用サービス

2. **プライバシーポリシー** (`/privacy`)
   - Supabase for data storage
   - Resend for email processing
   - Google Analytics for tracking

3. **利用規約** (`/terms`)
   - Portal usage terms
   - Payment terms (Stripe)
   - Intellectual property rights

### Data Handling Policies

**Personal Information Storage**:
- Location: Supabase (encrypted at rest)
- Retention: 3 years after last interaction
- Deletion: Upon user request via `info@meraboco.jp`

**Cookie Usage**:
- Authentication: `sb-access-token`, `sb-refresh-token`
- Analytics: Google Analytics, Vercel Analytics
- Consent: Implied by continued use (no explicit banner required in Japan)

---

## 5. Operational Policies

### Email Communication

**From Address**: `info@meraboco.jp`  
**Reply-To**: Same  
**Signature**:
```
──────────────────────────
メラボコ（Meraboco）
代表：栗林 加奈子
〒107-0061 東京都港区北青山1-3-3三橋ビル3F
TEL: 050-1793-1290
Email: info@meraboco.jp
Web: https://meraboco.jp
──────────────────────────
```

### AI Secretary Notice

**Required Disclaimer** (on contact pages):
```
※お問い合わせは、AI秘書システムを通じて効率的に処理されます。
お急ぎの場合は、お電話にてご連絡ください。
```

**Rationale**: Transparency about AI usage builds trust

---

## 6. Content Management Rules

### microCMS Integration

**Content Types**:
- `plans`: Pricing plans (fetched dynamically)
- `news`: Company announcements
- `showcases`: Portfolio items

**Hardcoded vs. CMS**:
- **Hardcoded**: Emotional copy, brand messaging
- **CMS**: Pricing, features, portfolio data

**Example (Correct Balance)**:
```tsx
{/* Hardcoded - Brand Voice */}
<h2>心安らぐ隠れ家</h2>

{/* CMS - Dynamic Data */}
<p>{plan.description}</p>
```

### Image Guidelines

**File Formats**:
- Hero images: WebP (with JPEG fallback)
- Icons: SVG
- Photos: WebP/AVIF

**Alt Text**:
- Descriptive: "東京・港区北青山のオフィス外観"
- Not generic: "画像" or "image"

**Optimization**:
- Max width: 1920px
- Compression: 80% quality
- Lazy loading: Enabled for below-fold images

---

## 7. SEO Standards

### Meta Descriptions

**Length**: 120-160 characters  
**Format**: `[Service] - [Benefit] - [Location/Company]`

**Example**:
```
メラボコは東京・港区北青山のWEB制作会社。スマートプラン（月額制Web制作）で成果につながるWeb体験を提供します。
```

### Structured Data Requirements

**Mandatory Schemas**:
1. `Organization` - Company info
2. `WebSite` - Search action
3. `WebPage` - Page metadata
4. `ProfessionalService` - Service catalog
5. `FAQPage` - Q&A for AEO

**Location**: `app/layout.tsx` (JSON-LD in `<head>`)

### URL Structure

**Format**: `/category/subcategory` (kebab-case)

**Examples (Correct)**:
```
/services/web-production
/services/system-development
/works/project-1
```

**Examples (Incorrect)**:
```
/services/webProduction      (camelCase)
/services/web_production     (snake_case)
/services/WEB制作            (Japanese)
```

---

## 8. Version Control

### Git Commit Message Format

```
[Type] Brief description

- Detailed change 1
- Detailed change 2
- Detailed change 3

Refs: #issue-number (if applicable)
```

**Types**:
- `[Feature]` - New functionality
- `[Fix]` - Bug fix
- `[Style]` - CSS/design changes
- `[Refactor]` - Code restructuring
- `[Docs]` - Documentation only
- `[Security]` - Security improvements

**Example**:
```
[Security] Implement middleware protection

- Add security headers (HSTS, X-Frame-Options)
- Implement portal access control
- Add API CORS protection

Refs: #42
```

### Branch Strategy

- `main` - Production (auto-deployed to Vercel)
- No feature branches (direct commits to main for small team)
- Tag releases: `v1.0.0`, `v1.1.0`, etc.

---

## 9. Deployment Rules

### Pre-Deployment Checklist

**Required Steps**:
1. ✅ Run `npm run build` locally (verify no errors)
2. ✅ Check all environment variables in Vercel dashboard
3. ✅ Verify `.env.local` is NOT committed
4. ✅ Test Magic Link login flow
5. ✅ Confirm Stripe webhook endpoints
6. ✅ Review structured data with [Rich Results Test](https://search.google.com/test/rich-results)

### Post-Deployment Verification

**Within 24 hours**:
1. 🔍 Google Search Console - Submit sitemap
2. 🔍 Lighthouse - Verify 90+ score (all categories)
3. 🔍 Security Headers - Verify A+ rating
4. 🔍 Test contact form end-to-end

---

## 10. Client Communication

### Inquiry Response Time

**Standard**: Within 24 hours (business days)  
**Urgent**: Within 4 hours (phone calls)

### Consultation Flow

1. **Initial Contact** (via `/contact`)
   - AI Secretary acknowledges receipt (auto-email)
   - Mark as read in Supabase dashboard

2. **First Response** (human review)
   - Personalized reply from `info@meraboco.jp`
   - Clarify requirements, propose meeting

3. **Meeting Options**:
   - Video call (Google Meet)
   - Phone consultation
   - In-person (港区北青山 office)

4. **Proposal Delivery**:
   - PDF proposal via email
   - Follow-up within 3 business days

---

## 11. Error Handling

### User-Facing Errors

**Never Show**:
- Stack traces
- Database connection strings
- API keys
- Internal file paths

**Always Show**:
- Generic error message: "申し訳ございません。エラーが発生しました。"
- Error code (for support): `ERR-2026-XXXX`
- Contact information: `info@meraboco.jp`

### Error Logging

**Development**:
```typescript
console.error('[INTERNAL ERROR LOG]:', error);
```

**Production**:
- Log to Vercel Analytics (automatic)
- Do NOT expose to client

---

## 12. Performance Budgets

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### File Size Limits

- JavaScript bundle: < 200 KB (gzipped)
- CSS bundle: < 50 KB (gzipped)
- Hero image: < 500 KB (WebP)
- Icon fonts: < 100 KB

---

## 13. Accessibility Standards

### WCAG 2.1 AA Minimum

**Required**:
- ✅ Contrast ratio ≥ 4.5:1 (text)
- ✅ Contrast ratio ≥ 3:1 (UI components)
- ✅ Keyboard navigation (all interactive elements)
- ✅ ARIA labels (for screen readers)
- ✅ Focus indicators (visible)

**Testing Tools**:
- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- Lighthouse Accessibility Audit

---

## 14. Security Policies

### API Rate Limiting

**Contact Form**: 5 requests / 10 minutes per IP  
**Magic Link**: 3 requests / 15 minutes per email  
**Stripe API**: Handled by Stripe-side limits

### Password Policies (Future)

If password auth is added:
- Minimum 12 characters
- Must include: uppercase, lowercase, number, symbol
- No common passwords (use `zxcvbn` library)

### Session Management

- Access token: 1 hour
- Refresh token: 7 days
- HTTP-only cookies (not accessible via JavaScript)

---

## 15. Prohibited Modifications

### Code-Level Restrictions

**Never Modify Without Approval**:
1. `app/globals.css` - Core design tokens
2. `PROJECT_KNOWLEDGE.md` - Brand documentation
3. `middleware.ts` - Security layer
4. `app/layout.tsx` - SEO/structured data
5. `.env.local` structure (can update values only)

### Design-Level Restrictions

**Never Change**:
1. Animation duration from 0.9s to < 0.5s
2. Glassmorphism blur from 20px to < 10px
3. Grain texture opacity from 0.015 to > 0.05
4. OKLCH color definitions to RGB/HEX

---

## 16. Handover Protocol

### When Transferring to Another AI

**Required Steps**:
1. Read `HANDOVER.md` first
2. Read `PROJECT_KNOWLEDGE.md` second
3. Review `docs/ARCHITECTURE.md` and `docs/DESIGN_SYSTEM.md`
4. Read this file (`docs/BUSINESS_RULES.md`)
5. Confirm understanding of all prohibited actions

**Test Task** (before autonomous work):
```
Create a new component that follows:
- 0.9s animation duration
- Glassmorphism with blur(20px)
- OKLCH colors only
- Grain texture if applicable
```

---

**Document Status**: Complete  
**Authority**: s.kenichi (Creator)  
**Enforcement**: All AI agents, human developers  
**Last Review**: 2026-02-16

**Violation Reporting**: If uncertain about any rule, ask before proceeding.  
**Contact**: s.kenichi via project communication channels.

© 2026 Meraboco. Business rules established by s.kenichi.
