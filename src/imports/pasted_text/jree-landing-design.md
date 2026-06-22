═══════════════════════════════════════════════════════════
JREE LANDING PAGE — "PROOF OF WORK"
Creative Direction: Bloomberg Terminal × Supreme Drop
═══════════════════════════════════════════════════════════

This is not a typical EdTech landing page. JREE is a credential — 
a proof of readiness. Every design decision must feel like it was 
made by a 26-year-old who has worked at Linear and Zepto and now 
cares deeply about Indian graduates getting hired. Premium. Precise. 
Alive. Never corporate. Never cheerful startup.

═══════════════════════════════════════════════════════════
01. DESIGN TOKENS — COMMIT FULLY, NO DEVIATION
═══════════════════════════════════════════════════════════

── COLORS ──────────────────────────────────────────────

Background base:    #0B090F  (warm near-black, subtle violet undertone)
Surface L1 (cards): #131018  (slightly lighter, cards sit here)
Surface L2 (hover): #1D1826  (active, selected, focused states)
Surface L3 (input): #241F30  (form inputs, deep fields)

Primary violet:     #7C3AED  (brighter than brand brief for dark-bg legibility)
Violet soft:        rgba(124,58,237,0.15) (tinted fills, borders)
Violet glow:        rgba(124,58,237,0.25) (shadows on violet elements)

Electric lime:      #C8FE5A  (THE SIGNATURE COLOR — one unexpected accent)
Lime soft:          rgba(200,254,90,0.12) (lime-tinted surfaces)
Lime text:          #A8E040  (lime on dark, slightly desaturated for readability)

Text primary:       #F0EBFF  (warm lavender-white, not harsh #FFFFFF)
Text secondary:     #8A8299  (muted, secondary labels)
Text tertiary:      #4F4866  (ghost text, hints, placeholders)

Success (verify):   #2DD4BF  (teal, ONLY for success states — OTP verified, valid)
Danger:             #F87171

Border default:     rgba(124,58,237,0.18)  (violet-tinted, 1px)
Border hover:       rgba(124,58,237,0.35)  (1px, on hover)
Border lime:        rgba(200,254,90,0.30)  (for lime-adjacent elements)

── FONTS ────────────────────────────────────────────────

Display (headings H1, H2, big labels):
  Bricolage Grotesque — weight 800, 48pt Condensed variant preferred
  Letter-spacing: -0.04em at large sizes, -0.02em at medium
  Import from Google Fonts: https://fonts.google.com/specimen/Bricolage+Grotesque

Serif accent (italic decoration, one word per headline, pull quotes):
  Instrument Serif — italic only, weight 400
  Import from Google Fonts: https://fonts.google.com/specimen/Instrument+Serif
  This font appears in exactly ONE word per section headline, in italic.
  e.g.: "One exam. One score. *Everything* changes." — "Everything" in Instrument Serif italic

Monospace (ALL numbers, scores, stats, OTP, timers, percentiles):
  Geist Mono — weight 500/700
  Import from: https://fonts.google.com/specimen/Geist+Mono
  Every number on the page uses this font. No exceptions.

Body (paragraphs, descriptions, labels under 18px):
  DM Sans — weight 400/500
  Import from Google Fonts

── GEOMETRY ─────────────────────────────────────────────

Base border-radius: 14px for cards, 10px for inputs, 100px for pills
Grid gap: 16px (tight, information-dense bento aesthetic)
Section padding: 120px vertical desktop, 72px mobile
Max content width: 1160px, centered
Horizontal padding: 72px desktop, 20px mobile

── SURFACE TEXTURE ──────────────────────────────────────

On ALL dark surface cards: apply a CSS noise grain texture using SVG filter.
Use this as a pseudo-element on cards:
filter: url("data:image/svg+xml,...grain...") — produces 3% film grain.
This single texture is what separates "premium dark UI" from "basic dark UI."
Every card should feel like it has a micro-texture.

── SHADOWS ───────────────────────────────────────────────

Cards: box-shadow 0 1px 0 rgba(255,255,255,0.04) inset (top edge highlight)
       + 0 24px 48px rgba(0,0,0,0.4)
Violet elements: box-shadow 0 8px 32px rgba(124,58,237,0.30)
Lime CTA button: box-shadow 0 8px 32px rgba(200,254,90,0.25)


═══════════════════════════════════════════════════════════
02. NAVIGATION — RESTRAINT IS LUXURY
═══════════════════════════════════════════════════════════

Full-width, fixed top, z-index 100.
Height: 60px desktop, 54px mobile.
Background: rgba(11,9,15,0.75) + backdrop-filter blur(24px) saturate(1.5)
Border-bottom: 1px solid rgba(124,58,237,0.12)

LEFT — Wordmark only:
  Text: "JREE" in Bricolage Grotesque ExtraBold 20px, color #F0EBFF.
  After the "E": a small circle ● in electric lime #C8FE5A, 6px diameter, 
  positioned as superscript. This dot is the only lime element in the nav.
  Below wordmark: "by EduBridge" in DM Sans 10px, color #4F4866. 
  Vertical offset -2px, line-height tight.

CENTER — Nothing. No nav links. The restraint is intentional. 
  Luxury brands do not need a navigation bar full of links. 
  The hero section handles orientation.

RIGHT — Single button:
  "Take the exam →" — pill shape (border-radius 100px)
  Height 36px, padding 0 18px
  Background: #7C3AED (violet, NOT lime — lime is reserved for the hero CTA only)
  Text: DM Sans 500, 13px, #F0EBFF
  Border: none
  Hover: background lightens to #8B5CF6, box-shadow 0 4px 20px rgba(124,58,237,0.35)
  Active: scale(0.97)
  Transition: all 180ms cubic-bezier(0.16,1,0.3,1)

SCROLL BEHAVIOR: Nav appears only when user scrolls 60px down.
  Entry: slides down from translateY(-100%) → 0, opacity 0→1, 300ms spring.
  At page top: nav is invisible, giving the hero a clean full-screen feel.

MOBILE: Same minimal nav. Hamburger icon (2 lines, not 3 — premium shorthand).
  Open: full-screen takeover, bg #0B090F, single CTA centered, large.


═══════════════════════════════════════════════════════════
03. HERO — FULL-SCREEN TYPOGRAPHIC POSTER
═══════════════════════════════════════════════════════════

THIS SECTION IS THE MANIFESTO. No illustrations. No stock photos.
Pure type. Pure attitude. The type IS the design.

Background: #0B090F, full viewport height (100vh)

── BACKGROUND LAYER (ghost elements): ──────────────────

1. Ghost number "78" — Bricolage Grotesque ExtraBold, 480px size, 
   positioned right-center, color #F0EBFF at 3.5% opacity.
   This is a score. It's enormous. It bleeds off the right edge.
   It is NOT labeled. Visitors intuitively understand.
   Do NOT animate it — it's static, like a watermark.

2. Radial gradient:
   Center-left: radial, #7C3AED at 0% opacity 20%, transparent at 65%.
   Size: 800px × 600px, positioned at 15% left, 50% top.
   This creates a violet glow blooming from behind the text.

3. Fine dot grid: 1px dots, 28px spacing, color #F0EBFF at 2.5% opacity.
   Covers the full section. Creates depth without noise.

── CONTENT LAYER (foreground): ─────────────────────────

Positioned: left-aligned, max-width 780px, 
vertically centered at 45% from top (slightly above center).
Left margin: 72px desktop, 20px mobile.

LABEL ROW (above headline):
  Small pill: border 1px solid rgba(200,254,90,0.3), border-radius 100px,
  padding 5px 12px, background rgba(200,254,90,0.06)
  Content: lime dot 5px ● + "India's first national job readiness exam"
  Font: DM Sans 400, 12px, color #A8E040
  Entry: fade in + slide up 20px, 400ms, delay 0ms

HEADLINE STACK — 3 lines, close line-height (1.0):

  Line 1: "Your degree" 
  Font: Bricolage Grotesque ExtraBold Condensed, 96px desktop/52px mobile
  Color: #F0EBFF
  Letter-spacing: -0.04em

  Line 2: "proves"  [SPACE]  "*nothing.*"
  — "proves" : same font, same size, same color
  — "*nothing.*" : Instrument Serif italic, same 96px size, color #7C3AED (violet)
  — The word contrast here IS the design. Sans vs serif. White vs violet.
  — Add a very subtle underline under "nothing." — 1px violet, offset 4px

  Line 3: "Your JREE score does." 
  Font: DM Sans 500, 22px, color #8A8299
  Letter-spacing: 0
  Margin-top: 16px

HEADLINE ANIMATION:
  Line 1: characters appear via clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
  Easing: cubic-bezier(0.16,1,0.3,1), duration 700ms, delay 200ms.
  Line 2: same, delay 350ms
  Line 3: fade in, delay 600ms
  (Text reveal from right → left, like a knife cut)

SUBTEXT (below headline stack, margin-top 28px):
  "60% of India's 8 million annual graduates are considered unemployable —
  not because they lack skills, but because no proof exists. JREE is that proof."
  Font: DM Sans 400, 17px, color #8A8299, line-height 1.65, max-width 480px
  Entry: fade in, delay 800ms

CTA ROW (margin-top 40px, flex, gap 14px):

  PRIMARY BUTTON — "Get your free score →"
    Height: 52px, padding: 0 28px, border-radius: 100px
    Background: #C8FE5A (ELECTRIC LIME — this is its ONLY appearance as a bg color)
    Text: Bricolage Grotesque Bold 15px, color #0B090F (black on lime)
    Box-shadow: 0 8px 32px rgba(200,254,90,0.25)
    Hover: background #D4FF6B, box-shadow 0 12px 40px rgba(200,254,90,0.35), 
           scale(1.03), transition 200ms spring
    Active: scale(0.97)
    — This button should look like no other button on the page.

  GHOST BUTTON — "Watch how it works  ▷  2 min"
    Height: 52px, padding: 0 24px, border-radius: 100px
    Background: transparent
    Border: 1px solid rgba(240,235,255,0.15)
    Text: DM Sans 400, 14px, color #8A8299
    Hover: border-color rgba(240,235,255,0.3), color #F0EBFF

TRUST LINE (below buttons, margin-top 16px):
  "Free · No app download · Score in 90 mins · Results instant"
  Font: DM Sans 400, 12px, color #4F4866
  Items separated by  ·  in violet #7C3AED
  Entry: fade in, delay 1100ms

── BOTTOM ANCHOR BAR ────────────────────────────────────

Positioned: absolute bottom 0, full width of section.
Height: 52px.
Background: rgba(124,58,237,0.08)
Border-top: 1px solid rgba(124,58,237,0.18)
Content: horizontally scrolling live stats ticker (subtle, understated)

Items in DM Sans 400, 13px, color #8A8299:
  ⬤ LIVE   12,400 scores this month   ·   91st percentile avg Band A   ·
  240+ colleges onboarded   ·   Priya has asked 62,000 questions   ·
  Last score: Ananya M. · Band B · 74 · 3 mins ago

The ⬤ LIVE dot is lime green, pulse animation: scale 1→1.6, opacity 1→0, 
1.8s infinite.

MOBILE HERO:
  Ghost "78" scales to 220px, repositions to bottom-right.
  Headline reduces: Line 1+2 at 44px, Line 3 at 16px.
  CTA buttons stack vertically, full width.
  Trust line wraps to 2 rows.


═══════════════════════════════════════════════════════════
04. BENTO SECTION — "WHO USES JREE?"
═══════════════════════════════════════════════════════════

Background: #0B090F (continuous with hero, NO section break color change)
A thin 1px horizontal divider separates from hero: 
  linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent)

Section eyebrow (centered, above bento):
  "THE ECOSYSTEM" — Geist Mono 500, 11px, letter-spacing 0.14em, 
  color #7C3AED, uppercase
  Below: "One exam. Three *winners.*" — 
    "One exam. Three" in Bricolage Grotesque ExtraBold 56px, #F0EBFF
    "winners." in Instrument Serif italic 56px, #C8FE5A
  Margin-bottom 56px from bento grid.

BENTO GRID — 12-column underlying grid, 16px gap:

CELL 1 — STUDENT (spans 7 of 12 columns, full row height 360px):
  Background: #131018
  Border: 1px solid rgba(124,58,237,0.18)
  Border-radius: 14px
  Grain texture applied (see surface texture above)
  
  Top-left: emoji "👨‍🎓" in a 48px square with violet bg surface
  Below emoji: "Student" — Bricolage Grotesque ExtraBold 44px, #F0EBFF
  Tagline: "Your proof of readiness." — Instrument Serif italic 20px, #8A8299
  
  3 benefit lines (DM Sans 14px, color #8A8299, margin-top 24px):
  Each line starts with → in lime #C8FE5A:
    → A verified score + certificate, shareable on LinkedIn and WhatsApp
    → Your exact percentile vs 8 million other graduates
    → Know which roles you're actually ready for
  
  Bottom-right corner: a mini score ring preview component (80px diameter)
    Ring: violet-to-lime gradient arc at 78%
    Center: "78" in Geist Mono 700 20px, white
    Below ring: "Band A" — lime, 10px
  
  Hover: border-color rgba(124,58,237,0.4), 
         box-shadow 0 0 0 1px rgba(124,58,237,0.2) inside,
         transition 250ms

CELL 2 — COLLEGE (spans 5 of 12 columns, top half, height 172px):
  Background: rgba(200,254,90,0.05)
  Border: 1px solid rgba(200,254,90,0.18)
  Border-radius: 14px
  
  Top: emoji "🏫" small + "College" Bricolage Grotesque Bold 28px, #F0EBFF
  Below: "Finally know if your curriculum works." — DM Sans 400, 13px, #8A8299
  Bottom: "Batch analytics · NAAC export · National benchmark" 
          DM Sans 400, 12px, #A8E040 (lime text)
  
  Hover: border-color rgba(200,254,90,0.4)

CELL 3 — EMPLOYER (spans 5 of 12 columns, bottom half, height 172px):
  Background: #131018
  Border: 1px solid rgba(124,58,237,0.18)
  Border-radius: 14px
  
  Top: emoji "🏢" + "Employer" Bricolage Grotesque Bold 28px, #F0EBFF
  Below: "Skip the CV pile. Hire by proof." — DM Sans 400, 13px, #8A8299
  Bottom badge row: 
    "OFAC verified" · "GLEIF checked" — Geist Mono 11px, #7C3AED
  
  Hover: border-color rgba(124,58,237,0.4)

MOBILE bento: Cell 1 full width, Cell 2+3 stacked full width below it.

Bento scroll animation: Each cell slides up from 32px, fades in.
Cell 1: delay 0ms. Cell 2: delay 100ms. Cell 3: delay 200ms.


═══════════════════════════════════════════════════════════
05. HOW IT WORKS — OVERSIZED NUMBERED STEPS
═══════════════════════════════════════════════════════════

Background: #0F0C16 (slightly different from base — just perceptible warmth)

Section eyebrow: "THE JOURNEY" — same eyebrow treatment as before, Geist Mono.
Heading: "Six steps to *hired.*"
  — "Six steps to" Bricolage Grotesque ExtraBold 56px, white
  — "hired." Instrument Serif italic 56px, #C8FE5A (lime)

LAYOUT: Vertical. Left column (20%): giant step numbers. 
Right column (80%): step content.
Each step row height: ~160px. Total 6 rows.

Left column numbers:
  "01" "02" "03" "04" "05" "06"
  Geist Mono 700, 120px, color #F0EBFF at 8% opacity
  These are ghost numbers, purely decorative-structural.
  As user scrolls to each step, the active step's number animates:
    opacity 8% → 22%, scale(0.95) → scale(1.0), 400ms spring.
  This creates a subtle "you are here" indicator without being obvious.

Right column content (per step):
  Step label: Geist Mono 500 11px, #7C3AED, letter-spacing 0.1em, uppercase
  Step title: Bricolage Grotesque Bold 32px, #F0EBFF
  Step body: DM Sans 400 16px, #8A8299, line-height 1.6, max-width 540px
  Step micro-detail: DM Sans 400 13px, #4F4866 (ghost hint text)

  A horizontal 1px line (rgba(124,58,237,0.12)) separates each step.
  
  Step 1: REGISTER
    Label: "STEP 01 · 60 SECONDS"
    Title: "You're one OTP away."
    Body: "Name, email, college, and a quick OTP. No app. No payment. 
    No reason not to start."
    Micro: "Mobile-first. Works on any phone. Takes 45 seconds."
    Right-side chip: small pill "#REGISTER" in violet bg, Geist Mono 11px
    
  Step 2: EXAM (5 LAYERS)
    Label: "STEP 02 · 90 MINUTES"
    Title: "Five layers. One picture."
    Body: "Aptitude · English · Domain · Situational Judgement · and the 
    part no campus test ever had — an AI video interview. 
    Distraction-free dark UI. Auto-saves every 30 seconds."
    Micro: "You can pause once. Resume within 24 hours."
    Chip: "#90MIN" lime bg, black text
    
  Step 3: AI INTERVIEW WITH PRIYA
    Label: "STEP 03 · 15 MINUTES · THE GOOD PART"
    Title: "Meet Priya. She's ready for you."
    Body: "Five structured questions. Video responses. AI-scored on content, 
    clarity, and composure — not your accent, not your appearance."
    Micro: "No human reviewer. No bias. Your score is yours."
    Chip: "★ UNIQUE TO JREE" violet outlined
    Accent: A small 1px left border in lime on this step's content column.
    
  Step 4: SCORE + BAND
    Label: "STEP 04 · INSTANT"
    Title: "A number that means something."
    Body: "0–100 score. Band A through D. Your exact national percentile 
    among 8 million graduates. Layer-by-layer breakdown."
    Micro: "Employers understand Band A in under 3 seconds."
    Chip: "#SCORED" lime bg
    
  Step 5: CERTIFICATE
    Label: "STEP 05 · PDF + QR"
    Title: "Proof in your pocket."
    Body: "A PDF certificate with a QR code. Drop it below your name on 
    LinkedIn. Share it on WhatsApp. Any employer can verify in 5 seconds."
    Chip: "VERIFIED" with ✓ in teal
    
  Step 6: GET HIRED
    Label: "STEP 06 · THE POINT OF ALL OF IT"
    Title: "Now you're findable."
    Body: "Employers on JREE search candidates by role fit, score, domain, 
    and location. Your score is your first impression — and it's a strong one."
    Chip: "#HIRED" filled lime

Step scroll animation: Content slides in from right (40px → 0), fades in, 
as that row enters the viewport. Number animates (opacity increase).

Mobile: Left column numbers reduce to 64px, positioned above each step block.


═══════════════════════════════════════════════════════════
06. MEET PRIYA — CINEMA SECTION
═══════════════════════════════════════════════════════════

THIS IS THE CINEMATIC MOMENT. Full-width. Tall. Atmospheric.
Background: #080610 (darkest section on the page)

BACKGROUND LAYER:
  "PRIYA" — Bricolage Grotesque ExtraBold, massive, ~500px tall, 
  fills the full section width. Color: #F0EBFF at 5% opacity.
  Position: centered, bleeds top and bottom.
  This is not a heading — it's a background element.
  
  Behind the text: a single large radial gradient, 
  centered, violet #7C3AED, radius 600px, opacity 18%.
  Creates the feeling of a spotlight in a dark room.

FOREGROUND CONTENT (absolutely centered over background):

  Top: pill badge — "JREE AI INTERVIEWER" 
       Geist Mono 11px, lime color, border 1px solid rgba(200,254,90,0.3),
       bg rgba(200,254,90,0.06), padding 5px 12px, border-radius 100px

  Quote (centered, max-width 680px):
    Large opening quotation mark: Instrument Serif 120px, #7C3AED, opacity 0.4, 
    positioned top-left of quote block, overlapping.
    
    Quote text: "*Tell me about a time you had to figure something out 
    completely on your own.*"
    Instrument Serif italic, 32px desktop / 22px mobile, #F0EBFF, 
    line-height 1.5, text-center
    
    Attribution below: "— Priya, JREE AI Interviewer"
    DM Sans 400, 14px, #8A8299

  Video interview mockup card (below quote, centered, max-width 480px):
    Background: #131018
    Border: 1px solid rgba(124,58,237,0.25)
    Border-radius: 18px
    Padding: 0 (content fills card)
    Box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)
    
    Top status bar: height 40px, padding 0 16px, 
      background #0F0C16, border-bottom 1px solid rgba(124,58,237,0.15)
      Left: ● ● ● (3 dots, 8px, charcoal colors like macOS stoplight)
      Center: "JREE Interview Room" DM Sans 400 12px, #4F4866
      Right: [LIVE] badge — DM Sans 500 11px, color #F87171,
             red dot 5px with pulse animation (scale 1→1.5, opacity 1→0, 1.5s infinite)
    
    Main area: two panels side by side.
      LEFT (Priya, 58% width): 
        Deep violet gradient background (#1E1030 → #2D1A4A)
        Center: placeholder for Priya avatar — 
          An oval/rounded rectangle shape in violet tones (like a video feed)
          Below: "Priya" label in Geist Mono 500 11px, lime color
          A typing indicator (3 animated dots) shows Priya "speaking"
      
      RIGHT (Student, 42% width):
        Background #181520 (darker, camera feed feeling)
        Center: circular avatar placeholder, 48px, 
                gradient border (violet → lime, 2px animated rotating)
        Below: "You" DM Sans 400 11px, #4F4866
        Bottom-left: green dot 8px + "mic on" DM Sans 11px, teal
    
    Bottom bar of mockup: 40px height, bg #0F0C16,
      Centered text: "Question 2 of 5 · 'Tell me about your biggest challenge'"
      DM Sans 400 12px, #8A8299
      Right: timer "01:24" Geist Mono 500 12px, lime

  Below the card:
    Small caption: "Priya is JREE's most loved feature. 
    She asks what humans forget to ask."
    DM Sans 400, 14px, #4F4866, text-center
    
    CTA: "Take the exam — meet her yourself →"
    Ghost button, centered, border violet, text #F0EBFF

Scroll animation: Quote fades in from translateY 40px. 
Card slides up 60px. Both fade in on scroll, 400ms spring easing.


═══════════════════════════════════════════════════════════
07. STATS — MAGAZINE EDITORIAL NUMBERS
═══════════════════════════════════════════════════════════

Background: #0B090F
Layout: NOT a grid of equal cards. A STACKED POEM.
Each stat is its own full-width row. Left-aligned. 

Section eyebrow: "THE PROBLEM WE SOLVE"
Heading: "Numbers don't *lie.*"

ROW 1: 
  "8,000,000" — Bricolage Grotesque ExtraBold, massive 140px, #F0EBFF
  Below number: "graduates enter the workforce every year in India" 
                DM Sans 400, 16px, #8A8299
  Far right: a thin vertical label reading "NASSCOM 2024" 
             Geist Mono 11px, #4F4866, rotated -90deg

ROW 2:
  A 1px divider: linear-gradient(to right, rgba(124,58,237,0.3), transparent)
  
  "60%" — Bricolage Grotesque ExtraBold 140px, color #F87171 (red — the problem color)
  Below: "are considered unemployable by Indian employers"
  Far right: rotated label "NASSCOM 2024"
  
  NOTE: The red is intentional and jarring. This is the pain point.

ROW 3:
  Divider.
  "1" — Bricolage Grotesque ExtraBold 140px, #C8FE5A (lime — the solution)
  Below: "standardized score changes everything. For everyone."
  Sub-micro: "Free for students. Forever."
  Far right: rotated "JREE 2025"

Between rows 2 and 3: A short editorial copy block (max-width 400px, 
right-aligned, mid-section):
  "The degrees are there. The skills are there. 
   The *proof* was missing."
  Instrument Serif italic, 20px, #8A8299
  This copy sits between the problem (red) and solution (lime) numbers.

Number counter animation: On scroll, each number counts from 0 to final 
value. Duration 1.2s, easeOutExpo. Triggered per row as it enters viewport.

Mobile: Numbers scale to 80px. Rotated labels hidden.


═══════════════════════════════════════════════════════════
08. SOCIAL PROOF — EDITORIAL TESTIMONIALS
═══════════════════════════════════════════════════════════

Background: #0F0C16
Section eyebrow: "EARLY ADOPTERS"
Heading: "What they said *after.*"

Layout: 3 testimonials in a horizontal row. NOT uniform cards — 
each card has a slightly different height to feel alive.
Grid: 1fr 1fr 1fr, gap 16px.

Each testimonial card:
  Background: #131018
  Border: 1px solid rgba(124,58,237,0.15)
  Border-radius: 14px
  Padding: 28px
  Grain texture applied
  
  Top: Large opening quote mark " — Instrument Serif 80px, 
       line-height 0.8, color #7C3AED at 50% opacity
       This overlaps slightly into the top padding of the card.
  
  Quote text: Instrument Serif italic, 18px, #F0EBFF, line-height 1.65
  
  Bottom row: 
    Avatar circle: 36px, gradient fill per person (violet/lime/mixed),
                  initials in Geist Mono 500 13px, white
    Name: DM Sans 500, 14px, #F0EBFF
    Role/College: DM Sans 400, 12px, #5D5578
    Band badge: Geist Mono 500 11px, 
                Band A → lime bg rgba(200,254,90,0.15), lime text
                Band B → violet bg, violet text

CARD 1 (tallest):
  "I've been applying to 30+ companies for 4 months. 
   One week after putting Band A on my profile, I had 3 interviews. 
   The score does the talking."
  — Ritika S. · B.Tech CSE, VIT Pune · Band A · 84

CARD 2 (medium):
  "We use JREE for our entire final-year cohort now. 
   The college portal showed us which departments were actually 
   placement-ready. No other tool gave us this."
  — Prof. Anil Mehta · T&P Cell, Amravati Engineering College

CARD 3 (shorter):
  "40 candidates shortlisted in 2 hours. 
   12 hired. Zero CV screening. 
   JREE is the first signal we actually trust."
  — Sneha K. · HR Lead, Pune SaaS startup

Scroll animation: Cards slide up from 40px, staggered 120ms.

Mobile: Cards stack vertically. Full width.


═══════════════════════════════════════════════════════════
09. INTERACTIVE ONBOARDING — THE CONVERSION CENTREPIECE
═══════════════════════════════════════════════════════════

This section should feel like a conversation, not a form.
Think: Typeform meets a Linear modal.

Background: #0B090F

Section heading: 
  "Prove yourself. *Right now.*"
  "Prove yourself." — Bricolage Grotesque ExtraBold 56px, #F0EBFF
  "Right now." — Instrument Serif italic 56px, #C8FE5A
  Center-aligned. Margin-bottom 56px.

OUTER CONTAINER: 
  Max-width 600px, centered, margin auto.
  Background: #131018
  Border: 1px solid rgba(124,58,237,0.22)
  Border-radius: 20px
  Box-shadow: 0 32px 80px rgba(0,0,0,0.5), 
              0 0 0 1px rgba(255,255,255,0.04)
  Grain texture applied.
  Padding: 40px desktop, 24px mobile.

PROGRESS BAR (top of container):
  4 dots + connecting line.
  Dot: 8px circle. 
    Future: border 1px solid #4F4866, bg transparent
    Active: bg #7C3AED, border violet, scale 1.3 (larger)
    Done: bg #C8FE5A (lime), no border — "completed = lime" signal
  Connecting line: 1px, bg #1D1826. Filled portion: violet.
  "Step 1 of 4" — Geist Mono 500, 11px, #4F4866, right-aligned, below dots.

── STEP 1: IDENTITY ────────────────────────────────────

  Step number ghost: "01" Geist Mono 700, 80px, #F0EBFF 4% opacity, 
  positioned top-right of card, decorative.
  
  Question heading: "Hey. What's your name?"
  Bricolage Grotesque ExtraBold 36px, #F0EBFF
  
  Sub-label: "Your score card will carry this name."
  DM Sans 400, 14px, #8A8299. Margin-bottom 28px.
  
  THREE INPUTS (stacked, gap 12px):
  
  Full Name:
    Height: 52px, bg #241F30, border: 1px solid rgba(124,58,237,0.2)
    Border-radius: 10px, padding: 0 16px
    Font: DM Sans 400, 16px, color #F0EBFF
    Placeholder: "Aarav Sharma" — color #4F4866
    Label: "FULL NAME" — Geist Mono 500, 10px, #7C3AED, 
           letter-spacing 0.1em, above input, margin-bottom 6px
    Focus: border-color #7C3AED, box-shadow 0 0 0 3px rgba(124,58,237,0.18)
    Valid: trailing ✓ in #2DD4BF (teal)
    Error: border-color #F87171, shake animation 3× 4px horizontal
    
  Mobile Number:
    Same styling.
    Label: "MOBILE"
    Placeholder: "+91 98765 43210"
    Below input: "OTP coming here. Nothing else." — 11px, #4F4866
    
  Email ID:
    Same styling.
    Label: "EMAIL"
    Placeholder: "you@college.edu"

  Inline validation fires 800ms after last keypress (not on submit).
  All three must be valid before CTA is active.

  CTA: "Next →"
    Full width, height 52px, border-radius 10px
    Active state: bg #7C3AED, text #F0EBFF, DM Sans 600 15px
    Disabled state: bg #1D1826, text #4F4866, cursor not-allowed
    
    On valid + click: button shows a single rotating circle 
    (Geist Mono "◌" character, spinning 1s), then 
    step transition fires: current step slides left translateX(-24px) + 
    opacity 0, next step slides in from translateX(24px) → 0, 
    opacity 0 → 1. Duration: 280ms each. Easing: ease-out.

── STEP 2: COLLEGE ─────────────────────────────────────

  Ghost: "02" same as before.
  Question: "Where are you studying?"
  Sub: "We'll benchmark you against your college's national standing."
  
  College Name Input + AUTOCOMPLETE:
    As user types, dropdown appears below input (no gap):
      White bg → use #1D1826 bg instead (dark)
      Border: 1px solid rgba(124,58,237,0.3)
      Border-radius: 0 0 10px 10px (flush with input bottom)
      
      5 suggestion items. Each: height 44px, padding 0 16px, 
      DM Sans 400 14px, #F0EBFF.
      On hover: bg #241F30
      On select: input fills, dropdown disappears.
      
    Suggestions: "Amravati Engineering College", "VIT Pune", 
    "BITS Pilani", "NIT Nagpur", "Other — type your college"
  
  Degree — Custom segmented control (NOT a dropdown):
    Label: "DEGREE"
    6 pills in a flex-wrap row: B.Tech · B.E. · BBA · B.Sc · MBA · Other
    Each pill: height 36px, padding 0 16px, border-radius 100px
    Inactive: border 1px solid rgba(124,58,237,0.2), bg transparent, 
              DM Sans 400 13px, #8A8299
    Active: border violet, bg rgba(124,58,237,0.15), color #F0EBFF,
            transition 150ms
  
  Graduation Year — 4 larger pill buttons:
    "2024" "2025" "2026" "2027+"
    Bigger: height 44px, padding 0 24px
    Active: bg lime rgba(200,254,90,0.12), border lime rgba(200,254,90,0.3),
            color #A8E040
  
  Back + CTA row: 
    Left: "← back" DM Sans 400 13px, #4F4866, no border (text only button)
    Right: "Next →" same CTA style as Step 1

── STEP 3: DOMAIN ──────────────────────────────────────

  Ghost: "03"
  Question: "Your exam will be *personalized.*"
    — "Your exam will be" Bricolage 36px, white
    — "personalized." Instrument Serif italic 36px, lime
  Sub: "Pick the domain that fits your field."
  
  8 DOMAIN CHIPS in a 4×2 grid (gap 10px):
  Each chip: full-width of its grid cell, height 52px
  Bg: #131018, border: 1px solid rgba(124,58,237,0.15), border-radius 10px
  Content: center-aligned, emoji left-padded + label
  Font: DM Sans 500 14px, #8A8299
  
  SELECTED STATE: 
    bg rgba(124,58,237,0.12), border #7C3AED (1px → 2px, solid)
    text #F0EBFF
    Left: violet checkmark circle (12px, filled violet, white ✓ inside)
    Scale spring: 1 → 1.02 → 1 on select, 200ms
  
  Chips: 
    💻 Computer Science
    🔧 Mechanical Engg.
    ⚡ Electrical / ECE
    🏗 Civil Engineering
    📊 Commerce / Finance
    🎨 Design & Media
    💊 Pharma / Life Sci.
    📚 Other / Undecided
  
  CTA: "Lock it in →" (copy change from generic "Next" — feels conversational)
  Disabled until one chip selected.

── STEP 4: OTP VERIFICATION ────────────────────────────

  Ghost: "04"
  Question: "Last step. Let's verify you."
  Sub: "We sent a 6-digit code to"
       + phone number in Geist Mono 500 16px, #7C3AED  
       + "  Change →" link in 12px lime

  OTP ROW — 6 boxes, flex row, gap 10px:
    Each box: width 52px, height 64px, border-radius 10px
    Bg: #241F30, border: 1px solid rgba(124,58,237,0.2)
    Font: Geist Mono 700, 28px, color #F0EBFF, text-center
    
    Focus state: border #7C3AED (2px), bg #2A2040,
                 box-shadow 0 0 0 4px rgba(124,58,237,0.15)
    Filled: border violet, box-shadow subtle violet
    All 6 filled: ALL boxes get border #2DD4BF (teal — success),
                  bg rgba(45,212,191,0.06),
                  a teal checkmark slides down from above each box (200ms stagger)
    Error: ALL boxes shake + border red, shake animation
    
    Auto-advance cursor to next box on each digit entry.
    Backspace: clear current → move to previous.
  
  Resend timer: "Resend code in 29s" — Geist Mono 500, 13px, #4F4866
    Countdown fires from 30. After 0: becomes "Resend code →" in lime.
  
  CTA: "Verify & start my exam →"
    Full width, height 52px, border-radius 10px
    Background: #C8FE5A (LIME — only used here again as it's THE action moment)
    Text: Bricolage Grotesque Bold 15px, color #0B090F (black on lime)
    Disabled until all 6 boxes filled.
    
  On success (all correct): 
    Container runs a very quick scale(1.0) → scale(1.01) → scale(1.0) spring.
    Green teal glow briefly flashes on container border.
    Then transitions to success state.

── SUCCESS STATE ──────────────────────────────────────

  Replaces form content (not the container — container stays).
  Center-aligned.
  
  Large checkmark: 72px circle, bg rgba(45,212,191,0.1), 
                   border 2px solid #2DD4BF, border-radius 50%
                   Inside: "✓" DM Sans 700 32px, teal
                   Entry: scale(0) → scale(1.08) → scale(1.0) spring, 400ms
  
  "You're registered." — Bricolage Grotesque ExtraBold 40px, #F0EBFF
  Below: "Your exam is waiting. You have 7 days." — DM Sans 400 16px, #8A8299
  
  Primary CTA: "Start my JREE now →" — lime bg, full width, 52px height
  Secondary: "Save my link for later" — ghost button, text-only, #4F4866
  
  Share nudge (below CTAs, margin-top 20px):
    "Tell a friend before they miss the free window:"
    DM Sans 400 13px, #8A8299, text-center, margin-bottom 12px
    
    3 share buttons in a row (each: 40px height, border-radius 100px, gap 8px):
      WhatsApp: border 1px solid rgba(37,211,102,0.3), 
                text #25D366, DM Sans 500 13px
      LinkedIn: border 1px solid rgba(10,102,194,0.3), 
                text #0A66C2
      Copy link: border rgba(124,58,237,0.3), text #7C3AED, 
                 Geist Mono 500 (copy = code = mono)

BACKGROUND DETAIL (behind the centered card):
  Very subtle, centered radial gradient, violet, 700px, 12% opacity.
  Same dot grid as hero, 2% opacity.


═══════════════════════════════════════════════════════════
10. BANDS — SCORE EXPLAINER
═══════════════════════════════════════════════════════════

Background: #0B090F
Section eyebrow: "THE SCORING SYSTEM"
Heading: "What your band *says* to an employer."

4-column bento (equal columns, gap 16px):

BAND A — border-top 3px solid #C8FE5A (lime)
  "A" — Bricolage Grotesque ExtraBold 80px, #C8FE5A
  "80–100" — Geist Mono 500 16px, #8A8299
  "Top tier." — Instrument Serif italic 22px, #F0EBFF, margin-top 4px
  Body: DM Sans 400 14px, #8A8299
  "Fast-tracked by most employers. Product, strategy, and analyst 
  roles actively filter for Band A."

BAND B — border-top 3px solid #7C3AED (violet)
  "B" in violet, "60–79" in gray
  "Ready." — Instrument Serif italic, white
  "Above average across all 5 layers. Most companies hire from 
  Band B with full confidence."

BAND C — border-top 3px solid #F59E0B (amber)
  "C" in amber, "40–59"
  "Almost." — Instrument Serif italic, white
  "The fundamentals are there. A 30-day improvement plan + 
  one re-attempt moves most students up a full band."

BAND D — border-top 3px solid #6B7280 (gray — not red, not dramatic)
  "D" in gray, "Below 40"
  "Starting point." — Instrument Serif italic, white
  "Detailed breakdown + free resources. Re-attempt in 30 days. 
  80% of Band D students move to C or above on their second attempt."

All cards: bg #131018, border 1px solid rgba(124,58,237,0.12) (except top border),
border-radius 14px, padding 28px.

Scroll animation: Cards flip in on rotateY(-90deg → 0), staggered 120ms.


═══════════════════════════════════════════════════════════
11. FAQ — CLEAN ACCORDION
═══════════════════════════════════════════════════════════

Background: #0B090F
Max-width: 720px, centered.
Section heading: "Questions." — just that. Bricolage ExtraBold 56px, #F0EBFF.
Subhead: "We've heard them all." — Instrument Serif italic 24px, #8A8299.

Each accordion item:
  Border-bottom: 1px solid rgba(124,58,237,0.12)
  Padding: 20px 0
  Question: DM Sans 500 17px, #F0EBFF — left aligned
  Toggle icon: right side, Geist Mono 20px, color #7C3AED
    Closed: "+" (plus) 
    Open: "×" (close), transitions via rotate(45deg) 200ms
  
  Answer: DM Sans 400 15px, #8A8299, line-height 1.7
  Open state: answer slides down via max-height animation, 300ms ease-out
  Closed → Open: question color shifts #F0EBFF → #C8FE5A (lime — active)

FAQs (7 items):
  1. Is JREE actually free for students? Yes — and always will be.
  2. How is this different from campus placement tests?
  3. What if I score Band C or D?
  4. How long does the full exam take?
  5. Can employers see my score without my permission?
  6. What's an AI interview? Will Priya be harsh?
  7. Is the score valid for internship applications too?


═══════════════════════════════════════════════════════════
12. FINAL CTA — FULL-SCREEN CLOSER
═══════════════════════════════════════════════════════════

Background: #0B090F

FULL-WIDTH TYPOGRAPHIC STATEMENT:
  "START." — Bricolage Grotesque ExtraBold, 200px desktop / 100px mobile
  Color: #C8FE5A (electric lime — the loudest moment of the page)
  Letter-spacing: -0.05em
  This word fills the section. It bleeds horizontally. It IS the CTA.

Below "START." (vertically stacked, centered):
  "90 minutes. One score. Every employer in India."
  DM Sans 400, 20px, #8A8299. Margin-top 24px.
  
  "Get my free JREE score →"
  Primary lime button, same spec as hero CTA.
  But centered this time.
  
  Small caption below button:
  "Free for students. No app. No credit card. Score in 24 hours."
  DM Sans 400 13px, #4F4866

  Pulsing ring on button:
    ::after pseudo-element, border 2px solid #C8FE5A, 
    same dimensions as button, border-radius 100px
    scale(1.0 → 1.15), opacity(0.4 → 0), 2s infinite ease-out


═══════════════════════════════════════════════════════════
13. FOOTER — QUIET, CONFIDENT
═══════════════════════════════════════════════════════════

Background: #070509 (darkest element on the page — footer sinks)
Border-top: 1px solid rgba(124,58,237,0.12)
Padding: 64px 0 32px

TOP ROW: 4-column flex.

Col 1 (wordmark column):
  "JREE●" — same nav treatment, 18px.
  "by EduBridge Pvt. Ltd." — DM Sans 400 12px, #4F4866. Margin-top 4px.
  "India's national standard for graduate readiness."
  DM Sans 400 13px, #5D5578, max-width 220px, margin-top 12px, line-height 1.5.
  
  Social icon row (margin-top 20px, gap 12px):
    LinkedIn · Twitter · Instagram · WhatsApp
    Each: 32px circle, border 1px solid rgba(124,58,237,0.2), 
    border-radius 50%, DM Sans icon, color #5D5578
    Hover: border-color #7C3AED, color #F0EBFF

Col 2 — "Students":
  Heading: Geist Mono 500 11px, #7C3AED, letter-spacing 0.1em, uppercase
  Links: Take Free Test · Sample Exam · Score Bands · FAQ · Certificate Preview

Col 3 — "Institutions":
  Heading: same as col 2.
  Links: For Colleges · For Employers · Bulk Registration · API · Request Demo

Col 4 — "Company":
  Heading: same.
  Links: About EduBridge · Press · Privacy Policy · Terms · Contact

All footer links: DM Sans 400 13px, #5D5578. Hover: #F0EBFF, 200ms.

BOTTOM ROW (margin-top 48px):
  Left: "© 2025 EduBridge Pvt. Ltd. All rights reserved."
  Right: "Made with conviction in India 🇮🇳"
  Both: Geist Mono 400 11px, #4F4866


═══════════════════════════════════════════════════════════
14. FIGMA-SPECIFIC — VARIABLES & INTERACTIONS
═══════════════════════════════════════════════════════════

VARIABLES TO CREATE:
  scrollY (number) — bound to page scroll
  navVisible (boolean) — true when scrollY > 60
  currentStep (number, 1–4) — form progress
  selectedDomain (string) — domain chip selection
  selectedDegree (string) — degree pill
  selectedYear (string) — graduation year
  faq[1–7]Open (boolean × 7) — accordion state
  otpDigit[1–6] (string × 6) — OTP input
  otpComplete (boolean) — all 6 filled
  formSuccess (boolean) — post-verify state

COMPONENT VARIANTS:
  Button: [primary-lime / primary-violet / ghost-violet / ghost-white / 
           disabled / loading / text-only]
  Input: [empty / focus / valid / error]
  Badge/Chip: [inactive / active / selected]
  Accordion: [closed / open]
  Pill-segment: [inactive / active]

SCROLL ANIMATIONS (use Figma scroll position + interaction):
  Every section entrance: opacity 0 → 1, translateY 32px → 0
  Trigger: 100px before section top enters viewport
  Duration: 400ms, spring easing
  
  Stats numbers: counter from 0 → final (use variant swap + smart animate)
  Hero headline: clip-path text reveal per line (staggered 120ms)
  Band cards: rotateY reveal staggered
  Step numbers: opacity increase on scroll

PROTOTYPE FLOW:
  Nav button → scrollTo Section 9 (onboarding)
  Hero CTA → scrollTo Section 9
  Final CTA → scrollTo Section 9
  Onboarding Next/Back → currentStep variable
  Domain chips → selectedDomain variable
  FAQ click → toggle faqNOpen variable
  OTP complete → show verify button active state
  Verify success → formSuccess = true → success state frame

DEVELOPER HANDOFF:
  Name all layers clearly:
    Section-[name], Component-[name]/[variant], 
    Token-[colorName], Text-[styleName]
  Export design tokens as JSON.
  Mark interactive areas with constraint labels.
  Group each section into its own page component.


═══════════════════════════════════════════════════════════
15. MOBILE RULES (390px frame — iPhone 14 Pro)
═══════════════════════════════════════════════════════════

General:
  All section padding: 72px top, 48px bottom
  Horizontal padding: 20px
  Max font size: hero headline 44px, section h2 36px, stats 80px
  Body: 15px, line-height 1.65

Hero: Stack vertically. Ghost "78" → 180px, bottom-right.
Bento: Cell 1 full width, Cells 2+3 stacked.
Steps: Left ghost numbers → 60px above each step block.
Priya: Card full width, 16px padding.
Stats poem: Numbers 80px. Rotated labels hidden. 
Onboarding: Form card full width, 0 horizontal margin.
OTP boxes: 46px × 58px, gap 8px.
Bands: 2×2 grid, each card: smaller number (56px).
FAQ: Single column.
Footer: 2-column, then single column at 360px. Company col collapsible.

All tap targets: minimum 44×44px. No hover states (use focus/active only).