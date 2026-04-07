# GitHub Copilot Instructions

## Project: DELICINHA

Brazilian Portuguese platform for discovering and ranking AI apps. Users submit apps, an AI agent (Gemini) evaluates them, and the community votes.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 (no config file, uses `@theme` in globals.css)
- React Compiler enabled
- `@google/genai` for Gemini API integration
- JSON file persistence (no database)

## Code Conventions

- UI text in Portuguese (pt-BR); code identifiers in English
- Server Components by default; `"use client"` only when state/interactivity is needed
- Path alias `@/` maps to `src/`
- Fonts: ADLaM Display (`font-adlam`) for headings, Inter (`font-sans`) for body
- Colors: dark purple backgrounds (`#0D001A`), pink/magenta accents (`#FF1493`, `#9B30FF`), gold highlights (`#FFD700`)
- Large border-radius (32-40px for cards, 12-16px for buttons)
- Icons from `lucide-react`

## Key Patterns

- Server actions in `src/app/actions.ts` for mutations (submit, vote)
- Data store in `src/lib/store.ts` reads/writes JSON file
- AI evaluation in `src/lib/ai-evaluator.ts` — async, Gemini API with local fallback
- Client components receive data as props from server component parents
- `revalidatePath()` after all mutations

## File Structure

- `src/app/` — Pages and server actions
- `src/components/` — Reusable React components
- `src/lib/` — Business logic (store, AI evaluator)
- `public/` — Static assets
