# Trax Project Rules — Mandatory for All AI Copilot Sessions

> **Read this file in full before performing ANY task.** Every rule below is non-negotiable. Violating any of them is a critical failure.

---

## 1. Database Safety — Zero Tolerance for Data Loss

- **NEVER** run `prisma migrate reset`, `prisma db push --force-reset`, or any command that drops/recreates tables.
- **NEVER** execute `DELETE FROM`, `TRUNCATE`, or `DROP` SQL against the production or development database.
- **NEVER** run `prisma/seed.ts` or any seed script unless the user **explicitly** requests it in that exact message.
- **NEVER** modify or delete rows in the database through scripts, API calls, or raw queries unless the user explicitly asks for that specific operation.
- When writing migrations, **only** use additive, non-destructive changes (add columns, add tables). Never drop columns or tables without explicit user approval.
- If a task seems to require destructive database operations, **stop and ask** the user for confirmation before proceeding.

## 2. Code Preservation — Do Not Break What Works

- **NEVER** remove, rewrite, or refactor existing working code unless the user explicitly asks for it.
- **NEVER** delete files, functions, components, routes, or tests without explicit user instruction.
- When modifying a file, change **only** what is necessary for the task. Preserve all surrounding code, comments, and docstrings.
- Before editing any file, understand its current behavior. If unsure, **read the file first**.
- If a change could break existing functionality, **warn the user** before proceeding.
- **NEVER** remove existing API endpoints, route handlers, or controller methods.
- **NEVER** change function signatures, prop interfaces, or return types of existing code unless that is the explicit goal.

## 3. Design System — Always Follow It

The Trax frontend has a comprehensive design system at `trax-frontend/design-system/`. **All UI code must use it.**

### Typography (3 fonts, strict roles)
| Font | CSS Variable | Role | Usage |
|---|---|---|---|
| **Fraunces** | `--font-family-editorial` | Editorial | Headlines, article reader, hero text |
| **Instrument Sans** | `--font-family-ui` | UI | Navigation, meta, cards, buttons, chrome |
| **Space Mono** | `--font-family-mono` / `--font-family-accent` | Accent | Masthead watermark only |

- Use the pre-defined type classes: `type-hero`, `type-article-title`, `type-prose`, `type-card-title`, `type-excerpt`, `type-meta`, `type-label`, `type-section-title`, `type-watermark`.
- **NEVER** use arbitrary `font-family`, `font-size`, or `line-height` values. Always reference design tokens.

### Colors
- Use CSS variables from `design-system/colors/` — brand, neutral, and semantic palettes.
- **NEVER** hardcode hex/rgb/hsl color values. Always use `var(--token-name)`.
- Ensure all components work correctly in both light and dark themes.

### Spacing, Shadows & Surfaces
- Use tokens from `design-system/tokens/` (`spacing.css`, `shadows.css`, `surfaces.css`).
- **NEVER** use arbitrary `margin`, `padding`, `box-shadow`, or `border-radius` values when a token exists.

### Motion & Animation
- Use the motion system from `design-system/motion/` — `easing.ts`, `transitions.ts`, `variants.ts`, `buttonMotion.ts`.
- **NEVER** create custom animation timings/easings. Use the existing motion tokens.
- Use `framer-motion` for component animations, following patterns in `design-system/motion/variants.ts`.

### Components
- Prefer existing design-system components from `design-system/components/` before creating new ones.
- New components must import from the design system (`@/design-system` or relative path) and follow established patterns.

## 4. Architecture Conventions — Follow Existing Patterns

### Frontend (Next.js 16, App Router)
- Use the **App Router** (`app/` directory). Never create pages in a `pages/` directory.
- Follow the existing route structure: `app/[section]/page.tsx` for public pages, `app/dashboard/` for admin.
- Use **Server Components** by default. Only add `'use client'` when truly needed (interactivity, hooks, browser APIs).
- Place reusable components in `components/`. Place design primitives in `design-system/components/`.
- Use **Tailwind CSS** classes (project uses Tailwind v3) in combination with design-system CSS variables.
- Always support dark mode via `next-themes` and CSS variable theming.

### Backend (NestJS, Prisma, PostgreSQL)
- Follow the **NestJS module pattern**: each feature has its own `module`, `controller`, `service`, and `dto/` directory.
- All API routes are prefixed with `/api/v1/`.
- Use **Prisma Client** for all database access. Never use raw SQL unless absolutely necessary and approved.
- DTOs must use `class-validator` decorators for input validation.
- Authentication uses JWT via `@nestjs/passport`. Protected routes use the existing auth guard.
- Rate limiting is configured via `@nestjs/throttler`. Do not bypass or remove it.

### Prisma Schema
- The schema is at `trax-backend/prisma/schema.prisma`.
- Models use `@@map()` for snake_case table names. Keep this convention.
- IDs use `cuid()`. Do not switch to UUID or auto-increment.
- Always run `prisma generate` after schema changes.
- Create proper migration files (`prisma migrate dev --name descriptive-name`). Never use `db push` in production.

## 5. Environment & Secrets — Never Expose

- **NEVER** read, log, print, or display the contents of `.env`, `.env.local`, or `.env.production` files.
- **NEVER** modify `.env` files unless the user explicitly asks to add/change a specific variable.
- **NEVER** commit secrets, API keys, or credentials to version control.
- When creating new environment variables, add them to `.env.example` with placeholder values.

## 6. Git Safety

- **NEVER** run `git push --force`, `git reset --hard`, or `git clean -fd`.
- **NEVER** commit directly to `main` or `master` without explicit user instruction.
- Write clear, descriptive commit messages following conventional commits if committing.
- Do not delete branches without explicit user instruction.

## 7. Scope Discipline

- Only change what the user explicitly asks for. Do not make "bonus" refactors or "improvements" that were not requested.
- If you notice something unrelated that should be fixed, **mention it** but do not fix it unless asked.
- When adding new features, do not restructure or reorganize existing code to accommodate them unless the user approves.
- Ask clarifying questions when requirements are ambiguous rather than guessing.

## 8. Production Hygiene

- Never install new npm packages without informing the user which packages and why.
- Never remove existing dependencies.
- Do not modify `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `eslint.config.mjs`, or `nest-cli.json` unless the task explicitly requires it.
- All new code must be TypeScript. No `.js` files in the frontend or backend `src/`.
- Ensure all code compiles without errors before marking a task complete.
- Never leave `console.log` debugging statements in production code. Use proper NestJS `Logger` on the backend.
- All API responses should follow existing error handling patterns (NestJS exception filters).

## 9. SEO & Accessibility

- Maintain existing SEO infrastructure (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `llms.txt`).
- Every public page must have proper `<title>` and meta description.
- Use semantic HTML elements (`<article>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<main>`).
- All images must have `alt` text.
- Interactive elements must be keyboard accessible.

## 10. When In Doubt, Ask

If any task is ambiguous, could have unintended side effects, or conflicts with these rules — **stop and ask the user** before proceeding. It is always better to ask than to break something.
