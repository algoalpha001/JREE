═══════════════════════════════════════════════════════════════
JREE RESULTS PAGE — TABS 2 THROUGH 5
Score Breakdown · Role Readiness · Improvement Plan · Certificate
Design System: "Proof of Work" — inherit all tokens from Phase 1
═══════════════════════════════════════════════════════════════

INHERIT FULLY: All colors, fonts, surface treatments, grain textures,
and component variants from the previous Results Overview prompt.
The nav shell, hero header with ghost "73", tab bar, and student
identity strip remain IDENTICAL across all 5 tabs.
Only the content area below the tab bar changes per tab.

The tab bar active indicator: 2px bottom border in #C8FE5A (lime).
Slides horizontally between tabs (translateX animation, 200ms ease-out).

═══════════════════════════════════════════════
TAB 2 — SCORE BREAKDOWN
═══════════════════════════════════════════════

UX GOAL: Show exactly which of the 5 layers drove the final score.
Students must understand WHY they got 72.50, not just THAT they did.
Research: segmented horizontal bars are the highest-comprehension
visualization for this audience. NO radar charts. NO scatter plots.

CONTENT LAYOUT (below tab bar, max-width 960px, centered, padding 40px):

SECTION HEADING:
  Eyebrow: "YOUR 5-LAYER BREAKDOWN" Geist Mono 500 10px, #7C3AED
  Heading: "Where your *score* came from."
    "Where your score came from." Bricolage ExtraBold 40px, #F0EBFF
    "score" replaced with Instrument Serif italic, #A8E040

LAYER CARDS (5 cards stacked, gap 16px):
Each card: bg #131018, border rgba(124,58,237,0.15), border-radius 14px,
padding 28px, grain texture.
Box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset.

Card layout: 3-column grid.
  LEFT (25%): Layer identity
  CENTER (50%): Score bar visualization
  RIGHT (25%): Score number + improvement CTA

── CARD 1: L1 · Cognitive Ability ──
  Weight: 25% of total score.
  Student score for this layer: 79 / 100

  LEFT:
    Layer badge: "L1" Geist Mono 700 11px in a 28px circle,
    bg rgba(124,58,237,0.2), border rgba(124,58,237,0.3), text #F0EBFF
    Layer name: "Cognitive Ability" DM Sans 600 15px, #F0EBFF
    Weight: "25% weight" Geist Mono 400 11px, #4F4866
    Sub: "Logical reasoning, pattern recognition, numerical ability"
    DM Sans 400 12px, #8A8299, line-height 1.5

  CENTER:
    Label row (above bar): left "0" · right "100" · center score marker
    All: Geist Mono 400 10px, #4F4866

    MAIN BAR: height 12px, border-radius 100px, full column width.
      Track: rgba(124,58,237,0.12)
      Fill: animates width 0 → 79% on tab load (800ms ease-out, delay staggered
      per card: L1 0ms, L2 100ms, L3 200ms, L4 300ms, L5 400ms)
      Fill color: violet-to-lime gradient #7C3AED → #C8FE5A
        (gradient position reflects score — higher score = more lime visible)

    SCORE MARKER: A 16px circle positioned at the 79% mark on the bar.
      bg #C8FE5A, box-shadow 0 0 8px rgba(200,254,90,0.4).
      Inside: no text — it's a visual anchor only.

    BENCHMARK LINE: A thin 2px vertical line at the national average position
    (e.g., 68% for this layer). Color: rgba(255,255,255,0.2). Dashed.
    Small label above: "Avg" Geist Mono 400 9px, #4F4866.

    BELOW BAR: "You scored above the national average for this layer."
    DM Sans 400 12px, #2DD4BF (teal — positive framing). italic.
    If below average: "You are 12 points below the national average."
    DM Sans 400 12px, #D97706 (amber — growth framing, NEVER red).

  RIGHT:
    Score: "79" Geist Mono 700 40px, #F0EBFF
    "/ 100" Geist Mono 400 14px, #4F4866
    Below score: band chip for this layer:
      Score 80+: lime bg rgba(200,254,90,0.12), border lime, text #A8E040 "Strong"
      Score 60-79: violet bg, border violet, text #F0EBFF "Good"
      Score 40-59: amber bg, border amber, text #D97706 "Developing"
      Score <40: slate bg, border slate, text #64748B "Needs Work"
    (Priya's score = 79 → "Good" in violet)

    Micro CTA: "Practice L1 →" DM Sans 500 12px, #7C3AED (text link, no border)

── CARD 2: L2 · Professional Communication ──
  Weight: 20%. Score: 74.

  Same structure. Bar fills to 74%.
  Benchmark line at ~65% (avg).
  Above average → teal message.
  Band chip: "Good" violet.

── CARD 3: L3 · Domain Knowledge ──
  Weight: 25%. Score: 68.

  Same structure. Bar fills to 68%.
  Benchmark line at 72% (avg for Engineering stream).
  BELOW average → amber message: "You are 4 points below the avg for 
  Engineering students. This is your highest-leverage area to improve."
  Band chip: "Good" violet (68 > 60).
  Micro CTA: "Domain Practice →" in amber #D97706 (signals opportunity).

── CARD 4: L4 · Workplace Decision Making (SJT) ──
  Weight: 15%. Score: 71.
  Above average. Teal message.

── CARD 5: L5 · AI Video Interview (Priya) ──
  Weight: 15%. Score: 77.
  This card is SPECIAL. Give it distinct treatment.

  Background: rgba(124,58,237,0.06) (slightly violet-tinted, distinguishes it)
  Border: rgba(124,58,237,0.25) (more prominent)
  Border-left: 3px solid #7C3AED (accent left rule — signals "unique layer")

  LEFT also includes: a small Priya avatar thumbnail (40px circle, 
  violet gradient with illustrated silhouette) above the layer name.
  Below name: "Assessed by Priya · 5 questions" DM Sans 400 11px, #4F4866

  RIGHT score: "77" in lime #C8FE5A (Priya's section is the standout performer)
  Band chip: "Strong" in lime.
  Below: "Top 18% nationally on AI interview" Geist Mono 400 11px, #A8E040

COMPOSITE SUMMARY ROW (below 5 cards, margin-top 24px):
  A single full-width card, height 80px.
  Background: rgba(200,254,90,0.05)
  Border: 1px solid rgba(200,254,90,0.2)
  Border-radius: 14px

  Layout: flex, align-center, space-between.
  LEFT: "Weighted composite" DM Sans 500 14px, #8A8299
  CENTER: "72.50 / 100" Geist Mono 700 32px, #F0EBFF
          below: "Band B — Nearly Ready" chip (same as header)
  RIGHT: "Your strongest layer: AI Interview (77)"
         DM Sans 400 13px, #8A8299
         "Your growth lever: Domain Knowledge (68)"
         DM Sans 400 13px, #D97706 (amber)


═══════════════════════════════════════════════
TAB 3 — ROLE READINESS
═══════════════════════════════════════════════

UX GOAL: Show the student WHICH roles they're ready for right now,
and what it takes to unlock the next tier. The research's "Opportunity
Unlock Overlay" pattern applies here — lock high-paying roles behind
a visible but attainable improvement bar.

SECTION HEADING:
  Eyebrow: "YOUR ROLE FIT PROFILE"
  Heading: "You're ready for *these* roles."
    "these" in Instrument Serif italic, lime.

ROLE READINESS BENTO (4 role cards, 2×2 grid, gap 16px):

Each card: bg #131018, border-radius 14px, padding 28px, grain texture.
Show: HR & People (76%), Product & Strategy (71%), Operations (68%), 
      Software Engineering (45%).

── BEST FIT CARD (HR & People — 76%) ──
  Border: 1.5px solid #2DD4BF (teal — best fit gets teal border)
  Top-right: "BEST FIT" badge — bg rgba(45,212,191,0.12),
             border rgba(45,212,191,0.3), Geist Mono 600 10px, #2DD4BF

  Role icon: 40px circle, bg rgba(45,212,191,0.12), 
             a people/org icon in teal
  Role name: Bricolage ExtraBold 24px, #F0EBFF — "HR & People"
  Subtitle: "Talent acquisition, L&D, HR operations, culture"
             DM Sans 400 13px, #8A8299

  READINESS BAR:
    Label: "Role Readiness" DM Sans 400 12px, #4F4866
    Bar: same horizontal bar as breakdown tab.
    Fill: teal #2DD4BF at 76%, border-radius 100px, height 8px.
    Score marker at 76%.
    "76% readiness" Geist Mono 600 12px, #2DD4BF right-aligned.

  LAYER MATCH BREAKDOWN (below bar):
    3 mini rows showing which layers drive this role fit:
    "Communication · 35% weight for this role" — teal dot, DM Sans 400 11px
    "SJT · 25% weight" — teal dot
    "Domain Knowledge · 20% weight" — amber dot (your weak layer)

  CTA: "See open HR roles →" DM Sans 500 13px, #2DD4BF (text link)

── GOOD FIT CARD (Product & Strategy — 71%) ──
  Border: rgba(124,58,237,0.22) (violet — good fit gets violet)
  "GOOD FIT" badge in violet.
  Same structure. Bar fills to 71% in violet.

── DEVELOPING FIT CARD (Operations — 68%) ──
  Border: rgba(217,119,6,0.2) (amber — developing)
  "DEVELOPING" badge in amber.
  Bar fills to 68% in amber.
  Opportunity line: "+5 points in Domain unlocks this role fully"
  DM Sans 400 12px, #D97706 italics.

── LOCKED CARD (Software Engineering — 45%) ──
  Background: #0F0D14 (darkest — locked state)
  Border: rgba(124,58,237,0.08) (near invisible)
  Entire card has 60% opacity overlay: rgba(11,9,15,0.5) applied as
  a pseudo-element over the card content.

  Top: 🔒 lock icon (20px, #4F4866) + "Locked" Geist Mono 500 11px, #4F4866
  Role name: "Software Engineering" Bricolage ExtraBold 24px, #4F4866 (ghost)
  Bar: fill only 45%, color #4F4866 (gray — not scored/achievable)

  UNLOCK PROMPT CARD (within the locked card, below the bar):
    bg rgba(124,58,237,0.08), border-radius 10px, padding 14px
    "Requires Band A in Domain Knowledge."
    DM Sans 400 13px, #8A8299
    "You are currently at 68. Boost by 12 points."
    DM Sans 400 13px, #D97706 (amber — opportunity)
    CTA: "Practice Domain →" DM Sans 500 13px, #7C3AED (text link)
    (This is the research's "Opportunity Unlock Overlay" pattern executed.)

NATIONAL CONTEXT ROW (below 4 cards, margin-top 24px):
  A full-width banner.
  bg rgba(124,58,237,0.06), border rgba(124,58,237,0.15), border-radius 12px.
  Padding 20px 24px. Flex, space-between.

  LEFT: "Among Engineering graduates at your band level:"
        DM Sans 400 14px, #8A8299
  CENTER: "Top 8% for HR & People readiness"
          Geist Mono 600 14px, #A8E040
  RIGHT: "→ See employers hiring for HR roles" DM Sans 500 13px, #7C3AED


═══════════════════════════════════════════════
TAB 4 — IMPROVEMENT PLAN
═══════════════════════════════════════════════

UX GOAL: Turn the score into an active roadmap. This tab is the
"Continuous Upskilling Flywheel" from the research — the feature
that makes JREE different from dead-end assessment platforms.
The student should leave this tab knowing EXACTLY what to do tomorrow.

Research imperative: "Bridge the Gap" section. When student clicks a
layer, it slides open to reveal a micro-learning path. Every score
must connect to an actionable next step.

SECTION HEADING:
  Eyebrow: "YOUR PERSONAL ROADMAP"
  Heading: "From Band B to *Band A.*"
    "Band A." in Instrument Serif italic, lime.
  Sub: "3 focused improvements. That's all it takes."
       DM Sans 400 16px, #8A8299

PLACEMENT-READY STREAK WIDGET (top of content, full width):
  bg rgba(124,58,237,0.08), border rgba(124,58,237,0.18),
  border-radius 14px, padding 20px 24px. Flex, align-center.

  LEFT: flame icon (24px, violet gradient → lime, like a violet flame).
        "Placement-Ready Streak" DM Sans 600 14px, #F0EBFF
        "Solve 5 quick questions daily to stay sharp." DM Sans 400 12px, #8A8299
  CENTER: "4" Geist Mono 700 40px, #C8FE5A + "day streak" DM Sans 400 12px, #A8E040
           below: 7 day dots in a row. Past 4 filled violet. Today filled lime.
           Future 2: ghost rgba(124,58,237,0.15).
  RIGHT: "Today's 5-question drill →" 
         Height 36px, border-radius 100px, bg #C8FE5A,
         Text: Bricolage ExtraBold 13px, #0B090F

3 IMPROVEMENT CARDS (stacked, gap 16px, margin-top 24px):
Each card is an EXPANDABLE ACCORDION. Default state: collapsed (height 80px).
Click the card → expands to full content (max-height animation, 350ms ease).

── IMPROVEMENT 1: DOMAIN KNOWLEDGE (Highest priority) ──
  Default collapsed row:
    LEFT: Priority badge "1" (28px circle, bg #C8FE5A, text #0B090F,
          Geist Mono 700 13px) — lime means highest priority.
    MIDDLE: "Domain Knowledge" Bricolage ExtraBold 18px, #F0EBFF
            "68 / 100 · 4 points below avg" DM Sans 400 13px, #D97706
    RIGHT: "Expand" chevron (›) rotating 90° when open.
           "+7 points → Band A" Geist Mono 500 12px, #A8E040

    Collapsed card border-left: 3px solid #C8FE5A (lime = top priority)
    Collapsed card bg: #131018

  EXPANDED CONTENT (below the header row):
    Separator: 1px rgba(124,58,237,0.12)

    WHY THIS MATTERS (margin-top 16px):
      "Domain Knowledge is 25% of your total score and directly
      gates Software Engineering and Product roles. This is your
      highest-leverage improvement."
      DM Sans 400 14px, #8A8299, line-height 1.6.

    MICRO-LEARNING MODULES (3 cards in a horizontal scroll row):
      Each module card: 240px × 120px, bg #1D1826, border-radius 12px,
      border rgba(124,58,237,0.15), padding 16px.

      Module 1: "Engineering Fundamentals Drill"
        Duration badge: "15 min" — Geist Mono 500 10px, lime bg, black text.
        Expected gain: "+3 pts" Geist Mono 600 14px, teal.
        CTA: "Start →" DM Sans 500 13px, #7C3AED

      Module 2: "Mechanical Systems Concepts"
        Duration: "20 min"
        Gain: "+2 pts"
        Status: Locked (visible but dimmed) — "Complete Module 1 first"

      Module 3: "Domain Mock Test"
        Duration: "25 min"
        Gain: "+2 pts"
        Status: Locked until Module 2 done.

      This progressive unlock is Khan Academy's mastery grid pattern.
      It focuses on what to "unlock next" rather than current failure.

    PROGRESS PROJECTION (below modules):
      A simple projected score bar:
      Current: 68 ■■■■■■■□□□ 100
      After modules: projected "75" shown with dotted line extension.
      "Complete all 3 → estimated +7 points" DM Sans 400 12px, #A8E040

── IMPROVEMENT 2: PROFESSIONAL COMMUNICATION ──
  Priority badge "2" — violet background (second priority).
  Score: 74 / 100. "+6 points → solidly in Band A range"
  Border-left: 3px solid #7C3AED (violet = second priority)

  Expanded: 2 modules + writing drill.

── IMPROVEMENT 3: OVERALL BAND PROGRESSION ──
  Priority badge "3" — slate background.
  This card shows the band progression meter.
  Current: Band B (72.50). Target: Band A (80+). Gap: 7.5 points.

  BAND PROGRESSION METER (the LinkedIn profile strength equivalent):
    Horizontal multi-step bar, 5 positions: D · C · B · A · A+
    Current position marked with violet circle at "B".
    Target highlighted at "A" with lime ring.
    Distance bar between B and A: fill amber, shows gap visually.
    "7.5 points to Band A" Geist Mono 600 12px, #D97706 (amber).
    "Re-take available after 30 days" DM Sans 400 11px, #4F4866

  Below: "80% of Band B students reach Band A on their second attempt
          within 60 days with focused practice."
          DM Sans 400 13px, #8A8299. italic.

RE-TEST CTA ROW (below 3 cards, margin-top 24px):
  Full width, flex, gap 16px.
  "Schedule Re-Test" — ghost button, border violet, text #F0EBFF, height 44px
  "Remind me in 30 days" — text link, DM Sans 400 13px, #4F4866
  This re-test option is PROMINENTLY placed — never hidden. Research explicitly
  warns against the "Disconnected Re-Test Wall" anti-pattern.


═══════════════════════════════════════════════
TAB 5 — CERTIFICATE
═══════════════════════════════════════════════

UX GOAL: This tab is the student's shareable asset.
It must look prestigious — worth printing, worth sharing on LinkedIn,
worth showing to parents (the "parent share dynamic" from research).
The certificate is JREE's organic growth engine.

SECTION HEADING:
  Eyebrow: "YOUR VERIFIED CREDENTIAL"
  Heading: "Your *proof.*"
    "proof." in Instrument Serif italic, lime.

CERTIFICATE PREVIEW (centered, max-width 680px):
This is a rendered preview of the actual PDF certificate.
Design it as a distinct artifact — NOT the same dark UI language.
The certificate intentionally uses a DIFFERENT visual register:
Premium white background, formal typography, gold accents.
It is a credential, not an app screen.

CERTIFICATE FRAME:
  Background: #FEFEFE (near white — intentional departure from dark bg)
  Border: 1px solid #E5E7EB (outer card border in the dark UI)
  Border-radius: 8px (less rounded than UI cards — more formal)
  Box-shadow: 0 24px 64px rgba(0,0,0,0.4) (deep shadow — makes it pop on dark bg)
  Aspect ratio: A4 landscape — approximately 680px × 480px in preview.
  Padding: 48px

  CERTIFICATE CONTENTS:

  TOP STRIP: 
    Left: "JREE" wordmark in deep violet #1E1B4B, Bricolage ExtraBold 18px.
    Right: "EduBridge Pvt. Ltd." DM Sans 400 11px, #6B7280.
    Between: a thin horizontal rule in gold #D97706, 1px.

  CENTER CONTENT (top-to-bottom, center-aligned):

    TITLE BLOCK:
      "NATIONAL JOB READINESS ENTRANCE EXAM"
      DM Sans 500 11px, #6B7280, letter-spacing 0.15em, uppercase.

      "CERTIFICATE OF ASSESSMENT"
      Bricolage Grotesque ExtraBold 20px, #1E1B4B, letter-spacing -0.02em.

    RECIPIENT BLOCK (margin-top 24px):
      "This certifies that"
      DM Sans 400 13px, #6B7280.

      "Priya Sharma"
      Instrument Serif 400 (NOT italic here — serif regular for formal names),
      48px, #1E1B4B. This is the most prominent text on the certificate.
      A thin gold underline (#D97706, 1px) below the name, width matches name.

      "has successfully completed the JREE assessment and is awarded"
      DM Sans 400 13px, #6B7280, margin-top 8px.

    BAND BLOCK (margin-top 16px):
      "EMPLOYABILITY BAND B"
      Bricolage ExtraBold 28px, #1E1B4B. Center.
      "(72.50 / 100 · National Percentile: 77th)"
      DM Sans 400 13px, #6B7280. Center.

    SCORE VISUALIZATION (inline, within certificate):
      Small score ring (64px) rendered in violet/gold palette.
      Track: #E5E7EB. Fill: #1E1B4B at 72.5%.
      Center: "73" DM Sans 700 22px, #1E1B4B.
      Sits left of the band text. Band text right of ring. Flex row.

  BOTTOM STRIP:
    3-column flex, align-center.

    LEFT: Official signature placeholder (a horizontal line, 80px wide)
          "Director, EduBridge Pvt. Ltd." DM Sans 400 10px, #9CA3AF below.

    CENTER: JREE emblem — a circular seal (48px diameter).
            Outer ring: thin gold border (#D97706).
            Inner: "JREE" Bricolage ExtraBold 10px, #1E1B4B.
            "VERIFIED" arc text around inner circle.
            This is the trust anchor.

    RIGHT: QR code placeholder (48px × 48px, grid of dark squares on white bg).
           "Scan to verify" DM Sans 400 9px, #9CA3AF below.
           "jree.in/verify/JREE-2026-00847" Geist Mono 400 8px, #9CA3AF.

  EXAM METADATA (below main content, above bottom strip):
    A thin horizontal rule, then:
    "Exam ID: JREE-2026-00847  ·  Exam Date: 24 May 2026  ·  
    Stream: Engineering  ·  Attempt: 1"
    Geist Mono 400 9px, #9CA3AF, center-aligned.

SHARE + DOWNLOAD ROW (below certificate preview, margin-top 24px):

  3 ACTIONS:

  "↓ Download PDF" — PRIMARY ACTION
    bg #C8FE5A (lime), Bricolage ExtraBold 14px, #0B090F
    Height 44px, border-radius 100px, padding 0 28px
    Hover: glow, scale 1.02

  "↗ Add to LinkedIn"
    Ghost button, border rgba(124,58,237,0.3),
    DM Sans 500 14px, #F0EBFF
    On click: opens LinkedIn "Add Certification" pre-filled URL.
    Tooltip below: "Adds to your Licenses & Certifications section"
    DM Sans 400 11px, #4F4866

  "↗ Share on WhatsApp"
    Ghost button, same treatment.
    "Share your Band B nationally" DM Sans 400 11px, #4F4866 below.

PARENT SHARE NUDGE (below 3 buttons, margin-top 20px):
  Centered.
  "Share with family:" DM Sans 400 13px, #4F4866
  A single special button: "Send family card on WhatsApp"
    bg rgba(124,58,237,0.08), border rgba(124,58,237,0.2),
    border-radius 100px, height 36px, padding 0 20px.
    Text: DM Sans 500 13px, #F0EBFF.
    Icon: WhatsApp green dot (8px) left of text.
  Below: "(This generates a beautiful Hinglish card: 
  'Priya ne JREE Band B achieve ki — Top 23% nationally')"
  DM Sans 400 11px, #4F4866, italic.
  (Research: parent-share dynamic is a powerful retention driver.)

RECRUITER VERIFICATION SECTION (below share row, margin-top 32px):
  Eyebrow: "FOR EMPLOYERS"
  Heading: "Verify this certificate in 5 seconds."
  Sub: "Any recruiter can scan the QR code or enter the ID below."
        DM Sans 400 14px, #8A8299.

  VERIFICATION INPUT ROW (flex):
    Input: height 44px, bg #131018, border rgba(124,58,237,0.2),
           border-radius 10px, padding 0 16px.
           Pre-filled: "JREE-2026-00847" Geist Mono 400 14px, #F0EBFF.
           Trailing copy icon (16px, #4F4866).
    CTA: "Verify →" height 44px, border-radius 10px,
         bg #7C3AED, text DM Sans 600 14px, #F0EBFF.

  VERIFIED BANNER (below input — shown by default since this is the student's view):
    bg rgba(45,212,191,0.06), border rgba(45,212,191,0.2),
    border-radius 10px, padding 16px 20px.
    "✓ Verified" DM Sans 600 14px, #2DD4BF.
    "This certificate is authentic, unaltered, and currently valid."
    DM Sans 400 13px, #8A8299.
    "Certificate status: Active · Valid until: May 2028"
    Geist Mono 400 12px, #4F4866.