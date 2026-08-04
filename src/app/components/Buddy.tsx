import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

export type BuddyState = "idle" | "listening" | "talking";

/* JREE tokens — the Buddy belongs to the JREE palette, not the source project's. */
const PURPLE_DARK = "var(--violet)";
const PURPLE_LIGHT = "var(--violet-light)";
const SPIKE_COLOR = "var(--violet)";

/* Motion's animations are JS-driven, so a CSS media query cannot stop them.
   We read the preference directly and render a static pose instead. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function useBlinkScheduler(enabled: boolean) {
  const [isBlinking, setIsBlinking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!enabled) { setIsBlinking(false); return; }
    const schedule = () => {
      const delay = 2500 + Math.random() * 3000;
      timerRef.current = setTimeout(() => {
        setIsBlinking(true);
        timerRef.current = setTimeout(() => { setIsBlinking(false); schedule(); }, 120);
      }, delay);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [enabled]);
  return isBlinking;
}

function useTalkingPause(active: boolean) {
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!active) { setPaused(false); return; }
    const cycle = () => {
      const speakDur = 1200 + Math.random() * 1300;
      const pauseDur = 600 + Math.random() * 600;
      timerRef.current = setTimeout(() => {
        setPaused(true);
        timerRef.current = setTimeout(() => { setPaused(false); cycle(); }, pauseDur);
      }, speakDur);
    };
    cycle();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]);
  return paused;
}

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const SPIKE_COUNT = 120;
const FACE_R = 60;
const LINE_LENGTH = 18;

const spikes = Array.from({ length: SPIKE_COUNT }, (_, i) => {
  const angle = (i / SPIKE_COUNT) * Math.PI * 2;
  const innerR = FACE_R;
  const outerR = innerR + LINE_LENGTH;
  return {
    x1: Math.cos(angle) * innerR, y1: Math.sin(angle) * innerR,
    x2: Math.cos(angle) * outerR, y2: Math.sin(angle) * outerR,
    opacity: 0.55 + seededRand(i * 17) * 0.3,
    width: 0.8 + seededRand(i * 23) * 0.5,
  };
});

function SpikeRing({ buddyState, still }: { buddyState: BuddyState; still: boolean }) {
  /* Slow, calm drift — the ring reads as ambience, not a spinner. */
  const rotDuration = buddyState === "listening" ? 42 : 26;
  const hidden = buddyState === "idle";
  const ring = spikes.map((s, i) => (
    <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
      stroke={SPIKE_COLOR} strokeOpacity={s.opacity}
      strokeWidth={s.width} strokeLinecap="round" />
  ));

  /* The aura belongs to the active states only — idle is a plain, quiet face. */
  if (still) return hidden ? null : <g>{ring}</g>;

  return (
    <motion.g
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      animate={{
        rotate: [0, 360],
        scale: hidden ? 0 : 1,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        rotate: { duration: rotDuration, ease: "linear", repeat: Infinity },
        scale: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
    >
      {ring}
    </motion.g>
  );
}

function Eye({ cx, cy, isBlinking, still }: { cx: number; cy: number; isBlinking: boolean; still: boolean }) {
  if (still) return <ellipse cx={cx} cy={cy} rx={3.5} ry={3.5} fill="white" />;
  return (
    <motion.ellipse cx={cx} cy={cy} rx={3.5}
      animate={{ ry: isBlinking ? 0.4 : 3.5 }}
      transition={{ duration: 0.08, ease: "easeInOut" }} fill="white" />
  );
}

function Face({ buddyState, still }: { buddyState: BuddyState; still: boolean }) {
  const isBlinking = useBlinkScheduler(!still);
  const isTalkingPaused = useTalkingPause(!still && buddyState === "talking");
  const eyeY = buddyState === "listening" ? -20 : -17;
  const showOpenMouth = !still && buddyState === "talking" && !isTalkingPaused;

  return (
    <g>
      <defs>
        <linearGradient id="buddy-face-grad" x1="-60" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor={PURPLE_LIGHT} />
          <stop offset="1" stopColor={PURPLE_DARK} />
        </linearGradient>
        <filter id="buddy-face-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="22" floodColor={PURPLE_LIGHT} floodOpacity="0.5" />
        </filter>
        <radialGradient id="buddy-glow-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={PURPLE_LIGHT} stopOpacity="0.5" />
          <stop offset="100%" stopColor={PURPLE_LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {buddyState !== "idle" && !still && (
        <motion.circle cx={0} cy={0} r={80} fill="url(#buddy-glow-pulse)"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      )}

      <circle cx={0} cy={0} r={FACE_R} fill="url(#buddy-face-grad)" filter="url(#buddy-face-shadow)" />

      {still ? (
        <g>
          <Eye cx={-22} cy={-17} isBlinking={false} still />
          <Eye cx={22} cy={-17} isBlinking={false} still />
        </g>
      ) : (
        <motion.g animate={{ y: eyeY - (-17) }} transition={{ duration: 0.35, ease: "easeOut" }}>
          <Eye cx={-22} cy={eyeY} isBlinking={isBlinking} still={false} />
          <Eye cx={22} cy={eyeY} isBlinking={isBlinking} still={false} />
        </motion.g>
      )}

      {/* Smile — stroke thickness pulses while talking, instead of an open mouth */}
      {still ? (
        <path d="M -18 14 Q 0 30 18 14" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" />
      ) : (
        <motion.path
          d="M -18 14 Q 0 30 18 14"
          fill="none"
          stroke="white"
          strokeLinecap="round"
          animate={
            showOpenMouth
              ? { strokeWidth: [2, 5, 1.5, 4, 2, 6, 2], d: "M -18 14 Q 0 30 18 14", opacity: 1 }
              : buddyState === "listening"
              ? { strokeWidth: 2, d: "M -14 14 Q 0 24 14 14", opacity: 1 }
              : { strokeWidth: 2, d: "M -18 14 Q 0 30 18 14", opacity: 1 }
          }
          transition={{
            duration: showOpenMouth ? 1.4 : 0.25,
            repeat: showOpenMouth ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      )}
    </g>
  );
}

/* Decorative only. Everything the Buddy "says" also exists as real text in the DOM. */
export function Buddy({ state = "idle", className = "w-24 h-24 md:w-28 md:h-28" }:
  { state?: BuddyState; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  /* Mount cleanly on the next frame — never flash a half-rendered mascot. */
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return <span className={className} aria-hidden="true" />;

  return (
    <svg className={className} viewBox="-130 -130 260 260"
      style={{ overflow: "visible" }} aria-hidden="true" focusable="false">
      <SpikeRing buddyState={state} still={reduced} />
      <Face buddyState={state} still={reduced} />
    </svg>
  );
}
