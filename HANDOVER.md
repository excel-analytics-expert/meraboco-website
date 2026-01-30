# Meraboco Project Handover State

## 1. Project Overview
- Name: meraboco-website (Meraboco)
- Tech Stack: Next.js 16 (App Router), Tailwind CSS, Framer Motion
- Services: Supabase (Database), Resend (Email), microCMS (Headless CMS)

## 2. Local Environment
- Working Directory: `c:\meraboco_fixed`
- Development Server: running at `http://localhost:3000`
- Background Processes: `npm run dev` active (terminal `1.txt`)

## 3. Key Files and Configuration
- Environment Variables: `.env.local` (microCMS credentials are stored here)
- Email API: `app/api/contact/route.ts` handles inquiries via Resend and stores them in Supabase
- Content Management: `lib/microcms.ts` defines the client; API key is currently hardcoded for build stability
- Translations: centralized in `translations/index.ts`
- Backup: `c:\meraboco_fixed\meraboco_fixed_project.zip` (not found in workspace)

## 4. Current Work State
- Recent Goal: update file contents privately on the C drive
- Recent Change: fixed Font Awesome link to avoid string `onLoad` handler in `app/layout.tsx`
- Previously noted files not present in this workspace:
  - `app/sites/[id]/page.tsx`
  - `types/showcase.ts`
  - `types/site.ts`
- Pending: apply specific file updates without exposing sensitive content in chat

## 5. Instructions for Cursor
- Continue editing locally in Cursor; all files are on the C drive
- Server should be live for testing if `npm run dev` is running

## Notes
- Paths were normalized to the current workspace: `c:\meraboco_fixed`.
- `tsconfig.json` was auto-updated by Next dev (jsx `react-jsx`, include `.next/dev/types/**/*.ts`).
- Update this file as changes progress.
