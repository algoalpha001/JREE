═══════════════════════════════════════════════════════════════
JREE LANDING PAGE — LEARNER LIFECYCLE SECTION
"The Loop That Gets You Hired"
Replaces the previous How It Works journey section entirely.
Design System: Full "Proof of Work" token inheritance.
═══════════════════════════════════════════════════════════════

DESIGN CONCEPT: "THE CIRCUIT"
Not a flowchart. Not a numbered list.
A horizontal bento constellation — 6 live data nodes connected
by an animated electric circuit line that draws itself on scroll.
Each node contains actual JREE UI data, not just icons and labels.
The student scrolls and watches their future unfold in front of them.

Background: #0B090F (continuous with the rest of the page, no break)

═══════════════════════════════════════════════
SECTION HEADER
═══════════════════════════════════════════════

Left-aligned. Max-width 560px.

Eyebrow: "THE JREE LOOP" — Geist Mono 500 10px, #7C3AED,
         letter-spacing 0.14em, uppercase.

Heading (2 lines):
  Line 1: "From blank page"
  Line 2: "to *hired.*"
  Both lines: Bricolage Grotesque ExtraBold, 72px desktop / 44px mobile
  Color: #F0EBFF, letter-spacing -0.04em, line-height 0.95.
  "hired." — Instrument Serif italic 72px, #C8FE5A (lime).
  The contrast between the grotesque and the serif italic creates
  the visual tension that IS the design signature.

Right side of header (positioned right, top-aligned, max-width 340px):
  "Most assessment platforms end at the score.
  JREE begins there. Every score unlocks the next stage
  — training, re-testing, and finally, the right job."
  DM Sans 400, 17px, #8A8299, line-height 1.65.
  Below: a thin 1px horizontal rule in rgba(124,58,237,0.2), 
         full width of this paragraph.

SCROLL INDICATOR (below header, center-aligned):
  "→ Follow the circuit" DM Sans 400 12px, #4F4866
  A small animated arrow bouncing horizontally (translateX 0→8px→0, 1.5s infinite)
  This primes the user to scroll horizontally on mobile, 
  or to simply scroll down on desktop to watch the animation trigger.

═══════════════════════════════════════════════
THE CIRCUIT — MAIN VISUALIZATION
═══════════════════════════════════════════════

CONTAINER: Full section width, height 520px desktop / auto mobile.
Overflow: visible (nodes can cast box shadows outside container).
Position: relative.

── THE CIRCUIT LINE ────────────────────────────────────────────

An SVG path that winds horizontally across the section connecting
all 6 nodes. This is NOT a straight line.

Path character: The line has organic curves — it dips slightly below
center between nodes, then rises to meet each node's entry point.
Like a heartbeat trace or an audio waveform between beats.

SVG path style:
  Stroke: 1.5px
  Color: linear gradient along the path —
    Start (node 1): rgba(124,58,237,0.3) (violet, dim)
    After node 2: rgba(124,58,237,0.6)
    After node 3: rgba(200,254,90,0.5) (transitions to lime mid-journey)
    After node 4: rgba(200,254,90,0.7)
    End (node 6): rgba(45,212,191,0.8) (arrives at teal — success)
  Stroke-dasharray: total path length (calculate via JS)
  Stroke-dashoffset: starts at full path length (line invisible)

SCROLL ANIMATION:
  As user scrolls through this section, stroke-dashoffset decreases
  proportionally — the line DRAWS itself from left to right.
  At 0% scroll through section: line is invisible (dashoffset = full length)
  At 100% scroll through section: line is fully drawn (dashoffset = 0)
  
  This is the core delight mechanic — the user literally draws the
  circuit by scrolling.

TRAVELING SPARK:
  A small glowing dot (8px circle, white at center, violet glow outer ring:
  box-shadow 0 0 12px #7C3AED, 0 0 4px white) travels along the path.
  Speed: matches the scroll progress.
  At each node: the spark "enters" the node (dot disappears into the node),
  the node activates (springs to life with a 200ms scale animation),
  then the spark "exits" from the right side of the node continuing forward.
  
  This single mechanic creates the feeling that electricity is flowing
  through a circuit, activating each stage.

── THE 6 NODES ─────────────────────────────────────────────────

POSITIONING:
Desktop: Nodes spread horizontally across the full section width.
  Node spacing: approximately equal, with slight Y variation:
  Node 1: y = center
  Node 2: y = center - 20px (slight rise)
  Node 3: y = center + 15px (slight dip)
  Node 4: y = center - 25px (rise again)
  Node 5: y = center + 10px (dip)
  Node 6: y = center (return to center — journey complete)
  
  This Y variation makes the circuit feel organic, not mechanical.

Mobile: Nodes stack vertically with the circuit line running down the left side
  as a vertical track. Each node sits to the right of the line, at full width.

NODE ANATOMY (before activation):
  State: dormant
  bg: rgba(13,12,18,0.6) (near invisible — like a ghost card)
  border: 1px solid rgba(124,58,237,0.08) (barely visible)
  border-radius: 16px
  Scale: 0.94 (slightly reduced — grows to 1.0 on activation)
  Opacity: 0.5

NODE ANATOMY (after activation via scroll):
  Scale spring to 1.0 (cubic-bezier(0.16,1,0.3,1), 300ms)
  Opacity: 1.0
  bg: #131018 (solid card surface)
  border: 1px solid respective node accent color
  Grain texture applied to all active node cards.
  Box-shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 
              0 16px 40px rgba(0,0,0,0.4)

Each node has a NODE INDEX NUMBER positioned OUTSIDE the card,
connected to the circuit entry point.
Style: Geist Mono 700, 11px, color = circuit line color at that point.
Format: "01" "02" "03" "04" "05" "06"
Position: above-left of card entry point (12px above where line meets card).

════════════════════════════
NODE 01 — TAKE THE EXAM
Card size: 200px × 260px
Accent color: rgba(124,58,237,0.3) (violet border)
════════════════════════════

TOP ROW:
  Stage chip: "EXAM" Geist Mono 600 9px, #7C3AED, 
              bg rgba(124,58,237,0.12), border rgba(124,58,237,0.2),
              border-radius 100px, padding 3px 8px.
  Right: "90 min" Geist Mono 400 9px, #4F4866.

NODE VISUAL (the live data inside the card):
  A miniaturized exam question card.
  bg #1D1826, border-radius 10px, padding 14px, margin 10px 0.
  
  "Q4 of 16" Geist Mono 400 9px, #4F4866 top-left.
  Question text (truncated): "Your manager needs a client presentation by 9 AM—"
  DM Sans 400 11px, #8A8299, line-height 1.4. Fades out with gradient.
  
  3 mini answer option pills (each: full width, height 20px, border-radius 4px):
    Option A: bg #1D1826, border rgba(124,58,237,0.1), DM Sans 400 9px, #4F4866
    Option B: bg rgba(124,58,237,0.15), border #7C3AED (SELECTED)
    Option C: bg #1D1826, border rgba(124,58,237,0.1)
  
  This micro-UI inside the node IS the design twist — it shows JREE,
  not a generic icon of a paper and pencil.

BOTTOM OF CARD:
  "5 layers · 80 questions" DM Sans 400 10px, #4F4866.
  A mini 5-segment progress bar (same as exam nav shell), 6px height.
  All segments: ghost (upcoming). One segment: half-filled (in progress).

NODE LABEL (below card, outside):
  "Take the *Exam*"
  "Take the" DM Sans 500 14px, #8A8299
  "Exam" Instrument Serif italic 14px, #F0EBFF

════════════════════════════
NODE 02 — GET YOUR SCORE
Card size: 220px × 260px
Accent: rgba(200,254,90,0.25) (lime border — score is the first win)
════════════════════════════

TOP ROW: Stage chip "SCORE" in lime colors.

NODE VISUAL:
  Center: The miniature score ring (80px diameter).
  
  Track: rgba(124,58,237,0.12), 8px stroke.
  Arc: gradient #7C3AED → #C8FE5A, fills to 73%.
  
  ANIMATION when node activates (on scroll trigger):
    Arc draws from 0 → 73% (stroke-dashoffset animation, 1.2s ease-out).
    Center number counts: "0" → "73" (Geist Mono 700 28px, #F0EBFF).
    This counter animation fires ONCE when the spark enters this node.
  
  Below ring: "Band B" chip (violet bg, Geist Mono 600 11px, #F0EBFF).
  "77th percentile" Geist Mono 500 10px, #A8E040 (lime text).
  
  National rank strip: "Top 23% of 4,820 students"
  DM Sans 400 10px, #8A8299. text-center.

BOTTOM: "Instant results" DM Sans 400 10px, #4F4866.

NODE LABEL: "Your *Score*"

CONNECTOR NOTE (on the circuit line BETWEEN node 02 and 03):
  A small floating label on the line itself:
  "If gap identified →" DM Sans 400 10px, #4F4866, italic.
  bg rgba(11,9,15,0.9), padding 2px 8px, border-radius 100px.
  border: 1px solid rgba(124,58,237,0.12).
  This contextualizes WHY the loop continues past the score.

════════════════════════════
NODE 03 — SEE YOUR GAP MAP
Card size: 240px × 300px (tallest card — most data)
Accent: rgba(217,119,6,0.25) (amber border — gap = opportunity)
════════════════════════════

TOP ROW: Stage chip "GAP MAP" in amber #D97706.

NODE VISUAL (5 mini layer bars):
  Label: "Your 5 layers" Geist Mono 500 9px, #4F4866, uppercase, margin-bottom 8px.
  
  5 MINI BARS (gap 6px each):
  Each row: layer label left (Geist Mono 400 9px, #4F4866, width 48px) +
            bar (flex-1, height 6px, border-radius 100px) +
            score right (Geist Mono 600 9px, 28px width)
  
  Track: rgba(124,58,237,0.12). 
  Fill color based on score:
    L1 · Cognitive   ████████░░  79  (violet fill, above avg)
    L2 · English     ███████░░░  74  (violet fill)
    L3 · Domain      ██████░░░░  68  (amber fill — below avg, the gap)
    L4 · SJT         ███████░░░  71  (violet fill)
    L5 · Interview   ████████░░  77  (teal fill — best layer)
  
  L3 bar has a special treatment:
    Amber fill color #D97706 (immediately visually distinct).
    A small "▲ GAP" label appears above the L3 row (Geist Mono 400 8px, #D97706).
    This arrow points to the gap visually.
  
  ANIMATION when activated:
    All 5 bars animate from 0 → final width simultaneously (600ms ease-out).
    L3 amber bar slightly lags (+100ms delay) then animates to its value —
    the brief delay draws the eye to the gap.

BOTTOM: "Domain Knowledge is your lever." DM Sans 400 10px, #D97706, italic.

NODE LABEL: "Your *Gap Map*"

════════════════════════════
NODE 04 — TRAINING MODULES
Card size: 220px × 280px
Accent: rgba(124,58,237,0.35) (violet — action phase begins)
════════════════════════════

TOP ROW: Stage chip "TRAINING" in violet.

NODE VISUAL (stacked module cards):
  3 mini module cards stacked, slight offset (each 4px lower and 4px right).
  Creates a "deck of cards" depth illusion.
  
  Each card: bg #1D1826, border-radius 8px, padding 10px 12px,
             border 1px solid rgba(124,58,237,0.12), width 100%.
  
  VISIBLE CARD (top of stack):
    Left: a progress indicator circle (20px, border 2px solid #7C3AED,
          fill 0% — incomplete. Inner arc at 0%).
    Center: "Domain Engineering Drill" DM Sans 500 11px, #F0EBFF.
            "15 min · +3 pts expected" DM Sans 400 9px, #8A8299.
    Right: "→" DM Sans 500 12px, #7C3AED.
  
  PARTIALLY VISIBLE CARD (2nd in stack, 70% visible):
    Slightly dimmer. "Mechanical Systems Concepts" DM Sans 400 10px, #8A8299.
  
  GHOST CARD (bottom of stack, 40% visible):
    "Domain Mock Test" DM Sans 400 9px, #4F4866.

  LOCK ICON on cards 2+3:
    Small 🔒 (12px, #4F4866) left of text on locked cards.
    "Complete module 1 first" DM Sans 400 8px, #4F4866 on card 2.
    
  This progressive lock pattern (from the research's Khan Academy reference)
  is rendered inside this tiny node card.

BOTTOM ROW:
  3 small stats in a row:
  "3 modules" · "45 min" · "+7 pts"
  Geist Mono 500 9px, #4F4866. Separated by · in violet.

NODE LABEL: "*Training* Modules"

════════════════════════════
NODE 05 — RE-TEST
Card size: 220px × 260px
Accent: rgba(124,58,237,0.3) (violet — same journey, new score)
════════════════════════════

TOP ROW: Stage chip "RE-TEST" in violet. 
         + "30 days later" Geist Mono 400 9px, #4F4866 right-aligned.

NODE VISUAL — BEFORE / AFTER score comparison:
  
  Two rings side by side (each 56px diameter).
  
  LEFT RING (BEFORE):
    Arc: 72.5% fill, violet stroke.
    Center: "73" Geist Mono 700 18px, #8A8299 (muted — old score).
    Label below: "Attempt 1" Geist Mono 400 8px, #4F4866.
  
  An arrow between rings: → (16px, #7C3AED).
  
  RIGHT RING (AFTER):
    Arc: 82% fill, gradient violet → lime.
    Center: "82" Geist Mono 700 18px, #C8FE5A (lime — new score, glowing).
    Label below: "Attempt 2" Geist Mono 400 8px, #A8E040 (lime).
  
  ANIMATION when node activates:
    Right ring arc draws from 0 → 82% (1s ease-out, delay 300ms).
    Right ring score counts from "73" → "82" (600ms ease-out, delay 400ms).
    A brief lime glow flash on the right ring when counter completes
    (box-shadow 0 0 20px rgba(200,254,90,0.4), fades in 200ms then out 400ms).

  BELOW RINGS:
    "Band B → *Band A*" DM Sans 500 11px, #F0EBFF.
    "Band A" portion is Instrument Serif italic, lime.
    "80% of students improve within 60 days." DM Sans 400 9px, #4F4866 italic.

BOTTOM: "Re-test always free" DM Sans 400 10px, #4F4866.

NODE LABEL: "*Re-Test* & Improve"

════════════════════════════
NODE 06 — GET HIRED
Card size: 240px × 280px
Accent: rgba(45,212,191,0.3) (TEAL — success color, journey complete)
Special: This card gets the GLOW TREATMENT. It is the destination.
════════════════════════════

This node feels different from all others.
  bg: rgba(45,212,191,0.06) (teal-tinted background — unique among nodes).
  border: 1.5px solid rgba(45,212,191,0.3).
  Box-shadow: 0 0 40px rgba(45,212,191,0.12) (external teal glow — only this node).
  Grain texture applied.

TOP ROW: Stage chip "HIRED" in teal #2DD4BF.
         + "The destination" DM Sans 400 9px, #4F4866, italic.

NODE VISUAL — EMPLOYER ACTIVITY STRIP:

  Heading: "3 employers found you" DM Sans 600 12px, #F0EBFF.
  
  3 EMPLOYER ROWS (gap 6px):
    Each row: company initial circle (24px, gradient) + company name + role.
    
    Row 1: "ZS" circle · "ZS Associates" DM Sans 500 11px, #F0EBFF
            "HR Associate" DM Sans 400 10px, #8A8299
            "Contacted →" Geist Mono 500 9px, #2DD4BF right-aligned.
    
    Row 2: "MT" circle · "Maersk Tech" · "People Ops" · "Shortlisted →" teal
    
    Row 3: "RZ" circle · "Razorpay" · "HR Intern" · "Interview →" lime #A8E040
    
  ANIMATION when node activates:
    Rows slide in from right (translateX 20px → 0, opacity 0→1),
    staggered: row 1 delay 0, row 2 delay 120ms, row 3 delay 240ms.

  SEPARATOR: 1px rgba(45,212,191,0.12), margin 10px 0.
  
  BAND UPGRADE CALLOUT:
    "Band A unlocked" teal chip (small).
    "You're now in the top employer pool." DM Sans 400 9px, #8A8299.

BOTTOM CTA STRIP (inside the node, bottom-aligned):
  "Start your loop →"
  Height 28px, padding 0 14px, border-radius 100px.
  bg #C8FE5A, text Bricolage ExtraBold 11px, #0B090F.
  This is the ONLY CTA inside the visualization. It appears only when
  node 6 activates. Serves as a natural conversion point mid-section.

NODE LABEL: "Get *Hired*"
  "Get" DM Sans 500 14px, #8A8299
  "Hired" Instrument Serif italic 14px, #2DD4BF (teal — different from all others)

═══════════════════════════════════════════════
CIRCUIT CONNECTORS — BETWEEN NODES
═══════════════════════════════════════════════

Between every pair of adjacent nodes, add these elements ON the circuit line:

BETWEEN 01 → 02:
  A small data packet visual: 3 dashes traveling along the line
  (dash 2px × 6px, violet, opacity 0.6, translating along path at 2s intervals).
  Represents: exam answers being transmitted for scoring.
  Floating label: "Scoring..." Geist Mono 400 8px, #4F4866.

BETWEEN 02 → 03:
  Label: "If gap found →" (as specified above).
  Loop arrow: a small curved arrow (⟳ style) indicating "this loop repeats."
  This is the KEY communication: JREE is a cycle, not a one-time test.

BETWEEN 03 → 04:
  Label: "Personalized path" Geist Mono 400 8px, #7C3AED.
  A small branching fork: the line splits briefly into 3 mini-branches
  (representing different training paths for different gaps) then merges back.
  Each branch: 1px, rgba(124,58,237,0.2).

BETWEEN 04 → 05:
  Label: "30 days later" Geist Mono 400 8px, #4F4866.
  A dotted section of the line (2px dash, 4px gap) indicating time passing.
  The dotted section is 60px long.

BETWEEN 05 → 06:
  The line visually WIDENS: from 1.5px to 3px stroke.
  Color: transitions from violet to teal (gradient along this segment).
  Represents momentum building toward the end goal.
  Label: "Band A unlocked →" Geist Mono 400 8px, #A8E040 (lime).

═══════════════════════════════════════════════
BOTTOM STRIP — SECTION CLOSER
═══════════════════════════════════════════════

Below the circuit visualization. Max-width 960px. Centered.
Padding-top 48px.

LEFT (50%):
  "The loop took Priya"
  DM Sans 400 16px, #8A8299. Italic.
  
  "from Band B to Band A"
  Bricolage ExtraBold 28px, #F0EBFF.
  "Band A" in lime.
  
  "in 44 days."
  Bricolage ExtraBold 28px, #4F4866. (ghost — the time is the surprise)
  
  Below (margin-top 16px):
  Avatar strip (5 overlap circles) + 
  "1,42,800+ students are in the loop."
  DM Sans 400 13px, #8A8299.

RIGHT (50%):
  Two stats side by side:
  
  STAT 1:
    "80%" Geist Mono 700 48px, #C8FE5A (lime)
    "of Band B students reach Band A on their second attempt"
    DM Sans 400 13px, #8A8299, max-width 160px.
  
  STAT 2:
    "30" Geist Mono 700 48px, #F0EBFF
    "days is the average re-test interval"
    DM Sans 400 13px, #8A8299, max-width 160px.
  
  Separator between the two stats: 1px vertical, rgba(124,58,237,0.15), height 56px.

CTA ROW (below the two columns, full width, center-aligned, margin-top 40px):
  "Enter the loop →"
  Height 52px, padding 0 36px, border-radius 100px.
  bg #C8FE5A (lime).
  Text: Bricolage ExtraBold 16px, #0B090F.
  Box-shadow: 0 8px 32px rgba(200,254,90,0.25).
  Pulsing ring: ::after pseudo border, same shape, lime 20% opacity,
  scale 1→1.15, opacity 0.4→0, 2s infinite.
  
  Below CTA:
  "Free · No app · Score in 90 min · Results for life"
  DM Sans 400 12px, #4F4866. Items separated by · in violet.

═══════════════════════════════════════════════
FIGMA MAKE — INTERACTION SPECIFICATIONS
═══════════════════════════════════════════════

SCROLL-DRIVEN CIRCUIT ANIMATION:
  Create a Figma variable: circuitProgress (number, 0–100).
  Bind to scroll position within this section.
  The circuit SVG path stroke-dashoffset maps inversely to circuitProgress.
  
  Node activation thresholds (circuitProgress values):
    Node 01 activates at: 8%
    Node 02 activates at: 24%
    Node 03 activates at: 42%
    Node 04 activates at: 58%
    Node 05 activates at: 74%
    Node 06 activates at: 90%
  
  Each node activation triggers:
    1. Node scale: 0.94 → 1.0 (spring, 300ms)
    2. Node opacity: 0.5 → 1.0 (200ms ease)
    3. Node border: opacity increases to full accent color (200ms)
    4. Internal animation specific to that node (ring draw, bar fill, etc.)
  
NODE HOVER STATES (independent of scroll, always active):
  Scale: 1.0 → 1.03 (200ms spring)
  Box-shadow: increases outer glow of accent color
  Cursor: default (these are not clickable — informational only)
  Node 06 exception: cursor pointer on internal CTA button only.

MOBILE BEHAVIOR:
  Layout: Vertical stack. Circuit line runs down the left side (24px from edge).
  Line width: 2px (thicker on mobile for visibility).
  Nodes: full width minus 40px left offset, left edge touching circuit line.
  Node activation: triggers as each node scrolls into viewport (not scroll %).
  The Y-variation between nodes collapses to a straight vertical line.
  Node height: auto (content determines height).
  Gap between nodes: 24px.

PERFORMANCE NOTE:
  The score ring counter animation (Node 02) and bar fill animations (Node 03)
  should use requestAnimationFrame for smooth 60fps playback.
  Fallback: if scroll position API unavailable, show all nodes activated
  simultaneously on section entry.

═══════════════════════════════════════════════
DESIGN PRINCIPLES FOR THIS SECTION
═══════════════════════════════════════════════

1. THE NODES CONTAIN ACTUAL DATA, NOT ICONS.
   Each node shows a real miniaturized JREE interface element.
   A question card. A score ring. Layer bars. Module cards. 
   Before/after scores. Employer rows.
   The section sells the outcome by showing the output, not describing it.

2. THE LOOP IS THE MESSAGE.
   The circuit between nodes 02 and 03 explicitly communicates
   that JREE is NOT a dead-end platform. The loop arrow between
   Score and Gap Map is the single most important design element
   in the entire section. It is JREE's primary differentiator
   from AMCAT, TCS NQT, and eLitmus — all of which end at the score.

3. THE DESTINATION GLOWS.
   Node 06 (Hired) is visually distinct from all other nodes.
   The teal glow, the teal-tinted background, and the real employer
   rows inside it make it feel like the reward at the end of the path.
   Students scroll toward it like a light at the end of a tunnel.

4. SCROLL GIVES THE