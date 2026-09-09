import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const PROSE = { fontFamily: "var(--font-body)", fontSize: "clamp(16px,1.8vw,18px)", color: "var(--text-2)", lineHeight: 1.72 } as const;

function Rule() {
  return <div className="my-16 md:my-24 h-px" style={{ background: "var(--hairline-strong)" }} />;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 11, letterSpacing: "0.07em", color: "var(--violet)", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function MonoLabel({ children, color = "var(--text-3)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 11, letterSpacing: "0.07em", color, textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Sample verified candidate card (the hero device) ─── */
function SampleCandidateCard() {
  return (
    <div
      className="grain rounded-[16px] p-6 md:p-7"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--hairline-strong)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      {/* header row */}
      <div className="flex items-center justify-between">
        <MonoLabel color="var(--teal, #51C1B5)">● Verified · sample</MonoLabel>
        <MonoLabel color="var(--text-3)">JREE ID · ████-▒▒▒▒</MonoLabel>
      </div>

      {/* candidate identity (PII blurred) */}
      <div className="mt-6 flex items-center gap-4">
        <div
          className="rounded-full"
          style={{ width: 56, height: 56, background: "var(--surface-2)", border: "1px solid var(--hairline-strong)", filter: "blur(4px)" }}
        />
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.01em", filter: "blur(3px)" }}>
            Ananya ████████
          </div>
          <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}>
            B.Tech CSE · Pune · 2025 batch
          </div>
        </div>
      </div>

      {/* score block */}
      <div className="mt-7 flex items-end gap-5">
        <div>
          <MonoLabel>JREE score</MonoLabel>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 64, color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
            87
          </div>
        </div>
        <div className="pb-1">
          <span
            className="inline-flex items-center rounded-full"
            style={{
              padding: "4px 10px",
              background: "var(--lime)",
              color: "var(--on-lime)",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.05em",
            }}
          >
            BAND A
          </span>
          <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>
            Top 8% nationally
          </div>
        </div>
      </div>

      {/* 5-layer summary */}
      <div className="mt-7 pt-6" style={{ borderTop: "1px solid var(--hairline)" }}>
        <MonoLabel>Five-layer summary</MonoLabel>
        <div className="mt-4 flex flex-col gap-2.5">
          {[
            ["Aptitude", 92],
            ["Domain knowledge", 88],
            ["Communication", 84],
            ["Workplace behaviour", 86],
            ["Role-fit · SDE I", 89],
          ].map(([k, v]) => (
            <div key={k as string} className="flex items-center gap-4">
              <span className="w-[150px]" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>{k}</span>
              <div className="flex-1 h-[3px] rounded-full" style={{ background: "var(--hairline)" }}>
                <div className="h-full rounded-full" style={{ width: `${v}%`, background: "var(--lime)" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-1)", letterSpacing: "-0.01em", minWidth: 28, textAlign: "right" }}>{v as number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* verdict */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        className="mt-6 pt-5 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--hairline-strong)" }}
      >
        <div>
          <MonoLabel color="var(--lime-text, var(--lime))">Role-fit verdict</MonoLabel>
          <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
            Strong fit for Software Engineer I
          </div>
        </div>
        <button
          style={{
            height: 36, padding: "0 14px", borderRadius: 999,
            border: "1px solid var(--hairline-strong)", background: "transparent",
            color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12, cursor: "default",
          }}
        >
          Locked · 1 credit
        </button>
      </motion.div>
    </div>
  );
}

/* ─── 5-step flow ─── */
function FiveStep() {
  const steps = [
    { n: "01", t: "Register", s: "GST verified · 2 minutes" },
    { n: "02", t: "Search", s: "Eight filters, free to browse" },
    { n: "03", t: "Preview", s: "Score, layers, AI interview" },
    { n: "04", t: "Unlock", s: "One credit reveals contact" },
    { n: "05", t: "Pipeline", s: "Shortlisted → hired" },
  ];
  return (
    <div className="mt-10">
      {/* Desktop horizontal */}
      <div className="hidden md:block relative">
        <div className="absolute top-[14px] left-[6%] right-[6%] h-px" style={{ background: "var(--hairline-strong)" }} />
        <div className="relative grid grid-cols-5 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col items-start">
              <div
                className="rounded-full"
                style={{ width: 28, height: 28, background: "var(--bg)", border: "1px solid var(--violet)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--violet)", letterSpacing: "0.04em" }}>{s.n}</span>
              </div>
              <div className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{s.t}</div>
              <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{s.s}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile vertical */}
      <div className="md:hidden flex flex-col gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className="flex gap-4 py-4" style={{ borderTop: i === 0 ? "1px solid var(--hairline-strong)" : "1px solid var(--hairline)" }}>
            <div
              className="rounded-full flex-shrink-0"
              style={{ width: 28, height: 28, background: "var(--bg)", border: "1px solid var(--violet)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--violet)" }}>{s.n}</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-1)" }}>{s.t}</div>
              <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Pricing plan ─── */
function PricingPlan({
  name, price, blurb, features, accent = false, ctaLabel, ctaHref,
}: {
  name: string; price: string; blurb: string; features: string[]; accent?: boolean; ctaLabel: string; ctaHref: string;
}) {
  return (
    <div
      className="rounded-[16px] p-6 md:p-7 flex flex-col"
      style={{
        background: "var(--surface-1)",
        border: accent ? "2px solid var(--violet)" : "1px solid var(--hairline-strong)",
      }}
    >
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{name}</span>
        {accent && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", color: "var(--violet)", textTransform: "uppercase" }}>
            Most popular
          </span>
        )}
      </div>
      <div className="mt-5 flex items-baseline gap-1">
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>{price}</span>
      </div>
      <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", lineHeight: 1.55 }}>{blurb}</p>

      <div className="mt-6 pt-5 flex flex-col gap-3" style={{ borderTop: "1px solid var(--hairline)" }}>
        {features.map((f) => (
          <div key={f} className="flex items-start gap-3">
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: "var(--violet)", flexShrink: 0, marginTop: 1 }}>—</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>

      <a
        href={ctaHref}
        className="mt-7 inline-flex items-center justify-center rounded-full transition-all hover:brightness-[1.05] active:scale-[0.98]"
        style={{
          height: 44,
          background: accent ? "var(--lime)" : "transparent",
          color: accent ? "var(--on-lime)" : "var(--text-1)",
          border: accent ? "1px solid var(--lime)" : "1px solid var(--violet)",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
          textDecoration: "none",
        }}
      >
        {ctaLabel}
      </a>
    </div>
  );
}

/* ─── main page ─── */
export function ForEmployersPage() {
  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
      <div className="max-w-[1080px] mx-auto px-5 sm:px-8 pb-32">

        {/* ─── 1. Hero ─── */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="pt-16 md:pt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start"
          >
            <div className="md:col-span-7">
              <MonoLabel>For hiring teams · Trusted by EduBridge</MonoLabel>
              <h1
                className="mt-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(40px,7vw,72px)",
                  color: "var(--text-1)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Stop screening.{" "}
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>
                  Start hiring.
                </span>
              </h1>

              <p className="mt-7 max-w-[560px]" style={PROSE}>
                Pre-assessed, job-ready candidates with verified scores across aptitude, communication,
                domain knowledge, and workplace behaviour — before you ever schedule an interview.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#signup"
                  className="inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    height: 52, padding: "0 26px", background: "var(--violet)", color: "var(--on-violet)",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em",
                    boxShadow: "var(--shadow-card)", textDecoration: "none",
                  }}
                >
                  Register your company free
                </a>
                <a
                  href="#for-employers"
                  className="inline-flex items-center justify-center transition-colors hover:text-[var(--text-1)]"
                  style={{ color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, textDecoration: "none" }}
                >
                  See a sample candidate profile →
                </a>
              </div>

              {/* Stat strip */}
              <div className="mt-12 pt-6 grid grid-cols-3 gap-6" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
                {[
                  ["2,800+", "assessed candidates"],
                  ["914", "verified questions"],
                  ["A / B", "only bands shown to employers"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px,2.6vw,26px)", color: "var(--text-1)", letterSpacing: "-0.02em" }}>{n}</div>
                    <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)", lineHeight: 1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <SampleCandidateCard />
              <p className="mt-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                [Sample candidate · PII blurred until unlocked]
              </p>
            </div>
          </motion.div>
        </Section>

        <Rule />

        {/* ─── 2. Problem ─── */}
        <Section>
          <Eyebrow>Sound familiar?</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,48px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Campus hiring is broken.
          </h2>
          <p className="mt-5 max-w-[680px]" style={PROSE}>
            The average cost-to-hire from campus drives is around ₹40,000. Roughly 60% of fresh graduates
            still can't write a professional email. You're not screening for talent — you're screening for noise.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
            {/* Before */}
            <div className="py-8 md:py-10 md:pr-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
              <MonoLabel color="var(--text-3)">Before JREE</MonoLabel>
              <div className="mt-5 flex flex-col gap-5">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3.4vw,34px)", color: "var(--text-3)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  500 résumés →<br />5 hires.
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-3)", lineHeight: 1.65 }}>
                  Looks-good-on-paper candidates. No objective comparison. Different test every company.
                  Recruiters spend 60% of their time filtering out people who shouldn't have made it through.
                </div>
              </div>
            </div>
            {/* After */}
            <div
              className="py-8 md:py-10 md:pl-10"
              style={{
                borderTop: "1px solid var(--hairline-strong)",
                borderLeft: "1px solid var(--hairline-strong)",
              }}
            >
              <MonoLabel color="var(--lime-text, var(--lime))">With JREE</MonoLabel>
              <div className="mt-5 flex flex-col gap-5">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3.4vw,34px)", color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  40 verified →<br />12 hires.
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.65 }}>
                  Every candidate pre-scored across five layers, on the same national rubric.
                  You filter, preview, and call only the people the data already says are ready.
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Rule />

        {/* ─── 3. How it works ─── */}
        <Section>
          <Eyebrow>The JREE difference</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            Every candidate is pre-scored before you see them.
          </h2>
          <p className="mt-5 max-w-[680px]" style={PROSE}>
            Five layers of assessment — aptitude, domain knowledge, communication, workplace behaviour,
            and role-fit — run before a candidate ever appears in your search. Only Band A (80+) and
            Band B (65–79) are visible to hiring teams. Everything below stays out of your queue.
          </p>
          <FiveStep />
        </Section>

        <Rule />

        {/* ─── 4. What you get ─── */}
        <Section>
          <Eyebrow>Built for hiring teams</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            Everything you need. Nothing you don't.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {[
              { label: "Pay-per-unlock", body: "Browse free. Spend a credit only when you want a candidate's contact details." },
              { label: "Role-readiness scores", body: "Each candidate scored against the specific role you're hiring for, not a generic average." },
              { label: "Eight-filter search", body: "Score, band, domain, location, batch, college tier, role-fit, language. Combine freely." },
              { label: "AI interview preview", body: "Watch the 20-minute video answers before unlocking — voice, clarity, composure on tape." },
              { label: "Hiring pipeline kanban", body: "Shortlist, schedule, offer, hired. One board for every requisition you're running." },
              { label: "Analytics dashboard", body: "Funnel conversion, time-to-hire, source quality. The numbers your CEO actually asks about." },
            ].map((f, i) => (
              <div
                key={f.label}
                className="py-6"
                style={{ borderTop: i < 2 ? "1px solid var(--hairline-strong)" : "1px solid var(--hairline)" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
                  {f.label}
                </div>
                <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
                  {f.body}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Rule />

        {/* ─── 5. Pricing ─── */}
        <Section>
          <Eyebrow>Simple, transparent pricing</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            Pay for access. Not for noise.
          </h2>
          <p className="mt-5 max-w-[680px]" style={PROSE}>
            No job-posting fees. No per-résumé charges. Search the entire verified pool freely —
            you only pay when you decide to unlock a candidate's contact details.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            <PricingPlan
              name="Starter"
              price="₹4,999"
              blurb="For small teams hiring one or two roles a quarter."
              features={["10 contact unlocks", "All 8 search filters", "AI interview preview", "Email support"]}
              ctaLabel="Start with Starter"
              ctaHref="#signup"
            />
            <PricingPlan
              name="Growth"
              price="₹14,999"
              blurb="For active hiring teams running multiple requisitions."
              features={["40 contact unlocks", "Hiring pipeline kanban", "Analytics dashboard", "Priority support"]}
              accent
              ctaLabel="Choose Growth"
              ctaHref="#signup"
            />
            <PricingPlan
              name="Enterprise"
              price="₹50,000"
              blurb="For companies hiring at scale across batches and locations."
              features={["200 contact unlocks", "Multi-seat access · SSO", "API · ATS integration", "Dedicated account manager"]}
              ctaLabel="Talk to sales"
              ctaHref="#signup"
            />
          </div>

          <p className="mt-8" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>
            All plans include free browsing. You only pay when you unlock contact details.
          </p>
        </Section>

        <Rule />

        {/* ─── 6. Trust / EduBridge ─── */}
        <Section>
          <Eyebrow>Backed by EduBridge</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            Built on 10 years of placement data.
          </h2>
          <p className="mt-5 max-w-[680px]" style={PROSE}>
            Since 2014, EduBridge has placed over 10,000 students into roles across 200+ companies.
            JREE is the same direct-hire framework — the one that historically converts at 11.5% —
            turned into a platform any hiring team can use.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {[
              ["GST-verified employers only", "Every hiring account is verified against India's GST registry before contact unlock is enabled."],
              ["Question rubric aligned to O*NET, EQF Level 4, WorldSkills", "Assessment design follows international occupational standards — not internal opinion."],
              ["DPDP-compliant data practices", "Candidate data handled under India's Digital Personal Data Protection Act, 2023. Per-share consent throughout."],
              ["Enterprise AI stack", "Gemini for language reasoning, Deepgram for voice transcription. Audited, logged, reproducible."],
            ].map(([h, b], i) => (
              <div
                key={h}
                className="py-6"
                style={{ borderTop: i < 2 ? "1px solid var(--hairline-strong)" : "1px solid var(--hairline)" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{h}</div>
                <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>{b}</div>
              </div>
            ))}
          </div>

          {/* Logo / testimonial slots */}
          <div className="mt-14 pt-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
            <MonoLabel>Early hiring partners</MonoLabel>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[12px] flex items-center justify-center"
                  style={{ height: 72, background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    [Partner logo {i}]
                  </span>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="mt-12">
            <div className="h-px mb-6" style={{ background: "var(--hairline-strong)" }} />
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2.4vw,26px)", color: "var(--text-1)", lineHeight: 1.42, letterSpacing: "-0.01em" }}>
              [Beta-employer testimonial — e.g. "We hired four engineers in three weeks without a single CV screen.
              The score told us who to call, and the score was right."]
            </p>
            <footer className="mt-5 flex items-center gap-3">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                — [Name]
              </span>
              <span style={{ color: "var(--hairline-strong)" }}>·</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.04em" }}>
                [Head of Talent, Beta Co.]
              </span>
            </footer>
          </blockquote>
        </Section>

        {/* ─── 7. Final CTA band ─── */}
        <div
          className="mt-24 rounded-[18px] overflow-hidden"
          style={{ background: "var(--bg-3, var(--bg-3))", border: "1px solid var(--hairline-strong)" }}
        >
          <div className="px-7 md:px-14 py-14 md:py-20 max-w-[820px]">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,52px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.04 }}>
              Ready to hire{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>
                smarter?
              </span>
            </h2>
            <p className="mt-6 max-w-[560px]" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.7vw,17px)", color: "var(--text-2)", lineHeight: 1.65 }}>
              Join 50+ companies already using JREE. Registration takes two minutes. Your first search is free.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#signup"
                className="inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  height: 52, padding: "0 26px", background: "var(--violet)", color: "var(--on-violet)",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em",
                  boxShadow: "var(--shadow-card)", textDecoration: "none",
                }}
              >
                Register your company
              </a>
              <a
                href="#signup"
                className="inline-flex items-center justify-center transition-colors hover:text-[var(--text-1)]"
                style={{ color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, textDecoration: "none" }}
              >
                Browse the candidate pool first →
              </a>
            </div>
            <p className="mt-10 pt-6" style={{ borderTop: "1px solid var(--hairline)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Verified by EduBridge · GST-secured · DPDP compliant
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
