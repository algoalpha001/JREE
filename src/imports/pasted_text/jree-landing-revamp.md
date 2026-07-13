JREE — LANDING PAGE REVAMP
Light-theme conversion + role-selection entry + violet primary buttons. Supersedes all previous dark-theme instructions.
Repo: algoalpha001/JREE — Vite + React + TS, Tailwind v4, shadcn/ui, Framer Motion. Routing is hash-based in src/app/App.tsx (getRoute() parses window.location.hash). Design tokens live in src/styles/fonts.css. Do not add React Router.

1 — Light theme everywhere
Light tokens already exist — don't invent a new palette. src/styles/fonts.css already defines a full [data-theme="light"] block (cream --bg: #FAF7F0, white surfaces, violet #5E4A9E, olive --lime-text: #6E7B1F, real shadow tokens). Make it the default.

Move the [data-theme="light"] block into :root. Delete the dark block (:root, [data-theme="dark"]) and all dark-only variables (dark --hero-spotlight-*, --handoff-img-filter: grayscale(...), dark shadows). Set color-scheme: light.
Delete src/app/components/ThemeToggle.tsx and every useTheme / <ThemeToggle> import and usage (in Nav.tsx and elsewhere). Remove the jree-theme localStorage logic, the data-theme plumbing, and the prefers-color-scheme dark fallback. No toggle, no dark path.
In src/styles/theme.css, strip the .dark {} block and the @custom-variant dark line so no shadcn component falls back to dark.
Hunt hardcoded dark values — these won't resolve through tokens: SignupHeader in App.tsx (background: "rgba(11,9,15,0.75)"), and dark-mode hairlines rgba(240,235,255,…) across Sections.tsx, PostSignup.tsx, ResumeBuilder.tsx, Login.tsx, Onboarding.tsx, Hero.tsx, StyleGuide.tsx. Grep raw dark hex/rgba and route through tokens.
Hierarchy comes from elevation, not dark-vs-light contrast. Use --shadow-card / --shadow-elevated / --shadow-highest, hairline borders, and tonal steps between white cards and the cream page. No glow shadows — kill leftovers like boxShadow: "0 8px 24px rgba(201,220,83,0.2)".
Applies to every screen: entry page, all role pages, registration, exam flow, Priya interview, results, resume builder, dashboards, legal pages, style guide.

2 — Violet primary buttons
--violet is now the only primary action color. No lime-filled buttons anywhere.

Primary: --violet fill, --on-violet (white) text. Secondary/ghost: transparent fill, --violet-border, violet text. Hover/active scale from violet, never lime.
Fix specifically: AboutUsPage.tsx:816 (lime CTA + lime glow), FinalCTACards.tsx (ctaBg: "var(--lime)", ~line 205), plus primary CTAs in Hero.tsx, Onboarding.tsx, Login.tsx, ForStudents.tsx.
Lime and teal survive only as data/accent colors (band tags, chart fills, verified badges, serif italic accent words) — never a button surface.
Critical: lime as text on light must use --lime-text (olive #6E7B1F), never raw --lime (#C9DC53) — it fails WCAG AA on white. Same for teal → --teal-text, amber → --amber-text.

3 — New role-selection entry page
The root (empty hash) currently renders the whole marketing scroll. Replace it.
Create src/app/components/EntryPage.tsx. In App.tsx, the default/landing branch renders <EntryPage />.
Contents — nothing else on this page. No nav links, no hero paragraph, no stats ticker, no testimonials. A clean fork-in-the-road.

Top: JREE wordmark only. One short framing line, e.g. "Who are you here as?" — brief, not a headline paragraph.
Three selection cards — Student · Employer · College. Side by side on desktop, stacked on mobile. Each a large, fully-clickable area with real visual weight.

Student → one line (know your score, get hired faster) → #for-students
Employer → one line (pre-assessed candidates, hire faster) → #for-employers
College → one line (batch readiness, national benchmarking) → #for-colleges
Identical visual weight — none featured. A neutral fork.
Hover: subtle elevation lift + violet-tinted border, consistent across all three.
Real icons (Tabler or similar). Never emoji.


Footer: short and minimal — logo, Privacy / Terms / Contact, copyright. Deliberately simpler than the role-page footers.
Background: light, clean, generous whitespace. Subtle tint is fine; no dark hero, no gradient mesh, no glassmorphism. Reads in under three seconds.

4 — The existing landing scroll becomes the Student page
Do not build a new student page. The current landing route already is the student page — move it and strip the wrong-audience sections.

Add "for-students" to the Route union and getRoute() (accept #for-students and #students).
Take the existing landing JSX block — currently returned as the default (Nav → Hero → StakeholderCards → WhoFor → HowItWorks → MeetPriya → ForStudents → Bands → ForColleges → ForEmployers → Stats → Testimonials → AboutUs → FinalCTACards → FAQ → FinalCTA → Footer) — and render it for #for-students.
Remove exactly these four, nothing else: <StakeholderCards /> (the "01 / WHERE DO YOU FIT" chooser — that's the entry page's job now), <ForColleges />, <ForEmployers />, <FinalCTACards /> (the "Get Started" three-panel block). Drop their orphaned wrapper divs and imports.
Everything else stays exactly as-is — same components, same order, same content, same animations, apart from the global light-theme and violet-button changes.

Resulting student page: Nav → Hero → WhoFor → HowItWorks → MeetPriya → ForStudents → Bands → Stats → Testimonials → AboutUs → FAQ → FinalCTA → Footer.
Optionally extract into ForStudentsPage.tsx for tidiness, but it must be a straight lift of the existing JSX minus those four — no restructuring, no new sections, no rewritten copy.
5 — Routing (hash-based)
RouteRenders# (empty)<EntryPage /> (new)#for-studentsexisting landing scroll, minus the four removed sections#for-employers<ForEmployersPage /> (exists)#for-colleges<ForCollegesPage /> (exists)

Each role page keeps its own full nav (role links, login, primary CTA). Nav appears only inside a role page — never on the entry page.
Each role page's nav gets a way back to the entry page (logo click or subtle "Switch portal" → window.location.hash = ""), so a visitor on the wrong page can re-choose.
Delete src/app/App-3.tsx — dead duplicate.

6 — Locked design rules

No red anywhere. Gaps and low bands use amber-as-opportunity, framed as a position to move next, never a verdict. Band D reads "Needs Support." The word "weak" never appears.
Horizontal bars only — no radars, no score rings, no circular gauges.
Sentence case. Real icons, never emoji.
No AI-slop: no three identical rounded cards, no gradient mesh, no glassmorphism, no glowing tiles, no stock-photo filler.
Motion resolves and rests — no infinite loops.

7 — Verify
Every route (#, #for-students, #for-employers, #for-colleges, #about-us, #terms, #privacy, #security, #login, #signup, #resume-builder, #dashboard, #exam/*, #results, #styleguide) renders in light theme with no dark remnants, no lime-filled buttons, all text passing WCAG AA on cream/white, and no flash of dark on load.