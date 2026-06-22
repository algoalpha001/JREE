Build a high-converting, Gen Z-native landing page for JREE (Job Readiness Entrance Exam) — 
India's first national employability assessment for fresh college graduates. Think of JREE as 
"NEET for jobs" — one trusted score, verified by every college and employer in India. 
This page is the first thing students see after a WhatsApp or Instagram link. 
Make it feel like it was built for them, not for their parents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN SYSTEM & BRAND TOKENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary Color: Violet — #5B21B6
Accent Color: Teal — #0D9488
Dark Hero Background: Deep Navy — #0D0D2B
Light Surface: #FAFAFA
Card Background: #FFFFFF
Muted Text: #6B7280
Border: #E5E7EB (1px)
Success Green: #059669
Error Red: #DC2626

Typography:
- Display / Hero: "Space Grotesk" — weight 700, tight letter-spacing (-0.03em)
- Body / UI: "Inter" — weight 400 / 500
- Numbers / Stats: "DM Mono" — weight 600 (for score rings, percentiles, counters)

Corner Radius: 12px cards, 8px inputs, 100px pill buttons
Shadows: 0 4px 24px rgba(91,33,182,0.12) for floating cards

Motion Easing:
- Entrance: cubic-bezier(0.16, 1, 0.3, 1) — spring feel
- Exit: ease-in 200ms
- Scroll trigger threshold: 80px from viewport edge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📐 LAYOUT & FRAME SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create two master frames:
1. Desktop — 1440px wide, auto-height, overflow scroll vertical
2. Mobile — 390px wide (iPhone 14 Pro), auto-height, overflow scroll vertical

Max content width: 1200px, centered
Section vertical padding: 96px desktop / 64px mobile
Horizontal padding: 80px desktop / 20px mobile

Use Figma variables for all spacing, colors, and text styles.
Create a component library with: Button, Input, Badge, Card, NavLink, ScoreRing, 
StepPill, TestimonialCard, StatBlock.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧭 SECTION 1 — STICKY NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Position: Fixed top, full width, z-index highest layer
Background: rgba(13,13,43,0.85) with backdrop-filter blur 20px (frosted glass)
Height: 64px desktop / 56px mobile
Border-bottom: 1px solid rgba(255,255,255,0.08)

Left: JREE wordmark — "JREE" in Space Grotesk 700, 22px, white. 
      Add a small violet dot (●) after the R as a brand mark.
      Below wordmark in tiny text: "by EduBridge" — gray, 10px, Inter 400

Center (desktop only): Nav links — "How It Works", "Who It's For", "Scores & Bands", 
"Top Colleges" — Inter 14px, white 80% opacity. 
On hover: white 100% + violet underline (2px, animates in from left, 200ms).

Right: 
- "Login" — ghost pill button, white border, white text, 14px
- "Take Free Test →" — filled pill button, bg #5B21B6, white text, 14px, 
  subtle glow on hover: box-shadow 0 0 20px rgba(91,33,182,0.5)

Mobile: hamburger icon (3 lines) right side. 
Tap opens full-screen menu overlay — navy bg, links stacked vertically, 
"Take Free Test →" button pinned to bottom, 56px height.

Scroll behavior: Nav starts transparent at top. 
After scrolling 80px, transition to frosted glass background (300ms ease).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 SECTION 2 — HERO (Above the Fold)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: Deep Navy #0D0D2B
Add subtle animated mesh: 3 large blurred radial gradients positioned at corners 
— violet (#5B21B6 at 20% opacity), teal (#0D9488 at 15% opacity), deep purple 
(#3B0764 at 25% opacity). Animate them slowly floating (translateX ±30px, 
translateY ±20px, 8s loop, ease-in-out, each offset by 2s). 
Add a fine dot-grid pattern (1px dots, 20px gap, white 4% opacity) over the mesh.

Hero Layout (desktop): Two columns — 55% text + 45% visual

LEFT COLUMN:
- Floating pill badge at top:
  Background: rgba(91,33,182,0.2), border: 1px solid rgba(91,33,182,0.4)
  Icon: ✦ (spark) in teal, then text "India's First National Job Readiness Exam"
  Inter 13px, teal color, pill shape, padding 6px 14px
  Entry animation: fade in + slide up, 400ms, delay 0ms

- H1 headline — Space Grotesk 700, 64px desktop / 40px mobile, white, line-height 1.1:
  Line 1: "Your degree got you here."
  Line 2: "Your" [JREE score] "gets you hired."
  — The words "JREE score" render in a violet-to-teal gradient text 
    (background-clip: text, linear-gradient 135deg #5B21B6 → #0D9488).
  Entry animation: each line fades in + slides up, staggered by 120ms per line, 
  delay starts at 200ms. Easing: cubic-bezier(0.16, 1, 0.3, 1).

- Subheadline — Inter 400, 18px desktop / 16px mobile, #94A3B8, line-height 1.6, 
  max-width 480px:
  "60% of 8 million Indian graduates are 'unemployable' — not because they lack 
  skills, but because no trusted proof exists. JREE fixes that. One free exam. 
  One score. Every employer trusts it."
  Entry animation: fade in, 400ms, delay 600ms.

- Social proof micro-strip (below subheadline, gap 8px):
  Row of 4 tiny avatar circles (overlapping, stvatarlike LinkedIn) + text:
  "12,400+ students scored in the last 30 days"
  Avatars: violet gradient circles with initials A, R, M, S (white text, 11px)
  Text: Inter 13px, #94A3B8
  Entry animation: fade in, delay 800ms.

- CTA Button Row (gap 16px, flex, wrap on mobile):
  Button 1 — Primary: "Take Your Free JREE Test →"
    Size: height 52px, padding 0 28px, pill shape (border-radius 100px)
    Background: #5B21B6
    Text: Inter 600, 16px, white
    Hover: background lightens to #6D28D9, box-shadow 0 8px 32px rgba(91,33,182,0.45), 
           slight scale(1.02), transform 200ms
    Active: scale(0.98)
  Button 2 — Ghost: "Watch 2-min Demo ▷"
    Background: transparent, border: 1px solid rgba(255,255,255,0.2)
    Text: Inter 500, 16px, white 80%
    Hover: border-color white 60%, text white 100%
  Entry animation: slide up + fade in, delay 900ms.

- Trust badges row below CTAs (gap 20px, flex):
  Three tiny badges, each: icon + text, Inter 12px, #6B7280
  — ✓ 100% Free for Students
  — ✓ Takes 90 mins
  — ✓ Instant Score + Certificate
  Entry animation: fade in, delay 1100ms.

RIGHT COLUMN (Hero Visual):
Create a floating 3D-style score card mockup. 
Card: white background, border-radius 20px, padding 24px, 
      box-shadow 0 24px 80px rgba(0,0,0,0.4), 
      slight rotate(-3deg) skew for depth, max-width 360px.

Card contents:
Top: "Your JREE Score Card" — gray 12px label + "LIVE PREVIEW" green badge pill

Score Ring: Large circular ring, 120px diameter.
  - Ring track: gray 10% opacity
  - Progress arc: violet-to-teal gradient, fills 78% of circle
  - Center: Large number "78" in DM Mono 700 48px, white
  - Below number: "Band A" in Inter 600 14px, teal color
Animate the ring arc drawing from 0% to 78% (stroke-dashoffset animation, 
1.2s ease-out, delay 800ms after page load).

Below ring: "National Percentile: 91st" — teal color, DM Mono 500, 14px

5 mini bars for exam layers (each: label left, thin progress bar right):
  Aptitude ░░░░░░░░░░ 82%
  English  ░░░░░░░░   76%  
  Domain   ░░░░░░░░░  85%
  SJT      ░░░░░░░    70%
  Interview░░░░░░░░░  80%
  Use violet for bars, gray track. Animate bars from 0 width, staggered 100ms apart.

Bottom: "Role Fit: Product Manager" badge in teal, 
+ "Share on LinkedIn" teal text link

Float this card with CSS animation: subtle bobbing (translateY -8px → 0px, 
3s ease-in-out, infinite alternate). 
Entry animation: slide in from right + fade in, delay 600ms.

Below the card, add 2 floating mini-cards (position absolute, rotated):
  Card A: rotate(6deg), top-right of main card, offset +40px right +20px down
    Shows: "🏢 Viewed by 14 employers this week" — white card, tiny, shadow
  Card B: rotate(-5deg), bottom-left of main card, offset -30px left +80px down  
    Shows: "🎓 Accepted by 240+ colleges" — white card, tiny, shadow
  Both animate in with delay 1.2s + slight bob.

MOBILE HERO: Stack columns vertically. Visual mockup collapses to 280px wide, 
centered. Headline reduces to 36px. CTA buttons go full width. 
Floating mini-cards hidden on mobile.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 SECTION 3 — CREDIBILITY STATS TICKER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: Solid violet #5B21B6
Height: 72px desktop / 80px mobile (two rows mobile)
Content: Horizontally scrolling ticker (CSS marquee, infinite loop, no pause):

Items separated by  ✦  symbol in teal:
  8M+ graduates yearly  ✦  60% unemployability rate  ✦  
  100% free for students  ✦  AI-powered interview  ✦  
  Band A / B / C / D scoring  ✦  QR-verified certificate  ✦  
  Trusted by 240+ colleges  ✦  Results in 24 hours  ✦

Text: DM Mono 500, 14px, white. Ticker speed: 40s loop.
On hover: pause animation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👥 SECTION 4 — WHO IS JREE FOR?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #FAFAFA
Section heading (center-aligned):
  Eyebrow: "BUILT FOR EVERYONE IN THE ECOSYSTEM" — Inter 500, 12px, 
           violet, letter-spacing 0.1em, uppercase
  H2: "One exam. Three winners." — Space Grotesk 700, 48px, #0F172A

3-column card grid (gap 24px). Each card:
  Background: white, border: 1px solid #E5E7EB, border-radius 16px, 
  padding 32px, overflow hidden

  Top: Emoji icon in a 56px circle (bg: respective color at 10% opacity)
  Role label: Inter 600, 20px, dark
  Tagline: Inter 400, 14px, gray, margin-top 8px
  Divider line: 1px, gray 20%
  Bullet list of 3 benefits, each with a ✓ in respective accent color

  Hover: translate Y -6px, box-shadow increases, border-color = accent, 
  transition 300ms ease

Card 1 — Student 👨‍🎓 (accent: violet)
  Tagline: "Your free pass to getting taken seriously."
  Benefits:
  — Get a verified, shareable score + PDF certificate
  — See your exact percentile vs 8M+ graduates
  — Know which roles you're actually ready for

Card 2 — College 🏫 (accent: teal) — "Most Popular" badge top-right, 
          filled teal pill
  Tagline: "Finally know if your curriculum is working."
  Benefits:
  — Upload student list, track batch performance
  — Compare your avg score vs national benchmark
  — Export reports for NAAC, placement records

Card 3 — Employer 🏢 (accent: violet darker #3B0764)
  Tagline: "Skip the resume pile. Hire by proof."
  Benefits:
  — Search verified candidates filtered by role fit
  — QR-verify any JREE score in seconds
  — Reduce mis-hires with one standardized signal

Scroll animation: Cards slide up from 40px below, fade in, 
staggered 150ms apart. Trigger at 80px from viewport.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ SECTION 5 — HOW IT WORKS (Student Journey)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: Deep Navy #0D0D2B
Add same dot-grid texture as hero, 3% opacity.

Section heading (center-aligned, white):
  Eyebrow: "THE STUDENT JOURNEY" — teal, uppercase, 12px
  H2: "From signup to shortlisted in 6 steps." — Space Grotesk 700, 48px, white

Layout: Horizontal stepper on desktop, vertical accordion on mobile.
6 steps connected by a dashed progress line (teal, 1px dashed, 
animated: stroke-dashoffset draws from left to right on scroll, 1s total, 
starts when section enters viewport).

Each step node: circle 48px, number inside in DM Mono 600.
Active/completed: violet fill, white number.
Inactive: gray border, gray number.

Step cards (below nodes, staggered vertically like a zigzag on desktop):
Alternating: Step 1,3,5 above the line, Step 2,4,6 below the line.
Each card: white bg, border-radius 12px, padding 20px, max-width 180px, 
shadow 0 4px 24px rgba(0,0,0,0.3).

Step 1 — Register
  Icon: 📋
  Title: "Register in 60 seconds"
  Body: "Name · Email · College · OTP. Done."
  Micro-detail: Mobile-first form, no app download needed.

Step 2 — Exam (5 Layers)
  Icon: 🧠
  Title: "5-layer exam, 90 mins"
  Body: "Aptitude · English · Domain · SJT · distraction-free dark UI"
  Micro-detail: Auto-saves every 30 seconds.

Step 3 — AI Interview with Priya
  Icon: 🤖
  Title: "Meet Priya — your AI interviewer"
  Body: "5 questions. Video responses. AI-scored instantly."
  Micro-detail: No human reviewer. No bias.
  Note: Add "⭐ JREE's most unique step" badge in teal on this card.

Step 4 — Score + Band
  Icon: 📊
  Title: "Your score, instantly"
  Body: "0–100 score · Band A/B/C/D · National percentile"
  Micro-detail: Detailed breakdown by each layer.

Step 5 — Certificate
  Icon: 🏆
  Title: "Shareable certificate"
  Body: "PDF + QR code. Add to LinkedIn, WhatsApp, resume."
  Micro-detail: Employers can verify in 5 seconds.

Step 6 — Get Hired
  Icon: 🚀
  Title: "Get discovered"
  Body: "Employers filter and find you. You apply with confidence."
  Micro-detail: Your score is your first impression.

Scroll animation: Step cards animate in one by one as user scrolls right 
(desktop) or down (mobile). Each card: fade in + slide up 30px, 200ms stagger.

Mobile layout: Vertical timeline. Left side: vertical teal dashed line. 
Right side: step cards stacked. Nodes on the line.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 SECTION 6 — MEET PRIYA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: Gradient — #0D0D2B → #1E0A3C (dark purple-navy)
Full-width section, high visual impact.

Left side (50%):
  Eyebrow: "JREE'S AI INTERVIEWER" — violet pill badge
  H2: "Meet Priya." — Space Grotesk 700, 56px, white
  Subhead: "She's warm. She's sharp. And she'll ask you 5 questions 
  that reveal exactly how ready you are."
  Inter 400, 18px, #94A3B8, max-width 420px.

  3 detail chips (flex row, gap 12px, wrap):
  Each chip: border 1px solid rgba(255,255,255,0.15), border-radius 100px, 
  padding 8px 16px, Inter 13px, white 80%
  — 🎙 Voice + video format
  — 🧠 AI-scored in real-time
  — 🤝 No human reviewer

  CTA: "Take the free exam to meet Priya →" — outlined violet button

Right side (50%):
  Priya's split-screen mockup:
  Outer frame: rounded rectangle 380px × 280px, dark bg, 
               border-radius 20px, border 1px solid rgba(255,255,255,0.1),
               shadow 0 24px 80px rgba(91,33,182,0.3)
  
  TOP BAR: "JREE Video Interview" label left, 
           red dot + "LIVE" badge right (pulse animation on red dot: 
           scale 1 → 1.4 → 1, 1.5s infinite)
  
  Main area: Split vertically into two panels
  LEFT PANEL (Priya's side — 55%):
    Placeholder for Priya avatar — violet gradient rectangle with 
    subtle grid lines overlay (representing video feed)
    Name tag bottom: "Priya · JREE AI Interviewer" — white text, 
    teal underline
    Question ticker: rotating text "Tell me about a time you had to 
    learn something quickly..." — white, 13px, animated typing cursor blinking
  
  RIGHT PANEL (Student's side — 45%):
    Dark rectangle simulating student webcam (charcoal bg)
    Small avatar circle top-center (representing student)
    "You" label bottom-center — gray text
    Green "mic active" indicator bottom-left (pulsing green dot)

  Below mockup: "Asked 5 questions · Responded · AI scoring..." 
  progress indicator in teal, animated ellipsis

Scroll animation: Left text slides in from left, right mockup slides in 
from right. Both fade in. 500ms, spring easing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 SECTION 7 — STATS & SOCIAL PROOF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Section heading (center):
  H2: "The numbers are talking." — Space Grotesk 700, 48px, #0F172A

4-column stats grid (gap 1px between, unified border layout):
Each stat block: padding 48px 32px, center-aligned.
Odd blocks: white bg. Even blocks: #FAFAFA bg.
Border: 1px solid #E5E7EB.

Stat 1: "8M+" — DM Mono 700, 64px, violet
         Label: "Fresh graduates yearly" — Inter 400, 16px, gray

Stat 2: "60%" — DM Mono 700, 64px, #DC2626 (red — emphasizes the problem)
         Label: "Considered unemployable" — Inter 400, 16px, gray
         Sub: "(Source: NASSCOM 2024)" — 12px gray

Stat 3: "90 min" — DM Mono 700, 64px, teal
          Label: "Entire assessment done" — Inter 400, 16px, gray

Stat 4: "1 Score" — DM Mono 700, 64px, violet
          Label: "Every employer trusts" — Inter 400, 16px, gray

Number counter animation: On scroll into view, numbers count up from 0 
to final value over 1.2s, using easeOutQuart curve. 
("8M+" counts 0 → 8M+, "60%" counts 0 → 60, etc.)

Below stats grid — Testimonials horizontal scroll (3 cards visible, 
scroll on mobile):

Each testimonial card:
  Background: white, border: 1px solid #E5E7EB, border-radius 16px, padding 28px
  Width: 360px, min-width: 360px
  
  Top: ★★★★★ in gold (#F59E0B), then quote text:
  Quote: Inter 400, 16px, #374151, italic, line-height 1.7
  Bottom: Avatar circle (violet gradient) + Name + College/Company

Card 1: 
  "I didn't know how to prove my skills beyond my GPA. JREE gave me a Band A 
  score that I put right below my name on LinkedIn. Got 3 interview calls 
  in a week."
  — Ritika S., B.Tech CSE, VIT Pune

Card 2:
  "As a college placement officer, JREE gave us data we never had — which 
  departments are actually preparing students for jobs. Game changer."
  — Prof. Anil Mehta, Training & Placement, Amravati Engineering College

Card 3:
  "We shortlisted 40 candidates in 2 hours using JREE scores. No CV 
  screening. No back-and-forth. Hired 12."
  — Sneha K., HR Lead, Pune-based SaaS startup

Scroll animation: Cards slide in from right as section enters viewport.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 SECTION 8 — INTERACTIVE ONBOARDING / SIGN-UP FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THIS IS THE MOST IMPORTANT SECTION. Make it feel like a conversation, 
not a form. Full-width section.

Background: Split — left 45% is Deep Navy #0D0D2B with violet mesh glow, 
right 55% is white. On mobile: stacked, navy on top.

LEFT SIDE (motivation panel):
  Sticky as user types in the right side.
  
  Top: "You're 90 minutes away from proving you're ready." 
  — Space Grotesk 700, 32px, white, line-height 1.2
  
  Below: Animated score preview card (same style as hero card), 
  but smaller — 280px wide. 
  The score ring shows "??" until user completes registration.
  
  Below card: 3 reassurance items (stacked, gap 16px):
  Each: teal checkmark icon + white text
  — "No credit card. No app. Always free."
  — "Your score is yours. Share when you want."
  — "Takes 90 mins. Start anytime."
  
  Bottom: "12,400+ students scored this month" — gray, 13px, 
  avatar strip same as hero.

RIGHT SIDE (multi-step intake form):
  Create a 4-step progressive form. One step visible at a time.
  
  Progress indicator at top: 
  4 dots connected by line. Active dot = violet filled. Completed = teal filled 
  with ✓. Future = gray outline.
  "Step 1 of 4 · Setup takes 60 seconds" — Inter 13px, gray.

  STEP 1 — "Let's start. What should we call you?"
    Heading: Space Grotesk 600, 28px, #0F172A
    Subhead: "You'll get a score card with your name on it. Make it count."
    
    Fields:
    - Full Name (text input, placeholder "Aarav Sharma", autofocus)
    - Mobile Number (tel input, placeholder "+91 98765 43210")
      Below: "We'll send your OTP here. Nothing else." — 11px gray
    - Email ID (email input, placeholder "aarav@college.edu")
    
    Input style: height 52px, border-radius 10px, border 1.5px solid #E5E7EB,
    font-size 16px (prevents iOS zoom), padding 0 16px.
    On focus: border-color #5B21B6, box-shadow 0 0 0 3px rgba(91,33,182,0.15)
    On error: border-color #DC2626, shake animation (translateX ±4px, 3 cycles)
    Valid state: border-color #059669, trailing ✓ icon in green.
    
    Inline validation as user types (not on submit).
    
    CTA: "Continue →" — primary pill button, full width, 52px height.
    Disabled state: 50% opacity, no hover effect, until all 3 fields valid.
    On click: button shows loading spinner (white rotating circle), then 
    transitions to Step 2 with slide-left animation (translateX: 0 → -30px fade 
    out, new step: 30px → 0 fade in, 300ms).

  STEP 2 — "Tell us about your college."
    Heading: "Where are you studying?"
    Subhead: "We'll benchmark you against students from your college 
    and across India."
    
    Fields:
    - College Name — text input with live autocomplete dropdown 
      (show 5 suggestions: "Amravati Engineering College", "VIT Pune", 
      "BITS Pilani", "NIT Nagpur", "Other — Type your college")
      Dropdown: white card, border, border-radius 12px, shadow. 
      Each option: 44px height, hover violet bg 10%, padding 0 16px.
    - Degree — dropdown (B.Tech / B.E. / B.Sc / BBA / B.Com / MBA / MCA / Other)
    - Graduation Year — segmented control (4 pill buttons: 2024 / 2025 / 2026 / 2027+)
      Active pill: violet bg, white text. Inactive: outline, gray text.
    
    Back link (left-aligned, above CTA): "← Back" — gray, no border.
    CTA: "Next →" — same as step 1.

  STEP 3 — "What domain are you in?"
    Heading: "Pick your domain for the exam."
    Subhead: "The domain section is tailored to your field. Choose the 
    one closest to you."
    
    8 domain chips in a 4×2 grid:
    Each chip: border 1.5px solid #E5E7EB, border-radius 100px, 
    padding 10px 20px, Inter 14px, center text, cursor pointer.
    
    On hover: border-color violet 40%, bg violet 5%.
    On select: border-color #5B21B6, bg #5B21B6, text white, 
    checkmark icon appears left of label, scale(1.04) 150ms spring.
    Only 1 can be selected at a time.
    
    Domains: 💻 Computer Science · 🔧 Mechanical Engineering · 
    ⚡ Electrical / Electronics · 🏗 Civil Engineering · 
    📊 Commerce & Finance · 🎨 Design & Media · 
    💊 Pharma & Life Sciences · 📚 Other / Undecided
    
    CTA: "Let's Go →" — disabled until chip selected.

  STEP 4 — "Verify your mobile number."
    Heading: "One last step — OTP"
    Subhead: "We sent a 6-digit code to +91 9876543210. 
    Tap a digit to change your number."
    
    Phone number shown in a rounded badge — editable on tap 
    (tap → replaces with inline text input).
    
    OTP Input: 6 individual 52×52px boxes, border 1.5px solid #E5E7EB, 
    border-radius 10px, DM Mono 700, 24px, text center.
    Auto-advance on digit entry (cursor jumps to next box).
    On complete: boxes turn violet border + bg violet 10%.
    Backspace behavior: clears current box, moves to previous.
    
    Below inputs: 
    "Resend OTP" link — gray, disabled for 30s countdown 
    ("Resend in 28s" counting down, Inter 13px).
    After 30s: turns teal and becomes clickable.
    
    CTA: "Verify & Start My JREE →" — primary pill button, full width.
    On verify: confetti burst animation (subtle, 30 particles in violet and teal), 
    then smooth transition to success state.

  SUCCESS STATE (replaces form):
    Green circle with ✓ (60px, animated draw), then:
    "You're registered! 🎉"
    "Your exam is ready. You have 7 days to complete it."
    Large CTA: "Start My JREE Now →" — violet, full width.
    Secondary: "I'll do it later → Save my link" — teal, text link.
    
    Below: Share nudge:
    "Tell your friends before they miss the free window →"
    Three share buttons: WhatsApp (green), LinkedIn (blue), Copy Link (gray)
    Each: 40px pill, icon + text, outline style.

  Form transitions: All step changes use slide-left animation for forward, 
  slide-right for back. Spring easing, 300ms.
  
  Mobile: Form fills full screen width. Left motivation panel slides up as 
  sticky header (navy, 80px, just shows "90 mins away from a hired future.").

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 SECTION 9 — TRUSTED BY COLLEGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #FAFAFA
Heading (center): "Trusted by 240+ colleges across India."
Subhead: "Growing every week."

Two-row auto-scrolling logo ticker (one row → one row ←):
Logo slots: white rectangle cards (140px × 56px, border-radius 8px, 
shadow 0 2px 8px rgba(0,0,0,0.06)), each containing college name in gray text 
(since real logos TBD, use stylized college abbreviations in Inter 600):
MIT-WPU · VIT · Amravati Engg. · COEP · PICT · RCOEM · GCEK · 
GEC Thrissur · BITS Mesra · NIT Nagpur · +230 more

Ticker speed: 30s loop. No pause on hover (continuous motion).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 SECTION 10 — SCORE BANDS EXPLAINER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: white
Heading: "What your band actually means to an employer."
Subhead: "Every band unlocks a different opportunity tier."

4-column band card grid (gap 16px):
Each card: border-radius 16px, padding 28px, border 1px solid respective color.

Band A (Score 80–100): 
  Border: #5B21B6. Top: violet badge "Band A".
  Icon: 🏆 in violet circle.
  Headline: "You're in the top tier."
  Description: "Ready for leadership-track roles. Employers fast-track your 
  application. Product, strategy, and analyst roles actively look for Band A."

Band B (60–79):
  Border: #0D9488. Top: teal badge "Band B".
  Icon: ⭐ in teal circle.
  Headline: "Solid and ready."
  Description: "Core engineering and business roles. Well-above average across 
  all 5 layers. Most companies hire from Band B with confidence."

Band C (40–59):
  Border: #F59E0B. Top: amber badge "Band C".
  Icon: 📈 in amber circle.
  Headline: "Growing fast."
  Description: "You have the fundamentals. Certain roles and smaller companies 
  actively hire Band C. A re-attempt in 6 months moves most students up."

Band D (Below 40):
  Border: #DC2626. Top: red badge "Band D".
  Icon: 🔄 in red circle.
  Headline: "Your roadmap starts here."
  Description: "You get a detailed improvement plan, free resources, 
  and a re-attempt after 30 days. This isn't a failure — it's a starting point."

Scroll animation: Cards flip in with rotateY(-90deg → 0deg), 
staggered 100ms, spring easing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❓ SECTION 11 — FAQ ACCORDION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #FAFAFA
Heading: "Everything you're probably wondering."
Two-column layout on desktop, single column mobile.
Max-width 960px, centered.

Each accordion item:
  Border-bottom: 1px solid #E5E7EB.
  Padding: 20px 0.
  Question: Inter 600, 16px, #0F172A.
  Expand icon: + / × toggle, violet color, rotates 45deg on open (200ms).
  Answer: Inter 400, 15px, #6B7280, line-height 1.7.
  Open state: answer slides down (max-height animation, 300ms ease).

FAQ items:
Q: Is JREE actually free for students?
A: Yes — 100% free. Always. Students never pay. JREE is funded by colleges 
   and employers who use the platform for analytics and hiring.

Q: How is it different from placement tests in college?
A: College placement tests vary by company. JREE is one standardised exam 
   accepted by any employer — like a permanent, portable placement score.

Q: What if I score Band C or D — is it bad?
A: Not at all. You get a full breakdown of exactly where to improve, 
   free resources, and a re-attempt in 30 days. Most students improve 
   1–2 bands on their second attempt.

Q: How long does the exam take?
A: The full exam is 90 minutes: 75 mins for the written layers + 15 mins 
   for the AI video interview with Priya.

Q: Can employers see my score without my permission?
A: No. Your score is private by default. You choose who to share it with. 
   Employers can only see your profile if you share your QR code or apply 
   through the JREE portal.

Q: Is the score valid forever?
A: Your score is valid for 2 years. After that, you can re-take at no cost.

Q: What's an AI interview? Will Priya judge me harshly?
A: Priya asks 5 structured questions. She's warm and straightforward. 
   The AI scores your answers on content, clarity, and confidence — 
   not your accent or appearance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 SECTION 12 — FINAL CTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: Deep Navy #0D0D2B with violet radial glow center.
Full-width, min-height 480px.
Center-aligned, all content centered.

Top: teal pill badge — "100% FREE · NO APP · 90 MINUTES"

H2: "Stop applying blind." — Space Grotesk 700, 64px, white, 
     line-height 1.0, margin-bottom 4px
H2 line 2: "Start with your JREE score." — same style but gradient text 
            (violet → teal, same as hero)

Subhead: "12,400+ students already know where they stand. 
          Take the free exam today." 
          Inter 400, 18px, #94A3B8.

CTA button: "Get My Free JREE Score →"
  Height: 60px, padding: 0 40px, border-radius 100px.
  Background: violet #5B21B6.
  Text: Inter 700, 18px, white.
  Hover: scale(1.04), glow effect box-shadow 0 12px 40px rgba(91,33,182,0.5).
  Pulsing ring animation on the button: 
    ::after pseudo-element, same size, violet 20% opacity, 
    scale(1 → 1.3) + opacity(0.4 → 0) infinite 2s loop.

Below button: "No credit card. No app download. Instant score after 90 mins."
— Inter 13px, #475569.

Avatar strip + "Join 12,400+ students" as before.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🦶 SECTION 13 — FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background: #0D0D2B
Border-top: 1px solid rgba(255,255,255,0.08)
4-column layout desktop, 2-column mobile.

Col 1: JREE wordmark (white) + "by EduBridge Pvt. Ltd." gray 12px
        Tagline: "India's national standard for job readiness."
        Social icons (LinkedIn, Twitter/X, Instagram, WhatsApp) — 
        gray, hover white, 20px each, gap 16px.

Col 2: "Students"
        Links: Take Free Test · Sample Exam · Score Bands · Download Sample 
               Certificate · FAQs

Col 3: "Institutions"
        Links: For Colleges · For Employers · API / Integration · 
               Bulk Registration · Request Demo

Col 4: "Company"
        Links: About EduBridge · Press & Media · Privacy Policy · 
               Terms of Use · Contact Us

All links: Inter 14px, #6B7280. Hover: white, 200ms.

Bottom bar: border-top 1px solid rgba(255,255,255,0.06)
"© 2025 EduBridge Pvt. Ltd. All rights reserved. · Made in India 🇮🇳"
— Inter 13px, #4B5563, center-aligned.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 FIGMA MAKE — INTERACTION SPECS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create these interactive components using Figma variables + prototyping:

1. Scroll-triggered animations: 
   Use Figma's scroll position variables. When scrollY > [section offset], 
   trigger each section's entry animation via variable-driven opacity 
   (0 → 1) and translateY (40px → 0px).

2. Navigation state:
   Boolean variable: isScrolled. When true, nav gets frosted glass fill.
   Add On Scroll trigger → Update isScrolled.

3. Multi-step form:
   Variable: currentStep (1–4). Each step frame shown when 
   currentStep === [n]. CTA button triggers: Set Variable currentStep +1. 
   Back link: Set Variable currentStep -1.

4. OTP input:
   6 boolean variables (digit1Filled through digit6Filled). 
   Input focus state on each box managed by interaction chain.

5. Domain chip selection:
   Variable: selectedDomain (string). Chip tap: Set Variable selectedDomain 
   to chip label. All chips reference this variable for selected state.

6. Accordion FAQ:
   7 boolean variables (faq1Open through faq7Open). 
   Click question → toggle respective variable. 
   Answer frame: Auto-layout with max-height controlled by variable.

7. Score ring animation:
   Animated component: ring arc stroke-dashoffset drives from 283 (0%) 
   to 62 (78%). Triggered by scroll position entering section.

8. Number counter:
   Smart animate from "0" text variant to final number variants 
   (create 10 variants per stat, Figma animates between).

9. Priya's pulsing LIVE badge:
   Loop animation on red dot: scale 1 → 1.4, opacity 1 → 0, 1.5s, 
   infinite via prototype loop.

10. Nav mobile menu:
    Boolean variable: mobileMenuOpen. 
    Hamburger tap → Set Variable true → overlay frame appears 
    (opacity 0 → 1, translateY -100% → 0, 300ms).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 MOBILE RESPONSIVENESS RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- All font sizes: reduce by 30–40% vs desktop values.
- Hero score card mockup: 280px, no floating mini-cards.
- Who It's For: Single column, cards full width, vertical scroll.
- How It Works: Vertical timeline, left border line, right-side cards.
- Meet Priya: Stack columns, mockup full width.
- Stats: 2×2 grid.
- Testimonials: Horizontal scroll (snap scroll).
- Band cards: 2×2 grid.
- FAQ: Single column.
- Footer: 2-column, Company links collapsed.
- Form: Full width, motivation panel collapses to sticky top banner.
- All tap targets: minimum 44×44px.
- No hover effects (replace with tap feedback: scale 0.97, 100ms).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 DESIGN QUALITY DIRECTIVES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- The page should feel like it was designed for fresh Indian graduates 
  who use Instagram, LinkedIn, and WhatsApp daily. It should not feel 
  corporate or like a government portal.
- Every section should have one "surprise" element — something unexpected 
  that makes you stop and look.
- The onboarding flow (Section 8) is the most critical conversion surface. 
  Spend maximum fidelity here. The form must feel like texting a friend, 
  not filling a government form.
- Priya is JREE's brand mascot. Her section should feel premium.
- Empty states, loading states, and error states must all be designed 
  (not left as blank boxes).
- Use micro-copy everywhere — small reassurance lines under every CTA 
  and input.
- The page must look stunning in both desktop and mobile frames.
- Export the complete page as both frames side by side on one Figma canvas.
- Include a component page with all reusable components labeled and organized.