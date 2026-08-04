1 — First-time user decision screen

A user who has just logged in and has no completed assessment lands on #dashboard and sees a decision moment before anything else.

Detect first-time state: no prior result data. (Currently Dashboard() branches on window.location.hash === "#dashboard" to a zero-state DashboardPage — extend that zero-state.)
Present two clear choices, not a wall of dashboard:
Primary (violet fill): "Take the assessment now" → routes to #exam/tutorial (new, see below)
Secondary (violet border, transparent): "I'll take it later" → dismisses to the normal zero-state dashboard
Supporting line sets expectations honestly: total time, that it's free, that it can't be paused once started.
If the user picks "later," the dashboard keeps a persistent, non-nagging entry point to start the tutorial anytime. Never trap them — no dead ends.
2 — NEW: Guided tutorial flow (#exam/tutorial)

A new multi-step tutorial that runs before the existing #exam/check. Add "exam/tutorial" to PostRoute and POST_ROUTES, and render a new TutorialFlow component.

Step sequence (each a distinct screen, with a progress indicator):

Welcome — what JREE is, what the next ~90 minutes look like, what they'll get at the end (score, band, national rank, certificate).
The five layers — L1 Cognitive, L2 Communication, L3 Domain, L4 SJT, L5 AI Interview. Question counts, timing, weight. Horizontal bars only.
Rules & integrity — server-side timer, no pausing, tab-switching is logged, one attempt per session. Stated plainly and calmly, framed as what keeps your score credible, never as threat or suspicion.
How the exam screen works — an annotated preview of the actual exam UI: timer position, question navigation, mark-for-review, submit. Show, don't describe.
The AI interview (L5) — set expectations for Priya: 5 questions, video, what's scored (content, clarity, confidence, structure). Reduce surprise; this is where most anxiety lives.
Technical checks — camera, microphone, browser, connection. Each check shows pending → checking → pass/fail with a concrete fix for failures. This is the highest-risk step — a failed check must never dead-end; always offer a retry, a troubleshooting hint, and "continue without" where the layer allows it.
Ready — final confirmation, then route to #exam/check (existing SystemCheck) or straight to #exam/active depending on whether checks were completed here (avoid duplicating the same checks twice — reconcile with the existing SystemCheck component rather than repeating it).

Navigation rules: back/next between steps, progress visible, escape-to-dashboard always available before the exam actually begins. Once the exam starts, the wizard locks (existing behavior).

3 — The Buddy: an animated guide through the tutorial

Use the SVG mascot component provided below (Part 2). It is a purple orb face with a rotating spike-ring aura, blinking eyes, and a mouth that animates while speaking.

Behavior:

The Buddy sits persistently in the tutorial layout (side panel on desktop, top or bottom-anchored on mobile) and delivers each step's instruction as its dialogue. It is the narrator of the tutorial, not decoration.
States drive the animation:
talking — while presenting a step's instruction (mouth animates, aura spins fast, glow pulses)
listening — while waiting for the user to act (run a check, click next); aura spins moderately
idle — resting between beats; slow aura drift, blinking only
Wire state transitions to tutorial events: step-enter → talking, instruction finished → listening, user idle → idle.
Recolor to JREE tokens. The source uses hardcoded purples (
#5A3A9A, 
#7B5BBF, 
#A08EC8, 
#6040A8). Map these to var(--violet) and its soft/border variants so the Buddy belongs to JREE's palette, not the source project's.
Never appears during the live scored exam (exam/active, exam/priya). The exam is a zero-chrome locked wizard for score credibility — a talking mascot during a timed, scored question undermines that and risks reading as assistance during assessment. Tutorial and transition screens only.

Edge cases for the Buddy:

prefers-reduced-motion: the component already handles this (kills animation via media query) — verify it still applies after integration, and that a static pose reads fine.
Screen readers: the Buddy is decorative. Every instruction it "speaks" must exist as real text in the DOM — never convey required information through the animation alone. Mark the SVG aria-hidden.
Mobile: must not crowd or overlap the step content or buttons; define a compact placement.
Slow load: no half-rendered mascot flash; mount cleanly or not at all.
4 — Edge cases for the flow
Refresh mid-tutorial: resume at the current step, don't restart from step 1.
Direct-link to #exam/tutorial by a user who already has a result: offer the retest framing instead of first-time framing.
Back-button behavior: must not accidentally drop the user into exam/active.
A technical check fails and can't be fixed (no camera): explain clearly what happens to L5 scoring, offer to proceed if permitted, never leave them stuck.
User abandons at any step: state is preserved; the dashboard entry point picks up where they left off.
5 — Verify

Tutorial renders in light theme, violet primaries, no red, no dark remnants. Buddy animates correctly across all three states, respects reduced-motion, and is absent from exam/active and exam/priya. Every step is escapable before exam start. AA contrast throughout.

PART 2 — Buddy component code to paste into Figma Make

Save as src/app/components/Buddy.tsx. This is adapted from the working prototype into a reusable component with a state prop (the original had demo buttons; those are removed) and JREE token colors.

tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

export type BuddyState = "idle" | "listening" | "talking";

// JREE tokens — override via props if needed
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
      animate={{ rotate: [0, 360] }}
      transition={{ duration: rotDuration, ease: "linear", repeat: Infinity }}
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

      <motion.ellipse cx={0} cy={20} rx={11}
        animate={showOpenMouth ? { ry: [2, 8, 2, 9, 3, 7, 2], opacity: 1 } : { ry: 0, opacity: 0 }}
        transition={{ duration: 0.52, repeat: showOpenMouth ? Infinity : 0, ease: "easeInOut" }}
        fill="white" />

      <motion.path d="M -18 14 Q 0 30 18 14" fill="none" stroke="white"
        strokeWidth={2} strokeLinecap="round"
        animate={
          showOpenMouth ? { opacity: 0, d: "M -18 14 Q 0 30 18 14" }
          : buddyState === "listening" ? { opacity: 1, d: "M -14 14 Q 0 24 14 14" }
          : { opacity: 1, d: "M -18 14 Q 0 30 18 14" }
        }
        transition={{ duration: 0.25, ease: "easeOut" }} />
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

Usage in the tutorial:

tsx
const [buddyState, setBuddyState] = useState<BuddyState>("talking");
// on step change: setBuddyState("talking")
// after instruction shown: setBuddyState("listening")
<Buddy state={buddyState} />

Two notes: PURPLE_LIGHT (
#A08EC8) is still a raw hex because the gradient and feDropShadow need concrete values — replace it with a JREE light-violet token if one exists. And the source repo used motion/react, which matches what JREE already imports, so no dependency change is needed