JREE — End-to-end audit prompt
Repo: algoalpha001/JREE. Vite + React + TS, Tailwind v4, Framer Motion. Hash routing in src/app/App.tsx. Tokens in src/styles/fonts.css.
Task: Audit every screen end to end, on two axes — (A) visual/theme correctness, (B) product soundness. Produce a written report first, then fix. Don't fix silently; list what you found so it can be reviewed.

Part A — Theme & token audit
Light theme is now the default and violet is the only primary button fill. Sweep the entire codebase for anything that didn't get the memo.
Confirmed bugs to fix (found already — treat as examples of the class of bug, not the full list):

Onboarding.tsx:612 — admit card hardcodes background: "linear-gradient(180deg,#15101F 0%,#0E0B17 100%)". Black gradient in light mode. Replace with a light surface + --shadow-elevated.
Onboarding.tsx:614 — heavy dark shadow rgba(0,0,0,0.55) + rgba(255,255,255,0.04) inset borders (dark-mode idiom). Replace with light shadow tokens.
Onboarding.tsx:101 — button text is var(--text-1) on a violet fill. In light mode --text-1 is near-black ink → black text on a violet button. Must be --on-violet (white). This is the "Scan Document" button bug. Grep for every button where fill and text color don't come from a matched pair.
Onboarding.tsx:317 — boxShadow: "0 20px 40px rgba(0,0,0,0.3)" — dark-mode shadow.
Onboarding.tsx:171 — rgba(240,235,255,0.08) — dark-mode hairline (light-on-dark). Invisible on cream.
Onboarding.tsx:723 — bg-black QR/stamp cells (may be intentional for a QR — verify, don't blindly flip).
Lime-filled buttons — Onboarding.tsx:100 (isLime ? var(--lime)), AboutUsPage.tsx:816, FinalCTACards.tsx. All primary fills → violet.

Systematic sweep — run these greps across src/, not just the files above:

Raw dark hex: #0, #1, #2 prefixed colors in style={{}} blocks.
rgba(0,0,0,...) shadows → light shadow tokens.
rgba(255,255,255,...) and rgba(240,235,255,...) borders/hairlines → --hairline / --hairline-strong.
bg-black, text-white, text-black Tailwind classes.
Any linear-gradient containing a hardcoded dark stop.
Every background: var(--violet) / var(--lime) — confirm its paired text color is --on-violet / --on-lime, never --text-1.
Every lime/teal/amber used as text → must be --lime-text / --teal-text / --amber-text (the darkened variants) or it fails WCAG AA on white.
Glow shadows (0 0 Npx rgba(...)) → remove; light mode uses real shadows.

Highest-risk files (most dark-mode idioms): Onboarding.tsx, PostSignup.tsx (exam flow, results), ResumeBuilder.tsx, Sections.tsx, Login.tsx, StyleGuide.tsx, and SignupHeader in App.tsx (rgba(11,9,15,0.75)).
Check every screen visually, not just the marketing pages: entry page, student page, employer page, college page, login, signup/onboarding (all steps), pre-exam check, exam active, exam transition, Priya interview, processing, results (all 5 tabs), resume builder, dashboards, terms, privacy, security, style guide.
For each: no dark surfaces, no black-on-violet or white-on-cream text, contrast AA (4.5:1) for body text, focus states visible, disabled states legible, and no flash of dark on load.

Part B — Screen-by-screen product audit
For every screen, answer these four questions in writing. Flag anything unresolved.

What is the user trying to do here? One sentence. If a screen can't be reduced to one clear intent, it's doing too much.
What can go wrong? Enumerate the edge cases and confirm each has a designed state:

Empty — no data yet (no scores, no candidates, no batch uploaded, empty search).
Loading — what's on screen while the exam loads, the AI processes, the dashboard fetches.
Error — network drop mid-exam, upload fails, payment fails, camera/mic denied for the Priya interview.
Partial/interrupted — user closes the tab mid-exam; refreshes; back button; timer expires; session lost.
Permission/gating — locked employer nodes (blurred PII, spent credits, zero credits), college setup incomplete, wrong-role login.
Validation — bad email, bad college ID scan, unreadable document, underage user, duplicate account.
Extremes — very long names, 4-digit ranks, 0 score, Band D, a college with 5 students vs 5,000.


Which business metric does it affect? Registration completion, exam completion rate, employer unlock conversion, college onboarding, re-attempt purchase. Name it. If a screen affects no metric, ask why it exists.
What happens immediately before and after? Confirm the entry and exit are real — no dead ends. Every terminal state (failed payment, Band D, exam invalidated, zero search results) must offer a next action.

Known product rules to check against while auditing:

No dead ends anywhere — every state has a way forward.
Employers see output, not process; PII stays blurred until a paid unlock.
Exam is a locked wizard — no nav chrome, server-side timer.
Band D is "Needs Support." The word "weak" never appears. No red for score states — amber-as-opportunity only.
Gaps framed as a position to move next, never a verdict.
Horizontal bars only; no radars, no rings, no gauges.
DPDP: consent before collection, PII blurred, no data exposed pre-unlock.


Output format
Deliver a table before making any changes:
ScreenIssueType (theme / edge case / dead end / a11y)SeverityFix
Then apply fixes in severity order. Don't refactor beyond what's listed — this is a correctness pass, not a redesign.