═══════════════════════════════════════════════════════════════
JREE POST-SIGNUP FLOW — "PROOF OF WORK" DESIGN SYSTEM
6 Screens + 1 Dashboard: Full Redesign Prompt
Figma Make — Desktop Primary (1440px)
═══════════════════════════════════════════════════════════════

DESIGN SYSTEM INHERITANCE (from Landing Page — DO NOT DEVIATE):
Background base:     #0B090F
Surface L1 (cards):  #131018
Surface L2 (hover):  #1D1826
Surface L3 (inputs): #241F30
Primary violet:      #7C3AED
Violet soft fill:    rgba(124,58,237,0.12)
Electric lime:       #C8FE5A (background ONLY on primary CTAs)
Lime text:           #A8E040
Text primary:        #F0EBFF
Text secondary:      #8A8299
Text tertiary:       #4F4866
Border default:      rgba(124,58,237,0.18)
Success/verified:    #2DD4BF (teal — ONLY for success states)
Amber (growth):      #D97706 (ONLY for improvement/warning — NEVER red for scores)
Danger:              #F87171 (ONLY for system errors — NEVER score display)

Typography:
Display:     Bricolage Grotesque ExtraBold — all headings, big numbers
Serif:       Instrument Serif italic — one accent word per screen
Mono:        Geist Mono — ALL numbers, timers, scores, stats, IDs
Body:        DM Sans 400/500 — all body text, labels, microcopy

Surface texture: CSS grain noise filter on ALL dark cards (3% opacity).
This single texture separates premium from generic dark UI.
Every card gets: box-shadow 0 1px 0 rgba(255,255,255,0.04) inset (top highlight)

═══════════════════════════════════════════════════════════════
GLOBAL NAV SHELL — EXAM CONTEXT (appears on screens 1–5)
═══════════════════════════════════════════════════════════════

This is NOT the landing page nav. This is the persistent exam shell.
Height: 52px, full width, fixed top.
Background: rgba(11,9,15,0.95) — near opaque, not frosted glass.
Border-bottom: 1px solid rgba(124,58,237,0.15)

LEFT: "JREE●" wordmark (Bricolage ExtraBold 18px, #F0EBFF, lime dot)
      Next to wordmark: session label in Geist Mono 500 11px, #4F4866
      e.g. "JREE-2026-00847"

CENTER: Segmented progress bar — the exam's macro progress.
  Total width: 320px. 5 equal segments.
  Each segment: a rounded rectangle pill, 52px × 8px, gap 4px.
  Segment states:
    Completed: fill #7C3AED (violet)
    Active: fill gradient left→right #7C3AED → #C8FE5A (violet to lime)
            with a subtle pulse animation (opacity 0.85→1.0, 1.5s infinite)
    Upcoming: fill rgba(124,58,237,0.12) (ghost)
  Below each segment: label in Geist Mono 400 9px, #4F4866, centered
  Labels: "L1 · Cognitive" "L2 · English" "L3 · Domain" "L4 · SJT" "L5 · Priya"

RIGHT: 
  Global timer pill: Geist Mono 700 14px, border 1px solid rgba(124,58,237,0.3),
  bg rgba(124,58,237,0.08), padding 5px 14px, border-radius 100px.
  Format: "74:32 remaining"
  Color: #F0EBFF normally. At 10 min: amber #D97706. At 5 min: soft pulse.
  NOTE: DO NOT use red for the timer at any point. Research confirms red = anxiety.
  
  Auto-save indicator: small dot (6px) + "Saved" in DM Sans 400 11px, #4F4866.
  Dot pulses briefly (violet → teal → violet) each time auto-save fires.

═══════════════════════════════════════════════════════════════
SCREEN A — DASHBOARD (EMPTY STATE — Post-Registration)
═══════════════════════════════════════════════════════════════

This is the first screen after sign-up. Do NOT switch to light mode.
The entire product lives in dark mode. Consistency = trust.

Background: #0B090F
No exam shell nav on this screen. Use a separate dashboard nav.

DASHBOARD NAV (52px):
  Same shell as exam nav but different right side.
  Left: "JREE●" wordmark + "Dashboard" label
  Right: Avatar circle (32px, violet gradient, student initials "PS")
         + "Priya Sharma" DM Sans 500 13px, #F0EBFF
         + Settings icon (24px, #4F4866)

CONTENT — Full viewport, centered, max-width 900px:

TOP GREETING STRIP (below nav, padding-top 64px):
  "Welcome, Priya." — Bricolage Grotesque ExtraBold 48px, #F0EBFF
  Serif accent: "Welcome," stays in Bricolage, "Priya." in Instrument Serif italic
  Below: "JREE-2026-00847 · Engineering stream · Registered 24 May 2026"
  Geist Mono 400, 12px, #4F4866

HERO EXAM CARD (margin-top 40px):
  This is the primary focus — one card, full width, 280px height.
  Background: #131018
  Border: 1px solid rgba(124,58,237,0.22)
  Border-radius: 16px
  Grain texture applied.
  Box-shadow: 0 0 0 1px rgba(255,255,255,0.03), 0 24px 48px rgba(0,0,0,0.4)
  
  LEFT COLUMN (60%): Text content
    EYEBROW: "YOUR EXAM IS READY" — Geist Mono 500 10px, #A8E040 (lime text),
             letter-spacing 0.12em
    HEADLINE: "Your *score* is" — Bricolage ExtraBold 40px, #F0EBFF
              Line 2: "90 minutes away." — same font, same size, #F0EBFF
              The word "score" is in Instrument Serif italic, color #7C3AED (violet)
    BODY: "One exam. Your national rank. Your role fit. Your improvement plan.
           Every employer in India can verify it."
           DM Sans 400, 16px, #8A8299, line-height 1.6, max-width 380px
    
    CTA ROW (margin-top 28px, flex, gap 12px):
      Primary: "Start My Free Exam →"
        Height 48px, padding 0 28px, border-radius 100px
        Background: #C8FE5A (LIME — the commitment moment)
        Text: Bricolage ExtraBold 15px, #0B090F (black on lime)
        Box-shadow: 0 8px 32px rgba(200,254,90,0.2)
        Hover: scale(1.02), glow increases
      
      Ghost: "How it works ↗"
        Height 48px, border 1px solid rgba(124,58,237,0.25)
        Text: DM Sans 400 14px, #8A8299
    
    MICRO-DETAIL (below CTA): 
      Row of 3 facts, each: small dot + text
      DM Sans 400, 12px, #4F4866
      "· 90 min + 10 min AI interview  ·  Desktop only  ·  Auto-saves every 30s"
  
  RIGHT COLUMN (40%): Score card preview "locked state"
    A locked score ring — 120px diameter ring
    Ring fill: none — just the track, rgba(124,58,237,0.15)
    Center: "??" Geist Mono 700, 36px, #4F4866 (ghost — score not yet unlocked)
    Decorative: a subtle lock icon (14px, #4F4866) positioned below the "??"
    Below ring: "Band ??" in Geist Mono 500 12px, #4F4866
    Outer label: "Score unlocks after exam" DM Sans 400 11px, #4F4866 text-center
    
    Faint particle: 3 small circles around the ring orbit,
    colors: rgba(124,58,237,0.15), rgba(200,254,90,0.1), rgba(45,212,191,0.1)
    These orbit slowly (360deg rotation, 8s infinite, each offset 120deg)

3-COLUMN PREVIEW GRID (below hero card, margin-top 16px, gap 16px):
  3 equal-width cards, each 160px tall.
  Background: #131018, border radius 14px, border default, grain texture.
  
  Card 1 — Score + National Rank:
    Icon area: 32px circle, bg rgba(124,58,237,0.15),
    Icon: bar chart symbol in violet
    Label: "Score + National Rank" DM Sans 500 13px, #F0EBFF
    Sub: "See where you stand among 8M+ graduates"
    DM Sans 400 12px, #8A8299, line-height 1.5
    Bottom: "Unlocks after exam" Geist Mono 400 10px, #4F4866
    Hover: border-color rgba(124,58,237,0.35)
  
  Card 2 — Role Readiness:
    Icon: target/bullseye in teal rgba(45,212,191,0.8)
    Label: "Role Readiness Scores"
    Sub: "Get matched to roles that fit your actual band"
    Bottom: "Unlocks after exam"
  
  Card 3 — Improvement Plan:
    Icon: upward arrow in amber #D97706
    Label: "Personalised Gap Map"
    Sub: "Know exactly what to fix for Band A"
    Bottom: "Unlocks after exam"
    
  All three cards: icons and text are slightly desaturated / dimmed (70% opacity)
  to visually communicate "locked" without being punitive.

BOTTOM STRIP (below 3-column grid, margin-top 40px):
  Center-aligned, max-width 600px.
  "1,42,800+ graduates scored this month."
  DM Sans 400 14px, #4F4866. Avatar strip (5 circles, initials).


═══════════════════════════════════════════════════════════════
SCREEN B — PRE-EXAM SYSTEM CHECK
═══════════════════════════════════════════════════════════════

USE THE EXAM NAV SHELL (progress bar shows all 5 segments as upcoming/ghost).
Background: #0B090F (NOT light gray. This is JREE. It's always dark.)

Content: Centered card, max-width 560px, vertically centered in viewport.
Card: background #131018, border 1px solid rgba(124,58,237,0.2),
      border-radius 16px, padding 40px 36px, grain texture.

TOP OF CARD:
  Eyebrow: "BEFORE YOU BEGIN" — Geist Mono 500 10px, #7C3AED, 
           letter-spacing 0.12em
  Heading: "System *check.*"
    "System" — Bricolage ExtraBold 36px, #F0EBFF
    "check." — Instrument Serif italic 36px, #A8E040 (lime text)
  Subhead: "All 4 must pass before your exam starts."
    DM Sans 400 14px, #8A8299, margin-top 4px

DIVIDER: 1px, rgba(124,58,237,0.12), margin 20px 0

4 CHECK ROWS (gap 10px):
Each row: height 56px, border-radius 10px, padding 0 18px, flex align-center.
Row background: #1D1826 (surface L2)
Border: 1px solid rgba(124,58,237,0.12)

LEFT: icon circle 36px (bg rgba(124,58,237,0.12), border-radius 50%)
      Icon inside: 16px — camera / mic / wifi / browser icons
      Icon color: #7C3AED

MIDDLE: 
  Label: DM Sans 500 14px, #F0EBFF
  Sublabel: DM Sans 400 12px, #8A8299 (e.g. "Detected and working")

RIGHT — 3 states:
  READY: "✓ Ready" — DM Sans 500 13px, color #2DD4BF (teal)
         Small teal dot (6px) left of text, pulse off (static)
  
  CHECKING: spinning circle (14px, 1px stroke, violet, 1s rotate)
            + "Checking..." DM Sans 400 13px, #D97706 (amber)
  
  FAILED: "⚠ Fix required" DM Sans 500 13px, #D97706 (amber — NOT red)
          Below row: inline error tip slides down (max-height animation):
          "Camera in use by another app. Close Zoom/Meet and refresh."
          DM Sans 400 12px, #D97706, padding 8px 18px, bg rgba(217,119,6,0.08)
          border-bottom-radius 10px

ROW ORDER: Camera · Microphone · Internet Speed · Browser

WHEN ALL 4 READY: 
  A soft glow effect radiates through the card border
  (box-shadow shifts from rgba(124,58,237,0.18) → rgba(45,212,191,0.25), 500ms)

EXAM RULES BLOCK (below 4 rows, margin-top 20px):
  Background: rgba(124,58,237,0.06)
  Border: 1px solid rgba(124,58,237,0.14)
  Border-radius: 10px, padding: 16px 18px
  
  Label row: small scroll emoji + "Exam Rules" DM Sans 500 13px, #F0EBFF
  
  3 rule lines (gap 6px):
  Each: a › arrow in violet + DM Sans 400 13px, #8A8299
  › Your camera stays on throughout the exam.
  › Tab-switching triggers a soft warning. Two warnings = exam flagged.
  › All answers auto-save. 90 minutes. No extensions.
  
  CHECKBOX ROW (margin-top 12px):
    Custom checkbox: 16px square, border 1.5px solid rgba(124,58,237,0.4),
    border-radius 4px, bg transparent.
    Checked state: bg #7C3AED, border #7C3AED, 
    white ✓ icon (10px) inside, spring scale animation on check.
    
    Label: "I've read and agree to the exam rules"
    DM Sans 400 13px, #8A8299. Clicking label also toggles checkbox.

CTA (margin-top 24px):
  "All checks passed — Start Exam →"
  Full width, height 52px, border-radius 10px
  When checks incomplete: bg #1D1826, text #4F4866, cursor not-allowed.
  When all ready + checkbox checked: bg #C8FE5A (LIME), text #0B090F,
  Bricolage ExtraBold 15px.
  Transition between states: 400ms ease.

BOTTOM REASSURANCE (outside card, below it):
  Center: soft pulsing violet dot + 
  "Your connection is verified and secure. Focus on doing your best."
  DM Sans 400 12px, #4F4866, italic.
  (Directly from research — replaces surveillance language with confidence language.)


═══════════════════════════════════════════════════════════════
SCREEN C — EXAM ACTIVE (Layer 2: Professional Communication)
═══════════════════════════════════════════════════════════════

GLOBAL EXAM SHELL: Active, L2 segment lit with gradient animation.
Timer shows current remaining (amber if ≤ 10 min — NEVER red).

LAYER CONTEXT BAR (below the global nav shell, full width, height 44px):
  Background: rgba(124,58,237,0.06)
  Border-bottom: 1px solid rgba(124,58,237,0.12)
  
  LEFT: 5 layer pills in a row (gap 8px), left-padded 24px
    Each pill: border-radius 100px, height 28px, padding 0 14px
    
    COMPLETED layer (L1): bg rgba(45,212,191,0.12), 
      border 1px solid rgba(45,212,191,0.25),
      text: "✓ L1 · Cognitive" Geist Mono 500 11px, #2DD4BF (teal)
    
    ACTIVE layer (L2): bg rgba(124,58,237,0.18),
      border 1.5px solid #7C3AED,
      text: "L2 · Communication" Geist Mono 600 11px, #F0EBFF
      Small pulsing dot (4px, violet) left of text
    
    UPCOMING layers (L3, L4, L5): bg transparent,
      border 1px solid rgba(124,58,237,0.12),
      text: "L3 · Domain" etc. Geist Mono 400 11px, #4F4866
  
  RIGHT: "Question 4 of 16 · Layer 2" Geist Mono 400 11px, #4F4866
         + auto-save indicator (same as nav shell)

MAIN CONTENT AREA (below context bar, full remaining height):
  Left column: 76% width (question area)
  Right column: 24% width (question navigator, sticky)
  Gap: 0 (they're separated by a 1px border-right on the left column)
  
  ── LEFT COLUMN ──────────────────────────────────────────────
  
  Padding: 32px 40px
  
  QUESTION CARD:
    Background: #131018
    Border: 1px solid rgba(124,58,237,0.15)
    Border-radius: 14px
    Padding: 32px
    Min-height: 200px
    Grain texture applied.
    
    TOP ROW (question metadata):
      Left: "LAYER 2 — PROFESSIONAL COMMUNICATION" Geist Mono 500 10px, 
            #7C3AED, letter-spacing 0.1em
      Right: "Q4 / 16" Geist Mono 500 12px, #4F4866
    
    QUESTION TEXT (margin-top 16px):
      Bricolage Grotesque Bold 20px, #F0EBFF, line-height 1.55
      Max-width: 100% of card.
      The question is the hero of this card. Give it space.
      
      "Your manager sends an urgent email at 5:45 PM asking for a 
      client presentation by 9 AM tomorrow. You are 60% done and 
      realistically need 4 more hours. What is the most 
      professionally mature response?"
  
  ANSWER OPTIONS (below question card, margin-top 16px, gap 10px):
    4 answer option cards. Each: full width.
    
    DEFAULT STATE:
      Background: #131018
      Border: 1px solid rgba(124,58,237,0.15)
      Border-radius: 10px
      Height: auto (min 60px), padding 18px 20px
      Grain texture (same as all cards)
      
      LEFT: Option label circle — 28px diameter
        Background: rgba(124,58,237,0.10)
        Border: 1px solid rgba(124,58,237,0.25)
        Border-radius: 50%
        Text: "A" Geist Mono 700 13px, #7C3AED, centered
      
      TEXT: DM Sans 400 15px, #8A8299, line-height 1.55, margin-left 14px
      
      Hover state: 
        Background: rgba(124,58,237,0.06)
        Border-color: rgba(124,58,237,0.3)
        Option circle: bg rgba(124,58,237,0.18), border more opaque
        Text color: #F0EBFF
        Transition: all 150ms ease
        Cursor: pointer
    
    SELECTED STATE:
      Background: rgba(124,58,237,0.12)
      Border: 1.5px solid #7C3AED
      Box-shadow: 0 0 0 3px rgba(124,58,237,0.12)
      
      Option circle: bg #7C3AED (solid), border #7C3AED
      Text: "B" (letter) color: #F0EBFF
      
      Answer text: DM Sans 500 15px, #F0EBFF (upgraded from 400 to 500 weight)
      
      Transition: all 150ms cubic-bezier(0.16,1,0.3,1) (spring)
      A very subtle scale(1.005) on selection creates a satisfying "click" feel.
    
    Show Option B as pre-selected in this design.
  
  BOTTOM BAR (fixed to bottom of left column, 52px height):
    Background: rgba(11,9,15,0.9), backdrop blur 8px
    Border-top: 1px solid rgba(124,58,237,0.12)
    Padding: 0 40px, flex, align-center, justify space-between
    
    LEFT: "4 answered · 12 remaining in this layer"
           DM Sans 400 13px, #4F4866
    
    RIGHT: "Save & Next →"
      Height 40px, padding 0 24px, border-radius 100px
      Background: #7C3AED (violet — NOT lime, lime is for commitment CTAs only)
      Text: DM Sans 600 14px, #F0EBFF
      Hover: bg #8B5CF6, box-shadow 0 4px 20px rgba(124,58,237,0.3)
      
      When no option selected: bg rgba(124,58,237,0.25), text #4F4866, 
      pointer-events none — disabled state.
  
  ── RIGHT COLUMN (QUESTION NAVIGATOR) ─────────────────────────
  
  Width: 24%, sticky (stays fixed while left column scrolls)
  Background: #0D0B12 (slightly different from base, navigator feels distinct)
  Border-left: 1px solid rgba(124,58,237,0.12)
  Padding: 24px 16px
  
  TOP LABEL: "QUESTIONS" Geist Mono 500 10px, #4F4866, letter-spacing 0.12em
  Margin-bottom: 16px
  
  LAYER PROGRESS (before the number grid):
    "Layer 2 of 5 · 4 done" DM Sans 400 12px, #8A8299
    Thin progress bar (6px height, full width): 
    Track: rgba(124,58,237,0.12), Fill: #7C3AED, border-radius 100px
    Fill width: 25% (4/16 complete)
  
  NUMBER GRID (margin-top 16px):
    4 columns × N rows, gap 6px
    Each number cell: 36px × 36px, border-radius 8px, Geist Mono 600 13px, centered
    
    ANSWERED: bg rgba(124,58,237,0.2), border 1px solid rgba(124,58,237,0.3),
              text #F0EBFF
    CURRENT: bg #7C3AED, border #7C3AED, text #F0EBFF
             Box-shadow 0 0 12px rgba(124,58,237,0.4) — active glow
    UNANSWERED: bg #1D1826, border rgba(124,58,237,0.1), text #4F4866
    
    Show: 1,2,3 as answered. 4 as current. 5-16 as unanswered.
  
  LEGEND (below grid, margin-top 16px):
    Two legend items (flex column, gap 6px):
    Each: small 10px square (matching color) + label DM Sans 400 11px, #4F4866
    "■ Answered" (violet) · "■ Current" (violet solid)
  
  SEPARATOR: 1px horizontal line, rgba(124,58,237,0.12)
  
  LAYER BREAKDOWN (below separator, margin-top 12px):
    Label: "YOUR PROGRESS" Geist Mono 500 10px, #4F4866
    
    5 mini rows (gap 6px):
    Each: layer name DM Sans 400 11px, #4F4866 + 
          mini status right-aligned DM Sans 400 11px
    L1 · Cognitive: "✓ Done" teal
    L2 · Communication: "In progress" violet
    L3 · Domain: "—" ghost
    L4 · SJT: "—" ghost
    L5 · Interview: "—" ghost


═══════════════════════════════════════════════════════════════
SCREEN D — LAYER TRANSITION SCREEN
═══════════════════════════════════════════════════════════════

GLOBAL EXAM SHELL: Active, layer 3 about to start. Layer 3 segment is 
the "active upcoming" gradient. Timer continues.

BACKGROUND:
  #0B090F base.
  Large ghost text: the layer name behind content.
  "DECISION" — Bricolage ExtraBold, massive 280px, #F0EBFF at 5% opacity.
  Positioned center-right, bleeds off right edge.
  This word IS the visual. It contextualizes the next layer non-verbally.

FOREGROUND (absolutely centered, max-width 520px):

  LAYER BADGE (top):
    Geist Mono 500 10px pill: 
    bg rgba(124,58,237,0.1), border rgba(124,58,237,0.3), 
    padding 5px 12px, border-radius 100px
    Content: "LAYER 04 OF 05  ·  SJT"
    Color: #7C3AED, letter-spacing 0.1em

  LAYER NAME (margin-top 16px):
    Line 1: "Workplace" Bricolage ExtraBold 72px, #F0EBFF, tight letter-spacing
    Line 2: "*Decision*" Instrument Serif italic 72px, #C8FE5A (LIME)
    Line 3: "Making." Bricolage ExtraBold 72px, #F0EBFF
    
    NOTE: The serif italic word "Decision" in lime creates the visual surprise.
    It is NOT centered like the other lines — nudge it 8px right to break symmetry.

  DESCRIPTION (margin-top 20px):
    "Real workplace situations. No textbook answers.
    You will choose the most professionally mature response."
    DM Sans 400, 18px, #8A8299, line-height 1.6, text-center, max-width 420px

  3-STAT ROW (margin-top 28px, flex, justify-center, gap 40px):
    Each stat: number + label below
    Numbers: Geist Mono 700 40px, #F0EBFF
    Labels: DM Sans 400 12px, #4F4866, uppercase, letter-spacing 0.08em
    
    "12" · "QUESTIONS"
    "15" · "MINUTES"
    "15%" · "WEIGHT"
    
    Note: the 15% weight should have a small tooltip-style note:
    A (i) icon right of "WEIGHT" label. Hover: tooltip shows
    "15% of your total JREE score" DM Sans 12px, #8A8299.
    
    Separators between stats: 1px vertical line, rgba(124,58,237,0.15), height 32px

  LAYER TRANSITION VISUAL (margin-top 28px):
    A horizontal 5-segment bar (same as nav progress bar but larger, 400px total).
    Shows: L1 violet filled, L2 violet filled, L3 violet filled, 
           L4 gradient (violet→lime) PULSING, L5 ghost.
    Height: 10px, gap 6px, border-radius 100px.
    Below bar: "L4 starting next" Geist Mono 400 10px, #A8E040, text-center.

  CTA (margin-top 32px):
    "I'm Ready — Start Layer 4 →"
    Height 52px, padding 0 32px, border-radius 100px
    Background: #7C3AED (violet — this is a continue action, not a commitment)
    Text: Bricolage ExtraBold 15px, #F0EBFF
    Hover: bg #8B5CF6, box-shadow 0 8px 32px rgba(124,58,237,0.35), scale 1.02
    
  AUTO-START LINE (below CTA):
    A thin segmented countdown bar (full width of CTA button):
    Background: rgba(124,58,237,0.12)
    Fill: #7C3AED, animates right-to-left (shrinking) over 10 seconds.
    Below bar: "Auto-starts in 10s — tap anywhere to start now"
    DM Sans 400 12px, #4F4866, text-center


═══════════════════════════════════════════════════════════════
SCREEN E — AI INTERVIEW WITH PRIYA
═══════════════════════════════════════════════════════════════

This is JREE's most important screen. Every design decision here must 
communicate warmth, reduce anxiety, and make students feel heard.

GLOBAL EXAM SHELL: L5 segment fully lit (active), global timer shows 
"10:24 remaining" for this section specifically (NOT the global timer).

SECONDARY CONTEXT BAR (below nav shell, 36px):
  "AI Video Interview — Layer 5  ·  Question 2 of 5"
  Left-aligned, DM Sans 400 13px, #8A8299.
  Right: "2:00 per question" Geist Mono 400 12px, #4F4866

FULL-VIEWPORT LAYOUT (below context bar):
  Background: #080610 (the darkest surface — cinema mode)
  
  The viewport is split into 3 zones vertically (NOT side by side):
  
  ── TOP ZONE: PRIYA (55% of viewport height) ──────────────────
  
  Background: linear-gradient(180deg, #100820 0%, #0B090F 100%)
  This zone has a centered violet radial glow: 
    position center, size 500px × 400px, #7C3AED at 12% opacity.
  
  PRIYA'S AVATAR CARD (centered, 340px × 280px):
    Background: linear-gradient(135deg, #1E1030 0%, #2D1A4A 60%, #1A1028 100%)
    Border: 1px solid rgba(124,58,237,0.3)
    Border-radius: 20px
    Box-shadow: 0 24px 64px rgba(0,0,0,0.6), 
                0 0 0 1px rgba(255,255,255,0.04)
    Grain texture applied.
    
    AVATAR PLACEHOLDER:
      Centered in the card.
      NOT a generic blob — design a proper illustrated character:
      An oval shape (180px × 220px) representing Priya's bust/shoulders.
      Color: layered gradients — warm violet/indigo tones for background.
      Silhouette shape suggests: professional Indian woman, blazer-style 
      top visible at shoulders, face area lighter gradient.
      Style: flat illustration, NOT photorealistic, NOT 3D render.
      Like the illustration style of Stripe or Linear's human figures.
      
      Face area: slightly warmer gradient, oval, 70px wide.
      Hair: darker gradient mass above face oval, slight wave/curve.
      Shoulders: wider gradient below face, color #3D1F6A.
      This is a stylized illustration, not a realistic photo.
    
    NAME TAG (bottom of card, 32px strip):
      Background: rgba(124,58,237,0.2)
      Border-top: 1px solid rgba(124,58,237,0.2)
      "Priya" left-aligned, Geist Mono 600 12px, #A8E040 (lime)
      "JREE AI Interviewer" right-aligned, Geist Mono 400 10px, #4F4866
    
    STATE INDICATOR (top-right corner of card, absolute position):
      When Priya is "speaking": pulsing violet ring around card border
      When Priya is "listening": teal border glow + soft breathing animation
        (card scales 1.0 → 1.003 → 1.0, 3s ease-in-out, infinite)
  
  QUESTION BUBBLE (below avatar card, margin-top 16px):
    Centered, max-width 460px.
    Background: rgba(124,58,237,0.1)
    Border: 1px solid rgba(124,58,237,0.25)
    Border-radius: 14px 14px 14px 4px (speech bubble effect — left tail)
    Padding: 20px 24px
    
    Quote text: Instrument Serif italic 18px, #F0EBFF, line-height 1.6
    "Describe a situation where you had to solve a problem 
    without having all the information you needed. 
    How did you approach it?"
    
    BOTTOM: 3 animated dots (typing indicator)
    Each dot: 6px circle, violet, opacity animates 1→0.3→1 with 200ms offset
    Note: Dots appear only while Priya is "speaking" (first 2s of question).
          After question displays fully, dots disappear.
  
  WAVEFORM (below question bubble, margin-top 12px):
    When Priya is speaking: 7 vertical bars, violet, heights animating 
    in sine wave pattern. Shows Priya is "vocalizing."
    When listening (student's turn): bars go flat, color shifts to teal.
    This is the subtle signal of whose turn it is.
  
  ── DIVIDER STRIP (4% of viewport height) ─────────────────────
  
  A thin horizontal separator: 1px solid rgba(124,58,237,0.12)
  Center: a pill badge "YOUR TURN — SPEAK CLEARLY"
    or when Priya is speaking: "PRIYA IS ASKING — LISTEN"
  Geist Mono 500 10px, letter-spacing 0.1em, appropriate color.
  This pill switches states based on whose turn it is.

  ── BOTTOM ZONE: STUDENT (41% of viewport height) ─────────────
  
  Background: #0B090F
  
  WEBCAM CARD (centered, 480px × 240px):
    Background: #131018
    Border: 1px solid rgba(124,58,237,0.2) — 
    NOTE: When student is actively speaking, border animates to 
    rgba(45,212,191,0.4) (teal) — recording active signal.
    Border-radius: 16px
    
    INNER: placeholder for actual webcam feed (darker rectangle).
    Background: #0D0B12, border-radius 12px.
    
    CENTER PLACEHOLDER: 
      Camera icon (32px, #4F4866) + "Camera active" DM Sans 400 13px, #4F4866
      This entire area is replaced by actual webcam feed in production.
    
    FRAMING GUIDE (overlay on webcam):
      A very subtle oval outline (2px dashed, rgba(124,58,237,0.2))
      centered at head position. This helps students center themselves.
      Label: "Center your face here" DM Sans 400 10px, rgba(124,58,237,0.4)
      This label fades out after 3 seconds (opacity 1→0, 1s ease).
    
    REC BADGE (top-right corner):
      8px dot (teal #2DD4BF, pulse animation) + "REC" Geist Mono 600 10px, teal
      Background: rgba(13,9,15,0.8), padding 3px 8px, border-radius 100px
    
    AUDIO WAVEFORM (bottom of webcam card, 32px strip):
      Background: rgba(124,58,237,0.06)
      Border-top: 1px solid rgba(124,58,237,0.12)
      7 animated bars (when speaking): lavender color #8B5CF6
      Flat line (when not speaking): rgba(124,58,237,0.2)
      Amplitude should visually respond to voice input.
    
    YOUR NAME TAG:
      "You" — Geist Mono 400 11px, #4F4866, bottom-center overlay
  
  CONTROLS ROW (below webcam card, margin-top 12px, centered, flex, gap 12px):
    "Mute" button: height 36px, padding 0 18px, border-radius 100px
      bg rgba(124,58,237,0.1), border rgba(124,58,237,0.2)
      Icon: mic icon (16px, violet) + "Mute" DM Sans 500 13px, #8A8299
      Active/muted state: bg rgba(248,113,113,0.1), border rgba(248,113,113,0.3),
      icon and text: #F87171 — muted is a FUNCTIONAL state, shown in red here
      specifically. Not a score/assessment state.
    
    "Speak clearly and take your time" — DM Sans 400 12px, #4F4866, italic
    This reassurance is persistent and NON-dismissable. Research shows 
    this reduces anxiety significantly.
  
  RESPONSE TIMER (bottom-right corner of viewport, fixed):
    NOT a flashing countdown. A calm segmented bar.
    Width 200px, height 6px.
    Background track: rgba(124,58,237,0.12)
    Fill: starts full, recedes left-to-right over 2 minutes.
    Color: violet when >30s, transitions to amber when <30s.
    (Specifically avoiding red timer — research is clear on this.)
    
    Below bar: "1:24 remaining" Geist Mono 400 12px, #8A8299
                NO blinking, NO pulsing on this element.

  CTA (bottom-right corner, fixed, 16px offset from edges):
    "Done — Next Question →"
    Height 44px, padding 0 24px, border-radius 100px
    Background: #7C3AED
    Text: DM Sans 600 14px, #F0EBFF
    Hover: bg #8B5CF6


═══════════════════════════════════════════════════════════════
SCREEN F — PROCESSING RESULTS (Post-Interview Loading)
═══════════════════════════════════════════════════════════════

This is the moment between completion and the score reveal.
It must feel like something SIGNIFICANT is happening.
Design for the emotional peak, not just a loading state.

Background: #0B090F
No exam nav shell — the exam is done.
Use a minimal JREE wordmark in the corner, nothing else.

FULL VIEWPORT CENTERED CONTENT:

OUTER GLOW:
  A large radial gradient centered: #7C3AED at 15% opacity, 800px radius.
  Very subtle. Creates the feeling that the screen is "awakening."

PARTICLE FIELD:
  12 small circles scattered across the viewport.
  Sizes: 4px, 6px, 8px. Colors: violet (opacity 0.2), lime (opacity 0.15),
  teal (opacity 0.15).
  Each slowly drifts (translateX and Y ±20px, varying speeds 6s–12s, infinite).
  These are purely atmospheric. NOT distracting. Stay in periphery.

CENTER CONTENT (max-width 480px, centered):

  SCORE RING LOADING (top, centered):
    100px diameter ring.
    Track: rgba(124,58,237,0.12), 4px stroke.
    Arc: 4px stroke, violet-to-lime gradient, rotating continuously (360deg, 1.2s linear).
    This is elegant, not a generic spinner. The gradient arc communicates
    something sophisticated is happening.
    
    Center of ring: during processing, shows animated counting number.
    A number counts up (0 → 73) over the duration of the processing steps.
    Font: Geist Mono 700 28px, #F0EBFF
    When complete: counter stops. Number "glows" briefly (text-shadow violet)
  
  HEADING (margin-top 24px):
    "Analysing *your* responses." — 
    "Analysing" + "responses." in Bricolage ExtraBold 36px, #F0EBFF
    "your" in Instrument Serif italic 36px, #A8E040 (lime)
    text-center
  
  SUBHEAD: "Calculating your score, national rank,
           and role readiness profile."
    DM Sans 400 16px, #8A8299, text-center, line-height 1.6

  PROCESSING STEPS (margin-top 32px, max-width 380px, centered):
    5 step rows. Each: height 48px, border-radius 10px, padding 0 16px.
    Background: #131018, border: 1px solid rgba(124,58,237,0.12), grain texture.
    Gap: 8px between rows.
    
    Each row: LEFT: state icon (20px circle) | MIDDLE: label | RIGHT: status
    
    COMPLETED STATE:
      Icon circle: bg rgba(45,212,191,0.15), border rgba(45,212,191,0.3)
      Icon: "✓" Geist Mono 600 12px, #2DD4BF
      Label: DM Sans 500 14px, #F0EBFF (upgraded from muted to primary when done)
      Right: "Done" Geist Mono 400 11px, #2DD4BF
      Row border shifts to rgba(45,212,191,0.15) when done.
      Row gets a brief slide-in checkmark animation when it completes.
    
    ACTIVE STATE (currently processing):
      Icon circle: bg rgba(124,58,237,0.2), spinning arc inside (same as top ring)
      Label: DM Sans 500 14px, #F0EBFF + animated ellipsis "..."
      Right: nothing
      Row border: rgba(124,58,237,0.25) with slow pulse
    
    PENDING STATE:
      Icon circle: bg #1D1826, border rgba(124,58,237,0.1)
      Number inside: Geist Mono 400 11px, #4F4866
      Label: DM Sans 400 14px, #4F4866 (ghost)
    
    5 STEPS:
      1. Exam layers 1–4 scored         → show as DONE
      2. AI interview analysed          → show as DONE
      3. Generating role readiness scores → ACTIVE
      4. Calculating national percentile  → PENDING
      5. Building your improvement plan   → PENDING

  "VIEW MY RESULTS →" BUTTON:
    DO NOT show this button until ALL 5 steps complete.
    This is critical UX — showing it mid-process implies the student can 
    skip. The button appearing prematurely cheapens the reveal.
    
    WHEN COMPLETE (all 5 done, counter stopped at final score):
      Button appears with a spring entrance: translateY(20px) → 0, 
      opacity 0 → 1, scale(0.9) → 1, 500ms spring.
      
      Height 52px, padding 0 36px, border-radius 100px
      Background: #C8FE5A (LIME — this is the moment of highest commitment)
      Text: Bricolage ExtraBold 16px, #0B090F
      Box-shadow: 0 8px 40px rgba(200,254,90,0.3)
      
      Pulsing ring animation (::after):
        Same button dimensions, border 2px solid #C8FE5A,
        scale 1 → 1.2, opacity 0.4 → 0, 2s infinite.
      
      Below button: "Your results are ready. Priya has scored your interview."
      DM Sans 400 13px, #4F4866, text-center


═══════════════════════════════════════════════════════════════
SCREEN G — RESULTS PAGE (Overview Tab)
═══════════════════════════════════════════════════════════════

THIS IS THE EMOTIONAL PEAK OF THE ENTIRE PRODUCT.
The student just completed 90 minutes. This moment needs to feel 
like an achievement, not a report card.

RESULTS NAV (new nav — different from exam shell):
  Height: 52px. Same base style (#0B090F, border-bottom).
  LEFT: "JREE●" wordmark
  CENTER: Student name + JREE ID (compact)
  RIGHT: "Share results" ghost button + avatar

HERO HEADER (below nav, full width, 240px tall):
  Background: #0B090F
  
  BACKGROUND LAYER:
    Ghost score number "73" — Bricolage ExtraBold 360px, #F0EBFF at 4% opacity.
    Positioned center-right, partially clipped. Same treatment as landing page hero.
    This creates continuity — the student recognizes the visual language.
    
    Radial violet glow: center-left, 600px radius, #7C3AED at 12% opacity.
  
  CONTENT (left-aligned, max-width 1160px, centered on page, flex):
  
  LEFT: Score ring + key stats row
  
    SCORE RING (primary focus — 140px diameter):
      Track: rgba(124,58,237,0.12), 10px stroke
      Progress arc: 10px stroke, gradient #7C3AED → #C8FE5A, fills to 73%
      This arc draws in on page load (stroke-dashoffset: 100% → 27%, 
      1.5s cubic-bezier(0.16,1,0.3,1), delay 200ms)
      
      CENTER: "73" Geist Mono 700 48px, #F0EBFF (counts up 0→73, 1.5s)
      Below center number: "/ 100" Geist Mono 400 14px, #4F4866
    
    STUDENT INFO (right of ring, margin-left 28px):
      Name: Bricolage ExtraBold 32px, #F0EBFF — "Priya Sharma"
      Below: JREE ID + exam date + stream
             Geist Mono 400 12px, #4F4866
             "JREE-2026-00847  ·  24 May 2026  ·  Engineering"
      
      BADGE ROW (margin-top 12px, flex, gap 8px):
        Band badge: bg rgba(124,58,237,0.18), border 1px solid #7C3AED,
          border-radius 100px, padding 5px 14px
          "Band B — Nearly Ready" Geist Mono 600 12px, #F0EBFF
          NOTE: Band B uses violet. Band A would use lime. Band C uses amber. 
          Band D uses slate. NEVER red for any band.
        
        Percentile badge: bg rgba(200,254,90,0.1), border 1px solid rgba(200,254,90,0.3)
          "Top 23% nationally" Geist Mono 500 12px, #A8E040 (lime text)
        
        Attempt badge: bg #1D1826, border rgba(124,58,237,0.12)
          "Attempt 1" Geist Mono 400 12px, #4F4866

  TAB BAR (below hero, full width, 52px height):
    Background: #0D0B12
    Border-bottom: 1px solid rgba(124,58,237,0.12)
    Padding: 0 24px
    
    5 tabs, left-aligned, flex, gap 0:
    Each tab: padding 0 24px, height 52px, flex align-center.
    DM Sans 500 14px.
    
    INACTIVE: color #8A8299. 
    On hover: color #F0EBFF.
    
    ACTIVE (Overview selected): color #F0EBFF.
      A 2px bottom border in #C8FE5A (LIME) 
      — NOT violet. The lime underline creates distinction.
      This border animates in (scaleX 0→1, 200ms) when tab becomes active.
    
    Tabs: Overview · Score Breakdown · Role Readiness · Improvement Plan · Certificate

MAIN CONTENT AREA (below tab bar, bg #0B090F, padding 40px):
  Max-width 960px, centered.

  ── 3-STAT BENTO ROW (top of content) ────────────────────────
  
  3 cards. NOT equal weight — they have intentional hierarchy.
  
  CARD 1 — JREE SCORE (largest, 40% width):
    Background: #131018, border rgba(124,58,237,0.22), border-radius 14px,
    padding 28px, grain texture.
    
    Top label: "JREE SCORE" Geist Mono 500 10px, #7C3AED, letter-spacing 0.1em
    
    Number: "72.50" Geist Mono 700 56px, #F0EBFF, line-height 1
    (Counts up on page load, 0→72.50, 1.2s)
    
    Below: "out of 100" DM Sans 400 13px, #4F4866
    
    MINI CONTEXT: A horizontal bar (full width of card interior):
    "Your score puts you in Band B"
    Thin progress bar below: shows 72.50 on a 0-100 scale.
    Track: rgba(124,58,237,0.12). Fill to 72.5%: gradient #7C3AED → #8B5CF6.
    Band markers: tiny ticks at 40 (C→B boundary) and 70 (B→A boundary).
  
  CARD 2 — NATIONAL PERCENTILE (30% width):
    Background: rgba(200,254,90,0.05), border rgba(200,254,90,0.18),
    border-radius 14px, padding 28px, grain texture.
    
    Top label: "NATIONAL PERCENTILE" Geist Mono 500 10px, #A8E040
    
    Number: "77th" Geist Mono 700 56px, #C8FE5A (lime — this is a good number)
    
    Below: "Top 23% of 4,820 students" DM Sans 400 13px, #8A8299
    
    NOTE: "77th" feels aspirational and positive in lime. This is intentional.
    The research confirms Indian graduates understand percentiles as the 
    primary success metric (JEE/NEET conditioning).
  
  CARD 3 — BEST ROLE FIT (30% width):
    Background: #131018, border rgba(45,212,191,0.18), border-radius 14px,
    padding 28px, grain texture.
    
    Top label: "BEST ROLE FIT" Geist Mono 500 10px, #2DD4BF (teal)
    
    Role name: "HR &" + line break + "*People*"
    "HR &" Bricolage ExtraBold 36px, #F0EBFF
    "People" Instrument Serif italic 36px, #2DD4BF (teal)
    
    Below: "76% readiness score" DM Sans 400 13px, #8A8299
    
    Bottom: small link "See all role fits →" DM Sans 500 12px, #7C3AED

  ── EMPLOYER VISIBILITY BANNER ───────────────────────────────
  
  Margin-top 16px. Full width of content area.
  Background: rgba(45,212,191,0.06)
  Border: 1px solid rgba(45,212,191,0.2)
  Border-radius: 12px, padding: 18px 24px
  
  LEFT: teal checkmark circle (28px, bg rgba(45,212,191,0.15), 
         border rgba(45,212,191,0.3)) + "✓" teal
  
  MIDDLE: 
    "Your profile is now visible to employers." 
    DM Sans 600 15px, #F0EBFF
    "Band B qualifies you for the employer pool. 
    Companies can now find and contact you."
    DM Sans 400 13px, #8A8299
  
  RIGHT: "View Profile →" ghost pill, border rgba(45,212,191,0.3), 
         text #2DD4BF, DM Sans 500 13px, height 32px

  ── SHARE ROW ───────────────────────────────────────────────
  
  Margin-top 24px. 3 buttons.
  This row is NOT 3 fully filled buttons in different brand colors.
  That was the problem in the original — visually chaotic.
  
  All 3 are OUTLINED pill buttons. Same height (44px). Same border treatment.
  The lime background is reserved ONLY for the primary CTA on each screen.
  
  Button 1: "↗ Share on LinkedIn"
    Border: 1px solid rgba(124,58,237,0.3), 
    Text: DM Sans 500 14px, #F0EBFF
    Icon: LinkedIn mark (14px, #7C3AED)
    Hover: border-color #7C3AED, bg rgba(124,58,237,0.08)
  
  Button 2: "↗ Share on WhatsApp"  
    Border: 1px solid rgba(124,58,237,0.3),
    Same treatment as LinkedIn button.
    Icon: WhatsApp mark (14px, #7C3AED)
    Hover: same violet treatment
    NOTE: Both share buttons match visually — they are the same action type.
  
  Button 3: "↓ Download Certificate"
    This is the PRIMARY action — it gets the lime treatment.
    Background: #C8FE5A, text: Bricolage ExtraBold 14px, #0B090F
    Box-shadow: 0 4px 20px rgba(200,254,90,0.2)
    Height 44px, border-radius 100px


═══════════════════════════════════════════════════════════════
FIGMA MAKE — VARIABLES AND INTERACTIONS
═══════════════════════════════════════════════════════════════

VARIABLES:
  examProgress (number 0–5) — drives nav progress bar
  currentLayer (string) — "L1"/"L2"/"L3"/"L4"/"L5"
  currentQuestion (number) — drives navigator highlight
  totalAnswered (number) — drives progress counter
  processingStep (number 0–5) — drives loading screen
  allChecksPass (boolean) — drives system check CTA
  checkboxAgreed (boolean) — checkbox in system check
  priyadState (string) — "speaking"/"listening"/"processing"
    drives Priya card border glow + waveform behavior
  scoreCounter (number) — animates 0→73 on results load
  percentileCounter (number) — animates 0→77
  resultsTab (string) — drives active tab in results

INTERACTIONS:
  Answer option click → selectedAnswer variable → triggers option selected state
  "Save & Next" → increments currentQuestion → scrolls navigator highlight
  Layer complete → examProgress + 1 → nav segment fills
  Processing steps → processingStep ticks 1→5 at 1.5s intervals
  All processingStep = 5 → CTA appears (spring entrance)
  Results tab click → resultsTab variable → active tab state

COMPONENT VARIANTS:
  AnswerOption: [default / hover / selected]
  CheckRow: [checking / ready / failed]
  ProcessingStep: [pending / active / complete]
  LayerPill: [completed / active / upcoming]
  QuestionCell: [answered / current / unanswered]
  BandBadge: [band-a-lime / band-b-violet / band-c-amber / band-d-slate]
  TabItem: [inactive / active / hover]
  ShareButton: [outline-violet / filled-lime]

═══════════════════════════════════════════════════════════════
DESIGN PRINCIPLES — DO NOT VIOLATE
═══════════════════════════════════════════════════════════════

1. DARK MODE IS THE ENTIRE PRODUCT.
   Never switch to light gray backgrounds mid-flow. Every screen is dark.
   The empty dashboard, the results page — all #0B090F.

2. LIME BACKGROUNDS ARE SACRED.
   Electric lime #C8FE5A as a background = moments of maximum commitment.
   Only 3 buttons get lime bg: Dashboard "Start Exam", Processing "View Results",
   Results "Download Certificate". Everything else uses violet, ghost, or outline.

3. NEVER USE RED FOR SCORES OR BANDS.
   Band D = slate gray #64748B. Low scores = amber #D97706.
   Red #F87171 is ONLY for system-level errors (camera failed, connection lost)
   and the "muted" microphone state. Per research: red = platform abandonment.

4. PERCENTILE LEADS, SCORE FOLLOWS.
   In the results page, the national percentile (77th) in LIME is the 
   emotional win. The absolute score (72.50) is the factual detail.
   This matches Indian graduate psychology — they are percentile-conditioned.

5. PRIYA IS A CHARACTER, NOT A PLACEHOLDER.
   Her card must have a warm illustrated presence — even if it's a flat 
   illustration. The "generic avatar blob" from the original designs must 
   be replaced with something that communicates warmth and personality.

6. REASSURANCE > SURVEILLANCE.
   Every security/proctoring signal must be phrased as confidence-building.
   "Your connection is verified and secure" instead of "Anti-cheat active".
   "Smart Check Active" instead of "You are being monitored".

7. THE TIMER IS NEVER RED.
   The global timer becomes amber at 10 minutes, softly pulses at 5 minutes.
   The per-question bar smoothly recedes. No flashing. No red. Ever.

8. GRAIN TEXTURE ON EVERY CARD.
   This single CSS detail is the line between "generic dark UI" and premium.
   Every Surface L1 card (#131018) gets the noise grain filter applied.

9. FONT DISCIPLINE.
   Geist Mono: ALL numbers, stats, IDs, timers, percentages, layer labels.
   Instrument Serif italic: ONE accent word per major heading.
   Bricolage ExtraBold: ALL display headings.
   DM Sans: ALL body copy, labels, microcopy.
   Mixing these outside these roles breaks the visual system.

10. SPACE IS PREMIUM.
    The original designs were crowded in some places and empty in others.
    Give content room. A 52px nav with nothing but wordmark + progress bar 
    is not wasted space — it's confidence. Don't fill every pixel.