# Meraboco Project Knowledge Base (Site Snapshot)

This document serves as the single source of truth for the **Meraboco (メラボコ)** official website's identity, content, and design system. 

## 1. Brand Identity & core Concept
- **Organization Name**: Meraboco (メラボコ)
- **Catchphrase**: "現代の複雑さに、新たな秩序を。" (Bring new order to modern complexity.)
- **Mission**: Accelerating business through the power of "Design" and "Technology".
- **Tone & Voice**: Professional yet warm, sophisticated, and innovative.
- **Key Visual Identity**: High-end digital consultancy feel with glassy textures, neon accents, and smooth animations.

## 2. Visual & Design System
- **Design Philosophy**: "Rich Aesthetics" - wows the user at first glance.
- **Core Aesthetic Elements**:
    - **Glassmorphism**: Extensive use of `backdrop-filter: blur`, high transparency, and subtle borders.
    - **Animations**: 0.9s duration standard for transitions. Features include Ken Burns effects on heroes, "sand particle" reveals, and spring-based float-up animations.
    - **Textures**: Grainy noise filters overlaid on backgrounds for a premium tactile feel.
    - **Interactive**: Cards rotate slightly on hover (`rotateX`, `rotateY`) with dynamic light shimmers.
- **Color Palette (OKLCH)**:
    - **Primary**: Deep Blue/Cyan (oklch(0.55 0.22 263))
    - **Neon Accents**: Cyan, Green, and Blue pulses.
    - **Dark/Light Mode**: Fully supported with sophisticated transitions.

## 3. Site Structure & Content
### Pages
- **Home (`/`)**: High-impact hero slider, About summary, Services overview, Pricing tiers, and Contact form.
- **Company (`/company`)**: Representative greeting, Business info (個人事業主/Sole Proprietorship), and Corporate Philosophy.
- **Services (`/services`)**: Detailed catalog (Web Production, Systems, UX/UI, Marketing, Consulting, Maintenance).
- **Works (`/works`)**: Project showcase with performance metrics (Google PageSpeed scores).
- **Portal (`/portal`)**: Client dashboard with Magic Link authentication.
- **E-commerce**: Purchase flows, contract agreement screens, and Stripe integration.

### Core Features
- **Magic Link Auth**: Secure, passwordless login via Resend.
- **Dynamic Content**: Headless CMS (microCMS) integration for Plans, News, and Showcase.
- **Contact System**: Advanced form including "Purpose", "Reference URL", and "Budget" fields. Multi-language support (JA/EN).
- **AI Secretary**: Transparent notice that inquiries are handled via an AI secretary system for efficiency.

## 4. Technical Architecture
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + Vanilla CSS (globals.css)
- **Backend**: Supabase (DB & Auth), Resend (Transactional Email)
- **CMS**: microCMS
- **Payments**: Stripe
- **Animations**: Framer Motion + CSS Keyframes
- **Environment**: Managed as a local project on Windows (c:\meraboco_fixed).

## 5. Deployment & Prohibitions
- **Target**: Vercel
- **Prohibitions**:
    - NEVER remove the "v0" or "Meraboco" signatures unless explicitly asked.
    - NEVER alter representative/location information without confirmation.
    - DO NOT perform large-scale refactors that deviate from the "Glassy/0.9s" design principle.

---
*Last Updated: 2026-02-09*
