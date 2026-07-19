import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Building2, BriefcaseBusiness, GraduationCap } from "lucide-react";
import JreeLogo from "../../imports/JreeLogo1/index";

const DOT_SPACING = 44;

/*
 * VerificationGrid — top ambient layer.
 * A faint national "network" of data points (one tiled SVG <pattern>, not dozens
 * of DOM nodes) that drifts a few px opposite the cursor and, at long randomised
 * intervals, registers a single "verification ping" in the VERIFIED-badge teal.
 * Fully static under prefers-reduced-motion.
 */
function VerificationGrid() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const driftX = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const driftY = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });
  const [ping, setPing] = useState<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      mx.set(-(e.clientX / window.innerWidth - 0.5) * 14);
      my.set(-(e.clientY / window.innerHeight - 0.5) * 14);
    };
    window.addEventListener("mousemove", onMove);

    let timer: ReturnType<typeof setTimeout>;
    let id = 0;
    const schedule = () => {
      timer = setTimeout(() => {
        const gx = Math.round((0.08 + Math.random() * 0.84) * window.innerWidth / DOT_SPACING) * DOT_SPACING;
        const gy = Math.round((0.1 + Math.random() * 0.75) * window.innerHeight / DOT_SPACING) * DOT_SPACING;
        setPing({ id: id++, x: gx, y: gy });
        schedule();
      }, 3800 + Math.random() * 4200);
    };
    schedule();

    return () => { window.removeEventListener("mousemove", onMove); clearTimeout(timer); };
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-0"
      style={{
        inset: -28,
        x: driftX,
        y: driftY,
        maskImage: "radial-gradient(125% 120% at 55% 40%, black 30%, transparent 85%)",
        WebkitMaskImage: "radial-gradient(125% 120% at 55% 40%, black 30%, transparent 85%)",
      }}
    >
      <svg width="100%" height="100%" style={{ display: "block", opacity: 0.1 }}>
        <defs>
          <pattern id="jree-dots" width={DOT_SPACING} height={DOT_SPACING} patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1.1" fill="var(--violet)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jree-dots)" />
      </svg>

      <AnimatePresence>
        {ping && (
          <div key={ping.id} className="absolute flex items-center justify-center" style={{ left: ping.x, top: ping.y, width: 4, height: 4 }}>
            <motion.span
              className="absolute rounded-full"
              style={{ width: 4, height: 4, background: "var(--teal)" }}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 1, 0.4], scale: [1, 1.8, 1] }}
              transition={{ duration: 2.4, ease: "easeOut" }}
              onAnimationComplete={() => setPing(null)}
            />
            <motion.span
              className="absolute rounded-full"
              style={{ width: 4, height: 4, border: "1px solid var(--teal)" }}
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 10, opacity: 0 }}
              transition={{ duration: 2.4, ease: "easeOut" }}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const LOGO_CANVAS_W = 1000;
const LOGO_CANVAS_H = 400;
function Logo() { const scale = .112; return <div style={{ width: 112, height: 45, overflow: "hidden", position: "relative" }}><div style={{ width: LOGO_CANVAS_W, height: LOGO_CANVAS_H, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute" }}><JreeLogo /></div></div>; }
const options = [
  { title: "Student", line: "Know your score. Get hired faster.", hash: "for-students", Icon: GraduationCap },
  { title: "Employer", line: "Pre-assessed candidates. Hire faster.", hash: "for-employers", Icon: BriefcaseBusiness },
  { title: "College", line: "Batch readiness. National benchmarking.", hash: "for-colleges", Icon: Building2 },
];
export function EntryPage() {
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return <div className="grain relative min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--text-1)", fontFamily: "var(--font-body)" }}>
  <header className="h-[84px] max-w-[1160px] mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-[72px] flex items-center"><Logo /></header>
  <main className="relative overflow-hidden flex-1 max-w-[1160px] mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-[72px] flex flex-col justify-center py-16 md:py-24">
    {/* Ambient light wash — a very large, soft radial source drifting in a slow
        60–90s loop, like sunlight moving across a wall. No hard edges: reads as
        a shift in ambient warmth/depth, not a moving object. */}
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-0"
      style={{
        inset: "-45%",
        background: "radial-gradient(closest-side, rgba(109,86,164,0.13) 0%, rgba(109,86,164,0.06) 42%, transparent 70%)",
        filter: "blur(50px)",
      }}
      animate={reduce ? undefined : { x: ["-9%", "11%", "-4%", "-9%"], y: ["-7%", "6%", "12%", "-7%"] }}
      transition={{ duration: 82, repeat: Infinity, ease: "easeInOut" }}
    />
    <VerificationGrid />{/* parallax + pings self-disable under reduced motion; grid stays static */}
    <motion.div className="relative z-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".08em", color: "var(--violet)", textTransform: "uppercase" }}>JREE · by EduBridge</p><h1 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,5vw,58px)", letterSpacing: "-.03em", lineHeight: 1.04 }}>Who are you here as?</h1></motion.div>
    <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">{options.map(({ title, line, hash, Icon }, i) => {
      const visual = title === "Student"
        ? { image: "https://images.unsplash.com/photo-1637589308599-3478cc55510d?auto=format&fit=crop&w=1200&q=80", alt: "Focused student working at a laptop" }
        : title === "Employer"
          ? { image: "https://images.unsplash.com/photo-1615791242458-caf8ff6245ac?auto=format&fit=crop&w=1200&q=80", alt: "Professional reviewing work at a laptop" }
          : { image: "https://images.unsplash.com/photo-1687709348710-05314eea5476?auto=format&fit=crop&w=1200&q=80", alt: "Students walking through a university campus" };
      return <motion.button
        key={hash}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .1 + i * .08 }}
        whileHover={{ y: -4 }}
        onClick={() => { window.location.hash = hash; }}
        className="group relative flex min-h-[424px] w-full flex-col overflow-hidden rounded-[16px] p-0 text-left outline-none transition-[border-color,box-shadow] duration-[400ms] ease-out focus-visible:ring-2 focus-visible:ring-[var(--violet)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
        style={{ background: "var(--surface-1)", border: "1px solid var(--hairline-strong)", boxShadow: "var(--shadow-card)" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--violet-border)"; e.currentTarget.style.boxShadow = "var(--shadow-elevated)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--hairline-strong)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
      >
        <div className="relative h-[190px] w-full shrink-0 self-start" style={{ background: "var(--bg-2)" }}>
          <div className="h-full overflow-hidden">
            <img src={visual.image} alt={visual.alt} className="h-full w-full object-cover object-[62%_42%] transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]" style={{ filter: "saturate(100%) contrast(96%) brightness(96%)" }} />
            <div className="absolute inset-0" style={{ background: "rgba(94,74,158,.05)", mixBlendMode: "multiply" }} />
            <div className="absolute inset-x-0 bottom-0 h-[72%]" style={{ background: "linear-gradient(180deg, transparent 38%, rgba(255,255,255,.12) 72%, var(--surface-1) 100%)" }} />
          </div>
          <span className="absolute bottom-[-20px] left-7 z-30 flex items-center justify-center rounded-full" style={{ width: 48, height: 48, background: "var(--surface-1)", color: "var(--violet)", boxShadow: "var(--shadow-elevated)", border: "1px solid var(--violet-border)" }}><Icon size={24} strokeWidth={2} /></span>
        </div>
        <div className="flex min-h-[196px] flex-col justify-start px-7 pb-7 pt-10 md:px-8 md:pb-8">
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 29, letterSpacing: "-.02em" }}>{title}</h2>
          <p className="mt-2.5 max-w-[25ch]" style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.6 }}>{line}</p>
          <span className="mt-5 inline-flex items-center" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--violet)", letterSpacing: ".06em" }}>Choose {title} <span className="ml-1 inline-block transition-transform duration-[400ms] ease-out group-hover:translate-x-1">→</span></span>
        </div>
      </motion.button>;
    })}</div>
  </main>
  <footer className="max-w-[1160px] mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-[72px] py-7 flex flex-col sm:flex-row gap-4 justify-between" style={{ borderTop: "1px solid var(--hairline-strong)", color: "var(--text-3)", fontSize: 12 }}><span>© {new Date().getFullYear()} JREE by EduBridge</span><div className="flex gap-5"><a href="#privacy" style={{ color: "var(--violet)" }}>Privacy</a><a href="#terms" style={{ color: "var(--violet)" }}>Terms</a><a href="mailto:hello@jree.in" style={{ color: "var(--violet)" }}>Contact</a></div></footer>
</div>; }
