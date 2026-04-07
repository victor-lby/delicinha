# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DELICINHA is a Brazilian Portuguese community platform for discovering and ranking AI apps/products. Users submit AI tools via a form, an AI agent (Gemini 2.0 Flash) evaluates them automatically, and the community votes. The UI language is Portuguese (pt-BR); code identifiers are English.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server on localhost:3000
npm run build        # Production build (use to verify no errors)
npm run start        # Serve production build
```

No linter, formatter, or test runner is configured.

## Architecture

- **Next.js 16** App Router + **React 19** + **TypeScript** strict
- **Tailwind CSS v4** — `@import "tailwindcss"` + `@theme` in `globals.css`, no tailwind.config file
- **React Compiler** enabled in `next.config.ts`
- Path alias: `@/*` → `./src/*`
- Fonts: ADLaM Display (`--font-adlam`) for logo/headings, Inter (`--font-inter`) for body — loaded via `next/font/google`

### Data Flow

1. User submits app name + URL via Hero form → `actions.ts#submitApp` (server action)
2. `ai-evaluator.ts` calls Gemini API (or falls back to local heuristic if no `GEMINI_API_KEY`)
3. Result saved to `data/submissions.json` via `store.ts`
4. Ranking reads from store, client-side filtering/sorting/pagination in `ranking-client.tsx`
5. Voting calls `actions.ts#voteApp` → updates JSON store → revalidates paths

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/store.ts` | JSON file persistence — `getAllSubmissions`, `getSubmissionBySlug`, `addSubmission`, `voteOnSubmission` |
| `src/lib/ai-evaluator.ts` | Gemini agent evaluator with local fallback — `evaluateSubmission()` (async) |
| `src/app/actions.ts` | Server actions: `submitApp`, `voteApp` |
| `src/app/page.tsx` | Home page composing Hero + Ranking + Footer |
| `src/app/apps/[slug]/page.tsx` | Detail page for a submission (`force-dynamic`) |
| `src/components/hero.tsx` | Client component — submission form with `useActionState` |
| `src/components/ranking-client.tsx` | Client component — filters, search, sort, pagination (5/page) |
| `src/components/vote-buttons.tsx` | Client component — upvote/downvote with `useTransition` |
| `src/components/static-page.tsx` | Shared layout for static pages (como-funciona, categorias, sobre, contato, termos) |

### Design System

- Dark purple/magenta/gold palette: backgrounds `#0D001A`, `#1A0033`; accents `#FF1493`, `#9B30FF`, `#FFD700`
- Gradient patterns: pink-to-purple for CTAs (`from-[#C026D3] to-[#DB2777]`), gold-to-orange for logo
- Large border-radius: 32-40px cards, 12-16px buttons, 20-22px filter bars
- Icons: `lucide-react`
- Images: `next/image` + `sharp`

### Environment

- `GEMINI_API_KEY` — Optional. Gemini API key from https://aistudio.google.com/apikey. Without it, evaluations use a local algorithmic fallback.

### Conventions

- Server Components by default; `"use client"` only when state/interactivity is needed
- Data fetched server-side in server components, passed as props to client components
- Revalidation via `revalidatePath()` after mutations
- No ORMs or external databases — JSON file at `data/submissions.json` (gitignored, auto-created)
