import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";
import JreeWatermarkWhite from "../../imports/JreeWatermarkWhite1-1/index";
import GroupLogo from "../../imports/Group/index";

const ease = [0.16, 1, 0.3, 1] as const;

function GraduateDots() {
  const [dots] = useState(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      const px = Math.pow(Math.random(), 0.6) * 100; // bias towards 100% (right)
      const py = Math.pow(Math.random(), 0.6) * 100; // bias towards 100% (bottom)
      const size = 2 + Math.random() * 2;
      const opacity = 0.06 + Math.random() * 0.04;
      const animate = i < 5;
      arr.push({
        id: i,
        x: px,
        y: py,
        size,
        opacity,
        animate,
        dx: Math.random() * 20 - 10,
        dy: Math.random() * 20 - 10
      });
    }
    return arr;
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        maskImage: "radial-gradient(circle at 75% 65%, black 10%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(circle at 75% 65%, black 10%, transparent 90%)",
      }}
      aria-hidden
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            background: "var(--violet)",
            opacity: dot.opacity,
          }}
          {...(dot.animate
            ? {
                animate: {
                  x: [0, dot.dx, 0],
                  y: [0, dot.dy, 0],
                },
                transition: {
                  duration: 30 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
            : {})}
        />
      ))}

      {/* Hero Dot - fully saturated violet, soft ring pulse once on load */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "68%",
          top: "62%",
          width: 4,
          height: 4,
        }}
      >
        <span
          className="absolute rounded-full"
          style={{ width: 4, height: 4, background: "var(--violet)" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 4, height: 4, border: "1px solid var(--violet)" }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.8 }}
        />
      </div>
    </div>
  );
}

export function Hero() {
  const goSignup = () => { window.location.hash = "signup"; };

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Quiet window-light: intentionally restrained so the copy and score card remain dominant. */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[68%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 94% at 94% 4%, rgba(255,255,255,0.76) 0%, rgba(255,255,255,0.34) 48%, rgba(255,255,255,0.08) 72%, transparent 88%)",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-[17%] -right-[9%] h-[104%] w-[86%] pointer-events-none"
        initial={{ x: 0, y: 0 }}
        animate={{ x: 10, y: 8 }}
        transition={{ duration: 60, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        style={{
          opacity: 0.62,
          background: "linear-gradient(137deg, transparent 27%, rgba(255,255,255,0.72) 40%, rgba(255,255,255,0.26) 50%, transparent 60%)",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-[2%] -right-[12%] h-[94%] w-[82%] pointer-events-none"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -8, y: 10 }}
        transition={{ duration: 60, delay: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        style={{
          opacity: 0.38,
          background: "linear-gradient(137deg, transparent 45%, rgba(255,255,255,0.62) 54%, rgba(255,255,255,0.12) 61%, transparent 69%)",
        }}
      />


      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[72px] pt-24 sm:pt-32 md:pt-[140px] pb-28 md:pb-32 min-h-screen flex flex-col justify-center">
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-10 xl:gap-16 items-center w-full">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-visible" aria-hidden>
            <GraduateDots />
          </div>
          
          {/* LEFT: copy */}
          <div className="max-w-[780px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="inline-flex items-center gap-2 mb-8 md:mb-10"
              style={{
                padding: "5px 12px",
                borderRadius: 100,
                border: "1px solid var(--lime-border)",
                background: "var(--lime-soft)",
              }}
            >
              <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: "var(--lime)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--lime-text)" }}>
                India's first AI-powered job readiness assessment
              </span>
            </motion.div>

            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(40px, 9vw, 88px)", color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 1.0 }}>
              <Reveal delay={0.2}>
                Know Your Job{" "}
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--violet)" }}>
                  Readiness.
                </span>
              </Reveal>
              <Reveal delay={0.35}>Before the Interview.</Reveal>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 md:mt-7 max-w-[520px]"
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.7vw,17px)", color: "var(--text-2)", lineHeight: 1.65 }}
            >
              Get your JREE Score, National Rank, Role Readiness Report, Skill Gap Analysis, and AI Interview Feedback — all in one assessment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={goSignup}
                className="rounded-full transition-all hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto cursor-pointer"
                style={{
                  height: 52,
                  padding: "0 24px",
                  background: "var(--violet)",
                  color: "var(--on-violet)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  boxShadow: "var(--shadow-card)",
                  letterSpacing: "-0.01em",
                }}
              >
                Take Free Assessment →
              </button>
              <button
                className="rounded-full transition-colors w-full sm:w-auto cursor-pointer"
                style={{
                  height: 52,
                  padding: "0 22px",
                  background: "transparent",
                  border: "1px solid var(--hero-secondary-btn-border)",
                  color: "var(--text-2)",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--hero-secondary-btn-hover)")}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--hero-secondary-btn-border)")}
              >
                Request Demo
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.05 }}
              className="mt-4"
              style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.01em" }}
            >
              Free for students.{" "}
              <span style={{ color: "var(--violet)" }}>·</span>
              {" "}Trusted by colleges.{" "}
              <span style={{ color: "var(--violet)" }}>·</span>
              {" "}Used by employers.
            </motion.p>
          </div>

          {/* RIGHT: score card */}
          <div className="relative hidden lg:flex items-center justify-center" style={{ perspective: 1600 }}>
            <ScoreCardHero />
          </div>
        </div>
      </div>

      {/* Bottom live ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{
          height: 48,
          background: "var(--hero-ticker-bg)",
          borderTop: "1px solid var(--hero-ticker-border)",
        }}
      >
        <div className="flex items-center h-full whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-6 md:gap-8 px-6 md:px-8" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: "var(--lime)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.05em" }}>LIVE</span>
              </span>
              <span><span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>12,400</span> scores this month</span>
              <span style={{ color: "var(--violet)" }}>·</span>
              <span><span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>91st</span> percentile avg Band A</span>
              <span style={{ color: "var(--violet)" }}>·</span>
              <span><span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>240+</span> colleges onboarded</span>
              <span style={{ color: "var(--violet)" }}>·</span>
              <span>Priya has asked <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>62,000</span> questions</span>
              <span style={{ color: "var(--violet)" }}>·</span>
              <span>Last score: Ananya M. · Band B · <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)" }}>74</span> · 3 mins ago</span>
              <span style={{ color: "var(--violet)" }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/* ============================================================== */
/* The Score Card — the actual product, made visible in the hero  */
/* ============================================================== */
function ScoreCardHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const target = 78;
    const animate = (t: number) => {
      const p = Math.min((t - startTime) / 1400, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setScore(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView]);

  const layers = [
    { label: "Aptitude", value: 82 },
    { label: "English", value: 76 },
    { label: "Domain", value: 81 },
    { label: "Sit. Judgement", value: 72 },
    { label: "AI Interview", value: 79 },
  ];

  return (
    <div ref={ref} className="relative" style={{ width: "100%", maxWidth: 420 }}>
      {/* Stacked ghost card behind */}
      <motion.div
        initial={{ opacity: 0, rotateZ: 0, y: 20 }}
        animate={{ opacity: 0.5, rotateZ: 6, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease }}
        className="absolute"
        style={{
          inset: 0,
          background: "var(--surface-2)",
          border: "1px solid var(--hero-ticker-border)",
          borderRadius: 22,
          transformOrigin: "center center",
          transform: "rotate(6deg) translate(18px, 14px)",
        }}
      />

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotateZ: 0 }}
        animate={{ opacity: 1, y: 0, rotateZ: -3 }}
        transition={{ duration: 0.9, delay: 0.5, ease }}
        className="relative overflow-hidden"
        style={{
          background: "var(--hero-card-bg)",
          border: "1px solid var(--hero-card-border)",
          borderRadius: 22,
          padding: "24px 26px 22px",
          boxShadow: "var(--hero-card-shadow)",
        }}
      >
        {/* gradient corner accent */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            right: 0,
            width: 220,
            height: 220,
            background: "radial-gradient(circle at top right, var(--lime-soft), transparent 60%)",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <div className="flex items-start">
              <div style={{ position: "relative", width: 56, height: 17, flexShrink: 0 }}><GroupLogo /></div>
              <span className="inline-block rounded-full ml-0.5 mt-0.5" style={{ width: 4, height: 4, background: "var(--lime)" }} />
            </div>
            <span className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
              OFFICIAL SCORE CARD
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1.5"
            style={{
              padding: "4px 10px",
              borderRadius: 100,
              border: "1px solid var(--teal-border)",
              background: "var(--teal-soft)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--teal-text)",
              letterSpacing: "0.04em",
            }}
          >
            <motion.span
              className="block rounded-full"
              style={{ width: 5, height: 5, background: "var(--teal)" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            VERIFIED
          </span>
        </div>

        {/* Candidate */}
        <div className="relative mt-5">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--violet)", letterSpacing: "0.03em" }}>CANDIDATE</span>
          <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-1)", letterSpacing: "-0.02em" }}>
            Ananya Sharma
          </div>
          <div className="mt-0.5" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>
            B.Tech CSE · VIT Pune · 2025
          </div>
        </div>

        {/* SCORE — the hero number, now in context */}
        <div className="relative mt-6 flex items-end gap-3">
          <div className="flex items-baseline">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 132,
                color: "var(--text-1)",
                letterSpacing: "-0.06em",
                lineHeight: 0.85,
              }}
            >
              {score}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--text-2)", marginLeft: 4 }}>
              /100
            </span>
          </div>
          <div className="flex-1 pb-3">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.4, ease }}
              className="inline-flex items-center gap-1.5"
              style={{
                padding: "5px 11px",
                borderRadius: 100,
                background: "var(--violet)",
                color: "var(--on-violet)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "-0.01em",
                boxShadow: "var(--shadow-card)",
              }}
            >
              BAND A
            </motion.span>
            <div className="mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", letterSpacing: "0.02em" }}>
              91<span style={{ opacity: 0.7 }}>ST</span> PERCENTILE
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", letterSpacing: "0.02em" }}>
              ALL INDIA
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-5 h-px" style={{ background: "linear-gradient(to right, transparent, var(--violet-border), transparent)" }} />

        {/* Layer breakdown */}
        <div className="mt-5 space-y-2.5">
          {layers.map((l, i) => (
            <div key={l.label} className="flex items-center gap-3">
              <span className="w-[110px]" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-2)" }}>
                {l.label}
              </span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--hairline)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${l.value}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.9 + i * 0.1, ease }}
                  className="h-full rounded-full"
                  style={{
                    background: l.value >= 80
                      ? "linear-gradient(to right, var(--violet), var(--lime))"
                      : "linear-gradient(to right, var(--violet), #A78BFA)",
                  }}
                />
              </div>
              <span className="w-7 text-right" style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 12, color: "var(--text-1)" }}>
                {l.value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer with QR */}
        <div className="mt-5 pt-4 flex items-end justify-between gap-3" style={{ borderTop: "1px dashed var(--hero-ticker-border)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)", letterSpacing: "0.07em" }}>
              ID
            </div>
            <div className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)" }}>
              JR-25-K9X8M2
            </div>
            <div className="mt-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-3)" }}>
              Issued 18 MAY 2026 · Valid 2 yrs
            </div>
          </div>
          {/* Mini QR */}
          <div
            className="grid grid-cols-7 gap-px p-1.5 rounded-md flex-shrink-0"
            style={{ background: "var(--text-1)", width: 56, height: 56 }}
            aria-hidden
          >
            {Array.from({ length: 49 }).map((_, i) => {
              // Pseudo-random pattern, deterministic
              const on = (i * 17 + 7) % 3 !== 0;
              const corner = i === 0 || i === 6 || i === 42;
              return (
                <span
                  key={i}
                  className="block"
                  style={{
                    background: corner ? "var(--bg)" : on ? "var(--bg)" : "transparent",
                    borderRadius: corner ? 2 : 0,
                  }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Floating "shareable" pill — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ delay: 1.4, duration: 0.6, ease }}
        className="absolute"
        style={{
          left: -22,
          bottom: 40,
          padding: "8px 14px 8px 10px",
          borderRadius: 100,
          background: "var(--surface-1)",
          border: "1px solid var(--hero-card-border)",
          boxShadow: "var(--shadow-elevated)",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          className="inline-flex items-center justify-center rounded-full"
          style={{ width: 22, height: 22, background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12 }}
        >
          ↗
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-2)", letterSpacing: "0.03em" }}>
          SHARE ON <span style={{ color: "var(--text-1)" }}>LINKEDIN</span>
        </span>
      </motion.div>

    </div>
  );
}

