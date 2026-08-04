Two changes: the spike ring now scales/fades away entirely when idle (appears only when active), and the open-mouth ellipse is gone — talking is now shown by pulsing the smile's stroke thickness instead, which is a cleaner, less cartoonish read.

Here's the updated component for Figma Make. Save as src/app/components/Buddy.tsx:

tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

export type BuddyState = "idle" | "listening" | "talking";

// JREE tokens
const PURPLE_DARK  = "var(--violet)";
const PURPLE_LIGHT = "#A08EC8";
const SPIKE_COLOR  = "var(--violet)";

function useBlinkScheduler() {
  const [isBlinking, setIsBlinking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const schedule = () => {
      const delay = 2500 + Math.random() * 3000;
      timerRef.current = setTimeout(() => {
        setIsBlinking(true);
        timerRef.current = setTimeout(() => { setIsBlinking(false); schedule(); }, 120);
      }, delay);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);
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

function SpikeRing({ buddyState }: { buddyState: BuddyState }) {
  const rotDuration = buddyState === "idle" ? 40 : buddyState === "listening" ? 2 : 1;
  return (
    <motion.g
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      animate={{
        rotate: [0, 360],
        scale: buddyState === "idle" ? 0 : 1,
        opacity: buddyState === "idle" ? 0 : 1,
      }}
      transition={{
        rotate: { duration: rotDuration, ease: "linear", repeat: Infinity },
        scale: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
    >
      {spikes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke={SPIKE_COLOR} strokeOpacity={s.opacity}
          strokeWidth={s.width} strokeLinecap="round" />
      ))}
    </motion.g>
  );
}

function Eye({ cx, cy, isBlinking }: { cx: number; cy: number; isBlinking: boolean }) {
  return (
    <motion.ellipse cx={cx} cy={cy} rx={3.5}
      animate={{ ry: isBlinking ? 0.4 : 3.5 }}
      transition={{ duration: 0.08, ease: "easeInOut" }} fill="white" />
  );
}

function Face({ buddyState }: { buddyState: BuddyState }) {
  const isBlinking = useBlinkScheduler();
  const isTalkingPaused = useTalkingPause(buddyState === "talking");
  const eyeY = buddyState === "listening" ? -20 : -17;
  const showOpenMouth = buddyState === "talking" && !isTalkingPaused;

  return (
    <g>
      <defs>
        <linearGradient id="buddy-face-grad" x1="-60" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor={PURPLE_LIGHT} />
          <stop offset="1" stopColor={PURPLE_DARK} />
        </linearGradient>
        <filter id="buddy-face-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="22" floodColor={PURPLE_LIGHT} floodOpacity="0.6" />
        </filter>
        <radialGradient id="buddy-glow-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={PURPLE_LIGHT} stopOpacity="0.5" />
          <stop offset="100%" stopColor={PURPLE_LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {buddyState !== "idle" && (
        <motion.circle cx={0} cy={0} r={80} fill="url(#buddy-glow-pulse)"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      )}

      <circle cx={0} cy={0} r={FACE_R} fill="url(#buddy-face-grad)" filter="url(#buddy-face-shadow)" />

      <motion.g animate={{ y: eyeY - (-17) }} transition={{ duration: 0.35, ease: "easeOut" }}>
        <Eye cx={-22} cy={eyeY} isBlinking={isBlinking} />
        <Eye cx={22} cy={eyeY} isBlinking={isBlinking} />
      </motion.g>

      {/* Smile — stroke thickness pulses while talking to simulate speech */}
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
    </g>
  );
}

export function Buddy({ state = "idle", className = "w-24 h-24 md:w-28 md:h-28" }:
  { state?: BuddyState; className?: string }) {
  return (
    <>
      <svg className={className} viewBox="-130 -130 260 260"
        style={{ overflow: "visible" }} aria-hidden="true">
        <SpikeRing buddyState={state} />
        <Face buddyState={state} />
      </svg>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          svg[aria-hidden="true"] * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </>
  );
}

Usage stays the same — <Buddy state={buddyState} />, with setBuddyState("talking") on step entry and "listening" once the instruction has been delivered.

One design consequence worth noting: since the spike ring now vanishes entirely when idle, the Buddy's idle state is just a plain face with slow blinking. That's calmer and less distracting, which suits the tutorial context well — but if you want it to still feel present rather than dormant between steps, listening is probably the better resting state than idle.