JREE LANDING PAGE — "FOR STUDENTS" SECTION
Section title: Prove Your Employability. Get Hired Faster.
Purpose: Convert students by showing them the actual outputs.
Design System: SIGNAL · Full token inheritance
═══════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION CONTAINER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: bg/dark #0E1F3D (full dark navy — this section breaks from
the cream page and signals "this is serious, here is your proof").

Width: 100%. Padding: 96px 80px.
Fine dot grid overlay (entire section bg):
  1px dots, 28px spacing, rgba(255,255,255,0.025). Static. No animation.

SECTION HEADER (centered, max-width 700px, margin 0 auto 72px auto):

  Eyebrow: "FOR STUDENTS"
    IBM Plex Mono 500 11px rgba(255,255,255,0.45) letter-spacing 0.14em uppercase.
    A 1px horizontal rule rgba(255,255,255,0.1) on both sides of the text
    (rule · text · rule), each rule ~40px wide. Creates a centered divider feel.

  Headline (2 lines, center-aligned):
    Line 1: "Prove Your Employability."
      Bricolage Grotesque 800 52px #FFFFFF letter-spacing -0.04em line-height 0.95.
    Line 2: "Get Hired " [Bricolage 800 52px #FFFFFF] +
             "Faster." [Instrument Serif italic 52px saffron/300 #E8934A]
    
    ENTRY ANIMATION:
      Each line: clip-path inset(0 100% 0 0) → inset(0 0% 0 0)
      Line 1: 600ms ease-out, delay 0ms on section entry.
      Line 2: 600ms ease-out, delay 140ms.

  Sub (margin-top 18px, center-aligned, max-width 560px):
    "See where you stand nationally — and understand
    exactly what to improve."
    DM Sans 400 18px rgba(255,255,255,0.55) line-height 1.65.
    ENTRY ANIMATION: fadeIn 400ms, delay 320ms.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MAIN LAYOUT
Two columns. Left anchors. Right delivers.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OUTER CONTAINER: flex row, gap 40px, align-items flex-start.
Max-width 1160px, margin 0 auto.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEFT COLUMN — 38% width
The Anchor: Live Result Card
Sticky on desktop (position sticky, top 80px).
This is what students get. Show it, don't describe it.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESULT CARD CONTAINER:
  Width: 100%. bg rgba(255,255,255,0.03).
  Border: 1px solid rgba(255,255,255,0.1).
  Border-radius: 20px. Padding: 0.
  Overflow: hidden.
  Box-shadow: 0 24px 80px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset.

  ENTRY ANIMATION:
    On section scroll entry:
    translateY 40px → 0, opacity 0 → 1, 500ms cubic-bezier(0.16,1,0.3,1), delay 200ms.

  ── RESULT CARD HEADER BAR ──────────────────
  
  bg navy/700 #1C3560. Height 52px. Padding 0 20px. Flex, align-center, space-between.
  
  LEFT: Avatar circle (32px, jade gradient bg, "PS" Bricolage 700 13px white centered).
        "Priya Sharma" DM Sans 600 14px white ml 10px.
  
  RIGHT: 3 status chips (flex, gap 6px):
    "Band B" — bg rgba(28,53,96,0.8), border rgba(255,255,255,0.12),
      IBM Plex Mono 600 10px rgba(255,255,255,0.8), padding 3px 10px, radius pill.
    "78th Percentile" — bg rgba(12,107,87,0.3), border rgba(23,147,122,0.35),
      IBM Plex Mono 600 10px jade/300, padding 3px 10px, radius pill.

  ── SCORE HERO AREA ─────────────────────────
  
  bg navy/900 #0E1F3D. Padding 24px 20px. Flex align-center gap 20px.
  
  LEFT: Score Ring (96px diameter):
    Track: 8px stroke, rgba(255,255,255,0.08).
    Arc: 8px stroke. Gradient: saffron/500 #C96B1F → saffron/300 #E8934A.
    Fills to 74% (= 266.4° of 360°).
    
    ANIMATION (fires when card enters viewport, once only):
      stroke-dashoffset: [full circumference: 301.6px] → [74.6px]
      Duration: 1.8s. Easing: cubic-bezier(0.34,1.56,0.64,1) slight spring.
    
    Center: "74" IBM Plex Mono 800 32px #FFFFFF.
      Counter animates 0→74 in sync with the arc draw.
    "/100" IBM Plex Mono 400 14px rgba(255,255,255,0.35) below.
  
  RIGHT:
    "JREE Score" IBM Plex Mono 500 10px rgba(255,255,255,0.35) uppercase letter-spacing 0.08em.
    "74 out of 100" Bricolage 700 20px #FFFFFF mt 2px.
    "Engineering · Osmania University" DM Sans 400 12px rgba(255,255,255,0.4) mt 2px.
    
    RANK PILLS (flex, gap 6px, mt 10px):
      "#142 Nationally" — small pill, IBM Plex Mono 600 11px.
        bg rgba(201,107,31,0.15), border rgba(201,107,31,0.3), text saffron/300.
      "#6 in College" — same pill style, text rgba(255,255,255,0.6).

  ── 5 LAYER BARS ────────────────────────────
  
  bg rgba(14,31,61,0.8). Padding 16px 20px. Border-top 1px rgba(255,255,255,0.07).
  
  Label: "Skill Breakdown" IBM Plex Mono 500 10px rgba(255,255,255,0.35) uppercase letter-spacing 0.08em mb 12px.
  
  5 LAYER ROWS (gap 8px):
    Each row: flex, align-center, gap 10px.
    Label: DM Sans 400 12px rgba(255,255,255,0.5), width 80px fixed.
    Track: flex-1, height 6px, bg rgba(255,255,255,0.08), radius pill.
    Fill: respective layer color (see below), animates 0→% staggered 80ms.
    Score: IBM Plex Mono 700 12px right-aligned, width 28px.
    
    L1 Cognitive    → fill #0E1F3D tinted lighter (rgba(255,255,255,0.6))   78%  white
    L2 English      → fill #1A5C7A tinted                                    65%  rgba(255,255,255,0.8)
    L3 Domain       → fill saffron/500 #C96B1F                               58%  saffron/300
    L4 Workplace    → fill #6B4F8C                                            71%  rgba(255,255,255,0.7)
    L5 Interview    → fill jade/500 #0C6B57                                   82%  jade/300
    
    NOTE: L3 Domain at 58% is deliberately the lowest bar.
    It has a small "⬇" marker above the bar end + "lowest" IBM Plex Mono 400 9px saffron/300.
    This is the "gap" the product talks about. Show it visually.
    
    BAR ANIMATION: fills on section entry, staggered 80ms per bar, 500ms ease-out each.

  ── ROLE READINESS MINI STRIP ──────────────
  
  bg rgba(255,255,255,0.04). Padding 14px 20px.
  Border-top: 1px solid rgba(255,255,255,0.07).
  
  Label: "Role Readiness" IBM Plex Mono 500 10px rgba(255,255,255,0.35) uppercase mb 10px.
  
  6 ROLE CHIPS in a 3×2 grid, gap 6px:
    Each chip: radius card/sm, padding 7px 10px, flex align-center gap 6px.
    Role icon (emoji, 12px) + role name (DM Sans 500 11px) + score (IBM Plex Mono 700 11px).
    
    Best 2 (Analyst + Operations — highest scores):
      bg rgba(12,107,87,0.2), border rgba(23,147,122,0.3).
      Text: jade/300. Score: jade/300.
    Middle 2 (Finance + HR):
      bg rgba(255,255,255,0.05), border rgba(255,255,255,0.1).
      Text: rgba(255,255,255,0.65). Score rgba(255,255,255,0.8).
    Lower 2 (Sales + Software):
      bg rgba(255,255,255,0.03), border rgba(255,255,255,0.07).
      Text: rgba(255,255,255,0.4). Score rgba(255,255,255,0.5).
    
    Analyst 📊 82% (jade)
    Operations ⚙️ 79% (jade)
    Finance 💰 71% (mid)
    HR People 👥 68% (mid)
    Sales 🤝 62% (low)
    Software 💻 54% (low)

  ── CERTIFICATE PEEK ────────────────────────
  
  bg #FAF8F4 (warm cream — deliberate contrast from dark above).
  Padding 14px 20px.
  Border-top: 1px solid rgba(255,255,255,0.07).
  
  Flex, align-center, space-between.
  
  LEFT:
    "JREE Certificate" DM Sans 600 13px text/primary (#0F0E0C).
    "Verified · QR Code · PDF" DM Sans 400 12px text/secondary mt 2px.
  
  RIGHT: QR code block (36px × 36px):
    A real-looking QR code SVG (grid of small dark squares on white bg).
    Border: 1px border/default. Radius: 6px.
    Below: "Scan to verify" IBM Plex Mono 400 9px text/tertiary text-center mt 3px.
  
  Connecting detail: a jade checkmark circle (20px, bg jade/100, jade/500 ✓) left of "Verified".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RIGHT COLUMN — 62% width
The Bento Grid: 6 cards, each a mini product demo.
NOT icon + text. Real data inside every card.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BENTO GRID LAYOUT:
  Display: grid.
  Grid-template-columns: 1fr 1fr 1fr.
  Grid-template-rows: auto auto auto.
  Gap: 12px.

  Card slots:
    Row 1: [Score — spans 1 col] [Rank — spans 1 col] [Certificate — spans 1 col]
    Row 2: [Role Readiness — spans 3 cols, full width]
    Row 3: [Skill Gap — spans 2 cols] [Interview — spans 1 col]

  NOTE: Row 2 (Role Readiness) is the widest card — 6 role bars need space.
  Row 3 Skill Gap spans 2/3, Interview spans 1/3.

SHARED CARD BASE:
  Background: bg/surface #FFFFFF.
  Border: 1px solid #E0DDD7.
  Border-radius: 16px.
  Padding: 22px.
  Box-shadow: 0 1px 3px rgba(15,14,12,0.06), 0 4px 12px rgba(15,14,12,0.04).
  
  CARD ENTRY ANIMATION:
    On section scroll entry, staggered per card:
    Card 1 (Score): delay 0ms.
    Card 2 (Rank): delay 60ms.
    Card 3 (Certificate): delay 120ms.
    Card 4 (Role Readiness): delay 180ms.
    Card 5 (Skill Gap): delay 240ms.
    Card 6 (Interview): delay 300ms.
    Each: opacity 0→1, translateY 20px→0, 400ms ease-out.
  
  HOVER: translateY -3px, shadow → 0 4px 20px rgba(15,14,12,0.10). 200ms ease.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD 1 — JREE SCORE
Grid: row 1, col 1. bg navy/900 #0E1F3D (DARK card — visual anchor in bento).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This card is deliberately dark — the only dark card in the bento.
It anchors the grid and references the dark section background.

Border: 1px solid rgba(255,255,255,0.1). Border-radius 16px. Padding 22px.
No warm border here — the card is part of the dark family.

TOP: "JREE SCORE" IBM Plex Mono 500 10px rgba(255,255,255,0.4) uppercase letter-spacing 0.1em.

VISUAL (center of card, margin 16px 0):
  Score ring, 80px diameter.
  Track: 6px, rgba(255,255,255,0.08).
  Arc: 6px, saffron/500 → saffron/300 gradient, 74%.
  Animation: draws on card entry, 1.5s, spring easing.
  Center: "74" IBM Plex Mono 800 28px #FFFFFF.
  "/100" IBM Plex Mono 400 12px rgba(255,255,255,0.35) below.

HEADING: "One number. Every employer understands it."
  Bricolage 700 16px #FFFFFF line-height 1.3.

BODY: "Not your marks. Not your attendance. Your actual readiness — scored across 5 layers."
  DM Sans 400 13px rgba(255,255,255,0.55) line-height 1.55 margin-top 6px.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD 2 — NATIONAL AND STREAM RANK
Grid: row 1, col 2. bg/surface #FFFFFF.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOP: "NATIONAL RANK" IBM Plex Mono 500 10px navy/900 uppercase letter-spacing 0.1em.

VISUAL — Mini Leaderboard (margin 14px 0):
  3 rows representing 3 adjacent ranks.
  Container: bg bg/alt #F2EFE9, border border/default, radius card/sm, overflow hidden.
  
  ROW 1 (#141 — above the student):
    Flex, align-center, padding 8px 12px, gap 8px.
    Avatar circle 20px (bg border/strong, initials "RK" DM Sans 600 9px text/secondary).
    "#141" IBM Plex Mono 700 12px text/secondary, width 30px.
    "R.K." DM Sans 400 12px text/secondary flex-1.
    "82" IBM Plex Mono 700 12px text/secondary.
  
  ROW 2 (#142 — THE STUDENT, highlighted):
    bg: linear-gradient(135deg, navy/100, jade/100) — subtle warm gradient.
    Border-left: 3px solid saffron/500 (the accent signal for "this is you").
    Padding 8px 12px. Flex, align-center, gap 8px.
    Avatar circle 20px (bg navy/900, "P" DM Sans 600 9px white).
    "#142" IBM Plex Mono 800 12px navy/900, width 30px.
    "You" DM Sans 600 12px navy/900 flex-1.
    "74" IBM Plex Mono 800 12px navy/900.
    "← You" IBM Plex Mono 500 9px saffron/500 ml 4px.
  
  ROW 3 (#143 — below the student):
    Same as row 1 styling.
    Avatar "AS". "#143". "A.S.". "73".
  
  Below 3 rows: thin bar inside container.
    "of 50,247 students" DM Sans 400 10px text/tertiary, padding 6px 12px,
    bg border/default at 20% opacity, border-top border/default.

HEADING: "Know exactly where you stand nationally."
  Bricolage 700 15px text/primary line-height 1.3 margin-top 12px.

BODY: "Ranked vs all JREE students in India, and separately within your stream."
  DM Sans 400 12px text/secondary line-height 1.55 margin-top 5px.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD 3 — VERIFIED CERTIFICATE
Grid: row 1, col 3. bg/surface #FFFFFF.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOP: "CERTIFICATE" IBM Plex Mono 500 10px navy/900 uppercase letter-spacing 0.1em.

VISUAL — Mini Certificate Preview (margin 14px 0):
  A compact certificate card inside the card.
  bg #FAF8F4 (warm cream), border 1.5px navy/900, radius 10px, padding 14px.
  
  TOP OF MINI-CERT:
    "JREE" Bricolage 800 14px navy/900, centered.
    1px rule saffron/300, full width, my 6px.
    "JREE Verified" Bricolage 700 12px navy/900 centered.
    "Priya Sharma" Instrument Serif 400 (upright) 14px navy/900 centered mt 4px.
    Thin saffron/300 underline below name (1px, 80px wide, centered).
  
  SCORE BAR (inside mini-cert):
    bg navy/900, radius 6px, padding 8px 10px, mt 8px.
    Flex, justify space-between.
    3 items: "74" "Band B" "78th" — IBM Plex Mono 700 11px white.
    Labels: IBM Plex Mono 400 8px rgba(255,255,255,0.45) below each number.
    Dividers: 1px rgba(255,255,255,0.12) between items.
  
  BOTTOM ROW (inside mini-cert, flex, align-center, space-between, mt 8px):
    LEFT: "edubridgeindia.com" IBM Plex Mono 400 8px text/tertiary.
    RIGHT: QR code block (28px × 28px):
      SVG pattern of small dark squares (actual QR code visual, not a placeholder).
      Border: 1px border/default. Radius 4px.

HEADING: "Download. Share. Employers verify it in seconds."
  Bricolage 700 15px text/primary line-height 1.3 margin-top 12px.

BODY: "QR code on the certificate links to a live verification page. Scan = instant proof."
  DM Sans 400 12px text/secondary line-height 1.55 margin-top 5px.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD 4 — ROLE READINESS
Grid: row 2, spans ALL 3 columns. Full width. Tallest card.
This is the section's visual centrepiece.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bg/surface #FFFFFF. Padding 24px 28px.
Border-top: 3px solid saffron/500 (the only top-border accent in the bento — this card leads).

HEADER ROW (flex, space-between, align-center):
  LEFT:
    "ROLE READINESS" IBM Plex Mono 500 10px saffron/700 uppercase letter-spacing 0.1em.
    "Are you ready for 6 different roles?" Bricolage 700 20px text/primary mt 4px.
  RIGHT:
    Pill: "Based on your L1–L5 scores" DM Sans 400 12px text/tertiary,
    bg bg/alt, border border/default, radius pill, padding 5px 14px.

ROLE GRID (margin-top 20px):
  Display: grid. Grid-template-columns: repeat(3, 1fr). Gap: 12px.
  On mobile: 2-column grid.

  6 ROLE CELLS (each one is a standalone mini-card):
    bg bg/alt #F2EFE9, border border/default, radius card/md, padding 16px.

  BEST ROLE (Analyst — highest score):
    bg jade/100, border jade/300.
    "★ BEST FIT" IBM Plex Mono 600 9px jade/700 uppercase letter-spacing 0.08em mb 8px.

  OTHER ROLES: standard bg/alt styling.

  EACH ROLE CELL LAYOUT:
    TOP ROW: role emoji (16px) + role name (DM Sans 600 13px text/primary).
             RIGHT: readiness % (IBM Plex Mono 800 20px, colored by score).
    
    BAR (margin-top 10px):
      Track: full-width, h6px, bg border/default, radius pill.
      Fill: colored by readiness score:
        80%+: jade/500.
        60-79%: navy/700.
        40-59%: saffron/500.
        Below 40%: #8B7E6E (warm stone).
      ANIMATION: width 0 → final %, 600ms ease-out.
        Staggered: each role bar 80ms after the previous.
        Fires on card entry.
    
    BOTTOM: Readiness label (DM Sans 400 11px, same color as bar):
      80%+: "Job Ready" (jade).
      60-79%: "Nearly Ready" (navy).
      40-59%: "Developing" (saffron).
      Below 40%: "Needs work" (stone).

    6 ROLES AND SCORES:
      📊 Business Analyst · 82% · jade · "Job Ready"
      ⚙️ Operations Exec · 79% · navy · "Nearly Ready"
      💰 Finance Analyst · 71% · navy · "Nearly Ready"
      👥 HR Executive · 68% · navy · "Nearly Ready"
      🤝 Sales Executive · 62% · saffron · "Developing"
      💻 Software Engineer · 54% · saffron · "Developing"

  HOVER INTERACTION (on each role cell):
    Scale 1.0 → 1.03, border darkens to respective color, shadow increases.
    A tooltip appears above the bar (200ms delay):
      "Your [layer] score drives this readiness"
      E.g., "Your L1 Cognitive score drives Analyst readiness"
      DM Sans 400 12px, bg navy/900, text white, padding 6px 12px, radius card/sm.
      Arrow pointing down to bar.
    150ms ease transition on hover.

BOTTOM NOTE (below role grid, margin-top 16px):
  "Your top role match is pre-filled on your profile. Employers searching for Analysts see you first."
  DM Sans 400 13px text/secondary.
  jade dot (6px) left of text.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD 5 — SKILL GAP BREAKDOWN
Grid: row 3, spans 2 columns. Wider card.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bg/surface #FFFFFF. Padding 24px.

TOP: "SKILL GAP MAP" IBM Plex Mono 500 10px navy/900 uppercase letter-spacing 0.1em.

2-COLUMN LAYOUT inside card:
  LEFT (55%): the visual. RIGHT (45%): the narrative.

LEFT — LAYER BARS WITH GAP CALLOUT:

  5 LAYER ROWS (gap 10px, margin-top 14px):
    Each row: label left (60px fixed) + bar flex-1 + score right (28px).
    Label: DM Sans 400 12px text/secondary.
    Track: h8px, border/default, radius pill.
    Fill colors: same as the result card left column.
    Scores: IBM Plex Mono 700 13px.

    L1 Cognitive   78%   fill rgba(14,31,61,0.8)     score #0F0E0C
    L2 English     65%   fill #1A5C7A                 score #0F0E0C
    L3 Domain      58%   fill saffron/500 #C96B1F     score saffron/700 — WEAK
    L4 Workplace   71%   fill #6B4F8C                 score #0F0E0C
    L5 Interview   82%   fill jade/500                score jade/700 — STRONG

  GAP CALLOUT (positioned near L3 bar, right side of bar):
    A small callout arrow pointing left to the L3 bar end.
    "⬇ Weakest" IBM Plex Mono 600 10px saffron/700.
    "-16 pts from top" IBM Plex Mono 400 9px saffron/500.
    bg saffron/100, border saffron/300, radius card/sm, padding 4px 8px.

  STRENGTH CALLOUT (near L5 bar):
    A small upward callout.
    "⬆ Strongest" IBM Plex Mono 600 10px jade/700.
    bg jade/100, border jade/300, radius card/sm, padding 4px 8px.

  BAR ANIMATION: same as result card, staggered 80ms, 600ms ease-out.

RIGHT — NARRATIVE:
  Heading: "Know which layer is holding you back."
    Bricolage 700 18px text/primary line-height 1.3.
  
  Gap insight box (bg saffron/100, border saffron/300, radius card/md, padding 14px, mt 12px):
    "L3 · Domain is your gap"
    DM Sans 600 13px saffron/700.
    "Your Domain score of 58 is 16 points below your average across
    other layers. This is costing you role readiness in Finance and Software."
    DM Sans 400 12px text/primary line-height 1.55 mt 4px.
  
  Strength insight box (bg jade/100, border jade/300, radius card/md, padding 14px, mt 8px):
    "L5 · AI Interview is your edge"
    DM Sans 600 13px jade/700.
    "Your interview score of 82 puts you in the top 14% nationally. Employers see this."
    DM Sans 400 12px text/primary line-height 1.55 mt 4px.
  
  Small link (margin-top 12px):
    "Your result includes a personalised improvement plan →"
    DM Sans 400 12px saffron/700. Hover: saffron/700 underline.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CARD 6 — AI VIDEO INTERVIEW FEEDBACK
Grid: row 3, col 3. Taller card (fills height of card 5).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bg navy/900 #0E1F3D (second dark card in bento — creates visual bookending with Card 1).
Border: 1px rgba(255,255,255,0.1). No warm border.
Padding 22px.

TOP: "AI INTERVIEW" IBM Plex Mono 500 10px rgba(255,255,255,0.4) uppercase letter-spacing 0.1em.

PRIYA IDENTITY STRIP (margin-top 12px, flex, align-center, gap 10px):
  Priya avatar (40px):
    bg linear-gradient(135deg, #1C3560, #0C6B57) — navy to jade gradient.
    Border-radius 50%, border 1.5px rgba(255,255,255,0.15).
    Inside: stylized face silhouette (an oval and curve suggesting a person,
    NOT a generic user icon — a character).
  "Priya" Bricolage 700 14px white.
  "JREE AI Interviewer" DM Sans 400 12px rgba(255,255,255,0.4).

QUESTION BUBBLE (margin-top 14px):
  bg rgba(255,255,255,0.06), border rgba(255,255,255,0.1),
  radius 12px 12px 12px 4px, padding 12px 14px.
  Instrument Serif italic 13px rgba(255,255,255,0.8) line-height 1.6:
  "Tell me about a time you had to figure something out without all the information."

4 SCORING DIMENSIONS (margin-top 16px, gap 8px):
  Label: "Scored on:" IBM Plex Mono 500 10px rgba(255,255,255,0.3) uppercase mb 10px.
  
  4 ROWS. Each row: dimension name + bar + score.
  Name: DM Sans 400 12px rgba(255,255,255,0.6), width 72px fixed.
  Track: flex-1, h4px, bg rgba(255,255,255,0.08), radius pill.
  Score: IBM Plex Mono 700 12px, colored.
  
  All bars animate on card entry, staggered 60ms, 500ms ease-out.
  
  "Content"     bar fill jade/500 (82%)     score jade/300 "82"
  "Clarity"     bar fill jade/500 (76%)     score jade/300 "76"
  "Confidence"  bar fill saffron/500 (68%)  score saffron/300 "68"
  "Structure"   bar fill saffron/500 (71%)  score saffron/300 "71"
  
  NOTE: Content and Clarity are jade (strong). Confidence and Structure
  are saffron (developing). This visual split communicates that the
  scoring is nuanced, not binary.

INTERVIEW SCORE TOTAL (below rows, margin-top 14px):
  bg rgba(255,255,255,0.06), border rgba(255,255,255,0.1), radius card/sm, padding 10px 14px.
  Flex, align-center, space-between.
  "AI Interview Overall" DM Sans 400 12px rgba(255,255,255,0.5).
  "82 / 100" IBM Plex Mono 800 18px white.
  "Top 14%" IBM Plex Mono 600 11px jade/300.

FOOTER TEXT (margin-top 14px):
  "Employers see your interview score and video — before their first call."
  DM Sans 400 12px rgba(255,255,255,0.45) line-height 1.55.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLOSING STATEMENT + CTA
Below the bento grid (full-width section, below both columns).
Center-aligned.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTAINER: margin-top 56px, max-width 760px, margin-left auto, margin-right auto.

SEPARATOR: 1px solid rgba(255,255,255,0.1), full container width, mb 40px.

CLOSING COPY:
  "Tech or non-tech —"
  DM Sans 400 20px rgba(255,255,255,0.45) italic. mb 6px.
  
  "JREE gives you a score you can share, a gap you can work on,
  and a path forward that is specific to you."
  Bricolage 700 28px #FFFFFF line-height 1.25 text-center.
  
  NOTE: Line 2 has NO Instrument Serif accent. Every word carries equal
  weight here. The sentence is a commitment — it should feel solid.

CTA (margin-top 32px, flex center, gap 14px):
  PRIMARY: "Register Free →"
    Height 56px. Padding 0 40px. Radius pill.
    bg saffron/500 #C96B1F. DM Sans 700 17px white.
    Box-shadow: 0 8px 32px rgba(201,107,31,0.3).
    Hover: bg saffron/700, scale 1.02, shadow increases.
    Active: scale 0.98.
    
    BUTTON DETAIL: inside the button, before the text:
    A small jade dot (8px, #17937A) + space.
    "Register Free →"
    The jade dot signals "free" before the text confirms it.
    (This is the only button on the page with an inner dot — it's unique to this CTA.)

  SECONDARY: "Try 10 questions first"
    Height 56px. Padding 0 28px. Radius pill.
    Border 1.5px rgba(255,255,255,0.2), text rgba(255,255,255,0.65), DM Sans 500 16px.
    Hover: border rgba(255,255,255,0.4), text white.

REASSURANCE ROW (margin-top 14px, flex center gap 20px):
  3 items, each: small icon + text.
  DM Sans 400 13px rgba(255,255,255,0.35).
  "No fees" · "90 min total" · "Results immediately after"
  Items separated by a · character in rgba(255,255,255,0.15).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERACTIONS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCORE RING (left column result card + Card 1):
  Draw on section entry, once. 1.8s spring. Counter sync.

LAYER BARS (left column + Card 5):
  All instances: 0→% fill, staggered 80ms, 600ms ease-out, on entry.

ROLE READINESS BARS (Card 4):
  0→% fill, staggered 80ms, 600ms ease-out.
  Hover tooltip shows which layer drives that role readiness.

INTERVIEW BARS (Card 6):
  0→% fill, staggered 60ms, 500ms ease-out.

CARD HOVER (all 6 bento cards):
  translateY -3px, shadow increases.
  Card 1 (dark): box-shadow color shifts toward saffron/glow.
  Card 6 (dark): box-shadow shifts toward jade/glow.

LEFT RESULT CARD (sticky):
  On desktop: position sticky, top 80px.
  Smooth scroll behavior — card stays in view as user reads the bento.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOBILE LAYOUT (390px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Left column (result card): collapses to full-width, not sticky.
Placed ABOVE the bento grid.

Bento grid: 1-column on mobile.
  Cards stack: Score → Rank → Role Readiness → Skill Gap → Certificate → Interview.
  Card 4 (Role Readiness): switches to 2-column role grid (3×2 → 2×3).

Section padding: 64px 20px.
Left result card: padding compressed (16px), bars slightly thinner.
Score ring in result card: reduced to 72px.

CTA buttons: full-width, stacked.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDGE CASES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROLE READINESS tooltip overflow:
  If tooltip near right edge of card → flip to appear left of cursor.

SCORE RING animation performance:
  If prefers-reduced-motion is set → skip animation, show final state directly.
  All counter animations also skipped in this case.

CARD 4 (Role Readiness) on narrow screens:
  If viewport < 768px → 2-column grid, wrap.
  If viewport < 480px → 1-column list, each role cell full-width.

Left column sticky scroll end:
  When user reaches the closing CTA, the left card unsticks and scrolls
  normally with the page. Transition: position sticky → position relative, 0ms.

DARK CARD hover on touch devices:
  No translateY hover effect on mobile (no cursor).
  Instead: tap → brief scale(0.98) then scale(1.0), 150ms. Tactile response