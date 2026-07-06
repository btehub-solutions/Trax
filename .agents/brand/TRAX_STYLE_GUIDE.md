# TRAX Brand Style Guide

> **Tracking Ogun State's Tech Movement**
> Version 1.0 · July 2026

---

## 1. Logo

| Variant | Usage |
|---------|-------|
| **Primary Wordmark** | `TRAX` — set in **Oxanium 800** (Extra Bold), uppercase, accent red `#FF1A1A` |
| **With Tagline** | Wordmark + `Tracking Ogun State's Tech Movement` in DM Sans 400 |
| **Admin Badge** | Red pill badge `ADMIN` beside wordmark — `bg-red-600/10`, `text-red-600`, `border-red-600/20`, 10px uppercase bold |

### Rules

- **Minimum size**: 24px font-size for the wordmark
- **Clear space**: 1× the height of the "T" on all sides
- **Never** rotate, stretch, outline, or recolor the wordmark outside the palette below
- **Never** add drop shadows or gradients to the wordmark itself

---

## 2. Colors

### 2.1 Brand Accent

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#FF1A1A` | Primary CTA, links, badges, selection highlight |
| `--accent-hover` | `#FF4D4D` | Hover state for accent elements |
| `--accent-gradient` | `linear-gradient(135deg, #FF1A1A 0%, #99000A 100%)` | Hero gradients, gradient text |

### 2.2 Backgrounds (Default / Root Theme)

| Token | Value | Description |
|-------|-------|-------------|
| `--bg` | `#1A0A0D` | Page background — deep oxblood-black |
| `--bg-alt` | `#120608` | Alternate sections, deeper contrast |
| `--card-bg` | `#2D1016` | Card surfaces |
| `--badge-bg` | `#120406` | Category badge fill |
| `--nav-bg` | `rgba(26, 10, 13, 0.95)` | Navbar — semi-transparent with backdrop blur |
| `--footer-bg` | `rgba(26, 10, 13, 0.95)` | Footer — matches nav |

### 2.3 Backgrounds (Dark / Zinc Mode)

| Token | Value | Description |
|-------|-------|-------------|
| `--bg` | `#09090B` | Zinc-black page background |
| `--bg-alt` | `#121215` | Zinc alternate |
| `--card-bg` | `#181316` | Zinc card surface |
| `--badge-bg` | `#1C1215` | Zinc badge fill |
| `--nav-bg` | `rgba(20, 20, 23, 0.90)` | Zinc nav |

### 2.4 Foreground

| Token | Default | Dark | Usage |
|-------|---------|------|-------|
| `--fg` | `#FFFFFF` | `#F4F4F5` | Primary text |
| `--fg-muted` | `#EAE4E7` | `#D4D4D8` | Body copy, secondary text |
| `--fg-subtle` | `#B09EA7` | `#A19C9F` | Captions, timestamps, placeholders |

### 2.5 Borders & Surfaces

| Token | Default | Description |
|-------|---------|-------------|
| `--border` | `rgba(255, 26, 26, 0.12)` | Subtle red-tinted borders |
| `--card-border` | `rgba(255, 255, 255, 0.08)` | Card edge — near-invisible white |

### 2.6 Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)` |
| `--shadow-md` | `0 4px 20px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.03)` |
| `--shadow-lg` | `0 12px 40px rgba(0,0,0,0.08)` |
| `--shadow-hover` | `0 16px 48px rgba(0,0,0,0.1)` |

> In Zinc Dark mode, shadow opacities increase to 0.5–0.8 for visibility on the darker surface.

### 2.7 Dashboard-Specific Tokens

| Token | Value | Purpose |
|-------|-------|---------|
| `--dash-sidebar` | `rgba(255,255,255,0.035)` | Sidebar glass fill |
| `--dash-card` | `rgba(255,255,255,0.045)` | Dashboard card fill |
| `--dash-input` | `rgba(255,255,255,0.06)` | Input field background |
| `--dash-hover` | `rgba(255, 26, 26, 0.08)` | Nav item hover tint |
| `--dash-thead` | `rgba(255,255,255,0.05)` | Table header row |

---

## 3. Typography

### 3.1 Font Families

| Role | Family | Weights | CSS Variable |
|------|--------|---------|-------------|
| **Display** | [Oxanium](https://fonts.google.com/specimen/Oxanium) | 400–800 | `--font-oxanium` |
| **Body / UI** | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | 300–700, normal + italic | `--font-dm-sans` |

- **Fallback stack**: `-apple-system, BlinkMacSystemFont, sans-serif`
- Oxanium is used **only** for the TRAX wordmark and decorative display text
- DM Sans is the **default** for everything else — headings, body, UI controls

### 3.2 Heading Scale

| Element | Size | Weight | Line-height |
|---------|------|--------|-------------|
| `h1` | `clamp(2.25rem, 5vw, 4rem)` | 800 | 1.1 |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | 800 | 1.1 |
| `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | 800 | 1.1 |
| `h4` | `1.125rem` | 800 | 1.1 |

### 3.3 Body Text

| Property | Value |
|----------|-------|
| Base size | `16px` (1rem) |
| Line-height | `1.75` (paragraphs), `1.65` (body default) |
| Color | `--fg-muted` |
| Letter-spacing | `0` (`.tracking-tight` forces `0 !important`) |

### 3.4 Labels & Badges

| Element | Size | Weight | Transform |
|---------|------|--------|-----------|
| Form labels | `text-xs` (12px) | 600 (semibold) | `uppercase`, `tracking-wider` |
| Category badges | `10px` | 800 | `uppercase`, `letter-spacing: 0.05em` |
| Admin badge | `10px` | 700 (bold) | `uppercase` |

---

## 4. Spacing & Grid

### 4.1 Base Unit

`4px` (Tailwind default) — all spacing derives from this via Tailwind's scale (`p-1` = 4px, `p-2` = 8px, etc.)

### 4.2 Container

| Breakpoint | Max-width | Padding (horizontal) |
|------------|-----------|---------------------|
| `< 768px` | 100% | 24px |
| `>= 768px` | 100% | 32px |
| `>= 1280px` | 1280px | 48px |

### 4.3 Section Spacing

| Breakpoint | Padding (vertical) |
|------------|-------------------|
| `< 768px` | 56px |
| `>= 768px` | 72px |

### 4.4 Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet / sidebar collapse |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Container cap |

### 4.5 Border Radius Scale

| Usage | Radius |
|-------|--------|
| Buttons, inputs | `rounded-xl` (12px) |
| Cards | `rounded-xl` (12px) |
| Badges | `rounded-full` (9999px) — pill shape |
| Avatars | `rounded-full` (9999px) |
| Focus ring | `3px` |

---

## 5. Components

### 5.1 Buttons

| Variant | Background | Text | Hover | Radius |
|---------|------------|------|-------|--------|
| **Primary** | `bg-red-600` | White | `bg-red-700` | `rounded-xl` |
| **Ghost** | Transparent | `--fg` | `--dash-hover` | `rounded-xl` |
| **Active Nav** | `bg-red-600/15` | `text-red-500` | — | `rounded-xl` |

- Font: `text-xs` to `text-sm`, `font-bold`
- Padding: `px-4 py-2.5` (standard), `px-3.5 py-2` (compact)
- Transition: `transition-all`

### 5.2 Cards

```css
background: var(--dash-card);        /* rgba(255,255,255,0.045) */
border: 1px solid var(--dash-card-border);
border-radius: 12px;                 /* rounded-xl */
```

- Glass variant: `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.06)`, `border: rgba(255,255,255,0.1)`

### 5.3 Inputs

| Property | Value |
|----------|-------|
| Background | `var(--dash-input)` — `rgba(255,255,255,0.06)` |
| Border | `1px solid var(--dash-input-border)` |
| Radius | `rounded-xl` (12px) |
| Padding | `px-4 py-2.5` |
| Focus | `border-color: red-600`, no outline ring |
| Font size | `text-base` mobile, `text-sm` desktop (`md:text-sm`) |

### 5.4 Badges (Category)

```css
background: var(--badge-bg);
color: var(--accent-bright);
border: 1px solid rgba(255, 26, 26, 0.25);
border-radius: 9999px;
padding: 3px 10px;
font-weight: 800;
font-size: 10px;
text-transform: uppercase;
letter-spacing: 0.05em;
```

### 5.5 Tables (Dashboard)

| Part | Style |
|------|-------|
| Header row | `var(--dash-thead)` — `rgba(255,255,255,0.05)` |
| Row border | `var(--dash-divider)` |
| Text | `text-sm`, `--dash-fg` |

### 5.6 Alerts / Toasts

| Type | Background | Border | Text |
|------|-----------|--------|------|
| Error | `bg-red-500/10` | `border-red-500/30` | `text-red-100` |
| Success | `bg-emerald-50` / `dark:bg-emerald-950/40` | `border-emerald-200` / `dark:border-emerald-800/60` | `text-emerald-700` / `dark:text-emerald-200` |

---

## 6. Iconography

| Property | Value |
|----------|-------|
| Library | [Lucide React](https://lucide.dev) |
| Default size | `16px` (`w-4 h-4`) for inline, `20px` (`w-5 h-5`) for nav |
| Stroke width | Lucide default (2px) |
| Color | Inherits from parent `color` |

### Commonly Used Icons

| Icon | Component | Context |
|------|-----------|---------|
| `Layout` | Overview tab | Dashboard nav |
| `Newspaper` | All Articles tab | Dashboard nav |
| `PlusCircle` | Article Editor tab | Dashboard nav |
| `Users` | Subscribers tab | Dashboard nav |
| `Settings` | Ad Zones tab | Dashboard nav |
| `User` | Profile Settings | Dashboard nav |
| `UserPlus` | Team Management | Dashboard nav |
| `Building2` | Partners Manager | Dashboard nav |
| `Sun` / `Moon` | Theme toggle | Sidebar footer |
| `LogOut` | Logout | Sidebar footer |
| `Search` | Search input | Article filters |
| `Edit` / `Trash2` | Row actions | Tables |
| `Eye` | Preview / View | Article actions |
| `ChevronLeft` / `ChevronRight` | Pagination | Tables |

---

## 7. Imagery

### 7.1 Next.js Image Optimization

| Setting | Value |
|---------|-------|
| Preferred formats | AVIF then WebP (fallback) |
| Device sizes | `640`, `1200`, `1920` |
| Image sizes | `64`, `256`, `384` |

### 7.2 Avatars

| Property | Value |
|----------|-------|
| Shape | Circle (`rounded-full`) |
| Sidebar size | `36x36px` (`w-9 h-9`) |
| Profile preview | `112x112px` (`w-28 h-28`) |
| Border | `1px solid var(--dash-avatar-border)` |
| Fit | `object-cover` |
| Fallback | First letter of name, `text-3xl font-bold` |

### 7.3 Article Hero Images

| Property | Value |
|----------|-------|
| Aspect ratio | Free (responsive) |
| Fit | `object-cover` |
| Max width | Container width (1280px) |

### 7.4 Ad Creative Dimensions

| Slot Name | Size (px) | Key |
|-----------|-----------|-----|
| Leaderboard | 1024 x 409 | `LEADERBOARD` |
| Square | 1080 x 1080 | `RECTANGLE` |
| Inline Banner | 468 x 120 | `INLINE` |

### 7.5 Allowed Remote Hosts

- `images.unsplash.com`
- `plus.unsplash.com`
- `*.supabase.co` (storage path: `/storage/v1/object/public/**`)

---

## 8. Voice & Tone

### 8.1 Editorial Voice

- **Confident, not boastful** — state facts, let the story speak
- **Local-first** — always ground stories in Ogun State's context
- **Forward-looking** — emphasise what's being built, not what's lacking

### 8.2 Headline Style

- Short, punchy, present-tense where possible
- No clickbait — clarity over curiosity gaps
- Example: *"Abeokuta Startup Lands $2M Seed Round"*

### 8.3 UI Microcopy

| Context | Style |
|---------|-------|
| Empty states | Helpful, not apologetic — *"No articles yet. Create your first one."* |
| Success toasts | Past tense — *"Article updated successfully!"* |
| Error messages | What went wrong + what to do — *"Upload failed. Try a smaller file."* |
| Labels | Uppercase, terse — `FULL NAME`, `BIOGRAPHY`, `TWITTER HANDLE / LINK` |
| Placeholder text | Sentence case, example-driven — *"Tell readers about yourself..."* |

---

## 9. Motion

### 9.1 Easing Curves

| Name | Curve | Usage |
|------|-------|-------|
| Default ease | `ease` | Color transitions, opacity |
| Spring | `cubic-bezier(0.22, 1, 0.36, 1)` | Slide-up entrances |
| Linear | `linear` | Ticker scroll |

### 9.2 Duration Scale

| Token | Duration | Usage |
|-------|----------|-------|
| Fast | `0.2s` | Links, color changes |
| Normal | `0.35s` | Theme background/color transition |
| Entrance | `0.4s` | Fade-in |
| Slide | `0.5s` | Slide-up with spring |
| Ticker | `28s` | Breaking news ticker loop |

### 9.3 Animations

| Name | Keyframes | Usage |
|------|-----------|-------|
| `fadeIn` | `opacity: 0 -> 1` | Page/section entrance |
| `slideUp` | `opacity: 0, translateY(24px) -> 1, 0` | Card/content entrance |
| `ticker` | `translateX(0) -> translateX(-50%)` | Breaking news bar (pauses on hover) |

### 9.4 Interaction Patterns

- **Hover states**: All interactive elements must have visible hover feedback
- **Ticker**: Pauses on hover (`animation-play-state: paused`)
- **Tab changes**: Scroll to top (both window and main container)
- **Framer Motion**: Used for `AnimatePresence` tab transitions in the dashboard

---

## 10. Scrollbar

| Property | Value |
|----------|-------|
| Width | `10px` |
| Track | `#09090B` (always dark, both themes) |
| Thumb | `#27272A` then `#3F3F46` on hover |
| Shape | `border-radius: 9999px` with `2.5px` contrast border |
| Firefox | `scrollbar-color: #27272A #09090B` |

---

## 11. Focus & Accessibility

| Property | Value |
|----------|-------|
| Focus ring | `2px solid var(--accent)`, `offset: 3px`, `radius: 3px` |
| Text selection | `background: var(--accent)`, `color: #FFFFFF` |
| Text smoothing | `-webkit-font-smoothing: antialiased` |
| HTML lang | `en` |

---

## 12. Decorative Elements

| Element | Style |
|---------|-------|
| **Dot grid** | `radial-gradient(circle, rgba(232, 0, 15, 0.18) 1px, transparent 1px)`, `32x32px` repeat |
| **Gradient text** | `linear-gradient(135deg, var(--accent) 0%, #9B0008 100%)` with `-webkit-background-clip: text` |
| **Divider** | `1px solid var(--border)`, full width |
| **Glass** | `backdrop-filter: blur(12px)`, `rgba(255,255,255,0.06)` fill, `rgba(255,255,255,0.1)` border |

---

*This guide is the single source of truth for all TRAX design decisions. All new pages, components, and features must reference these tokens and patterns.*
