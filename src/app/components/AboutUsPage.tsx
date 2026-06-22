import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ease = [0.16, 1, 0.3, 1] as const;
const MEASURE = "max-w-[680px]";
const PROSE = { fontFamily: "var(--font-body)", fontSize: "clamp(16px,1.8vw,18px)", color: "var(--text-2)", lineHeight: 1.72 } as const;

/* ─── shared atoms ─── */
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

function Photo({ src, alt, aspect = "56.25%" }: { src: string; alt: string; aspect?: string }) {
  return (
    <div className="relative grain overflow-hidden rounded-[14px]" style={{ border: "1px solid var(--hairline-strong)", paddingBottom: aspect }}>
      <ImageWithFallback
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(0.6) contrast(1.04) brightness(0.72) sepia(0.12)" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(30,22,48,0.38)", mixBlendMode: "multiply" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,9,15,0) 40%, rgba(11,9,15,0.5) 100%)" }} />
    </div>
  );
}

function PullQuote({ quote, name, title }: { quote: string; name: string; title: string }) {
  return (
    <blockquote className="my-12 md:my-16">
      <div className="h-px mb-6" style={{ background: "var(--hairline-strong)" }} />
      <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2.4vw,26px)", color: "var(--text-1)", lineHeight: 1.42, letterSpacing: "-0.01em" }}>
        {quote}
      </p>
      <footer className="mt-5 flex items-center gap-3">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          — {name}
        </span>
        <span style={{ color: "var(--hairline-strong)" }}>·</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.04em" }}>
          {title}
        </span>
      </footer>
    </blockquote>
  );
}

/* ─── main page ─── */
export function AboutUsPage() {
  const goBack = () => { window.location.hash = ""; };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
      {/* Slim back-nav */}
      <div className="sticky top-0 z-50" style={{ background: "rgba(11,9,15,0.8)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid var(--hairline-strong)" }}>
        <div className="max-w-[760px] mx-auto px-5 sm:px-8 h-[54px] flex items-center justify-between">
          <button
            onClick={goBack}
            style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--text-2)", background: "none", border: "none", cursor: "pointer" }}
            className="hover:text-[var(--text-1)] transition-colors"
          >
            ← Back to JREE
          </button>
          <Eyebrow>About Us</Eyebrow>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-5 sm:px-8 pb-32">

        {/* ─── 1. Opening ─── */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="pt-16 md:pt-24"
          >
            <Eyebrow>Why we built this</Eyebrow>
            <h1
              className="mt-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(36px,6vw,60px)",
                color: "var(--text-1)",
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
              }}
            >
              We built JREE because a degree was never enough —{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
                and everyone knew it.
              </span>
            </h1>

            <p className="mt-8" style={PROSE}>
              Students graduated and couldn't explain what they were good at. Colleges sent batches into
              placement season without knowing who was ready. Employers screened hundreds of CVs by hand,
              guessing at fit, calling too many, hiring too few. The degree said "qualified." The market said
              "prove it." No one had built the bridge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-12"
          >
            <Photo
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbGxlZ2UlMjBjYW5kaWQlMjBjb3VydHlhcmQlMjBJbmRpYXxlbnwxfHx8fDE3ODEyMTIwODl8MA&ixlib=rb-4.1.0&q=80&w=1200"
              alt="Students in a college courtyard, mid-conversation"
              aspect="52%"
            />
            <p className="mt-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              [Photo: founding team or early cohort — placeholder]
            </p>
          </motion.div>
        </Section>

        <Rule />

        {/* ─── 2. Why JREE came to be ─── */}
        <Section>
          <Eyebrow>Three frustrations</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            Why JREE came to be
          </h2>
          <p className="mt-5" style={PROSE}>
            Seventeen years of working inside India's education-to-employment gap left us with three frustrations
            that wouldn't go away. We didn't build JREE to disrupt anything. We built it because these three
            problems kept showing up in every campus visit, every placement drive, every employer conversation.
          </p>

          <div className="mt-14 flex flex-col gap-0">
            <Frustration
              label="For Students"
              heading="The credential was never the proof."
              body={`You graduate with a degree that says you studied — not that you're ready. Employers know this. Students know this. The interview becomes a guessing game on both sides. We watched bright graduates undersell themselves for years, not because they lacked ability, but because nothing had measured it in a language the market trusted. A JREE score closes that gap. It's a number you can hand over and stand behind.`}
            />
            <Frustration
              label="For Colleges"
              heading="Placement data came too late."
              body={`Every placement office we worked with was flying blind until the season started. By the time they knew which students were struggling, the window to help them had closed. Batch-level readiness data, gathered early, changes what's possible. A college that knows its numbers in March can act before October. That's what JREE gives institutions — the ability to intervene when it still matters.`}
            />
            <Frustration
              label="For Employers"
              heading="Screening was expensive and inaccurate."
              body={`Recruiters told us the same thing in different cities: they were spending 60% of their hiring time filtering out candidates who looked fine on paper but weren't close to ready. Not because the graduates were bad — because there was no common measure. Every company ran its own test. JREE creates the shared benchmark that makes early filtering honest, fast, and fair.`}
            />
          </div>

          <div className="mt-14 pt-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(22px,2.8vw,30px)", color: "var(--text-1)", lineHeight: 1.38, letterSpacing: "-0.015em" }}>
              Three problems, one missing bridge.
            </p>
            <p className="mt-4" style={{ ...PROSE, fontSize: "clamp(15px,1.7vw,17px)" }}>
              That's not a product pitch — it's what seventeen years of fieldwork kept telling us. JREE is
              the bridge we didn't find anywhere else, so we built it.
            </p>
          </div>

          <PullQuote
            quote="[Founder quote — e.g. 'We were doing workshops with graduates who were genuinely talented and completely invisible to the market. That felt like a solvable problem. It turned out it was.']"
            name="[Founder Name]"
            title="Co-founder, EduBridge"
          />
        </Section>

        <Rule />

        {/* ─── 3. Born from EduBridge ─── */}
        <Section>
          <Eyebrow>EduBridge · Est. 2007</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            JREE is an EduBridge initiative.
          </h2>

          <div className="mt-8 rounded-[14px] overflow-hidden" style={{ border: "1px solid var(--hairline-strong)", background: "var(--surface-1)", padding: "20px 24px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>EduBridge · JREE Initiative</div>
            <div className="mt-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.02em" }}>
              [EduBridge lockup — logo placeholder]
            </div>
            <div className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.04em" }}>
              17 years · 50,000+ graduates · pan-India
            </div>
          </div>

          <p className="mt-8" style={PROSE}>
            EduBridge was founded in 2007 with one intention: make India's workforce transition from education
            to employment less wasteful of human potential. Over seventeen years, we have worked with colleges,
            corporates, and government skill-development programmes across the country, placing over fifty thousand
            graduates into meaningful roles.
          </p>
          <p className="mt-5" style={PROSE}>
            JREE is what we built when we realised that placement support wasn't enough on its own — the
            underlying measurement problem had to be solved first. It is not a side project. It is the
            methodological centre of everything EduBridge has learned about what makes a graduate employable,
            distilled into a single, verifiable score.
          </p>

          <PullQuote
            quote="[EduBridge leadership quote — e.g. 'Seventeen years of placement data told us exactly what employers look for. JREE is that knowledge made testable.']"
            name="[Leadership Name]"
            title="CEO, EduBridge"
          />
        </Section>

        <Rule />

        {/* ─── 4. What we stand for ─── */}
        <Section>
          <Eyebrow>What we stand for</Eyebrow>

          <div className="mt-10">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>Mission</p>
            <p className="mt-4" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(24px,3.2vw,36px)", color: "var(--text-1)", lineHeight: 1.35, letterSpacing: "-0.02em" }}>
              Make every graduate's potential{" "}
              <span style={{ color: "var(--lime)" }}>visible</span> to every employer — fairly, transparently, and at scale.
            </p>
          </div>

          <div className="mt-12 pt-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>Vision</p>
            <p className="mt-4" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(24px,3.2vw,36px)", color: "var(--text-1)", lineHeight: 1.35, letterSpacing: "-0.02em" }}>
              A future where talent is never invisible{" "}
              <span style={{ color: "var(--violet)" }}>because it wasn't measured.</span>
            </p>
          </div>

          <div className="mt-14 pt-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--text-3)", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 20 }}>Four beliefs</p>
            <div className="flex flex-col gap-0">
              {[
                { label: "Fairness", def: "The same test, the same standard, regardless of which college or city you come from." },
                { label: "Honesty", def: "We report what we measure — nothing inflated, nothing softened, nothing hidden from the student." },
                { label: "Access", def: "The assessment is always free for students. Measurement shouldn't be a privilege." },
                { label: "Privacy", def: "Your data is yours. We share only what you consent to share, with whom you choose." },
              ].map((b, i) => (
                <div
                  key={b.label}
                  className="py-5 flex items-baseline gap-6"
                  style={{ borderTop: i === 0 ? "1px solid var(--hairline-strong)" : "1px solid var(--hairline)", borderBottom: i === 3 ? "1px solid var(--hairline-strong)" : "none" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13, color: "var(--text-1)", letterSpacing: "-0.01em", flexShrink: 0, minWidth: 80 }}>{b.label}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.6vw,16px)", color: "var(--text-2)", lineHeight: 1.55 }}>{b.def}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Rule />

        {/* ─── 5. The people ─── */}
        <Section>
          <Eyebrow>The people behind JREE</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            Built by people who have worked the problem.
          </h2>
          <p className="mt-5" style={PROSE}>
            Everyone on this team has spent time inside India's education and hiring systems — as teachers,
            placement officers, recruiters, or researchers. JREE didn't come from a hackathon. It came from
            years of watching capable people be passed over for reasons that had nothing to do with their ability.
          </p>

          {/* Team grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              { name: "[Founder]", title: "Co-founder & CEO", bio: "20 years in workforce development across 12 Indian states." },
              { name: "[Co-founder]", title: "Co-founder & CTO", bio: "Built assessment systems for India's largest skill mission." },
              { name: "[Head of Research]", title: "Head of Assessment", bio: "Former IIM faculty. Designed the JREE scoring framework." },
              { name: "[Head of Product]", title: "Head of Product", bio: "Previously at [Company]. Obsessed with reducing friction for students." },
              { name: "[Ops Lead]", title: "College Partnerships", bio: "Has onboarded 180+ colleges across 14 states." },
              { name: "[Data Lead]", title: "Data & Privacy", bio: "Built JREE's DPDP-compliant data architecture from day one." },
            ].map((p) => (
              <div key={p.name} className="flex flex-col items-center text-center">
                {/* Circular headshot placeholder */}
                <div
                  className="rounded-full overflow-hidden mb-4 grain"
                  style={{
                    width: 88, height: 88,
                    background: "var(--surface-2)",
                    border: "1px solid var(--hairline-strong)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", textAlign: "center", padding: "0 8px", letterSpacing: "0.03em" }}>
                    Photo
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{p.name}</span>
                <span className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--violet)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{p.title}</span>
                <span className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{p.bio}</span>
              </div>
            ))}
          </div>

          {/* Group photo */}
          <div className="mt-14">
            <Photo
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwd29ya2luZyUyMHRvZ2V0aGVyJTIwb2ZmaWNlJTIwY2FuZGlkJTIwbWVldGluZ3xlbnwxfHx8fDE3ODEyMTIwODl8MA&ixlib=rb-4.1.0&q=80&w=1200"
              alt="The EduBridge team working together"
              aspect="48%"
            />
            <p className="mt-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              [Photo: team candid — placeholder]
            </p>
          </div>

          <PullQuote
            quote="[Closing founder quote — e.g. 'Every person here has felt the frustration of watching someone capable get passed over. That's what keeps the work honest.']"
            name="[Founder Name]"
            title="Co-founder, EduBridge"
          />
        </Section>

        <Rule />

        {/* ─── 6. Trust & data ─── */}
        <Section>
          <Eyebrow>A note on trust and data</Eyebrow>
          <p className="mt-6" style={{ ...PROSE, fontSize: "clamp(15px,1.7vw,17px)" }}>
            JREE stores only what it needs to generate your score and your report. We do not sell your data,
            share it with employers without your consent, or use it to train AI systems beyond what's disclosed.
            Every data practice is designed to comply with India's Digital Personal Data Protection Act 2023.
          </p>
          <p className="mt-5" style={{ ...PROSE, fontSize: "clamp(15px,1.7vw,17px)" }}>
            Your score belongs to you. You decide who sees it. If you share it with an employer or a college,
            you do so deliberately — there is no passive data trail. When you delete your account, your data
            is gone. That's the whole promise.
          </p>
          <div className="mt-8 rounded-[12px] px-6 py-5" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Compliance</div>
            <div className="flex flex-col gap-2">
              {[
                "Aligned with the Digital Personal Data Protection Act, 2023 (DPDP)",
                "No data shared without explicit, per-share consent",
                "Score verified by tamper-evident QR certificate",
                "Account deletion removes all personally identifiable data within 30 days",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--violet)", flexShrink: 0, marginTop: 1 }}>—</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px,1.5vw,15px)", color: "var(--text-2)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── Final CTA ─── */}
        <div className="mt-20 pt-12" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(18px,2.2vw,24px)", color: "var(--text-2)", lineHeight: 1.45 }}>
            If you're a student who wants a number they can stand behind, a college that wants to know its numbers
            early, or an employer who's tired of screening blind — JREE is for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#signup"
              className="inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ height: 52, padding: "0 28px", background: "var(--lime)", color: "var(--bg)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", boxShadow: "0 8px 32px rgba(201,220,83,0.22)", textDecoration: "none" }}
            >
              Register Free →
            </a>
            <button
              onClick={() => { window.location.hash = ""; }}
              className="inline-flex items-center justify-center rounded-full transition-all hover:bg-[rgba(240,235,255,0.06)]"
              style={{ height: 52, padding: "0 24px", background: "transparent", border: "1px solid var(--violet)", color: "var(--text-1)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}
            >
              ← Back to home
            </button>
          </div>
        </div>

      </div>
    </div>
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

function Frustration({ label, heading, body }: { label: string; heading: string; body: string }) {
  return (
    <div className="py-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--violet)", textTransform: "uppercase" }}>
        {label}
      </span>
      <h3 className="mt-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px,2.4vw,26px)", color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.18 }}>
        {heading}
      </h3>
      <p className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.7vw,17px)", color: "var(--text-2)", lineHeight: 1.7, maxWidth: "58ch" }}>
        {body}
      </p>
    </div>
  );
}
