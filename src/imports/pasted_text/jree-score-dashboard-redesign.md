JREE Score Dashboard — Redesign Brief & Prompt

This is the page a student lands on before they ever click into the three result tabs (Your Skills / Score Breakdown / AI Interview). Its only job is: "Here's your number, here's exactly how it was built, here's what to do next." Right now it does that job as a literal spreadsheet — a table with columns like CORRECT/TOTAL, SCORE, WEIGHT, POINTS, PROGRESS, full of em-dashes and empty gray bars. It reads like an exported CSV pasted into a page, not a product. Fix that without leaning on any AI-template clichés (no floating gradient blobs, no giant flat emoji-in-a-circle icons, no generic "You've got this!" copy, no rainbow-confetti score reveal).


Guiding metaphor: a portfolio statement, not a spreadsheet

The single biggest structural fix: this page is fundamentally showing a weighted composite — five inputs at fixed weights summing to one score. That's the exact shape of a financial portfolio allocation, not a data table. Design around that idea: one horizontal composition — proportioned by weight, filled by achievement — replaces the entire table-with-dashes. The formula footnote becomes something the student can see, not something they have to read and mentally compute.


1. Header identity block — consolidate, don't repeat

Right now the score (0/100), band status ("Training Required"), and National Rank (#49) are scattered across a banner + a separate score block, and then the exact same layer data reappears a second time lower down as a full table — it's the same story told twice in two different formats. Collapse into one unified strip at the top:


Big score, presented as a filled arc/dial (0–100 sweep) rather than a bare number sitting next to plain text — the dial's fill level should be the very first thing the eye reads, before any number is parsed.
Band label (e.g. "Training Required") sits directly on/beside the dial as a status chip, not a separate colored banner floating above unrelated to the number it's describing.
National Rank sits as a secondary stat directly beside the dial — same visual tier, not a differently-styled orange number off to the side feeling like an afterthought.
One clear primary action here: "View Full Results, Analysis & Certificate" — this should be the visually dominant CTA of the whole header, since it's the actual next step for 90% of students.


Kill the redundant repeat: everything below should be new information (the layer-by-layer "why"), not a second rendering of the same top-line number.

2. Replace the table with the "composition bar"

This is the core redesign move. Instead of six rows of a table (Cognitive & Aptitude, English & Communication, Domain Knowledge, Workplace Scenarios, AI Interview, then a JREE Score totals row), build:

A single horizontal stacked bar, divided into five segments whose widths are fixed by weight (25% / 20% / 25% / 15% / 15% — so the student visually understands upfront that Cognitive & Domain Knowledge matter most, Workplace & AI Interview matter least, before they even see a score). Within each segment, show achievement as a fill level (like a thermometer inside each block, filled from the bottom or left) — a segment that's 25% wide but only 10% filled instantly communicates "big opportunity, barely touched," which no table row of dashes can do at a glance.

Directly under or beside this bar, keep a compact legend row (not a full table) — one line per layer: colored dot (reuse the color-coding already present — purple/green/orange/red/indigo), name, and just the raw correct/total (e.g. "0/15") plus points contributed. Drop the SCORE and PROGRESS columns entirely — the composition bar above already is score and progress, shown better. This turns 6 rows × 6 columns of mostly-empty cells into one strong visual plus a slim reference list.

Each legend row expands (tap/click) to reveal that layer's own breakdown — reuse the same expand-on-demand pattern from the Score Breakdown tab, so a curious student can go one level deeper right here without leaving the dashboard, but the default view stays clean.

3. Turn the formula into a caption, not a sentence to parse

Drop the literal text formula ("(Cognitive × 25%) + (English × 20%) + …") as body copy — it's correct but nobody reads algebra on a dashboard. Instead, print the weight percentage directly inside/under each segment of the composition bar (small label in each block: "25%", "20%", etc.) so the formula is shown structurally rather than written out. If you want the literal formula preserved for transparency-minded users, tuck it as a small "How this is calculated" disclosure link/tooltip rather than a permanent line of body text.

4. AI Interview Score box — integrate it, don't bolt it on

Currently the "AI Interview Score (Layer 5)" block is a separate boxed section below the table with its own four 0-value tiles (Overall / Context / Clarity / Confidence), visually disconnected from the AI Interview row above it in the table — same data, two different treatments, and it's the only layer given this special larger callout while the other four layers get none. Two honest options:


(A) Fold it into the same expand-on-demand row as the other four layers in the composition legend — click "AI Interview" and it expands to show its own three sub-metrics as small bars, exactly like any other layer would if it had sub-metrics. This keeps the page visually consistent — no layer is arbitrarily bigger than another.
(B) If AI Interview genuinely deserves special prominence (e.g. because it's newest/least understood by students), keep it as a distinct callout, but redesign the four flat number tiles as a mini radial cluster (a small radar/spoke shape with 3 spokes for Context/Clarity/Confidence around an Overall center) rather than four identical bare-number boxes — visually signals "this is a different kind of metric" (qualitative, coach-style) versus the quantitative correct/total layers above it.


Pick one and apply it consistently — don't do a version of both like today's page does.

5. The two footer cards — make them feel like different destinations, not identical tiles

"Full Results" and "Learning Path" currently look like the same button shape/size with just different icons and one colored, one white — arbitrary rather than intentional. Differentiate by what each one actually is:


Full Results is a diagnosis — treat it as the natural continuation of the composition bar above (visually, maybe it's not a generic card at all, but a bar/strip that echoes the composition bar's shape, like "see this same picture in full detail" — reinforcing that this is depth, not a new topic).
Learning Path is a plan — this one can look more like a program/course entry point: show 2–3 tiny preview items ("Accounting fundamentals," "Excel for accounting"...) rather than just a label and a subtitle, so the student sees a preview of what they're clicking into, not just a category name.


Making them structurally different (not just re-colored copies of the same card) signals they lead somewhere different, which matches reality.

6. Zero-state handling (this is a first attempt, score is 0 everywhere)

A dashboard that is legitimately all zeros needs to avoid reading as "broken" or "you failed everything" — same principle as the other tabs. Concretely here:


The composition bar's segments should render as faint outlined/dashed blocks with 0 fill, not solid gray dead bars — dashed reads as "not yet," solid gray reads as "disabled/broken."
Under the big score dial, replace a bare "0/100" with a short honest framing line, e.g. "Your first attempt — here's exactly where to focus" directly above the primary CTA, so the number has context before the student's eye even reaches the breakdown.
National Rank "#49" next to a 0 score needs a caveat treatment (small muted subtext like "based on today's cohort") so it doesn't read as an alarming, unexplained absolute judgment sitting right next to a zero.


7. Non-negotiables to avoid "AI slop" territory


No decorative icons that don't map to something real (the current 📊/🎓-in-a-box emoji-style icons on the footer cards should be replaced with purposeful iconography tied to what's inside — e.g. the actual composition-bar shape as a mini icon for Full Results, a small stacked-books/progress icon that reflects real course content for Learning Path).
No banner-as-decoration: the "Full preparation recommended before retesting" strip should be functionally tied to the score dial (it's explaining the band status), not a floating colored ribbon disconnected from the number below it.
Every number on the page must be explainable in one glance without reading a caption — if a stat needs a full sentence next to it to make sense (like the current formula text), it's a sign the visual itself isn't doing its job yet.
Consistent weight given to consistent things: right now AI Interview gets a big dedicated box while four other layers get a single flattened row — resolve this asymmetry per section 4 above rather than leaving it accidental.



Net structural change, summarized

Before: banner → big number + rank → six-row/six-column table full of dashes → oddly-emphasized single-layer callout box → two mismatched CTA cards.
After: one unified header (dial + band + rank + primary CTA) → one composition bar (weight-proportioned, fill-showing-achievement) with a slim expandable legend replacing the table → consistent per-layer treatment including AI Interview → two purposefully differentiated destination cards.