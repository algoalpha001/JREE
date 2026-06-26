import { motion, useInView, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { MiniScoreRing } from "./ScoreCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import JreeLogo from "../../imports/JreeLogo1/index";

const LOGO_CANVAS_W = 1000;
const LOGO_CANVAS_H = 400;

function FooterLogo({ height = 64 }: { height?: number }) {
  const scale = height / LOGO_CANVAS_H;
  const w = Math.round(LOGO_CANVAS_W * scale);
  return (
    <div style={{ width: w, height, overflow: "hidden", flexShrink: 0, position: "relative" }}>
      <div style={{ width: LOGO_CANVAS_W, height: LOGO_CANVAS_H, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>
        <JreeLogo />
      </div>
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

/* ============ shared ============ */
const SECTION = "py-12 md:py-28";
const CONTAINER = "max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: "0.02em",
        color: "var(--violet)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function Heading({ first, italic, white = false }: { first: string; italic: string; white?: boolean }) {
  return (
    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,6vw,56px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
      {first}{" "}
      <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: white ? "var(--text-1)" : "var(--lime)", fontWeight: 400 }}>
        {italic}
      </span>
    </h2>
  );
}

function Divider() {
  return <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(109,86,164,0.4), transparent)" }} />;
}

/* ============ 01. THE HANDOFF — one score, proof → placement ============ */
export function StakeholderCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const panels = [
    {
      key: "students",
      stage: "01 · Student",
      tag: "FOR STUDENTS",
      headline: "Know where you stand.",
      support: "Take the free assessment, see where you stand nationally, and get a clear plan to improve.",
      cta: "Start Free",
      href: "#signup",
      accent: "var(--lime)",
      accentText: "var(--lime-text)",
      img: "https://images.unsplash.com/photo-1585661417298-8236a5f449aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzaW5nbGUlMjBmb2N1c2VkJTIwc3R1ZGVudCUyMHN0dWR5aW5nJTIwY29uY2VudHJhdGlvbnxlbnwxfHx8fDE3ODEyMTE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "A focused graduate writing, mid-effort",
    },
    {
      key: "colleges",
      stage: "02 · College",
      tag: "FOR COLLEGES",
      headline: "Benchmark every batch.",
      support: "Get batch-level readiness data before placement season. Benchmark your students against the national pool.",
      cta: "Explore for Colleges",
      href: "#for-colleges",
      accent: "var(--violet)",
      accentText: "#B9A4E8",
      img: "https://images.unsplash.com/photo-1702952058716-1496a3c1e7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwY29ycmlkb3IlMjBwbGFjZW1lbnQlMjBvZmZpY2V8ZW58MXx8fHwxNzgxMjExNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "A campus placement-office corridor",
    },
    {
      key: "employers",
      stage: "03 · Employer",
      tag: "FOR EMPLOYERS",
      headline: "Every candidate, pre-assessed.",
      support: "Every candidate is pre-assessed. Filter by score, domain, and role-fit before the first call.",
      cta: "Explore Talent Pool",
      href: "#for-employers",
      accent: "var(--teal, #51C1B5)",
      accentText: "var(--teal, #51C1B5)",
      img: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcnZpZXclMjBoaXJpbmclMjBkZXNrJTIwb2ZmaWNlJTIwbWVldGluZyUyMHJvb218ZW58MXx8fHwxNzgxMjExNTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "A hiring desk in a meeting room",
    },
  ] as const;

  return (
    <section className={`relative ${SECTION}`} style={{ background: "var(--bg)" }}>
      <Divider />
      <div className={CONTAINER}>
        <div className="mt-6 md:mt-16 mb-6 md:mb-14 text-center">
          <Eyebrow>01 / WHERE DO YOU FIT</Eyebrow>
          <div className="mt-4">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,6vw,56px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              One platform.{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime)", fontWeight: 400 }}>
                Three
              </span>{" "}
              ways in.
            </h2>
          </div>
          <p className="mt-5 max-w-[560px] mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.7vw,16px)", color: "var(--text-2)", lineHeight: 1.6 }}>
            Students prove it. Colleges benchmark it. Employers hire on it.
          </p>
        </div>

        {/* the handoff — three panels carrying the same score, joined by a thread */}
        <div ref={ref} className="relative">
          {/* connecting thread (desktop) — draws once, score travels left → right */}
          <HandoffThread inView={inView} />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-stretch">
            {panels.map((p, i) => (
              <HandoffPanel key={p.key} panel={p} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* one consistent house duotone so three photos read as one system */
const ARTIFACT_ZONE = 196; // px — top region where artifacts + thread live

function HandoffThread({ inView }: { inView: boolean }) {
  // sits at the vertical centre of the artifact zone, behind the artifacts
  return (
    <div
      className="hidden md:block absolute left-0 right-0 z-0 pointer-events-none"
      style={{ top: ARTIFACT_ZONE / 2 }}
      aria-hidden
    >
      <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
        <line x1="0" y1="1" x2="100" y2="1" stroke="var(--hairline-strong)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <motion.line
          x1="0" y1="1" x2="100" y2="1"
          stroke="url(#handoffGrad)" strokeWidth="2" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease, delay: 0.3 }}
        />
        <defs>
          <linearGradient id="handoffGrad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--lime)" />
            <stop offset="50%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="#51C1B5" />
          </linearGradient>
        </defs>
      </svg>
      {/* the score, travelling across the thread */}
      <motion.div
        className="absolute"
        style={{ top: -10, left: 0 }}
        initial={{ left: "2%", opacity: 0 }}
        animate={inView ? { left: ["2%", "50%", "92%"], opacity: [0, 1, 1, 1] } : {}}
        transition={{ duration: 1.8, ease, delay: 0.3 }}
      >
        <span
          className="inline-flex items-center justify-center rounded-full"
          style={{
            width: 22, height: 22,
            background: "var(--bg)",
            border: "1px solid var(--violet)",
            boxShadow: "0 0 18px rgba(109,86,164,0.5)",
            fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-1)",
          }}
        >
          77
        </span>
      </motion.div>
    </div>
  );
}

function HandoffPanel({ panel, index, inView }: { panel: any; index: number; inView: boolean }) {
  const go = () => {
    const target = panel.href.replace(/^#/, "");
    window.location.hash = target;
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  // artifact resolves roughly as the travelling score reaches this panel
  const artifactDelay = 0.4 + index * 0.65;

  return (
    <motion.button
      type="button"
      onClick={go}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease }}
      whileHover={{ y: -6 }}
      className="relative grain rounded-[18px] overflow-hidden flex flex-col text-left group cursor-pointer"
      style={{
        background: "var(--surface-1)",
        border: "1px solid rgba(109,86,164,0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.4)",
        transition: "box-shadow 300ms, border-color 300ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = panel.accent;
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.06), 0 36px 72px rgba(0,0,0,0.5), 0 0 50px -10px ${panel.accent}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(109,86,164,0.18)";
        e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.4)";
      }}
    >
      {/* ── artifact zone: treated photo (quiet ground) + JREE artifact (hero) ── */}
      <div className="relative overflow-hidden" style={{ height: ARTIFACT_ZONE }}>
        {/* the photo — identical duotone grade on all three */}
        <ImageWithFallback
          src={panel.img}
          alt={panel.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "grayscale(1) contrast(1.05) brightness(0.62)" }}
        />
        {/* violet duotone shadow tint (house look) */}
        <div className="absolute inset-0" style={{ background: "rgba(36,28,58,0.55)", mixBlendMode: "multiply" }} />
        {/* lift the highlights toward warm-black, fade into the surface below */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,10,16,0.25) 0%, rgba(12,10,16,0.35) 45%, var(--surface-1) 100%)" }} />

        {/* stage tag */}
        <span
          className="absolute top-3.5 left-3.5 inline-flex items-center rounded-full z-20"
          style={{ padding: "4px 10px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid var(--hairline-strong)", fontFamily: "var(--font-mono)", fontSize: 10, color: panel.accentText, letterSpacing: "0.07em" }}
        >
          {panel.tag}
        </span>

        {/* the JREE artifact — loudest element, centred over the ground */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
        </div>
      </div>

      {/* ── one outcome headline + one supporting line + one CTA ── */}
      <div className="flex flex-col flex-1 px-6 sm:px-7 pt-5 pb-6">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>
          {panel.stage}
        </div>
        <h3 className="mt-2.5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px,2.8vw,26px)", color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {panel.headline}
        </h3>
        <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.7vw,15px)", color: "var(--text-2)", lineHeight: 1.6, maxWidth: "32ch" }}>
          {panel.support}
        </p>
        <span
          className="mt-auto pt-7 inline-flex items-center gap-2 transition-transform group-hover:translate-x-1"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: panel.accentText, letterSpacing: "-0.01em" }}
        >
          {panel.cta}
          <span aria-hidden>→</span>
        </span>
      </div>

      <div style={{ height: 3, background: `linear-gradient(90deg, ${panel.accent}, transparent)` }} />
    </motion.button>
  );
}

/* Stage 1 — the earned score card */
function ScoreArtifact({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease }}
      className="rounded-[14px] px-5 py-4"
      style={{
        background: "rgba(12,10,16,0.72)",
        backdropFilter: "blur(10px)",
        border: "1px solid var(--hairline-strong)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.03em", color: "var(--text-3)", textTransform: "uppercase" }}>
        JREE Score
      </div>
      <div className="mt-1 flex items-baseline gap-2.5">
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 56, color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 0.9, fontVariantNumeric: "tabular-nums" }}>
          77
        </span>
        <span
          className="inline-flex items-center rounded-full"
          style={{ padding: "3px 9px", background: "rgba(201,220,83,0.14)", border: "1px solid rgba(201,220,83,0.45)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lime-text)", letterSpacing: "0.03em" }}
        >
          Band A
        </span>
      </div>
    </motion.div>
  );
}

/* Stage 2 — many marks resolving into a cohort spread (marks on a scale, no bars) */
function BatchArtifact({ inView, delay }: { inView: boolean; delay: number }) {
  // deterministic scatter, denser in the upper-middle (a calm cohort spread)
  const marks = [12, 22, 28, 34, 38, 41, 45, 48, 52, 55, 58, 61, 64, 67, 70, 73, 77, 80, 84, 90];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease }}
      className="w-full max-w-[260px] rounded-[14px] px-5 py-4"
      style={{
        background: "rgba(12,10,16,0.72)",
        backdropFilter: "blur(10px)",
        border: "1px solid var(--hairline-strong)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-baseline justify-between">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.03em", color: "var(--text-3)", textTransform: "uppercase" }}>
          Batch spread
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#B9A4E8" }}>n = 240</span>
      </div>
      <div className="relative mt-4" style={{ height: 40 }}>
        {/* the scale */}
        <div className="absolute left-0 right-0" style={{ bottom: 0, height: 1, background: "var(--hairline-strong)" }} />
        {/* national-average marker */}
        <div className="absolute" style={{ left: "62%", bottom: 0, top: 0, width: 1, background: "rgba(185,164,232,0.6)" }} />
        {/* the cohort marks settling in */}
        {marks.map((m, i) => (
          <motion.span
            key={m + "-" + i}
            className="absolute rounded-full"
            style={{ left: `${m}%`, bottom: 6 + ((i * 7) % 22), width: 5, height: 5, background: "var(--violet)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.9, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + i * 0.03, ease }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.03em" }}>
        <span>D</span><span>C</span><span>B</span><span>A</span>
      </div>
    </motion.div>
  );
}

/* Stage 3 — a single verified candidate verdict, pulled from the pool */
function VerdictArtifact({ inView, delay }: { inView: boolean; delay: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setReady(true), (delay + 0.5) * 1000);
    return () => clearTimeout(t);
  }, [inView, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease }}
      className="relative w-full max-w-[250px]"
    >
      {/* stacked-edge hint of the pool behind */}
      <div className="absolute rounded-[14px]" style={{ inset: 0, transform: "translate(8px, 8px)", background: "rgba(12,10,16,0.4)", border: "1px solid var(--hairline)" }} />
      <div className="absolute rounded-[14px]" style={{ inset: 0, transform: "translate(4px, 4px)", background: "rgba(12,10,16,0.55)", border: "1px solid var(--hairline)" }} />
      {/* the verified candidate */}
      <div
        className="relative rounded-[14px] px-4 py-3.5"
        style={{
          background: "rgba(12,10,16,0.78)",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--hairline-strong)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full" style={{ width: 34, height: 34, background: "rgba(81,193,181,0.18)", border: "1px solid rgba(81,193,181,0.45)", filter: "blur(3px)" }} />
          <div className="flex-1">
            <div style={{ height: 8, width: "55%", borderRadius: 4, background: "rgba(240,235,255,0.18)", filter: "blur(2px)" }} />
            <div className="mt-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.04em" }}>
              JREE 77 · Band A
            </div>
          </div>
        </div>
        <div className="mt-3.5 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--hairline)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.02em", color: "var(--text-3)", textTransform: "uppercase" }}>
            Role-fit
          </span>
          <motion.span
            key={ready ? "ready" : "deciding"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="inline-flex items-center gap-1.5 rounded-full"
            style={{
              padding: "3px 10px",
              background: ready ? "rgba(81,193,181,0.16)" : "rgba(240,235,255,0.06)",
              border: `1px solid ${ready ? "rgba(81,193,181,0.5)" : "var(--hairline-strong)"}`,
              fontFamily: "var(--font-mono)", fontSize: 11,
              color: ready ? "#51C1B5" : "var(--text-3)",
              letterSpacing: "0.02em",
            }}
          >
            {ready ? "Ready ✓" : "Deciding…"}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ============ 02. ONE SCORE / THREE LENSES ============ */
export function WhoFor() {
  return (
    <section className={`relative ${SECTION}`} style={{ background: "var(--bg)" }}>
      <Divider />
      <div className={CONTAINER}>
        <div className="text-center mt-6 md:mt-16 mb-6 md:mb-14">
          <Eyebrow>02 / WHAT YOUR SCORE DOES</Eyebrow>
          <div className="mt-4">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,6vw,56px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              One number.{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--lime)", fontWeight: 400 }}>
                Three
              </span>{" "}
              ways it works for you.
            </h2>
          </div>
          <p className="mt-5 max-w-[580px] mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.7vw,16px)", color: "var(--text-2)", lineHeight: 1.6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--lime-text)" }}>78 · Band A</span> isn't just a result. It's a credential you carry, a map of exactly what to improve next, and a signal hiring teams across India already know how to read.
          </p>
        </div>

        {/* Score broadcaster — the spine connecting all three views */}
        <div className="relative max-w-[840px] mx-auto mb-12 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="relative mx-auto flex items-center justify-between gap-3 rounded-full"
            style={{
              maxWidth: 560,
              padding: "8px 18px",
              background: "var(--surface-1)",
              border: "1px solid var(--violet-border)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <span className="inline-flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>
              <motion.span
                className="block rounded-full"
                style={{ width: 6, height: 6, background: "var(--lime)" }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              BROADCASTING
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
              ANANYA S. <span style={{ color: "var(--text-3)" }}>·</span> <span style={{ fontFamily: "var(--font-mono)", color: "var(--lime)" }}>78</span> <span style={{ color: "var(--text-3)" }}>·</span> BAND A
            </span>
            <span className="hidden sm:inline" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>
              JR-25-K9X8M2
            </span>
          </motion.div>

          {/* Three connectors fanning down */}
          <svg
            className="hidden md:block absolute left-0 right-0 mx-auto pointer-events-none"
            style={{ top: "100%", width: "100%", height: 60 }}
            viewBox="0 0 840 60"
            preserveAspectRatio="none"
          >
            {[
              { x: 140, color: "rgba(109,86,164,0.5)" },
              { x: 420, color: "rgba(109,86,164,0.5)" },
              { x: 700, color: "rgba(201,220,83,0.5)" },
            ].map((l, i) => (
              <motion.path
                key={i}
                d={`M 420 0 Q 420 30, ${l.x} 60`}
                stroke={l.color}
                strokeWidth={1}
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease }}
              />
            ))}
          </svg>
        </div>

        {/* Three lenses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7">
          <LensCard
            tag="01 · IN YOUR POCKET"
            color="var(--violet)"
            tagline="Your proof, ready when you are."
            delay={0}
          >
            <StudentLens />
          </LensCard>
          <LensCard
            tag="02 · YOUR GROWTH MAP"
            color="var(--violet)"
            tagline="See exactly where to level up next."
            delay={0.1}
          >
            <GrowthMapLens />
          </LensCard>
          <LensCard
            tag="03 · WHAT IT SIGNALS"
            color="var(--lime)"
            tagline="What hiring teams read in your score."
            delay={0.2}
          >
            <SignalLens />
          </LensCard>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mt-8 md:mt-14 rounded-[14px] px-5 py-4 md:px-8 md:py-6"
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--violet-border)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex-shrink-0">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>
                YOUR JREE SCORE IS RECOGNISED AT
              </div>
              <div className="mt-2 flex items-baseline gap-2.5">
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 34, color: "var(--lime)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  240+
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>companies hiring in India</span>
              </div>
            </div>
            <div className="flex-1 flex flex-wrap gap-x-5 gap-y-2 items-center md:justify-end" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-2)", letterSpacing: "-0.01em" }}>
              {["Razorpay", "CRED", "Zerodha", "Swiggy", "Postman", "Zomato"].map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Closing line */}
        <div className="mt-8 md:mt-14 text-center max-w-[680px] mx-auto">
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2.6vw,26px)", color: "var(--text-1)", lineHeight: 1.4 }}>
            One score you actually own.{" "}
            <span style={{ color: "var(--lime)" }}>A map to grow it.</span> A language hiring teams already speak.
          </p>
        </div>
      </div>
    </section>
  );
}

function LensCard({ tag, color, tagline, delay, children }: { tag: string; color: string; tagline: string; delay: number; children: React.ReactNode }) {
  const glow = color === "var(--lime)" ? "rgba(201,220,83,0.25)" : color === "var(--violet)" ? "rgba(109,86,164,0.25)" : "rgba(109,86,164,0.25)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease }}
      whileHover={{ y: -8 }}
      className="relative grain rounded-[18px] overflow-hidden flex flex-col group"
      style={{
        background: "var(--surface-1)",
        border: "1px solid rgba(109,86,164,0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.4)",
        transition: "box-shadow 300ms, border-color 300ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.06), 0 36px 72px rgba(0,0,0,0.5), 0 0 0 1px ${glow}, 0 0 60px ${glow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(109,86,164,0.18)";
        e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.4)";
      }}
    >
      {/* shimmer line on hover */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ top: 0, height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* tag bar */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(240,235,255,0.06)" }}>
        <span className="inline-flex items-center gap-2.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>
          <motion.span
            className="block rounded-full"
            style={{ width: 7, height: 7, background: color, boxShadow: `0 0 8px ${color}` }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {tag}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
          ● LIVE
        </span>
      </div>

      {/* mock */}
      <div className="relative flex-1 px-6 sm:px-7 pt-7 pb-6">
        {children}
      </div>

      {/* tagline */}
      <div className="px-7 py-5" style={{ borderTop: "1px solid rgba(240,235,255,0.06)" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(17px,2.2vw,19px)", color: "var(--text-1)", lineHeight: 1.4 }}>
          {tagline}
        </p>
      </div>
    </motion.div>
  );
}

/* ----- LENS 1: Student — phone with score & share ----- */
function StudentLens() {
  return (
    <div className="relative flex justify-center">
      <div
        className="relative"
        style={{
          width: 230,
          height: 490,
          borderRadius: 32,
          background: "linear-gradient(165deg,#1A1525,#0E0B17)",
          border: "1px solid rgba(109,86,164,0.3)",
          boxShadow: "0 28px 64px rgba(0,0,0,0.55), inset 0 0 0 4px #050308",
          padding: "26px 18px 18px",
          transform: "rotate(-2deg)",
        }}
      >
        {/* notch */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: 8, width: 72, height: 18, background: "#050308", borderRadius: 12 }}
        />

        {/* status bar */}
        <div className="flex items-center justify-between mb-5 mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
          <span>9:41</span>
          <span>● ● ●</span>
        </div>

        {/* logo */}
        <div className="flex items-center mb-4">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "var(--text-1)", letterSpacing: "-0.03em" }}>
            JREE
          </span>
          <span className="inline-block rounded-full ml-0.5" style={{ width: 4, height: 4, background: "var(--lime)" }} />
        </div>

        {/* score */}
        <div
          className="rounded-[14px] p-4"
          style={{ background: "linear-gradient(140deg,rgba(109,86,164,0.25),rgba(201,220,83,0.1))", border: "1px solid rgba(109,86,164,0.3)" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>YOUR SCORE</div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 56, color: "var(--text-1)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
            >
              78
            </motion.span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>/100</span>
          </div>
          <span
            className="inline-flex mt-2"
            style={{
              padding: "3px 9px",
              borderRadius: 100,
              background: "var(--lime)",
              color: "var(--on-lime)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "-0.01em",
            }}
          >
            BAND A
          </span>
        </div>

        {/* what your score means */}
        <div className="mt-4" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
          WHAT YOUR 78 MEANS
        </div>
        {[
          { label: "Top 15% nationally", tag: "STRONG", good: true },
          { label: "Interview-ready · Band A", tag: "READY", good: true },
          { label: "+8 pts to reach Band A+", tag: "NEXT", good: false },
        ].map((r) => (
          <div
            key={r.label}
            className="mt-2 flex items-center justify-between rounded-lg px-2.5 py-2"
            style={{ background: "rgba(240,235,255,0.04)" }}
          >
            <span className="truncate" style={{ fontFamily: "var(--font-body)", fontSize: 10.5, color: "var(--text-2)" }}>
              {r.label}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: r.good ? "var(--lime-text)" : "var(--violet)" }}>
              {r.tag}
            </span>
          </div>
        ))}

        {/* share buttons */}
        <div className="mt-4 flex gap-2">
          {[
            { l: "in", c: "var(--violet)" },
            { l: "Wa", c: "var(--lime-text)" },
            { l: "↗", c: "var(--text-2)" },
          ].map((s) => (
            <span
              key={s.l}
              className="flex-1 rounded-lg text-center py-2"
              style={{ border: `1px solid ${s.c}`, color: s.c, fontFamily: "var(--font-mono)", fontSize: 11 }}
            >
              {s.l}
            </span>
          ))}
        </div>
      </div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5, ease }}
        className="absolute"
        style={{
          right: -8,
          top: 36,
          padding: "9px 13px",
          borderRadius: 12,
          background: "var(--surface-2)",
          border: "1px solid rgba(201,220,83,0.3)",
          boxShadow: "0 14px 28px rgba(0,0,0,0.55)",
          maxWidth: 150,
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.02em" }}>
          ↑ NEW
        </div>
        <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-1)", lineHeight: 1.35 }}>
          Razorpay viewed your score
        </div>
      </motion.div>
    </div>
  );
}

/* ----- LENS 2: Growth Map — JREE dashboard showing where to improve ----- */
function GrowthMapLens() {
  const dims = [
    { label: "Reasoning",     score: 84, color: "var(--lime)",   note: "Strong",         delta: "+6" },
    { label: "Communication", score: 76, color: "var(--violet)", note: "Steady",         delta: "+2" },
    { label: "Domain depth",  score: 71, color: "var(--violet)",   note: "Improving",      delta: "+4" },
    { label: "Composure",     score: 64, color: "#F59E0B",       note: "Focus here",     delta: "−1", focus: true },
    { label: "Logic & data",  score: 79, color: "var(--lime)",   note: "On track",       delta: "+3" },
  ];
  return (
    <div className="rounded-[14px] overflow-hidden" style={{ background: "var(--bg-2)", border: "1px solid rgba(240,235,255,0.06)" }}>
      {/* header */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(240,235,255,0.05)", background: "var(--surface-1)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
            YOUR JREE DASHBOARD
          </div>
          <div className="mt-1.5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
            5 dimensions · scored
          </div>
        </div>

      </div>

      {/* dimensions */}
      <div className="px-5 py-4">
        {dims.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease }}
            className="mb-3 last:mb-0"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12.5, color: "var(--text-1)" }}>
                {d.label}
              </span>
              <span className="flex items-center gap-2">
                
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: d.color, lineHeight: 1, minWidth: 22, textAlign: "right" }}>
                  {d.score}
                </span>
              </span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(240,235,255,0.05)" }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${d.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease }}
                className="h-full rounded-full"
                style={{ background: d.color, boxShadow: `0 0 8px ${d.color}80` }}
              />
              {/* target marker */}
              <span
                className="absolute top-0 bottom-0"
                style={{ left: `${d.score + 8}%`, width: 1, background: "rgba(240,235,255,0.25)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* next-step card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8, ease }}
        className="mx-5 mb-5 rounded-[10px] px-3.5 py-3"
        style={{
          background: "linear-gradient(135deg, rgba(109,86,164,0.12), rgba(109,86,164,0.08))",
          border: "1px solid rgba(109,86,164,0.3)",
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--violet)", letterSpacing: "0.07em" }}>
          NEXT MODULE · 12 MIN
        </div>
        <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12.5, color: "var(--text-1)", lineHeight: 1.35 }}>
          Composure drills — answer under pressure
        </div>
      </motion.div>
    </div>
  );
}

/* ----- LENS 3: Signal — decoder of what the score means to hiring teams ----- */
function SignalLens() {
  const reads = [
    { label: "INTERVIEW-READY",  on: true },
    { label: "OWNS PROBLEMS",    on: true },
    { label: "CLEAR THINKER",    on: true },
    { label: "ENTRY-LEVEL FIT",  on: false },
  ];
  return (
    <div className="rounded-[14px] overflow-hidden" style={{ background: "var(--bg-2)", border: "1px solid rgba(240,235,255,0.06)" }}>
      {/* header — score decoder */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(240,235,255,0.05)", background: "var(--surface-1)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
          BAND A · SCORE DECODER
        </div>
        <div className="mt-2 flex items-baseline gap-2.5">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--lime)", letterSpacing: "-0.03em", lineHeight: 1, textShadow: "0 0 18px rgba(201,220,83,0.4)" }}>
            78
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>
            top <span style={{ color: "var(--text-1)" }}>15%</span> nationally
          </span>
        </div>

        {/* percentile bar */}
        <div className="mt-3 relative h-1.5 rounded-full" style={{ background: "rgba(240,235,255,0.05)" }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "78%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="absolute left-0 top-0 bottom-0 rounded-full"
            style={{ background: "var(--lime)", boxShadow: "0 0 10px rgba(201,220,83,0.5)" }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="absolute -top-1.5 rounded-full"
            style={{ left: "calc(78% - 5px)", width: 10, height: 10, background: "var(--lime)", boxShadow: "0 0 12px var(--lime)" }}
          />
        </div>
        <div className="mt-1.5 flex justify-between" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.04em" }}>
          <span>0</span><span>50</span><span style={{ color: "var(--lime-text)" }}>YOU · 78</span><span>100</span>
        </div>
      </div>

      {/* "Reads as" block */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(240,235,255,0.05)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
          HOW HIRING TEAMS READ THIS
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {reads.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.07, ease }}
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5"
              style={{
                background: r.on ? "rgba(201,220,83,0.08)" : "rgba(240,235,255,0.03)",
                border: `1px solid ${r.on ? "var(--lime-border)" : "rgba(240,235,255,0.06)"}`,
              }}
            >
              <span
                className="inline-flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 14, height: 14,
                  background: r.on ? "var(--lime)" : "transparent",
                  border: r.on ? "none" : "1px solid rgba(240,235,255,0.2)",
                  color: "var(--on-lime)",
                  fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12,
                }}
              >
                {r.on ? "✓" : ""}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: r.on ? "var(--lime-text)" : "var(--text-3)", letterSpacing: "0.03em" }}>
                {r.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* verify line */}
      <div className="px-5 py-4 flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-md flex-shrink-0"
          style={{ width: 36, height: 36, background: "rgba(109,86,164,0.15)", border: "1px solid var(--violet-border)" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: "var(--lime)" }}>✓</span>
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12.5, color: "var(--text-1)" }}>
            Verified · tamper-proof
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
            jree.in/verify/JR-25-K9X8M2
          </div>
        </div>
      </div>
    </div>
  );
}


/* ============ 05. HOW IT WORKS — JOURNEY TRACE ============ */
export function HowItWorks() {
  const steps = [
    {
      n: "01",
      stamp: "T+00:00",
      duration: "60 SEC",
      tag: "REGISTER",
      title: "You're one OTP away.",
      body: "Name, email, college, OTP. No app. No payment. No reason not to start.",
      Artifact: ArtifactRegister,
      color: "var(--violet)",
    },
    {
      n: "02",
      stamp: "T+00:01",
      duration: "75 MIN",
      tag: "WRITTEN LAYERS",
      title: "Four layers. One picture.",
      body: "Aptitude · English · Domain · Situational Judgement. Distraction-free UI. Auto-saves every 30 seconds.",
      Artifact: ArtifactLayers,
      color: "var(--lime)",
    },
    {
      n: "03",
      stamp: "T+01:16",
      duration: "15 MIN",
      tag: "AI INTERVIEW",
      title: "Meet Priya.",
      body: "Five structured questions. Video responses. Scored on content, clarity, composure — not your accent or appearance.",
      Artifact: ArtifactPriya,
      color: "var(--violet)",
      accent: true,
    },
    {
      n: "04",
      stamp: "T+01:31",
      duration: "INSTANT",
      tag: "SCORED",
      title: "A number that means something.",
      body: "0–100 score. Band A through D. Your exact national percentile. Layer-by-layer breakdown.",
      Artifact: ArtifactScore,
      color: "var(--lime)",
    },
    {
      n: "05",
      stamp: "T+01:31",
      duration: "PDF + QR",
      tag: "CERTIFIED",
      title: "Proof in your pocket.",
      body: "A signed PDF with a QR code. LinkedIn-ready. Verifiable by any employer in 5 seconds.",
      Artifact: ArtifactCert,
      color: "var(--violet)",
    },
    {
      n: "06",
      stamp: "T+01:32 →",
      duration: "ONGOING",
      tag: "FINDABLE",
      title: "Now you're findable.",
      body: "Employers search by role fit, score, domain, location. Your score is your first impression.",
      Artifact: ArtifactInbox,
      color: "var(--lime)",
    },
  ];

  return (
    <section className="relative pb-16 md:pb-28" style={{ background: "var(--bg-2)", overflowX: "clip" }}>
      {/* Background ghost word */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          right: "-4vw",
          top: "8%",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "min(28vw, 360px)",
          color: "rgba(240,235,255,0.025)",
          letterSpacing: "-0.06em",
          lineHeight: 0.85,
          writingMode: "vertical-rl",
        }}
      >
        JOURNEY
      </div>

      <LearnerLifecycle />
    </section>
  );
}

function JourneyTrace({ steps }: { steps: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-15%" });

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical rail — desktop */}
      <div
        className="hidden md:block absolute pointer-events-none"
        style={{
          left: "calc(130px + 40px + 28px)",
          top: 12,
          bottom: 12,
          width: 1,
          background: "linear-gradient(to bottom, transparent, var(--violet-border) 8%, var(--violet-border) 92%, transparent)",
        }}
      />
      {/* Animated fill */}
      <motion.div
        className="hidden md:block absolute pointer-events-none"
        style={{
          left: "calc(130px + 40px + 28px)",
          top: 12,
          width: 1,
          background: "linear-gradient(to bottom, var(--violet), var(--lime))",
          transformOrigin: "top",
        }}
        initial={{ height: 0 }}
        animate={inView ? { height: "calc(100% - 24px)" } : { height: 0 }}
        transition={{ duration: 2.2, ease }}
      />

      {steps.map((s, i) => (
        <StepRow key={s.n} step={s} index={i} />
      ))}
    </div>
  );
}

function StepRow({ step, index }: { step: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Artifact = step.Artifact;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[130px_56px_1fr_minmax(0,320px)] gap-4 md:gap-10 py-5 md:py-16"
    >
      {/* TIME COLUMN */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 15, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
          {step.stamp}
        </div>
        <div className="mt-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
          {step.duration}
        </div>
      </motion.div>

      {/* NODE on rail */}
      <div className="hidden md:flex items-start justify-center pt-1 relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease }}
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            background: "var(--bg-2)",
            border: `1.5px solid ${step.color}`,
            boxShadow: `0 0 0 6px var(--bg-2), 0 0 32px ${step.color === "var(--lime)" ? "rgba(201,220,83,0.45)" : step.color === "var(--violet)" ? "rgba(109,86,164,0.45)" : "rgba(109,86,164,0.45)"}`,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: step.color }}>
            {step.n}
          </span>
          {/* static convergence ring — shrinks step 01 → 06 */}
          <span
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: `${-12.34 + index * 1.7}px`,
              border: `1px solid ${step.color}`,
              opacity: 0.5,
            }}
          />
          {/* live pulse */}
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `1px solid ${step.color}` }}
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        </motion.div>
      </div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="min-w-0"
      >
        <div className="inline-flex items-center gap-2 flex-wrap">
          <span className="block rounded-full" style={{ width: 6, height: 6, background: step.color }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: step.color, letterSpacing: "0.03em", fontWeight: 500 }}>
            {step.tag}
          </span>
          {step.accent && (
            <span
              className="ml-1"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                padding: "3px 9px",
                borderRadius: 100,
                background: "transparent",
                border: "1px solid var(--lime-border)",
                color: "var(--lime-text)",
                letterSpacing: "0.02em",
              }}
            >
              ★ UNIQUE TO JREE
            </span>
          )}
        </div>
        <h3 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3.6vw,36px)", color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {step.title}
        </h3>
        <p className="mt-4 max-w-[560px]" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.8vw,16.5px)", color: "var(--text-2)", lineHeight: 1.7 }}>
          {step.body}
        </p>
      </motion.div>

      {/* ARTIFACT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="relative group cursor-default"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="grain rounded-[16px] overflow-hidden relative transition-shadow duration-300"
          style={{
            background: "var(--surface-1)",
            border: "1px solid rgba(109,86,164,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 22px 48px rgba(0,0,0,0.4)",
            padding: 20,
          }}
          whileHover={{
            borderColor: step.color,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 64px rgba(0,0,0,0.5), 0 0 0 1px ${step.color === "var(--lime)" ? "rgba(201,220,83,0.4)" : step.color === "var(--violet)" ? "rgba(109,86,164,0.4)" : "rgba(109,86,164,0.4)"}, 0 0 40px ${step.color === "var(--lime)" ? "rgba(201,220,83,0.2)" : step.color === "var(--violet)" ? "rgba(109,86,164,0.2)" : "rgba(109,86,164,0.2)"}`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* shimmer line on hover */}
          <motion.div
            className="absolute inset-x-0 pointer-events-none"
            style={{
              top: 0,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
          />

          <div className="flex items-center justify-between mb-4">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>
              {step.n}/06
            </span>
            <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: step.color, letterSpacing: "0.07em" }}>
              <motion.span
                className="block rounded-full"
                style={{ width: 5, height: 5, background: step.color }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              {step.tag}
            </span>
          </div>
          <Artifact />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ----- Journey artifacts ----- */
function ArtifactRegister() {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>ENTER OTP</div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0.3, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.4 + i * 0.12 }}
            className="rounded-lg flex items-center justify-center"
            style={{
              height: 48,
              background: "var(--bg-3)",
              border: "1px solid var(--violet-border)",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--text-1)",
            }}
          >
            {["3", "9", "4", "1"][i]}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0 }}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full"
        style={{
          padding: "5px 10px",
          background: "var(--lime-soft)",
          border: "1px solid var(--lime-border)",
          fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.03em",
        }}
      >
        ✓ verified · ananya@vit.edu.in
      </motion.div>
    </div>
  );
}

function ArtifactLayers() {
  const layers = [
    { l: "Aptitude", pct: 82, c: "var(--lime)" },
    { l: "English", pct: 76, c: "var(--violet)" },
    { l: "Domain", pct: 81, c: "var(--violet)" },
    { l: "Sit. Judg.", pct: 72, c: "#F59E0B" },
  ];
  return (
    <div>
      {layers.map((d, i) => (
        <div key={d.l} className="flex items-center gap-2.5 mb-3 last:mb-0">
          <span className="flex-shrink-0" style={{ width: 70, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
            {d.l}
          </span>
          <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(240,235,255,0.05)" }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${d.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }}
              className="h-full"
              style={{ background: d.c, boxShadow: `0 0 8px ${d.c}80` }}
            />
          </div>
          <span className="w-8 text-right" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--text-1)" }}>
            {d.pct}
          </span>
        </div>
      ))}
      <div className="mt-4 pt-3 flex justify-between items-center" style={{ borderTop: "1px dashed rgba(109,86,164,0.2)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
        <span>auto-saved 0:00:30 ago</span>
        <span className="inline-flex items-center gap-1" style={{ color: "var(--lime-text)" }}>
          <motion.span className="block rounded-full" style={{ width: 5, height: 5, background: "var(--lime)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          75:00
        </span>
      </div>
    </div>
  );
}

function ArtifactPriya() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_1fr] gap-2">
        <div className="relative rounded-lg overflow-hidden" style={{ height: 120, background: "linear-gradient(135deg,#1E1030,#2D1A4A)" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="rounded-[40%]" style={{ width: 36, height: 46, background: "linear-gradient(135deg,#3D2257,#6D56A4)" }} />
            <span className="mt-2" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--lime-text)" }}>Priya</span>
            <div className="mt-1.5 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="block rounded-full" style={{ width: 3, height: 3, background: "var(--lime)" }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden flex items-center justify-center" style={{ height: 120, background: "#181520" }}>
          <div
            className="rounded-full"
            style={{
              width: 36,
              height: 36,
              background: "var(--surface-3)",
              border: "2px solid transparent",
              backgroundImage: "linear-gradient(var(--surface-3),var(--surface-3)), linear-gradient(135deg,var(--violet),var(--lime))",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          />
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)" }}>
            <motion.span className="block rounded-full" style={{ width: 5, height: 5, background: "var(--violet)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            rec
          </span>
        </div>
      </div>
      <div className="mt-3.5 flex items-center justify-between" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
        <span>Q 2 / 5</span>
        <div className="flex items-end gap-[3px]" style={{ height: 16 }}>
          {[6, 12, 8, 16, 10, 14, 7, 11, 9, 12].map((h, i) => (
            <motion.span
              key={i}
              className="block"
              style={{ width: 2, background: "var(--lime)", borderRadius: 2 }}
              animate={{ height: [h * 0.4, h, h * 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
        <span style={{ color: "var(--lime-text)" }}>01:24</span>
      </div>
    </div>
  );
}

function ArtifactScore() {
  return (
    <div className="flex items-center gap-5">
      <div style={{ transform: "scale(1.15)", transformOrigin: "left center" }}>
        <MiniScoreRing score={78} />
      </div>
      <div className="flex-1 min-w-0">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>YOUR SCORE</div>
        <div className="flex items-baseline gap-1 mt-1">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 1 }}>78</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>/100</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="inline-block"
            style={{
              padding: "4px 11px",
              borderRadius: 100,
              background: "var(--lime)",
              color: "var(--on-lime)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            BAND A
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>91st pctile</span>
        </div>
      </div>
    </div>
  );
}

function ArtifactCert() {
  return (
    <div className="flex gap-3 items-start">
      <div
        className="rounded-lg flex-shrink-0 relative"
        style={{
          width: 88,
          height: 118,
          background: "linear-gradient(180deg,#1A1525 0%,#0E0B17 100%)",
          border: "1px solid rgba(109,86,164,0.35)",
          padding: 9,
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, color: "var(--text-1)" }}>JREE</div>
        <div className="mt-2.5" style={{ fontFamily: "var(--font-mono)", fontSize: 7, color: "var(--text-3)", letterSpacing: "0.02em" }}>SCORE</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, color: "var(--lime)", letterSpacing: "-0.04em", lineHeight: 1 }}>78</div>
        <div className="absolute bottom-2 right-2 grid grid-cols-6 gap-[1px]" style={{ width: 30, height: 30 }}>
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} className="block" style={{ background: (i * 7 + 3) % 3 === 0 ? "var(--text-1)" : "transparent" }} />
          ))}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="inline-flex items-center gap-1.5 rounded-full" style={{ padding: "3px 9px", background: "rgba(109,86,164,0.1)", border: "1px solid rgba(109,86,164,0.35)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)", letterSpacing: "0.05em" }}>
          ✓ VERIFIED
        </div>
        <div className="mt-2.5 truncate" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
          ananya-s_JR-25-K9X8M2.pdf
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["LinkedIn", "WhatsApp", "↗"].map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                padding: "3px 9px",
                borderRadius: 100,
                border: "1px solid var(--violet-border)",
                color: "var(--text-2)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtifactInbox() {
  const msgs = [
    { c: "Razorpay", r: "Product Analyst", t: "2h", hot: true },
    { c: "Cred", r: "SDE-1", t: "1d" },
    { c: "Zerodha", r: "QA Eng", t: "3d" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
        <span style={{ letterSpacing: "0.07em" }}>INBOX · 3 NEW</span>
        <span className="inline-flex items-center gap-1" style={{ color: "var(--lime-text)" }}>
          <motion.span className="block rounded-full" style={{ width: 5, height: 5, background: "var(--lime)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          live
        </span>
      </div>
      {msgs.map((m, i) => (
        <motion.div
          key={m.c}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease }}
          className="flex items-center gap-2.5 py-3"
          style={{ borderTop: i > 0 ? "1px solid rgba(240,235,255,0.04)" : "none" }}
        >
          {m.hot ? (
            <motion.span className="block rounded-full flex-shrink-0" style={{ width: 7, height: 7, background: "var(--lime)", boxShadow: "0 0 8px var(--lime)" }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          ) : (
            <span className="block flex-shrink-0" style={{ width: 7, height: 7 }} />
          )}
          <span className="flex-1 truncate" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--text-1)" }}>
            {m.c}
            <span style={{ color: "var(--text-3)", fontWeight: 400 }}> · {m.r}</span>
          </span>
          <span className="flex-shrink-0" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
            {m.t}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ============ 06. MEET PRIYA — AI INTERVIEW STUDIO ============ */
const AI_ROSTER = [
  { id: "priya",  name: "Priya",  gender: "F", accent: "Neutral Indian",   tone: "Warm",   v: "v2.4", color: "var(--lime)" },
  { id: "arjun",  name: "Arjun",  gender: "M", accent: "Neutral Indian",   tone: "Crisp",  v: "v2.4", color: "var(--violet)" },
  { id: "meera",  name: "Meera",  gender: "F", accent: "South Indian",     tone: "Calm",   v: "v2.3", color: "var(--violet)" },
  { id: "rohan",  name: "Rohan",  gender: "M", accent: "North Indian",     tone: "Direct", v: "v2.4", color: "var(--lime)" },
] as const;
type AiId = typeof AI_ROSTER[number]["id"];
type ActiveAi = typeof AI_ROSTER[number];

function AiRosterPicker({ selected, onSelect }: { selected: AiId; onSelect: (id: AiId) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      className="mx-auto mb-5 md:mb-10"
      style={{ maxWidth: 1040 }}
    >
      <div
        className="rounded-[16px] p-3 md:p-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--violet-border)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 40px rgba(0,0,0,0.35)",
        }}
      >
        {AI_ROSTER.map((a) => {
          const isActive = a.id === selected;
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              className="flex items-center gap-2.5 rounded-[12px] min-w-0 transition-all"
              style={{
                padding: "9px 11px",
                background: isActive ? "rgba(109,86,164,0.18)" : "transparent",
                border: `1px solid ${isActive ? a.color : "rgba(240,235,255,0.08)"}`,
                boxShadow: isActive ? `0 0 0 1px ${a.color}40, 0 0 24px ${a.color}30` : "none",
              }}
            >
              <span className="relative block rounded-full flex-shrink-0" style={{ width: 28, height: 28 }}>
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), ${a.color} 40%, #1A0E2E 100%)`,
                    boxShadow: isActive ? `0 0 16px ${a.color}80, inset 0 0 8px rgba(255,255,255,0.2)` : "inset 0 0 6px rgba(0,0,0,0.4)",
                  }}
                />
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${a.color}` }}
                    animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </span>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text-1)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                    {a.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.04em" }}>
                    {a.gender}
                  </span>
                </div>
                <div className="mt-1 truncate" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: isActive ? a.color : "var(--text-3)", letterSpacing: "0.03em" }}>
                  {a.tone.toUpperCase()} · {a.accent.toUpperCase()}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-2.5 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>
        SWITCH ANY TIME · ALL MODELS SCORE IDENTICALLY
      </div>
    </motion.div>
  );
}

export function MeetPriya() {
  const [selectedAi, setSelectedAi] = useState<AiId>("priya");
  const active = AI_ROSTER.find((a) => a.id === selectedAi) ?? AI_ROSTER[0];
  return (
    <section className={`relative overflow-hidden ${SECTION}`} style={{ background: "var(--bg-3)" }}>
      {/* radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%", top: "40%", transform: "translate(-50%,-50%)",
          width: "min(1400px, 140vw)", height: "min(1400px, 140vw)",
          background: "radial-gradient(circle, rgba(109,86,164,0.22), transparent 55%)",
        }}
      />
      {/* ghost word */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          left: "-2vw", bottom: "-4vw",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "min(28vw, 380px)",
          color: "rgba(240,235,255,0.035)",
          letterSpacing: "-0.06em",
          lineHeight: 0.85,
        }}
      >
        {active.name.toUpperCase()}
      </div>

      <div className={`relative ${CONTAINER}`}>
        {/* header */}
        <div className="text-center mb-6 md:mb-10 max-w-[720px] mx-auto">
          <Eyebrow>03 / THE AI INTERVIEWER</Eyebrow>
          <div className="mt-4">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,6vw,56px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Pick your interviewer.{" "}
              They listen{" "}
              like nobody else does.
            </h2>
          </div>
          <p className="mt-5 max-w-[580px] mx-auto" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.7vw,16px)", color: "var(--text-2)", lineHeight: 1.6 }}>
            Six AI interviewers. Different voices, accents, and tones — same honest read. Scored on what you said, how clearly you said it, and how you held yourself. Never on your accent, your background, or how you look.
          </p>
        </div>

        {/* Roster picker */}
        <AiRosterPicker selected={selectedAi} onSelect={setSelectedAi} />

        {/* Studio */}
        <PriyaStudio active={active} />

        {/* Footer note + CTA */}
        <div className="mt-8 md:mt-14 text-center max-w-[640px] mx-auto">
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2.6vw,26px)", color: "var(--text-1)", lineHeight: 1.4 }}>
            Five questions. <span style={{ color: "var(--lime)" }}>Zero bias.</span> One honest read of who you actually are.
          </p>
          <button
            className="mt-7 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{
              height: 48,
              padding: "0 22px",
              background: "transparent",
              border: "1px solid var(--violet)",
              color: "var(--text-1)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={() => { window.location.hash = "signup"; }}
          >
            Meet them yourself →
          </button>
        </div>
      </div>
    </section>
  );
}

function PriyaStudio({ active }: { active: ActiveAi }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="relative grain rounded-[20px] overflow-hidden mx-auto"
      style={{
        maxWidth: 1040,
        background: "var(--surface-1)",
        border: "1px solid rgba(109,86,164,0.25)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3" style={{ background: "var(--bg-2)", borderBottom: "1px solid rgba(109,86,164,0.18)" }}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex gap-1.5 flex-shrink-0">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block rounded-full" style={{ width: 8, height: 8, background: "#3D3D3D" }} />
            ))}
          </div>
          <span className="hidden sm:inline" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>
            JREE.IN / INTERVIEW
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:inline" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>
            Q <span style={{ color: "var(--text-1)" }}>2 / 5</span>
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--danger)", letterSpacing: "0.02em" }}>
            <motion.span className="block rounded-full" style={{ width: 6, height: 6, background: "var(--danger)" }} animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            REC 01:24
          </span>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
        {/* Avatar stage */}
        <div className="relative p-5 sm:p-8 md:p-10 flex flex-col items-center justify-center" style={{ background: "radial-gradient(ellipse at center, rgba(109,86,164,0.18), transparent 70%), linear-gradient(165deg,#0E0B17,#1A1525)", minHeight: 320 }}>
          <PriyaAvatar accent={active.color} key={active.id} />

          {/* Identity card */}
          <div className="mt-6 flex items-center gap-3 rounded-full" style={{ padding: "6px 14px 6px 6px", background: "rgba(20,15,32,0.7)", border: `1px solid ${active.color}`, backdropFilter: "blur(8px)", boxShadow: `0 0 24px ${active.color}30` }}>
            <span className="block rounded-full" style={{ width: 22, height: 22, background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), ${active.color} 45%, #1A0E2E 100%)` }} />
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--text-1)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                {active.name} <span style={{ color: "var(--text-3)", fontSize: 11 }}>· {active.gender}</span>
              </div>
            </div>
          </div>

          {/* Current question */}
          <div className="mt-6 max-w-[440px] text-center">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
              QUESTION 02 · BEHAVIORAL
            </div>
            <p className="mt-2.5" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(17px,2.3vw,22px)", color: "var(--text-1)", lineHeight: 1.4 }}>
              "Tell me about a time you had to figure something out completely on your own."
            </p>
          </div>
        </div>

        {/* Analysis panel */}
        <div className="relative" style={{ background: "var(--bg-2)", borderLeft: "1px solid rgba(109,86,164,0.18)" }}>
          {/* Live transcription */}
          <div className="p-5" style={{ borderBottom: "1px solid rgba(109,86,164,0.15)" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.07em" }}>
                ● LIVE TRANSCRIPT
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>EN-IN</span>
            </div>
            <TranscriptStream />
          </div>

          {/* Real-time scoring */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
                YOUR VIDEO
              </span>
              <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)" }}>
                <motion.span
                  className="block rounded-full"
                  style={{ width: 6, height: 6, background: "var(--lime)" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                LIVE
              </span>
            </div>

            <div
              className="relative rounded-[12px] overflow-hidden"
              style={{
                aspectRatio: "16 / 10",
                background: "#0B0712",
                border: "1px solid var(--violet-border)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              {/* camera preview disabled on landing page */}
              <div
                data-cam-fallback
                className="absolute inset-0 flex-col items-center justify-center gap-2 text-center px-6"
                style={{ display: "flex" }}
              >
                <span style={{ fontSize: 22 }}>📹</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.4 }}>
                  Your video here
                </span>
              </div>

              {/* REC badge */}
              <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full" style={{ padding: "3px 9px", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <motion.span
                  className="block rounded-full"
                  style={{ width: 6, height: 6, background: "#ff5f57" }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#F0EBFF", letterSpacing: "0.02em" }}>REC</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL BAR */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3" style={{ background: "var(--bg-2)", borderTop: "1px solid rgba(109,86,164,0.18)" }}>
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)" }}>
            <motion.span className="block rounded-full" style={{ width: 6, height: 6, background: "var(--violet)" }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            MIC ON
          </span>
          <span style={{ width: 1, height: 12, background: "var(--violet-border)" }} className="block" />
          <Waveform />
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {["Skip", "Repeat", "End"].map((b, i) => (
            <span
              key={b}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                padding: "4px 10px",
                borderRadius: 100,
                background: i === 2 ? "rgba(245,75,75,0.1)" : "transparent",
                border: `1px solid ${i === 2 ? "rgba(245,75,75,0.4)" : "var(--violet-border)"}`,
                color: i === 2 ? "var(--danger)" : "var(--text-2)",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PriyaAvatar({ accent = "var(--lime)" }: { accent?: string }) {
  return (
    <div className="relative" style={{ width: 160, height: 160 }}>
      {/* outer pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1px solid ${accent}`, opacity: 0.3 }}
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}

      {/* rotating dashed ring */}
      <motion.svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <circle cx={100} cy={100} r={96} fill="none" stroke="rgba(109,86,164,0.35)" strokeWidth={1} strokeDasharray="2 6" />
      </motion.svg>

      {/* counter-rotating dashed ring */}
      <motion.svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 200 200"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <circle cx={100} cy={100} r={84} fill="none" stroke="rgba(201,220,83,0.25)" strokeWidth={1} strokeDasharray="1 8" />
      </motion.svg>

      {/* core orb */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{
          left: 24, top: 24, width: 112, height: 112,
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6), ${accent} 25%, rgba(109,86,164,0.9) 55%, #1A0E2E 100%)`,
          boxShadow: `0 0 60px ${accent}80, inset 0 0 40px ${accent}40, inset 0 -20px 60px rgba(0,0,0,0.5)`,
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* highlight bloom */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: "20%", top: "15%", width: "40%", height: "40%",
            background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)",
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* internal mesh lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 112 112">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={56}
              cy={56}
              rx={52 - i * 3}
              ry={16 + i * 6}
              fill="none"
              stroke={accent}
              strokeOpacity={0.25}
              strokeWidth={0.5}
              transform={`rotate(${i * 36} 56 56)`}
            />
          ))}
        </svg>

        {/* speaking equalizer at bottom of orb */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1" style={{ height: 18 }}>
          {[10, 14, 8, 16, 12, 14, 9].map((h, i) => (
            <motion.span
              key={i}
              className="block"
              style={{ width: 2, background: accent, borderRadius: 2, boxShadow: `0 0 6px ${accent}` }}
              animate={{ height: [h * 0.3, h, h * 0.5] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>

      {/* orbital dots */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: "50%", top: "50%", width: 5, height: 5,
            background: i === 0 ? "var(--lime)" : i === 1 ? "var(--violet)" : "var(--violet)",
            boxShadow: `0 0 8px ${i === 0 ? "var(--lime)" : i === 1 ? "var(--violet)" : "var(--violet)"}`,
            marginLeft: -2.5, marginTop: -2.5,
            transformOrigin: "center",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear" }}
          initial={false}
        >
          <span
            className="block rounded-full"
            style={{
              width: 5, height: 5,
              background: "inherit",
              boxShadow: "inherit",
              transform: `translateY(-${74 - i * 5}px)`,
            }}
          />
        </motion.span>
      ))}
    </div>
  );
}

function TranscriptStream() {
  const lines = [
    { who: "P", text: "Tell me about a time you had to figure something out completely on your own.", done: true },
    { who: "Y", text: "Last semester, our team's deployment kept failing —", done: true },
    { who: "Y", text: "no senior was around, so I traced the env vars myself…", typing: true },
  ];
  return (
    <div className="space-y-2.5" style={{ maxHeight: 160, overflow: "hidden" }}>
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.4, ease }}
          className="flex gap-2 items-start"
        >
          <span
            className="flex-shrink-0 inline-flex items-center justify-center rounded-full mt-0.5"
            style={{
              width: 16, height: 16,
              background: l.who === "P" ? "rgba(109,86,164,0.2)" : "rgba(201,220,83,0.15)",
              color: l.who === "P" ? "var(--violet)" : "var(--lime-text)",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 8,
              letterSpacing: 0,
            }}
          >
            {l.who}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: l.who === "P" ? "var(--text-2)" : "var(--text-1)", lineHeight: 1.5 }}>
            {l.text}
            {l.typing && (
              <motion.span
                className="inline-block ml-1"
                style={{ width: 6, height: 12, background: "var(--lime)", verticalAlign: "middle" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ScoringMeter({ label, pct, color, hint, delay }: { label: string; pct: number; color: string; hint: string; delay: number }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-baseline justify-between mb-1">
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12, color: "var(--text-1)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color }}>{pct}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(240,235,255,0.05)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
      <div className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
        {hint}
      </div>
    </div>
  );
}

function Waveform() {
  const bars = [8, 14, 10, 18, 12, 22, 14, 10, 16, 8, 20, 12, 16, 10, 14, 8, 18, 12, 10, 16];
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 22 }}>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="block"
          style={{ width: 2, background: "var(--lime)", borderRadius: 2 }}
          animate={{ height: [h * 0.3, h, h * 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.04, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ============ 07. STATS ============ */
function BigCounter({ to, format = (n: number) => String(n), color, duration = 1.2 }: { to: number; format?: (n: number) => string; color: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (t: number) => {
      const p = Math.min((t - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setVal(Math.floor(to * eased));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, to, duration]);
  return (
    <span
      ref={ref}
      className="block break-words"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "clamp(56px,13vw,140px)",
        color,
        letterSpacing: "-0.05em",
        lineHeight: 0.9,
      }}
    >
      {format(val)}
    </span>
  );
}

export function Stats() {
  return (
    <section className={SECTION} style={{ background: "var(--bg)" }}>
      <div className={CONTAINER}>
        <div className="mb-6 md:mb-20">
          <Eyebrow>THE PROBLEM WE SOLVE</Eyebrow>
          <div className="mt-4">
            <Heading first="Numbers don't" italic="lie." />
          </div>
        </div>

        <Row
          number={<BigCounter to={8000000} format={(n) => n.toLocaleString()} color="var(--text-1)" />}
          caption="graduates enter the workforce every year in India"
          rotatedLabel="NASSCOM 2024"
        />

        <Divider />
        <div className="my-5 md:my-12 max-w-[420px] md:ml-auto md:text-right" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(17px,2.2vw,22px)", color: "var(--text-2)", lineHeight: 1.5 }}>
          The degrees are there. The skills are there.<br />
          The <span style={{ color: "var(--text-1)" }}>proof</span> was missing.
        </div>

        <Row
          number={<BigCounter to={60} format={(n) => `${n}%`} color="var(--danger)" />}
          caption="are considered unemployable by Indian employers"
          rotatedLabel="NASSCOM 2024"
        />

        <Divider />
        <div className="h-8 md:h-12" />

        <Row
          number={<BigCounter to={1} format={() => "1"} color="var(--lime)" duration={0.6} />}
          caption="standardized score changes everything. For everyone."
          micro="Free for students. Forever."
          rotatedLabel="JREE 2025"
        />
      </div>
    </section>
  );
}

function Row({ number, caption, micro, rotatedLabel }: { number: React.ReactNode; caption: string; micro?: string; rotatedLabel: string }) {
  return (
    <div className="relative py-5 md:py-6 md:pr-12">
      <div>{number}</div>
      <p className="mt-3 max-w-[600px]" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.6vw,16px)", color: "var(--text-2)" }}>
        {caption}
      </p>
      {micro && <p className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}>{micro}</p>}
      <span
        className="hidden lg:block absolute"
        style={{
          right: 0,
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "right center",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--text-3)",
          letterSpacing: "0.15em",
          whiteSpace: "nowrap",
        }}
      >
        {rotatedLabel}
      </span>
    </div>
  );
}

/* ============ 08. TESTIMONIALS ============ */
export function Testimonials() {
  const cards = [
    {
      quote: "I've been applying to 30+ companies for 4 months. One week after putting Band A on my profile, I had 3 interviews. The score does the talking.",
      name: "Ritika S.",
      role: "B.Tech CSE, VIT Pune",
      band: "A",
      score: "84",
      grad: "linear-gradient(135deg,#6D56A4,#C9DC53)",
      initials: "RS",
      avatar: "https://images.unsplash.com/photo-1747264464985-2bc2e20c739e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    },
    {
      quote: "We use JREE for our entire final-year cohort now. The college portal showed us which departments were actually placement-ready. No other tool gave us this.",
      name: "Prof. Anil Mehta",
      role: "T&P Cell, Amravati Engineering College",
      grad: "linear-gradient(135deg,#5B21B6,#6D56A4)",
      initials: "AM",
      avatar: "https://images.unsplash.com/photo-1618306842557-a2515acf2112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    },
    {
      quote: "40 candidates shortlisted in 2 hours. 12 hired. Zero CV screening. JREE is the first signal we actually trust.",
      name: "Sneha K.",
      role: "HR Lead, Pune SaaS startup",
      band: "B",
      grad: "linear-gradient(135deg,#6D56A4,#6D56A4)",
      initials: "SK",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
    },
  ];
  return (
    <section className={SECTION} style={{ background: "var(--bg-2)" }}>
      <div className={CONTAINER}>
        <div className="mb-6 md:mb-14">
          <Eyebrow>EARLY ADOPTERS</Eyebrow>
          <div className="mt-4">
            <Heading first="What they said" italic="after." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease }}
              className="relative grain rounded-[14px] p-6 md:p-7 flex flex-col"
              style={{
                background: "var(--surface-1)",
                border: "1px solid rgba(109,86,164,0.15)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.4)",
              }}
            >
              <span
                className="absolute"
                style={{
                  top: 4,
                  left: 18,
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 72,
                  lineHeight: 0.8,
                  color: "var(--violet)",
                  opacity: 0.5,
                }}
              >
                "
              </span>
              <p className="relative mt-6 flex-1" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 17, color: "var(--text-1)", lineHeight: 1.6 }}>
                {c.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, background: c.grad, fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "#fff" }}>
                  {c.avatar ? (
                    <ImageWithFallback src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    c.initials
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, color: "var(--text-1)" }}>{c.name}</div>
                  <div className="truncate" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#5D5578" }}>{c.role}</div>
                </div>
                {c.band && (
                  <span
                    className="flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      fontSize: 12,
                      padding: "4px 10px",
                      borderRadius: 100,
                      background: c.band === "A" ? "var(--lime-soft)" : "var(--violet-soft)",
                      color: c.band === "A" ? "var(--lime-text)" : "var(--violet)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Band {c.band}{c.score ? ` · ${c.score}` : ""}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ 10. WHY JREE IS DIFFERENT ============ */
export function Bands() {
  const points = [
    {
      no: "01",
      glyph: "🎤",
      accent: "var(--lime)",
      tag: "15% OF SCORE",
      title: "The AI interview counts toward your score.",
      body: "Your spoken answers contribute a fixed 15% — not a separate tool bolted on at the end.",
      img: "https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "A candidate taking a video interview on a laptop",
    },
    {
      no: "02",
      glyph: "📚",
      accent: "var(--violet)",
      tag: "ADAPTIVE",
      title: "Questions adapt to your stream.",
      body: "Engineering, Commerce, and Arts students each see questions from their own field.",
      img: "https://images.unsplash.com/photo-1549383028-df014fa3a325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "A student choosing a book in a library",
    },
    {
      no: "03",
      glyph: "🎯",
      accent: "var(--teal)",
      tag: "AUTOMATIC",
      title: "Role readiness, calculated for you.",
      body: "One assessment scores your fit across Sales, Analytics, Operations, HR, Finance and IT.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "A team collaborating around laptops in an office",
    },
    {
      no: "04",
      glyph: "📈",
      accent: "var(--violet)",
      tag: "IMPROVE",
      title: "Your score shows you exactly what to fix.",
      body: "JREE doesn't just tell you where you stand — it surfaces the one layer holding your composite down and gives you a concrete first action to move up a band.",
      img: "https://images.unsplash.com/photo-1728455635901-bb16530faf40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "A student working on a laptop, focused on improving their skills",
    },
    {
      no: "05",
      glyph: "📊",
      accent: "var(--lime)",
      tag: "FOR COLLEGES",
      title: "Colleges get batch analytics.",
      body: "Placement teams spot weak areas across departments before recruiters arrive.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      alt: "Analytics charts displayed on a laptop screen",
    },
  ];

  const softFor = (c: string) =>
    c === "var(--lime)" ? "var(--lime-soft)" : c === "var(--teal)" ? "rgba(81,193,181,0.14)" : "var(--violet-soft)";
  const borderFor = (c: string) =>
    c === "var(--lime)" ? "var(--lime-border)" : c === "var(--teal)" ? "rgba(81,193,181,0.32)" : "var(--violet-border)";
  const textFor = (c: string) => (c === "var(--lime)" ? "var(--lime-text)" : c);

  return (
    <section className={`relative overflow-hidden ${SECTION}`} style={{ background: "var(--bg)" }}>

      <div className={`relative ${CONTAINER}`}>
        {/* Header — editorial, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 lg:gap-16 items-end mb-6 md:mb-16">
          <div>
            <Eyebrow>04 / WHY JREE IS DIFFERENT</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(34px,5.4vw,60px)", color: "var(--text-1)", letterSpacing: "-0.035em", lineHeight: 1.02 }}>
              Built{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
                differently.
              </span>
              <br />
              For India&rsquo;s job market.
            </h2>
          </div>
          <p className="lg:pb-3" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.8vw,17px)", color: "var(--text-2)", lineHeight: 1.7, maxWidth: 520 }}>
            Five things JREE does that a multiple-choice test alone never could. Each one is a feature you can verify — not a tagline.
          </p>
        </div>

        {/* Differentiators — alternating image / text rows */}
        <div className="flex flex-col gap-8 md:gap-24">
          {points.map((p, i) => {
            const imgLeft = i % 2 === 0;
            return (
            <div
              key={p.no}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center"
            >
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: imgLeft ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease }}
                className={`relative grain rounded-[18px] overflow-hidden ${imgLeft ? "md:order-1" : "md:order-2"}`}
                style={{
                  border: `1px solid ${borderFor(p.accent)}`,
                  boxShadow: "0 28px 60px rgba(0,0,0,0.45)",
                }}
              >
                <ImageWithFallback
                  src={p.img}
                  alt={p.alt}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "16 / 11" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, transparent 55%, rgba(11,9,15,0.55))" }}
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: imgLeft ? 48 : -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.08, ease }}
                className={`min-w-0 ${imgLeft ? "md:order-2" : "md:order-1"}`}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>
                    {p.no}
                  </span>
                  <span
                    className="inline-flex items-center rounded-full"
                    style={{ padding: "4px 11px", background: softFor(p.accent), border: `1px solid ${borderFor(p.accent)}` }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: textFor(p.accent), letterSpacing: "0.02em" }}>
                      {p.tag}
                    </span>
                  </span>
                </div>
                <h3 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px,3.2vw,34px)", color: "var(--text-1)", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
                  {p.title}
                </h3>
                <p className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.8vw,17px)", color: "var(--text-2)", lineHeight: 1.65, maxWidth: 460 }}>
                  {p.body}
                </p>
              </motion.div>
            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function ScoreThermometer({ bands }: { bands: any[] }) {
  // bands array order: A, B, C, D — render top to bottom same order
  const YOUR_SCORE = 78;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="relative grain rounded-[16px] overflow-hidden flex flex-col"
      style={{
        background: "var(--surface-1)",
        border: "1px solid rgba(109,86,164,0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.4)",
        padding: "20px 22px",
        minHeight: 540,
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
          THE SCALE
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.02em" }}>
          0 – 100
        </span>
      </div>

      <div className="relative flex-1 mt-5 flex gap-5">
        {/* Tick scale */}
        <div className="relative flex flex-col justify-between" style={{ width: 28 }}>
          {[100, 75, 50, 25, 0].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", width: 22 }}>{n}</span>
              <span className="block" style={{ width: 6, height: 1, background: "var(--violet-border)" }} />
            </div>
          ))}
        </div>

        {/* Bar */}
        <div className="relative flex-1 rounded-md overflow-hidden flex flex-col-reverse" style={{ border: "1px solid rgba(240,235,255,0.06)", background: "var(--bg-3)" }}>
          {/* Zones (rendered bottom-up since flex-col-reverse) */}
          {bands.slice().reverse().map((b, i) => {
            const span = b.max - b.min + 1;
            return (
              <motion.div
                key={b.letter}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
                className="relative w-full"
                style={{
                  flex: `${span} 0 0`,
                  background: `linear-gradient(180deg, ${b.color}1A, ${b.color}44)`,
                  borderTop: i < bands.length - 1 ? "1px dashed rgba(240,235,255,0.1)" : "none",
                  transformOrigin: "bottom",
                }}
              >
                <span
                  className="absolute"
                  style={{
                    left: 12, top: 10,
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 22,
                    color: b.color,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {b.letter}
                </span>
                <span
                  className="absolute"
                  style={{
                    right: 10, bottom: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: b.color,
                    opacity: 0.85,
                  }}
                >
                  {b.range}
                </span>
              </motion.div>
            );
          })}

          {/* YOUR pointer at 78 (from bottom) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9, ease }}
            className="absolute right-0 left-0 pointer-events-none"
            style={{ bottom: `${YOUR_SCORE}%` }}
          >
            <div className="relative" style={{ marginBottom: -1 }}>
              <div className="absolute left-0 right-0" style={{ height: 1, background: "var(--lime)", boxShadow: "0 0 12px rgba(201,220,83,0.7)" }} />
              <div
                className="absolute inline-flex items-center gap-2 rounded-full whitespace-nowrap"
                style={{
                  left: "100%",
                  marginLeft: 12,
                  top: -16,
                  padding: "5px 12px",
                  background: "var(--lime)",
                  boxShadow: "0 12px 28px rgba(201,220,83,0.35)",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--on-lime)", letterSpacing: "0.02em", fontWeight: 700 }}>YOU</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, color: "var(--on-lime)", letterSpacing: "-0.02em" }}>
                  {YOUR_SCORE}
                </span>
              </div>
              <motion.span
                className="absolute rounded-full"
                style={{
                  left: -4, top: -3, width: 8, height: 8,
                  background: "var(--lime)",
                  boxShadow: "0 0 12px rgba(201,220,83,0.9)",
                }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* MEDIAN dashed line at 64 */}
          <div className="absolute left-0 right-0 pointer-events-none" style={{ bottom: "64%" }}>
            <div className="border-t border-dashed" style={{ borderColor: "rgba(240,235,255,0.25)" }} />
            <span
              className="absolute"
              style={{
                left: 8, top: -16,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-3)",
                letterSpacing: "0.02em",
              }}
            >
              MEDIAN · 64
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4" style={{ borderTop: "1px dashed rgba(109,86,164,0.18)" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 15, color: "var(--text-1)", lineHeight: 1.4 }}>
          A score, a band, a placement — all on one scale.
        </p>
      </div>
    </motion.div>
  );
}

function BandLadder({ bands }: { bands: any[] }) {
  return (
    <div className="flex flex-col gap-3">
      {bands.map((b, i) => (
        <BandRow key={b.letter} band={b} index={i} isYou={b.letter === "A"} />
      ))}
    </div>
  );
}

function BandRow({ band, index, isYou }: { band: any; index: number; isYou: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="relative grain rounded-[14px] overflow-hidden"
      style={{
        background: "var(--surface-1)",
        border: `1px solid ${isYou ? "var(--lime-border)" : "rgba(240,235,255,0.06)"}`,
        boxShadow: isYou
          ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,220,83,0.12)"
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* Color accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: 3, background: band.color, boxShadow: `0 0 16px ${band.color}80` }}
      />

      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] items-center gap-4 sm:gap-6 px-5 sm:px-6 py-5">
        {/* Letter + range */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(56px,8vw,72px)",
              color: band.color,
              letterSpacing: "-0.06em",
              lineHeight: 0.85,
            }}
          >
            {band.letter}
          </div>
          <div className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>
            {band.range}
          </div>
        </div>

        {/* Italic + signal */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2.6vw,26px)", color: "var(--text-1)", lineHeight: 1 }}>
              {band.italic}
            </span>
            {isYou && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  padding: "2px 8px",
                  borderRadius: 100,
                  background: "var(--lime)",
                  color: "var(--on-lime)",
                  letterSpacing: "0.02em",
                  fontWeight: 700,
                }}
              >
                ← YOU
              </span>
            )}
          </div>
          <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55 }}>
            {band.signal}
          </p>
        </div>

        {/* Stat */}
      </div>
    </motion.div>
  );
}


/* ============ 11. FAQ ============ */
export function FAQ() {
  const items = [
    { q: "Is JREE free for students?", a: "Yes, completely free. Colleges and employers pay for access. Students never pay anything to take the exam or receive their score." },
    { q: "How long does the assessment take?", a: "About 90 minutes for the written exam plus a 20-minute AI video interview. You can complete both in a single sitting or return for the interview separately." },
    { q: "Is the exam the same for tech and non-tech candidates?", a: "The aptitude, communication, and workplace sections are the same for everyone. Domain knowledge questions are tailored to your stream so the assessment is relevant to your field." },
    { q: "Can employers trust the score?", a: "Each score is locked at submission time and verified with a QR code on the certificate. It cannot be changed after the exam — what you scored is what employers see." },
    { q: "How do colleges enroll?", a: "Contact us via the Request Demo form. Onboarding takes less than a week, and your placement team gets access to batch-level analytics from day one." },
    { q: "How does the AI interview work?", a: "You answer 5 spoken questions on screen. Our AI scores each response on content, language, confidence, depth, and structure — no human reviewer, no accent bias." },
    { q: "What happens after I get my score?", a: "You get a breakdown by layer, a role readiness map, and a specific improvement plan to move up a band. The next step is always visible, never a verdict." },
    { q: "Why should my college choose JREE?", a: "Batch-level analytics and national benchmarking — not just individual scores. Placement teams get a department-wise view of readiness before recruiters arrive." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={SECTION} style={{ background: "var(--bg)" }}>
      <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,7vw,56px)", color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 1 }}>
          Questions.
        </h2>
        <p className="mt-3 mb-8 md:mb-10" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(18px,2.4vw,24px)", color: "var(--text-2)" }}>
          We've heard them all.
        </p>

        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b" style={{ borderColor: "rgba(109,86,164,0.12)" }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-left py-5 gap-5"
              >
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "clamp(15px,1.8vw,17px)", color: isOpen ? "var(--lime)" : "var(--text-1)", transition: "color 200ms", lineHeight: 1.35 }}>
                  {it.q}
                </span>
                <span
                  className="flex-shrink-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 20,
                    color: "var(--violet)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 200ms",
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? 400 : 0,
                  overflow: "hidden",
                  transition: "max-height 300ms ease-out",
                }}
              >
                <p className="pb-5 pr-6 md:pr-8" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>
                  {it.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============ 12. FINAL CTA ============ */
export function FinalCTA() {
  return (
    <section className={`relative overflow-hidden text-center ${SECTION}`} style={{ background: "var(--bg)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(109,86,164,0.18), transparent 60%)" }}
      />
      <div className="relative max-w-[1160px] mx-auto px-5 sm:px-8">
        <div
          className="select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "min(200px, 36vw)",
            color: "var(--lime)",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          }}
        >
          START.
        </div>

        <p className="mt-5 md:mt-6" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,2.2vw,20px)", color: "var(--text-2)" }}>
          90 minutes. One score. Every employer in India.
        </p>

        <div className="mt-7 md:mt-8 inline-block relative">
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: "2px solid var(--lime)" }}
            animate={{ scale: [1, 1.15], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <button
            onClick={() => { window.location.hash = "signup"; }}
            className="relative rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{
              height: 56,
              padding: "0 28px",
              background: "var(--lime)",
              color: "var(--on-lime)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 12px 40px rgba(201,220,83,0.35)",
              letterSpacing: "-0.01em",
            }}
          >
            Get my free JREE score →
          </button>
        </div>

        <p className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)" }}>
          Free for students. No app. No credit card. Score in 24 hours.
        </p>
      </div>
    </section>
  );
}

/* ============ 13. FOOTER ============ */
export function Footer() {
  const cols = [
    { title: "Students", links: ["Take Free Test", "Sample Exam", "Score Bands", "FAQ", "Certificate Preview"] },
    { title: "Institutions", links: ["For Colleges", "For Employers", "Bulk Registration", "API", "Request Demo"] },
    { title: "Company", links: ["About EduBridge", "Security Center", "Privacy Policy", "Terms and Conditions", "Help Center"] },
  ];
  return (
    <footer style={{ background: "#070509", borderTop: "1px solid rgba(109,86,164,0.12)" }} className="pt-14 md:pt-16 pb-8">
      <div className={CONTAINER}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <FooterLogo height={64} />
            <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)" }}>by EduBridge Pvt. Ltd.</div>
            <p className="mt-3 max-w-[240px]" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#5D5578", lineHeight: 1.5 }}>
              India's national standard for graduate readiness.
            </p>
            <div className="mt-5 flex gap-3">
              {["in", "𝕏", "Ig", "Wa"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="inline-flex items-center justify-center rounded-full transition-colors hover:text-[var(--text-1)]"
                  style={{
                    width: 32, height: 32,
                    border: "1px solid var(--violet-border)",
                    color: "#5D5578",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--violet)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(109,86,164,0.2)")}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--violet)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-[var(--text-1)]" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#5D5578" }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
            <span>© 2025 EduBridge Pvt. Ltd. All rights reserved.</span>
            <span>Made with conviction in India 🇮🇳</span>
          </div>
          <button
            onClick={() => { window.location.hash = "styleguide"; }}
            className="inline-flex items-center gap-2 rounded-full self-start sm:self-auto transition-all hover:border-[rgba(109,86,164,0.45)]"
            style={{ height: 32, padding: "0 14px", background: "transparent", border: "1px solid var(--hairline-strong)", color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.05em" }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--violet)", display: "inline-block" }} />
            STYLE GUIDE
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ============ LEARNER LIFECYCLE — THE CIRCUIT ============ */

function LearnerLifecycle() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  // Six nodes on a horizontal circuit. xPct positions them within the stage;
  // yOff is the slight Y-variation from center that makes the circuit feel organic.
  const nodes = [
    { id: "register",  n: "01", xPct: 6,  yOff: 0, chip: "REGISTER",   chipColor: "var(--violet)",    label: ["Create", "Profile"],     border: "rgba(109,86,164,0.30)" },
    { id: "exam",      n: "02", xPct: 32, yOff: 0, chip: "ASSESSMENT", chipColor: "var(--violet)",    label: ["Take the", "Assessment"], border: "rgba(109,86,164,0.30)" },
    { id: "score",     n: "03", xPct: 58, yOff: 0, chip: "SCORE",      chipColor: "var(--lime-text)", label: ["Your",     "Score"],      border: "rgba(201,220,83,0.30)" },
    { id: "next",      n: "04", xPct: 84, yOff: 0, chip: "NEXT STEP",  chipColor: "var(--amber)",     label: ["Your",     "Next Step"],  border: "rgba(217,119,6,0.32)"  },
  ] as const;

  return (
    <div ref={ref}>
      {/* ───────── HEADER (mobile/tablet only — desktop header lives inside pinned frame) ───────── */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end mb-10 md:mb-14 max-w-[1160px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--violet)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
            <span className="rounded-full" style={{ width: 5, height: 5, background: "var(--violet)" }} />
            The JREE Loop
          </div>
          <h2 className="mt-4" style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(44px, 7vw, 72px)", color: "var(--on-violet)",
            letterSpacing: "-0.04em", lineHeight: 0.95,
          }}>
            From blank page<br />
            to{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
              hired.
            </span>
          </h2>
        </div>
        <div className="md:col-span-5">
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 17, color: "var(--text-2)", lineHeight: 1.65 }}>
            Most assessment platforms end at the score. JREE begins there. Every score unlocks the next stage — training, re-testing, and finally, the right job.
          </p>
          <div className="mt-5" style={{ height: 1, background: "rgba(109,86,164,0.2)" }} />
          <div className="mt-3 flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)" }}>
            <motion.span
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >→</motion.span>
            Follow the circuit
          </div>
        </div>
      </div>

      {/* ───────── DESKTOP — SCROLL-JACKED HORIZONTAL CIRCUIT ───────── */}
      <ScrollCircuit nodes={nodes} inView={inView} />

      {/* ───────── MOBILE / TABLET STACK ───────── */}
      <div className="lg:hidden px-4 sm:px-8 md:px-12">
        <div className="relative max-w-[680px] mx-auto">
          <div
            className="absolute pointer-events-none"
            style={{ left: 23, top: 8, bottom: 8, width: 2, background: "linear-gradient(180deg, rgba(109,86,164,0.5), rgba(109,86,164,0.85))" }}
          />
          <div className="flex flex-col gap-8 md:gap-10">
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease }}
                className="relative flex items-start gap-4 md:gap-6"
              >
                <div className="shrink-0 flex flex-col items-center" style={{ width: 48 }}>
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 48, height: 48,
                      background: "var(--bg-2)",
                      border: `1.5px solid ${node.chipColor}`,
                      boxShadow: `0 0 22px ${node.chipColor === "var(--lime-text)" ? "rgba(201,220,83,0.3)" : node.chipColor === "var(--violet)" ? "rgba(109,86,164,0.3)" : node.chipColor === "var(--amber)" ? "rgba(217,119,6,0.3)" : "rgba(109,86,164,0.35)"}`,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: node.chipColor, letterSpacing: "0.02em" }}>{node.n}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <NodeCard node={node} inView={inView} delay={0.1 + i * 0.1 + 0.15} mobile />
                  <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: "var(--text-2)" }}>
                    {node.label[0]}{" "}
                    <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: node.id === "hired" ? "var(--violet)" : "var(--text-1)" }}>
                      {node.label[1]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

function ConnectorLabel({ x, y, text, color, emphasize }: { x: number; y: number; text: string; color: string; emphasize?: boolean }) {
  const padX = 6;
  const w = Math.max(56, text.length * 4.4 + padX * 2);
  return (
    <g>
      <rect x={x - w/2} y={y - 9} width={w} height={16} rx={8}
        fill="rgba(11,9,15,0.92)"
        stroke={emphasize ? "var(--lime-border)" : "rgba(109,86,164,0.18)"}
      />
      <text x={x} y={y + 2} textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, fill: color, letterSpacing: "0.04em" }}>
        {text}
      </text>
    </g>
  );
}

function NodeCard({ node, inView, delay, mobile, width, height }: { node: any; inView: boolean; delay: number; mobile?: boolean; width?: number; height?: number }) {
  const baseW = mobile ? "100%" : (width || 240);
  const baseH = mobile ? undefined : (height || 560);
  const minH = mobile ? 400 : undefined;

  const titleByNode: Record<string, { title: string; sub: string; meta: string; window: string; highlights: string[] }> = {
    register: {
      title: "Register",
      sub: "Create your free profile in under 2 minutes.",
      meta: "2 min",
      window: "jree.in/register",
      highlights: ["Name, email & college — that's it", "Verify with a one-time OTP", "No payment, no app download"],
    },
    exam: {
      title: "Take the assessment",
      sub: "Aptitude, communication, domain knowledge, workplace situations & a short AI video interview.",
      meta: "90 min",
      window: "jree.in/assessment",
      highlights: ["5 layers measured in one sitting", "Auto-saves every 30 seconds", "AI interview scored on substance, not accent"],
    },
    score: {
      title: "Get your JREE Score",
      sub: "Score out of 100, percentile rank & a breakdown across all 5 layers.",
      meta: "Instant",
      window: "jree.in/score",
      highlights: ["0–100 score with Band A–D", "Your exact national percentile", "Layer-by-layer strengths & weak spots"],
    },
    next: {
      title: "Know your next step",
      sub: "Your strongest role matches, skill gaps & exactly what to improve to move up a band.",
      meta: "5 layers",
      window: "jree.in/next-step",
      highlights: ["Roles ranked by your fit", "Pinpointed skill gaps to close", "A clear path to the next band"],
    },
  };
  const t = titleByNode[node.id];
  const softBg = node.chipColor === "var(--lime-text)" ? "var(--lime-soft)"
               : node.chipColor === "var(--amber)" ? "var(--amber-soft)"
               : "rgba(109,86,164,0.12)";

  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{
        width: baseW,
        height: baseH,
        minHeight: minH,
        borderRadius: 14,
        background: "var(--surface-1)",
        border: `1px solid ${node.border}`,
        boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}
    >
      {/* ── macOS window title bar ── */}
      <div
        className="relative flex items-center shrink-0"
        style={{
          height: mobile ? 40 : 48,
          padding: "0 16px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        {/* traffic lights */}
        <div className="flex items-center gap-2">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="rounded-full" style={{ width: 12, height: 12, background: c, boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.25)" }} />
          ))}
        </div>
        {/* centered window title */}
        <div
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-md"
          style={{ padding: "4px 12px", background: "rgba(0,0,0,0.18)", border: "1px solid var(--hairline)" }}
        >
          <span className="rounded-full" style={{ width: 5, height: 5, background: node.chipColor }} />
          <span className="truncate max-w-[140px] sm:max-w-none" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.04em" }}>
            {t.window}
          </span>
        </div>
      </div>

      {/* ── window body ── */}
      <span className="grain absolute inset-0 pointer-events-none" aria-hidden />
      <div className="relative flex flex-col" style={{ padding: mobile ? 16 : 26, ...(mobile ? {} : { flex: 1 }) }}>
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center rounded-full"
            style={{ padding: "5px 11px", background: softBg, border: `1px solid ${node.border}` }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: node.chipColor, letterSpacing: "0.07em" }}>
              {node.n} · {node.chip}
            </span>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.05em" }}>
            {t.meta}
          </span>
        </div>

        {/* Title block */}
        <div className="mt-4">
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: mobile ? 18 : 24, color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
            {t.title}
          </div>
          <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: mobile ? 12.5 : 14, color: "var(--text-2)", lineHeight: 1.5 }}>
            {t.sub}
          </div>
        </div>

        <div className="mt-4" style={{ height: 1, background: node.border, opacity: 0.7 }} />

        {/* Body — switches by node */}
        <div className="mt-4 flex flex-col" style={mobile ? {} : { flex: 1 }}>
          {node.id === "register" && <RegisterMini inView={inView} delay={delay} />}
          {node.id === "exam"     && <ExamMini inView={inView} delay={delay} />}
          {node.id === "score"    && <ScoreMini inView={inView} delay={delay} mobile={mobile} />}
          {node.id === "next" && (() => {
            const layers = [
              { k: "Cognitive", v: 79 },
              { k: "English",   v: 74 },
              { k: "Domain",    v: 68, gap: true },
              { k: "SJT",       v: 71 },
              { k: "Interview", v: 77 },
            ] as const;
            const lever = layers.find(l => l.gap)!;
            const others = layers.filter(l => !l.gap);
            const beforeAvg = Math.round(layers.reduce((a, b) => a + b.v, 0) / layers.length);
            const liftedDomain = Math.min(lever.v + 10, 100);
            const afterAvg = Math.round((liftedDomain + others.reduce((a, b) => a + b.v, 0)) / layers.length);
            const tA = 75;
            const baseD = delay + 0.3;
            const climbDelay = baseD + 0.7;
            const climbDur = 1.3;
            const flipDelay = climbDelay + climbDur * 0.78;

            const layerNote: Record<string, string> = {
              Cognitive:  "Above average — hold it",
              English:    "On track, no action needed",
              SJT:        "Solid judgment",
              Interview:  "Strong delivery",
            };

            return (
              <div className="flex flex-col gap-3">

                {/* ── Headline ── */}
                <motion.div initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: baseD - 0.15, ease }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: mobile ? 13 : 16, color: "var(--text-1)", letterSpacing: "-0.022em", lineHeight: 1.15 }}>
                    One gap is keeping you in Band B.
                  </div>
                  <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>
                    Lift <span style={{ color: "var(--lime)", fontWeight: 600 }}>Domain knowledge</span> — cross the line into Band A.
                  </div>
                </motion.div>

                {/* ── Band climb strip ── */}
                <motion.div initial={{ opacity: 0, y: 5 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.38, delay: baseD + 0.08, ease }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--violet)", letterSpacing: "0.06em" }}>● Band B · now</span>
                    <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: flipDelay + 0.1, duration: 0.3 }}
                      style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 10, color: "var(--lime)", letterSpacing: "0.06em" }}>▲ Band A</motion.span>
                  </div>
                  <div className="relative" style={{ height: 26 }}>
                    <div className="absolute inset-x-0 rounded-full" style={{ top: "50%", height: 5, background: "var(--surface-3)", transform: "translateY(-50%)" }} />
                    <motion.div className="absolute rounded-full" style={{ top: "50%", left: 0, height: 5, transform: "translateY(-50%)", background: "var(--violet)" }}
                      initial={{ width: `${beforeAvg}%` }} animate={inView ? { width: `${afterAvg}%` } : {}}
                      transition={{ delay: climbDelay, duration: climbDur, ease }} />
                    <div className="absolute" style={{ left: `${tA}%`, top: 3, bottom: 3, width: 1.5, background: "var(--lime)", transform: "translateX(-50%)", opacity: 0.8 }} />
                    <motion.div className="absolute rounded-full"
                      style={{ left: `${tA}%`, top: "50%", width: 18, height: 18, transform: "translate(-50%,-50%)", border: "1.5px solid var(--lime)" }}
                      initial={{ opacity: 0, scale: 0.4 }} animate={inView ? { opacity: [0, 0.75, 0], scale: [0.4, 2.1, 2.5] } : {}}
                      transition={{ delay: flipDelay - 0.05, duration: 0.65, ease: "easeOut" }} />
                    <motion.div className="absolute" style={{ top: "50%", transform: "translate(-50%,-50%)" }}
                      initial={{ left: `${beforeAvg}%` }} animate={inView ? { left: `${afterAvg}%` } : {}}
                      transition={{ delay: climbDelay, duration: climbDur, ease }}>
                      <div className="rounded-full inline-flex items-center justify-center px-2" style={{ height: 22, background: "var(--bg)", border: "1.5px solid var(--violet)", boxShadow: "0 0 12px rgba(109,86,164,0.55)" }}>
                        <span className="relative inline-block" style={{ minWidth: 20, height: 13 }}>
                          <motion.span className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 1, y: 0 }} animate={inView ? { opacity: 0, y: -5 } : {}} transition={{ delay: flipDelay, duration: 0.2 }}
                            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, color: "var(--text-1)" }}>{beforeAvg}</motion.span>
                          <motion.span className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, y: 5 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: flipDelay + 0.1, duration: 0.25 }}
                            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, color: "var(--lime)" }}>{afterAvg}</motion.span>
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <div style={{ height: 1, background: "var(--hairline)" }} />

                {/* ── Lever card ── */}
                <motion.div className="grain rounded-[12px]"
                  style={{ background: "rgba(109,86,164,0.09)", border: "1px solid rgba(109,86,164,0.4)", padding: "12px 14px" }}
                  initial={{ opacity: 0, y: 5 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.38, delay: baseD + 0.22, ease }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 9, color: "var(--violet)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Fix this first</span>
                      <div className="mt-0.5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: mobile ? 16 : 18, color: "var(--text-1)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                        Domain Knowledge
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.04em" }}>projected</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: "var(--lime)", letterSpacing: "-0.01em", lineHeight: 1 }}>+{liftedDomain - lever.v}</div>
                    </div>
                  </div>
                  <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>
                    You're below the employer threshold. A focused refresh — 3 modules, ~45 min — is all it takes.
                  </div>
                  <div className="rounded-full overflow-hidden relative mt-3" style={{ height: 4, background: "rgba(109,86,164,0.15)" }}>
                    <motion.div className="absolute inset-y-0 left-0 rounded-r-full"
                      initial={{ width: 0 }} animate={inView ? { width: `${lever.v}%` } : {}}
                      transition={{ duration: 0.6, delay: baseD + 0.3, ease }} style={{ background: "var(--violet)", opacity: 0.45 }} />
                    <motion.div className="absolute inset-y-0 left-0 rounded-r-full"
                      initial={{ width: `${lever.v}%` }} animate={inView ? { width: `${liftedDomain}%` } : {}}
                      transition={{ duration: 0.9, delay: climbDelay, ease }} style={{ background: "var(--lime)", boxShadow: "0 0 8px rgba(201,220,83,0.4)" }} />
                  </div>
                </motion.div>

                {/* ── Other layers ── */}
                <div className="flex flex-col">
                  {others.map((o, i) => (
                    <motion.div key={o.k} className="flex items-center justify-between py-1.5"
                      style={{ borderTop: "1px solid var(--hairline)" }}
                      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: baseD + 0.38 + i * 0.06, duration: 0.3 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12.5, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{o.k}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "var(--text-3)", fontStyle: "italic" }}>{layerNote[o.k]}</span>
                    </motion.div>
                  ))}
                </div>

              </div>
            );
          })()}
        </div>

        {/* Highlights — richer detail for the larger window (suppressed for the dedicated Improve screen) */}
        {!mobile && node.id !== "next" && (
          <div className="mt-5 flex flex-col gap-2.5">
            {t.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: delay + 0.4 + i * 0.1, ease }}
                className="flex items-center gap-2.5"
              >
                <span
                  className="shrink-0 flex items-center justify-center rounded-full"
                  style={{ width: 18, height: 18, background: softBg, border: `1px solid ${node.border}` }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, color: node.chipColor }}>✓</span>
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.35 }}>{h}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ MINI WIDGETS INSIDE NODES ============ */

function RegisterMini({ inView, delay }: { inView: boolean; delay: number }) {
  const fields = [
    { label: "Full name", value: "Priya Sharma" },
    { label: "Email",     value: "priya@college.edu" },
    { label: "College",   value: "VIT, Vellore" },
  ];
  return (
    <>
      <div className="rounded-xl flex-1 flex flex-col gap-2.5" style={{ background: "var(--surface-2)", padding: 12 }}>
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: delay + i * 0.12, ease }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.04em" }}>{f.label.toUpperCase()}</div>
            <div className="mt-1 rounded-md flex items-center" style={{ padding: "7px 9px", background: "transparent", border: "1px solid rgba(109,86,164,0.18)" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-1)" }}>{f.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--text-2)" }}>
        <span>No payment</span>
        <span style={{ color: "var(--violet)" }}>·</span>
        <span style={{ color: "var(--lime-text)" }}>No app</span>
      </div>
    </>
  );
}

function ExamMini({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <>
      <div className="rounded-xl flex-1 flex flex-col" style={{ background: "var(--surface-2)", padding: 12 }}>
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.04em" }}>Q4 / 80</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)" }}>Layer 1</span>
        </div>
        <div className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-1)", lineHeight: 1.35 }}>
          Your manager needs a deck by 9 AM. You'd…
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          {[
            { txt: "Stay up and finish it",  sel: false },
            { txt: "Draft now, polish at 7", sel: true  },
            { txt: "Ask to push the meeting", sel: false },
          ].map((o, i) => (
            <div key={i} className="rounded-md flex items-center gap-2" style={{
              padding: "6px 8px",
              background: o.sel ? "rgba(109,86,164,0.18)" : "transparent",
              border: `1px solid ${o.sel ? "var(--violet)" : "rgba(109,86,164,0.12)"}`,
            }}>
              <span className="rounded-full" style={{ width: 8, height: 8, background: o.sel ? "var(--violet)" : "transparent", border: `1px solid ${o.sel ? "var(--violet)" : "var(--text-3)"}` }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: o.sel ? "var(--text-1)" : "var(--text-2)" }}>{o.txt}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-1">
        {[0,1,2,3,4].map(i => (
          <div key={i} className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "rgba(109,86,164,0.14)" }}>
            {i === 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: "62%" } : {}}
                transition={{ duration: 0.9, delay, ease }}
                style={{ height: "100%", background: "var(--violet)" }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function ScoreMini({ inView, delay, mobile }: { inView: boolean; delay: number; mobile?: boolean }) {
  const [n, setN] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      let v = 0;
      const id = setInterval(() => {
        v += 2;
        if (v >= 73) { v = 73; clearInterval(id); setCelebrate(true); }
        setN(v);
      }, 30);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, delay]);

  // ring — fixed compact size so content always fits the card
  const SZ = 80, CX = 40, R = 32;
  const C = 2 * Math.PI * R;
  const filled = C * (n / 100);
  const rays = Array.from({ length: 10 }, (_, i) => i);
  const rayColors = ["#C9DC53", "#6D56A4", "#51C1B5", "#C9DC53"];

  const board = [
    { rank: 2, name: "Aarav M.", score: 81, you: false },
    { rank: 3, name: "Diya K.", score: 76, you: false },
    { rank: 4, name: "You",     score: 73, you: true  },
    { rank: 5, name: "Rohan S.", score: 71, you: false },
  ];

  return (
    <div className="flex-1 flex flex-col items-center min-w-0 w-full overflow-hidden" style={{ gap: 8 }}>

      {/* ring */}
      <div className="relative flex-shrink-0">
        {rays.map((i) => {
          const angle = (i / rays.length) * Math.PI * 2;
          return (
            <motion.span key={i} className="absolute rounded-full pointer-events-none"
              style={{ left: "50%", top: "50%", width: 4, height: 4, background: rayColors[i % rayColors.length] }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={celebrate ? { x: Math.cos(angle) * 48, y: Math.sin(angle) * 48, opacity: [0, 1, 0], scale: [0, 1.2, 0.4] } : {}}
              transition={{ duration: 0.8, delay: 0.04 * i, ease: "easeOut" }}
            />
          );
        })}
        <motion.svg width={SZ} height={SZ} viewBox={`0 0 ${SZ} ${SZ}`}
          animate={celebrate ? { scale: [1, 1.07, 1] } : {}} transition={{ duration: 0.45 }}>
          <defs>
            <linearGradient id="lc-score-arc2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6D56A4" />
              <stop offset="100%" stopColor="#C9DC53" />
            </linearGradient>
          </defs>
          <circle cx={CX} cy={CX} r={R} fill="none" stroke="rgba(109,86,164,0.12)" strokeWidth={7} />
          <circle cx={CX} cy={CX} r={R} fill="none" stroke="url(#lc-score-arc2)" strokeWidth={7}
            strokeDasharray={`${filled} ${C}`} strokeDashoffset={C * 0.25} strokeLinecap="round"
            transform={`rotate(-90 ${CX} ${CX})`} />
          <text x={CX} y={CX + 7} textAnchor="middle"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 22, fill: "var(--text-1)" }}>{n}</text>
          <text x={CX} y={CX + 19} textAnchor="middle"
            style={{ fontFamily: "var(--font-mono)", fontSize: 9, fill: "var(--text-3)", letterSpacing: "0.03em" }}>/ 100</text>
        </motion.svg>
      </div>

      {/* band + percentile */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="inline-flex items-center rounded-full" style={{ padding: "3px 9px", background: "var(--violet-soft)", border: "1px solid var(--violet-border)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, color: "var(--text-1)", letterSpacing: "0.03em" }}>BAND B</span>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11, color: "var(--lime-text)" }}>
          77<span style={{ fontSize: 9 }}>th</span> %ile
        </span>
      </div>

      {/* celebrate banner */}
      <motion.div className="inline-flex items-center gap-1 rounded-full flex-shrink-0"
        style={{ padding: "3px 10px", background: "var(--lime-soft)", border: "1px solid var(--lime-border)" }}
        initial={{ opacity: 0, y: 5, scale: 0.9 }}
        animate={celebrate ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.35 }}>
        <motion.span style={{ fontSize: 11 }}
          animate={celebrate ? { rotate: [0, -16, 12, 0] } : {}} transition={{ duration: 0.5, delay: 0.1 }}>🎉</motion.span>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 10, color: "var(--lime-text)", letterSpacing: "0.02em" }}>
          Beat 3,711 students!
        </span>
      </motion.div>

      {/* leaderboard */}
      <div className="w-full rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--surface-2)", border: "1px solid rgba(109,86,164,0.16)" }}>
        <div className="flex items-center justify-between" style={{ padding: "5px 10px", borderBottom: "1px solid rgba(109,86,164,0.14)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em" }}>LEADERBOARD</span>
          <span className="inline-flex items-center gap-1" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--lime-text)" }}>
            <motion.span animate={celebrate ? { y: [2, -2, 2] } : {}} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>↑</motion.span>
            climbing
          </span>
        </div>
        <div className="flex flex-col">
          {board.map((row, i) => (
            <motion.div key={row.rank} className="flex items-center gap-2"
              style={{ padding: "4px 10px", background: row.you ? "rgba(201,220,83,0.10)" : "transparent" }}
              initial={{ opacity: 0, x: row.you ? 10 : -6 }}
              animate={celebrate ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.07, ease }}>
              <span className="shrink-0 flex items-center justify-center rounded"
                style={{ width: 16, height: 16, background: row.you ? "var(--lime)" : "rgba(109,86,164,0.14)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 10, color: row.you ? "var(--on-lime)" : "var(--text-2)" }}>
                {row.rank}
              </span>
              <span className="flex-1 min-w-0 truncate" style={{ fontFamily: "var(--font-body)", fontWeight: row.you ? 700 : 500, fontSize: 12, color: row.you ? "var(--text-1)" : "var(--text-2)" }}>
                {row.name}
                {row.you && <span className="ml-1" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--lime-text)" }}>+4 ▲</span>}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11, color: row.you ? "var(--lime-text)" : "var(--text-3)" }}>
                {row.score}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 11, color: "var(--text-3)" }}>
        Top 23% of 4,820 students
      </div>
    </div>
  );
}

function GapMini({ inView, delay }: { inView: boolean; delay: number }) {
  const rows = [
    { k: "Cognitive", v: 79, c: "var(--violet)" },
    { k: "English",   v: 74, c: "var(--violet)" },
    { k: "Domain",    v: 68, c: "var(--amber)", gap: true },
    { k: "SJT",       v: 71, c: "var(--violet)" },
    { k: "Interview", v: 77, c: "var(--violet)" },
  ];
  return (
    <>
      <div className="flex-1 flex flex-col gap-3">
        {rows.map((r, i) => {
          const nextStep: Record<string, { title: string; cta: string }> = {
            Aptitude: { title: "Quantitative reasoning · DI sprints", cta: "Start 14-day drill →" },
            Communication: { title: "Business writing · spoken clarity", cta: "Begin module →" },
            "Domain knowledge": { title: "Role-specific fundamentals refresh", cta: "Pick your role →" },
            Domain: { title: "Role-specific fundamentals refresh", cta: "Pick your role →" },
            "Workplace behaviour": { title: "Workplace scenarios · async etiquette", cta: "Open module →" },
            Behaviour: { title: "Workplace scenarios · async etiquette", cta: "Open module →" },
            "Role-fit": { title: "Polish your strongest role profile", cta: "Continue →" },
          };
          const step = nextStep[r.k] ?? { title: "Targeted practice on this layer", cta: "Open module →" };

          return (
            <div key={r.k} className="grid grid-cols-12 items-center gap-3">
              {/* Left: label + shortened bar */}
              <div className="col-span-5">
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: r.gap ? 600 : 500, fontSize: 12, color: r.gap ? "var(--amber)" : "var(--text-2)" }}>
                    {r.k}
                    {r.gap && <span className="ml-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber)", letterSpacing: "0.07em" }}>· GAP</span>}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: r.gap ? "var(--amber)" : "var(--text-1)" }}>{r.v}</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: r.gap ? 6 : 4, background: "rgba(109,86,164,0.1)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${r.v}%` } : {}}
                    transition={{ duration: 0.7, delay: delay + (r.gap ? 0.15 : 0) + i * 0.05, ease }}
                    style={{ height: "100%", background: r.c, boxShadow: r.gap ? "0 0 12px rgba(217,119,6,0.5)" : undefined }}
                  />
                </div>
              </div>

              {/* Right: next-step module */}
              <div className="col-span-7 pl-4" style={{ borderLeft: "1px solid var(--hairline)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: r.gap ? "var(--amber)" : "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {r.gap ? "Next step · priority" : "Next step"}
                </div>
                <div className="mt-0.5" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 12, color: "var(--text-1)", lineHeight: 1.35 }}>
                  {step.title}
                </div>
                <div className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: r.gap ? "var(--amber)" : "var(--violet)", letterSpacing: "0.04em" }}>
                  {step.cta}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--amber)" }}>
        Domain is your lever.
      </div>
    </>
  );
}

function TrainMini() {
  const cards = [
    { title: "Domain Drill",       meta: "15 min · +3 pts",  locked: false },
    { title: "Systems Concepts",   meta: "20 min",           locked: true  },
    { title: "Domain Mock Test",   meta: "Locked",           locked: true  },
  ];
  return (
    <>
      <div className="flex-1 flex flex-col gap-2">
        {cards.map((c, i) => (
          <div
            key={c.title}
            className="rounded-xl flex items-center gap-2.5"
            style={{
              padding: "10px 12px",
              background: c.locked ? "transparent" : "var(--violet-soft)",
              border: `1px solid ${c.locked ? "rgba(109,86,164,0.12)" : "var(--violet)"}`,
              opacity: c.locked ? 0.55 : 1,
            }}
          >
            {c.locked ? (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>◌</span>
            ) : (
              <div className="rounded-full flex items-center justify-center" style={{ width: 18, height: 18, background: "var(--violet)" }}>
                <span style={{ fontSize: 12, color: "var(--on-lime)" }}>▶</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 12.5, color: "var(--on-violet)" }}>{c.title}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: c.locked ? "var(--text-3)" : "var(--lime-text)", letterSpacing: "0.04em" }}>{c.meta}</div>
            </div>
            {!c.locked && <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, color: "var(--violet)" }}>→</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--text-2)" }}>
        <span>≈45 min</span>
        <span style={{ color: "var(--violet)" }}>·</span>
        <span style={{ color: "var(--lime-text)" }}>+7 pts est.</span>
      </div>
    </>
  );
}

function RetestMini({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-end justify-center gap-3">
          <RetestRing value={73} muted />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--lime)", paddingBottom: 18 }}>→</span>
          <RetestRing value={82} inView={inView} delay={delay} glow />
        </div>
        <div className="mt-3 text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text-1)" }}>
          Band B →{" "}
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)", fontSize: 18 }}>Band A</span>
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full" style={{ padding: "3px 9px", background: "var(--lime-soft)", border: "1px solid var(--lime-border)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: "var(--lime-text)" }}>+9 points</span>
        </div>
      </div>
      <div className="mt-3 text-center" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--text-3)" }}>
        80% improve within 60 days.
      </div>
    </>
  );
}

function RetestRing({ value, muted, glow, inView, delay }: { value: number; muted?: boolean; glow?: boolean; inView?: boolean; delay?: number }) {
  const [n, setN] = useState(muted ? value : 73);
  useEffect(() => {
    if (muted || !inView) return;
    const t = setTimeout(() => {
      let v = 73;
      const id = setInterval(() => { v += 1; if (v >= value) { v = value; clearInterval(id); } setN(v); }, 40);
    }, (delay ?? 0) * 1000 + 400);
    return () => clearTimeout(t);
  }, [inView, delay, muted, value]);
  const r = 28, c = 2 * Math.PI * r;
  const target = c * (muted ? value : n) / 100;
  return (
    <div className="flex flex-col items-center">
      <svg width={72} height={72} style={{ filter: glow ? "drop-shadow(0 0 10px rgba(201,220,83,0.45))" : undefined }}>
        <circle cx={36} cy={36} r={r} fill="none" stroke="rgba(109,86,164,0.12)" strokeWidth={6} />
        <motion.circle
          cx={36} cy={36} r={r} fill="none"
          stroke={muted ? "var(--violet)" : "var(--lime)"} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={`${target} ${c}`} strokeDashoffset={c * 0.25}
          transform="rotate(-90 36 36)"
        />
        <text x={36} y={41} textAnchor="middle" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 17, fill: muted ? "var(--text-2)" : "var(--lime)" }}>{n}</text>
      </svg>
      <div className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: muted ? "var(--text-3)" : "var(--lime-text)", letterSpacing: "0.03em" }}>
        Attempt {muted ? 1 : 2}
      </div>
    </div>
  );
}

function HiredMini({ inView, delay }: { inView: boolean; delay: number }) {
  const rows = [
    { i: "ZS", c: "linear-gradient(135deg,#6D56A4,#C9DC53)", co: "ZS Associates", role: "HR Associate",  status: "Contacted →",  scolor: "var(--violet)" },
    { i: "MT", c: "linear-gradient(135deg,#6D56A4,#6D56A4)", co: "Maersk Tech",   role: "People Ops",    status: "Shortlisted →", scolor: "var(--violet)" },
    { i: "RZ", c: "linear-gradient(135deg,#6D56A4,#C9DC53)", co: "Razorpay",      role: "HR Intern",     status: "Interview →",   scolor: "var(--lime-text)" },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.co}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.2 + i * 0.12, ease }}
            className="flex items-center gap-2 rounded-lg"
            style={{ padding: "6px 8px", background: "rgba(109,86,164,0.06)", border: "1px solid rgba(109,86,164,0.16)" }}
          >
            <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 22, height: 22, background: r.c, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "#0B090F" }}>
              {r.i}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 12, color: "var(--text-1)" }}>{r.co}</div>
              <div className="truncate" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>{r.role}</div>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: r.scolor, letterSpacing: "0.04em" }}>{r.status}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto pt-2.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center rounded-full" style={{ padding: "2px 8px", background: "rgba(109,86,164,0.14)", border: "1px solid rgba(109,86,164,0.32)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--violet)", letterSpacing: "0.02em" }}>BAND A · UNLOCKED</span>
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--text-2)", lineHeight: 1.35 }}>
          You're in the top employer pool.
        </div>
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.9, ease }}
          onClick={() => { window.location.hash = "signup"; }}
          className="mt-2 w-full rounded-full"
          style={{
            height: 30, background: "var(--lime)", color: "var(--on-lime)",
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12,
            border: "none", letterSpacing: "-0.01em",
          }}
        >
          Start your loop →
        </motion.button>
      </div>
    </div>
  );
}

/* ============ SCROLL-JACKED HORIZONTAL CIRCUIT ============ */
function ScrollCircuit({ nodes, inView }: { nodes: any[]; inView: boolean }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState<string>("100vh");
  const [maxX, setMaxX] = useState(0);
  const [active, setActive] = useState(0);
  const [cardW, setCardW] = useState(240);
  const [cardH, setCardH] = useState(560);

  const GAP = 48;     // gap between cards (px)
  const LEFT_PAD = 56;

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;
      const visible = vp.clientWidth;
      // One card fills the viewport with ~15% of the next card peeking in:
      //   cardW + GAP + 0.15*cardW = visible  →  cardW = (visible - GAP) / 1.15
      const w = Math.max(280, Math.round((visible - GAP) / 1.15));
      const h = Math.max(440, Math.min(680, Math.round(window.innerHeight * 0.78)));
      setCardW(w);
      setCardH(h);
      const trackW = track.scrollWidth;
      const mx = Math.max(0, trackW - visible);
      setMaxX(mx);
      setContainerH(`calc(100vh + ${Math.round(mx * 1.3 + 200)}px)`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Motion's useScroll gives us a buttery scrollYProgress motion value
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the progress with a spring so the track glides instead of jumping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    mass: 0.3,
  });

  // Map smoothed 0..1 progress to -maxX..0 translation
  const x = useTransform(smoothProgress, (v) => -maxX * v);

  // Update active step from the smoothed progress (no per-frame React re-render)
  useEffect(() => {
    const unsub = smoothProgress.on("change", (v: number) => {
      const next = Math.min(nodes.length - 1, Math.max(0, Math.round(v * (nodes.length - 1))));
      setActive((cur) => (cur === next ? cur : next));
    });
    return () => unsub();
  }, [smoothProgress, nodes.length]);

  const safeActive = nodes[active] || nodes[0];
  const ASIDE_W = 360;

  return (
    <div ref={outerRef} className="hidden lg:block relative" style={{ height: containerH }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex"
        style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)" }}
      >
        {/* Left aside — title + live step counter */}
        <aside
          className="shrink-0 h-full flex flex-col justify-center relative"
          style={{ width: ASIDE_W, padding: "0 40px 0 56px", borderRight: "1px solid var(--hairline)" }}
        >
          <div className="inline-flex items-center gap-2" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--violet)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
            <span className="rounded-full" style={{ width: 5, height: 5, background: "var(--violet)" }} />
            The JREE Loop
          </div>
          <h2 className="mt-4" style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(36px, 4.6vw, 56px)", color: "var(--on-violet)",
            letterSpacing: "-0.04em", lineHeight: 0.95,
          }}>
            From blank page<br />
            to{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime)" }}>
              hired.
            </span>
          </h2>
          <p className="mt-5" style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.6 }}>
            Most assessment platforms end at the score. JREE begins there — every score unlocks training, re-testing, and the right job.
          </p>

          {/* live step indicator */}
          <div className="mt-8" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
            <div className="flex items-baseline gap-3">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 32, color: safeActive.chipColor, letterSpacing: "0.04em", lineHeight: 1 }}
              >
                {safeActive.n}
              </motion.span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.2em" }}>
                / 04
              </span>
            </div>
            <motion.div
              key={`label-${active}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.01em" }}
            >
              {safeActive.label[0]}{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: safeActive.id === "hired" ? "var(--violet)" : "var(--text-1)" }}>
                {safeActive.label[1]}
              </span>
            </motion.div>

            {/* progress */}
            <div className="mt-5 rounded-full overflow-hidden" style={{ height: 2, background: "var(--hairline-strong)" }}>
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "0% 50%", height: "100%", background: "var(--violet)" }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.03em" }}>
              <span>SCROLL ↓</span>
              <span>01 → 04</span>
            </div>
          </div>
        </aside>

        {/* Right — scrolling track */}
        <div ref={viewportRef} className="flex-1 relative overflow-hidden flex items-center">
          <motion.div
            ref={trackRef}
            className="flex items-center relative"
            style={{
              gap: GAP,
              padding: `0 96px 0 ${LEFT_PAD}px`,
              x,
              willChange: "transform",
            }}
          >
            {/* Rail line behind cards */}

            {nodes.map((node: any, i: number) => {
              const activate = 0.15 + i * 0.1;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: activate, ease }}
                  className="shrink-0 relative"
                  style={{ width: cardW, zIndex: 1 }}
                >
                  <NodeCard node={node} inView={inView} delay={activate + 0.1} width={cardW} height={cardH} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: 64, background: "linear-gradient(90deg, var(--bg), transparent)" }} />
          <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: 96, background: "linear-gradient(270deg, var(--bg-2), transparent)" }} />
        </div>
      </div>
    </div>
  );
}
