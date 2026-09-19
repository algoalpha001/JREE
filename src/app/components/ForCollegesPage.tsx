import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BarChart2, Eye, Sparkles, Layers, TrendingUp, CalendarClock } from "lucide-react";

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

/* ─── Count-up number, eased, fires once in view ─── */
function CountUp({ to, format, dur = 1.5, inView }: { to: number; format: (n: number) => string; dur?: number; inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (dur * 1000));
      setN(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, dur]);
  return <>{format(n)}</>;
}

/* ─── Animated stat tile ─── */
function GapStat({ value, label, sub, color, delay, inView }: { value: React.ReactNode; label: string; sub: string; color: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", transitionDelay: `${delay}s` }}
      className="grain rounded-[16px] p-6 md:p-7 flex flex-col"
    >
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(40px,6vw,60px)", color, letterSpacing: "-0.04em", lineHeight: 0.95, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
      <div className="mt-4">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-1)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{label}</div>
        <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-3)", lineHeight: 1.45 }}>{sub}</div>
      </div>
    </motion.div>
  );
}

/* ─── Gap panel — same-width tracks, the density contrast is the argument ─── */
const GAP_CELLS = 42;

function GapTrack({
  label,
  count,
  lit,
  color,
  faint = false,
  inView,
  baseDelay,
}: {
  label: string;
  count: number;
  lit: number;
  color: string;
  faint?: boolean;
  inView: boolean;
  baseDelay: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3.5">
        <MonoLabel color={faint ? "var(--text-3)" : color}>{label}</MonoLabel>
        <div className="flex items-baseline gap-1.5">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: faint ? "var(--text-2)" : color, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
            {count}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.02em" }}>/ 214</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-[5px]">
        {Array.from({ length: GAP_CELLS }).map((_, i) => {
          const on = i < lit;
          return (
            <motion.span
              key={i}
              className="rounded-[2px]"
              style={{
                width: "clamp(9px,1.6vw,13px)",
                aspectRatio: "1 / 1",
                background: on ? color : "var(--hairline-strong)",
                boxShadow: on && !faint ? `0 0 0 1px color-mix(in srgb, ${color} 40%, transparent)` : "none",
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={inView ? { opacity: on ? 0.95 : 0.35, y: 0 } : {}}
              transition={{ duration: 0.3, ease, delay: baseDelay + (on ? i * 0.018 : 0.05) }}
            />
          );
        })}
      </div>
    </div>
  );
}

function GapClusters() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <div
      ref={ref}
      className="mt-12 grain rounded-[20px] overflow-hidden"
      style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}
    >
      {/* header */}
      <div className="flex items-center justify-between px-6 md:px-9 py-4" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <MonoLabel color="var(--text-3)">One batch · two views</MonoLabel>
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1" style={{ background: "color-mix(in srgb, var(--lime-text) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--lime-text) 30%, transparent)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12, color: "var(--lime-text)", letterSpacing: "0.01em" }}>6×</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--lime-text)", letterSpacing: "0.06em", textTransform: "uppercase" }}>visibility gap</span>
        </div>
      </div>

      {/* tracks */}
      <div className="px-6 md:px-9 py-7 md:py-9 flex flex-col gap-8 md:gap-10">
        <GapTrack label="Seen by employers" count={32} lit={6} color="var(--text-2)" faint inView={inView} baseDelay={0.1} />
        <GapTrack label="Actually capable" count={182} lit={36} color="var(--lime-text)" inView={inView} baseDelay={0.35} />
      </div>

      {/* footer annotation */}
      <div className="px-6 md:px-9 py-4 flex items-center gap-3" style={{ borderTop: "1px solid var(--hairline)" }}>
        <span className="rounded-full" style={{ width: 6, height: 6, background: "var(--lime-text)", flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-3)", lineHeight: 1.4 }}>
          The gap is capable students employers never get to see.
        </span>
      </div>
    </div>
  );
}

/* ─── The placement gap section ─── */
function PlacementGap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  return (
    <div ref={ref}>
      <Eyebrow>The placement gap</Eyebrow>

      {/* The claim */}
      <h2 className="mt-6 max-w-[900px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(34px,5.8vw,62px)", color: "var(--text-1)", letterSpacing: "-0.035em", lineHeight: 1.02 }}>
        Your students are capable.
        <br />
        <span className="relative inline-block">
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>
            Employers just can't see it yet.
          </span>
          <motion.span
            className="absolute left-0 -bottom-1 h-[3px] rounded-full"
            style={{ background: "var(--lime-text)", transformOrigin: "left" }}
            initial={{ scaleX: 0, width: "100%" }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
          />
        </span>
      </h2>
      <p className="mt-6" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,1.8vw,19px)", color: "var(--text-2)", lineHeight: 1.5 }}>
        Good interviewers get placed. Good performers get missed.
      </p>

      {/* Visual centerpiece — the gap you can see */}
      <GapClusters />

      {/* Three animated proof stats — numbers, not paragraphs */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GapStat
          inView={inView}
          delay={0.15}
          color="var(--amber-text)"
          value={<CountUp to={60} inView={inView} format={(n) => `${Math.round(n)}%`} />}
          label="Rated unemployable"
          sub="Of India's graduates, per NASSCOM."
        />
        <GapStat
          inView={inView}
          delay={0.28}
          color="var(--violet)"
          value={<CountUp to={40000} inView={inView} format={(n) => `${Math.round(n).toLocaleString()}+`} />}
          label="Institutions, zero shared score"
          sub="No common way to compare graduates."
        />
        <GapStat
          inView={inView}
          delay={0.4}
          color="var(--lime-text)"
          value={<CountUp to={6} inView={inView} format={(n) => `${Math.round(n)}×`} />}
          label="More talent than employers see"
          sub="Capable students filtered out early."
        />
      </div>

      {/* Punchline + clear CTA */}
      <div className="mt-16 md:mt-24 grain rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8" style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}>
        <p className="max-w-[600px]" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(22px,3vw,34px)", color: "var(--text-1)", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
          An objective score proves a college is better than its reputation suggests.
        </p>
        <a
          href="#for-colleges"
          className="group inline-flex items-center gap-2 rounded-full self-start md:self-auto shrink-0 transition-transform active:scale-[0.98] hover:brightness-[1.04]"
          style={{ height: 54, padding: "0 28px", background: "var(--lime)", color: "var(--bg)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", boxShadow: "0 8px 32px rgba(201,220,83,0.25)", textDecoration: "none" }}
        >
          Close the gap for your batch
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

/* ─── Bento tile for the intelligence-system grid ─── */
function MiniBars({ hovered }: { hovered: boolean }) {
  const bars = [0.45, 0.72, 0.55, 0.9, 0.68];
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 34 }}>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="rounded-[2px]"
          style={{ width: 6, background: i === 3 ? "var(--lime-text)" : "var(--violet)", opacity: 0.85 }}
          animate={{ height: `${(hovered ? Math.min(1, h + 0.12) : h) * 100}%` }}
          transition={{ duration: 0.35, ease }}
        />
      ))}
    </div>
  );
}

function MiniStrata({ hovered }: { hovered: boolean }) {
  const rows = [0.9, 0.62, 0.4, 0.75];
  return (
    <div className="flex flex-col gap-[4px]" style={{ width: 46 }}>
      {rows.map((w, i) => (
        <motion.span
          key={i}
          className="rounded-[2px]"
          style={{ height: 6, background: i === 2 ? "var(--amber-text)" : "var(--lime-text)", opacity: 0.8 }}
          animate={{ width: `${(hovered ? Math.min(1, w + 0.08) : w) * 100}%` }}
          transition={{ duration: 0.35, ease, delay: i * 0.03 }}
        />
      ))}
    </div>
  );
}

function BentoTile({
  large = false,
  icon: Icon,
  color,
  label,
  phrase,
  mini,
  className = "",
}: {
  large?: boolean;
  icon: typeof BarChart2;
  color: string;
  label: string;
  phrase: string;
  mini?: "bars" | "strata";
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease }}
      className={`grain rounded-[14px] p-5 md:p-6 flex flex-col ${large ? "gap-5 min-h-[168px]" : "gap-4"} ${className}`}
      style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}
    >
      <div className="flex items-start justify-between">
        <motion.div
          className="rounded-[10px] flex items-center justify-center"
          style={{ width: 38, height: 38, background: `color-mix(in srgb, ${color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 25%, transparent)` }}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.3, ease }}
        >
          <Icon size={17} color={color} strokeWidth={1.8} />
        </motion.div>
        {mini === "bars" && <MiniBars hovered={hovered} />}
        {mini === "strata" && <MiniStrata hovered={hovered} />}
      </div>
      <div className="mt-auto">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: large ? 17 : 15, color: "var(--text-1)", letterSpacing: "-0.015em", lineHeight: 1.2 }}>
          {label}
        </div>
        <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.5 }}>
          {phrase}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Batch distribution chart (the hero device) ─── */
function BatchDistribution() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  // Each bar = a band bucket (height = % of cohort)
  const buckets = [
    { label: "D", range: "0–34",  pct: 8,  color: "var(--text-3)" },
    { label: "C", range: "35–54", pct: 22, color: "var(--violet)" },
    { label: "B", range: "55–74", pct: 42, color: "#B9A4E8" },
    { label: "A", range: "75–100", pct: 28, color: "var(--lime-text)" },
  ];
  const benchmarkPct = 36; // national B-median position

  return (
    <div
      className="grain rounded-[16px] p-6 md:p-7"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--hairline-strong)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <div className="flex items-center justify-between">
        <MonoLabel color="var(--violet)">Batch dashboard · sample</MonoLabel>
        <MonoLabel color="var(--text-3)">B.Tech CSE · 2025 · 214 students</MonoLabel>
      </div>

      <div className="mt-6 flex items-end gap-5">
        <div>
          <MonoLabel>Batch mean</MonoLabel>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 56, color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
            71
          </div>
        </div>
        <div className="pb-1.5">
          <MonoLabel color="var(--lime-text, var(--lime))">+6 vs national B-median</MonoLabel>
          <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)" }}>
            Top 31% of CSE batches assessed
          </div>
        </div>
      </div>

      {/* Chart */}
      <div ref={ref} className="mt-8 relative" style={{ height: 220 }}>
        {/* y-axis hairline */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--hairline)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "var(--hairline-strong)" }} />

        {/* National benchmark line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
          className="absolute left-0 right-0"
          style={{
            bottom: `${benchmarkPct}%`,
            height: 1,
            borderTop: "1px dashed var(--amber, #D97706)",
            transformOrigin: "left center",
            zIndex: 2,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.7 }}
          className="absolute right-0 inline-flex items-center rounded-full"
          style={{
            bottom: `calc(${benchmarkPct}% + 4px)`,
            zIndex: 2,
            padding: "3px 8px",
            background: "var(--surface-1)",
            border: "1px solid var(--amber, #D97706)",
          }}
        >
          <MonoLabel color="var(--amber, #D97706)">National median</MonoLabel>
        </motion.div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end gap-3 md:gap-5 px-2">
          {buckets.map((b, i) => (
            <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={inView ? { height: `${b.pct * 2}%`, opacity: 1 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.12 }}
                className="w-full rounded-t-[4px]"
                style={{ background: b.color, minHeight: 4 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bucket labels */}
      <div className="mt-3 flex items-start gap-3 md:gap-5 px-2">
        {buckets.map((b) => (
          <div key={b.label} className="flex-1 flex flex-col items-center">
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "var(--text-1)" }}>Band {b.label}</span>
            <span className="mt-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.04em" }}>{b.range}</span>
            <span className="mt-1.5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text-1)" }}>{b.pct}%</span>
          </div>
        ))}
      </div>

      <div className="mt-7 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
        <MonoLabel>Live · refreshed daily during window</MonoLabel>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)" }}>↗ Drill into cohort →</span>
      </div>
    </div>
  );
}

/* ─── Step animated graphics ─── */

const STEP_FRAME = "grain rounded-[14px] relative overflow-hidden";
const STEP_FRAME_STYLE = { height: 220, background: "var(--surface-2)", border: "1px solid var(--hairline-strong)" } as const;

function StepGraphic01({ active }: { active: boolean }) {
  return (
    <div className={STEP_FRAME} style={STEP_FRAME_STYLE}>
      {/* document mock */}
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <motion.div className="grain rounded-[10px] w-[180px] px-4 py-4 flex flex-col gap-2"
          style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-elevated)" }}
          initial={{ opacity: 0, y: 14, rotate: -2 }}
          animate={active ? { opacity: 1, y: 0, rotate: -1.5 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          {/* header */}
          <div className="flex items-center justify-between mb-1">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--violet)", letterSpacing: "0.07em" }}>MSA · v2.4</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-3)", letterSpacing: "0.04em" }}>PG 1/4</span>
          </div>
          {[100, 86, 94, 70, 92, 60].map((w, i) => (
            <motion.div key={i} className="rounded-full"
              style={{ height: 3, background: "var(--surface-3)", transformOrigin: "left", width: `${w}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={active ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.32, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
          {/* signature line */}
          <div className="mt-3 flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <motion.svg width="62" height="20" viewBox="0 0 62 20" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={active ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                <motion.path d="M2 14 C 8 4, 14 18, 22 8 S 38 16, 46 6 L 58 12"
                  stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={active ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
              <div style={{ height: 1, background: "var(--hairline-strong)", width: 64 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 7, color: "var(--text-3)", letterSpacing: "0.05em" }}>SIGNATURE</span>
            </div>
            <motion.div initial={{ scale: 0, rotate: -12 }}
              animate={active ? { scale: 1, rotate: -8 } : {}}
              transition={{ delay: 1.6, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full flex items-center justify-center"
              style={{ width: 38, height: 38, border: "1.5px solid var(--lime)", background: "rgba(201,220,83,0.06)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 7, color: "var(--lime-text)", fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1 }}>
                EDU<br/>BRIDGE
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* status pill */}
      <motion.div className="absolute bottom-3 left-3 rounded-full inline-flex items-center gap-1.5 px-2.5 py-1"
        style={{ background: "rgba(201,220,83,0.12)", border: "1px solid rgba(201,220,83,0.3)" }}
        initial={{ opacity: 0, y: 6 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.9, duration: 0.35 }}>
        <div className="rounded-full flex items-center justify-center" style={{ width: 11, height: 11, background: "var(--lime)" }}>
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none">
            <path d="M1 2.5L2.4 4L5 1" stroke="var(--text-1)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--lime-text)", letterSpacing: "0.06em" }}>EXECUTED</span>
      </motion.div>
    </div>
  );
}

function StepGraphic02({ active }: { active: boolean }) {
  const rows = [
    { name: "Priya Sharma",  prog: "B.Tech CSE",   id: "21CSE042" },
    { name: "Arjun Kapoor",  prog: "B.Tech ECE",   id: "21ECE118" },
    { name: "Meera Reddy",   prog: "MBA Finance",  id: "23MBA009" },
    { name: "Rohan Tandon",  prog: "B.Tech CSE",   id: "21CSE077" },
    { name: "Ananya Bose",   prog: "B.Com",        id: "22COM214" },
  ];
  return (
    <div className={STEP_FRAME} style={STEP_FRAME_STYLE}>
      {/* CSV file header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--hairline)", background: "var(--bg-2)" }}>
        <div className="flex items-center gap-2">
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
            <path d="M1 1H7L10 4V12H1V1Z" stroke="var(--teal)" strokeWidth="1" />
            <path d="M7 1V4H10" stroke="var(--teal)" strokeWidth="1" />
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-2)", letterSpacing: "0.05em" }}>batch_2026.csv</span>
        </div>
        <motion.span initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--lime-text)", letterSpacing: "0.06em" }}>
          ✓ 248 rows
        </motion.span>
      </div>
      {/* progress bar */}
      <div className="absolute top-[34px] left-0 right-0 h-px" style={{ background: "var(--surface-3)" }}>
        <motion.div className="h-full" style={{ background: "var(--teal)", transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={active ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
      </div>
      {/* table */}
      <div className="absolute top-[44px] left-4 right-4 flex flex-col gap-1.5">
        <div className="grid grid-cols-[1.4fr_1fr_0.8fr] gap-2 pb-1" style={{ borderBottom: "1px solid var(--hairline)" }}>
          {["NAME", "PROGRAMME", "ID"].map(h => (
            <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-3)", letterSpacing: "0.07em" }}>{h}</span>
          ))}
        </div>
        {rows.map((r, i) => (
          <motion.div key={r.id} className="grid grid-cols-[1.4fr_1fr_0.8fr] gap-2 items-center"
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-1)" }}>{r.name}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-2)" }}>{r.prog}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--teal-text)", letterSpacing: "0.04em" }}>{r.id}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StepGraphic03({ active }: { active: boolean }) {
  const emails = [
    { id: "JREE-2849", state: "sent" },
    { id: "JREE-7103", state: "sent" },
    { id: "JREE-3014", state: "sending" },
  ];
  return (
    <div className={STEP_FRAME} style={STEP_FRAME_STYLE}>
      {/* radiating rings + @ centred in upper zone */}
      <div className="absolute left-0 right-0 flex flex-col items-center" style={{ top: 28, bottom: 96 }}>
        {/* dispatch label */}
        <motion.div
          className="mb-2 rounded-full px-2 py-0.5 flex items-center gap-1.5"
          style={{ background: "rgba(109,86,164,0.12)", border: "1px solid var(--violet-border)" }}
          initial={{ opacity: 0, y: -4 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.35 }}>
          <motion.span className="rounded-full" style={{ width: 5, height: 5, background: "var(--violet)" }}
            animate={active ? { opacity: [1, 0.3, 1] } : {}} transition={{ duration: 1.2, repeat: Infinity }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--violet)", letterSpacing: "0.06em" }}>DISPATCHING CREDENTIALS</span>
        </motion.div>

        {/* @ orb with rings */}
        <div className="relative flex items-center justify-center flex-1 w-full">
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ border: "1px solid rgba(109,86,164,0.5)", width: 36, height: 36 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={active ? { opacity: [0.65, 0], scale: [0.75, 2.8] } : { opacity: 0 }}
              transition={{ delay: 0.45 + i * 0.55, duration: 1.8, repeat: active ? Infinity : 0, repeatDelay: 0.5, ease: "easeOut" }}
            />
          ))}
          <motion.div className="rounded-full flex items-center justify-center relative z-10"
            style={{ width: 48, height: 48, background: "rgba(109,86,164,0.18)", border: "1px solid var(--violet)", boxShadow: "0 0 28px rgba(109,86,164,0.45)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--violet)", fontWeight: 700, lineHeight: 1 }}>@</span>
          </motion.div>

          {/* count badge floating off the orb */}
          <motion.div
            className="absolute rounded-full flex items-center justify-center"
            style={{ top: "50%", left: "50%", marginTop: -28, marginLeft: 18, width: 28, height: 16, background: "var(--surface-1)", border: "1px solid var(--violet-border)" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 8, color: "var(--violet)", letterSpacing: "0.03em" }}>248</span>
          </motion.div>
        </div>
      </div>
      {/* email pills floating around */}
      <div className="absolute top-3 left-3">
      </div>
      {/* bottom credential cards */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
        {emails.map((e, i) => (
          <motion.div key={e.id} className="rounded-md flex items-center justify-between px-2 py-1"
            style={{ background: "var(--bg-2)", border: "1px solid var(--hairline-strong)" }}
            initial={{ opacity: 0, y: 6 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 + i * 0.18, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-1.5">
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <rect x="0.5" y="0.5" width="8" height="6" stroke="var(--text-3)" strokeWidth="0.7" />
                <path d="M0.5 0.5L4.5 4L8.5 0.5" stroke="var(--text-3)" strokeWidth="0.7" />
              </svg>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-2)", letterSpacing: "0.04em" }}>{e.id}</span>
            </div>
            {e.state === "sent" ? (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--lime-text)", letterSpacing: "0.06em" }}>✓ DELIVERED</span>
            ) : (
              <motion.span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--teal-text)", letterSpacing: "0.06em" }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}>
                ● SENDING
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StepGraphic04({ active }: { active: boolean }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  return (
    <div className={STEP_FRAME} style={STEP_FRAME_STYLE}>
      {/* top strip — exam in progress */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2"
        style={{ borderBottom: "1px solid var(--hairline)", background: "var(--bg-2)" }}>
        <span className="inline-flex items-center gap-1.5">
          <motion.span className="rounded-full" style={{ width: 5, height: 5, background: "var(--danger)" }}
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--danger)", letterSpacing: "0.06em" }}>REC · LIVE</span>
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.04em" }}>Q 04 / 06</span>
      </div>
      {/* score ring + details */}
      <div className="absolute left-0 right-0 flex flex-col items-center px-4" style={{ top: 34, bottom: 28 }}>
        {/* ring — compact */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg width="76" height="76" viewBox="0 0 108 108">
            <circle cx="54" cy="54" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="6" />
            <motion.circle cx="54" cy="54" r={r} fill="none" stroke="var(--lime)" strokeWidth="6"
              strokeLinecap="round"
              style={{ rotate: -90, transformOrigin: "54px 54px" }}
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={active ? { strokeDashoffset: circ * (1 - 0.74) } : { strokeDashoffset: circ }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 1 }}
              initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.5 }}>
              74
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: 7, color: "var(--lime-text)", letterSpacing: "0.07em", marginTop: 2 }}>
              BAND B
            </motion.span>
          </div>
        </div>

        {/* rank + percentile row */}
        <motion.div className="flex items-center gap-2 mt-1.5"
          initial={{ opacity: 0, y: 4 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.6, duration: 0.35 }}>
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{ background: "rgba(201,220,83,0.1)", border: "1px solid rgba(201,220,83,0.3)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--lime-text)", letterSpacing: "0.06em" }}>RANK 4,217</span>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-3)", letterSpacing: "0.05em" }}>TOP 23%</span>
        </motion.div>

        {/* layer breakdown */}
        <div className="w-full mt-2 flex flex-col gap-1">
          {[
            { label: "Cognitive",  v: 79, c: "var(--violet)" },
            { label: "English",    v: 74, c: "var(--violet)" },
            { label: "Domain",     v: 68, c: "var(--teal)" },
            { label: "Interview",  v: 77, c: "var(--violet)" },
          ].map((l, i) => (
            <motion.div key={l.label} className="flex items-center gap-1.5"
              style={{ lineHeight: 1 }}
              initial={{ opacity: 0, x: -4 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.7 + i * 0.07, duration: 0.3 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 7.5, color: "var(--text-3)", letterSpacing: "0.03em", width: 44, flexShrink: 0 }}>{l.label}</span>
              <div className="flex-1 rounded-full overflow-hidden" style={{ height: 2, background: "var(--surface-3)" }}>
                <motion.div className="h-full rounded-full"
                  style={{ background: l.c, opacity: 0.8 }}
                  initial={{ width: 0 }}
                  animate={active ? { width: `${l.v}%` } : {}}
                  transition={{ delay: 1.75 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 7.5, color: "var(--text-2)", letterSpacing: "0.03em", width: 16, textAlign: "right", flexShrink: 0 }}>{l.v}</span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* bottom layer indicators */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1">
        {[0,1,2,3,4,5,6,7].map(i => (
          <motion.div key={i} className="flex-1 rounded-full"
            style={{ height: 3, background: i < 4 ? "var(--lime)" : "var(--surface-3)", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={active ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

function StepGraphic05({ active }: { active: boolean }) {
  const bars = [
    { pct: 0.55, color: "var(--lime-text)",    label: "A", count: "21%" },
    { pct: 0.92, color: "var(--teal-text)",    label: "B", count: "38%" },
    { pct: 0.72, color: "var(--violet)",  label: "C", count: "29%" },
    { pct: 0.32, color: "var(--text-3)",  label: "D", count: "12%" },
  ];
  const maxH = 96;
  return (
    <div className={STEP_FRAME} style={STEP_FRAME_STYLE}>
      {/* dashboard chrome */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2"
        style={{ borderBottom: "1px solid var(--hairline)", background: "var(--bg-2)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-2)", letterSpacing: "0.05em" }}>BATCH 2026 · CSE</span>
        <motion.span className="inline-flex items-center gap-1"
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.0 }}>
          <motion.span className="rounded-full" style={{ width: 5, height: 5, background: "var(--teal)" }}
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--teal-text)", letterSpacing: "0.06em" }}>LIVE</span>
        </motion.span>
      </div>
      {/* chart */}
      <div className="absolute left-0 right-0 flex items-stretch justify-center gap-3 px-5"
        style={{ top: 36, bottom: 28 }}>
        {bars.map((b, i) => {
          const barH = Math.round(b.pct * maxH);
          return (
            <div key={b.label} className="flex-1 relative flex flex-col justify-end items-center">
              {/* count label — floats just above the bar once it appears */}
              <motion.span
                className="absolute"
                style={{ bottom: barH + 5, fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 9, color: "var(--text-2)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.12 + 0.6, duration: 0.35 }}>
                {b.count}
              </motion.span>
              {/* bar — grows from bottom */}
              <motion.div
                className="rounded-t-[4px] w-full"
                style={{ background: b.color, opacity: 0.88, maxWidth: 34 }}
                initial={{ height: 0 }}
                animate={active ? { height: barH } : { height: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          );
        })}
      </div>
      {/* axis labels */}
      <div className="absolute bottom-3 left-5 right-5 flex justify-center gap-4">
        {bars.map(b => (
          <span key={b.label} className="flex-1 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.04em" }}>{b.label}</span>
        ))}
      </div>
    </div>
  );
}

const STEP_GRAPHICS = [StepGraphic01, StepGraphic02, StepGraphic03, StepGraphic04, StepGraphic05];

type SetupStep = {
  n: string;
  t: string;
  s: string;
  owner: string;
  ownerColor: string;
  duration: string;
  details: string[];
};

function StepRow({ step, index, isLast }: { step: SetupStep; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Graphic = STEP_GRAPHICS[index];
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12 items-start py-9"
        style={{ borderTop: "1px solid var(--hairline-strong)" }}>
        {/* Left: step text */}
        <div className="flex gap-5 items-start">
          <div className="flex flex-col items-center flex-shrink-0" style={{ marginTop: 2 }}>
            <div className="rounded-full flex items-center justify-center"
              style={{ width: 30, height: 30, background: "var(--bg)", border: `1px solid ${inView ? "var(--lime)" : "var(--violet)"}`, transition: "border-color 0.4s ease" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: inView ? "var(--lime)" : "var(--violet)", letterSpacing: "0.04em", transition: "color 0.4s ease" }}>{step.n}</span>
            </div>
            {!isLast && <div className="w-px flex-1 mt-2" style={{ minHeight: 60, background: "var(--hairline-strong)" }} />}
          </div>
          <div className="min-w-0">
            {/* meta row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5"
                style={{ background: `color-mix(in srgb, ${step.ownerColor} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${step.ownerColor} 35%, transparent)` }}>
                <span className="block rounded-full" style={{ width: 5, height: 5, background: step.ownerColor }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: step.ownerColor, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  {step.owner}
                </span>
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                · {step.duration}
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px,2vw,21px)", color: "var(--text-1)", letterSpacing: "-0.015em", lineHeight: 1.2 }}>
              {step.t}
            </h3>
            <p className="mt-2.5 max-w-[460px]" style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-2)", lineHeight: 1.65 }}>
              {step.s}
            </p>
            <ul className="mt-4 flex flex-col gap-1.5">
              {step.details.map((d, i) => (
                <motion.li key={i} className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}>
                  <span className="rounded-full flex-shrink-0" style={{ width: 4, height: 4, background: "var(--text-3)", marginTop: 8 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.55 }}>{d}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        {/* Right: animated graphic */}
        <Graphic active={inView} />
      </div>
    </motion.div>
  );
}

/* ─── 5-step setup timeline (vertical) ─── */
function SetupTimeline() {
  const steps: SetupStep[] = [
    {
      n: "01",
      t: "Contract signed.",
      s: "EduBridge handles the legal and commercial side end-to-end. You get a clean MSA, a fixed annual rate per student, and a single point of contact.",
      owner: "EduBridge",
      ownerColor: "var(--lime)",
      duration: "Day 1 · ~30 min",
      details: [
        "Master Service Agreement + DPDP-compliant data addendum",
        "One named onboarding lead assigned to your campus",
        "No per-drive fees, no hidden integration costs",
      ],
    },
    {
      n: "02",
      t: "Upload your batch CSV.",
      s: "Your placement office uploads a single roster — name, email, programme, student ID. The system validates rows, flags duplicates, and provisions accounts in under a minute.",
      owner: "College",
      ownerColor: "var(--teal)",
      duration: "Day 1 · 10–15 min",
      details: [
        "Standard template — works directly with most ERP exports",
        "Auto-detects programme, year, and section from common headers",
        "Bulk re-upload anytime to add late registrations",
      ],
    },
    {
      n: "03",
      t: "Students get credentials.",
      s: "Branded invitation emails go out automatically with login credentials, exam-window dates, prep guide, and device requirements. Students confirm slots inside the JREE portal.",
      owner: "Automated",
      ownerColor: "var(--violet)",
      duration: "Day 1–2 · automatic",
      details: [
        "Co-branded with your college logo and TPO signature",
        "SMS + email reminders at T-72h, T-24h, and T-2h",
        "Reschedule self-serve up to 48 hours before slot",
      ],
    },
    {
      n: "04",
      t: "Students take JREE.",
      s: "A 90-minute proctored written assessment plus a 20-minute AI video interview with Priya. Any laptop, any browser. Layer-by-layer evaluation across reasoning, communication, role fit, and integrity.",
      owner: "Student",
      ownerColor: "var(--lime)",
      duration: "Inside your window · ~110 min",
      details: [
        "AI proctoring + identity verification at session start",
        "Auto-resume on disconnect — no progress lost",
        "Score locked at submission, signed with a verifiable QR",
      ],
    },
    {
      n: "05",
      t: "Your dashboard goes live.",
      s: "Within 48 hours of the last submission, your TPO dashboard is live with cohort distribution, band-wise breakdown, individual rank cards, and a gap map for your training team to act on before drives begin.",
      owner: "EduBridge",
      ownerColor: "var(--teal)",
      duration: "T+48h · ongoing access",
      details: [
        "Per-student rank card, downloadable as a verified PDF",
        "Drill from cohort → band → student in two clicks",
        "Optional employer-pool listing for Band A and B students",
      ],
    },
  ];
  return (
    <div className="mt-12">
      {steps.map((s, i) => (
        <StepRow key={s.n} step={s} index={i} isLast={i === steps.length - 1} />
      ))}
    </div>
  );
}

/* ─── Request callback form ─── */
function CallbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fields: { name: string; label: string; type?: string; placeholder: string }[] = [
    { name: "name", label: "Your name", placeholder: "Dr. / Mr. / Ms. ..." },
    { name: "college", label: "College name", placeholder: "Full name of the institution" },
    { name: "designation", label: "Your designation", placeholder: "TPO · Principal · Dean ..." },
    { name: "phone", label: "Phone number", type: "tel", placeholder: "+91 ..." },
    { name: "batch", label: "Batch size (approx.)", type: "number", placeholder: "e.g. 240" },
  ];

  if (submitted) {
    return (
      <div
        className="rounded-[14px] p-8 md:p-10"
        style={{ background: "var(--surface-1)", border: "1px solid var(--lime-border)", boxShadow: "var(--shadow-card)" }}
      >
        <MonoLabel color="var(--lime-text, var(--lime))">Request received</MonoLabel>
        <div className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px,2.6vw,28px)", color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Thanks — the EduBridge sales team will reach out within 24 hours.
        </div>
        <div className="mt-4" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
          A copy of the college brochure has been emailed to you. If you don't see it, check your spam folder or email <span style={{ color: "var(--text-1)" }}>colleges@edubridge.in</span>.
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[14px] p-7 md:p-9"
      style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {fields.map((f, i) => (
          <div key={f.name} className={i === 0 ? "md:col-span-2" : ""}>
            <label htmlFor={f.name} className="block mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type || "text"}
              required
              placeholder={f.placeholder}
              className="w-full rounded-[10px] transition-colors"
              style={{
                height: 46, padding: "0 14px",
                background: "var(--bg)",
                border: "1px solid var(--hairline-strong)",
                color: "var(--text-1)",
                fontFamily: "var(--font-body)", fontSize: 14,
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--violet)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--hairline-strong)")}
            />
          </div>
        ))}
      </div>

      <div className="mt-7 pt-6 flex flex-wrap items-center gap-4" style={{ borderTop: "1px solid var(--hairline)" }}>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            height: 50, padding: "0 26px", background: "var(--violet)", color: "var(--on-violet)",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
            border: "none", cursor: "pointer",
            boxShadow: "var(--shadow-card)",
          }}
        >
          Request a callback
        </button>
        <a
          href="#for-colleges"
          className="inline-flex items-center justify-center transition-colors hover:text-[var(--text-1)]"
          style={{ color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, textDecoration: "none" }}
        >
          Download the college brochure →
        </a>
      </div>

      <p className="mt-5" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)", lineHeight: 1.55 }}>
        Submitting this form sends your details only to the EduBridge sales team. DPDP-compliant. No marketing third-parties.
      </p>
    </form>
  );
}

/* ─── main page ─── */
export function ForCollegesPage() {
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
              <MonoLabel>For placement officers &amp; college management</MonoLabel>
              <h1
                className="mt-6"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(40px,6.4vw,68px)",
                  color: "var(--text-1)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.02,
                }}
              >
                Give every student a placement score{" "}
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>
                  before placement season begins.
                </span>
              </h1>

              <p className="mt-7 max-w-[560px]" style={PROSE}>
                JREE assesses your entire batch and gives each student a verified score employers trust —
                and gives you a real-time dashboard of exactly where your batch stands.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => { window.location.hash = "college-signup"; }}
                  className="inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    height: 52, padding: "0 26px", background: "var(--lime)", color: "#000000",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em",
                    boxShadow: "0 8px 32px rgba(201,220,83,0.25)", border: "none", cursor: "pointer",
                  }}
                >
                  Register your college →
                </button>
                <a
                  href="#colleges-cta"
                  className="inline-flex items-center justify-center transition-colors hover:text-[var(--text-1)]"
                  style={{ color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, textDecoration: "none" }}
                >
                  Request a demo instead
                </a>
              </div>

              {/* Stat strip */}
              <div className="mt-12 pt-6 grid grid-cols-3 gap-6" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
                {[
                  ["₹3,000", "per student / year"],
                  ["90 min", "single assessment window"],
                  ["50+", "employers reading scores"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px,2.6vw,26px)", color: "var(--text-1)", letterSpacing: "-0.02em" }}>{n}</div>
                    <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)", lineHeight: 1.4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <BatchDistribution />
              <p className="mt-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                [Sample batch dashboard · live during your exam window]
              </p>
            </div>
          </motion.div>
        </Section>

        <Rule />

        {/* ─── 2. The placement gap ─── */}
        <PlacementGap />

        <Rule />

        {/* ─── 3. How it works ─── */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow>Simple to set up. Powerful in practice.</Eyebrow>
            <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
              From contract to scores in 48 hours.
            </h2>
            <p className="mt-5 max-w-[680px]" style={PROSE}>
              Setup is handled by EduBridge. Your placement office uploads one CSV; everything else — credentials,
              exam-window comms, dashboard provisioning — happens for you.
            </p>
          </motion.div>
          <SetupTimeline />
        </Section>

        <Rule />

        {/* ─── 4. What your college gets ─── */}
        <Section>
          <Eyebrow>More than an assessment</Eyebrow>
          <h2 className="mt-5 max-w-[720px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.04 }}>
            A complete placement{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>intelligence</span>{" "}
            system.
          </h2>

          {/* ── The console — an animated dashboard mock ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="mt-12 relative rounded-[24px] overflow-hidden grain"
            style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}
          >
            {/* ambient glow */}
            <div className="absolute -top-24 -right-16 pointer-events-none" style={{ width: 320, height: 320, background: "radial-gradient(circle, rgba(201,220,83,0.14), transparent 70%)" }} />
            <div className="absolute -bottom-24 -left-16 pointer-events-none" style={{ width: 320, height: 320, background: "radial-gradient(circle, rgba(109,86,164,0.16), transparent 70%)" }} />

            {/* window chrome */}
            <div className="relative flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid var(--hairline)" }}>
              <div className="flex items-center gap-2">
                {["var(--danger)", "var(--amber)", "var(--teal)"].map((c) => (
                  <span key={c} className="rounded-full" style={{ width: 9, height: 9, background: c, opacity: 0.7 }} />
                ))}
                <span className="ml-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.05em" }}>jree · batch intelligence · CSE 2025</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1" style={{ background: "color-mix(in srgb, var(--lime-text) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--lime-text) 30%, transparent)" }}>
                <motion.span className="rounded-full" style={{ width: 6, height: 6, background: "var(--lime-text)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--lime-text)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Live</span>
              </div>
            </div>

            {/* body */}
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1fr]">
              {/* left — national rank ring */}
              <div className="p-7 md:p-9 flex items-center gap-6 md:gap-8" style={{ borderBottom: "1px solid var(--hairline)" }}>
                <div className="relative shrink-0" style={{ width: 132, height: 132 }}>
                  <svg viewBox="0 0 120 120" width="132" height="132">
                    <defs>
                      <linearGradient id="rankRing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="var(--violet)" />
                        <stop offset="100%" stopColor="var(--lime)" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--hairline-strong)" strokeWidth="9" />
                    <motion.circle
                      cx="60" cy="60" r="52" fill="none" stroke="url(#rankRing)" strokeWidth="9" strokeLinecap="round"
                      style={{ rotate: -90, transformOrigin: "60px 60px" }}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 0.98 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease, delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>2%</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>top pct</span>
                  </div>
                </div>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>National rank · sample student</span>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(38px,6vw,52px)", color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>4,217</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--text-3)" }}>/ 218k</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Read by 50+ employers</span>
                  </div>
                </div>
              </div>

              {/* right — batch band distribution */}
              <div className="p-7 md:p-9" style={{ borderLeft: "1px solid var(--hairline)" }}>
                <div className="flex items-center justify-between mb-5">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Batch distribution</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.03em" }}>214 students</span>
                </div>
                <div className="flex items-end gap-3" style={{ height: 118 }}>
                  {[
                    { k: "A", pct: 0.9, c: "var(--lime-text)", n: 58 },
                    { k: "B", pct: 0.66, c: "var(--teal-text)", n: 82 },
                    { k: "C", pct: 0.44, c: "var(--violet)", n: 49 },
                    { k: "D", pct: 0.22, c: "var(--amber-text)", n: 25 },
                  ].map((b, i) => (
                    <div key={b.k} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", fontVariantNumeric: "tabular-nums" }}>{b.n}</span>
                      <motion.div
                        className="w-full rounded-t-[5px]"
                        style={{ background: b.c, opacity: 0.9, transformOrigin: "bottom" }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${b.pct * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease, delay: 0.4 + i * 0.1 }}
                      />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.04em" }}>{b.k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Capability grid — numbered, animated on scroll + hover ── */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: BarChart2, color: "var(--violet)", label: "Batch analytics dashboard", phrase: "Live cohort view, drill to any student." },
              { icon: Layers, color: "var(--lime-text)", label: "Gap map", phrase: "Layer-by-layer weak points, batch-wide." },
              { icon: Eye, color: "var(--teal-text)", label: "Employer-pool visibility", phrase: "Band A/B students, seen by 50+ employers." },
              { icon: Sparkles, color: "var(--lime-text)", label: "AI batch insight", phrase: "Plain-English summary of where you stand." },
              { icon: TrendingUp, color: "var(--teal-text)", label: "Year-over-year tracking", phrase: "This year vs. last year — same rubric." },
              { icon: CalendarClock, color: "var(--violet)", label: "Exam-window control", phrase: "You set the dates. We run the rest." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="group grain relative rounded-[16px] p-5 md:p-6 overflow-hidden"
                  style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}
                >
                  {/* animated top accent */}
                  <div className="absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: f.color }} />
                  <div className="flex items-start justify-between">
                    <div className="rounded-[10px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ width: 38, height: 38, background: `color-mix(in srgb, ${f.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${f.color} 25%, transparent)` }}>
                      <motion.span
                        className="inline-flex"
                        animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                      >
                        <Icon size={17} color={f.color} strokeWidth={1.8} />
                      </motion.span>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.04em" }}>0{i + 1}</span>
                  </div>
                  <div className="mt-5">
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-1)", letterSpacing: "-0.015em", lineHeight: 1.2 }}>{f.label}</div>
                    <div className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.5 }}>{f.phrase}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#for-colleges"
              className="group inline-flex items-center gap-2 rounded-full transition-transform active:scale-[0.98] hover:brightness-[1.04]"
              style={{ height: 54, padding: "0 28px", background: "var(--violet)", color: "var(--on-violet)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", boxShadow: "var(--shadow-card)", textDecoration: "none" }}
            >
              Open a live sample dashboard
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#for-colleges"
              className="inline-flex items-center justify-center transition-colors hover:text-[var(--text-1)]"
              style={{ color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14, textDecoration: "none" }}
            >
              Download sample report →
            </a>
          </div>
        </Section>

        <Rule />

        {/* ─── 5. What students get ─── */}
        <Section>
          <Eyebrow>For your students</Eyebrow>
          <h2 className="mt-5 max-w-[640px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.04 }}>
            A verified credential they{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>carry for life.</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-[380px_1fr] gap-8 md:gap-14 items-start">
            {/* ── The credential card (visual) ── */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              whileHover={{ y: -6 }}
              className="grain relative rounded-[20px] p-6 overflow-hidden"
              style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="absolute -top-16 -right-12 pointer-events-none" style={{ width: 220, height: 220, background: "radial-gradient(circle, rgba(201,220,83,0.16), transparent 70%)" }} />

              {/* header */}
              <div className="relative flex items-center justify-between">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.09em", textTransform: "uppercase" }}>JREE credential</span>
                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "color-mix(in srgb, var(--teal-text) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--teal-text) 30%, transparent)" }}>
                  <span className="rounded-full" style={{ width: 5, height: 5, background: "var(--teal-text)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--teal-text)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Verified</span>
                </div>
              </div>

              {/* score + band */}
              <div className="relative mt-6 flex items-end justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 72, color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 0.85 }}>87</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--text-3)" }}>/100</span>
                  </div>
                  <span className="mt-2 inline-block" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Composite score</span>
                </div>
                <div className="rounded-[10px] px-3 py-2 text-center" style={{ background: "var(--lime)", color: "var(--bg)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", lineHeight: 1 }}>A</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>Band</div>
                </div>
              </div>

              {/* rank */}
              <div className="relative mt-6 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid var(--hairline)" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>National rank</div>
                  <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", letterSpacing: "-0.02em" }}>4,217 <span style={{ color: "var(--text-3)", fontWeight: 600, fontSize: 13 }}>/ 218k</span></div>
                </div>
                {/* mini QR */}
                <div className="grid gap-[2px] rounded-[4px] p-1.5" style={{ gridTemplateColumns: "repeat(7,1fr)", background: "var(--surface-3)" }}>
                  {["1011101","1000101","1011001","0101010","1001101","1010001","1011101"].join("").split("").map((c, i) => (
                    <span key={i} className="rounded-[1px]" style={{ width: 5, height: 5, background: c === "1" ? "var(--text-1)" : "transparent" }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Benefits — short phrases only ── */}
            <div>
              <p className="mb-2" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(17px,2vw,20px)", color: "var(--text-2)", lineHeight: 1.4 }}>
                One score. One rank. One profile employers trust.
              </p>
              <div className="mt-6 flex flex-col">
                {[
                  { label: "Free to take", phrase: "Students never pay." },
                  { label: "National rank", phrase: "Where they stand, nationally." },
                  { label: "Employers come to them", phrase: "Found, not cold-applying." },
                  { label: "AI interview feedback", phrase: "Layer-wise growth notes." },
                  { label: "Shareable certificate", phrase: "QR-verified, for life." },
                ].map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, ease, delay: i * 0.07 }}
                    className="group flex items-center justify-between gap-4 py-4"
                    style={{ borderTop: "1px solid var(--hairline)", borderBottom: i === 4 ? "1px solid var(--hairline)" : "none" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full transition-transform duration-300 group-hover:scale-150" style={{ width: 6, height: 6, background: "var(--lime-text)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(15px,1.8vw,18px)", color: "var(--text-1)", letterSpacing: "-0.01em" }}>{f.label}</span>
                    </div>
                    <span className="text-right" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-3)", lineHeight: 1.35 }}>{f.phrase}</span>
                  </motion.div>
                ))}
              </div>

              {/* condensed footnote */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full px-3.5 py-2" style={{ background: "color-mix(in srgb, var(--violet) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--violet) 22%, transparent)" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.4 }}>
                  Framed as where to focus — never a verdict.
                </span>
              </div>
            </div>
          </div>
        </Section>

        <Rule />

        {/* ─── 6. Pricing ─── */}
        <Section>
          <Eyebrow>Straightforward pricing</Eyebrow>
          <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,6vw,60px)", color: "var(--text-1)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            ₹3,000{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--text-2)" }}>
              per student per year.
            </span>
          </h2>
          <p className="mt-5 max-w-[680px]" style={PROSE}>
            One transparent fee covers everything below. Minimum 50 students; discounts available for batches
            of 500+. No setup charge, no per-report fee, no surprise line-items.
          </p>

          {/* The quotable ROI line */}
          <div
            className="mt-12 rounded-[16px] p-7 md:p-10"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--violet)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <MonoLabel color="var(--violet)">The ROI math</MonoLabel>
            <p
              className="mt-5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(22px,3vw,32px)",
                color: "var(--text-1)",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
              }}
            >
              A batch of 200 at ₹3,000 = ₹6,00,000 —{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>
                less than two campus drives,
              </span>{" "}
              and it gives employers a reason to come to you.
            </p>
          </div>

          {/* Inclusion checklist */}
          <div className="mt-12">
            <MonoLabel>What's included</MonoLabel>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              {[
                "5-layer assessment (aptitude, communication, domain, behaviour, role-fit)",
                "Individual student reports + national rank",
                "College placement dashboard",
                "Employer-pool listing for Band A & B students",
                "AI batch insight + layer-wise gap map",
                "Exam-window control + EduBridge support",
              ].map((item, i) => (
                <div
                  key={item}
                  className="py-4 flex items-start gap-4"
                  style={{ borderTop: i < 2 ? "1px solid var(--hairline-strong)" : "1px solid var(--hairline)" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12, color: "var(--violet)", flexShrink: 0, marginTop: 2 }}>—</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-2)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#colleges-cta"
              className="inline-flex items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                height: 50, padding: "0 24px", background: "var(--violet)", color: "var(--on-violet)",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
                boxShadow: "var(--shadow-card)", textDecoration: "none",
              }}
            >
              Get a quote for your college
            </a>
            <a
              href="#colleges-cta"
              className="inline-flex items-center justify-center rounded-full transition-all hover:bg-[var(--hairline)]"
              style={{
                height: 50, padding: "0 22px", background: "transparent", border: "1px solid var(--violet)",
                color: "var(--text-1)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
                textDecoration: "none",
              }}
            >
              Talk to our sales team
            </a>
          </div>
        </Section>

        <Rule />

        {/* ─── 7. Trust ─── */}
        <Section>
          <Eyebrow>Why EduBridge?</Eyebrow>
          <h2 className="mt-5 max-w-[820px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.06 }}>
            We've been placing students for 10 years.{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--text-2)" }}>
              JREE is the product of that experience.
            </span>
          </h2>
          <p className="mt-5 max-w-[680px]" style={PROSE}>
            Since 2014, EduBridge has placed over 10,000 students into roles across 200+ companies. Every
            framework in JREE — the 5 layers, the band cut-offs, the role-readiness rubric — comes from real
            conversations with the recruiters who do the hiring.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {[
              ["Frameworks", "Question rubric aligned to O*NET, EQF Level 4, and WorldSkills standards — reviewed and updated annually."],
              ["Employer integrity", "Only GST-verified employers can access the talent pool. No anonymous recruiters, no surprise inbound."],
              ["Data protection", "DPDP-compliant by design. Per-share consent. Account deletion removes all PII within 30 days."],
              ["Domain review", "Question banks reviewed by working professionals from IT, BFSI, and Manufacturing — refreshed every cycle."],
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

          {/* Logo slots */}
          <div className="mt-14 pt-10" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
            <MonoLabel>Partner colleges &amp; recruiters</MonoLabel>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-[12px] flex items-center justify-center"
                  style={{ height: 72, background: "var(--surface-1)", border: "1px solid var(--hairline-strong)" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    [Logo {i}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── 8. Final CTA / Form ─── */}
        <div id="colleges-cta" className="mt-24 pt-12" style={{ borderTop: "1px solid var(--hairline-strong)" }}>
          <Eyebrow>Get started</Eyebrow>
          <h2 className="mt-5 max-w-[820px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,5vw,52px)", color: "var(--text-1)", letterSpacing: "-0.03em", lineHeight: 1.04 }}>
            Give your batch the edge{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, color: "var(--lime-text)" }}>
              they deserve.
            </span>
          </h2>
          <p className="mt-5 max-w-[640px]" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.7vw,17px)", color: "var(--text-2)", lineHeight: 1.65 }}>
            Ready to go? Register your college directly — setup takes under 10 minutes. Or fill the form below and our sales team will reach out within 24 hours.
          </p>

          {/* Self-registration CTA strip */}
          <div className="mt-8 rounded-[16px] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5" style={{ background: "var(--surface-1)", border: "1px solid var(--lime-border)", boxShadow: "var(--shadow-card)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--text-1)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Register in under 10 minutes
              </div>
              <div className="mt-1" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "var(--text-3)", lineHeight: 1.4 }}>
                Institution → Your details → Authorisation → Email verify. Approval within 1 working day.
              </div>
            </div>
            <button
              onClick={() => { window.location.hash = "college-signup"; }}
              className="inline-flex items-center justify-center rounded-full flex-shrink-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ height: 48, padding: "0 24px", background: "var(--lime)", color: "var(--bg)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em", border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(201,220,83,0.22)", whiteSpace: "nowrap" }}
            >
              Register your college →
            </button>
          </div>

          {/* divider */}
          <div className="mt-10 mb-8 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "var(--hairline-strong)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Or request a callback</span>
            <div className="flex-1 h-px" style={{ background: "var(--hairline-strong)" }} />
          </div>

          <CallbackForm />
        </div>

      </div>
    </div>
  );
}
