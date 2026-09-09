# JREE — Design & Brand Reference (Single Source of Truth)

This file is a **complete, standalone design brief**. Hand it to any AI agent or tool and it
has everything needed to design or build JREE screens on-brand, without importing anything else.

It covers: what JREE is, the brand voice, the exact color tokens, fonts, typography scale,
spacing/layout system, component patterns (copy-paste ready), motion language, page structure,
and the hard rules that must never be broken.

---

## 1. What JREE Is

**JREE** is a student-facing, AI-powered **job-readiness assessment platform** built by
**EduBridge** (a 17-year-old edtech company, 50,000+ graduates served).

- A student takes a **~110-minute exam**: ~90 min written + ~20 min AI video interview with an
  AI interviewer named **"Priya"** (other AI interviewers: Arjun, Meera, Rohan).
- They receive a standardised **0–100 score** plus a **Band (A–D)**, a **national rank**, a
  layer-by-layer breakdown, and role-readiness verdicts for 8 common entry-level roles.
- The score is **locked at submission** and **QR-verified** on a shareable certificate.
- **Students always use it free.** Colleges and employers pay for access.

**Three audiences:**
1. **Students** — prove readiness before the interview.
2. **Colleges** — benchmark whole batches, get a real-time placement dashboard.
3. **Employers** — access a pre-screened talent pool (Band A/B students surface in search).

**Score bands:** A = 75–100 · B = 55–74 · C = 35–54 · D = 0–34.

**Key facts / stats to use (NASSCOM 2024):**
- **8 million** graduates enter India's workforce per year.
- **60%** are considered unemployable by Indian employers.
- **40,000+** institutions in India, with no shared readiness yardstick.
- EduBridge: **17 years**, **50,000+** graduates served.

---

## 2. Brand Voice & Content Rules

1. **Calm, editorial, institutional** — never exclamation-mark hype. No "!" in body copy.
2. **Never use pure red** (`#FF0000`). Error/danger is the soft `--danger` token only.
3. **Frame gaps as positions to move up, never verdicts:** "Band C → move to B", never "you failed".
   Score bands and gap maps are "where to focus," never a judgement of a person.
4. **"JREE" is always uppercase** — never "Jree" or "jree".
5. **EduBridge** is the parent company (17 years old).
6. **Priya** is the primary AI interviewer.
7. **Cut text aggressively.** If a claim can be shown as a number, comparison, mini-chart, or
   badge instead of a sentence, it must be. Paragraphs are the failure mode. Text on the page
   should mostly function as **labels and headlines**. Prefer one short line over three sentences.
8. Numbers, ranks, and comparisons do the persuading — not adjectives.

---

## 3. Fonts — TWO FONTS ONLY

Load via Google Fonts (already imported in `src/styles/fonts.css`):

```
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,500&display=swap');
```

| Token | Font | Used for |
|-------|------|----------|
| `--font-display` | **Bricolage Grotesque** (400/500/700/800) | All headings, score numbers, CTAs, big counters, labels |
| `--font-body` | **DM Sans** (400/500/600/700) | Body copy, paragraphs |
| `--font-serif` | **DM Sans italic** (400/500) | Editorial quotes, subtitle accents, italic accent words in headings |
| `--font-mono` | **DM Sans** (500/600, uppercase) | Eyebrows, labels, captions, IDs, tags, pills |

> There is **no monospace font and no serif font**. `--font-serif` and `--font-mono` both resolve
> to DM Sans; "mono" just means the uppercase-tracked label style, "serif" means italic DM Sans.
> **Never add Geist Mono, Instrument Serif, or any third font.**

---

## 4. Color Tokens (EXACT VALUES)

The live theme is a **warm-cream light theme**. These are the real values from
`src/styles/fonts.css` (`:root`). Always reference tokens via `var(--token)`, never hardcode hex.

### Backgrounds
```
--bg:   #FAF7F0   /* page base — warm cream */
--bg-2: #F4F0E6   /* alternate sections */
--bg-3: #EFEAE0   /* darkest cream */
```

### Surfaces (cards) — all white
```
--surface-1: #FFFFFF
--surface-2: #FFFFFF
--surface-3: #FFFFFF
```

### Brand accents
```
--violet:      #5E4A9E   /* primary accent — borders, labels, glows, primary button */
--violet-light:#9C8AC9
--violet-soft: rgba(94,74,158,.10)
--violet-border: rgba(94,74,158,.30)
--violet-border-hover: rgba(94,74,158,.50)

--lime:      #C9DC53   /* electric lime — CTAs, highlights, Band A fill */
--lime-text: #6E7B1F   /* accessible lime for TEXT on cream (use this for lime words/labels) */
--lime-soft: rgba(201,220,83,.20)
--lime-border: rgba(110,123,31,.30)

--teal:      #51C1B5   /* third accent — dots, glows */
--teal-text: #1F7A6F   /* accessible teal for TEXT (VERIFIED status) */
--teal-soft: rgba(81,193,181,.16)
--teal-border: rgba(31,122,111,.36)

--amber:      #D97706   /* warning/focus */
--amber-text: #B45309   /* accessible amber for TEXT */
--amber-soft: rgba(217,119,6,.12)
--amber-border: rgba(180,83,9,.36)
```

### Text
```
--text-1: #1A1525   /* primary */
--text-2: #312B3D   /* secondary */
--text-3: #4D465C   /* muted / tertiary / captions */
```

### "On-color" text (for text sitting on a filled accent)
```
--on-lime:   #1A1525   /* dark text on lime button */
--on-violet: #FFFFFF   /* white text on violet button */
--on-teal:   #0B0F0E
```

### Semantic & lines
```
--danger:  #B45309   /* error, recording indicator — NEVER pure red */
--slate:   #64748B
--hairline:        rgba(26,21,37,.08)   /* subtle dividers */
--hairline-strong: rgba(26,21,37,.14)   /* borders */
```

### Shadows
```
--shadow-card:     0 1px 3px rgba(47,36,23,.07), 0 4px 12px rgba(47,36,23,.06)
--shadow-elevated: 0 2px 6px rgba(47,36,23,.09), 0 8px 24px rgba(47,36,23,.08)
--shadow-highest:  0 4px 12px rgba(47,36,23,.10), 0 16px 40px rgba(47,36,23,.10)
```

### Tailwind theme contract (in `src/styles/theme.css`) — DO NOT break
`bg-background`, `text-foreground`, `border-border` etc. must keep compiling. Key mappings:
`--background:#FAF7F0` · `--foreground:#1A1525` · `--card:#FFFFFF` · `--primary:#5E4A9E`
(violet) · `--primary-foreground:#FFFFFF` · `--border:rgba(26,21,37,.14)` · `--radius:0.625rem`.
Preserve the `@theme inline` block and all token names — only change values.

### Color usage rules
- **Text in an accent color on cream → use the `-text` variant** (`--lime-text`, `--teal-text`,
  `--amber-text`). The base `--lime`/`--teal` are for **fills** (buttons, dots, bars), not text.
- **Primary CTA:** filled `--violet` with `--on-violet` text (or filled `--lime` with `--on-lime`).
- **Never use pure red.**

---

## 5. Typography Scale

| Role | Font | Weight | Size (clamp) | Line height | Tracking |
|------|------|--------|--------------|-------------|----------|
| Hero H1 | Bricolage | 800 | `clamp(40px,6.4vw,68px)` | 1.02 | `-0.04em` |
| Section H2 | Bricolage | 800 | `clamp(28px,4vw,44px)` (up to `clamp(32px,6vw,56px)`) | 1.04–1.06 | `-0.03em` |
| Card / Step H3 | Bricolage | 700 | `clamp(22px,2.8vw,30px)` | 1.15 | `-0.025em` |
| Score display | Bricolage | 800 | 72–132px | 0.85–0.9 | `-0.04em` |
| Large counter | Bricolage | 800 | `clamp(40px,6vw,60px)` | 0.95 | `-0.04em` |
| Editorial quote | DM Sans italic | 400 | `clamp(22px,3vw,34px)` | 1.3–1.4 | `-0.02em` |
| Subtitle italic | DM Sans italic | 400 | `clamp(17px,2vw,24px)` | 1.4 | — |
| Body XL / PROSE | DM Sans | 400 | `clamp(16px,1.8vw,18px)` | 1.72 | 0 |
| Body | DM Sans | 400 | 15px | 1.6–1.7 | 0 |
| Body SM | DM Sans | 400 | 13–13.5px | 1.5 | 0 |
| Eyebrow / label | DM Sans | 500/600 | 11px | 1.0 | `0.07em` UPPERCASE |
| Caption / ID / tag | DM Sans | 500 | 9–11px | 1.0 | `0.04–0.07em` UPPERCASE |

**Letter-spacing rules (DM Sans is proportional — never over-track):**
- Eyebrow/label uppercase: `0.07em`
- Inline pill/tag: `0.05em`
- Caption/ID: `0.02–0.04em`
- Body: `0`
- Display headings: `-0.03em` to `-0.04em` (negative)
- **Never exceed `0.08em`.**

**Signature heading move:** one word set in italic serif accent, usually `--lime-text`:
```tsx
<h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(28px,4vw,44px)", color:"var(--text-1)", letterSpacing:"-0.03em", lineHeight:1.04 }}>
  A complete placement{" "}
  <span style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", fontWeight:400, color:"var(--lime-text)" }}>intelligence</span>{" "}
  system.
</h2>
```

---

## 6. Layout & Spacing System

**Shared constants (use these exactly, never invent new ones):**
```ts
const SECTION   = "py-12 md:py-28";  // vertical section padding
const CONTAINER = "max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px]";
```
Sub-pages (like the Colleges deep-dive) use a slightly narrower `max-w-[1080px] mx-auto px-5 sm:px-8`.

- **Radii:** cards `rounded-[14px]`–`rounded-[20px]`; big feature panels `rounded-[24px]`;
  pills/buttons `rounded-full`.
- **Card gap in grids:** `gap-4`.
- **Section rhythm:** separate major blocks with a thin rule
  `<div className="my-16 md:my-24 h-px" style={{ background:"var(--hairline-strong)" }} />`.
- **CTAs on mobile:** always `w-full sm:w-auto` for tap targets.

---

## 7. Component Patterns (copy-paste ready)

**Eyebrow / section label**
```tsx
<span style={{ fontFamily:"var(--font-mono)", fontWeight:500, fontSize:11, letterSpacing:"0.07em", color:"var(--violet)", textTransform:"uppercase" }}>
  For Colleges
</span>
```

**Standard card (with grain texture)**
```tsx
<div className="grain rounded-[16px] p-6" style={{ background:"var(--surface-1)", border:"1px solid var(--hairline-strong)", boxShadow:"var(--shadow-card)" }}>
```
> The `.grain` class adds a subtle noise texture (defined in fonts.css). Use on cards/panels.

**Primary CTA — lime**
```tsx
<a href="#..." className="group inline-flex items-center gap-2 rounded-full transition-transform active:scale-[0.98] hover:brightness-[1.04]"
   style={{ height:54, padding:"0 28px", background:"var(--lime)", color:"var(--on-lime)", fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, letterSpacing:"-0.01em", boxShadow:"0 8px 32px rgba(201,220,83,0.25)", textDecoration:"none" }}>
  Register Free <span className="transition-transform group-hover:translate-x-1">→</span>
</a>
```

**Primary CTA — violet** (swap `background:"var(--violet)"`, `color:"var(--on-violet)"`, `boxShadow:"var(--shadow-card)"`).

**Ghost / outline CTA**
```tsx
<a className="group inline-flex items-center gap-2 rounded-full transition-colors"
   style={{ height:48, padding:"0 24px", background:"transparent", border:"1px solid var(--hairline-strong)", color:"var(--text-1)", fontFamily:"var(--font-display)", fontWeight:600, fontSize:15, textDecoration:"none" }}>
  See a sample report <span className="transition-transform group-hover:translate-x-1">→</span>
</a>
```

**Status pills**
```tsx
{/* VERIFIED — teal */}
<div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background:"color-mix(in srgb, var(--teal-text) 12%, transparent)", border:"1px solid color-mix(in srgb, var(--teal-text) 30%, transparent)" }}>
  <span className="rounded-full" style={{ width:5, height:5, background:"var(--teal-text)" }} />
  <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"var(--teal-text)", letterSpacing:"0.07em", textTransform:"uppercase" }}>Verified</span>
</div>
{/* LIVE — lime, pulsing dot (see Motion). REC — danger, pulsing dot. */}
```

**Band badges**
- Band A: `background:"var(--lime)"`, text `"var(--bg)"`, bold.
- Band B: teal-soft bg + `--teal-text`.
- Band C: violet-soft bg + `--violet`.
- Band D: `rgba(26,21,37,.06)` bg + `--text-3`.

**Gradient divider**
```tsx
<div className="h-px" style={{ background:"linear-gradient(to right, transparent, var(--violet-border), transparent)" }} />
```

**Accent glow (ambient blob behind panels)**
```tsx
<div className="absolute -top-24 -right-16 pointer-events-none" style={{ width:320, height:320, background:"radial-gradient(circle, rgba(201,220,83,0.14), transparent 70%)" }} />
```

---

## 8. Motion Language

Use **`motion` from `motion/react`** (never `framer-motion`). Standard easing everywhere:
```ts
const ease = [0.16, 1, 0.3, 1] as const;
```

- **Scroll entrances:** `initial={{opacity:0, y:20-30}}` → `whileInView={{opacity:1, y:0}}`,
  `viewport={{once:true, margin:"-60px"}}`, `transition={{duration:0.5-0.7, ease}}`.
- **Stagger** lists/grids with `delay: i * 0.06–0.1`.
- **Hover lift** on cards: `whileHover={{ y:-4 }}`; icons `group-hover:scale-110`;
  animated top-accent bar `origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`.
- **Count-up numbers** on view (eased cubic-out over ~1.5s).
- **Data reveals:** bars animate `height 0→pct`; ring/donut animates SVG `pathLength 0→n`;
  meters animate `width 0→pct`.
- **Pulsing status dot:** `animate={{opacity:[1,0.3,1]}} transition={{duration:1.6, repeat:Infinity, ease:"easeInOut"}}`.
- Prefer **showing data animating in** (dots filling, bars growing, rings drawing) over decorative motion.

**Signature visual devices already in use** (reuse the spirit):
- **Dot-density comparison** — two equal-width tracks of small squares; lit vs dim cells make a
  gap visible without words.
- **Product "console" mock** — window chrome (3 dots + mono label + pulsing LIVE pill), then an
  animated rank ring + animated band-distribution bars.
- **Credential card** — score / Band badge / national rank / mini QR / VERIFIED pill.
- **Animated stat tiles** — big count-up number + short label + one micro-line.

---

## 9. Tech Stack & File Rules

- **React + TypeScript, `.tsx` only** — never `.html`, `.js`, `.jsx`.
- **Tailwind CSS v4** (no `tailwind.config.js`). Style with Tailwind classes + inline `style` for
  token colors/fonts. **Avoid inline styles only when a utility class works cleanly.**
- **Do not add a CSS reset** — Tailwind's base reset is already present; an unlayered reset breaks utilities.
- Motion: `import { motion } from "motion/react"`. Import `AnimatePresence`/`useScroll`/`useTransform`
  from `motion/react` if needed (not from `motion`).
- Icons: `lucide-react` (import only the icons you use).
- Entrypoint: **`src/app/App.tsx`** (default export). New components: `src/app/components/ComponentName.tsx`.
- Font imports live **only** in `src/styles/fonts.css`. Design tokens live in `fonts.css` +
  `theme.css`. Keep the token contract intact.
- Package manager: **pnpm** (never npm). Vite dev server runs already — never run `vite build`.

---

## 10. Site Structure

**Hash-based routing in `App.tsx`:**

| Hash | Screen |
|------|--------|
| (empty) | Landing page |
| `#signup` | Onboarding (multi-step signup) |
| `#dashboard` | Post-signup dashboard |
| `#exam/tutorial` | 7-step guided walkthrough (Buddy mascot) |
| `#exam/check` `#exam/active` `#exam/transition` `#exam/priya` `#exam/processing` | Exam flow |
| `#results` | Results |
| `#styleguide` | Design-system reference page |
| deep-dive pages | For Students / For Colleges / For Employers / About |

**Landing page sections, in order:**
1. **Nav** — sticky frosted-glass, logo, 5 links, theme toggle, Login + Register CTA, mobile drawer.
2. **Hero** — "Know Your Job Readiness / Before the Interview", score card, live ticker, 2 CTAs.
3. **StakeholderCards ("The Handoff")** — 3 panels: Students / Colleges / Employers.
4. **WhoFor** — "One number, three ways it works."
5. **HowItWorks** — journey/lifecycle trace.
6. **MeetPriya** — AI interviewer studio.
7. **Stats** — big counters (8M, 60%, one score).
8. **Testimonials** — 3 quote cards.
9. **Bands** — "Why JREE is Different" — alternating rows.
10. **FAQ** — accordion.
11. **FinalCTA** — huge "START." + pulsing register button.
12. **Footer** — 4-column links + Style Guide button + copyright.

**Nav links:** How It Works · For Students · For Colleges · For Employers · About Us.

**Deep-dive page pattern (e.g. For Colleges):** slim back-nav → hero → problem/gap section →
how-it-works timeline → "intelligence system" (console mock + capability grid + CTA) → "for
students" (credential card + short benefits) → pricing/callback form. Each block separated by a
thin rule, each animated on scroll, each ending in (or building toward) a clear CTA. Keep copy to
labels, headlines, numbers, and one-line phrases.

---

## 11. Hard Rules (never break)

- `.tsx` files only · `pnpm` only · main file `src/app/App.tsx` (default export).
- New components in `src/app/components/`. Font imports only in `src/styles/fonts.css`.
- **Two fonts only:** Bricolage Grotesque + DM Sans. No third font, ever.
- Section padding `py-12 md:py-28`; container `max-w-[1160px] … lg:px-[72px]`.
- **No pure red.** Danger = `--danger` (`#B45309`).
- CTA buttons on mobile: `w-full sm:w-auto`.
- All scores framed as "positions to move up," never pass/fail.
- Tone: calm, institutional, editorial — no exclamation marks in body copy.
- "JREE" always uppercase. Reference colors via `var(--token)`, use `-text` variants for accent text.
- Cut text: prefer numbers, charts, badges, and one-line phrases over paragraphs.
- Preserve the Tailwind token contract (`--background`, `--foreground`, `--border`, `@theme inline`).
