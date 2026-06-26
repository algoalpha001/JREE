import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Nav } from "./Nav";

const ease = [0.16, 1, 0.3, 1] as const;
const CONTAINER = "max-w-[1080px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16";
const MEASURE = "max-w-[660px]";
const PROSE: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.7vw,17px)", color: "var(--text-2)", lineHeight: 1.75 };

/* ─── Atoms ─── */

function Rule() {
  return <div className="my-16 md:my-24 h-px" style={{ background: "var(--hairline-strong)" }} />;
}

function Eyebrow({ children, color = "var(--violet)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 11, letterSpacing: "0.07em", color, textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,5vw,52px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
      {children}
    </h2>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
  );
}

/* Photo with duotone overlay */
function DuoPhoto({ src, alt, aspect = "60%" }: { src: string; alt: string; aspect?: string }) {
  return (
    <div className="relative grain overflow-hidden rounded-[18px]" style={{ border: "1px solid var(--hairline-strong)", paddingBottom: aspect }}>
      <ImageWithFallback src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "grayscale(20%) brightness(0.8)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(109,86,164,0.22) 0%, transparent 60%)", mixBlendMode: "multiply" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(11,9,15,0.5) 100%)" }} />
    </div>
  );
}

/* Headshot circle */
function Headshot({ src, alt, size = 100 }: { src: string; alt: string; size?: number }) {
  return (
    <div className="overflow-hidden flex-shrink-0" style={{ width: size, height: size, borderRadius: "50%", border: "2px solid var(--violet-border)" }}>
      <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover"
        style={{ filter: "grayscale(15%) brightness(0.9)" }} />
    </div>
  );
}

/* ─── 1. Anchor Nav ─── */
const ANCHORS = [
  { label: "About Us",        href: "#about-jree" },
  { label: "Our Story",       href: "#our-story" },
  { label: "Our Team",        href: "#our-team" },
  { label: "Our Journey",     href: "#our-journey" },
  { label: "Backed by EduBridge", href: "#backed" },
  { label: "Trust & Data",    href: "#trust" },
];

function AnchorNav() {
  const scroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="sticky z-[90]" style={{ top: 60, background: "var(--bg-2)", borderBottom: "1px solid var(--hairline-strong)" }}>
      <div className={`${CONTAINER} overflow-x-auto`}>
        <div className="flex items-center justify-center gap-0 py-0" style={{ minWidth: "max-content", margin: "0 auto" }}>
          {ANCHORS.map((a) => (
            <button key={a.href} onClick={() => scroll(a.href)}
              className="transition-colors hover:text-[var(--text-1)] whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--text-3)", padding: "14px 18px", borderBottom: "2px solid transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--violet)"; (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 2. Welcome / MVW block ─── */
function WelcomeSection() {
  const mvw = [
    {
      label: "Our Mission",
      body: "Make job-readiness measurable and improvable for every Indian graduate — and connect ready talent to the people who hire.",
    },
    {
      label: "Our Vision",
      body: "A future where no capable graduate goes unseen for lack of proof.",
    },
    {
      label: "What We Do",
      body: "One standardised, AI-powered assessment. One verified score. One national benchmark.",
    },
  ];
  return (
    <section id="about-jree" className="py-16 md:py-24" style={{ background: "var(--bg)" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>Welcome to JREE</Eyebrow>
          <SectionHeading>
            <span className="block mt-4">India needed a shared<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>language for readiness.</span>
            </span>
          </SectionHeading>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-5" style={PROSE}>
              <p>
                JREE is a job-readiness evaluation platform built for Indian graduates. We combine a written assessment with an AI-powered video interview to produce a single, verified score — a number that tells students where they stand, tells colleges how their batch compares, and tells employers who is genuinely ready to contribute from day one.
              </p>
              <p>
                We exist because the gap between what Indian graduates can do and what employers believe they can do has grown too wide to paper over with degrees and CGPAs. A student who graduated from a tier-3 college in Jharkhand and a student who graduated from a tier-1 campus in Pune can both score Band A. That matters.
              </p>
              <p>
                JREE is an EduBridge initiative — built on 17 years of workforce development, serving over 300,000 graduates, with relationships across 200+ companies. The score is new. The mission is not.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-0">
              {mvw.map((item, i) => (
                <div key={item.label} className="py-7" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 10, color: "var(--violet)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {item.label}
                  </div>
                  <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-1)", lineHeight: 1.6 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Our Story ─── */
function OurStory() {
  return (
    <section id="our-story" style={{ background: "var(--bg-2)" }}>
      <div className={CONTAINER} style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <FadeIn>
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4.5vw,46px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: 720 }}>
            Three frustrations. One answer.
          </h2>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-6" style={PROSE}>
              <p>
                Across India, more than 8 million graduates enter the job market every year. A large proportion of them are capable. The problem is that capability, in the absence of a credible signal, is invisible. Three groups feel this differently.
              </p>
              <p>
                <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>Students can't prove it.</strong> A degree tells an employer where you went to college, not what you can actually do. Most students have no way to demonstrate soft skills, situational judgment, or communication ability — so they are filtered out before anyone meets them.
              </p>
              <p>
                <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>Colleges can't show it.</strong> Placement teams in thousands of institutions know their students are ready. They have nothing external, verifiable, and standardised to back that claim. A campus visit from a big-brand employer is not a right — it's a lottery that rewards reputation, not outcomes.
              </p>
              <p>
                <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>Employers can't see it.</strong> Hiring teams are drowning in applications. Without a common yardstick, they default to what they know — a short list of college brands, a crude filter on grades. The result: good candidates at less-visible institutions are ignored, and companies repeatedly hire from the same shallow pool.
              </p>
              <p>
                JREE is the bridge. A single assessment — taken once, covering five layers of job-readiness — produces a 0–100 score and a national rank. The score is locked at submission, verified by QR code, and trusted equally by the student who earns it and the employer who reads it.
              </p>
              <p>
                We built JREE because EduBridge spent 17 years working on this problem from the training side. Training works. But training without proof doesn't travel. The score is the proof.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="lg:sticky" style={{ top: 100 }}>
              <DuoPhoto
                src="https://images.unsplash.com/photo-1781246212288-7fa538344718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80"
                alt="Team collaborating in a modern office"
                aspect="120%"
              />
              <div className="mt-6 rounded-[14px] p-5 grain" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(16px,2vw,19px)", color: "var(--text-1)", lineHeight: 1.5 }}>
                  "The score is the proof. Everything else we built follows from that conviction."
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full" style={{ width: 6, height: 6, background: "var(--violet)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>JREE FOUNDING TEAM</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. What We Believe In ─── */
function Beliefs() {
  const values = [
    {
      heading: "Fairness",
      body: "One transparent standard for every student — whether they sit the exam in Mumbai or Meerut.",
    },
    {
      heading: "Honesty",
      body: "A score that means something. We don't inflate, we don't soften. The number is the number.",
    },
    {
      heading: "Access",
      body: "Job-readiness shouldn't depend on a laptop or a test centre. Any device, any location, inside a verified window.",
    },
    {
      heading: "Privacy",
      body: "Student data collected with consent, used only for the stated purpose, stored in compliance with DPDP 2023.",
    },
  ];
  return (
    <section style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>What We Believe In</Eyebrow>
          <SectionHeading>
            <span className="block mt-4">Four principles.<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--teal)" }}>No exceptions.</span>
            </span>
          </SectionHeading>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--hairline-strong)", border: "1px solid var(--hairline-strong)", borderRadius: 18, overflow: "hidden" }}>
          {values.map((v, i) => (
            <FadeIn key={v.heading} delay={0.05 * i}>
              <div className="grain h-full p-8 md:p-10" style={{ background: "var(--surface-1)" }}>
                <div className="rounded-full inline-flex items-center justify-center mb-5" style={{ width: 36, height: 36, background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--violet)" }}>0{i + 1}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {v.heading}
                </h3>
                <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.65 }}>
                  {v.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Our Journey So Far ─── */
function Journey() {
  const milestones = [
    { date: "2009", label: "EduBridge founded", body: "Launched with a mandate to connect India's youth to quality employment through skills training." },
    { date: "2014", label: "First 50,000 graduates trained", body: "Reached a milestone of 50,000 graduates trained across manufacturing, retail, and BFSI sectors." },
    { date: "2018", label: "200+ corporate partnerships", body: "Embedded as a workforce solutions partner for two hundred companies across twelve industries." },
    { date: "2022", label: "Assessment research begins", body: "EduBridge begins internal R&D on standardised assessment — the seed project that becomes JREE." },
    { date: "2024", label: "AI interview layer built", body: "Priya — JREE's AI interviewer — successfully scores spoken responses across communication and confidence dimensions." },
    { date: "2025", label: "300,000+ youth trained", body: "EduBridge crosses 300,000 graduates trained, serving as the credibility foundation for JREE's launch." },
    { date: "2026", label: "JREE launches nationally", body: "JREE opens to students, colleges, and employers across India as the standardised job-readiness evaluation platform." },
    { date: "[2026 Q4]", label: "First national cohort ranked", body: "The first cross-institutional national ranking goes live — students from 40+ institutions on one shared leaderboard." },
    { date: "[2027]", label: "Employer pool integrations", body: "Direct sourcing integrations with HR platforms, giving employers access to the verified JREE talent pool." },
  ];
  return (
    <section id="our-journey" style={{ background: "var(--bg-2)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>Our Journey So Far</Eyebrow>
          <SectionHeading>
            <span className="block mt-4">17 years in the making.</span>
          </SectionHeading>
        </FadeIn>

        <div className="mt-14 relative">
          {/* vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, var(--violet) 0%, var(--lime) 100%)", opacity: 0.4 }} />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <FadeIn key={m.date} delay={0.05 * i}>
                <div className="flex gap-8 py-7" style={{ borderBottom: i < milestones.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                  {/* dot */}
                  <div className="flex-shrink-0 mt-1" style={{ width: 16 }}>
                    <span className="block rounded-full" style={{ width: 16, height: 16, background: m.date.startsWith("[") ? "var(--surface-3)" : "var(--bg-2)", border: `2px solid ${m.date.startsWith("[") ? "var(--hairline-strong)" : "var(--violet)"}` }} />
                  </div>
                  {/* content */}
                  <div className="flex-1 min-w-0">
                    <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: m.date.startsWith("[") ? "var(--text-3)" : "var(--violet)", letterSpacing: "0.05em" }}>
                      {m.date}
                    </div>
                    <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                      {m.label}
                    </div>
                    <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.6 }}>
                      {m.body}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Our Leadership Team ─── */
function LeadershipTeam() {
  const team = [
    {
      name: "[Founder / CEO Name]",
      title: "Co-Founder & CEO",
      bio: "A workforce development practitioner with two decades of experience building employer-aligned training programmes across India. Before founding EduBridge, [name] led employability initiatives for [prior organisation], serving [geography]. JREE is the culmination of a long-standing conviction: that the gap between what Indian graduates can do and what employers believe they can do is solvable — with the right signal.",
      linkedin: "#",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    },
    {
      name: "[Co-Founder / CTO Name]",
      title: "Co-Founder & CTO",
      bio: "A technologist who has spent her career building systems at the intersection of education and AI. At JREE, [name] leads the design and engineering of the assessment engine — including Priya, the AI interview layer — and the integrity architecture that makes the verified score trustworthy. She holds a graduate degree in [field] from [institution].",
      linkedin: "#",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    },
    {
      name: "[Head of Assessments Name]",
      title: "Head of Assessments",
      bio: "An occupational psychologist and assessment design specialist with experience building standardised evaluation frameworks for national and international clients. At JREE, [name] owns the validity and reliability of the five-layer scoring model — ensuring the number means the same thing at every institution, for every stream.",
      linkedin: "#",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    },
    {
      name: "[Head of Partnerships Name]",
      title: "Head of Institutional Partnerships",
      bio: "Brings fifteen years of experience in higher education partnerships across South and South-East Asia. [Name] leads JREE's engagement with colleges and universities — from onboarding and batch management to the ongoing analytics relationship that makes placement teams more effective season after season.",
      linkedin: "#",
      photo: "https://images.unsplash.com/photo-1699899657680-421c2c2d5064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    },
  ];

  return (
    <section id="our-team" style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>Our Leadership Team</Eyebrow>
          <SectionHeading>
            <span className="block mt-4">The people<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--violet)" }}>behind the score.</span>
            </span>
          </SectionHeading>
          <p className="mt-5 max-w-[520px]" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-2)", lineHeight: 1.65 }}>
            Placeholder profiles below — real names, photos, and bios will replace these before launch.
          </p>
        </FadeIn>

        <div className="mt-14 flex flex-col gap-0">
          {team.map((person, i) => (
            <FadeIn key={person.name} delay={0.07 * i}>
              <div className="py-10 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-7 md:gap-10 items-start"
                style={{ borderTop: "1px solid var(--hairline-strong)" }}>
                <Headshot src={person.photo} alt={person.name} size={100} />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-1)", letterSpacing: "-0.015em" }}>
                    {person.name}
                  </div>
                  <div className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {person.title}
                  </div>
                  <p className="mt-4 max-w-[640px]" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.7 }}>
                    {person.bio}
                  </p>
                  <a href={person.linkedin} className="mt-4 inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text-1)]"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em", textDecoration: "none" }}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Backed by EduBridge ─── */
function BackedBy() {
  const stats = [
    { n: "17", label: "Years in workforce development" },
    { n: "300k+", label: "Graduates trained" },
    { n: "200+", label: "Corporate partners" },
    { n: "28+", label: "States and UTs reached" },
  ];
  return (
    <section id="backed" style={{ background: "var(--bg-2)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>Backed by EduBridge</Eyebrow>
          <SectionHeading>
            <span className="block mt-4">Not a startup.<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>A 17-year conviction.</span>
            </span>
          </SectionHeading>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          <FadeIn delay={0.1}>
            <div className="space-y-5" style={PROSE}>
              <p>
                JREE is an initiative of EduBridge — one of India's most experienced workforce development organisations. EduBridge has spent 17 years building the infrastructure of employability: training programmes in over 28 states, relationships with 200+ companies, and a track record of placing more than 300,000 graduates into jobs.
              </p>
              <p>
                The assessment layer was the missing piece. Training produces readiness. JREE measures and certifies it. The same trust that employers placed in EduBridge's graduates for over a decade is the trust they extend to a JREE score.
              </p>
              <p>
                EduBridge is [privately held / backed by — add detail]. Its founding belief — that economic mobility is a function of demonstrable skill, not inherited advantage — is the belief JREE was built to operationalise at scale.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grain rounded-[18px] p-8 md:p-10" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-elevated)" }}>
              {/* EduBridge lockup placeholder */}
              <div className="flex items-center gap-3 mb-8">
                <div className="rounded-[10px] flex items-center justify-center" style={{ width: 44, height: 44, background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--violet)" }}>E</span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--text-1)", letterSpacing: "-0.01em" }}>EduBridge</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.05em" }}>PARENT ORGANISATION</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={s.n} className="rounded-[12px] p-5" style={{ background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {s.n}
                    </div>
                    <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.4 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. Partners / Trust signals ─── */
const PARTNER_CATEGORIES = ["Employer Partners", "Assessment Frameworks", "Compliance"] as const;
type PartnerCat = typeof PARTNER_CATEGORIES[number];

const PARTNER_DATA: Record<PartnerCat, { name: string; sub: string }[]> = {
  "Employer Partners": [
    { name: "[Employer A]", sub: "Manufacturing · [City]" },
    { name: "[Employer B]", sub: "BFSI · National" },
    { name: "[Employer C]", sub: "Retail · Regional" },
    { name: "[Employer D]", sub: "IT Services · Bengaluru" },
    { name: "[Employer E]", sub: "Healthcare · National" },
    { name: "[Employer F]", sub: "Logistics · National" },
  ],
  "Assessment Frameworks": [
    { name: "O*NET", sub: "Occupational Information Network" },
    { name: "EQF", sub: "European Qualifications Framework (aligned)" },
    { name: "WorldSkills", sub: "Skill standards reference" },
    { name: "NSQF", sub: "National Skills Qualifications Framework" },
  ],
  "Compliance": [
    { name: "DPDP 2023", sub: "Digital Personal Data Protection Act" },
    { name: "ISO 27001", sub: "Information security management [planned]" },
    { name: "UGC", sub: "Higher Education framework reference" },
  ],
};

function Partners() {
  const [active, setActive] = useState<PartnerCat>("Employer Partners");
  return (
    <section style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>Our Partners & Trust Signals</Eyebrow>
          <SectionHeading>
            <span className="block mt-4">The ecosystem<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--teal)" }}>we sit inside.</span>
            </span>
          </SectionHeading>
        </FadeIn>

        {/* category tabs */}
        <div className="mt-10 flex gap-2 flex-wrap">
          {PARTNER_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className="rounded-full transition-all"
              style={{
                padding: "7px 16px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: 13,
                background: active === cat ? "var(--violet)" : "var(--surface-2)",
                color: active === cat ? "var(--on-violet)" : "var(--text-2)",
                border: `1px solid ${active === cat ? "transparent" : "var(--hairline-strong)"}`,
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* partner grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {PARTNER_DATA[active].map((p) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease }}
              className="grain rounded-[12px] flex flex-col items-center justify-center text-center p-5"
              style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", minHeight: 90 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text-2)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                {p.name}
              </div>
              <div className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.04em", lineHeight: 1.3 }}>
                {p.sub}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-5" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em" }}>
          Logo slots — actual logos will replace placeholder tiles before launch.
        </p>
      </div>
    </section>
  );
}

/* ─── 9. Press & Awards ─── */
function MediaAndAwards() {
  const press = [
    { name: "[Publication A]", caption: "\"JREE wants to be the CIBIL score of employability.\"" },
    { name: "[Publication B]", caption: "\"EduBridge's new platform aims to fix India's hiring signal problem.\"" },
    { name: "[Publication C]", caption: "\"A standardised score for 8 million graduates — can it work?\"" },
    { name: "[Publication D]", caption: "\"The startup giving tier-3 college graduates a fair shot.\"" },
  ];
  const awards = [
    { name: "[Award Body A]", caption: "Best EdTech Innovation, [Year]" },
    { name: "[Award Body B]", caption: "Top 10 WorkTech Startups, [Year]" },
    { name: "[Award Body C]", caption: "Skills India Recognition, [Year]" },
  ];

  const Strip = ({ items, label }: { items: { name: string; caption: string }[]; label: string }) => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Eyebrow>{label}</Eyebrow>
        <button className="transition-colors hover:text-[var(--text-1)]"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: "0.05em" }}>
          View More →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.name} className="grain rounded-[12px] p-5" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
            <div className="mb-3 rounded-[8px] flex items-center justify-center" style={{ height: 40, background: "var(--bg-2)", border: "1px solid var(--hairline)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>{item.name}</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>{item.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section style={{ background: "var(--bg-2)", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>Our Presence</Eyebrow>
          <SectionHeading>
            <span className="block mt-4">In the room<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>where it's discussed.</span>
            </span>
          </SectionHeading>
        </FadeIn>
        <div className="mt-14 space-y-14">
          <FadeIn delay={0.1}><Strip items={press} label="In the Press" /></FadeIn>
          <FadeIn delay={0.15}>
            <div className="h-px" style={{ background: "var(--hairline-strong)" }} />
          </FadeIn>
          <FadeIn delay={0.2}><Strip items={awards} label="Recognitions & Awards" /></FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── 10. Trust & Data ─── */
function TrustAndData() {
  const points = [
    { label: "Consent-first", body: "No data is collected without explicit student consent. Students can read exactly what is captured, how it is scored, and who can see it — before they begin." },
    { label: "Purpose-limited", body: "Score data is used to generate the JREE Report and to surface verified candidates to relevant employers. It is never sold, rented, or used for advertising." },
    { label: "DPDP 2023 compliant", body: "JREE is designed and operated in compliance with India's Digital Personal Data Protection Act 2023 — including data minimisation, storage limits, and the right to erasure." },
    { label: "Auditable integrity", body: "Every score is signed at submission with a verifiable QR. Employers, colleges, and students can verify the authenticity of any report independently." },
  ];
  return (
    <section id="trust" style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "6rem" }}>
      <div className={CONTAINER}>
        <FadeIn>
          <Eyebrow>Trust & Data</Eyebrow>
          <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.08, maxWidth: 640 }}>
            A note on what we do — and don't do — with your data.
          </h2>
          <p className="mt-5 max-w-[600px]" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-2)", lineHeight: 1.7 }}>
            Trust is a prerequisite for any score to mean anything. Here is our plain-language commitment.
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {points.map((pt, i) => (
            <FadeIn key={pt.label} delay={0.06 * i}>
              <div className="grain rounded-[14px] p-7" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="rounded-full flex-shrink-0 mt-1" style={{ width: 8, height: 8, background: "var(--teal)" }} />
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
                    {pt.label}
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.65, paddingLeft: "1.1rem" }}>
                  {pt.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-8 rounded-[14px] p-6 flex items-start gap-4" style={{ background: "var(--teal-soft)", border: "1px solid var(--teal-border)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--teal)", flexShrink: 0 }}>⚑</span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.65 }}>
              For questions about your data, to request a copy of your record, or to exercise your right to erasure under DPDP 2023, write to{" "}
              <span style={{ color: "var(--text-1)", fontWeight: 500 }}>privacy@jree.in</span>.
              We respond within 72 hours.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page shell ─── */
export function AboutUsPage() {
  const goBack = () => { window.location.hash = ""; };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
      <Nav />

      {/* ── 1. Hero ── */}
      <section style={{ background: "var(--bg-2)", paddingTop: "clamp(80px, 12vh, 140px)", paddingBottom: "5rem" }}>
        <div className={CONTAINER}>
          <FadeIn>
            <Eyebrow>About JREE</Eyebrow>
            <h1 className="mt-5" style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 8vw, 88px)",
              color: "var(--text-1)",
              letterSpacing: "-0.04em",
              lineHeight: 0.96,
              maxWidth: 860,
            }}>
              Built to close India's<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
                employability gap.
              </span>
            </h1>
            <p className="mt-7 max-w-[520px]" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,1.8vw,19px)", color: "var(--text-2)", lineHeight: 1.6 }}>
              We bridge a student's potential and an employer's trust — with one score everyone believes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Sticky anchor nav ── */}
      <AnchorNav />

      {/* ── Sections ── */}
      <WelcomeSection />
      <OurStory />
      <Beliefs />
      <Journey />
      <LeadershipTeam />
      <BackedBy />
      <Partners />
      <MediaAndAwards />
      <TrustAndData />

      {/* ── Footer CTA ── */}
      <div style={{ background: "var(--bg-3)", borderTop: "1px solid var(--hairline-strong)", padding: "4rem 0" }}>
        <div className={`${CONTAINER} flex flex-col sm:flex-row items-center justify-between gap-6`}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-1)", letterSpacing: "-0.02em" }}>
              Ready to see where you stand?
            </div>
            <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)" }}>
              Take the JREE assessment free — get your score in 48 hours.
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={goBack}
              className="rounded-full transition-all hover:bg-[color-mix(in_srgb,var(--text-1)_6%,transparent)] active:scale-[0.97]"
              style={{ height: 44, padding: "0 20px", border: "1px solid var(--violet-border)", color: "var(--text-1)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, background: "transparent" }}>
              ← Home
            </button>
            <button onClick={() => { window.location.hash = "signup"; }}
              className="rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{ height: 44, padding: "0 24px", background: "var(--lime)", color: "var(--on-lime)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, boxShadow: "0 8px 24px rgba(201,220,83,0.2)" }}>
              Register Free →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
