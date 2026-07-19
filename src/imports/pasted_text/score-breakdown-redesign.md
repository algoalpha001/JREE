1 — Four tabs, in order: Score Breakdown · Skills & Roles · AI Interview · Certificate. Remove standalone Overview (folds into Score Breakdown) and Improvement Plan (becomes a separate page). Persistent header (hero line, band tag, percentile) stays above all four.

2 — Score Breakdown tab — the priority. Personal, precise, motivating.
Creative direction — "The climb, not the verdict." The whole tab is built around one idea: where you are and the single move that lifts you. Not a data dump.

Open with one earned sentence, data-driven: names the user's actual strongest layer and their one growth lever. "Your standout is your AI Interview. Your fastest lift is Cognitive & Aptitude." Confident, specific, one line.
Signature device — the composite climb bar. A single horizontal band track (D→C→B→A) with the user's marker where they sit now, and a faint ghost marker showing where they'd land if they lifted their lever layer. On load it animates once: the lever's potential fills, the marker slides toward the next band. This replaces the radar and makes the composite feel movable, not fixed.
The 5 layers as horizontal bars (keep Image 4's treatment): score/100, weight, one-line description, points-to-composite, and a violet "Practice [layer] →" routing to #learn/:layer. Strongest bar tagged "your strength"; lever tagged "start here" in amber.
Replace the radar/orbital chart (Image 5) entirely with a strongest→growth horizontal ranking. No radars, gauges, or orbiting circles.
Kill the generic grey paragraph. Replace with 2–3 tight personal lines naming real layers and the specific next move. No adjective soup.

Edge cases — Score Breakdown:

Near-zero / Band D (the shots): must feel like a starting line, not a failure. Lead with the relative strength even if absolute is low ("AI Interview is where you're strongest"). Never show 0/100 as the dominant number without the climb framing around it. This is the case to design against first — if it's encouraging here, it works everywhere.
All layers equal (flat profile): no clear lever. Fall back to "biggest-weight layer" as the recommended focus; don't show a broken "strongest" tie.
Perfect / near-perfect (Band A, 95+): no "start here" lever needed — flip the framing to "maintain + stretch," celebrate, point to advanced roles, hide the climb-to-next-band device (there's no next band).
Percentile at extremes: "higher than 0%" or "higher than 99%" must both read gracefully — cap copy so it never says "higher than 0% of candidates" bluntly; reframe as "you're at the start of the pack."
Missing layer data (an exam layer didn't record): show the layer as "not captured," never as 0, and exclude it from "strongest/lever" logic.


3 — Skills & Roles tab.
Creative direction — "Every skill is a door." Each skill visibly points somewhere: skill → the roles it unlocks → the course that builds it.

Skill cards (Images 1–3): skill name, "Needed for" role chips, "By sub-topic" breakdown, and a primary violet "Start learning →" routing to #learn/:skill. The button is the point of the card.
Drop the red-adjacent "PRIORITY · 0%" — use amber-as-opportunity.
Fix the repeated "No course available yet" spam (currently ~15 identical lines — reads as broken). One designed empty state, or group unavailable skills under a single "Courses coming soon" section.

Edge cases — Skills & Roles:

No courses exist yet for any skill (current reality): the whole tab can't be dead ends. Every skill still shows its roles + sub-topics; the CTA becomes "Notify me when ready" instead of a broken link.
Skill maps to zero roles: hide the "Needed for" block rather than showing an empty one.
Very long role lists (some cards show 15+ chips): cap visible chips, add "+6 more" expander, or the card blows out vertically.
All skills at 0%: don't render 15 identical "PRIORITY 0%" tags — collapse into "start anywhere, here's the recommended order."


4 — NEW PAGE: Improvement Plan (#learn, deep-link #learn/:skill).
Creative direction — a learning path, not a course dump. Udemy-style listing but framed as your path with a payoff.

Header: the skill/layer, current level, and the lift ("close this to raise your composite ~X pts").
Course cards: title, short desc, lessons/duration, level, progress state, violet "Start / Continue." A path spine for sequential modules (1→2→3) showing order and payoff.
Full page, own nav, back-to-results link. Frame as forward motion, never remedial.

Edge cases — Improvement Plan:

No courses built yet (likely at launch): the page must not be empty/broken. Designed "coming soon" state with a notify option and, ideally, free interim resources or the sub-topic list to self-study. This is the most likely real state — design it as a first-class view, not an afterthought.
Deep-link to a skill with no page (#learn/unknown): graceful fallback to the full catalog, not a crash.
Course partially complete / resumed: progress state must persist visually (in-memory for now; localStorage doesn't run in this environment — note for real build).
Locked/paid modules (if any tie to re-attempt/Growth): show a clean locked state, not a dead click.


5 — AI Interview & Certificate tabs.

AI Interview: consolidate Images 5–6 — Overall/Context/Clarity/Confidence cards, L5 bar, question-by-question feedback. Green feedback text → --teal-text (olive) for AA. No radar.

Edge cases: candidate gave no answer (Q2/Q3 show 0 — Image 6): feedback must stay encouraging and specific ("add an answer next time"), never scolding. Interview not taken at all: show "not completed" state with a re-attempt path, not zeros. All-zero interview: don't render four "0" metric cards as the hero; lead with the guidance.


Certificate: keep Image 7 structure. Verify entity name (EBSC Technologies vs EduBridge Learning — the shot says EBSC; confirm which is legally correct before this ships on a verifiable cert). QR stays black-on-white. Download PDF violet primary; LinkedIn/WhatsApp secondary.

Edge cases: Band D on a shareable certificate — decide the policy: does a Band D cert get the same "verified credential / share on LinkedIn" prominence, or is sharing de-emphasized until Band C+? Right now you'd be encouraging someone to broadcast a 2/100. Very long names (Image 7's name is centered large — a 30-char name must not overflow). Name with special characters / single name. PDF/share fails — button needs a failed state, not a silent no-op.




6 — Cross-cutting edge cases (whole results page).

Direct load of #results with no exam data (user navigates there fresh): redirect to dashboard or show "no result yet — take the assessment," never an empty skeleton.
Tab deep-links (#results sub-routes): each of the four tabs deep-linkable and refresh-safe.
Re-attempt exists: if the user has taken it twice, which result shows? Decide and label ("latest attempt").
Slow/failed score load: real loading and error states, not a blank flash.


7 — Rules & verify.
No red; amber = opportunity. Horizontal bars only, no radars/gauges. "Weak" never appears; Band D = "Needs Support," a starting line. Sentence case, real icons, motion resolves once and rests. Every "Practice →" / "Start learning →" routes to #learn/:skill. Verify all four tabs + #learn in light theme, AA contrast, violet CTAs, no dark remnants, no repeated empty-state spam — and test the entire flow against the Band D / 2-100 / no-course data state specifically, since that's the worst case and the one in the current build.